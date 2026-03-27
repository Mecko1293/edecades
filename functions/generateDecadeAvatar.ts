import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const { prompt, decade, style, gender } = body;

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const result = await base44.media.generateImage({ prompt });
    return Response.json({ url: result.url, decade, style, gender });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
