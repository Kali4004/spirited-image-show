import wolfMark from "@/assets/wolf-mark.png";

type Props = {
  className?: string;
};

export function AnimatedLogo({ className = "" }: Props) {
  return (
    <div className={`relative aspect-square w-full max-w-[520px] ${className}`}>
      {/* Neon glow halo */}
      <div className="pointer-events-none absolute inset-[12%] rounded-full bg-neon-violet/25 blur-3xl animate-neon-pulse" />

      {/* Rotating outer ring */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-spin-slow opacity-70"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="var(--neon-violet)"
          strokeWidth="0.6"
          strokeDasharray="14 10 3 10"
        />
      </svg>

      {/* Neon triangle + retro horizon */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full animate-neon-pulse"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="tri" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--neon-pink)" />
            <stop offset="60%" stopColor="var(--neon-violet)" />
            <stop offset="100%" stopColor="var(--neon-cyan)" />
          </linearGradient>
          <clipPath id="triClip">
            <polygon points="100,172 22,36 178,36" />
          </clipPath>
        </defs>

        <g clipPath="url(#triClip)" opacity="0.85">
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={i}
              x1="22"
              x2="178"
              y1={44 + i * 12}
              y2={44 + i * 12}
              stroke="var(--neon-cyan)"
              strokeWidth="0.7"
              opacity={0.5 - i * 0.05}
            />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={30 + i * 17.5}
              x2={100}
              y1="36"
              y2="172"
              stroke="var(--neon-violet)"
              strokeWidth="0.5"
              opacity="0.35"
            />
          ))}
        </g>

        <polygon
          points="100,172 22,36 178,36"
          fill="none"
          stroke="url(#tri)"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
        <polygon
          points="100,172 22,36 178,36"
          fill="none"
          stroke="var(--neon-pink)"
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeDasharray="26 374"
          className="animate-dash-run"
        />
      </svg>

      {/* Wolf mark */}
      <div className="absolute inset-[13%] animate-logo-float">
        <div className="relative h-full w-full animate-flicker">
          <img
            src={wolfMark}
            alt="Logo: cabeça de lobo em neon roxo e magenta"
            width={1024}
            height={1024}
            className="h-full w-full object-contain drop-shadow-[0_0_28px_oklch(0.68_0.29_335/0.55)]"
          />
          {/* Scanline sweep */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-scan h-[14%] w-full bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
