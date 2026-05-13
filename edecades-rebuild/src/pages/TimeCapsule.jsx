import { useState } from 'react';
import { DECADES } from '../data/decades';

const MOODS = ['Nostalgic', 'Happy', 'Inspired', 'Bittersweet', 'Proud', 'Grateful'];

export default function TimeCapsule() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ title: '', decade: '1980s', reflection: '', mood: 'Happy', author: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.reflection || !form.author) return;
    setEntries(prev => [{ ...form, id: Date.now() }, ...prev]);
    setForm({ title: '', decade: '1980s', reflection: '', mood: 'Happy', author: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="font-retro text-4xl font-bold text-white text-center mb-2">Time Capsule Journal</h1>
      <p className="text-gray-400 text-center mb-10">Leave a memory for the future. Write about a decade that shaped you.</p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-charcoal rounded-3xl p-8 border border-white/10 mb-10">
        <h2 className="font-retro text-xl font-bold text-white mb-6">Add Your Entry</h2>
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
              {DECADES.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
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
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${form.mood === m ? 'bg-rose-gold text-white' : 'bg-charcoal-dark text-gray-300 border border-white/20 hover:border-rose-gold/50'}`}>
                {m}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="bg-rose-gold hover:bg-rose-gold-light text-white font-semibold px-8 py-3 rounded-xl transition-colors w-full">
          Seal My Time Capsule
        </button>
        {submitted && <p className="text-green-400 text-sm text-center mt-3">Entry sealed! Scroll down to see it.</p>}
      </form>

      {/* Entries */}
      {entries.length > 0 && (
        <div>
          <h2 className="font-retro text-2xl font-bold text-white mb-4">Capsules This Session</h2>
          <div className="space-y-4">
            {entries.map(e => (
              <div key={e.id} className="bg-charcoal rounded-2xl p-6 border border-white/10">
                <div className="flex flex-wrap gap-2 items-center mb-3">
                  <span className="font-retro font-bold text-rose-gold">{e.decade}</span>
                  <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full">{e.mood}</span>
                  <span className="text-xs text-gray-500">by {e.author}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{e.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{e.reflection}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {entries.length === 0 && (
        <div className="text-center py-8 text-gray-500 italic">No entries yet — be the first to seal a memory above.</div>
      )}
    </div>
  );
}
