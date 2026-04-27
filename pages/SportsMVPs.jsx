import { useState, useEffect } from "react";
import { OnThisDay, TimeCapsule, GenerativeArt } from "@/api/entities";

const DECADES = ["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s"];
const DECADE_EMOJIS = {"1920s":"🎷","1930s":"🎬","1940s":"✈️","1950s":"🎸","1960s":"☮️","1970s":"🕺","1980s":"🕹️","1990s":"📼","2000s":"💿","2010s":"📱"};
const DECADE_COLORS = {"1920s":"#d4956e","1930s":"#b8a88a","1940s":"#7a9abf","1950s":"#d4788a","1960s":"#c4956e","1970s":"#c4784f","1980s":"#b87ac4","1990s":"#7aaa8a","2000s":"#7aaac4","2010s":"#c47aa4"};

const ON_THIS_DAY_MONTHLY = {
  "01": [{day:"1",title:"New Year Celebrations Throughout History",year:"Multiple"},  {day:"15",title:"Martin Luther King Jr. Birthday",year:"1929"}, {day:"17",title:"Benjamin Franklin Born",year:"1706"}],
  "02": [{day:"1",title:"Langston Hughes Born",year:"1902"},{day:"9",title:"Beatles Appear on Ed Sullivan",year:"1964"},{day:"14",title:"Valentine's Day Origins",year:"496"}],
  "03": [{day:"4",title:"FDR's First Inaugural Address",year:"1933"},{day:"17",title:"St. Patrick's Day Origins",year:"461"},{day:"25",title:"Triangle Shirtwaist Fire",year:"1911"}],
  "04": [{day:"4",title:"Martin Luther King Jr. Assassinated",year:"1968"},{day:"9",title:"Civil War Ends",year:"1865"},{day:"15",title:"Abraham Lincoln Shot",year:"1865"}],
  "05": [{day:"8",title:"V-E Day — WWII Ends in Europe",year:"1945"},{day:"17",title:"Brown v. Board of Education",year:"1954"},{day:"25",title:"Star Wars Released",year:"1977"}],
  "06": [{day:"6",title:"D-Day Normandy Invasion",year:"1944"},{day:"17",title:"Watergate Break-in",year:"1972"},{day:"28",title:"Stonewall Riots Begin",year:"1969"}],
  "07": [{day:"4",title:"Declaration of Independence Signed",year:"1776"},{day:"20",title:"Moon Landing — Neil Armstrong Walks",year:"1969"},{day:"26",title:"Americans with Disabilities Act",year:"1990"}],
  "08": [{day:"6",title:"Atomic Bomb Dropped on Hiroshima",year:"1945"},{day:"15",title:"Woodstock Festival Begins",year:"1969"},{day:"28",title:"I Have a Dream — MLK Speech",year:"1963"}],
  "09": [{day:"1",title:"Germany Invades Poland — WWII Begins",year:"1939"},{day:"11",title:"September 11 Attacks",year:"2001"},{day:"24",title:"Nirvana Releases Nevermind",year:"1991"}],
  "10": [{day:"4",title:"Sputnik Launched",year:"1957"},{day:"14",title:"Chuck Yeager Breaks Sound Barrier",year:"1947"},{day:"29",title:"Stock Market Crashes — Black Tuesday",year:"1929"}],
  "11": [{day:"4",title:"Barack Obama Elected President",year:"2008"},{day:"9",title:"Berlin Wall Falls",year:"1989"},{day:"22",title:"JFK Assassinated",year:"1963"}],
  "12": [{day:"1",title:"Rosa Parks Refuses to Give Up Seat",year:"1955"},{day:"7",title:"Pearl Harbor Attack",year:"1941"},{day:"17",title:"Wright Brothers First Flight",year:"1903"}],
};

