import { useState } from "react";

const DECADES = [
  { id: "1920s", emoji: "🎷", label: "1920s", tagline: "The Roaring Twenties", bg: "#1a0a00", accent: "#FFD700",
    colors: ["#FFD700","#000000","#C0A060","#8B0000","#F5DEB3","#2F2F2F"],
    colorNames: ["Gatsby Gold","Jet Black","Champagne","Art Deco Red","Cream","Charcoal"],
    fashion: ["Flapper dresses with fringe","Cloche hats over bobbed hair","Men's pinstripe suits","Art Deco geometric jewelry"],
    inventions: ["Television (1927)","Penicillin (1928)","Talking Pictures / Jazz Singer (1927)"],
    culture: ["Charleston dance craze","Speakeasies & bootleg gin","Jazz music everywhere","Women's suffrage","Rise of cinema"],
  },
  { id: "1930s", emoji: "🎬", label: "1930s", tagline: "The Golden Age of Hollywood", bg: "#0a0f0f", accent: "#C0A060",
    colors: ["#708090","#2F4F4F","#8B7355","#C0A060","#F5F5DC","#4A4A4A"],
    colorNames: ["Steel Gray","Depression Green","Khaki","Champagne","Ivory","Shadow"],
    fashion: ["Bias-cut silk gowns","Wide-leg high-waisted trousers","Fedora hats","Platform shoes"],
    inventions: ["Nylon (1935)","Radar (1935)","Jet Engine prototype (1937)"],
    culture: ["The Great Depression","The New Deal","Big Band & Swing","Hollywood's golden era","Radio becomes king"],
  },
  { id: "1940s", emoji: "✈️", label: "1940s", tagline: "War Years & Victory", bg: "#0a0005", accent: "#4169E1",
    colors: ["#8B0000","#4169E1","#F5DEB3","#228B22","#C0A060","#2F2F2F"],
    colorNames: ["Victory Red","Navy Blue","Wheat","Army Green","Brass","Blackout"],
    fashion: ["Military-structured shoulders","Rosie the Riveter overalls","Victory Rolls hairstyle","Utility clothing"],
    inventions: ["Atomic Bomb (1945)","Microwave Oven (1945)","ENIAC Computer (1945)"],
    culture: ["World War II","Rationing & Victory Gardens","Swing dancing","Rise of suburbia","Birth of the teenager"],
  },
  { id: "1950s", emoji: "🎸", label: "1950s", tagline: "Rock & Roll Is Born", bg: "#0a000f", accent: "#FF69B4",
    colors: ["#FF69B4","#00CED1","#FF4500","#FFFF00","#98FB98","#000000"],
    colorNames: ["Poodle Pink","Turquoise","Flame Red","Sunny Yellow","Mint","Black"],
    fashion: ["Full poodle skirts","Greaser leather jackets","New Look hourglass silhouette","Cat-eye sunglasses"],
    inventions: ["Color TV (1953)","Credit Card (1950)","DNA Double Helix (1953)"],
    culture: ["Birth of rock & roll","Drive-in movies & diners","Cold War anxiety","TV becomes king","Baby Boom"],
  },
  { id: "1960s", emoji: "☮️", label: "1960s", tagline: "Peace, Love & Revolution", bg: "#00080f", accent: "#FF6347",
    colors: ["#FF6347","#4169E1","#FFFF00","#FF69B4","#90EE90","#FF8C00"],
    colorNames: ["Tomato Red","Royal Blue","Psychedelic Yellow","Hot Pink","Lime","Tangerine"],
    fashion: ["Mini skirts","Mod geometric prints","Hippie tie-dye & bell-bottoms","Go-go boots"],
    inventions: ["ARPANET / Internet (1969)","Moon Landing Apollo 11 (1969)","Laser (1960)"],
    culture: ["Civil Rights Movement","Woodstock & counterculture","British Invasion","Space Race","Assassination of JFK"],
  },
  { id: "1970s", emoji: "🕺", label: "1970s", tagline: "Funk, Disco & Soul", bg: "#0f0800", accent: "#FF8C00",
    colors: ["#FF8C00","#8B4513","#DAA520","#556B2F","#CD853F","#2F1B00"],
    colorNames: ["Burnt Orange","Saddle Brown","Goldenrod","Olive","Peru","Dark Chocolate"],
    fashion: ["Bell-bottom pants","Platform shoes","Mood rings","Leisure suits"],
    inventions: ["Personal Computer (1975)","VCR (1971)","MRI Scanner (1977)"],
    culture: ["Disco fever","Watergate scandal","Punk rock emerges","Star Wars (1977)","Environmental movement"],
  },
  { id: "1980s", emoji: "🎮", label: "1980s", tagline: "Neon, Power & Pop", bg: "#0f000f", accent: "#FF00FF",
    colors: ["#FF00FF","#00FFFF","#FF6600","#FFFF00","#FF1493","#7B00FF"],
    colorNames: ["Hot Magenta","Electric Cyan","Neon Orange","Laser Yellow","Deep Pink","Ultraviolet"],
    fashion: ["Power shoulders","Leg warmers","Acid-wash jeans","Big hair & scrunchies"],
    inventions: ["IBM PC (1981)","CD Player (1982)","DNA Fingerprinting (1984)"],
    culture: ["MTV launches","Video games boom","Cold War tension","AIDS crisis","Reaganomics"],
  },
  { id: "1990s", emoji: "📼", label: "1990s", tagline: "Grunge, Hip-Hop & the Web", bg: "#000f05", accent: "#00FF7F",
    colors: ["#00FF7F","#8B008B","#FFD700","#1E90FF","#FF4500","#2F2F2F"],
    colorNames: ["Spring Green","Dark Magenta","Gold","Dodger Blue","Orange Red","Charcoal"],
    fashion: ["Grunge flannel shirts","Baggy jeans & Timberlands","Slip dresses","Frosted tips"],
    inventions: ["World Wide Web (1991)","DVD (1995)","Dolly the Sheep cloned (1996)"],
    culture: ["Rise of hip-hop","Grunge & Nirvana","Internet goes mainstream","Reality TV begins","Fall of the Berlin Wall"],
  },
  { id: "2000s", emoji: "📱", label: "2000s", tagline: "Y2K & the Digital Age", bg: "#000a0f", accent: "#00BFFF",
    colors: ["#00BFFF","#FF69B4","#C0C0C0","#7B68EE","#FFD700","#000000"],
    colorNames: ["Deep Sky Blue","Pink","Silver","Medium Slate","Gold","Black"],
    fashion: ["Low-rise jeans","Von Dutch trucker hats","Juicy Couture tracksuits","Flip phones as fashion"],
    inventions: ["iPod (2001)","Facebook (2004)","YouTube (2005)"],
    culture: ["9/11 changes everything","War on Terror","Reality TV explosion","Social media birth","Harry Potter mania"],
  },
  { id: "2010s", emoji: "🤳", label: "2010s", tagline: "Social Media & Streaming", bg: "#0f080a", accent: "#E1306C",
    colors: ["#E1306C","#833AB4","#405DE6","#FCAF45","#FD1D1D","#C13584"],
    colorNames: ["Instagram Pink","Purple","Electric Blue","Amber","Red","Magenta"],
    fashion: ["Athleisure & yoga pants","Normcore","Hypebeast sneaker culture","Man buns"],
    inventions: ["iPhone revolutionizes everything","Netflix streaming (2010)","Self-driving car prototypes"],
    culture: ["Black Lives Matter","#MeToo movement","Streaming kills cable","TikTok emerges","COVID-19 pandemic begins"],
  },
];

