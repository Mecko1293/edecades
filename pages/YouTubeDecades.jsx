import { useState, useEffect } from "react";

const API_KEY = 'AIzaSyCP18vlyXOmSW3zxinLP5dTulfEhobyMjI';

const DECADE_QUERIES = [
  { decade: '1920s', query: '1920s jazz flappers roaring twenties history', color: '#c9a96e' },
  { decade: '1930s', query: '1930s Great Depression swing music history', color: '#8b7355' },
  { decade: '1940s', query: '1940s WWII big band music history', color: '#6b8e6b' },
  { decade: '1950s', query: '1950s rock and roll Elvis history nostalgia', color: '#e87b6b' },
  { decade: '1960s', query: '1960s Beatles Motown civil rights history', color: '#9b6bb5' },
  { decade: '1970s', query: '1970s disco funk hip hop history nostalgia', color: '#d4813a' },
  { decade: '1980s', query: '1980s pop culture MTV arcade games nostalgia', color: '#e040fb' },
  { decade: '1990s', query: '1990s grunge hip hop nostalgia culture', color: '#00bcd4' },
  { decade: '2000s', query: '2000s Y2K pop culture nostalgia', color: '#4fc3f7' },
  { decade: '2010s', query: '2010s social media culture nostalgia history', color: '#81c784' },
];

export default function YouTubeDecades() {
  const [videosByDecade, setVideosByDecade] = useState({});
  const [selectedDecade, setSelectedDecade] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllDecades();
  }, []);

  async function loadAllDecades() {
    try {
      setLoading(true);
      setError(null);
      const results = {};
      for (const { decade, query } of DECADE_QUERIES) {
        try {
          const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=relevance&maxResults=4&key=${API_KEY}`;
          const res = await fetch(url);
          const data = await res.json();
          if (data.items) {
            results[decade] = data.items.map(item => ({
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description ? item.snippet.description.substring(0, 160) : '',
              thumbnail: (item.snippet.thumbnails.high || item.snippet.thumbnails.medium || item.snippet.thumbnails.default).url,
              channel: item.snippet.channelTitle,
              url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              embed: `https://www.youtube.com/embed/${item.id.videoId}`,
            }));
          } else {
            results[decade] = [];
          }
        } catch (err) {
          results[decade] = [];
        }
      }
      setVideosByDecade(results);
    } catch (err) {
      setError('Could not load videos: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  const decadesToShow = selectedDecade === 'All'
    ? DECADE_QUERIES
    : DECADE_QUERIES.filter(d => d.decade === selectedDecade);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1f2e', color: '#f0ece4', fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #333d4d, #1a1f2e)', padding: '40px 20px', textAlign: 'center', borderBottom: '2px solid #d4956e' }}>
        <div style={{ fontSize: '42px' }}>📺</div>
        <h1 style={{ fontSize: '2rem', color: '#d4956e', margin: '8px 0', letterSpacing: '2px' }}>eDecades Video Archive</h1>
        <p style={{ color: '#aaa', margin: 0 }}>Decade-tagged YouTube content — history, culture & nostalgia</p>
      </div>

      {/* Decade Filter Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '24px 20px', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        {['All', ...DECADE_QUERIES.map(d => d.decade)].map(d => (
          <button
            key={d}
            onClick={() => setSelectedDecade(d)}
            style={{
              padding: '7px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              background: selectedDecade === d ? '#d4956e' : '#2a3040',
              color: selectedDecade === d ? '#fff' : '#bbb',
              fontWeight: 'bold', fontSize: '0.85rem', transition: 'all 0.2s',
            }}
          >{d}</button>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px 40px' }}>

        {error && (
          <div style={{ background: '#3a1a1a', border: '1px solid #e87b6b', borderRadius: '8px', padding: '16px', color: '#e87b6b', textAlign: 'center', marginBottom: '24px' }}>
            ⚠️ {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#d4956e' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎬</div>
            <p style={{ fontSize: '1.1rem', margin: 0 }}>Loading videos from all 10 decades...</p>
          </div>
        ) : (
          decadesToShow.map(({ decade, color }) => {
            const vids = videosByDecade[decade] || [];
            if (vids.length === 0) return null;
            return (
              <div key={decade} style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '4px', height: '28px', background: color, borderRadius: '2px' }} />
                  <h2 style={{ margin: 0, color: color, fontSize: '1.4rem', letterSpacing: '1px' }}>{decade}</h2>
                  <span style={{ color: '#555', fontSize: '0.85rem' }}>{vids.length} videos</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                  {vids.map(video => (
                    <div
                      key={video.id}
                      onClick={() => setActiveVideo({ ...video, decade, color })}
                      style={{ background: '#252b3b', borderRadius: '10px', overflow: 'hidden', border: '1px solid #333', cursor: 'pointer' }}
                    >
                      <div style={{ position: 'relative' }}>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          style={{ width: '100%', height: '158px', objectFit: 'cover', display: 'block' }}
                          onError={e => { e.target.style.background = '#333'; e.target.style.height = '158px'; }}
                        />
                        <div style={{ position: 'absolute', top: '8px', left: '8px', background: color, color: '#fff', padding: '3px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 'bold' }}>
                          {decade}
                        </div>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: '46px', height: '46px', background: 'rgba(255,0,0,0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#fff' }}>▶</div>
                        </div>
                      </div>
                      <div style={{ padding: '12px' }}>
                        <p style={{ margin: '0 0 6px', fontSize: '0.88rem', color: '#f0ece4', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {video.title}
                        </p>
                        <p style={{ margin: '0 0 8px', fontSize: '0.77rem', color: '#777', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {video.description}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.73rem', color: '#555' }}>📺 {video.channel ? video.channel.substring(0, 24) : ''}</span>
                          <a href={video.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{ fontSize: '0.73rem', color: '#d4956e', textDecoration: 'none' }}>Watch →</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}
        >
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: '820px', background: '#1a1f2e', borderRadius: '12px', overflow: 'hidden', border: `2px solid ${activeVideo.color || '#d4956e'}` }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`${activeVideo.embed}?autoplay=1`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <div style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: '0 0 4px', color: '#f0ece4', fontSize: '0.95rem', fontWeight: 'bold' }}>{activeVideo.title}</p>
                <span style={{ color: activeVideo.color || '#d4956e', fontSize: '0.8rem', fontWeight: 'bold' }}>{activeVideo.decade}</span>
              </div>
              <button onClick={() => setActiveVideo(null)} style={{ background: 'transparent', border: '1px solid #555', color: '#aaa', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer' }}>
                ✕ Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
