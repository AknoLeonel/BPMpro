import { trace } from "@opentelemetry/api";

type Level = "debug" | "info" | "warn" | "error";
type Fields = Record<string, unknown>;

export interface LogRecord extends Fields {
  level: Level;
  msg: string;
  time: string;
  trace_id?: string;
  span_id?: string;
}

type Sink = (record: LogRecord) => void;

const defaultSink: Sink = (record) => {
  const line = JSON.stringify(record);
  if (record.level === "error") console.error(line);
  else if (record.level === "warn") console.warn(line);
  else console.log(line);
};

/**
 * Logger estruturado (JSON) que correlaciona cada linha com o trace/span
 * OpenTelemetry ativo — Datadog, New Relic e qualquer backend OTLP
 * conseguem ligar log ↔ trace automaticamente.
 */
export function createLogger(base: Fields = {}, sink: Sink = defaultSink) {
  const emit = (level: Level, msg: string, fields: Fields = {}) => {
    const spanContext = trace.getActiveSpan()?.spanContext();
    sink({
      ...base,
      ...fields,
      level,
      msg,
      time: new Date().toISOString(),
      ...(spanContext ? { trace_id: spanContext.traceId, span_id: spanContext.spanId } : {}),
    });
  };
  return {
    debug: (msg: string, fields?: Fields) => emit("debug", msg, fields),
    info: (msg: string, fields?: Fields) => emit("info", msg, fields),
    warn: (msg: string, fields?: Fields) => emit("warn", msg, fields),
    error: (msg: string, fields?: Fields) => emit("error", msg, fields),
    child: (fields: Fields) => createLogger({ ...base, ...fields }, sink),
  };
}

export const logger = createLogger({ service: "bpmpro-web" });
