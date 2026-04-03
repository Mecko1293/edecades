import { useState, useEffect } from "react";

const LOGO = "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/106ee42e9_image.png";
const ADMIN_URL = "https://antonio-app-264b69b7.base44.app/KingXcelPanel";

const features = [
  { icon: "🎡", title: "Circular Puzzle Logic", desc: "Unique wheel-based math puzzles that challenge students to balance numbers around a circle. Unlike anything else in EdTech." },
  { icon: "📈", title: "3 Difficulty Levels", desc: "Easy, Medium, and Hard modes designed for elementary through high school. Every student finds their perfect challenge." },
  { icon: "📅", title: "Daily Challenges", desc: "A fresh new puzzle every single day keeps students coming back. Build streaks, earn points, and track progress." },
  { icon: "🏫", title: "Classroom Licensing", desc: "Teachers and tutors can license WheelMath for their classrooms. Bulk pricing available for schools and districts." },
  { icon: "⚡", title: "No Login Required", desc: "Jump straight into the game — no account, no signup, no barriers. Just open and play." },
  { icon: "📊", title: "Progress Tracking", desc: "Students can track their scores and improvement over time. Teachers get class-level insights." },
];

const howItWorks = [
  { step: "1", icon: "🎡", title: "Pick Your Level", desc: "Choose Easy, Medium, or Hard. Or jump into today's Daily Challenge for bonus points." },
  { step: "2", icon: "🧮", title: "Solve the Wheel", desc: "Place numbers around the wheel so every line, row, and arc adds up to the target sum." },
  { step: "3", icon: "🏆", title: "Earn & Improve", desc: "Get your score, see where you went wrong, and try to beat your best time." },
];

const testimonials = [
  { name: "Ms. Patricia H.", role: "5th Grade Math Teacher", avatar: "👩‍🏫", quote: "My students beg to play WheelMath during free time. It's the only math activity they actually get excited about." },
  { name: "Derek L.", role: "High School Student", avatar: "🧑‍🎓", quote: "I started doing the daily challenge every morning. My mental math has gotten way faster." },
  { name: "James C.", role: "Parent of 3", avatar: "👨‍👧‍👦", quote: "My kids fight over who gets to play next. Never thought I'd say that about a math game." },
];

const plans = [
  {
    name: "Free Play",
    price: "Free",
    period: "forever",
    color: "#22C55E",
    highlight: false,
    features: ["Unlimited puzzles", "All 3 difficulty levels", "Daily Challenge", "Score tracking", "No login required"],
    cta: "Play Free Now",
    href: "https://pie-math-quest.base44.app",
  },
  {
    name: "Classroom License",
    price: "TBD",
    period: "per classroom/mo",
    color: "#F59E0B",
    highlight: true,
    badge: "🔜 Coming Soon",
    features: ["Everything in Free", "Class roster management", "Student progress dashboard", "Printable worksheets", "Curriculum alignment tools", "Priority teacher support"],
    cta: "Join the Waitlist",
    href: "#waitlist",
  },
];

const stats = [
  ["Free", "Always Free to Play"],
  ["3", "Difficulty Levels"],
  ["Daily", "New Challenges"],
  ["K-12", "All Grade Levels"],
];

