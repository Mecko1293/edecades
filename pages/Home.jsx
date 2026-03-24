import { useState } from "react";

const products = [
  {
    name: "eDecades",
    tagline: "The World's First Decade-Themed Social Network",
    description: "Connect with people who share your era. Explore culture, music, and history by decade — from the 1900s to today.",
    icon: "⏰",
    color: "#FFD700",
    gradient: "linear-gradient(135deg, #FFD700, #FF8C00)",
    bg: "rgba(255,215,0,0.08)",
    border: "rgba(255,215,0,0.25)",
    url: "https://benevolent-decade-dive-now.base44.app",
    badge: "Social Platform",
  },
  {
    name: "CourseGek",
    tagline: "Expert Homework Help — $9.99 Per Question",
    description: "Post your homework question and get a full expert answer from a verified tutor. Any subject, any time, satisfaction guaranteed.",
    icon: "🎓",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.25)",
    url: "/CourseGek",
    badge: "EdTech Marketplace",
  },
  {
    name: "ResumeCrafted",
    tagline: "AI-Powered Resumes That Get You Hired",
    description: "Professional, ATS-optimized resumes built by AI. Stand out from the pile and land more interviews — fast.",
    icon: "📄",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    bg: "rgba(16,185,129,0.08)",
    border: "rgba(16,185,129,0.25)",
    url: "/ResumeCrafted",
    badge: "Career Tools",
  },
  {
    name: "WheelMath",
    tagline: "Math Made Visual & Fun",
    description: "Interactive math tools and visual calculators for students. From basic arithmetic to advanced calculus — see the math come alive.",
    icon: "🔢",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.25)",
    url: "#",
    badge: "Education · Coming Soon",
  },
  {
    name: "CheapMedz",
    tagline: "Find the Best Prices on Medications",
    description: "Compare prescription drug prices across pharmacies. Save money on the medications you need without sacrificing quality.",
    icon: "💊",
    color: "#EF4444",
    gradient: "linear-gradient(135deg, #EF4444, #DC2626)",
    bg: "rgba(239,68,68,0.08)",
    border: "rgba(239,68,68,0.25)",
    url: "#",
    badge: "Healthcare · Coming Soon",
  },
];

const stats = [
  { number: "5", label: "Products Built" },
  { number: "Irving, TX", label: "Headquartered" },
  { number: "2025", label: "Founded" },
  { number: "∞", label: "Ideas in Progress" },
];

export default function Home() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#08080f", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(8,8,15,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 0 15px rgba(99,102,241,0.5)"
          }}>👑</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.5 }}>King Xcel</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 1, textTransform: "uppercase" }}>Innovations</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#products" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}
            onMouseOver={e => e.target.style.color = "#fff"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.6)"}>Products</a>
          <a href="#about" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}
            onMouseOver={e => e.target.style.color = "#fff"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.6)"}>About</a>
          <a href="mailto:anthonykittles@outlook.com" style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", padding: "9px 22px", borderRadius: 25,
            fontWeight: 700, textDecoration: "none", fontSize: 14,
            boxShadow: "0 4px 15px rgba(99,102,241,0.4)"
          }}>Contact Us</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #08080f 0%, #0f0820 50%, #080f08 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", top: 0, left: "10%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)", bottom: "10%", right: "10%" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 28, fontSize: 13, color: "#a5b4fc"
        }}>
          👑 King Xcel Innovations · Irving, Texas
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.1,
          marginBottom: 24, letterSpacing: -2,
        }}>
          Building the Next Wave of<br />
          <span style={{
            background: "linear-gradient(135deg, #a5b4fc 0%, #6366f1 50%, #8b5cf6 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Digital Products</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.55)", maxWidth: 600, lineHeight: 1.8, marginBottom: 48 }}>
          We build tools people actually use — from social platforms and educational marketplaces to career tools and healthcare tech.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#products" style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", padding: "16px 44px", borderRadius: 40,
            fontWeight: 700, textDecoration: "none", fontSize: 17,
            boxShadow: "0 8px 30px rgba(99,102,241,0.4)"
          }}>Explore Our Products</a>
          <a href="mailto:anthonykittles@outlook.com" style={{
            background: "transparent", color: "#a5b4fc",
            padding: "16px 40px", borderRadius: 40, fontWeight: 700,
            textDecoration: "none", fontSize: 17,
            border: "2px solid rgba(99,102,241,0.4)"
          }}>Get In Touch</a>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 56, flexWrap: "wrap", justifyContent: "center", marginTop: 72 }}>
          {stats.map(({ number, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#a5b4fc" }}>{number}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: 1, marginTop: 4, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "100px 24px", background: "#08080f" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 16 }}>Our Products</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 18 }}>Five platforms. One mission — build things that matter.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {products.map((product, i) => (
              <a
                key={product.name}
                href={product.url}
                style={{ textDecoration: "none", color: "inherit" }}
                onMouseOver={() => setHoveredProduct(product.name)}
                onMouseOut={() => setHoveredProduct(null)}
              >
                <div style={{
                  background: hoveredProduct === product.name ? product.bg : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hoveredProduct === product.name ? product.border : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 20, padding: "32px 36px",
                  display: "flex", alignItems: "center", gap: 32,
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  transform: hoveredProduct === product.name ? "translateX(6px)" : "none"
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 16, flexShrink: 0,
                    background: product.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28, boxShadow: `0 8px 24px ${product.border}`
                  }}>{product.icon}</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                      <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>{product.name}</h3>
                      <span style={{
                        background: product.bg, border: `1px solid ${product.border}`,
                        color: product.color, padding: "3px 12px", borderRadius: 20,
                        fontSize: 11, fontWeight: 700, letterSpacing: 0.5
                      }}>{product.badge}</span>
                    </div>
                    <p style={{ color: product.color, fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>{product.tagline}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{product.description}</p>
                  </div>

                  <div style={{ color: product.color, fontSize: 24, flexShrink: 0, opacity: hoveredProduct === product.name ? 1 : 0.3, transition: "opacity 0.2s" }}>→</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: "linear-gradient(135deg, #0c0820, #080f0c)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 24 }}>👑</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 24 }}>About King Xcel Innovations</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, lineHeight: 1.9, marginBottom: 20 }}>
            King Xcel Innovations is an Irving, Texas-based digital product studio focused on building platforms that solve real problems for real people.
          </p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, lineHeight: 1.9, marginBottom: 48 }}>
            From connecting communities around shared history, to helping students ace their assignments, to making job searching smarter — we ship products that make a difference.
          </p>
          <a href="mailto:anthonykittles@outlook.com" style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", padding: "16px 44px", borderRadius: 40,
            fontWeight: 700, textDecoration: "none", fontSize: 17,
            boxShadow: "0 8px 30px rgba(99,102,241,0.4)", display: "inline-block"
          }}>📬 Reach Out — anthonykittles@outlook.com</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#05050a", padding: "48px 24px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16
          }}>👑</div>
          <span style={{ fontSize: 16, fontWeight: 800 }}>King Xcel Innovations</span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, marginBottom: 8 }}>205 Seva Ct, Irving, Texas 75061</p>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>© 2025 King Xcel Innovations. All rights reserved.</p>
      </footer>

    </div>
  );
}
