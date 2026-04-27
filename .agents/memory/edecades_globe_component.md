# eDecades — Interactive World Map Component

Paste this full component into your eDecades editor as a new page or section:

```jsx
import { useState } from "react";

const DECADE_REGIONS = {
  "1920s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Roaring Twenties", "Jazz Age", "Prohibition", "Stock Market Boom"] },
    { id: "GBR", name: "United Kingdom", x: 47, y: 28, emoji: "🇬🇧", events: ["British Empire peak", "Post-WWI recovery", "Flapper fashion"] },
    { id: "DEU", name: "Germany", x: 50, y: 27, emoji: "🇩🇪", events: ["Weimar Republic", "Bauhaus Movement", "Hyperinflation crisis"] },
    { id: "FRA", name: "France", x: 48, y: 30, emoji: "🇫🇷", events: ["Art Deco Paris", "Surrealist movement", "Lost Generation writers"] },
    { id: "RUS", name: "Soviet Union", x: 60, y: 25, emoji: "🇷🇺", events: ["USSR formation", "Lenin to Stalin", "Five-Year Plan begins"] },
  ],
  "1930s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Great Depression", "New Deal", "Dust Bowl", "Hollywood Golden Age"] },
    { id: "DEU", name: "Germany", x: 50, y: 27, emoji: "🇩🇪", events: ["Nazi rise to power", "Nuremberg Laws", "Rearmament"] },
    { id: "ESP", name: "Spain", x: 46, y: 33, emoji: "🇪🇸", events: ["Spanish Civil War", "Franco regime begins"] },
    { id: "JPN", name: "Japan", x: 78, y: 35, emoji: "🇯🇵", events: ["Imperial expansion", "Invasion of China", "Militarism rise"] },
    { id: "IND", name: "India", x: 65, y: 42, emoji: "🇮🇳", events: ["Gandhi's Salt March", "Civil Disobedience movement"] },
  ],
  "1940s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Pearl Harbor", "D-Day", "Manhattan Project", "Hiroshima & Nagasaki"] },
    { id: "GBR", name: "United Kingdom", x: 47, y: 28, emoji: "🇬🇧", events: ["Battle of Britain", "Churchill era", "V-E Day celebrations"] },
    { id: "DEU", name: "Germany", x: 50, y: 27, emoji: "🇩🇪", events: ["WWII aggression", "Holocaust", "Berlin falls 1945"] },
    { id: "JPN", name: "Japan", x: 78, y: 35, emoji: "🇯🇵", events: ["Pacific War", "Atomic bomb dropped", "MacArthur occupation"] },
    { id: "CHN", name: "China", x: 73, y: 38, emoji: "🇨🇳", events: ["Second Sino-Japanese War", "Civil War resumes", "Mao's Long March"] },
    { id: "ISR", name: "Israel/Palestine", x: 56, y: 38, emoji: "🕍", events: ["Holocaust refugee crisis", "Israel independence 1948"] },
  ],
  "1950s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Korean War", "McCarthyism", "Rock & Roll born", "Interstate Highway System"] },
    { id: "KOR", name: "Korea", x: 77, y: 35, emoji: "🇰🇷", events: ["Korean War 1950-53", "Division at 38th Parallel"] },
    { id: "GBR", name: "United Kingdom", x: 47, y: 28, emoji: "🇬🇧", events: ["Queen Elizabeth II crowned", "NHS expansion"] },
    { id: "RUS", name: "Soviet Union", x: 60, y: 25, emoji: "🇷🇺", events: ["Sputnik 1957", "Space Race begins", "Stalin dies 1953"] },
    { id: "CHN", name: "China", x: 73, y: 38, emoji: "🇨🇳", events: ["People's Republic founded", "Great Leap Forward planned"] },
    { id: "EGY", name: "Egypt", x: 53, y: 40, emoji: "🇪🇬", events: ["Suez Crisis 1956", "Nasser nationalizes canal"] },
  ],
  "1960s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Moon Landing", "Civil Rights Act", "JFK assassination", "Vietnam War escalation", "Woodstock"] },
    { id: "VNM", name: "Vietnam", x: 74, y: 44, emoji: "🇻🇳", events: ["Vietnam War", "Tet Offensive", "Ho Chi Minh trail"] },
    { id: "CUB", name: "Cuba", x: 23, y: 43, emoji: "🇨🇺", events: ["Bay of Pigs", "Cuban Missile Crisis 1962"] },
    { id: "AFR", name: "Africa", x: 51, y: 50, emoji: "🌍", events: ["Year of Africa 1960", "17 nations gain independence"] },
    { id: "CHN", name: "China", x: 73, y: 38, emoji: "🇨🇳", events: ["Cultural Revolution", "Great Famine", "First nuclear test"] },
    { id: "GBR", name: "United Kingdom", x: 47, y: 28, emoji: "🇬🇧", events: ["British Invasion (Beatles)", "Swinging London"] },
  ],
  "1970s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Watergate", "Vietnam War ends", "Disco era", "OPEC oil crisis"] },
    { id: "IRN", name: "Iran", x: 59, y: 38, emoji: "🇮🇷", events: ["Iranian Revolution 1979", "Ayatollah Khomeini"] },
    { id: "CHN", name: "China", x: 73, y: 38, emoji: "🇨🇳", events: ["Nixon visits China", "Mao dies 1976", "Gang of Four"] },
    { id: "LAM", name: "Latin America", x: 26, y: 58, emoji: "🌎", events: ["Military coups in Chile & Argentina", "Sandinista revolution"] },
    { id: "GBR", name: "United Kingdom", x: 47, y: 28, emoji: "🇬🇧", events: ["Punk movement", "IMF bailout 1976"] },
  ],
  "1980s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Reagan Revolution", "HIV/AIDS crisis", "MTV launches", "Crack epidemic"] },
    { id: "RUS", name: "Soviet Union", x: 60, y: 25, emoji: "🇷🇺", events: ["Gorbachev reforms", "Chernobyl 1986", "Afghan War", "Cold War ending"] },
    { id: "DEU", name: "Germany", x: 50, y: 27, emoji: "🇩🇪", events: ["Berlin Wall falls 1989", "Reunification planned"] },
    { id: "ZAF", name: "South Africa", x: 52, y: 62, emoji: "🇿🇦", events: ["Anti-Apartheid movement", "Mandela imprisoned", "Sanctions imposed"] },
    { id: "CHN", name: "China", x: 73, y: 38, emoji: "🇨🇳", events: ["Tiananmen Square 1989", "Economic reforms", "One Child Policy"] },
    { id: "GBR", name: "United Kingdom", x: 47, y: 28, emoji: "🇬🇧", events: ["Thatcher era", "Falklands War 1982"] },
  ],
  "1990s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Gulf War", "Clinton era boom", "Dot-com bubble", "Columbine"] },
    { id: "RUS", name: "Russia", x: 60, y: 25, emoji: "🇷🇺", events: ["USSR collapses 1991", "Chechen War", "Economic chaos"] },
    { id: "YUG", name: "Yugoslavia", x: 52, y: 31, emoji: "🇷🇸", events: ["Balkan Wars", "Ethnic cleansing", "NATO intervention"] },
    { id: "ZAF", name: "South Africa", x: 52, y: 62, emoji: "🇿🇦", events: ["Mandela freed 1990", "End of Apartheid", "First free elections"] },
    { id: "RWA", name: "Rwanda", x: 54, y: 54, emoji: "🇷🇼", events: ["Rwandan genocide 1994", "1 million killed in 100 days"] },
    { id: "CHN", name: "China", x: 73, y: 38, emoji: "🇨🇳", events: ["Hong Kong handover 1997", "WTO entry 2001"] },
  ],
  "2000s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["9/11 attacks", "Iraq War", "Hurricane Katrina", "iPhone launch 2007", "Financial crisis 2008"] },
    { id: "IRQ", name: "Iraq", x: 58, y: 38, emoji: "🇮🇶", events: ["U.S. invasion 2003", "Saddam Hussein captured", "Sectarian civil war"] },
    { id: "AFG", name: "Afghanistan", x: 62, y: 37, emoji: "🇦🇫", events: ["U.S. invasion 2001", "Taliban ousted", "Ongoing insurgency"] },
    { id: "CHN", name: "China", x: 73, y: 38, emoji: "🇨🇳", events: ["WTO membership", "Beijing Olympics 2008", "SARS epidemic 2003"] },
    { id: "IND", name: "India", x: 65, y: 42, emoji: "🇮🇳", events: ["Tech boom Bangalore", "Nuclear tests", "Mumbai attacks 2008"] },
  ],
  "2010s": [
    { id: "USA", name: "United States", x: 18, y: 38, emoji: "🇺🇸", events: ["Obama era", "Obamacare", "Marriage equality 2015", "Trump elected 2016"] },
    { id: "MID", name: "Middle East", x: 56, y: 38, emoji: "🌙", events: ["Arab Spring 2011", "Syrian Civil War", "ISIS rise and fall"] },
    { id: "CHN", name: "China", x: 73, y: 38, emoji: "🇨🇳", events: ["Belt & Road Initiative", "South China Sea tensions", "Xi Jinping consolidates power"] },
    { id: "EUR", name: "Europe", x: 49, y: 29, emoji: "🇪🇺", events: ["Brexit vote 2016", "European refugee crisis", "Greece debt crisis"] },
    { id: "RUS", name: "Russia", x: 60, y: 25, emoji: "🇷🇺", events: ["Crimea annexation 2014", "Ukraine war begins", "Election interference"] },
    { id: "KOR", name: "South Korea", x: 77, y: 35, emoji: "🇰🇷", events: ["K-Pop goes global", "BTS breakout", "Samsung smartphone wars"] },
  ],
};

const DECADES = ["1920s","1930s","1940s","1950s","1960s","1970s","1980s","1990s","2000s","2010s"];

export default function DecadeWorldMap() {
  const [selectedDecade, setSelectedDecade] = useState("1960s");
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);

  const regions = DECADE_REGIONS[selectedDecade] || [];

  return (
    <div style={{ background: "#07070e", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1f2937, #111827)", borderBottom: "2px solid #C9A84C33", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌍</div>
        <h1 style={{ color: "#C9A84C", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>World Events by Decade</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Select a decade to see key historical events around the globe</p>
      </div>

      {/* Decade selector */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", padding: "20px 16px" }}>
        {DECADES.map(d => (
          <button key={d} onClick={() => { setSelectedDecade(d); setSelectedRegion(null); }} style={{
            padding: "7px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13, cursor: "pointer", border: "none",
            background: selectedDecade === d ? "#C9A84C" : "#1f2937",
            color: selectedDecade === d ? "#000" : "#9ca3af",
          }}>{d}</button>
        ))}
      </div>

      {/* Map */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 20px" }}>
        <div style={{ background: "#0a1628", border: "2px solid #1f2937", borderRadius: 20, padding: "24px", position: "relative", minHeight: 380 }}>
          {/* Stylized world map background */}
          <svg viewBox="0 0 100 70" style={{ width: "100%", height: "auto", position: "absolute", inset: 0 }}>
            {/* Continent outlines (simplified) */}
            <rect width="100" height="70" fill="#0a1628" />
            <ellipse cx="20" cy="40" rx="12" ry="14" fill="#1a2535" opacity="0.6" />
            <ellipse cx="25" cy="58" rx="8" ry="9" fill="#1a2535" opacity="0.5" />
            <ellipse cx="48" cy="30" rx="8" ry="7" fill="#1a2535" opacity="0.6" />
            <ellipse cx="55" cy="52" rx="8" ry="10" fill="#1a2535" opacity="0.5" />
            <ellipse cx="60" cy="30" rx="12" ry="10" fill="#1a2535" opacity="0.6" />
            <ellipse cx="74" cy="35" rx="7" ry="8" fill="#1a2535" opacity="0.6" />
            <ellipse cx="74" cy="55" rx="6" ry="8" fill="#1a2535" opacity="0.5" />
            <ellipse cx="85" cy="48" rx="5" ry="7" fill="#1a2535" opacity="0.4" />
          </svg>

          {/* Region pins */}
          {regions.map(region => (
            <div
              key={region.id}
              onClick={() => setSelectedRegion(selectedRegion?.id === region.id ? null : region)}
              onMouseEnter={() => setHoveredRegion(region.id)}
              onMouseLeave={() => setHoveredRegion(null)}
              style={{
                position: "absolute",
                left: `${region.x}%`,
                top: `${region.y}%`,
                transform: "translate(-50%, -50%)",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: selectedRegion?.id === region.id ? "#C9A84C" : hoveredRegion === region.id ? "#C9A84C88" : "#1f2937",
                border: `2px solid ${selectedRegion?.id === region.id ? "#C9A84C" : "#374151"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, transition: "all 0.2s",
                boxShadow: selectedRegion?.id === region.id ? "0 0 20px #C9A84C66" : "none",
              }}>
                {region.emoji}
              </div>
              {(hoveredRegion === region.id || selectedRegion?.id === region.id) && (
                <div style={{
                  position: "absolute", bottom: "110%", left: "50%", transform: "translateX(-50%)",
                  background: "#111827", border: "1px solid #374151", borderRadius: 8,
                  padding: "4px 10px", whiteSpace: "nowrap", fontSize: 11, color: "#e5e7eb", fontWeight: 700,
                  pointerEvents: "none"
                }}>{region.name}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Selected region detail */}
      {selectedRegion && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 40px" }}>
          <div style={{ background: "#111827", border: "2px solid #C9A84C44", borderRadius: 16, padding: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ fontSize: 36 }}>{selectedRegion.emoji}</div>
              <div>
                <h3 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20, margin: 0 }}>{selectedRegion.name}</h3>
                <div style={{ color: "#6b7280", fontSize: 13 }}>Key events in the {selectedDecade}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {selectedRegion.events.map((event, i) => (
                <div key={i} style={{
                  background: "#1f2937", border: "1px solid #374151", borderRadius: 99,
                  padding: "6px 14px", fontSize: 13, color: "#e5e7eb"
                }}>
                  📌 {event}
                </div>
              ))}
            </div>
            <button onClick={() => setSelectedRegion(null)} style={{
              marginTop: 16, background: "transparent", border: "1px solid #374151",
              borderRadius: 8, padding: "6px 14px", color: "#6b7280", cursor: "pointer", fontSize: 12
            }}>✕ Close</button>
          </div>
        </div>
      )}

      {/* Region list */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 60px" }}>
        <h3 style={{ color: "#C9A84C", fontWeight: 800, marginBottom: 16, fontSize: 15 }}>🌏 {selectedDecade} — Active Regions ({regions.length})</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
          {regions.map(region => (
            <div key={region.id} onClick={() => setSelectedRegion(region)} style={{
              background: "#111827", border: `1px solid ${selectedRegion?.id === region.id ? "#C9A84C" : "#1f2937"}`,
              borderRadius: 12, padding: "12px 14px", cursor: "pointer",
              transition: "border-color 0.2s"
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{region.emoji}</div>
              <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 14 }}>{region.name}</div>
              <div style={{ color: "#6b7280", fontSize: 11, marginTop: 2 }}>{region.events.length} key events</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```
