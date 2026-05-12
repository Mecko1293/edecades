// Pixabay Image Proxy — powers eDecades photo lookup
// Returns multiple images per decade+category combo
// Caches results in memory to reduce API calls

const PIXABAY_KEY = Deno.env.get("PIXABAY_API_KEY") || "17942546-d3ede3af795e99870e9bf04dd";

// In-memory cache: key -> {urls, timestamp}
const cache: Record<string, { urls: string[]; ts: number }> = {};
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Decade-aware search queries for each category
const QUERIES: Record<string, Record<string, string>> = {
  Fashion: {
    "1900s": "edwardian fashion vintage portrait woman 1900",
    "1910s": "1910s women fashion vintage dress",
    "1920s": "1920s flapper fashion art deco vintage",
    "1930s": "1930s fashion hollywood glamour vintage dress",
    "1940s": "1940s fashion wwii women vintage style",
    "1950s": "1950s fashion rockabilly poodle skirt vintage",
    "1960s": "1960s mod fashion miniskirt vintage style",
    "1970s": "1970s fashion boho bell bottoms vintage",
    "1980s": "1980s neon fashion power suit vintage",
    "1990s": "1990s grunge fashion flannel vintage style",
    "2000s": "2000s y2k fashion low rise vintage style",
    "2010s": "2010s streetwear athleisure fashion style",
    "2020s": "2020s cottagecore gen z fashion style",
  },
  Food: {
    "1900s": "vintage 1900s kitchen cooking food",
    "1910s": "vintage 1910s food kitchen dining",
    "1920s": "1920s speakeasy food cocktail vintage",
    "1930s": "1930s depression era food soup kitchen",
    "1940s": "1940s wartime food rations vintage kitchen",
    "1950s": "1950s diner milkshake burger vintage food",
    "1960s": "1960s vintage food TV dinner fondue",
    "1970s": "1970s vintage food casserole retro kitchen",
    "1980s": "1980s junk food fast food retro",
    "1990s": "1990s food pizza bagel bites retro snacks",
    "2000s": "2000s food energy drink sushi fusion",
    "2010s": "2010s food avocado toast artisan coffee",
    "2020s": "2020s food delivery plant based healthy",
  },
  Beauty: {
    "1900s": "edwardian hairstyle vintage beauty portrait woman",
    "1910s": "1910s vintage beauty hair makeup woman",
    "1920s": "1920s flapper makeup bob hairstyle vintage",
    "1930s": "1930s hollywood beauty makeup vintage glamour",
    "1940s": "1940s victory rolls lipstick vintage beauty",
    "1950s": "1950s pinup makeup cat eye vintage beauty",
    "1960s": "1960s mod makeup twiggy vintage beauty",
    "1970s": "1970s natural beauty afro hair vintage",
    "1980s": "1980s big hair makeup neon vintage beauty",
    "1990s": "1990s grunge makeup minimalist vintage beauty",
    "2000s": "2000s glossy lip makeup reality tv beauty",
    "2010s": "2010s contouring instagram beauty makeup",
    "2020s": "2020s natural skincare beauty wellness",
  },
  Art: {
    "1900s": "impressionism art painting museum vintage",
    "1910s": "cubism art avant garde painting vintage",
    "1920s": "art deco illustration vintage 1920s",
    "1930s": "1930s social realism art painting depression",
    "1940s": "1940s abstract expressionism war art",
    "1950s": "1950s abstract expressionism modern art",
    "1960s": "1960s pop art warhol contemporary",
    "1970s": "1970s conceptual art psychedelic vintage",
    "1980s": "1980s graffiti street art neon pop",
    "1990s": "1990s contemporary art installation museum",
    "2000s": "2000s digital art contemporary gallery",
    "2010s": "2010s street art mural contemporary",
    "2020s": "2020s nft digital art contemporary",
  },
  Technology: {
    "1900s": "1900s vintage technology machine invention",
    "1910s": "1910s vintage technology radio car early",
    "1920s": "1920s vintage technology radio appliance",
    "1930s": "1930s vintage technology appliance radio",
    "1940s": "1940s vintage technology radar computer early",
    "1950s": "1950s vintage technology television appliance",
    "1960s": "1960s space technology nasa rocket computer",
    "1970s": "1970s vintage technology calculator computer",
    "1980s": "1980s personal computer technology vintage",
    "1990s": "1990s computer internet technology vintage",
    "2000s": "2000s technology smartphone mp3 player",
    "2010s": "2010s smartphone tablet social media technology",
    "2020s": "2020s artificial intelligence technology AI",
  },
  Homes: {
    "1900s": "edwardian victorian interior home vintage",
    "1910s": "1910s vintage home interior parlor",
    "1920s": "1920s art deco interior home vintage",
    "1930s": "1930s depression era home interior vintage",
    "1940s": "1940s wartime home interior vintage",
    "1950s": "1950s ranch house interior vintage retro",
    "1960s": "1960s mod interior home vintage retro",
    "1970s": "1970s shag carpet interior home vintage retro",
    "1980s": "1980s interior home decor vintage retro",
    "1990s": "1990s interior home decor vintage retro",
    "2000s": "2000s minimalist home interior modern",
    "2010s": "2010s open plan home interior modern design",
    "2020s": "2020s scandinavian home interior minimalist",
  },
  Culture: {
    "1900s": "1900s vintage people street life culture",
    "1910s": "1910s vintage street culture society",
    "1920s": "1920s jazz age nightclub culture vintage",
    "1930s": "1930s depression era culture vintage people",
    "1940s": "1940s wartime culture vintage people",
    "1950s": "1950s american culture suburban vintage",
    "1960s": "1960s counterculture hippie woodstock vintage",
    "1970s": "1970s disco culture vintage people",
    "1980s": "1980s pop culture mall vintage people",
    "1990s": "1990s pop culture vintage people",
    "2000s": "2000s pop culture reality tv vintage",
    "2010s": "2010s social media culture selfie people",
    "2020s": "2020s pandemic culture zoom social media",
  },
};

