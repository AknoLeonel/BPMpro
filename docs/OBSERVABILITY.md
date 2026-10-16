# Observabilidade

Todos os provedores são **opcionais e ativados por variáveis de ambiente** (ver `.env.example`).
Sem chaves, nada é carregado (no-op) — dev, CI e testes ficam limpos.

| Sinal | Ferramenta | Onde |
| --- | --- | --- |
| Erros (server/edge/client), performance, Session Replay | **Sentry** | `src/instrumentation.ts`, `src/instrumentation-client.ts`, `app/error.tsx`, `app/global-error.tsx`, Server Action instrumentada |
| Traces server-side (rotas, fetch, Server Actions) | **OpenTelemetry** (`@vercel/otel`, OTLP/HTTP) | `src/instrumentation.ts` → `OTEL_EXPORTER_OTLP_ENDPOINT` |
| RUM, Core Web Vitals, logs do browser | **Datadog** (`@datadog/browser-rum`, `@datadog/browser-logs`) | `src/lib/observability/browser.ts` |
| Browser monitoring, distributed tracing | **New Relic** (`@newrelic/browser-agent`) | `src/lib/observability/browser.ts` |
| Logs estruturados com `trace_id`/`span_id` | logger próprio sobre `@opentelemetry/api` | `src/lib/observability/logger.ts` |

## Como ligar

1. Copie `.env.example` → `.env.local` (local) ou cadastre as variáveis na Vercel/GitHub.
2. **Sentry**: `NEXT_PUBLIC_SENTRY_DSN`; para source maps no build, `SENTRY_ORG`, `SENTRY_PROJECT`, `SENTRY_AUTH_TOKEN`. Eventos do browser passam pelo túnel `/monitoring` (contorna ad-blockers).
3. **OpenTelemetry**: `OTEL_EXPORTER_OTLP_ENDPOINT` (+ `OTEL_EXPORTER_OTLP_HEADERS`). Funciona com o Datadog Agent (OTLP), New Relic OTLP (`https://otlp.nr-data.net`), Grafana, Honeycomb, Jaeger.
4. **Datadog**: `NEXT_PUBLIC_DD_APPLICATION_ID`, `NEXT_PUBLIC_DD_CLIENT_TOKEN`, `NEXT_PUBLIC_DD_SITE`.
5. **New Relic**: `NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID`, `..._APPLICATION_ID`, `..._LICENSE_KEY` (`..._TRUST_KEY` opcional).

Os agentes de browser carregam via `import()` dinâmico após a hidratação (`requestIdleCallback`), fora do caminho crítico.

## Privacidade (LGPD)

- Sentry com `maskAllInputs`; Datadog com `defaultPrivacyLevel: "mask-user-input"`.
- O logger nunca deve receber nome, e-mail ou telefone — registre apenas metadados (ex.: tipo de organização).
