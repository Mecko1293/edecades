import { useState, useEffect } from "react";
import { OnThisDay, TriviaQuestion, TriviaScore, FamilyAncestry, TimeCapsule, GenerativeArt, OpsTracker, SiteError } from "@/api/entities";

const ADMIN_PASSWORD = "KingXcel2026";

const TABS = [
  { id: "dashboard", label: "📊 Dashboard", color: "#C9A84C" },
  { id: "errors", label: "🚨 Error Monitor", color: "#ef4444" },
  { id: "onthisday", label: "📅 On This Day", color: "#d97706" },
  { id: "trivia", label: "🧠 Trivia", color: "#eab308" },
  { id: "leaderboard", label: "🏆 Leaderboard", color: "#22c55e" },
  { id: "ancestry", label: "🌳 Ancestry", color: "#10b981" },
  { id: "capsules", label: "📦 Capsules", color: "#a78bfa" },
  { id: "art", label: "🎨 Art", color: "#60a5fa" },
  { id: "ops", label: "⚙️ Ops", color: "#f97316" },
];

const SEVERITY_COLORS = { "Critical": "#dc2626", "High": "#ef4444", "Medium": "#f97316", "Low": "#6b7280" };
const STATUS_COLORS = { "Open": "#ef4444", "In Progress": "#f97316", "Fixed": "#22c55e", "Wont Fix": "#6b7280" };
const ERROR_TYPE_EMOJIS = { "Broken Image": "🖼️", "Video Unavailable": "📺", "Broken Link": "🔗", "Missing Content": "📄", "Layout Issue": "🎨", "White Background": "⬜", "Other": "⚠️" };

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{ background: "#1f2937", border: `2px solid ${color}33`, borderRadius: 14, padding: "18px 20px" }}>
      <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 900, color }}>{value}</div>
      <div style={{ color: "#9ca3af", fontSize: 12, marginTop: 2 }}>{label}</div>
    </div>
  );
}

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState("dashboard");
  const [stats, setStats] = useState({});
  const [records, setRecords] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [errorFilter, setErrorFilter] = useState("All");
  const [showNewError, setShowNewError] = useState(false);
  const [newError, setNewError] = useState({ section:"", error_type:"Other", description:"", page:"", status:"Open", severity:"Medium", fix_notes:"", decade:"" });

  const login = () => { if (pw === ADMIN_PASSWORD) setAuth(true); else alert("Incorrect password."); };

  const entityMap = {
    onthisday: OnThisDay, trivia: TriviaQuestion, leaderboard: TriviaScore,
    ancestry: FamilyAncestry, capsules: TimeCapsule, art: GenerativeArt, ops: OpsTracker,
  };

  const loadErrors = async () => {
    const data = await SiteError.list({ sort: "-created_date", limit: 200 });
    setErrors(data);
  };

  useEffect(() => {
    if (!auth) return;
    if (tab === "dashboard") {
      Promise.all([
        OnThisDay.list({ limit: 500 }), TriviaQuestion.list({ limit: 500 }),
        TriviaScore.list({ limit: 500 }), FamilyAncestry.list({ limit: 500 }),
        TimeCapsule.list({ limit: 500 }), GenerativeArt.list({ limit: 500 }),
        OpsTracker.list({ limit: 500 }), SiteError.list({ limit: 500 }),
      ]).then(([otd, tq, ts, fa, tc, ga, ops, errs]) => {
        setStats({ otd: otd.length, tq: tq.length, ts: ts.length, fa: fa.length, tc: tc.length, ga: ga.length, ops: ops.length, openErrors: errs.filter(e => e.status === "Open").length, fixedErrors: errs.filter(e => e.status === "Fixed").length });
      });
    } else if (tab === "errors") {
      loadErrors();
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
        await entityMap[tab].update(editItem.id, form);
        setRecords(prev => prev.map(r => r.id === editItem.id ? { ...r, ...form } : r));
      } else {
        const created = await entityMap[tab].create(form);
        setRecords(prev => [created, ...prev]);
      }
      setShowForm(false); setEditItem(null); setForm({});
    } catch (e) { alert("Save failed."); }
    setSaving(false);
  };

  const updateErrorStatus = async (id, status) => {
    await SiteError.update(id, { status });
    setErrors(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const addError = async () => {
    if (!newError.section || !newError.description) return alert("Section and description required.");
    setSaving(true);
    const created = await SiteError.create({ ...newError, auto_detected: false });
    setErrors(prev => [created, ...prev]);
    setNewError({ section:"", error_type:"Other", description:"", page:"", status:"Open", severity:"Medium", fix_notes:"", decade:"" });
    setShowNewError(false);
    setSaving(false);
  };

  const openErrors = errors.filter(e => e.status === "Open" || e.status === "In Progress");
  const fixedErrors = errors.filter(e => e.status === "Fixed");
  const criticalErrors = errors.filter(e => e.severity === "Critical" && e.status === "Open");
  const filteredErrors = errorFilter === "All" ? errors : errors.filter(e => e.status === errorFilter);

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
                <label style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 4 }}>{key.replace(/_/g," ")}</label>
                {typeof val === "boolean" ? (
                  <select value={String(val)} onChange={e => setForm(f => ({ ...f, [key]: e.target.value === "true" }))} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:14 }}>
                    <option value="true">Yes</option><option value="false">No</option>
                  </select>
                ) : Array.isArray(val) ? (
                  <input value={(val||[]).join(", ")} onChange={e => setForm(f => ({ ...f, [key]: e.target.value.split(",").map(s=>s.trim()) }))} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:14, boxSizing:"border-box" }} placeholder="Comma separated" />
                ) : typeof val === "string" && val.length > 80 ? (
                  <textarea value={val||""} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={4} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:14, resize:"vertical", boxSizing:"border-box" }} />
                ) : (
                  <input value={val||""} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:14, boxSizing:"border-box" }} />
                )}
              </div>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <button onClick={()=>{ setShowForm(false); setEditItem(null); setForm({}); }} style={{ flex:1, background:"#374151", border:"none", borderRadius:8, padding:"11px 0", color:"#fff", cursor:"pointer", fontWeight:700 }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} style={{ flex:2, background:"#C9A84C", border:"none", borderRadius:8, padding:"11px 0", color:"#000", cursor:"pointer", fontWeight:900 }}>{saving?"Saving...":"Save"}</button>
            </div>
          </div>
        </div>
      )}

      {showNewError && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:999, overflowY:"auto", padding:"40px 16px" }}>
          <div style={{ background:"#1f2937", borderRadius:16, maxWidth:600, margin:"0 auto", padding:28 }}>
            <h3 style={{ color:"#ef4444", fontWeight:800, marginBottom:20 }}>🚨 Report New Error</h3>
            {[["Section / Component","section","text"],["Page Name","page","text"],["Description","description","textarea"],["Fix Notes","fix_notes","textarea"]].map(([label,field,type])=>(
              <div key={field} style={{ marginBottom:12 }}>
                <label style={{ color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase", display:"block", marginBottom:4 }}>{label}</label>
                {type==="textarea" ? <textarea value={newError[field]} onChange={e=>setNewError(p=>({...p,[field]:e.target.value}))} rows={3} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:14, resize:"vertical", boxSizing:"border-box" }} /> : <input value={newError[field]} onChange={e=>setNewError(p=>({...p,[field]:e.target.value}))} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:14, boxSizing:"border-box" }} />}
              </div>
            ))}
            {[["Error Type","error_type",["Broken Image","Video Unavailable","Broken Link","Missing Content","Layout Issue","White Background","Other"]],["Severity","severity",["Critical","High","Medium","Low"]],["Status","status",["Open","In Progress","Fixed","Wont Fix"]]].map(([label,field,opts])=>(
              <div key={field} style={{ marginBottom:12 }}>
                <label style={{ color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase", display:"block", marginBottom:4 }}>{label}</label>
                <select value={newError[field]} onChange={e=>setNewError(p=>({...p,[field]:e.target.value}))} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:14 }}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <button onClick={()=>setShowNewError(false)} style={{ flex:1, background:"#374151", border:"none", borderRadius:8, padding:"11px 0", color:"#fff", cursor:"pointer", fontWeight:700 }}>Cancel</button>
              <button onClick={addError} disabled={saving} style={{ flex:2, background:"#ef4444", border:"none", borderRadius:8, padding:"11px 0", color:"#fff", cursor:"pointer", fontWeight:900 }}>{saving?"Saving...":"Report Error"}</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background:"rgba(7,7,14,0.98)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(201,168,76,0.2)", padding:"16px 24px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:24 }}>👑</span>
            <span style={{ color:"#C9A84C", fontWeight:900, fontSize:18 }}>King Xcel Admin</span>
            {stats.openErrors > 0 && <span style={{ background:"#ef4444", color:"#fff", borderRadius:99, padding:"2px 8px", fontSize:11, fontWeight:900 }}>{stats.openErrors} open</span>}
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:"6px 14px", borderRadius:99, fontSize:11, fontWeight:700, cursor:"pointer", border:"none", background:tab===t.id ? t.color : "#1f2937", color:tab===t.id ? (t.id==="errors"?"#fff":"#000") : "#9ca3af", position:"relative" }}>
                {t.label}
                {t.id==="errors" && stats.openErrors > 0 && tab!=="errors" && <span style={{ position:"absolute", top:-4, right:-4, background:"#ef4444", color:"#fff", borderRadius:"50%", width:14, height:14, fontSize:9, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>{stats.openErrors}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 20px 80px" }}>

        {/* ===== DASHBOARD ===== */}
        {tab === "dashboard" && (
          <>
            {stats.openErrors > 0 && (
              <div onClick={()=>setTab("errors")} style={{ background:"#ef444411", border:"2px solid #ef4444", borderRadius:14, padding:"16px 20px", marginBottom:24, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div><span style={{ color:"#ef4444", fontWeight:900, fontSize:15 }}>🚨 {stats.openErrors} Open Site Errors</span><span style={{ color:"#9ca3af", fontSize:13, marginLeft:10 }}>Click to view and fix</span></div>
                <span style={{ color:"#ef4444", fontWeight:900 }}>View →</span>
              </div>
            )}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(150px,1fr))", gap:12, marginBottom:28 }}>
              <StatCard label="On This Day" value={stats.otd||0} color="#d97706" icon="📅" />
              <StatCard label="Trivia Questions" value={stats.tq||0} color="#eab308" icon="🧠" />
              <StatCard label="Players" value={stats.ts||0} color="#22c55e" icon="🏆" />
              <StatCard label="Family Records" value={stats.fa||0} color="#10b981" icon="🌳" />
              <StatCard label="Time Capsules" value={stats.tc||0} color="#a78bfa" icon="📦" />
              <StatCard label="Art Pieces" value={stats.ga||0} color="#60a5fa" icon="🎨" />
              <StatCard label="Ops Tasks" value={stats.ops||0} color="#f97316" icon="⚙️" />
              <StatCard label="Open Errors" value={stats.openErrors||0} color="#ef4444" icon="🚨" />
              <StatCard label="Errors Fixed" value={stats.fixedErrors||0} color="#22c55e" icon="✅" />
            </div>
          </>
        )}

        {/* ===== ERROR MONITOR ===== */}
        {tab === "errors" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <div>
                <h2 style={{ color:"#ef4444", fontWeight:900, fontSize:20, margin:"0 0 4px" }}>🚨 Site Error Monitor</h2>
                <p style={{ color:"#9ca3af", fontSize:13, margin:0 }}>Track, manage, and fix all eDecades site errors</p>
              </div>
              <button onClick={()=>setShowNewError(true)} style={{ background:"#ef4444", border:"none", borderRadius:10, padding:"10px 20px", color:"#fff", fontWeight:900, fontSize:13, cursor:"pointer" }}>+ Report Error</button>
            </div>

            {/* Error stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(130px,1fr))", gap:10, marginBottom:20 }}>
              {[["🔴","Open",openErrors.length,"#ef4444"],["✅","Fixed",fixedErrors.length,"#22c55e"],["⚠️","Critical",criticalErrors.length,"#dc2626"],["📺","Video Issues",errors.filter(e=>e.error_type==="Video Unavailable").length,"#8b5cf6"],["🖼️","Image Issues",errors.filter(e=>e.error_type==="Broken Image").length,"#3b82f6"]].map(([icon,label,val,color])=>(
                <div key={label} style={{ background:"#111827", border:`1px solid ${color}33`, borderRadius:12, padding:"14px", textAlign:"center" }}>
                  <div style={{ fontSize:20, marginBottom:4 }}>{icon}</div>
                  <div style={{ color, fontWeight:900, fontSize:22 }}>{val}</div>
                  <div style={{ color:"#9ca3af", fontSize:11 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Filter */}
            <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              {["All","Open","In Progress","Fixed","Wont Fix"].map(f=>(
                <button key={f} onClick={()=>setErrorFilter(f)} style={{ padding:"6px 16px", borderRadius:99, fontSize:12, fontWeight:700, cursor:"pointer", border:"none", background:errorFilter===f?(STATUS_COLORS[f]||"#C9A84C"):"#1f2937", color:errorFilter===f?"#fff":"#9ca3af" }}>{f} {f==="All"?`(${errors.length})`:""}</button>
              ))}
            </div>

            {/* Error list */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {filteredErrors.map(err=>(
                <div key={err.id} style={{ background:"#111827", border:`2px solid ${STATUS_COLORS[err.status]||"#374151"}33`, borderRadius:14, padding:"16px 18px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12, flexWrap:"wrap" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:8, alignItems:"center" }}>
                        <span style={{ fontSize:18 }}>{ERROR_TYPE_EMOJIS[err.error_type]||"⚠️"}</span>
                        <span style={{ color:"#f3f4f6", fontWeight:800, fontSize:15 }}>{err.section}</span>
                        <span style={{ background:SEVERITY_COLORS[err.severity]+"22", color:SEVERITY_COLORS[err.severity], border:`1px solid ${SEVERITY_COLORS[err.severity]}44`, borderRadius:99, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{err.severity}</span>
                        <span style={{ background:"#1f2937", color:"#9ca3af", borderRadius:99, padding:"2px 8px", fontSize:10 }}>{err.error_type}</span>
                        {err.auto_detected && <span style={{ background:"#3b82f622", color:"#60a5fa", borderRadius:99, padding:"2px 8px", fontSize:10, fontWeight:700 }}>Auto-detected</span>}
                      </div>
                      {err.page && <div style={{ color:"#6b7280", fontSize:12, marginBottom:4 }}>📄 {err.page}{err.decade ? ` · ${err.decade}` : ""}</div>}
                      <div style={{ color:"#d1d5db", fontSize:13, marginBottom:err.fix_notes?8:0, lineHeight:1.5 }}>{err.description}</div>
                      {err.fix_notes && (
                        <div style={{ background:"#1f2937", borderRadius:8, padding:"8px 12px", borderLeft:"3px solid #C9A84C" }}>
                          <span style={{ color:"#C9A84C", fontSize:11, fontWeight:700 }}>FIX: </span>
                          <span style={{ color:"#9ca3af", fontSize:12 }}>{err.fix_notes}</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end", flexShrink:0 }}>
                      <div style={{ background:STATUS_COLORS[err.status]+"22", color:STATUS_COLORS[err.status], border:`1px solid ${STATUS_COLORS[err.status]}44`, borderRadius:99, padding:"4px 12px", fontSize:11, fontWeight:700 }}>{err.status}</div>
                      <div style={{ display:"flex", gap:5, flexWrap:"wrap", justifyContent:"flex-end" }}>
                        {["Open","In Progress","Fixed","Wont Fix"].filter(s=>s!==err.status).map(s=>(
                          <button key={s} onClick={()=>updateErrorStatus(err.id,s)} style={{ background:STATUS_COLORS[s]+"22", border:`1px solid ${STATUS_COLORS[s]}44`, color:STATUS_COLORS[s], borderRadius:6, padding:"4px 8px", fontSize:9, fontWeight:700, cursor:"pointer" }}>
                            {s==="Fixed"?"✅ Mark Fixed":s==="In Progress"?"🔧 In Progress":s==="Open"?"🔴 Reopen":"❌ Skip"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredErrors.length===0 && <div style={{ textAlign:"center", padding:"40px", color:"#6b7280" }}>{errorFilter==="Fixed"?"No fixed errors yet.":"🎉 No errors in this category!"}</div>}
            </div>
          </>
        )}

        {/* ===== ENTITY TABS ===== */}
        {tab !== "dashboard" && tab !== "errors" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h2 style={{ color:"#C9A84C", fontWeight:900, fontSize:20, margin:0 }}>{TABS.find(t=>t.id===tab)?.label}</h2>
              <button onClick={()=>{ setEditItem(null); setForm({}); setShowForm(true); }} style={{ background:"#C9A84C", border:"none", borderRadius:8, padding:"9px 20px", color:"#000", fontWeight:900, fontSize:13, cursor:"pointer" }}>+ Add New</button>
            </div>
            {loading ? <div style={{ textAlign:"center", padding:40, color:"#6b7280" }}>Loading...</div> : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {records.map(r=>(
                  <div key={r.id} style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:12, padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                    <div style={{ flex:1, overflow:"hidden" }}>
                      <div style={{ color:"#f3f4f6", fontWeight:700, fontSize:14, marginBottom:4 }}>
                        {r.title || r.question || r.player_name || r.family_name || r.task_name || r.author_name || r.name || r.id}
                      </div>
                      <div style={{ color:"#6b7280", fontSize:12 }}>
                        {r.decade && <span style={{ marginRight:8 }}>📅 {r.decade}</span>}
                        {r.status && <span style={{ marginRight:8 }}>⚙️ {r.status}</span>}
                        {r.category && <span>🏷️ {r.category}</span>}
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:6 }}>
                      <button onClick={()=>{ setEditItem(r); setForm({...r}); setShowForm(true); }} style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:6, padding:"6px 12px", color:"#9ca3af", fontSize:12, cursor:"pointer", fontWeight:600 }}>Edit</button>
                      <button onClick={()=>setConfirm(r.id)} style={{ background:"#ef444411", border:"1px solid #ef444433", borderRadius:6, padding:"6px 12px", color:"#ef4444", fontSize:12, cursor:"pointer", fontWeight:600 }}>Delete</button>
                    </div>
                  </div>
                ))}
                {records.length===0 && <div style={{ textAlign:"center", padding:40, color:"#6b7280" }}>No records yet.</div>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
