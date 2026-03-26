import { useState, useEffect, useRef } from "react";
import { Decade, Post, UserProfile, Group, NotableFigure, ForumTopic, HistoricalEvent, Artifact, MediaContent } from "@/api/entities";

const CATEGORIES = ["All", "Decades", "Posts", "Members", "Groups", "Notable Figures", "Historical Events", "Artifacts", "Media", "Forums"];

const typeColors = {
  "Decade":           { bg: "#FFD700", color: "#000" },
  "Post":             { bg: "#6366f1", color: "#fff" },
  "Member":           { bg: "#10B981", color: "#fff" },
  "Group":            { bg: "#F59E0B", color: "#000" },
  "Notable Figure":   { bg: "#EC4899", color: "#fff" },
  "Historical Event": { bg: "#EF4444", color: "#fff" },
  "Artifact":         { bg: "#8B5CF6", color: "#fff" },
  "Media":            { bg: "#06B6D4", color: "#fff" },
  "Forum":            { bg: "#84CC16", color: "#000" },
};

const typeIcons = {
  "Decade":           "🗓️",
  "Post":             "📝",
  "Member":           "👤",
  "Group":            "👥",
  "Notable Figure":   "⭐",
  "Historical Event": "📅",
  "Artifact":         "🏺",
  "Media":            "🎬",
  "Forum":            "💬",
};

