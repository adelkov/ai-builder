import { withAuth } from "../../../utils";
import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { movieSchema } from "../../../types";

export const POST = withAuth(async (_session, req) => {
  const { input }: { input: string } = await req.json();
  const systemPrompt = `Generate a catchy movie title with a short description for the plot based on user input. User input: ${input}`;

  return streamObject({
    model: openai("gpt-4o"),
    schema: movieSchema,
    prompt: systemPrompt,
  }).toTextStreamResponse();
}); 