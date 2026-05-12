import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DECADES } from '../data/decades';
import { getDecadeImage } from '../data/images';

// Multiple rotating photos per decade
const DECADE_PHOTOS = {
  '1900s': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Wright_first_flight03.jpg/600px-Wright_first_flight03.jpg',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Ellis_Island_arrivals.jpg/600px-Ellis_Island_arrivals.jpg',
  ],
  '1910s': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/RMS_Titanic_3.jpg/600px-RMS_Titanic_3.jpg',
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80',
    'https://images.unsplash.com/photo-1580130601254-05fa235abeab?w=600&q=80',
  ],
  '1920s': [
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
  ],
  '1930s': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lange-MigrantMother02.jpg/600px-Lange-MigrantMother02.jpg',
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80',
  ],
  '1940s': [
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/VJ_day_woman_assault.jpg/600px-VJ_day_woman_assault.jpg',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
  ],
  '1950s': [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80',
  ],
  '1960s': [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Buzz_salutes_the_U.S._Flag.jpg/600px-Buzz_salutes_the_U.S._Flag.jpg',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&q=80',
    'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80',
  ],
  '1970s': [
    'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&q=80',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
  ],
  '1980s': [
    'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    'https://images.unsplash.com/photo-1493515322954-4fa727e97985?w=600&q=80',
  ],
  '1990s': [
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=80',
  ],
  '2000s': [
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=80',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80',
  ],
  '2010s': [
    'https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?w=600&q=80',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
  ],
  '2020s': [
    'https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=600&q=80',
    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
  ],
};

function RotatingDecadeCard({ d }) {
  const photos = DECADE_PHOTOS[d.id] || [getDecadeImage(d.id)];
  const [photoIdx, setPhotoIdx] = useState(0);

  // Each card rotates on its own offset interval
  useEffect(() => {
    const offset = Math.random() * 3000;
    const t = setTimeout(() => {
      const interval = setInterval(() => {
        setPhotoIdx(i => (i + 1) % photos.length);
      }, 4000 + Math.random() * 2000);
      return () => clearInterval(interval);
    }, offset);
    return () => clearTimeout(t);
  }, [photos.length]);

  return (
    <Link to={`/decade/${d.id}`}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/50 block transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-gold/10">

      {/* Rotating Photo */}
      <div className="relative h-44 overflow-hidden">
        {photos.map((src, i) => (
          <img key={i} src={src} alt={d.label}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === photoIdx ? 'opacity-100' : 'opacity-0'}`}
            onError={e => { e.target.style.display='none'; }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />

        {/* Photo dots */}
        {photos.length > 1 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {photos.map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i === photoIdx ? 'bg-rose-gold' : 'bg-white/30'}`} />
            ))}
          </div>
        )}

        {/* Decade label overlay */}
        <div className="absolute bottom-3 left-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{d.emoji}</span>
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
      <p className="text-gray-400 text-center mb-10">From the Edwardian era to the digital age — click any decade to explore</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DECADES.map(d => (
          <RotatingDecadeCard key={d.id} d={d} />
        ))}
      </div>
    </div>
  );
}
