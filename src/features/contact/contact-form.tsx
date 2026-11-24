"use client";

import { AlertCircle, CheckCircle2, ChevronDown, Send } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { type ReactNode, useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { duration, easing, exitDuration } from "@/lib/motion";
import { contact, whatsappMessages } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { sendContact } from "./actions";
import { type ContactField, type ContactState, contactAreas, contactStages, type FieldErrors } from "./schema";

/** Ordem visual dos campos — usada para focar o primeiro inválido. */
const fieldOrder = [
  "name",
  "organization",
  "role",
  "city",
  "whatsapp",
  "email",
  "area",
  "stage",
  "message",
  "consent",
] as const satisfies readonly ContactField[];

const fieldId = (key: ContactField) => `contact-${key}`;
const errorId = (key: ContactField) => `contact-${key}-error`;

const controlClass =
  "block h-12 w-full rounded-sm border border-ink-300 bg-white px-4 text-base text-ink-950 transition-[border-color,box-shadow] duration-200 " +
  "placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-400/30 " +
  "aria-invalid:border-signal-700 aria-invalid:focus:ring-signal-700/20 motion-reduce:transition-none";

const PRIVACY_LABEL = "Política de Privacidade";

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <m.p
          id={id}
          className="mt-1.5 flex items-start gap-1.5 text-[0.8125rem] text-signal-700 leading-snug"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0, transition: { duration: duration.small, ease: easing.enter } }}
          exit={{ opacity: 0, transition: { duration: exitDuration(duration.small), ease: easing.exit } }}
        >
          <AlertCircle aria-hidden className="mt-px size-4 shrink-0" strokeWidth={1.5} />
          {message}
        </m.p>
      ) : null}
    </AnimatePresence>
  );
}

function Field({
  name,
  label,
  error,
  hint,
  children,
  className,
}: {
  name: ContactField;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={fieldId(name)} className="font-medium text-ink-800 text-sm">
          {label}
        </label>
        {hint ? (
          <span id={`${fieldId(name)}-hint`} className="text-ink-600 text-xs">
            {hint}
          </span>
        ) : null}
      </div>
      {children}
      <FieldError id={errorId(name)} message={error} />
    </div>
  );
}

function ariaFor(key: ContactField, errors: FieldErrors, extraDescribedBy?: string) {
  const describedBy = [extraDescribedBy, errors[key] ? errorId(key) : undefined].filter(Boolean).join(" ");
  return {
    id: fieldId(key),
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": describedBy || undefined,
  };
}

function SelectControl({
  name,
  options,
  value,
  errors,
}: {
  name: "area" | "stage";
  options: readonly string[];
  value?: string;
  errors: FieldErrors;
}) {
  return (
    <div className="relative">
      <select
        required
        defaultValue={value && options.includes(value) ? value : ""}
        className={cn(controlClass, "appearance-none pr-11")}
        {...ariaFor(name, errors)}
      >
        <option value="" disabled>
          Selecione…
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden
        strokeWidth={1.5}
        className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink-600"
      />
    </div>
  );
}

