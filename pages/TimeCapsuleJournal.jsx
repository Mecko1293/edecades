import { useState, useEffect } from "react";
import { TimeCapsule } from "@/api/entities";

const DECADES = ["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s","2020s"];
const DECADE_EMOJIS = {"1920s":"🎷","1930s":"🎬","1940s":"✈️","1950s":"🎸","1960s":"✌️","1970s":"🕺","1980s":"🕹️","1990s":"📼","2000s":"💿","2010s":"📱","2020s":"🦠"};
const MOODS = ["Nostalgic","Inspired","Curious","Emotional","Joyful","Reflective"];
const MOOD_EMOJI = {"Nostalgic":"🌅","Inspired":"⚡","Curious":"🔍","Emotional":"💙","Joyful":"😄","Reflective":"🪞"};

export default function TimeCapsuleJournal() {
  const [capsules, setCapsules] = useState([]);
  const [screen, setScreen] = useState("browse"); // browse | create | view
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ title: "", decade: "1980s", author_name: "", author_email: "", reflection: "", mood: "Nostalgic", is_public: true, photo_urls: [], favorite_content: [] });
  const [photoUrl, setPhotoUrl] = useState("");
  const [favContent, setFavContent] = useState("");

  useEffect(() => {
    TimeCapsule.list({ sort: "-created_date", limit: 100 }).then(data => { setCapsules(data.filter(c => c.is_public)); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const save = async () => {
    if (!form.title || !form.reflection || !form.author_name) { alert("Please fill in title, name, and your reflection."); return; }
    setSaving(true);
    try {
      const record = await TimeCapsule.create({ ...form, likes: 0 });
      if (form.is_public) setCapsules(prev => [record, ...prev]);
      setScreen("browse");
      setForm({ title: "", decade: "1980s", author_name: "", author_email: "", reflection: "", mood: "Nostalgic", is_public: true, photo_urls: [], favorite_content: [] });
    } catch (e) { alert("Failed to save. Please try again."); }
    setSaving(false);
  };

  const addPhoto = () => { if (photoUrl.trim()) { setForm(f => ({ ...f, photo_urls: [...(f.photo_urls || []), photoUrl.trim()] })); setPhotoUrl(""); } };
  const addFav = () => { if (favContent.trim()) { setForm(f => ({ ...f, favorite_content: [...(f.favorite_content || []), favContent.trim()] })); setFavContent(""); } };
  const handleLike = async (cap) => {
    await TimeCapsule.update(cap.id, { likes: (cap.likes || 0) + 1 });
    setCapsules(prev => prev.map(c => c.id === cap.id ? { ...c, likes: (c.likes || 0) + 1 } : c));
  };

  const filtered = filter === "All" ? capsules : capsules.filter(c => c.decade === filter);

  if (screen === "create") return (
    <div style={{ background: "#0c0f14", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        <button onClick={() => setScreen("browse")} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14, marginBottom: 28 }}>← Back</button>
        <h1 style={{ color: "#a78bfa", fontSize: 28, fontWeight: 900, marginBottom: 6 }}>📦 Create a Time Capsule</h1>
        <p style={{ color: "#9ca3af", marginBottom: 32 }}>Capture your reflections, memories, and favorite era-specific content.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Capsule Title *</label>
            <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Growing Up in the 1980s" style={{ width: "100%", background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15, boxSizing: "border-box" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Decade</label>
              <select value={form.decade} onChange={e => setForm(f => ({ ...f, decade: e.target.value }))} style={{ width: "100%", background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15 }}>
                {DECADES.map(d => <option key={d} value={d}>{DECADE_EMOJIS[d]} {d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Mood</label>
              <select value={form.mood} onChange={e => setForm(f => ({ ...f, mood: e.target.value }))} style={{ width: "100%", background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15 }}>
                {MOODS.map(m => <option key={m} value={m}>{MOOD_EMOJI[m]} {m}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Your Name *</label>
              <input value={form.author_name} onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))} placeholder="Your name" style={{ width: "100%", background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15, boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Email (optional)</label>
              <input value={form.author_email} onChange={e => setForm(f => ({ ...f, author_email: e.target.value }))} placeholder="For private tracking" style={{ width: "100%", background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15, boxSizing: "border-box" }} />
            </div>
          </div>

          <div>
            <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Your Reflection *</label>
            <textarea value={form.reflection} onChange={e => setForm(f => ({ ...f, reflection: e.target.value }))} placeholder="Write your personal memories, reflections, or connection to this era..." rows={6} style={{ width: "100%", background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15, resize: "vertical", boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
          </div>

          <div>
            <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Add Photo URLs</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} placeholder="https://..." style={{ flex: 1, background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "10px 12px", color: "#f3f4f6", fontSize: 14 }} />
              <button onClick={addPhoto} style={{ background: "#a78bfa", border: "none", borderRadius: 8, padding: "10px 16px", color: "#000", fontWeight: 700, cursor: "pointer" }}>+ Add</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(form.photo_urls || []).map((url, i) => <img key={i} src={url} alt="" onClick={() => setLightbox(url)} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, cursor: "zoom-in", border: "2px solid #374151" }} onError={e => e.target.style.display = "none"} />)}
            </div>
          </div>

          <div>
            <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Favorite Era Content (songs, films, events)</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input value={favContent} onChange={e => setFavContent(e.target.value)} placeholder="e.g. Thriller by Michael Jackson" style={{ flex: 1, background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "10px 12px", color: "#f3f4f6", fontSize: 14 }} />
              <button onClick={addFav} style={{ background: "#a78bfa", border: "none", borderRadius: 8, padding: "10px 16px", color: "#000", fontWeight: 700, cursor: "pointer" }}>+ Add</button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {(form.favorite_content || []).map((f, i) => <span key={i} style={{ background: "#1f2937", border: "1px solid #a78bfa44", color: "#a78bfa", borderRadius: 99, padding: "4px 12px", fontSize: 12 }}>⭐ {f}</span>)}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <input type="checkbox" id="public" checked={form.is_public} onChange={e => setForm(f => ({ ...f, is_public: e.target.checked }))} style={{ width: 16, height: 16 }} />
            <label htmlFor="public" style={{ color: "#9ca3af", fontSize: 14, cursor: "pointer" }}>Make this capsule public (visible to all visitors)</label>
          </div>

          <button onClick={save} disabled={saving} style={{ background: saving ? "#374151" : "#a78bfa", border: "none", borderRadius: 12, padding: "14px 0", color: saving ? "#6b7280" : "#000", fontWeight: 900, fontSize: 16, cursor: saving ? "default" : "pointer", marginTop: 8 }}>
            {saving ? "Sealing your time capsule..." : "📦 Seal & Save Time Capsule"}
          </button>
        </div>
      </div>
      {lightbox && <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}><img src={lightbox} alt="" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 16 }} /></div>}
    </div>
  );

  if (screen === "view" && selected) return (
    <div style={{ background: "#0c0f14", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>
        <button onClick={() => setScreen("browse")} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14, marginBottom: 28 }}>← Back to All Capsules</button>
        <div style={{ background: "#1f2937", borderRadius: 20, overflow: "hidden", border: "2px solid #a78bfa44" }}>
          <div style={{ background: "linear-gradient(135deg, #2e1065, #1e1030)", padding: "32px 28px", borderBottom: "1px solid #374151" }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{DECADE_EMOJIS[selected.decade]}</div>
            <h1 style={{ color: "#a78bfa", fontWeight: 900, fontSize: 26, margin: "0 0 6px" }}>{selected.title}</h1>
            <p style={{ color: "#9ca3af", fontSize: 14, margin: "0 0 10px" }}>by {selected.author_name} · {selected.decade} · {MOOD_EMOJI[selected.mood]} {selected.mood}</p>
          </div>
          <div style={{ padding: "28px" }}>
            <p style={{ color: "#d1d5db", lineHeight: 1.9, fontSize: 16, whiteSpace: "pre-wrap" }}>{selected.reflection}</p>
            {(selected.photo_urls || []).length > 0 && (
              <div style={{ marginTop: 24 }}>
                <p style={{ color: "#6b7280", fontSize: 12, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Photos</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {selected.photo_urls.map((url, i) => <img key={i} src={url} alt="" onClick={() => setLightbox(url)} style={{ width: 140, height: 100, objectFit: "cover", borderRadius: 10, cursor: "zoom-in", border: "2px solid #374151" }} onError={e => e.target.style.display = "none"} />)}
                </div>
              </div>
            )}
            {(selected.favorite_content || []).length > 0 && (
              <div style={{ marginTop: 24 }}>
                <p style={{ color: "#6b7280", fontSize: 12, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>Favorite Era Content</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {selected.favorite_content.map((f, i) => <span key={i} style={{ background: "#111827", border: "1px solid #a78bfa44", color: "#a78bfa", borderRadius: 99, padding: "5px 14px", fontSize: 13 }}>⭐ {f}</span>)}
                </div>
              </div>
            )}
            <button onClick={() => handleLike(selected)} style={{ marginTop: 24, background: "none", border: "2px solid #374151", borderRadius: 99, padding: "8px 20px", color: "#9ca3af", cursor: "pointer", fontSize: 14 }}>❤️ {selected.likes || 0} likes</button>
          </div>
        </div>
      </div>
      {lightbox && <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", cursor: "zoom-out" }}><img src={lightbox} alt="" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 16 }} /></div>}
    </div>
  );

  return (
    <div style={{ background: "#0c0f14", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "linear-gradient(135deg, #1e1030, #0c0f14)", borderBottom: "2px solid #a78bfa33", padding: "50px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>📦</div>
        <h1 style={{ color: "#a78bfa", fontSize: 32, fontWeight: 900, margin: "0 0 10px" }}>Time Capsule Journals</h1>
        <p style={{ color: "#9ca3af", fontSize: 15, margin: "0 0 24px" }}>Write personal reflections for any decade — preserved forever</p>
        <button onClick={() => setScreen("create")} style={{ background: "#a78bfa", border: "none", color: "#000", borderRadius: 99, padding: "12px 32px", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>📦 Create Your Time Capsule</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", padding: "24px 16px 0" }}>
        <button onClick={() => setFilter("All")} style={{ padding: "7px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13, border: filter === "All" ? "2px solid #a78bfa" : "2px solid #374151", background: filter === "All" ? "#a78bfa22" : "#1f2937", color: filter === "All" ? "#a78bfa" : "#9ca3af", cursor: "pointer" }}>All</button>
        {DECADES.map(d => <button key={d} onClick={() => setFilter(d)} style={{ padding: "7px 16px", borderRadius: 99, fontWeight: 700, fontSize: 13, border: filter === d ? "2px solid #a78bfa" : "2px solid #374151", background: filter === d ? "#a78bfa22" : "#1f2937", color: filter === d ? "#a78bfa" : "#9ca3af", cursor: "pointer" }}>{DECADE_EMOJIS[d]} {d}</button>)}
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 16px 60px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
        {loading ? <p style={{ color: "#6b7280", gridColumn: "1/-1", textAlign: "center", padding: 60 }}>Loading capsules...</p> :
          filtered.length === 0 ? <p style={{ color: "#6b7280", gridColumn: "1/-1", textAlign: "center", padding: 60 }}>No capsules yet for this decade — be the first!</p> :
          filtered.map(cap => (
            <div key={cap.id} onClick={() => { setSelected(cap); setScreen("view"); }} style={{ background: "#1f2937", borderRadius: 16, padding: "20px", border: "2px solid #374151", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#a78bfa"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.transform = ""; }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ fontSize: 28 }}>{DECADE_EMOJIS[cap.decade]}</span>
                <span style={{ background: "#111827", color: "#a78bfa", borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 700 }}>{MOOD_EMOJI[cap.mood]} {cap.mood}</span>
              </div>
              <h3 style={{ color: "#f3f4f6", fontWeight: 800, fontSize: 17, margin: "0 0 6px" }}>{cap.title}</h3>
              <p style={{ color: "#9ca3af", fontSize: 13, margin: "0 0 12px" }}>by {cap.author_name} · {cap.decade}</p>
              <p style={{ color: "#6b7280", fontSize: 13, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", margin: 0 }}>{cap.reflection}</p>
              <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#6b7280", fontSize: 12 }}>❤️ {cap.likes || 0}</span>
                <span style={{ color: "#a78bfa", fontSize: 12, fontWeight: 700 }}>Read →</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
