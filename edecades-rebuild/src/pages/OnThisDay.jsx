import { useState } from 'react';
import { ON_THIS_DAY } from '../data/onthisday';

const CATS = ['All', ...new Set(ON_THIS_DAY.map(e => e.category))];
const DECADES_LIST = ['All', ...new Set(ON_THIS_DAY.map(e => e.decade))].sort();

export default function OnThisDay() {
  const [catFilter, setCatFilter] = useState('All');
  const [decadeFilter, setDecadeFilter] = useState('All');

  const filtered = ON_THIS_DAY.filter(e =>
    (catFilter === 'All' || e.category === catFilter) &&
    (decadeFilter === 'All' || e.decade === decadeFilter)
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">📅 On This Day</h1>
      <p className="text-gray-400 text-center mb-8">Pivotal moments in history that changed everything</p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {CATS.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${catFilter === c ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-300 border border-white/10 hover:text-rose-gold'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {DECADES_LIST.map(d => (
          <button key={d} onClick={() => setDecadeFilter(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${decadeFilter === d ? 'bg-charcoal-light text-white' : 'bg-charcoal text-gray-400 border border-white/10 hover:text-rose-gold'}`}>
            {d}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((e, i) => (
          <div key={i} className="bg-charcoal rounded-2xl p-6 border border-white/10 hover:border-rose-gold/30 transition-all">
            <div className="flex flex-wrap items-start gap-3 mb-3">
              <div className="text-rose-gold font-bold font-retro text-lg">{e.date}, {e.year}</div>
              <span className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded-full">{e.decade}</span>
              <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">{e.category}</span>
            </div>
            <h2 className="font-retro text-xl font-bold text-white mb-2">{e.title}</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{e.description}</p>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">No events match your filters.</div>
      )}
    </div>
  );
}