export default function DecadeVisuals() {
  const [active, setActive] = useState("1980s");
  const dec = DECADES.find(d => d.id === active);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", fontFamily: "'Segoe UI', sans-serif", color: "#fff" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", padding: "48px 24px 24px", background: "linear-gradient(180deg, #000 0%, transparent 100%)" }}>
        <div style={{ fontSize: 13, letterSpacing: 4, color: "#FFD700", textTransform: "uppercase", marginBottom: 12 }}>eDecades Visual Archive</div>
        <h1 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 900, margin: 0, background: "linear-gradient(135deg, #FFD700, #FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Decade by Decade
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 12, fontSize: 16 }}>Colors · Fashion · Inventions · Culture</p>
      </div>

      {/* DECADE SELECTOR */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, padding: "20px 24px" }}>
        {DECADES.map(d => (
          <button key={d.id} onClick={() => setActive(d.id)} style={{
            padding: "10px 20px", borderRadius: 50, border: "2px solid",
            borderColor: active === d.id ? dec.accent : "rgba(255,255,255,0.15)",
            background: active === d.id ? dec.accent : "transparent",
            color: active === d.id ? "#000" : "#fff",
            fontWeight: 700, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
          }}>
            {d.emoji} {d.label}
          </button>
        ))}
      </div>

      {/* MAIN CARD */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px 60px" }}>

        {/* HERO */}
        <div style={{ borderRadius: 24, background: `linear-gradient(135deg, ${dec.bg}, #111)`, border: `1px solid ${dec.accent}33`, padding: "40px 32px", marginBottom: 24, textAlign: "center" }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>{dec.emoji}</div>
          <h2 style={{ fontSize: "clamp(24px, 5vw, 42px)", fontWeight: 900, margin: "0 0 8px", color: dec.accent }}>{dec.label}</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, margin: 0 }}>{dec.tagline}</p>
        </div>

        {/* COLOR PALETTE */}
        <div style={{ borderRadius: 20, background: "#111", border: "1px solid rgba(255,255,255,0.08)", padding: "28px", marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 20px", color: dec.accent, fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>🎨 Signature Colors</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {dec.colors.map((c, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, background: c, border: "2px solid rgba(255,255,255,0.1)", marginBottom: 6 }} />
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", maxWidth: 60 }}>{dec.colorNames[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FASHION */}
        <div style={{ borderRadius: 20, background: "#111", border: "1px solid rgba(255,255,255,0.08)", padding: "28px", marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 20px", color: dec.accent, fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>👗 Fashion Highlights</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {dec.fashion.map((f, i) => (
              <li key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px", borderLeft: `3px solid ${dec.accent}`, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* INVENTIONS */}
        <div style={{ borderRadius: 20, background: "#111", border: "1px solid rgba(255,255,255,0.08)", padding: "28px", marginBottom: 20 }}>
          <h3 style={{ margin: "0 0 20px", color: dec.accent, fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>💡 Game-Changing Inventions</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {dec.inventions.map((inv, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 16px" }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 15 }}>{inv}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CULTURE */}
        <div style={{ borderRadius: 20, background: "#111", border: "1px solid rgba(255,255,255,0.08)", padding: "28px", marginBottom: 32 }}>
          <h3 style={{ margin: "0 0 20px", color: dec.accent, fontSize: 18, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2 }}>🌍 Defining the Culture</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {dec.culture.map((c, i) => (
              <span key={i} style={{ background: `${dec.accent}22`, border: `1px solid ${dec.accent}55`, borderRadius: 50, padding: "8px 16px", fontSize: 13, color: dec.accent }}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{ textAlign: "center" }}>
          <a href="https://benevolent-decade-dive-now.base44.app" style={{
            background: `linear-gradient(135deg, #FFD700, #FF8C00)`,
            color: "#000", padding: "14px 32px", borderRadius: 50,
            fontWeight: 900, fontSize: 16, textDecoration: "none", display: "inline-block"
          }}>
            ← Back to eDecades
          </a>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12, marginTop: 20 }}>
            eDecades Visual Archive · Decade by Decade
          </p>
        </div>

      </div>
    </div>
  );
}
