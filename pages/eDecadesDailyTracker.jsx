import { useState } from "react";

const tasks = {
  daily: [
    { task: "Post 1-2 fresh pins to Pinterest", owner: "anthony", category: "Marketing", tip: "Best times: 12pm, 6pm, 8pm CST", link: "https://pinterest.com" },
    { task: "Check eDecades new user signups", owner: "antonio", category: "Growth", tip: "I monitor entity triggers and flag unusual activity" },
    { task: "Respond to new forum posts or messages", owner: "anthony", category: "Community", tip: "Even a quick reply drives engagement", link: "https://edecades.com" },
    { task: "Monitor affiliate partner replies", owner: "antonio", category: "Revenue", tip: "Affiliate Reply Monitor runs every 12 hours automatically" },
    { task: "Share 1 post on TikTok, Instagram, or Facebook", owner: "anthony", category: "Marketing", tip: "Rotate platforms daily using your pre-written copy" },
    { task: "Check Stripe dashboard for new transactions", owner: "anthony", category: "Revenue", tip: "Look for CourseGek, ResumeCrafted, or CheapMedz activity", link: "https://dashboard.stripe.com" },
  ],
  weekly: [
    { task: "Generate & schedule 7 Pinterest pins", owner: "antonio", category: "Marketing", tip: "Just ask me — I'll generate AI pin graphics for you" },
    { task: "Review eDecades analytics", owner: "anthony", category: "Growth", tip: "Check App Analytics in Base44 dashboard", link: "https://app.base44.com" },
    { task: "Post 1 YouTube Short or TikTok about a decade", owner: "anthony", category: "Marketing", tip: "10-20 sec clips about decade facts perform extremely well" },
    { task: "Add new content to eDecades (artifact, event, etc.)", owner: "anthony", category: "Content", tip: "Fresh content keeps users coming back", link: "https://edecades.com" },
    { task: "Check Stripe verification status", owner: "anthony", category: "Revenue", tip: "Still under review — check for new flags", link: "https://dashboard.stripe.com" },
    { task: "Send 1 outreach email to affiliate or partner", owner: "antonio", category: "Revenue", tip: "CheapMedz and retro affiliate drafts are ready to send" },
    { task: "Review Pinterest analytics — top performing pins", owner: "anthony", category: "Marketing", tip: "Double down on what's working", link: "https://analytics.pinterest.com" },
  ],
  monthly: [
    { task: "Add new visual update or section to eDecades", owner: "antonio", category: "Content", tip: "I can generate new AI images or add new features on request" },
    { task: "Review and update King Xcel landing pages", owner: "antonio", category: "Maintenance", tip: "Keep pricing, features, and links fresh across all 5 sites" },
    { task: "Run a Pinterest or social media ad campaign", owner: "anthony", category: "Marketing", tip: "$5/day targeting nostalgia fans aged 25-55 drives signups", link: "https://ads.pinterest.com" },
    { task: "Check domain renewals on GoDaddy", owner: "anthony", category: "Maintenance", tip: "Make sure eDecades.com auto-renew is on", link: "https://godaddy.com" },
    { task: "Review affiliate revenue and payouts", owner: "anthony", category: "Revenue", tip: "Check GoodRx, Cost Plus Drugs, and active affiliate dashboards" },
    { task: "Audit entity data and back up records", owner: "antonio", category: "Maintenance", tip: "I can audit record counts and flag anything unusual" },
  ],
};

const catColors = {
  Marketing: "#a855f7",
  Growth: "#22c55e",
  Community: "#3b82f6",
  Revenue: "#eab308",
  Content: "#f43f5e",
  Maintenance: "#94a3b8",
};

