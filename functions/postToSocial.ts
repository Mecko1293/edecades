import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin only' }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const { platform, content, hashtags, imageUrl } = body;

    if (!platform || !content) {
      return Response.json({ error: 'platform and content are required' }, { status: 400 });
    }

    const fullText = hashtags ? `${content}\n\n${hashtags}` : content;

    // LinkedIn posting
    if (platform === 'linkedin') {
      const { accessToken } = await base44.asServiceRole.connectors.getConnection('linkedin');

      // Get the user's LinkedIn profile ID
      const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const profileData = await profileRes.json();
      const personUrn = `urn:li:person:${profileData.sub}`;

      // Post to LinkedIn
      const postBody: any = {
        author: personUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: fullText },
            shareMediaCategory: 'NONE',
          },
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
      };

      // If image URL provided, add it
      if (imageUrl) {
        postBody.specificContent['com.linkedin.ugc.ShareContent'].shareMediaCategory = 'IMAGE';
        postBody.specificContent['com.linkedin.ugc.ShareContent'].media = [
          {
            status: 'READY',
            description: { text: content.substring(0, 200) },
            media: imageUrl,
            title: { text: 'eDecades' },
          },
        ];
      }

      const postRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify(postBody),
      });

      if (!postRes.ok) {
        const err = await postRes.text();
        return Response.json({ error: `LinkedIn error: ${err}` }, { status: 500 });
      }

      const result = await postRes.json();
      return Response.json({ ok: true, platform: 'linkedin', postId: result.id });
    }

    // Pinterest posting
    if (platform === 'pinterest') {
      const { accessToken } = await base44.asServiceRole.connectors.getConnection('pinterest');

      // Get boards
      const boardsRes = await fetch('https://api.pinterest.com/v5/boards?page_size=10', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const boardsData = await boardsRes.json();
      const boards = boardsData.items || [];

      if (boards.length === 0) {
        return Response.json({ error: 'No Pinterest boards found. Create at least one board first.' }, { status: 400 });
      }

      // Use first board or find eDecades board
      const board = boards.find((b: any) =>
        b.name.toLowerCase().includes('edecades') ||
        b.name.toLowerCase().includes('nostalgia') ||
        b.name.toLowerCase().includes('decade')
      ) || boards[0];

      const pinBody: any = {
        board_id: board.id,
        title: 'eDecades',
        description: fullText,
        link: 'https://edecades.com',
      };

      if (imageUrl) {
        pinBody.media_source = { source_type: 'image_url', url: imageUrl };
      } else {
        // Use a default eDecades image if no image provided
        pinBody.media_source = {
          source_type: 'image_url',
          url: 'https://edecades.com/og-image.jpg',
        };
      }

      const pinRes = await fetch('https://api.pinterest.com/v5/pins', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pinBody),
      });

      if (!pinRes.ok) {
        const err = await pinRes.text();
        return Response.json({ error: `Pinterest error: ${err}` }, { status: 500 });
      }

      const pinResult = await pinRes.json();
      return Response.json({ ok: true, platform: 'pinterest', pinId: pinResult.id, board: board.name });
    }

    return Response.json({ error: `Platform "${platform}" not supported for auto-posting` }, { status: 400 });

  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
