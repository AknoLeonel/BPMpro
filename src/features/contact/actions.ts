"use server";

import * as Sentry from "@sentry/nextjs";
import type { ContactState } from "./schema";
import { submitContact } from "./submit-contact";

/** Integração real (CRM/e-mail) entra aqui; por padrão apenas registra o lead. */
async function deliverLead(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 600));
}

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  return Sentry.withServerActionInstrumentation("sendContact", { recordResponse: false }, () =>
    submitContact(Object.fromEntries(formData), deliverLead),
  );
}
