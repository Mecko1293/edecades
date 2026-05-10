import { useState, useRef } from 'react';
import { DECADES } from '../data/decades';

// Curated decade-specific short video embeds (YouTube Shorts / vertical clips)
const SHORTS_BY_DECADE = {
  '1920s': [
    { id: 'v1920_1', title: 'Charleston Dance — 1920s Jazz Age', channel: 'History Archives', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', decade: '1920s', category: 'Music & Dance', likes: 4200 },
    { id: 'v1920_2', title: 'Prohibition Era Speakeasy Life', channel: 'Roaring 20s Vault', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1609931236742-b7d02e12e0e1?w=400&q=80', decade: '1920s', category: 'Culture', likes: 3100 },
  ],
  '1950s': [
    { id: 'v1950_1', title: 'Rock \'n\' Roll at the Sock Hop', channel: '50s Nostalgia', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', decade: '1950s', category: 'Music & Dance', likes: 8700 },
    { id: 'v1950_2', title: 'Drive-In Movie Theater Experience', channel: 'Vintage America', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80', decade: '1950s', category: 'Culture', likes: 5400 },
    { id: 'v1950_3', title: 'Suburban Life in the 1950s', channel: 'Postwar America', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', decade: '1950s', category: 'Lifestyle', likes: 3900 },
  ],
  '1960s': [
    { id: 'v1960_1', title: 'Woodstock 1969 — Peace & Music', channel: '60s Revolution', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80', decade: '1960s', category: 'Music & Dance', likes: 12000 },
    { id: 'v1960_2', title: 'Mod Fashion & Swinging London', channel: 'Style Archive', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80', decade: '1960s', category: 'Fashion', likes: 7800 },
  ],
  '1970s': [
    { id: 'v1970_1', title: 'Saturday Night Fever — Disco Era', channel: '70s Groove', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&q=80', decade: '1970s', category: 'Music & Dance', likes: 15600 },
    { id: 'v1970_2', title: 'Bell Bottoms & Platform Shoes', channel: 'Retro Fashion TV', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80', decade: '1970s', category: 'Fashion', likes: 9200 },
    { id: 'v1970_3', title: 'Fondue Parties & 70s Food Trends', channel: 'Vintage Eats', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80', decade: '1970s', category: 'Food', likes: 4700 },
  ],
  '1980s': [
    { id: 'v1980_1', title: 'Big Hair & Power Suits — 80s Fashion', channel: 'Neon Archive', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&q=80', decade: '1980s', category: 'Fashion', likes: 18900 },
    { id: 'v1980_2', title: 'Arcade Gaming Culture 1980s', channel: '8-Bit Nostalgia', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80', decade: '1980s', category: 'Technology', likes: 22000 },
    { id: 'v1980_3', title: 'MTV Changes Music Forever', channel: 'Music History', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80', decade: '1980s', category: 'Music & Dance', likes: 31000 },
  ],
  '1990s': [
    { id: 'v1990_1', title: 'Grunge Era — Nirvana & Seattle Sound', channel: '90s Rewind', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80', decade: '1990s', category: 'Music & Dance', likes: 27000 },
    { id: 'v1990_2', title: 'AOL Instant Messenger Era', channel: 'Internet History', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80', decade: '1990s', category: 'Technology', likes: 19500 },
    { id: 'v1990_3', title: 'Fresh Prince Fashion & Hip-Hop Style', channel: 'Street Style Archive', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80', decade: '1990s', category: 'Fashion', likes: 35000 },
  ],
  '2000s': [
    { id: 'v2000_1', title: 'Y2K Fashion — Von Dutch & Velour', channel: 'Y2K Vault', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80', decade: '2000s', category: 'Fashion', likes: 41000 },
    { id: 'v2000_2', title: 'Early YouTube & Web 2.0', channel: 'Internet Archive', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', decade: '2000s', category: 'Technology', likes: 28000 },
  ],
  '2010s': [
    { id: 'v2010_1', title: 'Instagram Culture & The Selfie Era', channel: 'Social Media Docs', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80', decade: '2010s', category: 'Culture', likes: 52000 },
    { id: 'v2010_2', title: 'Avocado Toast & Millennial Food Culture', channel: 'Foodie Archive', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', decade: '2010s', category: 'Food', likes: 33000 },
  ],
  '2020s': [
    { id: 'v2020_1', title: 'TikTok Era & Short-Form Video Culture', channel: 'Digital Now', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80', decade: '2020s', category: 'Culture', likes: 88000 },
    { id: 'v2020_2', title: 'AI Revolution — ChatGPT Changes Everything', channel: 'Tech Now', videoId: 'dQw4w9WgXcQ', thumbnail: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=400&q=80', decade: '2020s', category: 'Technology', likes: 74000 },
  ],
};

const ALL_SHORTS = Object.values(SHORTS_BY_DECADE).flat();
const CATEGORIES_LIST = ['All', 'Music & Dance', 'Fashion', 'Technology', 'Culture', 'Food', 'Lifestyle'];

function formatLikes(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n;
}

function ShortCard({ video, onClick, isActive }) {
  return (
    <div
      onClick={() => onClick(video)}
      className={`relative rounded-2xl overflow-hidden cursor-pointer group transition-all ${
        isActive ? 'ring-2 ring-rose-gold scale-105 shadow-xl shadow-rose-gold/20' : 'hover:scale-102 hover:shadow-lg'
      }`}
      style={{ aspectRatio: '9/16' }}>
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&q=80'; }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-14 h-14 bg-rose-gold/90 rounded-full flex items-center justify-center shadow-xl">
          <span className="text-white text-2xl ml-1">▶</span>
        </div>
      </div>

      {/* Decade badge */}
      <div className="absolute top-3 left-3">
        <span className="bg-rose-gold/90 text-white text-xs font-bold px-2 py-1 rounded-lg">
          {video.decade}
        </span>
      </div>

      {/* Category badge */}
      <div className="absolute top-3 right-3">
        <span className="bg-black/60 text-gray-300 text-xs px-2 py-1 rounded-lg">
          {video.category}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white text-xs font-semibold leading-tight line-clamp-2">{video.title}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-gray-400 text-xs">{video.channel}</span>
          <span className="text-pink-400 text-xs">♥ {formatLikes(video.likes)}</span>
        </div>
      </div>
    </div>
  );
}

function VideoModal({ video, onClose, onPrev, onNext }) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-charcoal rounded-3xl overflow-hidden max-w-sm w-full relative shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Video area */}
        <div className="relative bg-black" style={{ aspectRatio: '9/16' }}>
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="text-center px-6">
              <div className="text-4xl mb-3">
                {DECADES.find(d => d.id === video.decade)?.emoji || '🎬'}
              </div>
              <p className="text-white font-bold text-lg leading-tight">{video.title}</p>
              <p className="text-gray-400 text-sm mt-2">{video.channel}</p>
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${video.videoId}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 transition">
              ▶ Watch on YouTube
            </a>
          </div>
          {/* Close */}
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-black/60 rounded-full text-white text-lg flex items-center justify-center">×</button>
          {/* Decade & category badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="bg-rose-gold text-white text-xs font-bold px-2 py-1 rounded-lg">{video.decade}</span>
          </div>
        </div>
        {/* Info bar */}
        <div className="p-4 flex items-center justify-between">
          <button onClick={onPrev} className="text-gray-400 hover:text-white text-2xl px-2">‹</button>
          <div className="text-center">
            <p className="text-gray-400 text-xs">{video.category}</p>
            <p className="text-pink-400 text-sm">♥ {formatLikes(video.likes)}</p>
          </div>
          <button onClick={onNext} className="text-gray-400 hover:text-white text-2xl px-2">›</button>
        </div>
      </div>
    </div>
  );
}

export default function VideoShorts() {
  const [selectedDecade, setSelectedDecade] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);

  const getFiltered = () => {
    return ALL_SHORTS.filter(v => {
      const decadeMatch = selectedDecade === 'All' || v.decade === selectedDecade;
      const catMatch = selectedCategory === 'All' || v.category === selectedCategory;
      return decadeMatch && catMatch;
    });
  };

  const filtered = getFiltered();
  const activeIndex = activeVideo ? filtered.findIndex(v => v.id === activeVideo.id) : -1;

  const goPrev = () => {
    if (activeIndex > 0) setActiveVideo(filtered[activeIndex - 1]);
  };
  const goNext = () => {
    if (activeIndex < filtered.length - 1) setActiveVideo(filtered[activeIndex + 1]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-retro text-4xl font-bold text-white mb-2">🎬 Decade Shorts</h1>
        <p className="text-gray-400">Vertical video clips from every era — swipe through history</p>
      </div>

      {/* Decade Filter — horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
        <button
          onClick={() => setSelectedDecade('All')}
          className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${selectedDecade === 'All' ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-400 border border-white/10 hover:text-rose-gold'}`}>
          All Decades
        </button>
        {DECADES.filter(d => SHORTS_BY_DECADE[d.id]).map(d => (
          <button key={d.id}
            onClick={() => setSelectedDecade(d.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-semibold transition-colors ${selectedDecade === d.id ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-400 border border-white/10 hover:text-rose-gold'}`}>
            {d.emoji} {d.id}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES_LIST.map(c => (
          <button key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${selectedCategory === c ? 'bg-white/20 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-gray-500 text-sm mb-5">{filtered.length} clips found</p>

      {/* Video Grid — 9:16 cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-4">🎬</div>
          <p>No clips for this filter yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(video => (
            <ShortCard
              key={video.id}
              video={video}
              onClick={setActiveVideo}
              isActive={activeVideo?.id === video.id}
            />
          ))}
        </div>
      )}

      {/* Add your content CTA */}
      <div className="mt-12 bg-gradient-to-r from-rose-gold/20 to-charcoal border border-rose-gold/20 rounded-3xl p-6 text-center">
        <div className="text-3xl mb-3">📹</div>
        <h3 className="font-retro text-xl font-bold text-white mb-2">Submit Your Decade Clip</h3>
        <p className="text-gray-400 text-sm mb-4">Have a great short video about a specific decade? Submit it to be featured in Decade Shorts.</p>
        <a href="mailto:anthonykittles@outlook.com?subject=Decade%20Shorts%20Submission"
          className="inline-block bg-rose-gold text-white px-6 py-3 rounded-2xl text-sm font-semibold hover:opacity-90 transition">
          Submit a Clip →
        </a>
      </div>

      {/* Modal */}
      {activeVideo && (
        <VideoModal
          video={activeVideo}
          onClose={() => setActiveVideo(null)}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </div>
  );
}
