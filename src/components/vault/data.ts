export type Service = {
  name: string;
  user: string;
  email: string;
  color: string;
  initials: string;
};

export type EmailAccount = {
  email: string;
  tag: string;
  provider: string;
  services: Service[];
};

export const accounts: EmailAccount[] = [
  {
    email: "kali404@exemplo.com",
    tag: "JOGOS",
    provider: "Gmail",
    services: [
      {
        name: "Rockstar Games",
        user: "Kali404",
        email: "kali404@exemplo.com",
        color: "oklch(0.82 0.17 85)",
        initials: "R★",
      },
      {
        name: "Epic Games",
        user: "Kali404",
        email: "kali404@exemplo.com",
        color: "oklch(0.85 0.02 300)",
        initials: "EG",
      },
    ],
  },
  {
    email: "luiz@email.com",
    tag: "PESSOAL",
    provider: "Gmail",
    services: [
      {
        name: "Steam",
        user: "luizgamerbr",
        email: "luiz@email.com",
        color: "oklch(0.72 0.1 240)",
        initials: "ST",
      },
      {
        name: "Discord",
        user: "luizgamerbr",
        email: "luiz@email.com",
        color: "oklch(0.65 0.19 275)",
        initials: "DC",
      },
    ],
  },
].sort((a, b) => a.email.localeCompare(b.email));
