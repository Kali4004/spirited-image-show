import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Lock, ArrowRight, FileText } from "lucide-react";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { BrandLockup, ForgeShareMark } from "@/components/vault/BrandLockup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cofre do Lobo — Seu arquivo pessoal de senhas" },
      {
        name: "description",
        content:
          "Cofre do Lobo: e-mails, senhas e serviços vinculados em um único HTML. Crie sua senha mestra e use offline.",
      },
      { property: "og:title", content: "Cofre do Lobo — Seu arquivo pessoal" },
      {
        property: "og:description",
        content: "E-mails, senhas e serviços vinculados em um único HTML, com visual synthwave.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LockScreen,
});

function PasswordField({ label, id }: { label: string; id: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="text-sm text-foreground/90">
        {label}
      </label>
      <div className="mt-1.5 flex items-center gap-2 rounded-xl border border-neon-violet/40 bg-background/60 px-3 py-2.5 transition-shadow focus-within:border-neon-pink/70 focus-within:shadow-[var(--glow-violet)]">
        <Lock className="h-4 w-4 shrink-0 text-neon-violet" />
        <input
          id={id}
          type={show ? "text" : "password"}
          defaultValue="senha1234"
          className="min-w-0 flex-1 bg-transparent text-sm tracking-[0.25em] outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          aria-label={show ? "Ocultar senha" : "Mostrar senha"}
          onClick={() => setShow((v) => !v)}
          className="shrink-0 text-muted-foreground transition-colors hover:text-neon-cyan"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

function LockScreen() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-dvh flex-col overflow-hidden bg-background px-4 py-4 md:h-dvh md:px-8 lg:px-12">
      <div className="neon-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-40 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-neon-violet/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[380px] w-[380px] rounded-full bg-neon-pink/20 blur-[130px]" />

      <header className="relative z-10">
        <BrandLockup />
      </header>

      <div className="relative z-10 grid flex-1 items-center gap-6 py-6 lg:grid-cols-[1fr_auto_minmax(0,420px)] lg:gap-8">
        <section className="min-w-0">
          <h2 className="font-display text-3xl leading-tight font-black sm:text-4xl">
            <span className="text-neon">Suas contas.</span>
            <br />
            <span className="text-neon">Só suas.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
            E-mails, senhas e serviços vinculados em um único HTML. Crie sua senha mestra para
            começar.
          </p>
        </section>

        <div className="mx-auto w-[70%] max-w-[300px] lg:w-[340px] lg:max-w-none">
          <AnimatedLogo />
        </div>

        <section className="min-w-0">
          <div className="rounded-2xl border border-neon-violet/40 bg-card/50 p-5 shadow-[var(--glow-violet)] backdrop-blur-xl sm:p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-neon-pink/50 bg-neon-pink/10">
                <Lock className="h-4 w-4 text-neon-pink" />
              </div>
              <p className="truncate text-xs tracking-[0.32em] uppercase">Senha mestra</p>
            </div>
            <div className="my-4 h-px bg-border" />
            <div className="space-y-4">
              <PasswordField id="master" label="Crie sua senha mestra" />
              <PasswordField id="master-repeat" label="Repita a senha mestra" />
              <button
                onClick={() => navigate({ to: "/cofre" })}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[image:var(--gradient-neon)] px-5 py-3 font-display text-sm font-black tracking-wide text-primary-foreground shadow-[var(--glow-pink)] transition-transform hover:scale-[1.02]"
              >
                Criar meu arquivo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      </div>

      <footer className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-t border-border pt-4">
        <div className="flex min-w-0 items-start gap-3">
          <FileText className="mt-0.5 h-5 w-5 shrink-0 text-neon-violet" />
          <div className="min-w-0 text-xs leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">Abra no navegador. Use sem internet.</p>
            <p>Depois de editar, baixe o HTML atualizado.</p>
            <p className="mt-1">
              Versão 1.0 · Projeto de estudo, sem auditoria de segurança. · Criado por Kali404 —
              Feito no Brasil 🇧🇷
            </p>
          </div>
        </div>
        <ForgeShareMark />
      </footer>
    </main>
  );
}
