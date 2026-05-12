import { useParams, Link } from 'react-router-dom';
import { DECADES, CATEGORIES, CATEGORY_DATA } from '../data/decades';
import { MUSIC_BY_DECADE } from '../data/music';
import { SPORTS_MVPS } from '../data/sports';
import { DECADE_NARRATIVES } from '../data/decadeNarratives';
import { getCategoryImage, getDecadeImage } from '../data/images';

// Section block — heading + paragraph, exactly like Cultural Highlights style
function Section({ icon, title, children }) {
  return (
    <div className="mb-10">
      <h2 className="font-retro text-2xl font-bold text-white mb-3 flex items-center gap-2">
        <span>{icon}</span>{title}
      </h2>
      <div className="w-12 h-0.5 bg-rose-gold mb-4" />
      {children}
    </div>
  );
}

function NarrativeParagraph({ text }) {
  if (!text) return null;
  return (
    <p className="text-gray-300 text-base leading-relaxed">{text}</p>
  );
}

export default function DecadeDetail() {
  const { id } = useParams();
  const decade = DECADES.find(d => d.id === id);

  if (!decade) return (
    <div className="text-center py-24 text-gray-400">
      <div className="text-5xl mb-4">🕰️</div>
      <p>Decade not found. <Link to="/decades" className="text-rose-gold underline">Back to Decades</Link></p>
    </div>
  );

  const music    = MUSIC_BY_DECADE[id];
  const athletes = SPORTS_MVPS.filter(s => s.decade === id);
  const narr     = DECADE_NARRATIVES[id] || {};
  const heroImg  = getDecadeImage(id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">

      {/* Back */}
      <Link to="/decades" className="text-rose-gold hover:underline text-sm mb-6 inline-block">
        ← All Decades
      </Link>

      {/* Hero banner */}
      <div className="relative rounded-3xl overflow-hidden mb-10 h-56 sm:h-72">
        <img src={heroImg} alt={decade.label}
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display='none'; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-5xl">{decade.emoji}</span>
            <h1 className="font-retro text-5xl font-black text-white">{decade.label}</h1>
          </div>
          <p className="text-rose-gold italic">{decade.tagline}</p>
          <p className="text-gray-400 text-sm">{decade.years}</p>
        </div>
      </div>

      {/* ── CULTURAL HIGHLIGHTS (Fashion, Food, Beauty, Art, Tech, Homes, Culture) ── */}
      <Section icon="🌍" title="Cultural Highlights">
        <div className="space-y-8">
          {CATEGORIES.map(cat => {
            const text = CATEGORY_DATA[cat]?.[id];
            const img  = getCategoryImage(cat, id);
            if (!text) return null;
            return (
              <div key={cat} className="flex flex-col sm:flex-row gap-5 items-start">
                <img src={img} alt={cat}
                  className="w-full sm:w-36 h-28 sm:h-24 object-cover rounded-xl flex-shrink-0"
                  onError={e => { e.target.style.display='none'; }} />
                <div>
                  <h3 className="text-rose-gold font-semibold mb-1">{cat}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <hr className="border-white/10 mb-10" />

      {/* ── MUSIC ── */}
      {(narr.music || music) && (
        <Section icon="🎵" title={music ? `Music — ${music.genre}` : 'Music'}>
          <NarrativeParagraph text={narr.music} />
          {music && (
            <div className="mt-5">
              <p className="text-gray-400 text-sm mb-3 font-medium">Key artists of the era:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {music.artists.map(a => (
                  <span key={a} className="bg-charcoal text-rose-gold-light text-xs px-3 py-1.5 rounded-full border border-rose-gold/30">
                    {a}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-sm mb-3 font-medium">Iconic songs:</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {music.songs.map(s => (
                  <span key={s} className="bg-white/5 text-gray-300 text-xs px-3 py-1.5 rounded-full border border-white/10">
                    🎶 {s}
                  </span>
                ))}
              </div>
              <a href={music.youtube} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                ▶ Listen on YouTube
              </a>
            </div>
          )}
        </Section>
      )}

      <hr className="border-white/10 mb-10" />

      {/* ── FASHION ── */}
      {narr.fashion && (
        <Section icon="👗" title="Fashion Trends">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <img
              src={getCategoryImage('Fashion', id)}
              alt={`${id} fashion`}
              className="w-full sm:w-48 h-36 object-cover rounded-xl flex-shrink-0"
              onError={e => { e.target.style.display='none'; }}
            />
            <NarrativeParagraph text={narr.fashion} />
          </div>
        </Section>
      )}

      <hr className="border-white/10 mb-10" />

      {/* ── TOP EVENTS ── */}
      {narr.topEvents && (
        <Section icon="📰" title="Top Events">
          <NarrativeParagraph text={narr.topEvents} />
        </Section>
      )}

      <hr className="border-white/10 mb-10" />

      {/* ── NOTABLE FIGURES ── */}
      {narr.notableFigures && (
        <Section icon="⭐" title="Notable Figures">
          <NarrativeParagraph text={narr.notableFigures} />
        </Section>
      )}

      <hr className="border-white/10 mb-10" />

      {/* ── KEY INVENTIONS ── */}
      {narr.keyInventions && (
        <Section icon="💡" title="Key Inventions">
          <NarrativeParagraph text={narr.keyInventions} />
        </Section>
      )}

      <hr className="border-white/10 mb-10" />

      {/* ── SPORTS MVPs ── */}
      {athletes.length > 0 && (
        <Section icon="🏆" title={`Sports MVPs of the ${id}`}>
          <div className="space-y-4">
            {athletes.map(a => (
              <div key={a.name} className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0 mt-1">{a.emoji}</span>
                <div>
                  <h3 className="font-semibold text-white">{a.name}</h3>
                  <p className="text-rose-gold text-xs mb-1">{a.sport} · {a.team}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{a.highlights}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ── BOTTOM NAV ── */}
      <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
        {(() => {
          const idx  = DECADES.findIndex(d => d.id === id);
          const prev = DECADES[idx - 1];
          const next = DECADES[idx + 1];
          return (
            <>
              {prev
                ? <Link to={`/decade/${prev.id}`} className="text-rose-gold hover:underline text-sm">← {prev.label}</Link>
                : <span />}
              {next
                ? <Link to={`/decade/${next.id}`} className="text-rose-gold hover:underline text-sm">{next.label} →</Link>
                : <span />}
            </>
          );
        })()}
      </div>

    </div>
  );
}
