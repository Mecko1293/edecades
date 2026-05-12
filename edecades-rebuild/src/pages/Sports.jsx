import { useState } from 'react';
import { SPORTS_MVPS } from '../data/sports';

const DECADES_LIST = ['All', ...[...new Set(SPORTS_MVPS.map(s => s.decade))].sort()];

export default function Sports() {
  const [filter, setFilter] = useState('All');
  const [enlarged, setEnlarged] = useState(null);
  const filtered = filter === 'All' ? SPORTS_MVPS : SPORTS_MVPS.filter(s => s.decade === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🏆 Sports MVPs</h1>
      <p className="text-gray-400 text-center mb-8">The greatest athletes from every era — click any card to learn more</p>

      {/* Decade Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {DECADES_LIST.map(d => (
          <button key={d} onClick={() => setFilter(d)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === d ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-300 border border-white/10 hover:text-rose-gold'
            }`}>
            {d === 'All' ? 'All Decades' : d}
          </button>
        ))}
      </div>

      {/* Cards Grid — with real athlete photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(a => (
          <button key={a.name} onClick={() => setEnlarged(a)}
            className="bg-charcoal rounded-2xl border border-white/10 hover:border-rose-gold/40 transition-all decade-card text-left group overflow-hidden">
            <div className="flex items-start gap-4 p-5">
              {/* Real Photo */}
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-700 border border-white/10">
                <img
                  src={a.photo}
                  alt={a.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-4xl">${a.emoji}</div>`;
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-retro text-lg font-bold text-white group-hover:text-rose-gold transition-colors truncate">{a.name}</h2>
                <div className="flex flex-wrap gap-1 mt-1 mb-2">
                  <span className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-0.5 rounded-full">{a.decade}</span>
                  <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 rounded-full">{a.sport}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1 font-medium">{a.team}</p>
              </div>
            </div>
            <div className="px-5 pb-4">
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">{a.highlights}</p>
              <p className="text-rose-gold text-xs mt-2 font-medium">Tap to read more →</p>
            </div>
          </button>
        ))}
      </div>

      {/* Enlarged Modal */}
      {enlarged && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setEnlarged(null)}>
          <div className="bg-charcoal rounded-3xl max-w-lg w-full border border-white/20 shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="relative h-48 bg-gradient-to-br from-charcoal-dark to-charcoal overflow-hidden">
              <img src={enlarged.photo} alt={enlarged.name}
                className="w-full h-full object-cover object-top opacity-60"
                onError={e => { e.target.style.display='none'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-4xl">{enlarged.emoji}</span>
                  <h2 className="font-retro text-2xl font-bold text-white">{enlarged.name}</h2>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs bg-rose-gold text-white px-2 py-0.5 rounded-full">{enlarged.decade}</span>
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{enlarged.sport}</span>
                </div>
              </div>
              <button onClick={() => setEnlarged(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors">
                ✕
              </button>
            </div>
            <div className="p-6">
              <p className="text-rose-gold text-sm font-medium mb-3">{enlarged.team}</p>
              <p className="text-gray-300 leading-relaxed">{enlarged.highlights}</p>
              <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(enlarged.name)}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                📖 Read on Wikipedia →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
