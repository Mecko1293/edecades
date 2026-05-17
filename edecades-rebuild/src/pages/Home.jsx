import { Link } from 'react-router-dom';
import { DECADES } from '../data/decades';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-charcoal-dark to-charcoal py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #d4956e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4956e 0%, transparent 40%)' }} />
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

      {/* Decade Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-retro text-3xl font-bold text-white text-center mb-2">Choose Your Era</h2>
        <p className="text-gray-400 text-center mb-10">Click any decade to dive in</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {DECADES.map(d => (
            <Link key={d.id} to={`/decade/${d.id}`}
              className="decade-card bg-charcoal rounded-2xl p-5 text-center border border-white/10 hover:border-rose-gold/50 cursor-pointer block">
              <div className="text-4xl mb-2">{d.emoji}</div>
              <div className="font-retro text-lg font-bold text-white">{d.label}</div>
              <div className="text-xs text-gray-400 mt-1">{d.tagline}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="bg-charcoal py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { to: '/categories', icon: '📚', title: 'Everything About Every Decade', desc: 'Fashion, Food, Art, Tech, Homes & Culture — all 13 decades' },
            { to: '/music', icon: '🎵', title: 'Music by Decade', desc: 'Genre guides and artist spotlights from Jazz to TikTok pop' },
            { to: '/trivia', icon: '🎯', title: 'Decade Trivia', desc: 'Test your knowledge across history, music, film and culture' },
            { to: '/onthisday', icon: '📅', title: 'On This Day', desc: 'Pivotal moments in history that changed everything' },
          ].map(f => (
            <Link key={f.to} to={f.to} className="bg-charcoal-dark rounded-2xl p-6 border border-white/10 hover:border-rose-gold/40 transition-colors block">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-dark border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        <p className="font-retro text-rose-gold text-lg mb-1">eDecades</p>
        <p>© 2026 King Xcel Innovations. Every decade, every story.</p>
      </footer>
    </div>
  );
}
