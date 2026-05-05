import { useState, useEffect } from "react";
import { DirectorySubmission, SiteError, OpsTracker, OnThisDay, TriviaQuestion, TriviaScore, FamilyAncestry, TimeCapsule, GenerativeArt } from "@/api/entities";
import { base44 } from "@/api/base44Client";

const ADMIN_PASSWORD = "KingXcel2026";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────
const PRODUCTS = [
  { name:"eDecades", icon:"⏰", color:"#FFD700", status:"live", appUrl:"https://benevolent-decade-dive-now.base44.app", category:"Social Network", description:"Decade-themed social network exploring history, music, fashion & culture 1920s–2020s." },
  { name:"CourseGek", icon:"🎓", color:"#7C3AED", status:"live", appUrl:"https://course-gek-23543b27.base44.app", category:"EdTech", description:"Homework help marketplace. Students pay for answers, tutors earn by responding." },
  { name:"ResumeCrafted", icon:"📄", color:"#4A90D9", status:"live", appUrl:"https://resume-dashing-craft-pro.base44.app", category:"Career Tools", description:"AI-powered resume builder. ATS-optimized resumes in minutes." },
  { name:"WheelMath", icon:"🔢", color:"#F59E0B", status:"coming_soon", appUrl:"https://pie-math-quest.base44.app", category:"EdTech Game", description:"Interactive math puzzles for students and classrooms." },
  { name:"GameForge", icon:"🎮", color:"#6366F1", status:"live", appUrl:"https://app.base44.com/apps/69cefe45fb6ca50b89904e8e", category:"Game Dev", description:"AI game design studio. From concept to full GDD in minutes." },
  { name:"CheapMedz", icon:"💊", color:"#EF4444", status:"coming_soon", appUrl:"#", category:"Healthcare", description:"Medication price comparison tool. Affiliate model. In development." },
  { name:"NexusCraft", icon:"⚙️", color:"#10B981", status:"coming_soon", appUrl:"#", category:"Dev Tools", description:"Next-gen development toolkit. Coming soon." },
  { name:"SETH", icon:"🤖", color:"#8B5CF6", status:"coming_soon", appUrl:"#", category:"AI Agent", description:"Specialized AI assistant platform. Coming soon." },
];

const QUICK_LINKS = [
  { label:"eDecades App", url:"https://benevolent-decade-dive-now.base44.app", icon:"⏰" },
  { label:"King Xcel Hub", url:"https://antonio-major-help-app.base44.app/Home", icon:"👑" },
  { label:"Stripe Dashboard", url:"https://dashboard.stripe.com", icon:"💳" },
  { label:"Pinterest Analytics", url:"https://analytics.pinterest.com", icon:"📌" },
  { label:"LinkedIn", url:"https://linkedin.com", icon:"💼" },
  { label:"Discord", url:"https://discord.com", icon:"💬" },
  { label:"GoDaddy DNS", url:"https://godaddy.com", icon:"🌐" },
  { label:"Buffer Scheduler", url:"https://buffer.com/app", icon:"📅" },
  { label:"Google Search Console", url:"https://search.google.com/search-console", icon:"🔍" },
  { label:"Google Business", url:"https://business.google.com", icon:"📍" },
];

const AUTOMATIONS = [
  { name:"Daily Social Auto-Post", schedule:"9 AM, 3 PM, 9 PM Central", platforms:"LinkedIn, Slack, Discord", status:"active", icon:"📱" },
  { name:"Daily Task Email", schedule:"8 AM Central daily", platforms:"Email → anthonykittles@outlook.com", status:"active", icon:"📧" },
  { name:"Weekly Task Email", schedule:"Mondays 8 AM Central", platforms:"Email → anthonykittles@outlook.com", status:"active", icon:"📆" },
  { name:"Weekly Directory Reminder", schedule:"Sundays 10 AM Central", platforms:"Email → anthonykittles@outlook.com", status:"active", icon:"🗂️" },
  { name:"Affiliate Reply Monitor", schedule:"Every 12 hours", platforms:"Gmail → kitt001@kingxcelinnovations.com", status:"active", icon:"🔎" },
];

const SOCIAL_CHANNELS = [
  { name:"LinkedIn", emoji:"💼", status:"✅ Auto-posting 3x/day", url:"https://linkedin.com", color:"#0077b5" },
  { name:"Discord", emoji:"💬", status:"✅ Webhook connected", url:"https://discord.com", color:"#5865f2" },
  { name:"Slack", emoji:"💬", status:"✅ Webhook connected", url:"https://slack.com", color:"#4a154b" },
  { name:"Pinterest", emoji:"📌", status:"✅ Verified & connected", url:"https://pinterest.com", color:"#e60023" },
  { name:"X / Twitter", emoji:"🐦", status:"⚠️ Manual posting required", url:"https://twitter.com", color:"#1da1f2" },
  { name:"Facebook", emoji:"📘", status:"⚠️ Manual posting required", url:"https://facebook.com", color:"#1877f2" },
  { name:"Instagram", emoji:"📸", status:"⚠️ Manual posting required", url:"https://instagram.com", color:"#e1306c" },
  { name:"TikTok", emoji:"🎵", status:"⚠️ Manual posting required", url:"https://tiktok.com", color:"#010101" },
];

const CATEGORY_COLORS = { "Major Search":"#22c55e","Social Media":"#3b82f6","Business Directory":"#f97316","Tech/Startup":"#a78bfa","Local Texas":"#eab308","Backlink Source":"#ec4899" };
const STATUS_COLORS = { "Not Submitted":"#6b7280","Submitted":"#eab308","Verified":"#22c55e","Rejected":"#ef4444" };
const SEVERITY_COLORS = { "Critical":"#dc2626","High":"#ef4444","Medium":"#f97316","Low":"#6b7280" };
const ERROR_STATUS_COLORS = { "Open":"#ef4444","In Progress":"#f97316","Fixed":"#22c55e","Wont Fix":"#6b7280" };
const ERROR_TYPE_EMOJIS = { "Broken Image":"🖼️","Video Unavailable":"📺","Broken Link":"🔗","Missing Content":"📄","Layout Issue":"🎨","White Background":"⬜","Other":"⚠️" };

const BUSINESS_INFO = {
  name:"eDecades", company:"King Xcel Innovations", url:"https://edecades.com",
  description:"eDecades is a social platform for exploring history, nostalgia, music, fashion, and culture decade by decade — from the 1920s to the 2020s.",
  shortDesc:"Explore history decade by decade. Music, fashion, culture & nostalgia from the 1920s–2020s.",
  address:"205 Seva Ct, Irving, Texas 75061", city:"Irving", state:"TX", zip:"75061",
  email:"anthonykittles@outlook.com", category:"Social Platform / Entertainment / History",
  keywords:"nostalgia, history, decades, music history, fashion history, retro, vintage, pop culture",
  qrCode:"https://base44.app/api/apps/69c207112c5856fdf7bb496b/files/mp/public/69c207112c5856fdf7bb496b/596e7b25a_edecades_qr_square.png",
};

