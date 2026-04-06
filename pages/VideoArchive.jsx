import { useState } from "react";

const DECADES = [
  { label: "1920s", emoji: "🎷", query: "1920s jazz roaring twenties history" },
  { label: "1930s", emoji: "🎬", query: "1930s Great Depression swing music history" },
  { label: "1940s", emoji: "✈️", query: "1940s WWII big band music history" },
  { label: "1950s", emoji: "🎸", query: "1950s rock roll Elvis nostalgia" },
  { label: "1960s", emoji: "✌️", query: "1960s Beatles Motown civil rights" },
  { label: "1970s", emoji: "🕺", query: "1970s disco funk soul history" },
  { label: "1980s", emoji: "🕹️", query: "1980s MTV pop culture arcade nostalgia" },
  { label: "1990s", emoji: "📼", query: "1990s grunge hip hop nostalgia" },
  { label: "2000s", emoji: "💿", query: "2000s Y2K pop culture nostalgia" },
  { label: "2010s", emoji: "📱", query: "2010s social media culture history" },
];

export default function VideoArchive() {
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? DECADES : DECADES.filter((d) => d.label === filter);

  return (
    <div style={{ background: "#111827", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "linear-gradient(135deg, #1f2937, #111827)", borderBottom: "2px solid #eab30844", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>📺</div>
        <h1 style={{ color: "#eab308", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>eDecades Video Archive</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Decade-tagged YouTube content — nostalgia, culture and history</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", padding: "24px 16px" }}>
        <button onClick={() => setFilter("All")} style={{ padding: "7px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13, border: filter === "All" ? "2px solid #eab308" : "2px solid #374151", background: filter === "All" ? "#eab30822" : "#1f2937", color: filter === "All" ? "#eab308" : "#9ca3af", cursor: "pointer" }}>All</button>
        {DECADES.map((d) => (
          <button key={d.label} onClick={() => setFilter(d.label)} style={{ padding: "7px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13, border: filter === d.label ? "2px solid #eab308" : "2px solid #374151", background: filter === d.label ? "#eab30822" : "#1f2937", color: filter === d.label ? "#eab308" : "#9ca3af", cursor: "pointer" }}>
            {d.emoji} {d.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {visible.map((d) => (
          <a key={d.label} href={"https://www.youtube.com/results?search_query=" + encodeURIComponent(d.query)} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{ background: "#1f2937", border: "2px solid #374151", borderRadius: 14, padding: "28px 16px", textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 44, marginBottom: 10 }}>{d.emoji}</div>
              <div style={{ color: "#eab308", fontWeight: 900, fontSize: 20, marginBottom: 6 }}>{d.label}</div>
              <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 12 }}>Nostalgia, culture & history</div>
              <div style={{ background: "#111827", color: "#eab308", border: "1px solid #374151", borderRadius: 99, padding: "4px 14px", fontSize: 12, fontWeight: 700, display: "inline-block" }}>▶ Watch on YouTube</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
