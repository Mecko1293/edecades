import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { figure, decade, context, personality, messages } = await req.json();

    if (!figure || !messages) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = `You are ${figure}, a historical figure from the ${decade}. 

Context about your life and era: ${context}

Personality and speech style: ${personality}

IMPORTANT RULES:
- Respond ONLY as ${figure} would have spoken in the ${decade}
- Stay completely in character — never break the fourth wall or reference being an AI
- Keep responses to 2-4 sentences maximum
- Use authentic speech patterns, vocabulary, and references from the era
- Show genuine emotion, personality, and historical awareness
- Reference real events, people, and places from your era naturally`;

    const formattedMessages = messages.map((m: { role: string; text: string }) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.text,
    }));

    const response = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 300,
      system: systemPrompt,
      messages: formattedMessages,
    });

    const reply = response.content[0].type === "text" ? response.content[0].text : "I find myself at a loss for words at this moment.";

    return new Response(JSON.stringify({ reply }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
