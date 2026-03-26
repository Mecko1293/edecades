import { useState, useEffect } from "react";
import { SportsMVP } from "@/api/entities";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, Star, Search, Filter, ThumbsUp, Medal, Zap } from "lucide-react";

const SPORTS = ["All", "NBA", "NFL", "MLB", "NHL", "Soccer", "Boxing", "Tennis", "Golf", "Olympics", "Other"];
const DECADES = ["All", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"];

const SPORT_COLORS = {
  NBA: "bg-orange-100 text-orange-700 border-orange-300",
  NFL: "bg-blue-100 text-blue-700 border-blue-300",
  MLB: "bg-red-100 text-red-700 border-red-300",
  NHL: "bg-cyan-100 text-cyan-700 border-cyan-300",
  Soccer: "bg-green-100 text-green-700 border-green-300",
  Boxing: "bg-yellow-100 text-yellow-700 border-yellow-300",
  Tennis: "bg-lime-100 text-lime-700 border-lime-300",
  Golf: "bg-emerald-100 text-emerald-700 border-emerald-300",
  Olympics: "bg-purple-100 text-purple-700 border-purple-300",
  Other: "bg-gray-100 text-gray-700 border-gray-300",
};

const SPORT_EMOJIS = {
  NBA: "🏀", NFL: "🏈", MLB: "⚾", NHL: "🏒", Soccer: "⚽",
  Boxing: "🥊", Tennis: "🎾", Golf: "⛳", Olympics: "🏅", Other: "🏆",
};

export default function SportsMVPs() {
  const [mvps, setMvps] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [decadeFilter, setDecadeFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [votedIds, setVotedIds] = useState([]);

  useEffect(() => {
    SportsMVP.list("-fan_votes").then((data) => {
      setMvps(data);
      setFiltered(data);
      setLoading(false);
    });
    const saved = JSON.parse(localStorage.getItem("mvp_votes") || "[]");
    setVotedIds(saved);
  }, []);

  useEffect(() => {
    let result = [...mvps];
    if (sportFilter !== "All") result = result.filter((m) => m.sport === sportFilter);
    if (decadeFilter !== "All") result = result.filter((m) => m.decade === decadeFilter);
    if (search) result = result.filter((m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.team?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, sportFilter, decadeFilter, mvps]);

  const handleVote = async (e, mvp) => {
    e.stopPropagation();
    if (votedIds.includes(mvp.id)) return;
    const newVotes = (mvp.fan_votes || 0) + 1;
    await SportsMVP.update(mvp.id, { fan_votes: newVotes });
    const updated = mvps.map((m) => m.id === mvp.id ? { ...m, fan_votes: newVotes } : m);
    setMvps(updated);
    const newVotedIds = [...votedIds, mvp.id];
    setVotedIds(newVotedIds);
    localStorage.setItem("mvp_votes", JSON.stringify(newVotedIds));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-yellow-500 via-orange-600 to-red-700 py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_10px)]" />
        <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-200 drop-shadow-lg" />
        <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight drop-shadow-lg">
          🏆 Sports MVP Hall of Fame
        </h1>
        <p className="text-lg md:text-xl text-yellow-100 max-w-2xl mx-auto font-medium">
          The greatest athletes of every era — their legendary moments, iconic stats, and the decades they dominated.
        </p>
        <div className="flex justify-center gap-6 mt-6 text-yellow-200 text-sm font-semibold">
          <span>⚽ Soccer</span>
          <span>🏀 Basketball</span>
          <span>🏈 Football</span>
          <span>⚾ Baseball</span>
          <span>🥊 Boxing</span>
          <span>🏅 Olympics</span>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search athletes or teams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Sport Filter */}
        <div className="mb-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Filter by Sport</p>
          <div className="flex flex-wrap gap-2">
            {SPORTS.map((s) => (
              <button
                key={s}
                onClick={() => setSportFilter(s)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  sportFilter === s
                    ? "bg-yellow-500 text-gray-900 border-yellow-400"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500"
                }`}
              >
                {SPORT_EMOJIS[s] || "🏆"} {s}
              </button>
            ))}
          </div>
        </div>

        {/* Decade Filter */}
        <div className="mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Filter by Decade</p>
          <div className="flex flex-wrap gap-2">
            {DECADES.map((d) => (
              <button
                key={d}
                onClick={() => setDecadeFilter(d)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  decadeFilter === d
                    ? "bg-purple-500 text-white border-purple-400"
                    : "bg-gray-800 text-gray-300 border-gray-700 hover:border-purple-500"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center gap-2 mb-6">
          <Medal className="w-5 h-5 text-yellow-400" />
          <span className="text-gray-300 font-medium">{filtered.length} legends found</span>
        </div>

        {/* MVP Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((mvp) => (
              <Card
                key={mvp.id}
                onClick={() => setSelected(mvp)}
                className="bg-gray-800 border-gray-700 hover:border-yellow-500 hover:shadow-yellow-500/20 hover:shadow-lg cursor-pointer transition-all group rounded-2xl overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Card Header */}
                  <div className={`p-5 bg-gradient-to-br ${
                    mvp.sport === "NBA" ? "from-orange-900 to-gray-800" :
                    mvp.sport === "NFL" ? "from-blue-900 to-gray-800" :
                    mvp.sport === "MLB" ? "from-red-900 to-gray-800" :
                    mvp.sport === "NHL" ? "from-cyan-900 to-gray-800" :
                    mvp.sport === "Soccer" ? "from-green-900 to-gray-800" :
                    mvp.sport === "Boxing" ? "from-yellow-900 to-gray-800" :
                    mvp.sport === "Olympics" ? "from-purple-900 to-gray-800" :
                    "from-gray-700 to-gray-800"
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-4xl mb-2">{SPORT_EMOJIS[mvp.sport]}</div>
                        <h3 className="text-xl font-black text-white group-hover:text-yellow-400 transition-colors">
                          {mvp.name}
                        </h3>
                        <p className="text-gray-300 text-sm">{mvp.position} · {mvp.team}</p>
                        <p className="text-gray-400 text-xs mt-1">{mvp.years_active}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full border ${SPORT_COLORS[mvp.sport]}`}>
                          {mvp.sport}
                        </span>
                        {mvp.hall_of_fame && (
                          <div className="mt-2 text-xs text-yellow-400 font-semibold flex items-center justify-end gap-1">
                            <Star className="w-3 h-3 fill-yellow-400" /> HOF
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-purple-400 font-bold text-xs uppercase tracking-wider">Decade</span>
                      <span className="text-white font-semibold text-sm">{mvp.decade}</span>
                      <span className="ml-auto text-yellow-400 font-bold text-sm">🏆 {mvp.championships}x Champ</span>
                    </div>

                    <p className="text-gray-400 text-xs line-clamp-2 mb-3 italic">
                      "{mvp.iconic_moment?.substring(0, 100)}..."
                    </p>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={(e) => handleVote(e, mvp)}
                        className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full transition-all ${
                          votedIds.includes(mvp.id)
                            ? "bg-purple-700 text-purple-200 cursor-default"
                            : "bg-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white"
                        }`}
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        {mvp.fan_votes || 0} votes
                      </button>
                      <span className="text-xs text-gray-500 font-medium">Tap for highlights →</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-500">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-medium">No MVPs found for those filters</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black flex items-center gap-3">
                <span className="text-4xl">{SPORT_EMOJIS[selected.sport]}</span>
                {selected.name}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-5 mt-2">
              {/* Meta */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${SPORT_COLORS[selected.sport]}`}>
                  {selected.sport}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-700 text-gray-300 border border-gray-600">
                  {selected.decade}
                </span>
                {selected.hall_of_fame && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-yellow-900 text-yellow-400 border border-yellow-700 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400" /> Hall of Fame
                  </span>
                )}
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-900 text-orange-400 border border-orange-700">
                  🏆 {selected.championships}x Champion
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-800 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Position</p>
                  <p className="font-semibold">{selected.position}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Team(s)</p>
                  <p className="font-semibold">{selected.team}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Years Active</p>
                  <p className="font-semibold">{selected.years_active}</p>
                </div>
                <div className="bg-gray-800 rounded-xl p-3">
                  <p className="text-gray-400 text-xs mb-1">Nationality</p>
                  <p className="font-semibold">{selected.nationality}</p>
                </div>
              </div>

              {/* MVP Awards */}
              <div className="bg-yellow-900/30 border border-yellow-700 rounded-xl p-4">
                <p className="text-yellow-400 font-bold text-sm mb-1 flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> MVP Awards
                </p>
                <p className="text-white text-sm">{selected.mvp_awards}</p>
              </div>

              {/* Career Highlights */}
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-purple-400 font-bold text-sm mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Career Highlights
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">{selected.career_highlights}</p>
              </div>

              {/* Stats */}
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-cyan-400 font-bold text-sm mb-2 flex items-center gap-2">
                  <Medal className="w-4 h-4" /> Career Stats
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">{selected.stats_summary}</p>
              </div>

              {/* Iconic Moment */}
              <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-700 rounded-xl p-4">
                <p className="text-orange-400 font-bold text-sm mb-2 flex items-center gap-2">
                  ⚡ Iconic Moment
                </p>
                <p className="text-white text-sm leading-relaxed italic">"{selected.iconic_moment}"</p>
              </div>

              {/* Vote */}
              <button
                onClick={(e) => { handleVote(e, selected); setSelected({ ...selected, fan_votes: (selected.fan_votes || 0) + (votedIds.includes(selected.id) ? 0 : 1) }); }}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                  votedIds.includes(selected.id)
                    ? "bg-purple-800 text-purple-300 cursor-default"
                    : "bg-purple-600 hover:bg-purple-500 text-white"
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                {votedIds.includes(selected.id) ? "You voted for this legend!" : "Vote for this Legend"}
                <span className="ml-1 text-xs opacity-75">({selected.fan_votes || 0} votes)</span>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
