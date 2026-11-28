/**
 * Checklist "O que conferimos" do Ficha Limpa da Entidade — fonte única.
 *
 * Alimenta o acordeão das páginas de produto e, no futuro, o checklist da área restrita
 * (upload de certidões com validade, alertas de vencimento e leitura por IA).
 * Para mudar uma regra: edite o item aqui; o layout não precisa mudar.
 *
 * Conteúdo: apresentações "Ficha Limpa da Entidade — Selo Prata/Ouro" (BPM Pro).
 */

/** Selo em que o item é conferido. */
export type SealLevel = "prata" | "ouro";

/** Documento em que a certidão é tirada. */
type DocumentKind = "CNPJ" | "CPF";

/** Esfera/órgão responsável — vira a tag colorida do acordeão. */
export type Sphere =
  | "Federal"
  | "Trabalhista"
  | "GDF"
  | "TCU"
  | "TCDF"
  | "Justiça"
  | "CGU"
  | "CNJ"
  | "Tesouro"
  | "Esporte"
  | "Emendas"
  | "Estatuto"
  | "Recurso";

export interface ChecklistItem {
  /** Identificador estável (use no futuro para o status de cada documento na área restrita). */
  id: string;
  name: string;
  description: string;
  /** Onde emitir/conferir. */
  where?: string;
  sphere: Sphere;
  /** Em que documento a certidão é tirada (vazio para itens de estatuto e de fonte do recurso). */
  documents: readonly DocumentKind[];
  /** Selos que conferem este item. */
  levels: readonly SealLevel[];
}

export interface ChecklistGroup {
  id: string;
  /** Rótulo curto (ex.: "Nível 1 · Todas as esferas"). */
  eyebrow: string;
  title: string;
  description?: string;
  /** Observação de rodapé do grupo. */
  note?: string;
  items: readonly ChecklistItem[];
}

const BOTH: readonly SealLevel[] = ["prata", "ouro"];
const OURO: readonly SealLevel[] = ["ouro"];

/** "Antes de começar: 4 regras". */
export const checklistRules: readonly { title: string; text: string }[] = [
  { title: "CNPJ e CPF", text: "Várias certidões são tiradas no CNPJ da entidade e no CPF de cada dirigente." },
  { title: "Validade curta", text: "Muitas vencem em 30 dias. Reemita antes de cada envio." },
  {
    title: "Positiva com efeito de negativa vale",
    text: "Positiva com efeito de negativa vale como regular. Positiva pura trava a parceria.",
  },
  { title: "Um PDF único", text: "Junte tudo em um PDF único, na ordem da lista." },
];

