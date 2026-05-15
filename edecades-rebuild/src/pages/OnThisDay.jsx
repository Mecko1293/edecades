/**
 * On This Day — restored to exact Base44 amber/lightbox style
 * - Deep near-black bg (#0f1117) with amber accent (#d97706)
 * - Full amber gradient hero header
 * - Click-to-expand amber-bordered lightbox modal
 * - Category + decade filter pills (amber active state)
 * - Featured badge, person photo thumbnail, source attribution
 * - Fetches from backend with static fallback
 */
import { useState, useEffect } from 'react';
import { ON_THIS_DAY } from '../data/onthisday';

const AMBER = '#d97706';
const BG    = '#0f1117';
const CARD  = '#1f2937';
const CARD2 = '#111827';

const CATEGORIES = ['All','History','Technology','Culture','Science','Music','Sports','Politics','Film & TV','Pop Culture'];
const CAT_ICONS  = {
  History:'🏛️', Technology:'⚙️', Culture:'🎭', Science:'🔬',
  Music:'🎵', Sports:'🏆', Politics:'🗳️', 'Film & TV':'🎬', 'Pop Culture':'✨',
};
const DECADES = ['All','1900s','1910s','1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ event, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!event) return null;
  const photo = event.photo_url || event.image;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
        zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, cursor: 'zoom-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 800, width: '100%', background: CARD,
          borderRadius: 20, overflow: 'hidden',
          boxShadow: `0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px ${AMBER}33`,
          cursor: 'default',
        }}
      >
        {/* Photo */}
        <div style={{ position: 'relative', background: CARD2 }}>
          {photo && (
            <img
              src={photo} alt={event.title}
              style={{ width: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          )}
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 12, right: 12,
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(0,0,0,0.65)', color: '#fff',
              border: `1px solid rgba(255,255,255,0.2)`, cursor: 'pointer',
              fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1,
            }}
          >×</button>
          {event.is_featured && (
            <div style={{
              position: 'absolute', top: 12, left: 12,
              background: AMBER, color: '#000', borderRadius: 99,
              padding: '4px 12px', fontSize: 11, fontWeight: 800,
            }}>★ Featured</div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '24px 28px' }}>
          {/* Person photo row */}
          {event.person_photo && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
              background: 'rgba(255,255,255,0.04)', borderRadius: 12,
              padding: '12px 16px', marginBottom: 18,
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <img
                src={event.person_photo} alt={event.person_name}
                style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover', objectPosition: 'top', flexShrink: 0 }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div>
                <p style={{ color: '#6b7280', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2, margin: '0 0 2px' }}>Key Figure</p>
                <p style={{ color: AMBER, fontWeight: 700, fontSize: 14, margin: 0 }}>{event.person_name}</p>
              </div>
            </div>
          )}

          {/* Date + decade */}
          <div style={{ color: AMBER, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
            {event.date_label || (event.year ? `${event.year}` : '')}
            {event.decade ? ` · ${event.decade}` : ''}
          </div>

          <h2 style={{
            color: '#f3f4f6', fontSize: 22, fontWeight: 900,
            margin: '0 0 12px', lineHeight: 1.3,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>{event.title}</h2>

          <p style={{ color: '#9ca3af', lineHeight: 1.75, margin: 0, fontSize: 15 }}>{event.description}</p>

          {/* Location */}
          {event.location && (
            <a
              href={event.mapUrl || `https://www.google.com/maps?q=${encodeURIComponent(event.location)}`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b7280', fontSize: 12, marginTop: 14, textDecoration: 'none' }}
            >
              <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span style={{ textDecoration: 'underline' }}>{event.location}</span>
            </a>
          )}

          {/* Source */}
          {event.source && (
            <p style={{ color: '#4b5563', fontSize: 11, marginTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12, margin: '14px 0 0' }}>
              Source: {event.source}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Event Card ────────────────────────────────────────────────────────────────
function EventCard({ event, onClick }) {
  const [hovered, setHovered] = useState(false);
  const photo = event.photo_url || event.image;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: CARD, borderRadius: 16, overflow: 'hidden',
        border: `2px solid ${hovered ? AMBER : '#374151'}`,
        cursor: 'zoom-in',
        transition: 'transform 0.2s, border-color 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Photo */}
      <div style={{ height: 200, overflow: 'hidden', position: 'relative', background: CARD2, flexShrink: 0 }}>
        {photo && (
          <img
            src={photo} alt={event.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
              transition: 'transform 0.4s',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            onError={e => { e.target.style.display = 'none'; }}
          />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,24,39,0.7) 0%, transparent 60%)' }} />

        {/* Category badge */}
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <span style={{
            background: 'rgba(0,0,0,0.6)', color: AMBER,
            borderRadius: 99, padding: '3px 10px', fontSize: 11, fontWeight: 700,
            backdropFilter: 'blur(4px)',
          }}>{CAT_ICONS[event.category] || '🌐'} {event.category}</span>
        </div>

        {/* Featured badge */}
        {event.is_featured && (
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: AMBER, color: '#000', borderRadius: 99,
            padding: '3px 10px', fontSize: 11, fontWeight: 800,
          }}>★ Featured</div>
        )}

        {/* Person photo thumbnail */}
        {event.person_photo && (
          <div style={{ position: 'absolute', bottom: 10, right: 10 }}>
            <img
              src={event.person_photo} alt={event.person_name}
              style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover', objectPosition: 'top', border: `2px solid ${AMBER}` }}
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ color: AMBER, fontSize: 12, fontWeight: 700 }}>
            {event.date_label || event.year || ''}
          </span>
          <span style={{ background: CARD2, color: '#9ca3af', borderRadius: 99, padding: '2px 10px', fontSize: 11 }}>
            {event.decade}
          </span>
        </div>
        <h3 style={{
          color: '#f3f4f6', fontWeight: 800, fontSize: 16,
          margin: '0 0 8px', lineHeight: 1.4,
          fontFamily: "'Playfair Display', Georgia, serif",
        }}>{event.title}</h3>
        <p style={{
          color: '#9ca3af', fontSize: 13, lineHeight: 1.6, margin: 0, flex: 1,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{event.description}</p>
        <div style={{ marginTop: 12, color: '#4b5563', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          Click to expand
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function OnThisDay() {
  const [catFilter,    setCatFilter]    = useState('All');
  const [decadeFilter, setDecadeFilter] = useState('All');
  const [lightbox,     setLightbox]     = useState(null);
  const [events,       setEvents]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [featuredIdx,  setFeaturedIdx]  = useState(0);

  // Fetch from backend, fall back to static
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`https://edecades.com/api/onthisday`, { method: 'GET' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.events) && json.events.length > 0) {
            setEvents(json.events); setLoading(false); return;
          }
        }
      } catch {}
      setEvents(ON_THIS_DAY);
      setLoading(false);
    };
    load();
  }, []);

  // Auto-rotate featured banner
  const featured = events.filter(e => e.is_featured);
  useEffect(() => {
    if (featured.length < 2) return;
    const t = setInterval(() => setFeaturedIdx(i => (i + 1) % featured.length), 5500);
    return () => clearInterval(t);
  }, [featured.length]);

  const filtered = events.filter(e => {
    if (catFilter    !== 'All' && e.category !== catFilter)    return false;
    if (decadeFilter !== 'All' && e.decade   !== decadeFilter) return false;
    return true;
  });

  return (
    <div style={{ background: BG, minHeight: '100vh', color: '#f3f4f6', fontFamily: "'Inter', sans-serif" }}>

      {/* Lightbox */}
      {lightbox && <Lightbox event={lightbox} onClose={() => setLightbox(null)} />}

      {/* ── Amber Hero Header ─────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1c1008, #0f1117)',
        borderBottom: `2px solid ${AMBER}33`,
        padding: '56px 24px',
        textAlign: 'center',
      }}>
        {/* Calendar SVG icon — no emoji */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <svg style={{ width: 52, height: 52, color: AMBER }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 style={{ color: AMBER, fontSize: 34, fontWeight: 900, margin: '0 0 10px', fontFamily: "'Playfair Display', Georgia, serif" }}>
          On This Day in History
        </h1>
        <p style={{ color: '#9ca3af', fontSize: 16, margin: 0 }}>
          Real events, real photos — across every decade
        </p>
      </div>

      {/* ── Featured Banner (auto-rotating) ──────────────────────────────────── */}
      {featured.length > 0 && !loading && (
        <div style={{ maxWidth: 1100, margin: '32px auto 0', padding: '0 16px' }}>
          <div
            onClick={() => setLightbox(featured[featuredIdx])}
            style={{
              background: `linear-gradient(135deg, #1c1008, ${CARD})`,
              borderRadius: 20, border: `2px solid ${AMBER}55`,
              overflow: 'hidden', cursor: 'pointer', display: 'flex',
              flexDirection: 'row', minHeight: 200,
              boxShadow: `0 8px 40px ${AMBER}22`,
            }}
          >
            {(featured[featuredIdx].photo_url || featured[featuredIdx].image) && (
              <div style={{ width: 280, flexShrink: 0, overflow: 'hidden', display: 'none' }}
                className="hidden sm:block">
                <img
                  src={featured[featuredIdx].photo_url || featured[featuredIdx].image}
                  alt={featured[featuredIdx].title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
            <div style={{ padding: '28px 32px', flex: 1 }}>
              <div style={{ display: 'inline-block', background: AMBER, color: '#000', borderRadius: 99, padding: '3px 12px', fontSize: 11, fontWeight: 800, marginBottom: 14 }}>
                ★ Featured Story
              </div>
              <div style={{ color: AMBER, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>
                {featured[featuredIdx].date_label || featured[featuredIdx].year}
                {featured[featuredIdx].decade ? ` · ${featured[featuredIdx].decade}` : ''}
              </div>
              <h2 style={{ color: '#f3f4f6', fontSize: 22, fontWeight: 900, margin: '0 0 12px', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.3 }}>
                {featured[featuredIdx].title}
              </h2>
              <p style={{ color: '#9ca3af', fontSize: 14, lineHeight: 1.7, margin: 0,
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {featured[featuredIdx].description}
              </p>
              {featured.length > 1 && (
                <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
                  {featured.map((_, i) => (
                    <div key={i} onClick={e => { e.stopPropagation(); setFeaturedIdx(i); }} style={{
                      width: i === featuredIdx ? 20 : 6, height: 6, borderRadius: 99,
                      background: i === featuredIdx ? AMBER : '#374151', cursor: 'pointer',
                      transition: 'all 0.3s',
                    }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Category Filter Pills ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '28px auto 0', padding: '0 16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 12 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{
              padding: '7px 18px', borderRadius: 99, fontWeight: 700, fontSize: 13, cursor: 'pointer',
              border: catFilter === c ? `2px solid ${AMBER}` : '2px solid #374151',
              background: catFilter === c ? `${AMBER}22` : CARD,
              color: catFilter === c ? AMBER : '#9ca3af',
              transition: 'all 0.15s',
            }}>
              {CAT_ICONS[c] || '🌐'} {c}
            </button>
          ))}
        </div>

        {/* Decade filter */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 8 }}>
          {DECADES.map(d => (
            <button key={d} onClick={() => setDecadeFilter(d)} style={{
              padding: '5px 14px', borderRadius: 99, fontWeight: 600, fontSize: 12, cursor: 'pointer',
              border: decadeFilter === d ? `2px solid ${AMBER}88` : '1px solid #374151',
              background: decadeFilter === d ? `${AMBER}15` : 'transparent',
              color: decadeFilter === d ? AMBER : '#6b7280',
              transition: 'all 0.15s',
            }}>{d}</button>
          ))}
        </div>

        {/* Count */}
        {!loading && (
          <p style={{ color: '#6b7280', fontSize: 12, textAlign: 'center', marginTop: 8 }}>
            Showing {filtered.length} {filtered.length === 1 ? 'event' : 'events'}
          </p>
        )}
      </div>

      {/* ── Event Grid ───────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 72px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {loading ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60 }}>
            <div style={{ width: 36, height: 36, border: `3px solid ${AMBER}33`, borderTopColor: AMBER, borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
            <p style={{ color: '#6b7280' }}>Loading history...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: 60, color: '#6b7280' }}>
            <svg style={{ width: 48, height: 48, color: `${AMBER}44`, margin: '0 auto 16px', display: 'block' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            No events found for those filters. Try a different category or decade.
          </div>
        ) : filtered.map(event => (
          <EventCard key={event.id || event.title} event={event} onClick={() => setLightbox(event)} />
        ))}
      </div>

      {/* Spin animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
