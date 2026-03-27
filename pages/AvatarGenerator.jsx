import { useState } from "react";
import { Sparkles, Download, RefreshCw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { base44 } from "@/api/base44Client";

const DECADES = [
  { label: "1920s", emoji: "🎷", vibe: "Jazz Age & Glamour" },
  { label: "1930s", emoji: "🎬", vibe: "Hollywood Golden Era" },
  { label: "1940s", emoji: "✈️", vibe: "Wartime & Swing Era" },
  { label: "1950s", emoji: "🎸", vibe: "Rock & Roll & Diners" },
  { label: "1960s", emoji: "☮️", vibe: "Hippie & Mod Culture" },
  { label: "1970s", emoji: "🪩", vibe: "Disco & Funk" },
  { label: "1980s", emoji: "🕹️", vibe: "Neon & Synth Pop" },
  { label: "1990s", emoji: "📼", vibe: "Grunge & Hip-Hop" },
  { label: "2000s", emoji: "💿", vibe: "Y2K & Pop Culture" },
  { label: "2010s", emoji: "📱", vibe: "Indie & Social Media" },
];

const STYLES = {
  "1920s": ["Jazz Musician", "Flapper Girl", "Gangster Mobster", "Speakeasy Singer", "Aristocrat"],
  "1930s": ["Hollywood Star", "Film Noir Detective", "Swing Dancer", "Depression-Era Hero", "Art Deco Diva"],
  "1940s": ["WWII Soldier", "Rosie the Riveter", "Big Band Singer", "Film Noir Femme", "Pin-Up Icon"],
  "1950s": ["Rock & Roll Star", "Greaser", "Poodle Skirt Girl", "Drive-In Teenager", "TV Housewife"],
  "1960s": ["Hippie Flower Child", "Mod Fashionista", "Civil Rights Activist", "Space Age Futurist", "British Invasion Rocker"],
  "1970s": ["Disco Queen", "Funk Musician", "Roller Skater", "70s Rock Star", "Soul Singer"],
  "1980s": ["Neon Punk Rocker", "Valley Girl", "Hip-Hop Breakdancer", "Hair Metal Rocker", "Preppy Yuppie"],
  "1990s": ["Grunge Rocker", "Hip-Hop MC", "90s Skater", "Rave Kid", "Supermodel"],
  "2000s": ["Y2K Pop Star", "Emo Kid", "Indie Hipster", "Chav / Streetwear", "Reality TV Star"],
  "2010s": ["Tumblr Aesthetic", "Hypebeast", "Instagram Influencer", "EDM Festival Kid", "Normcore"],
};

const GENDERS = ["Female", "Male", "Non-Binary"];
const EXTRAS = ["Sunglasses", "Hat", "Bold Jewelry", "Tattoos", "Dramatic Makeup", "Retro Background"];

export default function AvatarGenerator() {
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [selectedGender, setSelectedGender] = useState("Female");
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [generating, setGenerating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [error, setError] = useState(null);
  const [generated, setGenerated] = useState(false);

  const toggleExtra = (extra) => {
    setSelectedExtras(prev =>
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra]
    );
  };

  const buildPrompt = () => {
    const extrasText = selectedExtras.length > 0 ? `, with ${selectedExtras.join(", ")}` : "";
    return `A stunning portrait avatar illustration of a ${selectedGender} ${selectedStyle} from the ${selectedDecade.label}. ${selectedDecade.vibe} aesthetic. Highly detailed digital art, vibrant colors, stylized character portrait, professional avatar style, square crop, centered face and upper body${extrasText}. Decade-accurate clothing, hair, and accessories. Artistic, cinematic, bold and iconic look.`;
  };

  const handleGenerate = async () => {
    if (!selectedDecade || !selectedStyle) return;
    setGenerating(true);
    setError(null);
    setAvatarUrl(null);

    try {
      const result = await base44.integrations.generateImage({ prompt: buildPrompt() });
      if (result?.url) {
        setAvatarUrl(result.url);
        setGenerated(true);
      } else {
        setError("Could not generate avatar. Please try again.");
      }
    } catch (e) {
      setError("Something went wrong generating your avatar. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleRegenerate = () => {
    setAvatarUrl(null);
    setGenerated(false);
    handleGenerate();
  };

  const canGenerate = selectedDecade && selectedStyle;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-fuchsia-900 via-purple-900 to-indigo-900 py-14 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_12px)]" />
        <Sparkles className="w-14 h-14 mx-auto mb-3 text-fuchsia-300 drop-shadow-lg" />
        <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight drop-shadow-lg">
          ✨ Decade Avatar Creator
        </h1>
        <p className="text-lg text-fuchsia-100 max-w-xl mx-auto">
          Pick your decade, choose your style, and let AI generate your iconic era avatar.
        </p>
        <div className="flex justify-center gap-6 mt-3 text-fuchsia-200 text-sm font-semibold flex-wrap">
          <span>🎨 AI-Generated</span>
          <span>📸 Profile-Ready</span>
          <span>🕰️ 10 Decades</span>
          <span>🌟 Unique Every Time</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Step 1 — Pick Decade */}
        <div>
          <h2 className="text-xl font-black mb-1 flex items-center gap-2">
            <span className="bg-fuchsia-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">1</span>
            Pick Your Decade
          </h2>
          <p className="text-gray-400 text-sm mb-4">Which era speaks to your soul?</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {DECADES.map((d) => (
              <button
                key={d.label}
                onClick={() => { setSelectedDecade(d); setSelectedStyle(null); setAvatarUrl(null); setGenerated(false); }}
                className={`relative rounded-2xl p-3 text-center border-2 transition-all ${
                  selectedDecade?.label === d.label
                    ? "border-fuchsia-400 bg-fuchsia-900/50 scale-105 shadow-lg shadow-fuchsia-900"
                    : "border-gray-700 bg-gray-800 hover:border-fuchsia-600"
                }`}
              >
                {selectedDecade?.label === d.label && (
                  <CheckCircle className="absolute top-1.5 right-1.5 w-4 h-4 text-fuchsia-400" />
                )}
                <div className="text-2xl mb-1">{d.emoji}</div>
                <div className="font-black text-sm text-white">{d.label}</div>
                <div className="text-xs text-gray-400 leading-tight mt-0.5">{d.vibe}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Pick Style */}
        {selectedDecade && (
          <div>
            <h2 className="text-xl font-black mb-1 flex items-center gap-2">
              <span className="bg-fuchsia-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">2</span>
              Choose Your Style
            </h2>
            <p className="text-gray-400 text-sm mb-4">What kind of {selectedDecade.label} icon are you?</p>
            <div className="flex flex-wrap gap-3">
              {STYLES[selectedDecade.label].map((style) => (
                <button
                  key={style}
                  onClick={() => { setSelectedStyle(style); setAvatarUrl(null); setGenerated(false); }}
                  className={`px-4 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${
                    selectedStyle === style
                      ? "bg-fuchsia-600 border-fuchsia-400 text-white shadow-lg shadow-fuchsia-900"
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:border-fuchsia-500"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 — Gender */}
        {selectedStyle && (
          <div>
            <h2 className="text-xl font-black mb-1 flex items-center gap-2">
              <span className="bg-fuchsia-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">3</span>
              Avatar Gender
            </h2>
            <div className="flex gap-3 mt-3">
              {GENDERS.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all ${
                    selectedGender === g
                      ? "bg-fuchsia-600 border-fuchsia-400 text-white"
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:border-fuchsia-500"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4 — Extras */}
        {selectedStyle && (
          <div>
            <h2 className="text-xl font-black mb-1 flex items-center gap-2">
              <span className="bg-fuchsia-600 text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-black">4</span>
              Add Extras <span className="text-gray-400 text-sm font-normal">(optional)</span>
            </h2>
            <div className="flex flex-wrap gap-3 mt-3">
              {EXTRAS.map((extra) => (
                <button
                  key={extra}
                  onClick={() => toggleExtra(extra)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
                    selectedExtras.includes(extra)
                      ? "bg-indigo-600 border-indigo-400 text-white"
                      : "bg-gray-800 border-gray-600 text-gray-300 hover:border-indigo-500"
                  }`}
                >
                  {selectedExtras.includes(extra) ? "✓ " : ""}{extra}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Generate Button */}
        {canGenerate && !generated && (
          <div className="text-center">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5 mb-6 text-left max-w-lg mx-auto">
              <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Your Avatar Summary</p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-fuchsia-900 text-fuchsia-200 border-fuchsia-700">{selectedDecade.emoji} {selectedDecade.label}</Badge>
                <Badge className="bg-indigo-900 text-indigo-200 border-indigo-700">🎭 {selectedStyle}</Badge>
                <Badge className="bg-purple-900 text-purple-200 border-purple-700">👤 {selectedGender}</Badge>
                {selectedExtras.map(e => (
                  <Badge key={e} className="bg-gray-700 text-gray-200 border-gray-600">✨ {e}</Badge>
                ))}
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black text-lg px-12 py-6 rounded-2xl shadow-2xl shadow-fuchsia-900 disabled:opacity-50"
            >
              {generating ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" /> Generating Your Avatar...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" /> Generate My Avatar ✨
                </span>
              )}
            </Button>
            {generating && (
              <p className="text-gray-400 text-sm mt-3 animate-pulse">Magic in progress — takes about 10 seconds 🎨</p>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center bg-red-900/30 border border-red-700 rounded-2xl p-4 text-red-300 font-semibold">
            {error}
          </div>
        )}

        {/* Result */}
        {avatarUrl && (
          <div className="text-center">
            <div className="inline-block relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 blur-2xl opacity-40 scale-110" />
              <img
                src={avatarUrl}
                alt="Your Decade Avatar"
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl object-cover shadow-2xl border-4 border-fuchsia-500 mx-auto"
              />
              <div className="absolute -top-3 -right-3 bg-fuchsia-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                {selectedDecade.emoji} {selectedDecade.label} {selectedStyle}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={avatarUrl}
                download="my-decade-avatar.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-black px-8 py-3.5 rounded-xl shadow-lg transition-all"
              >
                <Download className="w-5 h-5" /> Download Avatar
              </a>
              <Button
                onClick={handleRegenerate}
                variant="outline"
                className="flex items-center gap-2 border-gray-600 text-gray-300 hover:border-fuchsia-500 hover:text-fuchsia-300 font-bold px-8 py-3.5 rounded-xl"
              >
                <RefreshCw className="w-4 h-4" /> Generate Another
              </Button>
            </div>
            <p className="text-gray-500 text-xs mt-4">Tip: Save this as your eDecades profile picture! 🎨</p>
          </div>
        )}

      </div>
    </div>
  );
}
