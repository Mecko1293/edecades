import { Link } from 'react-router-dom';
import { DECADES } from '../data/decades';

const DECADE_PHOTOS = {
  '1900s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Edward_VII_in_coronation_robes.jpg/330px-Edward_VII_in_coronation_robes.jpg',
  '1910s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bataille_de_Verdun_1916.jpg/330px-Bataille_de_Verdun_1916.jpg',
  '1920s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Baker_Charleston.jpg/330px-Baker_Charleston.jpg',
  '1930s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Unemployed_men_queued_outside_a_depression_soup_kitchen_opened_in_Chicago_by_Al_Capone%2C_02-1931_-_NARA_-_541927.jpg/330px-Unemployed_men_queued_outside_a_depression_soup_kitchen_opened_in_Chicago_by_Al_Capone%2C_02-1931_-_NARA_-_541927.jpg',
  '1940s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/330px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/330px-Elvis_Presley_promoting_Jailhouse_Rock.jpg',
  '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/March_on_Washington_edit.jpg/330px-March_on_Washington_edit.jpg',
  '1970s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Watergate_complex.jpg/330px-Watergate_complex.jpg',
  '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berlinermauer.jpg/330px-Berlinermauer.jpg',
  '1990s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nirvana_around_1992_%28cropped%29.jpg/330px-Nirvana_around_1992_%28cropped%29.jpg',
  '2000s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg/330px-National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg',
  '2010s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/330px-President_Barack_Obama.jpg',
  '2020s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/330px-Above_Gotham.jpg',
};

const FEATURES = [
  { to: '/categories', title: 'Everything About Every Decade', desc: 'Fashion, Food, Art, Tech, Homes & Culture — all 13 decades', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Vintage_shops%2C_Dublin.jpg/330px-Vintage_shops%2C_Dublin.jpg', color: '#d4956e' },
  { to: '/music',      title: 'Music by Decade',               desc: 'Genre guides and artist spotlights from Jazz to TikTok pop',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Louis_Armstrong_in_Color_%28cropped%29.jpg/330px-Louis_Armstrong_in_Color_%28cropped%29.jpg', color: '#9B59B6' },
  { to: '/trivia',     title: 'Decade Trivia',                  desc: 'Test your knowledge across history, music, film and culture',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/330px-Above_Gotham.jpg', color: '#E8A87C' },
  { to: '/onthisday',  title: 'On This Day',                    desc: 'Real events that happened on today\'s date throughout history', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Aldrin_Apollo_11_original.jpg/330px-Aldrin_Apollo_11_original.jpg', color: '#D4AF37' },
  { to: '/presidents', title: 'Presidents by Decade',          desc: 'Every U.S. president from Roosevelt to Biden — one per era',   img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/John_F._Kennedy%2C_White_House_color_photo_portrait.jpg/330px-John_F._Kennedy%2C_White_House_color_photo_portrait.jpg', color: '#4A5C6B' },
  { to: '/shorts',     title: 'Decade Shorts',                  desc: 'Curated video clips sorted by era — history in 10 minutes',    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/330px-Into_the_Jaws_of_Death_23-0455M_edit.jpg', color: '#E53935' },
  { to: '/stats',      title: 'Decade Stats',                   desc: 'Population, GDP, life expectancy and more — visualized',       img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/WatergateFromAir.jpg/330px-WatergateFromAir.jpg', color: '#00BCD4' },
  { to: '/chat',       title: 'Ask a Historical Figure',        desc: 'Chat with Einstein, MLK, Cleopatra and more — powered by AI',  img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Martin_Luther_King%2C_Jr..jpg/330px-Martin_Luther_King%2C_Jr..jpg', color: '#7CB9E8' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-charcoal-dark to-charcoal py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #d4956e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4956e 0%, transparent 40%)'}} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-block mb-4">
            <svg className="w-16 h-16 mx-auto text-rose-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
            </svg>
          </div>
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

      {/* Decade Grid with photos */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="font-retro text-3xl font-bold text-white text-center mb-2">Choose Your Era</h2>
        <p className="text-gray-400 text-center mb-10">Click any decade to dive in</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {DECADES.map(d => (
            <Link key={d.id} to={`/decade/${d.id}`}
              className="group bg-charcoal rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/50 block transition-all hover:-translate-y-1"
              style={{ borderTop: `3px solid ${d.color}` }}>
              <div className="relative h-28 overflow-hidden">
                <img
                  src={DECADE_PHOTOS[d.id]}
                  alt={d.label}
                  loading="lazy"
                  onError={e => { e.target.style.display='none'; }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <span className="font-retro text-lg font-black text-white drop-shadow">{d.label}</span>
                </div>
              </div>
              <div className="px-3 pb-3 pt-1">
                <p className="text-xs text-gray-400 leading-tight">{d.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Feature Cards with photos */}
      <section className="bg-charcoal py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-retro text-2xl font-bold text-white text-center mb-8">Explore eDecades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <Link key={f.to} to={f.to}
                className="group bg-charcoal-dark rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/40 transition-all hover:-translate-y-1 block">
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.title}
                    loading="lazy"
                    onError={e => { e.target.style.display='none'; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1 text-sm leading-tight" style={{ color: f.color }}>{f.title}</h3>
                  <p className="text-xs text-gray-400">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-charcoal-dark border-y border-rose-gold/20 py-10 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: '13', label: 'Decades Covered' },
            { num: '1,900+', label: 'Historical Events' },
            { num: '60+', label: 'On This Day Facts' },
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
