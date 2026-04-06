import { useState } from "react";

const DECADES_DATA = {
  "1920s": {
    emoji: "🎷",
    tagline: "The Roaring Twenties",
    colors: ["#FFD700", "#000000", "#C0A060", "#8B0000", "#F5DEB3", "#2F2F2F"],
    colorNames: ["Gatsby Gold", "Jet Black", "Champagne", "Art Deco Red", "Cream", "Charcoal"],
    fashion: [
      { label: "Flapper Dress", desc: "Drop-waist dresses with fringe, meant for dancing the Charleston" },
      { label: "Cloche Hat", desc: "Bell-shaped hats pulled low over bobbed hair — the ultimate 20s look" },
      { label: "Men's Pinstripe Suits", desc: "Wide-lapel pinstripe suits worn by gangsters and gentlemen alike" },
      { label: "Art Deco Jewelry", desc: "Geometric, bold jewelry inspired by Egyptian and Greek motifs" },
    ],
    inventions: [
      { name: "Television", year: 1927, desc: "John Logie Baird demonstrated the first working TV in 1926" },
      { name: "Penicillin", year: 1928, desc: "Alexander Fleming's discovery of penicillin changed medicine forever" },
      { name: "Talking Pictures", year: 1927, desc: "The Jazz Singer became the first synchronized-sound feature film" },
    ],
    culture: ["Charleston dance craze", "Speakeasies & bootleg gin", "Jazz music everywhere", "Women's suffrage", "Rise of cinema"],
  },
  "1930s": {
    emoji: "🎬",
    tagline: "The Golden Age of Hollywood",
    colors: ["#708090", "#2F4F4F", "#8B7355", "#C0A060", "#F5F5DC", "#4A4A4A"],
    colorNames: ["Steel Gray", "Depression Green", "Khaki", "Champagne", "Ivory", "Shadow"],
    fashion: [
      { label: "Bias-Cut Gowns", desc: "Sleek, body-skimming silk gowns inspired by Hollywood starlets" },
      { label: "Wide-Leg Trousers", desc: "High-waisted, wide-leg trousers on men — relaxed elegance" },
      { label: "Fedora Hats", desc: "The fedora was THE hat of the 1930s — worn by everyone from gangsters to movie stars" },
    ],
    inventions: [
      { name: "Nylon", year: 1935, desc: "DuPont invented nylon — the first fully synthetic fiber — revolutionizing stockings" },
      { name: "Radar", year: 1935, desc: "Robert Watson-Watt developed the first practical radar system in 1935" },
      { name: "Jet Engine", year: 1937, desc: "Frank Whittle's jet engine prototype changed aviation forever" },
    ],
    culture: ["Great Depression", "The New Deal", "Big Band & Swing", "Hollywood golden era", "Radio becomes king"],
  },
  "1940s": {
    emoji: "✈️",
    tagline: "The War Years & Victory",
    colors: ["#8B0000", "#4169E1", "#F5DEB3", "#228B22", "#C0A060", "#2F2F2F"],
    colorNames: ["Victory Red", "Navy Blue", "Wheat", "Army Green", "Brass", "Blackout"],
    fashion: [
      { label: "Military Uniforms", desc: "Military influence shaped all fashion — even civilian clothes had structured shoulders" },
      { label: "Rosie the Riveter Style", desc: "Women entered the workforce wearing practical overalls and headscarves" },
      { label: "Victory Rolls Hairstyle", desc: "Rolled curls framing the face — the signature hairstyle of 1940s women" },
    ],
    inventions: [
      { name: "Atomic Bomb", year: 1945, desc: "The Manhattan Project produced the atomic bomb, ending WWII and changing history" },
      { name: "Microwave Oven", year: 1945, desc: "Percy Spencer accidentally discovered microwave cooking while working on radar" },
      { name: "Computer (ENIAC)", year: 1945, desc: "ENIAC — the first general-purpose electronic computer — filled an entire room" },
    ],
    culture: ["World War II", "Rationing & Victory Gardens", "Swing dancing", "Rise of suburbia", "Birth of the teenager"],
  },
  "1950s": {
    emoji: "🎸",
    tagline: "Rock & Roll Is Born",
    colors: ["#FF69B4", "#00CED1", "#FF4500", "#FFFF00", "#98FB98", "#000000"],
    colorNames: ["Poodle Pink", "Turquoise", "Flame Red", "Sunny Yellow", "Mint", "Black"],
    fashion: [
      { label: "Poodle Skirt", desc: "Full circle skirts with a poodle appliqué — the ultimate teen fashion statement" },
      { label: "Greaser Style", desc: "Leather jackets, slicked-back hair, and tight jeans — the rebel look" },
      { label: "New Look Silhouette", desc: "Christian Dior's hourglass 'New Look' — nipped waist and full skirt" },
      { label: "Cat Eye Sunglasses", desc: "Upswept cat-eye frames were the must-have accessory of every 50s woman" },
    ],
    inventions: [
      { name: "Color TV", year: 1953, desc: "RCA launched commercial color television in 1953, changing entertainment forever" },
      { name: "Credit Card", year: 1950, desc: "The Diners Club card — the world's first credit card — launched in 1950" },
      { name: "DNA Double Helix", year: 1953, desc: "Watson and Crick discovered the double helix structure of DNA in 1953" },
    ],
    culture: ["Birth of rock & roll", "Drive-in movies & diners", "Cold War anxiety", "TV becomes king", "Baby Boom"],
  },
  "1960s": {
    emoji: "☮️",
    tagline: "Peace, Love & Revolution",
    colors: ["#FF6347", "#4169E1", "#FFFF00", "#FF69B4", "#90EE90", "#FF8C00"],
    colorNames: ["Tomato Red", "Royal Blue", "Psychedelic Yellow", "Hot Pink", "Lime", "Tangerine"],
    fashion: [
      { label: "Mini Skirt", desc: "Mary Quant's mini skirt became the ultimate symbol of 1960s liberation" },
      { label: "Mod Fashion", desc: "Bold geometric prints and space-age silhouettes — London's Mod scene" },
      { label: "Hippie Style", desc: "Tie-dye, bell-bottoms, flower crowns — the counterculture look of the late 60s" },
      { label: "Go-Go Boots", desc: "White knee-high boots worn with mini skirts — a defining 60s accessory" },
    ],
    inventions: [
      { name: "Internet (ARPANET)", year: 1969, desc: "The first message was sent over ARPANET on October 29, 1969" },
      { name: "Moon Landing", year: 1969, desc: "Apollo 11 landed on the moon on July 20, 1969 — one giant leap for mankind" },
      { name: "Cassette Tape", year: 1962, desc: "Philips introduced the compact cassette in 1962, changing portable music" },
    ],
    culture: ["Civil Rights Movement", "Woodstock & hippies", "Space Race", "British Invasion", "Vietnam War protests"],
  },
  "1970s": {
    emoji: "🕺",
    tagline: "Disco Fever & Cultural Revolution",
    colors: ["#FF8C00", "#8B4513", "#DAA520", "#CD853F", "#F4A460", "#556B2F"],
    colorNames: ["Burnt Orange", "Earth Brown", "Harvest Gold", "Peru", "Sandy Brown", "Olive"],
    fashion: [
      { label: "Bell-Bottom Jeans", desc: "Flared jeans so wide they swept the floor — the ultimate 70s staple" },
      { label: "Leisure Suits", desc: "Matching polyester jacket and pants in bold colors — peak 70s style" },
      { label: "Platform Shoes", desc: "Thick-soled platform shoes in wild colors — worn by men and women alike" },
      { label: "Afro Hairstyle", desc: "The Afro became a powerful symbol of Black pride and cultural identity" },
    ],
    inventions: [
      { name: "Personal Computer", year: 1975, desc: "The Altair 8800 launched the personal computer revolution in 1975" },
      { name: "VHS Tape", year: 1976, desc: "JVC's VHS format won the format war and brought movies home" },
      { name: "Post-it Note", year: 1974, desc: "Spencer Silver's 'failed' adhesive became the beloved Post-it Note" },
    ],
    culture: ["Disco & Studio 54", "Watergate scandal", "Star Wars premiere", "Punk rock emerges", "Women's liberation"],
  },
  "1980s": {
    emoji: "🕹️",
    tagline: "Neon, Arcade & MTV",
    colors: ["#FF1493", "#00FFFF", "#FFFF00", "#FF4500", "#7B68EE", "#00FF7F"],
    colorNames: ["Hot Pink", "Neon Cyan", "Electric Yellow", "Neon Orange", "Medium Slate", "Spring Green"],
    fashion: [
      { label: "Power Suits", desc: "Shoulder-padded blazers for women entering the corporate world in force" },
      { label: "Acid Wash Denim", desc: "Chemical-treated jeans with a bleached, faded pattern — everywhere in the 80s" },
      { label: "Leg Warmers", desc: "Inspired by Flashdance — colorful leg warmers worn over leggings or jeans" },
      { label: "Jheri Curl", desc: "Glossy, loosely curled hairstyle popularized by Michael Jackson and others" },
    ],
    inventions: [
      { name: "World Wide Web", year: 1989, desc: "Tim Berners-Lee proposed the World Wide Web in 1989 at CERN" },
      { name: "DNA Fingerprinting", year: 1984, desc: "Alec Jeffreys developed DNA fingerprinting, revolutionizing forensics" },
      { name: "Nintendo Game Boy", year: 1989, desc: "The Game Boy launched portable gaming as a mainstream phenomenon" },
    ],
    culture: ["MTV launches", "Reagan era", "Cold War ends", "Crack epidemic", "Hip hop born in the Bronx"],
  },
  "1990s": {
    emoji: "📼",
    tagline: "Grunge, Hip Hop & the Internet Age",
    colors: ["#228B22", "#8B0000", "#4169E1", "#FF8C00", "#9400D3", "#2F4F4F"],
    colorNames: ["Grunge Green", "Doc Marten Red", "Denim Blue", "Nickelodeon Orange", "Purple", "Flannel"],
    fashion: [
      { label: "Flannel Shirts", desc: "Oversized flannel shirts tied around the waist — the Seattle grunge look" },
      { label: "JNCO Jeans", desc: "Impossibly wide-leg jeans with a 50-inch hem — peak 90s teen fashion" },
      { label: "Slip Dresses", desc: "Satin slip dresses worn over t-shirts — the minimalist 90s aesthetic" },
      { label: "Bucket Hats", desc: "Hip hop's signature accessory — LL Cool J and TLC made them iconic" },
    ],
    inventions: [
      { name: "Google", year: 1998, desc: "Larry Page and Sergey Brin founded Google in a Stanford garage in 1998" },
      { name: "DVD", year: 1995, desc: "The DVD replaced VHS and transformed how we watched movies at home" },
      { name: "WiFi", year: 1997, desc: "The IEEE 802.11 standard established wireless internet connectivity" },
    ],
    culture: ["Grunge & Nirvana", "Hip hop goes mainstream", "Dot-com boom", "The Fresh Prince", "Y2K panic"],
  },
  "2000s": {
    emoji: "💿",
    tagline: "Y2K, iPods & Social Media Dawn",
    colors: ["#87CEEB", "#FFB6C1", "#98FB98", "#DDA0DD", "#F0E68C", "#B0C4DE"],
    colorNames: ["Sky Blue", "Pastel Pink", "Mint Green", "Plum", "Khaki", "Light Steel Blue"],
    fashion: [
      { label: "Von Dutch Trucker Hats", desc: "The must-have Y2K accessory — worn tilted to the side by every celeb" },
      { label: "Velour Tracksuits", desc: "Juicy Couture's velour tracksuits were worn by Paris Hilton and copied by everyone" },
      { label: "Low-Rise Jeans", desc: "Hip-hugging low-rise jeans paired with visible underwear — the 2000s look" },
      { label: "Emo Style", desc: "Side-swept bangs, band tees, skinny jeans — Hot Topic was a religion" },
    ],
    inventions: [
      { name: "iPod", year: 2001, desc: "Apple's iPod put 1,000 songs in your pocket and killed the CD Walkman" },
      { name: "Facebook", year: 2004, desc: "Mark Zuckerberg launched Facebook from his Harvard dorm room in 2004" },
      { name: "YouTube", year: 2005, desc: "YouTube launched in 2005 and forever changed how we share video" },
    ],
    culture: ["9/11 changed everything", "Reality TV explosion", "MySpace era", "Iraq War", "iPhone launched in 2007"],
  },
  "2010s": {
    emoji: "📱",
    tagline: "Social Media, Streaming & Selfie Culture",
    colors: ["#1DA1F2", "#E1306C", "#405DE6", "#FF0000", "#25D366", "#FF6600"],
    colorNames: ["Twitter Blue", "Instagram Pink", "Facebook Purple", "YouTube Red", "WhatsApp Green", "Reddit Orange"],
    fashion: [
      { label: "Normcore", desc: "Deliberately plain, unremarkable clothing — the anti-fashion fashion statement" },
      { label: "Athleisure", desc: "Yoga pants and hoodies worn everywhere — Lululemon became a lifestyle brand" },
      { label: "Man Bun", desc: "Long hair tied in a bun on top of men's heads — polarizing and everywhere" },
      { label: "Hypebeast Streetwear", desc: "Supreme drops, Yeezys, and Off-White — limited-edition hype culture" },
    ],
    inventions: [
      { name: "iPad", year: 2010, desc: "Apple's iPad created the tablet category and changed personal computing" },
      { name: "Instagram", year: 2010, desc: "Instagram launched in 2010 and turned everyone into a photographer" },
      { name: "Snapchat", year: 2011, desc: "Disappearing photos created a new language for teen communication" },
    ],
    culture: ["Black Lives Matter", "Brexit & Trump", "Streaming kills cable", "Meme economy", "Climate strikes"],
  },
  "2020s": {
    emoji: "🌐",
    tagline: "Pandemic, AI & the New Normal",
    colors: ["#00D2FF", "#7B2FBE", "#FF6B35", "#2ECC71", "#E74C3C", "#3498DB"],
    colorNames: ["Digital Cyan", "Crypto Purple", "Metaverse Orange", "Green Recovery", "Alert Red", "Zoom Blue"],
    fashion: [
      { label: "Cottagecore", desc: "Floral dresses and prairie skirts — cozy pandemic escapism fashion" },
      { label: "Oversized Everything", desc: "Baggy silhouettes dominated — comfort became the new luxury" },
      { label: "Y2K Revival", desc: "Everything from the early 2000s came back — low-rise jeans, baby tees, chunky shoes" },
      { label: "Gorpcore", desc: "Outdoor/hiking gear worn as everyday fashion — Patagonia and Arc'teryx as status symbols" },
    ],
    inventions: [
      { name: "ChatGPT / AI", year: 2022, desc: "OpenAI launched ChatGPT in 2022, triggering a global AI revolution" },
      { name: "mRNA Vaccines", year: 2020, desc: "Pfizer and Moderna's COVID vaccines validated decades of mRNA research" },
      { name: "James Webb Telescope", year: 2021, desc: "The James Webb Space Telescope revealed the deepest images of the universe ever captured" },
    ],
    culture: ["COVID-19 pandemic", "Work from home becomes normal", "NFT craze", "Ukraine war", "AI takes over everything"],
  },
};

