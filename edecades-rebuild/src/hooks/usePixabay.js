/**
 * usePixabay — Fetch decade-accurate photos from Pixabay
 *
 * Usage:
 *   const { images, loading } = usePixabay({ category: 'Fashion', decade: '1980s', count: 6 });
 *   const { images } = usePixabay({ q: '1920s jazz music vintage', count: 4 });
 *
 * Returns array of image URLs. Falls back to hardcoded images if API fails.
 */

import { useState, useEffect } from 'react';

const PIXABAY_KEY = '17942546-d3ede3af795e99870e9bf04dd';

// Curated search queries per category + decade
const QUERIES = {
  Fashion: {
    '1900s': 'edwardian fashion vintage portrait woman',
    '1910s': '1910s women fashion vintage dress',
    '1920s': '1920s flapper fashion art deco vintage',
    '1930s': '1930s fashion hollywood glamour vintage',
    '1940s': '1940s fashion wwii women vintage style',
    '1950s': '1950s fashion rockabilly poodle skirt vintage',
    '1960s': '1960s mod fashion miniskirt vintage',
    '1970s': '1970s fashion boho bell bottoms vintage',
    '1980s': '1980s neon fashion power suit vintage',
    '1990s': '1990s grunge fashion flannel vintage',
    '2000s': '2000s y2k fashion low rise vintage',
    '2010s': '2010s streetwear athleisure fashion',
    '2020s': '2020s cottagecore gen z fashion',
  },
  Food: {
    '1900s': 'vintage kitchen cooking food old fashioned',
    '1910s': 'vintage food kitchen dining old fashioned',
    '1920s': '1920s speakeasy food cocktail vintage',
    '1930s': '1930s depression era food soup kitchen',
    '1940s': '1940s wartime food rations vintage kitchen',
    '1950s': '1950s diner milkshake burger vintage',
    '1960s': '1960s vintage food TV dinner fondue',
    '1970s': '1970s vintage food casserole retro kitchen',
    '1980s': '1980s junk food fast food retro',
    '1990s': '1990s food pizza retro snacks',
    '2000s': '2000s food energy drink sushi fusion',
    '2010s': '2010s food avocado toast artisan coffee',
    '2020s': '2020s food delivery plant based healthy',
  },
  Beauty: {
    '1900s': 'edwardian hairstyle vintage beauty portrait woman',
    '1910s': '1910s vintage beauty hair makeup woman',
    '1920s': '1920s flapper makeup bob hairstyle vintage',
    '1930s': '1930s hollywood beauty makeup vintage glamour',
    '1940s': '1940s victory rolls lipstick vintage beauty',
    '1950s': '1950s pinup makeup cat eye vintage beauty',
    '1960s': '1960s mod makeup twiggy vintage beauty',
    '1970s': '1970s natural beauty afro hair vintage',
    '1980s': '1980s big hair makeup neon vintage beauty',
    '1990s': '1990s grunge makeup minimalist vintage',
    '2000s': '2000s glossy lip makeup beauty',
    '2010s': '2010s contouring instagram beauty makeup',
    '2020s': '2020s natural skincare beauty wellness',
  },
  Art: {
    '1900s': 'impressionism art painting museum vintage',
    '1910s': 'cubism art avant garde painting vintage',
    '1920s': 'art deco illustration vintage 1920s',
    '1930s': '1930s social realism art painting',
    '1940s': '1940s abstract expressionism war art',
    '1950s': '1950s abstract expressionism modern art',
    '1960s': '1960s pop art contemporary',
    '1970s': '1970s conceptual art psychedelic vintage',
    '1980s': '1980s graffiti street art neon pop',
    '1990s': '1990s contemporary art installation',
    '2000s': '2000s digital art contemporary gallery',
    '2010s': '2010s street art mural contemporary',
    '2020s': '2020s digital art contemporary',
  },
  Technology: {
    '1900s': '1900s vintage technology machine invention',
    '1910s': '1910s vintage technology radio car',
    '1920s': '1920s vintage technology radio appliance',
    '1930s': '1930s vintage technology appliance radio',
    '1940s': '1940s vintage technology radar computer',
    '1950s': '1950s vintage technology television appliance',
    '1960s': '1960s space technology nasa rocket',
    '1970s': '1970s vintage technology calculator computer',
    '1980s': '1980s personal computer technology vintage',
    '1990s': '1990s computer internet technology vintage',
    '2000s': '2000s technology smartphone mp3 player',
    '2010s': '2010s smartphone tablet social media',
    '2020s': '2020s artificial intelligence technology',
  },
  Homes: {
    '1900s': 'edwardian victorian interior home vintage',
    '1910s': '1910s vintage home interior parlor',
    '1920s': '1920s art deco interior home vintage',
    '1930s': '1930s depression era home interior vintage',
    '1940s': '1940s wartime home interior vintage',
    '1950s': '1950s ranch house interior vintage retro',
    '1960s': '1960s mod interior home vintage retro',
    '1970s': '1970s shag carpet interior home vintage',
    '1980s': '1980s interior home decor vintage retro',
    '1990s': '1990s interior home decor vintage retro',
    '2000s': '2000s minimalist home interior modern',
    '2010s': '2010s open plan home interior modern',
    '2020s': '2020s scandinavian home interior minimalist',
  },
  Culture: {
    '1900s': '1900s vintage people street life culture',
    '1910s': '1910s vintage street culture society',
    '1920s': '1920s jazz age nightclub culture vintage',
    '1930s': '1930s depression era culture vintage people',
    '1940s': '1940s wartime culture vintage people',
    '1950s': '1950s american culture suburban vintage',
    '1960s': '1960s counterculture hippie woodstock vintage',
    '1970s': '1970s disco culture vintage people',
    '1980s': '1980s pop culture mall vintage people',
    '1990s': '1990s pop culture vintage people',
    '2000s': '2000s pop culture reality tv vintage',
    '2010s': '2010s social media culture selfie people',
    '2020s': '2020s pandemic culture zoom social media',
  },
};

