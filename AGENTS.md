# AGENTS.md — Regras do projeto BPMpro

> Fonte única de instruções para **qualquer agente de IA (Claude, GPT, Gemini, Copilot, Cursor…) ou pessoa** que trabalhe neste repositório.
> `CLAUDE.md` e outros arquivos de agente apenas apontam para cá. Em caso de conflito, **este arquivo vence**.

## 1. Fluxo obrigatório: Issue → Branch → PR → Deploy

1. **Toda tarefa começa com uma Issue no GitHub** — sem exceção. Classifique-a como:
   - `[Correção]` (bug) · `[Melhoria]` (aprimorar o existente) · `[Nova função]` (algo novo).
   Use os templates em `.github/ISSUE_TEMPLATE/`. Pesquise antes para não duplicar.
2. **Crie uma branch a partir da `main`**: `tipo/<numero-da-issue>-descricao-curta`
   (ex.: `fix/14-validacao-telefone`, `feat/20-blog`). Nunca commite direto na `main`.
3. **Commits em Conventional Commits** referenciando a issue (validado por commitlint):
   `feat(contato): valida telefone com DDD (#14)`.
4. **Abra um Pull Request** usando `.github/pull_request_template.md`.
   - **A descrição DEVE mencionar a Issue** com `Closes #N` / `Fixes #N` / `Refs #N`.
     O job `PR referencia Issue` da CI bloqueia PRs sem isso.
   - Um PR pode fechar várias issues (uma linha `Closes #N` para cada).
5. **O PR gerencia o deploy**: cada PR gera um *Preview* (link comentado no PR);
   o merge na `main` publica em *Produção* (`.github/workflows/deploy.yml`).
6. Só faça merge com **CI verde** (lint, tipos, arquitetura, knip, unit/integração, E2E) e revisão.

## 2. Definição de pronto (DoD)

Antes de pedir revisão, rode localmente:

```bash
pnpm check        # biome + tsc + dependency-cruiser + knip + vitest
pnpm build && pnpm test:e2e
```

- [ ] Testes novos/atualizados: **unit** (`*.test.ts`), **integração** (`*.test.tsx`, componentes + regras), **E2E** (`e2e/*.spec.ts`).
- [ ] Cobertura não cai (Codecov comenta no PR; patch ≥ 80%).
- [ ] Interface segue o **Motion System** (seção 4).
- [ ] Erros e eventos de negócio instrumentados (seção 5).
- [ ] Acessível: teclado, foco visível, contraste AA, `prefers-reduced-motion` (axe roda no E2E).

## 3. Arquitetura (contratos verificados por `pnpm arch`)

```
src/app         rotas Next.js (App Router) — só compõe features
src/features    domínios (home, contact…) — regras + UI específica
src/components  UI genérica e primitivos de motion — sem regra de negócio
src/lib         base: tokens, utils, observabilidade — sem React de UI
```

Dependências só descem: `app → features → components → lib`. Sem ciclos.
Features só consomem de outras features a API pública (`contact-form`, `schema`).
Regras de negócio ficam em funções puras e testáveis (ex.: `submit-contact.ts`), separadas de Server Actions.

## 4. Motion System — obrigatório em TODA interface

Detalhes em [`docs/MOTION.md`](docs/MOTION.md). Resumo:

| Requisito | Como fazer |
| --- | --- |
| **Skeleton** | Todo conteúdo assíncrono/lazy tem skeleton com o **mesmo layout** do final (`components/ui/skeleton.tsx`); toda rota tem `loading.tsx`. |
| **Lazy loading** | Blocos interativos abaixo da dobra: `next/dynamic` + `LazySection`; imagens: `LazyImage` (`next/image` lazy + fade/blur). |
| **Entrada** | `Reveal` / `Stagger` + `StaggerItem` (ease-out, 8–24px, stagger 50–80ms). |
| **Saída** | `AnimatePresence` com `exit` ~30% mais rápido (ease-in). |
| **Carregamento** | Botões com `loading`, `ProgressBar` indeterminado, skeleton → crossfade. |
| **Progresso** | `ProgressBar` determinado, `ScrollProgress`, `AnimatedCounter`. |
| **Acessibilidade** | `MotionConfig reducedMotion="user"`; nada essencial depende de animação. |

**Nunca** use valores mágicos de duração/easing: importe de `src/lib/motion.ts`.
Anime apenas `opacity`/`transform` (evite propriedades de layout).

## 5. Observabilidade

Detalhes em [`docs/OBSERVABILITY.md`](docs/OBSERVABILITY.md). Sentry (erros + performance + replay),
OpenTelemetry (traces server-side via OTLP), Datadog (RUM + Logs) e New Relic (Browser).
Todos ligam **apenas por variáveis de ambiente** (`.env.example`) — sem chave = no-op.
Use `logger` de `src/lib/observability/logger.ts` (JSON com `trace_id`); nunca `console.log` solto.
Nunca registre dados pessoais (LGPD).

## 6. Qualidade de código

| Ferramenta | Comando | Papel |
| --- | --- | --- |
| Biome | `pnpm lint` / `pnpm lint:fix` | lint + format + ordenação de imports/classes |
| TypeScript strict | `pnpm typecheck` | `noUncheckedIndexedAccess` ligado |
| dependency-cruiser | `pnpm arch` | contratos de arquitetura |
| Knip | `pnpm knip` | arquivos, exports e dependências mortas |
| Commitlint + Husky | automático | Conventional Commits; lint-staged no pre-commit |
| Vitest + Testing Library | `pnpm test` / `pnpm test:coverage` | unit + integração (limiar 70%) |
| Playwright + axe | `pnpm test:e2e` | E2E desktop/mobile, a11y, reduced-motion |
| Stryker | `pnpm test:mutation` | mutation testing (break < 60%) |
| Codecov | CI | cobertura por PR |

Não desabilite regras, não pule testes e não reduza limiares para "passar a CI" — corrija a causa.

## 7. Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Motion (`motion/react`, `LazyMotion`) ·
Zod · lucide-react · pnpm · Node 22.

## 8. Convenções

- Idioma da UI e da documentação: **português (Brasil)**. Código (identificadores) em inglês.
- Conteúdo editável centralizado em `src/lib/site-config.ts` (números/cases atuais são **ilustrativos**).
- Segredos nunca no repositório — use `.env.local` e secrets do GitHub/Vercel.
