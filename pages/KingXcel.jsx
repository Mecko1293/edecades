import { useState, useEffect } from "react";

const companies = [
  {
    name: "eDecades",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/c843dbc26_image.png",
    domain: "eDecades.com",
    emoji: "🕰️",
    color: "#C9A84C",
    bg: "#1a1500",
    tagline: "The World's First Decade-Themed Social Network",
    description: "Explore culture, music, fashion, and history from every decade — 1900 to today. Connect with people who share your era, trade vintage collectibles, and relive the moments that shaped the world.",
    features: ["Decade Communities", "Vintage Marketplace", "Live Trivia & Games", "Historical Archives"],
    url: "https://benevolent-decade-dive-now.base44.app",
    category: "Social Network",
    status: "live",
  },
  {
    name: "CourseGek",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/ec854eb8d_image.png",
    domain: "CourseGek.com",
    emoji: "🎓",
    color: "#7C3AED",
    bg: "#0f0a1e",
    tagline: "The #1 Homework Help Marketplace",
    description: "Post any homework question and get matched with verified expert tutors. Pay only when you're satisfied. Over 50,000 questions answered across every academic subject.",
    features: ["Expert Tutors", "All Subjects", "Money-Back Guarantee", "Earn as a Tutor"],
    url: "https://course-gek-23543b27.base44.app",
    category: "EdTech Marketplace",
    status: "live",
  },
  {
    name: "ResumeCrafted",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/427225fcb_image.png",
    domain: "ResumeCrafted.com",
    emoji: "📄",
    color: "#4A90D9",
    bg: "#0a0e1a",
    tagline: "AI-Powered Resume Builder That Gets You Hired",
    description: "Build a professional, ATS-optimized resume in minutes. 50+ expert-designed templates, AI writing assistant, and one-click PDF export. 92% of users land interviews within 30 days.",
    features: ["50+ Pro Templates", "AI Writing Assistant", "ATS Score Checker", "One-Click PDF Export"],
    url: "https://resume-dashing-craft-pro.base44.app",
    category: "Career Tools",
    status: "live",
  },
  {
    name: "WheelMath",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/106ee42e9_image.png",
    domain: "WheelMath.com",
    emoji: "📐",
    color: "#F59E0B",
    bg: "#1a1000",
    tagline: "Interactive Math Puzzles That Make Learning Fun",
    description: "Circular number balance puzzles for students, educators, and math enthusiasts. Three difficulty levels, daily challenges, and classroom licensing for schools and tutors.",
    features: ["Daily Challenges", "3 Difficulty Levels", "Classroom Licenses", "No Login Required"],
    url: "https://pie-math-quest.base44.app",
    category: "EdTech Game",
    status: "live",
  },
  {
    name: "CheapMedz",
    logo: "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/a1db150cd_generated_image.png",
    domain: "CheapMedz.com",
    emoji: "💊",
    color: "#EF4444",
    bg: "#1a0808",
    tagline: "Find the Best Prices on Your Medications",
    description: "A medication price comparison platform helping Americans find the lowest cost prescriptions at pharmacies near them. Domain registered — platform in concept development.",
    features: ["Price Comparison", "Pharmacy Locator", "Prescription Savings", "No Membership Required"],
    url: "https://antonio-app-264b69b7.base44.app/CheapMedz",
    category: "Healthcare",
    status: "concept",
  },
];

const stats = [
  { value: "5", label: "Digital Platforms" },
  { value: "500K+", label: "Users Served" },
  { value: "2025", label: "Founded" },
  { value: "100%", label: "USA Based" },
];

const values = [
  { icon: "💡", title: "Innovation First", desc: "Every product we build solves a real problem in a fresh, technology-forward way." },
  { icon: "🎯", title: "User Obsessed", desc: "We design for real people — students, job seekers, history lovers, and lifelong learners." },
  { icon: "🔒", title: "Trust & Integrity", desc: "We build platforms people can rely on — secure, transparent, and always improving." },
  { icon: "🚀", title: "Built to Scale", desc: "Our platforms are engineered from day one to grow with our users and communities." },
];

