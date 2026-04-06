import { useState } from "react";

const DECADES = [
  { label: "1920s", color: "#c9a96e", emoji: "🎷" },
  { label: "1930s", color: "#8b7355", emoji: "🎬" },
  { label: "1940s", color: "#6b8e6b", emoji: "✈️" },
  { label: "1950s", color: "#e87b6b", emoji: "🎸" },
  { label: "1960s", color: "#9b6bb5", emoji: "✌️" },
  { label: "1970s", color: "#d4813a", emoji: "🕺" },
  { label: "1980s", color: "#e040fb", emoji: "🕹️" },
  { label: "1990s", color: "#00bcd4", emoji: "📼" },
  { label: "2000s", color: "#4fc3f7", emoji: "💿" },
  { label: "2010s", color: "#81c784", emoji: "📱" },
];

export default function YouTubeDecades() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#1a1f2e", color: "#f0ece4", fontFamily: "Georgia, serif", padding: "40px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ fontSize: "40px" }}>📺</div>
        <h1 style={{ color: "#d4956e", fontSize: "2rem", margin: "8px 0" }}>eDecades Video Archive</h1>
        <p style={{ color: "#999" }}>Click a decade to watch curated YouTube videos</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px", maxWidth: "900px", margin: "0 auto 40px" }}>
        {DECADES.map((d) => (
          <a
            key={d.label}
            href={"https://www.youtube.com/results?search_query=" + encodeURIComponent(d.label + " history culture nostalgia")}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              background: "#252b3b",
              border: "2px solid " + d.color,
              borderRadius: "12px",
              padding: "24px 16px",
              textAlign: "center",
              textDecoration: "none",
              color: "#f0ece4",
              transition: "transform 0.2s",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "8px" }}>{d.emoji}</div>
            <div style={{ color: d.color, fontWeight: "bold", fontSize: "1.2rem" }}>{d.label}</div>
            <div style={{ color: "#888", fontSize: "0.8rem", marginTop: "4px" }}>Watch on YouTube →</div>
          </a>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>
          🎬 Each tile opens decade-specific content on YouTube in a new tab
        </p>
        <a
          href="https://www.youtube.com/results?search_query=decade+history+nostalgia+culture"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#d4956e", textDecoration: "none", fontWeight: "bold" }}
        >
          ▶️ Browse All Decades on YouTube →
        </a>
      </div>
    </div>
  );
}
