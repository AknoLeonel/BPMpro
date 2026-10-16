/**
 * Conteúdo do site modelo. Números, cases e depoimentos são ILUSTRATIVOS —
 * substitua pelos dados reais da BPM antes de publicar.
 */
export const siteConfig = {
  name: "BPM",
  fullName: "BPM — Brasil Projetos em Movimento",
  tagline: "Tiramos projetos do papel e colocamos o Brasil em movimento.",
  description:
    "Consultoria e tecnologia para o terceiro setor: elaboração de projetos, captação de recursos públicos e privados, gestão da execução e prestação de contas sem dor de cabeça.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bpmpro.com.br",
  email: "contato@bpmpro.com.br",
  phone: "+55 61 0000-0000",
  whatsapp: "5561000000000",
  address: "Brasília — DF",
  social: {
    instagram: "https://instagram.com/bpmpro",
    linkedin: "https://linkedin.com/company/bpmpro",
    youtube: "https://youtube.com/@bpmpro",
  },
} as const;

export const navItems = [
  { href: "#solucoes", label: "Soluções" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#areas", label: "Áreas" },
  { href: "#cases", label: "Cases" },
  { href: "#faq", label: "FAQ" },
] as const;

export const stats = [
  { value: 320, suffix: "+", label: "projetos executados" },
  { value: 22, suffix: "", label: "estados atendidos" },
  { value: 180, suffix: "+", label: "entidades parceiras" },
  { value: 210, prefix: "R$ ", suffix: " mi", label: "em recursos geridos" },
] as const;

export const solutions = [
  {
    icon: "FileText",
    title: "Elaboração de projetos",
    description:
      "Diagnóstico, plano de trabalho, metas e orçamento redigidos com a linguagem que cada edital e lei de incentivo exige.",
  },
  {
    icon: "HandCoins",
    title: "Captação de recursos",
    description:
      "Emendas parlamentares, leis de incentivo ao esporte e à cultura, editais, convênios e investimento social privado.",
  },
  {
    icon: "Workflow",
    title: "Gestão da execução",
    description:
      "Cronogramas, compras, contratações e acompanhamento físico-financeiro para cumprir cada meta pactuada.",
  },
  {
    icon: "ShieldCheck",
    title: "Prestação de contas",
    description:
      "Documentação organizada desde o primeiro dia e relatórios no padrão dos órgãos concedentes e de controle.",
  },
  {
    icon: "LayoutDashboard",
    title: "Plataforma BPMpro",
    description:
      "Painel online com status, documentos, indicadores e alertas de prazos de todos os seus projetos em um só lugar.",
  },
  {
    icon: "GraduationCap",
    title: "Capacitação",
    description:
      "Formação de equipes e dirigentes em MROSC, compliance e boas práticas de governança para o terceiro setor.",
  },
] as const;

export const journey = [
  {
    step: "01",
    title: "Diagnóstico",
    description: "Entendemos sua entidade, regularidade jurídica e a ideia que você quer realizar.",
  },
  {
    step: "02",
    title: "Projeto",
    description: "Transformamos a ideia em um projeto técnico, viável e alinhado à fonte de recurso certa.",
  },
  {
    step: "03",
    title: "Captação",
    description: "Submetemos, acompanhamos e articulamos até o recurso estar disponível.",
  },
  {
    step: "04",
    title: "Execução",
    description: "Gerimos o dia a dia com transparência e indicadores em tempo real.",
  },
  {
    step: "05",
    title: "Prestação de contas",
    description: "Entregamos contas aprovadas e um histórico que abre portas para o próximo projeto.",
  },
] as const;

export const areas = [
  {
    icon: "Trophy",
    title: "Esporte",
    description: "Lei de Incentivo ao Esporte, escolinhas, eventos e infraestrutura.",
  },
  {
    icon: "Palette",
    title: "Cultura",
    description: "Lei Rouanet, Paulo Gustavo, Aldir Blanc, festivais e patrimônio.",
  },
  {
    icon: "HeartHandshake",
    title: "Assistência social",
    description: "Convivência, segurança alimentar e fortalecimento de vínculos.",
  },
  { icon: "BookOpen", title: "Educação", description: "Reforço escolar, inclusão digital e formação profissional." },
  {
    icon: "Stethoscope",
    title: "Saúde",
    description: "Prevenção, equipamentos e atendimento em entidades filantrópicas.",
  },
  {
    icon: "Leaf",
    title: "Meio ambiente",
    description: "Recuperação de áreas, educação ambiental e economia circular.",
  },
] as const;

export const cases = [
  {
    tag: "Esporte",
    title: "Núcleo de vôlei para 600 jovens",
    location: "Goiânia — GO",
    result: "R$ 1,8 mi captados via Lei de Incentivo ao Esporte",
    image: "/illustrations/case-esporte.svg",
  },
  {
    tag: "Cultura",
    title: "Festival de música popular itinerante",
    location: "Recife — PE",
    result: "12 cidades, 40 mil pessoas e contas aprovadas sem ressalvas",
    image: "/illustrations/case-cultura.svg",
  },
  {
    tag: "Social",
    title: "Cozinha comunitária e capacitação",
    location: "Belém — PA",
    result: "Emenda parlamentar executada 100% dentro do prazo",
    image: "/illustrations/case-social.svg",
  },
] as const;

export const testimonials = [
  {
    quote:
      "Saímos de zero projetos aprovados para três em um ano. A prestação de contas, que era nosso pesadelo, virou rotina.",
    author: "Presidente de associação esportiva",
    location: "Goiás",
  },
  {
    quote:
      "O painel da BPMpro mostra tudo o que precisamos para conversar com patrocinadores e conselho. Transparência que gera confiança.",
    author: "Diretora de instituto cultural",
    location: "Pernambuco",
  },
  {
    quote: "Equipe técnica que entende de MROSC e do dia a dia de uma ONG pequena. Fez toda a diferença.",
    author: "Coordenador de projeto social",
    location: "Pará",
  },
] as const;

export const faq = [
  {
    question: "Minha entidade precisa ter quantos anos para captar recursos?",
    answer:
      "Depende da fonte. Algumas leis de incentivo exigem um ano de existência; termos de fomento pelo MROSC costumam pedir de um a três. No diagnóstico avaliamos a elegibilidade e indicamos o melhor caminho.",
  },
  {
    question: "Vocês trabalham com prefeituras e órgãos públicos?",
    answer:
      "Sim. Apoiamos secretarias na estruturação de programas, chamamentos públicos e no acompanhamento de parcerias com organizações da sociedade civil.",
  },
  {
    question: "Como é cobrado o serviço?",
    answer:
      "Oferecemos modelos por projeto, mensalidade de gestão ou combinados. Tudo é definido em proposta transparente após o diagnóstico gratuito.",
  },
  {
    question: "E se o projeto não for aprovado?",
    answer:
      "Analisamos o parecer, ajustamos o projeto e buscamos novas oportunidades de edital. Nosso acompanhamento continua até o recurso chegar.",
  },
  {
    question: "Consigo acompanhar o andamento online?",
    answer:
      "Sim. A plataforma BPMpro reúne cronograma, documentos, indicadores e alertas de prazo, acessível de qualquer dispositivo.",
  },
] as const;
