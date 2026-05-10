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
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  return (
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

        {/* Right side — Search button + mobile toggle */}
        <div className="flex items-center gap-2">
          {/* Search button — always visible */}
          <Link to="/search"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all border ${
              pathname === '/search'
                ? 'bg-rose-gold text-white border-rose-gold'
                : 'bg-white/5 text-rose-gold border-rose-gold/50 hover:bg-rose-gold hover:text-white hover:border-rose-gold'
            }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <span className="hidden sm:inline">Search</span>
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
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === l.to ? 'bg-rose-gold text-white' : 'text-gray-300 hover:text-rose-gold'
              }`}>
              {l.label}
            </Link>
          ))}
          <Link to="/search" onClick={() => setOpen(false)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors mt-1 border ${
              pathname === '/search'
                ? 'bg-rose-gold text-white border-rose-gold'
                : 'text-rose-gold border-rose-gold/40 hover:bg-rose-gold hover:text-white'
            }`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            Search Music, Movies & More
          </Link>
        </div>
      )}
    </nav>
  );
}
