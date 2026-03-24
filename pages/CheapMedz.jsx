import { useState, useEffect } from "react";

const LOGO = "https://media.base44.com/images/public/69c207112c5856fdf7bb496b/a1db150cd_generated_image.png";

const problems = [
  { icon: "😤", stat: "4 in 5", desc: "Americans say prescription drug prices are unreasonable" },
  { icon: "💸", stat: "$1,200+", desc: "Average annual out-of-pocket spending on prescriptions per person" },
  { icon: "😞", stat: "29%", desc: "of adults skip doses or don't fill prescriptions due to cost" },
  { icon: "🏪", stat: "10x", desc: "Price difference for the same drug between pharmacies in the same zip code" },
];

const features = [
  {
    icon: "🔍",
    title: "Instant Price Comparison",
    desc: "Search any medication and instantly see prices at pharmacies near you — CVS, Walgreens, Walmart, Costco, and hundreds more.",
    color: "#EF4444",
  },
  {
    icon: "📍",
    title: "Pharmacy Locator",
    desc: "Find the cheapest pharmacy within your zip code. Filter by distance, hours, drive-through availability, and more.",
    color: "#F59E0B",
  },
  {
    icon: "💊",
    title: "Generic Alternatives",
    desc: "Automatically surfaces FDA-approved generic equivalents that can cut your prescription costs by up to 80%.",
    color: "#22C55E",
  },
  {
    icon: "🔔",
    title: "Price Drop Alerts",
    desc: "Set alerts on your medications and get notified the moment prices drop at pharmacies near you. Never overpay again.",
    color: "#3B82F6",
  },
  {
    icon: "🏷️",
    title: "Instant Discount Cards",
    desc: "Generate free discount cards and coupons accepted at over 68,000 pharmacies nationwide. No insurance required.",
    color: "#8B5CF6",
  },
  {
    icon: "🔒",
    title: "Private & Secure",
    desc: "No account required to search. We never sell your data or share your prescription history with anyone.",
    color: "#06B6D4",
  },
];

const howItWorks = [
  { step: "1", icon: "🔎", title: "Search Your Medication", desc: "Type any prescription drug name — brand or generic. We search thousands of pharmacies in real time." },
  { step: "2", icon: "📊", title: "Compare Prices", desc: "See a ranked list of pharmacies near you with current prices, coupons, and savings opportunities side by side." },
  { step: "3", icon: "💰", title: "Save Instantly", desc: "Pick the best price, grab your discount card or coupon, and go. It's completely free — no hidden fees." },
];

const conditions = [
  { name: "Blood Pressure", icon: "❤️", savings: "Save up to 87%" },
  { name: "Diabetes", icon: "💉", savings: "Save up to 79%" },
  { name: "Cholesterol", icon: "🩸", savings: "Save up to 91%" },
  { name: "Mental Health", icon: "🧠", savings: "Save up to 83%" },
  { name: "Thyroid", icon: "🦋", savings: "Save up to 76%" },
  { name: "Antibiotics", icon: "🦠", savings: "Save up to 95%" },
  { name: "Pain Relief", icon: "🩹", savings: "Save up to 72%" },
  { name: "Asthma", icon: "🫁", savings: "Save up to 68%" },
];

const plans = [
  {
    name: "Free Search",
    price: "Free",
    period: "forever",
    color: "#22C55E",
    highlight: false,
    features: [
      "Unlimited medication searches",
      "Price comparison at local pharmacies",
      "Generic alternatives",
      "Free discount cards",
      "Pharmacy locator",
    ],
    cta: "Start Searching Free",
    badge: null,
  },
  {
    name: "Premium",
    price: "$4.99",
    period: "/month",
    color: "#EF4444",
    highlight: true,
    features: [
      "Everything in Free",
      "Price drop alerts & notifications",
      "Medication refill reminders",
      "Full prescription history tracker",
      "Family plan (up to 6 members)",
      "Priority customer support",
      "Ad-free experience",
    ],
    cta: "Coming Soon — Join Waitlist",
    badge: "🔜 Launching Soon",
  },
];

const stats = [
  ["$500+", "Avg Annual Savings"],
  ["68K+", "Partner Pharmacies"],
  ["10K+", "Medications Covered"],
  ["Free", "Always Free to Search"],
];

