import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { BrandSymbol } from "@/components/layout/brand-symbol";
import { LazySection } from "@/components/motion/lazy-section";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import type { ProductOption } from "@/lib/products";
import { contact, siteConfig, whatsappMessages } from "@/lib/site-config";
import { ContactFormSkeleton } from "./skeletons";

const ContactForm = dynamic(() => import("@/features/contact/contact-form").then((mod) => mod.ContactForm), {
  loading: () => <ContactFormSkeleton />,
});

const MAP_TITLE = "Mapa do escritório da BPM em Brasília";

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 font-medium text-white underline decoration-white/50 underline-offset-4 " +
  "transition-colors hover:decoration-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-500 motion-reduce:transition-none";

function MapPlaceholder() {
  return <div aria-hidden data-testid="map-skeleton" className="aspect-[4/3] w-full bg-brand-600 sm:aspect-[21/9]" />;
}

export interface ContactProps {
  /** Produto pré-selecionado no formulário (ex.: páginas de selo). */
  defaultProduct?: ProductOption;
  /** Id da seção; o título usa `${id}-title`. */
  id?: string;
}

/** Seção 13 — chamada final, contatos, formulário e mapa. */
export function Contact({ defaultProduct, id = "contato" }: ContactProps = {}) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className="relative overflow-hidden bg-brand-500 py-20 lg:py-28">
      <BrandSymbol className="pointer-events-none absolute -top-10 -right-16 h-80 text-brand-600 sm:h-[28rem] lg:-right-10" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <SectionHeading
              id={titleId}
              tone="dark"
              align="left"
              title={contact.title}
              description={contact.subtitle}
            />
            <Reveal delay={0.1} className="mt-10">
              <WhatsAppLink
                variant="inverse"
                size="lg"
                context="contact"
                message={whatsappMessages.default}
                className="w-full sm:w-auto"
              >
                Falar pelo WhatsApp
              </WhatsAppLink>
            </Reveal>
            <Stagger as="ul" className="mt-10 space-y-4 border-white/25 border-t pt-8 text-white">
              <StaggerItem as="li" className="flex items-center gap-3">
                <Mail aria-hidden strokeWidth={1.5} className="size-5 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className={linkClass}>
                  {siteConfig.email}
                </a>
              </StaggerItem>
              <StaggerItem as="li" className="flex items-start gap-3">
                <MapPin aria-hidden strokeWidth={1.5} className="mt-3 size-5 shrink-0" />
                <div className="flex flex-wrap items-center gap-x-4">
                  <span className="py-2.5">{siteConfig.address}</span>
                  <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Ver no mapa
                    <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-4" />
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </div>
              </StaggerItem>
            </Stagger>
          </div>

          <Reveal direction="up" delay={0.1}>
            <div className="rounded-lg bg-white p-6 shadow-elevation-3 sm:p-8 lg:p-10">
              <LazySection fallback={<ContactFormSkeleton />}>
                <ContactForm defaultProduct={defaultProduct} />
              </LazySection>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16 sm:mt-20">
          <div className="overflow-hidden rounded-lg ring-1 ring-white/20">
            <LazySection fallback={<MapPlaceholder />} rootMargin="0px">
              <iframe
                src={siteConfig.mapEmbedUrl}
                title={MAP_TITLE}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block aspect-[4/3] w-full border-0 sm:aspect-[21/9]"
              />
            </LazySection>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
