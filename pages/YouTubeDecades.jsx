import { useState, useEffect } from "react";

const API_KEY = "AIzaSyCP18vlyXOmSW3zxinLP5dTulfEhobyMjI";

const DECADES = [
  { label: "1920s", query: "1920s jazz roaring twenties history", color: "#c9a96e" },
  { label: "1930s", query: "1930s Great Depression swing music", color: "#8b7355" },
  { label: "1940s", query: "1940s WWII big band music history", color: "#6b8e6b" },
  { label: "1950s", query: "1950s rock and roll Elvis nostalgia", color: "#e87b6b" },
  { label: "1960s", query: "1960s Beatles Motown civil rights", color: "#9b6bb5" },
  { label: "1970s", query: "1970s disco funk soul history", color: "#d4813a" },
  { label: "1980s", query: "1980s MTV pop culture arcade nostalgia", color: "#e040fb" },
  { label: "1990s", query: "1990s grunge hip hop nostalgia", color: "#00bcd4" },
  { label: "2000s", query: "2000s Y2K pop culture nostalgia", color: "#4fc3f7" },
  { label: "2010s", query: "2010s social media culture history", color: "#81c784" },
];

export default function YouTubeDecades() {
  const [allVideos, setAllVideos] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeDecade, setActiveDecade] = useState("All");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    setLoading(true);
    const results = {};
    for (let i = 0; i < DECADES.length; i++) {
      const { label, query } = DECADES[i];
      try {
        const resp = await fetch(
          "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
            encodeURIComponent(query) +
            "&type=video&maxResults=4&key=" +
            API_KEY
        );
        const json = await resp.json();
        results[label] = json.items || [];
      } catch (e) {
        results[label] = [];
      }
    }
    setAllVideos(results);
    setLoading(false);
  }

  const visibleDecades =
    activeDecade === "All"
      ? DECADES
      : DECADES.filter((d) => d.label === activeDecade);

  return (
    <div style={{ minHeight: "100vh", background: "#1a1f2e", color: "#f0ece4", fontFamily: "Georgia, serif" }}>

      {/* HEADER */}
      <div style={{ background: "#2a3040", padding: "32px 20px", textAlign: "center", borderBottom: "3px solid #d4956e" }}>
        <div style={{ fontSize: "36px" }}>📺</div>
        <h1 style={{ color: "#d4956e", margin: "8px 0 4px", fontSize: "1.8rem", letterSpacing: "2px" }}>
          eDecades Video Archive
        </h1>
        <p style={{ color: "#999", margin: 0, fontSize: "0.95rem" }}>
          Decade-tagged YouTube content — nostalgia, culture & history
        </p>
      </div>

      {/* FILTER BAR */}
      <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", maxWidth: "1100px", margin: "0 auto" }}>
        <button
          onClick={() => setActiveDecade("All")}
          style={{
            padding: "6px 16px", borderRadius: "20px", border: "none", cursor: "pointer",
            background: activeDecade === "All" ? "#d4956e" : "#2a3040",
            color: activeDecade === "All" ? "#fff" : "#bbb", fontWeight: "bold", fontSize: "0.85rem",
          }}
        >
          All
        </button>
        {DECADES.map((d) => (
          <button
            key={d.label}
            onClick={() => setActiveDecade(d.label)}
            style={{
              padding: "6px 16px", borderRadius: "20px", border: "none", cursor: "pointer",
              background: activeDecade === d.label ? d.color : "#2a3040",
              color: activeDecade === d.label ? "#fff" : "#bbb", fontWeight: "bold", fontSize: "0.85rem",
            }}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px 60px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#d4956e" }}>
            <div style={{ fontSize: "3rem" }}>🎬</div>
            <p style={{ fontSize: "1.1rem", marginTop: "12px" }}>Loading decade videos...</p>
          </div>
        ) : (
          visibleDecades.map(({ label, color }) => {
            const items = allVideos[label] || [];
            if (items.length === 0) return null;
            return (
              <div key={label} style={{ marginBottom: "44px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <div style={{ width: "4px", height: "26px", background: color, borderRadius: "3px" }} />
                  <h2 style={{ margin: 0, color: color, fontSize: "1.3rem", letterSpacing: "1px" }}>{label}</h2>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" }}>
                  {items.map((item) => {
                    const vid = item.id.videoId;
                    const snip = item.snippet;
                    const thumb = snip.thumbnails.high
                      ? snip.thumbnails.high.url
                      : snip.thumbnails.medium
                      ? snip.thumbnails.medium.url
                      : snip.thumbnails.default.url;
                    return (
                      <div
                        key={vid}
                        onClick={() => setModal({ vid, title: snip.title, color })}
                        style={{ background: "#252b3b", borderRadius: "10px", overflow: "hidden", cursor: "pointer", border: "1px solid #333" }}
                      >
                        <div style={{ position: "relative" }}>
                          <img src={thumb} alt={snip.title} style={{ width: "100%", height: "150px", objectFit: "cover", display: "block" }} />
                          <div style={{ position: "absolute", top: "8px", left: "8px", background: color, color: "#fff", fontSize: "0.7rem", fontWeight: "bold", padding: "2px 8px", borderRadius: "10px" }}>
                            {label}
                          </div>
                          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ width: "44px", height: "44px", background: "rgba(255,0,0,0.8)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "16px" }}>
                              ▶
                            </div>
                          </div>
                        </div>
                        <div style={{ padding: "10px" }}>
                          <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#eee", lineHeight: "1.3", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                            {snip.title}
                          </p>
                          <p style={{ margin: 0, fontSize: "0.75rem", color: "#666" }}>{snip.channelTitle}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "16px" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: "780px", background: "#1a1f2e", borderRadius: "12px", overflow: "hidden", border: "2px solid " + modal.color }}
          >
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={"https://www.youtube.com/embed/" + modal.vid + "?autoplay=1"}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <div style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ margin: 0, color: "#f0ece4", fontSize: "0.9rem", fontWeight: "bold" }}>{modal.title}</p>
              <button
                onClick={() => setModal(null)}
                style={{ background: "transparent", border: "1px solid #555", color: "#aaa", padding: "5px 12px", borderRadius: "6px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
