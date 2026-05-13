import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DECADES } from '../data/decades';
import { usePixabay } from '../hooks/usePixabay';

function RotatingDecadeCard({ d }) {
  const { images, loading } = usePixabay({ decade: d.id, count: 3 });
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const t = setInterval(() => setPhotoIdx(i => (i + 1) % images.length), 4000 + Math.random() * 2000);
      return () => clearInterval(t);
    }
  }, [images.length]);

  return (
    <Link to={`/decade/${d.id}`}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/50 block transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-gold/10">

      {/* Rotating Pixabay Photos */}
      <div className="relative h-44 overflow-hidden bg-charcoal-dark">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-rose-gold/30 border-t-rose-gold rounded-full animate-spin" />
          </div>
        )}
        {images.map((src, i) => (
          <img key={i} src={src} alt={d.label}
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-1000 ${i === photoIdx ? 'opacity-100' : 'opacity-0'}`}
            onError={e => { e.target.style.display = 'none'; }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

        {/* Rotation dots */}
        {images.length > 1 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {images.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === photoIdx ? 'bg-rose-gold' : 'bg-white/30'}`} />
            ))}
          </div>
        )}

        {/* Decade label overlay */}
        <div className="absolute bottom-3 left-4">
          <div className="flex items-center gap-2">
            <h2 className="font-retro text-2xl font-bold text-white group-hover:text-rose-gold transition-colors">{d.label}</h2>
          </div>
        </div>
      </div>

      {/* Info strip */}
      <div className="bg-charcoal p-4">
        <p className="text-gray-400 text-xs mb-1">{d.years}</p>
        <p className="text-rose-gold-light text-sm italic">{d.tagline}</p>
        <p className="text-gray-600 text-xs mt-2">Fashion · Food · Music · Culture →</p>
      </div>
    </Link>
  );
}

export default function Decades() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Explore Every Decade</h1>
      <p className="text-gray-400 text-center mb-10">
        From the Edwardian era to the digital age — photos rotate live from Pixabay
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DECADES.map(d => (
          <RotatingDecadeCard key={d.id} d={d} />
        ))}
      </div>
    </div>
  );
}