export default function WheelMath() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [adminClicks, setAdminClicks] = useState(0);

  useEffect(() => {
    document.title = "WheelMath — Interactive Math Puzzles";
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon"; link.href = LOGO;
    document.head.appendChild(link);
  }, []);

  const handleAdminClick = () => {
    const next = adminClicks + 1;
    setAdminClicks(next);
    if (next >= 5) {
      window.open(ADMIN_URL, "_blank");
      setAdminClicks(0);
    }
  };

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#08100a", color: "#fff", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(8,16,10,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(245,158,11,0.15)",
        padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO} alt="WheelMath" style={{ width: 38, height: 38, borderRadius: 10, objectFit: "cover", boxShadow: "0 0 15px rgba(245,158,11,0.5)" }} />
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Wheel<span style={{ color: "#F59E0B" }}>Math</span></span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["How It Works", "#how"], ["Features", "#features"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}
              onMouseOver={e => e.target.style.color = "#F59E0B"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{label}</a>
          ))}
          <a href="https://pie-math-quest.base44.app" target="_blank" style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#000", padding: "9px 22px", borderRadius: 25,
            fontWeight: 700, textDecoration: "none", fontSize: 14,
            boxShadow: "0 4px 15px rgba(245,158,11,0.4)"
          }}>Play Free →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #08100a 0%, #1a1200 50%, #08100a 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", top: 0, left: "-10%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,119,6,0.06) 0%, transparent 70%)", bottom: 0, right: "-5%" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 28, fontSize: 13, color: "#FCD34D"
        }}>
          🎡 The Math Game Students Actually Love
        </div>

        <h1 style={{ fontSize: "clamp(38px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 24, letterSpacing: -1.5 }}>
          Make Math Fun With<br />
          <span style={{
            background: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Interactive Wheel Puzzles</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.6)", maxWidth: 620, lineHeight: 1.85, marginBottom: 48 }}>
          WheelMath turns number crunching into an addictive puzzle game. Designed for K-12 students, teachers, and anyone who loves a good brain challenge. <strong style={{ color: "#FCD34D" }}>100% free to play.</strong>
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}>
          <a href="https://pie-math-quest.base44.app" target="_blank" style={{
            background: "linear-gradient(135deg, #F59E0B, #D97706)",
            color: "#000", padding: "18px 52px", borderRadius: 40,
            fontWeight: 800, textDecoration: "none", fontSize: 18,
            boxShadow: "0 8px 30px rgba(245,158,11,0.5)",
            display: "inline-block"
          }}>🎡 Play Free Now</a>
          <a href="#features" style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", padding: "18px 40px", borderRadius: 40,
            fontWeight: 700, textDecoration: "none", fontSize: 18, display: "inline-block"
          }}>See Features →</a>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center",
          background: "rgba(245,158,11,0.05)", border: "1px solid rgba(245,158,11,0.15)",
          borderRadius: 20, overflow: "hidden", maxWidth: 700, width: "100%"
        }}>
          {stats.map(([num, label], i) => (
            <div key={i} style={{
              flex: "1 1 120px", padding: "24px 20px", textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(245,158,11,0.1)" : "none"
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#F59E0B" }}>{num}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginTop: 4, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "100px 24px", background: "#0a120c" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#F59E0B", textTransform: "uppercase", marginBottom: 16 }}>How It Works</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: 60 }}>
            Three Steps to <span style={{ color: "#F59E0B" }}>Math Mastery</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
            {howItWorks.map((step, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "linear-gradient(135deg, #F59E0B, #D97706)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, margin: "0 auto 20px", boxShadow: "0 8px 24px rgba(245,158,11,0.3)"
                }}>{step.icon}</div>
                <div style={{ fontSize: 11, color: "#F59E0B", letterSpacing: 2, fontWeight: 700, marginBottom: 8 }}>STEP {step.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 24px", background: "#08100a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#F59E0B", textTransform: "uppercase", marginBottom: 16 }}>Features</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900 }}>
              Built for <span style={{ color: "#F59E0B" }}>Real Learning</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.12)",
                borderRadius: 20, padding: "28px 24px",
                transition: "all 0.2s"
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10, color: "#FCD34D" }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px", background: "#0a120c" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900 }}>
              Teachers & Students <span style={{ color: "#F59E0B" }}>Love It</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(245,158,11,0.12)",
                borderRadius: 20, padding: "28px 24px"
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{t.avatar}</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>"{t.quote}"</p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                <div style={{ color: "#F59E0B", fontSize: 12, marginTop: 4 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 24px", background: "#08100a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#F59E0B", textTransform: "uppercase", marginBottom: 16 }}>Pricing</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: 12 }}>
            Free Forever. <span style={{ color: "#F59E0B" }}>Classrooms Coming Soon.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 60, fontSize: 16 }}>WheelMath will always be free for individual students.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 700, margin: "0 auto" }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                background: plan.highlight ? `linear-gradient(135deg, rgba(245,158,11,0.1), rgba(217,119,6,0.05))` : "rgba(255,255,255,0.03)",
                border: `1px solid ${plan.highlight ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 24, padding: "36px 28px", position: "relative"
              }}>
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #F59E0B, #D97706)",
                    color: "#000", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>{plan.badge}</div>
                )}
                <div style={{ fontSize: 36, fontWeight: 900, color: plan.color, marginBottom: 4 }}>{plan.price}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 8 }}>{plan.period}</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 24 }}>{plan.name}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", textAlign: "left" }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14, color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: plan.color, fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href={plan.href} target={plan.href.startsWith("http") ? "_blank" : "_self"} style={{
                  display: "block", textAlign: "center",
                  background: plan.highlight ? "linear-gradient(135deg, #F59E0B, #D97706)" : "rgba(255,255,255,0.08)",
                  color: plan.highlight ? "#000" : "#fff",
                  padding: "14px", borderRadius: 30, fontWeight: 700,
                  textDecoration: "none", fontSize: 15
                }}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={{ padding: "100px 24px", background: "linear-gradient(135deg, #1a1200, #08100a)" }}>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🏫</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, marginBottom: 16 }}>
            Classroom Licenses <span style={{ color: "#F59E0B" }}>Coming Soon</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: 36, lineHeight: 1.7 }}>
            Be first to know when classroom licensing launches. Early sign-ups get founding member pricing.
          </p>
          {submitted ? (
            <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 16, padding: "24px", color: "#FCD34D", fontWeight: 700, fontSize: 16 }}>
              🎉 You're on the list! We'll reach out when classroom licenses launch.
            </div>
          ) : (
            <form onSubmit={handleWaitlist} style={{ display: "flex", gap: 0, borderRadius: 50, overflow: "hidden", border: "2px solid rgba(245,158,11,0.4)", background: "rgba(255,255,255,0.04)" }}>
              <input
                type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your school email..."
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 15, padding: "16px 24px" }}
              />
              <button type="submit" style={{
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
                color: "#000", border: "none", padding: "16px 28px",
                fontWeight: 700, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap"
              }}>Join Waitlist →</button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", background: "#050a06", borderTop: "1px solid rgba(245,158,11,0.08)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <img src={LOGO} alt="WheelMath" style={{ width: 28, height: 28, borderRadius: 7, objectFit: "cover" }} />
          <span style={{ fontWeight: 800, fontSize: 16 }}>Wheel<span style={{ color: "#F59E0B" }}>Math</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 12px" }}>
          A <a href="https://antonio-app-264b69b7.base44.app/KingXcel" style={{ color: "rgba(201,168,76,0.6)", textDecoration: "none" }}>King Xcel Innovations</a> product · Irving, Texas
        </p>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", fontSize: 13 }}>
          <a href="https://pie-math-quest.base44.app" target="_blank" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Play Now</a>
          <a href="https://antonio-app-264b69b7.base44.app/KingXcel" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>About</a>
          <span onClick={handleAdminClick} style={{ color: "rgba(255,255,255,0.08)", cursor: "default", userSelect: "none", fontSize: 11 }}>·</span>
        </div>
      </footer>

    </div>
  );
}
