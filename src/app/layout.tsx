import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import { AuthButton } from "../components/auth-button.tsx";
import { Badge } from "../components/ui/badge";
import { Crown } from "lucide-react";
import { auth } from "../server/auth/index.ts";

export const metadata: Metadata = {
  title: "AI App Example",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user?.isAdmin;
  const userImage = session?.user?.image ?? null;

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        
        <div className="flex h-screen bg-gray-950">
          {/* Sidebar */}
          <div className="flex w-64 flex-col border-r border-gray-700 bg-gray-900 justify-between">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-gray-400 mb-4">Navigation</h2>
              <Link href="/" className="block rounded-lg p-3 text-left text-sm text-gray-300 hover:bg-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">💬</span>
                Chat
              </Link>
              <Link href="/generate-movie" className="block rounded-lg p-3 text-left text-sm text-gray-300 hover:bg-gray-800 mb-2 flex items-center gap-2">
                <span className="text-xl">🍿</span>
                Generate Movie
              </Link>
              <Link href="/generate-itinerary" className="block rounded-lg p-3 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                <span className="text-xl">✈️</span>
                Generate Itinerary
              </Link>
              <Link href="/find-property" className="block rounded-lg p-3 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2">
                <span className="text-xl">📍</span>
                Find Property
              </Link>
            </div>
            <div className="p-4 flex flex-col items-center gap-2">
              {isAdmin && (
                <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-yellow-500 bg-yellow-100 border-yellow-300">
                  <Crown className="size-4 text-yellow-500" />
                  Admin
                </Badge>
              )}
              <AuthButton isAuthenticated={isAuthenticated} userImage={userImage} />
            </div>
          </div>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
