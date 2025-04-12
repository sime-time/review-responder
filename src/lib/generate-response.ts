import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { OPENAI_API_KEY } from "$env/static/private";

const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
});

export async function generateResponse(review: string, name: string, rating: number, tone: string) {
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
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system: "You are an experienced short-term rental host responding to guest reviews.",
      prompt: prompt,
      temperature: 0.7,
      maxTokens: 500,
    });
    return result;
  } catch (err) {
    console.error("Error generating response:", err);
    throw new Error("Failed to generate response");
  }
}
