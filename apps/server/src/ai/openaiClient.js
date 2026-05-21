import OpenAI from "openai";

let client;

function getClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

export async function askOpenAI(prompt) {
  const openai = getClient();
  if (!openai) {
    return {
      ok: true,
      response: "AI route is ready. Add an OpenAI API key to enable live reasoning."
    };
  }

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are LUZA, a calm futuristic desktop assistant. Reply in one short sentence."
      },
      { role: "user", content: prompt }
    ]
  });

  return {
    ok: true,
    response: completion.choices[0]?.message?.content || "Request acknowledged."
  };
}
