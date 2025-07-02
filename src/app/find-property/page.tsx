"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FindPropertyPage() {
  const [inputValue, setInputValue] = useState("");
  const [clipboardUrl, setClipboardUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check clipboard for a URL
  useEffect(() => {
    async function checkClipboard() {
      try {
        const text = await navigator.clipboard.readText();
        try {
          const url = new URL(text);
          setClipboardUrl(url.toString());
        } catch {
          setClipboardUrl(null);
        }
      } catch {
        setClipboardUrl(null);
      }
    }
    void checkClipboard();
    const handleFocus = () => { void checkClipboard(); };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handlePasteFromClipboard = async () => {
    if (clipboardUrl) {
      setInputValue(clipboardUrl);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form className="w-full max-w-xl bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Find Property</h1>
        <div className="relative">
          <Input
            id="property-url"
            name="property-url"
            type="url"
            className="text-lg py-6 px-4 rounded-full bg-gray-800 border-2 border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 w-full text-white placeholder:text-gray-400 pr-44"
            placeholder="Paste the property posting URL here..."
            required
            autoFocus
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <Button
            type="button"
            size="sm"
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full px-4 py-2 text-sm font-medium"
            onClick={handlePasteFromClipboard}
            disabled={!clipboardUrl}
            variant={clipboardUrl ? "default" : "secondary"}
          >
            Paste from clipboard
          </Button>
        </div>
        <Button type="submit" size="lg" className="w-full rounded-full text-lg">Find Property</Button>
      </form>
    </div>
  );
} 