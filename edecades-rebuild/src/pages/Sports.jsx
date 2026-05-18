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
          <a key={a.name}
            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(a.name)}`}
            target="_blank" rel="noopener noreferrer"
            className="bg-charcoal rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/40 transition-all hover:-translate-y-1 block group">
            {a.photo ? (
              <img
                src={a.photo}
                alt={`${a.name} — ${a.sport} ${a.decade}`}
                loading="lazy"
                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(a.name)}&background=333d4d&color=d4956e&size=480`; }}
                className="w-full h-52 object-cover object-top group-hover:opacity-90 transition-opacity"
              />
            ) : (
              <div className="w-full h-52 bg-charcoal-dark flex items-center justify-center text-6xl">
                {a.emoji}
              </div>
            )}
            <div className="p-5">
              <div className="flex gap-2 mb-2">
                <span className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded-full">{a.decade}</span>
                <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">{a.sport}</span>
              </div>
              <h2 className="font-retro text-xl font-bold text-white mb-1 group-hover:text-rose-gold transition-colors">{a.name}</h2>
              <p className="text-gray-400 text-xs mb-2">{a.team}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{a.highlights}</p>
              <span className="text-rose-gold-light text-xs mt-3 inline-block">Wikipedia ↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
