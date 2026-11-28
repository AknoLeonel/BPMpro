/**
 * Números de autoridade, experiência e galeria de projetos — fonte única.
 *
 * COMO EDITAR
 * - Mudar um número ou texto: troque o texto entre aspas e publique.
 * - Mostrar um item oculto: troque `visible: false` por `visible: true` (e vice-versa).
 * - A página se ajusta sozinha: blocos sem nenhum item visível não aparecem.
 *
 * REGRAS (material "Site BPM Pro — O que muda agora")
 * - Não inventar, arredondar para cima nem alterar números: use os valores comprovados.
 * - Não citar parlamentares nem partidos; não usar logos de órgãos públicos.
 * - Não publicar valores de projetos individuais.
 */

/** Qualquer item que pode ser mostrado ou ocultado pelo arquivo de dados. */
export interface Toggleable {
  visible: boolean;
}

/** Só os itens marcados como visíveis, na ordem do arquivo. */
export function onlyVisible<T extends Toggleable>(items: readonly T[]): T[] {
  return items.filter((item) => item.visible);
}

export interface Seal extends Toggleable {
  text: string;
}

export interface Stat extends Toggleable {
  /** Texto exato exibido (ex.: "+ de R$ 16 milhões"). Os algarismos são animados na contagem. */
  value: string;
  label: string;
}

interface Organ extends Toggleable {
  name: string;
}

interface FundingSource extends Toggleable {
  name: string;
}

export interface Project extends Toggleable {
  name: string;
  modality: string;
  /** Cidade/UF. */
  city: string;
  /** Foto opcional, publicada somente com autorização da entidade (ex.: "/projetos/basquete.jpg"). */
  image?: string;
}

// Stryker disable all: conteúdo editorial (textos, listas e rotas), sem lógica — mutar strings aqui não testa comportamento.

/** Hero — selos abaixo dos botões, nesta ordem. */
export const heroSeals: readonly Seal[] = [
  { text: "+ de R$ 16 milhões captados", visible: true },
  { text: "Federal, estadual e distrital", visible: true },
  { text: "Do edital à prestação de contas", visible: true },
];

/** Quem somos — frase acrescentada ao final do texto. */
export const aboutProof: Toggleable & { text: string } = {
  text: "São mais de 60 projetos aprovados para 18 entidades, em 3 ministérios e 3 secretarias do Distrito Federal.",
  visible: true,
};

/** Diferenciais — bloco de números logo abaixo dos 4 cards. */
export const stats: readonly Stat[] = [
  { value: "+ de R$ 16 milhões", label: "captados", visible: true },
  { value: "+ de 60", label: "projetos aprovados", visible: true },
  { value: "18", label: "entidades atendidas", visible: true },
  { value: "3 + 3", label: "ministérios e secretarias com projetos aprovados", visible: true },
  { value: "[X]", label: "anos de experiência", visible: false },
];

/** Texto pequeno abaixo do bloco de números. */
export const statsNote: Toggleable & { text: string } = {
  text: "Base comprovada, atualizada em novembro/2026.",
  visible: true,
};

/** Diferenciais — novo texto do card "Especialistas em esporte". */
export const sportsSpecialistText =
  "Mais de 12 modalidades, do futsal ao drift, passando por taekwondo, basquete, skate e games nas escolas.";

/** Card de prova em destaque, junto ao bloco de números. */
export const returningClients: Toggleable & { title: string; text: string } = {
  title: "Clientes que voltam",
  text: "Uma das entidades que atendemos já aprovou 14 projetos com a BPM.",
  visible: true,
};

/** Órgãos com projetos aprovados — em texto, com ícone neutro (nunca logos oficiais). */
const organs: readonly Organ[] = [
  { name: "Ministério do Esporte", visible: true },
  { name: "Ministério da Cultura", visible: true },
  { name: "Ministério das Mulheres", visible: true },
  { name: "Secretaria de Esporte e Lazer do DF", visible: true },
  { name: "Secretaria de Turismo do DF", visible: true },
  { name: "Secretaria de Ciência, Tecnologia e Inovação do DF", visible: true },
];

/** Fontes de recurso com que trabalhamos (chips). */
const sources: readonly FundingSource[] = [
  { name: "Emendas parlamentares individuais, de bancada e de comissão", visible: true },
  { name: "Termos de fomento e de colaboração", visible: true },
  { name: "Editais e chamamentos públicos", visible: true },
  { name: "Lei de Incentivo ao Esporte", visible: false },
  { name: "Lei de Incentivo à Cultura", visible: false },
  { name: "Fundo de Apoio à Cultura (FAC-DF)", visible: false },
];

/** Seção "Onde já colocamos projetos em movimento". */
export const experience = {
  title: "Onde já colocamos projetos em movimento",
  organsTitle: "Órgãos com projetos aprovados",
  organs,
  sourcesTitle: "Fontes de recurso com que trabalhamos",
  sources,
};

/**
 * Projetos realizados — nome, modalidade e cidade/UF, sem valores.
 * Ficam ocultos até cada entidade autorizar. Sem nenhum visível, a seção da Home some e /projetos mostra um aviso.
 */
export const projectItems: readonly Project[] = [
  { name: "Formando Cidadãos através do Basquete", modality: "Basquete", city: "Brasília/DF", visible: false },
  { name: "Drift Kings Brasília", modality: "Automobilismo", city: "Brasília/DF", visible: false },
  { name: "Festival Brasil Coreia", modality: "Cultura", city: "Brasília/DF", visible: false },
  { name: "Campeonato Esportivo Nova Geração", modality: "Multiesportivo", city: "Brasília/DF", visible: false },
  { name: "+ Artes Marciais e Lutas", modality: "Artes marciais", city: "Brasília/DF", visible: false },
  { name: "Campeonato Brasileiro de Ligas de Futsal", modality: "Futsal", city: "São Paulo/SP", visible: false },
  {
    name: "Escola de Futebol e Futsal Pequenos Gigantes",
    modality: "Futsal e futebol",
    city: "Comodoro/MT",
    visible: false,
  },
];
