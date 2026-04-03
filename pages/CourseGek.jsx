import { useState, useEffect } from "react";

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
    name: "Single Question",
    price: "$9.99",
    period: "",
    color: "#4CAF50",
    planKey: "single",
    features: [
      "One expert answer",
      "Step-by-step explanation",
      "Any subject covered",
      "Avg 2hr response time",
      "100% satisfaction guarantee",
    ],
    cta: "Get Answer — $9.99",
    popular: false,
  },
  {
    name: "Student Pro",
    price: "$14.99",
    period: "/month",
    color: "#7C3AED",
    planKey: "pro_monthly",
    features: [
      "Unlimited question posts",
      "Priority matching with top tutors",
      "Faster response times",
      "Full tutor chat & file sharing",
      "Access to past Q&A library",
      "Money-back guarantee",
    ],
    cta: "Start Pro — $14.99/mo",
    popular: true,
  },
  {
    name: "Tutor / Expert",
    price: "$19.99",
    period: "/month",
    color: "#F59E0B",
    planKey: "tutor_monthly",
    features: [
      "List unlimited subjects",
      "Receive unlimited student bids",
      "Featured profile placement",
      "Instant payout on completions",
      "Analytics dashboard",
      "CourseGek verified badge",
    ],
    cta: "Become a Tutor — $19.99/mo",
    popular: false,
  },
];