const OPS_TASKS = {
  daily:[
    { task:"Post 1-2 fresh pins to Pinterest", owner:"anthony", category:"Marketing", link:"https://pinterest.com" },
    { task:"Check eDecades new user signups", owner:"antonio", category:"Growth" },
    { task:"Respond to new forum posts or messages", owner:"anthony", category:"Community", link:"https://edecades.com" },
    { task:"Monitor affiliate partner replies", owner:"antonio", category:"Revenue" },
    { task:"Share 1 post on TikTok, Instagram, or Facebook", owner:"anthony", category:"Marketing" },
    { task:"Check Stripe dashboard for new transactions", owner:"anthony", category:"Revenue", link:"https://dashboard.stripe.com" },
  ],
  weekly:[
    { task:"Generate & schedule 7 Pinterest pins", owner:"antonio", category:"Marketing" },
    { task:"Review eDecades analytics", owner:"anthony", category:"Growth", link:"https://app.base44.com" },
    { task:"Post 1 YouTube Short or TikTok about a decade", owner:"anthony", category:"Marketing" },
    { task:"Add new content to eDecades", owner:"anthony", category:"Content", link:"https://edecades.com" },
    { task:"Check Stripe verification status", owner:"anthony", category:"Revenue", link:"https://dashboard.stripe.com" },
    { task:"Send 1 outreach email to affiliate or partner", owner:"antonio", category:"Revenue" },
    { task:"Review Pinterest analytics — top performing pins", owner:"anthony", category:"Marketing", link:"https://analytics.pinterest.com" },
  ],
  monthly:[
    { task:"Add new visual update or section to eDecades", owner:"antonio", category:"Content" },
    { task:"Review and update King Xcel landing pages", owner:"antonio", category:"Maintenance" },
    { task:"Run a Pinterest or social media ad campaign", owner:"anthony", category:"Marketing" },
    { task:"Check domain renewals on GoDaddy", owner:"anthony", category:"Maintenance", link:"https://godaddy.com" },
    { task:"Review affiliate revenue and payouts", owner:"anthony", category:"Revenue" },
    { task:"Audit entity data and back up records", owner:"antonio", category:"Maintenance" },
  ],
};

const TABS = [
  { id:"dashboard", label:"📊 Dashboard" },
  { id:"products", label:"🚀 Products" },
  { id:"errors", label:"🚨 Errors" },
  { id:"directories", label:"🗂️ Directories" },
  { id:"social", label:"📱 Social Media" },
  { id:"ops", label:"📋 Ops Tasks" },
  { id:"automations", label:"⚡ Automations" },
  { id:"bizinfo", label:"🏢 Biz Info" },
  { id:"data", label:"🗃️ Data" },
];

