"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { useState } from "react";
import { movieSchema, type Movie } from "../../types";

export default function GenerateMoviePage() {
  const [input, setInput] = useState("");
  const { object: movie, submit, isLoading, error } = useObject<Movie>({
    api: "/api/generate-movie",
    schema: movieSchema,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) submit({ input });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
        <input
          className="w-full rounded-lg p-4 text-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Describe your movie idea..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? "Generating..." : "Generate Movie"}
        </button>
      </form>
      {error && (
        <div className="text-red-400 mb-4">{error.message || "Something went wrong."}</div>
      )}
      {movie && (
        <div className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center border border-gray-700">
          <h2 className="text-3xl font-extrabold text-white mb-2 text-center drop-shadow-lg">{movie.title}</h2>
          <p className="text-lg text-gray-300 text-center">{movie.description}</p>
        </div>
      )}
    </div>
  );
} 