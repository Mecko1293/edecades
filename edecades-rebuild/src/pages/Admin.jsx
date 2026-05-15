/**
 * Admin.jsx — eDecades Command Center
 * Theme: Charcoal (#1a2332 dark, #333d4d mid) + Rose Gold (#d4956e)
 * Matches the site's Navbar, cards, and typography exactly.
 */
import { useState, useEffect } from 'react';

const ADMIN_PASSWORD = 'KingXcel2026';
const STORAGE_KEY    = 'edecades_admin_auth_v2';

// ── Colour palette (mirrors Tailwind config) ─────────────────────────────────
const C = {
  bg:         '#1a2332',   // charcoal-dark (body bg)
  card:       '#232f42',   // slightly lighter card surface
  card2:      '#2a3850',   // hover / secondary card
  border:     '#3d5166',   // subtle dividers
  roseGold:   '#d4956e',
  roseLight:  '#e8b89a',
  textPrimary:'#f5f0eb',
  textMuted:  '#94a3b8',
  danger:     '#ef4444',
  success:    '#22c55e',
  warn:       '#f59e0b',
};

// ── Shared SVG icon ───────────────────────────────────────────────────────────
const Icon = ({ d, size = 16, color = 'currentColor', fill = false }) => (
  <svg width={size} height={size} fill={fill ? color : 'none'} stroke={fill ? 'none' : color}
    viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={d} />
  </svg>
);

const ICONS = {
  dashboard:   'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  products:    'M13 10V3L4 14h7v7l9-11h-7z',
  errors:      'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  directories: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
  social:      'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
  ops:         'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  automations: 'M13 10V3L4 14h7v7l9-11h-7z',
  bizinfo:     'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  photos:      'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
  youtube:     'M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  seo:         'M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z',
  copy:        'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
  link:        'M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14',
  check:       'M5 13l4 4L19 7',
  star:        'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  clock:       'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  mail:        'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  globe:       'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
  refresh:     'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
  user:        'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  bolt:        'M13 10V3L4 14h7v7l9-11h-7z',
  chart:       'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  building:    'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  warning:     'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  pill:        'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  cog:         'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  academic:    'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
  document:    'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  music:       'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
  game:        'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
  lock:        'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
  eye:         'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
};

const TABS = [
  { id:'dashboard',   label:'Dashboard',   iconKey:'dashboard'   },
  { id:'products',    label:'Products',    iconKey:'products'    },
  { id:'errors',      label:'Errors',      iconKey:'errors'      },
  { id:'directories', label:'Directories', iconKey:'directories' },
  { id:'social',      label:'Social',      iconKey:'social'      },
  { id:'ops',         label:'Ops Tasks',   iconKey:'ops'         },
  { id:'automations', label:'Automations', iconKey:'automations' },
  { id:'bizinfo',     label:'Biz Info',    iconKey:'bizinfo'     },
  { id:'photos',      label:'Photos',      iconKey:'photos'      },
  { id:'youtube',     label:'YouTube',     iconKey:'youtube'     },
  { id:'seo',         label:'SEO',         iconKey:'seo'         },
];

const PRODUCTS = [
  { name:'eDecades',      iconKey:'clock',    accent:'#d4956e', status:'live',        url:'https://edecades.com',                               category:'Social Network', desc:'Decade-themed social network. Live at eDecades.com.' },
  { name:'CourseGek',     iconKey:'academic', accent:'#a78bfa', status:'live',        url:'https://course-gek-23543b27.base44.app',             category:'EdTech',         desc:'Homework help marketplace. Students pay for answers.' },
  { name:'ResumeCrafted', iconKey:'document', accent:'#60a5fa', status:'live',        url:'https://resume-dashing-craft-pro.base44.app',        category:'Career Tools',   desc:'AI-powered resume builder. ATS-optimized.' },
  { name:'WheelMath',     iconKey:'chart',    accent:'#fbbf24', status:'coming_soon', url:'https://pie-math-quest.base44.app',                  category:'EdTech Game',    desc:'Interactive math puzzles for students.' },
  { name:'GameForge',     iconKey:'game',     accent:'#818cf8', status:'live',        url:'https://app.base44.com/apps/69cefe45fb6ca50b89904e8e',category:'Game Dev',       desc:'AI game design studio. Concept to full GDD.' },
  { name:'CheapMedz',    iconKey:'pill',     accent:'#f87171', status:'coming_soon', url:'#',                                                  category:'Healthcare',     desc:'Medication price comparison tool. Affiliate model.' },
  { name:'NexusCraft',    iconKey:'cog',      accent:'#34d399', status:'coming_soon', url:'#',                                                  category:'Dev Tools',      desc:'Next-gen development toolkit. Coming soon.' },
  { name:'SETH',          iconKey:'bolt',     accent:'#c084fc', status:'coming_soon', url:'#',                                                  category:'AI Agent',       desc:'Specialized AI assistant platform. Coming soon.' },
];

