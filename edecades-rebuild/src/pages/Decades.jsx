import { Link } from 'react-router-dom';
import { DECADES } from '../data/decades';

// One representative Wikimedia Commons photo per decade
const DECADE_PHOTOS = {
  '1900s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/1900s_decade_montage.png/640px-1900s_decade_montage.png',
  '1910s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/WWI_-_Trench_warfare.jpg/640px-WWI_-_Trench_warfare.jpg',
  '1920s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Roaring_Twenties_montage.png/640px-Roaring_Twenties_montage.png',
  '1930s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Dust_Bowl_-_Dallas%2C_South_Dakota_1936.jpg/640px-Dust_Bowl_-_Dallas%2C_South_Dakota_1936.jpg',
  '1940s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/640px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/1950s_decade_montage.png/640px-1950s_decade_montage.png',
  '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/1960s_decade_montage.png/640px-1960s_decade_montage.png',
  '1970s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/1970s_decade_montage.png/640px-1970s_decade_montage.png',
  '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/1980s_decade_montage.png/640px-1980s_decade_montage.png',
  '1990s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/1990s_decade_montage.png/640px-1990s_decade_montage.png',
  '2000s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/2000s_decade_montage.png/640px-2000s_decade_montage.png',
  '2010s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/2010s_decade_montage.png/640px-2010s_decade_montage.png',
  '2020s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/2020s_decade_montage.jpg/640px-2020s_decade_montage.jpg',
};

export default function Decades() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Explore Every Decade</h1>
      <p className="text-gray-400 text-center mb-10">From the Edwardian era to the digital age — click any decade to dive in</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DECADES.map(d => (
          <Link key={d.id} to={`/decade/${d.id}`}
            className="group bg-charcoal rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/50 block transition-all hover:-translate-y-1"
            style={{ borderTop: `3px solid ${d.color}` }}>
            <div className="relative h-44 overflow-hidden">
              <img
                src={DECADE_PHOTOS[d.id] || `https://source.unsplash.com/640x400/?${d.id},vintage,history`}
                alt={`${d.label} — ${d.tagline}`}
                loading="lazy"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="hidden w-full h-full bg-charcoal-dark items-center justify-center text-6xl absolute inset-0">
                {d.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="font-retro text-2xl font-black text-white drop-shadow-lg">{d.label}</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-rose-gold-light text-sm italic mb-1">{d.tagline}</p>
              <p className="text-gray-400 text-xs">{d.years}</p>
              <p className="text-xs text-gray-500 mt-2">Fashion · Food · Music · Culture →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
