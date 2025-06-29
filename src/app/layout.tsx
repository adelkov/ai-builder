import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import { AuthButton } from "../components/auth-button.tsx";

export const metadata: Metadata = {
  title: "AI App Example",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        
        <div className="flex h-screen bg-gray-950">
          {/* Sidebar */}
          <div className="flex w-64 flex-col border-r border-gray-700 bg-gray-900 justify-between">
            <div className="p-4">
              <h2 className="text-sm font-semibold text-gray-400 mb-4">Navigation</h2>
              <Link href="/" className="block rounded-lg p-3 text-left text-sm text-gray-300 hover:bg-gray-800 mb-2">Chat</Link>
              <Link href="/generate-movie" className="block rounded-lg p-3 text-left text-sm text-gray-300 hover:bg-gray-800 mb-2">🍿 Generate Movie</Link>
              <Link href="/generate-itinerary" className="block rounded-lg p-3 text-left text-sm text-gray-300 hover:bg-gray-800">✈️ Generate Itinerary</Link>
            </div>
            <div className="p-4">
              <AuthButton isAuthenticated={false} userImage={null} />
            </div>
          </div>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
