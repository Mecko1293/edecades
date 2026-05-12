import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DECADES } from '../data/decades';

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

// Rotating photos per decade for the era grid
const DECADE_PHOTOS = {
  '1900s': ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Wright_first_flight03.jpg/400px-Wright_first_flight03.jpg', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80'],
  '1910s': ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/400px-RMS_Titanic_3.jpg', 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80'],
  '1920s': ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80', 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400&q=80'],
  '1930s': ['https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lange-MigrantMother02.jpg/400px-Lange-MigrantMother02.jpg', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80'],
  '1940s': ['https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80'],
  '1950s': ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80'],
  '1960s': ['https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Buzz_salutes_the_U.S._Flag.jpg/400px-Buzz_salutes_the_U.S._Flag.jpg', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=400&q=80'],
  '1970s': ['https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&q=80', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80'],
  '1980s': ['https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400&q=80', 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80'],
  '1990s': ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&q=80', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80'],
  '2000s': ['https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&q=80', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80'],
  '2010s': ['https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=400&q=80', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80'],
  '2020s': ['https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=400&q=80', 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=80'],
};

function EraCard({ d }) {
  const photos = DECADE_PHOTOS[d.id] || [];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (photos.length < 2) return;
    const t = setInterval(() => setIdx(i => (i + 1) % photos.length), 3500 + Math.random() * 1500);
    return () => clearInterval(t);
  }, [photos.length]);

  return (
    <Link to={`/decade/${d.id}`}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/60 block transition-all hover:shadow-lg hover:shadow-rose-gold/10 hover:-translate-y-0.5">
      <div className="relative h-32 sm:h-36 overflow-hidden bg-charcoal">
        {photos.map((src, i) => (
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
