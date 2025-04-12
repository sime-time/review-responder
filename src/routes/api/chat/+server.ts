import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { OPENAI_API_KEY } from "$env/static/private";

const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function POST({ request }) {
  const { name, review, rating, tone } = await request.json();
  const prompt = `
Write a thoughtful response to the following review.

REVIEW:
${review}

REVIEWER NAME: ${name}

RATING OUT OF 5: ${rating.toString()}

TONE: ${tone}

Guidelines:
- Be authentic and personalized
- Address specific points mentioned in the review
- Thank the guest for their feedback
- If there are criticisms, acknowledge them respectfully
- Keep the response concise but thorough
- Maintain the specified tone(s): ${tone}
- End with an invitation to return
`;

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: "You are an experienced short-term rental host responding to a guest reviews.",
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 500,
    });
    return result.toDataStreamResponse();
  } catch (err) {
    console.error("Error generating response:", err);
    throw new Error("Failed to generate response");
  }
}
