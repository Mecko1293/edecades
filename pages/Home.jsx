import { useState, useEffect } from "react";

const decades = [
  { name: "1900s", years: "1900–1909", tagline: "The Dawn of a New Century", color: "#8B4513", bg: "#F5DEB3", emoji: "🎩", description: "The industrial age roars forward. Automobiles, airplanes, and the birth of modern music." },
  { name: "1910s", years: "1910–1919", tagline: "The War to End All Wars", color: "#556B2F", bg: "#D2B48C", emoji: "⚔️", description: "World War I reshapes the globe. Women demand the vote. Jazz is born in New Orleans." },
  { name: "1920s", years: "1920–1929", tagline: "The Roaring Twenties", color: "#B8860B", bg: "#FFF8DC", emoji: "🥂", description: "Flappers, speakeasies, jazz clubs and Art Deco. Prosperity dances before the crash." },
  { name: "1930s", years: "1930–1939", tagline: "The Great Depression Era", color: "#708090", bg: "#E8E8E8", emoji: "🎬", description: "Hard times breed great art. Hollywood's golden age, swing music, and New Deal dreams." },
  { name: "1940s", years: "1940–1949", tagline: "The World at War", color: "#4A5240", bg: "#C8C8A9", emoji: "✌️", description: "WWII defines a generation. Victory, sacrifice, and the dawn of the atomic age." },
  { name: "1950s", years: "1950–1959", tagline: "The Age of Innocence", color: "#FF69B4", bg: "#FFF0F5", emoji: "🎸", description: "Rock 'n' roll explodes. Drive-ins, diners, and the suburbs. Elvis changes everything." },
  { name: "1960s", years: "1960–1969", tagline: "The Decade of Revolution", color: "#FF6347", bg: "#FFF5EE", emoji: "☮️", description: "Civil rights, moon landings, the Beatles, Woodstock. A decade that shook the world." },
  { name: "1970s", years: "1970–1979", tagline: "The Funky Decade", color: "#8B6914", bg: "#FFFACD", emoji: "🕺", description: "Disco balls, bell-bottoms, Star Wars, Watergate. Gritty, groovy, and unforgettable." },
  { name: "1980s", years: "1980–1989", tagline: "The Neon Generation", color: "#FF1493", bg: "#FFF0FF", emoji: "📺", description: "MTV launches, arcades rule, shoulder pads are everywhere. The decade that defined pop culture." },
  { name: "1990s", years: "1990–1999", tagline: "The Digital Dawn", color: "#9400D3", bg: "#F8F0FF", emoji: "💾", description: "The internet arrives, grunge rocks Seattle, and the world gets wired. Slap bracelets optional." },
  { name: "2000s", years: "2000–2009", tagline: "The Connected World", color: "#1E90FF", bg: "#F0F8FF", emoji: "📱", description: "Social media, iPods, reality TV. Post-9/11 world navigates a new millennium's promises." },
  { name: "2010s", years: "2010–2019", tagline: "The Social Age", color: "#00CED1", bg: "#F0FFFE", emoji: "🤳", description: "Smartphones everywhere, streaming kills cable, and memes become the language of a generation." },
  { name: "2020s", years: "2020–Today", tagline: "The New Frontier", color: "#32CD32", bg: "#F0FFF0", emoji: "🚀", description: "A pandemic changes everything. AI awakens. The world reinvents itself in real time." },
];

const features = [
  { icon: "🎵", title: "Music Through Time", desc: "Stream hits from every era — from Ragtime to Hip-Hop. Curated playlists for every decade." },
  { icon: "🎬", title: "Retro TV & Radio", desc: "Watch classic shows and listen to broadcasts from the past. A time machine in your browser." },
  { icon: "👥", title: "Find Your Decade Twin", desc: "Connect with people who love the same era. Groups, pages, and live chat — all decade-themed." },
  { icon: "🗞️", title: "Live News Feeds", desc: "Personalized feeds filtered by your favorite decades. See what your community is sharing." },
  { icon: "🏆", title: "Trivia & Games", desc: "Challenge your decade knowledge. Leaderboards, daily questions, and era-based quizzes." },
  { icon: "🛍️", title: "Vintage Marketplace", desc: "Buy, sell, and discover authentic memorabilia, fashion, and collectibles from any era." },
  { icon: "📡", title: "Live Streaming", desc: "Host and join live streams centered around your favorite decade's music, shows, and culture." },
  { icon: "🌐", title: "AI Time Guide", desc: "Ask anything about any decade. Our AI explores history, answers questions, and recommends content." },
];

