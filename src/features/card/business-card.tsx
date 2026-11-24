import { ArrowUpRight, Download, Globe, Mail, MapPin, Phone } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { BrandSymbol } from "@/components/layout/brand-symbol";
import { InstagramIcon, LinkedinIcon, WhatsAppIcon } from "@/components/layout/social-icons";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { QuarterCircle, RedRule, Stripes, Triangles } from "@/components/ui/brand-shapes";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { stagger } from "@/lib/motion";
import { siteConfig, whatsappMessages } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { normalizePhone } from "./vcard";

/** Rota que entrega o `.vcf` (ver `src/app/cartao/vcard/route.ts`). */
export const VCARD_HREF = "/cartao/vcard";
const VCARD_FILENAME = "bpm-pro.vcf";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface CardAction {
  id: string;
  label: string;
  href: string;
  icon: IconComponent;
  external?: boolean;
  download?: string;
  tone?: "default" | "dark";
}

const actions: readonly CardAction[] = [
  { id: "phone", label: "Ligar", href: `tel:${normalizePhone(siteConfig.phone)}`, icon: Phone },
  { id: "email", label: "E-mail", href: `mailto:${siteConfig.email}`, icon: Mail },
  { id: "instagram", label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon, external: true },
  { id: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedinIcon, external: true },
  { id: "site", label: "Site", href: siteConfig.url, icon: Globe, external: true },
  { id: "maps", label: "Como chegar", href: siteConfig.mapsUrl, icon: MapPin, external: true },
  {
    id: "vcard",
    label: "Salvar contato",
    href: VCARD_HREF,
    icon: Download,
    download: VCARD_FILENAME,
    tone: "dark",
  },
];

const actionBase =
  "group flex min-h-14 w-full items-center gap-4 rounded-lg px-4 font-sans font-semibold text-base " +
  "transition-[transform,background-color,border-color,color] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
  "hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";

const actionTones = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  default: "border border-ink-200 bg-white text-ink-950 hover:border-ink-950",
  dark: "bg-ink-950 text-white hover:bg-ink-800",
} as const;

const iconBoxTones = {
  primary: "bg-white/15 text-white",
  default: "bg-brand-50 text-brand-700",
  dark: "bg-white/10 text-ink-100",
} as const;

function ActionContent({
  icon: IconComp,
  label,
  tone,
  trailing,
}: {
  icon: IconComponent;
  label: string;
  tone: keyof typeof actionTones;
  trailing?: ReactNode;
}) {
  return (
    <>
      <span aria-hidden className={cn("grid size-10 shrink-0 place-items-center rounded-md", iconBoxTones[tone])}>
        <IconComp className="size-5" strokeWidth={1.5} />
      </span>
      <span className="flex-1 text-left">{label}</span>
      {trailing}
    </>
  );
}

function CardActionLink({ action }: { action: CardAction }) {
  const tone = action.tone ?? "default";
  return (
    <a
      href={action.href}
      data-card-action={action.id}
      download={action.download}
      target={action.external ? "_blank" : undefined}
      rel={action.external ? "noopener noreferrer" : undefined}
      className={cn(actionBase, actionTones[tone])}
    >
      <ActionContent
        icon={action.icon}
        label={action.label}
        tone={tone}
        trailing={
          action.external ? (
            <>
              <ArrowUpRight
                aria-hidden
                strokeWidth={1.5}
                className="size-5 shrink-0 text-ink-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              />
              <span className="sr-only"> (abre em nova aba)</span>
            </>
          ) : null
        }
      />
    </a>
  );
}

/** Cartão digital da BPM: identidade + atalhos de contato em botões grandes, pensado para o celular. */
export function BusinessCard() {
  return (
    <div className="bg-ink-100 px-4 pt-[calc(72px+2rem)] pb-16 sm:pt-[calc(72px+3.5rem)] sm:pb-24">
      <div className="mx-auto w-full max-w-[420px]">
        <Reveal as="header" className="relative overflow-hidden rounded-t-xl bg-ink-950 px-6 pt-10 pb-24 text-ink-100">
          <Triangles className="absolute top-0 right-0 size-16" />
          <QuarterCircle className="absolute bottom-0 left-0 size-14 -scale-y-100" />
          <BrandSymbol className="h-14 text-ink-100" />
          <RedRule className="mt-8" />
          <h1 className="mt-4 font-display font-semibold text-[1.75rem] text-white uppercase leading-[1.1] tracking-wide">
            {siteConfig.fullName}
          </h1>
          <p className="mt-4 max-w-[30ch] text-ink-400 text-sm leading-relaxed">{siteConfig.summary}</p>
          <Stripes count={3} className="absolute right-0 bottom-6 w-2/5" />
        </Reveal>

        <div className="rounded-b-xl bg-white p-4 shadow-elevation-2 sm:p-5">
          <Stagger as="ul" className="flex flex-col gap-3" gap={stagger.tight}>
            <StaggerItem as="li">
              <WhatsAppLink
                unstyled
                context="card"
                message={whatsappMessages.default}
                className={cn(actionBase, actionTones.primary)}
              >
                <ActionContent
                  icon={WhatsAppIcon}
                  label="WhatsApp"
                  tone="primary"
                  trailing={
                    <ArrowUpRight
                      aria-hidden
                      strokeWidth={1.5}
                      className="size-5 shrink-0 text-white/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                    />
                  }
                />
              </WhatsAppLink>
            </StaggerItem>
            {actions.map((action) => (
              <StaggerItem as="li" key={action.id}>
                <CardActionLink action={action} />
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-5 text-center text-ink-600 text-xs">
            {siteConfig.domain} · {siteConfig.address}
          </p>
        </div>
      </div>
    </div>
  );
}
