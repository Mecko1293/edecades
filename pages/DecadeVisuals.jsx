import { useState } from "react";

const DECADE_DATA = {
  "1920s": {
    emoji:"🎷", tagline:"The Roaring Twenties", color:"#d4956e",
    wage:"$0.45/hr", inflation:"2.4%", unemployment:"5.2%", lifeExpectancy:"57 yrs",
    topSong:"Ain't Misbehavin' — Fats Waller", topMovie:"The Jazz Singer (1927)",
    music:{ genres:["Jazz","Blues","Ragtime","Gospel"], popularity:[85,65,55,40] },
    fashion:["Flapper dresses","Cloche hats","Bobbed hair","Pinstripe suits","Art Deco jewelry"],
    fashionIcons:["Coco Chanel","Josephine Baker"],
    events:["Prohibition (1920-1933)","Women's Suffrage (1920)","Harlem Renaissance","Stock Market Crash (1929)"],
    tech:["Talking pictures","Commercial radio","Home refrigerators","Penicillin discovered (1928)"],
    culture:["Charleston dance","Speakeasies","Jazz clubs","Rise of cinema","Art Deco"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/New_york_times_square_1920.jpg/640px-New_york_times_square_1920.jpg",caption:"Times Square 1920s"},
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/ODJB.jpg/480px-ODJB.jpg",caption:"Original Dixieland Jazz Band"},
    ],
  },
  "1930s": {
    emoji:"🎬", tagline:"The Golden Age of Hollywood", color:"#b8a88a",
    wage:"$0.30/hr", inflation:"-2.1%", unemployment:"24.9%", lifeExpectancy:"60 yrs",
    topSong:"Over the Rainbow — Judy Garland", topMovie:"Gone with the Wind (1939)",
    music:{ genres:["Swing","Big Band","Blues","Country"], popularity:[85,80,65,50] },
    fashion:["Bias-cut silk gowns","Wide-leg trousers","Fedora hats","Platform shoes","Utility wear"],
    fashionIcons:["Marlene Dietrich","Katharine Hepburn"],
    events:["Great Depression","The New Deal","Rise of Fascism","Spanish Civil War","Social Security Act"],
    tech:["Nylon invented","Radar developed","Jet engine prototype","Color film"],
    culture:["Hollywood musicals","Radio dramas","Superman comic (1938)","Shirley Temple"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Lange-MigrantMother02.jpg/480px-Lange-MigrantMother02.jpg",caption:"Migrant Mother — Dorothea Lange (1936)"},
    ],
  },
  "1940s": {
    emoji:"✈️", tagline:"War Years & Victory", color:"#7a9abf",
    wage:"$0.65/hr", inflation:"5.8%", unemployment:"4.7%", lifeExpectancy:"65 yrs",
    topSong:"White Christmas — Bing Crosby", topMovie:"Casablanca (1942)",
    music:{ genres:["Big Band","Bebop","Country","Gospel"], popularity:[80,60,55,50] },
    fashion:["Military-shoulder silhouettes","Rosie the Riveter look","Victory Rolls","Utility dresses"],
    fashionIcons:["Rita Hayworth","Veronica Lake"],
    events:["World War II (1939-1945)","Pearl Harbor (1941)","D-Day (1944)","Atomic bomb (1945)","UN founded"],
    tech:["Atomic bomb","Microwave oven","ENIAC computer","Penicillin mass production","Jet aircraft"],
    culture:["War films","Pin-up culture","USO shows","Rosie the Riveter","Baby Boom begins"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/640px-Into_the_Jaws_of_Death_23-0455M_edit.jpg",caption:"D-Day — Normandy Beach (1944)"},
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/We_Can_Do_It%21.jpg/480px-We_Can_Do_It%21.jpg",caption:"Rosie the Riveter"},
    ],
  },
  "1950s": {
    emoji:"🎸", tagline:"Rock & Roll Is Born", color:"#d4788a",
    wage:"$1.00/hr", inflation:"1.3%", unemployment:"4.5%", lifeExpectancy:"68 yrs",
    topSong:"Hound Dog — Elvis Presley", topMovie:"Singin' in the Rain (1952)",
    music:{ genres:["Rock & Roll","R&B","Country","Doo-Wop"], popularity:[90,75,60,55] },
    fashion:["Poodle skirts","Greaser leather jackets","New Look hourglass","Cat-eye sunglasses","Saddle shoes"],
    fashionIcons:["Marilyn Monroe","James Dean"],
    events:["Korean War (1950-53)","Brown v. Board (1954)","Rosa Parks (1955)","Sputnik (1957)"],
    tech:["Color TV","Credit cards","DNA double helix","Polio vaccine","Transistor radio"],
    culture:["Drive-in movies","Diners","Rock & roll","I Love Lucy","Teenage culture emerges"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Elvis_Presley_promoting_Jailhouse_Rock.jpg/480px-Elvis_Presley_promoting_Jailhouse_Rock.jpg",caption:"Elvis Presley"},
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Rosa_Parks_Bus.jpg/480px-Rosa_Parks_Bus.jpg",caption:"Rosa Parks Bus — 1955"},
    ],
  },
  "1960s": {
    emoji:"☮️", tagline:"Peace, Love & Revolution", color:"#c4956e",
    wage:"$1.25/hr", inflation:"2.3%", unemployment:"5.5%", lifeExpectancy:"70 yrs",
    topSong:"I Want to Hold Your Hand — The Beatles", topMovie:"The Graduate (1967)",
    music:{ genres:["Rock","Soul","Folk","Psychedelic","Motown"], popularity:[90,80,65,60,75] },
    fashion:["Mini skirts","Mod geometric prints","Tie-dye","Bell-bottoms","Go-go boots"],
    fashionIcons:["Twiggy","Jackie Kennedy"],
    events:["JFK assassination (1963)","Civil Rights Act (1964)","Moon Landing (1969)","Woodstock (1969)","Vietnam War"],
    tech:["ARPANET/Internet (1969)","Apollo 11","Laser","Cassette tape","Heart transplant"],
    culture:["British Invasion","Hippie movement","Psychedelia","Civil rights marches","Space Race"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/The_Beatles_in_America.JPG/640px-The_Beatles_in_America.JPG",caption:"The Beatles arrive in America — 1964"},
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Buzz_salutes_the_U.S._Flag.jpg/480px-Buzz_salutes_the_U.S._Flag.jpg",caption:"Moon Landing — 1969"},
    ],
  },
  "1970s": {
    emoji:"🕺", tagline:"Funk, Disco & Soul", color:"#c4784f",
    wage:"$2.30/hr", inflation:"7.4%", unemployment:"8.5%", lifeExpectancy:"72 yrs",
    topSong:"Stayin' Alive — Bee Gees", topMovie:"Star Wars (1977)",
    music:{ genres:["Disco","Funk","Rock","Hip-Hop","Punk"], popularity:[85,75,80,55,55] },
    fashion:["Bell-bottoms","Platform shoes","Leisure suits","Mood rings","Halter tops"],
    fashionIcons:["Farrah Fawcett","David Bowie"],
    events:["Watergate scandal","Vietnam ends (1975)","Oil crisis","Roe v. Wade (1973)","Iran Revolution (1979)"],
    tech:["Personal computer (1975)","VCR","MRI scanner","Atari 2600","Space Shuttle designed"],
    culture:["Disco clubs","Saturday Night Fever","Star Wars","Charlie's Angels","Roller skating rinks"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Woodstock_redmond_stage.JPG/640px-Woodstock_redmond_stage.JPG",caption:"Festival Culture — 1970s"},
    ],
  },
  "1980s": {
    emoji:"🕹️", tagline:"Neon, Power & Pop", color:"#b87ac4",
    wage:"$3.35/hr", inflation:"5.1%", unemployment:"10.8%", lifeExpectancy:"74 yrs",
    topSong:"Thriller — Michael Jackson", topMovie:"E.T. the Extra-Terrestrial (1982)",
    music:{ genres:["Pop","New Wave","Hip-Hop","Heavy Metal","R&B"], popularity:[90,75,70,65,70] },
    fashion:["Power shoulders","Leg warmers","Acid-wash jeans","Big hair","Scrunchies"],
    fashionIcons:["Madonna","Princess Diana"],
    events:["Reagan Revolution","HIV/AIDS crisis","Berlin Wall falls (1989)","Chernobyl (1986)","Tiananmen Square (1989)"],
    tech:["IBM PC (1981)","CD player","DNA fingerprinting","Pac-Man","Nintendo NES"],
    culture:["MTV launches","Video game boom","Back to the Future","Ghostbusters","The Breakfast Club"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/West_and_East_Germans_at_the_Berlin_Wall.jpg/640px-West_and_East_Germans_at_the_Berlin_Wall.jpg",caption:"Berlin Wall Falls — November 1989"},
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Macintosh_128k_transparency.png/480px-Macintosh_128k_transparency.png",caption:"Apple Macintosh — 1984"},
    ],
  },
  "1990s": {
    emoji:"📼", tagline:"Grunge, Hip-Hop & the Web", color:"#7aaa8a",
    wage:"$4.25/hr", inflation:"3.0%", unemployment:"7.4%", lifeExpectancy:"75 yrs",
    topSong:"Smells Like Teen Spirit — Nirvana", topMovie:"Titanic (1997)",
    music:{ genres:["Grunge","Hip-Hop","R&B","Pop","Alternative"], popularity:[80,90,85,88,75] },
    fashion:["Grunge flannel","Baggy jeans","Slip dresses","Frosted tips","JNCO jeans"],
    fashionIcons:["Kate Moss","Kurt Cobain"],
    events:["Gulf War (1991)","Oklahoma City bombing (1995)","OJ Simpson trial","Columbine (1999)","Clinton impeachment"],
    tech:["World Wide Web","DVD","Dolly the sheep cloned","Game Boy Color","MP3 player"],
    culture:["Friends TV show","Titanic","Tamagotchi","AOL Instant Messenger","Beanie Babies"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/NirvanaNevermindalbumcover.jpg/400px-NirvanaNevermindalbumcover.jpg",caption:"Nirvana — Nevermind (1991)"},
    ],
  },
  "2000s": {
    emoji:"💿", tagline:"Y2K & the Digital Age", color:"#7aaac4",
    wage:"$5.15/hr", inflation:"2.8%", unemployment:"6.0%", lifeExpectancy:"77 yrs",
    topSong:"Crazy in Love — Beyoncé", topMovie:"The Dark Knight (2008)",
    music:{ genres:["Pop","Hip-Hop","Emo","Pop Punk","Electronic"], popularity:[90,95,65,60,60] },
    fashion:["Low-rise jeans","Von Dutch hats","Juicy Couture tracksuits","UGG boots","Bling jewelry"],
    fashionIcons:["Paris Hilton","Britney Spears"],
    events:["9/11 attacks (2001)","Iraq War (2003)","Hurricane Katrina (2005)","iPhone launch (2007)","Financial crisis (2008)"],
    tech:["iPod","Facebook","YouTube","Twitter","HD DVD vs Blu-ray"],
    culture:["American Idol","MySpace","Harry Potter","The Sopranos","Jackass"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/South_face_tower_two.jpg/480px-South_face_tower_two.jpg",caption:"9/11 — September 11, 2001"},
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/480px-President_Barack_Obama.jpg",caption:"Barack Obama elected — 2008"},
    ],
  },
  "2010s": {
    emoji:"📱", tagline:"Social Media & Streaming", color:"#c47aa4",
    wage:"$7.25/hr", inflation:"1.7%", unemployment:"9.6%", lifeExpectancy:"78 yrs",
    topSong:"Shape of You — Ed Sheeran", topMovie:"Avengers: Endgame (2019)",
    music:{ genres:["Pop","Hip-Hop","EDM","Indie","K-Pop"], popularity:[90,95,80,70,70] },
    fashion:["Athleisure","Normcore","Hypebeast sneakers","Gender-fluid fashion","Instagram aesthetic"],
    fashionIcons:["Rihanna","Kanye West"],
    events:["Arab Spring (2011)","Obamacare (2010)","Marriage equality (2015)","Trump elected (2016)","Brexit (2016)"],
    tech:["Instagram","Snapchat","Tesla Model S","Apple Watch","4K streaming"],
    culture:["Game of Thrones","Avengers","TikTok launch","K-Pop global","Netflix streaming"],
    photos:[
      {url:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Barack_Obama_signature_health_care_20100323.jpg/640px-Barack_Obama_signature_health_care_20100323.jpg",caption:"Obamacare Signed — 2010"},
    ],
  },
};

const DECADES = Object.keys(DECADE_DATA);
const DECADE_EMOJIS = Object.fromEntries(DECADES.map(d => [d, DECADE_DATA[d].emoji]));

function MiniBarChart({ genres, values, color }) {
  const max = Math.max(...values, 1);
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80, marginTop:8 }}>
      {genres.map((g,i) => (
        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
          <div style={{ fontSize:9, color:"#6b7280", fontWeight:700 }}>{values[i]}</div>
          <div style={{ width:"100%", background: color+"88", borderRadius:"3px 3px 0 0", height:`${Math.max((values[i]/max)*56,4)}px`, border:`1px solid ${color}44`, transition:"height 0.6s" }} />
          <div style={{ fontSize:8, color:"#9ca3af", textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:28 }}>{g}</div>
        </div>
      ))}
    </div>
  );
}

