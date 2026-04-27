import { useState } from "react";
import { createClient } from "@/api/client";

const client = createClient();

const FIGURES = {
  "1920s": [
    { name:"Louis Armstrong", role:"Jazz Musician", emoji:"🎺", context:"1920s New Orleans and Chicago jazz scene, Prohibition era America", personality:"warm, joyful, innovative, speaks in 1920s African-American vernacular, references speakeasies and jazz clubs" },
    { name:"Coco Chanel", role:"Fashion Designer", emoji:"👗", context:"1920s Paris fashion world, post-WWI liberation of women's fashion", personality:"sharp, witty, confident, speaks French-influenced English, references haute couture and Parisian society" },
    { name:"F. Scott Fitzgerald", role:"Author", emoji:"✍️", context:"1920s Jazz Age New York, literary circles, the American Dream", personality:"eloquent, melancholic, romantic, references Gatsby-era excess and disillusionment" },
  ],
  "1930s": [
    { name:"Franklin D. Roosevelt", role:"US President", emoji:"🏛️", context:"Great Depression America, the New Deal, radio fireside chats", personality:"confident, optimistic, patrician, uses uplifting rhetoric, references economic crisis and national recovery" },
    { name:"Amelia Earhart", role:"Aviation Pioneer", emoji:"✈️", context:"1930s aviation, women's liberation, world records", personality:"adventurous, determined, modest but proud, references flight records and women in aviation" },
    { name:"Langston Hughes", role:"Poet & Author", emoji:"📝", context:"Harlem Renaissance, 1930s Black America, jazz poetry", personality:"thoughtful, rhythmic speech, references the Blues and Black American experience" },
  ],
  "1940s": [
    { name:"Winston Churchill", role:"British Prime Minister", emoji:"🇬🇧", context:"WWII Britain, the Blitz, Allied leadership", personality:"bombastic, eloquent, uses wartime rhetoric, references duty to the Empire and victory over tyranny" },
    { name:"Rosie the Riveter", role:"Cultural Icon", emoji:"💪", context:"WWII American homefront, women in the workforce", personality:"proud, hardworking, patriotic, references factory life and women's wartime contribution" },
    { name:"Ella Fitzgerald", role:"Jazz Singer", emoji:"🎤", context:"1940s New York jazz scene, bebop era", personality:"warm, gracious, speaks of music with deep reverence, references Carnegie Hall and the jazz greats" },
  ],
  "1950s": [
    { name:"Elvis Presley", role:"Rock & Roll Star", emoji:"🎸", context:"1950s Memphis, Sun Records, early rock & roll", personality:"humble, charming Southern drawl, references Tupelo Mississippi roots and the power of music" },
    { name:"Rosa Parks", role:"Civil Rights Activist", emoji:"✊", context:"1955 Montgomery Alabama, Civil Rights Movement", personality:"dignified, calm but firm, references the injustice of segregation and the need for peaceful resistance" },
    { name:"Marilyn Monroe", role:"Actress & Icon", emoji:"⭐", context:"1950s Hollywood golden age, fame and vulnerability", personality:"breathy, playful, deeper than her image, references the pressures of Hollywood and loneliness of fame" },
  ],
  "1960s": [
    { name:"Martin Luther King Jr.", role:"Civil Rights Leader", emoji:"✊", context:"1960s Civil Rights Movement, non-violent protest, I Have a Dream speech", personality:"eloquent, biblical cadence, profound moral conviction, references justice, brotherhood, and peaceful change" },
    { name:"John F. Kennedy", role:"US President", emoji:"🏛️", context:"1960s Camelot era, Cold War, space race, Cuban Missile Crisis", personality:"charismatic, Boston accent, idealistic, references American greatness and Cold War threats" },
    { name:"Jimi Hendrix", role:"Rock Guitarist", emoji:"🎸", context:"1960s psychedelic rock, Woodstock, counterculture", personality:"laid-back, poetic, references the spiritual power of music and psychedelic experience" },
  ],
  "1970s": [
    { name:"Muhammad Ali", role:"Boxer & Activist", emoji:"🥊", context:"1970s heavyweight boxing, Vietnam War protest, Black pride", personality:"boastful, poetic, rhyming trash talk, deep conviction about justice and identity, references 'float like a butterfly'" },
    { name:"Gloria Steinem", role:"Feminist Activist", emoji:"✊", context:"1970s women's liberation movement, Ms. Magazine", personality:"sharp, direct, references gender inequality and the fight for women's equal rights" },
    { name:"David Bowie", role:"Rock Musician", emoji:"🎭", context:"1970s glam rock, Ziggy Stardust era, artistic reinvention", personality:"theatrical, avant-garde, references alter egos and the freedom of artistic expression" },
  ],
  "1980s": [
    { name:"Michael Jackson", role:"Pop Star", emoji:"🕺", context:"1980s pop music, Thriller era, MTV, moonwalk", personality:"soft-spoken, references the joy of performance and connecting with fans through music and dance" },
    { name:"Ronald Reagan", role:"US President", emoji:"🏛️", context:"1980s Cold War, Reaganomics, optimistic conservatism", personality:"folksy, optimistic, references morning in America and the fight against communism" },
    { name:"Madonna", role:"Pop Icon", emoji:"🎤", context:"1980s pop music, MTV, material girl era", personality:"bold, provocative, unapologetic, references female empowerment and pushing cultural boundaries" },
  ],
  "1990s": [
    { name:"Kurt Cobain", role:"Grunge Musician", emoji:"🎸", context:"1990s grunge, Seattle music scene, Nirvana, Gen X angst", personality:"anti-establishment, introspective, references corporate music industry and authentic self-expression" },
    { name:"Nelson Mandela", role:"South African President", emoji:"✊", context:"1990s South Africa, end of Apartheid, reconciliation", personality:"dignified, forgiving, references 27 years in prison and the power of forgiveness over hatred" },
    { name:"Bill Gates", role:"Tech Entrepreneur", emoji:"💻", context:"1990s Microsoft, Windows, personal computing revolution", personality:"cerebral, slightly awkward, enthusiastic about technology, references the potential of computers to change the world" },
  ],
  "2000s": [
    { name:"Steve Jobs", role:"Apple Co-founder", emoji:"📱", context:"2000s iPod, iPhone, Apple revolution", personality:"visionary, intense, uses 'one more thing', references making a dent in the universe and insanely great products" },
    { name:"Beyoncé", role:"Pop Star", emoji:"🎤", context:"2000s pop/R&B, Destiny's Child, early solo career", personality:"confident, gracious, references hard work, female empowerment, and Houston Texas roots" },
    { name:"Barack Obama", role:"US Senator/President", emoji:"🏛️", context:"2000s politics, 2008 election, hope and change", personality:"eloquent, measured, professorial yet accessible, references American values and the audacity of hope" },
  ],
  "2010s": [
    { name:"Elon Musk", role:"Tech Entrepreneur", emoji:"🚀", context:"2010s Tesla, SpaceX, Twitter, disruption culture", personality:"blunt, meme-aware, references making humanity multi-planetary and disrupting stale industries" },
    { name:"Taylor Swift", role:"Pop Star", emoji:"🎵", context:"2010s pop music, Swifties fandom, reinvention", personality:"warm, storytelling-focused, witty, references songwriting as diary-keeping and genuine fan connections" },
    { name:"Malala Yousafzai", role:"Education Activist", emoji:"📚", context:"2010s education rights, Taliban shooting survivor, Nobel Prize", personality:"brave, thoughtful, references the power of education and the importance of girls' rights globally" },
  ],
};

