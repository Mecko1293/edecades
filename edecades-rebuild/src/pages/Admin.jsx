import { useState } from 'react';

const ADMIN_PASSWORD = 'KingXcel2026';

const TABS = [
  { id: 'overview',   label: 'Overview',      icon: '📊' },
  { id: 'content',    label: 'Content',        icon: '📝' },
  { id: 'seo',        label: 'SEO',            icon: '🔍' },
  { id: 'social',     label: 'Social Media',   icon: '📱' },
  { id: 'affiliates', label: 'Affiliates',     icon: '🤝' },
  { id: 'directory',  label: 'Directory',      icon: '📋' },
  { id: 'photos',     label: 'Photo Manager',  icon: '🖼️' },
  { id: 'youtube',    label: 'YouTube Config', icon: '▶️' },
  { id: 'analytics',  label: 'Analytics',      icon: '📈' },
  { id: 'settings',   label: 'Settings',       icon: '⚙️' },
];

const SITE_STATS = [
  { label: 'Total Pages', value: '13', sub: 'All routes live' },
  { label: 'Decades', value: '13', sub: '1900s–2020s' },
  { label: 'Trivia Questions', value: '500+', sub: 'Database seeded' },
  { label: 'Sports MVPs', value: '100+', sub: 'All decades' },
];

const AFFILIATES = [
  { name: 'GoodRx',                status: 'Contacted', next: 'Follow up Jun 1' },
  { name: 'Blink Health',          status: 'Pending',   next: 'Follow up Jun 1' },
  { name: 'Mark Cuban Cost Plus',  status: 'Pending',   next: 'Follow up Jun 1' },
  { name: 'Amazon Pharmacy',       status: 'Pending',   next: 'Follow up Jun 1' },
  { name: 'RxSpark',               status: 'Pending',   next: 'Follow up Jun 1' },
];

const DIRECTORIES = [
  { name: 'Google My Business',   status: 'Listed',    da: 100, free: true },
  { name: 'Bing Places',          status: 'Listed',    da: 92,  free: true },
  { name: 'Yelp',                 status: 'Pending',   da: 83,  free: true },
  { name: 'Foursquare',           status: 'Pending',   da: 91,  free: true },
  { name: 'Apple Maps Connect',   status: 'Pending',   da: 96,  free: true },
  { name: 'Yellow Pages',         status: 'Pending',   da: 74,  free: true },
  { name: 'Manta',                status: 'Pending',   da: 56,  free: true },
  { name: 'Hotfrog',              status: 'Pending',   da: 50,  free: true },
  { name: 'Cylex',                status: 'Pending',   da: 48,  free: true },
  { name: 'EZlocal',              status: 'Pending',   da: 45,  free: true },
];

