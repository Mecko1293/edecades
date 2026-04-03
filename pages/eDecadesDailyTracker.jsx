import { useState } from "react";

const tasks = {
  daily: [
    {
      task: "Post 1-2 fresh pins to Pinterest",
      owner: "anthony",
      category: "Marketing",
      tip: "Use your cinematic decade images. Best times: 12pm, 6pm, 8pm CST",
      link: "https://pinterest.com",
    },
    {
      task: "Check eDecades new user signups",
      owner: "antonio",
      category: "Growth",
      tip: "I monitor entity triggers and flag unusual activity",
    },
    {
      task: "Respond to any new forum posts or messages",
      owner: "anthony",
      category: "Community",
      tip: "Active founders drive engagement — even a quick reply goes a long way",
      link: "https://eDecades.com",
    },
    {
      task: "Monitor affiliate partner replies (GoodRx, Cost Plus, etc.)",
      owner: "antonio",
      category: "Revenue",
      tip: "Affiliate Reply Monitor automation runs every 12 hours and flags responses",
    },
    {
      task: "Share 1 post on TikTok, Instagram, or Facebook",
      owner: "anthony",
      category: "Marketing",
      tip: "Use your pre-written launch copy. Rotate platforms daily.",
    },
    {
      task: "Check Stripe dashboard for new transactions",
      owner: "anthony",
      category: "Revenue",
      tip: "Look for CourseGek, ResumeCrafted, or CheapMedz activity",
      link: "https://dashboard.stripe.com",
    },
  ],
  weekly: [
    {
      task: "Generate & schedule 7 Pinterest pins for the week",
      owner: "antonio",
      category: "Marketing",
      tip: "I can generate AI pin graphics on request — just ask me",
    },
    {
      task: "Review eDecades analytics (users, pages, traffic)",
      owner: "anthony",
      category: "Growth",
      tip: "Check App Analytics in your Base44 dashboard",
      link: "https://app.base44.com",
    },
    {
      task: "Post 1 YouTube Short or TikTok video about a decade",
      owner: "anthony",
      category: "Marketing",
      tip: "10-20 sec clips about decade facts perform extremely well",
    },
    {
      task: "Update Featured Content or add a new Artifact/Historical Event",
      owner: "anthony",
      category: "Content",
      tip: "Fresh content keeps users coming back and boosts SEO",
      link: "https://eDecades.com",
    },
    {
      task: "Check Stripe verification status",
      owner: "anthony",
      category: "Revenue",
      tip: "Stripe is under review — check for any new requests or flags",
      link: "https://dashboard.stripe.com",
    },
    {
      task: "Send 1 outreach email to a potential affiliate or partner",
      owner: "antonio",
      category: "Revenue",
      tip: "I have CheapMedz and retro affiliate drafts ready to send",
    },
    {
      task: "Review Pinterest analytics — top performing pins",
      owner: "anthony",
      category: "Marketing",
      tip: "Double down on what's working. Repin top content.",
      link: "https://analytics.pinterest.com",
    },
  ],
  monthly: [
    {
      task: "Add a new decade page section or visual update to eDecades",
      owner: "antonio",
      category: "Content",
      tip: "I can generate new AI images, update decade facts, or add new features",
    },
    {
      task: "Review and update King Xcel portfolio landing pages",
      owner: "antonio",
      category: "Maintenance",
      tip: "Keep pricing, features, and links fresh across all 5 sites",
    },
    {
      task: "Run a Pinterest or social media ad campaign",
      owner: "anthony",
      category: "Marketing",
      tip: "Even $5/day targeting nostalgia fans aged 25-55 can drive signups",
      link: "https://ads.pinterest.com",
    },
    {
      task: "Check domain renewals (eDecades.com, GoDaddy)",
      owner: "anthony",
      category: "Maintenance",
      tip: "Make sure eDecades.com auto-renew is on",
      link: "https://godaddy.com",
    },
    {
      task: "Review affiliate revenue and payouts",
      owner: "anthony",
      category: "Revenue",
      tip: "Check GoodRx, Cost Plus Drugs, and any active affiliate dashboards",
    },
    {
      task: "Back up important data and review entity counts",
      owner: "antonio",
      category: "Maintenance",
      tip: "I can audit entity record counts and flag anything unusual",
    },
  ],
};

