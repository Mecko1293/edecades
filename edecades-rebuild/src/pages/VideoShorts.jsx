import { useState, useEffect } from 'react';
import { DECADES } from '../data/decades';

// Decade-accurate YouTube short/documentary search queries
const DECADE_YOUTUBE_SEARCHES = {
  '1920s': ['1920s jazz age flappers history', '1920s prohibition speakeasy', '1920s charleston dance'],
  '1930s': ['1930s great depression history', '1930s hollywood golden age', '1930s swing music jazz'],
  '1940s': ['1940s world war 2 homefront', '1940s pin up vintage style', '1940s big band music'],
  '1950s': ['1950s rock and roll elvis history', '1950s drive in diner nostalgia', '1950s sock hop dance'],
  '1960s': ['1960s woodstock hippie history', '1960s mod fashion swinging london', '1960s nasa space race moon'],
  '1970s': ['1970s disco era saturday night fever', '1970s bell bottoms fashion', '1970s things that dont exist today history shorts'],
  '1980s': ['1980s mtv big hair neon nostalgia', '1980s arcade video games atari', '1980s power suits fashion'],
  '1990s': ['1990s grunge nirvana history', '1990s gameboy windows 95 nostalgia', '1990s supermodels fashion'],
  '2000s': ['2000s y2k nostalgia early internet', '2000s flip phones myspace', '2000s low rise jeans fashion'],
  '2010s': ['2010s instagram social media culture', '2010s avocado toast millennial', '2010s smartphone revolution'],
  '2020s': ['2020s pandemic tiktok culture', '2020s ai revolution history', '2020s remote work culture'],
};

// Decade-accurate static thumbnail fallbacks (Unsplash)
const DECADE_THUMBS = {
  '1920s': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80',
  '1930s': 'https://images.unsplash.com/photo-1509309756405-be0199881695?w=400&q=80',
  '1940s': 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=400&q=80',
  '1950s': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  '1960s': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80',
  '1970s': 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&q=80',
  '1980s': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
  '1990s': 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80',
  '2000s': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',
  '2010s': 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
  '2020s': 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&q=80',
};

