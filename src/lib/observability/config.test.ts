import { describe, expect, it } from "vitest";
import { readObservabilityConfig } from "./config";

describe("readObservabilityConfig", () => {
  it("sem variáveis, todos os provedores ficam desligados (no-op)", () => {
    const config = readObservabilityConfig({});
    expect(config).toEqual({
      environment: "development",
      sentry: null,
      datadog: null,
      newRelic: null,
      otel: { serviceName: "bpmpro-web", endpoint: null },
    });
  });

  it("ignora valores em branco", () => {
    expect(readObservabilityConfig({ NEXT_PUBLIC_SENTRY_DSN: "  " }).sentry).toBeNull();
  });

  it("liga cada provedor quando as chaves existem", () => {
    const config = readObservabilityConfig({
      NEXT_PUBLIC_APP_ENV: "production",
      NEXT_PUBLIC_SENTRY_DSN: "https://k@o.ingest.sentry.io/1",
      NEXT_PUBLIC_DD_APPLICATION_ID: "app",
      NEXT_PUBLIC_DD_CLIENT_TOKEN: "tok",
      NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID: "acc",
      NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID: "nrapp",
      NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY: "lic",
      OTEL_SERVICE_NAME: "svc",
      OTEL_EXPORTER_OTLP_ENDPOINT: "http://collector:4318",
    });
    expect(config.environment).toBe("production");
    expect(config.sentry).toEqual({ dsn: "https://k@o.ingest.sentry.io/1" });
    expect(config.datadog).toEqual({ applicationId: "app", clientToken: "tok", site: "datadoghq.com" });
    expect(config.newRelic).toEqual({ accountId: "acc", applicationId: "nrapp", licenseKey: "lic", trustKey: "acc" });
    expect(config.otel).toEqual({ serviceName: "svc", endpoint: "http://collector:4318" });
  });

  it("Datadog exige application id E client token", () => {
    expect(readObservabilityConfig({ NEXT_PUBLIC_DD_APPLICATION_ID: "app" }).datadog).toBeNull();
  });

  it("respeita site Datadog e trust key New Relic explícitos", () => {
    const config = readObservabilityConfig({
      NEXT_PUBLIC_DD_APPLICATION_ID: "a",
      NEXT_PUBLIC_DD_CLIENT_TOKEN: "t",
      NEXT_PUBLIC_DD_SITE: "us5.datadoghq.com",
      NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID: "acc",
      NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID: "app",
      NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY: "lic",
      NEXT_PUBLIC_NEW_RELIC_TRUST_KEY: "trust",
    });
    expect(config.datadog?.site).toBe("us5.datadoghq.com");
    expect(config.newRelic?.trustKey).toBe("trust");
  });
});
