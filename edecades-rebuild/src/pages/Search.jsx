import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DECADES, CATEGORIES, CATEGORY_DATA } from '../data/decades';
import { TRIVIA } from '../data/trivia';
import { SPORTS_MVPS } from '../data/sports';
import { ON_THIS_DAY } from '../data/onthisday';
import { MUSIC_BY_DECADE } from '../data/music';

function buildIndex() {
  const results = [];
  DECADES.forEach(d => {
    results.push({ type: 'Decade', title: d.label, subtitle: d.tagline, link: `/decade/${d.id}`, keywords: `${d.label} ${d.tagline} ${d.years}` });
    CATEGORIES.forEach(cat => {
      const text = CATEGORY_DATA[cat]?.[d.id];
      if (text) results.push({ type: cat, title: `${cat} in the ${d.label}`, subtitle: text.slice(0, 100) + '...', link: `/categories`, keywords: `${cat} ${d.label} ${text}` });
    });
  });
  TRIVIA.forEach(q => results.push({ type: 'Trivia', title: q.question, subtitle: `${q.decade} · ${q.category}`, link: '/trivia', keywords: `${q.question} ${q.decade} ${q.category}` }));
  SPORTS_MVPS.forEach(s => results.push({ type: 'Sports MVP', title: s.name, subtitle: `${s.sport} · ${s.decade} · ${s.team}`, link: '/sports', keywords: `${s.name} ${s.sport} ${s.decade} ${s.highlights}` }));
  ON_THIS_DAY.forEach(e => results.push({ type: 'History', title: e.title, subtitle: `${e.date}, ${e.year} · ${e.category}`, link: '/onthisday', keywords: `${e.title} ${e.description} ${e.year}` }));
  Object.entries(MUSIC_BY_DECADE).forEach(([decade, m]) => {
    results.push({ type: 'Music', title: `${decade} — ${m.genre}`, subtitle: m.description.slice(0, 100) + '...', link: '/music', keywords: `${decade} ${m.genre} ${m.artists.join(' ')} ${m.songs.join(' ')}` });
  });
  return results;
}

const INDEX = buildIndex();
const TYPE_COLORS = { Decade: 'text-rose-gold', Fashion: 'text-pink-400', Food: 'text-yellow-400', Beauty: 'text-purple-400', Art: 'text-orange-400', Technology: 'text-blue-400', Homes: 'text-green-400', Culture: 'text-teal-400', Trivia: 'text-yellow-300', 'Sports MVP': 'text-emerald-400', History: 'text-red-400', Music: 'text-indigo-400' };

export default function Search() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INDEX.filter(r => r.keywords.toLowerCase().includes(q)).slice(0, 20);
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🔍 Search eDecades</h1>
      <p className="text-gray-400 text-center mb-8">Search across decades, history, music, sports and more</p>

      <div className="relative mb-8">
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder="Try 'Beatles', '1960s', 'Michael Jordan', 'disco'..."
          className="w-full bg-charcoal text-white rounded-2xl px-6 py-4 border border-white/20 focus:border-rose-gold outline-none text-base pl-12"
          autoFocus
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
      </div>

      {query && results.length === 0 && (
        <div className="text-center py-12 text-gray-500">No results for "{query}". Try another keyword.</div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-gray-500 text-sm">{results.length} results for "{query}"</p>
          {results.map((r, i) => (
            <Link key={i} to={r.link} className="block bg-charcoal rounded-xl p-4 border border-white/10 hover:border-rose-gold/40 transition-all">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-medium ${TYPE_COLORS[r.type] || 'text-gray-400'}`}>{r.type}</span>
              </div>
              <h3 className="text-white font-semibold">{r.title}</h3>
              <p className="text-gray-400 text-sm">{r.subtitle}</p>
            </Link>
          ))}
        </div>
      )}

      {!query && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['1980s', '1960s', 'Beatles', 'Michael Jordan', 'disco', 'World War', 'fashion', 'moon landing'].map(s => (
            <button key={s} onClick={() => setQuery(s)}
              className="bg-charcoal text-gray-300 hover:text-rose-gold border border-white/10 hover:border-rose-gold/40 rounded-xl px-4 py-3 text-sm text-left transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