// ─────────────────────────────────────────────
// HELPER COMPONENTS
// ─────────────────────────────────────────────
function CopyBtn({ text, label="" }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={()=>{ navigator.clipboard.writeText(text); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
      style={{ background:copied?"#16a34a22":"#1f2937", border:`1px solid ${copied?"#16a34a":"#374151"}`, color:copied?"#4ade80":"#9ca3af", borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, cursor:"pointer", flexShrink:0 }}>
      {copied?"✓ Copied":`Copy ${label}`}
    </button>
  );
}

function Stat({ icon, label, value, color }) {
  return (
    <div style={{ background:"#111827", border:`1px solid ${color}33`, borderRadius:12, padding:"16px", textAlign:"center" }}>
      <div style={{ fontSize:22, marginBottom:4 }}>{icon}</div>
      <div style={{ color, fontWeight:900, fontSize:22 }}>{value}</div>
      <div style={{ color:"#9ca3af", fontSize:11, marginTop:2 }}>{label}</div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
export default function KingXcelPanel() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState("dashboard");

  // Data state
  const [dirs, setDirs] = useState([]);
  const [errors, setErrors] = useState([]);
  const [opsRecords, setOpsRecords] = useState([]);
  const [entityData, setEntityData] = useState({});
  const [loading, setLoading] = useState({});

  // UI state
  const [dirFilter, setDirFilter] = useState("All");
  const [dirSearch, setDirSearch] = useState("");
  const [errorFilter, setErrorFilter] = useState("All");
  const [opsTab, setOpsTab] = useState("daily");
  const [opsChecked, setOpsChecked] = useState({});
  const [dataTab, setDataTab] = useState("onthisday");
  const [updatingDir, setUpdatingDir] = useState(null);
  const [updatingErr, setUpdatingErr] = useState(null);
  const [bulkOpening, setBulkOpening] = useState(false);
  const [showNewError, setShowNewError] = useState(false);
  const [newError, setNewError] = useState({ section:"",error_type:"Other",description:"",page:"",status:"Open",severity:"Medium",fix_notes:"",decade:"" });
  const [savingErr, setSavingErr] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genDecade, setGenDecade] = useState("1980s");
  const [genTopic, setGenTopic] = useState("Music");
  const [genPlatform, setGenPlatform] = useState("LinkedIn");
  const [genOutput, setGenOutput] = useState("");
  const [genHashtags, setGenHashtags] = useState("");
  const [copied, setCopied] = useState(false);

  const login = () => { if(pw===ADMIN_PASSWORD) setAuth(true); else alert("Incorrect password."); };

  // Load data per tab
  useEffect(()=>{
    if(!auth) return;
    if(tab==="directories" && dirs.length===0) {
      DirectorySubmission.list({ sort:"priority", limit:200 }).then(d=>{
        const order={High:0,Medium:1,Low:2};
        setDirs([...d].sort((a,b)=>(order[a.priority]??3)-(order[b.priority]??3)));
      });
    }
    if(tab==="errors" && errors.length===0) {
      SiteError.list({ sort:"-created_date", limit:200 }).then(setErrors);
    }
    if(tab==="data" && !entityData[dataTab]) loadEntityData(dataTab);
  },[tab,auth]);

  useEffect(()=>{
    if(auth && tab==="data") loadEntityData(dataTab);
  },[dataTab]);

  const ENTITY_MAP = {
    onthisday: OnThisDay, trivia: TriviaQuestion, scores: TriviaScore,
    ancestry: FamilyAncestry, capsules: TimeCapsule, art: GenerativeArt, ops: OpsTracker,
  };

  const loadEntityData = async (key) => {
    if(!ENTITY_MAP[key]) return;
    setLoading(p=>({...p,[key]:true}));
    const d = await ENTITY_MAP[key].list({ sort:"-created_date", limit:100 });
    setEntityData(p=>({...p,[key]:d}));
    setLoading(p=>({...p,[key]:false}));
  };

  const updateDir = async (id, status) => {
    setUpdatingDir(id);
    const now = new Date().toISOString().split("T")[0];
    const u = { status };
    if(status==="Submitted") u.submitted_date = now;
    if(status==="Verified") u.verified_date = now;
    await DirectorySubmission.update(id, u);
    setDirs(p=>p.map(d=>d.id===id?{...d,...u}:d));
    setUpdatingDir(null);
  };

  const updateErr = async (id, status) => {
    setUpdatingErr(id);
    await SiteError.update(id, { status });
    setErrors(p=>p.map(e=>e.id===id?{...e,status}:e));
    setUpdatingErr(null);
  };

  const addError = async () => {
    if(!newError.section||!newError.description) return alert("Section and description required.");
    setSavingErr(true);
    const created = await SiteError.create({...newError, auto_detected:false});
    setErrors(p=>[created,...p]);
    setNewError({section:"",error_type:"Other",description:"",page:"",status:"Open",severity:"Medium",fix_notes:"",decade:""});
    setShowNewError(false);
    setSavingErr(false);
  };

  const openAllDirs = (list) => {
    setBulkOpening(true);
    list.forEach((d,i)=>setTimeout(()=>window.open(d.url,"_blank"),i*700));
    setTimeout(()=>setBulkOpening(false),list.length*700+500);
  };

  const generatePost = async () => {
    setGenerating(true);
    setGenOutput(""); setGenHashtags("");
    try {
      const r = await base44.integrations.Core.InvokeLLM({
        prompt: `Write an engaging ${genPlatform} social media post about "${genTopic}" in the "${genDecade}" for eDecades — a nostalgia & history platform. Make it fun, authentic, and include a call to action to visit eDecades.com. Also provide 6 relevant hashtags. JSON: { "content": "...", "hashtags": "..." }`,
        response_json_schema: { type:"object", properties:{ content:{type:"string"}, hashtags:{type:"string"} } }
      });
      setGenOutput(r.content||""); setGenHashtags(r.hashtags||"");
    } catch(e) { alert("Generation failed."); }
    setGenerating(false);
  };

  // ── Computed stats
  const openErrors = errors.filter(e=>e.status==="Open"||e.status==="In Progress");
  const fixedErrors = errors.filter(e=>e.status==="Fixed");
  const notSubmitted = dirs.filter(d=>d.status==="Not Submitted");
  const submitted = dirs.filter(d=>d.status==="Submitted");
  const verified = dirs.filter(d=>d.status==="Verified");
  const dirPct = dirs.length ? Math.round((submitted.length+verified.length)/dirs.length*100) : 0;
  const filteredDirs = dirs.filter(d=>{
    if(dirFilter!=="All"&&d.category!==dirFilter) return false;
    if(dirSearch&&!d.directory_name.toLowerCase().includes(dirSearch.toLowerCase())) return false;
    return true;
  });
  const filteredErrors = errorFilter==="All" ? errors : errors.filter(e=>e.status===errorFilter);

  // ─── LOGIN SCREEN
  if(!auth) return (
    <div style={{ background:"#07070e", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter, sans-serif" }}>
      <div style={{ background:"#111827", border:"2px solid #C9A84C44", borderRadius:20, padding:"48px 40px", width:"100%", maxWidth:420, textAlign:"center" }}>
        <div style={{ fontSize:56, marginBottom:12 }}>👑</div>
        <h1 style={{ color:"#C9A84C", fontWeight:900, fontSize:26, margin:"0 0 6px" }}>King Xcel Command Center</h1>
        <p style={{ color:"#6b7280", fontSize:13, marginBottom:28 }}>Full control panel for King Xcel Innovations<br/>eDecades · CourseGek · ResumeCrafted · All Products</p>
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Admin password" style={{ width:"100%", background:"#1f2937", border:"1px solid #374151", borderRadius:10, padding:"13px 14px", color:"#f3f4f6", fontSize:15, marginBottom:14, boxSizing:"border-box", textAlign:"center" }} />
        <button onClick={login} style={{ width:"100%", background:"linear-gradient(135deg,#C9A84C,#8B6914)", border:"none", borderRadius:10, padding:"14px 0", fontWeight:900, fontSize:16, cursor:"pointer", color:"#000" }}>Enter Command Center</button>
      </div>
    </div>
  );

  // ─── MAIN PANEL
  return (
    <div style={{ background:"#07070e", minHeight:"100vh", color:"#f3f4f6", fontFamily:"Inter, sans-serif" }}>

      {/* NEW ERROR MODAL */}
      {showNewError && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ background:"#1f2937", borderRadius:16, width:"100%", maxWidth:560, padding:28, maxHeight:"90vh", overflowY:"auto" }}>
            <h3 style={{ color:"#ef4444", fontWeight:800, marginBottom:20 }}>🚨 Report New Error</h3>
            {[["Section","section","text"],["Page","page","text"],["Description","description","textarea"],["Fix Notes","fix_notes","textarea"]].map(([lbl,fld,tp])=>(
              <div key={fld} style={{ marginBottom:12 }}>
                <label style={{ color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase", display:"block", marginBottom:4 }}>{lbl}</label>
                {tp==="textarea" ? <textarea value={newError[fld]} onChange={e=>setNewError(p=>({...p,[fld]:e.target.value}))} rows={3} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:13, resize:"vertical", boxSizing:"border-box" }} /> : <input value={newError[fld]} onChange={e=>setNewError(p=>({...p,[fld]:e.target.value}))} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:13, boxSizing:"border-box" }} />}
              </div>
            ))}
            {[["Error Type","error_type",["Broken Image","Video Unavailable","Broken Link","Missing Content","Layout Issue","White Background","Other"]],["Severity","severity",["Critical","High","Medium","Low"]],["Status","status",["Open","In Progress","Fixed","Wont Fix"]]].map(([lbl,fld,opts])=>(
              <div key={fld} style={{ marginBottom:12 }}>
                <label style={{ color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase", display:"block", marginBottom:4 }}>{lbl}</label>
                <select value={newError[fld]} onChange={e=>setNewError(p=>({...p,[fld]:e.target.value}))} style={{ width:"100%", background:"#111827", border:"1px solid #374151", borderRadius:8, padding:"9px 12px", color:"#f3f4f6", fontSize:13 }}>
                  {opts.map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div style={{ display:"flex", gap:10, marginTop:20 }}>
              <button onClick={()=>setShowNewError(false)} style={{ flex:1, background:"#374151", border:"none", borderRadius:8, padding:"11px", color:"#fff", cursor:"pointer", fontWeight:700 }}>Cancel</button>
              <button onClick={addError} disabled={savingErr} style={{ flex:2, background:"#ef4444", border:"none", borderRadius:8, padding:"11px", color:"#fff", cursor:"pointer", fontWeight:900 }}>{savingErr?"Saving...":"Report Error"}</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background:"rgba(7,7,14,0.98)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(201,168,76,0.2)", padding:"14px 20px", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1300, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:22 }}>👑</span>
            <span style={{ color:"#C9A84C", fontWeight:900, fontSize:17 }}>King Xcel Command Center</span>
            {openErrors.length>0 && <span style={{ background:"#ef4444", color:"#fff", borderRadius:99, padding:"2px 8px", fontSize:10, fontWeight:900 }}>{openErrors.length} errors</span>}
          </div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:"5px 12px", borderRadius:99, fontSize:11, fontWeight:700, cursor:"pointer", border:"none", background:tab===t.id?"#C9A84C":"#1f2937", color:tab===t.id?"#000":"#9ca3af", position:"relative" }}>
                {t.label}
                {t.id==="errors"&&openErrors.length>0&&tab!=="errors"&&<span style={{ position:"absolute", top:-4, right:-4, background:"#ef4444", color:"#fff", borderRadius:"50%", width:13, height:13, fontSize:8, fontWeight:900, display:"flex", alignItems:"center", justifyContent:"center" }}>{openErrors.length}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1300, margin:"0 auto", padding:"24px 16px 100px" }}>

        {/* ══════════════════════════════════
            DASHBOARD
        ══════════════════════════════════ */}
        {tab==="dashboard" && (
          <>
            {/* Stripe banner */}
            <div style={{ background:"#F59E0B11", border:"1px solid #F59E0B44", borderRadius:14, padding:"16px 22px", marginBottom:24, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
              <div>
                <span style={{ color:"#F59E0B", fontWeight:800, fontSize:15 }}>⏳ Stripe Account Under Review</span>
                <div style={{ color:"#9ca3af", fontSize:12, marginTop:3 }}>acct_1T4XQARonfiMrfdu · Submitted Mar 24, 2026 · anthonykittles@outlook.com</div>
              </div>
              <a href="https://dashboard.stripe.com" target="_blank" style={{ background:"#F59E0B", color:"#000", borderRadius:8, padding:"8px 18px", fontWeight:800, fontSize:12, textDecoration:"none" }}>Check Status →</a>
            </div>

            {openErrors.length>0 && (
              <div onClick={()=>setTab("errors")} style={{ background:"#ef444411", border:"2px solid #ef4444", borderRadius:12, padding:"14px 20px", marginBottom:20, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <span style={{ color:"#ef4444", fontWeight:800 }}>🚨 {openErrors.length} Open Site Errors — Click to View & Fix</span>
                <span style={{ color:"#ef4444", fontWeight:800 }}>→</span>
              </div>
            )}

            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))", gap:10, marginBottom:24 }}>
              <Stat icon="🚀" label="Live Products" value={PRODUCTS.filter(p=>p.status==="live").length} color="#C9A84C" />
              <Stat icon="⚡" label="Active Automations" value={AUTOMATIONS.length} color="#22c55e" />
              <Stat icon="🗂️" label="Directories" value={dirs.length||"38"} color="#3b82f6" />
              <Stat icon="📤" label="Submitted" value={submitted.length||"—"} color="#eab308" />
              <Stat icon="🚨" label="Open Errors" value={openErrors.length} color="#ef4444" />
              <Stat icon="✅" label="Fixed Errors" value={fixedErrors.length} color="#22c55e" />
              <Stat icon="📱" label="Social Channels" value={SOCIAL_CHANNELS.length} color="#8b5cf6" />
              <Stat icon="📧" label="Daily Auto-Posts" value="3×/day" color="#f97316" />
            </div>

            {/* Quick links */}
            <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:14, padding:"18px 20px", marginBottom:20 }}>
              <div style={{ color:"#C9A84C", fontWeight:800, fontSize:14, marginBottom:14 }}>⚡ Quick Links</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:8 }}>
                {QUICK_LINKS.map(l=>(
                  <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer" style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8, padding:"10px 12px", textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:16 }}>{l.icon}</span>
                    <span style={{ color:"#e5e7eb", fontSize:12, fontWeight:600 }}>{l.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Automations summary */}
            <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:14, padding:"18px 20px" }}>
              <div style={{ color:"#22c55e", fontWeight:800, fontSize:14, marginBottom:14 }}>⚡ Active Automations</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {AUTOMATIONS.map((a,i)=>(
                  <div key={i} style={{ background:"#1f2937", borderRadius:10, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
                    <div>
                      <span style={{ fontSize:16, marginRight:8 }}>{a.icon}</span>
                      <span style={{ color:"#f3f4f6", fontWeight:700, fontSize:13 }}>{a.name}</span>
                      <div style={{ color:"#6b7280", fontSize:11, marginTop:2 }}>{a.schedule} · {a.platforms}</div>
                    </div>
                    <span style={{ background:"#22c55e22", color:"#4ade80", border:"1px solid #22c55e44", borderRadius:99, padding:"3px 10px", fontSize:10, fontWeight:700 }}>● Active</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════
            PRODUCTS
        ══════════════════════════════════ */}
        {tab==="products" && (
          <>
            <h2 style={{ color:"#C9A84C", fontWeight:900, fontSize:20, margin:"0 0 20px" }}>🚀 King Xcel Portfolio</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
              {PRODUCTS.map(p=>(
                <div key={p.name} style={{ background:"#111827", border:`2px solid ${p.color}33`, borderRadius:16, padding:"20px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <span style={{ fontSize:28 }}>{p.icon}</span>
                    <div>
                      <div style={{ color:p.color, fontWeight:900, fontSize:17 }}>{p.name}</div>
                      <div style={{ color:"#6b7280", fontSize:11 }}>{p.category}</div>
                    </div>
                    <span style={{ marginLeft:"auto", background:p.status==="live"?"#22c55e22":"#6b728022", color:p.status==="live"?"#4ade80":"#9ca3af", border:`1px solid ${p.status==="live"?"#22c55e44":"#6b728044"}`, borderRadius:99, padding:"3px 10px", fontSize:10, fontWeight:700 }}>{p.status==="live"?"✅ Live":"🔜 Soon"}</span>
                  </div>
                  <p style={{ color:"#9ca3af", fontSize:12, margin:"0 0 14px", lineHeight:1.5 }}>{p.description}</p>
                  {p.appUrl!=="##" && p.appUrl!=="#" && (
                    <a href={p.appUrl} target="_blank" rel="noopener noreferrer" style={{ background:p.color, color:"#000", borderRadius:8, padding:"8px 16px", fontSize:12, fontWeight:800, textDecoration:"none", display:"inline-block" }}>Open App →</a>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════
            ERRORS
        ══════════════════════════════════ */}
        {tab==="errors" && (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:10 }}>
              <div>
                <h2 style={{ color:"#ef4444", fontWeight:900, fontSize:20, margin:"0 0 4px" }}>🚨 Site Error Monitor</h2>
                <p style={{ color:"#9ca3af", fontSize:13, margin:0 }}>Track and fix all eDecades site errors</p>
              </div>
              <button onClick={()=>setShowNewError(true)} style={{ background:"#ef4444", border:"none", borderRadius:10, padding:"9px 18px", color:"#fff", fontWeight:900, fontSize:12, cursor:"pointer" }}>+ Report Error</button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:8, marginBottom:16 }}>
              {[["🔴","Open",openErrors.length,"#ef4444"],["✅","Fixed",fixedErrors.length,"#22c55e"],["📺","Video",errors.filter(e=>e.error_type==="Video Unavailable").length,"#8b5cf6"],["🖼️","Images",errors.filter(e=>e.error_type==="Broken Image").length,"#3b82f6"],["⚠️","Critical",errors.filter(e=>e.severity==="Critical"&&e.status==="Open").length,"#dc2626"]].map(([icon,label,val,color])=>(
                <div key={label} style={{ background:"#111827", border:`1px solid ${color}33`, borderRadius:10, padding:"12px", textAlign:"center" }}>
                  <div style={{ fontSize:18 }}>{icon}</div>
                  <div style={{ color, fontWeight:900, fontSize:20 }}>{val}</div>
                  <div style={{ color:"#9ca3af", fontSize:10 }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
              {["All","Open","In Progress","Fixed","Wont Fix"].map(f=>(
                <button key={f} onClick={()=>setErrorFilter(f)} style={{ padding:"5px 14px", borderRadius:99, fontSize:11, fontWeight:700, cursor:"pointer", border:"none", background:errorFilter===f?(ERROR_STATUS_COLORS[f]||"#C9A84C"):"#1f2937", color:errorFilter===f?"#fff":"#9ca3af" }}>{f}</button>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {filteredErrors.map(err=>(
                <div key={err.id} style={{ background:"#111827", border:`1px solid ${ERROR_STATUS_COLORS[err.status]||"#374151"}33`, borderRadius:12, padding:"14px 16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:10, flexWrap:"wrap" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:6, alignItems:"center" }}>
                        <span>{ERROR_TYPE_EMOJIS[err.error_type]||"⚠️"}</span>
                        <span style={{ color:"#f3f4f6", fontWeight:800, fontSize:14 }}>{err.section}</span>
                        <span style={{ background:SEVERITY_COLORS[err.severity]+"22", color:SEVERITY_COLORS[err.severity], borderRadius:99, padding:"2px 7px", fontSize:9, fontWeight:700 }}>{err.severity}</span>
                        {err.auto_detected&&<span style={{ background:"#3b82f622", color:"#60a5fa", borderRadius:99, padding:"2px 7px", fontSize:9 }}>Auto</span>}
                      </div>
                      {err.page&&<div style={{ color:"#6b7280", fontSize:11, marginBottom:3 }}>📄 {err.page}{err.decade?` · ${err.decade}`:""}</div>}
                      <div style={{ color:"#d1d5db", fontSize:12, marginBottom:err.fix_notes?6:0 }}>{err.description}</div>
                      {err.fix_notes&&<div style={{ background:"#1f2937", borderLeft:"3px solid #C9A84C", borderRadius:6, padding:"6px 10px" }}><span style={{ color:"#C9A84C", fontSize:10, fontWeight:700 }}>FIX: </span><span style={{ color:"#9ca3af", fontSize:11 }}>{err.fix_notes}</span></div>}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"flex-end" }}>
                      <span style={{ background:ERROR_STATUS_COLORS[err.status]+"22", color:ERROR_STATUS_COLORS[err.status], borderRadius:99, padding:"3px 10px", fontSize:10, fontWeight:700 }}>{err.status}</span>
                      <div style={{ display:"flex", gap:4, flexWrap:"wrap", justifyContent:"flex-end" }}>
                        {["Open","In Progress","Fixed","Wont Fix"].filter(s=>s!==err.status).map(s=>(
                          <button key={s} onClick={()=>updateErr(err.id,s)} disabled={updatingErr===err.id} style={{ background:ERROR_STATUS_COLORS[s]+"22", border:`1px solid ${ERROR_STATUS_COLORS[s]}44`, color:ERROR_STATUS_COLORS[s], borderRadius:5, padding:"3px 7px", fontSize:9, fontWeight:700, cursor:"pointer" }}>
                            {s==="Fixed"?"✅ Fix":s==="In Progress"?"🔧 WIP":s==="Open"?"🔴 Open":"❌ Skip"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredErrors.length===0&&<div style={{ textAlign:"center", padding:40, color:"#6b7280" }}>🎉 No errors in this category!</div>}
            </div>
          </>
        )}

        {/* ══════════════════════════════════
            DIRECTORIES
        ══════════════════════════════════ */}
        {tab==="directories" && (
          <>
            <div style={{ background:"linear-gradient(135deg,#C9A84C11,#1f2937)", border:"2px solid #C9A84C33", borderRadius:16, padding:"20px", marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10, flexWrap:"wrap", gap:8 }}>
                <div><h2 style={{ color:"#C9A84C", fontWeight:900, fontSize:18, margin:"0 0 3px" }}>Directory Submission Progress</h2><div style={{ color:"#9ca3af", fontSize:12 }}>{submitted.length+verified.length} of {dirs.length} submitted or verified</div></div>
                <span style={{ color:"#C9A84C", fontWeight:900, fontSize:32 }}>{dirPct}%</span>
              </div>
              <div style={{ background:"#111827", borderRadius:99, height:12 }}>
                <div style={{ background:"linear-gradient(90deg,#C9A84C,#d4956e)", width:`${dirPct}%`, height:12, borderRadius:99, transition:"width 0.5s" }} />
              </div>
            </div>

            <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
              <input value={dirSearch} onChange={e=>setDirSearch(e.target.value)} placeholder="🔍 Search..." style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8, padding:"7px 12px", color:"#f3f4f6", fontSize:12, flex:1, minWidth:140 }} />
              <select value={dirFilter} onChange={e=>setDirFilter(e.target.value)} style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:8, padding:"7px 12px", color:"#f3f4f6", fontSize:12 }}>
                {["All",...Object.keys(CATEGORY_COLORS)].map(c=><option key={c}>{c}</option>)}
              </select>
              <button onClick={()=>openAllDirs(filteredDirs.filter(d=>d.status==="Not Submitted"))} disabled={bulkOpening} style={{ background:"#C9A84C22", border:"1px solid #C9A84C55", color:"#C9A84C", borderRadius:8, padding:"7px 14px", fontWeight:800, fontSize:11, cursor:"pointer" }}>
                {bulkOpening?"Opening...`":"🚀 Open All Unsubmitted"}
              </button>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {filteredDirs.map(d=>(
                <div key={d.id} style={{ background:"#111827", border:`1px solid ${STATUS_COLORS[d.status]||"#1f2937"}22`, borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"flex-start", gap:12, flexWrap:"wrap" }}>
                  <div style={{ flex:1, minWidth:180 }}>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:5, alignItems:"center" }}>
                      <span style={{ color:"#f3f4f6", fontWeight:800, fontSize:14 }}>{d.directory_name}</span>
                      <span style={{ background:(CATEGORY_COLORS[d.category]||"#6b7280")+"22", color:CATEGORY_COLORS[d.category]||"#6b7280", borderRadius:99, padding:"2px 7px", fontSize:9, fontWeight:700 }}>{d.category}</span>
                      {d.is_free&&<span style={{ background:"#22c55e22", color:"#4ade80", borderRadius:99, padding:"2px 7px", fontSize:9, fontWeight:700 }}>FREE</span>}
                      <span style={{ background:(d.priority==="High"?"#ef4444":d.priority==="Medium"?"#f97316":"#6b7280")+"22", color:d.priority==="High"?"#ef4444":d.priority==="Medium"?"#f97316":"#9ca3af", borderRadius:99, padding:"2px 7px", fontSize:9, fontWeight:700 }}>{d.priority}</span>
                    </div>
                    <div style={{ color:"#9ca3af", fontSize:11, marginBottom:3 }}>{d.notes}</div>
                    <div style={{ color:"#6b7280", fontSize:10 }}>DA {d.domain_authority} · {d.difficulty}</div>
                    {d.submitted_date&&<div style={{ color:"#eab308", fontSize:10, marginTop:2 }}>📤 Submitted: {d.submitted_date}</div>}
                    {d.verified_date&&<div style={{ color:"#22c55e", fontSize:10, marginTop:1 }}>✅ Verified: {d.verified_date}</div>}
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:5, alignItems:"flex-end" }}>
                    <span style={{ background:STATUS_COLORS[d.status]+"22", color:STATUS_COLORS[d.status], borderRadius:99, padding:"3px 10px", fontSize:10, fontWeight:700 }}>{d.status}</span>
                    <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ background:"#C9A84C", color:"#000", borderRadius:7, padding:"6px 14px", fontSize:11, fontWeight:800, textDecoration:"none" }}>Submit →</a>
                    <div style={{ display:"flex", gap:4 }}>
                      {["Submitted","Verified","Not Submitted"].map(s=>(
                        <button key={s} onClick={()=>updateDir(d.id,s)} disabled={updatingDir===d.id||d.status===s} style={{ background:STATUS_COLORS[s]+"22", border:`1px solid ${STATUS_COLORS[s]}44`, color:STATUS_COLORS[s], borderRadius:5, padding:"2px 7px", fontSize:9, fontWeight:700, cursor:d.status===s?"default":"pointer", opacity:d.status===s?1:0.7 }}>
                          {s==="Not Submitted"?"Reset":s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════
            SOCIAL MEDIA
        ══════════════════════════════════ */}
        {tab==="social" && (
          <>
            <h2 style={{ color:"#C9A84C", fontWeight:900, fontSize:20, margin:"0 0 20px" }}>📱 Social Media Command</h2>

            {/* Channel Status */}
            <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:14, padding:"18px 20px", marginBottom:18 }}>
              <div style={{ color:"#C9A84C", fontWeight:800, fontSize:13, marginBottom:14 }}>📡 Channel Status</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:8 }}>
                {SOCIAL_CHANNELS.map(c=>(
                  <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:10, padding:"12px 14px", textDecoration:"none", display:"block" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{ fontSize:20 }}>{c.emoji}</span>
                      <span style={{ color:"#f3f4f6", fontWeight:700, fontSize:13 }}>{c.name}</span>
                    </div>
                    <div style={{ color:c.status.startsWith("✅")?"#4ade80":"#fbbf24", fontSize:11 }}>{c.status}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* AI Post Generator */}
            <div style={{ background:"#111827", border:"2px solid #C9A84C33", borderRadius:14, padding:"20px", marginBottom:18 }}>
              <div style={{ color:"#C9A84C", fontWeight:800, fontSize:14, marginBottom:16 }}>🤖 AI Post Generator</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10, marginBottom:14 }}>
                {[["Platform",genPlatform,setGenPlatform,["LinkedIn","Pinterest","Twitter/X","Facebook","Instagram","TikTok","Discord"]],
                  ["Decade",genDecade,setGenDecade,["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s","2020s"]],
                  ["Topic",genTopic,setGenTopic,["Music","Fashion","Movies","Events","Technology","Sports","Culture","Fun Facts","Notable People"]]
                ].map(([label,val,setter,opts])=>(
                  <div key={label}>
                    <label style={{ color:"#6b7280", fontSize:10, fontWeight:700, textTransform:"uppercase", display:"block", marginBottom:4 }}>{label}</label>
                    <select value={val} onChange={e=>setter(e.target.value)} style={{ width:"100%", background:"#1f2937", border:"1px solid #374151", borderRadius:8, padding:"8px 10px", color:"#f3f4f6", fontSize:12 }}>
                      {opts.map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
              <button onClick={generatePost} disabled={generating} style={{ background:generating?"#374151":"linear-gradient(135deg,#C9A84C,#8B6914)", border:"none", borderRadius:10, padding:"10px 24px", color:"#000", fontWeight:900, fontSize:13, cursor:generating?"not-allowed":"pointer", marginBottom:14 }}>
                {generating?"⏳ Generating...":"✨ Generate Post"}
              </button>
              {genOutput&&(
                <div style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:10, padding:"14px" }}>
                  <div style={{ color:"#f3f4f6", fontSize:13, lineHeight:1.6, marginBottom:10, whiteSpace:"pre-wrap" }}>{genOutput}</div>
                  {genHashtags&&<div style={{ color:"#3b82f6", fontSize:12, marginBottom:12 }}>{genHashtags}</div>}
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    <CopyBtn text={`${genOutput}\n\n${genHashtags}`} label="Post" />
                    <button onClick={()=>{setGenOutput("");setGenHashtags("");}} style={{ background:"#374151", border:"none", borderRadius:6, padding:"4px 10px", color:"#9ca3af", fontSize:11, cursor:"pointer" }}>Clear</button>
                  </div>
                </div>
              )}
            </div>

            {/* Reddit communities */}
            <div style={{ background:"#111827", border:"1px solid #f97316", borderRadius:14, padding:"18px 20px" }}>
              <div style={{ color:"#f97316", fontWeight:800, fontSize:13, marginBottom:12 }}>🤖 Reddit Communities (Free Organic Traffic)</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {[["r/nostalgia","2M+","https://reddit.com/r/nostalgia"],["r/OldSchoolCool","5M+","https://reddit.com/r/OldSchoolCool"],["r/history","17M+","https://reddit.com/r/history"],["r/80s","500K+","https://reddit.com/r/80s"],["r/90s","800K+","https://reddit.com/r/90s"],["r/vintageads","300K+","https://reddit.com/r/vintageads"],["r/ClassicRock","1M+","https://reddit.com/r/ClassicRock"],["r/TriviaNight","100K+","https://reddit.com/r/TriviaNight"]].map(([name,members,url])=>(
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{ background:"#f9741622", border:"1px solid #f9741633", borderRadius:8, padding:"6px 12px", textDecoration:"none" }}>
                    <div style={{ color:"#f97316", fontWeight:700, fontSize:12 }}>{name}</div>
                    <div style={{ color:"#9ca3af", fontSize:10 }}>{members} members</div>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════
            OPS TASKS
        ══════════════════════════════════ */}
        {tab==="ops" && (
          <>
            <h2 style={{ color:"#C9A84C", fontWeight:900, fontSize:20, margin:"0 0 20px" }}>📋 Operations Task Tracker</h2>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              {["daily","weekly","monthly"].map(t=>(
                <button key={t} onClick={()=>{ setOpsTab(t); setOpsChecked({}); }} style={{ padding:"7px 18px", borderRadius:99, fontWeight:700, fontSize:12, border:"none", cursor:"pointer", background:opsTab===t?"#C9A84C":"#1f2937", color:opsTab===t?"#000":"#9ca3af" }}>
                  {t==="daily"?"📅 Daily":t==="weekly"?"🗓️ Weekly":"📆 Monthly"}
                </button>
              ))}
            </div>
            {/* Progress */}
            <div style={{ marginBottom:16 }}>
              {(() => {
                const tasks = OPS_TASKS[opsTab];
                const done = tasks.filter((_,i)=>opsChecked[`${opsTab}-${i}`]).length;
                const pct = Math.round(done/tasks.length*100);
                return (
                  <>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ color:"#9ca3af", fontSize:12 }}>{done}/{tasks.length} complete</span>
                      <span style={{ color:"#C9A84C", fontSize:12, fontWeight:700 }}>{pct}%</span>
                    </div>
                    <div style={{ background:"#1f2937", borderRadius:99, height:8 }}>
                      <div style={{ background:"linear-gradient(90deg,#C9A84C,#d4956e)", width:`${pct}%`, height:8, borderRadius:99, transition:"width 0.4s" }} />
                    </div>
                  </>
                );
              })()}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {OPS_TASKS[opsTab].map((task,i)=>{
                const key=`${opsTab}-${i}`;
                const done=!!opsChecked[key];
                return (
                  <div key={key} onClick={()=>setOpsChecked(p=>({...p,[key]:!p[key]}))} style={{ background:done?"#0f2016":"#111827", border:`1px solid ${done?"#166534":"#1f2937"}`, borderRadius:12, padding:"14px 16px", cursor:"pointer", opacity:done?0.6:1 }}>
                    <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                      <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${done?"#4ade80":"#C9A84C"}`, background:done?"#4ade80":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                        {done&&<span style={{ color:"#000", fontSize:11, fontWeight:900 }}>✓</span>}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ color:done?"#6b7280":"#f3f4f6", fontWeight:700, fontSize:13, textDecoration:done?"line-through":"none", marginBottom:6 }}>{task.task}</div>
                        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                          <span style={{ background:task.owner==="antonio"?"#7f1d1d55":"#1e3a5f55", color:task.owner==="antonio"?"#fca5a5":"#93c5fd", border:`1px solid ${task.owner==="antonio"?"#991b1b":"#1d4ed8"}`, borderRadius:99, padding:"2px 8px", fontSize:10, fontWeight:700 }}>
                            {task.owner==="antonio"?"🤖 Antonio":"👤 You"}
                          </span>
                          <span style={{ background:"#ffffff11", color:"#9ca3af", borderRadius:99, padding:"2px 8px", fontSize:10 }}>{task.category}</span>
                        </div>
                        {task.link&&!done&&(
                          <a href={task.link} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ display:"inline-block", marginTop:8, background:"#C9A84C22", border:"1px solid #C9A84C44", color:"#C9A84C", borderRadius:6, padding:"4px 10px", fontSize:10, fontWeight:700, textDecoration:"none" }}>Open →</a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ══════════════════════════════════
            AUTOMATIONS
        ══════════════════════════════════ */}
        {tab==="automations" && (
          <>
            <h2 style={{ color:"#22c55e", fontWeight:900, fontSize:20, margin:"0 0 20px" }}>⚡ Automations Running</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {AUTOMATIONS.map((a,i)=>(
                <div key={i} style={{ background:"#111827", border:"2px solid #22c55e22", borderRadius:14, padding:"20px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10 }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                        <span style={{ fontSize:24 }}>{a.icon}</span>
                        <span style={{ color:"#f3f4f6", fontWeight:800, fontSize:16 }}>{a.name}</span>
                        <span style={{ background:"#22c55e22", color:"#4ade80", border:"1px solid #22c55e44", borderRadius:99, padding:"3px 10px", fontSize:10, fontWeight:700 }}>● Active</span>
                      </div>
                      <div style={{ color:"#9ca3af", fontSize:13, marginBottom:4 }}>🕐 {a.schedule}</div>
                      <div style={{ color:"#6b7280", fontSize:12 }}>📡 {a.platforms}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background:"#111827", border:"1px solid #374151", borderRadius:14, padding:"18px 20px", marginTop:20 }}>
              <div style={{ color:"#9ca3af", fontWeight:800, fontSize:13, marginBottom:10 }}>📌 Automation Notes</div>
              <div style={{ color:"#6b7280", fontSize:12, lineHeight:1.7 }}>
                • Social posts auto-run 3× daily at 9 AM, 3 PM, 9 PM Central (LinkedIn + Discord + Slack)<br/>
                • Affiliate monitor checks every 12 hours — checks kitt001@kingxcelinnovations.com<br/>
                • Directory reminders rotate through 38 directories weekly<br/>
                • All automations log results to this admin panel<br/>
                • To adjust schedules, ask Antonio
              </div>
            </div>
          </>
        )}

        {/* ══════════════════════════════════
            BUSINESS INFO
        ══════════════════════════════════ */}
        {tab==="bizinfo" && (
          <>
            <h2 style={{ color:"#C9A84C", fontWeight:900, fontSize:20, margin:"0 0 6px" }}>🏢 Business Info — Copy & Paste for Submissions</h2>
            <p style={{ color:"#9ca3af", fontSize:13, margin:"0 0 20px" }}>Use these for directory submissions, press kits, and social profiles.</p>

            {/* QR codes */}
            <div style={{ background:"#111827", border:"1px solid #C9A84C33", borderRadius:14, padding:"18px 20px", marginBottom:18 }}>
              <div style={{ color:"#C9A84C", fontWeight:800, fontSize:13, marginBottom:14 }}>📲 QR Codes</div>
              <div style={{ display:"flex", gap:16, flexWrap:"wrap", alignItems:"flex-start" }}>
                {[
                  { label:"Square (Social Media)", url:"https://base44.app/api/apps/69c207112c5856fdf7bb496b/files/mp/public/69c207112c5856fdf7bb496b/596e7b25a_edecades_qr_square.png" },
                  { label:"Branded (Print)", url:"https://base44.app/api/apps/69c207112c5856fdf7bb496b/files/mp/public/69c207112c5856fdf7bb496b/6df6515e4_edecades_qr.png" },
                  { label:"eDecades.com Domain", url:"https://base44.app/api/apps/69c207112c5856fdf7bb496b/files/mp/public/69c207112c5856fdf7bb496b/44a1fb577_edecades_qr_domain.png" },
                ].map(qr=>(
                  <div key={qr.label} style={{ textAlign:"center" }}>
                    <img src={qr.url} alt={qr.label} style={{ width:110, height:110, borderRadius:10, border:"2px solid #C9A84C44" }} />
                    <div style={{ color:"#9ca3af", fontSize:10, marginTop:6, marginBottom:4 }}>{qr.label}</div>
                    <div style={{ display:"flex", gap:4, justifyContent:"center" }}>
                      <a href={qr.url} download target="_blank" style={{ background:"#C9A84C22", border:"1px solid #C9A84C44", color:"#C9A84C", borderRadius:6, padding:"3px 8px", fontSize:10, fontWeight:700, textDecoration:"none" }}>↓ Download</a>
                      <CopyBtn text={qr.url} label="URL" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {[
              ["Business Name", BUSINESS_INFO.name],
              ["Company Name", BUSINESS_INFO.company],
              ["Website URL", BUSINESS_INFO.url],
              ["Short Description", BUSINESS_INFO.shortDesc],
              ["Full Description", BUSINESS_INFO.description],
              ["Address", BUSINESS_INFO.address],
              ["City", BUSINESS_INFO.city],
              ["State", BUSINESS_INFO.state],
              ["ZIP Code", BUSINESS_INFO.zip],
              ["Email", BUSINESS_INFO.email],
              ["Business Category", BUSINESS_INFO.category],
              ["Keywords / Tags", BUSINESS_INFO.keywords],
            ].map(([label, value])=>(
              <div key={label} style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:10, padding:"12px 16px", marginBottom:8, display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                <div style={{ flex:1 }}>
                  <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, textTransform:"uppercase", marginBottom:4 }}>{label}</div>
                  <div style={{ color:"#f3f4f6", fontSize:13, wordBreak:"break-all" }}>{value}</div>
                </div>
                <CopyBtn text={value} label={label} />
              </div>
            ))}
            <div style={{ background:"#111827", border:"2px solid #C9A84C33", borderRadius:12, padding:"16px", marginTop:10 }}>
              <div style={{ color:"#C9A84C", fontWeight:800, fontSize:13, marginBottom:10 }}>📦 Copy Full Package</div>
              <CopyBtn text={`Business Name: ${BUSINESS_INFO.name}\nCompany: ${BUSINESS_INFO.company}\nWebsite: ${BUSINESS_INFO.url}\nDescription: ${BUSINESS_INFO.description}\nAddress: ${BUSINESS_INFO.address}\nEmail: ${BUSINESS_INFO.email}\nCategory: ${BUSINESS_INFO.category}\nKeywords: ${BUSINESS_INFO.keywords}`} label="Full Package" />
            </div>
          </>
        )}

        {/* ══════════════════════════════════
            DATA / ENTITIES
        ══════════════════════════════════ */}
        {tab==="data" && (
          <>
            <h2 style={{ color:"#C9A84C", fontWeight:900, fontSize:20, margin:"0 0 20px" }}>🗃️ Data Management</h2>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
              {[["onthisday","📅 On This Day"],["trivia","🧠 Trivia"],["scores","🏆 Scores"],["ancestry","🌳 Ancestry"],["capsules","📦 Capsules"],["art","🎨 Art"],["ops","⚙️ Ops"]].map(([key,label])=>(
                <button key={key} onClick={()=>setDataTab(key)} style={{ padding:"6px 14px", borderRadius:99, fontSize:11, fontWeight:700, cursor:"pointer", border:"none", background:dataTab===key?"#C9A84C":"#1f2937", color:dataTab===key?"#000":"#9ca3af" }}>{label}</button>
              ))}
            </div>
            {loading[dataTab] ? (
              <div style={{ textAlign:"center", padding:40, color:"#6b7280" }}>Loading...</div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {(entityData[dataTab]||[]).map(r=>(
                  <div key={r.id} style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:10, padding:"12px 14px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ color:"#f3f4f6", fontWeight:700, fontSize:13 }}>{r.title||r.question||r.player_name||r.family_name||r.task_name||r.author_name||r.name||r.id}</div>
                      <div style={{ color:"#6b7280", fontSize:11, marginTop:2 }}>
                        {r.decade&&<span style={{ marginRight:8 }}>📅 {r.decade}</span>}
                        {r.status&&<span style={{ marginRight:8 }}>⚙️ {r.status}</span>}
                        {r.category&&<span>🏷️ {r.category}</span>}
                        <span style={{ marginLeft:8, color:"#374151" }}>· {new Date(r.created_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ color:"#374151", fontSize:10 }}>{r.id}</div>
                  </div>
                ))}
                {(entityData[dataTab]||[]).length===0&&!loading[dataTab]&&<div style={{ textAlign:"center", padding:40, color:"#6b7280" }}>No records yet.</div>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
