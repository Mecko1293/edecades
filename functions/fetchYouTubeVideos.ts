Deno.serve(async (req) => {
  const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
  const CHANNEL_ID = 'UCAnthonyKittles'; // will be resolved dynamically

  const DECADE_QUERIES = [
    { decade: '1920s', query: '1920s history culture jazz flappers' },
    { decade: '1930s', query: '1930s Great Depression swing music history' },
    { decade: '1940s', query: '1940s WWII big band music history' },
    { decade: '1950s', query: '1950s rock and roll Elvis history nostalgia' },
    { decade: '1960s', query: '1960s Beatles Motown civil rights history' },
    { decade: '1970s', query: '1970s disco funk hip hop history nostalgia' },
    { decade: '1980s', query: '1980s pop culture MTV arcade games nostalgia' },
    { decade: '1990s', query: '1990s grunge hip hop nostalgia culture' },
    { decade: '2000s', query: '2000s Y2K pop culture nostalgia' },
    { decade: '2010s', query: '2010s social media culture nostalgia history' },
  ];

  try {
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode') || 'decades'; // 'channel' or 'decades'
    const decade = url.searchParams.get('decade') || null;
    const maxResults = parseInt(url.searchParams.get('maxResults') || '8');

    let results: any[] = [];

    if (mode === 'channel') {
      // Fetch from Anthony's channel - first get channel ID from username
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCMSSwEeAkDoTKuH6PcCaFSg&order=date&type=video&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
      );
      const channelData = await channelRes.json();

      if (channelData.items) {
        results = channelData.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
          channel: item.snippet.channelTitle,
          published: item.snippet.publishedAt,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          embed: `https://www.youtube.com/embed/${item.id.videoId}`,
          decade: detectDecade(item.snippet.title + ' ' + item.snippet.description),
          source: 'channel',
        }));
      }
    } else {
      // Fetch decade-tagged content
      const queries = decade
        ? DECADE_QUERIES.filter(d => d.decade === decade)
        : DECADE_QUERIES;

      const fetches = queries.map(async ({ decade: d, query }) => {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&order=relevance&maxResults=${maxResults}&videoDuration=medium&key=${YOUTUBE_API_KEY}`
        );
        const data = await res.json();
        if (!data.items) return [];
        return data.items.map((item: any) => ({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description?.substring(0, 200),
          thumbnail: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.medium?.url,
          channel: item.snippet.channelTitle,
          published: item.snippet.publishedAt,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          embed: `https://www.youtube.com/embed/${item.id.videoId}`,
          decade: d,
          source: 'search',
        }));
      });

      const allResults = await Promise.all(fetches);
      results = allResults.flat();
    }

    return new Response(JSON.stringify({ success: true, count: results.length, videos: results }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});

function detectDecade(text: string): string {
  const t = text.toLowerCase();
  if (t.includes('1920') || t.includes('twenties') || t.includes('roaring 20')) return '1920s';
  if (t.includes('1930') || t.includes('thirties') || t.includes('depression')) return '1930s';
  if (t.includes('1940') || t.includes('forties') || t.includes('wwii') || t.includes('world war')) return '1940s';
  if (t.includes('1950') || t.includes('fifties')) return '1950s';
  if (t.includes('1960') || t.includes('sixties')) return '1960s';
  if (t.includes('1970') || t.includes('seventies') || t.includes('70s')) return '1970s';
  if (t.includes('1980') || t.includes('eighties') || t.includes('80s')) return '1980s';
  if (t.includes('1990') || t.includes('nineties') || t.includes('90s')) return '1990s';
  if (t.includes('2000') || t.includes('y2k') || t.includes('2000s')) return '2000s';
  if (t.includes('2010') || t.includes('2010s')) return '2010s';
  return 'Various';
}
