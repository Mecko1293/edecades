# eDecades Fixes — April 2026

## Fix 4: Retro TV "Video Unavailable" Error
**Problem:** YouTube embeds fail with "Video Unavailable" when specific video IDs become unavailable.
**Solution:** Use a fallback + error handler on iframes, and provide a "Watch on YouTube" search fallback.

Replace any `<iframe>` YouTube embed pattern with this wrapper:

```jsx
function SafeYouTubeEmbed({ videoId, title, fallbackQuery }) {
  const [failed, setFailed] = useState(false);
  if (!videoId || videoId === "null" || failed) {
    return (
      <div style={{ background: "#111", borderRadius: 8, padding: "24px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 8 }}>📺</div>
        <div style={{ color: "#9ca3af", fontSize: 13, marginBottom: 12 }}>{title || "Video unavailable"}</div>
        <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(fallbackQuery || title || "")}`}
           target="_blank" rel="noopener noreferrer"
           style={{ background: "#FF0000", color: "#fff", padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
          🔍 Search on YouTube
        </a>
      </div>
    );
  }
  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?rel=0`}
      title={title}
      frameBorder="0"
      allowFullScreen
      onError={() => setFailed(true)}
      style={{ width: "100%", aspectRatio: "16/9", borderRadius: 8 }}
    />
  );
}
```

Also add a null-guard wherever YouTube video IDs are rendered:
```jsx
// Before any YouTube embed, check:
const safeId = (id) => (!id || id === "null" || id === "undefined") ? null : id;
```

## Fix 7: "null" in YouTube Video IDs
Wherever you map over video data, add this guard:
```jsx
{videos.filter(v => v.videoId && v.videoId !== "null" && v.videoId !== "undefined").map(v => (
  // render video card
))}
```

## Fix 5: Fashion & Style Photos Not Decade-Appropriate
**Solution:** Replace the fashion photo fetch/display with these curated decade-specific image URLs per decade.

In the Fashion component, use this mapping:
```js
const DECADE_FASHION_PHOTOS = {
  "1920s": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flapper_dress_1920s.jpg/400px-Flapper_dress_1920s.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/1920s_fashion.jpg/400px-1920s_fashion.jpg"
  ],
  "1930s": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/1930s-fashion.jpg/400px-1930s-fashion.jpg"
  ],
  "1940s": [
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400"
  ],
  "1950s": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/1950s_fashion.jpg/400px-1950s_fashion.jpg"
  ],
  // etc.
};
```
Best approach: use the Wikimedia Commons API to fetch actual period photos:
```js
const fetchFashionPhotos = async (decade) => {
  const query = `${decade} fashion clothing style`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json&origin=*&srlimit=5`;
  const res = await fetch(url);
  const data = await res.json();
  // parse image titles from data.query.search
};
```

## Fix 8: Music Genre Names Clickable (Decade Era Highlights)
Add onClick handler and expand panel for each genre name:
```jsx
const [expandedGenre, setExpandedGenre] = useState(null);

// In genre list:
<div
  onClick={() => setExpandedGenre(expandedGenre === genre.name ? null : genre.name)}
  style={{ cursor: "pointer", textDecoration: "underline dotted", color: accentColor }}
>
  {genre.name}
</div>

{expandedGenre === genre.name && (
  <div style={{ background: "#1f2937", borderRadius: 8, padding: "12px", marginTop: 8 }}>
    <p style={{ color: "#9ca3af", fontSize: 13 }}>{genre.description}</p>
    <p style={{ color: "#6b7280", fontSize: 12 }}>Key Artists: {genre.artists?.join(", ")}</p>
  </div>
)}
```

## Fix 9: Decade Top Features — Lateral/Horizontal Layout
Replace `flexDirection: "column"` with horizontal scrollable row:
```jsx
<div style={{
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  overflowX: "auto",
  paddingBottom: 8
}}>
  {features.map((feature, i) => (
    <div key={i} style={{
      background: "#1f2937",
      border: "1px solid #374151",
      borderRadius: 20,
      padding: "8px 16px",
      fontSize: 13,
      color: "#e5e7eb",
      whiteSpace: "nowrap",
      flexShrink: 0
    }}>
      {feature}
    </div>
  ))}
</div>
```

## Fix 10: Decade Snapshot Themes — Make Clickable
```jsx
const [activeTheme, setActiveTheme] = useState(null);

{themes.map((theme, i) => (
  <div
    key={i}
    onClick={() => setActiveTheme(activeTheme === theme.id ? null : theme.id)}
    style={{
      cursor: "pointer",
      border: activeTheme === theme.id ? `2px solid ${accent}` : "2px solid transparent",
      borderRadius: 12,
      transition: "all 0.2s",
      transform: activeTheme === theme.id ? "scale(1.02)" : "scale(1)"
    }}
  >
    {theme.title}
    {activeTheme === theme.id && (
      <div style={{ marginTop: 8, color: "#9ca3af", fontSize: 13 }}>
        {theme.description}
      </div>
    )}
  </div>
))}
```

## Fix 16: Interactive Globe/World Map
Use react-simple-maps or a pure SVG approach. Here's the component to paste into eDecades:

See: edecades_globe_component.md (to be generated)

## Fix 17: Compare Decades Feature
Side-by-side split screen with two decade selectors.
See: edecades_compare_component.md

## Fix 18: Dynamic Photo Grid with Lightbox
Use Wikimedia Commons API + lightbox overlay.
See: edecades_photogrid_component.md
