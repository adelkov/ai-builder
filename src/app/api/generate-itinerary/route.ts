import { withAuth } from "../../../utils";
import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { travelItinerarySchema } from "../../../types";

export const POST = withAuth(async (_session, req) => {
  const { days, budget, origin, preferences }: { days: number; budget: string; origin: string; preferences: string } = await req.json();
  const systemPrompt = `Generate a detailed travel itinerary card. The user wants to travel from ${origin} for ${days} days, with a budget of ${budget}. Preferences: ${preferences}. Return a destination, days, budget, origin, and a detailed itinerary as a string.`;

  return streamObject({
    model: openai("gpt-4o"),
    schema: travelItinerarySchema,
    prompt: systemPrompt,
  }).toTextStreamResponse();
}); 