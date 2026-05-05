import { useState, useEffect } from "react";
import { DirectorySubmission } from "@/api/entities";

const ADMIN_PASSWORD = "KingXcel2026";

const BUSINESS_INFO = {
  name: "eDecades",
  company: "King Xcel Innovations",
  url: "https://edecades.com",
  description: "eDecades is a social platform for exploring history, nostalgia, music, fashion, and culture decade by decade — from the 1920s to the 2020s.",
  shortDesc: "Explore history decade by decade. Music, fashion, culture & nostalgia from the 1920s–2020s.",
  address: "205 Seva Ct, Irving, Texas 75061",
  city: "Irving", state: "TX", zip: "75061",
  phone: "",
  email: "anthonykittles@outlook.com",
  category: "Social Platform / Entertainment / History",
  keywords: "nostalgia, history, decades, music history, fashion history, retro, vintage, pop culture",
};

const CATEGORY_COLORS = {
  "Major Search": "#22c55e",
  "Social Media": "#3b82f6",
  "Business Directory": "#f97316",
  "Tech/Startup": "#a78bfa",
  "Local Texas": "#eab308",
  "Backlink Source": "#ec4899",
};

const STATUS_COLORS = {
  "Not Submitted": "#6b7280",
  "Submitted": "#eab308",
  "Verified": "#22c55e",
  "Rejected": "#ef4444",
};

const PRIORITY_COLORS = {
  "High": "#ef4444",
  "Medium": "#f97316",
  "Low": "#6b7280",
};

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} style={{ background: copied ? "#16a34a22" : "#1f2937", border: `1px solid ${copied ? "#16a34a" : "#374151"}`, color: copied ? "#4ade80" : "#9ca3af", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
      {copied ? "✓ Copied" : `Copy ${label}`}
    </button>
  );
}

