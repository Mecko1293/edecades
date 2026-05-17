import { useState } from 'react';
import { MUSIC_BY_DECADE } from '../data/music';

const DECADES_ORDER = ['1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];

export default function Music() {
  const [selected, setSelected] = useState('1980s');
  const m = MUSIC_BY_DECADE[selected];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🎵 Music by Decade</h1>
      <p className="text-gray-400 text-center mb-8">From Jazz to TikTok Pop — explore every era's sound</p>

      {/* Decade Selector */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {DECADES_ORDER.map(d => (
          <button key={d} onClick={() => setSelected(d)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selected === d ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-300 hover:text-rose-gold border border-white/10'
            }`}>{d}</button>
        ))}
      </div>

      {m && (
        <div className="bg-charcoal rounded-3xl p-8 border border-white/10">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-5xl">🎶</span>
            <div>
              <h2 className="font-retro text-3xl font-bold text-white">{selected}</h2>
              <p className="text-rose-gold font-semibold">{m.genre}</p>
            </div>
          </div>
          <p className="text-gray-300 mb-6 leading-relaxed">{m.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-white font-semibold mb-3">🌟 Iconic Artists</h3>
              <div className="flex flex-wrap gap-2">
                {m.artists.map(a => (
                  <span key={a} className="bg-charcoal-dark text-rose-gold-light text-sm px-3 py-1 rounded-full border border-rose-gold/30">{a}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">🎵 Iconic Songs</h3>
              <div className="flex flex-wrap gap-2">
                {m.songs.map(s => (
                  <span key={s} className="bg-charcoal-dark text-gray-300 text-sm px-3 py-1 rounded-full border border-white/20">"{s}"</span>
                ))}
              </div>
            </div>
          </div>

          <a href={m.youtube} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
            ▶ Listen to {selected} Music on YouTube
          </a>
        </div>
      )}
    </div>
  );
}
