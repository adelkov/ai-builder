import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { AuthButton } from "../components/auth-button.tsx";
import { Badge } from "../components/ui/badge";
import { Crown } from "lucide-react";
import { auth } from "../server/auth/index.ts";
import { TokenCounter } from "~/components/token-counter";

export const metadata: Metadata = {
  title: "AI App Example",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

import { SessionProvider } from "next-auth/react";


export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const tokens = session?.user?.tokens;
  const isAdmin = session?.user?.isAdmin;
  const userImage = session?.user?.image ?? null;

  return (
    <SessionProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="bg-pink-500">
          <div className="flex h-screen w-screen flex-col bg-gray-950">
            {/* Sidebar */}
            <div className="fixed left-0 top-0 z-50 flex w-screen flex-row justify-between border-r border-gray-700">
              <div className="flex flex-row items-center gap-2 p-4">
                {isAdmin && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 border-orange-300 bg-orange-100 px-3 py-1 text-xs font-bold text-orange-500"
                  >
                    <Crown className="size-4 text-orange-500" />
                    Admin
                  </Badge>
                )}
                <TokenCounter />
              </div>
              <div className="flex flex-col items-center gap-2 p-4">
                <AuthButton
                  isAuthenticated={isAuthenticated}
                  userImage={userImage}
                />
              </div>
            </div>
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