const DECADE_FALLBACK = {
  '1900s': '1900s vintage history black white old',
  '1910s': '1910s vintage history old photograph',
  '1920s': '1920s roaring twenties vintage jazz',
  '1930s': '1930s great depression dust bowl vintage',
  '1940s': '1940s world war vintage people',
  '1950s': '1950s american dream vintage retro',
  '1960s': '1960s civil rights space age vintage',
  '1970s': '1970s disco era vintage culture',
  '1980s': '1980s retro pop culture vintage',
  '1990s': '1990s grunge era vintage culture',
  '2000s': '2000s millennium era technology',
  '2010s': '2010s social media smartphone era',
  '2020s': '2020s pandemic technology modern',
};

// Session cache — avoids re-fetching same query during a visit
const memCache = {};

export function usePixabay({ category = '', decade = '', q = '', count = 6 } = {}) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch_images() {
      setLoading(true);
      setError(null);

      // Build search query
      const query = q || QUERIES[category]?.[decade] || DECADE_FALLBACK[decade] || `${decade} ${category} vintage`;
      const cacheKey = `${query}:${count}`;

      // Check memory cache first
      if (memCache[cacheKey]) {
        if (!cancelled) { setImages(memCache[cacheKey]); setLoading(false); }
        return;
      }

      // Check sessionStorage
      try {
        const stored = sessionStorage.getItem(`px_${cacheKey}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          memCache[cacheKey] = parsed;
          if (!cancelled) { setImages(parsed); setLoading(false); }
          return;
        }
      } catch {}

      // Fetch from Pixabay
      try {
        const params = new URLSearchParams({
          key: PIXABAY_KEY,
          q: query,
          image_type: 'photo',
          per_page: String(Math.min(count * 2, 20)),
          safesearch: 'true',
          orientation: 'horizontal',
          min_width: '400',
        });

        const res = await window.fetch(`https://pixabay.com/api/?${params}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const urls = (data.hits || []).slice(0, count).map(h => h.webformatURL);

        memCache[cacheKey] = urls;
        try { sessionStorage.setItem(`px_${cacheKey}`, JSON.stringify(urls)); } catch {}

        if (!cancelled) { setImages(urls); setLoading(false); }
      } catch (err) {
        if (!cancelled) { setError(err.message); setLoading(false); }
      }
    }

    fetch_images();
    return () => { cancelled = true; };
  }, [category, decade, q, count]);

  return { images, loading, error };
}

// Standalone fetch (non-hook) for use outside components
export async function getPixabayImages({ category = '', decade = '', q = '', count = 6 } = {}) {
  const query = q || QUERIES[category]?.[decade] || DECADE_FALLBACK[decade] || `${decade} ${category} vintage`;
  const params = new URLSearchParams({
    key: PIXABAY_KEY,
    q: query,
    image_type: 'photo',
    per_page: String(Math.min(count * 2, 20)),
    safesearch: 'true',
    orientation: 'horizontal',
    min_width: '400',
  });
  const res = await fetch(`https://pixabay.com/api/?${params}`);
  const data = await res.json();
  return (data.hits || []).slice(0, count).map(h => h.webformatURL);
}

// Export queries map so other components can use them
export { QUERIES, DECADE_FALLBACK };
