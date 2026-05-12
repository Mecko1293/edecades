import { useState, useEffect } from 'react';
import { MUSIC_BY_DECADE } from '../data/music';

const DECADES_ORDER = ['1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];

// Auto-rotate index helper
function useRotation(max, intervalMs = 5000) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % max), intervalMs);
    return () => clearInterval(t);
  }, [max, intervalMs]);
  return idx;
}

function ArtistCard({ artist }) {
  return (
    <a
      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(artist.search)}`}
      target="_blank" rel="noopener noreferrer"
      className="group flex items-center gap-3 bg-charcoal-dark rounded-xl p-3 border border-white/10 hover:border-rose-gold/50 transition-all hover:scale-[1.02]"
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-700">
        <img src={artist.photo} alt={artist.name}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform"
          onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML='<div class="w-full h-full flex items-center justify-center text-2xl">🎤</div>'; }} />
      </div>
      <div>
        <p className="text-white text-sm font-semibold group-hover:text-rose-gold transition-colors">{artist.name}</p>
        <p className="text-gray-500 text-xs mt-0.5">▶ Play on YouTube</p>
      </div>
    </a>
  );
}

function SongCard({ song }) {
  return (
    <a
      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song.search)}`}
      target="_blank" rel="noopener noreferrer"
      className="group flex items-center gap-3 bg-charcoal-dark rounded-xl p-3 border border-white/10 hover:border-rose-gold/50 transition-all hover:scale-[1.02]"
    >
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-700">
        <img src={song.cover} alt={song.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML='<div class="w-full h-full flex items-center justify-center text-2xl">🎵</div>'; }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold group-hover:text-rose-gold transition-colors truncate">"{song.title}"</p>
        <p className="text-gray-400 text-xs mt-0.5 truncate">{song.artist}</p>
        <p className="text-gray-600 text-xs mt-0.5">▶ Listen on YouTube</p>
      </div>
    </a>
  );
}

export default function Music() {
  const [selected, setSelected] = useState('1980s');
  const m = MUSIC_BY_DECADE[selected];

  // Rotating featured artist & song
  const artistIdx = useRotation(m?.artists?.length || 1, 4000);
  const songIdx = useRotation(m?.songs?.length || 1, 5500);

  // When decade changes, reset
  useEffect(() => {}, [selected]);

  if (!m) return null;

  const featuredArtist = m.artists[artistIdx];
  const featuredSong = m.songs[songIdx];

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

      <div className="bg-charcoal rounded-3xl p-6 sm:p-8 border border-white/10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-700 flex-shrink-0">
            <img src={featuredArtist?.photo} alt={featuredArtist?.name}
              className="w-full h-full object-cover object-top"
              onError={e => { e.target.style.display='none'; e.target.parentElement.innerHTML='<div class="w-full h-full flex items-center justify-center text-3xl">🎶</div>'; }} />
          </div>
          <div>
            <h2 className="font-retro text-3xl font-bold text-white">{selected}</h2>
            <p className="text-rose-gold font-semibold">{m.genre}</p>
          </div>
        </div>

        <p className="text-gray-300 mb-8 leading-relaxed">{m.description}</p>

        {/* Featured rotating spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">🌟 Now Featuring</p>
            {featuredArtist && <ArtistCard artist={featuredArtist} />}
          </div>
          <div>
            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">🎵 Spotlight Song</p>
            {featuredSong && <SongCard song={featuredSong} />}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* All Artists */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🌟</span> Iconic Artists
            </h3>
            <div className="space-y-2">
              {m.artists.map((a, i) => (
                <ArtistCard key={i} artist={a} />
              ))}
            </div>
          </div>

          {/* All Songs */}
          <div>
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <span>🎵</span> Iconic Songs
            </h3>
            <div className="space-y-2">
              {m.songs.map((s, i) => (
                <SongCard key={i} song={s} />
              ))}
            </div>
          </div>
        </div>

        {/* Listen Button */}
        <a href={m.youtube} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
          ▶ Explore All {selected} Music on YouTube
        </a>
      </div>
    </div>
  );
}
