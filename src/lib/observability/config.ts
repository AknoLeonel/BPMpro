/**
 * Configuração de observabilidade derivada de variáveis de ambiente.
 * Cada provedor é opcional: sem chave, vira no-op (dev/local/CI).
 */
type Env = Record<string, string | undefined>;

export interface ObservabilityConfig {
  environment: string;
  sentry: { dsn: string } | null;
  datadog: { applicationId: string; clientToken: string; site: string } | null;
  newRelic: {
    accountId: string;
    applicationId: string;
    licenseKey: string;
    trustKey: string;
  } | null;
  otel: { serviceName: string; endpoint: string | null };
}

const present = (value: string | undefined): value is string => typeof value === "string" && value.trim().length > 0;

export function readObservabilityConfig(env: Env): ObservabilityConfig {
  const {
    NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_DD_APPLICATION_ID,
    NEXT_PUBLIC_DD_CLIENT_TOKEN,
    NEXT_PUBLIC_DD_SITE,
    NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID,
    NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID,
    NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY,
    NEXT_PUBLIC_NEW_RELIC_TRUST_KEY,
    OTEL_SERVICE_NAME,
    OTEL_EXPORTER_OTLP_ENDPOINT,
  } = env;

  return {
    environment: NEXT_PUBLIC_APP_ENV ?? "development",
    sentry: present(NEXT_PUBLIC_SENTRY_DSN) ? { dsn: NEXT_PUBLIC_SENTRY_DSN } : null,
    datadog:
      present(NEXT_PUBLIC_DD_APPLICATION_ID) && present(NEXT_PUBLIC_DD_CLIENT_TOKEN)
        ? {
            applicationId: NEXT_PUBLIC_DD_APPLICATION_ID,
            clientToken: NEXT_PUBLIC_DD_CLIENT_TOKEN,
            site: present(NEXT_PUBLIC_DD_SITE) ? NEXT_PUBLIC_DD_SITE : "datadoghq.com",
          }
        : null,
    newRelic:
      present(NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID) &&
      present(NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID) &&
      present(NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY)
        ? {
            accountId: NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID,
            applicationId: NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID,
            licenseKey: NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY,
            trustKey: present(NEXT_PUBLIC_NEW_RELIC_TRUST_KEY)
              ? NEXT_PUBLIC_NEW_RELIC_TRUST_KEY
              : NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID,
          }
        : null,
    otel: {
      serviceName: present(OTEL_SERVICE_NAME) ? OTEL_SERVICE_NAME : "bpmpro-web",
      endpoint: present(OTEL_EXPORTER_OTLP_ENDPOINT) ? OTEL_EXPORTER_OTLP_ENDPOINT : null,
    },
  };
}

/**
 * Next.js só inlina `process.env.NEXT_PUBLIC_*` quando acessado literalmente,
 * por isso o objeto é montado campo a campo.
 */
export const publicObservabilityConfig = readObservabilityConfig({
  NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
  NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  NEXT_PUBLIC_DD_APPLICATION_ID: process.env.NEXT_PUBLIC_DD_APPLICATION_ID,
  NEXT_PUBLIC_DD_CLIENT_TOKEN: process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN,
  NEXT_PUBLIC_DD_SITE: process.env.NEXT_PUBLIC_DD_SITE,
  NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID: process.env.NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID,
  NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID: process.env.NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID,
  NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY: process.env.NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY,
  NEXT_PUBLIC_NEW_RELIC_TRUST_KEY: process.env.NEXT_PUBLIC_NEW_RELIC_TRUST_KEY,
});
