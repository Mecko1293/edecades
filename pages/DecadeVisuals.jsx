import { useState, useEffect, useRef } from "react";

const DECADES = [
  {
    id: "1920s", emoji: "🎷", label: "1920s", tagline: "The Roaring Twenties",
    bg: "#252018", accent: "#d4956e",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/3aac4ecbe_generated_image.png", filter: "sepia(0.5) contrast(1.1) brightness(0.9)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/2cfb60a04_generated_image.png", filter: "sepia(0.6) contrast(1.2) brightness(0.85)" },
    ],
    colors: ["#d4956e","#000000","#C0A060","#8B0000","#F5DEB3","#2F2F2F"],
    colorNames: ["Gatsby Gold","Jet Black","Champagne","Art Deco Red","Cream","Charcoal"],
    fashion: ["Flapper dresses with fringe","Cloche hats over bobbed hair","Men's pinstripe suits","Art Deco geometric jewelry"],
    fashionIcons: ["💃","🎩","👔","💎"],
    inventions: ["Television (1927)","Penicillin (1928)","Talking Pictures / Jazz Singer (1927)"],
    inventionIcons: ["📺","💊","🎬"],
    culture: ["Charleston dance craze","Speakeasies & bootleg gin","Jazz music everywhere","Women's suffrage","Rise of cinema"],
  },
  {
    id: "1930s", emoji: "🎬", label: "1930s", tagline: "The Golden Age of Hollywood",
    bg: "#1e2220", accent: "#b8a88a",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/2f50fddef_generated_image.png", filter: "grayscale(0.6) sepia(0.4) contrast(1.15) brightness(0.85)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/b121ce670_generated_image.png", filter: "grayscale(0.7) contrast(1.2) brightness(0.8)" },
    ],
    colors: ["#708090","#2F4F4F","#8B7355","#C0A060","#F5F5DC","#4A4A4A"],
    colorNames: ["Steel Gray","Depression Green","Khaki","Champagne","Ivory","Shadow"],
    fashion: ["Bias-cut silk gowns","Wide-leg high-waisted trousers","Fedora hats","Platform shoes"],
    fashionIcons: ["👗","👖","🎩","👠"],
    inventions: ["Nylon (1935)","Radar (1935)","Jet Engine prototype (1937)"],
    inventionIcons: ["🧵","📡","✈️"],
    culture: ["The Great Depression","The New Deal","Big Band & Swing","Hollywood's golden era","Radio becomes king"],
  },
  {
    id: "1940s", emoji: "✈️", label: "1940s", tagline: "War Years & Victory",
    bg: "#1a1e28", accent: "#7a9abf",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/79a85bf2d_generated_image.png", filter: "sepia(0.3) contrast(1.2) brightness(0.88) saturate(0.8)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/94a79d24b_generated_image.png", filter: "grayscale(0.4) sepia(0.25) contrast(1.15) brightness(0.9)" },
    ],
    colors: ["#8B0000","#4169E1","#F5DEB3","#228B22","#C0A060","#2F2F2F"],
    colorNames: ["Victory Red","Navy Blue","Wheat","Army Green","Brass","Blackout"],
    fashion: ["Military-structured shoulders","Rosie the Riveter overalls","Victory Rolls hairstyle","Utility clothing"],
    fashionIcons: ["🪖","👷","💪","🧥"],
    inventions: ["Atomic Bomb (1945)","Microwave Oven (1945)","ENIAC Computer (1945)"],
    inventionIcons: ["☢️","📡","🖥️"],
    culture: ["World War II","Rationing & Victory Gardens","Swing dancing","Rise of suburbia","Birth of the teenager"],
  },
  {
    id: "1950s", emoji: "🎸", label: "1950s", tagline: "Rock & Roll Is Born",
    bg: "#221c20", accent: "#d4788a",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/8d2a43235_generated_image.png", filter: "saturate(1.2) contrast(1.05) brightness(1.0) sepia(0.15)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/d13514cc1_generated_image.png", filter: "saturate(1.15) contrast(1.1) brightness(1.05) sepia(0.1)" },
    ],
    colors: ["#FF69B4","#00CED1","#FF4500","#FFFF00","#98FB98","#000000"],
    colorNames: ["Poodle Pink","Turquoise","Flame Red","Sunny Yellow","Mint","Black"],
    fashion: ["Full poodle skirts","Greaser leather jackets","New Look hourglass silhouette","Cat-eye sunglasses"],
    fashionIcons: ["🩷","🧥","👗","🕶️"],
    inventions: ["Color TV (1953)","Credit Card (1950)","DNA Double Helix (1953)"],
    inventionIcons: ["📺","💳","🧬"],
    culture: ["Birth of rock & roll","Drive-in movies & diners","Cold War anxiety","TV becomes king","Baby Boom"],
  },
  {
    id: "1960s", emoji: "☮️", label: "1960s", tagline: "Peace, Love & Revolution",
    bg: "#20201a", accent: "#c4956e",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/689802bb9_generated_image.png", filter: "saturate(1.3) contrast(1.0) brightness(1.05) hue-rotate(5deg)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/126ab7fa2_generated_image.png", filter: "saturate(1.1) contrast(1.1) brightness(0.95)" },
    ],
    colors: ["#FF6347","#4169E1","#FFFF00","#FF69B4","#90EE90","#c4784f"],
    colorNames: ["Tomato Red","Royal Blue","Psychedelic Yellow","Hot Pink","Lime","Tangerine"],
    fashion: ["Mini skirts","Mod geometric prints","Hippie tie-dye & bell-bottoms","Go-go boots"],
    fashionIcons: ["👗","🌀","🌸","👢"],
    inventions: ["ARPANET / Internet (1969)","Moon Landing Apollo 11 (1969)","Laser (1960)"],
    inventionIcons: ["🌐","🚀","💡"],
    culture: ["Civil Rights Movement","Woodstock & counterculture","British Invasion","Space Race","Assassination of JFK"],
  },
  {
    id: "1970s", emoji: "🕺", label: "1970s", tagline: "Funk, Disco & Soul",
    bg: "#201c14", accent: "#c4784f",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/cde45a114_generated_image.png", filter: "sepia(0.25) saturate(1.4) contrast(1.05) brightness(0.95)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/2b86ec236_generated_image.png", filter: "sepia(0.2) saturate(1.3) contrast(1.1) brightness(0.9)" },
    ],
    colors: ["#c4784f","#8B4513","#DAA520","#556B2F","#CD853F","#2F1B00"],
    colorNames: ["Burnt Orange","Saddle Brown","Goldenrod","Olive","Peru","Dark Chocolate"],
    fashion: ["Bell-bottom pants","Platform shoes","Mood rings","Leisure suits"],
    fashionIcons: ["👖","👡","💍","🕺"],
    inventions: ["Personal Computer (1975)","VCR (1971)","MRI Scanner (1977)"],
    inventionIcons: ["💻","📼","🏥"],
    culture: ["Disco fever","Watergate scandal","Punk rock emerges","Star Wars (1977)","Environmental movement"],
  },
  {
    id: "1980s", emoji: "🎮", label: "1980s", tagline: "Neon, Power & Pop",
    bg: "#1e1a22", accent: "#b87ac4",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/35ce5c484_generated_image.png", filter: "saturate(1.5) contrast(1.1) brightness(1.05) hue-rotate(10deg)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/8ca5dd118_generated_image.png", filter: "saturate(1.4) contrast(1.15) brightness(1.0) hue-rotate(5deg)" },
    ],
    colors: ["#FF00FF","#00FFFF","#c4784f","#FFFF00","#FF1493","#7B00FF"],
    colorNames: ["Hot Magenta","Electric Cyan","Neon Orange","Laser Yellow","Deep Pink","Ultraviolet"],
    fashion: ["Power shoulders","Leg warmers","Acid-wash jeans","Big hair & scrunchies"],
    fashionIcons: ["💼","🧦","👖","💇"],
    inventions: ["IBM PC (1981)","CD Player (1982)","DNA Fingerprinting (1984)"],
    inventionIcons: ["🖥️","💿","🔬"],
    culture: ["MTV launches","Video games boom","Cold War tension","AIDS crisis","Reaganomics"],
  },
  {
    id: "1990s", emoji: "📼", label: "1990s", tagline: "Grunge, Hip-Hop & the Web",
    bg: "#1a2018", accent: "#7aaa8a",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/f675ad260_generated_image.png", filter: "saturate(0.85) contrast(1.1) brightness(0.95) sepia(0.1)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/17bd7bc0f_generated_image.png", filter: "saturate(0.9) contrast(1.05) brightness(0.95)" },
    ],
    colors: ["#00FF7F","#8B008B","#d4956e","#1E90FF","#FF4500","#2F2F2F"],
    colorNames: ["Spring Green","Dark Magenta","Gold","Dodger Blue","Orange Red","Charcoal"],
    fashion: ["Grunge flannel shirts","Baggy jeans & Timberlands","Slip dresses","Frosted tips"],
    fashionIcons: ["🧣","👟","👗","💇"],
    inventions: ["World Wide Web (1991)","DVD (1995)","Dolly the Sheep cloned (1996)"],
    inventionIcons: ["🌐","📀","🐑"],
    culture: ["Rise of hip-hop","Grunge & Nirvana","Internet goes mainstream","Reality TV begins","Fall of the Berlin Wall"],
  },
  {
    id: "2000s", emoji: "📱", label: "2000s", tagline: "Y2K & the Digital Age",
    bg: "#181e24", accent: "#7aaac4",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/fca9d848e_generated_image.png", filter: "saturate(1.1) contrast(1.05) brightness(1.1)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/03ff95e80_generated_image.png", filter: "saturate(1.2) contrast(1.0) brightness(1.05) hue-rotate(-5deg)" },
    ],
    colors: ["#00BFFF","#FF69B4","#C0C0C0","#7B68EE","#d4956e","#000000"],
    colorNames: ["Deep Sky Blue","Pink","Silver","Medium Slate","Gold","Black"],
    fashion: ["Low-rise jeans","Von Dutch trucker hats","Juicy Couture tracksuits","Flip phones as fashion"],
    fashionIcons: ["👖","🧢","👘","📱"],
    inventions: ["iPod (2001)","Facebook (2004)","YouTube (2005)"],
    inventionIcons: ["🎵","👥","▶️"],
    culture: ["9/11 changes everything","War on Terror","Reality TV explosion","Social media birth","Harry Potter mania"],
  },
  {
    id: "2010s", emoji: "🤳", label: "2010s", tagline: "Social Media & Streaming",
    bg: "#201820", accent: "#c47aa4",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/4566400bf_generated_image.png", filter: "saturate(1.2) contrast(1.0) brightness(1.05)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/cef79f5a8_generated_image.png", filter: "saturate(1.3) contrast(1.05) brightness(1.0)" },
    ],
    colors: ["#E1306C","#833AB4","#405DE6","#FCAF45","#FD1D1D","#C13584"],
    colorNames: ["Instagram Pink","Purple","Electric Blue","Amber","Red","Magenta"],
    fashion: ["Athleisure & yoga pants","Normcore","Hypebeast sneaker culture","Man buns"],
    fashionIcons: ["🧘","👟","🧢","🪮"],
    inventions: ["iPhone revolutionizes everything","Netflix streaming (2010)","Self-driving car prototypes"],
    inventionIcons: ["📱","🎬","🚗"],
    culture: ["Black Lives Matter","#MeToo movement","Streaming kills cable","TikTok emerges","COVID-19 pandemic begins"],
  },
  {
    id: "2020s", emoji: "😷", label: "2020s", tagline: "Pandemic, Protest & Rebirth",
    bg: "#181c1e", accent: "#8ab4c4",
    images: [
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/71f625ad5_generated_image.png", filter: "saturate(1.1) contrast(1.05) brightness(1.0)" },
      { url: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/92766293b_generated_image.png", filter: "saturate(1.0) contrast(1.1) brightness(0.95)" },
    ],
    colors: ["#8ab4c4","#c4a87a","#7aaa8a","#c47aa4","#aaaaaa","#1e2530"],
    colorNames: ["Pandemic Blue","Warm Sand","Sage","Mauve","Silver","Charcoal"],
    fashion: ["Cottagecore & comfort dressing","Oversized everything","Gorpcore outdoor aesthetics","Y2K revival"],
    fashionIcons: ["🌿","🧥","🏕️","👖"],
    inventions: ["mRNA Vaccines (2020)","ChatGPT / AI revolution (2022)","James Webb Space Telescope (2021)"],
    inventionIcons: ["💉","🤖","🔭"],
    culture: ["COVID-19 pandemic","Black Lives Matter resurgence","Work from home era","TikTok dominates culture","AI goes mainstream"],
  },
];

