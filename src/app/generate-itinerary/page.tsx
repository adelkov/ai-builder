"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useState } from "react";
import {
  travelItineraryResponseSchema,
  type TravelItineraryRequest,
} from "../../types";


export default function GenerateItineraryPage() {
  const [{ days, budget, origin, details, preferences }, setDetails] =
    useState<TravelItineraryRequest>({
      days: 0,
      budget: "",
      origin: "",
      preferences: "",
      details: "",
    });

  const { object: itinerary, submit, isLoading, error } = useObject({
    api: "/api/generate-itinerary",
    schema: travelItineraryResponseSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ days, budget, origin, preferences });
  };

  const onChange = (key: keyof TravelItineraryRequest, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 p-4">
      {!itinerary && <form onSubmit={handleSubmit} className="w-full max-w-md mb-8 space-y-4">
        <input
          className="w-full rounded-lg p-4 text-lg bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Origin location"
          value={origin}
          onChange={(e) => onChange("origin", e.target.value)}
          disabled={isLoading}
        />
        <input
          type="number"
          min={1}
          className="w-full rounded-lg p-4 text-lg bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Number of days"
          value={days}
          onChange={(e) => onChange("days", e.target.value)}
          disabled={isLoading}
        />
        <input
          className="w-full rounded-lg p-4 text-lg bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Budget (e.g. $1000, low, medium, high)"
          value={budget}
          onChange={(e) => onChange("budget", e.target.value)}
          disabled={isLoading}
        />
        <input
          className="w-full rounded-lg p-4 text-lg bg-blue-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Preferences (e.g. beach, adventure, food)"
          value={preferences}
          onChange={(e) => onChange("preferences", e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Itinerary"}
        </button>
      </form>}
      {error && (
        <div className="text-red-400 mb-4">{error.message || "Something went wrong."}</div>
      )}
      {itinerary && (
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full flex flex-col items-center border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <span role="img" aria-label="origin">🌍</span> {itinerary.origin}
            <span className="mx-2 text-gray-400">→</span>
            <span role="img" aria-label="destination">🏖️</span> {itinerary.destination}
          </h2>
          <div className="flex flex-wrap gap-4 mb-4 w-full justify-center">
            <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-1 text-gray-700 border border-gray-200">
              <span role="img" aria-label="budget">💸</span> <span className="font-medium">Budget:</span> {itinerary.budget}
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded px-3 py-1 text-gray-700 border border-gray-200">
              <span role="img" aria-label="details">📝</span> <span className="font-medium">Details:</span> {itinerary.details}
            </div>
          </div>
          <div className="w-full">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 mt-2">Itinerary</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {(itinerary.program ?? []).map((day, i) => (
                <div key={i} className="min-w-[260px] bg-gray-50 rounded-lg p-4 shadow border border-gray-200 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span role="img" aria-label="calendar">📅</span>
                    <span className="text-lg font-bold text-gray-800">Day {day?.day ?? i + 1}</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {(day?.activities ?? []).map((activity, j) => (
                      <li key={j} className="bg-white rounded p-3 flex flex-col gap-1 border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-800">{activity?.name ?? "Activity"}</span>
                          <span className="text-xs text-gray-500">({activity?.time ?? ""})</span>
                        </div>
                        <div className="text-gray-700 text-sm">{activity?.description ?? ""}</div>
                        <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><span role="img" aria-label="location">📍</span>{activity?.location ?? ""}</span>
                          <span className="flex items-center gap-1"><span role="img" aria-label="cost">💲</span>{activity?.costInUSD != null ? activity.costInUSD + " USD" : ""}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 