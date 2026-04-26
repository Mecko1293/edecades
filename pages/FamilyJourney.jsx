import { useState, useEffect } from "react";
import { FamilyAncestry } from "@/api/entities";
import { createClient } from "@/api/client";

const client = createClient();

const CHAPTER_TEMPLATES = [
  { id: "arrival", label: "Chapter 1: The Arrival", icon: "🚢" },
  { id: "struggle", label: "Chapter 2: The Struggle", icon: "⚒️" },
  { id: "community", label: "Chapter 3: Building Community", icon: "🏘️" },
  { id: "triumph", label: "Chapter 4: The Triumph", icon: "🏆" },
  { id: "legacy", label: "Chapter 5: The Legacy", icon: "📖" },
];

export default function FamilyJourney() {
  const [families, setFamilies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [chapter, setChapter] = useState(0);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [choice, setChoice] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    FamilyAncestry.list({ limit: 50 }).then(setFamilies);
  }, []);

  const generateChapter = async (family, chapterIdx, userChoice = null) => {
    setLoading(true);
    setStory("");
    setChoice(null);
    const chap = CHAPTER_TEMPLATES[chapterIdx];
    const prompt = `You are an immersive historical storytelling engine. Create a vivid, emotional, second-person interactive narrative for ${chap.label} of the ${family.family_name} family story.

Family background: ${family.migration_story}
Historical context: ${family.historical_context}
Traditions: ${family.traditions}
${userChoice ? `The reader chose: "${userChoice}"` : ""}

Write 3-4 atmospheric paragraphs in second-person ("You step off the ship..."). Include real historical details, sensory descriptions, and era-specific context. End with exactly 2 choices the reader can make (format as "CHOICE A: [action]" and "CHOICE B: [action]"). Keep tone warm but historically honest.`;

    try {
      const res = await client.functions.invoke("generateStory", { prompt });
      setStory(res?.story || generateFallbackStory(family, chap));
    } catch {
      setStory(generateFallbackStory(family, chap));
    }
    setLoading(false);
  };

  const generateFallbackStory = (family, chap) => {
    const stories = {
      arrival: `You stand at the ship's railing, watching the skyline of America emerge from the morning fog. The year is marked in your memory — the date your family left ${family.origin_region} behind. Your luggage holds everything: a few photographs, your grandmother's recipe book, a small token of home.\n\nAround you, hundreds of other immigrants press forward, speaking a dozen languages. The harbor smells of salt and diesel. Ellis Island looms ahead, a gateway between the world you knew and the world you're about to build.\n\nAn officer looks at your papers. Your family name — ${family.family_name} — is written clearly. He nods. You step through.\n\nThe city opens before you like a living thing.\n\nCHOICE A: Head directly to the established community neighborhood where others from your homeland have settled.\nCHOICE B: Strike out alone, looking for work and a room near the factory districts.`,
      struggle: `The first winter is harder than you imagined. Your tenement apartment on the east side houses three families. The walls are thin. The pay from the factory is barely enough for bread and rent.\n\nBut there is dignity in the work. You learn English word by word, phrase by phrase. You attend night school twice a week. Your children — born American — move through the world with a confidence that still startles you.\n\nThe neighborhood around you is full of people in the same position: Irish, Italian, Polish, Jewish, Chinese. You help each other, argue sometimes, but ultimately understand the shared condition of starting over.\n\nCHOICE A: Join the labor union organizing at your factory for better wages and conditions.\nCHOICE B: Pool resources with three other families to open a small shop together.`,
      community: `Years have passed. The neighborhood has its rhythms now — the Saturday markets, the Sunday church services, the children playing in the streets on summer evenings. The ${family.family_name} name is known. People nod when you walk by.\n\nYour eldest child has graduated from school. The first in your family to hold that diploma. You keep it framed on the wall, the paper soft from how many times you've touched it.\n\nThe traditions from ${family.origin_region} are alive here, adapted to American life. The food, the music, the stories told on long evenings — they travel with you.\n\nCHOICE A: Stay in the city and watch your children build careers here.\nCHOICE B: Move the family west, where land and opportunity feel more open.`,
      triumph: `Decades have turned. The country has changed around you — wars, prosperity, upheaval, progress. The ${family.family_name} family has been part of all of it.\n\nYour grandchildren don't know the journey. They were born into the life you built. Sometimes you try to tell them — the ship, the cold, the first English words — and you can see them trying to imagine it.\n\nBut they carry it anyway, in their names, in the food they crave, in the values you passed along: work hard, help others, remember where you came from.\n\nCHOICE A: Write down the family history before it's lost.\nCHOICE B: Organize a family reunion to bring everyone together and share the stories.`,
      legacy: `Now you see it whole. The arc of a family across generations, across decades, across an ocean. What began as a desperate or hopeful journey on a ship has become this: children, grandchildren, great-grandchildren — American, and yet carrying something ancient.\n\nThe ${family.family_name} legacy is not a single achievement. It's a thousand small dignities. A first in college. A business opened. A marriage. A child named after someone left behind.\n\nThe traditions from ${family.origin_region} have changed shape but not substance. They live in kitchens, in music, in the way people greet each other at reunions.\n\nThis is how a people persist — not in monuments, but in the living continuity of family.\n\nYour journey through this family history is complete. Their story continues.`
    };
    return stories[chap.id] || stories.arrival;
  };

  const parseChoices = (text) => {
    const choiceA = text.match(/CHOICE A:\s*(.+)/i)?.[1]?.trim();
    const choiceB = text.match(/CHOICE B:\s*(.+)/i)?.[1]?.trim();
    return choiceA && choiceB ? [choiceA, choiceB] : null;
  };

  const storyText = story.replace(/CHOICE [AB]:.*/gi, "").trim();
  const choices = parseChoices(story);

  const handleChoice = (c) => {
    setHistory(h => [...h, { chapter: CHAPTER_TEMPLATES[chapter].label, choice: c }]);
    if (chapter + 1 < CHAPTER_TEMPLATES.length) {
      setChapter(ch => ch + 1);
      generateChapter(selected, chapter + 1, c);
    }
  };

  return (
    <div style={{ background: "#0c0f14", minHeight: "100vh", color: "#f3f4f6", fontFamily: "'Georgia', serif" }}>
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.95)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out" }}>
          <img src={lightbox} alt="" style={{ maxWidth: "90vw", maxHeight: "85vh", borderRadius: 16, boxShadow: "0 40px 80px rgba(0,0,0,0.9)" }} />
        </div>
      )}

      <div style={{ background: "linear-gradient(135deg, #1a1008, #0c0f14)", borderBottom: "2px solid #92400e44", padding: "50px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 54, marginBottom: 10 }}>🌳</div>
        <h1 style={{ color: "#d97706", fontSize: 32, fontWeight: 900, margin: "0 0 10px" }}>Family Journey</h1>
        <p style={{ color: "#9ca3af", fontSize: 15, margin: 0 }}>An immersive interactive adventure through your ancestors' lives</p>
      </div>

      {!selected ? (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
          <h2 style={{ color: "#d97706", fontWeight: 800, fontSize: 20, marginBottom: 24, textAlign: "center" }}>Choose a Family to Explore</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {families.map(f => (
              <div key={f.id} onClick={() => { setSelected(f); setChapter(0); generateChapter(f, 0); }}
                style={{ background: "#1f2937", border: "2px solid #374151", borderRadius: 16, padding: 20, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#d97706"; e.currentTarget.style.background = "#d9770611"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.background = "#1f2937"; }}>
                {f.photo_url && <img src={f.photo_url} alt={f.family_name} onClick={ev => { ev.stopPropagation(); setLightbox(f.photo_url); }} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 10, marginBottom: 12, cursor: "zoom-in" }} onError={e => e.target.style.display = "none"} />}
                <h3 style={{ color: "#d97706", fontWeight: 900, fontSize: 20, margin: "0 0 6px" }}>The {f.family_name} Family</h3>
                <p style={{ color: "#9ca3af", fontSize: 13, margin: "0 0 10px" }}>{f.origin_country} · {f.ethnicity}</p>
                <p style={{ color: "#6b7280", fontSize: 12, lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{f.migration_story}</p>
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(f.tags || []).slice(0, 3).map(t => <span key={t} style={{ background: "#111827", color: "#6b7280", borderRadius: 99, padding: "2px 8px", fontSize: 11 }}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "40px 24px" }}>
          <button onClick={() => { setSelected(null); setStory(""); setHistory([]); }} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14, marginBottom: 24 }}>← Back to Family Selection</button>

          <div style={{ background: "#1f2937", borderRadius: 16, padding: "20px 24px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
            {selected.photo_url && <img src={selected.photo_url} alt="" onClick={() => setLightbox(selected.photo_url)} style={{ width: 64, height: 64, borderRadius: 12, objectFit: "cover", cursor: "zoom-in", flexShrink: 0 }} onError={e => e.target.style.display = "none"} />}
            <div>
              <h2 style={{ color: "#d97706", fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>The {selected.family_name} Family</h2>
              <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>{selected.origin_country} · {selected.ethnicity} · {selected.decades_active}</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
            {CHAPTER_TEMPLATES.map((c, i) => (
              <div key={c.id} style={{ padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700, background: i === chapter ? "#d97706" : i < chapter ? "#374151" : "#111827", color: i === chapter ? "#000" : i < chapter ? "#9ca3af" : "#4b5563" }}>
                {c.icon} {c.label.split(":")[0]}
              </div>
            ))}
          </div>

          <div style={{ background: "#111827", border: "2px solid #374151", borderRadius: 20, padding: "32px 28px", minHeight: 200, marginBottom: 24 }}>
            <h3 style={{ color: "#d97706", fontWeight: 800, fontSize: 18, marginBottom: 20 }}>{CHAPTER_TEMPLATES[chapter].icon} {CHAPTER_TEMPLATES[chapter].label}</h3>
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📖</div>
                <p>Weaving your family's story...</p>
              </div>
            ) : (
              <div style={{ color: "#d1d5db", lineHeight: 1.9, fontSize: 16, whiteSpace: "pre-wrap" }}>{storyText}</div>
            )}
          </div>

          {!loading && choices && chapter < CHAPTER_TEMPLATES.length - 1 && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ color: "#9ca3af", fontSize: 14, fontWeight: 700, marginBottom: 12 }}>What do you do?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {choices.map((c, i) => (
                  <button key={i} onClick={() => handleChoice(c)} style={{ background: "#1f2937", border: "2px solid #374151", borderRadius: 12, padding: "16px 20px", color: "#f3f4f6", fontSize: 15, textAlign: "left", cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#d97706"; e.currentTarget.style.background = "#d9770611"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.background = "#1f2937"; }}>
                    <span style={{ color: "#d97706", fontWeight: 800, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>{c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && chapter === CHAPTER_TEMPLATES.length - 1 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <button onClick={() => { setSelected(null); setStory(""); setHistory([]); }} style={{ background: "#d97706", border: "none", color: "#000", borderRadius: 12, padding: "14px 32px", fontWeight: 900, fontSize: 15, cursor: "pointer" }}>
                🌳 Explore Another Family
              </button>
            </div>
          )}

          {history.length > 0 && (
            <div style={{ background: "#1f2937", borderRadius: 12, padding: 16, marginTop: 16 }}>
              <p style={{ color: "#6b7280", fontSize: 12, fontWeight: 700, marginBottom: 10 }}>YOUR JOURNEY SO FAR</p>
              {history.map((h, i) => (
                <div key={i} style={{ fontSize: 13, color: "#9ca3af", marginBottom: 6 }}>
                  <span style={{ color: "#d97706" }}>{h.chapter}:</span> You chose — "{h.choice}"
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
