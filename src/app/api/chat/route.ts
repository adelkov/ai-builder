import { openai } from "@ai-sdk/openai";
import { streamText, type Message } from "ai";
import { redis } from "../../../server/redis/redis";
import { withAuth } from "../../../utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const POST = withAuth(async (session, req) => {
  console.log(process.env.OPENAI_API_KEY);
  // Rate limiting: one request per user per day
  const userId = session.user.id;
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const redisKey = `rate_limit:${userId}:${today}`;

  // Only apply rate limiting if not in development environment
  if (process.env.NODE_ENV !== "development") {
    const currentCount = await redis.incr(redisKey);
    if (currentCount === 1) {
      // Set expiry to 24h (or until end of day)
      await redis.expire(redisKey, 60 * 60 * 24);
    }
    if (currentCount > 1) {
      return new Response(
        JSON.stringify({
          error:
            "Please pay for this service. Only one request per day is allowed.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }

  const { messages } = (await req.json()) as { messages: Message[] };

  const result = streamText({
    model: openai("gpt-4.1-nano"),
    messages,
  });

  return result.toDataStreamResponse();
});
