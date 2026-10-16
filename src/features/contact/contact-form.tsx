"use client";

import { CheckCircle2, Send } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { duration, easing, exitDuration } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { sendContact } from "./actions";
import { type ContactState, organizationTypes } from "./schema";

const inputClass =
  "block w-full rounded-xl border-0 bg-ink-50 px-4 py-3 text-ink-950 ring-1 ring-ink-200 transition-shadow duration-200 " +
  "placeholder:text-ink-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 " +
  "dark:bg-ink-800 dark:text-white dark:ring-ink-700 dark:focus:bg-ink-900";

function Field({
  id,
  label,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block font-medium text-ink-800 text-sm dark:text-ink-200">
        {label}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <m.p
            id={`${id}-error`}
            role="alert"
            className="mt-1.5 text-red-600 text-sm dark:text-red-400"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, transition: { duration: duration.small, ease: easing.enter } }}
            exit={{ opacity: 0, transition: { duration: exitDuration(duration.small), ease: easing.exit } }}
          >
            {error}
          </m.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initialState);
  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const aria = (key: keyof typeof errors) =>
    errors[key] ? { "aria-invalid": true, "aria-describedby": `contact-${key}-error` } : {};

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-2xl shadow-ink-950/20 sm:p-8 dark:bg-ink-900">
      <AnimatePresence>
        {pending ? (
          <m.div
            className="absolute inset-x-0 top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: exitDuration(duration.small) } }}
          >
            <ProgressBar label="Enviando mensagem" className="h-1 rounded-none" />
          </m.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <m.div
            key="success"
            role="status"
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: duration.large, ease: easing.enter } }}
          >
            <m.span
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 } }}
              className="inline-flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 dark:bg-brand-950"
            >
              <CheckCircle2 className="size-9" aria-hidden />
            </m.span>
            <h3 className="mt-6 font-bold text-2xl text-ink-950 dark:text-white">Mensagem enviada</h3>
            <p className="mt-2 max-w-sm text-ink-600 dark:text-ink-300">{state.message}</p>
          </m.div>
        ) : (
          <m.form
            key="form"
            action={action}
            noValidate
            className="space-y-5"
            exit={{ opacity: 0, y: -8, transition: { duration: exitDuration(duration.medium), ease: easing.exit } }}
            animate={state.status === "error" && !pending ? { x: [0, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: duration.medium }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="contact-name" label="Nome" error={errors.name}>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  defaultValue={values.name}
                  className={inputClass}
                  {...aria("name")}
                />
              </Field>
              <Field id="contact-email" label="E-mail" error={errors.email}>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={values.email}
                  className={inputClass}
                  {...aria("email")}
                />
              </Field>
              <Field id="contact-phone" label="Telefone / WhatsApp" error={errors.phone}>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(61) 90000-0000"
                  defaultValue={values.phone}
                  className={inputClass}
                  {...aria("phone")}
                />
              </Field>
              <Field id="contact-organizationType" label="Tipo de organização" error={errors.organizationType}>
                <select
                  id="contact-organizationType"
                  name="organizationType"
                  required
                  defaultValue={values.organizationType ?? ""}
                  className={cn(inputClass, "appearance-none")}
                  {...aria("organizationType")}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {organizationTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="contact-message" label="Conte sobre seu projeto" error={errors.message}>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                defaultValue={values.message}
                className={cn(inputClass, "resize-none")}
                {...aria("message")}
              />
            </Field>
            <div aria-hidden className="hidden">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
            </div>
            {state.status === "error" && !state.fieldErrors ? (
              <p
                role="alert"
                className="rounded-xl bg-red-50 px-4 py-3 text-red-700 text-sm dark:bg-red-950 dark:text-red-300"
              >
                {state.message}
              </p>
            ) : null}
            <Button type="submit" size="lg" loading={pending} className="w-full">
              {pending ? "Enviando…" : "Solicitar diagnóstico gratuito"}
              {pending ? null : (
                <Send className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              )}
            </Button>
            <p className="text-center text-ink-500 text-xs">Seus dados são tratados conforme a LGPD.</p>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