export default function eDecadesSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState(null);
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const doSearch = async (q) => {
    if (!q || q.trim().length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    const term = q.toLowerCase().trim();
    const all = [];

    try {
      const [decades, posts, profiles, groups, figures, topics, events, artifacts, media] = await Promise.all([
        Decade.list(),
        Post.list(),
        UserProfile.list(),
        Group.list(),
        NotableFigure.list(),
        ForumTopic.list(),
        HistoricalEvent.list(),
        Artifact.list(),
        MediaContent.list(),
      ]);

      for (const d of decades) {
        const text = `${d.name} ${d.tagline} ${d.description} ${(d.cultural_trends||[]).join(" ")} ${(d.key_events||[]).join(" ")}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Decade", id: d.id, title: d.name, subtitle: d.tagline || `${d.year_start}–${d.year_end}`, image: d.cover_image });
      }
      for (const p of posts) {
        const text = `${p.content} ${p.decade_name} ${(p.tags||[]).join(" ")} ${p.author_name}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Post", id: p.id, title: (p.content||"").slice(0,100) + ((p.content||"").length > 100 ? "..." : ""), subtitle: `by ${p.author_name} · ${p.decade_name}`, image: p.author_avatar });
      }
      for (const u of profiles) {
        const text = `${u.display_name} ${u.username} ${u.bio} ${u.favorite_decade} ${u.location}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Member", id: u.id, title: u.display_name || u.username, subtitle: `@${u.username}${u.favorite_decade ? " · " + u.favorite_decade : ""}`, image: u.avatar_url });
      }
      for (const g of groups) {
        const text = `${g.name} ${g.description} ${g.decade_name} ${g.category}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Group", id: g.id, title: g.name, subtitle: `${g.decade_name} · ${g.member_count||0} members`, image: g.avatar });
      }
      for (const f of figures) {
        const text = `${f.name} ${f.title} ${f.description} ${f.decade_name} ${f.category} ${f.notable_work}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Notable Figure", id: f.id, title: f.name, subtitle: `${f.title||f.category} · ${f.decade_name}`, image: f.image_url });
      }
      for (const t of topics) {
        const text = `${t.title} ${t.content} ${(t.tags||[]).join(" ")} ${t.author_name} ${t.forum_name}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Forum", id: t.id, title: t.title, subtitle: `${t.forum_name} · by ${t.author_name}` });
      }
      for (const e of events) {
        const text = `${e.title} ${e.description} ${e.decade_name} ${e.category} ${e.location_name}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Historical Event", id: e.id, title: e.title, subtitle: `${e.year||""} · ${e.decade_name}`, image: e.image_url });
      }
      for (const a of artifacts) {
        const text = `${a.title} ${a.description} ${a.decade_name} ${a.category}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Artifact", id: a.id, title: a.title, subtitle: `${a.category} · ${a.decade_name}`, image: (a.images||[])[0] });
      }
      for (const m of media) {
        const text = `${m.title} ${m.description} ${m.decade_name} ${m.category} ${m.creator_name}`.toLowerCase();
        if (text.includes(term)) all.push({ type: "Media", id: m.id, title: m.title, subtitle: `${m.content_type||m.category} · ${m.decade_name}`, image: m.thumbnail_url });
      }
    } catch (e) {
      console.error(e);
    }

    const order = ["Decade","Notable Figure","Historical Event","Member","Post","Group","Forum","Artifact","Media"];
    all.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
    setResults(all);
    setLoading(false);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 400);
  };

  const filtered = activeCategory === "All"
    ? results
    : results.filter(r => {
        const map = {
          "Decades": "Decade", "Posts": "Post", "Members": "Member", "Groups": "Group",
          "Notable Figures": "Notable Figure", "Historical Events": "Historical Event",
          "Artifacts": "Artifact", "Media": "Media", "Forums": "Forum"
        };
        return r.type === map[activeCategory];
      });

  const categoryCounts = {};
  for (const cat of CATEGORIES.slice(1)) {
    const map = {
      "Decades": "Decade", "Posts": "Post", "Members": "Member", "Groups": "Group",
      "Notable Figures": "Notable Figure", "Historical Events": "Historical Event",
      "Artifacts": "Artifact", "Media": "Media", "Forums": "Forum"
    };
    categoryCounts[cat] = results.filter(r => r.type === map[cat]).length;
  }

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #0a0a14 0%, #0d0a1f 50%, #0a140a 100%)",
      minHeight: "100vh", color: "#fff", padding: "0"
    }}>
      {/* HEADER */}
      <div style={{
        background: "rgba(10,10,20,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,215,0,0.1)",
        padding: "20px 32px", display: "flex", alignItems: "center", gap: 16,
        position: "sticky", top: 0, zIndex: 100
      }}>
        <a href="https://benevolent-decade-dive-now.base44.app" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "linear-gradient(135deg, #FFD700, #FF8C00)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 0 20px rgba(255,215,0,0.3)"
          }}>⏰</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#FFD700", letterSpacing: -0.5 }}>eDecades</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>SEARCH</div>
          </div>
        </a>

        {/* SEARCH BAR */}
        <div style={{ flex: 1, maxWidth: 700, position: "relative" }}>
          <div style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none" }}>🔍</div>
          <input
            ref={inputRef}
            value={query}
            onChange={handleInput}
            placeholder="Search decades, people, events, posts, music, culture..."
            style={{
              width: "100%", padding: "14px 48px 14px 48px",
              background: "rgba(255,255,255,0.07)",
              border: "1.5px solid rgba(255,215,0,0.25)",
              borderRadius: 50, color: "#fff", fontSize: 15,
              outline: "none", boxSizing: "border-box",
              transition: "all 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(255,215,0,0.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,215,0,0.25)"}
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults([]); setSearched(false); inputRef.current?.focus(); }}
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 18 }}>✕</button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>

        {/* Hero state — no search yet */}
        {!searched && !loading && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: 72, marginBottom: 24 }}>🔍</div>
            <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 16, letterSpacing: -1 }}>
              Search <span style={{ color: "#FFD700" }}>eDecades</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, maxWidth: 500, margin: "0 auto 48px" }}>
              Explore decades, discover notable figures, find members, posts, historical events, artifacts, and more.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {["1980s music", "Michael Jackson", "fashion trends", "hip hop", "World War II", "The Beatles", "moon landing", "disco era"].map(s => (
                <button key={s} onClick={() => { setQuery(s); doSearch(s); }}
                  style={{
                    background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.2)",
                    color: "#FFD700", padding: "8px 18px", borderRadius: 30, fontSize: 13,
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                  onMouseOver={e => { e.target.style.background = "rgba(255,215,0,0.2)"; e.target.style.borderColor = "rgba(255,215,0,0.5)"; }}
                  onMouseOut={e => { e.target.style.background = "rgba(255,215,0,0.1)"; e.target.style.borderColor = "rgba(255,215,0,0.2)"; }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: 48, marginBottom: 16, animation: "spin 1s linear infinite" }}>⏳</div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>Searching across all of eDecades...</p>
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            {/* Stats bar */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
                {results.length > 0 ? (
                  <><span style={{ color: "#FFD700", fontWeight: 700 }}>{results.length}</span> results for "<span style={{ color: "#fff" }}>{query}</span>"</>
                ) : (
                  <>No results for "<span style={{ color: "#fff" }}>{query}</span>"</>
                )}
              </div>
            </div>

            {/* Category filter pills */}
            {results.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
                {CATEGORIES.map(cat => {
                  const count = cat === "All" ? results.length : (categoryCounts[cat] || 0);
                  if (cat !== "All" && count === 0) return null;
                  const isActive = activeCategory === cat;
                  return (
                    <button key={cat} onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: "7px 16px", borderRadius: 30, fontSize: 13, cursor: "pointer",
                        border: isActive ? "1.5px solid #FFD700" : "1.5px solid rgba(255,255,255,0.12)",
                        background: isActive ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.05)",
                        color: isActive ? "#FFD700" : "rgba(255,255,255,0.6)",
                        fontWeight: isActive ? 700 : 400,
                        transition: "all 0.2s"
                      }}>
                      {cat} {count > 0 && <span style={{ opacity: 0.7 }}>({count})</span>}
                    </button>
                  );
                })}
              </div>
            )}

            {/* No results */}
            {results.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <div style={{ fontSize: 56, marginBottom: 16 }}>🕰️</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>Nothing found for "{query}"</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>Try a different term — a decade, person, song, or era.</p>
              </div>
            )}

            {/* Result cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map((item, i) => {
                const colors = typeColors[item.type] || { bg: "#6366f1", color: "#fff" };
                const icon = typeIcons[item.type] || "•";
                const isHovered = hoveredItem === i;
                return (
                  <div key={`${item.type}-${item.id}`}
                    onMouseOver={() => setHoveredItem(i)}
                    onMouseOut={() => setHoveredItem(null)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      background: isHovered ? "rgba(255,215,0,0.06)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${isHovered ? "rgba(255,215,0,0.2)" : "rgba(255,255,255,0.08)"}`,
                      borderRadius: 14, padding: "16px 20px",
                      cursor: "pointer", transition: "all 0.2s",
                      transform: isHovered ? "translateX(4px)" : "none"
                    }}>
                    {/* Avatar / icon */}
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, flexShrink: 0, overflow: "hidden",
                      background: item.image ? "transparent" : colors.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 22
                    }}>
                      {item.image
                        ? <img src={item.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display="none"; e.target.parentNode.innerText = icon; }} />
                        : icon}
                    </div>

                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.subtitle}</div>
                    </div>

                    {/* Type badge */}
                    <div style={{
                      padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                      background: colors.bg, color: colors.color, flexShrink: 0, letterSpacing: 0.3
                    }}>
                      {item.type}
                    </div>

                    {/* Arrow */}
                    <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 18, flexShrink: 0 }}>›</div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