const DECADES = Object.keys(FIGURES);

export default function AvatarGenerator() {
  const [selectedDecade, setSelectedDecade] = useState("1960s");
  const [selectedFigure, setSelectedFigure] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const figures = FIGURES[selectedDecade] || [];

  const startConversation = (figure) => {
    setSelectedFigure(figure);
    setStarted(true);
    setMessages([{
      role:"assistant",
      text: getOpeningLine(figure),
    }]);
  };

  const getOpeningLine = (figure) => {
    const openings = {
      "Louis Armstrong": "Well hello there, friend! Louis Armstrong here, fresh from a gig at the Cotton Club. The trumpet's still warm in my hands. What brings you to my corner of Harlem tonight?",
      "Martin Luther King Jr.": "Greetings, my friend. I am Martin Luther King Jr., and I believe there is always time for meaningful conversation. What weighs on your heart today?",
      "Elvis Presley": "Well, thank you very much! Elvis Presley here, just got back from a recording session at Sun Studio in Memphis. You know, music is the only thing that makes me feel truly alive. What can I do for you?",
      "Muhammad Ali": "I am the greatest! Muhammad Ali, the Louisville Lip himself. I float like a butterfly, sting like a bee — and I always got time to talk to the people. What's on your mind?",
      "Michael Jackson": "Hi... I'm Michael. I just finished rehearsals for the Thriller tour. Music is my life, my passion. I hope we can talk and share something beautiful. What would you like to know?",
      "Steve Jobs": "Hello. Steve Jobs. I'll tell you, we're on the verge of something insanely great here at Apple. One more thing — I have time to talk. What's on your mind?",
    };
    return openings[figure.name] || `Hello, I am ${figure.name}. It's ${selectedDecade} and the world is full of remarkable change. What would you like to discuss?`;
  };

  const sendMessage = async () => {
    if (!input.trim() || loading || !selectedFigure) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role:"user", text:userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => `${m.role === "user" ? "Human" : selectedFigure.name}: ${m.text}`).join("\n");
      const systemPrompt = `You are ${selectedFigure.name}, ${selectedFigure.role}. 
Context: ${selectedFigure.context}
Personality & speech style: ${selectedFigure.personality}

IMPORTANT RULES:
- Respond ONLY as ${selectedFigure.name} in first person
- Use the dialect, vocabulary, and references appropriate to the ${selectedDecade}
- Stay completely in character — do not break character or acknowledge being an AI
- Reference real historical events, people, and places from the ${selectedDecade}
- Keep responses conversational, 2-4 sentences typically
- Show the personality, values, and worldview authentic to this person
- If asked about future events (after their era), respond with confusion or speculation as they would have in their time`;

      const res = await client.ai.complete({
        system: systemPrompt,
        messages: [
          ...messages.map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
          { role: "user", content: userMsg }
        ]
      });

      const reply = res?.content || res?.message || res?.text || `*${selectedFigure.name} pauses thoughtfully* That's a fascinating question for someone in ${selectedDecade}...`;
      setMessages(prev => [...prev, { role:"assistant", text:reply }]);
    } catch (e) {
      const fallbacks = [
        `*${selectedFigure.name} looks at you with ${selectedDecade} eyes* You ask deep questions, friend. In my experience in ${selectedDecade}, I'd say the answer lies in understanding our times.`,
        `That reminds me of something I've been thinking about a lot lately here in ${selectedDecade}... ${selectedFigure.name} pauses to reflect.`,
      ];
      setMessages(prev => [...prev, { role:"assistant", text:fallbacks[Math.floor(Math.random()*fallbacks.length)] }]);
    }
    setLoading(false);
  };

  if (started && selectedFigure) return (
    <div style={{ background:"#07070e", minHeight:"100vh", color:"#f3f4f6", fontFamily:"Inter, sans-serif", display:"flex", flexDirection:"column" }}>
      <div style={{ background:"#111827", borderBottom:"2px solid #374151", padding:"16px 20px", display:"flex", alignItems:"center", gap:14, position:"sticky", top:0, zIndex:10 }}>
        <button onClick={()=>{ setStarted(false); setSelectedFigure(null); setMessages([]); }} style={{ background:"none", border:"none", color:"#9ca3af", cursor:"pointer", fontSize:22 }}>←</button>
        <div style={{ width:44, height:44, background:"#1f2937", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{selectedFigure.emoji}</div>
        <div>
          <div style={{ color:"#f3f4f6", fontWeight:800, fontSize:16 }}>{selectedFigure.name}</div>
          <div style={{ color:"#6b7280", fontSize:12 }}>{selectedFigure.role} · {selectedDecade}</div>
        </div>
        <div style={{ marginLeft:"auto", background:"#22c55e22", border:"1px solid #22c55e44", color:"#22c55e", borderRadius:99, padding:"4px 12px", fontSize:11, fontWeight:700 }}>● In Character</div>
      </div>

      <div style={{ flex:1, overflowY:"auto", padding:"20px 16px", maxWidth:700, margin:"0 auto", width:"100%" }}>
        <div style={{ background:"#111827", border:"1px solid #374151", borderRadius:12, padding:"12px 16px", marginBottom:20, textAlign:"center" }}>
          <div style={{ color:"#6b7280", fontSize:12 }}>You are speaking with <span style={{ color:"#C9A84C", fontWeight:700 }}>{selectedFigure.name}</span> as they existed in the <span style={{ color:"#C9A84C", fontWeight:700 }}>{selectedDecade}</span>. The AI responds in their authentic voice, dialect, and worldview.</div>
        </div>

        {messages.map((msg, i) => (
          <div key={i} style={{ display:"flex", justifyContent:msg.role==="user"?"flex-end":"flex-start", marginBottom:14 }}>
            {msg.role==="assistant" && (
              <div style={{ width:36, height:36, background:"#1f2937", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginRight:10, flexShrink:0, alignSelf:"flex-end" }}>{selectedFigure.emoji}</div>
            )}
            <div style={{
              maxWidth:"75%", padding:"12px 16px", borderRadius:msg.role==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",
              background:msg.role==="user"?"#1d4ed8":"#1f2937",
              color:msg.role==="user"?"#fff":"#e5e7eb",
              fontSize:14, lineHeight:1.6,
              fontFamily:msg.role==="assistant"?"Georgia, serif":"Inter, sans-serif",
            }}>{msg.text}</div>
          </div>
        ))}

        {loading && (
          <div style={{ display:"flex", alignItems:"flex-end", marginBottom:14 }}>
            <div style={{ width:36, height:36, background:"#1f2937", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginRight:10 }}>{selectedFigure.emoji}</div>
            <div style={{ background:"#1f2937", borderRadius:"16px 16px 16px 4px", padding:"12px 16px" }}>
              <div style={{ display:"flex", gap:4 }}>
                {[0,1,2].map(i=><div key={i} style={{ width:6, height:6, borderRadius:"50%", background:"#6b7280", animation:`pulse ${0.6+i*0.2}s ease-in-out infinite` }} />)}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ background:"#111827", borderTop:"1px solid #374151", padding:"16px", position:"sticky", bottom:0 }}>
        <div style={{ maxWidth:700, margin:"0 auto", display:"flex", gap:10 }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&sendMessage()} placeholder={`Ask ${selectedFigure.name} something...`} style={{ flex:1, background:"#1f2937", border:"1px solid #374151", borderRadius:12, padding:"12px 16px", color:"#f3f4f6", fontSize:14 }} />
          <button onClick={sendMessage} disabled={loading||!input.trim()} style={{ background:loading||!input.trim()?"#374151":"#C9A84C", border:"none", borderRadius:12, padding:"12px 20px", color:loading||!input.trim()?"#6b7280":"#000", fontWeight:900, cursor:loading||!input.trim()?"default":"pointer", fontSize:14 }}>Send</button>
        </div>
        <div style={{ maxWidth:700, margin:"8px auto 0", display:"flex", gap:6, flexWrap:"wrap" }}>
          {["What is your greatest achievement?","What challenges do you face?","What do you think of today's world?","What advice would you give young people?"].map((q,i)=>(
            <button key={i} onClick={()=>setInput(q)} style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:99, padding:"4px 12px", color:"#9ca3af", fontSize:11, cursor:"pointer" }}>{q}</button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:"#07070e", minHeight:"100vh", color:"#f3f4f6", fontFamily:"Inter, sans-serif" }}>
      <div style={{ background:"linear-gradient(135deg, #1f2937, #111827)", borderBottom:"2px solid #C9A84C33", padding:"40px 24px", textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:10 }}>🎭</div>
        <h1 style={{ color:"#C9A84C", fontSize:28, fontWeight:900, margin:"0 0 8px" }}>Ask a Historical Figure</h1>
        <p style={{ color:"#9ca3af", fontSize:15, margin:"0 0 8px" }}>Select a decade and an icon — then have a real AI-powered conversation in their authentic voice</p>
        <div style={{ color:"#6b7280", fontSize:12 }}>The AI responds as they would have spoken, thought, and felt in their era</div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"32px 16px 60px" }}>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:32 }}>
          {DECADES.map(d=>(
            <button key={d} onClick={()=>setSelectedDecade(d)} style={{ padding:"7px 18px", borderRadius:99, fontWeight:700, fontSize:13, cursor:"pointer", border:"none", background:selectedDecade===d?"#C9A84C":"#1f2937", color:selectedDecade===d?"#000":"#9ca3af" }}>
              {{"1920s":"🎷","1930s":"🎬","1940s":"✈️","1950s":"🎸","1960s":"☮️","1970s":"🕺","1980s":"🕹️","1990s":"📼","2000s":"💿","2010s":"📱"}[d]} {d}
            </button>
          ))}
        </div>

        <h2 style={{ color:"#C9A84C", fontWeight:800, fontSize:18, textAlign:"center", marginBottom:20 }}>Choose a Figure from the {selectedDecade}</h2>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))", gap:16 }}>
          {figures.map((fig,i)=>(
            <div key={i} onClick={()=>startConversation(fig)} style={{ background:"#111827", border:"2px solid #1f2937", borderRadius:18, padding:"24px 20px", cursor:"pointer", transition:"all 0.2s", textAlign:"center" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#C9A84C";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#1f2937";e.currentTarget.style.transform="";}}>
              <div style={{ fontSize:54, marginBottom:12 }}>{fig.emoji}</div>
              <h3 style={{ color:"#C9A84C", fontWeight:900, fontSize:20, margin:"0 0 6px" }}>{fig.name}</h3>
              <div style={{ color:"#9ca3af", fontSize:13, marginBottom:14 }}>{fig.role}</div>
              <div style={{ background:"#1f2937", borderRadius:99, padding:"8px 20px", color:"#f3f4f6", fontSize:13, fontWeight:700, display:"inline-block" }}>💬 Start Conversation →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
