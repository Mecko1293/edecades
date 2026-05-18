import { useState } from 'react';
import { DECADES, CATEGORIES, CATEGORY_DATA } from '../data/decades';

const CAT_ICONS = { Fashion: '👗', Food: '🍔', Beauty: '💄', Art: '🎨', Technology: '💻', Homes: '🏠', Culture: '🎭' };

const CAT_PHOTOS = {
  Fashion: {
    '1900s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Edwardian_fashion.jpg/330px-Edwardian_fashion.jpg',
    '1920s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flappers-1920s.jpg/330px-Flappers-1920s.jpg',
    '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Poodle_skirt.jpg/330px-Poodle_skirt.jpg',
    '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Twiggy_1967.jpg/330px-Twiggy_1967.jpg',
    '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/1980s_fashion.jpg/330px-1980s_fashion.jpg',
  },
  Technology: {
    '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/330px-Sputnik_asm.jpg',
    '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Aldrin_Apollo_11_original.jpg/330px-Aldrin_Apollo_11_original.jpg',
    '1970s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Motorola_DynaTAC8000X.jpg/330px-Motorola_DynaTAC8000X.jpg',
    '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Challenger_explosion.jpg/330px-Challenger_explosion.jpg',
    '2000s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/IPhone_2G.jpg/330px-IPhone_2G.jpg',
  },
};

const DECADE_PHOTOS = {
  '1900s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/1900s_decade_montage.png/330px-1900s_decade_montage.png',
  '1910s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/World_war_one_poster.jpg/330px-World_war_one_poster.jpg',
  '1920s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flappers-1920s.jpg/330px-Flappers-1920s.jpg',
  '1930s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Dust_Bowl_-_Dallas%2C_South_Dakota_1936.jpg/330px-Dust_Bowl_-_Dallas%2C_South_Dakota_1936.jpg',
  '1940s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/330px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/330px-Elvis_Presley_promoting_Jailhouse_Rock.jpg',
  '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/March_on_Washington_edit.jpg/330px-March_on_Washington_edit.jpg',
  '1970s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Wembley_Stadium_Live_Aid.jpg/330px-Wembley_Stadium_Live_Aid.jpg',
  '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berlinermauer.jpg/330px-Berlinermauer.jpg',
  '1990s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nirvana_around_1992_%28cropped%29.jpg/330px-Nirvana_around_1992_%28cropped%29.jpg',
  '2000s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg/330px-National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg',
  '2010s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/330px-President_Barack_Obama.jpg',
  '2020s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Syringe_and_vaccine.jpg/330px-Syringe_and_vaccine.jpg',
};

export default function Categories() {
  const [selectedCat, setSelectedCat] = useState('Fashion');
  const [selectedDecade, setSelectedDecade] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Everything About Every Decade</h1>
      <p className="text-gray-400 text-center mb-8">Pick a category and explore all 13 decades</p>

      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => { setSelectedCat(cat); setSelectedDecade(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedCat === cat ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-300 hover:text-rose-gold border border-white/10'
            }`}>
            <span>{CAT_ICONS[cat]}</span>{cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DECADES.filter(d => CATEGORY_DATA[selectedCat]?.[d.id]).map(d => {
          const photo = CAT_PHOTOS[selectedCat]?.[d.id] || DECADE_PHOTOS[d.id];
          return (
            <div key={d.id}
              className={`bg-charcoal rounded-2xl overflow-hidden border cursor-pointer transition-all ${
                selectedDecade === d.id ? 'border-rose-gold' : 'border-white/10 hover:border-rose-gold/40'
              }`}
              onClick={() => setSelectedDecade(selectedDecade === d.id ? null : d.id)}>
              {/* Decade photo */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={photo}
                  alt={`${d.label} ${selectedCat}`}
                  loading="lazy"
                  onError={e => { e.target.style.display='none'; }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-2xl">{d.emoji}</span>
                  <div>
                    <p className="font-retro text-lg font-bold text-white leading-none">{d.label}</p>
                    <p className="text-xs text-rose-gold-light">{d.tagline}</p>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div className="p-4">
                {selectedDecade === d.id ? (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {CATEGORY_DATA[selectedCat][d.id]}
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs line-clamp-2">{CATEGORY_DATA[selectedCat]?.[d.id]}</p>
                )}
                <p className="text-rose-gold text-xs mt-2">{selectedDecade === d.id ? 'Tap to collapse ↑' : 'Tap to expand ↓'}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