// Curated decade-accurate short video links (real YouTube search links)
const CURATED_SHORTS = {
  '1970s': [
    { title: 'Things From the 1970s That Don\'t Exist Today', search: 'things from the 1970s that dont exist today', tag: '#history #shorts', thumb: DECADE_THUMBS['1970s'] },
    { title: 'Saturday Night Fever — Disco Era', search: '1970s disco saturday night fever history', tag: '#disco #70s', thumb: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&q=80' },
    { title: 'Bell Bottoms & Boho — 1970s Fashion', search: '1970s fashion bell bottoms style', tag: '#fashion #retro', thumb: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80' },
    { title: 'Atari & the Microprocessor Revolution', search: 'atari 1970s gaming history', tag: '#tech #gaming', thumb: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80' },
  ],
  '1980s': [
    { title: 'Things From the 1980s That Don\'t Exist Today', search: 'things from the 1980s that dont exist today', tag: '#history #shorts', thumb: DECADE_THUMBS['1980s'] },
    { title: 'Big Hair & Power Suits — 80s Fashion', search: '1980s big hair power suits fashion', tag: '#fashion #80s', thumb: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&q=80' },
    { title: 'MTV Launches — Music Television History', search: 'mtv launch 1981 music television history', tag: '#mtv #music', thumb: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80' },
    { title: 'Arcade Revolution — Pac-Man & Donkey Kong', search: '1980s arcade games pac man donkey kong nostalgia', tag: '#gaming #nostalgia', thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80' },
  ],
  '1990s': [
    { title: 'Things From the 1990s That Don\'t Exist Today', search: 'things from the 1990s that dont exist today', tag: '#history #shorts', thumb: DECADE_THUMBS['1990s'] },
    { title: 'Grunge Nation — Nirvana & Seattle Sound', search: '1990s grunge nirvana seattle history', tag: '#grunge #music', thumb: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80' },
    { title: 'World Wide Web — Internet Goes Public', search: '1990s world wide web internet history', tag: '#tech #internet', thumb: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80' },
    { title: 'Game Boy, Tamagotchi & 90s Toys', search: '1990s game boy tamagotchi toys nostalgia', tag: '#nostalgia #90s', thumb: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80' },
  ],
};

function ShortCard({ item, decade, onClick }) {
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(item.search || item.title + ' ' + decade)}`;
  return (
    <div className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/50 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-gold/10"
      onClick={() => window.open(searchUrl, '_blank')}>
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] sm:aspect-[4/5] overflow-hidden bg-charcoal">
        <img
          src={item.thumb || item.thumbnail || DECADE_THUMBS[decade]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = DECADE_THUMBS[decade] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 bg-red-600/90 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Decade badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-rose-gold text-white text-[10px] font-bold px-2 py-1 rounded-full">{decade}</span>
        </div>

        {/* Tag */}
        {item.tag && (
          <div className="absolute top-3 right-3">
            <span className="bg-black/60 text-gray-300 text-[9px] px-2 py-1 rounded-full backdrop-blur-sm">{item.tag}</span>
          </div>
        )}

        {/* Title at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{item.title}</p>
          <p className="text-rose-gold text-[10px] mt-1 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.8a4.85 4.85 0 01-1.07-.11z"/></svg>
            Watch on YouTube
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VideoShorts() {
  const [selectedDecade, setSelectedDecade] = useState('1970s');
  const DECADES_WITH_SHORTS = DECADES.filter(d => d.id !== '1900s' && d.id !== '1910s');

  // Build shorts for current decade
  const getCuratedShorts = (decade) => {
    if (CURATED_SHORTS[decade]) return CURATED_SHORTS[decade];
    // Generate generic shorts for other decades
    const searches = DECADE_YOUTUBE_SEARCHES[decade] || [`${decade} history nostalgia`];
    return searches.map((s, i) => ({
      title: s.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^\w/, c => c.toUpperCase()),
      search: s,
      tag: `#history #${decade.replace('s','')}s`,
      thumb: DECADE_THUMBS[decade],
    }));
  };

  const shorts = getCuratedShorts(selectedDecade);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-retro text-4xl font-bold text-white mb-2">Decade Shorts</h1>
        <p className="text-gray-400">Decade-accurate clips — tap any card to watch on YouTube</p>
      </div>

      {/* Decade Selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {DECADES_WITH_SHORTS.map(d => (
          <button key={d.id} onClick={() => setSelectedDecade(d.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedDecade === d.id
                ? 'bg-rose-gold text-white shadow-lg shadow-rose-gold/20'
                : 'bg-charcoal text-gray-300 border border-white/10 hover:text-rose-gold hover:border-rose-gold/30'
            }`}>
            {d.label}
          </button>
        ))}
      </div>

      {/* Featured — "Things that don't exist today" */}
      <div className="mb-8 bg-charcoal rounded-2xl border border-white/10 p-5">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-white font-semibold text-sm">
            Things From the {selectedDecade} That Don't Exist Today
          </h2>
          <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-full">#history #shorts</span>
        </div>
        <p className="text-gray-400 text-xs mb-4">Fascinating glimpses of life from a bygone era — objects, customs, and technologies that have vanished.</p>
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`things from the ${selectedDecade} that don't exist today history shorts`)}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.8a4.85 4.85 0 01-1.07-.11z"/>
          </svg>
          Watch on YouTube
        </a>
      </div>

      {/* Shorts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {shorts.map((item, i) => (
          <ShortCard key={i} item={item} decade={selectedDecade} />
        ))}
      </div>

      {/* Browse all YouTube button */}
      <div className="text-center mt-10">
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedDecade + ' history culture nostalgia documentary')}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-rose-gold/50 text-rose-gold hover:bg-rose-gold hover:text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.56V6.8a4.85 4.85 0 01-1.07-.11z"/>
          </svg>
          Browse All {selectedDecade} Content on YouTube
        </a>
      </div>
    </div>
  );
}
