import { useState, useEffect, useRef } from 'react';
import { DECADES, CATEGORIES, CATEGORY_DATA } from '../data/decades';
import { usePixabay } from '../hooks/usePixabay';

const CAT_ICONS = { Fashion: '👗', Food: '🍔', Beauty: '💄', Art: '🎨', Technology: '💻', Homes: '🏠', Culture: '🎭' };
const CAT_COLORS = {
  Fashion: 'from-pink-900/70', Food: 'from-yellow-900/70', Beauty: 'from-purple-900/70',
  Art: 'from-orange-900/70', Technology: 'from-blue-900/70', Homes: 'from-green-900/70', Culture: 'from-teal-900/70',
};

// Single card that fetches its own Pixabay photo
function DecadeCard({ cat, decade, isOpen, onToggle }) {
  const { images, loading } = usePixabay({ category: cat, decade: decade.id, count: 3 });
  const [imgIdx, setImgIdx] = useState(0);
  const timerRef = useRef(null);

  // Rotate through images every 4s when we have multiple
  useEffect(() => {
    if (images.length > 1) {
      timerRef.current = setInterval(() => setImgIdx(i => (i + 1) % images.length), 4000);
    }
    return () => clearInterval(timerRef.current);
  }, [images.length]);

  const currentImg = images[imgIdx];

  return (
    <div
      className={`rounded-2xl border overflow-hidden cursor-pointer transition-all group ${
        isOpen ? 'border-rose-gold shadow-lg shadow-rose-gold/10' : 'border-white/10 hover:border-rose-gold/40'
      }`}
      onClick={onToggle}
    >
      {/* Pixabay Photo Header */}
      <div className="relative h-44 overflow-hidden bg-charcoal-dark">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin" />
          </div>
        )}
        {images.map((src, i) => (
          <img key={i} src={src} alt={`${cat} in the ${decade.label}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 group-hover:scale-105 ${i === imgIdx ? 'opacity-100' : 'opacity-0'}`}
            style={{ transform: 'scale(1)', transition: 'transform 0.5s ease, opacity 1s ease' }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        ))}

        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${CAT_COLORS[cat]} to-transparent`} />

        {/* Photo count dots */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {images.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === imgIdx ? 'bg-rose-gold' : 'bg-white/30'}`} />
            ))}
          </div>
        )}

        {/* Powered by Pixabay badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-black/40 text-white/50 text-[9px] px-1.5 py-0.5 rounded">📷 Pixabay</span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end gap-2">
          <span className="text-2xl">{decade.emoji}</span>
          <div className="flex-1">
            <h3 className="font-retro text-lg font-bold text-white leading-tight">{decade.label}</h3>
            <p className="text-xs text-rose-gold/80">{decade.tagline}</p>
          </div>
          <span className={`text-white/60 text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-charcoal px-4 py-3">
        {isOpen ? (
          <p className="text-gray-200 text-sm leading-relaxed">
            {CATEGORY_DATA[cat]?.[decade.id]}
          </p>
        ) : (
          <p className="text-gray-500 text-xs line-clamp-2">
            {CATEGORY_DATA[cat]?.[decade.id]}
          </p>
        )}
      </div>
    </div>
  );
}

export default function Categories() {
  const [selectedCat, setSelectedCat] = useState('Fashion');
  const [selectedDecade, setSelectedDecade] = useState(null);

  const validDecades = DECADES.filter(d => CATEGORY_DATA[selectedCat]?.[d.id]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Everything About Every Decade</h1>
      <p className="text-gray-400 text-center mb-8">
        Pick a category — photos load live from Pixabay and rotate automatically
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => { setSelectedCat(cat); setSelectedDecade(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
              selectedCat === cat
                ? 'bg-rose-gold text-white shadow-lg shadow-rose-gold/20 scale-105'
                : 'bg-charcoal text-gray-300 hover:text-rose-gold border border-white/10 hover:border-rose-gold/40'
            }`}>
            <span className="text-base">{CAT_ICONS[cat]}</span>{cat}
          </button>
        ))}
      </div>

      {/* Decade Grid — each card fetches its own Pixabay photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {validDecades.map(d => (
          <DecadeCard
            key={`${selectedCat}-${d.id}`}
            cat={selectedCat}
            decade={d}
            isOpen={selectedDecade === d.id}
            onToggle={() => setSelectedDecade(selectedDecade === d.id ? null : d.id)}
          />
        ))}
      </div>

      {/* Attribution */}
      <p className="text-center text-gray-600 text-xs mt-8">
        Photos sourced from <a href="https://pixabay.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-rose-gold transition-colors">Pixabay</a> — free for commercial use
      </p>
    </div>
  );
}
