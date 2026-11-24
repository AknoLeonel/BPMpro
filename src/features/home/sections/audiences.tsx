import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/layout/social-icons";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { audiences } from "@/lib/site-config";

function stepNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/** "Para quem": cada card inteiro abre o WhatsApp com a mensagem do momento da entidade. */
export function Audiences() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading id="para-quem-title" eyebrow="Para quem" title={audiences.title} align="center" />

        <Stagger as="ul" className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {audiences.items.map((item, index) => (
            <StaggerItem as="li" key={item.title} className="h-full">
              <WhatsAppLink
                unstyled
                message={item.message}
                context={`audience-${index}`}
                aria-label={`Falar no WhatsApp: ${item.title}`}
                className="group flex h-full min-h-72 flex-col rounded-lg border border-ink-800 bg-ink-950 p-7 transition-[translate,border-color,box-shadow] duration-200 ease-out hover:border-brand-400 hover:shadow-elevation-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white motion-safe:hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden
                    className="font-display font-semibold text-5xl text-signal-500 tabular-nums leading-none"
                  >
                    {stepNumber(index)}
                  </span>
                  <Icon name={item.icon} className="size-7 text-brand-300" />
                </div>
                <h3 className="mt-8 font-display font-semibold text-white text-xl leading-snug">{item.title}</h3>
                <p className="mt-3 text-ink-400 text-sm leading-relaxed">{item.description}</p>
                <span className="mt-auto flex items-center gap-2 pt-8 font-semibold text-brand-300 text-sm">
                  <WhatsAppIcon className="size-4 shrink-0" />
                  Conversar no WhatsApp
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.5}
                    className="size-4 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
                  />
                </span>
              </WhatsAppLink>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
