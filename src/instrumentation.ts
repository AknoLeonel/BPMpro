import * as Sentry from "@sentry/nextjs";
import { readObservabilityConfig } from "@/lib/observability/config";

/**
 * Bootstrap server-side (Node e Edge).
 * - OpenTelemetry: traces de rotas, fetch e Server Actions exportados via OTLP
 *   (Datadog Agent, New Relic OTLP, Grafana, Honeycomb, Jaeger...).
 * - Sentry: erros e performance do servidor.
 */
export async function register() {
  const config = readObservabilityConfig(process.env);

  if (config.otel.endpoint) {
    const { registerOTel } = await import("@vercel/otel");
    registerOTel({ serviceName: config.otel.serviceName });
  }

  if (config.sentry) {
    Sentry.init({
      dsn: config.sentry.dsn,
      environment: config.environment,
      tracesSampleRate: config.environment === "production" ? 0.2 : 1,
    });
  }
}

export const onRequestError = Sentry.captureRequestError;
