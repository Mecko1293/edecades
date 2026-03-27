import { useState } from "react";
import { Music, Shuffle, Search, ExternalLink, ShoppingCart, Play, Disc3, Mic2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const DECADES = ["1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];
const GENRES = ["Hip Hop", "R&B", "Pop", "Rock", "Soul", "Jazz", "Country", "Electronic", "Reggae", "Gospel", "Metal", "Funk", "Blues", "Latin"];

const DECADE_GENRE_MAP = {
  "1950s": { term: "rock roll", year: "1950-1959" },
  "1960s": { term: "soul motown", year: "1960-1969" },
  "1970s": { term: "funk soul disco", year: "1970-1979" },
  "1980s": { term: "pop rock", year: "1980-1989" },
  "1990s": { term: "hip hop rb", year: "1990-1999" },
  "2000s": { term: "pop hip hop", year: "2000-2009" },
  "2010s": { term: "pop rb", year: "2010-2019" },
  "2020s": { term: "pop trap", year: "2020-2024" },
};

const GENRE_TERMS = {
  "Hip Hop": "hip hop rap",
  "R&B": "r&b soul",
  "Pop": "pop",
  "Rock": "rock",
  "Soul": "soul",
  "Jazz": "jazz",
  "Country": "country",
  "Electronic": "electronic dance",
  "Reggae": "reggae",
  "Gospel": "gospel",
  "Metal": "metal",
  "Funk": "funk",
  "Blues": "blues",
  "Latin": "latin",
};

const DECADE_COLORS = {
  "1950s": "from-amber-700 to-yellow-600",
  "1960s": "from-purple-700 to-pink-600",
  "1970s": "from-orange-700 to-red-600",
  "1980s": "from-pink-700 to-purple-600",
  "1990s": "from-green-700 to-teal-600",
  "2000s": "from-blue-700 to-cyan-600",
  "2010s": "from-indigo-700 to-blue-600",
  "2020s": "from-rose-700 to-pink-600",
};

export default function MusicRandomizer() {
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("randomizer"); // "randomizer" or "search"

  const fetchSongs = async (term) => {
    setLoading(true);
    setError(null);
    setResults([]);
    setFeatured(null);
    try {
      const encoded = encodeURIComponent(term);
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encoded}&media=music&entity=song&limit=50&country=US`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        // Shuffle results
        const shuffled = data.results.sort(() => Math.random() - 0.5);
        setResults(shuffled.slice(0, 20));
        setFeatured(shuffled[0]);
      } else {
        setError("No songs found. Try a different combination!");
      }
    } catch (e) {
      setError("Couldn't reach the music database. Please try again.");
    }
    setLoading(false);
  };

  const handleRandomize = () => {
    if (!selectedDecade || !selectedGenre) return;
    const genreTerm = GENRE_TERMS[selectedGenre] || selectedGenre.toLowerCase();
    const decadeTerm = DECADE_GENRE_MAP[selectedDecade]?.term || "";
    const combined = `${genreTerm} ${decadeTerm}`.trim();
    fetchSongs(combined);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    fetchSongs(searchTerm);
  };

  const handleShuffle = () => {
    if (results.length > 1) {
      const remaining = results.filter((r) => r !== featured);
      const next = remaining[Math.floor(Math.random() * remaining.length)];
      setFeatured(next);
    }
  };

  const getAppleMusicLink = (song) => {
    return song.trackViewUrl || `https://music.apple.com/us/search?term=${encodeURIComponent(song.trackName + " " + song.artistName)}`;
  };

  const getAmazonLink = (song) => {
    const query = encodeURIComponent(`${song.trackName} ${song.artistName}`);
    // Amazon Associates tag
    return `https://www.amazon.com/s?k=${query}&i=digital-music&tag=cheapmedz-20`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700 py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_10px)]" />
        <Disc3 className="w-16 h-16 mx-auto mb-4 text-pink-200 drop-shadow-lg animate-spin" style={{ animationDuration: "8s" }} />
        <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight drop-shadow-lg">
          🎵 Decade Music Randomizer
        </h1>
        <p className="text-lg md:text-xl text-pink-100 max-w-2xl mx-auto font-medium">
          Pick a decade, pick a genre — discover the music that defined an era.
        </p>
        <div className="flex justify-center gap-4 mt-4 text-pink-200 text-sm font-semibold flex-wrap">
          <span>🎸 Rock</span>
          <span>🎤 Hip Hop</span>
          <span>🎷 Jazz</span>
          <span>🎹 Soul</span>
          <span>🎧 Electronic</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Mode Toggle */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setMode("randomizer")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
              mode === "randomizer"
                ? "bg-pink-600 text-white shadow-lg shadow-pink-600/30"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            <Shuffle className="w-4 h-4" /> Decade Randomizer
          </button>
          <button
            onClick={() => setMode("search")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
              mode === "search"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            <Search className="w-4 h-4" /> Search by Artist / Song
          </button>
        </div>

        {mode === "randomizer" && (
          <div>
            {/* Decade Picker */}
            <div className="mb-8">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold text-center">Select a Decade</p>
              <div className="flex flex-wrap justify-center gap-3">
                {DECADES.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDecade(d)}
                    className={`px-5 py-2.5 rounded-full font-black text-sm transition-all border-2 ${
                      selectedDecade === d
                        ? `bg-gradient-to-r ${DECADE_COLORS[d]} text-white border-transparent shadow-lg`
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:border-pink-500"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Genre Picker */}
            <div className="mb-10">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold text-center">Select a Genre</p>
              <div className="flex flex-wrap justify-center gap-2">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border ${
                      selectedGenre === g
                        ? "bg-pink-600 text-white border-pink-500 shadow-md"
                        : "bg-gray-800 text-gray-300 border-gray-700 hover:border-pink-400"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Randomize Button */}
            <div className="text-center mb-10">
              <Button
                onClick={handleRandomize}
                disabled={!selectedDecade || !selectedGenre || loading}
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-black text-lg px-10 py-6 rounded-2xl shadow-xl shadow-pink-600/30 disabled:opacity-40 transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><Disc3 className="w-5 h-5 animate-spin" /> Loading...</span>
                ) : (
                  <span className="flex items-center gap-2"><Shuffle className="w-5 h-5" /> 🎲 Randomize!</span>
                )}
              </Button>
              {(!selectedDecade || !selectedGenre) && (
                <p className="text-gray-500 text-sm mt-3">Pick a decade and genre to get started</p>
              )}
            </div>
          </div>
        )}

        {mode === "search" && (
          <div className="max-w-xl mx-auto mb-10">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 font-bold text-center">Search by Artist or Song Title</p>
            <div className="flex gap-3">
              <Input
                placeholder="e.g. Michael Jackson, Lose Yourself, TLC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-base"
              />
              <Button
                onClick={handleSearch}
                disabled={loading || !searchTerm.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 rounded-xl"
              >
                {loading ? <Disc3 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-400 font-semibold mb-8">{error}</div>
        )}

        {/* Featured Song */}
        {featured && (
          <div className="mb-10">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-bold text-center">🎯 Featured Track</p>
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-pink-500 border-2 rounded-3xl overflow-hidden shadow-2xl shadow-pink-600/20 max-w-2xl mx-auto">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
                  <div className="relative">
                    <img
                      src={featured.artworkUrl100?.replace("100x100", "300x300")}
                      alt={featured.trackName}
                      className="w-36 h-36 rounded-2xl shadow-xl object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-pink-600 rounded-full p-2 shadow-lg">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="text-2xl font-black text-white mb-1">{featured.trackName}</h2>
                    <p className="text-pink-400 font-bold text-lg mb-1 flex items-center gap-2 justify-center sm:justify-start">
                      <Mic2 className="w-4 h-4" /> {featured.artistName}
                    </p>
                    <p className="text-gray-400 text-sm mb-1">{featured.collectionName}</p>
                    <p className="text-gray-500 text-xs mb-4">
                      {featured.releaseDate?.substring(0, 4)} · {featured.primaryGenreName}
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                      <a
                        href={getAppleMusicLink(featured)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md"
                      >
                        🍎 Listen on Apple Music <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={getAmazonLink(featured)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all shadow-md"
                      >
                        <ShoppingCart className="w-3 h-3" /> Amazon Music <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-700 px-6 py-3 flex justify-center">
                  <button
                    onClick={handleShuffle}
                    className="flex items-center gap-2 text-gray-400 hover:text-pink-400 font-semibold text-sm transition-colors"
                  >
                    <Shuffle className="w-4 h-4" /> Shuffle to next track
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Results Grid */}
        {results.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-bold text-center">
              🎵 {results.length} tracks found
              {selectedDecade && selectedGenre ? ` · ${selectedGenre} · ${selectedDecade}` : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((song, i) => (
                <Card
                  key={i}
                  onClick={() => setFeatured(song)}
                  className={`cursor-pointer transition-all rounded-2xl overflow-hidden border ${
                    featured === song
                      ? "border-pink-500 bg-gray-800 shadow-lg shadow-pink-600/20"
                      : "border-gray-700 bg-gray-800 hover:border-pink-400"
                  }`}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <img
                      src={song.artworkUrl100}
                      alt={song.trackName}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm truncate">{song.trackName}</p>
                      <p className="text-pink-400 text-xs truncate">{song.artistName}</p>
                      <p className="text-gray-500 text-xs">{song.releaseDate?.substring(0, 4)} · {song.primaryGenreName}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <a
                        href={getAppleMusicLink(song)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-pink-600 hover:bg-pink-500 text-white rounded-lg p-1.5 transition-colors"
                        title="Apple Music"
                      >
                        🍎
                      </a>
                      <a
                        href={getAmazonLink(song)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-orange-500 hover:bg-orange-400 text-white rounded-lg p-1.5 transition-colors"
                        title="Amazon Music"
                      >
                        <ShoppingCart className="w-3 h-3" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
