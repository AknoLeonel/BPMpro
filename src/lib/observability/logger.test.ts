import { context, trace } from "@opentelemetry/api";
import { describe, expect, it, vi } from "vitest";
import { createLogger, type LogRecord } from "./logger";

describe("createLogger", () => {
  it("emite JSON estruturado com nível, mensagem e campos base", () => {
    const records: LogRecord[] = [];
    const log = createLogger({ service: "test" }, (r) => records.push(r));
    log.info("hello", { foo: 1 });
    expect(records[0]).toMatchObject({ level: "info", msg: "hello", service: "test", foo: 1 });
    expect(records[0]?.time).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(records[0]).not.toHaveProperty("trace_id");
  });

  it("child herda e estende os campos", () => {
    const sink = vi.fn();
    createLogger({ a: 1 }, sink).child({ b: 2 }).warn("x");
    expect(sink).toHaveBeenCalledWith(expect.objectContaining({ a: 1, b: 2, level: "warn" }));
  });

  it("correlaciona com o span OpenTelemetry ativo", () => {
    const sink = vi.fn();
    const spanContext = { traceId: "a".repeat(32), spanId: "b".repeat(16), traceFlags: 1 };
    const ctx = trace.setSpanContext(context.active(), spanContext);
    vi.spyOn(trace, "getActiveSpan").mockReturnValue(trace.getSpan(ctx));
    createLogger({}, sink).error("boom");
    expect(sink).toHaveBeenCalledWith(
      expect.objectContaining({ trace_id: spanContext.traceId, span_id: spanContext.spanId }),
    );
    vi.restoreAllMocks();
  });

  it("sink padrão escreve no console conforme o nível", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {});
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const error = vi.spyOn(console, "error").mockImplementation(() => {});
    const logger = createLogger();
    logger.debug("d");
    logger.warn("w");
    logger.error("e");
    expect(log).toHaveBeenCalledOnce();
    expect(warn).toHaveBeenCalledOnce();
    expect(error).toHaveBeenCalledOnce();
    expect(JSON.parse(String(error.mock.calls[0]?.[0]))).toMatchObject({ level: "error", msg: "e" });
    vi.restoreAllMocks();
  });
});
