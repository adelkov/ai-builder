import { openai } from "@ai-sdk/openai";
import { streamText, type Message } from "ai";
import { withAuth, withRateLimit } from "../../../utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const POST = withAuth(
  withRateLimit(
    async (session, req) => {
      const { messages } = (await req.json()) as { messages: Message[] };
      const result = streamText({
        model: openai("gpt-4o"),
        messages,
      });
      return result.toDataStreamResponse();
    },
    {
      key: (session) => session.user.id  + "chat",
      windowSeconds: 60 * 60 * 24, // 1 day
      limit: 1,
      message: "Please pay for this service. Only one request per day is allowed.",
    }
  )
);
