import { useState } from 'react';
import { DECADES } from '../data/decades';

const ADMIN_PASSWORD = 'KingXcel2026';
const STORAGE_KEY = 'edecades_admin_auth';

function useStore(key, initial) {
  const [data, setData] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) || initial; }
    catch { return initial; }
  });
  const save = (val) => { setData(val); localStorage.setItem(key, JSON.stringify(val)); };
  return [data, save];
}

// ── SVG Icons ──
const Icon = ({ d, className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
  </svg>
);
const ICONS = {
  dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  submissions: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  shorts: 'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  directories: 'M4 6h16M4 10h16M4 14h16M4 18h16',
  errors: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  content: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  social: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
  affiliate: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  seo: 'M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z',
  ops: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  lock: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  logout: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
  check: 'M5 13l4 4L19 7',
  x: 'M6 18L18 6M6 6l12 12',
  plus: 'M12 4v16m8-8H4',
  edit: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  trash: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
  external: 'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
  chevronDown: 'M19 9l-7 7-7-7',
  chevronUp: 'M5 15l7-7 7 7',
};

// ── Components ──
function StatCard({ iconPath, label, value, sub, accent = false }) {
  return (
    <div className={`rounded-2xl p-5 border ${accent ? 'bg-rose-gold/10 border-rose-gold/30' : 'bg-[#1a1f2e] border-white/10'}`}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-gray-400 text-xs uppercase tracking-widest">{label}</p>
        <Icon d={iconPath} className={`w-4 h-4 ${accent ? 'text-rose-gold' : 'text-gray-500'}`} />
      </div>
      <p className={`text-3xl font-bold ${accent ? 'text-rose-gold' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}

function Section({ title, iconPath, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#1a1f2e] rounded-2xl border border-white/10 overflow-hidden mb-5">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-2">
          <Icon d={iconPath} className="w-4 h-4 text-rose-gold" />
          <h2 className="font-retro text-base font-bold text-white">{title}</h2>
        </div>
        <Icon d={open ? ICONS.chevronUp : ICONS.chevronDown} className="w-4 h-4 text-gray-500" />
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

function Badge({ label, color = 'gray' }) {
  const cls = {
    green: 'bg-green-900/40 text-green-400 border-green-800/40',
    red: 'bg-red-900/40 text-red-400 border-red-800/40',
    yellow: 'bg-yellow-900/40 text-yellow-400 border-yellow-800/40',
    blue: 'bg-blue-900/40 text-blue-400 border-blue-800/40',
    purple: 'bg-purple-900/40 text-purple-400 border-purple-800/40',
    gray: 'bg-white/5 text-gray-400 border-white/10',
  }[color] || 'bg-white/5 text-gray-400 border-white/10';
  return <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${cls}`}>{label}</span>;
}

function Input({ value, onChange, placeholder, type = 'text', className = '' }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      className={`bg-[#0c0f14] border border-white/10 focus:border-rose-gold/50 rounded-xl px-3 py-2 text-white text-sm outline-none placeholder-gray-600 transition-colors w-full ${className}`} />
  );
}

function Select({ value, onChange, children, className = '' }) {
  return (
    <select value={value} onChange={onChange}
      className={`bg-[#0c0f14] border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none w-full ${className}`}>
      {children}
    </select>
  );
}

// ══════════════════════════════════════════════
// TABS
// ══════════════════════════════════════════════
const TABS = [
  { id: 'dashboard',   label: 'Dashboard',    icon: ICONS.dashboard },
  { id: 'submissions', label: 'Admissions',   icon: ICONS.submissions },
  { id: 'shorts',      label: 'Shorts',       icon: ICONS.shorts },
  { id: 'directories', label: 'Directories',  icon: ICONS.directories },
  { id: 'errors',      label: 'Site Errors',  icon: ICONS.errors },
  { id: 'content',     label: 'Content',      icon: ICONS.content },
  { id: 'social',      label: 'Social',       icon: ICONS.social },
  { id: 'affiliate',   label: 'Affiliates',   icon: ICONS.affiliate },
  { id: 'seo',         label: 'SEO',          icon: ICONS.seo },
  { id: 'ops',         label: 'Ops Tracker',  icon: ICONS.ops },
];

// ══════════════════════════════════════════════
// TAB VIEWS
// ══════════════════════════════════════════════

function DashboardTab({ submissions, shorts, directories, errors, socialPosts }) {
  const pending = submissions.filter(s => s.status === 'pending').length;
  const liveShorts = shorts.filter(s => s.status === 'live').length;
  const submitted = directories.filter(d => d.status === 'submitted').length;
  const openErrors = errors.filter(e => e.status === 'open').length;

  const QUICK_LINKS = [
    { label: 'Vercel Dashboard', url: 'https://vercel.com/mecko1293s-projects/edecades', icon: ICONS.external },
    { label: 'GitHub Repo', url: 'https://github.com/Mecko1293/edecades', icon: ICONS.external },
    { label: 'Stripe Dashboard', url: 'https://dashboard.stripe.com', icon: ICONS.external },
    { label: 'Google Search Console', url: 'https://search.google.com/search-console', icon: ICONS.seo },
    { label: 'Google Analytics', url: 'https://analytics.google.com', icon: ICONS.external },
    { label: 'Google Business Profile', url: 'https://business.google.com', icon: ICONS.external },
    { label: 'Pinterest Analytics', url: 'https://analytics.pinterest.com', icon: ICONS.external },
    { label: 'TikTok Studio', url: 'https://www.tiktok.com/tiktokstudio', icon: ICONS.external },
    { label: 'LinkedIn Page', url: 'https://linkedin.com/company/edecades', icon: ICONS.external },
    { label: 'Discord Server', url: 'https://discord.com', icon: ICONS.external },
    { label: 'GoDaddy DNS', url: 'https://dcc.godaddy.com/manage/dns', icon: ICONS.external },
    { label: 'Pixabay Account', url: 'https://pixabay.com', icon: ICONS.external },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard iconPath={ICONS.submissions} label="Pending Admissions" value={pending} sub="Awaiting review" accent={pending > 0} />
        <StatCard iconPath={ICONS.shorts}      label="Live Shorts"        value={liveShorts} sub={`${shorts.length} total clips`} />
        <StatCard iconPath={ICONS.directories} label="Directories Filed"  value={submitted} sub={`of ${directories.length} total`} />
        <StatCard iconPath={ICONS.errors}      label="Open Errors"        value={openErrors} sub="Site issues logged" accent={openErrors > 0} />
      </div>

      {/* Site Status */}
      <Section title="Live Site Status" iconPath={ICONS.external}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { label: 'Production URL', value: 'edecades.com', status: 'Live', color: 'green' },
            { label: 'Vercel Deployment', value: 'Auto-deploy on push', status: 'Active', color: 'green' },
            { label: 'GitHub Repo', value: 'Mecko1293/edecades', status: 'Connected', color: 'green' },
            { label: 'Pixabay API', value: '17942546-...', status: 'Active', color: 'green' },
            { label: 'Spotify API', value: '68548dcd...', status: 'Active', color: 'green' },
            { label: 'TMDB API', value: 'c906cf54...', status: 'Active', color: 'green' },
          ].map(item => (
            <div key={item.label} className="bg-[#0c0f14] rounded-xl p-3 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">{item.label}</p>
              <p className="text-white text-sm font-medium truncate">{item.value}</p>
              <Badge label={item.status} color={item.color} />
            </div>
          ))}
        </div>
      </Section>

      {/* Automation Status */}
      <Section title="Active Automations" iconPath={ICONS.ops}>
        <div className="space-y-2">
          {[
            { name: 'Daily Social Auto-Post', schedule: '9 AM, 3 PM, 9 PM Central', status: 'Active' },
            { name: 'Daily Task Email', schedule: '8 AM Central daily → edecades@outlook.com', status: 'Active' },
            { name: 'Weekly Directory Reminder', schedule: 'Sundays 10 AM Central', status: 'Active' },
            { name: 'Affiliate Reply Monitor', schedule: 'Every 12 hours → edecades@outlook.com', status: 'Active' },
          ].map(a => (
            <div key={a.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{a.name}</p>
                <p className="text-gray-500 text-xs">{a.schedule}</p>
              </div>
              <Badge label={a.status} color="green" />
            </div>
          ))}
        </div>
      </Section>

      {/* Quick Links */}
      <Section title="Quick Links" iconPath={ICONS.external}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {QUICK_LINKS.map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0c0f14] hover:bg-white/5 border border-white/10 hover:border-rose-gold/30 rounded-xl px-3 py-2.5 text-sm text-gray-300 hover:text-rose-gold transition-all">
              <Icon d={l.icon} className="w-3.5 h-3.5 flex-shrink-0 text-gray-500" />
              <span className="truncate">{l.label}</span>
            </a>
          ))}
        </div>
      </Section>

      {/* Business Info */}
      <Section title="Business Info" iconPath={ICONS.content} defaultOpen={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            ['Company', 'King Xcel Innovations'],
            ['Site', 'eDecades.com'],
            ['Address', '205 Seva Ct, Irving, Texas 75061'],
            ['Email', 'edecades@outlook.com'],
            ['Admin Email', 'anthonykittles@outlook.com'],
            ['Pinterest Tag', '549770222914'],
            ['Admin Password', 'KingXcel2026'],
            ['Stripe Account', 'acct_1T4XQARonfiMrfdu'],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#0c0f14] rounded-xl p-3 border border-white/10">
              <p className="text-gray-500 text-xs mb-0.5">{k}</p>
              <p className="text-white font-medium">{v}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function SubmissionsTab({ submissions, setSubmissions }) {
  const update = (id, status) => setSubmissions(submissions.map(s => s.id === id ? { ...s, status } : s));
  const remove = (id) => setSubmissions(submissions.filter(s => s.id !== id));
  const [filter, setFilter] = useState('pending');
  const filtered = filter === 'all' ? submissions : submissions.filter(s => s.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-5 flex-wrap">
        {['all', 'pending', 'approved', 'rejected'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium capitalize transition-colors ${filter === f ? 'bg-rose-gold text-white' : 'bg-[#1a1f2e] text-gray-400 border border-white/10 hover:text-white'}`}>
            {f} {f === 'pending' && submissions.filter(s => s.status === 'pending').length > 0 &&
              <span className="ml-1 bg-white/20 px-1.5 rounded-full text-xs">{submissions.filter(s => s.status === 'pending').length}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(s => (
          <div key={s.id} className="bg-[#1a1f2e] rounded-2xl border border-white/10 p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge label={s.type} color="blue" />
                  <Badge label={s.decade} color="purple" />
                  <Badge label={s.status} color={s.status === 'approved' ? 'green' : s.status === 'rejected' ? 'red' : 'yellow'} />
                </div>
                <p className="text-white font-semibold">{s.name}</p>
                <p className="text-gray-500 text-xs">{s.email} · {s.date}</p>
              </div>
              <button onClick={() => remove(s.id)} className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0">
                <Icon d={ICONS.trash} className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed bg-[#0c0f14] rounded-xl p-3 mb-3">{s.content}</p>
            {s.status === 'pending' && (
              <div className="flex gap-2">
                <button onClick={() => update(s.id, 'approved')}
                  className="flex items-center gap-1.5 bg-green-900/30 hover:bg-green-900/50 border border-green-800/40 text-green-400 text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                  <Icon d={ICONS.check} className="w-3.5 h-3.5" /> Approve
                </button>
                <button onClick={() => update(s.id, 'rejected')}
                  className="flex items-center gap-1.5 bg-red-900/30 hover:bg-red-900/50 border border-red-800/40 text-red-400 text-sm font-medium px-4 py-2 rounded-xl transition-colors">
                  <Icon d={ICONS.x} className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">No {filter === 'all' ? '' : filter} submissions.</div>
        )}
      </div>
    </div>
  );
}

function ShortsTab({ shorts, setShorts }) {
  const [newShort, setNewShort] = useState({ title: '', decade: '1980s', category: 'Music & Dance', videoId: '', thumbnail: '' });
  const toggle = (id) => setShorts(shorts.map(s => s.id === id ? { ...s, status: s.status === 'live' ? 'hidden' : 'live' } : s));
  const remove = (id) => setShorts(shorts.filter(s => s.id !== id));
  const add = () => {
    if (!newShort.title || !newShort.videoId) return;
    setShorts([...shorts, { id: `s${Date.now()}`, ...newShort, status: 'live', likes: 0 }]);
    setNewShort({ title: '', decade: '1980s', category: 'Music & Dance', videoId: '', thumbnail: '' });
  };

  return (
    <div className="space-y-5">
      {/* Add new short */}
      <Section title="Add New Short" iconPath={ICONS.plus}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <Input value={newShort.title} onChange={e => setNewShort(n => ({...n, title: e.target.value}))} placeholder="Short title" />
          <Input value={newShort.videoId} onChange={e => setNewShort(n => ({...n, videoId: e.target.value}))} placeholder="YouTube Video ID (e.g. dQw4w9WgXcQ)" />
          <Select value={newShort.decade} onChange={e => setNewShort(n => ({...n, decade: e.target.value}))}>
            {DECADES.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
          </Select>
          <Select value={newShort.category} onChange={e => setNewShort(n => ({...n, category: e.target.value}))}>
            {['Music & Dance','Fashion','Culture','Sports','History','Technology'].map(c => <option key={c}>{c}</option>)}
          </Select>
          <Input value={newShort.thumbnail} onChange={e => setNewShort(n => ({...n, thumbnail: e.target.value}))} placeholder="Custom thumbnail URL (optional)" className="sm:col-span-2" />
        </div>
        <button onClick={add} className="flex items-center gap-2 bg-rose-gold hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-xl transition-opacity text-sm">
          <Icon d={ICONS.plus} className="w-4 h-4" /> Add Short
        </button>
      </Section>

      {/* Shorts list */}
      <div className="space-y-3">
        {shorts.map(s => (
          <div key={s.id} className="flex items-center gap-4 bg-[#1a1f2e] rounded-2xl border border-white/10 p-4">
            {s.videoId && (
              <img src={`https://img.youtube.com/vi/${s.videoId}/mqdefault.jpg`} alt={s.title}
                className="w-20 h-14 object-cover rounded-lg flex-shrink-0 bg-[#0c0f14]"
                onError={e => { e.target.style.display='none'; }} />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{s.title}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                <Badge label={s.decade} color="purple" />
                <Badge label={s.category} color="blue" />
                <Badge label={s.status} color={s.status === 'live' ? 'green' : 'gray'} />
                {s.likes > 0 && <span className="text-xs text-gray-500">{s.likes.toLocaleString()} likes</span>}
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {s.videoId && (
                <a href={`https://youtube.com/watch?v=${s.videoId}`} target="_blank" rel="noreferrer"
                  className="text-gray-500 hover:text-rose-gold transition-colors">
                  <Icon d={ICONS.external} className="w-4 h-4" />
                </a>
              )}
              <button onClick={() => toggle(s.id)} className={`text-xs font-medium px-3 py-1 rounded-xl border transition-colors ${s.status === 'live' ? 'bg-green-900/30 text-green-400 border-green-800/30 hover:bg-red-900/30 hover:text-red-400 hover:border-red-800/30' : 'bg-white/5 text-gray-400 border-white/10 hover:bg-green-900/30 hover:text-green-400 hover:border-green-800/30'}`}>
                {s.status === 'live' ? 'Hide' : 'Show'}
              </button>
              <button onClick={() => remove(s.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                <Icon d={ICONS.trash} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirectoriesTab({ directories, setDirectories }) {
  const [newDir, setNewDir] = useState({ name: '', da: '', notes: '' });
  const update = (id, field, val) => setDirectories(directories.map(d => d.id === id ? { ...d, [field]: val } : d));
  const add = () => {
    if (!newDir.name) return;
    setDirectories([...directories, { id: Date.now(), ...newDir, status: 'pending', date: '' }]);
    setNewDir({ name: '', da: '', notes: '' });
  };

  const stats = { submitted: directories.filter(d => d.status === 'submitted').length, pending: directories.filter(d => d.status === 'pending').length };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <StatCard iconPath={ICONS.check} label="Submitted" value={stats.submitted} />
        <StatCard iconPath={ICONS.directories} label="Pending" value={stats.pending} accent />
        <StatCard iconPath={ICONS.directories} label="Total" value={directories.length} />
      </div>

      <Section title="Add Directory" iconPath={ICONS.plus}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <Input value={newDir.name} onChange={e => setNewDir(n => ({...n, name: e.target.value}))} placeholder="Directory name" />
          <Input value={newDir.da} onChange={e => setNewDir(n => ({...n, da: e.target.value}))} placeholder="Domain Authority (1-100)" />
          <Input value={newDir.notes} onChange={e => setNewDir(n => ({...n, notes: e.target.value}))} placeholder="Notes" />
        </div>
        <button onClick={add} className="flex items-center gap-2 bg-rose-gold hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-xl transition-opacity text-sm">
          <Icon d={ICONS.plus} className="w-4 h-4" /> Add Directory
        </button>
      </Section>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-[#0c0f14]">
            <tr>
              {['Directory','DA','Status','Date','Notes','Action'].map(h => (
                <th key={h} className="text-left text-gray-500 text-xs uppercase tracking-widest px-4 py-3 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {directories.sort((a, b) => (b.da || 0) - (a.da || 0)).map((d, i) => (
              <tr key={d.id} className={`border-t border-white/5 ${i % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#141822]'} hover:bg-white/5`}>
                <td className="px-4 py-3 text-white font-medium">{d.name}</td>
                <td className="px-4 py-3 text-gray-400">{d.da || '—'}</td>
                <td className="px-4 py-3">
                  <Select value={d.status} onChange={e => update(d.id, 'status', e.target.value)} className="!w-28 !py-1 text-xs">
                    <option value="pending">Pending</option>
                    <option value="submitted">Submitted</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </Select>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{d.date || '—'}</td>
                <td className="px-4 py-3">
                  <Input value={d.notes || ''} onChange={e => update(d.id, 'notes', e.target.value)} placeholder="Add note..." className="!text-xs !py-1" />
                </td>
                <td className="px-4 py-3">
                  <button onClick={() => update(d.id, 'date', new Date().toISOString().slice(0, 10))}
                    className="text-xs bg-rose-gold/20 text-rose-gold hover:bg-rose-gold/30 px-2 py-1 rounded-lg transition-colors">
                    Mark Today
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ErrorsTab({ errors, setErrors }) {
  const [newError, setNewError] = useState({ section: '', desc: '', severity: 'medium' });
  const toggle = (id) => setErrors(errors.map(e => e.id === id ? { ...e, status: e.status === 'open' ? 'resolved' : 'open' } : e));
  const remove = (id) => setErrors(errors.filter(e => e.id !== id));
  const add = () => {
    if (!newError.section || !newError.desc) return;
    setErrors([...errors, { id: Date.now(), ...newError, status: 'open', date: new Date().toISOString().slice(0, 10) }]);
    setNewError({ section: '', desc: '', severity: 'medium' });
  };
  const [filter, setFilter] = useState('open');
  const filtered = filter === 'all' ? errors : errors.filter(e => e.status === filter);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        <StatCard iconPath={ICONS.errors} label="Open" value={errors.filter(e => e.status === 'open').length} accent />
        <StatCard iconPath={ICONS.check} label="Resolved" value={errors.filter(e => e.status === 'resolved').length} />
        <StatCard iconPath={ICONS.errors} label="Total Logged" value={errors.length} />
      </div>

      <Section title="Log New Error" iconPath={ICONS.plus}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <Input value={newError.section} onChange={e => setNewError(n => ({...n, section: e.target.value}))} placeholder="Page / Section" />
          <Input value={newError.desc} onChange={e => setNewError(n => ({...n, desc: e.target.value}))} placeholder="Describe the issue" className="sm:col-span-1" />
          <Select value={newError.severity} onChange={e => setNewError(n => ({...n, severity: e.target.value}))}>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </Select>
        </div>
        <button onClick={add} className="flex items-center gap-2 bg-rose-gold hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-xl transition-opacity text-sm">
          <Icon d={ICONS.plus} className="w-4 h-4" /> Log Error
        </button>
      </Section>

      <div className="flex gap-2 mb-3">
        {['all','open','resolved'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-sm capitalize transition-colors ${filter === f ? 'bg-rose-gold text-white' : 'bg-[#1a1f2e] text-gray-400 border border-white/10 hover:text-white'}`}>{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(e => (
          <div key={e.id} className={`flex items-start gap-3 rounded-2xl border p-4 ${e.status === 'resolved' ? 'bg-[#0c0f14] border-white/5 opacity-60' : 'bg-[#1a1f2e] border-white/10'}`}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge label={e.section} color="blue" />
                <Badge label={e.severity} color={e.severity === 'critical' ? 'red' : e.severity === 'high' ? 'red' : e.severity === 'medium' ? 'yellow' : 'gray'} />
                <Badge label={e.status} color={e.status === 'resolved' ? 'green' : 'red'} />
                <span className="text-gray-600 text-xs">{e.date}</span>
              </div>
              <p className="text-gray-200 text-sm">{e.desc}</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => toggle(e.id)}
                className={`text-xs font-medium px-3 py-1 rounded-xl border transition-colors ${e.status === 'open' ? 'bg-green-900/30 text-green-400 border-green-800/30 hover:opacity-80' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>
                {e.status === 'open' ? 'Resolve' : 'Reopen'}
              </button>
              <button onClick={() => remove(e.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                <Icon d={ICONS.trash} className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentTab() {
  const PAGES = [
    { name: 'Home', route: '/', status: 'Live' },
    { name: 'Decades', route: '/decades', status: 'Live' },
    { name: 'Decade Detail', route: '/decade/:id', status: 'Live' },
    { name: 'Categories', route: '/categories', status: 'Live' },
    { name: 'Music by Decade', route: '/music', status: 'Live' },
    { name: 'Sports MVPs', route: '/sports', status: 'Live' },
    { name: 'Presidents', route: '/presidents', status: 'Live' },
    { name: 'On This Day', route: '/onthisday', status: 'Live' },
    { name: 'Ask a Historical Figure', route: '/chat', status: 'Live' },
    { name: 'Decade Stats', route: '/stats', status: 'Live' },
    { name: 'Trivia', route: '/trivia', status: 'Live' },
    { name: 'Time Capsule', route: '/timecapsule', status: 'Live' },
    { name: 'Video Shorts', route: '/shorts', status: 'Live' },
    { name: 'Search', route: '/search', status: 'Live' },
    { name: 'Profile', route: '/profile', status: 'Live' },
    { name: 'Directory Submit', route: '/directory', status: 'Live' },
    { name: 'Admin', route: '/admin', status: 'Live' },
  ];
  return (
    <div className="space-y-5">
      <Section title="All Site Pages" iconPath={ICONS.content}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PAGES.map(p => (
            <div key={p.route} className="flex items-center justify-between bg-[#0c0f14] rounded-xl px-4 py-3 border border-white/10">
              <div>
                <p className="text-white text-sm font-medium">{p.name}</p>
                <p className="text-gray-500 text-xs font-mono">{p.route}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={p.status} color="green" />
                <a href={`https://edecades.com${p.route.replace(':id', '1980s')}`} target="_blank" rel="noreferrer"
                  className="text-gray-600 hover:text-rose-gold transition-colors">
                  <Icon d={ICONS.external} className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Data Coverage" iconPath={ICONS.content} defaultOpen={false}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Decades covered', value: '13/13', color: 'green' },
            { label: 'Music decades', value: '13/13', color: 'green' },
            { label: 'Sports MVPs', value: '16 athletes', color: 'green' },
            { label: 'On This Day events', value: '27 events', color: 'green' },
            { label: 'Trivia questions', value: '26 questions', color: 'green' },
            { label: 'Presidents', value: '17 presidents', color: 'green' },
            { label: 'Historical figures', value: '30 AI personas', color: 'green' },
            { label: 'Video shorts', value: '40+ clips', color: 'green' },
            { label: 'Categories', value: '7 types × 13 decades', color: 'green' },
          ].map(item => (
            <div key={item.label} className="bg-[#0c0f14] rounded-xl p-3 border border-white/10">
              <p className="text-gray-500 text-xs mb-1">{item.label}</p>
              <p className="text-green-400 font-semibold text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function SocialTab({ socialPosts, setSocialPosts }) {
  const CHANNELS = [
    { name: 'TikTok', handle: '@edecades', status: 'Manual posting', url: 'https://tiktok.com/@edecades', statusColor: 'yellow' },
    { name: 'LinkedIn', handle: 'eDecades', status: 'Auto 3x/day', url: 'https://linkedin.com', statusColor: 'green' },
    { name: 'Discord', handle: 'edecades', status: 'Webhook live', url: 'https://discord.com', statusColor: 'green' },
    { name: 'Pinterest', handle: 'eDecades', status: 'Verified + Active', url: 'https://pinterest.com', statusColor: 'green' },
    { name: 'Instagram', handle: '@edecades', status: 'Manual posting', url: 'https://instagram.com', statusColor: 'yellow' },
    { name: 'Facebook', handle: 'eDecades', status: 'Manual posting', url: 'https://facebook.com', statusColor: 'yellow' },
    { name: 'X / Twitter', handle: '@edecades', status: 'Manual posting', url: 'https://twitter.com', statusColor: 'yellow' },
    { name: 'YouTube', handle: 'eDecades', status: 'Channel active', url: 'https://youtube.com/channel/UCfk_Hh-GE2HJXO8q9s3Pfmw', statusColor: 'green' },
  ];

  return (
    <div className="space-y-5">
      <Section title="Social Channels" iconPath={ICONS.social}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHANNELS.map(c => (
            <div key={c.name} className="flex items-center justify-between bg-[#0c0f14] rounded-xl px-4 py-3 border border-white/10">
              <div>
                <p className="text-white font-semibold text-sm">{c.name}</p>
                <p className="text-gray-500 text-xs">{c.handle}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={c.status} color={c.statusColor} />
                <a href={c.url} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-rose-gold transition-colors">
                  <Icon d={ICONS.external} className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Posting Schedule" iconPath={ICONS.ops}>
        <div className="space-y-2">
          {[
            { time: '9:00 AM Central', desc: 'Morning post — decade fact or nostalgia', platforms: 'LinkedIn, Discord' },
            { time: '3:00 PM Central', desc: 'Afternoon post — music, fashion, or culture hook', platforms: 'LinkedIn, Discord' },
            { time: '9:00 PM Central', desc: 'Evening post — historical figure or On This Day', platforms: 'LinkedIn, Discord' },
            { time: 'Daily (manual)', desc: 'TikTok script from generated topics', platforms: 'TikTok' },
            { time: 'Daily (manual)', desc: 'Instagram Story or Reel', platforms: 'Instagram' },
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0">
              <div className="w-28 text-rose-gold text-xs font-semibold flex-shrink-0 mt-0.5">{s.time}</div>
              <div className="flex-1">
                <p className="text-white text-sm">{s.desc}</p>
                <p className="text-gray-500 text-xs mt-0.5">{s.platforms}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function AffiliateTab() {
  const PARTNERS = [
    { name: 'GoodRx', email: 'ada@goodrx.com', status: 'Awaiting reply', sent: '2026-05-11', statusColor: 'yellow', url: 'https://goodrx.com/developer/apply' },
    { name: 'Blink Health', email: 'partnerships@blinkhealth.com', status: 'Awaiting reply', sent: '2026-05-11', statusColor: 'yellow', url: 'https://blinkhealth.com' },
    { name: 'RxSpark', email: 'partners@rxspark.com', status: 'Awaiting reply', sent: '2026-05-11', statusColor: 'yellow', url: 'https://rxspark.com' },
    { name: 'Amazon Pharmacy', email: 'affiliate-program.amazon.com', status: 'Form only', sent: '—', statusColor: 'blue', url: 'https://affiliate-program.amazon.com' },
    { name: 'Cost Plus Drugs', email: 'N/A', status: 'No affiliate program', sent: '—', statusColor: 'gray', url: 'https://costplusdrugs.com' },
  ];

  return (
    <div className="space-y-5">
      <Section title="CheapMedz Affiliate Outreach" iconPath={ICONS.affiliate}>
        <div className="space-y-3">
          {PARTNERS.map(p => (
            <div key={p.name} className="flex items-center justify-between bg-[#0c0f14] rounded-xl px-4 py-3 border border-white/10">
              <div>
                <p className="text-white font-semibold text-sm">{p.name}</p>
                <p className="text-gray-500 text-xs">{p.email} · Sent: {p.sent}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={p.status} color={p.statusColor} />
                <a href={p.url} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-rose-gold transition-colors">
                  <Icon d={ICONS.external} className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Potential eDecades Affiliates" iconPath={ICONS.affiliate} defaultOpen={false}>
        <div className="space-y-2">
          {[
            ['Amazon Associates', 'Decade products, books, music, vintage items', 'affiliate-program.amazon.com'],
            ['Ancestry.com', 'Family history — links to genealogy content', 'ancestry.com/affiliate'],
            ['VinylHub / Discogs', 'Vintage vinyl records for music decade fans', 'discogs.com'],
            ['Google AdSense', 'Display ads — passive income once traffic grows', 'adsense.google.com'],
            ['Target / Walmart', 'Nostalgia merchandise affiliate programs', 'impact.com'],
          ].map(([name, desc, url]) => (
            <div key={name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{name}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
              <a href={`https://${url}`} target="_blank" rel="noreferrer"
                className="text-xs bg-rose-gold/20 text-rose-gold hover:bg-rose-gold/30 px-3 py-1 rounded-xl transition-colors flex-shrink-0 ml-3">
                Apply
              </a>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function SEOTab() {
  const DIRECTORIES = [
    { name: 'Google My Business', da: 100, url: 'https://business.google.com', priority: 'Critical' },
    { name: 'Bing Places', da: 94, url: 'https://bingplaces.com', priority: 'High' },
    { name: 'Apple Maps Connect', da: 90, url: 'https://mapsconnect.apple.com', priority: 'High' },
    { name: 'Better Business Bureau', da: 92, url: 'https://bbb.org', priority: 'High' },
    { name: 'Yelp', da: 94, url: 'https://biz.yelp.com', priority: 'High' },
    { name: 'Yellow Pages', da: 72, url: 'https://yplocal.us', priority: 'Medium' },
    { name: 'Foursquare', da: 90, url: 'https://foursquare.com/add-place', priority: 'Medium' },
    { name: 'Manta', da: 55, url: 'https://manta.com', priority: 'Medium' },
    { name: 'Hotfrog', da: 50, url: 'https://hotfrog.com', priority: 'Low' },
    { name: 'MerchantCircle', da: 48, url: 'https://merchantcircle.com', priority: 'Low' },
  ];

  return (
    <div className="space-y-5">
      <Section title="SEO Checklist" iconPath={ICONS.seo}>
        <div className="space-y-2">
          {[
            ['sitemap.xml submitted to Google', 'green', 'Submit at search.google.com/search-console'],
            ['robots.txt configured', 'green', 'Vercel handles this automatically'],
            ['Schema markup (JSON-LD)', 'yellow', 'Add Article/WebPage schema to decade pages'],
            ['Meta titles & descriptions', 'yellow', 'Each page needs unique meta tags'],
            ['Open Graph tags', 'yellow', 'For social sharing previews on each page'],
            ['Page speed optimization', 'green', 'Vite build is production-optimized'],
            ['HTTPS certificate', 'green', 'Vercel provides automatic SSL'],
            ['Mobile responsive', 'green', 'Tailwind CSS responsive design throughout'],
            ['Google Analytics connected', 'yellow', 'Add GA4 tracking to index.html'],
            ['Google Search Console verified', 'yellow', 'Verify ownership at search.google.com'],
          ].map(([task, status, note]) => (
            <div key={task} className="flex items-start gap-3 py-2 border-b border-white/5 last:border-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${status === 'green' ? 'bg-green-400' : 'bg-yellow-400'}`} />
              <div>
                <p className="text-white text-sm">{task}</p>
                <p className="text-gray-500 text-xs">{note}</p>
              </div>
              <Badge label={status === 'green' ? 'Done' : 'Needed'} color={status === 'green' ? 'green' : 'yellow'} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Top Directory Listings" iconPath={ICONS.directories} defaultOpen={false}>
        <div className="space-y-2">
          {DIRECTORIES.map(d => (
            <div key={d.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{d.name}</p>
                <p className="text-gray-500 text-xs">DA: {d.da}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge label={d.priority} color={d.priority === 'Critical' ? 'red' : d.priority === 'High' ? 'yellow' : 'gray'} />
                <a href={d.url} target="_blank" rel="noreferrer"
                  className="text-xs bg-rose-gold/20 text-rose-gold hover:bg-rose-gold/30 px-3 py-1 rounded-xl transition-colors">
                  Submit
                </a>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function OpsTab() {
  const DAILY = [
    'Post 1–2 fresh pins to Pinterest',
    'Check new user signups on eDecades',
    'Respond to forum posts or messages',
    'Monitor affiliate partner replies',
    'Share 1 post on TikTok or Instagram',
    'Check Stripe dashboard for new transactions',
  ];
  const WEEKLY = [
    'Submit eDecades to 1–2 new business directories',
    'Review Google Analytics traffic report',
    'Write and publish 1 new On This Day event',
    'Add 2–3 new trivia questions',
    'Check Search Console for new keywords',
    'Review and respond to any affiliate replies',
    'Post 1 long-form LinkedIn article',
  ];
  const MONTHLY = [
    'Full site audit — check all page links and images',
    'Update sports MVPs or presidents data if needed',
    'Create a new Historical Chat persona',
    'Pinterest board audit and new pins',
    'Review and update SEO meta descriptions',
    'Backup GitHub repo and verify Vercel deployment',
    'Send outreach email to new potential affiliate',
  ];

  return (
    <div className="space-y-5">
      {[
        { title: 'Daily Tasks', items: DAILY },
        { title: 'Weekly Tasks', items: WEEKLY },
        { title: 'Monthly Tasks', items: MONTHLY },
      ].map(({ title, items }) => (
        <Section key={title} title={title} iconPath={ICONS.ops}>
          <div className="space-y-2">
            {items.map((task, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <div className="w-5 h-5 rounded-md border border-white/20 flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-rose-gold/50 transition-colors">
                  <div className="w-2.5 h-2.5 rounded-sm bg-transparent hover:bg-rose-gold/30 transition-colors" />
                </div>
                <p className="text-gray-300 text-sm">{task}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [submissions, setSubmissions] = useStore('admin_submissions', [
    { id: 1, name: 'John Doe',  email: 'john@example.com',  type: 'Time Capsule', content: 'My 1980s memories of arcade games and big hair...', decade: '1980s', status: 'pending', date: '2026-05-10' },
    { id: 2, name: 'Sarah M.', email: 'sarah@example.com', type: 'Shorts Clip',   content: 'YouTube link: youtube.com/watch?v=abc123 — 1970s disco footage', decade: '1970s', status: 'pending', date: '2026-05-09' },
    { id: 3, name: 'Mike R.',  email: 'mike@example.com',  type: 'On This Day',   content: 'Moon landing July 20 1969 should be featured', decade: '1960s', status: 'approved', date: '2026-05-08' },
  ]);
  const [directories, setDirectories] = useStore('admin_directories', [
    { id: 1, name: 'Google My Business', status: 'submitted', da: 100, date: '2026-05-01', notes: 'Verified listing live' },
    { id: 2, name: 'Bing Places',        status: 'submitted', da: 94,  date: '2026-05-02', notes: '' },
    { id: 3, name: 'Apple Maps',         status: 'pending',   da: 90,  date: '',           notes: 'Need to claim' },
    { id: 4, name: 'Better Business Bureau', status: 'pending', da: 92, date: '',          notes: '' },
    { id: 5, name: 'Manta',             status: 'submitted', da: 55,  date: '2026-05-05', notes: '' },
    { id: 6, name: 'Hotfrog',           status: 'pending',   da: 50,  date: '',           notes: '' },
    { id: 7, name: 'Yellow Pages',      status: 'pending',   da: 72,  date: '',           notes: '' },
    { id: 8, name: 'Yahoo Local',       status: 'submitted', da: 68,  date: '2026-05-06', notes: '' },
    { id: 9, name: 'MerchantCircle',    status: 'pending',   da: 48,  date: '',           notes: '' },
    { id: 10, name: 'Superpages',       status: 'pending',   da: 45,  date: '',           notes: '' },
  ]);
  const [shorts, setShorts] = useStore('admin_shorts', [
    { id: 's1', title: 'Charleston Dance — 1920s Jazz Age', decade: '1920s', category: 'Music & Dance', videoId: 'MdG7pG16VzE', status: 'live', likes: 4200 },
    { id: 's2', title: 'Saturday Night Fever — Disco Era',  decade: '1970s', category: 'Music & Dance', videoId: 'I_izvAbhExY', status: 'live', likes: 15600 },
    { id: 's3', title: 'Big Hair & Power Suits',            decade: '1980s', category: 'Fashion',       videoId: 'nfWlot6h_JM', status: 'live', likes: 18900 },
    { id: 's4', title: 'Grunge Era — Nirvana Sound',        decade: '1990s', category: 'Music & Dance', videoId: 'hTWKbfoikeg', status: 'live', likes: 27000 },
    { id: 's5', title: 'TikTok Era & Short-Form Video',     decade: '2020s', category: 'Culture',       videoId: 'dQw4w9WgXcQ', status: 'live', likes: 88000 },
  ]);
  const [errors, setErrors] = useStore('admin_errors', [
    { id: 1, section: 'Search', desc: 'Media search returns empty on mobile', severity: 'high', status: 'open', date: '2026-05-09' },
    { id: 2, section: 'Shorts', desc: 'Video modal nav arrows not working on iOS', severity: 'medium', status: 'open', date: '2026-05-10' },
  ]);
  const [socialPosts, setSocialPosts] = useStore('admin_social', []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) { sessionStorage.setItem(STORAGE_KEY, '1'); setAuthed(true); }
    else { setPwError('Incorrect password.'); }
  };
  const logout = () => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false); };

  // ── LOGIN ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-gold/20 border border-rose-gold/30 flex items-center justify-center">
              <Icon d={ICONS.lock} className="w-8 h-8 text-rose-gold" />
            </div>
            <h1 className="font-retro text-3xl font-bold text-white">King Xcel Admin</h1>
            <p className="text-gray-400 text-sm mt-2">eDecades Control Center</p>
          </div>
          <form onSubmit={handleLogin} className="bg-[#1a1f2e] rounded-2xl p-6 border border-white/10">
            <label className="block text-gray-400 text-xs uppercase tracking-widest mb-2">Admin Password</label>
            <Input type="password" value={pwInput}
              onChange={e => { setPwInput(e.target.value); setPwError(''); }}
              placeholder="Enter password..." />
            {pwError && <p className="text-red-400 text-xs mt-2">{pwError}</p>}
            <button type="submit" className="w-full bg-rose-gold text-white font-bold py-3 rounded-xl hover:opacity-90 transition mt-4">
              Enter Admin
            </button>
          </form>
          <p className="text-center text-gray-600 text-xs mt-4">King Xcel Innovations © 2026</p>
        </div>
      </div>
    );
  }

  const pendingCount = submissions.filter(s => s.status === 'pending').length;

  // ── ADMIN UI ──
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-retro text-2xl font-bold text-white">eDecades Admin</h1>
          <p className="text-gray-500 text-xs mt-0.5">King Xcel Innovations Control Center</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://edecades.com" target="_blank" rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 hover:text-rose-gold transition-colors border border-white/10 hover:border-rose-gold/30 rounded-xl px-3 py-2">
            <Icon d={ICONS.external} className="w-3.5 h-3.5" /> View Live Site
          </a>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors border border-white/10 rounded-xl px-3 py-2">
            <Icon d={ICONS.logout} className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Tabs — horizontal scroll on mobile */}
      <div className="flex gap-1 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
              activeTab === t.id
                ? 'bg-rose-gold text-white shadow-lg shadow-rose-gold/20'
                : 'bg-[#1a1f2e] text-gray-400 border border-white/10 hover:text-white hover:border-white/20'
            }`}>
            <Icon d={t.icon} className="w-3.5 h-3.5" />
            {t.label}
            {t.id === 'submissions' && pendingCount > 0 && (
              <span className="bg-white/20 text-white text-xs px-1.5 rounded-full leading-none py-0.5">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard'   && <DashboardTab submissions={submissions} shorts={shorts} directories={directories} errors={errors} socialPosts={socialPosts} />}
      {activeTab === 'submissions' && <SubmissionsTab submissions={submissions} setSubmissions={setSubmissions} />}
      {activeTab === 'shorts'      && <ShortsTab shorts={shorts} setShorts={setShorts} />}
      {activeTab === 'directories' && <DirectoriesTab directories={directories} setDirectories={setDirectories} />}
      {activeTab === 'errors'      && <ErrorsTab errors={errors} setErrors={setErrors} />}
      {activeTab === 'content'     && <ContentTab />}
      {activeTab === 'social'      && <SocialTab socialPosts={socialPosts} setSocialPosts={setSocialPosts} />}
      {activeTab === 'affiliate'   && <AffiliateTab />}
      {activeTab === 'seo'         && <SEOTab />}
      {activeTab === 'ops'         && <OpsTab />}
    </div>
  );
}
