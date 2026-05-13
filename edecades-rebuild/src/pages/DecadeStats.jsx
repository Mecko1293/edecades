import { useState } from 'react';
import { DECADES } from '../data/decades';
import { getDecadeImage } from '../data/images';

const STATS = {
  '1900s': { wage: '$0.22/hr', inflation: '1.2%', unemployment: '4.0%', lifeExpectancy: '47 yrs', topSong: 'After the Ball — Charles K. Harris', topMovie: 'The Great Train Robbery (1903)', events: ['Wright Brothers first flight (1903)', 'San Francisco Earthquake (1906)', 'Ford Model T launched (1908)', 'NAACP founded (1909)'], tech: ['First airplane', 'Automobile era begins', 'Vacuum cleaner', 'Radio experiments'], fashion: ['Gibson Girl silhouette', 'Corsets & high collars', 'Edwardian formal wear', 'Top hats & long skirts'], culture: ['Vaudeville entertainment', 'Ragtime music', 'World\'s Fair exhibitions', 'Silent film era begins'] },
  '1910s': { wage: '$0.26/hr', inflation: '7.9%', unemployment: '5.9%', lifeExpectancy: '54 yrs', topSong: 'Pack Up Your Troubles — Felix Powell', topMovie: 'Birth of a Nation (1915)', events: ['Titanic sinks (1912)', 'World War I (1914–1918)', 'Panama Canal opens (1914)', 'Russian Revolution (1917)'], tech: ['Commercial telephone', 'X-ray machines', 'Assembly line production', 'First tank warfare'], fashion: ['Women\'s practical dress reform', 'Nurse uniforms', 'Military-influence fashion', 'Hobble skirts'], culture: ['Jazz begins in New Orleans', 'Silent film boom', 'WWI patriotism & propaganda', 'Women entering workforce'] },
  '1920s': { wage: '$0.45/hr', inflation: '2.4%', unemployment: '5.2%', lifeExpectancy: '57 yrs', topSong: "Ain't Misbehavin' — Fats Waller", topMovie: 'The Jazz Singer (1927)', events: ['Prohibition (1920–1933)', "Women's Suffrage (1920)", 'Harlem Renaissance', 'Stock Market Crash (1929)'], tech: ['Talking pictures', 'Commercial radio', 'Home refrigerators', 'Penicillin discovered (1928)'], fashion: ['Flapper dresses', 'Cloche hats', 'Bobbed hair', 'Pinstripe suits'], culture: ['Charleston dance', 'Speakeasies', 'Jazz clubs', 'Rise of cinema'] },
  '1930s': { wage: '$0.30/hr', inflation: '-2.1%', unemployment: '24.9%', lifeExpectancy: '60 yrs', topSong: 'Over the Rainbow — Judy Garland', topMovie: 'Gone with the Wind (1939)', events: ['Great Depression', 'The New Deal', 'Rise of Fascism in Europe', 'Social Security Act (1935)'], tech: ['Early television', 'Nylon invented (1935)', 'FM radio', 'Commercial aviation grows'], fashion: ['Bias-cut silk gowns', 'Wide-leg trousers', 'Fedora hats', 'Utility wear'], culture: ['Golden Age of Hollywood', 'Big Band & Swing music', 'Radio as entertainment hub', 'Dust Bowl migration'] },
  '1940s': { wage: '$0.43/hr', inflation: '5.9%', unemployment: '3.8%', lifeExpectancy: '66 yrs', topSong: 'White Christmas — Bing Crosby', topMovie: "Citizen Kane (1941)", events: ['Pearl Harbor & WWII (1941)', 'D-Day Invasion (1944)', 'Atomic Bomb (1945)', 'UN Founded (1945)'], tech: ['ENIAC computer (1945)', 'Microwave oven (1945)', 'Transistor (1947)', 'Jet aircraft'], fashion: ['Pin-up utility look', 'Victory rolls', 'Military-influenced cuts', 'Nylon stockings return'], culture: ['WWII homefront', 'USO shows', 'Women in factories', 'Big Band era peaks'] },
  '1950s': { wage: '$1.00/hr', inflation: '1.3%', unemployment: '4.5%', lifeExpectancy: '68 yrs', topSong: 'Rock Around the Clock — Bill Haley', topMovie: 'Ben-Hur (1959)', events: ['Korean War (1950–1953)', 'Brown v. Board of Education (1954)', 'Sputnik launched (1957)', 'Alaska & Hawaii statehood (1959)'], tech: ['Television in every home', 'Transistor radio', 'Credit cards (1950)', 'Polio vaccine (1955)'], fashion: ['Poodle skirts', 'Cat-eye glasses', 'Saddle shoes', 'James Dean look'], culture: ['Rock & Roll revolution', 'Drive-in theaters', 'Suburbia boom', 'Cold War anxiety'] },
  '1960s': { wage: '$1.30/hr', inflation: '2.3%', unemployment: '5.7%', lifeExpectancy: '70 yrs', topSong: 'Hey Jude — The Beatles', topMovie: 'The Sound of Music (1965)', events: ['JFK Assassination (1963)', 'Civil Rights Act (1964)', 'Moon Landing (1969)', 'Woodstock (1969)'], tech: ['ARPANET (internet precursor)', 'Color television', 'Heart transplant (1967)', 'Boeing 747 designed'], fashion: ['Mod miniskirts', 'Bell-bottoms begin', 'Tie-dye & psychedelic', 'Space Age fashion'], culture: ['Counterculture & hippie movement', 'Anti-Vietnam protests', 'British Invasion', 'Civil Rights marches'] },
  '1970s': { wage: '$2.10/hr', inflation: '7.1%', unemployment: '6.8%', lifeExpectancy: '72 yrs', topSong: 'Stayin\' Alive — Bee Gees', topMovie: 'Star Wars (1977)', events: ['Watergate scandal (1972–1974)', 'Vietnam War ends (1975)', 'Iran Hostage Crisis (1979)', 'First Earth Day (1970)'], tech: ['Personal computer (Apple I, 1976)', 'VHS tapes', 'Microprocessor', 'Atari (1972)'], fashion: ['Bell-bottoms', 'Polyester leisure suits', 'Platform shoes', 'Earth tones'], culture: ['Disco revolution', 'Punk rock emerges', 'Feminism second wave', 'Environmental movement'] },
  '1980s': { wage: '$3.35/hr', inflation: '5.1%', unemployment: '7.2%', lifeExpectancy: '74 yrs', topSong: 'Billie Jean — Michael Jackson', topMovie: 'E.T. the Extra-Terrestrial (1982)', events: ['AIDS epidemic emerges (1981)', 'Challenger disaster (1986)', 'Berlin Wall falls (1989)', 'MTV launches (1981)'], tech: ['IBM PC (1981)', 'Macintosh (1984)', 'CD player (1982)', 'Space Shuttle program'], fashion: ['Big hair & shoulder pads', 'Neon colors', 'Power suits', 'Leg warmers'], culture: ['MTV music video era', 'Yuppie culture', 'Arcade game boom', 'Reagan Revolution'] },
  '1990s': { wage: '$4.25/hr', inflation: '2.8%', unemployment: '5.6%', lifeExpectancy: '76 yrs', topSong: 'One Sweet Day — Mariah Carey & Boyz II Men', topMovie: 'Titanic (1997)', events: ['Gulf War (1991)', 'Oklahoma City Bombing (1995)', 'Columbine (1999)', 'Clinton impeachment (1998)'], tech: ['World Wide Web public (1991)', 'Windows 95', 'DVD (1995)', 'Google founded (1998)'], fashion: ['Grunge flannel', 'Crop tops & low-rise', 'Platform sneakers', 'Chokers & slip dresses'], culture: ['Hip-hop goes mainstream', 'Reality TV begins', 'Internet boom', 'Tamagotchi & Game Boy'] },
  '2000s': { wage: '$5.15/hr', inflation: '2.5%', unemployment: '5.8%', lifeExpectancy: '77 yrs', topSong: 'Yeah! — Usher ft. Lil Jon', topMovie: 'The Dark Knight (2008)', events: ['9/11 Attacks (2001)', 'Iraq War begins (2003)', 'Hurricane Katrina (2005)', '2008 Financial Crisis'], tech: ['iPod (2001)', 'Facebook (2004)', 'YouTube (2005)', 'iPhone (2007)'], fashion: ['Von Dutch trucker hats', 'Low-rise jeans', 'Uggs', 'Velour tracksuits'], culture: ['Social media emergence', 'Reality TV peak', 'Flip phone era', 'Y2K nostalgia'] },
  '2010s': { wage: '$7.25/hr', inflation: '1.7%', unemployment: '6.2%', lifeExpectancy: '79 yrs', topSong: 'Shape of You — Ed Sheeran', topMovie: 'Avengers: Endgame (2019)', events: ['Arab Spring (2010–2012)', 'Sandy Hook (2012)', 'Obama re-elected (2012)', 'COVID-19 emerges (2019)'], tech: ['iPad (2010)', 'Instagram (2010)', 'Siri (2011)', 'TikTok (2016)'], fashion: ['Athleisure', 'Normcore', 'Streetwear', 'Instagram aesthetic'], culture: ['Smartphone era peak', 'Me Too movement', 'Streaming wars', 'Social justice activism'] },
  '2020s': { wage: '$11.00/hr', inflation: '6.8%', unemployment: '8.1%', lifeExpectancy: '77 yrs', topSong: 'As It Was — Harry Styles', topMovie: 'Top Gun: Maverick (2022)', events: ['COVID-19 Pandemic (2020)', 'Black Lives Matter peak (2020)', 'Roe v. Wade overturned (2022)', 'ChatGPT launches (2022)'], tech: ['ChatGPT & AI revolution', 'Metaverse hype', 'Electric vehicles mainstream', 'Remote work culture'], fashion: ['Y2K revival', 'Cottagecore', 'Gen Z maximalism', 'Thrift & vintage'], culture: ['TikTok dominance', 'Pandemic life changes', 'AI disruption', 'Remote work'] },
};