const QUICK_LINKS = [
  { label:'eDecades Live',         url:'https://edecades.com',                              iconKey:'globe'      },
  { label:'GitHub Repo',           url:'https://github.com/Mecko1293/edecades',             iconKey:'link'       },
  { label:'Vercel Dashboard',      url:'https://vercel.com/mecko1293s-projects/edecades',   iconKey:'bolt'       },
  { label:'Stripe Dashboard',      url:'https://dashboard.stripe.com',                      iconKey:'chart'      },
  { label:'Pinterest Analytics',   url:'https://analytics.pinterest.com',                   iconKey:'star'       },
  { label:'Google Search Console', url:'https://search.google.com/search-console',          iconKey:'seo'        },
  { label:'Google Business',       url:'https://business.google.com',                       iconKey:'building'   },
  { label:'Google Analytics',      url:'https://analytics.google.com',                      iconKey:'chart'      },
  { label:'LinkedIn Page',         url:'https://linkedin.com/company/edecades',             iconKey:'social'     },
  { label:'Discord Server',        url:'https://discord.com',                               iconKey:'social'     },
  { label:'TikTok Studio',         url:'https://www.tiktok.com/tiktokstudio',               iconKey:'music'      },
  { label:'GoDaddy DNS',           url:'https://dcc.godaddy.com/manage/dns',                iconKey:'globe'      },
];

const AUTOMATIONS = [
  { name:'Daily Social Auto-Post',  schedule:'9 AM, 3 PM, 9 PM Central', platforms:'LinkedIn, Slack, Discord',       status:'active', iconKey:'social'   },
  { name:'Affiliate Reply Monitor', schedule:'8 AM daily',               platforms:'Outlook → edecades@outlook.com', status:'active', iconKey:'mail'     },
  { name:'Daily Task Email',        schedule:'8 AM Central daily',       platforms:'anthonykittles@outlook.com',     status:'active', iconKey:'mail'     },
  { name:'Affiliate Follow-up',     schedule:'Every 7 days',             platforms:'GoodRx, Blink, RxSpark, Amazon', status:'active', iconKey:'refresh'  },
  { name:'DNS Monitor',             schedule:'Every 30 min',             platforms:'eDecades.com → Vercel',          status:'active', iconKey:'globe'    },
];

const DIRECTORIES = [
  { name:'Google Business Profile',  url:'https://business.google.com',       da:92, status:'submitted' },
  { name:'Bing Places',              url:'https://www.bingplaces.com',         da:88, status:'pending'   },
  { name:'Yelp',                     url:'https://biz.yelp.com',               da:93, status:'submitted' },
  { name:'Manta',                    url:'https://www.manta.com',              da:71, status:'pending'   },
  { name:'Crunchbase',               url:'https://www.crunchbase.com',         da:91, status:'submitted' },
  { name:'AngelList',                url:'https://angel.co',                   da:85, status:'pending'   },
  { name:'Product Hunt',             url:'https://www.producthunt.com',        da:91, status:'submitted' },
  { name:'AlternativeTo',            url:'https://alternativeto.net',          da:78, status:'pending'   },
  { name:'SaaS Hub',                 url:'https://www.saashub.com',            da:62, status:'pending'   },
  { name:'G2',                       url:'https://www.g2.com',                 da:89, status:'submitted' },
];

