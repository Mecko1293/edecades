import { useState } from "react";

const products = [
  {
    name: "CourseGek",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/ec854eb8d_image.png",
    icon: "🎓",
    status: "live",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    url: "https://antonio-major-help-app.base44.app/CourseGek",
    appUrl: "https://course-gek-23543b27.base44.app",
    category: "EdTech Marketplace",
    pricing: [
      { name: "Single Question Answer", price: "$9.99", type: "One-Time", badge: "⚡ Best Seller", color: "#4CAF50" },
      { name: "Student Pro", price: "$14.99/mo", type: "Subscription", badge: "⭐ Most Popular", color: "#7C3AED" },
      { name: "Tutor / Expert Plan", price: "$19.99/mo", type: "Subscription", badge: "💰 Earn Money", color: "#F59E0B" },
    ],
    description: "Homework help marketplace. Students pay for answers, tutors earn by responding.",
  },
  {
    name: "ResumeCrafted",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/427225fcb_image.png",
    icon: "📄",
    status: "live",
    color: "#4A90D9",
    gradient: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
    url: "https://antonio-major-help-app.base44.app/ResumeCrafted",
    appUrl: "https://resume-dashing-craft-pro.base44.app",
    category: "Career Tools",
    pricing: [
      { name: "Single Resume Download", price: "$4.99", type: "One-Time", badge: "🚀 Quick Buy", color: "#9B59B6" },
      { name: "Pro Monthly", price: "$9.99/mo", type: "Subscription", badge: "⭐ Most Popular", color: "#4A90D9" },
      { name: "Pro Annual", price: "$79/yr", type: "Subscription", badge: "💰 Save 34%", color: "#27AE60" },
    ],
    description: "AI-powered resume builder. Students and job seekers build ATS-optimized resumes.",
  },
  {
    name: "eDecades",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/c843dbc26_image.png",
    icon: "⏰",
    status: "live",
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700, #FF8C00)",
    url: "https://antonio-major-help-app.base44.app/Home",
    appUrl: "https://benevolent-decade-dive-now.base44.app",
    category: "Social Network",
    pricing: [
      { name: "Free Membership", price: "Free", type: "Free Tier", badge: "🌐 Public", color: "#4CAF50" },
      { name: "Premium (Recommended)", price: "TBD", type: "Subscription", badge: "🔜 Coming Soon", color: "#FFD700" },
    ],
    description: "Decade-themed social network. Currently free — premium tier pricing TBD.",
  },
  {
    name: "WheelMath",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/106ee42e9_image.png",
    icon: "🔢",
    status: "coming_soon",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    url: "#",
    appUrl: "https://pie-math-quest.base44.app",
    category: "EdTech Game",
    pricing: [
      { name: "Free Play", price: "Free", type: "Free Tier", badge: "🎮 Open Access", color: "#4CAF50" },
      { name: "Classroom License", price: "TBD", type: "Subscription", badge: "🔜 Coming Soon", color: "#F59E0B" },
    ],
    description: "Interactive math puzzles for students and classrooms.",
  },
  {
    name: "GameForge",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/614b28868_image.png",
    icon: "🎮",
    status: "live",
    color: "#6366F1",
    gradient: "linear-gradient(135deg, #6366F1, #4338CA)",
    url: "https://antonio-major-help-app.base44.app/GameForge",
    appUrl: "https://app.base44.com/apps/69cefe45fb6ca50b89904e8e",
    category: "Game Dev Tools",
    pricing: [
      { name: "Starter", price: "Free", type: "Free Tier", badge: "🎮 Free", color: "#22C55E" },
      { name: "Indie Pro", price: "$12.99/mo", type: "Subscription", badge: "⭐ Most Popular", color: "#6366F1" },
      { name: "Studio Plan", price: "$39.99/mo", type: "Subscription", badge: "🔜 Coming Soon", color: "#F59E0B" },
    ],
    description: "AI game design studio. From concept to full GDD in minutes.",
  },
  {
    name: "CheapMedz",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/a1db150cd_generated_image.png",
    icon: "💊",
    status: "coming_soon",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
    url: "#",
    appUrl: "#",
    category: "Healthcare",
    pricing: [
      { name: "Free Search", price: "Free", type: "Free Tier", badge: "🔍 Directory", color: "#4CAF50" },
      { name: "Premium Alerts", price: "TBD", type: "Subscription", badge: "🔜 Coming Soon", color: "#EF4444" },
    ],
    description: "Medication price comparison tool. In development.",
  },
];

