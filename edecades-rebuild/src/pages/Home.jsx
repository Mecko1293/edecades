import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// ── Per-decade data matching original Base44 build ────────────────────────────
const DECADES = [
  { id:'1920s', label:'1920s', tagline:'The Roaring Twenties',         bg:'#252018', accent:'#d4956e',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/3aac4ecbe_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/2cfb60a04_generated_image.png'],
    filter:'sepia(0.5) contrast(1.1) brightness(0.9)' },
  { id:'1930s', label:'1930s', tagline:'The Golden Age of Hollywood',  bg:'#1e2220', accent:'#b8a88a',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/2f50fddef_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/b121ce670_generated_image.png'],
    filter:'grayscale(0.6) sepia(0.4) contrast(1.15) brightness(0.85)' },
  { id:'1940s', label:'1940s', tagline:'War Years & Victory',          bg:'#1a1e28', accent:'#7a9abf',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/79a85bf2d_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/94a79d24b_generated_image.png'],
    filter:'sepia(0.3) contrast(1.2) brightness(0.88) saturate(0.8)' },
  { id:'1950s', label:'1950s', tagline:'Rock & Roll Is Born',          bg:'#221c20', accent:'#d4788a',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/8d2a43235_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/d13514cc1_generated_image.png'],
    filter:'saturate(1.2) contrast(1.05) brightness(1.0) sepia(0.15)' },
  { id:'1960s', label:'1960s', tagline:'Peace, Love & Revolution',     bg:'#20201a', accent:'#c4956e',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/689802bb9_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/126ab7fa2_generated_image.png'],
    filter:'saturate(1.3) contrast(1.0) brightness(1.05) hue-rotate(5deg)' },
  { id:'1970s', label:'1970s', tagline:'Funk, Disco & Soul',           bg:'#201c14', accent:'#c4784f',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/cde45a114_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/2b86ec236_generated_image.png'],
    filter:'sepia(0.25) saturate(1.4) contrast(1.05) brightness(0.95)' },
  { id:'1980s', label:'1980s', tagline:'Neon, Power & Pop',            bg:'#1e1a22', accent:'#b87ac4',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/35ce5c484_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/8ca5dd118_generated_image.png'],
    filter:'saturate(1.5) contrast(1.1) brightness(1.05) hue-rotate(10deg)' },
  { id:'1990s', label:'1990s', tagline:'Grunge, Hip-Hop & the Web',    bg:'#1a2018', accent:'#7aaa8a',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/f675ad260_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/17bd7bc0f_generated_image.png'],
    filter:'saturate(0.85) contrast(1.1) brightness(0.95) sepia(0.1)' },
  { id:'2000s', label:'2000s', tagline:'Y2K & the Digital Age',        bg:'#181e24', accent:'#7aaac4',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/fca9d848e_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/03ff95e80_generated_image.png'],
    filter:'saturate(1.1) contrast(1.05) brightness(1.1)' },
  { id:'2010s', label:'2010s', tagline:'Social Media & Streaming',     bg:'#201820', accent:'#c47aa4',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/4566400bf_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/cef79f5a8_generated_image.png'],
    filter:'saturate(1.2) contrast(1.0) brightness(1.05)' },
  { id:'2020s', label:'2020s', tagline:'Pandemic, AI & Renewal',       bg:'#181820', accent:'#8a8ac4',
    images:['https://media.base44.com/images/public/69c207112c5856fdf7bb496b/f675ad260_generated_image.png','https://media.base44.com/images/public/69c207112c5856fdf7bb496b/03ff95e80_generated_image.png'],
    filter:'saturate(1.1) contrast(1.05) brightness(1.05)' },
];

// ── SVG icons for feature cards ───────────────────────────────────────────────
const FEATURE_ICONS = {
  '/categories': <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  '/music':      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
  '/shorts':     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  '/trivia':     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  '/onthisday':  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  '/sports':     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  '/timecapsule':<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  '/search':     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" /></svg>,
  '/presidents': <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg>,
  '/chat':       <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>,
  '/stats':      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
};

const FEATURES = [
  { to:'/categories',  title:'Everything About Every Decade', desc:'Fashion, Food, Art, Tech, Homes & Culture — all 13 decades' },
  { to:'/music',       title:'Music by Decade',               desc:'Artist photos, album covers, and clickable songs from Jazz to today' },
  { to:'/shorts',      title:'Decade Shorts',                 desc:'Decade-accurate clips organized by era — tap to watch on YouTube' },
  { to:'/trivia',      title:'Decade Trivia',                 desc:'Test your knowledge across history, music, film and culture' },
  { to:'/onthisday',   title:'On This Day',                   desc:'Pivotal moments in history with photos that click to enlarge' },
  { to:'/sports',      title:'Sports MVPs',                   desc:'Real athlete photos — the greatest players from every era' },
  { to:'/presidents',  title:'Presidents by Decade',          desc:'Every US commander-in-chief from 1900 to today — click for full bio' },
  { to:'/chat',        title:'Ask a Historical Figure',       desc:'AI conversations with MLK, Elvis, Einstein, Obama & more' },
  { to:'/stats',       title:'Decade Stats',                  desc:'Economics, wages, inflation, tech & culture — every era at a glance' },
  { to:'/timecapsule', title:'Time Capsule',                  desc:'Write a letter to the future — your moment in history' },
  { to:'/search',      title:'Universal Search',              desc:'Search songs, movies, TV shows, history & more in one place' },
];

