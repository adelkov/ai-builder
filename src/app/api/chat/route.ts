import { openai } from "@ai-sdk/openai";
import { streamText, type Message } from "ai";
import { auth } from "../../../server/auth";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages } = (await req.json()) as { messages: Message[] };

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
