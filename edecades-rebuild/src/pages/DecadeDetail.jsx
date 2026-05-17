import { useParams, Link } from 'react-router-dom';
import { DECADES, CATEGORIES, CATEGORY_DATA } from '../data/decades';
import { MUSIC_BY_DECADE } from '../data/music';
import { SPORTS_MVPS } from '../data/sports';

export default function DecadeDetail() {
  const { id } = useParams();
  const decade = DECADES.find(d => d.id === id);

  if (!decade) return (
    <div className="text-center py-24 text-gray-400">
      <div className="text-5xl mb-4">🕰️</div>
      <p>Decade not found. <Link to="/decades" className="text-rose-gold underline">Back to Decades</Link></p>
    </div>
  );

  const music = MUSIC_BY_DECADE[id];
  const athletes = SPORTS_MVPS.filter(s => s.decade === id);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link to="/decades" className="text-rose-gold hover:underline text-sm mb-6 inline-block">← All Decades</Link>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-6xl">{decade.emoji}</span>
        <div>
          <h1 className="font-retro text-5xl font-black text-white">{decade.label}</h1>
          <p className="text-rose-gold-light italic">{decade.tagline}</p>
          <p className="text-gray-400 text-sm">{decade.years}</p>
        </div>
      </div>

      {/* Quick links bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        {[
          { href: `https://en.wikipedia.org/wiki/${id}`, label: 'Wikipedia' },
          { href: `https://www.youtube.com/results?search_query=${id}+history+documentary`, label: 'YouTube Docs' },
          { href: `https://www.google.com/search?q=${id}+fashion+history`, label: 'Fashion History' },
          { href: `https://www.google.com/search?q=${id}+top+events`, label: 'Top Events' },
        ].map(l => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
            className="text-xs px-3 py-1.5 rounded-full border border-rose-gold/40 text-rose-gold-light hover:bg-rose-gold/10 transition-colors">
            {l.label} ↗
          </a>
        ))}
      </div>

      {/* Categories */}
      <h2 className="font-retro text-2xl font-bold text-white mb-4">Life in the {id}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {CATEGORIES.map(cat => {
          const text = CATEGORY_DATA[cat]?.[id];
          const wikiUrl = `https://en.wikipedia.org/wiki/${id}_in_${cat.toLowerCase()}`;
          return text ? (
            <div key={cat} className="bg-charcoal rounded-xl p-5 border border-white/10 hover:border-rose-gold/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-rose-gold">{cat}</h3>
                <a href={wikiUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-rose-gold-light transition-colors">
                  Learn more ↗
                </a>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
            </div>
          ) : null;
        })}
      </div>

      {/* Music */}
      {music && (
        <div className="bg-charcoal rounded-2xl p-6 border border-white/10 mb-6">
          <h2 className="font-retro text-2xl font-bold text-white mb-1">🎵 {music.genre}</h2>
          <p className="text-gray-400 mb-4 text-sm">{music.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {music.artists.map(a => (
              <a key={a}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(a + ' ' + id)}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-charcoal-dark text-rose-gold-light text-xs px-3 py-1 rounded-full border border-rose-gold/30 hover:bg-rose-gold/10 transition-colors">
                {a} ↗
              </a>
            ))}
          </div>
          <a href={music.youtube} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            ▶ Explore on YouTube
          </a>
        </div>
      )}

      {/* Sports */}
      {athletes.length > 0 && (
        <div className="bg-charcoal rounded-2xl p-6 border border-white/10 mb-6">
          <h2 className="font-retro text-2xl font-bold text-white mb-4">🏆 Sports MVPs of the {id}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {athletes.map(a => (
              <a key={a.name}
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(a.name)}`}
                target="_blank" rel="noopener noreferrer"
                className="bg-charcoal-dark rounded-xl p-4 border border-white/10 hover:border-rose-gold/30 transition-colors block">
                <div className="text-3xl mb-2">{a.emoji}</div>
                <h3 className="font-semibold text-white">{a.name}</h3>
                <p className="text-rose-gold text-xs mb-1">{a.sport} · {a.team}</p>
                <p className="text-gray-400 text-xs leading-relaxed">{a.highlights}</p>
                <span className="text-xs text-rose-gold-light mt-2 inline-block">Wikipedia ↗</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Nav to adjacent decades */}
      <div className="flex justify-between mt-10">
        {(() => {
          const idx = DECADES.findIndex(d => d.id === id);
          const prev = DECADES[idx - 1];
          const next = DECADES[idx + 1];
          return (
            <>
              {prev ? (
                <Link to={`/decade/${prev.id}`} className="text-sm text-rose-gold hover:underline">
                  ← {prev.label}
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/decade/${next.id}`} className="text-sm text-rose-gold hover:underline">
                  {next.label} →
                </Link>
              ) : <span />}
            </>
          );
        })()}
      </div>
    </div>
  );
}
