import { Link } from 'react-router-dom';
import { DECADES } from '../data/decades';

export default function Decades() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Explore Every Decade</h1>
      <p className="text-gray-400 text-center mb-10">From the Edwardian era to the digital age — click any decade to explore</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DECADES.map(d => (
          <Link key={d.id} to={`/decade/${d.id}`}
            className="decade-card group bg-charcoal rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/50 block">
            <div className="p-6 flex items-start gap-4">
              <div className="text-5xl">{d.emoji}</div>
              <div>
                <h2 className="font-retro text-2xl font-bold text-white group-hover:text-rose-gold transition-colors">{d.label}</h2>
                <p className="text-gray-400 text-sm">{d.years}</p>
                <p className="text-rose-gold-light text-sm mt-1 italic">{d.tagline}</p>
              </div>
            </div>
            <div className="px-6 pb-4">
              <span className="text-xs text-gray-500">Fashion · Food · Music · Culture →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
