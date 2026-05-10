import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DECADES, CATEGORIES } from '../data/decades';

const ADMIN_PASSWORD = 'KingXcel2026';
const STORAGE_KEY = 'edecades_admin_auth';

// ── Simulated data stores (localStorage-backed) ──
function useStore(key, initial) {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || initial; }
    catch { return initial; }
  });
  const save = (val) => { setData(val); localStorage.setItem(key, JSON.stringify(val)); };
  return [data, save];
}

// ── Stat Card ──
function StatCard({ icon, label, value, sub, color = 'rose-gold' }) {
  return (
    <div className="bg-charcoal rounded-2xl p-5 border border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{label}</p>
          <p className="text-white text-3xl font-bold">{value}</p>
          {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}

// ── Section wrapper ──
function Section({ title, icon, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-charcoal rounded-2xl border border-white/10 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition">
        <h2 className="font-retro text-lg font-bold text-white flex items-center gap-2">{icon} {title}</h2>
        <span className="text-gray-400">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

// ── Badge ──
function Badge({ label, color }) {
  const colors = {
    green: 'bg-green-900/40 text-green-400 border-green-800',
    red: 'bg-red-900/40 text-red-400 border-red-800',
    yellow: 'bg-yellow-900/40 text-yellow-400 border-yellow-800',
    blue: 'bg-blue-900/40 text-blue-400 border-blue-800',
    gray: 'bg-white/5 text-gray-400 border-white/10',
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full border ${colors[color] || colors.gray}`}>{label}</span>;
}

// ═══════════════════════════════════════════
// MAIN ADMIN
// ═══════════════════════════════════════════
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Data stores
  const [submissions, setSubmissions] = useStore('admin_submissions', [
    { id: 1, name: 'John Doe', email: 'john@example.com', type: 'Time Capsule', content: 'My 1980s memories of arcade games and big hair...', decade: '1980s', status: 'pending', date: '2026-05-10' },
    { id: 2, name: 'Sarah M.', email: 'sarah@example.com', type: 'Shorts Clip', content: 'YouTube link: youtube.com/watch?v=abc123 — 1970s disco footage', decade: '1970s', status: 'pending', date: '2026-05-09' },
    { id: 3, name: 'Mike R.', email: 'mike@example.com', type: 'On This Day', content: 'Moon landing July 20 1969 should be featured', decade: '1960s', status: 'approved', date: '2026-05-08' },
  ]);
  const [directories, setDirectories] = useStore('admin_directories', [
    { id: 1, name: 'Google My Business', status: 'submitted', da: 100, date: '2026-05-01', notes: 'Verified listing live' },
    { id: 2, name: 'Bing Places', status: 'submitted', da: 94, date: '2026-05-02', notes: '' },
    { id: 3, name: 'Apple Maps', status: 'pending', da: 90, date: '', notes: 'Need to claim' },
    { id: 4, name: 'Better Business Bureau', status: 'pending', da: 92, date: '', notes: '' },
    { id: 5, name: 'Manta', status: 'submitted', da: 55, date: '2026-05-05', notes: '' },
    { id: 6, name: 'Hotfrog', status: 'pending', da: 50, date: '', notes: '' },
    { id: 7, name: 'Yellow Pages', status: 'pending', da: 72, date: '', notes: '' },
    { id: 8, name: 'Yahoo Local', status: 'submitted', da: 68, date: '2026-05-06', notes: '' },
    { id: 9, name: 'MerchantCircle', status: 'pending', da: 48, date: '', notes: '' },
    { id: 10, name: 'Superpages', status: 'pending', da: 45, date: '', notes: '' },
  ]);
  const [shorts, setShorts] = useStore('admin_shorts', [
    { id: 's1', title: 'Charleston Dance — 1920s Jazz Age', decade: '1920s', category: 'Music & Dance', status: 'live', likes: 4200 },
    { id: 's2', title: 'Saturday Night Fever — Disco Era', decade: '1970s', category: 'Music & Dance', status: 'live', likes: 15600 },
    { id: 's3', title: 'Big Hair & Power Suits', decade: '1980s', category: 'Fashion', status: 'live', likes: 18900 },
    { id: 's4', title: 'Grunge Era — Nirvana', decade: '1990s', category: 'Music & Dance', status: 'live', likes: 27000 },
    { id: 's5', title: 'TikTok Era & Short-Form Video', decade: '2020s', category: 'Culture', status: 'live', likes: 88000 },
  ]);
  const [errors, setErrors] = useStore('admin_errors', [
    { id: 1, section: 'Search', desc: 'Media search returns empty on mobile', severity: 'high', status: 'open', date: '2026-05-09' },
    { id: 2, section: 'Shorts', desc: 'Video modal nav arrows not working on iOS', severity: 'medium', status: 'open', date: '2026-05-10' },
    { id: 3, section: 'Categories', desc: 'Image fallback shows broken icon on slow connections', severity: 'low', status: 'resolved', date: '2026-05-08' },
  ]);
  const [newShort, setNewShort] = useState({ title: '', decade: '1980s', category: 'Music & Dance', videoId: '', thumbnail: '' });
  const [newError, setNewError] = useState({ section: '', desc: '', severity: 'medium' });
  const [newDir, setNewDir] = useState({ name: '', da: '', notes: '' });

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setAuthed(true);
    } else {
      setPwError('Incorrect password. Try again.');
    }
  };

  const logout = () => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false); };

  // Submission actions
  const updateSubmission = (id, status) =>
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s));
  const deleteSubmission = (id) => setSubmissions(submissions.filter(s => s.id !== id));

  // Directory actions
  const updateDir = (id, field, val) =>
    setDirectories(directories.map(d => d.id === id ? { ...d, [field]: val } : d));
  const addDir = () => {
    if (!newDir.name) return;
    setDirectories([...directories, { id: Date.now(), ...newDir, status: 'pending', date: '' }]);
    setNewDir({ name: '', da: '', notes: '' });
  };

  // Shorts actions
  const toggleShort = (id) =>
    setShorts(shorts.map(s => s.id === id ? { ...s, status: s.status === 'live' ? 'hidden' : 'live' } : s));
  const deleteShort = (id) => setShorts(shorts.filter(s => s.id !== id));
  const addShort = () => {
    if (!newShort.title || !newShort.videoId) return;
    setShorts([...shorts, { id: `s${Date.now()}`, ...newShort, status: 'live', likes: 0 }]);
    setNewShort({ title: '', decade: '1980s', category: 'Music & Dance', videoId: '', thumbnail: '' });
  };

  // Error actions
  const toggleError = (id) =>
    setErrors(errors.map(e => e.id === id ? { ...e, status: e.status === 'open' ? 'resolved' : 'open' } : e));
  const addError = () => {
    if (!newError.section || !newError.desc) return;
    setErrors([...errors, { id: Date.now(), ...newError, status: 'open', date: new Date().toISOString().slice(0, 10) }]);
    setNewError({ section: '', desc: '', severity: 'medium' });
  };

  const TABS = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'submissions', label: 'Admissions', icon: '📥' },
    { id: 'shorts', label: 'Shorts', icon: '🎬' },
    { id: 'directories', label: 'Directories', icon: '📋' },
    { id: 'errors', label: 'Site Errors', icon: '🔧' },
    { id: 'content', label: 'Content', icon: '📚' },
    { id: 'social', label: 'Social', icon: '📣' },
  ];

  // ── LOGIN GATE ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">👑</div>
            <h1 className="font-retro text-3xl font-bold text-white">King Xcel Admin</h1>
            <p className="text-gray-400 text-sm mt-2">eDecades Control Center</p>
          </div>
          <form onSubmit={handleLogin} className="bg-charcoal rounded-2xl p-6 border border-white/10">
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Admin Password</label>
            <input
              type="password"
              value={pwInput}
              onChange={e => { setPwInput(e.target.value); setPwError(''); }}
              placeholder="Enter password..."
              className="w-full bg-charcoal-dark border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-rose-gold mb-3"
              autoFocus
            />
            {pwError && <p className="text-red-400 text-xs mb-3">{pwError}</p>}
            <button type="submit" className="w-full bg-rose-gold text-white font-bold py-3 rounded-xl hover:opacity-90 transition">
              Enter Admin →
            </button>
          </form>
          <p className="text-center text-gray-600 text-xs mt-4">King Xcel Innovations © 2026</p>
        </div>
      </div>
    );
  }

  // ── ADMIN UI ──
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const openErrors = errors.filter(e => e.status === 'open').length;
  const liveShorts = shorts.filter(s => s.status === 'live').length;
  const submittedDirs = directories.filter(d => d.status === 'submitted').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-retro text-3xl font-bold text-white flex items-center gap-2">👑 King Xcel Admin</h1>
          <p className="text-gray-400 text-sm mt-1">eDecades Full Control Center</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://edecades.com" target="_blank" rel="noreferrer"
            className="text-xs text-rose-gold border border-rose-gold/30 px-3 py-1.5 rounded-lg hover:bg-rose-gold/10 transition">
            View Site ↗
          </a>
          <button onClick={logout} className="text-xs text-gray-500 hover:text-red-400 transition px-3 py-1.5 rounded-lg border border-white/10">
            Logout
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-colors relative ${
              activeTab === t.id ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-400 border border-white/10 hover:text-rose-gold'
            }`}>
            {t.icon} {t.label}
            {t.id === 'submissions' && pendingCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{pendingCount}</span>
            )}
            {t.id === 'errors' && openErrors > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-yellow-500 text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{openErrors}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── DASHBOARD ── */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon="📥" label="Pending Admissions" value={pendingCount} sub="Awaiting review" />
            <StatCard icon="🎬" label="Live Shorts" value={liveShorts} sub={`${shorts.length} total`} />
            <StatCard icon="📋" label="Directories Listed" value={submittedDirs} sub={`of ${directories.length} targets`} />
            <StatCard icon="🔧" label="Open Errors" value={openErrors} sub={`${errors.length} total logged`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-charcoal rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">📊 Site Pages</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  ['/','Home'], ['/decades','Decades'], ['/categories','Every Decade'], ['/music','Music'],
                  ['/sports','Sports MVPs'], ['/trivia','Trivia'], ['/onthisday','On This Day'],
                  ['/timecapsule','Time Capsule'], ['/shorts','Shorts'], ['/search','Search'],
                  ['/profile','Profile'], ['/directory','Directory']
                ].map(([path, label]) => (
                  <a key={path} href={`https://edecades.com${path}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-xs text-gray-400 hover:text-rose-gold transition px-3 py-2 rounded-lg bg-white/5 hover:bg-rose-gold/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-charcoal rounded-2xl p-5 border border-white/10">
              <h3 className="text-white font-semibold mb-4">🔗 Quick Actions</h3>
              <div className="space-y-2">
                <button onClick={() => setActiveTab('submissions')}
                  className="w-full text-left text-sm px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-gold/10 text-gray-300 hover:text-rose-gold transition flex items-center justify-between">
                  <span>📥 Review pending admissions</span>
                  {pendingCount > 0 && <Badge label={`${pendingCount} pending`} color="yellow" />}
                </button>
                <button onClick={() => setActiveTab('shorts')}
                  className="w-full text-left text-sm px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-gold/10 text-gray-300 hover:text-rose-gold transition">
                  🎬 Manage Shorts clips
                </button>
                <button onClick={() => setActiveTab('directories')}
                  className="w-full text-left text-sm px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-gold/10 text-gray-300 hover:text-rose-gold transition">
                  📋 Update directory listings
                </button>
                <button onClick={() => setActiveTab('errors')}
                  className="w-full text-left text-sm px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-gold/10 text-gray-300 hover:text-rose-gold transition flex items-center justify-between">
                  <span>🔧 Review site errors</span>
                  {openErrors > 0 && <Badge label={`${openErrors} open`} color="red" />}
                </button>
                <a href="mailto:anthonykittles@outlook.com" className="block w-full text-left text-sm px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-gold/10 text-gray-300 hover:text-rose-gold transition">
                  ✉️ Open Email Center
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADMISSIONS / SUBMISSIONS ── */}
      {activeTab === 'submissions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-400 text-sm">{submissions.length} total · <span className="text-yellow-400">{pendingCount} pending review</span></p>
          </div>
          {submissions.length === 0 && <p className="text-gray-500 text-center py-10">No submissions yet.</p>}
          {submissions.map(s => (
            <div key={s.id} className={`bg-charcoal rounded-2xl p-5 border ${s.status === 'pending' ? 'border-yellow-500/30' : s.status === 'approved' ? 'border-green-500/30' : 'border-red-500/20'}`}>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge label={s.type} color="blue" />
                    <Badge label={s.decade} color="gray" />
                    <Badge label={s.status} color={s.status === 'approved' ? 'green' : s.status === 'rejected' ? 'red' : 'yellow'} />
                    <span className="text-gray-600 text-xs">{s.date}</span>
                  </div>
                  <p className="text-white font-semibold text-sm">{s.name} <span className="text-gray-500 font-normal">· {s.email}</span></p>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{s.content}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {s.status === 'pending' && (
                    <>
                      <button onClick={() => updateSubmission(s.id, 'approved')}
                        className="text-xs bg-green-900/40 text-green-400 border border-green-800 px-3 py-1.5 rounded-lg hover:bg-green-800/60 transition">
                        ✓ Approve
                      </button>
                      <button onClick={() => updateSubmission(s.id, 'rejected')}
                        className="text-xs bg-red-900/40 text-red-400 border border-red-800 px-3 py-1.5 rounded-lg hover:bg-red-800/60 transition">
                        ✗ Reject
                      </button>
                    </>
                  )}
                  <button onClick={() => deleteSubmission(s.id)}
                    className="text-xs text-gray-600 hover:text-red-400 px-2 py-1.5 rounded-lg transition">🗑</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── SHORTS MANAGER ── */}
      {activeTab === 'shorts' && (
        <div className="space-y-4">
          {/* Add new short */}
          <div className="bg-charcoal rounded-2xl p-5 border border-rose-gold/20">
            <h3 className="text-white font-semibold mb-4">➕ Add New Short</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input value={newShort.title} onChange={e => setNewShort({...newShort, title: e.target.value})}
                placeholder="Title" className="bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold" />
              <input value={newShort.videoId} onChange={e => setNewShort({...newShort, videoId: e.target.value})}
                placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)" className="bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold" />
              <select value={newShort.decade} onChange={e => setNewShort({...newShort, decade: e.target.value})}
                className="bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold">
                {DECADES.map(d => <option key={d.id} value={d.id}>{d.id}</option>)}
              </select>
              <select value={newShort.category} onChange={e => setNewShort({...newShort, category: e.target.value})}
                className="bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold">
                {['Music & Dance','Fashion','Technology','Culture','Food','Lifestyle'].map(c => <option key={c}>{c}</option>)}
              </select>
              <input value={newShort.thumbnail} onChange={e => setNewShort({...newShort, thumbnail: e.target.value})}
                placeholder="Thumbnail URL (optional)" className="sm:col-span-2 bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold" />
            </div>
            <button onClick={addShort} className="mt-3 bg-rose-gold text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">
              Add Short
            </button>
          </div>

          {/* List */}
          <div className="space-y-2">
            {shorts.map(s => (
              <div key={s.id} className={`flex items-center gap-4 bg-charcoal rounded-xl px-4 py-3 border ${s.status === 'live' ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
                <span className="text-lg">{DECADES.find(d => d.id === s.decade)?.emoji || '🎬'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{s.title}</p>
                  <div className="flex gap-2 mt-0.5">
                    <Badge label={s.decade} color="gray" />
                    <Badge label={s.category} color="blue" />
                    <Badge label={`♥ ${s.likes.toLocaleString()}`} color="gray" />
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleShort(s.id)}
                    className={`text-xs px-3 py-1 rounded-lg border transition ${s.status === 'live' ? 'bg-green-900/40 text-green-400 border-green-800' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                    {s.status === 'live' ? '● Live' : '○ Hidden'}
                  </button>
                  <button onClick={() => deleteShort(s.id)} className="text-gray-600 hover:text-red-400 text-sm transition">🗑</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DIRECTORIES ── */}
      {activeTab === 'directories' && (
        <div className="space-y-4">
          <div className="flex gap-4 text-sm text-gray-400 mb-2">
            <span>✅ Submitted: <strong className="text-green-400">{submittedDirs}</strong></span>
            <span>⏳ Pending: <strong className="text-yellow-400">{directories.length - submittedDirs}</strong></span>
          </div>

          {/* Add new */}
          <div className="bg-charcoal rounded-2xl p-4 border border-rose-gold/20">
            <h3 className="text-white font-semibold mb-3 text-sm">➕ Add Directory</h3>
            <div className="flex gap-2 flex-wrap">
              <input value={newDir.name} onChange={e => setNewDir({...newDir, name: e.target.value})}
                placeholder="Directory name" className="flex-1 min-w-40 bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold" />
              <input value={newDir.da} onChange={e => setNewDir({...newDir, da: e.target.value})}
                placeholder="DA score" className="w-24 bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold" />
              <input value={newDir.notes} onChange={e => setNewDir({...newDir, notes: e.target.value})}
                placeholder="Notes" className="flex-1 min-w-40 bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold" />
              <button onClick={addDir} className="bg-rose-gold text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">Add</button>
            </div>
          </div>

          <div className="space-y-2">
            {directories.map(d => (
              <div key={d.id} className="flex items-center gap-3 bg-charcoal rounded-xl px-4 py-3 border border-white/10">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{d.name}</p>
                  <div className="flex gap-2 mt-0.5 items-center flex-wrap">
                    {d.da && <span className="text-xs text-gray-500">DA {d.da}</span>}
                    {d.date && <span className="text-xs text-gray-600">· {d.date}</span>}
                    {d.notes && <span className="text-xs text-gray-500 italic">· {d.notes}</span>}
                  </div>
                </div>
                <select value={d.status} onChange={e => updateDir(d.id, 'status', e.target.value)}
                  className={`text-xs px-2 py-1 rounded-lg border outline-none bg-transparent ${d.status === 'submitted' ? 'text-green-400 border-green-800' : 'text-yellow-400 border-yellow-800'}`}>
                  <option value="pending">⏳ Pending</option>
                  <option value="submitted">✅ Submitted</option>
                  <option value="rejected">❌ Rejected</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SITE ERRORS ── */}
      {activeTab === 'errors' && (
        <div className="space-y-4">
          <div className="bg-charcoal rounded-2xl p-4 border border-rose-gold/20">
            <h3 className="text-white font-semibold mb-3 text-sm">➕ Log New Error</h3>
            <div className="flex gap-2 flex-wrap">
              <input value={newError.section} onChange={e => setNewError({...newError, section: e.target.value})}
                placeholder="Section (e.g. Search)" className="w-32 bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold" />
              <input value={newError.desc} onChange={e => setNewError({...newError, desc: e.target.value})}
                placeholder="Description of the issue" className="flex-1 min-w-48 bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold" />
              <select value={newError.severity} onChange={e => setNewError({...newError, severity: e.target.value})}
                className="bg-charcoal-dark border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-rose-gold">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button onClick={addError} className="bg-rose-gold text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">Log</button>
            </div>
          </div>
          <div className="space-y-2">
            {errors.map(e => (
              <div key={e.id} className={`flex items-center gap-3 bg-charcoal rounded-xl px-4 py-3 border ${e.status === 'open' ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 mb-0.5 flex-wrap">
                    <Badge label={e.section} color="blue" />
                    <Badge label={e.severity} color={e.severity === 'high' ? 'red' : e.severity === 'medium' ? 'yellow' : 'gray'} />
                    <Badge label={e.status} color={e.status === 'open' ? 'red' : 'green'} />
                    <span className="text-xs text-gray-600">{e.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{e.desc}</p>
                </div>
                <button onClick={() => toggleError(e.id)}
                  className="text-xs px-3 py-1 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition flex-shrink-0">
                  {e.status === 'open' ? 'Resolve' : 'Reopen'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DECADES.map(d => (
              <div key={d.id} className="bg-charcoal rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{d.emoji}</span>
                  <div>
                    <p className="text-white font-semibold text-sm">{d.label}</p>
                    <p className="text-gray-500 text-xs">{d.years}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.map(cat => (
                    <a key={cat} href={`https://edecades.com/categories`} target="_blank" rel="noreferrer"
                      className="text-xs text-gray-500 hover:text-rose-gold bg-white/5 hover:bg-rose-gold/10 px-2 py-1 rounded-lg transition">
                      {cat}
                    </a>
                  ))}
                </div>
                <div className="mt-3 flex gap-1.5 flex-wrap">
                  <Badge label={`${CATEGORIES.length} categories`} color="gray" />
                  <Badge label="Live ✓" color="green" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SOCIAL ── */}
      {activeTab === 'social' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { platform: 'TikTok', icon: '🎵', handle: '@edecades', status: 'active', schedule: 'Daily script topics set', link: 'https://tiktok.com/@edecades' },
              { platform: 'LinkedIn', icon: '💼', handle: 'eDecades', status: 'active', schedule: '9 AM, 3 PM, 9 PM Central (auto)', link: '#' },
              { platform: 'Discord', icon: '🎮', handle: 'edecades', status: 'active', schedule: 'Auto-post via webhook', link: 'https://discord.com' },
              { platform: 'Pinterest', icon: '📌', handle: 'edecades', status: 'active', schedule: 'Verified — tag ID 549770222914', link: 'https://pinterest.com' },
              { platform: 'Google My Business', icon: '🗺️', handle: 'eDecades', status: 'manual', schedule: 'Post weekly', link: '#' },
              { platform: 'Instagram', icon: '📸', handle: '@edecades', status: 'manual', schedule: 'Post manually', link: '#' },
            ].map(p => (
              <div key={p.platform} className="bg-charcoal rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <p className="text-white font-semibold text-sm">{p.platform}</p>
                      <p className="text-gray-500 text-xs">{p.handle}</p>
                    </div>
                  </div>
                  <Badge label={p.status === 'active' ? '● Auto' : '○ Manual'} color={p.status === 'active' ? 'green' : 'yellow'} />
                </div>
                <p className="text-gray-400 text-xs">{p.schedule}</p>
                {p.link !== '#' && (
                  <a href={p.link} target="_blank" rel="noreferrer"
                    className="mt-3 inline-block text-xs text-rose-gold hover:underline">Open →</a>
                )}
              </div>
            ))}
          </div>
          <div className="bg-charcoal rounded-2xl p-5 border border-rose-gold/20">
            <h3 className="text-white font-semibold mb-2">📅 Automation Schedule</h3>
            <div className="space-y-2 text-sm">
              {[
                ['9:00 AM Central', 'Social auto-post — LinkedIn, Discord, Slack', 'active'],
                ['3:00 PM Central', 'Social auto-post — LinkedIn, Discord, Slack', 'active'],
                ['9:00 PM Central', 'Social auto-post — LinkedIn, Discord, Slack', 'active'],
                ['8:00 AM Central (daily)', 'Daily ops email → anthonykittles@outlook.com', 'active'],
                ['Every Monday 8 AM', 'Weekly task summary email', 'active'],
                ['Every Sunday', 'Directory listing reminder email', 'active'],
              ].map(([time, task, status]) => (
                <div key={time} className="flex items-start gap-3">
                  <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${status === 'active' ? 'bg-green-400' : 'bg-gray-600'}`} />
                  <div>
                    <span className="text-rose-gold font-medium">{time}</span>
                    <span className="text-gray-400 ml-2">{task}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
