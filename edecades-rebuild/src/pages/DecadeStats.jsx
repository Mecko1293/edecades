import { useState } from 'react';
import { DECADES } from '../data/decades';

const STATS = {
  '1900s': { pop: '76M', gdp: '$0.5T', lifeExp: 47, litRate: 88, events: ['Wright Bros first flight (1903)', 'San Francisco earthquake (1906)', 'Model T introduced (1908)', 'NAACP founded (1909)'], topSong: 'Bill Bailey, Won\'t You Please Come Home', topFilm: 'The Great Train Robbery (1903)', topSport: 'Boxing — Jack Johnson' },
  '1910s': { pop: '92M', gdp: '$0.6T', lifeExp: 48, litRate: 90, events: ['Titanic sinks (1912)', 'WWI begins (1914)', 'Panama Canal opens (1914)', '19th Amendment passed (1919)'], topSong: 'Over There — George M. Cohan', topFilm: 'The Birth of a Nation (1915)', topSport: 'Baseball — Babe Ruth debuts' },
  '1920s': { pop: '106M', gdp: '$1.0T', lifeExp: 57, litRate: 92, events: ['Prohibition begins (1920)', 'Harlem Renaissance peaks (1925)', 'Stock market crash (1929)', 'First transatlantic flight (1927)'], topSong: 'Ain\'t Misbehavin\' — Fats Waller', topFilm: 'The Jazz Singer (1927)', topSport: 'Baseball — Babe Ruth' },
  '1930s': { pop: '123M', gdp: '$0.8T', lifeExp: 60, litRate: 94, events: ['Great Depression deepens (1930)', 'FDR\'s New Deal (1933)', 'Dust Bowl peak (1935)', 'Gone with the Wind released (1939)'], topSong: 'Over the Rainbow — Judy Garland', topFilm: 'Gone with the Wind (1939)', topSport: 'Boxing — Joe Louis' },
  '1940s': { pop: '132M', gdp: '$2.2T', lifeExp: 66, litRate: 95, events: ['Pearl Harbor (1941)', 'D-Day (1944)', 'Hiroshima & Nagasaki (1945)', 'UN founded (1945)'], topSong: 'Boogie Woogie Bugle Boy — Andrews Sisters', topFilm: 'Casablanca (1942)', topSport: 'Baseball — Joe DiMaggio' },
  '1950s': { pop: '151M', gdp: '$2.8T', lifeExp: 68, litRate: 96, events: ['Korean War armistice (1953)', 'Brown v. Board (1954)', 'Rosa Parks refuses seat (1955)', 'Sputnik launched (1957)'], topSong: 'Rock Around the Clock — Bill Haley', topFilm: 'Singin\' in the Rain (1952)', topSport: 'Baseball — Willie Mays' },
  '1960s': { pop: '179M', gdp: '$3.8T', lifeExp: 70, litRate: 97, events: ['JFK assassinated (1963)', 'Moon landing (1969)', 'Civil Rights Act (1964)', 'Woodstock (1969)'], topSong: 'Hey Jude — The Beatles', topFilm: 'The Sound of Music (1965)', topSport: 'Boxing — Muhammad Ali' },
  '1970s': { pop: '203M', gdp: '$5.6T', lifeExp: 71, litRate: 97, events: ['Apollo 13 (1970)', 'Watergate (1972–74)', 'Vietnam War ends (1975)', 'Disco era peaks (1977)'], topSong: 'Stayin\' Alive — Bee Gees', topFilm: 'Star Wars (1977)', topSport: 'Basketball — Kareem Abdul-Jabbar' },
  '1980s': { pop: '226M', gdp: '$7.6T', lifeExp: 74, litRate: 98, events: ['Reagan elected (1980)', 'MTV launches (1981)', 'Challenger disaster (1986)', 'Berlin Wall falls (1989)'], topSong: 'Thriller — Michael Jackson', topFilm: 'E.T. (1982)', topSport: 'Basketball — Michael Jordan' },
  '1990s': { pop: '249M', gdp: '$10.2T', lifeExp: 76, litRate: 99, events: ['Gulf War (1991)', 'World Wide Web public (1991)', 'Oklahoma City bombing (1995)', 'Clinton impeached (1998)'], topSong: 'Smells Like Teen Spirit — Nirvana', topFilm: 'Titanic (1997)', topSport: 'Basketball — Michael Jordan' },
  '2000s': { pop: '281M', gdp: '$14.4T', lifeExp: 77, litRate: 99, events: ['9/11 attacks (2001)', 'Iraq War begins (2003)', 'Hurricane Katrina (2005)', 'Obama elected (2008)'], topSong: 'Yeah! — Usher', topFilm: 'The Dark Knight (2008)', topSport: 'Swimming — Michael Phelps' },
  '2010s': { pop: '308M', gdp: '$19.4T', lifeExp: 78, litRate: 99, events: ['Bin Laden killed (2011)', 'Sandy Hook (2012)', 'Same-sex marriage legal (2015)', 'COVID-19 arrives (2019)'], topSong: 'Shape of You — Ed Sheeran', topFilm: 'Avengers: Endgame (2019)', topSport: 'Basketball — LeBron James' },
  '2020s': { pop: '331M', gdp: '$23T', lifeExp: 77, litRate: 99, events: ['COVID-19 pandemic (2020)', 'Jan 6 Capitol attack (2021)', 'Ukraine War (2022)', 'AI goes mainstream (2023)'], topSong: 'Blinding Lights — The Weeknd', topFilm: 'Top Gun: Maverick (2022)', topSport: 'Soccer — Mbappe / Basketball — Giannis' },
};