const DECADES_ORDER = ['1900s','1910s','1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];

export default function DecadeStats() {
  const [selected, setSelected] = useState('1980s');
  const data = STATS[selected];
  const heroImg = getDecadeImage(selected);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-retro text-4xl font-bold text-white mb-2">Decade by Decade Stats</h1>
        <p className="text-gray-400">Economics, culture, fashion, and technology — every era at a glance</p>
      </div>

      {/* Decade Selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {DECADES_ORDER.map(d => (
          <button key={d} onClick={() => setSelected(d)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selected === d ? 'bg-rose-gold text-white shadow-lg shadow-rose-gold/20' : 'bg-charcoal text-gray-300 border border-white/10 hover:text-rose-gold hover:border-rose-gold/30'
            }`}>{d}</button>
        ))}
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden mb-8 h-44">
        <img src={heroImg} alt={selected} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h2 className="font-retro text-5xl font-black text-white">{selected}</h2>
            <p className="text-rose-gold">{DECADES.find(d => d.id === selected)?.tagline}</p>
          </div>
        </div>
      </div>

      {/* Economic Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Min Wage', value: data.wage, icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
          { label: 'Inflation', value: data.inflation, icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
          { label: 'Unemployment', value: data.unemployment, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
          { label: 'Life Expectancy', value: data.lifeExpectancy, icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
        ].map(stat => (
          <div key={stat.label} className="bg-charcoal rounded-2xl border border-white/10 p-4 text-center">
            <svg className="w-5 h-5 text-rose-gold mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
            </svg>
            <p className="text-white font-bold text-xl">{stat.value}</p>
            <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Top Song & Movie */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[
          { label: 'Top Song', value: data.topSong, icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
          { label: 'Top Movie', value: data.topMovie, icon: 'M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z' },
        ].map(item => (
          <div key={item.label} className="bg-charcoal rounded-2xl border border-white/10 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-gold/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest">{item.label}</p>
              <p className="text-white font-semibold text-sm">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4 columns: Events, Tech, Fashion, Culture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Key Events', items: data.events, color: 'text-red-400', bg: 'bg-red-900/10 border-red-800/20', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
          { label: 'Technology',  items: data.tech,   color: 'text-blue-400', bg: 'bg-blue-900/10 border-blue-800/20', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2' },
          { label: 'Fashion',     items: data.fashion, color: 'text-purple-400', bg: 'bg-purple-900/10 border-purple-800/20', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
          { label: 'Culture',     items: data.culture, color: 'text-green-400', bg: 'bg-green-900/10 border-green-800/20', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        ].map(col => (
          <div key={col.label} className={`rounded-2xl border p-4 ${col.bg}`}>
            <div className="flex items-center gap-2 mb-3">
              <svg className={`w-4 h-4 ${col.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={col.icon} />
              </svg>
              <p className={`font-semibold text-sm ${col.color}`}>{col.label}</p>
            </div>
            <ul className="space-y-2">
              {col.items.map((item, i) => (
                <li key={i} className="text-gray-300 text-xs flex items-start gap-1.5">
                  <span className={`${col.color} mt-0.5`}>›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
