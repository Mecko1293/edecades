import { useState } from 'react';
import { DECADES } from '../data/decades';

const MOODS = ['Nostalgic 😢', 'Happy 😊', 'Inspired 💡', 'Bittersweet 🌅', 'Proud 💪', 'Grateful 🙏'];

const DECADE_PHOTOS = {
  '1900s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/1900s_decade_montage.png/330px-1900s_decade_montage.png',
  '1910s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/World_war_one_poster.jpg/330px-World_war_one_poster.jpg',
  '1920s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flappers-1920s.jpg/330px-Flappers-1920s.jpg',
  '1930s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Dust_Bowl_-_Dallas%2C_South_Dakota_1936.jpg/330px-Dust_Bowl_-_Dallas%2C_South_Dakota_1936.jpg',
  '1940s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Into_the_Jaws_of_Death_23-0455M_edit.jpg/330px-Into_the_Jaws_of_Death_23-0455M_edit.jpg',
  '1950s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elvis_Presley_promoting_Jailhouse_Rock.jpg/330px-Elvis_Presley_promoting_Jailhouse_Rock.jpg',
  '1960s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/March_on_Washington_edit.jpg/330px-March_on_Washington_edit.jpg',
  '1970s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Wembley_Stadium_Live_Aid.jpg/330px-Wembley_Stadium_Live_Aid.jpg',
  '1980s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berlinermauer.jpg/330px-Berlinermauer.jpg',
  '1990s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nirvana_around_1992_%28cropped%29.jpg/330px-Nirvana_around_1992_%28cropped%29.jpg',
  '2000s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg/330px-National_Park_Service_9-11_Statue_of_Liberty_and_WTC_fire.jpg',
  '2010s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/330px-President_Barack_Obama.jpg',
  '2020s': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Syringe_and_vaccine.jpg/330px-Syringe_and_vaccine.jpg',
};

export default function TimeCapsule() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: '', decade: '1980s', reflection: '', mood: 'Happy 😊', author: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.reflection || !form.author) return;
    setEntries(prev => [{ ...form, id: Date.now() }, ...prev]);
    setForm({ title: '', decade: '1980s', reflection: '', mood: 'Happy 😊', author: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero banner */}
      <div className="relative rounded-3xl overflow-hidden mb-10 h-48">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Berlinermauer.jpg/330px-Berlinermauer.jpg"
          alt="Time Capsule"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/70 to-transparent" />
        <div className="absolute inset-0 flex items-center px-8">
          <div>
            <h1 className="font-retro text-4xl font-bold text-white mb-1">⏳ Time Capsule</h1>
            <p className="text-gray-300 text-sm">Leave a memory for the future. Write about a decade that shaped you.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-charcoal rounded-3xl p-8 border border-white/10 mb-10">
        <h2 className="font-retro text-xl font-bold text-white mb-6">✍️ Add Your Entry</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-gray-400 text-sm block mb-1">Your Name</label>
            <input value={form.author} onChange={e => setForm(f => ({...f, author: e.target.value}))}
              placeholder="e.g. Anthony K." required
              className="w-full bg-charcoal-dark text-white rounded-xl px-4 py-3 border border-white/20 focus:border-rose-gold outline-none text-sm" />
          </div>
          <div>
            <label className="text-gray-400 text-sm block mb-1">Decade</label>
            <select value={form.decade} onChange={e => setForm(f => ({...f, decade: e.target.value}))}
              className="w-full bg-charcoal-dark text-white rounded-xl px-4 py-3 border border-white/20 focus:border-rose-gold outline-none text-sm">
              {DECADES.map(d => <option key={d.id} value={d.id}>{d.label} — {d.tagline}</option>)}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-1">Memory Title</label>
          <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))}
            placeholder="e.g. Saturday morning cartoons in the 80s" required
            className="w-full bg-charcoal-dark text-white rounded-xl px-4 py-3 border border-white/20 focus:border-rose-gold outline-none text-sm" />
        </div>
        <div className="mb-4">
          <label className="text-gray-400 text-sm block mb-1">Your Reflection</label>
          <textarea value={form.reflection} onChange={e => setForm(f => ({...f, reflection: e.target.value}))}
            rows={4} placeholder="Share what this decade meant to you..." required
            className="w-full bg-charcoal-dark text-white rounded-xl px-4 py-3 border border-white/20 focus:border-rose-gold outline-none text-sm resize-none" />
        </div>
        <div className="mb-6">
          <label className="text-gray-400 text-sm block mb-2">Mood</label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map(m => (
              <button type="button" key={m} onClick={() => setForm(f => ({...f, mood: m}))}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${form.mood === m ? 'bg-rose-gold text-white' : 'bg-charcoal-dark text-gray-400 border border-white/20 hover:text-rose-gold'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        {submitted && <p className="text-green-400 text-sm mb-4">✅ Memory added to the capsule!</p>}
        <button type="submit" className="w-full bg-rose-gold hover:bg-rose-gold-light text-white font-semibold py-3 rounded-xl transition-colors">
          Seal This Memory →
        </button>
      </form>

      {/* Entries */}
      {entries.length > 0 && (
        <div>
          <h2 className="font-retro text-2xl font-bold text-white mb-6">📬 Memories Shared</h2>
          <div className="space-y-5">
            {entries.map(e => (
              <div key={e.id} className="bg-charcoal rounded-2xl overflow-hidden border border-white/10">
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={DECADE_PHOTOS[e.decade]}
                    alt={e.decade}
                    loading="lazy"
                    onError={ev => { ev.target.style.display='none'; }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-3">
                    <span className="font-retro text-rose-gold font-bold text-xl">{e.decade}</span>
                    <span className="text-sm text-gray-300">{e.mood}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-retro text-lg font-bold text-white">{e.title}</h3>
                    <span className="text-xs text-gray-500">by {e.author}</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{e.reflection}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-12 bg-charcoal rounded-2xl border border-white/10">
          <div className="text-5xl mb-3">📭</div>
          <p className="text-gray-400">No entries yet. Be the first to leave a memory!</p>
        </div>
      )}
    </div>
  );
}
