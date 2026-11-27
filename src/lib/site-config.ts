/**
 * Conteúdo do site — documento "Site bpmpro.com.br: esqueleto e conteúdo".
 *
 * Regras do documento:
 * - textos provisórios até a aprovação da marca;
 * - não exibir valores, nomes de parlamentares ou partidos;
 * - nunca prometer aprovação;
 * - números, depoimentos e CNPJ ficam ocultos até a liberação (ver `visibility`);
 * - fotos de entidades só com autorização.
 *
 * Contatos (telefone, WhatsApp, endereço) são provisórios — substitua pelos dados reais.
 *
 * Números de autoridade, órgãos, fontes de recurso e projetos ficam em `numbers.ts`.
 */
import { hasVisibleProjects, sportsSpecialistText } from "./numbers";

export const siteConfig = {
  name: "BPM Pro",
  shortName: "BPM",
  fullName: "Brasil Projetos em Movimento",
  tagline: "Você cuida do esporte. A gente cuida do projeto.",
  summary: "Projetos com recursos públicos de ponta a ponta. Esporte, cultura e turismo.",
  description:
    "Projetos com recursos públicos de ponta a ponta para entidades esportivas, culturais e sociais: captação, elaboração, execução, eventos, licitações e prestação de contas.",
  seoTitle: "Brasil Projetos em Movimento | Captação, projetos e prestação de contas",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bpmpro.com.br",
  domain: "bpmpro.com.br",
  email: "contato@bpmpro.com.br",
  phone: "+55 61 0000-0000",
  whatsapp: "5561000000000",
  address: "Brasília — DF",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bras%C3%ADlia%20DF",
  mapEmbedUrl: "https://www.google.com/maps?q=Bras%C3%ADlia%20DF&output=embed",
  /** Oculto até a regularização (ver `visibility.cnpj`). */
  cnpj: "",
  social: {
    instagram: "https://instagram.com/bpmpro",
    linkedin: "https://linkedin.com/company/bpmpro",
  },
} as const;

/** Blocos que só aparecem após a liberação da gestão. */
export const visibility = {
  testimonials: false,
  cnpj: false,
} as const;

/** Mensagens prontas do WhatsApp por ponto de contato. */
export const whatsappMessages = {
  default: "Olá! Vim pelo site e quero saber como a BPM Pro pode ajudar a minha entidade.",
  journey: "Olá! Quero começar pelo diagnóstico gratuito da minha entidade.",
  faq: "Olá! Tenho uma dúvida sobre projetos com recursos públicos.",
} as const;

/** Links para "Projetos" somem enquanto nenhum projeto estiver visível (a seção não é exibida). */
function withProjects<T extends { href: string }>(links: readonly T[]): T[] {
  return links.filter((link) => hasVisibleProjects || !link.href.endsWith("#projetos"));
}

