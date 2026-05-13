import { useState } from 'react';

const PRESIDENTS = [
  // 1900s
  { name: 'Theodore Roosevelt',  decade: '1900s', years: '1901–1909', party: 'Republican', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/President_Theodore_Roosevelt%2C_1904.jpg/400px-President_Theodore_Roosevelt%2C_1904.jpg', highlights: 'Trust-busting, conservation of national parks, Panama Canal, Nobel Peace Prize. The original "Bull Moose."', fact: 'Youngest president ever at 42. Had a teddy bear named after him.' },
  // 1910s
  { name: 'Woodrow Wilson',      decade: '1910s', years: '1913–1921', party: 'Democrat',    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Woodrow_Wilson_H%26E.jpg/400px-Woodrow_Wilson_H%26E.jpg', highlights: 'Led USA through WWI, proposed the League of Nations, Federal Reserve Act, 19th Amendment ratified under his presidency.', fact: 'Only president to hold a PhD — in political science from Johns Hopkins.' },
  // 1920s
  { name: 'Calvin Coolidge',     decade: '1920s', years: '1923–1929', party: 'Republican', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Calvin_Coolidge_photo_portrait_head_and_shoulders.jpg/400px-Calvin_Coolidge_photo_portrait_head_and_shoulders.jpg', highlights: 'Presided over the Roaring Twenties economic boom. Known for "Silent Cal" minimalist governance.', fact: 'So quiet that Dorothy Parker joked when told he was dead: "How can they tell?"' },
  // 1930s
  { name: 'Franklin D. Roosevelt', decade: '1930s', years: '1933–1945', party: 'Democrat',  photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/FDR_in_1933.jpg/400px-FDR_in_1933.jpg', highlights: 'The New Deal saved millions during the Great Depression. Led America into WWII. Only president elected 4 times.', fact: 'Had polio but concealed his use of a wheelchair from the public.' },
  // 1940s
  { name: 'Harry S. Truman',     decade: '1940s', years: '1945–1953', party: 'Democrat',    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Harry_S._Truman%2C_bw_half-length_photo_portrait%2C_facing_front%2C_1945.jpg/400px-Harry_S._Truman%2C_bw_half-length_photo_portrait%2C_facing_front%2C_1945.jpg', highlights: 'Ended WWII with atomic bombs. Marshall Plan rebuilt Europe. Desegregated the military. Korean War.', fact: 'His middle name "S" doesn\'t stand for anything — it was a compromise between two family names.' },
  // 1950s
  { name: 'Dwight D. Eisenhower', decade: '1950s', years: '1953–1961', party: 'Republican', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959.jpg/400px-Dwight_D._Eisenhower%2C_official_photo_portrait%2C_May_29%2C_1959.jpg', highlights: 'Interstate Highway System, NASA creation, Cold War containment policy, Korean War armistice.', fact: 'WWII Supreme Commander before becoming president. Warned of the "military-industrial complex" in his farewell speech.' },
  // 1960s
  { name: 'John F. Kennedy',     decade: '1960s', years: '1961–1963', party: 'Democrat',    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg/400px-John_F._Kennedy%2C_White_House_color_photo_portrait.jpg', highlights: 'Cuban Missile Crisis, NASA Moon mission, Civil Rights advocacy, assassinated in Dallas Nov 22, 1963.', fact: 'Youngest elected president at 43. First Catholic president.' },
  { name: 'Lyndon B. Johnson',   decade: '1960s', years: '1963–1969', party: 'Democrat',    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/37_Lyndon_Johnson_3x4.jpg/400px-37_Lyndon_Johnson_3x4.jpg', highlights: 'Great Society programs, Civil Rights Act of 1964, Voting Rights Act of 1965, Vietnam War escalation.', fact: 'Took the oath of office on Air Force One beside a grieving Jackie Kennedy.' },
  // 1970s
  { name: 'Richard Nixon',       decade: '1970s', years: '1969–1974', party: 'Republican', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Richard_Nixon_1935.jpg/400px-Richard_Nixon_1935.jpg', highlights: 'Opened diplomatic relations with China, ended Vietnam War, EPA creation. Resigned over Watergate scandal.', fact: 'Only US president to resign from office.' },
  { name: 'Jimmy Carter',        decade: '1970s', years: '1977–1981', party: 'Democrat',    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/JimmyCarterPortrait2.jpg/400px-JimmyCarterPortrait2.jpg', highlights: 'Camp David Accords, Energy crisis management, Iran Hostage Crisis. Post-presidency humanitarian work.', fact: 'Won the Nobel Peace Prize in 2002 — more than 20 years after leaving office.' },
  // 1980s
  { name: 'Ronald Reagan',       decade: '1980s', years: '1981–1989', party: 'Republican', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Official_Portrait_of_President_Reagan_1981.jpg/400px-Official_Portrait_of_President_Reagan_1981.jpg', highlights: 'Reaganomics, Cold War end, Iran-Contra affair, "Mr. Gorbachev, tear down this wall."', fact: 'Former Hollywood actor and California governor before the presidency.' },
  // 1990s
  { name: 'Bill Clinton',        decade: '1990s', years: '1993–2001', party: 'Democrat',    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Bill_Clinton.jpg/400px-Bill_Clinton.jpg', highlights: 'Budget surplus, NAFTA, Kosovo War, economic boom of the 1990s, impeached but not removed.', fact: 'First baby boomer president. Played saxophone on Arsenio Hall\'s show during his campaign.' },
  // 2000s
  { name: 'George W. Bush',      decade: '2000s', years: '2001–2009', party: 'Republican', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/George-W-Bush.jpeg/400px-George-W-Bush.jpeg', highlights: '9/11 response, War on Terror, Afghanistan and Iraq wars, Hurricane Katrina, 2008 financial crisis.', fact: 'Only president whose father also served as president (in modern times, with Adams too).' },
  // 2010s
  { name: 'Barack Obama',        decade: '2010s', years: '2009–2017', party: 'Democrat',    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/400px-President_Barack_Obama.jpg', highlights: 'First African American president. Affordable Care Act, killing of Bin Laden, Paris Climate Agreement.', fact: 'Won the Nobel Peace Prize in his first year in office.' },
  { name: 'Donald Trump',        decade: '2010s', years: '2017–2021', party: 'Republican', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/400px-Donald_Trump_official_portrait.jpg', highlights: 'Tax Cuts, US-Mexico-Canada Agreement, COVID-19 pandemic, first impeachment, January 6th Capitol events.', fact: 'First president with no prior military or government service before taking office.' },
  // 2020s
  { name: 'Joe Biden',           decade: '2020s', years: '2021–2025', party: 'Democrat',    photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Joe_Biden_presidential_portrait.jpg/400px-Joe_Biden_presidential_portrait.jpg', highlights: 'COVID vaccine rollout, Infrastructure Investment Act, Ukraine support, withdrew from Afghanistan.', fact: 'Oldest president in US history, elected at age 77.' },
];

const DECADES_LIST = ['All', '1900s','1910s','1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];
const PARTY_COLORS = { Republican: 'bg-red-900/30 text-red-400 border-red-800/40', Democrat: 'bg-blue-900/30 text-blue-400 border-blue-800/40' };

function PresidentModal({ president, onClose }) {
  if (!president) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1a1f2e] rounded-3xl border border-rose-gold/30 max-w-lg w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="relative h-64 overflow-hidden">
          <img src={president.photo} alt={president.name} className="w-full h-full object-cover object-top"
            onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='#1a1f2e'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white text-xl flex items-center justify-center hover:bg-rose-gold/60 transition-colors">×</button>
          <div className="absolute bottom-4 left-5">
            <h2 className="font-retro text-2xl font-bold text-white">{president.name}</h2>
            <p className="text-rose-gold text-sm">{president.years}</p>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex gap-2">
            <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${PARTY_COLORS[president.party]}`}>{president.party}</span>
            <span className="text-xs bg-rose-gold/20 text-rose-gold px-3 py-1 rounded-full font-semibold">{president.decade}</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Key Highlights</p>
            <p className="text-gray-200 text-sm leading-relaxed">{president.highlights}</p>
          </div>
          <div className="bg-rose-gold/10 border border-rose-gold/20 rounded-xl p-3">
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Did You Know?</p>
            <p className="text-rose-gold text-sm leading-relaxed">{president.fact}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Presidents() {
  const [decadeFilter, setDecadeFilter] = useState('All');
  const [partyFilter, setPartyFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = PRESIDENTS.filter(p =>
    (decadeFilter === 'All' || p.decade === decadeFilter) &&
    (partyFilter === 'All' || p.party === partyFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-retro text-4xl font-bold text-white mb-2">US Presidents by Decade</h1>
        <p className="text-gray-400">Every commander-in-chief from the 1900s to today — click any card for their full story</p>
      </div>

      {/* Decade Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {DECADES_LIST.map(d => (
          <button key={d} onClick={() => setDecadeFilter(d)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              decadeFilter === d ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-300 border border-white/10 hover:text-rose-gold'
            }`}>
            {d === 'All' ? 'All Decades' : d}
          </button>
        ))}
      </div>

      {/* Party Filter */}
      <div className="flex gap-2 justify-center mb-8">
        {['All', 'Republican', 'Democrat'].map(p => (
          <button key={p} onClick={() => setPartyFilter(p)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
              partyFilter === p
                ? p === 'Republican' ? 'bg-red-900/40 text-red-300 border-red-700/50'
                  : p === 'Democrat' ? 'bg-blue-900/40 text-blue-300 border-blue-700/50'
                  : 'bg-rose-gold text-white border-rose-gold'
                : 'bg-charcoal text-gray-500 border-white/10 hover:text-gray-300'
            }`}>
            {p}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(p => (
          <button key={p.name} onClick={() => setSelected(p)}
            className="group rounded-2xl border border-white/10 hover:border-rose-gold/50 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-gold/10 text-left">
            <div className="relative h-44 overflow-hidden bg-charcoal">
              <img src={p.photo} alt={p.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='#1a1f2e'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute top-2 right-2">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${PARTY_COLORS[p.party]}`}>{p.party[0]}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="font-retro text-sm font-bold text-white leading-tight">{p.name}</p>
                <p className="text-rose-gold text-[10px]">{p.years}</p>
              </div>
            </div>
            <div className="bg-charcoal px-3 py-2">
              <span className="text-[10px] bg-rose-gold/20 text-rose-gold px-2 py-0.5 rounded-full font-semibold">{p.decade}</span>
            </div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">No presidents found for this filter.</div>
      )}

      <PresidentModal president={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
