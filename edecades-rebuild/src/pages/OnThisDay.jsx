import { useState } from 'react';
import { ON_THIS_DAY } from '../data/onthisday';

const CAT_COLORS = {
  History:     'bg-red-900/40 text-red-400 border-red-800/40',
  Technology:  'bg-blue-900/40 text-blue-400 border-blue-800/40',
  Culture:     'bg-purple-900/40 text-purple-400 border-purple-800/40',
};

const CAT_ICONS = {
  History: '📜',
  Technology: '💡',
  Culture: '🎭',
};

const CATS = ['All', 'History', 'Technology', 'Culture'];
const DECADES_LIST = ['All', ...Array.from(new Set(ON_THIS_DAY.map(e => e.decade))).sort()];

export default function OnThisDay() {
  const [catFilter, setCatFilter]       = useState('All');
  const [decadeFilter, setDecadeFilter] = useState('All');
  const [expanded, setExpanded]         = useState(null);

  const filtered = ON_THIS_DAY.filter(e =>
    (catFilter === 'All'    || e.category === catFilter) &&
    (decadeFilter === 'All' || e.decade   === decadeFilter)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">📅 On This Day</h1>
      <p className="text-gray-400 text-center mb-10">Pivotal moments in history that changed everything</p>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {CATS.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              catFilter === c
                ? 'bg-rose-gold text-white border-rose-gold'
                : 'bg-charcoal text-gray-300 border-white/10 hover:text-rose-gold hover:border-rose-gold/40'
            }`}>
            {CAT_ICONS[c] || '🔍'} {c}
          </button>
        ))}
      </div>

      {/* Decade filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {DECADES_LIST.map(d => (
          <button key={d} onClick={() => setDecadeFilter(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
              decadeFilter === d
                ? 'bg-white/20 text-white border-white/40'
                : 'bg-charcoal text-gray-400 border-white/10 hover:text-rose-gold hover:border-rose-gold/30'
            }`}>
            {d}
          </button>
        ))}
      </div>

      {/* Events grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No events match your filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((e, i) => {
            const isOpen = expanded === i;
            const colorClass = CAT_COLORS[e.category] || 'bg-white/10 text-gray-300 border-white/10';
            return (
              <div
                key={i}
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`group bg-charcoal rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                  isOpen ? 'border-rose-gold shadow-lg shadow-rose-gold/10' : 'border-white/10 hover:border-rose-gold/40'
                }`}
              >
                {/* Photo */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={e.image}
                    alt={e.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={ev => { ev.target.style.display = 'none'; ev.target.nextSibling.style.display = 'flex'; }}
                  />
                  {/* Fallback */}
                  <div className="hidden w-full h-full bg-charcoal-dark items-center justify-center text-4xl absolute inset-0">
                    {CAT_ICONS[e.category] || '📅'}
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  {/* Date badge */}
                  <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-sm text-rose-gold text-xs font-bold font-retro px-3 py-1.5 rounded-full border border-rose-gold/30">
                    {e.date}, {e.year}
                  </div>
                  {/* Category badge */}
                  <div className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass}`}>
                    {CAT_ICONS[e.category]} {e.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h2 className="font-retro text-base font-bold text-white leading-snug">{e.title}</h2>
                    <span className="text-gray-500 text-sm flex-shrink-0 mt-0.5">{isOpen ? '▲' : '▼'}</span>
                  </div>

                  <span className="text-xs text-gray-500 mb-3 block">{e.decade}</span>

                  {/* Collapsed: preview */}
                  {!isOpen && (
                    <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{e.description}</p>
                  )}

                  {/* Expanded: full description */}
                  {isOpen && (
                    <div className="mt-1">
                      <p className="text-gray-200 text-sm leading-relaxed">{e.description}</p>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-rose-gold">
                        <span>📅</span>
                        <span>Click to collapse</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
