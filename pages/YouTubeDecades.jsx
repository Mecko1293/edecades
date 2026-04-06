import { useState, useEffect } from "react";

const API_KEY = "AIzaSyCP18vlyXOmSW3zxinLP5dTulfEhobyMjI";

const DECADES = [
  { label: "1920s", query: "1920s jazz roaring twenties", color: "#c9a96e" },
  { label: "1930s", query: "1930s Great Depression swing music", color: "#8b7355" },
  { label: "1940s", query: "1940s WWII big band music", color: "#6b8e6b" },
  { label: "1950s", query: "1950s rock roll Elvis nostalgia", color: "#e87b6b" },
  { label: "1960s", query: "1960s Beatles Motown history", color: "#9b6bb5" },
  { label: "1970s", query: "1970s disco funk soul", color: "#d4813a" },
  { label: "1980s", query: "1980s MTV pop culture nostalgia", color: "#e040fb" },
  { label: "1990s", query: "1990s grunge hip hop nostalgia", color: "#00bcd4" },
  { label: "2000s", query: "2000s Y2K pop culture nostalgia", color: "#4fc3f7" },
  { label: "2010s", query: "2010s social media culture", color: "#81c784" },
];

function useYouTubeVideos() {
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      const promises = DECADES.map(async (d) => {
        try {
          const url =
            "https://www.googleapis.com/youtube/v3/search" +
            "?part=snippet&type=video&maxResults=4&key=" +
            API_KEY +
            "&q=" +
            encodeURIComponent(d.query);
          const res = await fetch(url);
          const json = await res.json();
          return { label: d.label, items: Array.isArray(json.items) ? json.items : [] };
        } catch (err) {
          return { label: d.label, items: [] };
        }
      });

      const results = await Promise.all(promises);
      const map = {};
      results.forEach((r) => {
        map[r.label] = r.items;
      });
      setVideos(map);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return { videos, loading };
}

export default function YouTubeDecades() {
  const { videos, loading } = useYouTubeVideos();
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const visibleDecades = filter === "All" ? DECADES : DECADES.filter((d) => d.label === filter);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#1a1f2e", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "3rem" }}>🎬</div>
        <p style={{ color: "#d4956e", fontSize: "1.2rem", marginTop: "16px" }}>Loading decade videos...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1a1f2e", color: "#f0ece4", fontFamily: "Georgia, serif", paddingBottom: "60px" }}>

      <div style={{ background: "#2a3040", padding: "32px 20px", textAlign: "center", borderBottom: "3px solid #d4956e" }}>
        <div style={{ fontSize: "36px" }}>📺</div>
        <h1 style={{ color: "#d4956e", margin: "8px 0 4px", fontSize: "1.8rem" }}>eDecades Video Archive</h1>
        <p style={{ color: "#999", margin: 0 }}>Decade-tagged YouTube content — nostalgia, culture and history</p>
      </div>

      <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
        {["All"].concat(DECADES.map((d) => d.label)).map((lbl) => (
          <button
            key={lbl}
            onClick={() => setFilter(lbl)}
            style={{
              padding: "6px 16px",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              background: filter === lbl ? "#d4956e" : "#2a3040",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "0.85rem",
            }}
          >
            {lbl}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px" }}>
        {visibleDecades.map((d) => {
          const items = videos[d.label] || [];
          if (items.length === 0) return null;
          return (
            <div key={d.label} style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "4px", height: "24px", background: d.color, borderRadius: "3px" }} />
                <h2 style={{ margin: 0, color: d.color, fontSize: "1.3rem" }}>{d.label}</h2>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "14px" }}>
                {items.map((item) => {
                  const vid = item.id.videoId;
                  const s = item.snippet;
                  const thumbs = s.thumbnails;
                  const thumb = thumbs.high ? thumbs.high.url : thumbs.medium ? thumbs.medium.url : thumbs.default.url;
                  const title = s.title.length > 60 ? s.title.substring(0, 60) + "..." : s.title;
                  return (
                    <div
                      key={vid}
                      onClick={() => setModal({ vid: vid, title: s.title, color: d.color })}
                      style={{ background: "#252b3b", borderRadius: "10px", overflow: "hidden", cursor: "pointer", border: "1px solid #333" }}
                    >
                      <div style={{ position: "relative" }}>
                        <img src={thumb} alt="" style={{ width: "100%", height: "148px", objectFit: "cover", display: "block" }} />
                        <div style={{ position: "absolute", top: "8px", left: "8px", background: d.color, color: "#fff", fontSize: "0.7rem", fontWeight: "bold", padding: "2px 8px", borderRadius: "10px" }}>
                          {d.label}
                        </div>
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{ width: "44px", height: "44px", background: "rgba(255,0,0,0.85)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "18px" }}>
                            ▶
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: "10px" }}>
                        <p style={{ margin: "0 0 4px", fontSize: "0.85rem", color: "#eee", lineHeight: "1.3" }}>{title}</p>
                        <p style={{ margin: 0, fontSize: "0.75rem", color: "#666" }}>{s.channelTitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {modal !== null && (
        <div
          onClick={() => setModal(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999, padding: "16px" }}
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
                allowFullScreen={true}
              />
            </div>
            <div style={{ padding: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ margin: 0, color: "#f0ece4", fontSize: "0.9rem" }}>{modal.title}</p>
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