const DECADE_KEYS = Object.keys(DECADES_DATA);

export default function DecadeVisuals() {
  const [selected, setSelected] = useState("1980s");
  const [activeTab, setActiveTab] = useState("fashion");

  const decade = DECADES_DATA[selected];

  return (
    <div style={{ background: "#111827", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1f2937, #111827)", borderBottom: "2px solid #d4956e44", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎞️</div>
        <h1 style={{ color: "#d4956e", fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>Decade Visual Archive</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Fashion, Colors, Inventions & Culture — by decade</p>
      </div>

      {/* Decade Selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", padding: "24px 16px 0" }}>
        {DECADE_KEYS.map((d) => (
          <button
            key={d}
            onClick={() => setSelected(d)}
            style={{
              padding: "8px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13,
              border: selected === d ? "2px solid #d4956e" : "2px solid #374151",
              background: selected === d ? "#d4956e22" : "#1f2937",
              color: selected === d ? "#d4956e" : "#9ca3af",
              cursor: "pointer", transition: "all 0.2s",
            }}
          >
            {DECADES_DATA[d].emoji} {d}
          </button>
        ))}
      </div>

      {/* Decade Hero */}
      <div style={{ maxWidth: 800, margin: "24px auto 0", padding: "0 16px" }}>
        <div style={{ background: "#1f2937", borderRadius: 16, padding: "28px 24px", border: "1px solid #374151", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <span style={{ fontSize: 52 }}>{decade.emoji}</span>
            <div>
              <h2 style={{ color: "#d4956e", fontSize: 28, fontWeight: 900, margin: "0 0 4px" }}>{selected}</h2>
              <p style={{ color: "#9ca3af", margin: 0, fontStyle: "italic" }}>{decade.tagline}</p>
            </div>
          </div>

          {/* Color Palette */}
          <div>
            <p style={{ color: "#6b7280", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Decade Color Palette</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {decade.colors.map((color, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: color, border: "2px solid #374151", marginBottom: 4 }} />
                  <div style={{ fontSize: 9, color: "#6b7280", maxWidth: 44, lineHeight: 1.2 }}>{decade.colorNames[i]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["fashion", "inventions", "culture"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px", borderRadius: 99, fontWeight: 700, fontSize: 13,
                border: "none", cursor: "pointer",
                background: activeTab === tab ? "#d4956e" : "#1f2937",
                color: activeTab === tab ? "#fff" : "#9ca3af",
              }}
            >
              {tab === "fashion" ? "👗 Fashion" : tab === "inventions" ? "💡 Inventions" : "🎭 Culture"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "fashion" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            {decade.fashion.map((item, i) => (
              <div key={i} style={{ background: "#1f2937", borderRadius: 12, padding: "18px 16px", border: "1px solid #374151" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>👗</div>
                <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.label}</div>
                <div style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "inventions" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
            {decade.inventions.map((item, i) => (
              <div key={i} style={{ background: "#1f2937", borderRadius: 12, padding: "18px 16px", border: "1px solid #374151" }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>💡</div>
                <div style={{ color: "#d4956e", fontWeight: 800, fontSize: 16, marginBottom: 2 }}>{item.name}</div>
                <div style={{ color: "#6b7280", fontSize: 11, marginBottom: 8 }}>Invented {item.year}</div>
                <div style={{ color: "#9ca3af", fontSize: 12, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "culture" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {decade.culture.map((item, i) => (
              <div key={i} style={{ background: "#1f2937", borderRadius: 10, padding: "14px 18px", border: "1px solid #374151", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>🎭</span>
                <span style={{ color: "#f3f4f6", fontSize: 14, fontWeight: 600 }}>{item}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}
