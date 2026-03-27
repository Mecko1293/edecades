import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const { prompt, decade, style, gender } = body;

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Use the integrations endpoint for image generation
    const result = await base44.integrations.generateImage({ prompt });
    return Response.json({ url: result.url, decade, style, gender });
  } catch (error) {
    console.error("Avatar generation error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});
