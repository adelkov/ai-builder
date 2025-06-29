import { auth } from "./server/auth";
import type { Session } from "next-auth";

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
