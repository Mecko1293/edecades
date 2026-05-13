import { useState } from 'react';
import { SPORTS_MVPS } from '../data/sports';

const DECADES_LIST = ['All', ...[...new Set(SPORTS_MVPS.map(s => s.decade))].sort()];
const SPORTS_LIST = ['All', ...[...new Set(SPORTS_MVPS.map(s => s.sport))].sort()];

const SPORT_COLORS = {
  'Basketball': 'from-orange-900/80',
  'Baseball': 'from-blue-900/80',
  'Boxing': 'from-red-900/80',
  'Soccer': 'from-green-900/80',
  'Hockey': 'from-cyan-900/80',
  'Golf': 'from-emerald-900/80',
  'Tennis': 'from-yellow-900/80',
  'Track & Field': 'from-purple-900/80',
  'Gymnastics': 'from-pink-900/80',
  'Multi-Sport': 'from-amber-900/80',
};

function AthleteModal({ athlete, onClose }) {
  if (!athlete) return null;
  const gradColor = SPORT_COLORS[athlete.sport] || 'from-gray-900/80';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#1a1f2e] rounded-3xl border border-rose-gold/30 max-w-lg w-full overflow-hidden shadow-2xl shadow-rose-gold/10"
        onClick={e => e.stopPropagation()}>
        {/* Hero Photo */}
        <div className="relative h-72 overflow-hidden">
          <img src={athlete.photo} alt={athlete.name}
            className="w-full h-full object-cover object-top"
            onError={e => {
              e.target.style.display = 'none';
              e.target.parentElement.style.background = '#1a1f2e';
              e.target.parentElement.innerHTML += `<div class="absolute inset-0 flex items-center justify-center text-8xl">${athlete.emoji}</div>`;
            }} />
          <div className={`absolute inset-0 bg-gradient-to-t ${gradColor} via-transparent to-transparent`} />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center text-xl hover:bg-rose-gold/60 transition-colors">
            ×
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-end gap-3">
              <span className="text-4xl">{athlete.emoji}</span>
              <div>
                <h2 className="font-retro text-2xl font-bold text-white">{athlete.name}</h2>
                <p className="text-rose-gold text-sm">{athlete.position} · {athlete.team}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Details */}
        <div className="p-5 space-y-3">
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs bg-rose-gold/20 text-rose-gold px-3 py-1 rounded-full font-semibold">{athlete.decade}</span>
            <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{athlete.sport}</span>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">{athlete.highlights}</p>
        </div>
      </div>
    </div>
  );
}

export default function Sports() {
  const [decadeFilter, setDecadeFilter] = useState('All');
  const [sportFilter, setSportFilter] = useState('All');
  const [enlarged, setEnlarged] = useState(null);

  const filtered = SPORTS_MVPS.filter(a =>
    (decadeFilter === 'All' || a.decade === decadeFilter) &&
    (sportFilter === 'All' || a.sport === sportFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Sports MVPs</h1>
      <p className="text-gray-400 text-center mb-8">The greatest athletes from every era — click any card for their full story</p>

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

      {/* Sport Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {SPORTS_LIST.map(s => (
          <button key={s} onClick={() => setSportFilter(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              sportFilter === s ? 'bg-charcoal-dark text-rose-gold border border-rose-gold/50' : 'bg-charcoal text-gray-500 border border-white/10 hover:text-gray-300'
            }`}>
            {s}
          </button>
        ))}
      </div>

      {/* Cards Grid — large hero photo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(a => {
          const gradColor = SPORT_COLORS[a.sport] || 'from-gray-900/80';
          return (
            <button key={a.name} onClick={() => setEnlarged(a)}
              className="group rounded-2xl border border-white/10 hover:border-rose-gold/50 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-gold/10 text-left">

              {/* Hero Photo — full card width, tall */}
              <div className="relative h-56 overflow-hidden bg-[#1a1f2e]">
                <img
                  src={a.photo}
                  alt={a.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-7xl bg-[#1a1f2e]">${a.emoji}</div>`;
                  }}
                />
                {/* Gradient from bottom */}
                <div className={`absolute inset-0 bg-gradient-to-t ${gradColor} via-transparent to-transparent`} />
                {/* Sport badge top-left */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black/50 text-white text-[10px] font-semibold px-2 py-1 rounded-full backdrop-blur-sm">
                    {a.emoji} {a.sport}
                  </span>
                </div>
                {/* Decade badge top-right */}
                <div className="absolute top-3 right-3">
                  <span className="bg-rose-gold/80 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    {a.decade}
                  </span>
                </div>
                {/* Name at bottom of photo */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h2 className="font-retro text-lg font-bold text-white group-hover:text-rose-gold transition-colors leading-tight">{a.name}</h2>
                  <p className="text-gray-300 text-xs">{a.position} · {a.team}</p>
                </div>
              </div>

              {/* Short highlights strip */}
              <div className="bg-charcoal px-4 py-3">
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{a.highlights}</p>
                <p className="text-rose-gold text-xs mt-2 font-medium">Tap for full story →</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">No athletes found for this filter.</div>
      )}

      {/* Modal */}
      <AthleteModal athlete={enlarged} onClose={() => setEnlarged(null)} />
    </div>
  );
}
