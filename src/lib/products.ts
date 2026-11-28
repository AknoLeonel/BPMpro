/**
 * Produtos da BPM Pro — textos das páginas e da seção Produtos da Home.
 * Fonte: "Site BPM Pro: versão 2" e apresentações "Ficha Limpa da Entidade — Selo Prata/Ouro".
 *
 * Regras: sem valores ou preços; nunca prometer aprovação; o aviso de transparência
 * aparece em todas as páginas de produto.
 */
import type { SealLevel } from "./ficha-limpa-checklist";

export type { SealLevel } from "./ficha-limpa-checklist";

/** Valor do campo "Produto" do formulário de contato. */
export const productOptions = ["Selo Prata", "Selo Ouro"] as const;
export type ProductOption = (typeof productOptions)[number];

export interface Seal {
  level: SealLevel;
  name: ProductOption;
  /** Frase curta do selo. */
  tagline: string;
  /** O que foi conferido (texto do card da Home). */
  summary: string;
  /** Status exibido na comparação. */
  status: string;
  validity: string;
  cta: string;
  href: string;
}

export const seals: Record<SealLevel, Seal> = {
  prata: {
    level: "prata",
    name: "Selo Prata",
    tagline: "Apta para receber indicação",
    summary: "Certidões e estatuto conferidos, sem pendências.",
    status: "Sobe para Ouro com o recurso",
    validity: "30 dias",
    cta: "Quero o Selo Prata",
    href: "/produtos/ficha-limpa/prata",
  },
  ouro: {
    level: "ouro",
    name: "Selo Ouro",
    tagline: "Apta para este recurso",
    summary: "Certidões, estatuto e fonte do recurso conferidos. Pronta para celebrar.",
    status: "Pronta para celebrar",
    validity: "30 dias",
    cta: "Quero o Selo Ouro",
    href: "/produtos/ficha-limpa/ouro",
  },
};

export const sealOrder: readonly SealLevel[] = ["prata", "ouro"];

/** Aviso obrigatório em todas as páginas dos produtos. */
export const transparencyNotice =
  "Os selos atestam a situação da entidade na data da conferência e valem 30 dias. São uma avaliação técnica privada da BPM Pro e não substituem certidões oficiais. A aprovação do plano de trabalho é sempre do órgão concedente.";

/** Seção Produtos da Home. */
export const homeProducts = {
  eyebrow: "Produtos",
  title: "Sua entidade pronta antes do recurso chegar.",
  subtitle:
    "Conferimos certidões, estatuto e fonte do recurso para a sua entidade não perder a parceria por um documento.",
  link: { label: "Conheça o Ficha Limpa da Entidade", href: "/produtos/ficha-limpa" },
} as const;

/** Hub /produtos. */
export const productsHub = {
  eyebrow: "Produtos",
  title: "Produtos BPM Pro",
  subtitle: "Soluções prontas para a sua entidade chegar regular e preparada a cada parceria.",
  items: [
    {
      name: "Ficha Limpa da Entidade",
      description:
        "A conferência completa do que a entidade precisa ter em dia para celebrar termo de fomento no Distrito Federal e na União, em dois níveis: Selo Prata e Selo Ouro.",
      href: "/produtos/ficha-limpa",
      cta: "Conheça o Ficha Limpa da Entidade",
    },
  ],
} as const;