export const navItems = withProjects([
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#para-quem", label: "Para quem" },
  { href: "#onde-atuamos", label: "Onde atuamos" },
  { href: "#projetos", label: "Projetos" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
]);

export const hero = {
  eyebrow: "Projetos com recursos públicos de ponta a ponta",
  title: "Você cuida do esporte. A gente cuida do projeto.",
  subtitle:
    "Captamos recursos, escrevemos, executamos e prestamos contas dos projetos da sua entidade. Do edital ao último comprovante, com um único parceiro.",
  primaryCta: { label: "Quero um diagnóstico gratuito", href: "#contato" },
  secondaryCta: { label: "Ver como funciona", href: "#como-funciona" },
} as const;

export const pains = {
  title: "O recurso existe. O que trava é o caminho.",
  items: [
    {
      icon: "FileWarning",
      title: "Documentos irregulares",
      description: "Certidão vencida ou estatuto desatualizado bloqueiam a entidade antes mesmo de começar.",
    },
    {
      icon: "FileX2",
      title: "Projeto devolvido",
      description: "Proposta mal estruturada volta para ajustes e o prazo se perde.",
    },
    {
      icon: "TriangleAlert",
      title: "Execução sem controle",
      description: "Cotações, contratações e compras fora das regras viram problema lá na frente.",
    },
    {
      icon: "FileStack",
      title: "Prestação de contas pesada",
      description: "Comprovantes soltos e relatórios incompletos geram pendências e travam novos projetos.",
    },
  ],
  closing: "A Brasil Projetos em Movimento existe para tirar esse peso das costas da sua entidade.",
} as const;

export const about = {
  title: "Um único parceiro, do edital ao último comprovante.",
  text: "A Brasil Projetos em Movimento elabora e acompanha projetos com recursos públicos para associações, ligas, federações, clubes e institutos. Nosso foco é o esporte, com atuação também em cultura, turismo e projetos sociais. Cuidamos de cada etapa para que a sua entidade se concentre no que faz de melhor: colocar gente em movimento.",
  cta: { label: "Conheça nossos serviços", href: "#servicos" },
} as const;

export const services = {
  title: "Tudo o que o seu projeto precisa",
  subtitle: "Do primeiro documento ao relatório final.",
  groups: [
    {
      label: "Antes",
      items: [
        {
          icon: "Stamp",
          title: "Regularização estatutária",
          description:
            "Estatuto, documentos, certidões e certificações em dia para a entidade estar apta a receber recursos.",
        },
        {
          icon: "HandCoins",
          title: "Captação de recursos",
          description: "Identificamos a fonte certa: emendas parlamentares, editais, fundos e leis de incentivo.",
        },
        {
          icon: "FilePenLine",
          title: "Elaboração de projetos",
          description:
            "Proposta, projeto técnico, plano de trabalho e planilha de custos dentro das regras de cada órgão.",
        },
      ],
    },
    {
      label: "Durante",
      items: [
        {
          icon: "ChartGantt",
          title: "Execução de projetos",
          description: "Gestão do projeto aprovado, com cronograma, metas e controle de cada etapa.",
        },
        {
          icon: "Trophy",
          title: "Produção de eventos",
          description: "Campeonatos, festivais, circuitos e eventos esportivos e culturais do papel ao apito final.",
        },
        {
          icon: "Handshake",
          title: "Contratação de empresas",
          description: "Cotações, seleção e contratação de fornecedores com toda a documentação.",
        },
        {
          icon: "Gavel",
          title: "Licitações e compras",
          description: "Processos de compra conduzidos conforme as regras do recurso recebido.",
        },
      ],
    },
    {
      label: "Sempre",
      items: [
        {
          icon: "ClipboardCheck",
          title: "Prestação de contas",
          description: "Relatórios, comprovação e acompanhamento até a conclusão do processo.",
        },
        {
          icon: "Landmark",
          title: "Relações institucionais",
          description: "Articulação técnica com órgãos públicos e gestores para viabilizar os projetos.",
        },
      ],
    },
  ],
} as const;

export const journey = {
  title: "Como o seu projeto sai do papel",
  steps: [
    { title: "Diagnóstico", description: "Entendemos a entidade, o projeto e o momento em que vocês estão." },
    { title: "Regularização", description: "Organizamos estatuto, documentos e certidões." },
    { title: "Captação", description: "Encontramos a fonte de recurso mais adequada." },
    { title: "Projeto", description: "Escrevemos proposta, plano de trabalho e custos." },
    {
      title: "Aprovação",
      description: "Acompanhamos a análise e respondemos às complementações até a formalização.",
    },
    { title: "Execução", description: "Cuidamos de contratações, compras e da realização do projeto." },
    { title: "Prestação de contas", description: "Comprovamos tudo e acompanhamos até a conclusão." },
  ],
  cta: "Começar pelo diagnóstico gratuito",
} as const;

export const audiences = {
  title: "Em que momento está a sua entidade?",
  items: [
    {
      icon: "Lightbulb",
      title: "Tenho uma ideia de projeto",
      description: "Vamos ver se a entidade está pronta e qual recurso combina com a sua ideia.",
      message: "Olá! Tenho uma ideia de projeto e quero saber por onde começar.",
    },
    {
      icon: "Landmark",
      title: "Tenho um recurso indicado",
      description: "Prazo correndo? Elaboramos e cadastramos o projeto com prioridade.",
      message: "Olá! Tenho um recurso indicado e preciso cadastrar o projeto.",
    },
    {
      icon: "BadgeCheck",
      title: "Tenho um projeto aprovado",
      description: "Cuidamos da execução, das contratações, das compras e do evento.",
      message: "Olá! Tenho um projeto aprovado e preciso de apoio na execução.",
    },
    {
      icon: "ClipboardList",
      title: "Preciso prestar contas",
      description: "Organizamos os comprovantes e o relatório para regularizar a sua entidade.",
      message: "Olá! Preciso de ajuda com uma prestação de contas.",
    },
  ],
} as const;

export const areas = {
  title: "Onde colocamos projetos em movimento",
  items: [
    { icon: "Trophy", title: "Esporte" },
    { icon: "Drama", title: "Cultura" },
    { icon: "Map", title: "Turismo" },
    { icon: "HeartHandshake", title: "Projetos sociais" },
  ],
  spheres: "Federal, estadual e distrital",
  modalities: [
    "Futsal",
    "Futebol",
    "Society",
    "Futevôlei",
    "Taekwondo",
    "Jiu-jitsu",
    "Artes marciais",
    "Capoeira",
    "Skate",
    "Atletismo",
    "Basquete",
    "Automobilismo",
    "Games nas escolas",
    "Festivais culturais",
  ],
} as const;

export const differentials = {
  title: "Por que a Brasil Projetos em Movimento",
  items: [
    {
      icon: "Waypoints",
      title: "Ponta a ponta",
      description: "Um único parceiro em todas as etapas, sem empurra-empurra entre fornecedores.",
    },
    {
      icon: "Medal",
      title: "Especialistas em esporte",
      description: sportsSpecialistText,
    },
    {
      icon: "Eye",
      title: "Processo transparente",
      description: "Você sabe em que etapa está o seu projeto e o que vem depois.",
    },
    {
      icon: "MonitorCog",
      title: "Tecnologia nos processos",
      description: "Controle de prazos, documentos e relatórios com ferramentas digitais.",
    },
  ],
} as const;

export const projects = {
  title: "Projetos que já saíram do papel",
  subtitle: "Campeonatos, festivais e projetos sociais executados de ponta a ponta.",
} as const;

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organization: string;
  photo?: string;
}

