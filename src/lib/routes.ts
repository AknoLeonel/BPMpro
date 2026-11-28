/**
 * Mapa do site — fonte única das rotas (menu, rodapé, sitemap e "Em breve").
 * Documento "Site BPM Pro: versão 2", item 1.
 */

// Stryker disable all: conteúdo editorial (textos, listas e rotas), sem lógica — mutar strings aqui não testa comportamento.

export const routes = {
  home: "/",
  services: "/servicos",
  products: "/produtos",
  fichaLimpa: "/produtos/ficha-limpa",
  fichaLimpaPrata: "/produtos/ficha-limpa/prata",
  fichaLimpaOuro: "/produtos/ficha-limpa/ouro",
  howItWorks: "/como-funciona",
  about: "/sobre",
  projects: "/projetos",
  faq: "/duvidas",
  contact: "/contato",
  card: "/cartao",
  privacy: "/politica-de-privacidade",
  restrictedArea: "/area-restrita",
  management: "/gestao",
  verifySeal: "/verificar-selo",
} as const;

export interface NavLink {
  href: string;
  label: string;
}

/** Menu principal (o botão "Área restrita" e o WhatsApp ficam à direita, fora desta lista). */
export const mainNav: readonly NavLink[] = [
  { href: routes.services, label: "Serviços" },
  { href: routes.products, label: "Produtos" },
  { href: routes.howItWorks, label: "Como funciona" },
  { href: routes.projects, label: "Projetos" },
  { href: routes.about, label: "Sobre" },
  { href: routes.contact, label: "Contato" },
];

export const restrictedAreaLink: NavLink = { href: routes.restrictedArea, label: "Área restrita" };

/** Rotas reservadas para a fase com back-end: mostram "Em breve" e não são indexadas. */
export const upcomingRoutes = {
  restrictedArea: {
    href: routes.restrictedArea,
    title: "Área restrita",
    description:
      "Em breve, os dirigentes das entidades vão acompanhar aqui o status do selo, enviar certidões e documentos e consultar os seus projetos.",
  },
  management: {
    href: routes.management,
    title: "Gestão",
    description: "Em breve, o painel interno dos gestores de projetos da BPM Pro.",
  },
  verifySeal: {
    href: routes.verifySeal,
    title: "Verificar selo",
    description:
      "Em breve, qualquer pessoa vai poder conferir aqui a validade de um Selo Ficha Limpa BPM Pro pelo código ou pelo QR Code.",
  },
} as const;

/** Páginas públicas indexáveis (sitemap). */
export const publicPages: readonly {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: routes.home, priority: 1, changeFrequency: "weekly" },
  { path: routes.services, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.products, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.fichaLimpa, priority: 0.9, changeFrequency: "monthly" },
  { path: routes.fichaLimpaPrata, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.fichaLimpaOuro, priority: 0.8, changeFrequency: "monthly" },
  { path: routes.howItWorks, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.about, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.projects, priority: 0.6, changeFrequency: "monthly" },
  { path: routes.faq, priority: 0.6, changeFrequency: "monthly" },
  { path: routes.contact, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.card, priority: 0.5, changeFrequency: "monthly" },
  { path: routes.privacy, priority: 0.3, changeFrequency: "yearly" },
];