/** Página /produtos/ficha-limpa (e base das páginas Prata e Ouro). */
export const fichaLimpa = {
  hero: {
    eyebrow: "Certidões para parcerias",
    title: "Ficha Limpa da Entidade",
    subtitle:
      "Tudo o que a sua entidade precisa ter em dia para celebrar termo de fomento no Distrito Federal e na União.",
    chips: ["GDF", "SEL-DF", "SECTI-DF", "Ministério do Esporte", "TCU"],
    cta: "Solicitar conferência",
  },
  pain: {
    title: "Uma certidão vencida pode travar a parceria inteira.",
    points: [
      {
        title: "Validade curta",
        text: "Muitas certidões vencem em 30 dias. Uma que vence no meio do processo derruba o envio.",
      },
      {
        title: "Certidões no CPF dos dirigentes",
        text: "Várias certidões são tiradas no CNPJ da entidade e no CPF de cada dirigente. Basta uma pendência em um deles.",
      },
      {
        title: "Estatuto inadequado",
        text: "Com estatuto inadequado, o recurso não sai, mesmo com todas as certidões em dia.",
      },
    ],
  },
  pillars: {
    title: "A conferência cobre 3 pilares",
    items: [
      {
        icon: "ClipboardCheck",
        title: "Certidões",
        text: "No CNPJ da entidade e no CPF de cada dirigente.",
      },
      {
        icon: "Stamp",
        title: "Estatuto",
        text: "Estatuto adequado ao MROSC, objeto compatível, diretoria com mandato vigente, tempo de CNPJ e registro cadastral do Ministério do Esporte.",
      },
      {
        icon: "Landmark",
        title: "Fonte do recurso",
        text: "Origem, ação orçamentária, custeio x investimento, plataforma certa e vedações da LDO.",
      },
    ],
  },
  comparison: {
    title: "Dois níveis, conforme o que já foi conferido",
    rows: [
      { label: "Frase", prata: "Apta para receber indicação", ouro: "Apta para este recurso" },
      {
        label: "O que foi conferido",
        prata: "Certidões e estatuto, sem pendências",
        ouro: "Os 3 pilares: certidões, estatuto e fonte do recurso analisada para a emenda ou programa indicado",
      },
      { label: "Status", prata: "Sobe para Ouro com o recurso", ouro: "Pronta para celebrar" },
      { label: "Validade", prata: "30 dias", ouro: "30 dias" },
    ],
  },
  checklist: {
    title: "O que conferimos",
    rulesTitle: "Antes de começar: 4 regras",
  },
  steps: {
    title: "Como funciona",
    items: [
      "A entidade tira as certidões no CNPJ e no CPF dos dirigentes.",
      "Junta tudo em um PDF único, na ordem da lista.",
      "Envia para a BPM Pro conferir.",
      "A BPM Pro concede o Selo Prata ou Ouro, válido por 30 dias.",
    ],
  },
  faq: {
    title: "Dúvidas sobre os selos",
    items: [
      {
        question: "Qual a diferença entre Prata e Ouro?",
        answer: "O Prata confere certidões e estatuto. O Ouro também analisa a fonte do recurso indicado.",
      },
      {
        question: "O selo garante a aprovação do projeto?",
        answer:
          "Não. A aprovação é sempre do órgão concedente. O selo mostra que a entidade está regular na data da conferência.",
      },
      {
        question: "Por que o selo vale 30 dias?",
        answer: "Porque muitas certidões vencem nesse prazo.",
      },
      {
        question: "Preciso tirar certidões no CPF dos dirigentes?",
        answer: "Sim. Vários órgãos exigem certidões de cada dirigente da diretoria.",
      },
      {
        question: "O selo substitui as certidões oficiais?",
        answer: "Não. Ele é uma conferência técnica da BPM Pro sobre os documentos oficiais.",
      },
    ],
  },
  finalCta: {
    title: "Vamos conferir a sua entidade?",
    subtitle: "Conte em que momento está a sua entidade. Respondemos pelo WhatsApp.",
  },
} as const;

/** Textos específicos das páginas de detalhe /prata e /ouro. */
export const sealPages: Record<SealLevel, { eyebrow: string; title: string; subtitle: string; whatsapp: string }> = {
  prata: {
    eyebrow: "Ficha Limpa da Entidade · Selo Prata",
    title: "Selo Prata: apta para receber indicação",
    subtitle:
      "Certidões e estatuto conferidos, sem pendências. Quando o recurso for indicado, a entidade sobe para o Selo Ouro.",
    whatsapp: "Olá! Quero o Selo Prata do Ficha Limpa da Entidade.",
  },
  ouro: {
    eyebrow: "Ficha Limpa da Entidade · Selo Ouro",
    title: "Selo Ouro: apta para este recurso",
    subtitle:
      "Certidões, estatuto e fonte do recurso conferidos para a emenda ou programa indicado. Pronta para celebrar.",
    whatsapp: "Olá! Quero o Selo Ouro do Ficha Limpa da Entidade.",
  },
};

/** Mensagem do WhatsApp da página principal do produto. */
export const fichaLimpaWhatsapp = "Olá! Quero solicitar a conferência Ficha Limpa da Entidade.";