const REDDIT_COMMUNITIES = [
  { name:'r/nostalgia',      url:'https://reddit.com/r/nostalgia',      members:'1.2M' },
  { name:'r/90s',            url:'https://reddit.com/r/90s',            members:'380K' },
  { name:'r/80s',            url:'https://reddit.com/r/80s',            members:'290K' },
  { name:'r/history',        url:'https://reddit.com/r/history',        members:'15M'  },
  { name:'r/OldSchoolCool',  url:'https://reddit.com/r/OldSchoolCool',  members:'4M'   },
  { name:'r/vintageads',     url:'https://reddit.com/r/vintageads',     members:'198K' },
  { name:'r/historyporn',    url:'https://reddit.com/r/historyporn',    members:'8M'   },
  { name:'r/maybemaybemaybe',url:'https://reddit.com/r/maybemaybemaybe',members:'3.5M' },
];

const SOCIAL_SCHEDULE = [
  { time:'9:00 AM CT',  type:'Morning Throwback',    content:'Decade memory post + historical image',           platforms:'LinkedIn, Discord, Slack' },
  { time:'3:00 PM CT',  type:'Afternoon Highlight',  content:'Notable figure or event deep-dive',              platforms:'LinkedIn, Discord, Slack' },
  { time:'9:00 PM CT',  type:'Evening Nostalgia',    content:'Pop culture moment + community question',        platforms:'LinkedIn, Discord, Slack' },
];

const PHOTO_SECTIONS = [
  { section:'Home Hero',     count:3,  notes:'Rotating decade montage — 1920s–2020s'   },
  { section:'Decade Cards',  count:13, notes:'One featured image per decade'           },
  { section:'On This Day',   count:36, notes:'Event thumbnails, amber lightbox style'  },
  { section:'Sports MVPs',   count:25, notes:'Athlete portraits via Wikimedia/Pixabay' },
  { section:'Presidents',    count:13, notes:'Era-grouped presidential portraits'      },
  { section:'Music Artists', count:40, notes:'Genre-sorted album covers & portraits'   },
  { section:'Shorts Covers', count:40, notes:'YouTube thumbnail previews'              },
];

