import type { ObservabilityConfig } from "./config";

/**
 * Inicializa os agentes de browser (Datadog RUM/Logs e New Relic).
 * Importados dinamicamente: só entram no bundle de quem tem chave configurada.
 */
export async function initBrowserObservability(config: ObservabilityConfig): Promise<string[]> {
  const started: string[] = [];

  if (config.datadog) {
    const [{ datadogRum }, { datadogLogs }] = await Promise.all([
      import("@datadog/browser-rum"),
      import("@datadog/browser-logs"),
    ]);
    const common = {
      clientToken: config.datadog.clientToken,
      site: config.datadog.site,
      service: "bpmpro-web",
      env: config.environment,
    } as const;
    datadogRum.init({
      ...common,
      applicationId: config.datadog.applicationId,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
    });
    datadogLogs.init({ ...common, forwardErrorsToLogs: true, sessionSampleRate: 100 });
    started.push("datadog");
  }

  if (config.newRelic) {
    const { BrowserAgent } = await import("@newrelic/browser-agent/loaders/browser-agent");
    const { accountId, applicationId, licenseKey, trustKey } = config.newRelic;
    new BrowserAgent({
      init: { distributed_tracing: { enabled: true }, privacy: { cookies_enabled: true } },
      info: {
        beacon: "bam.nr-data.net",
        errorBeacon: "bam.nr-data.net",
        licenseKey,
        applicationID: applicationId,
        sa: 1,
      },
      loader_config: {
        accountID: accountId,
        trustKey,
        agentID: applicationId,
        licenseKey,
        applicationID: applicationId,
      },
    });
    started.push("newrelic");
  }

  return started;
}
