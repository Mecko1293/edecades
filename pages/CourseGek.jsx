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
    price: "$4.99",
    period: "",
    color: "#4CAF50",
    planKey: "single",
    badge: null,
    features: [
      "One expert answer",
      "Step-by-step explanation",
      "Any subject covered",
      "Avg 2hr response time",
      "100% satisfaction guarantee",
    ],
    cta: "Get Answer — $4.99",
    popular: false,
  },
  {
    name: "3-Question Bundle",
    price: "$12.99",
    period: "",
    color: "#06B6D4",
    planKey: "bundle",
    badge: "🔥 Best Value",
    features: [
      "3 expert answers",
      "Save $2 vs. single questions",
      "Step-by-step explanations",
      "Any subject covered",
      "Priority matching",
      "100% satisfaction guarantee",
    ],
    cta: "Get Bundle — $12.99",
    popular: true,
  },
  {
    name: "Student Pro",
    price: "$14.99",
    period: "/month",
    color: "#7C3AED",
    planKey: "pro_monthly",
    badge: "⭐ Most Popular",
    features: [
      "Unlimited question posts",
      "Priority matching with top tutors",
      "Faster response times",
      "Full tutor chat & file sharing",
      "Access to past Q&A library",
      "Money-back guarantee",
    ],
    cta: "Start Pro — $14.99/mo",
    popular: false,
  },
  {
    name: "Tutor / Expert",
    price: "$19.99",
    period: "/month",
    color: "#F59E0B",
    planKey: "tutor_monthly",
    badge: null,
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

const tutors = [
  {
    name: "Dr. Priya Nair",
    avatar: "👩‍🔬",
    subjects: ["Chemistry", "Biology", "Physics"],
    rating: 4.98,
    answered: 1842,
    responseTime: "~45 min",
    degree: "PhD Chemistry, MIT",
    badge: "🏆 Top Tutor",
    color: "#7C3AED",
    quote: "I break down complex concepts into steps anyone can follow.",
  },
  {
    name: "James Whitfield",
    avatar: "👨‍💻",
    subjects: ["Computer Science", "Math", "Data Structures"],
    rating: 4.96,
    answered: 2310,
    responseTime: "~30 min",
    degree: "MS Computer Science, Stanford",
    badge: "⚡ Fast Responder",
    color: "#06B6D4",
    quote: "Coding clicks when you understand the 'why' behind it.",
  },
  {
    name: "Sofia Reyes",
    avatar: "👩‍🏫",
    subjects: ["English", "Writing", "Literature"],
    rating: 4.97,
    answered: 1560,
    responseTime: "~1 hr",
    degree: "MFA English, Columbia",
    badge: "✍️ Writing Expert",
    color: "#F59E0B",
    quote: "Strong writing is a skill — and every student can learn it.",
  },
  {
    name: "Marcus Chen",
    avatar: "👨‍🏫",
    subjects: ["Calculus", "Statistics", "Algebra"],
    rating: 4.99,
    answered: 3020,
    responseTime: "~20 min",
    badge: "🥇 #1 Rated",
    degree: "PhD Mathematics, UCLA",
    color: "#4CAF50",
    quote: "Math isn't hard — it's just misunderstood. Let me fix that.",
  },
  {
    name: "Aisha Johnson",
    avatar: "👩‍⚖️",
    subjects: ["History", "Economics", "Social Studies"],
    rating: 4.95,
    answered: 980,
    responseTime: "~1.5 hr",
    degree: "MA History, Georgetown",
    badge: "🌍 Humanities Pro",
    color: "#EC4899",
    quote: "Context is everything. I help students see the full picture.",
  },
  {
    name: "Raj Patel",
    avatar: "👨‍🔬",
    subjects: ["Physics", "Engineering", "Calculus"],
    rating: 4.97,
    answered: 1730,
    responseTime: "~40 min",
    degree: "MS Mechanical Engineering, Georgia Tech",
    badge: "⚙️ STEM Specialist",
    color: "#F97316",
    quote: "Real-world problems need real-world explanations.",
  },
];

const sampleQuestions = [
  { subject: "📐 Math", question: "What is the derivative of x² + 3x + 5?", preview: "Using the power rule: d/dx(x²) = 2x, d/dx(3x) = 3, d/dx(5) = 0. So the full derivative is..." },
  { subject: "🔬 Chemistry", question: "How does titration work in acid-base reactions?", preview: "Titration measures the concentration of an unknown solution. You add a known reagent until the reaction reaches equivalence point, indicated by..." },
  { subject: "📝 English", question: "What is the theme of The Great Gatsby?", preview: "Fitzgerald explores the corruption of the American Dream. Gatsby's pursuit of wealth and Daisy represents how materialism hollows out..." },
];

export default function CourseGek() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [freeQuestion, setFreeQuestion] = useState("");
  const [freeEmail, setFreeEmail] = useState("");
  const [freeStep, setFreeStep] = useState("idle"); // idle | previewing | gated
  const [selectedSample, setSelectedSample] = useState(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(51847);
  const [emailCapture, setEmailCapture] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const [paymentStatus] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("payment");
    }
    return null;
  });

  useEffect(() => {
    document.title = "CourseGek — Expert Homework Help";
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/ec854eb8d_image.png";
    document.head.appendChild(link);

    // Live counter tick
    const interval = setInterval(() => {
      setQuestionsAnswered(prev => prev + Math.floor(Math.random() * 2));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

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

  const handleFreeSubmit = (e) => {
    e.preventDefault();
    if (freeQuestion.trim().length < 10) return;
    setFreeStep("previewing");
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setEmailSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#0f0f1a", color: "#fff", overflowX: "hidden" }}>

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
        background: "rgba(15,15,26,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(124,58,237,0.2)",
        padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="https://media.base44.com/images/public/69c207112c5856fdf7bb496b/ec854eb8d_image.png" alt="CourseGek" style={{ width: 38, height: 38, borderRadius: 10, objectFit: "cover", boxShadow: "0 0 15px rgba(124,58,237,0.5)" }} />
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>Course<span style={{ color: "#7C3AED" }}>Gek</span></span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[["How It Works", "#how-it-works"], ["Tutors", "#tutors"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14 }}
              onMouseOver={e => e.target.style.color = "#a78bfa"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.7)"}>{label}</a>
          ))}
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
          🎓 The #1 Homework Help Marketplace · <span style={{ color: "#4ade80" }}>⬤</span> {questionsAnswered.toLocaleString()} questions answered
        </div>

        <h1 style={{ fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
          Stuck on Homework?<br />
          <span style={{ background: "linear-gradient(135deg, #a78bfa 0%, #7C3AED 50%, #4F46E5 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Get an Expert Answer in 2hrs
          </span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.65)", maxWidth: 620, lineHeight: 1.8, marginBottom: 16 }}>
          Post your question. Get matched with a verified expert. Pay only when you're satisfied. Starting at <strong style={{ color: "#a78bfa" }}>$4.99</strong>.
        </p>

        {/* Speed Guarantee */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.3)",
          borderRadius: 20, padding: "8px 20px", marginBottom: 48, fontSize: 13, color: "#67e8f9"
        }}>
          ⏱️ <strong>Speed Guarantee:</strong> Get your answer within 2 hours or your money back
        </div>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 60 }}>
          <button onClick={() => document.getElementById("free-question").scrollIntoView({ behavior: "smooth" })} style={{
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            color: "#fff", padding: "18px 48px", borderRadius: 40,
            fontWeight: 800, border: "none", cursor: "pointer", fontSize: 18,
            boxShadow: "0 8px 30px rgba(124,58,237,0.5)"
          }}>🎓 Ask a Free Question →</button>
          <a href="#pricing" style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", padding: "18px 40px", borderRadius: 40,
            fontWeight: 700, textDecoration: "none", fontSize: 18
          }}>See Pricing</a>
        </div>

        {/* Trust bar */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
          {[["⭐ 4.9/5", "Student Rating"], ["🎓 500+", "Expert Tutors"], ["📚 50K+", "Questions Answered"], ["⏱️ ~2hrs", "Avg Response Time"]].map(([val, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#a78bfa" }}>{val}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FREE QUESTION HOOK */}
      <section id="free-question" style={{ padding: "100px 24px", background: "#0a0a14" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#7C3AED", textTransform: "uppercase", marginBottom: 16 }}>Try It Free</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, marginBottom: 12 }}>
              Ask Your Question. <span style={{ color: "#a78bfa" }}>See a Preview Free.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, lineHeight: 1.6 }}>
              Type your homework question below. We'll show you a preview of the answer — then unlock the full step-by-step solution for just $4.99.
            </p>
          </div>

          {freeStep === "idle" && (
            <form onSubmit={handleFreeSubmit}>
              <div style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 20, overflow: "hidden" }}>
                <textarea
                  value={freeQuestion}
                  onChange={e => setFreeQuestion(e.target.value)}
                  placeholder="e.g. What is the derivative of x² + 3x + 5? Explain step by step..."
                  style={{
                    width: "100%", minHeight: 120, padding: "20px 24px", background: "transparent",
                    border: "none", color: "#fff", fontSize: 16, outline: "none", resize: "none",
                    boxSizing: "border-box", lineHeight: 1.6
                  }}
                />
                <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(124,58,237,0.15)", display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>{freeQuestion.length} characters</span>
                  <button type="submit" disabled={freeQuestion.trim().length < 10} style={{
                    background: freeQuestion.trim().length >= 10 ? "linear-gradient(135deg, #7C3AED, #4F46E5)" : "rgba(255,255,255,0.08)",
                    color: "#fff", padding: "12px 28px", borderRadius: 25,
                    fontWeight: 700, border: "none", cursor: freeQuestion.trim().length >= 10 ? "pointer" : "default",
                    fontSize: 14, transition: "all 0.2s"
                  }}>Get Free Preview →</button>
                </div>
              </div>
            </form>
          )}

          {freeStep === "previewing" && (
            <div style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 20, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(124,58,237,0.1)" }}>
                <div style={{ fontSize: 12, color: "#a78bfa", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Your Question</div>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 15, margin: 0, lineHeight: 1.6 }}>{freeQuestion}</p>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <div style={{ fontSize: 12, color: "#4ade80", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>✅ Expert Preview</div>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, lineHeight: 1.7, margin: "0 0 16px" }}>
                  Our expert has reviewed your question and prepared a detailed step-by-step solution. The answer covers the core concept, the working process, and a final verified result...
                </p>
                {/* Blurred teaser */}
                <div style={{ position: "relative", overflow: "hidden", borderRadius: 12 }}>
                  <div style={{ filter: "blur(6px)", pointerEvents: "none", color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.8, padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 12 }}>
                    Step 1: Identify the type of problem and applicable rules. Step 2: Apply the formula systematically. Step 3: Simplify and verify your answer. The final result is confirmed through back-substitution and cross-checking with known values...
                  </div>
                  <div style={{
                    position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(to bottom, transparent, rgba(10,10,20,0.9))"
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>🔒</div>
                    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Full Answer Ready</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 16 }}>Unlock the complete step-by-step solution</div>
                    <button onClick={() => handleCheckout("single")} style={{
                      background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                      color: "#fff", padding: "14px 36px", borderRadius: 30,
                      fontWeight: 800, border: "none", cursor: "pointer", fontSize: 16,
                      boxShadow: "0 6px 20px rgba(124,58,237,0.5)"
                    }}>Unlock Full Answer — $4.99</button>
                  </div>
                </div>
              </div>
              <div style={{ padding: "12px 24px 20px", display: "flex", justifyContent: "center" }}>
                <button onClick={() => { setFreeStep("idle"); setFreeQuestion(""); }} style={{
                  background: "transparent", border: "none", color: "rgba(255,255,255,0.35)",
                  cursor: "pointer", fontSize: 13
                }}>← Ask a different question</button>
              </div>
            </div>
          )}

          {/* Sample Q&A previews */}
          <div style={{ marginTop: 40 }}>
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 20 }}>— or browse sample questions —</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {sampleQuestions.map((q, i) => (
                <div key={i} onClick={() => setSelectedSample(selectedSample === i ? null : i)} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,58,237,0.15)",
                  borderRadius: 14, padding: "16px 20px", cursor: "pointer", transition: "all 0.2s"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 12, color: "#a78bfa", marginRight: 10 }}>{q.subject}</span>
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)" }}>{q.question}</span>
                    </div>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 18 }}>{selectedSample === i ? "▲" : "▼"}</span>
                  </div>
                  {selectedSample === i && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid rgba(124,58,237,0.1)" }}>
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, margin: "0 0 12px" }}>{q.preview}<span style={{ filter: "blur(4px)" }}> ...and the complete derivation with all steps verified.</span></p>
                      <button onClick={(e) => { e.stopPropagation(); handleCheckout("single"); }} style={{
                        background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                        color: "#fff", padding: "10px 24px", borderRadius: 20,
                        fontWeight: 700, border: "none", cursor: "pointer", fontSize: 13
                      }}>Unlock Full Answer — $4.99</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#7C3AED", textTransform: "uppercase", marginBottom: 16 }}>Process</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900 }}>
              How <span style={{ color: "#a78bfa" }}>CourseGek Works</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {howItWorks.map((step, i) => (
              <div key={i} style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.12)", borderRadius: 20, padding: "28px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{step.icon}</div>
                <div style={{ fontSize: 11, color: "#7C3AED", letterSpacing: 2, marginBottom: 8, fontWeight: 700 }}>STEP {step.step}</div>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TUTOR PROFILES */}
      <section id="tutors" style={{ padding: "100px 24px", background: "#0a0a14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#7C3AED", textTransform: "uppercase", marginBottom: 16 }}>Meet the Experts</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, marginBottom: 12 }}>
              Real Tutors. <span style={{ color: "#a78bfa" }}>Real Results.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>
              Every tutor is verified, rated by real students, and held to a 100% satisfaction standard.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {tutors.map((tutor, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 20, padding: "28px 24px", position: "relative", overflow: "hidden"
              }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${tutor.color}, transparent)` }} />
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                    background: `linear-gradient(135deg, ${tutor.color}30, ${tutor.color}10)`,
                    border: `1px solid ${tutor.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28
                  }}>{tutor.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 2 }}>{tutor.name}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{tutor.degree}</div>
                    <div style={{
                      display: "inline-block", fontSize: 11, fontWeight: 700,
                      background: `${tutor.color}20`, color: tutor.color,
                      padding: "3px 10px", borderRadius: 20, border: `1px solid ${tutor.color}40`
                    }}>{tutor.badge}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#fbbf24" }}>⭐ {tutor.rating}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>RATING</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#4ade80" }}>{tutor.answered.toLocaleString()}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>ANSWERED</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "#67e8f9" }}>{tutor.responseTime}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>RESPONSE</div>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {tutor.subjects.map((s, j) => (
                    <span key={j} style={{
                      fontSize: 12, padding: "4px 10px", borderRadius: 20,
                      background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.6)"
                    }}>{s}</span>
                  ))}
                </div>

                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, fontStyle: "italic", lineHeight: 1.6, margin: "0 0 16px" }}>"{tutor.quote}"</p>

                <button onClick={() => handleCheckout("single")} style={{
                  width: "100%", padding: "12px", borderRadius: 25,
                  background: `linear-gradient(135deg, ${tutor.color}, ${tutor.color}bb)`,
                  color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontSize: 14
                }}>Ask {tutor.name.split(" ")[0]} — $4.99</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBJECTS */}
      <section id="subjects" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#7C3AED", textTransform: "uppercase", marginBottom: 16 }}>Subjects</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, marginBottom: 48 }}>
            Every Subject. <span style={{ color: "#a78bfa" }}>Every Level.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {categories.map((cat, i) => (
              <div key={i} onClick={() => setActiveCategory(activeCategory === i ? null : i)} style={{
                background: activeCategory === i ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${activeCategory === i ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 16, padding: "20px", cursor: "pointer", transition: "all 0.2s", textAlign: "center"
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{cat.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{cat.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{cat.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px", background: "#0a0a14" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900 }}>
              Students <span style={{ color: "#a78bfa" }}>Love CourseGek</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(124,58,237,0.1)", borderRadius: 20, padding: "28px 24px" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{t.avatar}</div>
                <div style={{ color: "#fbbf24", marginBottom: 12, fontSize: 14 }}>★★★★★</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>"{t.quote}"</p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginTop: 2 }}>{t.grade} · {t.subject}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 24px", background: "#0f0f1a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#7C3AED", textTransform: "uppercase", marginBottom: 16 }}>Pricing</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: 12 }}>
            Simple, <span style={{ color: "#a78bfa" }}>Student-Friendly Pricing</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 60, fontSize: 16 }}>Pay per question, grab a bundle, or go unlimited. No hidden fees.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                background: plan.popular ? "linear-gradient(135deg, rgba(6,182,212,0.1), rgba(6,182,212,0.04))" : "rgba(255,255,255,0.03)",
                border: `1px solid ${plan.popular ? "rgba(6,182,212,0.4)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 24, padding: "32px 24px", position: "relative"
              }}>
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                    background: plan.popular ? "linear-gradient(135deg, #06B6D4, #0891B2)" : `${plan.color}30`,
                    border: plan.popular ? "none" : `1px solid ${plan.color}50`,
                    color: plan.popular ? "#fff" : plan.color,
                    padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>{plan.badge}</div>
                )}
                <div style={{ fontSize: 30, fontWeight: 900, color: plan.color }}>{plan.price}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginBottom: 8 }}>{plan.period || "one time"}</div>
                <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 24 }}>{plan.name}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", textAlign: "left" }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14, color: "rgba(255,255,255,0.65)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ color: plan.color }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleCheckout(plan.planKey)} disabled={loadingPlan === plan.planKey} style={{
                  width: "100%", padding: "14px", borderRadius: 30,
                  background: plan.popular ? "linear-gradient(135deg, #06B6D4, #0891B2)" : `linear-gradient(135deg, ${plan.color}, ${plan.color}bb)`,
                  color: "#fff", fontWeight: 700, border: "none",
                  cursor: loadingPlan === plan.planKey ? "wait" : "pointer", fontSize: 14
                }}>
                  {loadingPlan === plan.planKey ? "Loading..." : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={{ padding: "80px 24px", background: "#0a0a14" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📬</div>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 900, marginBottom: 12 }}>
            Get <span style={{ color: "#a78bfa" }}>Study Tips + Exclusive Deals</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
            Join 12,000+ students getting weekly homework hacks and subscriber-only discounts on answers.
          </p>
          {!emailSubmitted ? (
            <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email" value={emailCapture} onChange={e => setEmailCapture(e.target.value)}
                placeholder="your@email.com" required
                style={{
                  flex: "1 1 240px", padding: "14px 20px", borderRadius: 30,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                  color: "#fff", fontSize: 15, outline: "none"
                }}
              />
              <button type="submit" style={{
                background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                color: "#fff", padding: "14px 28px", borderRadius: 30,
                fontWeight: 700, border: "none", cursor: "pointer", fontSize: 15
              }}>Subscribe Free</button>
            </form>
          ) : (
            <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 16, padding: "20px", color: "#4ade80", fontWeight: 700 }}>
              ✅ You're in! Check your inbox for a welcome discount.
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", background: "#060609", borderTop: "1px solid rgba(124,58,237,0.08)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <img src="https://media.base44.com/images/public/69c207112c5856fdf7bb496b/ec854eb8d_image.png" alt="CourseGek" style={{ width: 28, height: 28, borderRadius: 7, objectFit: "cover" }} />
          <span style={{ fontWeight: 800, fontSize: 16 }}>Course<span style={{ color: "#7C3AED" }}>Gek</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, margin: "0 0 12px" }}>
          A <a href="https://antonio-major-help-app.base44.app/KingXcel" style={{ color: "rgba(201,168,76,0.6)", textDecoration: "none" }}>King Xcel Innovations</a> product · Irving, Texas
        </p>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", fontSize: 13 }}>
          {[["Ask a Question", "#free-question"], ["How It Works", "#how-it-works"], ["Tutors", "#tutors"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>{label}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}