const testimonials = [
  { name: "Margaret T.", decade: "1950s lover", avatar: "👩‍🦳", quote: "I found people who actually remember sock hops and Buddy Holly! eDecades feels like home." },
  { name: "DeShawn K.", decade: "80s kid", avatar: "🧑‍🦱", quote: "The 80s section is unreal — the music, the arcade games, the fashion discussions. I'm obsessed." },
  { name: "Sofia R.", decade: "70s soul fan", avatar: "👩‍🦰", quote: "My grandmother and I connect here over 1940s content. It's brought our family closer." },
];

export default function Home() {
  const [activeDecade, setActiveDecade] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#0a0a0f", color: "#fff", overflowX: "hidden" }}>
      
      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrollY > 50 ? "rgba(10,10,15,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,215,0,0.2)" : "none",
        padding: "16px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: "linear-gradient(135deg, #FFD700, #B8860B)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 0 20px rgba(255,215,0,0.4)"
          }}>⏰</div>
          <span style={{ fontSize: 22, fontWeight: "bold", color: "#FFD700", letterSpacing: 1 }}>eDecades</span>
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a href="#decades" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
            onMouseOver={e => e.target.style.color = "#FFD700"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.8)"}>Explore Decades</a>
          <a href="#features" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
            onMouseOver={e => e.target.style.color = "#FFD700"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.8)"}>Features</a>
          <a href="#community" style={{ color: "rgba(255,255,255,0.8)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
            onMouseOver={e => e.target.style.color = "#FFD700"}
            onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.8)"}>Community</a>
          <a href="https://benevolent-decade-dive-now.base44.app" target="_blank" style={{
            background: "linear-gradient(135deg, #FFD700, #FF8C00)",
            color: "#000", padding: "10px 24px", borderRadius: 30,
            fontWeight: "bold", textDecoration: "none", fontSize: 14,
            boxShadow: "0 4px 15px rgba(255,215,0,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
            onMouseOver={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 6px 25px rgba(255,215,0,0.5)"; }}
            onMouseOut={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 4px 15px rgba(255,215,0,0.3)"; }}>
            Join Free →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 30%, #0d1a0d 60%, #1a0808 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "120px 24px 80px",
        position: "relative", overflow: "hidden"
      }}>
        {/* Animated background orbs */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,0,0.06) 0%, transparent 70%)", top: "10%", left: "10%", animation: "pulse 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(138,43,226,0.08) 0%, transparent 70%)", bottom: "20%", right: "15%" }} />
        
        <div style={{
          display: "inline-block", background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 24, fontSize: 13,
          color: "#FFD700", letterSpacing: 2, textTransform: "uppercase"
        }}>
          🕰️ Travel Through Time — Join eDecades
        </div>
        
        <h1 style={{
          fontSize: "clamp(42px, 8vw, 90px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24,
          background: "linear-gradient(135deg, #FFFFFF 0%, #FFD700 40%, #FF8C00 70%, #FF4500 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
        }}>
          Every Decade.<br />Every Story.<br />All Connected.
        </h1>
        
        <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", color: "rgba(255,255,255,0.7)", maxWidth: 700, lineHeight: 1.7, marginBottom: 48 }}>
          The world's first decade-themed social network. Explore music, fashion, culture, and history from <strong style={{ color: "#FFD700" }}>1900 to today</strong> — and connect with people who love the same era as you.
        </p>
        
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}>
          <a href="https://benevolent-decade-dive-now.base44.app" target="_blank" style={{
            background: "linear-gradient(135deg, #FFD700, #FF8C00)",
            color: "#000", padding: "18px 48px", borderRadius: 40,
            fontWeight: "bold", textDecoration: "none", fontSize: 18,
            boxShadow: "0 8px 30px rgba(255,215,0,0.4)",
            transition: "all 0.3s ease", display: "inline-block"
          }}
            onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 12px 40px rgba(255,215,0,0.6)"; }}
            onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 8px 30px rgba(255,215,0,0.4)"; }}>
            🚀 Start Exploring Free
          </a>
          <a href="#decades" style={{
            background: "transparent", color: "#fff",
            padding: "18px 48px", borderRadius: 40, fontWeight: "bold",
            textDecoration: "none", fontSize: 18,
            border: "2px solid rgba(255,255,255,0.3)",
            transition: "all 0.3s ease", display: "inline-block"
          }}
            onMouseOver={e => { e.target.style.borderColor = "#FFD700"; e.target.style.color = "#FFD700"; }}
            onMouseOut={e => { e.target.style.borderColor = "rgba(255,255,255,0.3)"; e.target.style.color = "#fff"; }}>
            Browse Decades ↓
          </a>
        </div>
        
        {/* Stats */}
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
          {[["13+", "Decades Covered"], ["1900", "To Present Day"], ["∞", "Memories Shared"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#FFD700" }}>{num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", letterSpacing: 1 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DECADES GRID */}
      <section id="decades" style={{ padding: "100px 24px", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#FFD700", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Browse By Era</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, margin: 0 }}>Pick Your Decade</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, marginTop: 16 }}>Each era has its own world. Explore all of them.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {decades.map((d) => (
              <a
                key={d.name}
                href="https://benevolent-decade-dive-now.base44.app"
                target="_blank"
                style={{ textDecoration: "none" }}
                onMouseOver={e => { e.currentTarget.querySelector(".card").style.transform = "translateY(-8px) scale(1.02)"; e.currentTarget.querySelector(".card").style.boxShadow = `0 20px 50px ${d.color}55`; }}
                onMouseOut={e => { e.currentTarget.querySelector(".card").style.transform = "translateY(0) scale(1)"; e.currentTarget.querySelector(".card").style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)"; }}
              >
                <div className="card" style={{
                  background: `linear-gradient(135deg, ${d.color}22 0%, #1a1a2e 100%)`,
                  border: `1px solid ${d.color}44`,
                  borderRadius: 20, padding: "28px 24px",
                  cursor: "pointer", transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <div style={{ fontSize: 36 }}>{d.emoji}</div>
                    <div style={{
                      background: `${d.color}33`, border: `1px solid ${d.color}66`,
                      color: d.color, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: "bold"
                    }}>{d.years}</div>
                  </div>
                  <h3 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: "0 0 8px" }}>{d.name}</h3>
                  <div style={{ fontSize: 13, color: d.color, marginBottom: 12, fontStyle: "italic" }}>{d.tagline}</div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{d.description}</p>
                  <div style={{ marginTop: 20, color: d.color, fontSize: 13, fontWeight: "bold", display: "flex", alignItems: "center", gap: 6 }}>
                    Explore this era <span>→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #0a0a0f 0%, #0d0a1e 100%)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#FFD700", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Everything You Need</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, margin: 0 }}>One Platform.<br />Every Era.</h2>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {features.map((f) => (
              <div key={f.title} style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "32px 28px",
                transition: "all 0.3s ease"
              }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(255,215,0,0.05)"; e.currentTarget.style.borderColor = "rgba(255,215,0,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12, color: "#fff" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE - Visual Showcase */}
      <section style={{ padding: "100px 24px", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <div style={{ color: "#FFD700", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Built For Nostalgia Lovers</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, marginBottom: 24, lineHeight: 1.2 }}>Your personal time machine — with a social feed</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.8, fontSize: 16, marginBottom: 32 }}>
              Whether you lived through the era or just love it — eDecades is your home. Dive into curated content, connect with decade fans, and relive the moments that shaped our world.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Personalized feeds based on your favorite decades", "AI-powered recommendations and decade guides", "Ancestor profiles to connect your family history", "Live streaming, retro TV, and classic radio"].map(item => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: "linear-gradient(135deg, #FFD700, #FF8C00)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, marginTop: 2 }}>✓</div>
                  <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 15 }}>{item}</span>
                </div>
              ))}
            </div>
            <a href="https://benevolent-decade-dive-now.base44.app" target="_blank" style={{
              display: "inline-block", marginTop: 40,
              background: "linear-gradient(135deg, #FFD700, #FF8C00)",
              color: "#000", padding: "16px 40px", borderRadius: 40,
              fontWeight: "bold", textDecoration: "none", fontSize: 16,
              boxShadow: "0 8px 30px rgba(255,215,0,0.3)"
            }}>Start Your Journey Free →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { icon: "🎵", label: "Music", color: "#FF6347", count: "10k+ songs" },
              { icon: "📽️", label: "Movies", color: "#9400D3", count: "5k+ films" },
              { icon: "👗", label: "Fashion", color: "#FF69B4", count: "All eras" },
              { icon: "🌍", label: "History", color: "#4169E1", count: "100+ years" },
              { icon: "🎮", label: "Games", color: "#32CD32", count: "Trivia & more" },
              { icon: "📡", label: "Live", color: "#FF8C00", count: "Streams daily" },
            ].map(item => (
              <div key={item.label} style={{
                background: `${item.color}15`,
                border: `1px solid ${item.color}33`,
                borderRadius: 16, padding: "24px 20px", textAlign: "center"
              }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>{item.label}</div>
                <div style={{ fontSize: 12, color: item.color, marginTop: 4 }}>{item.count}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="community" style={{ padding: "100px 24px", background: "linear-gradient(180deg, #0a0a0f 0%, #0d1a0d 100%)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#FFD700", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Real People, Real Nostalgia</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900 }}>Loved by Decade Fans</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20, padding: "32px 28px"
              }}>
                <div style={{ fontSize: 24, marginBottom: 16 }}>⭐⭐⭐⭐⭐</div>
                <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 36 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#fff" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#FFD700" }}>{t.decade}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "120px 24px",
        background: "linear-gradient(135deg, #0d1a0d 0%, #1a0d00 50%, #0d001a 100%)",
        textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,215,0,0.05) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 60, marginBottom: 24 }}>⏰</div>
          <h2 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, marginBottom: 24, lineHeight: 1.1 }}>
            Your decade is<br />
            <span style={{ background: "linear-gradient(135deg, #FFD700, #FF8C00)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>waiting for you.</span>
          </h2>
          <p style={{ fontSize: 20, color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
            Join thousands of history lovers, nostalgia junkies, and culture explorers. Free to join. No credit card needed.
          </p>
          <a href="https://benevolent-decade-dive-now.base44.app" target="_blank" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #FFD700, #FF8C00)",
            color: "#000", padding: "22px 64px", borderRadius: 50,
            fontWeight: "bold", textDecoration: "none", fontSize: 20,
            boxShadow: "0 12px 50px rgba(255,215,0,0.5)",
            transition: "all 0.3s ease"
          }}
            onMouseOver={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 20px 60px rgba(255,215,0,0.7)"; }}
            onMouseOut={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 12px 50px rgba(255,215,0,0.5)"; }}>
            🚀 Join eDecades Free
          </a>
          <div style={{ marginTop: 24, color: "rgba(255,255,255,0.4)", fontSize: 14 }}>No spam. No credit card. Just pure nostalgia.</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050508", padding: "60px 40px 40px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            <div style={{ maxWidth: 300 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>⏰</span>
                <span style={{ fontSize: 20, fontWeight: "bold", color: "#FFD700" }}>eDecades</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.7 }}>
                Discover, connect, and celebrate every era from 1900 to today. The world's only decade-themed social network.
              </p>
            </div>
            <div>
              <div style={{ color: "#FFD700", fontWeight: "bold", marginBottom: 16, fontSize: 13, letterSpacing: 1 }}>EXPLORE</div>
              {["1920s Jazz Age", "1950s Rock & Roll", "1960s Revolution", "1980s Pop Culture", "1990s Digital Dawn"].map(item => (
                <div key={item} style={{ marginBottom: 10 }}>
                  <a href="https://benevolent-decade-dive-now.base44.app" target="_blank" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "#FFD700"}
                    onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{item}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ color: "#FFD700", fontWeight: "bold", marginBottom: 16, fontSize: 13, letterSpacing: 1 }}>FEATURES</div>
              {["Retro TV & Radio", "Decade Trivia", "Vintage Marketplace", "Live Streaming", "AI Time Guide"].map(item => (
                <div key={item} style={{ marginBottom: 10 }}>
                  <a href="https://benevolent-decade-dive-now.base44.app" target="_blank" style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, textDecoration: "none" }}
                    onMouseOver={e => e.target.style.color = "#FFD700"}
                    onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.5)"}>{item}</a>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>© 2025 eDecades. All rights reserved.</div>
            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Made with ❤️ for nostalgia lovers everywhere</div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          nav > div:last-child a:not(:last-child) { display: none; }
        }
      `}</style>
    </div>
  );
}
