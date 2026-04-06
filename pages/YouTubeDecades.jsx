import { useState, useEffect } from "react";

const API_KEY = 'AIzaSyCP18vlyXOmSW3zxinLP5dTulfEhobyMjI';

const DECADES = ['All', '1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s'];

const DECADE_QUERIES = {
  '1920s': '1920s jazz flappers roaring twenties history',
  '1930s': '1930s Great Depression swing music history',
  '1940s': '1940s WWII big band music history',
  '1950s': '1950s rock and roll Elvis history nostalgia',
  '1960s': '1960s Beatles Motown civil rights history',
  '1970s': '1970s disco funk hip hop history nostalgia',
  '1980s': '1980s pop culture MTV arcade games nostalgia',
  '1990s': '1990s grunge hip hop nostalgia culture',
  '2000s': '2000s Y2K pop culture nostalgia',
  '2010s': '2010s social media culture nostalgia history',
};

const DECADE_COLORS = {
  '1920s': '#c9a96e', '1930s': '#8b7355', '1940s': '#6b8e6b',
  '1950s': '#e87b6b', '1960s': '#9b6bb5', '1970s': '#d4813a',
  '1980s': '#e040fb', '1990s': '#00bcd4', '2000s': '#4fc3f7',
  '2010s': '#81c784', 'Various': '#d4956e',
};

async function searchYouTube(query, maxResults = 6) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=relevance&maxResults=${maxResults}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.items) return [];
  return data.items.map(item => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description?.substring(0, 180),
    thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
    channel: item.snippet.channelTitle,
    published: item.snippet.publishedAt,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    embed: `https://www.youtube.com/embed/${item.id.videoId}`,
  }));
}