// Fallback generic queries if category not found
const FALLBACK_QUERIES: Record<string, string> = {
  "1900s": "1900s vintage history black white",
  "1910s": "1910s vintage history old photograph",
  "1920s": "1920s roaring twenties vintage jazz",
  "1930s": "1930s great depression dust bowl vintage",
  "1940s": "1940s world war vintage people",
  "1950s": "1950s american dream vintage retro",
  "1960s": "1960s civil rights space age vintage",
  "1970s": "1970s disco era vintage culture",
  "1980s": "1980s retro pop culture vintage",
  "1990s": "1990s grunge era vintage culture",
  "2000s": "2000s millennium era technology",
  "2010s": "2010s social media smartphone era",
  "2020s": "2020s pandemic technology modern",
};

async function fetchPixabay(query: string, count = 6): Promise<string[]> {
  const cacheKey = `${query}:${count}`;
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.urls;

  const params = new URLSearchParams({
    key: PIXABAY_KEY,
    q: query,
    image_type: "photo",
    per_page: String(Math.min(count * 2, 20)),
    safesearch: "true",
    orientation: "horizontal",
    min_width: "400",
  });

  const res = await fetch(`https://pixabay.com/api/?${params}`);
  if (!res.ok) throw new Error(`Pixabay API error: ${res.status}`);

  const data = await res.json();
  const urls = (data.hits || [])
    .slice(0, count)
    .map((h: any) => h.webformatURL);

  cache[cacheKey] = { urls, ts: Date.now() };
  return urls;
}

export default async function handler(req: Request): Promise<Response> {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };

  if (req.method === "OPTIONS") return new Response(null, { headers });

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category") || "";
    const decade = url.searchParams.get("decade") || "";
    const count = parseInt(url.searchParams.get("count") || "6");
    const query = url.searchParams.get("q") || "";

    let searchQuery: string;

    if (query) {
      // Direct search query
      searchQuery = query;
    } else if (category && decade) {
      // Category + decade lookup
      searchQuery = QUERIES[category]?.[decade] || FALLBACK_QUERIES[decade] || `${decade} vintage history`;
    } else if (decade) {
      searchQuery = FALLBACK_QUERIES[decade] || `${decade} vintage history`;
    } else if (category) {
      searchQuery = `${category.toLowerCase()} vintage history`;
    } else {
      return new Response(JSON.stringify({ error: "Provide category, decade, or q param" }), { status: 400, headers });
    }

    const urls = await fetchPixabay(searchQuery, count);

    return new Response(JSON.stringify({
      query: searchQuery,
      category,
      decade,
      count: urls.length,
      urls,
    }), { headers });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
