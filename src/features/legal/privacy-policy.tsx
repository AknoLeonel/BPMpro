import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RedRule } from "@/components/ui/brand-shapes";
import { siteConfig } from "@/lib/site-config";

/** Data da última revisão — substitua pela data oficial quando o texto for aprovado pelo jurídico. */
const LAST_UPDATED = "[data a definir]";

/** Campos do formulário de contato (ver `src/features/contact/schema.ts`). */
const collectedFields = [
  "nome",
  "entidade",
  "cargo",
  "cidade/UF",
  "WhatsApp",
  "e-mail",
  "área do projeto",
  "etapa em que a entidade está",
  "mensagem",
] as const;

const holderRights = [
  "confirmação de que tratamos os seus dados e acesso a eles;",
  "correção de dados incompletos, inexatos ou desatualizados;",
  "anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a LGPD;",
  "portabilidade dos dados a outro fornecedor, nos termos da regulamentação;",
  "eliminação dos dados tratados com base no seu consentimento;",
  "informação sobre com quem compartilhamos os seus dados;",
  "revogação do consentimento a qualquer momento.",
] as const;

interface PolicySection {
  id: string;
  title: string;
  content: ReactNode;
}

const emailLink = (
  <a
    href={`mailto:${siteConfig.email}`}
    className="font-medium text-brand-700 underline underline-offset-4 hover:text-brand-800 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
  >
    {siteConfig.email}
  </a>
);

const sections: readonly PolicySection[] = [
  {
    id: "quem-somos",
    title: "Quem somos",
    content: (
      <p>
        A {siteConfig.fullName} ({siteConfig.name}) elabora e acompanha projetos com recursos públicos para entidades
        esportivas, culturais e sociais. Somos a controladora dos dados pessoais enviados por este site. Para falar com
        a gente sobre privacidade, escreva para {emailLink}.
      </p>
    ),
  },
  {
    id: "dados-coletados",
    title: "Dados coletados no formulário",
    content: (
      <>
        <p>Quando você preenche o formulário de contato, coletamos apenas o que você informa:</p>
        <ul className="mt-4 grid list-none gap-2 sm:grid-cols-2">
          {collectedFields.map((field) => (
            <li key={field} className="flex items-start gap-3">
              <span aria-hidden className="mt-2.5 block size-1.5 shrink-0 bg-signal-500" />
              <span>{field}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Não pedimos documentos, dados bancários nem dados sensíveis. Por favor, não os inclua no campo de mensagem.
        </p>
      </>
    ),
  },
  {
    id: "finalidade",
    title: "Para que usamos os dados",
    content: (
      <p>
        Usamos os seus dados para responder ao seu contato, entender o momento da sua entidade e apresentar o
        diagnóstico gratuito. Não usamos os dados para outras finalidades sem avisar você antes.
      </p>
    ),
  },
  {
    id: "base-legal",
    title: "Base legal",
    content: (
      <p>
        O tratamento é feito com base no seu consentimento (art. 7º, I, da Lei nº 13.709/2018 — LGPD), dado ao marcar a
        autorização no formulário. Você pode revogar esse consentimento quando quiser.
      </p>
    ),
  },
  {
    id: "compartilhamento",
    title: "Compartilhamento",
    content: (
      <p>
        Não vendemos nem alugamos dados pessoais. Os dados podem passar por ferramentas que usamos para operar o site e
        o atendimento (hospedagem, e-mail e WhatsApp) e para o monitoramento técnico de erros e desempenho, sempre
        limitados ao necessário para essas funções. Também podemos compartilhar dados quando a lei ou uma autoridade
        competente exigir.
      </p>
    ),
  },
  {
    id: "retencao",
    title: "Por quanto tempo guardamos",
    content: (
      <p>
        Guardamos os dados enquanto forem necessários para o atendimento e o diagnóstico, ou até você pedir a eliminação
        ou revogar o consentimento — ressalvadas as hipóteses em que a lei exige a guarda por mais tempo.
      </p>
    ),
  },
  {
    id: "direitos",
    title: "Seus direitos",
    content: (
      <>
        <p>Pelo art. 18 da LGPD, você pode pedir, a qualquer momento:</p>
        <ul className="mt-4 grid list-none gap-2">
          {holderRights.map((right) => (
            <li key={right} className="flex items-start gap-3">
              <span aria-hidden className="mt-2.5 block size-1.5 shrink-0 bg-signal-500" />
              <span>{right}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          Para exercer qualquer um desses direitos, envie um e-mail para {emailLink} com o assunto “Privacidade”.
          Respondemos no menor prazo possível, dentro dos prazos da LGPD. Você também pode apresentar reclamação à
          Autoridade Nacional de Proteção de Dados (ANPD).
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies e monitoramento técnico",
    content: (
      <p>
        Não usamos cookies de publicidade. O site pode usar cookies e armazenamento local estritamente necessários ao
        funcionamento e ferramentas de monitoramento técnico, que registram erros e métricas de desempenho sem
        identificar você pelo nome. Você pode bloquear ou apagar cookies nas configurações do seu navegador.
      </p>
    ),
  },
  {
    id: "atualizacao",
    title: "Atualização desta política",
    content: (
      <>
        <p>
          Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A versão vigente fica
          sempre publicada nesta página.
        </p>
        <p className="mt-4 rounded-md border-signal-500 border-l-4 bg-ink-100 px-4 py-3 text-ink-950 text-sm">
          <strong className="font-semibold">Versão provisória.</strong> Texto em revisão. Última atualização:{" "}
          {LAST_UPDATED}.
        </p>
      </>
    ),
  },
];

/** Política de Privacidade (LGPD) — texto provisório, em linguagem simples. */
export function PrivacyPolicy() {
  return (
    <article className="bg-white px-4 pt-[calc(72px+3rem)] pb-20 sm:px-6 sm:pt-[calc(72px+4.5rem)] lg:pb-28">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal as="header">
          <p className="font-display font-semibold text-brand-700 text-xs uppercase tracking-[0.2em]">LGPD</p>
          <RedRule className="mt-4" />
          <h1 className="mt-5 font-display font-semibold text-4xl text-ink-950 leading-tight sm:text-5xl">
            Política de Privacidade
          </h1>
          <p className="mt-5 text-ink-600 text-lg leading-relaxed">
            Como a {siteConfig.fullName} trata os dados pessoais enviados por este site.
          </p>
        </Reveal>

        <div className="mt-12 space-y-12 text-base text-ink-700 leading-relaxed">
          {sections.map((section, index) => (
            <Reveal key={section.id}>
              <section id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-[88px]">
                <h2
                  id={`${section.id}-title`}
                  className="flex items-baseline gap-3 font-display font-semibold text-ink-950 text-xl sm:text-2xl"
                >
                  <span aria-hidden className="font-display text-brand-700 text-sm tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-4">{section.content}</div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