const BAR_MAX_POP = 350;

export default function DecadeStats() {
  const [active, setActive] = useState('1980s');
  const s = STATS[active];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-black text-white mb-2">📊 Decade Stats</h1>
      <p className="text-gray-400 mb-8">Key numbers, events, and culture from every era</p>

      {/* Decade tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {DECADES.map(d => (
          <button key={d.id} onClick={() => setActive(d.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              active === d.id
                ? 'bg-rose-gold text-white border-rose-gold'
                : 'border-white/20 text-gray-400 hover:border-rose-gold/40 hover:text-rose-gold'
            }`}>
            {d.emoji} {d.id}
          </button>
        ))}
      </div>

      {s && (
        <div className="space-y-6">
          {/* Key numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'US Population', value: s.pop },
              { label: 'US GDP', value: s.gdp },
              { label: 'Life Expectancy', value: `${s.lifeExp} yrs` },
              { label: 'Literacy Rate', value: `${s.litRate}%` },
            ].map(k => (
              <div key={k.label} className="bg-charcoal rounded-xl p-5 border border-white/10 text-center">
                <div className="font-retro text-2xl font-black text-rose-gold">{k.value}</div>
                <div className="text-gray-400 text-xs mt-1">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Population bar */}
          <div className="bg-charcoal rounded-xl p-5 border border-white/10">
            <h3 className="text-white font-semibold mb-3">Population vs. Today</h3>
            <div className="relative h-5 bg-charcoal-dark rounded-full overflow-hidden">
              <div className="h-full bg-rose-gold rounded-full transition-all duration-700"
                style={{ width: `${Math.min((parseInt(s.pop) / BAR_MAX_POP) * 100, 100)}%` }} />
            </div>
            <p className="text-gray-500 text-xs mt-2">{s.pop} million Americans</p>
          </div>

          {/* Culture row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: '🎵 Top Song', value: s.topSong, href: `https://www.youtube.com/results?search_query=${encodeURIComponent(s.topSong)}` },
              { label: '🎬 Top Film', value: s.topFilm, href: `https://www.google.com/search?q=${encodeURIComponent(s.topFilm)}` },
              { label: '🏅 Top Athlete', value: s.topSport, href: `https://en.wikipedia.org/wiki/${encodeURIComponent(s.topSport.split(' — ')[1] || s.topSport)}` },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="bg-charcoal rounded-xl p-5 border border-white/10 hover:border-rose-gold/40 transition-colors block">
                <div className="text-sm text-gray-400 mb-1">{c.label}</div>
                <div className="text-white font-semibold text-sm">{c.value}</div>
                <div className="text-xs text-rose-gold mt-2">Explore ↗</div>
              </a>
            ))}
          </div>

          {/* Key events */}
          <div className="bg-charcoal rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4">🗓️ Defining Events of the {active}</h3>
            <div className="space-y-3">
              {s.events.map(ev => {
                const wikiQuery = ev.replace(/\s*\(\d{4}\)/, '').trim();
                return (
                  <a key={ev}
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(wikiQuery)}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-start gap-3 group">
                    <span className="w-2 h-2 rounded-full bg-rose-gold mt-1.5 shrink-0" />
                    <span className="text-gray-300 text-sm group-hover:text-rose-gold-light transition-colors">{ev} ↗</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Compare link */}
          <div className="text-center pt-2">
            <a href={`https://www.google.com/search?q=${active}+decade+statistics+history`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-rose-gold/40 text-rose-gold hover:bg-rose-gold/10 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
              Deep Dive into {active} History ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
