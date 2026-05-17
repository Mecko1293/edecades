import { Link } from 'react-router-dom';
import { DECADES } from '../data/decades';

const FEATURES = [
  { to: '/categories', icon: '📚', title: 'Everything About Every Decade', desc: 'Fashion, Food, Art, Tech, Homes & Culture — all 13 decades' },
  { to: '/music',      icon: '🎵', title: 'Music by Decade',               desc: 'Genre guides and artist spotlights from Jazz to TikTok pop' },
  { to: '/trivia',     icon: '🎯', title: 'Decade Trivia',                  desc: 'Test your knowledge across history, music, film and culture' },
  { to: '/onthisday',  icon: '📅', title: 'On This Day',                    desc: 'Pivotal moments in history that changed everything' },
  { to: '/presidents', icon: '🏛️', title: 'Presidents by Decade',          desc: 'Every U.S. president from Roosevelt to Biden — one per era' },
  { to: '/shorts',     icon: '▶️', title: 'Decade Shorts',                  desc: 'Quick video clips sorted by era — history in 60 seconds' },
  { to: '/stats',      icon: '📊', title: 'Decade Stats',                   desc: 'Population, GDP, life expectancy and more — visualized' },
  { to: '/chat',       icon: '💬', title: 'Ask a Historical Figure',        desc: 'Chat with Einstein, MLK, Cleopatra and more — powered by AI' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-b from-charcoal-dark to-charcoal py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #d4956e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4956e 0%, transparent 40%)'}} />
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
            <Link to="/decades" className="bg-rose-gold hover:bg-rose-gold-light text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Explore Decades →
            </Link>
            <Link to="/trivia" className="border border-rose-gold/50 text-rose-gold hover:bg-rose-gold/10 font-semibold px-6 py-3 rounded-xl transition-colors">
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-retro text-3xl font-bold text-white text-center mb-2">Choose Your Era</h2>
        <p className="text-gray-400 text-center mb-10">Click any decade to dive in</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {DECADES.map(d => (
            <Link key={d.id} to={`/decade/${d.id}`}
              className="bg-charcoal rounded-2xl p-5 text-center border border-white/10 hover:border-rose-gold/50 cursor-pointer block transition-all hover:-translate-y-1"
              style={{ borderTop: `3px solid ${d.color}` }}>
              <div className="text-4xl mb-2">{d.emoji}</div>
              <div className="font-retro text-lg font-bold text-white">{d.label}</div>
              <div className="text-xs text-gray-400 mt-1">{d.tagline}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-retro text-2xl font-bold text-white text-center mb-8">Explore eDecades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <Link key={f.to} to={f.to}
                className="bg-charcoal-dark rounded-2xl p-6 border border-white/10 hover:border-rose-gold/40 transition-all hover:-translate-y-1 block">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal-dark border-y border-rose-gold/20 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '13', label: 'Decades Covered' },
            { num: '1,900+', label: 'Historical Events' },
            { num: '100+', label: 'Sports MVPs' },
            { num: '500+', label: 'Trivia Questions' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-retro text-3xl font-black text-rose-gold">{s.num}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-charcoal-dark border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p className="font-retro text-rose-gold text-lg mb-1">eDecades</p>
        <p>© 2026 King Xcel Innovations. Every decade, every story.</p>
        <div className="flex justify-center gap-4 mt-3 text-xs">
          <Link to="/search" className="hover:text-rose-gold">Search</Link>
          <Link to="/trivia" className="hover:text-rose-gold">Trivia</Link>
          <Link to="/timecapsule" className="hover:text-rose-gold">Time Capsule</Link>
          <Link to="/chat" className="hover:text-rose-gold">Ask a Figure</Link>
        </div>
      </footer>
    </div>
  );
}
