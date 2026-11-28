import { Lock, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { BrandBand } from "@/components/ui/brand-shapes";
import { Container } from "@/components/ui/container";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { restrictedAreaLink } from "@/lib/routes";
import { footer, siteConfig, visibility, whatsappMessages } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { CurrentYear } from "./current-year";
import { Logo } from "./logo";
import { WhatsAppIcon } from "./social-icons";
import { SocialLinks } from "./social-links";

const linkClasses =
  "rounded-sm text-ink-400 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

const headingClasses = "font-sans font-semibold text-ink-100 text-xs uppercase tracking-[0.18em]";

export function Footer() {
  const showCnpj = visibility.cnpj && siteConfig.cnpj.length > 0;

  return (
    <footer className="bg-ink-950 text-ink-400">
      <BrandBand />
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="md:col-span-2 lg:col-span-6">
          <Logo tone="light" />
          <p className="mt-8 max-w-md font-display text-2xl text-white leading-snug sm:text-[1.75rem]">
            {footer.signature}
          </p>
          <SocialLinks variant="onDark" className="mt-8" />
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-3">
          <h2 className={headingClasses}>Navegação</h2>
          <ul className="mt-5 space-y-1">
            {footer.links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={cn(linkClasses, "inline-flex min-h-11 items-center")}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className={headingClasses}>Contato</h2>
          <ul className="mt-5 space-y-1">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className={cn(linkClasses, "inline-flex min-h-11 items-center gap-3")}
              >
                <Mail aria-hidden className="size-5 shrink-0 text-brand-400" strokeWidth={1.5} />
                {siteConfig.email}
              </a>
            </li>
            <li>
              <WhatsAppLink
                unstyled
                context="footer"
                message={whatsappMessages.default}
                className={cn(linkClasses, "inline-flex min-h-11 items-center gap-3")}
              >
                <WhatsAppIcon className="size-5 shrink-0 text-whatsapp" />
                WhatsApp
              </WhatsAppLink>
            </li>
            <li className="flex min-h-11 items-center gap-3">
              <MapPin aria-hidden className="size-5 shrink-0 text-brand-400" strokeWidth={1.5} />
              {siteConfig.address}
            </li>
          </ul>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-3 border-ink-800 border-t py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.fullName}
            {showCnpj ? <span data-testid="footer-cnpj"> · CNPJ {siteConfig.cnpj}</span> : null}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href={restrictedAreaLink.href}
              className={cn(linkClasses, "inline-flex min-h-11 items-center gap-2 self-start sm:self-auto")}
            >
              <Lock aria-hidden className="size-4 shrink-0" strokeWidth={1.5} />
              {restrictedAreaLink.label}
            </Link>
            <p className="flex items-center gap-3">
              <span aria-hidden className="block h-0.5 w-6 bg-signal-500" />
              {siteConfig.domain}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
