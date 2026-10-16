import { Clock, Mail, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";
import { LazySection } from "@/components/motion/lazy-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/lib/site-config";
import { ContactFormSkeleton } from "./skeletons";

const ContactForm = dynamic(() => import("@/features/contact/contact-form").then((mod) => mod.ContactForm), {
  loading: () => <ContactFormSkeleton />,
});

export function Contact() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-ink-950 py-24 sm:py-32"
    >
      <div aria-hidden className="hero-grid absolute inset-0 opacity-20" />
      <Container className="relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="[&_h2]:text-white [&_p]:text-brand-100">
          <SectionHeading
            id="contato-title"
            align="left"
            eyebrow="Vamos conversar"
            title="Seu próximo projeto começa com um diagnóstico gratuito"
            description="Conte sua ideia. Em até 1 dia útil um especialista retorna com os caminhos de captação mais adequados para sua entidade."
          />
          <ul className="mt-10 space-y-4 text-brand-50">
            <li className="flex items-center gap-3">
              <Clock className="size-5 text-accent-300" aria-hidden /> Resposta em até 1 dia útil
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle className="size-5 text-accent-300" aria-hidden />
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                className="underline-offset-4 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Atendimento via WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-5 text-accent-300" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="underline-offset-4 hover:underline">
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
        <LazySection fallback={<ContactFormSkeleton />}>
          <ContactForm />
        </LazySection>
      </Container>
    </section>
  );
}
