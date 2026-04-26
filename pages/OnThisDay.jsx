import { useState, useEffect } from "react";
import { OnThisDay } from "@/api/entities";

const CATEGORIES = ["All", "History", "Music", "Sports", "Politics", "Science", "Film & TV", "Pop Culture", "Food & Cuisine"];
const CAT_EMOJI = { History: "🏛️", Music: "🎵", Sports: "🏆", Politics: "🗳️", Science: "🔬", "Film & TV": "🎬", "Pop Culture": "✨", "Food & Cuisine": "🍽️" };

export default function OnThisDayPage() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    OnThisDay.list({ sort: "-year", limit: 100 }).then(data => { setEvents(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? events : events.filter(e => e.category === filter);

  return (
    <div style={{ background: "#0f1117", minHeight: "100vh", color: "#f3f4f6", fontFamily: "'Georgia', serif" }}>
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 800, width: "100%", background: "#1f2937", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}>
            <img src={lightbox.photo_url} alt={lightbox.title} style={{ width: "100%", maxHeight: 500, objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
            <div style={{ padding: "24px 28px" }}>
              <div style={{ color: "#d97706", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{lightbox.date_label}</div>
              <h2 style={{ color: "#f3f4f6", fontSize: 22, fontWeight: 900, margin: "0 0 12px" }}>{lightbox.title}</h2>
              <p style={{ color: "#9ca3af", lineHeight: 1.7, margin: 0 }}>{lightbox.description}</p>
              {lightbox.source && <p style={{ color: "#6b7280", fontSize: 12, marginTop: 12 }}>Source: {lightbox.source}</p>}
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg, #1c1008, #0f1117)", borderBottom: "2px solid #d9770633", padding: "52px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>📅</div>
        <h1 style={{ color: "#d97706", fontSize: 34, fontWeight: 900, margin: "0 0 10px" }}>On This Day in History</h1>
        <p style={{ color: "#9ca3af", fontSize: 16, margin: 0 }}>Real events, real photos — across every decade</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", padding: "24px 16px 0" }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: "7px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13, border: filter === c ? "2px solid #d97706" : "2px solid #374151", background: filter === c ? "#d9770622" : "#1f2937", color: filter === c ? "#d97706" : "#9ca3af", cursor: "pointer" }}>
            {CAT_EMOJI[c] || "🌐"} {c}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {loading ? <p style={{ color: "#6b7280", gridColumn: "1/-1", textAlign: "center", padding: 60 }}>Loading...</p> :
          filtered.map(event => (
            <div key={event.id} onClick={() => setLightbox(event)} style={{ background: "#1f2937", borderRadius: 16, overflow: "hidden", border: "2px solid #374151", cursor: "zoom-in", transition: "transform 0.2s, border-color 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "#d97706"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "#374151"; }}>
              <div style={{ height: 200, overflow: "hidden", position: "relative", background: "#111827" }}>
                <img src={event.photo_url} alt={event.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                <div style={{ display: "none", position: "absolute", inset: 0, alignItems: "center", justifyContent: "center", fontSize: 60 }}>🗓️</div>
                {event.is_featured && <div style={{ position: "absolute", top: 10, right: 10, background: "#d97706", color: "#000", borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 800 }}>⭐ Featured</div>}
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ color: "#d97706", fontSize: 12, fontWeight: 700 }}>{event.date_label}</span>
                  <span style={{ background: "#111827", color: "#9ca3af", borderRadius: 99, padding: "2px 10px", fontSize: 11 }}>{CAT_EMOJI[event.category]} {event.category}</span>
                </div>
                <h3 style={{ color: "#f3f4f6", fontWeight: 800, fontSize: 16, margin: "0 0 8px", lineHeight: 1.4 }}>{event.title}</h3>
                <p style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.6, margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{event.description}</p>
                <div style={{ marginTop: 12, color: "#6b7280", fontSize: 11 }}>🔍 Click to expand</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
