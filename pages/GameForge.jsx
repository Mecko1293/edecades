import { useState, useEffect } from "react";

const ADMIN_URL = "https://antonio-major-help-app.base44.app/KingXcelPanel";
const APP_URL = "https://app.base44.com/apps/69cefe45fb6ca50b89904e8e";

const phases = [
  { icon: "💡", title: "Concept Generation", desc: "Describe your game idea in plain language. Game Forge's AI builds out a full concept doc — genre, target audience, core loop, and unique selling points." },
  { icon: "🔍", title: "Competitive Research", desc: "AI scans the market and surfaces similar games, what they do well, and where the gaps are. Know exactly where your game fits before you build." },
  { icon: "⚙️", title: "Engine Recommendation", desc: "Based on your genre, platform, and team size, Game Forge recommends the best engine — Unity, Unreal, Godot, or others — with reasoning." },
  { icon: "🎮", title: "Mechanics Engineering", desc: "Generate detailed game mechanics blueprints: combat systems, progression loops, economy design, and player retention hooks." },
  { icon: "🧪", title: "Testing Plan", desc: "Get a full QA and playtesting plan tailored to your game — what to test, when, and how to gather feedback before launch." },
];

const features = [
  { icon: "🤖", title: "AI-Powered Studio", desc: "Every phase is powered by advanced AI that understands game design principles, market trends, and what makes games succeed." },
  { icon: "📄", title: "Full GDD Output", desc: "Walk away with a professional Game Design Document ready to hand to a dev team, publisher, or investor." },
  { icon: "🎯", title: "Any Genre, Any Platform", desc: "From mobile casual to PC RPG to console shooter — Game Forge handles every genre and platform combination." },
  { icon: "👥", title: "Solo or Team", desc: "Whether you're a solo indie dev or leading a studio team, Game Forge scales to your experience and team size." },
  { icon: "⚡", title: "Minutes, Not Months", desc: "What used to take a lead designer weeks to produce, Game Forge generates in minutes. Ship faster, iterate faster." },
  { icon: "🔒", title: "Your Ideas Stay Yours", desc: "All your game projects are private by default. Your concepts, mechanics, and designs belong to you." },
];

const genres = [
  { emoji: "⚔️", name: "RPG" },
  { emoji: "🔫", name: "Shooter" },
  { emoji: "🧩", name: "Puzzle" },
  { emoji: "🏃", name: "Platformer" },
  { emoji: "🌍", name: "Open World" },
  { emoji: "👻", name: "Horror" },
  { emoji: "🏎️", name: "Racing" },
  { emoji: "🃏", name: "Card / Strategy" },
  { emoji: "🏗️", name: "Builder / Sim" },
  { emoji: "🥊", name: "Fighting" },
  { emoji: "🎲", name: "Casual / Hyper-casual" },
  { emoji: "🧠", name: "Narrative / Story" },
];

const testimonials = [
  { avatar: "👨‍💻", name: "Marcus B.", role: "Indie Developer", quote: "I had a game idea rattling around in my head for 2 years. Game Forge turned it into a full GDD in 20 minutes. I'm already in development." },
  { avatar: "👩‍🎨", name: "Tanya R.", role: "Game Designer", quote: "The competitive research phase alone is worth it. Knowing exactly where my game sits in the market changed how I positioned everything." },
  { avatar: "🧑‍🏫", name: "Prof. David K.", role: "Game Design Instructor", quote: "I use Game Forge with my students. It teaches them how to think through design systematically. Best tool I've added to my curriculum." },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    color: "#22C55E",
    highlight: false,
    features: ["3 game projects", "Concept generation", "Engine recommendation", "Basic GDD export"],
    cta: "Start Free",
    badge: null,
  },
  {
    name: "Indie Pro",
    price: "$12.99",
    period: "/month",
    color: "#6366F1",
    highlight: true,
    features: ["Unlimited projects", "All 5 design phases", "Full GDD export (PDF)", "Competitive research", "Mechanics blueprints", "Testing plan generator", "Priority AI processing"],
    cta: "Start Building — $12.99/mo",
    badge: "⭐ Most Popular",
  },
  {
    name: "Studio",
    price: "$39.99",
    period: "/month",
    color: "#F59E0B",
    highlight: false,
    features: ["Everything in Indie Pro", "Up to 10 team members", "Shared project workspace", "Version history", "Publisher-ready exports", "Dedicated support"],
    cta: "Coming Soon",
    badge: "🔜 Team Plan",
  },
];

const stats = [
  ["5", "Design Phases"],
  ["Any", "Genre & Platform"],
  ["AI", "Powered Studio"],
  ["Minutes", "Not Months"],
];

