import { useState } from "react";

const templates = [
  { name: "Executive Pro", color: "#1E3A5F", accent: "#4A90D9", emoji: "💼", style: "Corporate & Bold" },
  { name: "Creative Edge", color: "#2D1B4E", accent: "#9B59B6", emoji: "🎨", style: "Modern & Vibrant" },
  { name: "Clean Minimal", color: "#1A2F2A", accent: "#27AE60", emoji: "✨", style: "Simple & Elegant" },
  { name: "Tech Stack", color: "#1A1A2E", accent: "#00D4FF", emoji: "💻", style: "Dev & Engineering" },
  { name: "Academic", color: "#2C1810", accent: "#E67E22", emoji: "🎓", style: "Research & Education" },
  { name: "Healthcare", color: "#0D2137", accent: "#2ECC71", emoji: "🏥", style: "Medical & Clinical" },
];

const features = [
  { icon: "🤖", title: "AI-Powered Writing", desc: "Our AI analyzes your experience and suggests powerful bullet points, action verbs, and keywords that get past ATS systems." },
  { icon: "📊", title: "ATS Score Checker", desc: "See exactly how your resume scores against Applicant Tracking Systems before you submit. Beat the bots every time." },
  { icon: "🎨", title: "50+ Pro Templates", desc: "Every template is designed by professional recruiters and graphic designers. Polished, modern, and industry-specific." },
  { icon: "📄", title: "One-Click PDF Export", desc: "Download your resume as a perfectly formatted PDF instantly. Looks exactly the same on every screen and printer." },
  { icon: "✏️", title: "Real-Time Editor", desc: "Edit your resume live and see changes instantly. No saving, no waiting — just click and your resume updates." },
  { icon: "🔗", title: "Shareable Link", desc: "Get a unique link to your online resume. Share it on LinkedIn, in emails, or as a QR code on your business card." },
];

const plans = [
  {
    name: "Single Download",
    price: "$4.99",
    period: "/resume",
    color: "#9B59B6",
    planKey: "single",
    highlight: false,
    features: [
      "One resume download",
      "All premium templates",
      "No subscription needed",
      "Clean PDF — no watermark",
      "Full AI suggestions",
      "Valid forever",
    ],
    cta: "Buy Single Download — $4.99",
  },
  {
    name: "Pro Monthly",
    price: "$9.99",
    period: "/month",
    color: "#4A90D9",
    planKey: "pro_monthly",
    highlight: true,
    annualNote: "Or save 34% at $79/year",
    features: [
      "Unlimited resumes",
      "50+ premium templates",
      "Clean PDF downloads",
      "Full AI writing assistant",
      "ATS score checker",
      "Shareable resume link",
      "Cover letter builder",
      "LinkedIn profile optimizer",
    ],
    cta: "Start 7-Day Free Trial",
  },
  {
    name: "Pro Annual",
    price: "$79",
    period: "/year",
    color: "#27AE60",
    planKey: "pro_annual",
    highlight: false,
    savingsBadge: "Save 34%",
    features: [
      "Everything in Pro Monthly",
      "Best value — $6.58/mo",
      "Priority AI processing",
      "Early access to new features",
      "Dedicated support",
    ],
    cta: "Get Pro Annual — $79/yr",
  },
];

const steps = [
  { icon: "📝", title: "Fill in Your Details", desc: "Enter your experience, education, and skills. Our smart forms guide you every step of the way." },
  { icon: "🤖", title: "AI Enhances It", desc: "Our AI rewrites your bullet points, adds keywords, and optimizes for the job you're targeting." },
  { icon: "🎨", title: "Choose a Template", desc: "Pick from 50+ professional designs. Every one looks stunning — guaranteed." },
  { icon: "📥", title: "Download & Apply", desc: "Export your perfect resume as a PDF and start landing interviews today." },
];

const stats = [
  ["500K+", "Resumes Created"],
  ["92%", "Interview Rate"],
  ["4.8★", "Average Rating"],
  ["3 min", "Avg Build Time"],
];