const SEO_CHECKLIST = [
  { item:'Sitemap submitted to Google',           status:'done'    },
  { item:'robots.txt configured',                 status:'done'    },
  { item:'Canonical tags on all pages',           status:'pending' },
  { item:'Open Graph meta tags',                  status:'done'    },
  { item:'Twitter Card meta tags',                status:'pending' },
  { item:'Structured data (JSON-LD)',             status:'pending' },
  { item:'Page speed < 3s (desktop)',             status:'done'    },
  { item:'Mobile responsive audit',              status:'done'    },
  { item:'Alt text on all images',               status:'pending' },
  { item:'Google Analytics connected',           status:'done'    },
  { item:'Search Console verified',              status:'done'    },
  { item:'Pinterest domain verified',            status:'done'    },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, iconKey, accent }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: `${accent || C.roseGold}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon d={ICONS[iconKey]} size={22} color={accent || C.roseGold} />
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.textPrimary, fontFamily: '"Playfair Display", Georgia, serif' }}>{value}</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  };
  return (
    <button onClick={copy} title="Copy" style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px 4px', color: copied ? C.success : C.textMuted }}>
      <Icon d={copied ? ICONS.check : ICONS.copy} size={14} color={copied ? C.success : C.textMuted} />
    </button>
  );
}

function SectionTitle({ children, iconKey }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
      {iconKey && <Icon d={ICONS[iconKey]} size={18} color={C.roseGold} />}
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.roseGold, fontFamily: '"Playfair Display", Georgia, serif', letterSpacing: '0.03em', textTransform: 'uppercase' }}>{children}</h2>
    </div>
  );
}

function Badge({ label, color }) {
  const colors = { live: C.success, active: C.success, done: C.success, submitted: C.roseGold, pending: C.warn, coming_soon: C.textMuted };
  const bg = colors[color || label] || C.textMuted;
  return (
    <span style={{ background: `${bg}22`, color: bg, border: `1px solid ${bg}55`, borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
      {label.replace('_', ' ')}
    </span>
  );
}

function LinkRow({ href, label, iconKey, extra }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: C.card2, border: `1px solid ${C.border}`, textDecoration: 'none', color: C.textPrimary, transition: 'border-color 0.2s', marginBottom: 6 }}
      onMouseEnter={e => e.currentTarget.style.borderColor = C.roseGold}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
      <Icon d={ICONS[iconKey]} size={16} color={C.roseGold} />
      <span style={{ flex: 1, fontSize: 13 }}>{label}</span>
      {extra && <span style={{ fontSize: 11, color: C.textMuted }}>{extra}</span>}
      <Icon d={ICONS.link} size={13} color={C.textMuted} />
    </a>
  );
}

// ── Tab panels ────────────────────────────────────────────────────────────────

function TabDashboard() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        <StatCard label="Products" value="8" iconKey="bolt" />
        <StatCard label="Live Apps" value="4" iconKey="check" accent={C.success} />
        <StatCard label="Directories" value="10+" iconKey="directories" />
        <StatCard label="Automations" value="5" iconKey="automations" accent="#a78bfa" />
        <StatCard label="Daily Posts" value="3/day" iconKey="social" />
        <StatCard label="API Keys" value="4 Active" iconKey="cog" accent={C.warn} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* Quick Links */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
          <SectionTitle iconKey="link">Quick Links</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {QUICK_LINKS.map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20, background: C.card2, border: `1px solid ${C.border}`, textDecoration: 'none', color: C.textPrimary, fontSize: 12, transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.roseGold; e.currentTarget.style.color = C.roseGold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textPrimary; }}>
                <Icon d={ICONS[l.iconKey]} size={13} color={C.roseGold} />
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Reddit Communities */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
          <SectionTitle iconKey="social">Reddit Communities</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {REDDIT_COMMUNITIES.map(r => (
              <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', borderRadius: 8, background: C.card2, border: `1px solid ${C.border}`, textDecoration: 'none', color: C.textPrimary, fontSize: 13, transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.roseGold}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                <span>{r.name}</span>
                <span style={{ fontSize: 11, color: C.textMuted }}>{r.members}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabProducts() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
      {PRODUCTS.map(p => (
        <div key={p.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon d={ICONS[p.iconKey]} size={20} color={p.accent} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, fontFamily: '"Playfair Display", Georgia, serif' }}>{p.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{p.category}</div>
            </div>
            <Badge label={p.status} />
          </div>
          <p style={{ margin: 0, fontSize: 13, color: C.textMuted, lineHeight: 1.5 }}>{p.desc}</p>
          {p.url !== '#' && (
            <a href={p.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: C.roseGold, fontSize: 12, textDecoration: 'none' }}>
              <Icon d={ICONS.link} size={12} color={C.roseGold} /> Visit App
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

function TabErrors() {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch from entity API
    fetch('/api/entities/SiteError/list', { method: 'GET' })
      .then(r => r.json())
      .then(d => { setErrors(d?.records || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <SectionTitle iconKey="errors">Site Errors</SectionTitle>
      {loading ? (
        <div style={{ color: C.textMuted, textAlign: 'center', padding: 40 }}>Loading errors…</div>
      ) : errors.length === 0 ? (
        <div style={{ background: `${C.success}15`, border: `1px solid ${C.success}40`, borderRadius: 12, padding: 24, textAlign: 'center', color: C.success }}>
          <Icon d={ICONS.check} size={32} color={C.success} />
          <div style={{ marginTop: 8, fontSize: 15, fontWeight: 600 }}>No active errors reported</div>
          <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>All systems operational</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {errors.map((err, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '14px 18px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <Icon d={ICONS.warning} size={18} color={err.severity === 'high' ? C.danger : C.warn} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>{err.error_type} — <span style={{ fontWeight: 400, color: C.textMuted }}>{err.page}</span></div>
                <div style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>{err.description}</div>
                {err.fix_notes && <div style={{ fontSize: 12, color: C.roseGold, marginTop: 4 }}>Fix: {err.fix_notes}</div>}
              </div>
              <Badge label={err.status || 'open'} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TabDirectories() {
  const [bulkOpened, setBulkOpened] = useState(false);
  const openAll = () => {
    DIRECTORIES.filter(d => d.status === 'pending').forEach(d => window.open(d.url, '_blank'));
    setBulkOpened(true);
  };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <SectionTitle iconKey="directories">Directory Listings</SectionTitle>
        <button onClick={openAll} style={{ display: 'flex', alignItems: 'center', gap: 7, background: C.roseGold, color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>
          <Icon d={ICONS.link} size={14} color="#fff" />
          {bulkOpened ? 'Opened!' : 'Open All Pending'}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {DIRECTORIES.map(d => (
          <div key={d.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon d={ICONS.globe} size={16} color={C.roseGold} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>{d.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>DA: {d.da}</div>
            </div>
            <Badge label={d.status} />
            <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ color: C.textMuted }}>
              <Icon d={ICONS.link} size={14} color={C.roseGold} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function TabSocial() {
  return (
    <div>
      <SectionTitle iconKey="social">Daily Posting Schedule</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14, marginBottom: 28 }}>
        {SOCIAL_SCHEDULE.map(s => (
          <div key={s.time} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Icon d={ICONS.clock} size={16} color={C.roseGold} />
              <span style={{ fontSize: 14, fontWeight: 700, color: C.roseGold, fontFamily: '"Playfair Display", Georgia, serif' }}>{s.time}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 4 }}>{s.type}</div>
            <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.5, marginBottom: 8 }}>{s.content}</div>
            <div style={{ fontSize: 11, color: C.roseGold }}>{s.platforms}</div>
          </div>
        ))}
      </div>

      <SectionTitle iconKey="mail">Affiliate Outreach Status</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
        {[
          { name:'GoodRx',                contact:'ada@goodrx.com',             status:'sent' },
          { name:'Blink Health',           contact:'partnerships@blinkhealth.com',status:'sent' },
          { name:'Amazon Pharmacy',        contact:'affiliate@amazon.com',       status:'sent' },
          { name:'RxSpark',                contact:'partnerships@rxspark.com',   status:'sent' },
          { name:'Mark Cuban Cost Plus',   contact:'n/a — no affiliate program', status:'n/a'  },
        ].map(a => (
          <div key={a.name} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary, marginBottom: 4 }}>{a.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 8 }}>{a.contact}</div>
            <Badge label={a.status} color={a.status === 'sent' ? 'submitted' : 'pending'} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabOps() {
  const tasks = [
    { task:'Submit to 5 new directories', freq:'Weekly',  priority:'high',   status:'pending', cat:'SEO'         },
    { task:'Post Reddit nostalgia content', freq:'Daily',  priority:'medium', status:'active',  cat:'Growth'      },
    { task:'Monitor Affiliate replies',    freq:'Daily',  priority:'high',   status:'active',  cat:'Revenue'     },
    { task:'Update On This Day events',    freq:'Monthly',priority:'medium', status:'pending', cat:'Content'     },
    { task:'Refresh decade images',        freq:'Monthly',priority:'low',    status:'pending', cat:'Content'     },
    { task:'Review Google Analytics',      freq:'Weekly', priority:'medium', status:'pending', cat:'Analytics'   },
    { task:'TikTok video upload',          freq:'Daily',  priority:'high',   status:'active',  cat:'Social'      },
    { task:'Pinterest pin 3 new images',   freq:'Daily',  priority:'medium', status:'active',  cat:'Social'      },
    { task:'Stripe account review',        freq:'Monthly',priority:'high',   status:'pending', cat:'Finance'     },
    { task:'Update sitemap',               freq:'Monthly',priority:'medium', status:'pending', cat:'SEO'         },
  ];
  const priorityColor = { high: C.danger, medium: C.warn, low: C.textMuted };
  return (
    <div>
      <SectionTitle iconKey="ops">Operational Tasks</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {tasks.map((t, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: priorityColor[t.priority], flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 14, color: C.textPrimary }}>{t.task}</span>
              <span style={{ fontSize: 11, color: C.textMuted, marginLeft: 8 }}>{t.cat}</span>
            </div>
            <span style={{ fontSize: 11, color: C.textMuted }}>{t.freq}</span>
            <Badge label={t.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabAutomations() {
  return (
    <div>
      <SectionTitle iconKey="automations">Active Automations</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {AUTOMATIONS.map((a, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${C.roseGold}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon d={ICONS[a.iconKey]} size={20} color={C.roseGold} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>{a.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{a.schedule} · {a.platforms}</div>
            </div>
            <Badge label={a.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TabBizInfo() {
  const INFO = {
    company:   'King Xcel Innovations',
    owner:     'Anthony D. Kittles Sr.',
    title:     'CEO',
    email:     'anthonykittles@outlook.com',
    biz_email: 'edecades@outlook.com',
    address:   '205 Seva Ct, Irving, Texas 75061',
    stripe:    'acct_1T4XQARonfiMrfdu',
    github:    'Mecko1293/edecades',
    vercel:    'edecades-o1zj.vercel.app',
    pinterest: '549770222914',
    yt_channel:'UCfk_Hh-GE2HJXO8q9s3Pfmw',
    discord:   'https://discord.com/api/webhooks/1490134369434730729/...',
  };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
      {Object.entries(INFO).map(([k, v]) => (
        <div key={k} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ minWidth: 110, fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.replace(/_/g, ' ')}</div>
          <div style={{ flex: 1, fontSize: 13, color: C.textPrimary, wordBreak: 'break-all' }}>{v}</div>
          <CopyBtn text={v} />
        </div>
      ))}
    </div>
  );
}

function TabPhotos() {
  return (
    <div>
      <SectionTitle iconKey="photos">Photo Coverage</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
        {PHOTO_SECTIONS.map(p => (
          <div key={p.section} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Icon d={ICONS.photos} size={16} color={C.roseGold} />
              <span style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>{p.section}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.roseGold, fontFamily: '"Playfair Display", Georgia, serif', marginBottom: 4 }}>{p.count}</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{p.notes}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18 }}>
        <SectionTitle iconKey="refresh">Photo Sources</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Pixabay API', 'Wikimedia Commons', 'Library of Congress', 'National Archives', 'Public Domain Review', 'Unsplash'].map(s => (
            <span key={s} style={{ background: C.card2, border: `1px solid ${C.border}`, borderRadius: 20, padding: '5px 12px', fontSize: 12, color: C.textMuted }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabYouTube() {
  return (
    <div>
      <SectionTitle iconKey="youtube">YouTube Configuration</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label:'Channel ID',   value:'UCfk_Hh-GE2HJXO8q9s3Pfmw' },
          { label:'API Key',      value:'YOUTUBE_API_KEY (env var)' },
          { label:'Restricted To','value':'edecades.com, www.edecades.com' },
          { label:'Videos Route', value:'/videos' },
          { label:'Shorts Route', value:'/shorts' },
          { label:'API Version',  value:'YouTube Data API v3' },
        ].map(r => (
          <div key={r.label} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', display: 'flex', gap: 10 }}>
            <div style={{ minWidth: 100, fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.label}</div>
            <div style={{ flex: 1, fontSize: 13, color: C.textPrimary, wordBreak: 'break-all' }}>{r.value}</div>
            <CopyBtn text={r.value} />
          </div>
        ))}
      </div>
      <SectionTitle iconKey="link">YouTube Links</SectionTitle>
      <LinkRow href="https://studio.youtube.com"            label="YouTube Studio"             iconKey="youtube" />
      <LinkRow href="https://console.cloud.google.com"     label="Google Cloud Console (API)"  iconKey="cog"     />
      <LinkRow href="https://edecades.com/videos"          label="Live Videos Page"            iconKey="globe"   />
      <LinkRow href="https://edecades.com/shorts"          label="Live Shorts Page"            iconKey="globe"   />
    </div>
  );
}

function TabSEO() {
  return (
    <div>
      <SectionTitle iconKey="seo">SEO Checklist</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {SEO_CHECKLIST.map((s, i) => (
          <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: s.status === 'done' ? `${C.success}22` : `${C.warn}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon d={s.status === 'done' ? ICONS.check : ICONS.clock} size={13} color={s.status === 'done' ? C.success : C.warn} />
            </div>
            <span style={{ flex: 1, fontSize: 13, color: C.textPrimary }}>{s.item}</span>
            <Badge label={s.status} />
          </div>
        ))}
      </div>
      <SectionTitle iconKey="link">SEO Tools</SectionTitle>
      <LinkRow href="https://search.google.com/search-console" label="Google Search Console" iconKey="seo"      />
      <LinkRow href="https://analytics.google.com"             label="Google Analytics"       iconKey="chart"    />
      <LinkRow href="https://analytics.pinterest.com"          label="Pinterest Analytics"    iconKey="star"     />
      <LinkRow href="https://ahrefs.com"                       label="Ahrefs"                 iconKey="globe"    />
      <LinkRow href="https://moz.com/link-explorer"            label="Moz Link Explorer"      iconKey="link"     />
    </div>
  );
}

