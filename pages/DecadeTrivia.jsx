import { useState, useEffect } from "react";
import { TriviaQuestion, TriviaScore } from "@/api/entities";

const DECADES = ["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s"];
const DECADE_EMOJIS = {"1920s":"🎷","1930s":"🎬","1940s":"✈️","1950s":"🎸","1960s":"✌️","1970s":"🕺","1980s":"🕹️","1990s":"📼","2000s":"💿","2010s":"📱"};
const BADGES = [
  { id: "first_quiz", label: "🎯 First Quiz", desc: "Complete your first quiz", req: (s) => s.quizzes_completed >= 1 },
  { id: "century", label: "💯 Century", desc: "Earn 100 points", req: (s) => s.total_points >= 100 },
  { id: "sharp_mind", label: "🧠 Sharp Mind", desc: "Get 10 correct answers", req: (s) => s.correct_answers >= 10 },
  { id: "decade_master", label: "🏆 Decade Master", desc: "Earn 500 points", req: (s) => s.total_points >= 500 },
  { id: "perfect_score", label: "⭐ Perfect Score", desc: "Answer 5 in a row correctly", req: (s) => s.correct_answers >= 5 },
];

export default function DecadeTrivia() {
  const [screen, setScreen] = useState("home"); // home | quiz | result | leaderboard
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newBadges, setNewBadges] = useState([]);

  const loadLeaderboard = async () => {
    setLoading(true);
    try {
      const scores = await TriviaScore.list({ sort: "-total_points", limit: 20 });
      setLeaderboard(scores);
    } catch (e) {}
    setLoading(false);
  };

  const startQuiz = async (decade) => {
    setLoading(true);
    setSelectedDecade(decade);
    try {
      const all = await TriviaQuestion.filter({ decade });
      const shuffled = all.sort(() => Math.random() - 0.5).slice(0, 5);
      setQuestions(shuffled);
      setCurrentQ(0);
      setSelected(null);
      setRevealed(false);
      setScore(0);
      setCorrect(0);
      setAnswers([]);
      setScreen("quiz");
    } catch (e) {}
    setLoading(false);
  };

  const handleAnswer = (opt) => {
    if (revealed) return;
    setSelected(opt);
    setRevealed(true);
    const q = questions[currentQ];
    const isCorrect = opt === q.correct_answer;
    if (isCorrect) {
      setScore((s) => s + (q.points || 10));
      setCorrect((c) => c + 1);
    }
    setAnswers((prev) => [...prev, { question: q.question, selected: opt, correct: q.correct_answer, isCorrect, explanation: q.explanation }]);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setScreen("result");
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setRevealed(false);
    }
  };

  const saveScore = async () => {
    if (!playerName.trim()) return;
    setSaving(true);
    try {
      const existing = await TriviaScore.filter({ email: playerEmail || playerName });
      let updatedScore;
      if (existing.length > 0) {
        const prev = existing[0];
        const newTotal = (prev.total_points || 0) + score;
        const newCorrect = (prev.correct_answers || 0) + correct;
        const newCompleted = (prev.quizzes_completed || 0) + 1;
        const newTotal2 = (prev.total_answers || 0) + questions.length;
        const earnedBadges = BADGES.filter((b) => b.req({ total_points: newTotal, correct_answers: newCorrect, quizzes_completed: newCompleted })).map((b) => b.id);
        const prevBadges = prev.badges || [];
        const brandNew = earnedBadges.filter((b) => !prevBadges.includes(b));
        setNewBadges(brandNew.map((b) => BADGES.find((x) => x.id === b)));
        updatedScore = await TriviaScore.update(prev.id, {
          total_points: newTotal,
          correct_answers: newCorrect,
          quizzes_completed: newCompleted,
          total_answers: newTotal2,
          favorite_decade: selectedDecade,
          badges: [...new Set([...prevBadges, ...earnedBadges])],
          last_played: new Date().toISOString(),
        });
      } else {
        const earnedBadges = BADGES.filter((b) => b.req({ total_points: score, correct_answers: correct, quizzes_completed: 1 })).map((b) => b.id);
        setNewBadges(earnedBadges.map((b) => BADGES.find((x) => x.id === b)));
        updatedScore = await TriviaScore.create({
          player_name: playerName,
          email: playerEmail || playerName,
          total_points: score,
          quizzes_completed: 1,
          correct_answers: correct,
          total_answers: questions.length,
          favorite_decade: selectedDecade,
          badges: earnedBadges,
          last_played: new Date().toISOString(),
        });
      }
    } catch (e) {}
    setSaving(false);
    await loadLeaderboard();
    setScreen("leaderboard");
  };

  const optionStyle = (opt) => {
    const base = { display: "block", width: "100%", textAlign: "left", padding: "14px 18px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: revealed ? "default" : "pointer", marginBottom: 10, border: "2px solid", transition: "all 0.2s" };
    if (!revealed) return { ...base, background: selected === opt ? "#1e3a5f" : "#1f2937", borderColor: selected === opt ? "#3b82f6" : "#374151", color: "#f3f4f6" };
    const q = questions[currentQ];
    if (opt === q.correct_answer) return { ...base, background: "#052e16", borderColor: "#22c55e", color: "#86efac" };
    if (opt === selected && opt !== q.correct_answer) return { ...base, background: "#450a0a", borderColor: "#ef4444", color: "#fca5a5" };
    return { ...base, background: "#1f2937", borderColor: "#374151", color: "#6b7280" };
  };

  if (screen === "home") return (
    <div style={{ background: "#111827", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "linear-gradient(135deg, #1f2937, #111827)", borderBottom: "2px solid #eab30844", padding: "50px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 10 }}>🧠</div>
        <h1 style={{ color: "#eab308", fontSize: 32, fontWeight: 900, margin: "0 0 10px" }}>Decade Trivia Challenge</h1>
        <p style={{ color: "#9ca3af", fontSize: 15, margin: "0 0 24px" }}>Test your knowledge of history, culture, music & more across every decade</p>
        <button onClick={() => { loadLeaderboard(); setScreen("leaderboard"); }} style={{ background: "transparent", border: "2px solid #eab308", color: "#eab308", padding: "10px 28px", borderRadius: 99, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🏆 View Leaderboard</button>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
        <h2 style={{ color: "#eab308", fontSize: 20, fontWeight: 800, marginBottom: 20, textAlign: "center" }}>Choose a Decade to Begin</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 14 }}>
          {DECADES.map((d) => (
            <button key={d} onClick={() => startQuiz(d)} disabled={loading} style={{ background: "#1f2937", border: "2px solid #374151", borderRadius: 16, padding: "22px 12px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#eab308"; e.currentTarget.style.background = "#eab30811"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.background = "#1f2937"; }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>{DECADE_EMOJIS[d]}</div>
              <div style={{ color: "#eab308", fontWeight: 900, fontSize: 18 }}>{d}</div>
              <div style={{ color: "#6b7280", fontSize: 11, marginTop: 4 }}>5 Questions</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 48 }}>
          <h3 style={{ color: "#eab308", fontSize: 16, fontWeight: 800, marginBottom: 16, textAlign: "center" }}>🎖️ Badges You Can Earn</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {BADGES.map((b) => (
              <div key={b.id} style={{ background: "#1f2937", border: "1px solid #374151", borderRadius: 99, padding: "6px 16px", fontSize: 13, color: "#9ca3af" }}>
                {b.label} — {b.desc}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (screen === "quiz") {
    const q = questions[currentQ];
    if (!q) return null;
    const progress = ((currentQ) / questions.length) * 100;
    return (
      <div style={{ background: "#111827", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>
        <div style={{ background: "#1f2937", borderBottom: "2px solid #374151", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14 }}>← Back</button>
          <span style={{ color: "#eab308", fontWeight: 800, fontSize: 16 }}>{DECADE_EMOJIS[selectedDecade]} {selectedDecade}</span>
          <span style={{ color: "#9ca3af", fontSize: 14 }}>{currentQ + 1} / {questions.length}</span>
        </div>

        <div style={{ height: 4, background: "#374151" }}>
          <div style={{ height: 4, background: "#eab308", width: progress + "%", transition: "width 0.3s" }} />
        </div>

        <div style={{ maxWidth: 620, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ background: "#eab30822", border: "1px solid #eab30855", color: "#eab308", borderRadius: 99, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>{q.category}</span>
            <span style={{ background: q.difficulty === "Easy" ? "#052e16" : q.difficulty === "Medium" ? "#1c1917" : "#450a0a", border: "1px solid #374151", color: q.difficulty === "Easy" ? "#22c55e" : q.difficulty === "Medium" ? "#f59e0b" : "#ef4444", borderRadius: 99, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>{q.difficulty} • {q.points} pts</span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.4, marginBottom: 28, color: "#f3f4f6" }}>{q.question}</h2>

          {["A", "B", "C", "D"].map((opt) => (
            <button key={opt} onClick={() => handleAnswer(opt)} style={optionStyle(opt)}>
              <span style={{ color: "#6b7280", marginRight: 10 }}>{opt}.</span>
              {q["option_" + opt.toLowerCase()]}
            </button>
          ))}

          {revealed && (
            <div style={{ marginTop: 20, background: selected === q.correct_answer ? "#052e16" : "#450a0a", border: `1px solid ${selected === q.correct_answer ? "#22c55e" : "#ef4444"}`, borderRadius: 12, padding: 16 }}>
              <p style={{ margin: "0 0 6px", fontWeight: 800, color: selected === q.correct_answer ? "#22c55e" : "#ef4444", fontSize: 15 }}>
                {selected === q.correct_answer ? "✅ Correct! +" + q.points + " points" : "❌ Incorrect"}
              </p>
              <p style={{ margin: 0, color: "#9ca3af", fontSize: 14, lineHeight: 1.5 }}>{q.explanation}</p>
            </div>
          )}

          {revealed && (
            <button onClick={nextQuestion} style={{ marginTop: 20, width: "100%", background: "#eab308", color: "#111827", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 900, fontSize: 16, cursor: "pointer" }}>
              {currentQ + 1 >= questions.length ? "See Results →" : "Next Question →"}
            </button>
          )}
        </div>

        <div style={{ textAlign: "center", padding: "0 0 20px", color: "#6b7280", fontSize: 14 }}>
          Score: <span style={{ color: "#eab308", fontWeight: 800 }}>{score} pts</span>
        </div>
      </div>
    );
  }

  if (screen === "result") {
    const pct = Math.round((correct / questions.length) * 100);
    const grade = pct === 100 ? "🏆 Perfect!" : pct >= 80 ? "⭐ Excellent!" : pct >= 60 ? "👍 Good Job!" : pct >= 40 ? "📚 Keep Learning!" : "🔁 Try Again!";
    return (
      <div style={{ background: "#111827", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "50px 24px", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>{pct === 100 ? "🏆" : pct >= 80 ? "⭐" : pct >= 60 ? "🎯" : "📚"}</div>
          <h1 style={{ color: "#eab308", fontSize: 28, fontWeight: 900, marginBottom: 8 }}>{grade}</h1>
          <p style={{ color: "#9ca3af", fontSize: 16, marginBottom: 4 }}>{selectedDecade} Quiz Complete</p>
          <div style={{ fontSize: 48, fontWeight: 900, color: "#eab308", margin: "20px 0 4px" }}>{score}</div>
          <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 8 }}>points earned</div>
          <div style={{ color: "#9ca3af", fontSize: 15, marginBottom: 32 }}>{correct} of {questions.length} correct ({pct}%)</div>

          <div style={{ background: "#1f2937", borderRadius: 16, padding: 24, marginBottom: 32, textAlign: "left" }}>
            <h3 style={{ color: "#eab308", fontWeight: 800, marginBottom: 16, textAlign: "center" }}>Answer Review</h3>
            {answers.map((a, i) => (
              <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < answers.length - 1 ? "1px solid #374151" : "none" }}>
                <p style={{ margin: "0 0 4px", fontSize: 14, color: "#f3f4f6", fontWeight: 600 }}>{i + 1}. {a.question}</p>
                <p style={{ margin: 0, fontSize: 13, color: a.isCorrect ? "#22c55e" : "#ef4444" }}>{a.isCorrect ? "✅ Correct" : `❌ You answered ${a.selected}, correct was ${a.correct}`}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#1f2937", borderRadius: 16, padding: 24, marginBottom: 24, textAlign: "left" }}>
            <h3 style={{ color: "#eab308", fontWeight: 800, marginBottom: 16, textAlign: "center" }}>Save Your Score to the Leaderboard</h3>
            <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="Your Name" style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15, marginBottom: 10, boxSizing: "border-box" }} />
            <input value={playerEmail} onChange={(e) => setPlayerEmail(e.target.value)} placeholder="Email (optional, to track your progress)" style={{ width: "100%", background: "#111827", border: "1px solid #374151", borderRadius: 10, padding: "12px 14px", color: "#f3f4f6", fontSize: 15, marginBottom: 16, boxSizing: "border-box" }} />
            <button onClick={saveScore} disabled={saving || !playerName.trim()} style={{ width: "100%", background: playerName.trim() ? "#eab308" : "#374151", color: playerName.trim() ? "#111827" : "#6b7280", border: "none", borderRadius: 10, padding: "13px 0", fontWeight: 900, fontSize: 15, cursor: playerName.trim() ? "pointer" : "default" }}>
              {saving ? "Saving..." : "🏆 Save & See Leaderboard"}
            </button>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => startQuiz(selectedDecade)} style={{ background: "#1f2937", border: "2px solid #eab308", color: "#eab308", borderRadius: 10, padding: "11px 24px", fontWeight: 700, cursor: "pointer" }}>🔁 Retry This Decade</button>
            <button onClick={() => setScreen("home")} style={{ background: "#eab308", border: "none", color: "#111827", borderRadius: 10, padding: "11px 24px", fontWeight: 700, cursor: "pointer" }}>🏠 Choose Another Decade</button>
          </div>
        </div>
      </div>
    );
  }

  if (screen === "leaderboard") return (
    <div style={{ background: "#111827", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "linear-gradient(135deg, #1f2937, #111827)", borderBottom: "2px solid #eab30844", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🏆</div>
        <h1 style={{ color: "#eab308", fontSize: 28, fontWeight: 900, margin: "0 0 6px" }}>Leaderboard</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Top Decade Trivia Champions</p>
      </div>

      {newBadges.length > 0 && (
        <div style={{ maxWidth: 600, margin: "20px auto 0", padding: "0 24px" }}>
          <div style={{ background: "#1c1408", border: "2px solid #eab308", borderRadius: 16, padding: 20, textAlign: "center" }}>
            <p style={{ color: "#eab308", fontWeight: 900, fontSize: 16, margin: "0 0 12px" }}>🎖️ New Badge{newBadges.length > 1 ? "s" : ""} Earned!</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {newBadges.map((b) => b && <span key={b.id} style={{ background: "#eab30822", border: "1px solid #eab308", borderRadius: 99, padding: "6px 16px", color: "#eab308", fontWeight: 700, fontSize: 14 }}>{b.label}</span>)}
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>Loading...</p>
        ) : leaderboard.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>No scores yet — be the first to play!</p>
        ) : (
          leaderboard.map((entry, i) => (
            <div key={entry.id} style={{ display: "flex", alignItems: "center", gap: 16, background: i < 3 ? "#1c1408" : "#1f2937", border: `2px solid ${i === 0 ? "#eab308" : i === 1 ? "#9ca3af" : i === 2 ? "#b45309" : "#374151"}`, borderRadius: 14, padding: "16px 20px", marginBottom: 12 }}>
              <div style={{ fontSize: 28, minWidth: 40, textAlign: "center" }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#f3f4f6" }}>{entry.player_name}</div>
                <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                  {entry.quizzes_completed} quizzes • {entry.correct_answers}/{entry.total_answers} correct • Fav: {entry.favorite_decade}
                </div>
                {entry.badges && entry.badges.length > 0 && (
                  <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {entry.badges.slice(0, 3).map((b) => {
                      const badge = BADGES.find((x) => x.id === b);
                      return badge ? <span key={b} style={{ fontSize: 11, background: "#eab30822", border: "1px solid #eab30844", color: "#eab308", borderRadius: 99, padding: "2px 8px" }}>{badge.label}</span> : null;
                    })}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: "#eab308", fontWeight: 900, fontSize: 22 }}>{entry.total_points}</div>
                <div style={{ color: "#6b7280", fontSize: 11 }}>pts</div>
              </div>
            </div>
          ))
        )}

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <button onClick={() => setScreen("home")} style={{ background: "#eab308", border: "none", color: "#111827", borderRadius: 10, padding: "12px 32px", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>🧠 Play Now</button>
        </div>
      </div>
    </div>
  );
}
