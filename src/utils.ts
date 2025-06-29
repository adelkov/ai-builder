import { auth } from "./server/auth";
import type { Session } from "next-auth";
import { redis } from "./server/redis/redis";

/**
 * Wrap an API route handler to require authentication.
 * If the user is not authenticated, returns a 401 response.
 * Otherwise, calls the handler with the session and request.
 */
export function withAuth(
  handler: (session: Session, req: Request) => Promise<Response>
) {
  return async function (req: Request) {
    const session = await auth();
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return handler(session, req);
  };
}

type RateLimitConfig = {
  key: (session: Session, req: Request) => string;
  windowSeconds: number;
  limit: number;
  message: string;
};

export function withRateLimit(
  handler: (session: Session, req: Request) => Promise<Response>,
  config: RateLimitConfig
) {
  return async (session: Session, req: Request) => {
    const key = config.key(session, req);
    const redisKey = `rate_limit:${key}`;
    const currentCount = await redis.incr(redisKey);
    if (currentCount === 1) {
      await redis.expire(redisKey, config.windowSeconds);
    }
    if (currentCount > config.limit) {
      return new Response(
        JSON.stringify({ error: config.message }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return handler(session, req);
  };
}
