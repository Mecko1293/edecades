import { useState, useEffect, useRef } from "react";
import { Decade, Post, UserProfile, Group, NotableFigure, ForumTopic, HistoricalEvent, Artifact, MediaContent } from "@/api/entities";

const CATEGORIES = ["All", "Decades", "Posts", "Members", "Groups", "Notable Figures", "Historical Events", "Artifacts", "Media", "Forums", "Wikipedia"];

const typeColors = {
  "Decade":           { bg: "#d4956e", color: "#000" },
  "Post":             { bg: "#6366f1", color: "#fff" },
  "Member":           { bg: "#10B981", color: "#fff" },
  "Group":            { bg: "#F59E0B", color: "#000" },
  "Notable Figure":   { bg: "#EC4899", color: "#fff" },
  "Historical Event": { bg: "#EF4444", color: "#fff" },
  "Artifact":         { bg: "#8B5CF6", color: "#fff" },
  "Media":            { bg: "#06B6D4", color: "#fff" },
  "Forum":            { bg: "#84CC16", color: "#000" },
  "Wikipedia":        { bg: "#E8E8E8", color: "#000" },
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
  "Wikipedia":        "📖",
};

async function fetchWikipediaResults(query) {
  try {
    // Search Wikipedia for matching articles
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srlimit=6&format=json&origin=*`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const hits = searchData?.query?.search || [];

    if (hits.length === 0) return [];

    // Get summaries + thumbnails for top results
    const pageIds = hits.map(h => h.pageid).join("|");
    const summaryUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageIds}&prop=extracts|pageimages&exintro=true&explaintext=true&pithumbsize=200&format=json&origin=*`;
    const summaryRes = await fetch(summaryUrl);
    const summaryData = await summaryRes.json();
    const pages = summaryData?.query?.pages || {};

    return hits.map(hit => {
      const page = pages[hit.pageid] || {};
      const extract = (page.extract || hit.snippet.replace(/<[^>]+>/g, "") || "").slice(0, 180);
      return {
        type: "Wikipedia",
        id: `wiki_${hit.pageid}`,
        title: hit.title,
        subtitle: extract + (extract.length >= 180 ? "..." : ""),
        image: page.thumbnail?.source || null,
        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(hit.title.replace(/ /g, "_"))}`,
      };
    });
  } catch (e) {
    console.error("Wikipedia fetch failed:", e);
    return [];
  }
}

export default function eDecadesSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [wikiResults, setWikiResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wikiLoading, setWikiLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const debounceRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.title = "Search — eDecades";
  }, []);

  const doSearch = async (q) => {
    if (!q || q.trim().length < 2) {
      setResults([]);
      setWikiResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setWikiLoading(true);
    setSearched(true);
    const term = q.toLowerCase().trim();
    const all = [];

    // --- eDecades entities search ---
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

    // --- Wikipedia fallback (always runs in parallel) ---
    try {
      const wiki = await fetchWikipediaResults(q);
      setWikiResults(wiki);
    } catch (e) {
      setWikiResults([]);
    }
    setWikiLoading(false);
  };

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 400);
  };

  const allResults = [...results, ...wikiResults];

  const filtered = activeCategory === "All"
    ? allResults
    : activeCategory === "Wikipedia"
    ? wikiResults
    : results.filter(r => {
        const map = {
          "Decades": "Decade", "Posts": "Post", "Members": "Member", "Groups": "Group",
          "Notable Figures": "Notable Figure", "Historical Events": "Historical Event",
          "Artifacts": "Artifact", "Media": "Media", "Forums": "Forum"
        };
        return r.type === map[activeCategory];
      });

  const categoryCounts = {};
  const catMap = {
    "Decades": "Decade", "Posts": "Post", "Members": "Member", "Groups": "Group",
    "Notable Figures": "Notable Figure", "Historical Events": "Historical Event",
    "Artifacts": "Artifact", "Media": "Media", "Forums": "Forum"
  };
  for (const cat of CATEGORIES.slice(1)) {
    if (cat === "Wikipedia") {
      categoryCounts[cat] = wikiResults.length;
    } else {
      categoryCounts[cat] = results.filter(r => r.type === catMap[cat]).length;
    }
  }

  const isLoading = loading || wikiLoading;

  return (
    <div style={{
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      background: "linear-gradient(135deg, #0a0a14 0%, #0d0a1f 50%, #0a140a 100%)",
      minHeight: "100vh", color: "#fff", padding: "0"
    }}>
      {/* HEADER */}
      <div style={{
        background: "rgba(10,10,20,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212,149,110,0.1)",
        padding: "16px 24px", display: "flex", alignItems: "center", gap: 16,
        position: "sticky", top: 0, zIndex: 100
      }}>
        <a href="https://benevolent-decade-dive-now.base44.app" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: "linear-gradient(135deg, #d4956e, #c4784f)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 0 20px rgba(212,149,110,0.3)"
          }}>⏰</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#d4956e", letterSpacing: -0.5 }}>eDecades</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>SEARCH</div>
          </div>
        </a>

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
              border: "1.5px solid rgba(212,149,110,0.25)",
              borderRadius: 50, color: "#fff", fontSize: 15,
              outline: "none", boxSizing: "border-box",
              transition: "all 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(212,149,110,0.6)"}
            onBlur={e => e.target.style.borderColor = "rgba(212,149,110,0.25)"}
          />
          {query && (
            <button onClick={() => { setQuery(""); setResults([]); setWikiResults([]); setSearched(false); inputRef.current?.focus(); }}
              style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 18 }}>✕</button>
          )}
        </div>

        <a href="https://benevolent-decade-dive-now.base44.app" style={{
          flexShrink: 0, background: "rgba(212,149,110,0.12)",
          border: "1px solid rgba(212,149,110,0.3)", color: "#d4956e",
          padding: "9px 18px", borderRadius: 30, fontSize: 13, fontWeight: 600,
          textDecoration: "none", whiteSpace: "nowrap"
        }}>← Back to eDecades</a>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>

        {/* Hero state */}
        {!searched && !isLoading && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <div style={{ fontSize: 72, marginBottom: 24 }}>🔍</div>
            <h1 style={{ fontSize: 36, fontWeight: 900, marginBottom: 12 }}>Search Everything</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, marginBottom: 40 }}>
              Explore eDecades content + Wikipedia results — all in one search.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 600, margin: "0 auto" }}>
              {["Michael Jackson", "1980s fashion", "Moon Landing", "Disco era", "Hip-Hop history", "The Beatles", "Cold War", "Elvis Presley"].map(s => (
                <button key={s} onClick={() => { setQuery(s); doSearch(s); }}
                  style={{ background: "rgba(212,149,110,0.08)", border: "1px solid rgba(212,149,110,0.2)", color: "#d4956e", padding: "8px 18px", borderRadius: 30, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div style={{ textAlign: "center", padding: "60px 24px" }}>
            <div style={{ fontSize: 48, marginBottom: 16, animation: "spin 1s linear infinite", display: "inline-block" }}>⏳</div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 16 }}>Searching eDecades + Wikipedia...</p>
          </div>
        )}

        {/* Results */}
        {searched && !isLoading && (
          <>
            {/* Category tabs */}
            <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 24, scrollbarWidth: "none" }}>
              {CATEGORIES.map(cat => {
                const count = cat === "All" ? allResults.length : categoryCounts[cat] || 0;
                const isWiki = cat === "Wikipedia";
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                    flexShrink: 0,
                    padding: "8px 16px", borderRadius: 30, fontSize: 13, fontWeight: 700, cursor: "pointer",
                    border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.12)",
                    background: activeCategory === cat
                      ? isWiki ? "linear-gradient(135deg, #E8E8E8, #bbb)" : "linear-gradient(135deg, #d4956e, #c4784f)"
                      : "rgba(255,255,255,0.05)",
                    color: activeCategory === cat ? (isWiki ? "#000" : "#000") : "rgba(255,255,255,0.6)",
                    transition: "all 0.2s",
                  }}>
                    {isWiki ? "📖 " : ""}{cat} {count > 0 ? `(${count})` : ""}
                  </button>
                );
              })}
            </div>

            {/* No results */}
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🤷</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, fontWeight: 600 }}>No results found for "{query}"</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 14, marginTop: 8 }}>Try a different search term</p>
              </div>
            )}

            {/* Wikipedia banner (shown in All view when wiki results exist) */}
            {activeCategory === "All" && wikiResults.length > 0 && results.length === 0 && (
              <div style={{
                background: "rgba(232,232,232,0.07)", border: "1px solid rgba(232,232,232,0.15)",
                borderRadius: 12, padding: "12px 18px", marginBottom: 20,
                display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.5)"
              }}>
                <span style={{ fontSize: 20 }}>📖</span>
                <span>No eDecades content found — showing <strong style={{ color: "#E8E8E8" }}>Wikipedia results</strong> below.</span>
              </div>
            )}

            {/* Results grid */}
            <div style={{ display: "grid", gap: 12 }}>
              {filtered.map((item) => {
                const tc = typeColors[item.type] || { bg: "#666", color: "#fff" };
                const icon = typeIcons[item.type] || "•";
                const isWiki = item.type === "Wikipedia";

                return (
                  <div key={item.id}
                    onClick={() => isWiki && item.url ? window.open(item.url, "_blank") : null}
                    style={{
                      background: isWiki ? "rgba(232,232,232,0.05)" : "rgba(255,255,255,0.04)",
                      border: isWiki ? "1px solid rgba(232,232,232,0.15)" : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 16, padding: "16px 20px",
                      display: "flex", alignItems: "center", gap: 16,
                      cursor: isWiki ? "pointer" : "default",
                      transition: "all 0.2s",
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = isWiki ? "rgba(232,232,232,0.1)" : "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = isWiki ? "rgba(232,232,232,0.3)" : "rgba(212,149,110,0.2)"; }}
                    onMouseOut={e => { e.currentTarget.style.background = isWiki ? "rgba(232,232,232,0.05)" : "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = isWiki ? "rgba(232,232,232,0.15)" : "rgba(255,255,255,0.08)"; }}
                  >
                    {/* Thumbnail */}
                    {item.image ? (
                      <img src={item.image} alt="" style={{ width: 52, height: 52, borderRadius: 10, objectFit: "cover", flexShrink: 0, border: "1px solid rgba(255,255,255,0.1)" }} />
                    ) : (
                      <div style={{
                        width: 52, height: 52, borderRadius: 10, flexShrink: 0,
                        background: isWiki ? "rgba(232,232,232,0.1)" : "rgba(212,149,110,0.08)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                      }}>{icon}</div>
                    )}

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{
                          background: tc.bg, color: tc.color,
                          padding: "2px 10px", borderRadius: 30, fontSize: 11, fontWeight: 800,
                          flexShrink: 0
                        }}>{icon} {item.type}</span>
                        {isWiki && (
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>↗ Opens Wikipedia</span>
                        )}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.subtitle}
                      </div>
                    </div>

                    {isWiki && (
                      <div style={{ flexShrink: 0, color: "rgba(255,255,255,0.25)", fontSize: 20 }}>→</div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Wikipedia attribution */}
            {wikiResults.length > 0 && (activeCategory === "All" || activeCategory === "Wikipedia") && (
              <div style={{ textAlign: "center", marginTop: 32, color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
                📖 Wikipedia results provided by the{" "}
                <a href="https://www.mediawiki.org/wiki/API:Main_page" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Wikipedia API
                </a>
                {" "}· Content licensed under CC BY-SA
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
