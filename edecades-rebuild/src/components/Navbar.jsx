import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/decades', label: 'Decades' },
  { to: '/categories', label: 'Every Decade' },
  { to: '/music', label: 'Music' },
  { to: '/sports', label: 'Sports MVPs' },
  { to: '/trivia', label: 'Trivia' },
  { to: '/onthisday', label: 'On This Day' },
  { to: '/timecapsule', label: 'Time Capsule' },
  { to: '/search', label: 'Search' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="bg-charcoal-dark border-b border-rose-gold/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🕰️</span>
          <span className="font-retro text-xl font-bold text-rose-gold">eDecades</span>
        </Link>
        {/* Desktop */}
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
        {/* Mobile toggle */}
        <button className="lg:hidden text-gray-300 hover:text-rose-gold" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>
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
        </div>
      )}
    </nav>
  );
}
