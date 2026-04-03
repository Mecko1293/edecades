import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Your ideal Friday night is...",
    options: [
      { text: "A jazz club or speakeasy vibe", decades: ["1920s", "1930s"] },
      { text: "Drive-in movie with a milkshake", decades: ["1950s"] },
      { text: "A rock concert or outdoor festival", decades: ["1960s", "1970s"] },
      { text: "Dancing at a neon-lit club", decades: ["1980s"] },
      { text: "Chilling at home with a great movie", decades: ["1990s", "2000s"] },
      { text: "Scrolling, vibing, doing whatever", decades: ["2010s", "2020s"] },
    ],
  },
  {
    id: 2,
    question: "Pick your dream outfit...",
    options: [
      { text: "Flapper dress, pearls, feather headband", decades: ["1920s"] },
      { text: "High-waisted jeans, saddle shoes, poodle skirt", decades: ["1950s"] },
      { text: "Bell-bottoms, tie-dye, peace signs", decades: ["1960s", "1970s"] },
      { text: "Shoulder pads, neon, big hair", decades: ["1980s"] },
      { text: "Flannel, Docs, oversized everything", decades: ["1990s"] },
      { text: "Streetwear, sneakers, whatever feels good", decades: ["2000s", "2010s", "2020s"] },
    ],
  },
  {
    id: 3,
    question: "What music speaks to your soul?",
    options: [
      { text: "Jazz, Big Band, Blues", decades: ["1920s", "1930s", "1940s"] },
      { text: "Rock 'n' Roll, Doo-Wop", decades: ["1950s"] },
      { text: "Classic Rock, Soul, Psychedelic", decades: ["1960s"] },
      { text: "Funk, Disco, Soft Rock", decades: ["1970s"] },
      { text: "Pop, New Wave, Hair Metal", decades: ["1980s"] },
      { text: "Hip-Hop, Grunge, R&B, Alternative", decades: ["1990s"] },
    ],
  },
  {
    id: 4,
    question: "You find $20 in your pocket. You...",
    options: [
      { text: "Head to a soda fountain", decades: ["1950s", "1940s"] },
      { text: "Buy a vinyl record", decades: ["1960s", "1970s"] },
      { text: "Head to the arcade", decades: ["1980s"] },
      { text: "Rent a video and get pizza", decades: ["1990s"] },
      { text: "Buy a song on iTunes", decades: ["2000s"] },
      { text: "Add it to my DoorDash balance", decades: ["2010s", "2020s"] },
    ],
  },
  {
    id: 5,
    question: "Your dream vacation is...",
    options: [
      { text: "A glamorous ocean liner cruise", decades: ["1920s", "1930s"] },
      { text: "A classic American road trip", decades: ["1950s", "1960s"] },
      { text: "Woodstock or a music festival abroad", decades: ["1970s"] },
      { text: "Miami or Vegas — neon all the way", decades: ["1980s"] },
      { text: "Backpacking Europe on a budget", decades: ["1990s"] },
      { text: "Bali, content creation, good vibes", decades: ["2010s", "2020s"] },
    ],
  },
  {
    id: 6,
    question: "The world needs more...",
    options: [
      { text: "Elegance and sophistication", decades: ["1920s", "1930s", "1940s"] },
      { text: "Innocence and simpler times", decades: ["1950s"] },
      { text: "Revolution and social change", decades: ["1960s"] },
      { text: "Groove, soul, and self-expression", decades: ["1970s"] },
      { text: "Energy, ambition, and big dreams", decades: ["1980s"] },
      { text: "Authenticity and raw creativity", decades: ["1990s", "2000s"] },
    ],
  },
];

