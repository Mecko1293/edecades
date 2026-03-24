import { useState } from "react";

const categories = [
  { icon: "📐", name: "Mathematics", count: "1,240+ questions" },
  { icon: "🔬", name: "Science", count: "980+ questions" },
  { icon: "📝", name: "English & Writing", count: "870+ questions" },
  { icon: "🌍", name: "History & Social Studies", count: "650+ questions" },
  { icon: "💻", name: "Computer Science", count: "720+ questions" },
  { icon: "🧪", name: "Chemistry", count: "540+ questions" },
  { icon: "⚡", name: "Physics", count: "490+ questions" },
  { icon: "📊", name: "Business & Economics", count: "610+ questions" },
];

const howItWorks = [
  { step: "1", icon: "📋", title: "Post Your Question", desc: "Describe your homework, assignment, or project. Set your budget and deadline." },
  { step: "2", icon: "🎓", title: "Experts Respond", desc: "Verified tutors and subject experts bid on your question with their price and timeline." },
  { step: "3", icon: "✅", title: "Pick Your Tutor", desc: "Review profiles, ratings, and sample answers. Choose the expert that fits your needs." },
  { step: "4", icon: "💰", title: "Pay When Satisfied", desc: "Money is held safely until you're happy with the answer. 100% satisfaction guarantee." },
];

const testimonials = [
  { name: "Marcus T.", grade: "College Junior", avatar: "👨‍🎓", subject: "Calculus III", quote: "Got a full step-by-step solution in 2 hours. My tutor explained everything so clearly. Worth every penny." },
  { name: "Sarah K.", grade: "High School Senior", avatar: "👩‍🎓", subject: "AP Chemistry", quote: "I was totally lost on my lab report. CourseGek connected me with a Chemistry PhD who walked me through it perfectly." },
  { name: "James R.", grade: "College Freshman", avatar: "🧑‍🎓", subject: "English Composition", quote: "My essay went from a C to an A. The tutor didn't just fix it — they taught me HOW to write better." },
];

