import { useState } from 'react';
import { ON_THIS_DAY } from '../data/onthisday';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getTodayLabel() {
  const now = new Date();
  return `${MONTHS[now.getMonth()]} ${now.getDate()}`;
}

function getTodayEvents() {
  const label = getTodayLabel();
  return ON_THIS_DAY.filter(e => e.date === label).sort((a, b) => a.year - b.year);
}

function getUpcomingEvents() {
  const now = new Date();
  const todayMD = now.getMonth() * 100 + now.getDate();
  return ON_THIS_DAY
    .filter(e => {
      const parts = e.date.split(' ');
      const m = MONTHS.indexOf(parts[0]);
      const d = parseInt(parts[1]);
      return m * 100 + d > todayMD;
    })
    .sort((a, b) => {
      const toMD = s => { const p = s.split(' '); return MONTHS.indexOf(p[0]) * 100 + parseInt(p[1]); };
      return toMD(a.date) - toMD(b.date);
    })
    .slice(0, 4);
}

const CATS = ['All', 'History', 'Technology', 'Music', 'Culture', 'Sports'];
const CAT_COLORS = {
  History:    'bg-amber-900/40 text-amber-400 border-amber-700/40',
  Technology: 'bg-blue-900/40 text-blue-400 border-blue-700/40',
  Music:      'bg-purple-900/40 text-purple-400 border-purple-700/40',
  Culture:    'bg-green-900/40 text-green-400 border-green-700/40',
  Sports:     'bg-red-900/40 text-red-400 border-red-700/40',
};

function EventPhoto({ src, alt }) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={e => { e.target.style.display = 'none'; }}
      className="w-full h-48 object-cover rounded-xl mb-4 opacity-90"
    />
  );
}