export default function EDecadesDailyTracker() {
  const [activeTab, setActiveTab] = useState("daily");
  const [checked, setChecked] = useState({});
  const [filter, setFilter] = useState("all");

  const toggle = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const currentTasks = tasks[activeTab];
  const filtered = filter === "all" ? currentTasks : currentTasks.filter((t) => t.owner === filter);
  const completedCount = currentTasks.filter((_, i) => checked[`${activeTab}-${i}`]).length;
  const pct = Math.round((completedCount / currentTasks.length) * 100);

  return (
    <div style={{ background: "#1a1e2a", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif", color: "#eee" }}>
      
      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #333d4d, #2a2030)", borderBottom: "2px solid #d4956e44", padding: "32px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h1 style={{ color: "#d4956e", fontSize: 24, fontWeight: 800, margin: "0 0 4px" }}>📋 eDecades Operations Tracker</h1>
          <p style={{ color: "#aaa", fontSize: 13, margin: "0 0 20px" }}>What Antonio handles vs. what you do — daily, weekly, monthly</p>
          
          {/* Progress */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: "#ccc", fontSize: 12 }}>{completedCount}/{currentTasks.length} tasks complete</span>
            <span style={{ color: "#d4956e", fontSize: 12, fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ background: "#333d4d", borderRadius: 99, height: 8 }}>
            <div style={{ background: "linear-gradient(90deg, #d4956e, #c4784f)", width: `${pct}%`, height: 8, borderRadius: 99, transition: "width 0.4s" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        
        {/* TABS */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["daily", "weekly", "monthly"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setChecked({}); }}
              style={{
                padding: "8px 20px", borderRadius: 99, fontWeight: 700, fontSize: 13,
                border: "none", cursor: "pointer",
                background: activeTab === tab ? "#d4956e" : "#2d3548",
                color: activeTab === tab ? "#fff" : "#999",
              }}
            >
              {tab === "daily" ? "📅 Daily" : tab === "weekly" ? "🗓️ Weekly" : "📆 Monthly"}
            </button>
          ))}
        </div>

        {/* FILTER */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["all", "anthony", "antonio"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "5px 14px", borderRadius: 99, fontSize: 12, cursor: "pointer",
                border: `1px solid ${filter === f ? "#d4956e" : "#444"}`,
                background: filter === f ? "#d4956e22" : "transparent",
                color: filter === f ? "#d4956e" : "#777",
              }}
            >
              {f === "all" ? "All Tasks" : f === "anthony" ? "👤 My Tasks" : "🤖 Antonio's Tasks"}
            </button>
          ))}
        </div>

        {/* TASK LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((task) => {
            const idx = currentTasks.indexOf(task);
            const key = `${activeTab}-${idx}`;
            const done = !!checked[key];

            return (
              <div
                key={key}
                onClick={() => toggle(key)}
                style={{
                  background: done ? "#1a2e1a" : "#252b3a",
                  border: `1px solid ${done ? "#2d5a2d" : "#333d4d"}`,
                  borderRadius: 12, padding: "16px 18px",
                  opacity: done ? 0.55 : 1, cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  {/* Checkbox */}
                  <div style={{
                    width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 2,
                    border: `2px solid ${done ? "#4ade80" : "#d4956e"}`,
                    background: done ? "#4ade80" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {done && <span style={{ color: "#fff", fontSize: 13, fontWeight: 900, lineHeight: 1 }}>✓</span>}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: 15, color: done ? "#555" : "#eee", textDecoration: done ? "line-through" : "none" }}>
                      {task.task}
                    </p>

                    {/* Badges */}
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                      <span style={{
                        fontSize: 11, padding: "2px 10px", borderRadius: 99, fontWeight: 700,
                        background: task.owner === "antonio" ? "#7f1d1d55" : "#1e3a5f55",
                        color: task.owner === "antonio" ? "#fca5a5" : "#93c5fd",
                        border: `1px solid ${task.owner === "antonio" ? "#991b1b" : "#1d4ed8"}`,
                      }}>
                        {task.owner === "antonio" ? "🤖 Antonio" : "👤 You"}
                      </span>
                      <span style={{
                        fontSize: 11, padding: "2px 10px", borderRadius: 99, fontWeight: 600,
                        background: "#ffffff11", color: catColors[task.category] || "#aaa",
                        border: `1px solid ${catColors[task.category] || "#444"}44`,
                      }}>
                        {task.category}
                      </span>
                    </div>

                    {task.tip && <p style={{ margin: "0 0 6px", color: "#777", fontSize: 12 }}>💡 {task.tip}</p>}

                    {task.link && !done && (
                      <a
                        href={task.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{ color: "#d4956e", fontSize: 12, fontWeight: 600, textDecoration: "none" }}
                      >
                        → Open {new URL(task.link).hostname}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div style={{ background: "#252b3a", border: "1px solid #333d4d", borderRadius: 12, padding: "16px 20px", marginTop: 24 }}>
          <p style={{ color: "#d4956e", fontWeight: 700, fontSize: 14, margin: "0 0 12px" }}>📊 {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Summary</p>
          <div style={{ display: "flex", gap: 32 }}>
            <div>
              <p style={{ color: "#fca5a5", fontSize: 12, margin: "0 0 2px" }}>🤖 Antonio handles</p>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: 0 }}>{currentTasks.filter(t => t.owner === "antonio").length}</p>
            </div>
            <div>
              <p style={{ color: "#93c5fd", fontSize: 12, margin: "0 0 2px" }}>👤 You handle</p>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: 0 }}>{currentTasks.filter(t => t.owner === "anthony").length}</p>
            </div>
            <div>
              <p style={{ color: "#4ade80", fontSize: 12, margin: "0 0 2px" }}>✅ Completed</p>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 22, margin: 0 }}>{completedCount}</p>
            </div>
          </div>
        </div>

        <p style={{ color: "#444", fontSize: 11, textAlign: "center", marginTop: 20 }}>eDecades Operations Tracker • King Xcel Innovations</p>
      </div>
    </div>
  );
}
