import { useState, useMemo, useCallback, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { DECADES, CATEGORIES, CATEGORY_DATA } from '../data/decades';
import { TRIVIA } from '../data/trivia';
import { SPORTS_MVPS } from '../data/sports';
import { ON_THIS_DAY } from '../data/onthisday';
import { MUSIC_BY_DECADE } from '../data/music';

const MEDIA_SEARCH_URL = 'https://base44.app/api/functions/mediaSearch';

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
const TYPE_COLORS = {
  Decade: 'text-rose-400', Fashion: 'text-pink-400', Food: 'text-yellow-400',
  Beauty: 'text-purple-400', Art: 'text-orange-400', Technology: 'text-blue-400',
  Homes: 'text-green-400', Culture: 'text-teal-400', Trivia: 'text-yellow-300',
  'Sports MVP': 'text-emerald-400', History: 'text-red-400', Music: 'text-indigo-400',
  music: 'text-green-400', artist: 'text-teal-400', movie: 'text-blue-400', tv: 'text-purple-400'
};

const TYPE_ICONS = {
  music: '🎵', artist: '🎤', movie: '🎬', tv: '📺',
  Decade: '🗓️', Fashion: '👗', Food: '🍔', Trivia: '❓',
  'Sports MVP': '🏆', History: '📜', Music: '🎶'
};

function MediaCard({ item }) {
  const color = TYPE_COLORS[item.type] || 'text-gray-400';
  const icon = TYPE_ICONS[item.type] || '🔍';

  return (
    <div className="bg-charcoal rounded-xl p-4 border border-white/10 hover:border-rose-400/40 transition-all flex gap-3">
      {item.image && (
        <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" onError={e => e.target.style.display='none'} />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">{icon}</span>
          <span className={`text-xs font-medium uppercase tracking-wide ${color}`}>{item.type}</span>
          {item.decade && <span className="text-xs text-gray-500">· {item.decade}</span>}
          {item.rating && <span className="text-xs text-yellow-400">⭐ {item.rating}</span>}
        </div>
        <h3 className="text-white font-semibold truncate">{item.title}</h3>
        {item.artist && <p className="text-gray-400 text-sm">{item.artist}</p>}
        {item.overview && <p className="text-gray-400 text-sm line-clamp-2">{item.overview}</p>}
        {item.genres && <p className="text-gray-500 text-xs mt-1">{item.genres}</p>}
        <div className="flex gap-2 mt-2">
          {item.spotify_url && (
            <a href={item.spotify_url} target="_blank" rel="noreferrer"
              className="text-xs bg-green-900/40 text-green-400 px-2 py-1 rounded-full hover:bg-green-800/60 transition-colors">
              ▶ Spotify
            </a>
          )}
          {item.preview_url && (
            <button onClick={() => new Audio(item.preview_url).play()}
              className="text-xs bg-indigo-900/40 text-indigo-400 px-2 py-1 rounded-full hover:bg-indigo-800/60 transition-colors">
              🎧 Preview
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();

  // Pre-fill from ?q= param (set by quick-search navbar)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) { setQuery(q); fetchMedia(q); }
  }, [searchParams]);
  const [mediaResults, setMediaResults] = useState(null);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTimer, setSearchTimer] = useState(null);

  const staticResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return INDEX.filter(r => r.keywords.toLowerCase().includes(q)).slice(0, 12);
  }, [query]);

  const fetchMedia = useCallback(async (q) => {
    if (!q.trim() || q.length < 3) return;
    setLoadingMedia(true);
    try {
      const res = await fetch(MEDIA_SEARCH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q })
      });
      const data = await res.json();
      setMediaResults(data);
    } catch (e) {
      console.error('Media search failed:', e);
    } finally {
      setLoadingMedia(false);
    }
  }, []);

  const handleInput = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (searchTimer) clearTimeout(searchTimer);
    const timer = setTimeout(() => fetchMedia(val), 600);
    setSearchTimer(timer);
  };

  const allMediaItems = mediaResults ? [
    ...(mediaResults.music || []),
    ...(mediaResults.artists || []),
    ...(mediaResults.movies || []),
    ...(mediaResults.shows || []),
  ] : [];

  const tabs = [
    { id: 'all', label: 'All', count: staticResults.length + allMediaItems.length },
    { id: 'site', label: '📚 Site', count: staticResults.length },
    { id: 'music', label: '🎵 Music', count: (mediaResults?.music?.length || 0) + (mediaResults?.artists?.length || 0) },
    { id: 'movies', label: '🎬 Movies', count: mediaResults?.movies?.length || 0 },
    { id: 'tv', label: '📺 TV Shows', count: mediaResults?.shows?.length || 0 },
  ];

  const showSiteResults = activeTab === 'all' || activeTab === 'site';
  const showMusic = activeTab === 'all' || activeTab === 'music';
  const showMovies = activeTab === 'all' || activeTab === 'movies';
  const showTV = activeTab === 'all' || activeTab === 'tv';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">🔍 Search eDecades</h1>
      <p className="text-gray-400 text-center mb-8">Search across decades, music, movies, TV shows, history & more</p>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          value={query}
          onChange={handleInput}
          placeholder="Try 'Michael Jackson', 'Jaws', 'Friends', 'disco', '1980s'..."
          className="w-full bg-charcoal text-white rounded-2xl px-6 py-4 border border-white/20 focus:border-rose-400 outline-none text-base pl-12"
          autoFocus
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        {loadingMedia && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 animate-pulse text-sm">searching...</span>
        )}
      </div>

      {/* Tabs */}
      {query && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${activeTab === tab.id ? 'bg-rose-400/20 text-rose-400 border border-rose-400/40' : 'bg-charcoal text-gray-400 border border-white/10 hover:border-rose-400/30'}`}>
              {tab.label} {tab.count > 0 && <span className="ml-1 text-xs opacity-70">{tab.count}</span>}
            </button>
          ))}
        </div>
      )}

      {/* No query — show suggestions */}
      {!query && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Michael Jackson', 'Jaws', 'Friends', '1980s', 'disco', 'Beatles', 'Star Wars', 'moon landing'].map(s => (
            <button key={s} onClick={() => { setQuery(s); fetchMedia(s); }}
              className="bg-charcoal text-gray-300 hover:text-rose-400 border border-white/10 hover:border-rose-400/40 rounded-xl px-4 py-3 text-sm text-left transition-colors">
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {query && (
        <div className="space-y-6">
          {/* Site results */}
          {showSiteResults && staticResults.length > 0 && (
            <div>
              <h2 className="text-gray-500 text-xs uppercase tracking-widest mb-3">📚 eDecades Content</h2>
              <div className="space-y-2">
                {staticResults.map((r, i) => (
                  <Link key={i} to={r.link} className="block bg-charcoal rounded-xl p-4 border border-white/10 hover:border-rose-400/40 transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{TYPE_ICONS[r.type] || '🔍'}</span>
                      <span className={`text-xs font-medium ${TYPE_COLORS[r.type] || 'text-gray-400'}`}>{r.type}</span>
                    </div>
                    <h3 className="text-white font-semibold">{r.title}</h3>
                    <p className="text-gray-400 text-sm">{r.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Music */}
          {showMusic && (mediaResults?.music?.length > 0 || mediaResults?.artists?.length > 0) && (
            <div>
              <h2 className="text-gray-500 text-xs uppercase tracking-widest mb-3">🎵 Music & Artists</h2>
              <div className="space-y-2">
                {[...(mediaResults?.artists || []), ...(mediaResults?.music || [])].map((item, i) => (
                  <MediaCard key={i} item={item} />
                ))}
              </div>
            </div>
          )}

          {/* Movies */}
          {showMovies && mediaResults?.movies?.length > 0 && (
            <div>
              <h2 className="text-gray-500 text-xs uppercase tracking-widest mb-3">🎬 Movies</h2>
              <div className="space-y-2">
                {mediaResults.movies.map((item, i) => <MediaCard key={i} item={item} />)}
              </div>
            </div>
          )}

          {/* TV Shows */}
          {showTV && mediaResults?.shows?.length > 0 && (
            <div>
              <h2 className="text-gray-500 text-xs uppercase tracking-widest mb-3">📺 TV Shows</h2>
              <div className="space-y-2">
                {mediaResults.shows.map((item, i) => <MediaCard key={i} item={item} />)}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loadingMedia && staticResults.length === 0 && allMediaItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">No results for "{query}". Try another keyword.</div>
          )}
        </div>
      )}
    </div>
  );
}
