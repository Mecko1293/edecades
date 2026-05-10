import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/decades', label: 'Decades' },
  { to: '/categories', label: 'Every Decade' },
  { to: '/music', label: 'Music' },
  { to: '/sports', label: 'Sports MVPs' },
  { to: '/trivia', label: 'Trivia' },
  { to: '/onthisday', label: 'On This Day' },
  { to: '/timecapsule', label: 'Time Capsule' },
];

const QUICK_LINKS = [
  { to: '/decades', label: 'Decades', icon: '🗓️' },
  { to: '/music', label: 'Music', icon: '🎵' },
  { to: '/sports', label: 'Sports MVPs', icon: '🏆' },
  { to: '/trivia', label: 'Trivia', icon: '❓' },
  { to: '/onthisday', label: 'On This Day', icon: '📜' },
  { to: '/timecapsule', label: 'Time Capsule', icon: '💾' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Listen for "/" keypress to open quick search
  useEffect(() => {
    const handleKey = (e) => {
      // Open on "/" unless user is typing in an input/textarea
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        setQuickOpen(true);
        setQuickQuery('');
      }
      // Close on Escape
      if (e.key === 'Escape') {
        setQuickOpen(false);
        setQuickQuery('');
      }
      // Submit on Enter
      if (e.key === 'Enter' && quickOpen && quickQuery.trim()) {
        setQuickOpen(false);
        navigate(`/search?q=${encodeURIComponent(quickQuery.trim())}`);
        setQuickQuery('');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [quickOpen, quickQuery, navigate]);

  // Focus input when modal opens
  useEffect(() => {
    if (quickOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [quickOpen]);

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
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-2xl">🕰️</span>
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
            {/* Search button — triggers quick search OR goes to /search */}
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
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === l.to ? 'bg-rose-gold text-white' : 'text-gray-300 hover:text-rose-gold'
                }`}>
                {l.label}
              </Link>
            ))}
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
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div className="relative w-full max-w-xl bg-[#1e232d] rounded-2xl border border-rose-gold/30 shadow-2xl overflow-hidden">
            {/* Input */}
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
              {quickQuery && (
                <kbd className="text-xs bg-rose-gold/20 text-rose-gold px-2 py-1 rounded font-mono">↵ Go</kbd>
              )}
              <kbd
                onClick={() => { setQuickOpen(false); setQuickQuery(''); }}
                className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded font-mono cursor-pointer hover:bg-white/20">
                ESC
              </kbd>
            </form>

            {/* Quick nav links */}
            <div className="px-4 py-3">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Quick Nav</p>
              <div className="grid grid-cols-3 gap-2">
                {QUICK_LINKS.map(l => (
                  <Link key={l.to} to={l.to}
                    onClick={() => { setQuickOpen(false); setQuickQuery(''); }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-rose-gold/10 hover:text-rose-gold text-gray-300 text-sm transition-colors">
                    <span>{l.icon}</span>
                    <span>{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Hint */}
            <div className="px-4 py-2 border-t border-white/5 flex items-center gap-3 text-xs text-gray-600">
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500">↵</kbd> to search</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500">ESC</kbd> to close</span>
              <span><kbd className="bg-white/10 px-1.5 py-0.5 rounded font-mono text-gray-500">/</kbd> to open anywhere</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