const TAB_PANELS = {
  dashboard:   TabDashboard,
  products:    TabProducts,
  errors:      TabErrors,
  directories: TabDirectories,
  social:      TabSocial,
  ops:         TabOps,
  automations: TabAutomations,
  bizinfo:     TabBizInfo,
  photos:      TabPhotos,
  youtube:     TabYouTube,
  seo:         TabSEO,
};

// ── Login screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onAuth }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [show, setShow] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onAuth(); setErr(false); }
    else { setErr(true); setPw(''); }
  };

  return (
    <div style={{ minHeight: '100vh', background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 380, textAlign: 'center' }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: `${C.roseGold}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Icon d={ICONS.lock} size={28} color={C.roseGold} />
        </div>
        <h1 style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 700, color: C.textPrimary, fontFamily: '"Playfair Display", Georgia, serif' }}>Admin Access</h1>
        <p style={{ margin: '0 0 28px', fontSize: 13, color: C.textMuted }}>eDecades Command Center</p>
        <form onSubmit={submit}>
          <div style={{ position: 'relative', marginBottom: 16 }}>
            <input
              type={show ? 'text' : 'password'}
              value={pw}
              onChange={e => { setPw(e.target.value); setErr(false); }}
              placeholder="Enter admin password"
              autoFocus
              style={{ width: '100%', boxSizing: 'border-box', padding: '12px 44px 12px 14px', borderRadius: 10, border: `1px solid ${err ? C.danger : C.border}`, background: C.card2, color: C.textPrimary, fontSize: 14, outline: 'none' }}
            />
            <button type="button" onClick={() => setShow(!show)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: C.textMuted }}>
              <Icon d={ICONS.eye} size={16} color={C.textMuted} />
            </button>
          </div>
          {err && <p style={{ margin: '0 0 12px', fontSize: 13, color: C.danger }}>Incorrect password. Try again.</p>}
          <button type="submit" style={{ width: '100%', padding: '12px', borderRadius: 10, border: 'none', background: C.roseGold, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Main Admin component ──────────────────────────────────────────────────────
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleAuth = () => { sessionStorage.setItem(STORAGE_KEY, '1'); setAuthed(true); };
  const handleLogout = () => { sessionStorage.removeItem(STORAGE_KEY); setAuthed(false); };

  if (!authed) return <LoginScreen onAuth={handleAuth} />;

  const ActivePanel = TAB_PANELS[activeTab] || TabDashboard;

  return (
    <div style={{ minHeight: '100vh', background: C.bg, color: C.textPrimary }}>

      {/* ── Sticky header ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 40, background: C.card, borderBottom: `1px solid ${C.border}`, padding: '0 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', height: 60, gap: 16 }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.roseGold}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon d={ICONS.cog} size={18} color={C.roseGold} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, fontFamily: '"Playfair Display", Georgia, serif', lineHeight: 1 }}>Command Center</div>
              <div style={{ fontSize: 10, color: C.textMuted }}>King Xcel Innovations</div>
            </div>
          </div>

          {/* Scrollable tabs */}
          <div style={{ flex: 1, overflowX: 'auto', display: 'flex', gap: 4, scrollbarWidth: 'none' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: 13, fontWeight: activeTab === t.id ? 600 : 400, transition: 'all 0.15s',
                  background: activeTab === t.id ? C.roseGold : 'transparent',
                  color: activeTab === t.id ? '#fff' : C.textMuted }}>
                <Icon d={ICONS[t.iconKey]} size={14} color={activeTab === t.id ? '#fff' : C.textMuted} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Logout */}
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, border: `1px solid ${C.border}`, background: 'transparent', color: C.textMuted, fontSize: 12, cursor: 'pointer', flexShrink: 0 }}>
            <Icon d={ICONS.lock} size={13} color={C.textMuted} />
            Logout
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px' }}>
        <ActivePanel />
      </div>
    </div>
  );
}
