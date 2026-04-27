# eDecades — Compare Decades Component

Paste this full component into your eDecades editor as a new page called "CompareDecades":

```jsx
import { useState } from "react";

const DECADE_DATA = {
  "1920s": {
    emoji: "🎷",
    tagline: "The Roaring Twenties",
    color: "#d4956e",
    music: { genres: ["Jazz","Blues","Ragtime","Gospel"], artists: ["Louis Armstrong","Duke Ellington","Bessie Smith","Jelly Roll Morton"], charts: { Jazz: 80, Blues: 60, Classical: 40, Folk: 30 } },
    fashion: { trends: ["Flapper dresses","Cloche hats","Bobbed hair","Pinstripe suits","Art Deco jewelry"], icons: ["Coco Chanel","Josephine Baker"] },
    events: ["Prohibition (1920-1933)","Women gain right to vote (1920)","Harlem Renaissance","Stock Market Crash (1929)","First talking picture (1927)"],
    tech: ["Talking pictures","Radio broadcasting","Commercial aviation","Refrigerators become common"],
    pop_culture: ["Charleston dance","Speakeasies","Jazz clubs","Flappers","The Great Gatsby era"],
    vibe: "Glamour, rebellion, and excess",
  },
  "1930s": {
    emoji: "🎬",
    tagline: "The Golden Age of Hollywood",
    color: "#b8a88a",
    music: { genres: ["Swing","Big Band","Blues","Country"], artists: ["Benny Goodman","Glenn Miller","Robert Johnson","Hank Williams Sr."], charts: { Swing: 85, Blues: 65, Classical: 45, Country: 50 } },
    fashion: { trends: ["Bias-cut silk gowns","Wide-leg trousers","Fedora hats","Platform shoes","Practical utility wear"], icons: ["Marlene Dietrich","Katharine Hepburn"] },
    events: ["Great Depression","The New Deal","Rise of Fascism in Europe","Spanish Civil War","Social Security Act (1935)"],
    tech: ["Nylon invented","Radar developed","Jet engine prototype","Color film introduced"],
    pop_culture: ["Hollywood musicals","Radio dramas","Superman (1938)","Shirley Temple","Monopoly board game"],
    vibe: "Resilience and escapism through hard times",
  },
  "1940s": {
    emoji: "✈️",
    tagline: "War Years & Victory",
    color: "#7a9abf",
    music: { genres: ["Big Band","Bebop","Country","Gospel"], artists: ["Frank Sinatra","Billie Holiday","Dizzy Gillespie","Charlie Parker"], charts: { "Big Band": 80, Bebop: 50, Country: 55, Gospel: 45 } },
    fashion: { trends: ["Military-shoulder silhouettes","Rosie the Riveter look","Victory Rolls hair","Utility dresses","Nylon stockings"], icons: ["Rita Hayworth","Veronica Lake"] },
    events: ["World War II (1939-1945)","Pearl Harbor (1941)","D-Day (1944)","Atomic bombs dropped (1945)","United Nations founded (1945)"],
    tech: ["Atomic bomb","Microwave oven","ENIAC computer","Penicillin mass production","Jet aircraft"],
    pop_culture: ["War films","Pin-up girls","USO shows","Casablanca (1942)","It's a Wonderful Life (1946)"],
    vibe: "Unity, sacrifice, and triumph",
  },
  "1950s": {
    emoji: "🎸",
    tagline: "Rock & Roll Is Born",
    color: "#d4788a",
    music: { genres: ["Rock & Roll","R&B","Country","Doo-Wop"], artists: ["Elvis Presley","Chuck Berry","Little Richard","Buddy Holly"], charts: { "Rock & Roll": 90, "R&B": 75, Country: 60, "Doo-Wop": 55 } },
    fashion: { trends: ["Poodle skirts","Greaser leather jackets","New Look hourglass","Cat-eye sunglasses","Saddle shoes"], icons: ["Marilyn Monroe","James Dean"] },
    events: ["Korean War (1950-53)","Brown v. Board of Education (1954)","Rosa Parks (1955)","Sputnik launch (1957)","Cuba revolution (1959)"],
    tech: ["Color TV","Credit cards","DNA double helix","Polio vaccine","Transistor radio"],
    pop_culture: ["Drive-in movies","Teen idols","Diners","Howdy Doody","I Love Lucy"],
    vibe: "Optimism, conformity, and rebellion brewing",
  },
  "1960s": {
    emoji: "☮️",
    tagline: "Peace, Love & Revolution",
    color: "#c4956e",
    music: { genres: ["Rock","Soul","Folk","Psychedelic","Motown"], artists: ["The Beatles","Jimi Hendrix","Aretha Franklin","Bob Dylan","The Rolling Stones"], charts: { Rock: 90, Soul: 80, Folk: 65, Psychedelic: 60 } },
    fashion: { trends: ["Mini skirts","Mod geometric prints","Tie-dye","Bell-bottoms","Go-go boots"], icons: ["Twiggy","Jackie Kennedy"] },
    events: ["JFK assassination (1963)","Civil Rights Act (1964)","Moon Landing (1969)","Woodstock (1969)","Vietnam War escalation"],
    tech: ["Internet (ARPANET 1969)","Apollo 11","Laser","Cassette tape","Heart transplant"],
    pop_culture: ["British Invasion","Hippie movement","Psychedelia","Bonnie & Clyde","Star Trek (1966)"],
    vibe: "Revolution, idealism, and cultural explosion",
  },
  "1970s": {
    emoji: "🕺",
    tagline: "Funk, Disco & Soul",
    color: "#c4784f",
    music: { genres: ["Disco","Funk","Rock","Hip-Hop","Punk"], artists: ["Donna Summer","Earth Wind & Fire","Led Zeppelin","The Ramones","Grandmaster Flash"], charts: { Disco: 85, Funk: 75, Rock: 80, Punk: 55 } },
    fashion: { trends: ["Bell-bottoms","Platform shoes","Leisure suits","Mood rings","Halter tops"], icons: ["Farrah Fawcett","David Bowie"] },
    events: ["Watergate scandal","Vietnam War ends (1975)","Oil crisis","Roe v. Wade (1973)","Iran Revolution (1979)"],
    tech: ["Personal computer (1975)","VCR","MRI scanner","Atari 2600","Space Shuttle designed"],
    pop_culture: ["Disco clubs","Saturday Night Fever","Star Wars (1977)","Charlie's Angels","Roller skating"],
    vibe: "Excess, identity, and economic anxiety",
  },
  "1980s": {
    emoji: "🎮",
    tagline: "Neon, Power & Pop",
    color: "#b87ac4",
    music: { genres: ["Pop","New Wave","Hip-Hop","Heavy Metal","R&B"], artists: ["Michael Jackson","Madonna","Prince","Run-DMC","Metallica"], charts: { Pop: 90, "New Wave": 75, "Hip-Hop": 70, "Heavy Metal": 65 } },
    fashion: { trends: ["Power shoulders","Leg warmers","Acid-wash jeans","Big hair","Scrunchies"], icons: ["Madonna","Princess Diana"] },
    events: ["Reagan Revolution","HIV/AIDS crisis","Berlin Wall falls (1989)","Chernobyl (1986)","Tiananmen Square (1989)"],
    tech: ["IBM PC (1981)","CD player","DNA fingerprinting","Pac-Man","Nintendo NES"],
    pop_culture: ["MTV","Video games boom","Back to the Future","Ghostbusters","The Breakfast Club"],
    vibe: "Excess, ambition, and pop culture dominance",
  },
  "1990s": {
    emoji: "📼",
    tagline: "Grunge, Hip-Hop & the Web",
    color: "#7aaa8a",
    music: { genres: ["Grunge","Hip-Hop","R&B","Pop","Alternative"], artists: ["Nirvana","Tupac","Jay-Z","Mariah Carey","Spice Girls"], charts: { Grunge: 80, "Hip-Hop": 90, "R&B": 85, Pop: 88 } },
    fashion: { trends: ["Grunge flannel","Baggy jeans","Slip dresses","Frosted tips","JNCO jeans"], icons: ["Kate Moss","Kurt Cobain"] },
    events: ["Gulf War (1991)","Oklahoma City bombing (1995)","OJ Simpson trial","Columbine (1999)","Clinton impeachment"],
    tech: ["World Wide Web","DVD","Dolly the sheep","Game Boy Color","MP3 player"],
    pop_culture: ["Friends","Titanic","Tamagotchi","AOL Instant Messenger","Beanie Babies"],
    vibe: "Slacker cool, digital dawn, and cultural richness",
  },
  "2000s": {
    emoji: "📱",
    tagline: "Y2K & the Digital Age",
    color: "#7aaac4",
    music: { genres: ["Pop","Hip-Hop","Emo","Pop Punk","Electronic"], artists: ["Eminem","Beyoncé","50 Cent","Usher","Nelly"], charts: { Pop: 90, "Hip-Hop": 95, Emo: 65, Electronic: 60 } },
    fashion: { trends: ["Low-rise jeans","Von Dutch hats","Juicy Couture tracksuits","Flip phones as accessories","UGG boots"], icons: ["Paris Hilton","Britney Spears"] },
    events: ["9/11 attacks (2001)","Iraq War (2003)","Hurricane Katrina (2005)","iPhone launch (2007)","Financial crisis (2008)"],
    tech: ["iPod","Facebook","YouTube","Twitter","HD DVD vs Blu-ray"],
    pop_culture: ["American Idol","MySpace","Harry Potter","The Sopranos","Jackass"],
    vibe: "Digital revolution and shock of the new",
  },
  "2010s": {
    emoji: "🤳",
    tagline: "Social Media & Streaming",
    color: "#c47aa4",
    music: { genres: ["Pop","Hip-Hop","EDM","Indie","K-Pop"], artists: ["Drake","Taylor Swift","Kendrick Lamar","BTS","Ed Sheeran"], charts: { Pop: 90, "Hip-Hop": 95, EDM: 80, "K-Pop": 70 } },
    fashion: { trends: ["Athleisure","Normcore","Instagram aesthetic","Hypebeast sneakers","Gender-fluid fashion"], icons: ["Rihanna","Kanye West"] },
    events: ["Arab Spring (2011)","Obamacare (2010)","Marriage equality (2015)","Trump elected (2016)","Brexit (2016)"],
    tech: ["Instagram","Snapchat","Tesla Model S","Apple Watch","4K streaming"],
    pop_culture: ["Game of Thrones","Avengers","TikTok (late)","K-Pop global","Netflix & Chill"],
    vibe: "Connectivity, identity politics, and disruption",
  },
};

const DECADES = Object.keys(DECADE_DATA);

function DecadeColumn({ decade, data, side }) {
  const [activeSection, setActiveSection] = useState("music");
  const sections = ["music","fashion","events","tech","pop_culture"];
  const sectionLabels = { music: "🎵 Music", fashion: "👗 Fashion", events: "📰 Events", tech: "💡 Tech", pop_culture: "🎬 Culture" };

  return (
    <div style={{ flex: 1, minWidth: 0, background: "#111827", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(135deg, ${data.color}33, #1f2937)`, padding: "20px 16px", textAlign: "center", borderBottom: `2px solid ${data.color}44` }}>
        <div style={{ fontSize: 40, marginBottom: 6 }}>{data.emoji}</div>
        <h2 style={{ color: data.color, fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>{decade}</h2>
        <div style={{ color: "#9ca3af", fontSize: 13 }}>{data.tagline}</div>
        <div style={{ color: "#6b7280", fontSize: 12, marginTop: 4, fontStyle: "italic" }}>"{data.vibe}"</div>
      </div>

      <div style={{ display: "flex", gap: 4, padding: "10px 10px 0", flexWrap: "wrap" }}>
        {sections.map(s => (
          <button key={s} onClick={() => setActiveSection(s)} style={{
            padding: "5px 10px", borderRadius: 99, fontSize: 11, fontWeight: 700, cursor: "pointer", border: "none",
            background: activeSection === s ? data.color : "#1f2937",
            color: activeSection === s ? "#000" : "#9ca3af",
          }}>{sectionLabels[s]}</button>
        ))}
      </div>

      <div style={{ padding: "16px" }}>
        {activeSection === "music" && (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Genres</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {data.music.genres.map((g, i) => (
                  <span key={i} style={{ background: data.color + "22", color: data.color, border: `1px solid ${data.color}44`, borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{g}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Key Artists</div>
              {data.music.artists.map((a, i) => (
                <div key={i} style={{ color: "#e5e7eb", fontSize: 13, padding: "4px 0", borderBottom: "1px solid #1f2937" }}>🎤 {a}</div>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Genre Dominance</div>
              {Object.entries(data.music.charts).map(([genre, score]) => (
                <div key={genre} style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ color: "#d1d5db", fontSize: 12 }}>{genre}</span>
                    <span style={{ color: data.color, fontSize: 12, fontWeight: 700 }}>{score}%</span>
                  </div>
                  <div style={{ background: "#1f2937", borderRadius: 99, height: 6 }}>
                    <div style={{ background: data.color, width: `${score}%`, height: 6, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {activeSection === "fashion" && (
          <>
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Trends</div>
              {data.fashion.trends.map((t, i) => (
                <div key={i} style={{ color: "#e5e7eb", fontSize: 13, padding: "5px 0", borderBottom: "1px solid #1f2937" }}>👗 {t}</div>
              ))}
            </div>
            <div>
              <div style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>Fashion Icons</div>
              {data.fashion.icons.map((ic, i) => (
                <div key={i} style={{ color: data.color, fontSize: 13, fontWeight: 600, padding: "4px 0" }}>⭐ {ic}</div>
              ))}
            </div>
          </>
        )}
        {activeSection === "events" && data.events.map((e, i) => (
          <div key={i} style={{ color: "#e5e7eb", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #1f2937" }}>📌 {e}</div>
        ))}
        {activeSection === "tech" && data.tech.map((t, i) => (
          <div key={i} style={{ color: "#e5e7eb", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #1f2937" }}>💡 {t}</div>
        ))}
        {activeSection === "pop_culture" && data.pop_culture.map((p, i) => (
          <div key={i} style={{ color: "#e5e7eb", fontSize: 13, padding: "6px 0", borderBottom: "1px solid #1f2937" }}>🎬 {p}</div>
        ))}
      </div>
    </div>
  );
}

export default function CompareDecades() {
  const [decadeA, setDecadeA] = useState("1960s");
  const [decadeB, setDecadeB] = useState("1980s");

  return (
    <div style={{ background: "#07070e", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1f2937, #111827)", borderBottom: "2px solid #C9A84C33", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>⚖️</div>
        <h1 style={{ color: "#C9A84C", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Compare Decades</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Select two decades and compare music, fashion, events, and culture side by side</p>
      </div>

      {/* Decade pickers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, maxWidth: 800, margin: "24px auto", padding: "0 16px", alignItems: "center" }}>
        <div>
          <div style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Decade A</div>
          <select value={decadeA} onChange={e => setDecadeA(e.target.value)} style={{ width: "100%", background: "#1f2937", border: "2px solid #374151", borderRadius: 10, padding: "10px 12px", color: "#f3f4f6", fontSize: 15, fontWeight: 700 }}>
            {DECADES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div style={{ fontSize: 28, color: "#C9A84C", fontWeight: 900, textAlign: "center" }}>VS</div>
        <div>
          <div style={{ color: "#9ca3af", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Decade B</div>
          <select value={decadeB} onChange={e => setDecadeB(e.target.value)} style={{ width: "100%", background: "#1f2937", border: "2px solid #374151", borderRadius: 10, padding: "10px 12px", color: "#f3f4f6", fontSize: 15, fontWeight: 700 }}>
            {DECADES.filter(d => d !== decadeA).map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Split screen comparison */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <DecadeColumn decade={decadeA} data={DECADE_DATA[decadeA]} side="left" />
        <DecadeColumn decade={decadeB} data={DECADE_DATA[decadeB]} side="right" />
      </div>
    </div>
  );
}
```
