import { useState } from 'react';
import { DECADES, CATEGORIES, CATEGORY_DATA } from '../data/decades';

const CAT_ICONS = { Fashion: '👗', Food: '🍔', Beauty: '💄', Art: '🎨', Technology: '💻', Homes: '🏠', Culture: '🎭' };

export default function Categories() {
  const [selectedCat, setSelectedCat] = useState('Fashion');
  const [selectedDecade, setSelectedDecade] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Everything About Every Decade</h1>
      <p className="text-gray-400 text-center mb-8">Pick a category and explore all 13 decades</p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => { setSelectedCat(cat); setSelectedDecade(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedCat === cat
                ? 'bg-rose-gold text-white'
                : 'bg-charcoal text-gray-300 hover:text-rose-gold border border-white/10'
            }`}>
            <span>{CAT_ICONS[cat]}</span>{cat}
          </button>
        ))}
      </div>

      {/* Decade Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {DECADES.filter(d => CATEGORY_DATA[selectedCat]?.[d.id]).map(d => (
          <div key={d.id}
            className={`bg-charcoal rounded-2xl p-5 border cursor-pointer transition-all ${
              selectedDecade === d.id ? 'border-rose-gold' : 'border-white/10 hover:border-rose-gold/40'
            }`}
            onClick={() => setSelectedDecade(selectedDecade === d.id ? null : d.id)}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{d.emoji}</span>
              <div>
                <h3 className="font-retro text-lg font-bold text-white">{d.label}</h3>
                <p className="text-xs text-rose-gold-light">{d.tagline}</p>
              </div>
            </div>
            {selectedDecade === d.id && (
              <p className="text-gray-300 text-sm leading-relaxed mt-3 border-t border-white/10 pt-3">
                {CATEGORY_DATA[selectedCat][d.id]}
              </p>
            )}
            {selectedDecade !== d.id && (
              <p className="text-gray-500 text-xs mt-2 line-clamp-2">{CATEGORY_DATA[selectedCat]?.[d.id]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