export default function OnThisDay() {
  const [catFilter, setCatFilter] = useState('All');
  const [modal, setModal] = useState(null);

  const todayLabel = getTodayLabel();
  const todayEvents = getTodayEvents();
  const upcomingEvents = getUpcomingEvents();

  const allFiltered = ON_THIS_DAY
    .filter(e => catFilter === 'All' || e.category === catFilter)
    .sort((a, b) => {
      const toMD = s => { const p = s.split(' '); return MONTHS.indexOf(p[0]) * 100 + parseInt(p[1]); };
      return toMD(a.date) - toMD(b.date);
    });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-retro text-4xl md:text-5xl font-black text-white mb-2">📅 On This Day</h1>
        <p className="text-gray-400">What happened on <span className="text-rose-gold font-semibold">{todayLabel}</span> throughout history</p>
      </div>

      {/* TODAY'S EVENTS — hero */}
      {todayEvents.length > 0 ? (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-rose-gold/30" />
            <span className="font-retro text-rose-gold font-bold text-lg whitespace-nowrap">Today — {todayLabel}</span>
            <div className="h-px flex-1 bg-rose-gold/30" />
          </div>
          <div className="space-y-5">
            {todayEvents.map((e, i) => (
              <button key={i} onClick={() => setModal(e)} className="w-full text-left">
                <div className="bg-charcoal border border-rose-gold/40 rounded-2xl overflow-hidden hover:border-rose-gold transition-all hover:-translate-y-0.5 shadow-lg shadow-rose-gold/5">
                  {e.photo && (
                    <img
                      src={e.photo}
                      alt={e.title}
                      loading="lazy"
                      onError={ev => { ev.target.style.display = 'none'; }}
                      className="w-full h-52 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="font-retro text-rose-gold font-black text-2xl">{e.year}</span>
                      <span className={`text-xs px-2 py-1 rounded-full border ${CAT_COLORS[e.category] || 'bg-white/10 text-gray-400 border-white/20'}`}>{e.category}</span>
                      <span className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded-full border border-white/10">{e.decade}</span>
                    </div>
                    <h2 className="font-retro text-xl font-bold text-white mb-2">{e.title}</h2>
                    <p className="text-gray-300 text-sm leading-relaxed">{e.description}</p>
                    <p className="text-rose-gold-light text-xs mt-3">Tap for details & links →</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      ) : (
        <section className="mb-12">
          <div className="bg-charcoal border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">🕰️</div>
            <h2 className="font-retro text-xl text-white mb-2">No featured events for {todayLabel}</h2>
            <p className="text-gray-400 text-sm">Browse the full historical archive below.</p>
          </div>
        </section>
      )}

      {/* Upcoming */}
      {upcomingEvents.length > 0 && (
        <section className="mb-12">
          <h2 className="font-retro text-xl text-white mb-4">🗓️ Coming Up</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {upcomingEvents.map((e, i) => (
              <button key={i} onClick={() => setModal(e)} className="text-left">
                <div className="bg-charcoal rounded-xl overflow-hidden border border-white/10 hover:border-rose-gold/30 transition-all flex gap-3">
                  {e.photo && (
                    <img src={e.photo} alt={e.title} loading="lazy"
                      onError={ev => { ev.target.style.display = 'none'; }}
                      className="w-20 h-20 object-cover shrink-0" />
                  )}
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-rose-gold text-sm font-semibold">{e.date}</span>
                      <span className="text-gray-500 text-xs">· {e.year}</span>
                    </div>
                    <h3 className="text-white text-sm font-medium leading-snug">{e.title}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATS.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              catFilter === c
                ? 'bg-rose-gold text-white border-rose-gold'
                : 'bg-charcoal text-gray-400 border-white/10 hover:text-rose-gold hover:border-rose-gold/40'
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* Full archive */}
      <h2 className="font-retro text-xl text-white mb-4">📚 Historical Archive</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allFiltered.map((e, i) => (
          <button key={i} onClick={() => setModal(e)} className="text-left">
            <div className={`rounded-xl overflow-hidden border transition-all hover:border-rose-gold/30 ${
              e.date === todayLabel ? 'border-rose-gold/50 bg-rose-gold/5' : 'bg-charcoal border-white/10'
            }`}>
              {e.photo && (
                <img src={e.photo} alt={e.title} loading="lazy"
                  onError={ev => { ev.target.style.display = 'none'; }}
                  className="w-full h-36 object-cover" />
              )}
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-rose-gold font-semibold text-sm">{e.date}, {e.year}</span>
                  {e.date === todayLabel && <span className="text-xs bg-rose-gold text-white px-2 py-0.5 rounded-full">Today</span>}
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${CAT_COLORS[e.category] || 'bg-white/10 text-gray-400 border-white/10'}`}>{e.category}</span>
                </div>
                <h3 className="text-white text-sm font-medium">{e.title}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Amber lightbox modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setModal(null)}>
          <div className="bg-charcoal-dark border border-amber-600/50 rounded-2xl max-w-lg w-full shadow-2xl shadow-amber-900/30 relative overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={ev => ev.stopPropagation()}>
            {modal.photo && (
              <img src={modal.photo} alt={modal.title} loading="lazy"
                onError={ev => { ev.target.style.display = 'none'; }}
                className="w-full h-56 object-cover" />
            )}
            <div className="p-7">
              <button onClick={() => setModal(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-retro text-amber-400 font-black text-3xl">{modal.year}</span>
                <div className="flex flex-col">
                  <span className="text-amber-500 text-sm font-medium">{modal.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border w-fit mt-1 ${CAT_COLORS[modal.category] || 'bg-white/10 text-gray-400 border-white/10'}`}>{modal.category}</span>
                </div>
              </div>
              <h2 className="font-retro text-2xl font-bold text-white mb-3">{modal.title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-5">{modal.description}</p>
              <div className="flex flex-wrap gap-2">
                <a href={`https://en.wikipedia.org/wiki/${encodeURIComponent(modal.title)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-amber-700/30 border border-amber-600/40 text-amber-300 hover:bg-amber-700/50 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  Wikipedia ↗
                </a>
                <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(modal.title + ' ' + modal.year)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-red-900/30 border border-red-700/40 text-red-400 hover:bg-red-900/50 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  YouTube ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
