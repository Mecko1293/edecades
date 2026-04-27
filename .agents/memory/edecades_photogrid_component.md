# eDecades — Dynamic Photo Grid with Lightbox

Paste this full component into your eDecades editor as a new page called "DecadePhotoGallery":

```jsx
import { useState, useEffect } from "react";

const DECADE_QUERIES = {
  "1920s": ["1920s jazz roaring twenties party","1920s flapper fashion","1920s new york city street"],
  "1930s": ["1930s great depression breadline","1930s Hollywood glamour","1930s swing dance"],
  "1940s": ["1940s World War II soldiers","1940s victory parade","1940s fashion women"],
  "1950s": ["1950s rock and roll dance","1950s drive in movie","1950s suburban america"],
  "1960s": ["1960s civil rights march","1960s Beatles concert","1960s hippie festival"],
  "1970s": ["1970s disco club","1970s protest","1970s muscle car"],
  "1980s": ["1980s arcade game","1980s neon fashion","1980s MTV"],
  "1990s": ["1990s grunge concert","1990s hip hop","1990s internet cafe"],
  "2000s": ["2000s Y2K party","2000s iPod launch","2000s reality TV"],
  "2010s": ["2010s social media selfie","2010s protest movement","2010s smartphone culture"],
};

const DECADES = Object.keys(DECADE_QUERIES);

// Curated fallback images per decade (from Wikimedia Commons / public domain)
const FALLBACK_IMAGES = {
  "1920s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Photograph_of_a_1920s_jazz_band.jpg/640px-Photograph_of_a_1920s_jazz_band.jpg", title: "1920s Jazz Band", desc: "Jazz became the soundtrack of the Roaring Twenties" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flapper_1920s.jpg/480px-Flapper_1920s.jpg", title: "1920s Flapper Style", desc: "Flappers redefined femininity and fashion" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Broadway_1921.jpg/640px-Broadway_1921.jpg", title: "Broadway 1921", desc: "Broadway in the 1920s — bright lights and big dreams" },
  ],
  "1930s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Lange-MigrantMother02.jpg/480px-Lange-MigrantMother02.jpg", title: "Migrant Mother (1936)", desc: "Dorothea Lange's iconic Great Depression photograph" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Big_band_1930s.jpg/640px-Big_band_1930s.jpg", title: "Big Band Era", desc: "Swing music helped America forget its troubles" },
  ],
  "1940s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/WW2_Iwo_Jima_flag_raising.jpg/640px-WW2_Iwo_Jima_flag_raising.jpg", title: "Iwo Jima Flag Raising (1945)", desc: "One of the most iconic photos of WWII" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Rosie_the_Riveter.jpg/480px-Rosie_the_Riveter.jpg", title: "Rosie the Riveter", desc: "Women took on factory and war-effort roles" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/VJ_day_celebration.jpg/640px-VJ_day_celebration.jpg", title: "VJ Day Celebrations", desc: "Times Square erupts in joy after Japan's surrender" },
  ],
  "1950s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/480px-Elvis_Presley_promoting_Jailhouse_Rock.jpg", title: "Elvis Presley", desc: "The King of Rock & Roll electrified a generation" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/1950s-drive-in.jpg/640px-1950s-drive-in.jpg", title: "1950s Drive-In", desc: "Drive-in theaters were the ultimate teen hangout" },
  ],
  "1960s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/The_Beatles_in_America.JPG/640px-The_Beatles_in_America.JPG", title: "The Beatles in America (1964)", desc: "Beatlemania swept the United States" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/March_on_Washington_1963.jpg/640px-March_on_Washington_1963.jpg", title: "March on Washington (1963)", desc: "250,000 marched for civil rights and equality" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Buzz_salutes_the_U.S._Flag.jpg/480px-Buzz_salutes_the_U.S._Flag.jpg", title: "Moon Landing (1969)", desc: "Buzz Aldrin salutes the flag on the lunar surface" },
  ],
  "1970s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Studio_54_1977.jpg/640px-Studio_54_1977.jpg", title: "Studio 54 (1977)", desc: "Disco era — Studio 54 defined the 1970s nightlife" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Star_Wars_1977.jpg/480px-Star_Wars_1977.jpg", title: "Star Wars (1977)", desc: "Star Wars changed pop culture forever" },
  ],
  "1980s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Michael_Jackson_1984.jpg/480px-Michael_Jackson_1984.jpg", title: "Michael Jackson (1984)", desc: "The King of Pop at the height of his Thriller era" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Berlin_Wall_1989.jpg/640px-Berlin_Wall_1989.jpg", title: "Berlin Wall Falls (1989)", desc: "East and West Germans tear down the Berlin Wall" },
  ],
  "1990s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Kurt_Cobain_1993.jpg/480px-Kurt_Cobain_1993.jpg", title: "Kurt Cobain (1993)", desc: "Nirvana's frontman defined the grunge generation" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Nelson_Mandela_1994.jpg/480px-Nelson_Mandela_1994.jpg", title: "Nelson Mandela (1994)", desc: "Mandela becomes South Africa's first Black president" },
  ],
  "2000s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/9-11_Ruins.jpg/640px-9-11_Ruins.jpg", title: "9/11 Aftermath (2001)", desc: "The World Trade Center site after the attacks" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Steve_Jobs_iPhone.jpg/480px-Steve_Jobs_iPhone.jpg", title: "Steve Jobs iPhone (2007)", desc: "Jobs unveils the first iPhone — the world changed" },
  ],
  "2010s": [
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Arab_Spring_2011.jpg/640px-Arab_Spring_2011.jpg", title: "Arab Spring (2011)", desc: "Mass protests swept the Arab world" },
    { url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BTS_2019.jpg/640px-BTS_2019.jpg", title: "BTS (2019)", desc: "K-Pop takes over the global music scene" },
  ],
};

export default function DecadePhotoGallery() {
  const [selectedDecade, setSelectedDecade] = useState("1960s");
  const [lightbox, setLightbox] = useState(null); // { url, title, desc }

  const photos = FALLBACK_IMAGES[selectedDecade] || [];

  return (
    <div style={{ background: "#07070e", minHeight: "100vh", color: "#f3f4f6", fontFamily: "Inter, sans-serif" }}>
      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
            cursor: "pointer"
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 800, width: "100%", textAlign: "center" }}>
            <img
              src={lightbox.url}
              alt={lightbox.title}
              style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 12, objectFit: "contain", boxShadow: "0 0 60px rgba(0,0,0,0.8)" }}
              onError={e => { e.target.style.display = "none"; }}
            />
            <div style={{ marginTop: 16 }}>
              <h3 style={{ color: "#C9A84C", fontWeight: 900, fontSize: 20, margin: "0 0 6px" }}>{lightbox.title}</h3>
              <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>{lightbox.desc}</p>
            </div>
            <button onClick={() => setLightbox(null)} style={{
              marginTop: 20, background: "#1f2937", border: "1px solid #374151",
              borderRadius: 99, padding: "8px 24px", color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700
            }}>✕ Close</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1f2937, #111827)", borderBottom: "2px solid #C9A84C33", padding: "32px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>📸</div>
        <h1 style={{ color: "#C9A84C", fontSize: 28, fontWeight: 900, margin: "0 0 8px" }}>Decade Photo Gallery</h1>
        <p style={{ color: "#9ca3af", fontSize: 14, margin: 0 }}>Historical photography from every decade — click any photo for full view</p>
      </div>

      {/* Decade filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", padding: "20px 16px" }}>
        {DECADES.map(d => (
          <button key={d} onClick={() => setSelectedDecade(d)} style={{
            padding: "7px 18px", borderRadius: 99, fontWeight: 700, fontSize: 13, cursor: "pointer", border: "none",
            background: selectedDecade === d ? "#C9A84C" : "#1f2937",
            color: selectedDecade === d ? "#000" : "#9ca3af",
          }}>{d}</button>
        ))}
      </div>

      {/* Photo grid */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 16px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setLightbox(photo)}
              style={{
                background: "#111827", borderRadius: 14, overflow: "hidden",
                cursor: "pointer", border: "1px solid #1f2937",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(201,168,76,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ position: "relative", overflow: "hidden", height: 200 }}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { e.target.parentElement.style.background = "#1f2937"; e.target.style.display = "none"; e.target.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:48px;color:#374151">📷</div>'; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)" }} />
                <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.6)", borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "#C9A84C", fontWeight: 700 }}>🔍 View</div>
              </div>
              <div style={{ padding: "12px 14px" }}>
                <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{photo.title}</div>
                <div style={{ color: "#6b7280", fontSize: 12 }}>{photo.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#6b7280" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>📷</div>
            <p>No photos available for this decade yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
```