// ── Decade Card — per-decade bg + accent colors matching Base44 original ──────
function EraCard({ d }) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState([false, false]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % d.images.length), 4000 + Math.random() * 1500);
    return () => clearInterval(t);
  }, [d.images.length]);

  const markLoaded = (i) => setLoaded(prev => { const n = [...prev]; n[i] = true; return n; });

  return (
    <Link
      to={`/decade/${d.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: d.bg,
        borderRadius: 16,
        overflow: 'hidden',
        border: `2px solid ${hovered ? d.accent : 'rgba(255,255,255,0.08)'}`,
        display: 'block',
        textDecoration: 'none',
        transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 8px 32px ${d.accent}44` : 'none',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 130, overflow: 'hidden', background: d.bg }}>
        {d.images.map((src, i) => (
          <img
            key={i} src={src} alt={d.label}
            onLoad={() => markLoaded(i)}
            onError={e => { e.target.style.display = 'none'; }}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover',
              filter: d.filter,
              opacity: i === idx ? 1 : 0,
              transition: 'opacity 1.2s ease',
            }}
          />
        ))}
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />
        {/* Label overlay */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 12px', textAlign: 'center' }}>
          <div style={{ color: '#fff', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: 15, letterSpacing: '0.02em' }}>{d.label}</div>
          <div style={{ color: d.accent, fontSize: 10, marginTop: 2, opacity: hovered ? 1 : 0, transition: 'opacity 0.2s' }}>{d.tagline}</div>
        </div>
      </div>
      {/* Accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${d.accent}, transparent)` }} />
    </Link>
  );
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#1a1e2e', fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(180deg, #0f1117 0%, #1a1e2e 100%)',
        padding: '96px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle radial glow */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, backgroundImage: 'radial-gradient(circle at 20% 50%, #d4956e 0%, transparent 50%), radial-gradient(circle at 80% 20%, #d4956e 0%, transparent 40%)' }} />

        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Logo SVG + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 24 }}>
            <svg style={{ width: 52, height: 52, color: '#d4956e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1 }}>
              e<span style={{ color: '#d4956e' }}>Decades</span>
            </h1>
          </div>

          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: '#d1d5db', fontStyle: 'italic', marginBottom: 8 }}>
            Every Decade. Every Story.
          </p>
          <p style={{ color: '#9ca3af', fontSize: 16, maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Travel through time — explore fashion, food, music, culture, and history from the 1900s to today.
          </p>

          {/* CTA Buttons — SVG icons only, no emoji */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
            <Link to="/decades" style={{ background: '#d4956e', color: '#fff', fontWeight: 700, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', fontSize: 15, boxShadow: '0 4px 20px rgba(212,149,110,0.35)', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Explore Decades →
            </Link>
            <Link to="/shorts" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', fontWeight: 700, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', fontSize: 15, border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg style={{ width: 18, height: 18 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Watch Shorts
            </Link>
            <Link to="/trivia" style={{ border: '1px solid rgba(212,149,110,0.5)', color: '#d4956e', fontWeight: 700, padding: '14px 28px', borderRadius: 12, textDecoration: 'none', fontSize: 15, background: 'transparent' }}>
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* ── Choose Your Era ───────────────────────────────────────────────────── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 8 }}>Choose Your Era</h2>
        <p style={{ color: '#9ca3af', textAlign: 'center', marginBottom: 40, fontSize: 15 }}>Click any decade to dive in</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
          {DECADES.map(d => <EraCard key={d.id} d={d} />)}
        </div>
      </section>

      {/* ── Feature Cards ─────────────────────────────────────────────────────── */}
      <section style={{ background: 'rgba(255,255,255,0.02)', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 40 }}>
            Everything eDecades
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {FEATURES.map(f => (
              <FeatureCard key={f.to} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ────────────────────────────────────────────────────────── */}
      <section style={{ textAlign: 'center', padding: '64px 24px', background: 'linear-gradient(180deg, #1a1e2e 0%, #0f1117 100%)' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 12 }}>
          Your story is part of history too.
        </h2>
        <p style={{ color: '#9ca3af', fontSize: 15, marginBottom: 28 }}>Leave your mark — add a time capsule or ask a historical figure anything.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link to="/timecapsule" style={{ background: '#d4956e', color: '#fff', fontWeight: 700, padding: '13px 26px', borderRadius: 12, textDecoration: 'none', fontSize: 14 }}>
            Write a Time Capsule
          </Link>
          <Link to="/chat" style={{ border: '1px solid rgba(212,149,110,0.5)', color: '#d4956e', fontWeight: 700, padding: '13px 26px', borderRadius: 12, textDecoration: 'none', fontSize: 14, background: 'transparent' }}>
            Talk to a Historical Figure
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ to, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(212,149,110,0.08)' : '#1f2937',
        border: `1px solid ${hovered ? 'rgba(212,149,110,0.5)' : '#374151'}`,
        borderRadius: 14,
        padding: '20px 18px',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-3px)' : 'none',
      }}
    >
      <div style={{ color: '#d4956e' }}>{FEATURE_ICONS[to]}</div>
      <div style={{ color: '#f3f4f6', fontWeight: 700, fontSize: 14, lineHeight: 1.4, fontFamily: "'Playfair Display', Georgia, serif" }}>{title}</div>
      <div style={{ color: '#9ca3af', fontSize: 12, lineHeight: 1.6 }}>{desc}</div>
    </Link>
  );
}
