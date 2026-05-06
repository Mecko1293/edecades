import { useState } from 'react';
import { SPORTS_MVPS } from '../data/sports';
import { DECADES } from '../data/decades';

const DECADES_LIST = [...new Set(SPORTS_MVPS.map(s => s.decade))].sort();

export default function Sports() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? SPORTS_MVPS : SPORTS_MVPS.filter(s => s.decade === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🏆 Sports MVPs</h1>
      <p className="text-gray-400 text-center mb-8">The greatest athletes of every era</p>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <button onClick={() => setFilter('All')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === 'All' ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-300 border border-white/10 hover:text-rose-gold'}`}>
          All Decades
        </button>
        {DECADES_LIST.map(d => (
          <button key={d} onClick={() => setFilter(d)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filter === d ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-300 border border-white/10 hover:text-rose-gold'}`}>
            {d}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(a => (
          <div key={a.name} className="bg-charcoal rounded-2xl p-6 border border-white/10 hover:border-rose-gold/40 transition-all decade-card">
            <div className="text-4xl mb-3">{a.emoji}</div>
            <h2 className="font-retro text-xl font-bold text-white mb-1">{a.name}</h2>
            <div className="flex gap-2 mb-3">
              <span className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded-full">{a.decade}</span>
              <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">{a.sport}</span>
            </div>
            <p className="text-gray-400 text-xs mb-2">{a.team}</p>
            <p className="text-gray-300 text-sm leading-relaxed">{a.highlights}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
