import { openai } from "@ai-sdk/openai";
import { streamText, type Message } from "ai";
import { auth } from "../../../server/auth";
import { redis } from "../../../server/redis/redis";

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

  // Rate limiting: one request per user per day
  const userId = session.user.id;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const redisKey = `rate_limit:${userId}:${today}`;
  const currentCount = await redis.incr(redisKey);
  if (currentCount === 1) {
    // Set expiry to 24h (or until end of day)
    await redis.expire(redisKey, 60 * 60 * 24);
  }
  if (currentCount > 1) {
    return new Response(
      JSON.stringify({ error: "Please pay for this service. Only one request per day is allowed." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { messages } = (await req.json()) as { messages: Message[] };

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
  });

  return result.toDataStreamResponse();
}