export default function CheapMedz() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "CheapMedz — Find the Lowest Prescription Prices";
    const link = document.querySelector("link[rel~='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = LOGO;
    document.head.appendChild(link);
  }, []);

  const handleWaitlist = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#060b14", color: "#fff", overflowX: "hidden" }}>

      {/* CONCEPT BANNER */}
      <div style={{
        background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.08))",
        border: "1px solid rgba(239,68,68,0.3)",
        padding: "10px 24px", textAlign: "center",
        fontSize: 13, color: "#fca5a5", fontWeight: 600, letterSpacing: 0.3
      }}>
        🔬 CheapMedz is currently in concept development · Domain registered at CheapMedz.com · <span style={{ color: "#EF4444" }}>Join the waitlist to be first</span>
      </div>

      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(6,11,20,0.97)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(239,68,68,0.15)",
        padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={LOGO} alt="CheapMedz" style={{ width: 38, height: 38, borderRadius: 10, objectFit: "cover", boxShadow: "0 0 12px rgba(239,68,68,0.4)" }} />
          <span style={{ fontSize: 20, fontWeight: 800 }}>Cheap<span style={{ color: "#EF4444" }}>Medz</span></span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["How It Works", "#how"], ["Features", "#features"], ["Pricing", "#pricing"]].map(([label, href]) => (
            <a key={label} href={href} style={{ color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 14 }}
              onMouseOver={e => e.target.style.color = "#EF4444"}
              onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{label}</a>
          ))}
          <a href="#waitlist" style={{
            background: "linear-gradient(135deg, #EF4444, #DC2626)",
            color: "#fff", padding: "9px 22px", borderRadius: 25,
            fontWeight: 700, textDecoration: "none", fontSize: 14,
            boxShadow: "0 4px 15px rgba(239,68,68,0.4)"
          }}>Join Waitlist →</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "92vh",
        background: "linear-gradient(135deg, #060b14 0%, #0f0a0a 50%, #060b14 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "100px 24px 80px", position: "relative", overflow: "hidden"
      }}>
        {/* Glow effects */}
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)", top: "-5%", left: "-10%" }} />
        <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)", bottom: "0%", right: "-5%" }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 30, padding: "8px 20px", marginBottom: 28, fontSize: 13, color: "#fca5a5"
        }}>
          💊 Coming Soon · CheapMedz.com · Join 0 people on the waitlist
        </div>

        <h1 style={{ fontSize: "clamp(36px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.08, marginBottom: 24, letterSpacing: -1.5 }}>
          Stop Overpaying for<br />
          <span style={{
            background: "linear-gradient(135deg, #ff8080 0%, #EF4444 50%, #DC2626 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>Your Prescriptions</span>
        </h1>

        <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "rgba(255,255,255,0.6)", maxWidth: 620, lineHeight: 1.85, marginBottom: 48 }}>
          CheapMedz compares prescription prices at thousands of pharmacies near you — instantly. Find the same medication for <strong style={{ color: "#fca5a5" }}>up to 95% less</strong>, no insurance needed.
        </p>

        {/* Mock Search Bar */}
        <div style={{
          display: "flex", gap: 0, maxWidth: 560, width: "100%",
          background: "rgba(255,255,255,0.05)", border: "2px solid rgba(239,68,68,0.4)",
          borderRadius: 50, overflow: "hidden", marginBottom: 48,
          boxShadow: "0 0 30px rgba(239,68,68,0.15)"
        }}>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search a medication (e.g. Metformin, Lipitor...)"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              color: "#fff", fontSize: 15, padding: "16px 24px"
            }}
          />
          <button style={{
            background: "linear-gradient(135deg, #EF4444, #DC2626)",
            color: "#fff", border: "none", padding: "16px 32px",
            fontWeight: 700, fontSize: 15, cursor: "pointer", whiteSpace: "nowrap"
          }}>
            🔍 Compare Prices
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
          {stats.map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#EF4444" }}>{num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1, marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section style={{ padding: "90px 24px", background: "#070c16" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#EF4444", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>The Problem</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900 }}>Americans Are Getting Crushed by Drug Prices</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, marginTop: 12, maxWidth: 560, margin: "12px auto 0" }}>The data is clear — and it's unacceptable.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {problems.map((p, i) => (
              <div key={i} style={{
                background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: 20, padding: "32px 24px", textAlign: "center"
              }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontSize: 38, fontWeight: 900, color: "#EF4444", marginBottom: 10 }}>{p.stat}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: "90px 24px", background: "#060b14" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#EF4444", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Simple Process</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900 }}>Find Savings in 3 Steps</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
            {howItWorks.map((step, i) => (
              <div key={i} style={{
                background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)",
                borderRadius: 20, padding: "36px 28px", textAlign: "center", position: "relative"
              }}>
                <div style={{
                  position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg, #EF4444, #DC2626)",
                  width: 32, height: 32, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 900
                }}>{step.step}</div>
                <div style={{ fontSize: 44, marginBottom: 16, marginTop: 8 }}>{step.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>{step.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.75 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "90px 24px", background: "#070c16" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#EF4444", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Features</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900 }}>Everything You Need to Save</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
            {features.map((f, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid ${f.color}22`,
                borderRadius: 18, padding: "28px",
                transition: "border 0.2s"
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = f.color + "55"}
                onMouseOut={e => e.currentTarget.style.borderColor = f.color + "22"}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12, marginBottom: 16,
                  background: `${f.color}18`, border: `1px solid ${f.color}33`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDITIONS */}
      <section style={{ padding: "80px 24px", background: "#060b14" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div style={{ color: "#EF4444", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Savings By Category</div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 900 }}>Savings for Every Condition</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 14 }}>
            {conditions.map((c, i) => (
              <div key={i} style={{
                background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.12)",
                borderRadius: 16, padding: "22px 18px", textAlign: "center",
                cursor: "pointer", transition: "all 0.2s"
              }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.35)"; }}
                onMouseOut={e => { e.currentTarget.style.background = "rgba(239,68,68,0.05)"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.12)"; }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{c.name}</div>
                <div style={{ fontSize: 12, color: "#4ade80", fontWeight: 700 }}>{c.savings}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "90px 24px", background: "#070c16" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: "#EF4444", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Pricing</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900 }}>Free for Everyone. Always.</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 17, marginTop: 12 }}>Searching and saving is always free. Premium features coming soon.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, alignItems: "start" }}>
            {plans.map((plan) => (
              <div key={plan.name} style={{
                background: plan.highlight ? "rgba(239,68,68,0.08)" : "rgba(255,255,255,0.03)",
                border: `2px solid ${plan.highlight ? "#EF4444" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 24, padding: "36px 28px", position: "relative",
                boxShadow: plan.highlight ? "0 0 40px rgba(239,68,68,0.15)" : "none"
              }}>
                {plan.badge && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: "linear-gradient(135deg, #EF4444, #DC2626)",
                    padding: "5px 20px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap"
                  }}>{plan.badge}</div>
                )}
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{plan.name}</h3>
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontSize: 42, fontWeight: 900, color: plan.color }}>{plan.price}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}> {plan.period}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.75)" }}>
                      <span style={{ color: plan.color, fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button style={{
                  width: "100%", padding: "15px", borderRadius: 30,
                  background: plan.highlight ? "linear-gradient(135deg, #EF4444, #DC2626)" : "transparent",
                  border: plan.highlight ? "none" : `2px solid ${plan.color}`,
                  color: plan.highlight ? "#fff" : plan.color,
                  fontWeight: 700, fontSize: 15, cursor: "pointer",
                  boxShadow: plan.highlight ? "0 6px 20px rgba(239,68,68,0.35)" : "none"
                }}>{plan.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" style={{ padding: "90px 24px", background: "#060b14" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: 28, padding: "60px 48px",
            boxShadow: "0 0 60px rgba(239,68,68,0.07)"
          }}>
            <img src={LOGO} alt="CheapMedz" style={{ width: 72, height: 72, borderRadius: 18, objectFit: "cover", marginBottom: 24 }} />
            <h2 style={{ fontSize: "clamp(24px, 4vw, 42px)", fontWeight: 900, marginBottom: 14 }}>
              Be First to <span style={{ background: "linear-gradient(135deg, #ff8080, #EF4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Save</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, marginBottom: 36 }}>
              CheapMedz is launching soon. Join the waitlist and get early access, plus a free lifetime discount card when we go live.
            </p>
            {!submitted ? (
              <form onSubmit={handleWaitlist} style={{ display: "flex", gap: 0, overflow: "hidden", borderRadius: 40, border: "2px solid rgba(239,68,68,0.4)" }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    flex: 1, background: "rgba(255,255,255,0.04)", border: "none", outline: "none",
                    color: "#fff", fontSize: 15, padding: "15px 22px"
                  }}
                />
                <button type="submit" style={{
                  background: "linear-gradient(135deg, #EF4444, #DC2626)",
                  color: "#fff", border: "none", padding: "15px 28px",
                  fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap"
                }}>Join Waitlist →</button>
              </form>
            ) : (
              <div style={{
                background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)",
                borderRadius: 16, padding: "20px", color: "#4ade80", fontWeight: 700, fontSize: 16
              }}>
                🎉 You're on the list! We'll notify you the moment CheapMedz launches.
              </div>
            )}
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 16 }}>No spam. Unsubscribe anytime. We respect your privacy.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#040810", padding: "48px 24px", textAlign: "center", borderTop: "1px solid rgba(239,68,68,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <img src={LOGO} alt="CheapMedz" style={{ width: 30, height: 30, borderRadius: 8, objectFit: "cover" }} />
          <span style={{ fontSize: 16, fontWeight: 800 }}>Cheap<span style={{ color: "#EF4444" }}>Medz</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 13, marginBottom: 6 }}>
          A <a href="/KingXcel" style={{ color: "#EF4444", textDecoration: "none" }}>King Xcel Innovations</a> product · CheapMedz.com
        </p>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>© 2025 CheapMedz. All rights reserved. · Currently in concept development.</p>
      </footer>

    </div>
  );
}
