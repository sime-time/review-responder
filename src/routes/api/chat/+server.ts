import { createOpenAI } from "@ai-sdk/openai";
import { OPENAI_API_KEY } from "$env/static/private";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { generateText } from "ai";

const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
});

export const POST: RequestHandler = async ({ request }) => {
  const { review, name, rating, tone } = await request.json();

  const prompt = `
Write a thoughtful response to the following review.

REVIEW:
${review}

REVIEWER NAME: ${name}

RATING OUT OF 5: ${rating.toString()}

TONE: ${tone}

Guidelines:
- Be authentic and personalized
- Don't make it like a letter and start with Dear...,
- Keep it brief and concise
- Address specific points mentioned in the review
- Thank the guest for their feedback
- If there are criticisms, acknowledge them respectfully
- Keep the response concise but thorough
- Maintain the specified tone(s): ${tone}
- End with an invitation to return
`;

  try {
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: "You are an experienced short-term rental host responding to guest reviews.",
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 500,
    });
    return json({ response: result });

  } catch (error) {
    console.error("Error:", error);
    return json({ error: "Failed to generate response" }, { status: 500 });
  }
};
