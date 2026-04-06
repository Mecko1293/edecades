import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DECADES = [
  { label: "1920s", color: "bg-yellow-800", accent: "text-yellow-400", border: "border-yellow-700", emoji: "🎷", query: "1920s jazz roaring twenties history" },
  { label: "1930s", color: "bg-stone-800", accent: "text-stone-400", border: "border-stone-600", emoji: "🎬", query: "1930s Great Depression swing music history" },
  { label: "1940s", color: "bg-green-900", accent: "text-green-400", border: "border-green-700", emoji: "✈️", query: "1940s WWII big band music history" },
  { label: "1950s", color: "bg-red-900", accent: "text-red-400", border: "border-red-700", emoji: "🎸", query: "1950s rock roll Elvis nostalgia" },
  { label: "1960s", color: "bg-purple-900", accent: "text-purple-400", border: "border-purple-700", emoji: "✌️", query: "1960s Beatles Motown civil rights" },
  { label: "1970s", color: "bg-orange-900", accent: "text-orange-400", border: "border-orange-700", emoji: "🕺", query: "1970s disco funk soul history" },
  { label: "1980s", color: "bg-fuchsia-900", accent: "text-fuchsia-400", border: "border-fuchsia-700", emoji: "🕹️", query: "1980s MTV pop culture arcade nostalgia" },
  { label: "1990s", color: "bg-cyan-900", accent: "text-cyan-400", border: "border-cyan-700", emoji: "📼", query: "1990s grunge hip hop nostalgia" },
  { label: "2000s", color: "bg-sky-900", accent: "text-sky-400", border: "border-sky-700", emoji: "💿", query: "2000s Y2K pop culture nostalgia" },
  { label: "2010s", color: "bg-emerald-900", accent: "text-emerald-400", border: "border-emerald-700", emoji: "📱", query: "2010s social media culture history" },
];

export default function VideoArchive() {
  const [filter, setFilter] = useState("All");

  const visible = filter === "All" ? DECADES : DECADES.filter((d) => d.label === filter);

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-950 py-14 px-4 text-center border-b border-yellow-700">
        <div className="text-5xl mb-3">📺</div>
        <h1 className="text-4xl font-black text-yellow-400 mb-2 tracking-tight">eDecades Video Archive</h1>
        <p className="text-gray-400 text-lg">Decade-tagged YouTube content — nostalgia, culture and history</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center px-4 py-6 max-w-4xl mx-auto">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${filter === "All" ? "bg-yellow-500 text-gray-900 border-yellow-400" : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500"}`}
        >
          All
        </button>
        {DECADES.map((d) => (
          <button
            key={d.label}
            onClick={() => setFilter(d.label)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${filter === d.label ? "bg-yellow-500 text-gray-900 border-yellow-400" : "bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500"}`}
          >
            {d.emoji} {d.label}
          </button>
        ))}
      </div>

      {/* Decade Cards */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((d) => (
            <a
              key={d.label}
              href={"https://www.youtube.com/results?search_query=" + encodeURIComponent(d.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <Card className={`${d.color} ${d.border} border-2 hover:scale-105 transition-transform cursor-pointer h-full`}>
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">{d.emoji}</div>
                  <div className={`text-2xl font-black mb-1 ${d.accent}`}>{d.label}</div>
                  <p className="text-gray-400 text-sm mb-4">Nostalgia, culture and history</p>
                  <Badge className="bg-gray-900 text-yellow-400 border border-yellow-700">
                    ▶ Watch on YouTube
                  </Badge>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.youtube.com/results?search_query=decade+history+nostalgia+culture"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-3 text-lg">
              ▶️ Browse All Decades on YouTube
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
