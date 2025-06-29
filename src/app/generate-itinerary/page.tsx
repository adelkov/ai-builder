"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useState } from "react";
import { travelItinerarySchema, type TravelItinerary } from "../../types";

export default function GenerateItineraryPage() {
  const [days, setDays] = useState(5);
  const [budget, setBudget] = useState("");
  const [origin, setOrigin] = useState("");
  const [preferences, setPreferences] = useState("");
  const { object: itinerary, submit, isLoading, error } = useObject<TravelItinerary>({
    api: "/api/generate-itinerary",
    schema: travelItinerarySchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ days, budget, origin, preferences });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-8 space-y-4">
        <input
          className="w-full rounded-lg p-4 text-lg bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Origin location"
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          disabled={isLoading}
        />
        <input
          type="number"
          min={1}
          className="w-full rounded-lg p-4 text-lg bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Number of days"
          value={days}
          onChange={e => setDays(Number(e.target.value))}
          disabled={isLoading}
        />
        <input
          className="w-full rounded-lg p-4 text-lg bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Budget (e.g. $1000, low, medium, high)"
          value={budget}
          onChange={e => setBudget(e.target.value)}
          disabled={isLoading}
        />
        <input
          className="w-full rounded-lg p-4 text-lg bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Preferences (e.g. beach, adventure, food)"
          value={preferences}
          onChange={e => setPreferences(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>
      {error && (
        <div className="text-red-400 mb-4">{error.message || "Something went wrong."}</div>
      )}
      {itinerary && (
        <div className="bg-blue-900 rounded-xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center border border-blue-700">
          <h2 className="text-2xl font-extrabold text-white mb-2 text-center drop-shadow-lg">{itinerary.destination}</h2>
          <p className="text-lg text-blue-200 text-center mb-2">From: {itinerary.origin} | {itinerary.days} days | Budget: {itinerary.budget}</p>
          <p className="text-base text-blue-100 text-center whitespace-pre-line">{itinerary.details}</p>
        </div>
      )}
    </div>
  );
} 