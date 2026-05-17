import { useState } from 'react';
import { DECADES } from '../data/decades';

const DECADE_VIDEOS = {
  '1900s': [
    { id: 'jklSy7m5dLY', title: 'Life in the 1900s — A Visual History' },
    { id: 'D84CJj7stlY', title: 'The Edwardian Era Explained' },
    { id: 'nYRiXYH_JnM', title: 'Early 1900s in Color' },
  ],
  '1910s': [
    { id: 'xAY2jqFRFcQ', title: 'World War I in Color' },
    { id: '8dLq2CZ7raw', title: '1910s Fashion & Culture' },
    { id: 'gkBhW1p-y1s', title: 'The Titanic: A Decade-Defining Disaster' },
  ],
  '1920s': [
    { id: 'N_9GuiE5Fck', title: "Special Ed — I Got It Made (Jazz Era)" },
    { id: '6JpxLiMhHOI', title: 'The Roaring Twenties in Color' },
    { id: 'UBmSDCnKpRo', title: 'Prohibition & Speakeasies' },
  ],
  '1930s': [
    { id: 'D9IC1AZAIF4', title: 'The Great Depression — Life in the 1930s' },
    { id: 'yPiMtPU5Uck', title: "Dust Bowl: America's Great Migration" },
    { id: 'iOZdBTBaems', title: 'Hollywood Golden Age 1930s' },
  ],
  '1940s': [
    { id: 'DwKPFT-RioU', title: 'World War II — The Complete Story' },
    { id: 'FH-OtRgGWME', title: '1940s Home Front America' },
    { id: 'qNLhQVKXMKk', title: '1940s Fashion & Style' },
  ],
  '1950s': [
    { id: 'ijcP7wLmzCc', title: "Rock 'n' Roll Origins — 1950s" },
    { id: 'KLGBXcKuMDE', title: 'Suburbia & the American Dream' },
    { id: 'ESnrZhkJDJY', title: '1950s Pop Culture Deep Dive' },
  ],
  '1960s': [
    { id: 'KkITlXiUQGY', title: 'The 1960s — Revolution & Change' },
    { id: 'ydCMGUknDR8', title: 'Woodstock 1969 — History of a Movement' },
    { id: 'Ik9l1LXvJoU', title: 'The Space Race Explained' },
  ],
  '1970s': [
    { id: 'Gm_enCagNEI', title: 'Disco Era — 1970s Nightlife' },
    { id: 'tLlJkREQDCQ', title: 'The 1970s: Funk, Fashion & Freedom' },
    { id: 'VdoRvWiMq5Y', title: 'Watergate & the Nixon Era' },
  ],
  '1980s': [
    { id: 'wKTPz8T21f0', title: '80s Synth Pop Top 100' },
    { id: 'IoTdm31BIrk', title: 'Best Synth Pop 80s Compilation' },
    { id: '0IcH8NPZRJs', title: '80s Ultimate Synthpop Mix' },
  ],
  '1990s': [
    { id: 'xNMQMhTOC9s', title: 'The 1990s: Grunge, Hip-Hop & the Web' },
    { id: 'CvBgGS_MKDM', title: '90s Nostalgia — Everything You Forgot' },
    { id: 'zFM2PmPSBuQ', title: 'The Rise of the Internet 1990s' },
  ],
  '2000s': [
    { id: 'DFzZrMD0bOA', title: "Y2K & the 2000s — A Decade in Review" },
    { id: 'D71bT6tGhUw', title: '2000s Pop Culture — Do You Remember?' },
    { id: 'QSIpBBj-DJQ', title: 'The 2000s: Fashion & Music Throwback' },
  ],
  '2010s': [
    { id: 'xkSxZqaXaQA', title: 'The 2010s: A Decade of Transformation' },
    { id: 'yAHi2F0b-Ks', title: 'Social Media Changed Everything' },
    { id: 'RFqE9wNLs8A', title: "2010s Fashion: The Decade's Best Looks" },
  ],
  '2020s': [
    { id: 'vOHgDqBMWOM', title: 'The 2020s So Far — A Visual Timeline' },
    { id: '3PdUbcMfMaU', title: 'AI Revolution: 2020s Tech' },
    { id: 'u5PTiB-JuMo', title: 'Pandemic, Protest & Progress — 2020s' },
  ],
};

export default function VideoShorts() {
  const [activeDec, setActiveDec] = useState('1980s');
  const [activeIdx, setActiveIdx] = useState(0);

  const videos = DECADE_VIDEOS[activeDec] || [];
  const current = videos[activeIdx];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-black text-white mb-2">📽️ Decade Shorts</h1>
      <p className="text-gray-400 mb-8">Curated documentary clips sorted by era — history in under 10 minutes</p>

      {/* Decade selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {DECADES.map(d => (
          <button key={d.id} onClick={() => { setActiveDec(d.id); setActiveIdx(0); }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeDec === d.id
                ? 'bg-rose-gold text-white border-rose-gold'
                : 'border-white/20 text-gray-400 hover:border-rose-gold/40 hover:text-rose-gold'
            }`}>
            {d.emoji} {d.label}
          </button>
        ))}
      </div>

      {/* Main player */}
      {current && (
        <div className="bg-charcoal rounded-2xl overflow-hidden border border-white/10 mb-8">
          <div className="aspect-video w-full">
            <iframe
              key={current.id}
              src={`https://www.youtube-nocookie.com/embed/${current.id}?rel=0&modestbranding=1`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-white">{current.title}</h2>
            <p className="text-gray-400 text-sm mt-1">{activeDec} · Documentary Short</p>
          </div>
        </div>
      )}

      {/* Playlist */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {videos.map((v, i) => (
          <button key={v.id} onClick={() => setActiveIdx(i)}
            className={`text-left rounded-xl p-4 border transition-all ${
              i === activeIdx
                ? 'border-rose-gold bg-rose-gold/10'
                : 'border-white/10 bg-charcoal hover:border-rose-gold/40'
            }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i === activeIdx ? 'bg-rose-gold text-white' : 'bg-white/10 text-gray-400'
              }`}>{i + 1}</span>
              {i === activeIdx && <span className="text-xs text-rose-gold">▶ Now Playing</span>}
            </div>
            <p className="text-sm text-white font-medium leading-snug">{v.title}</p>
          </button>
        ))}
      </div>

      {/* External search link */}
      <div className="mt-8 text-center">
        <a href={`https://www.youtube.com/results?search_query=${activeDec}+history+documentary`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-rose-gold/40 text-rose-gold hover:bg-rose-gold/10 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors">
          Explore More {activeDec} Videos on YouTube ↗
        </a>
      </div>
    </div>
  );
}
