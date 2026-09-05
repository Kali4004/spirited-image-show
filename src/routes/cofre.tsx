import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Copy, Download, Eye, EyeOff, LayoutGrid, Lock, Mail, Pencil, Plus, Trash2, Info } from "lucide-react";
import { accounts, type Service } from "@/components/vault/data";
import { BrandLockup } from "@/components/vault/BrandLockup";
import { downloadVaultHtml } from "@/lib/export-vault-html";

export const Route = createFileRoute("/cofre")({
  head: () => ({
    meta: [
      { title: "Contas conectadas — Cofre do Lobo" },
      {
        name: "description",
        content:
          "Painel do Cofre do Lobo: e-mails, senhas e serviços vinculados como Steam, Discord, Rockstar e Epic Games.",
      },
      { property: "og:title", content: "Contas conectadas — Cofre do Lobo" },
      {
        property: "og:description",
        content: "Painel synthwave com seus e-mails e serviços vinculados em um só arquivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VaultPage,
});

function SecretField({ label, wide = false }: { label: string; wide?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div className={`min-w-0 ${wide ? "sm:col-span-2" : ""}`}>
      <p className="text-[11px] tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-center gap-2 rounded-lg border border-neon-violet/35 bg-background/60 px-3 py-2">
        <span className="min-w-0 flex-1 truncate text-sm tracking-[0.28em] text-foreground/80">
          {show ? "senha1234" : "••••••••••"}
        </span>
        <button
          type="button"
          aria-label={show ? "Ocultar" : "Mostrar"}
          onClick={() => setShow((v) => !v)}
          className="shrink-0 text-muted-foreground hover:text-neon-cyan"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        <button
          type="button"
          aria-label="Copiar"
          className="shrink-0 text-muted-foreground hover:text-neon-pink"
        >
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-xl border border-neon-cyan/25 bg-background/40 p-3 backdrop-blur-md">
      <div
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-xs font-black text-background"
        style={{ backgroundColor: service.color }}
        aria-hidden="true"
      >
        {service.initials}
      </div>
      <div className="min-w-0">
        <p className="truncate font-semibold">{service.name}</p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div className="min-w-0">
            <p className="text-[11px] text-muted-foreground">Usuário</p>
            <p className="truncate text-sm">{service.user}</p>
          </div>
          <SecretField label="Senha" />
          <div className="min-w-0 sm:col-span-2">
            <p className="text-[11px] text-muted-foreground">E-mail do serviço</p>
            <p className="truncate text-sm">{service.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VaultPage() {
  const totalServices = accounts.reduce((n, a) => n + a.services.length, 0);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background px-4 pb-10 md:px-8">
      <div className="neon-grid pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-30 [mask-image:linear-gradient(to_top,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/3 h-[380px] w-[380px] rounded-full bg-neon-violet/20 blur-[130px]" />

      <header className="relative z-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-border py-4">
        <BrandLockup compact />
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-neon-cyan/50 px-3 py-2 text-sm transition-colors hover:bg-neon-cyan/10">
            <LayoutGrid className="h-4 w-4 text-neon-cyan" />
            <span className="hidden sm:inline">Ícones</span>
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-xl border border-neon-pink/50 px-3 py-2 text-sm transition-colors hover:bg-neon-pink/10"
          >
            <Lock className="h-4 w-4 text-neon-pink" />
            <span className="hidden sm:inline">Bloquear</span>
          </Link>
          <button className="flex items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-4 py-2 text-sm font-bold text-primary-foreground shadow-[var(--glow-pink)]">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Baixar HTML atualizado</span>
            <span className="sm:hidden">Baixar</span>
          </button>
        </div>
      </header>

      <section className="relative z-10 grid gap-4 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:items-center">
        <div className="min-w-0">
          <h2 className="text-neon font-display text-3xl font-black sm:text-4xl">
            Contas conectadas.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {accounts.length} e-mails · {totalServices} serviços vinculados · ordem alfabética
          </p>
        </div>
        <div className="flex min-w-0 items-center gap-3 rounded-xl border border-neon-cyan/40 bg-card/40 px-4 py-3 backdrop-blur-md">
          <Info className="h-5 w-5 shrink-0 text-neon-cyan" />
          <p className="min-w-0 text-sm text-muted-foreground">
            Há alterações nesta aba. Baixe o HTML atualizado para guardá-las.
          </p>
        </div>
      </section>

      <div className="relative z-10 space-y-5">
        {accounts.map((account) => (
          <article
            key={account.email}
            className="rounded-2xl border border-neon-pink/40 bg-card/45 p-4 shadow-[var(--glow-violet)] backdrop-blur-xl sm:p-5"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-neon-pink" />
                <h3 className="truncate text-lg font-semibold sm:text-xl">{account.email}</h3>
                <span className="shrink-0 rounded-full border border-neon-violet/60 px-3 py-0.5 text-[10px] tracking-[0.2em] text-neon-cyan">
                  {account.tag}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-muted-foreground">
                <button aria-label="Editar" className="hover:text-neon-cyan">
                  <Pencil className="h-4 w-4" />
                </button>
                <button aria-label="Duplicar" className="hover:text-neon-violet">
                  <Copy className="h-4 w-4" />
                </button>
                <button aria-label="Excluir" className="hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Provedor de e-mail</p>
                <p className="mt-1 text-sm font-semibold">{account.provider}</p>
              </div>
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">Usuário</p>
                <p className="mt-1 truncate rounded-lg border border-neon-violet/35 bg-background/60 px-3 py-2 text-sm tracking-[0.28em]">
                  ••••••••••
                </p>
              </div>
              <SecretField label="Senha" />
            </div>

            <p className="mt-5 text-[10px] tracking-[0.32em] text-muted-foreground uppercase">
              Serviços vinculados
            </p>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {account.services.map((service) => (
                <ServiceCard key={service.name} service={service} />
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="relative z-10 mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <button className="flex w-fit items-center gap-2 rounded-xl bg-[image:var(--gradient-neon)] px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--glow-pink)]">
          <Plus className="h-4 w-4" />
          Adicionar e-mail
        </button>
        <p className="truncate text-xs text-muted-foreground">
          Criado por Kali404 · Feito no Brasil 🇧🇷
        </p>
      </div>
    </main>
  );
}
