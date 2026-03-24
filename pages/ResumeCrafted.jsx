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
    name: "Free",
    price: "$0",
    period: "",
    color: "#27AE60",
    highlight: false,
    features: [
      "1 resume",
      "5 basic templates",
      "PDF download (watermarked)",
      "Real-time editor",
      "Basic AI suggestions",
    ],
    cta: "Start for Free",
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/month",
    color: "#4A90D9",
    highlight: true,
    annualPrice: "$79/year (save 34%)",
    features: [
      "Unlimited resumes",
      "50+ premium templates",
      "Clean PDF downloads (no watermark)",
      "Full AI writing assistant",
      "ATS score checker",
      "Shareable resume link",
      "Cover letter builder",
      "LinkedIn profile optimizer",
    ],
    cta: "Start 7-Day Free Trial",
  },
  {
    name: "One-Time Download",
    price: "$4.99",
    period: "/resume",
    color: "#9B59B6",
    highlight: false,
    features: [
      "Single resume download",
      "All premium templates",
      "No subscription needed",
      "Clean PDF — no watermark",
      "Full AI suggestions",
      "Valid forever",
    ],
    cta: "Buy Single Download",
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
  const [billingAnnual, setBillingAnnual] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#0a0e1a", color: "#fff", overflowX: "hidden" }}>

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
          <a href="https://resume-dashing-craft-pro.base44.app" style={{
            background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
            color: "#fff", padding: "9px 22px", borderRadius: 25,
            fontWeight: 700, textDecoration: "none", fontSize: 14,
            boxShadow: "0 4px 15px rgba(74,144,217,0.4)"
          }}>Build My Resume →</a>
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
          <a href="https://resume-dashing-craft-pro.base44.app" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
            color: "#fff", padding: "18px 52px", borderRadius: 40,
            fontWeight: 700, textDecoration: "none", fontSize: 18,
            boxShadow: "0 8px 30px rgba(74,144,217,0.5)"
          }}
            onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 14px 40px rgba(74,144,217,0.7)"; }}
            onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(74,144,217,0.5)"; }}>
            📄 Build My Resume Free
          </a>
          <a href="#templates" style={{
            display: "inline-block", background: "transparent", color: "#74B9E8",
            padding: "18px 40px", borderRadius: 40, fontWeight: 700,
            textDecoration: "none", fontSize: 18,
            border: "2px solid rgba(74,144,217,0.4)"
          }}
            onMouseOver={e => { e.target.style.background = "rgba(74,144,217,0.08)"; e.target.style.borderColor = "#4A90D9"; }}
            onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(74,144,217,0.4)"; }}>
            View Templates →
          </a>
        </div>

        {/* Stats */}
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 28 }}>
            {steps.map((step, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,144,217,0.15)",
                borderRadius: 20, padding: "36px 24px", textAlign: "center",
                transition: "all 0.3s", position: "relative"
              }}
                onMouseOver={e => { e.currentTarget.style.border = "1px solid rgba(74,144,217,0.5)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.background = "rgba(74,144,217,0.05)"; }}
                onMouseOut={e => { e.currentTarget.style.border = "1px solid rgba(74,144,217,0.15)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  width: 28, height: 28, borderRadius: "50%",
                  background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 900
                }}>{i + 1}</div>
                <div style={{ fontSize: 42, marginBottom: 16, marginTop: 8 }}>{step.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section id="templates" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #0a0e1a 0%, #0e1d35 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#4A90D9", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Professional Templates</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900 }}>50+ Templates. Every Industry.</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, marginTop: 12 }}>Designed by recruiters and HR professionals to get you noticed.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
            {templates.map((t, i) => (
              <div key={i} onClick={() => setActiveTemplate(i)} style={{
                background: activeTemplate === i ? `${t.color}` : "rgba(255,255,255,0.03)",
                border: activeTemplate === i ? `2px solid ${t.accent}` : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18, padding: "28px 20px", cursor: "pointer",
                transition: "all 0.25s", textAlign: "center",
                boxShadow: activeTemplate === i ? `0 8px 30px ${t.accent}40` : "none"
              }}
                onMouseOver={e => { if (activeTemplate !== i) { e.currentTarget.style.borderColor = t.accent + "80"; e.currentTarget.style.background = t.color + "40"; } }}
                onMouseOut={e => { if (activeTemplate !== i) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; } }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{t.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: activeTemplate === i ? "#fff" : "rgba(255,255,255,0.85)", marginBottom: 6 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: activeTemplate === i ? t.accent : "rgba(255,255,255,0.4)" }}>{t.style}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="https://resume-dashing-craft-pro.base44.app" style={{
              display: "inline-block", background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
              color: "#fff", padding: "14px 40px", borderRadius: 30,
              fontWeight: 700, textDecoration: "none", fontSize: 16,
              boxShadow: "0 6px 20px rgba(74,144,217,0.4)"
            }}>Use This Template Free →</a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 24px", background: "#0a0e1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#4A90D9", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Everything You Need</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900 }}>Built to Get You Hired</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(74,144,217,0.12)",
                borderRadius: 18, padding: "32px 28px", transition: "all 0.3s"
              }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(74,144,217,0.06)"; e.currentTarget.style.borderColor = "rgba(74,144,217,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(74,144,217,0.12)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ fontSize: 38, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #0a0e1a 0%, #0e1d35 100%)" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#4A90D9", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Simple Pricing</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900 }}>Start Free. Upgrade Anytime.</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 17, marginTop: 12 }}>No hidden fees. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 24 }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                background: plan.highlight ? "linear-gradient(135deg, rgba(74,144,217,0.15), rgba(30,58,95,0.2))" : "rgba(255,255,255,0.03)",
                border: plan.highlight ? "2px solid #4A90D9" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 24, padding: "40px 32px", position: "relative",
                boxShadow: plan.highlight ? "0 0 50px rgba(74,144,217,0.2)" : "none"
              }}>
                {plan.highlight && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
                    color: "#fff", padding: "6px 20px", borderRadius: 20,
                    fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>⭐ MOST POPULAR</div>
                )}
                <div style={{ fontSize: 14, color: plan.color, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 48, fontWeight: 900 }}>{plan.price}</span>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.45)" }}>{plan.period}</span>
                </div>
                {plan.annualPrice && (
                  <div style={{ fontSize: 12, color: "#27AE60", marginBottom: 16, fontWeight: 600 }}>💰 {plan.annualPrice}</div>
                )}
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, marginTop: 16, marginBottom: 28 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                      <span style={{ color: plan.color, fontSize: 14, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="https://resume-dashing-craft-pro.base44.app" style={{
                  display: "block", textAlign: "center",
                  background: plan.highlight ? "linear-gradient(135deg, #4A90D9, #1E6BB0)" : `${plan.color}22`,
                  color: plan.highlight ? "#fff" : plan.color,
                  border: plan.highlight ? "none" : `1px solid ${plan.color}55`,
                  padding: "14px 24px", borderRadius: 30,
                  fontWeight: 700, textDecoration: "none", fontSize: 15,
                  boxShadow: plan.highlight ? "0 6px 20px rgba(74,144,217,0.4)" : "none"
                }}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "100px 24px 80px", background: "#0a0e1a", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>📄</div>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 58px)", fontWeight: 900, marginBottom: 20, lineHeight: 1.1 }}>
            Your dream job is<br />
            <span style={{ background: "linear-gradient(135deg, #74B9E8, #4A90D9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              one resume away.
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 18, marginBottom: 40 }}>
            Join 500,000+ job seekers who built their winning resume with ResumeCrafted. Free to start — takes 3 minutes.
          </p>
          <a href="https://resume-dashing-craft-pro.base44.app" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #4A90D9, #1E6BB0)",
            color: "#fff", padding: "20px 64px", borderRadius: 50,
            fontWeight: 800, textDecoration: "none", fontSize: 20,
            boxShadow: "0 10px 40px rgba(74,144,217,0.5)"
          }}>📄 Build My Resume Now — Free</a>
          <div style={{ marginTop: 18, color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
            No credit card · Free templates included · Download in minutes
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060810", padding: "48px 40px 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 18 }}>📄</span>
              <span style={{ fontSize: 18, fontWeight: 800 }}>Resume<span style={{ color: "#4A90D9" }}>Crafted</span></span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.7 }}>
              AI-powered resume builder trusted by 500,000+ job seekers worldwide. Land more interviews, faster.
            </p>
          </div>
          <div>
            <div style={{ color: "#4A90D9", fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 14 }}>PRODUCT</div>
            {["Resume Builder", "Templates", "AI Writing", "ATS Checker", "Cover Letter"].map(item => (
              <div key={item} style={{ marginBottom: 8 }}>
                <a href="https://resume-dashing-craft-pro.base44.app" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#4A90D9"}
                  onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{item}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: "#4A90D9", fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 14 }}>RESOURCES</div>
            {["Resume Tips", "Career Blog", "Interview Prep", "Salary Guide", "Job Search Tips"].map(item => (
              <div key={item} style={{ marginBottom: 8 }}>
                <a href="https://resume-dashing-craft-pro.base44.app" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#4A90D9"}
                  onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{item}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: "#4A90D9", fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 14 }}>COMPANY</div>
            {["About Us", "Pricing", "Privacy Policy", "Terms of Service", "King Xcel Innovations"].map(item => (
              <div key={item} style={{ marginBottom: 8 }}>
                <a href="https://resume-dashing-craft-pro.base44.app" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#4A90D9"}
                  onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.4)"}>{item}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2025 ResumeCrafted · A King Xcel Innovations Company · ResumeCrafted.com</div>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Build a resume that gets you hired.</div>
        </div>
      </footer>

      <style>{`* { box-sizing: border-box; } html { scroll-behavior: smooth; }`}</style>
    </div>
  );
}
