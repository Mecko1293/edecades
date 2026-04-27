import { useState, useEffect } from "react";
import { OnThisDay, TriviaQuestion, TriviaScore, FamilyAncestry, TimeCapsule, GenerativeArt, SportsMVP } from "@/api/entities";

const ADMIN_PASSWORD = "KingXcel2026";

function MiniBar({ label, value, max, color }) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ color: "#9ca3af", fontSize: 12 }}>{label}</span>
        <span style={{ color, fontWeight: 700, fontSize: 12 }}>{value}</span>
      </div>
      <div style={{ background: "#1f2937", borderRadius: 99, height: 7 }}>
        <div style={{ background: color, width: `${pct}%`, height: 7, borderRadius: 99, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #1f2937, #111827)",
      border: `1px solid ${color}33`,
      borderRadius: 16, padding: "22px 20px",
      display: "flex", flexDirection: "column", gap: 6,
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: -10, right: -10, fontSize: 64,
        opacity: 0.06, userSelect: "none"
      }}>{icon}</div>
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ fontSize: 34, fontWeight: 900, color }}>{value}</div>
      <div style={{ fontWeight: 700, fontSize: 14, color: "#e5e7eb" }}>{label}</div>
      {sub && <div style={{ color: "#6b7280", fontSize: 12 }}>{sub}</div>}
    </div>
  );
}

function DonutChart({ segments, size = 120 }) {
  const r = 40;
  const cx = size / 2;
  const cy = size / 2;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  let offset = 0;
  const paths = segments.map((seg) => {
    const pct = total ? seg.value / total : 0;
    const angle = pct * 2 * Math.PI;
    const x1 = cx + r * Math.sin(offset);
    const y1 = cy - r * Math.cos(offset);
    offset += angle;
    const x2 = cx + r * Math.sin(offset);
    const y2 = cy - r * Math.cos(offset);
    const largeArc = pct > 0.5 ? 1 : 0;
    return { d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`, color: seg.color, label: seg.label, value: seg.value, pct: Math.round(pct * 100) };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {paths.map((p, i) => (
        <path key={i} d={p.d} fill={p.color} opacity={0.85}>
          <title>{p.label}: {p.value} ({p.pct}%)</title>
        </path>
      ))}
      <circle cx={cx} cy={cy} r={28} fill="#111827" />
      <text x={cx} y={cy + 5} textAnchor="middle" fill="#f3f4f6" fontSize="13" fontWeight="bold">{total}</text>
    </svg>
  );
}

function BarChart({ data, color = "#C9A84C", height = 100 }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ fontSize: 10, color: "#6b7280", fontWeight: 700 }}>{d.value}</div>
          <div style={{
            width: "100%", background: color + "99",
            borderRadius: "4px 4px 0 0",
            height: max ? `${Math.max((d.value / max) * (height - 24), 4)}px` : 4,
            transition: "height 0.6s ease",
            border: `1px solid ${color}44`
          }} />
          <div style={{ fontSize: 9, color: "#9ca3af", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 32 }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

function ExportButton({ data, filename, label }) {
  const exportCSV = () => {
    if (!data || !data.length) return;
    const keys = Object.keys(data[0]).filter(k => !["created_by"].includes(k));
    const header = keys.join(",");
    const rows = data.map(row => keys.map(k => `"${String(row[k] ?? "").replace(/"/g, '""')}"`).join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename + ".csv";
    a.click(); URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    if (!data || !data.length) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename + ".json";
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: "flex", gap: 6 }}>
      <button onClick={exportCSV} style={{
        background: "#16a34a22", border: "1px solid #16a34a55",
        color: "#4ade80", borderRadius: 8, padding: "6px 12px",
        fontSize: 11, fontWeight: 700, cursor: "pointer"
      }}>⬇ CSV</button>
      <button onClick={exportJSON} style={{
        background: "#0ea5e922", border: "1px solid #0ea5e955",
        color: "#38bdf8", borderRadius: 8, padding: "6px 12px",
        fontSize: 11, fontWeight: 700, cursor: "pointer"
      }}>⬇ JSON</button>
    </div>
  );
}

const DECADE_LIST = ["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s"];