export default function GameForge() {
  const [activeGenre, setActiveGenre] = useState(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Game Forge — AI Game Design Studio";
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/614b28868_image.png";
    document.head.appendChild(link);
  }, []);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#060812", color: "#fff", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(6,8,18,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(99,102,241,0.2)",
        padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg, #6366F1, #4338CA)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 0 15px rgba(99,102,241,0.5)"
          }}>🎮</div>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>Game<span style={{ color: "#6366F1" }}>Forge</span></span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["Phases", "#phases"], ["Features", "#features"], ["Genres", "#genres"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}
              onMouseOver={e => e.target.style.color = "#818CF8"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.6)"}>{label}</a>
          ))}
          <a href={APP_URL} target="_blank" style={{
            background: "linear-gradient(135deg, #6366F1, #4338CA)",
            color: "#fff", padding: "9px 22px", borderRadius: 25,
            fontWeight: 700, textDecoration: "none", fontSize: 14,
            boxShadow: "0 4px 15px rgba(99,102,241,0.4)"
          }}>Launch Studio →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #060812 0%, #0d0b24 50%, #060812 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", top: "-10%", left: "-15%" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(67,56,202,0.08) 0%, transparent 70%)", bottom: "0%", right: "-10%" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.35)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 28, fontSize: 13, color: "#818CF8"
        }}>
          🎮 AI-Powered Game Design Studio · From Idea to GDD in Minutes
        </div>

        <h1 style={{ fontSize: "clamp(38px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 24, letterSpacing: -1.5 }}>
          Turn Your Game Idea<br />
          <span style={{
            background: "linear-gradient(135deg, #A5B4FC 0%, #6366F1 50%, #4338CA 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Into a Real Game Design</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.6)", maxWidth: 640, lineHeight: 1.85, marginBottom: 48 }}>
          Game Forge is an AI-powered development studio that walks you through every phase of game design — from concept to competitive research, mechanics engineering, and a full testing plan. <strong style={{ color: "#A5B4FC" }}>No experience required.</strong>
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}>
          <a href={APP_URL} target="_blank" style={{
            background: "linear-gradient(135deg, #6366F1, #4338CA)",
            color: "#fff", padding: "18px 52px", borderRadius: 40,
            fontWeight: 800, textDecoration: "none", fontSize: 18,
            boxShadow: "0 8px 30px rgba(99,102,241,0.5)", display: "inline-block"
          }}>🎮 Launch Game Forge Free</a>
          <a href="#phases" style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff", padding: "18px 40px", borderRadius: 40,
            fontWeight: 700, textDecoration: "none", fontSize: 18, display: "inline-block"
          }}>See How It Works →</a>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: 0, flexWrap: "wrap", justifyContent: "center",
          background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)",
          borderRadius: 20, overflow: "hidden", maxWidth: 700, width: "100%"
        }}>
          {stats.map(([num, label], i) => (
            <div key={i} style={{
              flex: "1 1 120px", padding: "24px 20px", textAlign: "center",
              borderRight: i < stats.length - 1 ? "1px solid rgba(99,102,241,0.1)" : "none"
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#818CF8" }}>{num}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginTop: 4, textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PHASES */}
      <section id="phases" style={{ padding: "100px 24px", background: "#080a16" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#6366F1", textTransform: "uppercase", marginBottom: 16 }}>Design Pipeline</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900 }}>
              5 Phases. <span style={{ color: "#818CF8" }}>One Complete Game Design.</span>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {phases.map((phase, i) => (
              <div key={i} style={{
                display: "flex", gap: 24, alignItems: "flex-start",
                background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.12)",
                borderRadius: 20, padding: "28px 32px"
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(67,56,202,0.1))",
                  border: "1px solid rgba(99,102,241,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26
                }}>{phase.icon}</div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: "#6366F1", fontWeight: 700, letterSpacing: 2 }}>PHASE {i + 1}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{phase.title}</h3>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 24px", background: "#060812" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontSize: 12, letterSpacing: 3, color: "#6366F1", textTransform: "uppercase", marginBottom: 16 }}>Features</div>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900 }}>
              Everything a <span style={{ color: "#818CF8" }}>Game Designer Needs</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.1)",
                borderRadius: 20, padding: "28px 24px"
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10, color: "#A5B4FC" }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GENRES */}
      <section id="genres" style={{ padding: "100px 24px", background: "#080a16" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#6366F1", textTransform: "uppercase", marginBottom: 16 }}>Supported Genres</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, marginBottom: 12 }}>
            Any Genre. <span style={{ color: "#818CF8" }}>Any Vision.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 48, fontSize: 16 }}>Game Forge understands the design language of every major genre.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {genres.map((g, i) => (
              <button key={i} onClick={() => setActiveGenre(activeGenre === i ? null : i)} style={{
                padding: "12px 22px", borderRadius: 30,
                border: `1px solid ${activeGenre === i ? "rgba(99,102,241,0.8)" : "rgba(99,102,241,0.2)"}`,
                background: activeGenre === i ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.04)",
                color: activeGenre === i ? "#A5B4FC" : "rgba(255,255,255,0.7)",
                fontWeight: 600, fontSize: 14, cursor: "pointer", transition: "all 0.2s"
              }}>{g.emoji} {g.name}</button>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "100px 24px", background: "#060812" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900 }}>
              Developers <span style={{ color: "#818CF8" }}>Ship Faster</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(99,102,241,0.12)",
                borderRadius: 20, padding: "28px 24px"
              }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{t.avatar}</div>
                <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>"{t.quote}"</p>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                <div style={{ color: "#6366F1", fontSize: 12, marginTop: 4 }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "100px 24px", background: "#080a16" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 12, letterSpacing: 3, color: "#6366F1", textTransform: "uppercase", marginBottom: 16 }}>Pricing</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, marginBottom: 12 }}>
            Start Free. <span style={{ color: "#818CF8" }}>Scale When Ready.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 60, fontSize: 16 }}>No credit card required to get started.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, maxWidth: 900, margin: "0 auto" }}>
            {plans.map((plan, i) => (
              <div key={i} style={{
                background: plan.highlight ? "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(67,56,202,0.06))" : "rgba(255,255,255,0.03)",
                border: `1px solid ${plan.highlight ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 24, padding: "36px 28px", position: "relative"
              }}>
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                    background: plan.highlight ? "linear-gradient(135deg, #6366F1, #4338CA)" : "rgba(245,158,11,0.2)",
                    border: plan.highlight ? "none" : "1px solid rgba(245,158,11,0.4)",
                    color: plan.highlight ? "#fff" : "#FCD34D",
                    padding: "4px 18px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>{plan.badge}</div>
                )}
                <div style={{ fontSize: 34, fontWeight: 900, color: plan.color, marginBottom: 4 }}>{plan.price}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 8 }}>{plan.period}</div>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 24 }}>{plan.name}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", textAlign: "left" }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 14, color: "rgba(255,255,255,0.7)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ color: plan.color }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href={plan.cta === "Coming Soon" ? "#" : APP_URL} target={plan.cta !== "Coming Soon" ? "_blank" : "_self"} style={{
                  display: "block", textAlign: "center",
                  background: plan.highlight ? "linear-gradient(135deg, #6366F1, #4338CA)" : "rgba(255,255,255,0.07)",
                  color: "#fff", padding: "14px", borderRadius: 30,
                  fontWeight: 700, textDecoration: "none", fontSize: 15,
                  opacity: plan.cta === "Coming Soon" ? 0.5 : 1,
                  cursor: plan.cta === "Coming Soon" ? "default" : "pointer"
                }}>{plan.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px", background: "linear-gradient(135deg, #0d0b24, #060812)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🎮</div>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, marginBottom: 16 }}>
            Your Game Is <span style={{ color: "#818CF8" }}>Waiting to Be Built</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 40, lineHeight: 1.7, fontSize: 16 }}>
            Stop letting your idea sit in a notebook. Game Forge gives you the professional design foundation to actually ship it.
          </p>
          <a href={APP_URL} target="_blank" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #6366F1, #4338CA)",
            color: "#fff", padding: "18px 56px", borderRadius: 40,
            fontWeight: 800, textDecoration: "none", fontSize: 18,
            boxShadow: "0 8px 32px rgba(99,102,241,0.5)"
          }}>Start Building Free →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 24px", background: "#040609", borderTop: "1px solid rgba(99,102,241,0.08)", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #6366F1, #4338CA)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🎮</div>
          <span style={{ fontWeight: 800, fontSize: 16 }}>Game<span style={{ color: "#6366F1" }}>Forge</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, margin: "0 0 12px" }}>
          A <a href="https://antonio-major-help-app.base44.app/KingXcel" style={{ color: "rgba(201,168,76,0.6)", textDecoration: "none" }}>King Xcel Innovations</a> product · Irving, Texas
        </p>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", fontSize: 13 }}>
          <a href={APP_URL} target="_blank" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Launch Studio</a>
          <a href="https://antonio-major-help-app.base44.app/KingXcel" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>About</a>
          <span onClick={() => { const c = (window._ac = (window._ac||0)+1); if(c>=5){window.open(ADMIN_URL,"_blank");window._ac=0;} }} style={{ color: "rgba(255,255,255,0.04)", cursor: "default", userSelect: "none", fontSize: 11 }}>·</span>
        </div>
      </footer>

    </div>
  );
}
