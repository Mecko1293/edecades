// SYNTH POP COMPONENT — COMPLETE REPLACEMENT
// Paste this entire component into eDecades to replace SynthPopPlaylist

function SynthPopPlaylist() {
  const tracks = [
    { title: "Don't You Want Me", artist: "The Human League", id: "uPudE8nDog0" },
    { title: "It's A Sin", artist: "Pet Shop Boys", id: "dRHetRTOD1Q" },
    { title: "Blue Monday", artist: "New Order", id: "FYH8DsS3jnk" },
    { title: "Just Can't Get Enough", artist: "Depeche Mode", id: "Lyd1EOVWBTE" },
    { title: "Take On Me", artist: "a-ha", id: "djV11Xbc914" },
    { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", id: "PIb6AZdTr-A" },
    { title: "Sweet Dreams", artist: "Eurythmics", id: "qeMFqkcPYcg" },
    { title: "Tainted Love", artist: "Soft Cell", id: "XZVpR3Pk-r8" },
  ];

  const [activeTrack, setActiveTrack] = useState(null);
  const [failed, setFailed] = useState({});

  return (
    <div style={{ background: "#111827", borderRadius: 16, padding: "24px", border: "1px solid #374151" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span style={{ fontSize: 32 }}>🎹</span>
        <div>
          <h3 style={{ color: "#d4956e", fontWeight: 900, fontSize: 20, margin: 0 }}>80s Synth Pop</h3>
          <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>The defining sound of the 1980s</p>
        </div>
        <a href="https://www.youtube.com/results?search_query=80s+synth+pop+hits" target="_blank" rel="noopener noreferrer"
          style={{ marginLeft: "auto", background: "#FF0000", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 800, textDecoration: "none" }}>
          ▶ Full Playlist on YouTube
        </a>
      </div>

      {/* Active player */}
      {activeTrack && !failed[activeTrack.id] && (
        <div style={{ marginBottom: 16, borderRadius: 10, overflow: "hidden" }}>
          <iframe
            key={activeTrack.id}
            src={`https://www.youtube.com/embed/${activeTrack.id}?autoplay=1&rel=0`}
            title={activeTrack.title}
            frameBorder="0"
            allowFullScreen
            allow="autoplay"
            onError={() => setFailed(p => ({ ...p, [activeTrack.id]: true }))}
            style={{ width: "100%", aspectRatio: "16/9", display: "block" }}
          />
        </div>
      )}

      {/* Track list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {tracks.map((track) => (
          <div key={track.id}
            onClick={() => setActiveTrack(activeTrack?.id === track.id ? null : track)}
            style={{
              background: activeTrack?.id === track.id ? "#1f2937" : "#0f172a",
              border: `1px solid ${activeTrack?.id === track.id ? "#d4956e" : "#1f2937"}`,
              borderRadius: 10, padding: "12px 16px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer", gap: 10
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>{activeTrack?.id === track.id ? "⏸" : "▶"}</span>
              <div>
                <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: 14 }}>{track.title}</div>
                <div style={{ color: "#9ca3af", fontSize: 12 }}>{track.artist}</div>
              </div>
            </div>
            {failed[track.id] && (
              <a href={`https://www.youtube.com/watch?v=${track.id}`} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{ background: "#FF000022", border: "1px solid #FF000044", color: "#ff6b6b", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>
                Watch on YouTube
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