const stripeStatus = {
  status: "In Review",
  color: "#F59E0B",
  icon: "⏳",
  message: "Submitted to Stripe on Mar 24, 2026. Review typically takes 1–3 business days.",
  account: "acct_1T4XQARonfiMrfdu",
};

const quickLinks = [
  { label: "KingXcel Landing Page", url: "https://antonio-major-help-app.base44.app/KingXcel", icon: "👑", note: "Submitted to Stripe" },
  { label: "Portfolio Hub", url: "https://antonio-major-help-app.base44.app/Home", icon: "🏠", note: "Main entry point" },
  { label: "CourseGek App", url: "https://course-gek-23543b27.base44.app", icon: "🎓", note: "Live app" },
  { label: "ResumeCrafted App", url: "https://resume-dashing-craft-pro.base44.app", icon: "📄", note: "Live app" },
  { label: "eDecades App", url: "https://benevolent-decade-dive-now.base44.app", icon: "⏰", note: "Live app" },
  { label: "GameForge Landing", url: "https://antonio-major-help-app.base44.app/GameForge", icon: "🎮", note: "Live app" },
  { label: "CheapMedz Landing", url: "https://antonio-major-help-app.base44.app/CheapMedz", icon: "💊", note: "Concept page" },
  { label: "Stripe Dashboard", url: "https://dashboard.stripe.com", icon: "💳", note: "Check payout status" },
];

