import base44 from "../base44-sdk/index.js";

const SPOTIFY_CLIENT_ID = Deno.env.get("SPOTIFY_CLIENT_ID") || "68548dcd35434b0babfbe6f804b078a0";
const SPOTIFY_CLIENT_SECRET = Deno.env.get("SPOTIFY_CLIENT_SECRET") || "989115821ca7463a94deda0807243415";
const TMDB_API_KEY = Deno.env.get("TMDB_API_KEY") || "";
const YOUTUBE_API_KEY = Deno.env.get("YOUTUBE_API_KEY") || "";

async function getSpotifyToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=client_credentials&client_id=${SPOTIFY_CLIENT_ID}&client_secret=${SPOTIFY_CLIENT_SECRET}`,
  });
  const data = await res.json();
  return data.access_token;
}

function getDecadeFromYear(year: number): string {
  if (!year) return "Unknown";
  const decade = Math.floor(year / 10) * 10;
  return `${decade}s`;
}

async function searchSpotify(query: string, token: string) {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album&limit=6`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();

  const tracks = (data.tracks?.items || []).map((t: any) => ({
    type: "music",
    title: t.name,
    artist: t.artists?.map((a: any) => a.name).join(", "),
    album: t.album?.name,
    year: t.album?.release_date?.substring(0, 4),
    decade: getDecadeFromYear(parseInt(t.album?.release_date?.substring(0, 4))),
    image: t.album?.images?.[0]?.url,
    preview_url: t.preview_url,
    spotify_url: t.external_urls?.spotify,
    id: t.id,
  }));

  const artists = (data.artists?.items || []).slice(0, 3).map((a: any) => ({
    type: "artist",
    title: a.name,
    genres: a.genres?.slice(0, 3).join(", "),
    image: a.images?.[0]?.url,
    spotify_url: a.external_urls?.spotify,
    followers: a.followers?.total,
    id: a.id,
  }));

  return { tracks, artists };
}

async function searchTMDB(query: string) {
  if (!TMDB_API_KEY) return { movies: [], shows: [] };

  const [moviesRes, showsRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&limit=6`),
    fetch(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&limit=6`),
  ]);

  const moviesData = await moviesRes.json();
  const showsData = await showsRes.json();

  const movies = (moviesData.results || []).slice(0, 5).map((m: any) => ({
    type: "movie",
    title: m.title,
    year: m.release_date?.substring(0, 4),
    decade: getDecadeFromYear(parseInt(m.release_date?.substring(0, 4))),
    image: m.poster_path ? `https://image.tmdb.org/t/p/w300${m.poster_path}` : null,
    overview: m.overview?.substring(0, 150) + "...",
    rating: m.vote_average?.toFixed(1),
    tmdb_id: m.id,
  }));

  const shows = (showsData.results || []).slice(0, 5).map((s: any) => ({
    type: "tv",
    title: s.name,
    year: s.first_air_date?.substring(0, 4),
    decade: getDecadeFromYear(parseInt(s.first_air_date?.substring(0, 4))),
    image: s.poster_path ? `https://image.tmdb.org/t/p/w300${s.poster_path}` : null,
    overview: s.overview?.substring(0, 150) + "...",
    rating: s.vote_average?.toFixed(1),
    tmdb_id: s.id,
  }));

  return { movies, shows };
}

async function searchYouTube(query: string) {
  if (!YOUTUBE_API_KEY) return { videos: [] };

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query + " trailer OR official")}&type=video&maxResults=4&key=${YOUTUBE_API_KEY}`
  );
  const data = await res.json();

  const videos = (data.items || []).map((v: any) => ({
    type: "video",
    title: v.snippet?.title,
    channel: v.snippet?.channelTitle,
    thumbnail: v.snippet?.thumbnails?.medium?.url,
    youtube_id: v.id?.videoId,
    youtube_url: `https://www.youtube.com/watch?v=${v.id?.videoId}`,
    published: v.snippet?.publishedAt?.substring(0, 4),
  }));

  return { videos };
}

export default async function handler(req: Request) {
  const { query, type } = await req.json();

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const spotifyToken = await getSpotifyToken();

    // Run all searches in parallel
    const [spotifyResults, tmdbResults, youtubeResults] = await Promise.all([
      searchSpotify(query, spotifyToken),
      searchTMDB(query),
      searchYouTube(query),
    ]);

    const results = {
      query,
      music: spotifyResults.tracks,
      artists: spotifyResults.artists,
      movies: tmdbResults.movies,
      shows: tmdbResults.shows,
      trailers: youtubeResults.videos,
      total: (spotifyResults.tracks.length + tmdbResults.movies.length + tmdbResults.shows.length + youtubeResults.videos.length),
    };

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
