# BPM — Brasil Projetos em Movimento

Site da **BPM Pro** (bpmpro.com.br): projetos com recursos públicos de ponta a ponta para entidades
esportivas, culturais e sociais, mais os produtos **Selo Ficha Limpa** (Prata e Ouro).

> 📌 Antes de contribuir leia **[AGENTS.md](AGENTS.md)**: toda tarefa nasce como Issue e é entregue via PR que a menciona.

## Stack

Next.js 16 · React 19 · TypeScript strict · Tailwind CSS v4 · Motion · Zod ·
Sentry · OpenTelemetry · Datadog · New Relic · Biome · dependency-cruiser · Knip · Commitlint ·
Vitest · Playwright · Stryker · Codecov.

## Começando

```bash
corepack enable
pnpm install
cp .env.example .env.local   # opcional: chaves de observabilidade
pnpm dev                     # http://localhost:3000
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `pnpm dev` / `pnpm build` / `pnpm start` | desenvolvimento, build e servidor de produção |
| `pnpm check` | lint + typecheck + arquitetura + knip + testes |
| `pnpm lint` / `pnpm lint:fix` | Biome |
| `pnpm arch` | contratos de arquitetura (dependency-cruiser) |
| `pnpm knip` | código e dependências não usados |
| `pnpm test` / `pnpm test:coverage` | Vitest (unit + integração) |
| `pnpm test:e2e` | Playwright (desktop + mobile, axe, reduced-motion) |
| `pnpm test:mutation` | Stryker |

## Mapa do site

Fonte única: [`src/lib/routes.ts`](src/lib/routes.ts) (menu, rodapé, sitemap e rotas "Em breve").

| Rota | Página |
| --- | --- |
| `/` | Home (funil completo + seção Produtos) |
| `/servicos` · `/como-funciona` · `/sobre` · `/projetos` · `/duvidas` · `/contato` | Páginas institucionais |
| `/produtos` | Hub dos produtos |
| `/produtos/ficha-limpa` · `/prata` · `/ouro` | Ficha Limpa da Entidade e páginas de cada selo |
| `/cartao` | Cartão de visita digital (vCard em `/cartao/vcard`) |
| `/politica-de-privacidade` | LGPD (`/privacidade` redireciona) |
| `/area-restrita` · `/gestao` · `/verificar-selo` | Reservadas: "Em breve", fora do índice de busca |

## Conteúdo editável

Textos e listas ficam em arquivos de conteúdo, separados do layout:

| Arquivo | O que tem |
| --- | --- |
| [`src/lib/site-config.ts`](src/lib/site-config.ts) | Textos da Home e páginas institucionais, contatos, mensagens do WhatsApp |
| [`src/lib/numbers.ts`](src/lib/numbers.ts) | Números de autoridade, órgãos, fontes de recurso e projetos (cada item com `visible`) |
| [`src/lib/products.ts`](src/lib/products.ts) | Selos Prata e Ouro, páginas de produto, aviso de transparência |
| [`src/lib/ficha-limpa-checklist.ts`](src/lib/ficha-limpa-checklist.ts) | Checklist "O que conferimos" (regras, certidões, estatuto, fonte do recurso) — também vai alimentar o checklist da área restrita |

## Back-end previsto (não implementado)

A próxima fase traz a área restrita dos dirigentes, o painel de gestão da BPM Pro e o selo verificável.
A estrutura abaixo é o plano; nada dela existe ainda além das rotas "Em breve".

**Perfis:** Administrador BPM Pro · Gestor de projetos BPM Pro · Dirigente da entidade (cliente).

**Funcionalidades:** cadastro da entidade e dos dirigentes; upload de certidões e documentos em nuvem com data de
validade; alertas de vencimento (30 dias); status do selo (Prata, Ouro, vencido); emissão do selo digital com código e
QR Code verificável em `/verificar-selo`; consulta e acompanhamento dos projetos; IA (API do Claude) para ler certidões,
identificar validade e situação e apontar pendências no checklist.

**Stack sugerida (a validar):** Next.js (rotas de API / Server Actions) · PostgreSQL · autenticação com perfis ·
armazenamento de arquivos em nuvem · API do Claude.

```text
src/
  app/
    (site)/…                      páginas públicas atuais
    area-restrita/                login + painel do dirigente (hoje: "Em breve")
      (autenticado)/entidade/      dados da entidade e dos dirigentes
      (autenticado)/documentos/    upload e validade das certidões
      (autenticado)/selo/          status do selo e histórico
      (autenticado)/projetos/      acompanhamento dos projetos
    gestao/                       painel interno da BPM Pro (hoje: "Em breve")
    verificar-selo/[codigo]/      consulta pública do selo por código / QR Code (hoje: "Em breve")
    api/
      auth/                       sessão e perfis
      documentos/                 URLs assinadas de upload/download
      selos/                      emissão e verificação
      ia/                         leitura de certidões (Claude) — só servidor
  features/
    auth/                         login, sessão, controle de acesso por perfil
    entidades/                    cadastro da entidade e dos dirigentes
    documentos/                   upload, validade, alertas de vencimento
    selos/                        regras do selo (usa lib/ficha-limpa-checklist.ts), emissão, QR Code
    ia/                           extração de dados das certidões e conferência do checklist
  server/                         só servidor (nunca importado pelo cliente)
    db/                           schema, migrações e acesso ao PostgreSQL
    storage/                      armazenamento de arquivos (criptografado)
    audit/                        registro de acessos
    jobs/                         alertas de vencimento
```

**LGPD (desde o desenho):** a área restrita vai guardar CPF, RG e comprovantes de residência dos dirigentes. Prever
criptografia em repouso e em trânsito, controle de acesso por perfil (o dirigente só vê a própria entidade), registro de
acessos (auditoria), consentimento explícito, política de retenção e descarte, e nunca registrar dados pessoais em logs.

## Documentação

- [AGENTS.md](AGENTS.md) — fluxo de trabalho, arquitetura e definição de pronto
- [docs/design.md](docs/design.md) — design system (tokens, componentes, acessibilidade)
- [docs/MOTION.md](docs/MOTION.md) — Motion System (skeleton, lazy loading, animações)
- [docs/OBSERVABILITY.md](docs/OBSERVABILITY.md) — Sentry, OpenTelemetry, Datadog, New Relic

## Deploy

Gerenciado por Pull Requests (`.github/workflows/deploy.yml`): cada PR gera um preview na Vercel; merge na `main` publica em produção.
Configure os secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` e `CODECOV_TOKEN`.

> Contatos (telefone, WhatsApp, endereço) e CNPJ em `src/lib/site-config.ts` ainda são provisórios.
