import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { withAuth, withRateLimit } from "../../../utils";
import { z } from "zod";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const POST = withAuth(
  withRateLimit(
    async (session, req) => {
      const { prompt } = (await req.json()) as { prompt: string };
      if (session.user.tokens <= 0) {
        return new Response("No tokens", { status: 402 });
      }
      await db.update(users).set({ tokens: session.user.tokens - 1 }).where(eq(users.id, session.user.id));
      const result = streamText({
        model: openai("gpt-4o"),
        system: `
        You are a helpful assistant that can find the address of a property from a listing URL.
        `,
        tools: {
          findAddress: {
            description: "Find the address of a property from a listing URL",
            parameters: z.object({
              url: z.string(),
            }),
            execute: async ({ url }) => {
              console.log("FIND ADDRESS", url);
              return {
                address: "123 Main St, Anytown, USA, 12345, 37.774929, -122.419416",
              };
            },
          },
        },
        prompt: `
        The user will provide a listing URL. You need to find the address of the property based on the provided the URL.
        The address should be in the following format: COUNTRY, CITY, STREET, STREET_NUMBER, ZIP_CODE, LATITUDE, LONGITUDE
        Respond with the address only, no other text. Always respond to the user
        If you can't find the address, respond with "No address found".
        This is the URL: ${prompt}
        `,
        maxSteps: 3,
      });
      return result.toDataStreamResponse();
    },
    {
      key: (session) => session.user.id + "chat",
      windowSeconds: 60 * 60 * 24, // 1 day
      limit: 1,
      message:
        "Please pay for this service. Only one request per day is allowed.",
    },
  ),
);