const decadeResults = {
  "1920s": {
    name: "The Roaring Twenties",
    emoji: "🥂",
    color: "#B8860B",
    bg: "linear-gradient(135deg, #1a1200 0%, #2d1f00 100%)",
    glow: "rgba(184,134,11,0.4)",
    description: "You're pure glamour and rebellion. You'd have been the life of every speakeasy, dancing the Charleston and living like every night was your last. You believe in elegance, excess, and the art of a good time.",
    vibe: "Jazz Age Royalty",
    icons: ["🎷", "💎", "🥂", "🎩"],
    celeb: "Think F. Scott Fitzgerald meets Zelda — magnetic, ahead of your time.",
  },
  "1930s": {
    name: "The Depression Era",
    emoji: "🎬",
    color: "#708090",
    bg: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 100%)",
    glow: "rgba(112,128,144,0.4)",
    description: "You have depth, resilience, and soul. Hard times don't break you — they shape you into something extraordinary. You find beauty in struggle and magic in simplicity.",
    vibe: "Silver Screen Soul",
    icons: ["🎬", "🎭", "🎼", "🌹"],
    celeb: "Think Humphrey Bogart or Katharine Hepburn — timeless and unbreakable.",
  },
  "1940s": {
    name: "The Wartime Era",
    emoji: "✌️",
    color: "#4A5240",
    bg: "linear-gradient(135deg, #0a0d07 0%, #1a1f14 100%)",
    glow: "rgba(74,82,64,0.4)",
    description: "You're built of courage, loyalty, and heart. You'd have danced to big band music before shipping out, written letters that made people cry, and come home ready to build something beautiful.",
    vibe: "Greatest Generation Spirit",
    icons: ["✌️", "🎺", "💌", "🌟"],
    celeb: "Think Frank Sinatra or Rosie the Riveter — grit wrapped in grace.",
  },
  "1950s": {
    name: "The Fabulous Fifties",
    emoji: "🎸",
    color: "#FF69B4",
    bg: "linear-gradient(135deg, #1a0011 0%, #2d001e 100%)",
    glow: "rgba(255,105,180,0.4)",
    description: "You're charm, style, and a little bit of mischief. Drive-ins, diners, sock hops — you'd have thrived in a world where everything was shiny and new and rock 'n' roll was actually dangerous.",
    vibe: "All-American Cool",
    icons: ["🎸", "🍔", "🚗", "📻"],
    celeb: "Think Elvis Presley or Audrey Hepburn — effortlessly iconic.",
  },
  "1960s": {
    name: "The Revolutionary Sixties",
    emoji: "☮️",
    color: "#FF6347",
    bg: "linear-gradient(135deg, #1a0500 0%, #2d0e00 100%)",
    glow: "rgba(255,99,71,0.4)",
    description: "You're a dreamer and a fighter. You believe the world can and should be better, and you're willing to march, protest, and create art to prove it. Woodstock would've been your spiritual home.",
    vibe: "Flower Power Revolutionary",
    icons: ["☮️", "🌸", "🎵", "✊"],
    celeb: "Think Jimi Hendrix or Janis Joplin — raw, electric, and free.",
  },
  "1970s": {
    name: "The Groovy Seventies",
    emoji: "🕺",
    color: "#DAA520",
    bg: "linear-gradient(135deg, #1a1200 0%, #2d1f00 100%)",
    glow: "rgba(218,165,32,0.4)",
    description: "You've got soul and swagger in equal measure. Whether you're on the disco floor or in a smoky jazz bar, you move through the world with undeniable style and a killer soundtrack.",
    vibe: "Funky Soul Royalty",
    icons: ["🕺", "🪩", "🎤", "✨"],
    celeb: "Think David Bowie or Diana Ross — magnetic and impossible to ignore.",
  },
  "1980s": {
    name: "The Neon Eighties",
    emoji: "📺",
    color: "#FF1493",
    bg: "linear-gradient(135deg, #1a0010 0%, #0d001a 100%)",
    glow: "rgba(255,20,147,0.4)",
    description: "You're ambition, energy, and pure pop culture. You live big, dream bigger, and your personal soundtrack is an absolute banger. MTV was made for you and you were made for MTV.",
    vibe: "Neon Dream Machine",
    icons: ["📺", "🎮", "💾", "🎧"],
    celeb: "Think Madonna or Michael Jackson — you were born to perform.",
  },
  "1990s": {
    name: "The Grunge Nineties",
    emoji: "💾",
    color: "#9400D3",
    bg: "linear-gradient(135deg, #0d0014 0%, #1a001a 100%)",
    glow: "rgba(148,0,211,0.4)",
    description: "You're real, complex, and effortlessly cool without even trying. You don't follow trends — you ARE the trend, three years before anyone else notices. Authenticity is your religion.",
    vibe: "Alternative Icon",
    icons: ["💾", "📼", "🎸", "🧢"],
    celeb: "Think Kurt Cobain or Lauryn Hill — authentic to the core.",
  },
  "2000s": {
    name: "The Y2K Era",
    emoji: "📱",
    color: "#1E90FF",
    bg: "linear-gradient(135deg, #000d1a 0%, #001a2d 100%)",
    glow: "rgba(30,144,255,0.4)",
    description: "You were there when everything changed. The internet, reality TV, the iPod — you watched the modern world boot up in real time and you loved every chaotic minute of it.",
    vibe: "Digital Pioneer",
    icons: ["📱", "💿", "🌐", "⭐"],
    celeb: "Think Beyoncé or Eminem — you defined the era before it knew it was iconic.",
  },
  "2010s": {
    name: "The Social Age",
    emoji: "🤳",
    color: "#00CED1",
    bg: "linear-gradient(135deg, #001a1a 0%, #001a14 100%)",
    glow: "rgba(0,206,209,0.4)",
    description: "You're the most connected, self-aware generation in history. You built communities online before it was cool, changed movements with a hashtag, and made creativity a lifestyle.",
    vibe: "Cultural Curator",
    icons: ["🤳", "🎨", "📲", "🌍"],
    celeb: "Think Childish Gambino or Rihanna — reinventing yourself constantly.",
  },
  "2020s": {
    name: "The New Frontier",
    emoji: "🚀",
    color: "#32CD32",
    bg: "linear-gradient(135deg, #001a00 0%, #001414 100%)",
    glow: "rgba(50,205,50,0.4)",
    description: "You're living in the most interesting time in human history and you know it. You adapt fast, question everything, and build the future while everyone else is still figuring out what happened.",
    vibe: "Future Architect",
    icons: ["🚀", "🤖", "🌱", "⚡"],
    celeb: "Think Billie Eilish or Elon Musk — rewriting the rules entirely.",
  },
};