const statusColor = s => ({
  Listed: 'text-green-400', Contacted: 'text-yellow-400', Pending: 'text-gray-400', Live: 'text-green-400'
}[s] || 'text-gray-400');

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [tab, setTab] = useState('overview');

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center bg-charcoal-dark px-4">
      <div className="bg-charcoal rounded-2xl p-8 border border-white/10 w-full max-w-sm text-center">
        <div className="text-4xl mb-4">🔐</div>
        <h1 className="font-retro text-2xl text-white mb-2">Admin Panel</h1>
        <p className="text-gray-400 text-sm mb-6">eDecades · King Xcel Innovations</p>
        <input
          type="password"
          placeholder="Enter admin password"
          value={pw}
          onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (pw === ADMIN_PASSWORD ? setAuthed(true) : setErr('Incorrect password'))}
          className="w-full bg-charcoal-dark border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 mb-3 focus:outline-none focus:border-rose-gold"
        />
        {err && <p className="text-red-400 text-sm mb-3">{err}</p>}
        <button onClick={() => pw === ADMIN_PASSWORD ? setAuthed(true) : setErr('Incorrect password')}
          className="w-full bg-rose-gold hover:bg-rose-gold-light text-white font-semibold py-3 rounded-xl transition-colors">
          Sign In
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 bg-charcoal-dark border-r border-white/10 p-4 shrink-0">
        <div className="font-retro text-rose-gold font-bold text-lg mb-6 px-2">⚙️ Admin</div>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-colors text-left ${
              tab === t.id ? 'bg-rose-gold/20 text-rose-gold' : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}>
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
        <button onClick={() => setAuthed(false)}
          className="mt-auto text-gray-500 hover:text-red-400 text-sm px-3 py-2 text-left transition-colors">
          Sign Out
        </button>
      </aside>

      {/* Mobile tab bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-charcoal-dark border-t border-white/10 flex overflow-x-auto z-50">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex flex-col items-center px-3 py-2 text-xs shrink-0 ${tab === t.id ? 'text-rose-gold' : 'text-gray-500'}`}>
            <span className="text-lg">{t.icon}</span>
            <span className="mt-0.5 whitespace-nowrap">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto pb-24 md:pb-8">

        {tab === 'overview' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {SITE_STATS.map(s => (
                <div key={s.label} className="bg-charcoal rounded-xl p-5 border border-white/10">
                  <div className="font-retro text-2xl text-rose-gold font-bold">{s.value}</div>
                  <div className="text-white text-sm font-medium mt-1">{s.label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-charcoal rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-semibold mb-3">🌐 Site Status</h3>
                {[
                  { k: 'Production URL', v: 'www.edecades.com', ok: true },
                  { k: 'Deployment', v: 'Vercel (auto-deploy)', ok: true },
                  { k: 'GitHub Repo', v: 'Mecko1293/edecades', ok: true },
                  { k: 'Admin Panel', v: '/admin — password protected', ok: true },
                  { k: 'Google Search Console', v: 'Sitemap submitted', ok: true },
                ].map(r => (
                  <div key={r.k} className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-gray-400 text-sm">{r.k}</span>
                    <span className={`text-sm ${r.ok ? 'text-green-400' : 'text-red-400'}`}>{r.v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-charcoal rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-semibold mb-3">🤖 Automation Status</h3>
                {[
                  { k: 'Daily Social Post', v: '9 AM / 3 PM / 9 PM CT', ok: true },
                  { k: 'Affiliate Monitor', v: 'Daily 8 AM CT', ok: true },
                  { k: 'Sitemap Re-ping', v: 'Monthly (1st)', ok: true },
                  { k: 'Affiliate Follow-Up', v: 'Every 7 days', ok: true },
                ].map(r => (
                  <div key={r.k} className="flex justify-between items-center py-1.5 border-b border-white/5">
                    <span className="text-gray-400 text-sm">{r.k}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${r.ok ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>Active</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === 'content' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">Content Manager</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Decades', count: '13', link: '/decades', desc: 'All decade detail pages live' },
                { label: 'Categories', count: '7', link: '/categories', desc: 'Fashion, Food, Beauty, Art, Tech, Homes, Culture' },
                { label: 'Sports MVPs', count: '100+', link: '/sports', desc: 'Database-backed entity' },
                { label: 'Trivia Questions', count: '500+', link: '/trivia', desc: 'Database-backed entity' },
                { label: 'On This Day Events', count: '36+', link: '/onthisday', desc: 'Database-backed entity' },
                { label: 'Time Capsules', count: 'User-generated', link: '/timecapsule', desc: 'Community submissions' },
                { label: 'Presidents', count: '22', link: '/presidents', desc: 'Static data 1900s–2020s' },
                { label: 'Historical Figures', count: '∞', link: '/chat', desc: 'AI-powered chat' },
              ].map(c => (
                <a key={c.label} href={c.link}
                  className="bg-charcoal rounded-xl p-5 border border-white/10 hover:border-rose-gold/40 transition-colors block">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">{c.label}</h3>
                    <span className="font-retro text-rose-gold font-bold">{c.count}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{c.desc}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {tab === 'seo' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">SEO Dashboard</h1>
            <div className="space-y-4">
              {[
                { item: 'Sitemap submitted to Google', status: '✅ Done', note: 'https://www.edecades.com/sitemap.xml' },
                { item: 'Sitemap submitted to Bing', status: '✅ Done', note: 'Via IndexNow protocol' },
                { item: 'robots.txt configured', status: '✅ Done', note: 'Allows all crawlers' },
                { item: 'OG meta tags on all pages', status: '✅ Done', note: 'Title, description, image' },
                { item: 'JSON-LD Organization schema', status: '✅ Done', note: 'In index.html' },
                { item: 'Canonical URLs set', status: '✅ Done', note: 'www.edecades.com' },
                { item: 'Google Search Console property', status: '✅ Done', note: 'www.edecades.com verified' },
                { item: 'Core Web Vitals', status: '⏳ Monitor', note: 'Check in GSC after 28 days' },
                { item: 'Backlinks from directories', status: '🔄 In Progress', note: '2/10 directories listed' },
                { item: 'Alt text on images', status: '🔄 Partial', note: 'Static images covered' },
              ].map(r => (
                <div key={r.item} className="bg-charcoal rounded-xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-white text-sm font-medium">{r.item}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{r.note}</div>
                  </div>
                  <span className="text-sm ml-4 whitespace-nowrap">{r.status}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3 flex-wrap">
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer"
                className="bg-rose-gold text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-gold-light transition-colors">
                Open Search Console ↗
              </a>
              <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener noreferrer"
                className="border border-rose-gold/40 text-rose-gold px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-gold/10 transition-colors">
                Bing Webmaster Tools ↗
              </a>
            </div>
          </div>
        )}

        {tab === 'social' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">Social Media</h1>
            <div className="space-y-4">
              {[
                { platform: 'LinkedIn',     status: 'Auto-posting',  schedule: 'Daily 9 AM / 3 PM / 9 PM CT', icon: '💼', color: 'text-blue-400' },
                { platform: 'Discord',      status: 'Auto-posting',  schedule: 'Daily via webhook',             icon: '🎮', color: 'text-indigo-400' },
                { platform: 'Pinterest',    status: 'Auto-posting',  schedule: 'Daily 9 AM CT',                 icon: '📌', color: 'text-red-400' },
                { platform: 'TikTok',       status: 'Manual',        schedule: 'Post manually from script',     icon: '🎵', color: 'text-pink-400' },
                { platform: 'Instagram',    status: 'Manual',        schedule: 'No free API access',            icon: '📸', color: 'text-purple-400' },
                { platform: 'X (Twitter)',  status: 'Manual',        schedule: 'No free API access',            icon: '✖️', color: 'text-gray-400' },
                { platform: 'Facebook',     status: 'Manual',        schedule: 'No free API access',            icon: '👥', color: 'text-blue-500' },
              ].map(s => (
                <div key={s.platform} className="bg-charcoal rounded-xl p-4 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{s.icon}</span>
                    <div>
                      <div className={`font-semibold ${s.color}`}>{s.platform}</div>
                      <div className="text-gray-500 text-xs">{s.schedule}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${s.status === 'Auto-posting' ? 'bg-green-900/50 text-green-400' : 'bg-gray-800 text-gray-400'}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'affiliates' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">Affiliate Partners</h1>
            <p className="text-gray-400 text-sm mb-6">CheapMedz affiliate outreach — tracked via edecades@outlook.com</p>
            <div className="space-y-3">
              {AFFILIATES.map(a => (
                <div key={a.name} className="bg-charcoal rounded-xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{a.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{a.next}</div>
                  </div>
                  <span className={`text-xs font-medium ${statusColor(a.status)}`}>{a.status}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-charcoal rounded-xl border border-rose-gold/20">
              <p className="text-gray-300 text-sm">📬 Monitor inbox: <span className="text-rose-gold">edecades@outlook.com</span></p>
              <p className="text-gray-500 text-xs mt-1">Auto follow-up every 7 days for unresponsive partners.</p>
            </div>
          </div>
        )}

        {tab === 'directory' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">Directory Listings</h1>
            <div className="space-y-3">
              {DIRECTORIES.map(d => (
                <div key={d.name} className="bg-charcoal rounded-xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-white font-semibold">{d.name}</div>
                    <div className="text-gray-500 text-xs">DA: {d.da} · {d.free ? 'Free' : 'Paid'}</div>
                  </div>
                  <span className={`text-xs font-medium ${statusColor(d.status)}`}>{d.status}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <a href="/directory" className="bg-rose-gold text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-gold-light transition-colors inline-block">
                Submit to Directory →
              </a>
            </div>
          </div>
        )}

        {tab === 'photos' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">Photo Manager</h1>
            <p className="text-gray-400 text-sm mb-6">Decade photos are sourced from Pixabay API and Wikimedia Commons. Images auto-load per decade.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'].map(dec => (
                <div key={dec} className="bg-charcoal rounded-xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">{dec}</h3>
                    <a href={`https://pixabay.com/photos/search/${dec}%20vintage/`} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-rose-gold hover:underline">Browse Pixabay ↗</a>
                  </div>
                  <a href={`https://commons.wikimedia.org/wiki/Category:${dec}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-gray-500 hover:text-rose-gold-light transition-colors">
                    Wikimedia Commons ↗
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'youtube' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">YouTube Configuration</h1>
            <div className="space-y-4">
              <div className="bg-charcoal rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Channel</h3>
                <p className="text-gray-400 text-sm">Channel ID: <span className="text-rose-gold font-mono">UCfk_Hh-GE2HJXO8q9s3Pfmw</span></p>
                <a href="https://www.youtube.com/channel/UCfk_Hh-GE2HJXO8q9s3Pfmw" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-rose-gold hover:underline mt-2 inline-block">Open Channel ↗</a>
              </div>
              <div className="bg-charcoal rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-semibold mb-3">API Key</h3>
                <p className="text-gray-400 text-sm">Stored as environment variable: <span className="text-rose-gold font-mono">YOUTUBE_API_KEY</span></p>
                <p className="text-gray-500 text-xs mt-1">Restricted to edecades.com and www.edecades.com</p>
              </div>
              <div className="bg-charcoal rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Shorts Page</h3>
                <p className="text-gray-400 text-sm">Curated decade video playlists available at <a href="/shorts" className="text-rose-gold hover:underline">/shorts</a></p>
              </div>
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">Analytics</h1>
            <div className="space-y-4">
              <div className="bg-charcoal rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Vercel Web Analytics</h3>
                <p className="text-gray-400 text-sm mb-3">Real-time visitor data powered by Vercel Analytics — enabled via main.jsx.</p>
                <a href="https://vercel.com/mecko1293s-projects/edecades/analytics" target="_blank" rel="noopener noreferrer"
                  className="bg-rose-gold text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-gold-light transition-colors inline-block">
                  Open Vercel Analytics ↗
                </a>
              </div>
              <div className="bg-charcoal rounded-xl p-5 border border-white/10">
                <h3 className="text-white font-semibold mb-3">Google Search Console</h3>
                <p className="text-gray-400 text-sm mb-3">Monitor indexing, clicks, impressions and Core Web Vitals.</p>
                <a href="https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aedecades.com" target="_blank" rel="noopener noreferrer"
                  className="border border-rose-gold/40 text-rose-gold px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-gold/10 transition-colors inline-block">
                  Open Search Console ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {tab === 'settings' && (
          <div>
            <h1 className="font-retro text-3xl text-white mb-6">Settings</h1>
            <div className="space-y-4">
              {[
                { label: 'Site Name', value: 'eDecades' },
                { label: 'Domain', value: 'www.edecades.com' },
                { label: 'Company', value: 'King Xcel Innovations' },
                { label: 'Admin Email', value: 'edecades@outlook.com' },
                { label: 'Deployment', value: 'Vercel — Mecko1293/edecades' },
                { label: 'Theme', value: 'Charcoal #333d4d / Rose Gold #d4956e' },
              ].map(s => (
                <div key={s.label} className="bg-charcoal rounded-xl p-4 border border-white/10 flex justify-between">
                  <span className="text-gray-400 text-sm">{s.label}</span>
                  <span className="text-white text-sm font-medium">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
