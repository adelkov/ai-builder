import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default async function HomePage() {
  // No auth logic needed for placeholder UI
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
        <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-lg md:text-5xl">
          Find Any Property From a Listing URL
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-white/80 md:text-xl">
          Paste a property listing URL (even if it doesn&apos;t show the exact
          address). Our AI will analyze the details and find the location on the
          map for you.
        </p>
        <form className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          <Input
            type="url"
            placeholder="https://ingatlan.com/1234567890"
            className="min-w-0 flex-1 rounded-xl border-none bg-white/80 px-6 py-4 text-lg shadow-lg placeholder:text-gray-500 focus:bg-white focus:placeholder:text-gray-400"
            required
            disabled
          />
          <Button
            type="submit"
            className="rounded-xl px-8 py-4 text-lg font-semibold shadow-lg"
            disabled
          >
            Find
          </Button>
        </form>
      </main>
    </div>
  );
}
