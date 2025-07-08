"use client"

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useCompletion } from "@ai-sdk/react";

export default function HomePage() {
  const { completion, input, handleInputChange, handleSubmit, isLoading, stop, setInput, setCompletion } = useCompletion({
    api: "/api/find-address",
  });

  // Reset function to allow another search
  function handleReset() {
    setInput("");
    setCompletion("");
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        aria-hidden="true"
      />
      {/* Blurred overlay */}
      <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-md" />
      {/* Hero content */}
      <main className="relative z-20 flex w-full max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
        {(!isLoading && !completion) ? (
          <>
            <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
              Find Any Property From a Listing URL
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-white/80 md:text-xl">
              Paste a property listing URL (even if it doesn&apos;t show the exact
              address). Our AI will analyze the details and find the location on the
              map for you.
            </p>
            <form
              className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
              onSubmit={handleSubmit}
            >
              <Input
                value={input}
                onChange={handleInputChange}
                type="url"
                placeholder="https://ingatlan.com/1234567890"
                className="min-w-0 flex-1 rounded-xl border-none bg-white/60 px-6 py-4 text-lg shadow-lg placeholder:text-gray-500 focus:bg-white/80 focus:placeholder:text-gray-400"
                required
              />
              <Button
                type="submit"
                className="rounded-xl px-8 py-4 text-lg font-semibold shadow-lg"
                disabled={!input}
              >
                Find
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full">
            <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl px-8 py-12 w-full">
              <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">Property Address</h2>
              <div className="text-2xl md:text-4xl font-mono text-center text-gray-800 break-words min-h-[3em]">
                {completion}
                {isLoading && <span className="animate-pulse text-gray-400">|</span>}
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-8"
              onClick={handleReset}
              disabled={isLoading}
            >
              Try another
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