export default function KingXcel() {
  const [hoveredCompany, setHoveredCompany] = useState(null);

  useEffect(() => {
    document.title = "King Xcel Innovations";
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon"; link.href = "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/614b28868_image.png";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#080810", color: "#fff", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(8,8,16,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.15)",
        padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img src="https://media.base44.com/images/public/69c207112c5856fdf7bb496b/614b28868_image.png" alt="King Xcel Innovations" style={{ width: 42, height: 42, borderRadius: 12, objectFit: "cover", boxShadow: "0 0 20px rgba(201,168,76,0.4)" }} />
          <div>
            <div style={{ fontSize: 17, fontWeight: 900, color: "#fff", letterSpacing: -0.3 }}>
              King <span style={{ color: "#C9A84C" }}>Xcel</span> Innovations
            </div>
            <div style={{ fontSize: 10, color: "rgba(201,168,76,0.6)", letterSpacing: 2, textTransform: "uppercase" }}>Digital Portfolio</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {[["Our Companies", "#companies"], ["About Us", "#about"], ["Contact", "#contact"]].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 14 }}
              onMouseOver={e => e.target.style.color = "#C9A84C"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{label}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #080810 0%, #12100a 50%, #080810 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "140px 24px 100px", position: "relative", overflow: "hidden"
      }}>
        <div style={{
          position: "absolute", fontSize: 400, opacity: 0.025,
          top: "50%", left: "50%", transform: "translate(-50%, -55%)",
          pointerEvents: "none", userSelect: "none", lineHeight: 1
        }}>👑</div>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", top: "10%", left: "0%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,105,20,0.07) 0%, transparent 70%)", bottom: "10%", right: "0%" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)",
          borderRadius: 30, padding: "8px 22px", marginBottom: 32, fontSize: 13, color: "#C9A84C", letterSpacing: 0.5
        }}>
          👑 King Xcel Innovations · Digital Technology Company
        </div>

        <h1 style={{ fontSize: "clamp(38px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 28, letterSpacing: -1.5 }}>
          Building Digital Platforms<br />
          <span style={{
            background: "linear-gradient(135deg, #E8C870 0%, #C9A84C 50%, #8B6914 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>That Matter</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.55)", maxWidth: 660, lineHeight: 1.85, marginBottom: 56 }}>
          King Xcel Innovations is a U.S.-based digital technology company building a portfolio of innovative web platforms in education, career development, social networking, healthcare, and interactive learning.
        </p>

        <div style={{
          display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center",
          background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.15)",
          borderRadius: 20, overflow: "hidden", maxWidth: 780, width: "100%"
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: "1 1 140px", padding: "28px 20px", textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none"
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#C9A84C" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginTop: 5, textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <a href="#companies" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #C9A84C, #8B6914)",
            color: "#000", padding: "16px 48px", borderRadius: 40,
            fontWeight: 800, textDecoration: "none", fontSize: 16,
            boxShadow: "0 8px 30px rgba(201,168,76,0.35)"
          }}
            onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 14px 40px rgba(201,168,76,0.5)"; }}
            onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(201,168,76,0.35)"; }}>
            Explore Our Portfolio ↓
          </a>
        </div>
      </section>

      {/* COMPANIES */}
      <section id="companies" style={{ padding: "100px 24px", background: "#080810" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ color: "#C9A84C", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Our Portfolio</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, margin: 0 }}>Five Platforms. One Vision.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, marginTop: 14, maxWidth: 520, margin: "14px auto 0" }}>
              Each company is independently operated, purpose-built, and designed to lead its market.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(520px, 1fr))", gap: 24 }}>
            {companies.map((co, i) => (
              <div key={i}
                onMouseEnter={() => setHoveredCompany(i)}
                onMouseLeave={() => setHoveredCompany(null)}
                style={{
                  background: hoveredCompany === i ? co.bg : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hoveredCompany === i ? co.color + "40" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: 24, padding: "36px 32px",
                  transition: "all 0.3s ease",
                  opacity: co.status === "concept" ? 0.85 : 1,
                  position: "relative", overflow: "hidden"
                }}>

                {/* Concept Mode Banner */}
                {co.status === "concept" && (
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)",
                    color: "#EF4444", fontSize: 10, fontWeight: 800,
                    padding: "4px 12px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase"
                  }}>🔬 Concept Mode · Not Started</div>
                )}

                {co.status === "live" && (
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)",
                    color: "#4ade80", fontSize: 10, fontWeight: 800,
                    padding: "4px 12px", borderRadius: 20, letterSpacing: 1, textTransform: "uppercase"
                  }}>● Live</div>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <img src={co.logo} alt={co.name} style={{ width: 52, height: 52, borderRadius: 14, objectFit: "cover", boxShadow: `0 8px 20px ${co.color}30`, filter: co.status === "concept" ? "grayscale(50%)" : "none" }} />
                    <div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{co.name}</div>
                      <div style={{ fontSize: 12, color: co.color, marginTop: 2 }}>{co.domain}</div>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 11, color: co.color, fontWeight: 700,
                    background: `${co.color}15`, border: `1px solid ${co.color}30`,
                    padding: "5px 14px", borderRadius: 20, letterSpacing: 0.5, whiteSpace: "nowrap"
                  }}>{co.category}</div>
                </div>

                <p style={{ fontSize: 14, color: "#C9A84C", fontStyle: "italic", fontWeight: 600, marginBottom: 12, lineHeight: 1.5 }}>
                  "{co.tagline}"
                </p>

                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.58)", lineHeight: 1.8, marginBottom: 24 }}>
                  {co.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                  {co.features.map((f, j) => (
                    <span key={j} style={{
                      fontSize: 12, color: co.status === "concept" ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.65)",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      padding: "5px 14px", borderRadius: 20
                    }}>{co.status === "concept" ? "○" : "✓"} {f}</span>
                  ))}
                </div>

                {co.status === "live" ? (
                  <a href={co.url} target="_blank" rel="noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: `linear-gradient(135deg, ${co.color}, ${co.color}aa)`,
                    color: "#000", padding: "12px 28px", borderRadius: 30,
                    fontWeight: 700, textDecoration: "none", fontSize: 14,
                    boxShadow: `0 6px 20px ${co.color}30`
                  }}>Visit {co.name} →</a>
                ) : (
                  <a href={co.url} target="_blank" rel="noreferrer" style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.35)",
                    color: "#fca5a5", padding: "12px 28px", borderRadius: 30,
                    fontWeight: 700, fontSize: 14, textDecoration: "none"
                  }}>🔜 Preview Concept Page →</a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #080810 0%, #0e0c04 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ color: "#C9A84C", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>About the Company</div>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 24 }}>
                A Digital Innovation<br />
                <span style={{ background: "linear-gradient(135deg, #E8C870, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Company Built to Last
                </span>
              </h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.58)", lineHeight: 1.9, marginBottom: 20 }}>
                King Xcel Innovations is a U.S.-based digital technology company dedicated to building platforms that educate, connect, and empower people online.
              </p>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.58)", lineHeight: 1.9, marginBottom: 32 }}>
                Our portfolio spans social networking, educational marketplaces, career development tools, healthcare technology, and interactive learning games — each product designed to lead its market and deliver real value to real users.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {[["5", "PLATFORMS"], ["USA", "BASED"], ["2025", "FOUNDED"]].map(([val, label]) => (
                  <div key={label} style={{
                    background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: 14, padding: "16px 24px", textAlign: "center"
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#C9A84C" }}>{val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4, letterSpacing: 1 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {values.map((v, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.1)",
                  borderRadius: 18, padding: "28px 22px", transition: "all 0.3s"
                }}
                  onMouseOver={e => { e.currentTarget.style.background = "rgba(201,168,76,0.05)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)"; }}
                  onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.1)"; }}>
                  <div style={{ fontSize: 30, marginBottom: 14 }}>{v.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{v.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE SELL — For Stripe Compliance */}
      <section style={{ padding: "80px 24px", background: "#080810" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ color: "#C9A84C", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Products & Services</div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 900 }}>What We Offer</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 20 }}>
            {[
              { icon: "💳", title: "SaaS Subscriptions", desc: "Monthly and annual subscription plans for premium platform access across all products.", price: "From $4.99/mo" },
              { icon: "🎓", title: "Tutoring Marketplace", desc: "Transaction-based platform fees for homework help and academic tutoring sessions.", price: "From $9.99/answer" },
              { icon: "📄", title: "Resume Downloads", desc: "One-time purchase for professional resume PDF downloads with premium templates.", price: "From $4.99" },
              { icon: "🏫", title: "Classroom Licenses", desc: "Annual licenses for schools and educators to use WheelMath in classroom settings.", price: "From $99/yr" },
            ].map((p, i) => (
              <div key={i} style={{
                background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: 18, padding: "28px 22px", textAlign: "center"
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginBottom: 12 }}>{p.desc}</div>
                <div style={{ fontSize: 13, color: "#C9A84C", fontWeight: 700 }}>{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px 80px", background: "linear-gradient(135deg, #0e0c04, #080810)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 28, padding: "64px 48px", boxShadow: "0 0 60px rgba(201,168,76,0.06)"
          }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>👑</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 900, marginBottom: 16 }}>
              Partner With <span style={{ background: "linear-gradient(135deg, #E8C870, #C9A84C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>King Xcel</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
              Interested in partnerships, advertising, or business inquiries? We'd love to hear from you.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              <a href="mailto:anthonykittles@outlook.com" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                color: "#000", padding: "16px 40px", borderRadius: 30,
                fontWeight: 800, textDecoration: "none", fontSize: 15,
                boxShadow: "0 8px 25px rgba(201,168,76,0.3)"
              }}>📬 anthonykittles@outlook.com</a>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.3)" }}>
                📍 205 Seva Ct, Irving, Texas 75061
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#04040a", padding: "40px 24px", textAlign: "center", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #C9A84C, #8B6914)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
          }}>👑</div>
          <span style={{ fontSize: 16, fontWeight: 800 }}>King <span style={{ color: "#C9A84C" }}>Xcel</span> Innovations</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>© 2025 King Xcel Innovations. All rights reserved. · Irving, Texas</p>
      </footer>

    </div>
  );
}