function useImageRotator(images, intervalMs = 5000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
    setTransitioning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
        setTransitioning(false);
      }, 600);
    }, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [images]);

  return { currentIndex, transitioning };
}

export default function DecadeVisuals() {
  const [active, setActive] = useState("1980s");
  const dec = DECADES.find(d => d.id === active);
  const { currentIndex, transitioning } = useImageRotator(dec.images, 5000);
  const currentImg = dec.images[currentIndex];

  useEffect(() => {
    DECADES.forEach(d => d.images.forEach(img => {
      const el = new window.Image();
      el.src = img.url;
    }));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#1e2530", fontFamily: "'Segoe UI', sans-serif", color: "#fff" }}>

      <div style={{ textAlign: "center", padding: "48px 24px 24px" }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#d4956e", textTransform: "uppercase", marginBottom: 12 }}>eDecades Visual Archive</div>
        <h1 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 900, margin: 0, background: "linear-gradient(135deg, #d4956e, #c4784f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Decade by Decade</h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 12, fontSize: 16 }}>Colors · Fashion · Inventions · Culture</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, padding: "20px 24px" }}>
        {DECADES.map(d => (
          <button key={d.id} onClick={() => setActive(d.id)} style={{
            padding: "10px 20px", borderRadius: 50, border: "2px solid",
            borderColor: active === d.id ? dec.accent : "rgba(255,255,255,0.15)",
            background: active === d.id ? dec.accent : "transparent",
            color: active === d.id ? "#fff" : "rgba(255,255,255,0.7)",
            fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
          }}>
            {d.emoji} {d.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px 80px" }}>

        {/* HERO with rotating images */}
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", marginBottom: 20, height: 360 }}>
          <img
            key={`${dec.id}-${currentIndex}`}
            src={currentImg.url}
            alt={`${dec.label} era`}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%", objectFit: "cover",
              filter: currentImg.filter,
              opacity: transitioning ? 0 : 1,
              transition: "opacity 0.6s ease",
              zIndex: 1,
            }}
          />

          {/* Dot indicators */}
          <div style={{ position: "absolute", bottom: 82, right: 20, display: "flex", gap: 6, zIndex: 10 }}>
            {dec.images.map((_, i) => (
              <div key={i} style={{
                width: i === currentIndex ? 20 : 8, height: 8,
                borderRadius: 4, background: i === currentIndex ? dec.accent : "rgba(255,255,255,0.4)",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)", zIndex: 2, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: `linear-gradient(to top, ${dec.bg}f0, transparent)`, zIndex: 3 }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "25%", background: "linear-gradient(to bottom, #1e2530cc, transparent)", zIndex: 3 }} />

          <div style={{ position: "absolute", bottom: 28, left: 32, right: 32, zIndex: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span style={{ fontSize: 52 }}>{dec.emoji}</span>
              <div>
                <h2 style={{ fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 900, margin: "0 0 4px", color: dec.accent, textShadow: "0 2px 16px rgba(0,0,0,0.9)" }}>{dec.label}</h2>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 17, margin: 0, textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>{dec.tagline}</p>
              </div>
            </div>
          </div>

          <div style={{ position: "absolute", top: 18, right: 18, zIndex: 5, background: `${dec.accent}dd`, backdropFilter: "blur(10px)", borderRadius: 20, padding: "5px 16px", fontSize: 11, fontWeight: 800, letterSpacing: 2, color: "#fff", textTransform: "uppercase", border: `1px solid ${dec.accent}88` }}>{dec.label}</div>
        </div>

        <div style={{ borderRadius: 20, background: "#262f3d", border: `1px solid ${dec.accent}22`, padding: "26px", marginBottom: 14 }}>
          <h3 style={{ margin: "0 0 18px", color: dec.accent, fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>🎨 Signature Colors</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            {dec.colors.map((c, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 58, height: 58, borderRadius: 14, background: c, border: "2px solid rgba(255,255,255,0.1)", marginBottom: 6, boxShadow: `0 4px 14px ${c}66` }} />
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", maxWidth: 58, lineHeight: 1.3 }}>{dec.colorNames[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 20, background: "#262f3d", border: `1px solid ${dec.accent}22`, padding: "26px", marginBottom: 14 }}>
          <h3 style={{ margin: "0 0 18px", color: dec.accent, fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>👗 Fashion Highlights</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {dec.fashion.map((f, i) => (
              <div key={i} style={{ background: `${dec.accent}10`, borderRadius: 14, padding: "14px 16px", borderLeft: `3px solid ${dec.accent}`, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{dec.fashionIcons[i] || "👗"}</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.4 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 20, background: "#262f3d", border: `1px solid ${dec.accent}22`, padding: "26px", marginBottom: 14 }}>
          <h3 style={{ margin: "0 0 18px", color: dec.accent, fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>💡 Game-Changing Inventions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {dec.inventions.map((inv, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, background: `${dec.accent}08`, borderRadius: 14, padding: "14px 18px", border: `1px solid ${dec.accent}20` }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{dec.inventionIcons[i] || "💡"}</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}>{inv}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: 20, background: "#262f3d", border: `1px solid ${dec.accent}22`, padding: "26px", marginBottom: 28 }}>
          <h3 style={{ margin: "0 0 18px", color: dec.accent, fontSize: 15, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>🌍 Defining the Culture</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {dec.culture.map((c, i) => (
              <span key={i} style={{ background: `${dec.accent}18`, border: `1px solid ${dec.accent}44`, borderRadius: 50, padding: "9px 18px", fontSize: 13, color: dec.accent, fontWeight: 600 }}>{c}</span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <a href="https://benevolent-decade-dive-now.base44.app" style={{ background: `linear-gradient(135deg, ${dec.accent}, #c4784f)`, color: "#fff", padding: "14px 36px", borderRadius: 50, fontWeight: 900, fontSize: 16, textDecoration: "none", display: "inline-block", boxShadow: `0 6px 20px ${dec.accent}44` }}>← Back to eDecades</a>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 20 }}>eDecades Visual Archive · Decade by Decade</p>
        </div>
      </div>
    </div>
  );
}
