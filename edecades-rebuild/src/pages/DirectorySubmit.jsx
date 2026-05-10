import { useState } from 'react';

const DIRECTORIES = [
  { name: 'Google Business Profile', url: 'https://business.google.com', category: 'Search', da: 100, free: true, status: 'pending', instructions: 'Claim or create your business listing on Google.' },
  { name: 'Bing Places', url: 'https://www.bingplaces.com', category: 'Search', da: 94, free: true, status: 'pending', instructions: 'Add your business to Bing\'s business directory.' },
  { name: 'Yelp', url: 'https://biz.yelp.com', category: 'Reviews', da: 93, free: true, status: 'pending', instructions: 'Claim or create a Yelp business page.' },
  { name: 'Facebook Business', url: 'https://www.facebook.com/pages/creation', category: 'Social', da: 96, free: true, status: 'pending', instructions: 'Create a Facebook business page for eDecades.' },
  { name: 'LinkedIn Company', url: 'https://www.linkedin.com/company/setup/new', category: 'Social', da: 98, free: true, status: 'pending', instructions: 'Create a LinkedIn company page for King Xcel Innovations / eDecades.' },
  { name: 'Crunchbase', url: 'https://www.crunchbase.com/add-new-organization', category: 'Business', da: 91, free: true, status: 'pending', instructions: 'Add eDecades as a startup/organization.' },
  { name: 'Product Hunt', url: 'https://www.producthunt.com/posts/new', category: 'Tech', da: 90, free: true, status: 'pending', instructions: 'Launch eDecades on Product Hunt to get early adopters.' },
  { name: 'AlternativeTo', url: 'https://alternativeto.net/suggest', category: 'Tech', da: 81, free: true, status: 'pending', instructions: 'Submit eDecades as a social/nostalgia platform alternative.' },
  { name: 'BetaList', url: 'https://betalist.com/submit', category: 'Tech', da: 75, free: true, status: 'pending', instructions: 'Submit eDecades as a beta/startup product.' },
  { name: 'Capterra', url: 'https://www.capterra.com/vendors/sign-up', category: 'Software', da: 88, free: true, status: 'pending', instructions: 'List eDecades as a social media/community platform.' },
  { name: 'G2', url: 'https://sell.g2.com/free-listing', category: 'Software', da: 89, free: true, status: 'pending', instructions: 'Add eDecades as a community/nostalgia platform on G2.' },
  { name: 'GetApp', url: 'https://www.getapp.com/vendors', category: 'Software', da: 85, free: true, status: 'pending', instructions: 'List eDecades as a social networking app.' },
  { name: 'Trustpilot', url: 'https://business.trustpilot.com/signup', category: 'Reviews', da: 92, free: true, status: 'pending', instructions: 'Claim your free Trustpilot business page.' },
  { name: 'Foursquare', url: 'https://foursquare.com/add-place', category: 'Local', da: 92, free: true, status: 'pending', instructions: 'Add eDecades as a digital/tech company.' },
  { name: 'Manta', url: 'https://www.manta.com/add_business', category: 'Business', da: 76, free: true, status: 'pending', instructions: 'Add King Xcel / eDecades to the Manta business directory.' },
  { name: 'Hotfrog', url: 'https://www.hotfrog.com/AddBusiness.aspx', category: 'Business', da: 71, free: true, status: 'pending', instructions: 'Submit eDecades to Hotfrog free business directory.' },
  { name: 'Sitejabber', url: 'https://www.sitejabber.com/add-business', category: 'Reviews', da: 77, free: true, status: 'pending', instructions: 'Claim eDecades business profile on Sitejabber.' },
  { name: 'Brownbook', url: 'https://www.brownbook.net/add-business', category: 'Business', da: 66, free: true, status: 'pending', instructions: 'Add eDecades to Brownbook global directory.' },
  { name: 'Spoke', url: 'https://www.spoke.com/companies/new', category: 'Business', da: 65, free: true, status: 'pending', instructions: 'Register King Xcel Innovations / eDecades on Spoke.' },
  { name: 'EverybodyWiki', url: 'https://en.everybodywiki.com/Special:CreatePage', category: 'Wiki', da: 62, free: true, status: 'pending', instructions: 'Create a Wikipedia-style article about eDecades.' },
  { name: 'AboutUs', url: 'https://aboutus.com/eDecades.com', category: 'Web', da: 60, free: true, status: 'pending', instructions: 'Claim the eDecades.com profile on AboutUs.' },
  { name: 'SaaSHub', url: 'https://www.saashub.com/add-software', category: 'Tech', da: 73, free: true, status: 'pending', instructions: 'List eDecades as a social/nostalgia SaaS product.' },
  { name: 'AppSumo', url: 'https://partners.appsumo.com', category: 'Tech', da: 87, free: false, status: 'pending', instructions: 'Partner program — great for lifetime deal launches.' },
];

const CATEGORIES_FILTER = ['All', 'Search', 'Social', 'Tech', 'Software', 'Business', 'Reviews', 'Local', 'Wiki', 'Web'];

const STATUS_CONFIG = {
  pending:   { label: 'Not Started', color: 'text-gray-400', bg: 'bg-gray-700/40', dot: 'bg-gray-500' },
  opened:    { label: 'Link Opened', color: 'text-yellow-400', bg: 'bg-yellow-900/30', dot: 'bg-yellow-400' },
  submitted: { label: 'Submitted ✓', color: 'text-green-400', bg: 'bg-green-900/30', dot: 'bg-green-400' },
  verified:  { label: 'Verified ✓✓', color: 'text-emerald-300', bg: 'bg-emerald-900/30', dot: 'bg-emerald-400' },
  skipped:   { label: 'Skipped', color: 'text-gray-500', bg: 'bg-gray-800/30', dot: 'bg-gray-600' },
};