function DecadeColumn({ decade, data, side }) {
  const [activeTab, setActiveTab] = useState("stats");
  const tabs = ["stats","music","fashion","events","tech","culture"];
  const tabLabels = { stats:"📊 Stats", music:"🎵 Music", fashion:"👗 Fashion", events:"📰 Events", tech:"💡 Tech", culture:"🎬 Culture" };
  const [lightbox, setLightbox] = useState(null);

  return (
    <div style={{ flex:1, minWidth:0, background:"#111827", borderRadius:16, overflow:"hidden", border:`2px solid ${data.color}33` }}>
      {lightbox && (
        <div onClick={()=>setLightbox(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", cursor:"zoom-out", padding:24 }}>
          <div onClick={e=>e.stopPropagation()} style={{ maxWidth:700, width:"100%", textAlign:"center" }}>
            <img src={lightbox.url} alt={lightbox.caption} style={{ maxWidth:"100%", maxHeight:"70vh", borderRadius:12, objectFit:"contain" }} onError={e=>e.target.style.display="none"} />
            <p style={{ color:"#C9A84C", fontWeight:700, marginTop:12 }}>{lightbox.caption}</p>
            <button onClick={()=>setLightbox(null)} style={{ background:"#1f2937", border:"1px solid #374151", borderRadius:99, padding:"7px 20px", color:"#fff", cursor:"pointer", marginTop:8 }}>✕ Close</button>
          </div>
        </div>
      )}
      <div style={{ background:`linear-gradient(135deg, ${data.color}33, #1f2937)`, padding:"18px 16px", textAlign:"center", borderBottom:`2px solid ${data.color}44` }}>
        <div style={{ fontSize:36, marginBottom:4 }}>{data.emoji}</div>
        <h2 style={{ color:data.color, fontWeight:900, fontSize:22, margin:"0 0 3px" }}>{decade}</h2>
        <div style={{ color:"#9ca3af", fontSize:12 }}>{data.tagline}</div>
      </div>
      <div style={{ display:"flex", gap:4, padding:"8px 8px 0", flexWrap:"wrap" }}>
        {tabs.map(t => (
          <button key={t} onClick={()=>setActiveTab(t)} style={{ padding:"4px 10px", borderRadius:99, fontSize:10, fontWeight:700, cursor:"pointer", border:"none", background:activeTab===t ? data.color : "#1f2937", color:activeTab===t ? "#000" : "#9ca3af" }}>{tabLabels[t]}</button>
        ))}
      </div>
      <div style={{ padding:"14px 14px 20px" }}>
        {activeTab==="stats" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {[["💵 Avg Wage",data.wage,"#22c55e"],["📈 Inflation",data.inflation,"#f97316"],["👥 Unemployment",data.unemployment,"#ef4444"],["❤️ Life Expectancy",data.lifeExpectancy,"#a78bfa"],["🎵 Top Song",data.topSong,"#eab308"],["🎬 Top Movie",data.topMovie,"#60a5fa"]].map(([label,val,col],i)=>(
              <div key={i} style={{ background:"#1f2937", borderRadius:10, padding:"10px 12px", gridColumn:i>=4?"span 2":undefined }}>
                <div style={{ color:"#6b7280", fontSize:10, fontWeight:700 }}>{label}</div>
                <div style={{ color:col, fontWeight:800, fontSize:i>=4?12:18, marginTop:2 }}>{val}</div>
              </div>
            ))}
            {data.photos?.length>0 && (
              <div style={{ gridColumn:"span 2", marginTop:8 }}>
                <div style={{ color:"#6b7280", fontSize:10, fontWeight:700, marginBottom:6 }}>📸 PHOTOS</div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  {data.photos.map((p,i)=>(
                    <img key={i} src={p.url} alt={p.caption} onClick={()=>setLightbox(p)} style={{ height:80, borderRadius:8, cursor:"zoom-in", objectFit:"cover", flex:1, minWidth:80 }} onError={e=>e.target.style.display="none"} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab==="music" && (
          <>
            <div style={{ marginBottom:10 }}>
              {data.music.genres.map((g,i)=>(
                <div key={i} style={{ marginBottom:7 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ color:"#d1d5db", fontSize:12 }}>{g}</span>
                    <span style={{ color:data.color, fontSize:12, fontWeight:700 }}>{data.music.popularity[i]}%</span>
                  </div>
                  <div style={{ background:"#1f2937", borderRadius:99, height:6 }}>
                    <div style={{ background:data.color, width:`${data.music.popularity[i]}%`, height:6, borderRadius:99, transition:"width 0.6s" }} />
                  </div>
                </div>
              ))}
            </div>
            <MiniBarChart genres={data.music.genres} values={data.music.popularity} color={data.color} />
          </>
        )}
        {activeTab==="fashion" && (
          <>
            {data.fashion.map((f,i)=><div key={i} style={{ color:"#e5e7eb", fontSize:13, padding:"5px 0", borderBottom:"1px solid #1f2937" }}>👗 {f}</div>)}
            <div style={{ marginTop:12, color:"#6b7280", fontSize:11, fontWeight:700, textTransform:"uppercase" }}>Icons</div>
            {data.fashionIcons.map((ic,i)=><div key={i} style={{ color:data.color, fontSize:13, fontWeight:600, padding:"4px 0" }}>⭐ {ic}</div>)}
          </>
        )}
        {activeTab==="events" && data.events.map((e,i)=><div key={i} style={{ color:"#e5e7eb", fontSize:13, padding:"6px 0", borderBottom:"1px solid #1f2937" }}>📌 {e}</div>)}
        {activeTab==="tech" && data.tech.map((t,i)=><div key={i} style={{ color:"#e5e7eb", fontSize:13, padding:"6px 0", borderBottom:"1px solid #1f2937" }}>💡 {t}</div>)}
        {activeTab==="culture" && data.culture.map((c,i)=><div key={i} style={{ color:"#e5e7eb", fontSize:13, padding:"6px 0", borderBottom:"1px solid #1f2937" }}>🎬 {c}</div>)}
      </div>
    </div>
  );
}

export default function DecadeVisuals() {
  const [decadeA, setDecadeA] = useState("1960s");
  const [decadeB, setDecadeB] = useState("1980s");
  const [mode, setMode] = useState("compare"); // compare | single
  const [singleDecade, setSingleDecade] = useState("1960s");

  const dataA = DECADE_DATA[decadeA];
  const dataB = DECADE_DATA[decadeB];

  // Economic comparison bars
  const parseNum = (s) => parseFloat(String(s).replace(/[^0-9.-]/g,"")) || 0;
  const ecoStats = [
    { label:"Avg Hourly Wage", a:parseNum(dataA.wage), b:parseNum(dataB.wage), unit:"$", color:"#22c55e" },
    { label:"Inflation Rate", a:Math.abs(parseNum(dataA.inflation)), b:Math.abs(parseNum(dataB.inflation)), unit:"%", color:"#f97316" },
    { label:"Unemployment", a:parseNum(dataA.unemployment), b:parseNum(dataB.unemployment), unit:"%", color:"#ef4444" },
    { label:"Life Expectancy", a:parseNum(dataA.lifeExpectancy), b:parseNum(dataB.lifeExpectancy), unit:" yrs", color:"#a78bfa" },
  ];

  return (
    <div style={{ background:"#07070e", minHeight:"100vh", color:"#f3f4f6", fontFamily:"Inter, sans-serif" }}>
      <div style={{ background:"linear-gradient(135deg, #1f2937, #111827)", borderBottom:"2px solid #C9A84C33", padding:"36px 24px", textAlign:"center" }}>
        <div style={{ fontSize:44, marginBottom:8 }}>⚖️</div>
        <h1 style={{ color:"#C9A84C", fontSize:28, fontWeight:900, margin:"0 0 8px" }}>Compare Decades</h1>
        <p style={{ color:"#9ca3af", fontSize:14, margin:"0 0 20px" }}>Side-by-side stats, music, fashion, events & culture</p>
        <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
          <button onClick={()=>setMode("compare")} style={{ padding:"8px 20px", borderRadius:99, fontWeight:700, fontSize:13, cursor:"pointer", border:"none", background:mode==="compare"?"#C9A84C":"#1f2937", color:mode==="compare"?"#000":"#9ca3af" }}>⚖️ Compare Two</button>
          <button onClick={()=>setMode("single")} style={{ padding:"8px 20px", borderRadius:99, fontWeight:700, fontSize:13, cursor:"pointer", border:"none", background:mode==="single"?"#C9A84C":"#1f2937", color:mode==="single"?"#000":"#9ca3af" }}>🔍 Deep Dive</button>
        </div>
      </div>

      {mode==="compare" && (
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 16px 60px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:16, alignItems:"center", marginBottom:28 }}>
            <div>
              <div style={{ color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Decade A</div>
              <select value={decadeA} onChange={e=>setDecadeA(e.target.value)} style={{ width:"100%", background:"#1f2937", border:"2px solid #374151", borderRadius:10, padding:"10px 12px", color:"#f3f4f6", fontSize:15, fontWeight:700 }}>
                {DECADES.map(d=><option key={d} value={d}>{DECADE_EMOJIS[d]} {d}</option>)}
              </select>
            </div>
            <div style={{ fontSize:24, color:"#C9A84C", fontWeight:900, textAlign:"center" }}>VS</div>
            <div>
              <div style={{ color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Decade B</div>
              <select value={decadeB} onChange={e=>setDecadeB(e.target.value)} style={{ width:"100%", background:"#1f2937", border:"2px solid #374151", borderRadius:10, padding:"10px 12px", color:"#f3f4f6", fontSize:15, fontWeight:700 }}>
                {DECADES.filter(d=>d!==decadeA).map(d=><option key={d} value={d}>{DECADE_EMOJIS[d]} {d}</option>)}
              </select>
            </div>
          </div>

          {/* Economic comparison */}
          <div style={{ background:"#111827", border:"1px solid #1f2937", borderRadius:16, padding:"22px", marginBottom:20 }}>
            <h3 style={{ color:"#C9A84C", fontWeight:800, fontSize:15, margin:"0 0 18px" }}>📊 Key Statistics Comparison</h3>
            {ecoStats.map((stat,i)=>{
              const maxVal = Math.max(stat.a, stat.b, 0.01);
              return (
                <div key={i} style={{ marginBottom:16 }}>
                  <div style={{ color:"#9ca3af", fontSize:12, fontWeight:700, marginBottom:6 }}>{stat.label}</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:60, color:dataA.color, fontSize:12, fontWeight:800, textAlign:"right", flexShrink:0 }}>{decadeA}</div>
                      <div style={{ flex:1, background:"#1f2937", borderRadius:99, height:18, overflow:"hidden" }}>
                        <div style={{ background:dataA.color, width:`${(stat.a/maxVal)*100}%`, height:"100%", borderRadius:99, display:"flex", alignItems:"center", paddingLeft:8, transition:"width 0.6s" }}>
                          <span style={{ color:"#000", fontSize:10, fontWeight:800, whiteSpace:"nowrap" }}>{stat.unit==="$"?`$${stat.a}`:stat.a+stat.unit}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:60, color:dataB.color, fontSize:12, fontWeight:800, textAlign:"right", flexShrink:0 }}>{decadeB}</div>
                      <div style={{ flex:1, background:"#1f2937", borderRadius:99, height:18, overflow:"hidden" }}>
                        <div style={{ background:dataB.color, width:`${(stat.b/maxVal)*100}%`, height:"100%", borderRadius:99, display:"flex", alignItems:"center", paddingLeft:8, transition:"width 0.6s" }}>
                          <span style={{ color:"#000", fontSize:10, fontWeight:800, whiteSpace:"nowrap" }}>{stat.unit==="$"?`$${stat.b}`:stat.b+stat.unit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side by side columns */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <DecadeColumn decade={decadeA} data={dataA} />
            <DecadeColumn decade={decadeB} data={dataB} />
          </div>
        </div>
      )}

      {mode==="single" && (
        <div style={{ maxWidth:700, margin:"0 auto", padding:"28px 16px 60px" }}>
          <div style={{ marginBottom:20 }}>
            <div style={{ color:"#9ca3af", fontSize:11, fontWeight:700, textTransform:"uppercase", marginBottom:6 }}>Select a Decade</div>
            <select value={singleDecade} onChange={e=>setSingleDecade(e.target.value)} style={{ width:"100%", background:"#1f2937", border:"2px solid #374151", borderRadius:10, padding:"10px 12px", color:"#f3f4f6", fontSize:15, fontWeight:700 }}>
              {DECADES.map(d=><option key={d} value={d}>{DECADE_EMOJIS[d]} {d}</option>)}
            </select>
          </div>
          <DecadeColumn decade={singleDecade} data={DECADE_DATA[singleDecade]} />
        </div>
      )}
    </div>
  );
}