export default function ResumeCrafted() {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [paymentStatus] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("payment");
    }
    return null;
  });

  const handleCheckout = async (planKey) => {
    setLoadingPlan(planKey);
    try {
      const res = await fetch("/functions/createResumeCraftedCheckout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (e) {
      alert("Error connecting to payment server. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#0a0e1a", color: "#fff", overflowX: "hidden" }}>

      {/* Payment Status Banner */}
      {paymentStatus === "success" && (
        <div style={{ background: "linear-gradient(135deg, #27AE60, #1a7a42)", padding: "16px", textAlign: "center", fontWeight: 700, fontSize: 16 }}>
          🎉 Payment successful! Your ResumeCrafted account is ready. Start building your resume now.
        </div>
      )}
      {paymentStatus === "cancelled" && (
        <div style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", padding: "16px", textAlign: "center", color: "#fca5a5", fontWeight: 600 }}>
          Payment cancelled — no charge was made. You can try again anytime below.
        </div>
      )}

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(10,14,26,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(74,144,217,0.2)",
        padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "linear-gradient(135deg, #4A90D9, #1E3A5F)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, boxShadow: "0 0 12px rgba(74,144,217,0.5)"
          }}>📄</div>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Resume<span style={{ color: "#4A90D9" }}>Crafted</span></span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Templates", "Features", "Pricing"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 14 }}
              onMouseOver={e => e.target.style.color = "#4A90D9"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.65)"}>{item}</a>
          ))}
          <button onClick={() => handleCheckout("pro_monthly")} style={{
            background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
            color: "#fff", padding: "9px 22px", borderRadius: 25,
            fontWeight: 700, border: "none", cursor: "pointer", fontSize: 14,
            boxShadow: "0 4px 15px rgba(74,144,217,0.4)"
          }}>Build My Resume →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0e1a 0%, #0e1d35 45%, #0a0e1a 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(74,144,217,0.1) 0%, transparent 70%)", top: 0, left: "-10%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,58,95,0.2) 0%, transparent 70%)", bottom: 0, right: "-5%" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(74,144,217,0.12)", border: "1px solid rgba(74,144,217,0.35)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 28, fontSize: 13, color: "#74B9E8"
        }}>
          📄 AI-Powered Resume Builder · Land More Interviews
        </div>

        <h1 style={{
          fontSize: "clamp(38px, 7vw, 78px)", fontWeight: 900, lineHeight: 1.1,
          marginBottom: 24, letterSpacing: -1
        }}>
          Build a Resume That<br />
          <span style={{
            background: "linear-gradient(135deg, #74B9E8 0%, #4A90D9 50%, #2E6DB4 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Gets You Hired</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.6)", maxWidth: 600, lineHeight: 1.8, marginBottom: 48 }}>
          Create a professional, ATS-optimized resume in minutes with our AI-powered builder. <strong style={{ color: "#74B9E8" }}>92% of our users land interviews</strong> within 30 days.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}>
          <button onClick={() => handleCheckout("pro_monthly")} disabled={loadingPlan === "pro_monthly"} style={{
            background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
            color: "#fff", padding: "18px 52px", borderRadius: 40,
            fontWeight: 700, border: "none", cursor: "pointer", fontSize: 18,
            boxShadow: "0 8px 30px rgba(74,144,217,0.5)",
            opacity: loadingPlan === "pro_monthly" ? 0.7 : 1
          }}>
            {loadingPlan === "pro_monthly" ? "⏳ Loading..." : "📄 Start Free Trial — $9.99/mo"}
          </button>
          <button onClick={() => handleCheckout("single")} style={{
            background: "transparent", color: "#74B9E8",
            padding: "18px 40px", borderRadius: 40, fontWeight: 700,
            border: "2px solid rgba(74,144,217,0.4)", cursor: "pointer", fontSize: 18,
          }}>
            Buy Single Resume — $4.99
          </button>
        </div>

        <div style={{ display: "flex", gap: 52, flexWrap: "wrap", justifyContent: "center" }}>
          {stats.map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#4A90D9" }}>{num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 24px", background: "#0a0e1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#4A90D9", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Simple Process</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900 }}>Your Perfect Resume in 4 Steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                background: "rgba(74,144,217,0.06)", border: "1px solid rgba(74,144,217,0.15)",
                borderRadius: 20, padding: "32px 24px", textAlign: "center", position: "relative"
              }}>
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
                  width: 28, height: 28, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800
                }}>{i + 1}</div>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{step.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" style={{ padding: "100px 24px", background: "#070b15" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#4A90D9", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Templates</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900 }}>50+ Professional Designs</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, marginTop: 12 }}>Every template is recruiter-approved and ATS-friendly</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20 }}>
            {templates.map((t, i) => (
              <div key={i} onClick={() => setActiveTemplate(i)} style={{
                background: activeTemplate === i ? `${t.color}99` : t.color,
                border: `2px solid ${activeTemplate === i ? t.accent : "transparent"}`,
                borderRadius: 16, padding: "28px 20px", cursor: "pointer",
                textAlign: "center", transition: "all 0.2s",
                boxShadow: activeTemplate === i ? `0 0 20px ${t.accent}44` : "none"
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{t.emoji}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: t.accent }}>{t.style}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button onClick={() => handleCheckout("pro_monthly")} style={{
              background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
              color: "#fff", padding: "14px 40px", borderRadius: 30,
              fontWeight: 700, border: "none", cursor: "pointer", fontSize: 16,
              boxShadow: "0 6px 20px rgba(74,144,217,0.4)"
            }}>
              Unlock All 50+ Templates →
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 24px", background: "#0a0e1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#4A90D9", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Features</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900 }}>Everything You Need to Get Hired</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "rgba(74,144,217,0.05)", border: "1px solid rgba(74,144,217,0.12)",
                borderRadius: 18, padding: "28px"
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 24px", background: "#070b15" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#4A90D9", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Pricing</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900 }}>Simple, Honest Pricing</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, marginTop: 12 }}>No hidden fees. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "start" }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{
                background: plan.highlight ? "rgba(74,144,217,0.1)" : "rgba(255,255,255,0.03)",
                border: `2px solid ${plan.highlight ? "#4A90D9" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 24, padding: "36px 28px", position: "relative",
                boxShadow: plan.highlight ? "0 0 40px rgba(74,144,217,0.2)" : "none"
              }}>
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
                    padding: "5px 20px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>⭐ Most Popular</div>
                )}
                {plan.savingsBadge && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #27AE60, #1a7a42)",
                    padding: "5px 20px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>💰 {plan.savingsBadge}</div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: plan.color }}>{plan.price}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>{plan.period}</span>
                  {plan.annualNote && <div style={{ fontSize: 12, color: "#27AE60", marginTop: 4 }}>{plan.annualNote}</div>}
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                      <span style={{ color: plan.color, fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleCheckout(plan.planKey)}
                  disabled={loadingPlan === plan.planKey}
                  style={{
                    width: "100%", padding: "15px", borderRadius: 30,
                    background: plan.highlight ? "linear-gradient(135deg, #4A90D9, #1E6BB0)" : "transparent",
                    border: plan.highlight ? "none" : `2px solid ${plan.color}`,
                    color: plan.highlight ? "#fff" : plan.color,
                    fontWeight: 700, fontSize: 15, cursor: "pointer",
                    opacity: loadingPlan === plan.planKey ? 0.7 : 1,
                    boxShadow: plan.highlight ? "0 6px 20px rgba(74,144,217,0.4)" : "none"
                  }}>
                  {loadingPlan === plan.planKey ? "⏳ Loading..." : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060910", padding: "48px 24px", textAlign: "center", borderTop: "1px solid rgba(74,144,217,0.1)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: "linear-gradient(135deg, #4A90D9, #1E3A5F)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
          }}>📄</div>
          <span style={{ fontSize: 16, fontWeight: 800 }}>Resume<span style={{ color: "#4A90D9" }}>Crafted</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 8 }}>
          A King Xcel Innovations product · <a href="/KingXcel" style={{ color: "#4A90D9", textDecoration: "none" }}>About Us</a>
        </p>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2025 ResumeCrafted. All rights reserved.</p>
      </footer>
    </div>
  );
}
