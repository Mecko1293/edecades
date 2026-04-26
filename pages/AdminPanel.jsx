import { useState, useEffect } from "react";
import { OnThisDay, TriviaQuestion, TriviaScore, FamilyAncestry, TimeCapsule, GenerativeArt, OpsTracker } from "@/api/entities";

const ADMIN_PASSWORD = "KingXcel2026";
const TABS = [
  { id: "dashboard", label: "📊 Dashboard", color: "#C9A84C" },
  { id: "onthisday", label: "📅 On This Day", color: "#d97706" },
  { id: "trivia", label: "🧠 Trivia Questions", color: "#eab308" },
  { id: "leaderboard", label: "🏆 Leaderboard", color: "#22c55e" },
  { id: "ancestry", label: "🌳 Family Ancestry", color: "#10b981" },
  { id: "capsules", label: "📦 Time Capsules", color: "#a78bfa" },
  { id: "art", label: "🎨 Generative Art", color: "#60a5fa" },
  { id: "ops", label: "⚙️ OpsTracker", color: "#f97316" },
];

const DECADES = ["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s"];

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{ background: "#1f2937", border: `2px solid ${color}33`, borderRadius: 14, padding: "20px 24px" }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 28, fontWeight: 900, color }}>{value}</div>
      <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const login = () => { if (pw === ADMIN_PASSWORD) setAuth(true); else alert("Incorrect password."); };

  const entityMap = {
    onthisday: OnThisDay,
    trivia: TriviaQuestion,
    leaderboard: TriviaScore,
    ancestry: FamilyAncestry,
    capsules: TimeCapsule,
    art: GenerativeArt,
    ops: OpsTracker,
  };

  useEffect(() => {
    if (!auth) return;
    if (tab === "dashboard") {
      Promise.all([
        OnThisDay.list({ limit: 1 }),
        TriviaQuestion.list({ limit: 1 }),
        TriviaScore.list({ limit: 1 }),
        FamilyAncestry.list({ limit: 1 }),
        TimeCapsule.list({ limit: 1 }),
        GenerativeArt.list({ limit: 1 }),
        OpsTracker.list({ limit: 1 }),
      ]).then(([otd, tq, ts, fa, tc, ga, ops]) => {
        setStats({ otd: otd.length, tq: tq.length, ts: ts.length, fa: fa.length, tc: tc.length, ga: ga.length, ops: ops.length });
      });
    } else if (entityMap[tab]) {
      setLoading(true);
      entityMap[tab].list({ sort: "-created_date", limit: 100 }).then(data => { setRecords(data); setLoading(false); });
    }
  }, [tab, auth]);

  const handleDelete = async (id) => {
    if (!entityMap[tab]) return;
    await entityMap[tab].delete(id);
    setRecords(prev => prev.filter(r => r.id !== id));
    setConfirm(null);
  };

  const handleSave = async () => {
    if (!entityMap[tab]) return;
    setSaving(true);
    try {
      if (editItem) {
        const updated = await entityMap[tab].update(editItem.id, form);
        setRecords(prev => prev.map(r => r.id === editItem.id ? { ...r, ...form } : r));
      } else {
        const created = await entityMap[tab].create(form);
        setRecords(prev => [created, ...prev]);
      }
      setShowForm(false);
      setEditItem(null);
      setForm({});
    } catch (e) { alert("Save failed."); }
    setSaving(false);
  };

  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setShowForm(true); };
  const openNew = () => { setEditItem(null); setForm({}); setShowForm(true); };

  if (!auth) return (
    <div style={{ background: "#07070e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ background: "#1f2937", border: "2px solid #C9A84C44", borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 400, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>👑</div>
        <h1 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 24, marginBottom: 6 }}>King Xcel Admin</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>Enter your admin password to continue</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Password" style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "13px 14px", color: "#f3f4f6", fontSize: 15, marginBottom: 14, boxSizing: "border-box", textAlign: "center" }} />
        <button onClick={login} style={{ width: "100%", background: "#C9A84C", border: "none", borderRadius: 10, padding: "13px 0", fontWeight: 900, fontSize: 16, cursor: "pointer", color: "#000" }}>Enter Admin Panel</button>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#07070e", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      {confirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#1f2937", border: "2px solid #ef4444", borderRadius: 16, padding: "32px 36px", textAlign: "center", maxWidth: 360 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ color: "#ef4444", fontWeight: 800, marginBottom: 8 }}>Delete this record?</h3>
            <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>This cannot be undone.</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setConfirm(null)} style={{ background: "#374151", border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Cancel</button>
              <button onClick={() => handleDelete(confirm)} style={{ background: "#ef4444", border: "none", borderRadius: 8, padding: "10px 24px", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 999, overflowY: "auto", padding: "40px 16px" }}>
          <div style={{ background: "#1f2937", borderRadius: 16, maxWidth: 600, margin: "0 auto", padding: 28 }}>
            <h3 style={{ color: "#C9A84C", fontWeight: 800, marginBottom: 20 }}>{editItem ? "Edit Record" : "New Record"}</h3>
            {Object.entries(form).filter(([k]) => !["id","created_date","updated_date","created_by"].includes(k)).map(([key, val]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <label style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 4 }}>{key.replace(/_/g, " ")}</label>
                {typeof val === "boolean" ? (
                  <select value={String(val)} onChange={e => setForm(f => ({ ...f, [key]: e.target.value === "true" }))} style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 8, padding: "9px 12px", color: "#f3f4f6", fontSize: 14 }}>
                    <option value="true">Yes</option><option value="false">No</option>
                  </select>
                ) : Array.isArray(val) ? (
                  <input value={(val || []).join(", ")} onChange={e => setForm(f => ({ ...f, [key]: e.target.value.split(",").map(s => s.trim()) }))} style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 8, padding: "9px 12px", color: "#f3f4f6", fontSize: 14, boxSizing: "border-box" }} placeholder="Comma separated" />
                ) : typeof val === "string" && val.length > 80 ? (
                  <textarea value={val || ""} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={4} style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 8, padding: "9px 12px", color: "#f3f4f6", fontSize: 14, resize: "vertical", boxSizing: "border-box" }} />
                ) : (
                  <input value={val || ""} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 8, padding: "9px 12px", color: "#f3f4f6", fontSize: 14, boxSizing: "border-box" }} />
                )}
              </div>
            ))}
            {!editItem && Object.keys(form).length === 0 && (
              <p style={{ color: "#6b7280", fontSize: 14 }}>Select the tab's entity and fields will auto-populate when editing. For new records, manually enter fields above.</p>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => { setShowForm(false); setEditItem(null); setForm({}); }} style={{ flex: 1, background: "#374151", border: "none", borderRadius: 8, padding: "11px 0", color: "#fff", cursor: "pointer", fontWeight: 700 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex: 2, background: "#C9A84C", border: "none", borderRadius: 8, padding: "11px 0", color: "#000", cursor: "pointer", fontWeight: 900 }}>{saving ? "Saving..." : "Save"}</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background: "rgba(7,7,14,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 24 }}>👑</span>
          <div style={{ fontSize: 18, fontWeight: 900, color: "#C9A84C" }}>King Xcel <span style={{ color: "#fff" }}>Admin</span></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="/KingXcelPanel" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "8px 18px", borderRadius: 20, fontWeight: 600, textDecoration: "none", fontSize: 13 }}>Control Panel</a>
          <button onClick={() => setAuth(false)} style={{ background: "#ef444422", border: "1px solid #ef444444", color: "#ef4444", padding: "8px 18px", borderRadius: 20, fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Logout</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 0 }}>
        <div style={{ width: 220, background: "#0d0d18", minHeight: "calc(100vh - 60px)", padding: "24px 0", flexShrink: 0, borderRight: "1px solid #1f2937" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "13px 24px", background: tab === t.id ? `${t.color}18` : "none", border: "none", borderLeft: tab === t.id ? `3px solid ${t.color}` : "3px solid transparent", color: tab === t.id ? t.color : "#6b7280", fontWeight: tab === t.id ? 800 : 600, fontSize: 14, cursor: "pointer" }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ flex: 1, padding: "32px 28px", overflowX: "auto" }}>
          {tab === "dashboard" && (
            <div>
              <h2 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 22, marginBottom: 24 }}>📊 Dashboard Overview</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14, marginBottom: 36 }}>
                <StatCard label="On This Day Events" value={stats.otd || 0} color="#d97706" icon="📅" />
                <StatCard label="Trivia Questions" value={stats.tq || 0} color="#eab308" icon="🧠" />
                <StatCard label="Players on Leaderboard" value={stats.ts || 0} color="#22c55e" icon="🏆" />
                <StatCard label="Family Ancestries" value={stats.fa || 0} color="#10b981" icon="🌳" />
                <StatCard label="Time Capsules" value={stats.tc || 0} color="#a78bfa" icon="📦" />
                <StatCard label="AI Art Pieces" value={stats.ga || 0} color="#60a5fa" icon="🎨" />
                <StatCard label="OpsTracker Tasks" value={stats.ops || 0} color="#f97316" icon="⚙️" />
              </div>
              <div style={{ background: "#1f2937", borderRadius: 14, padding: "20px 24px" }}>
                <h3 style={{ color: "#C9A84C", fontWeight: 800, marginBottom: 12 }}>🔗 Quick Access</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                  {[["📅 On This Day", "/OnThisDay"], ["🧠 Trivia", "/DecadeTrivia"], ["🌳 Family Journey", "/FamilyJourney"], ["🎨 Art Space", "/GenerativeArtSpace"], ["📦 Time Capsules", "/TimeCapsuleJournal"], ["👑 Control Panel", "/KingXcelPanel"]].map(([label, href]) => (
                    <a key={href} href={href} target="_blank" style={{ background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "12px 16px", color: "#9ca3af", textDecoration: "none", fontSize: 14, display: "block" }}>{label}</a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab !== "dashboard" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20, margin: 0 }}>{TABS.find(t => t.id === tab)?.label}</h2>
                <button onClick={openNew} style={{ background: "#C9A84C", border: "none", borderRadius: 10, padding: "10px 20px", color: "#000", fontWeight: 800, cursor: "pointer", fontSize: 14 }}>+ Add New</button>
              </div>

              {loading ? <p style={{ color: "#6b7280" }}>Loading...</p> : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr style={{ borderBottom: "2px solid #374151" }}>
                        {records[0] && Object.keys(records[0]).filter(k => !["created_by", "updated_date"].includes(k)).slice(0, 6).map(k => (
                          <th key={k} style={{ padding: "10px 12px", textAlign: "left", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", fontSize: 11 }}>{k.replace(/_/g, " ")}</th>
                        ))}
                        <th style={{ padding: "10px 12px", textAlign: "right", color: "#9ca3af", fontWeight: 700, fontSize: 11 }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {records.map(r => (
                        <tr key={r.id} style={{ borderBottom: "1px solid #1f2937" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#1f2937"}
                          onMouseLeave={e => e.currentTarget.style.background = ""}>
                          {Object.entries(r).filter(([k]) => !["created_by", "updated_date"].includes(k)).slice(0, 6).map(([k, v]) => (
                            <td key={k} style={{ padding: "10px 12px", color: "#d1d5db", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {Array.isArray(v) ? v.join(", ") : typeof v === "boolean" ? (v ? "✅" : "❌") : String(v || "").slice(0, 60)}
                            </td>
                          ))}
                          <td style={{ padding: "10px 12px", textAlign: "right", whiteSpace: "nowrap" }}>
                            <button onClick={() => openEdit(r)} style={{ background: "#374151", border: "none", borderRadius: 6, padding: "5px 12px", color: "#fff", cursor: "pointer", fontSize: 12, marginRight: 6 }}>Edit</button>
                            <button onClick={() => setConfirm(r.id)} style={{ background: "#ef444422", border: "1px solid #ef444444", borderRadius: 6, padding: "5px 12px", color: "#ef4444", cursor: "pointer", fontSize: 12 }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {records.length === 0 && <p style={{ color: "#6b7280", textAlign: "center", padding: 40 }}>No records yet. Click "Add New" to get started.</p>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
