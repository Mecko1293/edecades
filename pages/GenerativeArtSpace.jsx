import { useState, useEffect } from "react";
import { GenerativeArt } from "@/api/entities";
import { createClient } from "@/api/client";

const client = createClient();

const DECADES = ["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s"];
const DECADE_EMOJIS = {"1920s":"🎷","1930s":"🎬","1940s":"✈️","1950s":"🎸","1960s":"✌️","1970s":"🕺","1980s":"🕹️","1990s":"📼","2000s":"💿","2010s":"📱"};
const EXAMPLE_PROMPTS = [
  "A busy street in 1950s Chicago with neon diner signs and classic cars",
  "A jazz club in 1920s Harlem with smoky atmosphere and elegant dancers",
  "Woodstock 1969 — crowds gathered in a muddy field, concert stage in distance",
  "A 1980s arcade in suburban America, kids playing Pac-Man and Donkey Kong",
  "A 1940s factory floor with Rosie the Riveter workers building war equipment",
  "Times Square on New Year's Eve 1999, Y2K countdown crowds",
];

export default function GenerativeArtSpace() {
  const [gallery, setGallery] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [decade, setDecade] = useState("1950s");
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [pinTo, setPinTo] = useState("Gallery");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    GenerativeArt.list({ sort: "-created_date", limit: 50 }).then(data => { setGallery(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const generate = async () => {
    if (!prompt.trim()) return;
    setGenerating(true);
    setGenerated(null);
    try {
      const fullPrompt = `Historical photography style, ${decade} era: ${prompt}. Vintage aesthetic, historically accurate details, cinematic composition, documentary photograph feel.`;
      const res = await client.ai.generateImage({ prompt: fullPrompt });
      setGenerated(res?.url || null);
    } catch (e) {
      alert("Image generation failed. Try again.");
    }
    setGenerating(false);
  };

  const saveToGallery = async () => {
    if (!generated) return;
    setSaving(true);
    try {
      const record = await GenerativeArt.create({
        title: title || `${decade} — ${prompt.slice(0, 40)}...`,
        prompt,
        decade,
        image_url: generated,
        author_name: authorName || "Anonymous",
        pinned_to: pinTo,
        likes: 0,
        is_featured: false,
      });
      setGallery(prev => [record, ...prev]);
      setGenerated(null);
      setPrompt("");
      setTitle("");
    } catch (e) {}
    setSaving(false);
  };

  const handleLike = async (art) => {
    await GenerativeArt.update(art.id, { likes: (art.likes || 0) + 1 });
    setGallery(prev => prev.map(a => a.id === art.id ? { ...a, likes: (a.likes || 0) + 1 } : a));
  };

  const filteredGallery = filter === "All" ? gallery : gallery.filter(a => a.decade === filter || a.pinned_to === filter);

  return (
    <div style={{ background: "#0c0f14", minHeight: "100vh", color: "#f3f4f6", fontFamily: "'Georgia', serif" }}>
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 900, width: "100%" }}>
            <img src={lightbox.image_url} alt={lightbox.title} style={{ width: "100%", maxHeight: "75vh", objectFit: "contain", borderRadius: 16, boxShadow: "0 40px 80px rgba(0,0,0,0.9)" }} />
            <div style={{ background: "#1f2937", borderRadius: "0 0 16px 16px", padding: "16px 20px" }}>
              <div style={{ fontWeight: 800, color: "#f3f4f6", fontSize: 16 }}>{lightbox.title}</div>
              <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 4 }}>"{lightbox.prompt}"</div>
              <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>📌 {lightbox.pinned_to} · {lightbox.decade} · by {lightbox.author_name}</div>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg, #0f1a2e, #0c0f14)", borderBottom: "2px solid #3b82f644", padding: "50px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🎨</div>
        <h1 style={{ color: "#60a5fa", fontSize: 32, fontWeight: 900, margin: "0 0 10px" }}>Generative Art Space</h1>
        <p style={{ color: "#9ca3af", fontSize: 15, margin: 0 }}>Describe a historical scene — AI brings it to life as a vintage photograph</p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ background: "#1f2937", borderRadius: 20, padding: "28px 24px", marginBottom: 36, border: "2px solid #374151" }}>
          <h2 style={{ color: "#60a5fa", fontWeight: 800, fontSize: 18, marginBottom: 20 }}>✨ Create Your Historical Scene</h2>

          <div style={{ marginBottom: 16 }}>
            <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Choose a Decade</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {DECADES.map(d => (
                <button key={d} onClick={() => setDecade(d)} style={{ padding: "7px 16px", borderRadius: 99, fontWeight: 700, fontSize: 13, border: decade === d ? "2px solid #60a5fa" : "2px solid #374151", background: decade === d ? "#60a5fa22" : "#111827", color: decade === d ? "#60a5fa" : "#6b7280", cursor: "pointer" }}>
                  {DECADE_EMOJIS[d]} {d}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Describe Your Scene</label>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="e.g. A busy street in 1950s Chicago with neon diner signs and classic cars..." rows={3} style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15, resize: "vertical", boxSizing: "border-box", fontFamily: "Georgia, serif" }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 8 }}>💡 Try these:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {EXAMPLE_PROMPTS.slice(0, 3).map((p, i) => (
                <button key={i} onClick={() => setPrompt(p)} style={{ background: "#111827", border: "1px solid #374151", color: "#9ca3af", borderRadius: 8, padding: "4px 10px", fontSize: 12, cursor: "pointer" }}>{p.slice(0, 45)}...</button>
              ))}
            </div>
          </div>

          <button onClick={generate} disabled={generating || !prompt.trim()} style={{ width: "100%", background: prompt.trim() && !generating ? "linear-gradient(135deg, #3b82f6, #1d4ed8)" : "#374151", border: "none", borderRadius: 12, padding: "14px 0", color: prompt.trim() && !generating ? "#fff" : "#6b7280", fontWeight: 900, fontSize: 16, cursor: prompt.trim() && !generating ? "pointer" : "default" }}>
            {generating ? "⏳ Generating your historical scene..." : "🎨 Generate Historical Image"}
          </button>
        </div>

        {generated && (
          <div style={{ background: "#1f2937", borderRadius: 20, padding: 24, marginBottom: 36, border: "2px solid #60a5fa44" }}>
            <h3 style={{ color: "#60a5fa", fontWeight: 800, marginBottom: 16 }}>✅ Your Generated Scene</h3>
            <img src={generated} alt="Generated" onClick={() => setLightbox({ image_url: generated, title: title || prompt, prompt, pinned_to: pinTo, decade, author_name: authorName })} style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 12, cursor: "zoom-in", marginBottom: 16 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Title (optional)</label>
                <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Give this image a title..." style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 8, padding: "10px 12px", color: "#f3f4f6", fontSize: 14, boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Your Name</label>
                <input value={authorName} onChange={e => setAuthorName(e.target.value)} placeholder="Anonymous" style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 8, padding: "10px 12px", color: "#f3f4f6", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: "#9ca3af", fontSize: 12, fontWeight: 700, display: "block", marginBottom: 6 }}>Pin to</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Gallery", "Timeline", "Heatmap"].map(p => (
                  <button key={p} onClick={() => setPinTo(p)} style={{ padding: "7px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13, border: pinTo === p ? "2px solid #60a5fa" : "2px solid #374151", background: pinTo === p ? "#60a5fa22" : "#111827", color: pinTo === p ? "#60a5fa" : "#6b7280", cursor: "pointer" }}>📌 {p}</button>
                ))}
              </div>
            </div>
            <button onClick={saveToGallery} disabled={saving} style={{ width: "100%", background: "#60a5fa", border: "none", borderRadius: 12, padding: "13px 0", color: "#000", fontWeight: 900, fontSize: 15, cursor: saving ? "default" : "pointer" }}>
              {saving ? "Saving..." : "📌 Save to Gallery"}
            </button>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ color: "#60a5fa", fontWeight: 800, fontSize: 20, margin: 0 }}>🖼️ Community Gallery ({gallery.length})</h2>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background: "#1f2937", border: "1px solid #374151", color: "#f3f4f6", borderRadius: 8, padding: "7px 12px", fontSize: 13 }}>
            <option value="All">All Decades</option>
            {DECADES.map(d => <option key={d} value={d}>{d}</option>)}
            <option value="Heatmap">📍 Pinned to Heatmap</option>
            <option value="Timeline">📅 Pinned to Timeline</option>
          </select>
        </div>

        {loading ? <p style={{ color: "#6b7280", textAlign: "center", padding: 40 }}>Loading gallery...</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {filteredGallery.map(art => (
              <div key={art.id} style={{ background: "#1f2937", borderRadius: 14, overflow: "hidden", border: "2px solid #374151" }}>
                <div style={{ position: "relative", cursor: "zoom-in" }} onClick={() => setLightbox(art)}>
                  <img src={art.image_url} alt={art.title} style={{ width: "100%", height: 200, objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                  <div style={{ position: "absolute", top: 8, left: 8, background: "#00000088", borderRadius: 99, padding: "3px 10px", fontSize: 11, color: "#fff" }}>{DECADE_EMOJIS[art.decade]} {art.decade}</div>
                  <div style={{ position: "absolute", top: 8, right: 8, background: "#60a5fa22", border: "1px solid #60a5fa44", borderRadius: 99, padding: "3px 8px", fontSize: 11, color: "#60a5fa" }}>📌 {art.pinned_to}</div>
                </div>
                <div style={{ padding: "12px 14px" }}>
                  <div style={{ fontWeight: 800, color: "#f3f4f6", fontSize: 14, marginBottom: 4 }}>{art.title}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>"{art.prompt}"</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#6b7280", fontSize: 12 }}>by {art.author_name}</span>
                    <button onClick={() => handleLike(art)} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14 }}>❤️ {art.likes || 0}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>}
      </div>
    </div>
  );
}
