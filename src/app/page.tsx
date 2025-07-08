"use client";

import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useCompletion } from "@ai-sdk/react";
import { useSession } from "next-auth/react";
import posthog from "posthog-js";

export default function HomePage() {
  const { update } = useSession();
  const {
    completion,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
    setCompletion,
  } = useCompletion({
    api: "/api/find-address",
    onFinish: () => {
      void update();
    },
  });

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    posthog.capture("find_address");
    e.preventDefault();
    void handleSubmit();
  };

  // Reset function to allow another search
  function handleReset() {
    posthog.capture("try_another");
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
        {!isLoading && !completion ? (
          <>
            <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
              Find Any Property From a Listing URL
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-white/80 md:text-xl">
              Paste a property listing URL (even if it doesn&apos;t show the
              exact address). Our AI will analyze the details and find the
              location on the map for you.
            </p>
            <form
              className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
              onSubmit={submitForm}
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
          <div className="flex w-full flex-col items-center justify-center">
            <div className="w-full rounded-2xl bg-white/60 px-8 py-12 shadow-2xl backdrop-blur-md">
              <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
                Property Address
              </h2>
              <div className="min-h-[3em] break-words text-center font-mono text-2xl text-gray-800 md:text-4xl">
                {completion}
                {isLoading && (
                  <span className="animate-pulse text-gray-400">|</span>
                )}
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
