import * as Sentry from "@sentry/nextjs";
import { publicObservabilityConfig as config } from "@/lib/observability/config";

if (config.sentry) {
  Sentry.init({
    dsn: config.sentry.dsn,
    environment: config.environment,
    tracesSampleRate: config.environment === "production" ? 0.2 : 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,
    integrations: [Sentry.replayIntegration({ maskAllInputs: true })],
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