const plans = [
  {
    name: "Student",
    price: "Free",
    period: "",
    color: "#4CAF50",
    features: [
      "Post up to 3 questions/month",
      "Browse all subject categories",
      "View tutor profiles & ratings",
      "Basic chat with tutors",
      "Money-back guarantee",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Student Pro",
    price: "$14.99",
    period: "/month",
    color: "#7C3AED",
    features: [
      "Unlimited question posts",
      "Priority matching with top tutors",
      "Faster response times",
      "Full tutor chat & file sharing",
      "Access to past Q&A library",
      "Money-back guarantee",
    ],
    cta: "Start Pro — 7 Days Free",
    popular: true,
  },
  {
    name: "Tutor / Expert",
    price: "$19.99",
    period: "/month",
    color: "#F59E0B",
    features: [
      "List unlimited subjects",
      "Receive unlimited student bids",
      "Featured profile placement",
      "Instant payout on completions",
      "Analytics dashboard",
      "CourseGek verified badge",
    ],
    cta: "Become a Tutor",
    popular: false,
  },
];

export default function CourseGek() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#0f0f1a", color: "#fff", overflowX: "hidden", margin: 0, padding: 0 }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(15,15,26,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(124,58,237,0.2)",
        padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 0 15px rgba(124,58,237,0.5)"
          }}>🎓</div>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>Course<span style={{ color: "#7C3AED" }}>Gek</span></span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <a href="#how-it-works" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}
            onMouseOver={e => e.target.style.color = "#a78bfa"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.7)"}>How It Works</a>
          <a href="#subjects" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}
            onMouseOver={e => e.target.style.color = "#a78bfa"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.7)"}>Subjects</a>
          <a href="#pricing" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}
            onMouseOver={e => e.target.style.color = "#a78bfa"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.7)"}>Pricing</a>
          <a href="#tutors" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}
            onMouseOver={e => e.target.style.color = "#a78bfa"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.7)"}>Become a Tutor</a>
          <a href="https://course-gek-23543b27.base44.app" style={{
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            color: "#fff", padding: "9px 22px", borderRadius: 25,
            fontWeight: 700, textDecoration: "none", fontSize: 14,
            boxShadow: "0 4px 15px rgba(124,58,237,0.4)"
          }}>Get Help Now →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 40%, #0f1a2e 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden"
      }}>
        {/* Glow orbs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", top: "5%", left: "5%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)", bottom: "10%", right: "5%" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.4)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 28, fontSize: 13, color: "#a78bfa"
        }}>
          🎓 The #1 Homework Help Marketplace
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.1,
          marginBottom: 24, letterSpacing: -1,
        }}>
          Get Expert Help on<br />
          <span style={{
            background: "linear-gradient(135deg, #a78bfa 0%, #7C3AED 50%, #4F46E5 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Any Subject, Any Time</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.65)", maxWidth: 620, lineHeight: 1.8, marginBottom: 48 }}>
          Post your homework question. Get matched with a verified expert tutor. Pay only when you're satisfied. Over <strong style={{ color: "#a78bfa" }}>50,000 questions</strong> answered and counting.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 60 }}>
          <a href="https://course-gek-23543b27.base44.app" style={{
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            color: "#fff", padding: "18px 48px", borderRadius: 40,
            fontWeight: 700, textDecoration: "none", fontSize: 18,
            boxShadow: "0 8px 30px rgba(124,58,237,0.5)", display: "inline-block"
          }}
            onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 14px 40px rgba(124,58,237,0.7)"; }}
            onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(124,58,237,0.5)"; }}>
            🎓 Post a Question Free
          </a>
          <a href="#tutors" style={{
            background: "transparent", color: "#a78bfa",
            padding: "18px 40px", borderRadius: 40, fontWeight: 700,
            textDecoration: "none", fontSize: 18,
            border: "2px solid rgba(124,58,237,0.5)", display: "inline-block"
          }}
            onMouseOver={e => { e.target.style.background = "rgba(124,58,237,0.1)"; e.target.style.borderColor = "#a78bfa"; }}
            onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(124,58,237,0.5)"; }}>
            💰 Earn as a Tutor
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap", justifyContent: "center" }}>
          {[["50K+", "Questions Answered"], ["10K+", "Expert Tutors"], ["4.9★", "Average Rating"], ["2hr", "Avg Response Time"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#a78bfa" }}>{num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", letterSpacing: 1, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#a78bfa", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Simple Process</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, margin: 0 }}>How CourseGek Works</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 17, marginTop: 12 }}>Get expert homework help in 4 simple steps</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 28 }}>
            {howItWorks.map((step, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 20, padding: "36px 28px", textAlign: "center",
                position: "relative", transition: "all 0.3s"
              }}
                onMouseOver={e => { e.currentTarget.style.border = "1px solid rgba(124,58,237,0.5)"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.background = "rgba(124,58,237,0.06)"; }}
                onMouseOut={e => { e.currentTarget.style.border = "1px solid rgba(124,58,237,0.2)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                <div style={{
                  position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
                  width: 32, height: 32, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 900
                }}>{step.step}</div>
                <div style={{ fontSize: 44, marginBottom: 16, marginTop: 8 }}>{step.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section id="subjects" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #0f0f1a 0%, #1a0f2e 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#a78bfa", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>All Subjects Covered</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, margin: 0 }}>What Can We Help You With?</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {categories.map((cat, i) => (
              <div key={i} style={{
                background: activeCategory === i ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                border: activeCategory === i ? "1px solid #7C3AED" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: "24px 20px", cursor: "pointer",
                transition: "all 0.2s", display: "flex", alignItems: "center", gap: 14
              }}
                onClick={() => setActiveCategory(i)}
                onMouseOver={e => { if (activeCategory !== i) { e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)"; e.currentTarget.style.background = "rgba(124,58,237,0.06)"; } }}
                onMouseOut={e => { if (activeCategory !== i) { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; } }}>
                <div style={{ fontSize: 28 }}>{cat.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: activeCategory === i ? "#a78bfa" : "#fff" }}>{cat.name}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>{cat.count}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="https://course-gek-23543b27.base44.app" style={{
              display: "inline-block", background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              color: "#fff", padding: "14px 40px", borderRadius: 30,
              fontWeight: 700, textDecoration: "none", fontSize: 16,
              boxShadow: "0 6px 20px rgba(124,58,237,0.4)"
            }}>Browse All Subjects →</a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#a78bfa", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Student Reviews</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900 }}>Students Love CourseGek</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 20, padding: "32px 28px"
              }}>
                <div style={{ fontSize: 22, marginBottom: 14 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 24 }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 34 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#a78bfa" }}>{t.grade} · {t.subject}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #0f0f1a 0%, #1a0f2e 100%)" }}>
        <div style={{ maxWidth: 1050, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ color: "#a78bfa", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Simple Pricing</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, margin: 0 }}>Plans for Students & Tutors</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 17, marginTop: 12 }}>Start free. Upgrade when you need more.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                background: plan.popular ? `linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))` : "rgba(255,255,255,0.03)",
                border: plan.popular ? "2px solid #7C3AED" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 24, padding: "40px 32px", position: "relative",
                boxShadow: plan.popular ? "0 0 50px rgba(124,58,237,0.2)" : "none"
              }}>
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                    color: "#fff", padding: "6px 20px", borderRadius: 20,
                    fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>⭐ MOST POPULAR</div>
                )}
                <div style={{ fontSize: 15, color: plan.color, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>{plan.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: "#fff" }}>{plan.price}</span>
                  <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>{plan.period}</span>
                </div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, marginBottom: 28 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                      <div style={{ color: plan.color, fontSize: 14, marginTop: 1, flexShrink: 0 }}>✓</div>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.75)" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a href="https://course-gek-23543b27.base44.app" style={{
                  display: "block", textAlign: "center",
                  background: plan.popular ? "linear-gradient(135deg, #7C3AED, #4F46E5)" : `${plan.color}22`,
                  color: plan.popular ? "#fff" : plan.color,
                  border: plan.popular ? "none" : `1px solid ${plan.color}66`,
                  padding: "14px 24px", borderRadius: 30,
                  fontWeight: 700, textDecoration: "none", fontSize: 15,
                  boxShadow: plan.popular ? "0 6px 20px rgba(124,58,237,0.4)" : "none"
                }}>{plan.cta}</a>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 24 }}>
            All plans include our money-back guarantee. Questions are priced by the student and tutor — CourseGek takes a small 15% platform fee per transaction.
          </p>
        </div>
      </section>

      {/* TUTOR CTA */}
      <section id="tutors" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(79,70,229,0.1))",
            border: "1px solid rgba(124,58,237,0.3)", borderRadius: 28,
            padding: "64px 48px", textAlign: "center",
            boxShadow: "0 0 60px rgba(124,58,237,0.1)"
          }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>💰</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 16 }}>
              Earn Money Doing What You Know
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.65)", maxWidth: 580, margin: "0 auto 16px", lineHeight: 1.7 }}>
              Top tutors on CourseGek earn <strong style={{ color: "#a78bfa" }}>$1,000–$3,000+ per month</strong> answering homework questions from their phone or laptop. No experience required — just knowledge.
            </p>
            <div style={{ display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
              {[["Set your own price", "💵"], ["Work when you want", "⏰"], ["Get paid instantly", "⚡"], ["All subjects welcome", "📚"]].map(([text, icon]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", fontSize: 15 }}>
                  <span>{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
            <a href="https://course-gek-23543b27.base44.app" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              color: "#000", padding: "18px 56px", borderRadius: 40,
              fontWeight: 800, textDecoration: "none", fontSize: 18,
              boxShadow: "0 8px 30px rgba(245,158,11,0.4)"
            }}>Start Earning Today →</a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "100px 24px 80px", background: "linear-gradient(135deg, #1a0f2e, #0f0f1a)", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, marginBottom: 20, lineHeight: 1.1 }}>
            Stop struggling.<br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Start getting answers.
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, marginBottom: 40, lineHeight: 1.7 }}>
            Join thousands of students getting expert help on CourseGek. Free to start. No credit card needed.
          </p>
          <a href="https://course-gek-23543b27.base44.app" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            color: "#fff", padding: "20px 64px", borderRadius: 50,
            fontWeight: 800, textDecoration: "none", fontSize: 20,
            boxShadow: "0 10px 40px rgba(124,58,237,0.5)"
          }}>🎓 Get Help Now — It's Free</a>
          <div style={{ marginTop: 20, color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
            No credit card · 100% satisfaction guarantee · 50,000+ questions answered
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#080810", padding: "48px 40px 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 20 }}>🎓</span>
              <span style={{ fontSize: 18, fontWeight: 800 }}>Course<span style={{ color: "#7C3AED" }}>Gek</span></span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7 }}>
              The #1 marketplace for homework help and academic tutoring. Get expert answers fast.
            </p>
          </div>
          <div>
            <div style={{ color: "#a78bfa", fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 14 }}>STUDENTS</div>
            {["Post a Question", "Browse Tutors", "How It Works", "Pricing", "FAQ"].map(item => (
              <div key={item} style={{ marginBottom: 8 }}>
                <a href="https://course-gek-23543b27.base44.app" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#a78bfa"}
                  onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{item}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: "#a78bfa", fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 14 }}>TUTORS</div>
            {["Become a Tutor", "How to Earn", "Tutor Dashboard", "Payout Info", "Top Earners"].map(item => (
              <div key={item} style={{ marginBottom: 8 }}>
                <a href="https://course-gek-23543b27.base44.app" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#a78bfa"}
                  onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{item}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: "#a78bfa", fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 14 }}>COMPANY</div>
            {["About Us", "Contact", "Privacy Policy", "Terms of Service", "King Xcel Innovations"].map(item => (
              <div key={item} style={{ marginBottom: 8 }}>
                <a href="https://course-gek-23543b27.base44.app" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, textDecoration: "none" }}
                  onMouseOver={e => e.target.style.color = "#a78bfa"}
                  onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.45)"}>{item}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>© 2025 CourseGek · A King Xcel Innovations Company · CourseGek.com</div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>Expert homework help for every student</div>
        </div>
      </footer>

      <style>{`* { box-sizing: border-box; } html { scroll-behavior: smooth; }`}</style>
    </div>
  );
}
