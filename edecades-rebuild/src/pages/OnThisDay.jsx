import { useState } from 'react';
import { ON_THIS_DAY } from '../data/onthisday';

const CATEGORIES = ['All', ...new Set(ON_THIS_DAY.map(e => e.category))];
const DECADES = ['All', ...[...new Set(ON_THIS_DAY.map(e => e.decade))].sort()];

const CAT_COLORS = {
  History:    'text-red-400    bg-red-900/20    border-red-800/40',
  Technology: 'text-blue-400   bg-blue-900/20   border-blue-800/40',
  Culture:    'text-purple-400 bg-purple-900/20  border-purple-800/40',
  Science:    'text-green-400  bg-green-900/20   border-green-800/40',
};

const CAT_BADGE = {
  History:    'bg-red-900/40    text-red-300',
  Technology: 'bg-blue-900/40   text-blue-300',
  Culture:    'bg-purple-900/40 text-purple-300',
  Science:    'bg-green-900/40  text-green-300',
};

// ── Modal shown when a card is clicked ──────────────────────────────────────
function EventModal({ event, onClose }) {
  if (!event) return null;
  const catStyle = CAT_COLORS[event.category] || 'text-gray-400 bg-gray-800/30 border-gray-700/40';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}>
      <div className="bg-[#1a1f2e] rounded-3xl border border-white/10 max-w-lg w-full overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>

        {/* Event scene photo — full width */}
        <div className="relative h-52 overflow-hidden">
          <img src={event.image} alt={event.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none'; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent" />
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white text-xl flex items-center justify-center hover:bg-rose-gold/60 transition-colors">
            ×
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Title + date */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${CAT_BADGE[event.category] || 'bg-gray-800 text-gray-400'}`}>
                {event.category}
              </span>
              <span className="text-gray-500 text-xs">{event.date}, {event.year} · {event.decade}</span>
            </div>
            <h2 className="font-retro text-xl font-bold text-white">{event.title}</h2>
          </div>

          {/* Person photo + name */}
          {event.person_photo && (
            <div className="flex items-center gap-3 bg-white/5 rounded-2xl p-3 border border-white/10">
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 bg-charcoal">
                <img src={event.person_photo} alt={event.person_name}
                  className="w-full h-full object-cover object-top"
                  onError={e => { e.target.style.display = 'none'; }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Key Figure</p>
                <p className="text-rose-gold font-semibold text-sm">{event.person_name}</p>
              </div>
            </div>
          )}

          {/* Description */}
          <p className="text-gray-300 text-sm leading-relaxed">{event.description}</p>

          {/* Location */}
          {event.location && (
            <a href={event.mapUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-rose-gold transition-colors">
              <span>📍</span>
              <span>{event.location}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Card shown in the grid ───────────────────────────────────────────────────
function EventCard({ event, onClick }) {
  const catBadge = CAT_BADGE[event.category] || 'bg-gray-800 text-gray-400';

  return (
    <button onClick={onClick}
      className="group rounded-2xl border border-white/10 hover:border-rose-gold/50 overflow-hidden transition-all text-left hover:shadow-lg hover:shadow-rose-gold/10 hover:-translate-y-0.5 bg-[#1a1f2e]">

      {/* Event scene photo */}
      <div className="relative h-40 overflow-hidden bg-charcoal">
        <img src={event.image} alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.style.display = 'none'; e.target.parentElement.style.background = '#1a1f2e'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f2e] via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catBadge}`}>{event.category}</span>
        </div>
        {/* Year badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/50 text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm">{event.year}</span>
        </div>
      </div>

      {/* Person photo strip — always visible on card */}
      {event.person_photo && (
        <div className="flex items-center gap-2.5 px-3 pt-3 pb-1">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-charcoal">
            <img src={event.person_photo} alt={event.person_name}
              className="w-full h-full object-cover object-top"
              onError={e => { e.target.style.display = 'none'; }} />
          </div>
          <div className="min-w-0">
            <p className="text-[9px] text-gray-600 uppercase tracking-widest leading-none mb-0.5">Key Figure</p>
            <p className="text-rose-gold text-xs font-semibold truncate">{event.person_name}</p>
          </div>
        </div>
      )}

      {/* Title + date */}
      <div className="px-3 py-2.5">
        <h3 className="font-retro text-sm font-bold text-white group-hover:text-rose-gold transition-colors leading-tight line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-500 text-[10px] mt-1">{event.date}, {event.year} · {event.decade}</p>
        <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">{event.description}</p>
        <p className="text-rose-gold/60 text-[10px] mt-2">Tap for full story →</p>
      </div>
    </button>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
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
      <p className="text-gray-400 text-center mb-8">
        Pivotal moments in history — every card shows the event photo <span className="text-rose-gold">+</span> the key person behind it
      </p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-3">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              catFilter === c ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-400 border border-white/10 hover:text-white'
            }`}>{c}</button>
        ))}
      </div>

      {/* Decade Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {DECADES.map(d => (
          <button key={d} onClick={() => setDecadeFilter(d)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              decadeFilter === d
                ? 'bg-charcoal-dark text-rose-gold border border-rose-gold/50'
                : 'bg-charcoal text-gray-500 border border-white/10 hover:text-gray-300'
            }`}>{d === 'All' ? 'All Decades' : d}</button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-center text-gray-600 text-xs mb-6">
        Showing {filtered.length} of {ON_THIS_DAY.length} events
      </p>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((event, i) => (
          <EventCard key={i} event={event} onClick={() => setEnlarged(event)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-500">No events match this filter.</div>
      )}

      {/* Modal */}
      <EventModal event={enlarged} onClose={() => setEnlarged(null)} />
    </div>
  );
}