const categoryColors = {
  Marketing: { bg: "bg-purple-900/40", text: "text-purple-300", border: "border-purple-700" },
  Growth: { bg: "bg-green-900/40", text: "text-green-300", border: "border-green-700" },
  Community: { bg: "bg-blue-900/40", text: "text-blue-300", border: "border-blue-700" },
  Revenue: { bg: "bg-yellow-900/40", text: "text-yellow-300", border: "border-yellow-700" },
  Content: { bg: "bg-rose-900/40", text: "text-rose-300", border: "border-rose-700" },
  Maintenance: { bg: "bg-gray-700/40", text: "text-gray-300", border: "border-gray-600" },
};

const ownerConfig = {
  antonio: {
    label: "🤖 Antonio handles this",
    bg: "bg-rose-900/30",
    badge: "bg-rose-800 text-rose-200",
    border: "border-rose-800",
  },
  anthony: {
    label: "👤 You handle this",
    bg: "bg-slate-800/60",
    badge: "bg-slate-600 text-slate-200",
    border: "border-slate-600",
  },
};

const tabs = ["daily", "weekly", "monthly"];

export default function eDecadesDailyTracker() {
  const [activeTab, setActiveTab] = useState("daily");
  const [checked, setChecked] = useState({});
  const [filter, setFilter] = useState("all");

  const toggle = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const currentTasks = tasks[activeTab];
  const filtered =
    filter === "all"
      ? currentTasks
      : currentTasks.filter((t) => t.owner === filter);

  const completedCount = currentTasks.filter((t, i) => checked[`${activeTab}-${i}`]).length;
  const totalCount = currentTasks.length;
  const pct = Math.round((completedCount / totalCount) * 100);

  return (
    <div style={{ background: "#1a1e2a", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #333d4d, #2a2030)", borderBottom: "1px solid #d4956e33" }} className="px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <span style={{ fontSize: 32 }}>📋</span>
            <h1 style={{ color: "#d4956e", fontSize: 26, fontWeight: 800, margin: 0 }}>eDecades Operations Tracker</h1>
          </div>
          <p style={{ color: "#aaa", fontSize: 14, marginTop: 4 }}>
            Your complete task dashboard — what Antonio handles vs. what you do
          </p>

          {/* Progress Bar */}
          <div className="mt-5">
            <div className="flex justify-between mb-1">
              <span style={{ color: "#ccc", fontSize: 13 }}>{completedCount}/{totalCount} tasks done today</span>
              <span style={{ color: "#d4956e", fontSize: 13, fontWeight: 700 }}>{pct}%</span>
            </div>
            <div style={{ background: "#333d4d", borderRadius: 99, height: 8 }}>
              <div
                style={{
                  background: "linear-gradient(90deg, #d4956e, #c4784f)",
                  width: `${pct}%`,
                  height: 8,
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setChecked({}); }}
              style={{
                padding: "8px 20px",
                borderRadius: 99,
                fontWeight: 700,
                fontSize: 13,
                border: "none",
                cursor: "pointer",
                background: activeTab === tab ? "#d4956e" : "#333d4d",
                color: activeTab === tab ? "#fff" : "#aaa",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}
            >
              {tab === "daily" ? "📅 Daily" : tab === "weekly" ? "🗓️ Weekly" : "📆 Monthly"}
            </button>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {["all", "anthony", "antonio"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "5px 14px",
                borderRadius: 99,
                fontSize: 12,
                border: `1px solid ${filter === f ? "#d4956e" : "#444"}`,
                background: filter === f ? "#d4956e22" : "transparent",
                color: filter === f ? "#d4956e" : "#888",
                cursor: "pointer",
              }}
            >
              {f === "all" ? "All Tasks" : f === "anthony" ? "👤 My Tasks" : "🤖 Antonio's Tasks"}
            </button>
          ))}
        </div>

        {/* Task Cards */}
        <div className="flex flex-col gap-3">
          {filtered.map((task, i) => {
            const key = `${activeTab}-${currentTasks.indexOf(task)}`;
            const done = checked[key];
            const owner = ownerConfig[task.owner];
            const cat = categoryColors[task.category];

            return (
              <div
                key={key}
                style={{
                  background: done ? "#1e2a1e" : "#252b3a",
                  border: `1px solid ${done ? "#3a5a3a" : "#333d4d"}`,
                  borderRadius: 12,
                  padding: "16px 18px",
                  opacity: done ? 0.6 : 1,
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onClick={() => toggle(key)}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      border: `2px solid ${done ? "#4ade80" : "#d4956e"}`,
                      background: done ? "#4ade80" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {done && <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>✓</span>}
                  </div>

                  <div className="flex-1">
                    {/* Task title */}
                    <p style={{
                      color: done ? "#666" : "#eee",
                      fontWeight: 600,
                      fontSize: 15,
                      margin: 0,
                      textDecoration: done ? "line-through" : "none",
                    }}>
                      {task.task}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span style={{
                        fontSize: 11,
                        padding: "2px 10px",
                        borderRadius: 99,
                        fontWeight: 700,
                        background: task.owner === "antonio" ? "#7f1d1d44" : "#1e3a5f44",
                        color: task.owner === "antonio" ? "#fca5a5" : "#93c5fd",
                        border: `1px solid ${task.owner === "antonio" ? "#991b1b" : "#1d4ed8"}`,
                      }}>
                        {task.owner === "antonio" ? "🤖 Antonio" : "👤 You"}
                      </span>
                      <span style={{
                        fontSize: 11,
                        padding: "2px 10px",
                        borderRadius: 99,
                        fontWeight: 600,
                        background: cat.bg.replace("bg-", ""),
                        color: "#ccc",
                        border: "1px solid #444",
                      }}>
                        {task.category}
                      </span>
                    </div>

                    {/* Tip */}
                    {task.tip && (
                      <p style={{ color: "#888", fontSize: 12, marginTop: 6, marginBottom: 0 }}>
                        💡 {task.tip}
                      </p>
                    )}

                    {/* Link */}
                    {task.link && !done && (
                      <a
                        href={task.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-block",
                          marginTop: 8,
                          fontSize: 12,
                          color: "#d4956e",
                          textDecoration: "none",
                          fontWeight: 600,
                        }}
                      >
                        → Open {task.link.replace("https://", "").split("/")[0]}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div style={{ background: "#252b3a", border: "1px solid #333d4d", borderRadius: 12, padding: "16px 20px", marginTop: 24 }}>
          <p style={{ color: "#d4956e", fontWeight: 700, fontSize: 14, margin: "0 0 8px" }}>📊 {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Summary</p>
          <div className="flex gap-6">
            <div>
              <p style={{ color: "#fca5a5", fontSize: 13, margin: 0 }}>🤖 Antonio handles</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 20, margin: 0 }}>
                {currentTasks.filter(t => t.owner === "antonio").length}
              </p>
            </div>
            <div>
              <p style={{ color: "#93c5fd", fontSize: 13, margin: 0 }}>👤 You handle</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 20, margin: 0 }}>
                {currentTasks.filter(t => t.owner === "anthony").length}
              </p>
            </div>
            <div>
              <p style={{ color: "#4ade80", fontSize: 13, margin: 0 }}>✅ Completed</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 20, margin: 0 }}>{completedCount}</p>
            </div>
          </div>
        </div>

        <p style={{ color: "#555", fontSize: 11, textAlign: "center", marginTop: 20 }}>
          eDecades Operations Tracker • King Xcel Innovations
        </p>
      </div>
    </div>
  );
}
