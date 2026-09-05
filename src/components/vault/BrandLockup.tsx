export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="min-w-0">
      <h1
        className={`text-neon font-display font-black uppercase tracking-[0.16em] ${
          compact ? "text-xl sm:text-2xl" : "text-3xl sm:text-5xl"
        }`}
      >
        Cofre do Lobo
      </h1>
      <div className="mt-1 flex items-center gap-2">
        <span className="h-px w-6 flex-none bg-neon-pink/70" />
        <p
          className={`truncate uppercase tracking-[0.4em] text-muted-foreground ${
            compact ? "text-[9px]" : "text-[10px] sm:text-xs"
          }`}
        >
          Seu arquivo pessoal
        </p>
        <span className="h-px w-6 flex-none bg-neon-cyan/70" />
      </div>
    </div>
  );
}

export function ForgeShareMark() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-neon-violet/50 bg-neon-violet/10 shadow-[var(--glow-violet)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"
            fill="none"
            stroke="var(--neon-pink)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M4 7.5l8 4.5 8-4.5M12 12v9"
            fill="none"
            stroke="var(--neon-cyan)"
            strokeWidth="1.2"
          />
        </svg>
      </div>
      <div className="min-w-0">
        <p className="text-neon font-display text-lg font-black tracking-wide">ForgeShare</p>
        <p className="truncate text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          Sharing what has been forged
        </p>
      </div>
    </div>
  );
}