export default function AnalyticsDashboard() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // data
  const [onThisDayData, setOnThisDayData] = useState([]);
  const [triviaData, setTriviaData] = useState([]);
  const [scoresData, setScoresData] = useState([]);
  const [ancestryData, setAncestryData] = useState([]);
  const [capsulesData, setCapsulesData] = useState([]);
  const [artData, setArtData] = useState([]);
  const [mvpData, setMvpData] = useState([]);

  const login = () => { if (pw === ADMIN_PASSWORD) setAuth(true); else alert("Incorrect password."); };

  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    Promise.all([
      OnThisDay.list({ limit: 500 }),
      TriviaQuestion.list({ limit: 500 }),
      TriviaScore.list({ limit: 500 }),
      FamilyAncestry.list({ limit: 500 }),
      TimeCapsule.list({ limit: 500 }),
      GenerativeArt.list({ limit: 500 }),
      SportsMVP.list({ limit: 500 }),
    ]).then(([otd, tq, ts, fa, tc, ga, mvp]) => {
      setOnThisDayData(otd); setTriviaData(tq); setScoresData(ts);
      setAncestryData(fa); setCapsulesData(tc); setArtData(ga); setMvpData(mvp);
      setLoading(false);
    });
  }, [auth]);

  // computed stats
  const decadeCounts = (arr, key) => DECADE_LIST.map(d => ({ label: d, value: arr.filter(r => r[key] === d).length }));
  const totalCorrect = scoresData.reduce((s, r) => s + (r.correct_answers || 0), 0);
  const totalAnswers = scoresData.reduce((s, r) => s + (r.total_answers || 0), 0);
  const avgAccuracy = totalAnswers ? Math.round((totalCorrect / totalAnswers) * 100) : 0;
  const totalPoints = scoresData.reduce((s, r) => s + (r.total_points || 0), 0);
  const publicCapsules = capsulesData.filter(c => c.is_public).length;
  const featuredArt = artData.filter(a => a.is_featured).length;
  const hallOfFameMVPs = mvpData.filter(m => m.hall_of_fame).length;

  const triviaByDecade = DECADE_LIST.map(d => ({ label: d, value: triviaData.filter(r => r.decade === d).length }));
  const artByDecade = DECADE_LIST.map(d => ({ label: d, value: artData.filter(r => r.decade === d).length }));
  const otdByDecade = DECADE_LIST.map(d => ({ label: d, value: onThisDayData.filter(r => r.decade === d).length }));
  const otdCategories = [...new Set(onThisDayData.map(r => r.category).filter(Boolean))];
  const otdByCat = otdCategories.slice(0, 8).map((cat, i) => ({
    label: cat, value: onThisDayData.filter(r => r.category === cat).length,
    color: ["#C9A84C","#a855f7","#22c55e","#3b82f6","#ef4444","#f97316","#06b6d4","#ec4899"][i % 8]
  }));

  const TABS = [
    { id: "overview", label: "📊 Overview" },
    { id: "trivia", label: "🧠 Trivia" },
    { id: "content", label: "📅 Content" },
    { id: "art", label: "🎨 Art & Culture" },
    { id: "export", label: "⬇ Export" },
  ];

  if (!auth) return (
    <div style={{ background: "#07070e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ background: "#1f2937", border: "2px solid #C9A84C44", borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 400, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📊</div>
        <h1 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 24, marginBottom: 6 }}>Analytics Dashboard</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, marginBottom: 28 }}>King Xcel Innovations — Enter admin password</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} placeholder="Password" style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "13px 14px", color: "#f3f4f6", fontSize: 15, marginBottom: 14, boxSizing: "border-box", textAlign: "center" }} />
        <button onClick={login} style={{ width: "100%", background: "#C9A84C", border: "none", borderRadius: 10, padding: "13px 0", fontWeight: 900, fontSize: 16, cursor: "pointer", color: "#000" }}>View Dashboard</button>
      </div>
    </div>
  );

  if (loading) return (
    <div style={{ background: "#07070e", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A84C", fontFamily: "Inter, sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12, animation: "pulse 1s infinite" }}>📊</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Loading Analytics…</div>
        <div style={{ color: "#6b7280", fontSize: 13, marginTop: 6 }}>Crunching your data</div>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#07070e", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: "rgba(7,7,14,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "18px 32px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h1 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 22, margin: 0 }}>📊 Analytics Dashboard</h1>
            <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>King Xcel Innovations · Last updated: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                padding: "7px 16px", borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none",
                background: activeTab === t.id ? "#C9A84C" : "#1f2937",
                color: activeTab === t.id ? "#000" : "#9ca3af",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px 80px" }}>

        {/* ========== OVERVIEW ========== */}
        {activeTab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16, marginBottom: 40 }}>
              <StatCard icon="📅" label="On This Day Events" value={onThisDayData.length} color="#d97706" sub="Historical records" />
              <StatCard icon="🧠" label="Trivia Questions" value={triviaData.length} color="#eab308" sub="All decades" />
              <StatCard icon="🏆" label="Trivia Players" value={scoresData.length} color="#22c55e" sub={`${totalPoints.toLocaleString()} pts total`} />
              <StatCard icon="🌳" label="Family Ancestry" value={ancestryData.length} color="#10b981" sub="Heritage records" />
              <StatCard icon="📦" label="Time Capsules" value={capsulesData.length} color="#a78bfa" sub={`${publicCapsules} public`} />
              <StatCard icon="🎨" label="Generative Art" value={artData.length} color="#60a5fa" sub={`${featuredArt} featured`} />
              <StatCard icon="🏅" label="Sports MVPs" value={mvpData.length} color="#f97316" sub={`${hallOfFameMVPs} Hall of Fame`} />
              <StatCard icon="🎯" label="Quiz Accuracy" value={`${avgAccuracy}%`} color="#ec4899" sub={`${totalAnswers} answers logged`} />
            </div>

            {/* Total content bar chart */}
            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px 24px 20px", marginBottom: 24 }}>
              <h3 style={{ color: "#C9A84C", fontWeight: 800, fontSize: 15, margin: "0 0 20px" }}>📦 Content Volume by Category</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
                {[
                  { label: "On This Day", value: onThisDayData.length, color: "#d97706" },
                  { label: "Trivia Qs", value: triviaData.length, color: "#eab308" },
                  { label: "Players", value: scoresData.length, color: "#22c55e" },
                  { label: "Ancestry", value: ancestryData.length, color: "#10b981" },
                  { label: "Capsules", value: capsulesData.length, color: "#a78bfa" },
                  { label: "Art", value: artData.length, color: "#60a5fa" },
                  { label: "MVPs", value: mvpData.length, color: "#f97316" },
                ].map((d, i) => {
                  const max = Math.max(onThisDayData.length, triviaData.length, scoresData.length, ancestryData.length, capsulesData.length, artData.length, mvpData.length, 1);
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700 }}>{d.value}</div>
                      <div style={{ width: "100%", background: d.color + "88", borderRadius: "4px 4px 0 0", height: `${Math.max((d.value / max) * 96, 4)}px`, border: `1px solid ${d.color}44`, transition: "height 0.6s" }} />
                      <div style={{ fontSize: 9, color: "#9ca3af", textAlign: "center" }}>{d.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* On This Day by Category donut */}
            {otdByCat.length > 0 && (
              <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px", marginBottom: 24, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
                <div>
                  <h3 style={{ color: "#C9A84C", fontWeight: 800, fontSize: 15, margin: "0 0 16px" }}>📅 On This Day — By Category</h3>
                  <DonutChart segments={otdByCat} size={130} />
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  {otdByCat.map((seg, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 2, background: seg.color, flexShrink: 0 }} />
                      <span style={{ color: "#d1d5db", fontSize: 13, flex: 1 }}>{seg.label}</span>
                      <span style={{ color: seg.color, fontWeight: 700, fontSize: 13 }}>{seg.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ========== TRIVIA ========== */}
        {activeTab === "trivia" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
              <StatCard icon="🧠" label="Total Questions" value={triviaData.length} color="#eab308" />
              <StatCard icon="🏆" label="Total Players" value={scoresData.length} color="#22c55e" />
              <StatCard icon="🎯" label="Avg Accuracy" value={`${avgAccuracy}%`} color="#ec4899" sub={`${totalAnswers} answers`} />
              <StatCard icon="⭐" label="Total Points" value={totalPoints.toLocaleString()} color="#C9A84C" />
            </div>

            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
              <h3 style={{ color: "#eab308", fontWeight: 800, fontSize: 15, margin: "0 0 20px" }}>🧠 Questions per Decade</h3>
              <BarChart data={triviaByDecade} color="#eab308" height={120} />
            </div>

            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
              <h3 style={{ color: "#22c55e", fontWeight: 800, fontSize: 15, margin: "0 0 16px" }}>🏆 Top 10 Players</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[...scoresData].sort((a, b) => (b.total_points || 0) - (a.total_points || 0)).slice(0, 10).map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#1f2937", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: i < 3 ? "#C9A84C" : "#374151", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: i < 3 ? "#000" : "#9ca3af", flexShrink: 0 }}>
                      {i < 3 ? ["🥇","🥈","🥉"][i] : `#${i + 1}`}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 14 }}>{p.player_name || "Anonymous"}</div>
                      <div style={{ color: "#6b7280", fontSize: 11 }}>{p.quizzes_completed || 0} quizzes · {p.correct_answers || 0}/{p.total_answers || 0} correct</div>
                    </div>
                    <div style={{ color: "#C9A84C", fontWeight: 900, fontSize: 16 }}>{(p.total_points || 0).toLocaleString()} pts</div>
                  </div>
                ))}
                {scoresData.length === 0 && <div style={{ color: "#6b7280", fontSize: 14, textAlign: "center", padding: "20px 0" }}>No players yet — share the trivia quiz to get scores!</div>}
              </div>
            </div>

            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px" }}>
              <h3 style={{ color: "#a78bfa", fontWeight: 800, fontSize: 15, margin: "0 0 16px" }}>📊 Questions by Difficulty</h3>
              {["easy","medium","hard"].map((diff, i) => {
                const count = triviaData.filter(q => q.difficulty === diff).length;
                return <MiniBar key={diff} label={diff.charAt(0).toUpperCase() + diff.slice(1)} value={count} max={triviaData.length || 1} color={["#22c55e","#eab308","#ef4444"][i]} />;
              })}
            </div>
          </>
        )}

        {/* ========== CONTENT ========== */}
        {activeTab === "content" && (
          <>
            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
              <h3 style={{ color: "#d97706", fontWeight: 800, fontSize: 15, margin: "0 0 20px" }}>📅 On This Day — By Decade</h3>
              <BarChart data={otdByDecade} color="#d97706" height={120} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16, marginBottom: 24 }}>
              {otdByCat.map((cat, i) => (
                <div key={i} style={{ background: "#111827", border: `1px solid ${cat.color}33`, borderRadius: 12, padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: cat.color, fontWeight: 700, fontSize: 14 }}>{cat.label}</span>
                    <span style={{ color: "#f3f4f6", fontWeight: 900, fontSize: 22 }}>{cat.value}</span>
                  </div>
                  <div style={{ background: "#1f2937", borderRadius: 99, height: 6, marginTop: 10 }}>
                    <div style={{ background: cat.color, width: `${Math.round((cat.value / (onThisDayData.length || 1)) * 100)}%`, height: 6, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
              <h3 style={{ color: "#10b981", fontWeight: 800, fontSize: 15, margin: "0 0 16px" }}>📦 Time Capsules</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {[
                  { label: "Total Capsules", value: capsulesData.length, color: "#a78bfa" },
                  { label: "Public", value: publicCapsules, color: "#22c55e" },
                  { label: "Private", value: capsulesData.length - publicCapsules, color: "#6b7280" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#1f2937", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                    <div style={{ color: s.color, fontWeight: 900, fontSize: 28 }}>{s.value}</div>
                    <div style={{ color: "#9ca3af", fontSize: 12 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px" }}>
              <h3 style={{ color: "#f97316", fontWeight: 800, fontSize: 15, margin: "0 0 16px" }}>🏅 Sports MVPs</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                {[...new Set(mvpData.map(m => m.sport).filter(Boolean))].slice(0, 8).map((sport, i) => {
                  const count = mvpData.filter(m => m.sport === sport).length;
                  const colors = ["#f97316","#C9A84C","#22c55e","#3b82f6","#a78bfa","#ec4899","#10b981","#eab308"];
                  return (
                    <div key={sport} style={{ background: "#1f2937", border: `1px solid ${colors[i % 8]}33`, borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
                      <div style={{ color: colors[i % 8], fontWeight: 900, fontSize: 22 }}>{count}</div>
                      <div style={{ color: "#9ca3af", fontSize: 12 }}>{sport}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ========== ART ========== */}
        {activeTab === "art" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
              <StatCard icon="🎨" label="Total Artworks" value={artData.length} color="#60a5fa" />
              <StatCard icon="⭐" label="Featured Pieces" value={featuredArt} color="#C9A84C" />
              <StatCard icon="❤️" label="Total Likes" value={artData.reduce((s, a) => s + (a.likes || 0), 0)} color="#ec4899" />
              <StatCard icon="👥" label="Unique Artists" value={new Set(artData.map(a => a.author_email).filter(Boolean)).size} color="#22c55e" />
            </div>

            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px", marginBottom: 24 }}>
              <h3 style={{ color: "#60a5fa", fontWeight: 800, fontSize: 15, margin: "0 0 20px" }}>🎨 Art by Decade</h3>
              <BarChart data={artByDecade} color="#60a5fa" height={120} />
            </div>

            <div style={{ background: "#111827", border: "1px solid #1f2937", borderRadius: 16, padding: "24px" }}>
              <h3 style={{ color: "#C9A84C", fontWeight: 800, fontSize: 15, margin: "0 0 16px" }}>🌳 Family Ancestry Origins</h3>
              {ancestryData.length === 0 ? (
                <p style={{ color: "#6b7280", fontSize: 14 }}>No ancestry records yet.</p>
              ) : (
                [...new Set(ancestryData.map(a => a.origin_country).filter(Boolean))].slice(0, 10).map((country, i) => {
                  const count = ancestryData.filter(a => a.origin_country === country).length;
                  return <MiniBar key={country} label={country} value={count} max={ancestryData.length} color="#10b981" />;
                })
              )}
            </div>
          </>
        )}

        {/* ========== EXPORT ========== */}
        {activeTab === "export" && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{ color: "#C9A84C", fontWeight: 800, fontSize: 18, margin: "0 0 8px" }}>⬇ Export Your Data</h2>
              <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>Download any dataset as CSV (Excel-compatible) or JSON format.</p>
            </div>
            {[
              { label: "📅 On This Day Events", data: onThisDayData, filename: "on_this_day_events", count: onThisDayData.length, color: "#d97706" },
              { label: "🧠 Trivia Questions", data: triviaData, filename: "trivia_questions", count: triviaData.length, color: "#eab308" },
              { label: "🏆 Trivia Scores", data: scoresData, filename: "trivia_scores", count: scoresData.length, color: "#22c55e" },
              { label: "🌳 Family Ancestry", data: ancestryData, filename: "family_ancestry", count: ancestryData.length, color: "#10b981" },
              { label: "📦 Time Capsules", data: capsulesData, filename: "time_capsules", count: capsulesData.length, color: "#a78bfa" },
              { label: "🎨 Generative Art", data: artData, filename: "generative_art", count: artData.length, color: "#60a5fa" },
              { label: "🏅 Sports MVPs", data: mvpData, filename: "sports_mvps", count: mvpData.length, color: "#f97316" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#111827", border: `1px solid ${item.color}22`,
                borderRadius: 14, padding: "18px 20px", marginBottom: 12,
                display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12
              }}>
                <div>
                  <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 15 }}>{item.label}</div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginTop: 2 }}>{item.count} record{item.count !== 1 ? "s" : ""} available</div>
                </div>
                <ExportButton data={item.data} filename={item.filename} label={item.label} />
              </div>
            ))}
            <div style={{ background: "#111827", border: "1px solid #374151", borderRadius: 14, padding: "18px 20px", marginTop: 24 }}>
              <div style={{ color: "#C9A84C", fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📋 Export All as Combined Report</div>
              <div style={{ color: "#6b7280", fontSize: 13, marginBottom: 14 }}>Downloads all datasets in a single JSON file for full backup or migration.</div>
              <button onClick={() => {
                const all = { on_this_day: onThisDayData, trivia: triviaData, scores: scoresData, ancestry: ancestryData, capsules: capsulesData, art: artData, mvps: mvpData, exported_at: new Date().toISOString() };
                const blob = new Blob([JSON.stringify(all, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a"); a.href = url; a.download = "king_xcel_full_export.json"; a.click(); URL.revokeObjectURL(url);
              }} style={{ background: "linear-gradient(135deg, #C9A84C, #8B6914)", border: "none", borderRadius: 10, padding: "11px 28px", color: "#000", fontWeight: 900, fontSize: 14, cursor: "pointer" }}>⬇ Export Full Backup (JSON)</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