function calculateResult(answers) {
  const scores = {};
  answers.forEach((answer) => {
    if (answer) {
      answer.decades.forEach((decade) => {
        scores[decade] = (scores[decade] || 0) + 1;
      });
    }
  });
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || "1980s";
}

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const progress = ((currentQ) / questions.length) * 100;

  function handleSelect(option) {
    setSelected(option);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      if (currentQ + 1 >= questions.length) {
        const resultDecade = calculateResult(newAnswers);
        setResult(decadeResults[resultDecade]);
      } else {
        setAnswers(newAnswers);
        setCurrentQ(currentQ + 1);
        setSelected(null);
      }
    }, 300);
  }

  function handleRestart() {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setShowShare(false);
  }

  const shareText = result
    ? `🕰️ I just took the eDecades Soul Decade Quiz and I'm a ${result.name} soul! My vibe: "${result.vibe}" ${result.icons.join("")}\n\nWhat's YOUR decade? Take the quiz 👇\nhttps://antonio-major-help-app.base44.app/Quiz`
    : "";

  return (
    <div style={{
      minHeight: "100vh",
      background: result ? result.bg : "linear-gradient(135deg, #1e2530 0%, #2a1f18 50%, #1e2530 100%)",
      fontFamily: "'Georgia', serif",
      color: "#fff",
      transition: "background 0.8s ease",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background glow */}
      {result && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 0,
          background: `radial-gradient(ellipse at center, ${result.glow} 0%, transparent 60%)`,
          pointerEvents: "none"
        }} />
      )}

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(30,37,48,0.95)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(212,149,110,0.15)",
        padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <a href="/Home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 22 }}>⏰</span>
          <span style={{ fontSize: 18, fontWeight: "bold", color: "#d4956e" }}>eDecades</span>
        </a>
        <a href="https://benevolent-decade-dive-now.base44.app" target="_blank" style={{
          background: "linear-gradient(135deg, #d4956e, #c4784f)",
          color: "#fff", padding: "8px 20px", borderRadius: 30,
          fontWeight: "bold", textDecoration: "none", fontSize: 13
        }}>Join Free →</a>
      </nav>

      <div style={{ position: "relative", zIndex: 1, paddingTop: 80 }}>

        {/* RESULT SCREEN */}
        {result ? (
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "60px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Your Soul Decade Is...</div>
            
            <div style={{ fontSize: 80, marginBottom: 16, animation: "bounce 1s ease" }}>{result.emoji}</div>
            
            <h1 style={{
              fontSize: "clamp(36px, 7vw, 68px)", fontWeight: 900, marginBottom: 8,
              background: `linear-gradient(135deg, #fff 0%, ${result.color} 100%)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
            }}>{result.name}</h1>

            <div style={{
              display: "inline-block", background: `${result.color}22`,
              border: `1px solid ${result.color}66`, borderRadius: 30,
              padding: "8px 24px", color: result.color, fontSize: 15,
              fontWeight: "bold", marginBottom: 32, letterSpacing: 1
            }}>✨ {result.vibe}</div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, fontSize: 36 }}>
              {result.icons.map((icon, i) => <span key={i}>{icon}</span>)}
            </div>

            <p style={{
              fontSize: 18, color: "rgba(255,255,255,0.85)", lineHeight: 1.8,
              marginBottom: 24, background: "rgba(30,37,48,0.5)",
              borderRadius: 20, padding: "24px 32px",
              border: `1px solid ${result.color}22`
            }}>
              {result.description}
            </p>

            <p style={{ fontSize: 15, color: result.color, fontStyle: "italic", marginBottom: 48 }}>
              {result.celeb}
            </p>

            {/* Share box */}
            <div style={{
              background: "rgba(30,37,48,0.6)", border: `1px solid ${result.color}44`,
              borderRadius: 20, padding: "28px", marginBottom: 32
            }}>
              <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 16 }}>📤 Share Your Result</div>
              <textarea
                readOnly
                value={shareText}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
                  color: "rgba(255,255,255,0.8)", padding: "16px",
                  fontSize: 13, lineHeight: 1.6, resize: "none", marginBottom: 16,
                  height: 120, fontFamily: "monospace"
                }}
              />
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => { navigator.clipboard.writeText(shareText); setShowShare(true); }} style={{
                  background: `linear-gradient(135deg, ${result.color}, ${result.color}99)`,
                  color: "#fff", border: "none", padding: "12px 28px",
                  borderRadius: 30, fontWeight: "bold", cursor: "pointer", fontSize: 14
                }}>
                  {showShare ? "✓ Copied!" : "📋 Copy to Share"}
                </button>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" style={{
                  background: "#1DA1F2", color: "#fff", border: "none",
                  padding: "12px 28px", borderRadius: 30, fontWeight: "bold",
                  cursor: "pointer", fontSize: 14, textDecoration: "none", display: "inline-block"
                }}>🐦 Post on X/Twitter</a>
              </div>
            </div>

            {/* CTA */}
            <div style={{
              background: `${result.color}11`, border: `1px solid ${result.color}33`,
              borderRadius: 20, padding: "32px", marginBottom: 32
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>
                Find your {result.name} community 👇
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 24, fontSize: 15 }}>
                Thousands of {result.name} fans are already on eDecades — music, fashion, history, live streams, trivia, and more. All for free.
              </p>
              <a href="https://benevolent-decade-dive-now.base44.app" target="_blank" style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #d4956e, #c4784f)",
                color: "#fff", padding: "16px 48px", borderRadius: 40,
                fontWeight: "bold", textDecoration: "none", fontSize: 17,
                boxShadow: "0 8px 30px rgba(212,149,110,0.4)"
              }}>🚀 Explore the {result.name} on eDecades</a>
            </div>

            <button onClick={handleRestart} style={{
              background: "transparent", color: "rgba(255,255,255,0.5)",
              border: "1px solid rgba(255,255,255,0.2)", padding: "12px 32px",
              borderRadius: 30, cursor: "pointer", fontSize: 14, transition: "all 0.2s"
            }}
              onMouseOver={e => { e.target.style.color = "#fff"; e.target.style.borderColor = "#fff"; }}
              onMouseOut={e => { e.target.style.color = "rgba(255,255,255,0.5)"; e.target.style.borderColor = "rgba(255,255,255,0.2)"; }}>
              🔄 Retake Quiz
            </button>
          </div>
        ) : (
          /* QUIZ SCREEN */
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px 80px" }}>
            
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🕰️</div>
              <h1 style={{
                fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, marginBottom: 8,
                background: "linear-gradient(135deg, #fff 0%, #d4956e 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>What's Your Soul Decade?</h1>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 16 }}>6 questions. No wrong answers. Just pure nostalgia.</p>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.1)", borderRadius: 10, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 10,
                  background: "linear-gradient(90deg, #d4956e, #c4784f)",
                  width: `${progress}%`, transition: "width 0.4s ease"
                }} />
              </div>
            </div>

            {/* Question */}
            <div style={{
              opacity: animating ? 0 : 1, transform: animating ? "translateX(20px)" : "translateX(0)",
              transition: "all 0.3s ease"
            }}>
              <h2 style={{
                fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: "bold",
                marginBottom: 32, lineHeight: 1.3, textAlign: "center"
              }}>
                {questions[currentQ].question}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {questions[currentQ].options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(option)}
                    style={{
                      background: selected === option
                        ? "linear-gradient(135deg, rgba(212,149,110,0.2), rgba(196,120,79,0.1))"
                        : "rgba(255,255,255,0.04)",
                      border: selected === option
                        ? "2px solid #d4956e"
                        : "2px solid rgba(255,255,255,0.1)",
                      borderRadius: 16, padding: "18px 24px",
                      color: "#fff", fontSize: 16, cursor: "pointer",
                      textAlign: "left", transition: "all 0.2s ease",
                      display: "flex", alignItems: "center", gap: 16
                    }}
                    onMouseOver={e => {
                      if (selected !== option) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.borderColor = "rgba(212,149,110,0.4)";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }
                    }}
                    onMouseOut={e => {
                      if (selected !== option) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        e.currentTarget.style.transform = "translateX(0)";
                      }
                    }}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: "50%",
                      border: selected === option ? "none" : "2px solid rgba(255,255,255,0.2)",
                      background: selected === option ? "linear-gradient(135deg, #d4956e, #c4784f)" : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, fontSize: 13, fontWeight: "bold", color: "#fff",
                      transition: "all 0.2s"
                    }}>
                      {selected === option ? "✓" : String.fromCharCode(65 + i)}
                    </div>
                    <span style={{ color: selected === option ? "#d4956e" : "rgba(255,255,255,0.85)" }}>
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
                <button
                  onClick={handleNext}
                  disabled={!selected}
                  style={{
                    background: selected
                      ? "linear-gradient(135deg, #d4956e, #c4784f)"
                      : "rgba(255,255,255,0.1)",
                    color: selected ? "#000" : "rgba(255,255,255,0.3)",
                    border: "none", padding: "16px 56px", borderRadius: 40,
                    fontWeight: "bold", fontSize: 17, cursor: selected ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease",
                    boxShadow: selected ? "0 8px 30px rgba(212,149,110,0.3)" : "none"
                  }}
                  onMouseOver={e => { if (selected) e.target.style.transform = "scale(1.05)"; }}
                  onMouseOut={e => { e.target.style.transform = "scale(1)"; }}
                >
                  {currentQ + 1 === questions.length ? "Reveal My Decade ✨" : "Next Question →"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }
        * { box-sizing: border-box; }
        button:focus { outline: none; }
      `}</style>
    </div>
  );
}
