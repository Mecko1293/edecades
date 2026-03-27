Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const { prompt, decade, style, gender } = body;

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const appId = Deno.env.get("BASE44_APP_ID") || "";
    const apiKey = Deno.env.get("BASE44_API_KEY") || "";

    const response = await fetch(`https://api.base44.com/api/apps/${appId}/integrations/generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api_key": apiKey,
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Image gen error:", err);
      return Response.json({ error: `Image generation failed: ${err}` }, { status: 500 });
    }

    const data = await response.json();
    return Response.json({ url: data.url, decade, style, gender });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});
