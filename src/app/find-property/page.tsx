import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FindPropertyPage() {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form className="w-full max-w-xl bg-gray-900 p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Find Property</h1>
        <div>
          <Input
            id="property-url"
            name="property-url"
            type="url"
            className="text-lg py-6 px-4 rounded-full bg-gray-800 border-2 border-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/30 w-full text-white placeholder:text-gray-400"
            placeholder="Paste the property posting URL here..."
            required
            autoFocus
          />
        </div>
        <Button type="submit" size="lg" className="w-full rounded-full text-lg">Find Property</Button>
      </form>
    </div>
  );
} 