const SITE_INFO = {
  name: 'eDecades',
  url: 'https://edecades.com',
  description: 'eDecades is a social nostalgia platform where you can explore culture, music, fashion, and history from every decade — the 1900s through the 2020s.',
  category: 'Social Networking / Community / Entertainment',
  keywords: 'nostalgia, decades, history, culture, music, fashion, 1980s, 1990s, retro, vintage',
  email: 'anthonykittles@outlook.com',
  address: '205 Seva Ct, Irving, Texas 75061',
  phone: '',
};

export default function DirectorySubmit() {
  const [statuses, setStatuses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dir_statuses') || '{}'); } catch { return {}; }
  });
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showInfo, setShowInfo] = useState(false);

  const save = (updated) => {
    setStatuses(updated);
    localStorage.setItem('dir_statuses', JSON.stringify(updated));
  };

  const setStatus = (name, status) => {
    save({ ...statuses, [name]: status });
  };

  const openDirectory = (dir) => {
    window.open(dir.url, '_blank');
    if (!statuses[dir.name] || statuses[dir.name] === 'pending') {
      setStatus(dir.name, 'opened');
    }
  };

  const openAll = () => {
    const filtered = getFiltered();
    filtered.forEach((dir, i) => {
      setTimeout(() => window.open(dir.url, '_blank'), i * 600);
    });
    const updated = { ...statuses };
    filtered.forEach(dir => { if (!updated[dir.name] || updated[dir.name] === 'pending') updated[dir.name] = 'opened'; });
    save(updated);
  };

  const markAllSubmitted = () => {
    const updated = { ...statuses };
    getFiltered().forEach(dir => { updated[dir.name] = 'submitted'; });
    save(updated);
  };

  const resetAll = () => {
    if (confirm('Reset all statuses?')) save({});
  };

  const getStatus = (name) => statuses[name] || 'pending';

  const getFiltered = () => DIRECTORIES.filter(d => {
    const catMatch = filter === 'All' || d.category === filter;
    const searchMatch = !search || d.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const total = DIRECTORIES.length;
  const submitted = Object.values(statuses).filter(s => s === 'submitted' || s === 'verified').length;
  const opened = Object.values(statuses).filter(s => s === 'opened').length;
  const progress = Math.round((submitted / total) * 100);

  const filtered = getFiltered();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-retro text-4xl font-bold text-white mb-2">📋 Directory Submissions</h1>
        <p className="text-gray-400">Submit eDecades.com to {total} high-authority directories to boost SEO & traffic</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Directories', value: total, color: 'text-white' },
          { label: 'Submitted', value: submitted, color: 'text-green-400' },
          { label: 'Opened', value: opened, color: 'text-yellow-400' },
          { label: 'Progress', value: `${progress}%`, color: 'text-rose-gold' },
        ].map(s => (
          <div key={s.label} className="bg-charcoal rounded-2xl p-4 border border-white/10 text-center">
            <div className={`text-3xl font-bold font-retro ${s.color}`}>{s.value}</div>
            <div className="text-gray-400 text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 rounded-full h-2 mb-8">
        <div className="bg-rose-gold h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* Site Info Panel */}
      <div className="bg-charcoal border border-white/10 rounded-2xl p-4 mb-6">
        <button onClick={() => setShowInfo(!showInfo)} className="flex items-center gap-2 text-rose-gold font-semibold text-sm w-full">
          <span>📌 Copy-Paste Site Info</span>
          <span className="ml-auto">{showInfo ? '▲' : '▼'}</span>
        </button>
        {showInfo && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {Object.entries(SITE_INFO).map(([k, v]) => (
              <div key={k} className="bg-gray-800/50 rounded-xl p-3">
                <div className="text-gray-500 text-xs uppercase mb-1">{k}</div>
                <div className="text-white font-mono text-xs break-all select-all">{v}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search directories..."
          className="bg-charcoal border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-rose-gold"
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES_FILTER.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${filter === c ? 'bg-rose-gold text-white' : 'bg-charcoal text-gray-400 border border-white/10 hover:text-rose-gold'}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <button onClick={openAll} className="bg-rose-gold text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">
            🚀 Open All ({filtered.length})
          </button>
          <button onClick={markAllSubmitted} className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">
            ✓ Mark All Done
          </button>
          <button onClick={resetAll} className="bg-gray-700 text-white px-4 py-2 rounded-xl text-sm hover:opacity-90 transition">
            Reset
          </button>
        </div>
      </div>

      {/* Directory List */}
      <div className="space-y-3">
        {filtered.map(dir => {
          const st = getStatus(dir.name);
          const cfg = STATUS_CONFIG[st];
          return (
            <div key={dir.name} className={`${cfg.bg} border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-3`}>
              {/* Left */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cfg.dot}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-white text-sm">{dir.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-400">{dir.category}</span>
                    <span className="text-xs text-gray-500">DA {dir.da}</span>
                    {!dir.free && <span className="text-xs px-2 py-0.5 bg-yellow-900/40 text-yellow-400 rounded-full">Paid</span>}
                  </div>
                  <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{dir.instructions}</p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</span>
                <button onClick={() => openDirectory(dir)}
                  className="bg-rose-gold/20 text-rose-gold border border-rose-gold/30 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-rose-gold hover:text-white transition">
                  Open →
                </button>
                <select
                  value={st}
                  onChange={e => setStatus(dir.name, e.target.value)}
                  className="bg-gray-800 border border-white/10 text-gray-300 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-rose-gold">
                  {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-gray-600 text-xs mt-8">Progress is saved locally in your browser. Click "Open →" to go directly to each submission form.</p>
    </div>
  );
}