function ConsentText() {
  const [before, after] = contact.consent.split(PRIVACY_LABEL);
  if (after === undefined) return <>{contact.consent}</>;
  return (
    <>
      {before}
      <Link
        href="/privacidade"
        className="font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
      >
        {PRIVACY_LABEL}
      </Link>
      {after}
    </>
  );
}

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const errors: FieldErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  // React 19 reinicia o <form> após a action, mas <select> não volta ao `defaultValue`:
  // remontamos os selects a cada nova resposta para restaurar a opção escolhida.
  const lastState = useRef(state);
  const responseCount = useRef(0);
  if (lastState.current !== state) {
    lastState.current = state;
    responseCount.current += 1;
  }

  // Após um envio com erros, leva o foco ao primeiro campo inválido.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = fieldOrder.find((key) => state.fieldErrors?.[key]);
    if (!first) return;
    const element = formRef.current?.querySelector<HTMLElement>(`#${fieldId(first)}`);
    element?.focus();
  }, [state]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <m.div
            key="success"
            role="status"
            className="flex min-h-[28rem] flex-col items-center justify-center rounded-md bg-brand-50 px-6 py-12 text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0, transition: { duration: duration.large, ease: easing.enter } }}
          >
            <span className="inline-flex size-16 items-center justify-center rounded-full bg-white text-brand-700">
              <CheckCircle2 aria-hidden className="size-9" strokeWidth={1.5} />
            </span>
            <p className="mt-6 max-w-sm text-balance font-display font-semibold text-ink-950 text-xl leading-snug">
              {state.message}
            </p>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            action={action}
            noValidate
            aria-label="Formulário de contato"
            className="space-y-5"
            exit={{ opacity: 0, y: -8, transition: { duration: exitDuration(duration.medium), ease: easing.exit } }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Nome" error={errors.name}>
                <input
                  autoComplete="name"
                  required
                  defaultValue={values.name}
                  className={controlClass}
                  {...ariaFor("name", errors)}
                />
              </Field>
              <Field name="organization" label="Entidade" error={errors.organization}>
                <input
                  autoComplete="organization"
                  required
                  defaultValue={values.organization}
                  className={controlClass}
                  {...ariaFor("organization", errors)}
                />
              </Field>
              <Field name="role" label="Cargo" error={errors.role}>
                <input
                  autoComplete="organization-title"
                  required
                  defaultValue={values.role}
                  className={controlClass}
                  {...ariaFor("role", errors)}
                />
              </Field>
              <Field name="city" label="Cidade e UF" error={errors.city}>
                <input
                  autoComplete="address-level2"
                  required
                  placeholder="Brasília/DF"
                  defaultValue={values.city}
                  className={controlClass}
                  {...ariaFor("city", errors)}
                />
              </Field>
              <Field name="whatsapp" label="WhatsApp" error={errors.whatsapp}>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="(61) 90000-0000"
                  defaultValue={values.whatsapp}
                  className={controlClass}
                  {...ariaFor("whatsapp", errors)}
                />
              </Field>
              <Field name="email" label="E-mail" error={errors.email}>
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  defaultValue={values.email}
                  className={controlClass}
                  {...ariaFor("email", errors)}
                />
              </Field>
              <Field name="area" label="Área" error={errors.area}>
                <SelectControl
                  key={`area-${responseCount.current}`}
                  name="area"
                  options={contactAreas}
                  value={values.area}
                  errors={errors}
                />
              </Field>
              <Field name="stage" label="Em que etapa você está?" error={errors.stage}>
                <SelectControl
                  key={`stage-${responseCount.current}`}
                  name="stage"
                  options={contactStages}
                  value={values.stage}
                  errors={errors}
                />
              </Field>
            </div>

            <Field name="message" label="Mensagem" hint="Opcional" error={errors.message}>
              <textarea
                rows={4}
                maxLength={2000}
                defaultValue={values.message}
                className={cn(controlClass, "h-auto min-h-28 resize-y py-3")}
                {...ariaFor("message", errors, `${fieldId("message")}-hint`)}
              />
            </Field>

            <div>
              <div className="flex min-h-11 items-start gap-3">
                <input
                  type="checkbox"
                  value="on"
                  required
                  defaultChecked={values.consent === "on"}
                  className="mt-0.5 size-5 shrink-0 cursor-pointer rounded-[4px] border-ink-300 accent-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
                  {...ariaFor("consent", errors)}
                />
                <label htmlFor={fieldId("consent")} className="cursor-pointer text-ink-700 text-sm leading-relaxed">
                  <ConsentText />
                </label>
              </div>
              <FieldError id={errorId("consent")} message={errors.consent} />
            </div>

            <div aria-hidden className="hidden">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            {state.status === "error" && !state.fieldErrors ? (
              <div role="alert" className="rounded-sm bg-signal-700/10 px-4 py-3 text-signal-700 text-sm">
                <p className="flex items-start gap-2">
                  <AlertCircle aria-hidden className="mt-px size-4 shrink-0" strokeWidth={1.5} />
                  {state.message}
                </p>
                <WhatsAppLink
                  unstyled
                  context="contact-error"
                  message={whatsappMessages.default}
                  className="mt-2 inline-flex min-h-11 items-center font-semibold underline underline-offset-2 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-700"
                >
                  Falar pelo WhatsApp
                </WhatsAppLink>
              </div>
            ) : null}

            <Button type="submit" size="lg" loading={pending} className="w-full">
              {pending ? "Enviando…" : contact.submit}
              {pending ? null : (
                <Send
                  aria-hidden
                  strokeWidth={1.5}
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              )}
            </Button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