export default function YouTubeDecades() {
  const [videosByDecade, setVideosByDecade] = useState({});
  const [channelVideos, setChannelVideos] = useState([]);
  const [selectedDecade, setSelectedDecade] = useState('All');
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null);
  const [tab, setTab] = useState('decades');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllDecades();
    loadChannelVideos();
  }, []);

  const loadAllDecades = async () => {
    try {
      setLoading(true);
      setError(null);
      const results = {};
      // Load one decade at a time to avoid quota issues
      for (const [decade, query] of Object.entries(DECADE_QUERIES)) {
        try {
          const videos = await searchYouTube(query, 4);
          results[decade] = videos;
        } catch (e) {
          console.error(`Failed to load ${decade}:`, e);
        }
      }
      setVideosByDecade(results);
    } catch (e) {
      setError('Failed to load videos. Please check your API key.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadChannelVideos = async () => {
    try {
      const videos = await searchYouTube('eDecades decades nostalgia history culture', 12);
      setChannelVideos(videos);
    } catch (e) {
      console.error('Channel load error:', e);
    }
  };

  const allVideos = Object.entries(videosByDecade).flatMap(([decade, vids]) =>
    vids.map(v => ({ ...v, decade }))
  );

  const filteredVideos = selectedDecade === 'All' ? allVideos : (videosByDecade[selectedDecade] || []).map(v => ({ ...v, decade: selectedDecade }));

  return (
    <div style={{ minHeight: '100vh', background: '#1a1f2e', color: '#f0ece4', fontFamily: "'Georgia', serif" }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #333d4d 0%, #1a1f2e 100%)', padding: '40px 20px', textAlign: 'center', borderBottom: '2px solid #d4956e' }}>
        <div style={{ fontSize: '40px', marginBottom: '8px' }}>📺</div>
        <h1 style={{ fontSize: '2.2rem', color: '#d4956e', margin: '0 0 8px', letterSpacing: '2px' }}>eDecades Video Archive</h1>
        <p style={{ color: '#aaa', margin: 0, fontSize: '1rem' }}>Decade-tagged YouTube content — history, culture & nostalgia through the ages</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', padding: '24px 20px 0' }}>
        {[{ key: 'decades', label: '🎬 Browse by Decade' }, { key: 'channel', label: '📡 eDecades Channel' }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            padding: '10px 24px', borderRadius: '24px', border: 'none', cursor: 'pointer',
            fontFamily: 'Georgia, serif', fontSize: '0.95rem', fontWeight: 'bold',
            background: tab === t.key ? '#d4956e' : '#2a3040',
            color: tab === t.key ? '#fff' : '#aaa', transition: 'all 0.2s',
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>

        {/* Error */}
        {error && (
          <div style={{ background: '#4a1a1a', border: '1px solid #e87b6b', borderRadius: '8px', padding: '16px', marginBottom: '24px', color: '#e87b6b', textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}

        {/* DECADES TAB */}
        {tab === 'decades' && (
          <>
            {/* Decade Filter */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px', justifyContent: 'center' }}>
              {DECADES.map(d => (
                <button key={d} onClick={() => setSelectedDecade(d)} style={{
                  padding: '6px 16px', borderRadius: '20px',
                  border: `2px solid ${selectedDecade === d ? '#d4956e' : '#444'}`,
                  background: selectedDecade === d ? '#d4956e' : 'transparent',
                  color: selectedDecade === d ? '#fff' : '#ccc',
                  cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.2s',
                }}>{d}</button>
              ))}
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '80px', color: '#d4956e' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎬</div>
                <p style={{ fontSize: '1.1rem' }}>Loading decade videos...</p>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Fetching content from all 10 decades</p>
              </div>
            ) : selectedDecade === 'All' ? (
              Object.entries(videosByDecade).map(([decade, vids]) => vids.length > 0 && (
                <div key={decade} style={{ marginBottom: '48px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '4px', height: '28px', background: DECADE_COLORS[decade] || '#d4956e', borderRadius: '2px' }} />
                    <h2 style={{ margin: 0, color: DECADE_COLORS[decade] || '#d4956e', fontSize: '1.4rem', letterSpacing: '1px' }}>{decade}</h2>
                    <span style={{ color: '#666', fontSize: '0.85rem' }}>{vids.length} videos</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                    {vids.map(v => <VideoCard key={v.id} video={{ ...v, decade }} onPlay={() => setActiveVideo({ ...v, decade })} decadeColor={DECADE_COLORS[decade]} />)}
                  </div>
                </div>
              ))
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                {filteredVideos.length > 0 ? filteredVideos.map(v => (
                  <VideoCard key={v.id} video={v} onPlay={() => setActiveVideo(v)} decadeColor={DECADE_COLORS[v.decade]} />
                )) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: '#666' }}>No videos found for {selectedDecade}</div>
                )}
              </div>
            )}
          </>
        )}

        {/* CHANNEL TAB */}
        {tab === 'channel' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <p style={{ color: '#aaa', marginBottom: '12px' }}>Decade-relevant videos curated for eDecades</p>
              <a href="https://www.youtube.com/@AnthonyKittles" target="_blank" rel="noopener noreferrer"
                style={{ color: '#d4956e', textDecoration: 'none', fontWeight: 'bold' }}>▶️ Subscribe on YouTube →</a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
              {channelVideos.map(v => <VideoCard key={v.id} video={v} onPlay={() => setActiveVideo(v)} decadeColor='#d4956e' />)}
            </div>
          </>
        )}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div onClick={() => setActiveVideo(null)} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxWidth: '820px', background: '#1a1f2e',
            borderRadius: '12px', overflow: 'hidden', border: '2px solid #d4956e'
          }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe src={`${activeVideo.embed}?autoplay=1`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen" allowFullScreen />
            </div>
            <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', color: '#f0ece4', fontSize: '1rem' }}>{activeVideo.title}</h3>
                <span style={{ color: '#d4956e', fontSize: '0.85rem', fontWeight: 'bold' }}>{activeVideo.decade}</span>
              </div>
              <button onClick={() => setActiveVideo(null)} style={{
                background: 'transparent', border: '1px solid #555', color: '#aaa',
                padding: '6px 14px', borderRadius: '6px', cursor: 'pointer'
              }}>✕ Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VideoCard({ video, onPlay, decadeColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPlay}
      style={{
        background: '#252b3b', borderRadius: '10px', overflow: 'hidden',
        border: `1px solid ${hovered ? decadeColor || '#d4956e' : '#333'}`,
        cursor: 'pointer', transition: 'all 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div style={{ position: 'relative' }}>
        <img src={video.thumbnail} alt={video.title}
          style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
          onError={e => { e.target.src = 'https://via.placeholder.com/320x180/1a1f2e/d4956e?text=📺'; }} />
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ width: '52px', height: '52px', background: '#ff0000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#fff' }}>▶</div>
          </div>
        )}
        <div style={{
          position: 'absolute', top: '8px', left: '8px',
          background: decadeColor || '#d4956e', color: '#fff',
          padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'
        }}>{video.decade || 'Classic'}</div>
      </div>
      <div style={{ padding: '12px' }}>
        <h3 style={{
          margin: '0 0 6px', fontSize: '0.88rem', color: '#f0ece4', lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{video.title}</h3>
        <p style={{
          margin: '0 0 8px', fontSize: '0.78rem', color: '#888', lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'
        }}>{video.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#666' }}>📺 {video.channel?.substring(0, 22)}</span>
          <a href={video.url} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontSize: '0.75rem', color: '#d4956e', textDecoration: 'none' }}>Watch →</a>
        </div>
      </div>
    </div>
  );
}
