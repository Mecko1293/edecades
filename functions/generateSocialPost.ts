import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export default async function generateSocialPost(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  try {
    const { decade, topic, site, site_url } = await req.json();

    if (!decade || !topic || !site) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const prompt = `Generate a unique, engaging social media post about ${topic} in the ${decade}. 
Make it nostalgic, fun, and educational. Include 3-5 relevant hashtags for social media.
Keep it under 280 characters for Twitter/LinkedIn compatibility.
Reference ${site} (${site_url}) naturally if it fits.
Format: [Post text] [Hashtags]`;

    const message = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const postText =
      message.content[0].type === "text" ? message.content[0].text : "";

    return new Response(
      JSON.stringify({
        decade,
        topic,
        post: postText,
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating social post:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate post" }),
      { status: 500 }
    );
  }
}
