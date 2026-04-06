import { useState } from "react";
import { Search, ExternalLink, BookOpen, Users, Globe, Dna, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DECADE_RANGES = [
  { label: "1800s", start: 1800, end: 1899 },
  { label: "1900s", start: 1900, end: 1909 },
  { label: "1910s", start: 1910, end: 1919 },
  { label: "1920s", start: 1920, end: 1929 },
  { label: "1930s", start: 1930, end: 1939 },
  { label: "1940s", start: 1940, end: 1949 },
  { label: "1950s", start: 1950, end: 1959 },
  { label: "1960s", start: 1960, end: 1969 },
  { label: "1970s", start: 1970, end: 1979 },
  { label: "1980s", start: 1980, end: 1989 },
];

const AFFILIATE_PARTNERS = [
  {
    name: "Ancestry",
    desc: "World's largest genealogy platform. Search billions of records, build your family tree, and take a DNA test.",
    commission: "20% commission",
    cta: "Start Your Family Tree",
    url: "https://www.ancestry.com/c/affiliates",
    color: "from-green-700 to-emerald-600",
    icon: "🌳",
    tag: "Most Popular",
  },
  {
    name: "Fold3",
    desc: "Discover military records, newspapers, and historical documents. Perfect for tracing ancestors from any era.",
    commission: "Up to 40% commission",
    cta: "Search Military Records",
    url: "https://www.fold3.com",
    color: "from-blue-700 to-indigo-600",
    icon: "🎖️",
    tag: "Highest Commission",
  },
  {
    name: "FamilyTreeDNA",
    desc: "DNA testing for genealogy — connect with relatives and trace your ethnic origins across generations.",
    commission: "DNA Kit Referrals",
    cta: "Take a DNA Test",
    url: "https://www.familytreedna.com",
    color: "from-purple-700 to-pink-600",
    icon: "🧬",
    tag: "DNA Testing",
  },
  {
    name: "TraceYourPast",
    desc: "Explore historical records and trace your ancestry with powerful genealogy search tools.",
    commission: "18% commission",
    cta: "Trace Your Past",
    url: "https://learn.traceyourpast.com",
    color: "from-orange-700 to-red-600",
    icon: "📜",
    tag: "18% Commission",
  },
];

const FREE_RESOURCES = [
  {
    name: "FamilySearch",
    desc: "Billions of free historical records — births, deaths, marriages, censuses. No subscription needed.",
    url: "https://www.familysearch.org",
    icon: "🔍",
  },
  {
    name: "WikiTree",
    desc: "Free collaborative family tree. Connect with distant relatives building the same tree.",
    url: "https://www.wikitree.com",
    icon: "🌐",
  },
  {
    name: "USGenWeb",
    desc: "Free genealogy resources for every US county and state. 30+ years of public records.",
    url: "https://www.usgenweb.org",
    icon: "🇺🇸",
  },
  {
    name: "National Archives",
    desc: "Official US government historical records — census, military, immigration, naturalization.",
    url: "https://www.archives.gov/research/genealogy",
    icon: "🏛️",
  },
];

export default function GenealogyExplorer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!lastName.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setSearched(true);
      setLoading(false);
    }, 1000);
  };

  // Build search URLs for each partner with the user's query
  const buildAncestryUrl = () => {
    const params = new URLSearchParams();
    if (firstName) params.set("firstname", firstName);
    if (lastName) params.set("lastname", lastName);
    if (birthYear) params.set("birth", birthYear);
    if (birthPlace) params.set("birthplace", birthPlace);
    return `https://www.ancestry.com/search/?${params.toString()}`;
  };

  const buildFamilySearchUrl = () => {
    const params = new URLSearchParams();
    if (firstName) params.set("q.givenName", firstName);
    if (lastName) params.set("q.surname", lastName);
    if (birthYear) params.set("q.birthLikeDate.from", birthYear);
    if (birthPlace) params.set("q.birthLikePlace", birthPlace);
    return `https://www.familysearch.org/search/record/results?${params.toString()}`;
  };

  const buildFold3Url = () => {
    const query = [firstName, lastName].filter(Boolean).join("+");
    return `https://www.fold3.com/search#query=${encodeURIComponent(query)}`;
  };

  const buildFamilyTreeDNAUrl = () => {
    return `https://www.familytreedna.com/surname-project.aspx?code=${encodeURIComponent(lastName)}`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-teal-800 to-blue-900 py-16 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_10px)]" />
        <Dna className="w-16 h-16 mx-auto mb-4 text-emerald-300 drop-shadow-lg" />
        <h1 className="text-4xl md:text-6xl font-black mb-3 tracking-tight drop-shadow-lg">
          🧬 Genealogy Explorer
        </h1>
        <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto font-medium">
          Discover your family history across every decade. Search records, build your family tree, and trace your roots.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-emerald-200 text-sm font-semibold flex-wrap">
          <span>🌳 Family Trees</span>
          <span>🎖️ Military Records</span>
          <span>🧬 DNA Testing</span>
          <span>📜 Historical Docs</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Search Panel */}
        <div className="bg-gray-800 rounded-3xl p-6 md:p-8 mb-10 border border-gray-700 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-black text-white">Search Your Ancestors</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1.5 block">First Name</label>
              <Input
                placeholder="e.g. James"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1.5 block">Last Name *</label>
              <Input
                placeholder="e.g. Johnson"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1.5 block">Birth Year</label>
              <Input
                placeholder="e.g. 1945"
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1.5 block">Birth Place</label>
              <Input
                placeholder="e.g. Texas, USA"
                value={birthPlace}
                onChange={(e) => setBirthPlace(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Decade Filter */}
          <div className="mb-6">
            <label className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-2 block">Filter by Decade (optional)</label>
            <div className="flex flex-wrap gap-2">
              {DECADE_RANGES.map((d) => (
                <button
                  key={d.label}
                  onClick={() => setSelectedDecade(selectedDecade?.label === d.label ? null : d)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    selectedDecade?.label === d.label
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : "bg-gray-700 text-gray-300 border-gray-600 hover:border-emerald-500"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleSearch}
            disabled={!lastName.trim() || loading}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base py-5 rounded-xl shadow-lg disabled:opacity-40"
          >
            {loading ? "Searching..." : "🔍 Search All Genealogy Records"}
          </Button>
        </div>

        {/* Search Results — Links to Partners */}
        {searched && (
          <div className="mb-10">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-bold text-center">
              🔎 Search results for "{[firstName, lastName].filter(Boolean).join(" ")}"
              {selectedDecade ? ` · ${selectedDecade.label}` : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={buildFamilySearchUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-emerald-500 rounded-2xl p-4 transition-all group"
              >
                <span className="text-3xl">🔍</span>
                <div className="flex-1">
                  <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">FamilySearch</p>
                  <p className="text-gray-400 text-xs">Free — billions of records</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
              </a>
              <a
                href={buildAncestryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-green-500 rounded-2xl p-4 transition-all group"
              >
                <span className="text-3xl">🌳</span>
                <div className="flex-1">
                  <p className="font-bold text-white group-hover:text-green-400 transition-colors">Ancestry</p>
                  <p className="text-gray-400 text-xs">World's largest — 30B+ records</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-green-400" />
              </a>
              <a
                href={buildFold3Url()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-blue-500 rounded-2xl p-4 transition-all group"
              >
                <span className="text-3xl">🎖️</span>
                <div className="flex-1">
                  <p className="font-bold text-white group-hover:text-blue-400 transition-colors">Fold3</p>
                  <p className="text-gray-400 text-xs">Military & historical records</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
              </a>
              <a
                href={buildFamilyTreeDNAUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-purple-500 rounded-2xl p-4 transition-all group"
              >
                <span className="text-3xl">🧬</span>
                <div className="flex-1">
                  <p className="font-bold text-white group-hover:text-purple-400 transition-colors">FamilyTreeDNA</p>
                  <p className="text-gray-400 text-xs">DNA surname project search</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400" />
              </a>
            </div>
          </div>
        )}

        {/* Affiliate Partners */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white mb-2">🌳 Genealogy Partners</h2>
            <p className="text-gray-400 text-sm">The best tools for discovering your family history</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {AFFILIATE_PARTNERS.map((p) => (
              <Card key={p.name} className="bg-gray-800 border-gray-700 rounded-2xl overflow-hidden hover:border-emerald-500 transition-all group">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${p.color} px-5 py-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{p.icon}</span>
                      <div>
                        <h3 className="font-black text-white text-lg">{p.name}</h3>
                        <span className="text-xs font-bold text-white/70">{p.commission}</span>
                      </div>
                    </div>
                    <Badge className="bg-white/20 text-white border-0 text-xs font-bold">{p.tag}</Badge>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-300 text-sm mb-4">{p.desc}</p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${p.color} hover:opacity-90 text-white font-bold py-2.5 rounded-xl text-sm transition-all`}
                    >
                      {p.cta} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Free Resources */}
        <div>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-white mb-2">📚 Free Genealogy Resources</h2>
            <p className="text-gray-400 text-sm">No subscription needed — start researching for free</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FREE_RESOURCES.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-teal-500 rounded-2xl p-4 transition-all group"
              >
                <span className="text-2xl">{r.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-white group-hover:text-teal-400 transition-colors">{r.name}</p>
                  <p className="text-gray-400 text-xs">{r.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-teal-400" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
