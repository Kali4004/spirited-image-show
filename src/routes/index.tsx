import { createFileRoute } from "@tanstack/react-router";
import { AnimatedLogo } from "@/components/AnimatedLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEON WOLF — Logo animada synthwave" },
      {
        name: "description",
        content:
          "Logo animada de lobo neon em estilo synthwave: triângulo pulsante, grade retrô e brilho magenta em movimento.",
      },
      { property: "og:title", content: "NEON WOLF — Logo animada synthwave" },
      {
        property: "og:description",
        content:
          "Logo animada de lobo neon em estilo synthwave: triângulo pulsante, grade retrô e brilho magenta em movimento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 py-20">
      <div className="neon-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-neon-pink/20 blur-[120px]" />

      <div className="relative flex flex-col items-center">
        <AnimatedLogo />

        <h1 className="text-neon mt-6 font-display text-5xl font-black tracking-[0.28em] sm:text-7xl">
          NEON WOLF
        </h1>
        <p className="mt-4 max-w-md text-center text-lg tracking-[0.3em] text-muted-foreground uppercase">
          Howl in the synthwave
        </p>
      </div>
    </main>
  );
}
