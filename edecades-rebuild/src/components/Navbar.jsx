import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/',           label: 'Home' },
  { to: '/decades',    label: 'Decades' },
  { to: '/categories', label: 'Every Decade' },
  { to: '/music',      label: 'Music' },
  { to: '/sports',     label: 'Sports MVPs' },
  { to: '/presidents', label: 'Presidents' },
  { to: '/trivia',     label: 'Trivia' },
  { to: '/onthisday',  label: 'On This Day' },
  { to: '/chat',       label: 'Ask a Figure' },
  { to: '/stats',      label: 'Decade Stats' },
  { to: '/timecapsule',label: 'Time Capsule' },
  { to: '/shorts',     label: 'Shorts' },
];

const QUICK_LINKS = [
  { to: '/decades',    label: 'Decades',      d: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { to: '/music',      label: 'Music',        d: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3' },
  { to: '/sports',     label: 'Sports MVPs',  d: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
  { to: '/presidents', label: 'Presidents',   d: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
  { to: '/trivia',     label: 'Trivia',       d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/onthisday',  label: 'On This Day',  d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/chat',       label: 'Ask a Figure', d: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
  { to: '/stats',      label: 'Decade Stats', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { to: '/shorts',     label: 'Shorts',       d: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
  { to: '/timecapsule',label: 'Time Capsule', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
  { to: '/profile',    label: 'Profile',      d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setQuickOpen(true);
        setQuickQuery('');
      }
      if (e.key === 'Escape') { setQuickOpen(false); setQuickQuery(''); }
      if (e.key === 'Enter' && quickOpen && quickQuery.trim()) {
        setQuickOpen(false);
        navigate(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
        setQuickQuery('');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [quickOpen, quickQuery, navigate]);

  useEffect(() => {
    if (quickOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 50);
  }, [quickOpen]);

  useEffect(() => { setOpen(false); }, [pathname]);

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      setQuickOpen(false);
      navigate(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
      setQuickQuery('');
    }
  };

  return (
    <>
      <nav className="bg-charcoal-dark border-b border-rose-gold/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Logo — clean SVG wordmark, no emoji */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-retro text-xl font-bold text-rose-gold">eDecades</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? 'bg-rose-gold text-white'
                    : 'text-gray-300 hover:text-rose-gold hover:bg-white/5'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => { setQuickOpen(true); setQuickQuery(''); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                pathname === '/search'
                  ? 'bg-rose-gold text-white border-rose-gold'
                  : 'bg-white/5 text-rose-gold border-rose-gold/50 hover:bg-rose-gold hover:text-white hover:border-rose-gold'
              }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden sm:inline ml-1 text-xs bg-white/10 text-gray-400 px-1.5 py-0.5 rounded font-mono">/</kbd>
            </button>

            {/* Profile icon — SVG, no emoji */}
            <Link to="/profile"
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                pathname === '/profile' ? 'border-rose-gold bg-rose-gold/20 text-rose-gold' : 'border-white/20 bg-white/5 text-gray-400 hover:border-rose-gold/50 hover:text-rose-gold'
              }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Mobile hamburger */}
            <button className="lg:hidden text-gray-300 hover:text-rose-gold ml-1" onClick={() => setOpen(!open)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-charcoal-dark border-t border-rose-gold/20 px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to ? 'bg-rose-gold text-white' : 'text-gray-300 hover:text-rose-gold'
                }`}>
                {l.label}
              </Link>
            ))}
            <Link to="/profile"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-rose-gold transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              My Profile
            </Link>
            <button
              onClick={() => { setOpen(false); setQuickOpen(true); setQuickQuery(''); }}
              className="px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors mt-1 border text-rose-gold border-rose-gold/40 hover:bg-rose-gold hover:text-white">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              Search Music, Movies & More
            </button>
          </div>
        )}
      </nav>

      {/* Quick Search Modal */}
      {quickOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setQuickOpen(false); setQuickQuery(''); } }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-xl bg-[#1e232d] rounded-2xl border border-rose-gold/30 shadow-2xl overflow-hidden">
            <form onSubmit={handleQuickSubmit} className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <svg className="w-5 h-5 text-rose-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                ref={inputRef}
                value={quickQuery}
                onChange={e => setQuickQuery(e.target.value)}
                placeholder="Search music, movies, decades, history..."
                className="flex-1 bg-transparent text-white text-base outline-none placeholder-gray-500"
              />
              {quickQuery && <kbd className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded font-mono">↵ Go</kbd>}
              <kbd onClick={() => { setQuickOpen(false); setQuickQuery(''); }}
                className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded font-mono cursor-pointer hover:bg-white/20">ESC</kbd>
            </form>
            <div className="px-4 py-3">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Quick Nav</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {QUICK_LINKS.map(l => (
                  <Link key={l.to} to={l.to}
                    onClick={() => { setQuickOpen(false); setQuickQuery(''); }}
                    className="flex flex-col items-center gap-1.5 px-2 py-2.5 rounded-lg bg-white/5 hover:bg-rose-gold/10 hover:text-rose-gold text-gray-300 text-xs transition-colors text-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={l.d} />
                    </svg>
                    <span>{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-4 py-2 border-t border-white/5 flex items-center gap-3 text-xs text-gray-600">
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500">↵</kbd> to search</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500">ESC</kbd> to close</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500">/</kbd> anywhere</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
