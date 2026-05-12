import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DECADES } from '../data/decades';
import { usePixabay } from '../hooks/usePixabay';

const FEATURES = [
  { to: '/categories', icon: '📚', title: 'Everything About Every Decade', desc: 'Fashion, Food, Art, Tech, Homes & Culture — all 13 decades' },
  { to: '/music', icon: '🎵', title: 'Music by Decade', desc: 'Artist photos, album covers, and clickable songs from Jazz to TikTok pop' },
  { to: '/shorts', icon: '🎬', title: 'Decade Shorts', desc: 'TikTok-style vertical video clips organized by era' },
  { to: '/trivia', icon: '🎯', title: 'Decade Trivia', desc: 'Test your knowledge across history, music, film and culture' },
  { to: '/onthisday', icon: '📅', title: 'On This Day', desc: 'Pivotal moments in history with photos that click to enlarge' },
  { to: '/sports', icon: '🏆', title: 'Sports MVPs', desc: 'Real athlete photos — the greatest from every era' },
  { to: '/timecapsule', icon: '💾', title: 'Time Capsule', desc: 'Write a letter to the future — your moment in history' },
  { to: '/search', icon: '🔍', title: 'Universal Search', desc: 'Search songs, movies, TV shows, history & more in one place' },
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
        {loading && <div className="absolute inset-0 flex items-center justify-center"><div className="w-5 h-5 border-2 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin" /></div>}
        {images.map((src, i) => (
          <img key={i} src={src} alt={d.label}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
            onError={e => { e.target.style.display='none'; }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 px-2 text-center">
          <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">{d.emoji}</span>
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
          <div className="text-6xl mb-4">🕰️</div>
          <h1 className="font-retro text-5xl md:text-7xl font-black text-white mb-4">
            e<span className="text-rose-gold">Decades</span>
          </h1>
          <p className="text-xl text-gray-300 mb-2 font-retro italic">Every Decade. Every Story.</p>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Travel through time — explore fashion, food, music, culture, and history from the 1900s to today.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/decades" className="bg-rose-gold hover:opacity-90 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-rose-gold/20">
              Explore Decades →
            </Link>
            <Link to="/shorts" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all border border-white/20">
              🎬 Watch Shorts
            </Link>
            <Link to="/trivia" className="border border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 font-semibold px-6 py-3 rounded-xl transition-colors">
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Decade Era Grid — rotating real photos */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-retro text-3xl font-bold text-white text-center mb-2">Choose Your Era</h2>
        <p className="text-gray-400 text-center mb-10">Click any decade to dive in</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {DECADES.map(d => <EraCard key={d.id} d={d} />)}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-charcoal py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-retro text-2xl font-bold text-white text-center mb-8">Everything eDecades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => (
              <Link key={f.to} to={f.to}
                className="group bg-charcoal-dark rounded-2xl p-6 border border-white/10 hover:border-rose-gold/40 hover:bg-charcoal transition-all block">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{f.icon}</div>
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
          <div className="text-4xl mb-3">🎭</div>
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
              <p className="font-retro text-rose-gold text-lg mb-3">🕰️ eDecades</p>
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
            <p>Made with ❤️ for nostalgia lovers everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
