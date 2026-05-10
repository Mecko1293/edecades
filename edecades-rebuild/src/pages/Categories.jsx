import { useState } from 'react';
import { DECADES, CATEGORIES, CATEGORY_DATA } from '../data/decades';
import { getCategoryImage } from '../data/images';

const CAT_ICONS = { Fashion: '👗', Food: '🍔', Beauty: '💄', Art: '🎨', Technology: '💻', Homes: '🏠', Culture: '🎭' };
const CAT_COLORS = {
  Fashion: 'from-pink-900/60', Food: 'from-yellow-900/60', Beauty: 'from-purple-900/60',
  Art: 'from-orange-900/60', Technology: 'from-blue-900/60', Homes: 'from-green-900/60', Culture: 'from-teal-900/60'
};

export default function Categories() {
  const [selectedCat, setSelectedCat] = useState('Fashion');
  const [selectedDecade, setSelectedDecade] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Everything About Every Decade</h1>
      <p className="text-gray-400 text-center mb-8">Pick a category and explore all 13 decades</p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => { setSelectedCat(cat); setSelectedDecade(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
              selectedCat === cat
                ? 'bg-rose-gold text-white shadow-lg shadow-rose-gold/20 scale-105'
                : 'bg-charcoal text-gray-300 hover:text-rose-gold border border-white/10 hover:border-rose-gold/40'
            }`}>
            <span className="text-base">{CAT_ICONS[cat]}</span>{cat}
          </button>
        ))}
      </div>

      {/* Decade Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {DECADES.filter(d => CATEGORY_DATA[selectedCat]?.[d.id]).map(d => {
          const img = getCategoryImage(selectedCat, d.id);
          const isOpen = selectedDecade === d.id;
          return (
            <div key={d.id}
              className={`rounded-2xl border overflow-hidden cursor-pointer transition-all group ${
                isOpen ? 'border-rose-gold shadow-lg shadow-rose-gold/10' : 'border-white/10 hover:border-rose-gold/40'
              }`}
              onClick={() => setSelectedDecade(isOpen ? null : d.id)}>

              {/* Image header */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={img}
                  alt={`${selectedCat} in the ${d.label}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${CAT_COLORS[selectedCat]} to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end gap-2">
                  <span className="text-2xl">{d.emoji}</span>
                  <div>
                    <h3 className="font-retro text-lg font-bold text-white leading-tight">{d.label}</h3>
                    <p className="text-xs text-rose-gold/80">{d.tagline}</p>
                  </div>
                  <span className={`ml-auto text-white/60 text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
                </div>
              </div>

              {/* Content */}
              <div className="bg-charcoal px-4 py-3">
                {isOpen ? (
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {CATEGORY_DATA[selectedCat][d.id]}
                  </p>
                ) : (
                  <p className="text-gray-500 text-xs line-clamp-2">
                    {CATEGORY_DATA[selectedCat]?.[d.id]}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
