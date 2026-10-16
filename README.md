# BPM — Brasil Projetos em Movimento

Site institucional modelo da **BPMpro**: consultoria e tecnologia para o terceiro setor
(elaboração de projetos, captação de recursos, gestão da execução e prestação de contas).

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

## Documentação

- [AGENTS.md](AGENTS.md) — fluxo de trabalho, arquitetura e definição de pronto
- [docs/MOTION.md](docs/MOTION.md) — Motion System (skeleton, lazy loading, animações)
- [docs/OBSERVABILITY.md](docs/OBSERVABILITY.md) — Sentry, OpenTelemetry, Datadog, New Relic

## Deploy

Gerenciado por Pull Requests (`.github/workflows/deploy.yml`): cada PR gera um preview na Vercel; merge na `main` publica em produção.
Configure os secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` e `CODECOV_TOKEN`.

> Os números, cases e depoimentos em `src/lib/site-config.ts` são **ilustrativos** — substitua pelos dados reais.