export default function MyHistoryDashboard() {
  const [followedDecades, setFollowedDecades] = useState(["1960s","1980s","1990s"]);
  const [onThisDayEvents, setOnThisDayEvents] = useState([]);
  const [capsules, setCapsules] = useState([]);
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMonth, setActiveMonth] = useState(String(new Date().getMonth()+1).padStart(2,"0"));
  const [lightbox, setLightbox] = useState(null);
  const [activeTab, setActiveTab] = useState("timeline");

  const today = new Date();
  const todayDay = String(today.getDate()).padStart(2,"0");
  const todayMonth = String(today.getMonth()+1).padStart(2,"0");

  useEffect(() => {
    Promise.all([
      OnThisDay.list({ limit: 100 }),
      TimeCapsule.list({ limit: 50 }),
      GenerativeArt.list({ limit: 50 }),
    ]).then(([otd, tc, ga]) => {
      setOnThisDayEvents(otd);
      setCapsules(tc.filter(c => c.is_public));
      setArt(ga);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const toggleDecade = (d) => setFollowedDecades(prev => prev.includes(d) ? prev.filter(x=>x!==d) : [...prev, d]);

  const filteredEvents = onThisDayEvents.filter(e => followedDecades.includes(e.decade));
  const filteredCapsules = capsules.filter(c => followedDecades.includes(c.decade));
  const filteredArt = art.filter(a => followedDecades.includes(a.decade));
  const todayEvents = ON_THIS_DAY_MONTHLY[todayMonth] || [];
  const monthEvents = ON_THIS_DAY_MONTHLY[activeMonth] || [];

  const MONTHS = ["01","02","03","04","05","06","07","08","09","10","11","12"];
  const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <div style={{ background:"#07070e", minHeight:"100vh", color:"#f3f4f6", fontFamily:"Inter, sans-serif" }}>
      {lightbox && (
        <div onClick={()=>setLightbox(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", cursor:"zoom-out", padding:24 }}>
          <div onClick={e=>e.stopPropagation()} style={{ maxWidth:700, width:"100%", textAlign:"center" }}>
            <img src={lightbox.url} alt={lightbox.title} style={{ maxWidth:"100%", maxHeight:"70vh", borderRadius:12 }} onError={e=>e.target.style.display="none"} />
            <p style={{ color:"#C9A84C", fontWeight:700, marginTop:12 }}>{lightbox.title}</p>
            <button onClick={()=>setLightbox(null)} style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:99, padding:"7px 20px", color:"#fff", cursor:"pointer", marginTop:8 }}>✕ Close</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg, #1f2937, #111827)", borderBottom:"2px solid #C9A84C33", padding:"32px 24px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div style={{ fontSize:40, marginBottom:8 }}>🗂️</div>
          <h1 style={{ color:"#C9A84C", fontSize:26, fontWeight:900, margin:"0 0 6px" }}>My History Dashboard</h1>
          <p style={{ color:"#9ca3af", fontSize:14, margin:"0 0 20px" }}>Your personalized timeline based on the decades you follow</p>

          {/* Followed decades */}
          <div>
            <div style={{ color:"#6b7280", fontSize:11, fontWeight:700, textTransform:"uppercase", marginBottom:8 }}>Follow Decades</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {DECADES.map(d => (
                <button key={d} onClick={()=>toggleDecade(d)} style={{
                  padding:"6px 16px", borderRadius:99, fontWeight:700, fontSize:12, cursor:"pointer",
                  border:`2px solid ${followedDecades.includes(d) ? DECADE_COLORS[d] : "#374151"}`,
                  background: followedDecades.includes(d) ? DECADE_COLORS[d]+"22" : "#1f2937",
                  color: followedDecades.includes(d) ? DECADE_COLORS[d] : "#6b7280",
                }}>
                  {DECADE_EMOJIS[d]} {d} {followedDecades.includes(d) ? "✓" : "+"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"24px 16px 60px" }}>
        {/* Tabs */}
        <div style={{ display:"flex", gap:8, marginBottom:24, flexWrap:"wrap" }}>
          {[["timeline","📅 Timeline"],["calendar","🗓️ Calendar"],["capsules","📦 Capsules"],["art","🎨 Art"]].map(([id,label])=>(
            <button key={id} onClick={()=>setActiveTab(id)} style={{ padding:"8px 18px", borderRadius:99, fontWeight:700, fontSize:13, cursor:"pointer", border:"none", background:activeTab===id?"#C9A84C":"#1f2937", color:activeTab===id?"#000":"#9ca3af" }}>{label}</button>
          ))}
        </div>

        {/* Today banner */}
        {todayEvents.length > 0 && activeTab==="timeline" && (
          <div style={{ background:"linear-gradient(135deg, #C9A84C22, #1f2937)", border:"2px solid #C9A84C44", borderRadius:16, padding:"18px 20px", marginBottom:24 }}>
            <div style={{ color:"#C9A84C", fontWeight:800, fontSize:14, marginBottom:10 }}>📅 On This Day — {today.toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}</div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {todayEvents.map((e,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                  <span style={{ color:"#C9A84C", fontWeight:900, fontSize:13, minWidth:20 }}>{e.day}</span>
                  <div><span style={{ color:"#f3f4f6", fontSize:13, fontWeight:700 }}>{e.title}</span><span style={{ color:"#6b7280", fontSize:12 }}> · {e.year}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline tab */}
        {activeTab==="timeline" && (
          <div>
            <div style={{ color:"#9ca3af", fontSize:12, fontWeight:700, textTransform:"uppercase", marginBottom:16 }}>Events from Your Followed Decades ({filteredEvents.length})</div>
            {loading ? <p style={{ color:"#6b7280" }}>Loading...</p> :
            filteredEvents.length===0 ? <p style={{ color:"#6b7280" }}>No events yet for your followed decades. Follow more decades above!</p> :
            <div style={{ position:"relative", paddingLeft:24 }}>
              <div style={{ position:"absolute", left:8, top:0, bottom:0, width:2, background:"#1f2937" }} />
              {filteredEvents.map((e,i)=>(
                <div key={e.id} style={{ position:"relative", marginBottom:20, paddingLeft:20 }}>
                  <div style={{ position:"absolute", left:-8, top:4, width:12, height:12, borderRadius:"50%", background:DECADE_COLORS[e.decade]||"#C9A84C", border:"2px solid #111827" }} />
                  <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:12, overflow:"hidden", display:"flex", gap:0 }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="#C9A84C44"}
                    onMouseLeave={e=>e.currentTarget.style.borderColor="#1f2937"}>
                    {e.photo_url && <img src={e.photo_url} alt={e.title} onClick={()=>setLightbox({url:e.photo_url,title:e.title})} style={{ width:90, objectFit:"cover", cursor:"zoom-in", flexShrink:0 }} onError={el=>el.target.style.display="none"} />}
                    <div style={{ padding:"12px 14px" }}>
                      <div style={{ display:"flex", gap:8, marginBottom:4, flexWrap:"wrap" }}>
                        <span style={{ background:DECADE_COLORS[e.decade]+"22", color:DECADE_COLORS[e.decade], borderRadius:99, padding:"2px 8px", fontSize:10, fontWeight:700 }}>{e.decade}</span>
                        <span style={{ color:"#d97706", fontSize:11 }}>{e.date_label}</span>
                      </div>
                      <div style={{ color:"#f3f4f6", fontWeight:700, fontSize:14, marginBottom:4 }}>{e.title}</div>
                      <div style={{ color:"#6b7280", fontSize:12, lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{e.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>}
          </div>
        )}

        {/* Calendar tab */}
        {activeTab==="calendar" && (
          <div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:20 }}>
              {MONTHS.map((m,i)=>(
                <button key={m} onClick={()=>setActiveMonth(m)} style={{ padding:"6px 14px", borderRadius:99, fontSize:12, fontWeight:700, cursor:"pointer", border:"none", background:activeMonth===m?"#C9A84C":"#1f2937", color:activeMonth===m?"#000":"#9ca3af" }}>{MONTH_NAMES[i]}</button>
              ))}
            </div>
            <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:16, padding:"20px" }}>
              <h3 style={{ color:"#C9A84C", fontWeight:800, fontSize:16, margin:"0 0 16px" }}>📅 {MONTH_NAMES[parseInt(activeMonth)-1]} — Historical Events</h3>
              {monthEvents.length===0 ? <p style={{ color:"#6b7280" }}>No events for this month.</p> :
              monthEvents.map((e,i)=>(
                <div key={i} style={{ display:"flex", gap:16, padding:"12px 0", borderBottom:i<monthEvents.length-1?"1px solid #1f2937":"none" }}>
                  <div style={{ width:40, height:40, background:"#C9A84C22", border:"2px solid #C9A84C44", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"#C9A84C", fontWeight:900, fontSize:14, flexShrink:0 }}>{e.day}</div>
                  <div>
                    <div style={{ color:"#f3f4f6", fontWeight:700, fontSize:14 }}>{e.title}</div>
                    <div style={{ color:"#6b7280", fontSize:12, marginTop:2 }}>{e.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Capsules tab */}
        {activeTab==="capsules" && (
          <div>
            <div style={{ color:"#9ca3af", fontSize:12, fontWeight:700, textTransform:"uppercase", marginBottom:16 }}>Time Capsules from Your Decades ({filteredCapsules.length})</div>
            {filteredCapsules.length===0 ? <p style={{ color:"#6b7280" }}>No public capsules yet for your followed decades.</p> :
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px,1fr))", gap:14 }}>
              {filteredCapsules.map(c=>(
                <div key={c.id} style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:14, padding:"16px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <span style={{ color:DECADE_COLORS[c.decade]||"#C9A84C", fontWeight:800, fontSize:15 }}>{c.decade}</span>
                    <span style={{ color:"#a78bfa", fontSize:12 }}>📦 {c.mood}</span>
                  </div>
                  <div style={{ color:"#f3f4f6", fontWeight:700, fontSize:14, marginBottom:6 }}>{c.title}</div>
                  <div style={{ color:"#6b7280", fontSize:12, lineHeight:1.5, display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{c.reflection}</div>
                  <div style={{ color:"#6b7280", fontSize:11, marginTop:8 }}>by {c.author_name} · ❤️ {c.likes||0}</div>
                </div>
              ))}
            </div>}
          </div>
        )}

        {/* Art tab */}
        {activeTab==="art" && (
          <div>
            <div style={{ color:"#9ca3af", fontSize:12, fontWeight:700, textTransform:"uppercase", marginBottom:16 }}>Generative Art from Your Decades ({filteredArt.length})</div>
            {filteredArt.length===0 ? <p style={{ color:"#6b7280" }}>No art yet for your followed decades. <a href="/GenerativeArtSpace" style={{ color:"#60a5fa" }}>Create some →</a></p> :
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:14 }}>
              {filteredArt.map(a=>(
                <div key={a.id} style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:12, overflow:"hidden" }}>
                  <img src={a.image_url} alt={a.title} onClick={()=>setLightbox({url:a.image_url,title:a.title})} style={{ width:"100%", height:160, objectFit:"cover", cursor:"zoom-in" }} onError={e=>e.target.style.display="none"} />
                  <div style={{ padding:"10px 12px" }}>
                    <div style={{ color:"#f3f4f6", fontWeight:700, fontSize:13 }}>{a.title}</div>
                    <div style={{ color:"#6b7280", fontSize:11, marginTop:3 }}>{a.decade} · by {a.author_name}</div>
                  </div>
                </div>
              ))}
            </div>}
          </div>
        )}
      </div>
    </div>
  );
}
