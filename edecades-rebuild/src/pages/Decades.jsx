import { Link } from 'react-router-dom';
import { DECADES } from '../data/decades';

// One representative Wikimedia Commons photo per decade
const DECADE_PHOTOS = {
  '1900s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Edward_VII_in_coronation_robes.jpg/330px-Edward_VII_in_coronation_robes.jpg',
  '1910s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bataille_de_Verdun_1916.jpg/330px-Bataille_de_Verdun_1916.jpg',
  '1920s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Baker_Charleston.jpg/330px-Baker_Charleston.jpg',
  '1930s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Unemployed_men_queued_outside_a_depression_soup_kitchen_opened_in_Chicago_by_Al_Capone%2C_02-1931_-_NARA_-_541927.jpg/330px-Unemployed_men_queued_outside_a_depression_soup_kitchen_opened_in_Chicago_by_Al_Capone%2C_02-1931_-_NARA_-_541927.jpg',
  '1940s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/330px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/330px-Elvis_Presley_promoting_Jailhouse_Rock.jpg',
  '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/March_on_Washington_edit.jpg/330px-March_on_Washington_edit.jpg',
  '1970s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Wembley_Stadium_Live_Aid.jpg/330px-Wembley_Stadium_Live_Aid.jpg',
  '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berlinermauer.jpg/330px-Berlinermauer.jpg',
  '1990s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nirvana_around_1992_%28cropped%29.jpg/330px-Nirvana_around_1992_%28cropped%29.jpg',
  '2000s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg/330px-National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg',
  '2010s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/330px-President_Barack_Obama.jpg',
  '2020s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sputnik_asm.jpg/330px-Sputnik_asm.jpg',
};

export default function Decades() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Explore Every Decade</h1>
      <p className="text-gray-400 text-center mb-10">From the Edwardian era to the digital age — click any decade to dive in</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DECADES.map(d => (
          <Link key={d.id} to={`/decade/${d.id}`}
            className="group bg-charcoal rounded-2xl overflow-hidden border border-white/10 hover:border-rose-gold/50 block transition-all hover:-translate-y-1"
            style={{ borderTop: `3px solid ${d.color}` }}>
            <div className="relative h-44 overflow-hidden">
              <img
                src={DECADE_PHOTOS[d.id] || `https://source.unsplash.com/640x400/?${d.id},vintage,history`}
                alt={`${d.label} — ${d.tagline}`}
                loading="lazy"
                onError={e => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="hidden w-full h-full bg-charcoal-dark items-center justify-center text-6xl absolute inset-0">
                {d.emoji}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4">
                <span className="font-retro text-2xl font-black text-white drop-shadow-lg">{d.label}</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-rose-gold-light text-sm italic mb-1">{d.tagline}</p>
              <p className="text-gray-400 text-xs">{d.years}</p>
              <p className="text-xs text-gray-500 mt-2">Fashion · Food · Music · Culture →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
