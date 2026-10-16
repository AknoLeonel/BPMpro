import { beforeEach, describe, expect, it, vi } from "vitest";
import { initBrowserObservability } from "./browser";
import { readObservabilityConfig } from "./config";

const rumInit = vi.fn();
const logsInit = vi.fn();
const BrowserAgent = vi.fn();

vi.mock("@datadog/browser-rum", () => ({ datadogRum: { init: (o: unknown) => rumInit(o) } }));
vi.mock("@datadog/browser-logs", () => ({ datadogLogs: { init: (o: unknown) => logsInit(o) } }));
vi.mock("@newrelic/browser-agent/loaders/browser-agent", () => ({
  BrowserAgent: class {
    constructor(o: unknown) {
      BrowserAgent(o);
    }
  },
}));

describe("initBrowserObservability", () => {
  beforeEach(() => vi.clearAllMocks());

  it("não carrega nenhum agente sem configuração", async () => {
    expect(await initBrowserObservability(readObservabilityConfig({}))).toEqual([]);
    expect(rumInit).not.toHaveBeenCalled();
    expect(BrowserAgent).not.toHaveBeenCalled();
  });

  it("inicializa Datadog RUM + Logs e New Relic quando configurados", async () => {
    const started = await initBrowserObservability(
      readObservabilityConfig({
        NEXT_PUBLIC_APP_ENV: "staging",
        NEXT_PUBLIC_DD_APPLICATION_ID: "app",
        NEXT_PUBLIC_DD_CLIENT_TOKEN: "tok",
        NEXT_PUBLIC_NEW_RELIC_ACCOUNT_ID: "acc",
        NEXT_PUBLIC_NEW_RELIC_APPLICATION_ID: "nr",
        NEXT_PUBLIC_NEW_RELIC_LICENSE_KEY: "lic",
      }),
    );
    expect(started).toEqual(["datadog", "newrelic"]);
    expect(rumInit).toHaveBeenCalledWith(
      expect.objectContaining({
        applicationId: "app",
        clientToken: "tok",
        env: "staging",
        defaultPrivacyLevel: "mask-user-input",
      }),
    );
    expect(logsInit).toHaveBeenCalledWith(expect.objectContaining({ forwardErrorsToLogs: true }));
    expect(BrowserAgent).toHaveBeenCalledWith(
      expect.objectContaining({ info: expect.objectContaining({ licenseKey: "lic", applicationID: "nr" }) }),
    );
  });
});