/** Oculto até termos depoimentos autorizados (`visibility.testimonials`). */
export const testimonials: { title: string; items: readonly Testimonial[] } = {
  title: "Quem trabalha com a gente recomenda",
  items: [],
};

export const faq = {
  title: "Dúvidas frequentes",
  items: [
    {
      question: "Minha entidade pode receber recursos públicos?",
      answer:
        "Em geral, entidades sem fins lucrativos regularmente constituídas, como associações, ligas, federações, clubes e institutos, podem receber recursos, desde que estejam com documentação em dia. Os requisitos variam conforme a fonte. No diagnóstico verificamos a situação da sua entidade.",
    },
    {
      question: "O que é uma emenda parlamentar?",
      answer:
        "É uma indicação feita por parlamentares no orçamento público para destinar recursos a uma finalidade, como um projeto esportivo ou cultural. Depois da indicação, o projeto precisa ser cadastrado, analisado e aprovado pelo órgão responsável.",
    },
    {
      question: "Quanto tempo leva da proposta à liberação do recurso?",
      answer:
        "Depende da fonte e do órgão. Há etapas de cadastro, análise, ajustes e formalização. No diagnóstico apresentamos o caminho e os prazos esperados para o seu caso.",
    },
    {
      question: "Vocês garantem a aprovação do projeto?",
      answer:
        "Não. A aprovação é sempre do órgão público. O nosso trabalho é deixar a entidade e o projeto o mais preparados possível, dentro de todas as regras.",
    },
    {
      question: "Vocês fazem só o projeto ou também a execução?",
      answer:
        "Fazemos as duas coisas e também a prestação de contas. Você pode contratar o ciclo completo ou apenas as etapas que precisar.",
    },
    {
      question: "Atendem fora do Distrito Federal?",
      answer: "Sim. Atendemos entidades de todo o Brasil, com reuniões online e apoio presencial quando necessário.",
    },
  ],
  cta: "Ainda tem dúvidas? Fale com a gente",
} as const;

export const contact = {
  title: "Vamos colocar o seu projeto em movimento?",
  subtitle: "Conte em que momento está a sua entidade. Respondemos pelo WhatsApp.",
  submit: "Quero meu diagnóstico gratuito",
  success: "Recebemos seus dados! Nossa equipe vai falar com você pelo WhatsApp em breve.",
  consent: "Autorizo o contato da Brasil Projetos em Movimento e concordo com a Política de Privacidade.",
} as const;

export const footer = {
  signature: "Resultado comprovado, do edital à prestação de contas.",
  links: withProjects([
    { href: "/#servicos", label: "Serviços" },
    { href: "/#como-funciona", label: "Como funciona" },
    { href: "/#onde-atuamos", label: "Onde atuamos" },
    { href: "/#projetos", label: "Projetos" },
    { href: "/#duvidas", label: "Dúvidas" },
    { href: "/#contato", label: "Contato" },
    { href: "/privacidade", label: "Política de Privacidade" },
  ]),
};
