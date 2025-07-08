"use client";

import { Badge } from "./ui/badge";
import { Coins } from "lucide-react";
import { useSession } from "next-auth/react";

export function TokenCounter() {
  const { data: session } = useSession();
  const tokens = session?.user?.tokens;
  return (
    <Badge
      variant="secondary"
      className="flex items-center gap-1 border-yellow-300 bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-500"
    >
      <Coins className="size-4 text-yellow-500" />
      {tokens} tokens
    </Badge>
  );
}