export default function CourseGek() {
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    document.title = "CourseGek — Expert Homework Help";
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon"; link.href = "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/ec854eb8d_image.png";
    document.head.appendChild(link);
  }, []);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
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
      const res = await fetch("/functions/createCourseGekCheckout", {
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
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#0f0f1a", color: "#fff", overflowX: "hidden", margin: 0, padding: 0 }}>

      {/* Payment Status Banner */}
      {paymentStatus === "success" && (
        <div style={{ background: "linear-gradient(135deg, #4CAF50, #2e7d32)", padding: "16px", textAlign: "center", fontWeight: 700, fontSize: 16 }}>
          🎉 Payment successful! Your question is being matched with an expert tutor now.
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
        background: "rgba(15,15,26,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(124,58,237,0.2)",
        padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="https://media.base44.com/images/public/69c207112c5856fdf7bb496b/ec854eb8d_image.png" alt="CourseGek" style={{ width: 38, height: 38, borderRadius: 10, objectFit: "cover", boxShadow: "0 0 15px rgba(124,58,237,0.5)" }} />
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
          <button onClick={() => handleCheckout("single")} style={{
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            color: "#fff", padding: "9px 22px", borderRadius: 25,
            fontWeight: 700, border: "none", cursor: "pointer", fontSize: 14,
            boxShadow: "0 4px 15px rgba(124,58,237,0.4)"
          }}>Get Help Now →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 40%, #0f1a2e 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden"
      }}>
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
          <button onClick={() => handleCheckout("single")} disabled={loadingPlan === "single"} style={{
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            color: "#fff", padding: "18px 48px", borderRadius: 40,
            fontWeight: 700, border: "none", cursor: "pointer", fontSize: 18,
            boxShadow: "0 8px 30px rgba(124,58,237,0.5)", opacity: loadingPlan === "single" ? 0.7 : 1
          }}>
            {loadingPlan === "single" ? "⏳ Loading..." : "🎓 Get an Answer — $9.99"}
          </button>
          <button onClick={() => handleCheckout("tutor_monthly")} style={{
            background: "transparent", color: "#a78bfa",
            padding: "18px 40px", borderRadius: 40, fontWeight: 700,
            border: "2px solid rgba(124,58,237,0.5)", cursor: "pointer", fontSize: 18,
          }}>
            💰 Earn as a Tutor
          </button>
        </div>

        <div style={{ display: "flex", gap: 56, flexWrap: "wrap", justifyContent: "center" }}>
          {[["$9.99", "Per Question"], ["50K+", "Questions Answered"], ["10K+", "Expert Tutors"], ["4.9★", "Average Rating"]].map(([num, label]) => (
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
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 16 }}>How It Works</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18, maxWidth: 500, margin: "0 auto" }}>Get expert help in 4 simple steps</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {howItWorks.map((item) => (
              <div key={item.step} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(124,58,237,0.2)",
                borderRadius: 20, padding: "32px 24px", textAlign: "center", position: "relative"
              }}>
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                  width: 28, height: 28, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800
                }}>{item.step}</div>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{item.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section id="subjects" style={{ padding: "100px 24px", background: "#0a0a14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 16 }}>Every Subject Covered</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>From high school homework to college assignments</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {categories.map((cat) => (
              <div key={cat.name}
                onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
                style={{
                  background: activeCategory === cat.name ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${activeCategory === cat.name ? "#7C3AED" : "rgba(124,58,237,0.15)"}`,
                  borderRadius: 16, padding: "24px 20px", cursor: "pointer", transition: "all 0.2s",
                  textAlign: "center"
                }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>{cat.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{cat.name}</div>
                <div style={{ fontSize: 12, color: "#a78bfa" }}>{cat.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 16 }}>Simple, Transparent Pricing</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 18 }}>Pay per question or go unlimited with a subscription</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "start" }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{
                background: plan.popular ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.04)",
                border: `2px solid ${plan.popular ? "#7C3AED" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 24, padding: "36px 28px", position: "relative",
                boxShadow: plan.popular ? "0 0 40px rgba(124,58,237,0.2)" : "none"
              }}>
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                    padding: "5px 20px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>⭐ Most Popular</div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: plan.color }}>{plan.price}</span>
                  <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 14 }}>{plan.period}</span>
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
                    background: plan.popular ? "linear-gradient(135deg, #7C3AED, #4F46E5)" : "transparent",
                    border: plan.popular ? "none" : `2px solid ${plan.color}`,
                    color: plan.popular ? "#fff" : plan.color,
                    fontWeight: 700, fontSize: 15, cursor: "pointer",
                    opacity: loadingPlan === plan.planKey ? 0.7 : 1,
                    boxShadow: plan.popular ? "0 6px 20px rgba(124,58,237,0.4)" : "none"
                  }}>
                  {loadingPlan === plan.planKey ? "⏳ Loading..." : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px", background: "#0a0a14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 16 }}>Students Love CourseGek</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28 }}>
            {testimonials.map((t) => (
              <div key={t.name} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(124,58,237,0.15)",
                borderRadius: 20, padding: "28px"
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 32 }}>{t.avatar}</div>
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

      {/* TUTOR CTA */}
      <section id="tutors" style={{ padding: "100px 24px", background: "linear-gradient(135deg, #1a0f2e, #0f1a2e)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 24 }}>💰</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 20 }}>
            Earn Money Sharing Your Knowledge
          </h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, lineHeight: 1.8, marginBottom: 40 }}>
            Join thousands of tutors earning $30–$80/hr helping students succeed. Set your own hours, pick your subjects, get paid fast.
          </p>
          <button onClick={() => handleCheckout("tutor_monthly")} disabled={loadingPlan === "tutor_monthly"} style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#000", padding: "18px 52px", borderRadius: 40,
            fontWeight: 800, fontSize: 18, border: "none", cursor: "pointer",
            boxShadow: "0 8px 30px rgba(245,158,11,0.4)",
            opacity: loadingPlan === "tutor_monthly" ? 0.7 : 1
          }}>
            {loadingPlan === "tutor_monthly" ? "⏳ Loading..." : "🚀 Become a Tutor — $19.99/mo"}
          </button>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 16 }}>Cancel anytime. First month free for early signups.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#07070f", padding: "48px 24px", textAlign: "center", borderTop: "1px solid rgba(124,58,237,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
          }}>🎓</div>
          <span style={{ fontSize: 18, fontWeight: 800 }}>Course<span style={{ color: "#7C3AED" }}>Gek</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 12 }}>
          A King Xcel Innovations product · <a href="/KingXcel" style={{ color: "#a78bfa", textDecoration: "none" }}>About Us</a>
        </p>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2025 CourseGek. All rights reserved.</p>
        <span onClick={() => { const c = (window._ac = (window._ac||0)+1); if(c>=5){window.open("https://antonio-major-help-app.base44.app/KingXcelPanel","_blank");window._ac=0;} }} style={{ color: "rgba(255,255,255,0.04)", cursor: "default", userSelect: "none", fontSize: 10 }}>·</span>
      </footer>
    </div>
  );
}
