# eDecades — 10 Priority Fixes (May 2026)

## 1. Live Streaming
- Use YouTube Live embedded stream OR a third-party tool like StreamYard/Restream
- Embed a live stream iframe into the eDecades platform

## 2. Free Social Media Posting Channels
- Pinterest, LinkedIn — auto-post via existing automation
- Discord, Slack — via webhooks (already set up)
- Facebook, Instagram, TikTok, X — must post manually (no free API access)

## 3. Photo Fix — Decade-by-Decade
- Delete all photos and replace with decade-accurate Wikimedia Commons or Unsplash API calls
- Hard-code decade photo arrays for 1920s–2020s

## 4. Button Label
- Change "Explore on YouTube" to just "Explore" — confirmed safe

## 5. Top Events & Fashion = Clickable Links
- Wrap each event/fashion item in an anchor tag linking to Wikipedia or YouTube search

## 6. Video Unavailable Fix
- Replace all YouTube iframes with SafeYouTubeEmbed component (already documented)
- Filter out null/undefined/bad video IDs before rendering

## 7. Login Credit While Watching YouTube
- Implement a "heartbeat" ping every 60s to a /api/activity endpoint to log active session time
- Award XP/credit per ping even if user is on an embedded YouTube player

## 8. SEO Optimization
- Add meta tags, og:image, og:title per page
- Add JSON-LD structured data for Organization schema
- Submit sitemap.xml to Google Search Console
- Add alt text to all images
- Optimize page titles and descriptions per decade

## 9. Directory Auto-Submit
- Build a directory submission tracker entity
- Use the SocialMediaHub to link to each directory with pre-filled info

## 10. Prompt Generator for Social Media
- Build a UI where user picks: platform + decade + content type → generates post
