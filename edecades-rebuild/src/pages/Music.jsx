import { useState } from 'react';
import { MUSIC_BY_DECADE } from '../data/music';

const DECADES_ORDER = ['1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];

// Representative artist/era photos from Wikimedia Commons
const MUSIC_PHOTOS = {
  '1920s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Louis_Armstrong_restored.jpg/330px-Louis_Armstrong_restored.jpg',
  '1930s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Benny_Goodman_-_Life.jpg/330px-Benny_Goodman_-_Life.jpg',
  '1940s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Frank_Sinatra_Pal_Joey_1957.jpg/330px-Frank_Sinatra_Pal_Joey_1957.jpg',
  '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Elvis_Presley_1970.jpg/330px-Elvis_Presley_1970.jpg',
  '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/The_Beatles_and_Ed_Sullivan.jpg/330px-The_Beatles_and_Ed_Sullivan.jpg',
  '1970s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Bee_Gees_1979.jpg/330px-Bee_Gees_1979.jpg',
  '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Michael_Jackson_Dangerous_World_Tour.jpg/330px-Michael_Jackson_Dangerous_World_Tour.jpg',
  '1990s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Nirvana_around_1992.jpg/330px-Nirvana_around_1992.jpg',
  '2000s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Eminem_Concert_for_Valor_2014.jpg/330px-Eminem_Concert_for_Valor_2014.jpg',
  '2010s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Taylor_Swift_-_Red_Tour.jpg/330px-Taylor_Swift_-_Red_Tour.jpg',
  '2020s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/The_Weeknd_2018.jpg/330px-The_Weeknd_2018.jpg',
};

export default function Music() {
  const [selected, setSelected] = useState('1980s');
  const m = MUSIC_BY_DECADE[selected];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🎵 Music by Decade</h1>
      <p className="text-gray-400 text-center mb-8">From Jazz to TikTok Pop — explore every era's sound</p>

      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {DECADES_ORDER.map(d => (
          <button key={d} onClick={() => setSelected(d)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selected === d ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-300 hover:text-rose-gold border border-white/10'
            }`}>{d}</button>
        ))}
      </div>

      {m && (
        <div className="bg-charcoal rounded-3xl overflow-hidden border border-white/10">
          {/* Era Photo */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={MUSIC_PHOTOS[selected]}
              alt={`${selected} music — ${m.genre}`}
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; }}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <p className="text-rose-gold font-semibold text-lg">{m.genre}</p>
              <h2 className="font-retro text-4xl font-black text-white">{selected}</h2>
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-300 mb-6 leading-relaxed">{m.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-white font-semibold mb-3">🌟 Iconic Artists</h3>
                <div className="flex flex-wrap gap-2">
                  {m.artists.map(a => (
                    <a key={a}
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(a + ' ' + selected)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="bg-charcoal-dark text-rose-gold-light text-sm px-3 py-1 rounded-full border border-rose-gold/30 hover:bg-rose-gold/10 transition-colors">
                      {a} ↗
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">🎵 Iconic Songs</h3>
                <div className="flex flex-wrap gap-2">
                  {m.songs.map(s => (
                    <a key={s}
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(s)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="bg-charcoal-dark text-gray-300 text-sm px-3 py-1 rounded-full border border-white/20 hover:border-rose-gold/30 transition-colors">
                      "{s}" ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href={m.youtube} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              ▶ Listen to {selected} Music on YouTube
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
