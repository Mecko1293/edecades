// eDecades Global Search v2
import { createClientFromRequest } from "https://cdn.base44.com/base44-deno-sdk.js";

export default async function handler(req: Request): Promise<Response> {
  const base44 = createClientFromRequest(req);
  const body = await req.json().catch(() => ({}));
  const query = (body.query || "").toLowerCase().trim();

  if (!query || query.length < 2) {
    return Response.json({ results: [], total: 0 });
  }

  const EDECADES_APP_ID = "6992ac595576405eeacfea16";
  const results: any[] = [];

  try {
    const [decades, posts, profiles, groups, figures, topics, events, artifacts, media] = await Promise.all([
      base44.asServiceRole.entities.Decade.list({ app_id: EDECADES_APP_ID }),
      base44.asServiceRole.entities.Post.list({ app_id: EDECADES_APP_ID }),
      base44.asServiceRole.entities.UserProfile.list({ app_id: EDECADES_APP_ID }),
      base44.asServiceRole.entities.Group.list({ app_id: EDECADES_APP_ID }),
      base44.asServiceRole.entities.NotableFigure.list({ app_id: EDECADES_APP_ID }),
      base44.asServiceRole.entities.ForumTopic.list({ app_id: EDECADES_APP_ID }),
      base44.asServiceRole.entities.HistoricalEvent.list({ app_id: EDECADES_APP_ID }),
      base44.asServiceRole.entities.Artifact.list({ app_id: EDECADES_APP_ID }),
      base44.asServiceRole.entities.MediaContent.list({ app_id: EDECADES_APP_ID }),
    ]);

    for (const d of decades) {
      const text = `${d.name} ${d.tagline} ${d.description} ${(d.cultural_trends||[]).join(" ")} ${(d.key_events||[]).join(" ")}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Decade", icon: "🗓️", id: d.id, title: d.name, subtitle: d.tagline || `${d.year_start}–${d.year_end}`, url: `/decades/${d.id}` });
    }
    for (const p of posts) {
      const text = `${p.content} ${p.decade_name} ${(p.tags||[]).join(" ")} ${p.author_name}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Post", icon: "📝", id: p.id, title: (p.content||"").slice(0,80) + ((p.content||"").length > 80 ? "..." : ""), subtitle: `by ${p.author_name} · ${p.decade_name}`, url: `/posts/${p.id}` });
    }
    for (const u of profiles) {
      const text = `${u.display_name} ${u.username} ${u.bio} ${u.favorite_decade} ${u.location}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Member", icon: "👤", id: u.id, title: u.display_name || u.username, subtitle: `@${u.username} · ${u.favorite_decade||""}`, url: `/profile/${u.user_id}` });
    }
    for (const g of groups) {
      const text = `${g.name} ${g.description} ${g.decade_name} ${g.category}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Group", icon: "👥", id: g.id, title: g.name, subtitle: `${g.decade_name} · ${g.member_count||0} members`, url: `/groups/${g.id}` });
    }
    for (const f of figures) {
      const text = `${f.name} ${f.title} ${f.description} ${f.decade_name} ${f.category} ${f.notable_work}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Notable Figure", icon: "⭐", id: f.id, title: f.name, subtitle: `${f.title||f.category} · ${f.decade_name}`, url: `/figures/${f.id}` });
    }
    for (const t of topics) {
      const text = `${t.title} ${t.content} ${(t.tags||[]).join(" ")} ${t.author_name} ${t.forum_name}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Forum", icon: "💬", id: t.id, title: t.title, subtitle: `${t.forum_name} · by ${t.author_name}`, url: `/forum/${t.id}` });
    }
    for (const e of events) {
      const text = `${e.title} ${e.description} ${e.decade_name} ${e.category} ${e.location_name}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Historical Event", icon: "📅", id: e.id, title: e.title, subtitle: `${e.year||""} · ${e.decade_name}`, url: `/events/${e.id}` });
    }
    for (const a of artifacts) {
      const text = `${a.title} ${a.description} ${a.decade_name} ${a.category}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Artifact", icon: "🏺", id: a.id, title: a.title, subtitle: `${a.category} · ${a.decade_name}`, url: `/artifacts/${a.id}` });
    }
    for (const m of media) {
      const text = `${m.title} ${m.description} ${m.decade_name} ${m.category} ${m.creator_name}`.toLowerCase();
      if (text.includes(query)) results.push({ type: "Media", icon: "🎬", id: m.id, title: m.title, subtitle: `${m.content_type||m.category} · ${m.decade_name}`, url: `/media/${m.id}` });
    }
  } catch (err) {
    console.error("Search error:", err);
    return Response.json({ error: String(err) }, { status: 500 });
  }

  const order = ["Decade","Notable Figure","Historical Event","Member","Post","Group","Forum","Artifact","Media"];
  results.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));

  return Response.json({ results: results.slice(0, 50), total: results.length });
}