export default function KingXcelPanel() {
  const [activeProduct, setActiveProduct] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(key);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#07070e", color: "#fff", minHeight: "100vh", padding: "0 0 80px" }}>

      {/* HEADER */}
      <div style={{
        background: "rgba(8,8,16,0.98)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.2)",
        padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <img src="https://media.base44.com/images/public/69c207112c5856fdf7bb496b/614b28868_image.png" alt="King Xcel" style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover", boxShadow: "0 0 20px rgba(201,168,76,0.4)" }} />
          <div>
            <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: -0.3 }}>King Xcel <span style={{ color: "#C9A84C" }}>Command Panel</span></div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 1 }}>INNOVATIONS · IRVING, TX · anthonykittles@outlook.com</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <a href="https://antonio-major-help-app.base44.app/KingXcel" target="_blank" style={{
            background: "linear-gradient(135deg, #C9A84C, #8B6914)",
            color: "#000", padding: "9px 20px", borderRadius: 20,
            fontWeight: 700, textDecoration: "none", fontSize: 13
          }}>👑 Public Page</a>
          <a href="https://dashboard.stripe.com" target="_blank" style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", padding: "9px 20px", borderRadius: 20,
            fontWeight: 600, textDecoration: "none", fontSize: 13
          }}>💳 Stripe</a>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>

        {/* STRIPE STATUS BANNER */}
        <div style={{
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: 16, padding: "20px 28px", marginBottom: 40,
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 32 }}>{stripeStatus.icon}</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: stripeStatus.color }}>Stripe Payout Review: {stripeStatus.status}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{stripeStatus.message}</div>
            </div>
          </div>
          <a href="https://dashboard.stripe.com" target="_blank" style={{
            background: stripeStatus.color, color: "#000",
            padding: "10px 24px", borderRadius: 20, fontWeight: 700,
            textDecoration: "none", fontSize: 13, flexShrink: 0
          }}>Check Status →</a>
        </div>

        {/* QUICK LINKS */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>⚡ Quick Links</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
            {quickLinks.map((link) => (
              <div key={link.label} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 12, padding: "14px 18px",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{link.icon} {link.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{link.note}</div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => copyToClipboard(link.url, link.label)} style={{
                    background: copiedUrl === link.label ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)",
                    border: "none", color: copiedUrl === link.label ? "#4ade80" : "rgba(255,255,255,0.4)",
                    width: 28, height: 28, borderRadius: 6, cursor: "pointer", fontSize: 13
                  }}>{copiedUrl === link.label ? "✓" : "📋"}</button>
                  {link.url !== "#" && (
                    <a href={link.url} target="_blank" style={{
                      background: "rgba(255,255,255,0.06)", border: "none",
                      color: "rgba(255,255,255,0.4)", width: 28, height: 28,
                      borderRadius: 6, cursor: "pointer", fontSize: 13,
                      display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none"
                    }}>↗</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTS & PRICING */}
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>📦 Products & Pricing</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {products.map((product) => (
              <div key={product.name} style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid ${activeProduct === product.name ? product.color + "55" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 18, overflow: "hidden", transition: "border 0.2s"
              }}>
                {/* Product Header */}
                <div
                  onClick={() => setActiveProduct(activeProduct === product.name ? null : product.name)}
                  style={{
                    padding: "20px 28px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                    background: activeProduct === product.name ? `${product.color}10` : "transparent"
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, background: product.gradient,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0
                    }}>{product.icon}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 17, fontWeight: 800 }}>{product.name}</span>
                        <span style={{
                          fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase",
                          padding: "3px 10px", borderRadius: 20,
                          background: product.status === "live" ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.08)",
                          color: product.status === "live" ? "#4ade80" : "rgba(255,255,255,0.4)"
                        }}>{product.status === "live" ? "● Live" : "◌ Coming Soon"}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{product.category} · {product.description}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 13, color: product.color, fontWeight: 700 }}>
                      {product.pricing[0].price}{product.pricing.length > 1 ? ` – ${product.pricing[product.pricing.length - 1].price}` : ""}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 18, transform: activeProduct === product.name ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>⌄</div>
                  </div>
                </div>

                {/* Expanded Pricing */}
                {activeProduct === product.name && (
                  <div style={{ padding: "0 28px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ paddingTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
                      {product.pricing.map((tier) => (
                        <div key={tier.name} style={{
                          background: "rgba(255,255,255,0.04)", border: `1px solid ${tier.color}33`,
                          borderRadius: 14, padding: "18px 20px"
                        }}>
                          <div style={{
                            display: "inline-block", fontSize: 10, fontWeight: 700,
                            background: `${tier.color}22`, color: tier.color,
                            padding: "3px 10px", borderRadius: 10, marginBottom: 10, letterSpacing: 0.5
                          }}>{tier.badge}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{tier.name}</div>
                          <div style={{ fontSize: 24, fontWeight: 900, color: tier.color }}>{tier.price}</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{tier.type}</div>
                        </div>
                      ))}
                    </div>
                    {product.status === "live" && (
                      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
                        <a href={product.url} target="_blank" style={{
                          background: product.gradient, color: "#fff",
                          padding: "10px 24px", borderRadius: 20, fontWeight: 700,
                          textDecoration: "none", fontSize: 13
                        }}>↗ View Landing Page</a>
                        <a href={product.appUrl} target="_blank" style={{
                          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff", padding: "10px 24px", borderRadius: 20, fontWeight: 600,
                          textDecoration: "none", fontSize: 13
                        }}>↗ Open App</a>
                        <button onClick={() => copyToClipboard(product.url, product.name + "_url")} style={{
                          background: copiedUrl === product.name + "_url" ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: copiedUrl === product.name + "_url" ? "#4ade80" : "rgba(255,255,255,0.5)",
                          padding: "10px 20px", borderRadius: 20, fontWeight: 600,
                          cursor: "pointer", fontSize: 13
                        }}>{copiedUrl === product.name + "_url" ? "✓ Copied!" : "📋 Copy URL"}</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* REVENUE SUMMARY */}
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>💰 Revenue Potential Summary</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {[
              { label: "CourseGek Entry", value: "$9.99", sub: "Per question answered", color: "#7C3AED" },
              { label: "CourseGek Max MRR", value: "$19.99/mo", sub: "Per tutor subscriber", color: "#7C3AED" },
              { label: "ResumeCrafted Entry", value: "$4.99", sub: "Single resume download", color: "#4A90D9" },
              { label: "ResumeCrafted Max MRR", value: "$79/yr", sub: "Pro annual per user", color: "#4A90D9" },
              { label: "eDecades Premium", value: "TBD", sub: "Pricing to be set", color: "#FFD700" },
              { label: "Combined Monthly", value: "Unlimited", sub: "Scale with traffic", color: "#4ade80" },
            ].map((item) => (
              <div key={item.label} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14, padding: "20px"
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: item.color }}>{item.value}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