/** Grupos de certidões e de regularidade, na ordem da apresentação. */
export const checklistGroups: readonly ChecklistGroup[] = [
  {
    id: "nivel-1",
    eyebrow: "Nível 1 · Todas as esferas",
    title: "As 3 obrigatórias",
    description: "Exigidas pelo MROSC (Lei 13.019 e Decreto 8.726) em qualquer parceria.",
    items: [
      {
        id: "debitos-federais",
        name: "Débitos Federais e Dívida Ativa da União",
        description: "Tributos federais, previdência e dívida ativa.",
        where: "Receita Federal / PGFN",
        sphere: "Federal",
        documents: ["CNPJ"],
        levels: BOTH,
      },
      {
        id: "crf-fgts",
        name: "CRF, regularidade do FGTS",
        description: "Comprova o FGTS em dia.",
        where: "Caixa (consulta CRF)",
        sphere: "Federal",
        documents: ["CNPJ"],
        levels: BOTH,
      },
      {
        id: "cndt",
        name: "CNDT, débitos trabalhistas",
        description: "Banco Nacional de Devedores Trabalhistas.",
        where: "TST",
        sphere: "Trabalhista",
        documents: ["CNPJ"],
        levels: BOTH,
      },
    ],
  },
  {
    id: "nivel-2-gdf",
    eyebrow: "Nível 2 · Distrito Federal",
    title: "Governo do DF",
    description: "Pedidas pelas secretarias do GDF (Decreto Distrital 37.843/2016), além das 3 obrigatórias.",
    items: [
      {
        id: "divida-ativa-df",
        name: "Certidão Negativa de Dívida Ativa do DF",
        description: "Padrão em todos os editais do GDF, inclusive SECTI.",
        where: "Secretaria de Economia do DF",
        sphere: "GDF",
        documents: ["CNPJ"],
        levels: BOTH,
      },
      {
        id: "debitos-df",
        name: "Certidão Negativa de Débitos do DF",
        description: "Tributos do DF fora da dívida ativa.",
        where: "Secretaria de Economia do DF",
        sphere: "GDF",
        documents: ["CNPJ"],
        levels: BOTH,
      },
      {
        id: "cadastro-fiscal-df",
        name: "Inscrição no Cadastro Fiscal do DF",
        description: "Comprovante de situação. Sem inscrição, informar à secretaria.",
        where: "Agência Net, Receita DF",
        sphere: "GDF",
        documents: ["CNPJ"],
        levels: BOTH,
      },
    ],
  },
  {
    id: "nivel-2-sel-df",
    eyebrow: "Nível 2 · Secretaria de Esporte e Lazer",
    title: "SEL-DF pede a mais",
    description: "Itens cobrados nas diligências da Coordenação de Formalização de Parcerias.",
    items: [
      {
        id: "tcu-nada-consta",
        name: "TCU: Nada Consta",
        description: "Certidão de processos em nome da pessoa.",
        where: "Portal de certidões do TCU",
        sphere: "TCU",
        documents: ["CNPJ", "CPF"],
        levels: BOTH,
      },
      {
        id: "tcu-contas-irregulares",
        name: "TCU: Contas Julgadas Irregulares",
        description: "Cadastro de responsáveis com contas irregulares.",
        where: "Portal de certidões do TCU",
        sphere: "TCU",
        documents: ["CNPJ", "CPF"],
        levels: BOTH,
      },
      {
        id: "tcdf-contas-irregulares",
        name: "TCDF: Contas Julgadas Irregulares",
        description: "Certidão eletrônica de julgamento de contas, no CPF dos dirigentes.",
        where: "Site do TCDF",
        sphere: "TCDF",
        documents: ["CPF"],
        levels: BOTH,
      },
    ],
  },
  {
    id: "nivel-2-outras",
    eyebrow: "Nível 2 · Outras secretarias do GDF",
    title: "Quando o edital pede mais",
    description:
      "A SECTI-DF segue o pacote padrão do GDF: Federais, Dívida Ativa do DF, FGTS e CNDT. Outras secretarias podem pedir:",
    items: [
      {
        id: "civel-criminal-tjdft",
        name: "Cível e criminal no TJDFT",
        description: "Certidões negativas dos dirigentes na Justiça do DF.",
        where: "TJDFT",
        sphere: "Justiça",
        documents: ["CPF"],
        levels: BOTH,
      },
      {
        id: "civel-criminal-jf",
        name: "Cível e criminal na Justiça Federal",
        description: "Certidões negativas dos dirigentes na Seção Judiciária do DF.",
        where: "TRF1 / SJDF",
        sphere: "Justiça",
        documents: ["CPF"],
        levels: BOTH,
      },
      {
        id: "pis-pasep",
        name: "Regularidade com PIS/PASEP",
        description: "Quando há funcionário remunerado, ou comprovante de isenção.",
        where: "Contabilidade da entidade",
        sphere: "Federal",
        documents: ["CNPJ"],
        levels: BOTH,
      },
    ],
  },
  {
    id: "nivel-3-uniao",
    eyebrow: "Nível 3 · União / Ministério do Esporte",
    title: "Cadastros de controle e regularidade federal",
    description: "Checklist do Ministério do Esporte no Transferegov.br.",
    items: [
      {
        id: "cgu-correcional",
        name: "Certidão Correcional da CGU",
        description: "Uma certidão cobre CEPIM, CEIS, CNEP, ePAD e CGU-PJ.",
        where: "Portal de certidões da CGU",
        sphere: "CGU",
        documents: ["CNPJ", "CPF"],
        levels: BOTH,
      },
      {
        id: "cnj-improbidade",
        name: "CNJ: Improbidade Administrativa e Inelegibilidade",
        description: "Cadastro Nacional de Condenações Cíveis.",
        where: "Portal do CNJ",
        sphere: "CNJ",
        documents: ["CNPJ", "CPF"],
        levels: BOTH,
      },
      {
        id: "cauc",
        name: "Extrato do CAUC",
        description: "Mostra se há ocorrência impeditiva para celebrar.",
        where: "Siconfi / CAUC",
        sphere: "Tesouro",
        documents: ["CNPJ"],
        levels: BOTH,
      },
      {
        id: "cadin",
        name: "CADIN",
        description: "Créditos não quitados com o governo federal. O CAUC também comprova.",
        where: "CADIN / extrato do CAUC",
        sphere: "Federal",
        documents: ["CNPJ"],
        levels: BOTH,
      },
      {
        id: "siafi",
        name: "Regularidade no SIAFI",
        description: "Prestação de contas de recursos federais em dia.",
        where: "Extrato do CAUC / SIAFI",
        sphere: "Federal",
        documents: ["CNPJ"],
        levels: BOTH,
      },
      {
        id: "registro-cadastral-me",
        name: "Certidão de Registro Cadastral do Ministério do Esporte",
        description: "Cumprimento dos arts. 18 e 18-A da Lei Pelé (Portaria ME 115/2018).",
        where: "Diretoria de Certificação do Ministério do Esporte",
        sphere: "Esporte",
        documents: ["CNPJ"],
        levels: BOTH,
      },
      {
        id: "publicacao-emendas",
        name: "Publicação das emendas recebidas no site da entidade",
        description: "Print do site da entidade divulgando emendas já recebidas.",
        where: "Site da entidade",
        sphere: "Emendas",
        documents: ["CNPJ"],
        levels: BOTH,
      },
    ],
  },
  {
    id: "pilar-2-estatuto",
    eyebrow: "Pilar 2 · Regularidade estatutária",
    title: "O estatuto vem primeiro",
    description: "Com estatuto inadequado, o recurso não sai, mesmo com todas as certidões em dia.",
    items: [
      {
        id: "estatuto-mrosc",
        name: "Adequado ao MROSC",
        description:
          "Finalidade de relevância pública e social, destinação do patrimônio na dissolução e escrituração contábil conforme as normas.",
        sphere: "Estatuto",
        documents: [],
        levels: BOTH,
      },
      {
        id: "objeto-social",
        name: "Objeto social compatível com o projeto",
        description: "O que o estatuto permite fazer precisa bater com o projeto.",
        sphere: "Estatuto",
        documents: [],
        levels: BOTH,
      },
      {
        id: "diretoria",
        name: "Diretoria eleita, com mandato vigente e ata registrada",
        description: "Eleita, com mandato vigente e ata registrada em cartório.",
        sphere: "Estatuto",
        documents: [],
        levels: BOTH,
      },
      {
        id: "tempo-cnpj",
        name: "Tempo de CNPJ ativo e experiência comprovada no objeto",
        description: "3 anos de CNPJ ativo e experiência comprovada de pelo menos 1 ano no objeto.",
        sphere: "Estatuto",
        documents: [],
        levels: BOTH,
      },
      {
        id: "registro-cadastral-esporte",
        name: "Registro Cadastral do Ministério do Esporte (entidades esportivas)",
        description: "Para entidades esportivas: arts. 18 e 18-A da Lei Pelé.",
        sphere: "Esporte",
        documents: [],
        levels: BOTH,
      },
    ],
  },
  {
    id: "pilar-3-fonte",
    eyebrow: "Pilar 3 · Fonte do recurso (Selo Ouro)",
    title: "O recurso certo para a entidade certa",
    description: "Emenda federal, emenda distrital e fundo de esporte seguem caminhos diferentes.",
    items: [
      {
        id: "origem-recurso",
        name: "Origem do recurso",
        description: "Emenda individual, de bancada ou de comissão, ou programa do Ministério ou da Secretaria.",
        sphere: "Recurso",
        documents: [],
        levels: OURO,
      },
      {
        id: "acao-orcamentaria",
        name: "Ação orçamentária compatível",
        description: "Com o objeto do projeto e com a natureza da entidade.",
        sphere: "Recurso",
        documents: [],
        levels: OURO,
      },
      {
        id: "custeio-investimento",
        name: "Custeio x investimento (GND 3 e GND 4)",
        description: "GND 3 e GND 4 têm limites separados. Erro aqui trava a proposta.",
        sphere: "Recurso",
        documents: [],
        levels: OURO,
      },
      {
        id: "plataforma-orgao",
        name: "Plataforma e órgão certos",
        description: "Transferegov para a União; SEI e secretaria para o DF.",
        sphere: "Recurso",
        documents: [],
        levels: OURO,
      },
      {
        id: "vedacao-ldo",
        name: "Sem vedação na LDO",
        description: "Conferir se aquele tipo de despesa é permitido no ano.",
        sphere: "Recurso",
        documents: [],
        levels: OURO,
      },
      {
        id: "emendas-anteriores",
        name: "Emendas anteriores publicadas no site da entidade",
        description: "Valores recebidos divulgados no site da entidade, como exige a AGU.",
        sphere: "Recurso",
        documents: [],
        levels: OURO,
      },
    ],
  },
];

