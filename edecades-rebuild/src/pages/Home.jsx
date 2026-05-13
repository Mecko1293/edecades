import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DECADES } from '../data/decades';
import { usePixabay } from '../hooks/usePixabay';

// SVG icon map for feature cards
const FEATURE_ICONS = {
  '/categories': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  '/music': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
    </svg>
  ),
  '/shorts': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  '/trivia': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  '/onthisday': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  '/sports': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  '/timecapsule': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  '/search': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  ),
  '/presidents': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
  ),
  '/chat': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  '/stats': (
    <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
};

const FEATURES = [
  { to: '/categories',  title: 'Everything About Every Decade', desc: 'Fashion, Food, Art, Tech, Homes & Culture — all 13 decades' },
  { to: '/music',       title: 'Music by Decade',               desc: 'Artist photos, album covers, and clickable songs from Jazz to TikTok pop' },
  { to: '/shorts',      title: 'Decade Shorts',                 desc: 'Decade-accurate clips organized by era — tap to watch on YouTube' },
  { to: '/trivia',      title: 'Decade Trivia',                 desc: 'Test your knowledge across history, music, film and culture' },
  { to: '/onthisday',   title: 'On This Day',                   desc: 'Pivotal moments in history with photos that click to enlarge' },
  { to: '/sports',      title: 'Sports MVPs',                   desc: 'Real athlete photos — the greatest from every era' },
  { to: '/presidents',  title: 'Presidents by Decade',          desc: 'Every US commander-in-chief from 1900 to today — click for full bio' },
  { to: '/chat',        title: 'Ask a Historical Figure',       desc: 'Have a real AI conversation with MLK, Elvis, Einstein, Obama & more' },
  { to: '/stats',       title: 'Decade Stats',                  desc: 'Economics, wages, inflation, tech & culture — every era at a glance' },
  { to: '/timecapsule', title: 'Time Capsule',                  desc: 'Write a letter to the future — your moment in history' },
  { to: '/search',      title: 'Universal Search',              desc: 'Search songs, movies, TV shows, history & more in one place' },
];

function EraCard({ d }) {
  const { images, loading } = usePixabay({ decade: d.id, count: 2 });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const t = setInterval(() => setIdx(i => (i + 1) % images.length), 3500 + Math.random() * 1500);
      return () => clearInterval(t);
    }
  }, [images.length]);

  return (
    <Link to={`/decade/${d.id}`}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/60 block transition-all hover:shadow-lg hover:shadow-rose-gold/10 hover:-translate-y-0.5">
      <div className="relative h-32 sm:h-36 overflow-hidden bg-charcoal">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin" />
          </div>
        )}
        {images.map((src, i) => (
          <img key={i} src={src} alt={d.label}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            onError={e => { e.target.style.display='none'; }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 px-2 text-center">
          <span className="font-retro text-base font-bold text-white group-hover:text-rose-gold transition-colors">{d.label}</span>
          <span className="text-[10px] text-gray-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">{d.tagline}</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-charcoal-dark to-charcoal py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #d4956e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4956e 0%, transparent 40%)' }} />
        <div className="relative max-w-4xl mx-auto">
          {/* Clean wordmark — no emoji */}
          <div className="flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-rose-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="font-retro text-5xl md:text-7xl font-black text-white">
              e<span className="text-rose-gold">Decades</span>
            </h1>
          </div>
          <p className="text-xl text-gray-300 mb-2 font-retro italic">Every Decade. Every Story.</p>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Travel through time — explore fashion, food, music, culture, and history from the 1900s to today.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/decades" className="bg-rose-gold hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-rose-gold/20">
              Explore Decades →
            </Link>
            <Link to="/shorts" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all border border-white/20">
              Watch Shorts
            </Link>
            <Link to="/trivia" className="border border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 font-semibold px-6 py-3 rounded-xl transition-colors">
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Choose Your Era — rotating real photos */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-retro text-3xl font-bold text-white text-center mb-2">Choose Your Era</h2>
        <p className="text-gray-400 text-center mb-10">Click any decade to dive in</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {DECADES.map(d => <EraCard key={d.id} d={d} />)}
        </div>
      </section>

      {/* Feature Cards — SVG icons, no emoji */}
      <section className="bg-charcoal py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-retro text-2xl font-bold text-white text-center mb-8">Everything eDecades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => (
              <Link key={f.to} to={f.to}
                className="group bg-charcoal-dark rounded-2xl p-6 border border-white/10 hover:border-rose-gold/40 hover:bg-charcoal transition-all block">
                <div className="mb-3 group-hover:scale-110 transition-transform inline-block">
                  {FEATURE_ICONS[f.to]}
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Profile CTA */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-rose-gold/20 via-charcoal to-charcoal-dark border border-rose-gold/20 rounded-3xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-rose-gold/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="font-retro text-2xl font-bold text-white mb-2">Set Up Your Profile</h2>
          <p className="text-gray-400 text-sm mb-5">Upload a photo, pick a decade era avatar, or stay anonymous</p>
          <Link to="/profile" className="inline-block bg-rose-gold text-white px-6 py-3 rounded-2xl font-semibold text-sm hover:opacity-90 transition">
            Choose Your Look →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-dark border-t border-white/10 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-retro text-rose-gold text-lg">eDecades</span>
              </div>
              <p className="text-gray-500 text-xs">Every decade. Every story. Explore culture and history from the 1900s to today.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Explore</p>
              {[['Decades', '/decades'], ['Every Decade', '/categories'], ['On This Day', '/onthisday']].map(([l, h]) => (
                <Link key={h} to={h} className="block text-gray-500 hover:text-rose-gold transition-colors mb-1.5 text-xs">{l}</Link>
              ))}
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Features</p>
              {[['Music', '/music'], ['Sports MVPs', '/sports'], ['Trivia', '/trivia'], ['Shorts', '/shorts']].map(([l, h]) => (
                <Link key={h} to={h} className="block text-gray-500 hover:text-rose-gold transition-colors mb-1.5 text-xs">{l}</Link>
              ))}
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Account</p>
              {[['My Profile', '/profile'], ['Time Capsule', '/timecapsule'], ['Search', '/search']].map(([l, h]) => (
                <Link key={h} to={h} className="block text-gray-500 hover:text-rose-gold transition-colors mb-1.5 text-xs">{l}</Link>
              ))}
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <p>© 2026 King Xcel Innovations. All rights reserved.</p>
            <p>Built for nostalgia lovers everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