export default function KingXcelDirectory() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [directories, setDirectories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [updating, setUpdating] = useState(null);
  const [bulkOpening, setBulkOpening] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [search, setSearch] = useState("");

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuth(true); } else { alert("Incorrect password."); }
  };

  useEffect(() => {
    if (!auth) return;
    DirectorySubmission.list({ sort: "priority", limit: 100 }).then(data => {
      // Sort: High first, then Medium, then Low
      const order = { High: 0, Medium: 1, Low: 2 };
      const sorted = [...data].sort((a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3));
      setDirectories(sorted);
      setLoading(false);
    });
  }, [auth]);

  const updateStatus = async (id, status) => {
    setUpdating(id);
    const now = new Date().toISOString().split("T")[0];
    const updates = { status };
    if (status === "Submitted") updates.submitted_date = now;
    if (status === "Verified") updates.verified_date = now;
    await DirectorySubmission.update(id, updates);
    setDirectories(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    setUpdating(null);
  };

  const openAll = (dirs) => {
    setBulkOpening(true);
    dirs.forEach((d, i) => {
      setTimeout(() => window.open(d.url, "_blank"), i * 800);
    });
    setTimeout(() => setBulkOpening(false), dirs.length * 800 + 500);
  };

  const allCategories = ["All", ...Object.keys(CATEGORY_COLORS)];
  const allStatuses = ["All", "Not Submitted", "Submitted", "Verified", "Rejected"];
  const allPriorities = ["All", "High", "Medium", "Low"];

  const filtered = directories.filter(d => {
    if (filterCategory !== "All" && d.category !== filterCategory) return false;
    if (filterStatus !== "All" && d.status !== filterStatus) return false;
    if (filterPriority !== "All" && d.priority !== filterPriority) return false;
    if (search && !d.directory_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const notSubmitted = directories.filter(d => d.status === "Not Submitted");
  const submitted = directories.filter(d => d.status === "Submitted");
  const verified = directories.filter(d => d.status === "Verified");
  const highPriority = notSubmitted.filter(d => d.priority === "High");
  const pct = directories.length ? Math.round((submitted.length + verified.length) / directories.length * 100) : 0;

  if (!auth) return (
    <div style={{ background: "#07070e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ background: "#1f2937", border: "2px solid #C9A84C44", borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 400, textAlign: "center" }}>
        <div style={{ fontSize: 52, marginBottom: 12 }}>🗂️</div>
        <h1 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 24, marginBottom: 6 }}>Directory Hub</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>King Xcel Innovations · Admin Access</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Admin password" style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "13px 14px", color: "#f3f4f6", fontSize: 15, marginBottom: 14, boxSizing: "border-box", textAlign: "center" }} />
        <button onClick={login} style={{ width: "100%", background: "#C9A84C", border: "none", borderRadius: 10, padding: "13px 0", fontWeight: 900, fontSize: 16, cursor: "pointer", color: "#000" }}>Enter Directory Hub</button>
      </div>
    </div>
  );

  if (loading) return (
    <div style={{ background: "#07070e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center" }}><div style={{ fontSize: 48, marginBottom: 12 }}>🗂️</div><div style={{ fontWeight: 700 }}>Loading directories...</div></div>
    </div>
  );

  return (
    <div style={{ background: "#07070e", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>

      {/* HEADER */}
      <div style={{ background: "rgba(7,7,14,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "18px 28px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20, margin: 0 }}>🗂️ Directory Hub</h1>
            <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>eDecades · King Xcel Innovations · {directories.length} directories tracked</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["overview","📊 Overview"],["directories","📋 All Directories"],["submit","🚀 Submit"],["bizinfo","🏢 Business Info"]].map(([id, label]) => (
              <button key={id} onClick={() => setActiveTab(id)} style={{ padding: "7px 16px", borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none", background: activeTab === id ? "#C9A84C" : "#1f2937", color: activeTab === id ? "#000" : "#9ca3af" }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 80px" }}>

        {/* ===== OVERVIEW ===== */}
        {activeTab === "overview" && (
          <>
            {/* Progress */}
            <div style={{ background: "linear-gradient(135deg, #C9A84C22, #1f2937)", border: "2px solid #C9A84C44", borderRadius: 20, padding: "28px", marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <div>
                  <h2 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20, margin: "0 0 4px" }}>Submission Progress</h2>
                  <div style={{ color: "#9ca3af", fontSize: 13 }}>{submitted.length + verified.length} of {directories.length} directories submitted or verified</div>
                </div>
                <div style={{ color: "#C9A84C", fontWeight: 900, fontSize: 36 }}>{pct}%</div>
              </div>
              <div style={{ background: "#111827", borderRadius: 99, height: 14 }}>
                <div style={{ background: "linear-gradient(90deg, #C9A84C, #d4956e)", width: `${pct}%`, height: 14, borderRadius: 99, transition: "width 0.6s" }} />
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: 14, marginBottom: 28 }}>
              {[["📋","Total Directories", directories.length, "#C9A84C"], ["🔴","High Priority", highPriority.length, "#ef4444"], ["📤","Submitted", submitted.length, "#eab308"], ["✅","Verified", verified.length, "#22c55e"], ["❌","Not Submitted", notSubmitted.length, "#6b7280"]].map(([icon, label, val, color], i) => (
                <div key={i} style={{ background: "#111827", border: `1px solid ${color}33`, borderRadius: 14, padding: "18px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                  <div style={{ color, fontWeight: 900, fontSize: 26 }}>{val}</div>
                  <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 3 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* High priority quick actions */}
            <div style={{ background: "#111827", border: "2px solid #ef444433", borderRadius: 16, padding: "22px", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                <h3 style={{ color: "#ef4444", fontWeight: 800, fontSize: 15, margin: 0 }}>🔴 High Priority — Submit These First ({highPriority.length})</h3>
                <button onClick={() => openAll(highPriority)} disabled={bulkOpening || highPriority.length === 0} style={{ background: "#ef444422", border: "1px solid #ef4444", color: "#ef4444", borderRadius: 8, padding: "8px 18px", fontWeight: 800, fontSize: 12, cursor: "pointer" }}>
                  {bulkOpening ? "Opening..." : `🚀 Open All ${highPriority.length} in Tabs`}
                </button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 10 }}>
                {highPriority.map(d => (
                  <div key={d.id} style={{ background: "#1f2937", borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 13 }}>{d.directory_name}</div>
                      <div style={{ color: "#6b7280", fontSize: 11 }}>{d.category} · DA {d.domain_authority}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ background: "#C9A84C", color: "#000", borderRadius: 6, padding: "5px 10px", fontSize: 11, fontWeight: 800, textDecoration: "none" }}>Submit →</a>
                      <button onClick={() => updateStatus(d.id, "Submitted")} disabled={updating === d.id} style={{ background: "#22c55e22", border: "1px solid #22c55e44", color: "#4ade80", borderRadius: 6, padding: "5px 8px", fontSize: 10, fontWeight: 700, cursor: "pointer" }}>✓ Done</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category breakdown */}
            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "22px" }}>
              <h3 style={{ color: "#C9A84C", fontWeight: 800, fontSize: 15, margin: "0 0 16px" }}>📊 By Category</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 10 }}>
                {Object.entries(CATEGORY_COLORS).map(([cat, color]) => {
                  const catDirs = directories.filter(d => d.category === cat);
                  const catDone = catDirs.filter(d => d.status === "Submitted" || d.status === "Verified").length;
                  return (
                    <div key={cat} onClick={() => { setActiveTab("directories"); setFilterCategory(cat); }} style={{ background: "#1f2937", border: `1px solid ${color}33`, borderRadius: 12, padding: "14px", cursor: "pointer" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ color, fontWeight: 700, fontSize: 13 }}>{cat}</span>
                        <span style={{ color: "#f3f4f6", fontWeight: 900 }}>{catDone}/{catDirs.length}</span>
                      </div>
                      <div style={{ background: "#111827", borderRadius: 99, height: 6 }}>
                        <div style={{ background: color, width: `${catDirs.length ? (catDone / catDirs.length) * 100 : 0}%`, height: 6, borderRadius: 99 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ===== ALL DIRECTORIES ===== */}
        {activeTab === "directories" && (
          <>
            {/* Filters */}
            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 14, padding: "16px 18px", marginBottom: 20, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search directories..." style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "8px 12px", color: "#f3f4f6", fontSize: 13, flex: 1, minWidth: 160 }} />
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "8px 12px", color: "#f3f4f6", fontSize: 13 }}>
                {allCategories.map(c => <option key={c}>{c}</option>)}
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "8px 12px", color: "#f3f4f6", fontSize: 13 }}>
                {allStatuses.map(s => <option key={s}>{s}</option>)}
              </select>
              <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 8, padding: "8px 12px", color: "#f3f4f6", fontSize: 13 }}>
                {allPriorities.map(p => <option key={p}>{p}</option>)}
              </select>
              <div style={{ color: "#6b7280", fontSize: 12 }}>{filtered.length} results</div>
            </div>

            {/* Bulk actions */}
            <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              <button onClick={() => openAll(filtered.filter(d => d.status === "Not Submitted"))} disabled={bulkOpening} style={{ background: "#C9A84C22", border: "1px solid #C9A84C55", color: "#C9A84C", borderRadius: 8, padding: "8px 18px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                🚀 Open All Unsubmitted in Tabs ({filtered.filter(d => d.status === "Not Submitted").length})
              </button>
            </div>

            {/* Directory cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map(d => (
                <div key={d.id} style={{ background: "#111827", border: `1px solid ${STATUS_COLORS[d.status] || "#1f2937"}22`, borderRadius: 12, padding: "16px 18px", display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6, alignItems: "center" }}>
                      <span style={{ color: "#f3f4f6", fontWeight: 800, fontSize: 15 }}>{d.directory_name}</span>
                      <span style={{ background: PRIORITY_COLORS[d.priority] + "22", color: PRIORITY_COLORS[d.priority], border: `1px solid ${PRIORITY_COLORS[d.priority]}44`, borderRadius: 99, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>{d.priority}</span>
                      <span style={{ background: CATEGORY_COLORS[d.category] + "22", color: CATEGORY_COLORS[d.category], borderRadius: 99, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>{d.category}</span>
                      {d.is_free && <span style={{ background: "#22c55e22", color: "#4ade80", borderRadius: 99, padding: "2px 8px", fontSize: 10, fontWeight: 700 }}>FREE</span>}
                    </div>
                    <div style={{ color: "#9ca3af", fontSize: 12, marginBottom: 4 }}>{d.notes}</div>
                    <div style={{ color: "#6b7280", fontSize: 11 }}>DA {d.domain_authority} · {d.difficulty} · {d.url}</div>
                    {d.submitted_date && <div style={{ color: "#6b7280", fontSize: 11, marginTop: 3 }}>Submitted: {d.submitted_date}</div>}
                    {d.verified_date && <div style={{ color: "#22c55e", fontSize: 11, marginTop: 2 }}>✅ Verified: {d.verified_date}</div>}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end", flexShrink: 0 }}>
                    <div style={{ background: STATUS_COLORS[d.status] + "22", color: STATUS_COLORS[d.status], border: `1px solid ${STATUS_COLORS[d.status]}44`, borderRadius: 99, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>{d.status}</div>
                    <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ background: "#C9A84C", color: "#000", borderRadius: 8, padding: "7px 16px", fontSize: 12, fontWeight: 800, textDecoration: "none" }}>Submit →</a>
                    <div style={{ display: "flex", gap: 5 }}>
                      {["Not Submitted","Submitted","Verified"].map(s => (
                        <button key={s} onClick={() => updateStatus(d.id, s)} disabled={updating === d.id || d.status === s} style={{ background: d.status === s ? STATUS_COLORS[s] + "33" : "#1f2937", border: `1px solid ${STATUS_COLORS[s]}44`, color: STATUS_COLORS[s], borderRadius: 6, padding: "3px 8px", fontSize: 9, fontWeight: 700, cursor: d.status === s ? "default" : "pointer", opacity: d.status === s ? 1 : 0.7 }}>
                          {s === "Not Submitted" ? "Reset" : s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ===== SUBMIT TAB ===== */}
        {activeTab === "submit" && (
          <>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20, margin: "0 0 6px" }}>🚀 Bulk Submit Strategy</h2>
              <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Submit to all directories efficiently. Open in batches and use your pre-filled business info below.</p>
            </div>

            {/* Batch openers by priority */}
            {[["🔴 High Priority", "High", "#ef4444"], ["🟠 Medium Priority", "Medium", "#f97316"], ["⚪ Low Priority", "Low", "#6b7280"]].map(([label, prio, color]) => {
              const batch = notSubmitted.filter(d => d.priority === prio);
              return (
                <div key={prio} style={{ background: "#111827", border: `1px solid ${color}33`, borderRadius: 16, padding: "20px", marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                    <div>
                      <span style={{ color, fontWeight: 800, fontSize: 15 }}>{label}</span>
                      <span style={{ color: "#6b7280", fontSize: 13, marginLeft: 8 }}>{batch.length} unsubmitted</span>
                    </div>
                    <button onClick={() => openAll(batch)} disabled={bulkOpening || batch.length === 0} style={{ background: color + "22", border: `1px solid ${color}55`, color, borderRadius: 8, padding: "8px 18px", fontWeight: 800, fontSize: 12, cursor: batch.length === 0 ? "not-allowed" : "pointer", opacity: batch.length === 0 ? 0.5 : 1 }}>
                      {bulkOpening ? "Opening tabs..." : `Open All ${batch.length} →`}
                    </button>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {batch.map(d => (
                      <a key={d.id} href={d.url} target="_blank" rel="noopener noreferrer" style={{ background: "#1f2937", border: "1px solid #374151", color: "#e5e7eb", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>{d.directory_name} ↗</a>
                    ))}
                    {batch.length === 0 && <span style={{ color: "#4ade80", fontSize: 13 }}>✅ All {prio} priority directories submitted!</span>}
                  </div>
                </div>
              );
            })}

            {/* Social Media channels */}
            <div style={{ background: "#111827", border: "2px solid #3b82f633", borderRadius: 16, padding: "20px", marginBottom: 16 }}>
              <h3 style={{ color: "#3b82f6", fontWeight: 800, fontSize: 15, margin: "0 0 14px" }}>📱 Social Media Channels — Post eDecades Now</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 10 }}>
                {[
                  { name: "Facebook Business", url: "https://www.facebook.com/business", emoji: "📘", note: "Create a business page" },
                  { name: "Instagram Business", url: "https://business.instagram.com", emoji: "📸", note: "Switch to business account" },
                  { name: "TikTok Business", url: "https://www.tiktok.com/business/en", emoji: "🎵", note: "Create business account" },
                  { name: "X / Twitter", url: "https://twitter.com/i/flow/signup", emoji: "🐦", note: "Post nostalgia content" },
                  { name: "YouTube Channel", url: "https://studio.youtube.com", emoji: "▶️", note: "Create/manage channel" },
                  { name: "Pinterest (Active)", url: "https://pinterest.com", emoji: "📌", note: "✅ Already connected" },
                  { name: "LinkedIn (Active)", url: "https://linkedin.com", emoji: "💼", note: "✅ Auto-posting daily" },
                  { name: "Discord (Active)", url: "https://discord.com", emoji: "💬", note: "✅ Webhook connected" },
                ].map((ch, i) => (
                  <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", textDecoration: "none", display: "block" }}>
                    <div style={{ fontSize: 22, marginBottom: 4 }}>{ch.emoji}</div>
                    <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 13 }}>{ch.name}</div>
                    <div style={{ color: "#6b7280", fontSize: 11, marginTop: 2 }}>{ch.note}</div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ===== BUSINESS INFO ===== */}
        {activeTab === "bizinfo" && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20, margin: "0 0 6px" }}>🏢 Business Info — Copy & Paste for Submissions</h2>
              <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Use these exact values when filling out directory submission forms.</p>
            </div>
            {[
              { label: "Business Name", value: BUSINESS_INFO.name, key: "name" },
              { label: "Company Name", value: BUSINESS_INFO.company, key: "company" },
              { label: "Website URL", value: BUSINESS_INFO.url, key: "url" },
              { label: "Short Description (160 chars)", value: BUSINESS_INFO.shortDesc, key: "short" },
              { label: "Full Description", value: BUSINESS_INFO.description, key: "desc" },
              { label: "Address", value: BUSINESS_INFO.address, key: "addr" },
              { label: "City", value: BUSINESS_INFO.city, key: "city" },
              { label: "State", value: BUSINESS_INFO.state, key: "state" },
              { label: "ZIP Code", value: BUSINESS_INFO.zip, key: "zip" },
              { label: "Email", value: BUSINESS_INFO.email, key: "email" },
              { label: "Business Category", value: BUSINESS_INFO.category, key: "cat" },
              { label: "Keywords / Tags", value: BUSINESS_INFO.keywords, key: "kw" },
              { label: "QR Code URL", value: "https://base44.app/api/apps/69c207112c5856fdf7bb496b/files/mp/public/69c207112c5856fdf7bb496b/596e7b25a_edecades_qr_square.png", key: "qr" },
            ].map(item => (
              <div key={item.key} style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 12, padding: "16px 18px", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: "#6b7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 }}>{item.label}</div>
                    <div style={{ color: "#f3f4f6", fontSize: 14, lineHeight: 1.5, wordBreak: "break-all" }}>{item.value}</div>
                  </div>
                  <CopyButton text={item.value} label={item.label} />
                </div>
              </div>
            ))}

            <div style={{ background: "#111827", border: "2px solid #C9A84C33", borderRadius: 14, padding: "18px", marginTop: 20 }}>
              <div style={{ color: "#C9A84C", fontWeight: 800, fontSize: 14, marginBottom: 10 }}>📦 Copy Full Submission Package</div>
              <CopyButton
                text={`Business Name: ${BUSINESS_INFO.name}\nCompany: ${BUSINESS_INFO.company}\nWebsite: ${BUSINESS_INFO.url}\nDescription: ${BUSINESS_INFO.description}\nAddress: ${BUSINESS_INFO.address}\nCity: ${BUSINESS_INFO.city}, ${BUSINESS_INFO.state} ${BUSINESS_INFO.zip}\nEmail: ${BUSINESS_INFO.email}\nCategory: ${BUSINESS_INFO.category}\nKeywords: ${BUSINESS_INFO.keywords}`}
                label="Full Package"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