/** "As 6 certidões do TCU": em que documento cada uma é tirada. */
export const tcuCertificates: readonly { name: string; cnpj: boolean; cpf: boolean }[] = [
  { name: "Nada Consta (processos)", cnpj: true, cpf: true },
  { name: "Contas Julgadas Irregulares", cnpj: true, cpf: true },
  { name: "Contas Irregulares p/ fins eleitorais", cnpj: true, cpf: true },
  { name: "Licitantes Inidôneos", cnpj: true, cpf: true },
  { name: "Inabilitados (cargo/função)", cnpj: false, cpf: true },
  { name: "Consulta Consolidada de PJ", cnpj: true, cpf: false },
];

export const tcuNotes = {
  tip: "A Consulta Consolidada de PJ junta, num só documento, Inidôneos (TCU), Improbidade (CNJ), CEIS e CNEP (CGU).",
  why: "Elas comprovam a declaração do art. 39: sem contas irregulares nos últimos 8 anos e sem dirigente inabilitado.",
};

/** "Tirar também no CPF": para cada dirigente da diretoria. */
export const directorsChecklist = {
  title: "Tirar também no CPF",
  intro: "Para cada dirigente da diretoria (presidente, vice, tesoureiro, diretores):",
  certificates: [
    "TCU: Nada Consta",
    "TCU: Contas Julgadas Irregulares",
    "TCU: Inabilitados",
    "TCU: Licitantes Inidôneos",
    "TCDF: Contas Julgadas Irregulares",
    "CGU: Certidão Correcional",
    "CNJ: Improbidade",
    "Cível e criminal no TJDFT e na Justiça Federal (quando o edital pedir)",
  ],
  personalDocuments: "Junto: RG/CNH, CPF e comprovante de residência dos últimos 3 meses de cada dirigente.",
} as const;

/** Itens de um selo, mantendo os grupos (o Prata não tem o Pilar 3). */
export function groupsForLevel(level: SealLevel): ChecklistGroup[] {
  return checklistGroups
    .map((group) => ({ ...group, items: group.items.filter((item) => item.levels.includes(level)) }))
    .filter((group) => group.items.length > 0);
}
