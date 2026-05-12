import { useState } from 'react';
import { ON_THIS_DAY } from '../data/onthisday';

const CATEGORIES = ['All', ...new Set(ON_THIS_DAY.map(e => e.category))];
const DECADES = ['All', ...new Set(ON_THIS_DAY.map(e => e.decade))].sort();

const CAT_COLORS = {
  History: 'text-red-400 bg-red-900/20',
  Technology: 'text-blue-400 bg-blue-900/20',
  Culture: 'text-purple-400 bg-purple-900/20',
  Science: 'text-green-400 bg-green-900/20',
};

export default function OnThisDay() {
  const [catFilter, setCatFilter] = useState('All');
  const [decadeFilter, setDecadeFilter] = useState('All');
  const [enlarged, setEnlarged] = useState(null);

  const filtered = ON_THIS_DAY.filter(e =>
    (catFilter === 'All' || e.category === catFilter) &&
    (decadeFilter === 'All' || e.decade === decadeFilter)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">📅 On This Day</h1>
      <p className="text-gray-400 text-center mb-8">Pivotal moments in history — click any card to enlarge</p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              catFilter === c ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-400 border border-white/10 hover:text-white'
            }`}>{c}</button>
        ))}
      </div>

      {/* Decade Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {DECADES.map(d => (
          <button key={d} onClick={() => setDecadeFilter(d)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              decadeFilter === d ? 'bg-charcoal-dark text-rose-gold border border-rose-gold/50' : 'bg-charcoal text-gray-500 border border-white/10 hover:text-gray-300'
            }`}>{d === 'All' ? 'All Decades' : d}</button>
        ))}
      </div>

      {/* Photo Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((event, i) => {
          const catStyle = CAT_COLORS[event.category] || 'text-gray-400 bg-gray-800/40';
          return (
            <button key={i} onClick={() => setEnlarged(event)}
              className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/50 transition-all text-left hover:shadow-lg hover:shadow-rose-gold/10 hover:-translate-y-0.5">
              {/* Photo */}
              <div className="relative h-44 overflow-hidden">
                <img src={event.image} alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.style.display='none'; e.target.parentElement.style.background='#1a1f2e'; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catStyle}`}>{event.category}</span>
                </div>
                {/* Year badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded-full">{event.year}</span>
                </div>
                {/* Tap hint */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-rose-gold text-white text-xs px-2 py-1 rounded-full">🔍 Enlarge</span>
                </div>
              </div>
              {/* Info */}
              <div className="bg-charcoal p-4">
                <p className="text-rose-gold text-xs font-medium mb-1">{event.date}, {event.year} · {event.decade}</p>
                <h3 className="text-white font-semibold text-sm group-hover:text-rose-gold transition-colors line-clamp-2">{event.title}</h3>
                {event.location && (
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    <span>📍</span>{event.location}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Enlarged Modal */}
      {enlarged && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setEnlarged(null)}>
          <div className="bg-charcoal rounded-3xl max-w-2xl w-full border border-white/20 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>

            {/* Big Photo */}
            <div className="relative">
              <img src={enlarged.image} alt={enlarged.title}
                className="w-full h-72 object-cover"
                onError={e => { e.target.style.display='none'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

              {/* Close */}
              <button onClick={() => setEnlarged(null)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors text-lg">
                ✕
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${CAT_COLORS[enlarged.category] || 'text-gray-300 bg-black/40'}`}>
                  {enlarged.category}
                </span>
                <span className="bg-rose-gold text-white text-xs font-bold px-2 py-1 rounded-full">{enlarged.decade}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-rose-gold text-sm font-medium mb-2">{enlarged.date}, {enlarged.year}</p>
              <h2 className="font-retro text-2xl font-bold text-white mb-4">{enlarged.title}</h2>
              <p className="text-gray-300 leading-relaxed mb-5">{enlarged.description}</p>

              {/* Location + Map */}
              {enlarged.location && (
                <div className="bg-charcoal-dark rounded-2xl p-4 mb-5 border border-white/10">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">📍</span>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm mb-1">Location</p>
                      <p className="text-gray-400 text-sm">{enlarged.location}</p>
                    </div>
                  </div>
                  {/* Embedded Map Preview using OpenStreetMap */}
                  {enlarged.lat && enlarged.lng && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-white/10">
                      <iframe
                        title={`Map: ${enlarged.title}`}
                        width="100%"
                        height="200"
                        frameBorder="0"
                        scrolling="no"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${enlarged.lng - 0.5}%2C${enlarged.lat - 0.3}%2C${enlarged.lng + 0.5}%2C${enlarged.lat + 0.3}&layer=mapnik&marker=${enlarged.lat}%2C${enlarged.lng}`}
                        style={{ border: 0 }}
                      />
                    </div>
                  )}
                  <a href={enlarged.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    🗺️ Open in Google Maps →
                  </a>
                </div>
              )}

              {/* Action links */}
              <div className="flex gap-3 flex-wrap">
                <a href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(enlarged.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-colors">
                  📖 Wikipedia
                </a>
                <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(enlarged.title + ' ' + enlarged.year)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm bg-red-900/30 hover:bg-red-900/50 text-red-400 px-4 py-2 rounded-xl transition-colors">
                  ▶ YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
