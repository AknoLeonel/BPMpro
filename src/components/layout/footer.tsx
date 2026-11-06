import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { navItems, siteConfig } from "@/lib/site-config";
import { Logo } from "./logo";
import { SocialLinks } from "./social-links";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-ink-100 border-t bg-ink-50/60 dark:border-ink-800 dark:bg-ink-950">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-5 max-w-md text-ink-600 leading-relaxed dark:text-ink-300">{siteConfig.description}</p>
          <SocialLinks className="mt-6" />
        </div>
        <nav aria-label="Rodapé">
          <h2 className="font-semibold text-ink-950 text-sm uppercase tracking-wider dark:text-white">Navegação</h2>
          <ul className="mt-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-semibold text-ink-950 text-sm uppercase tracking-wider dark:text-white">Contato</h2>
          <ul className="mt-4 space-y-3 text-ink-600 dark:text-ink-300">
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-brand-600" aria-hidden />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-600">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-brand-600" aria-hidden />
              {siteConfig.phone}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-brand-600" aria-hidden />
              {siteConfig.address}
            </li>
          </ul>
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-ink-100 border-t py-6 text-ink-500 text-sm sm:flex-row sm:justify-between dark:border-ink-800">
        <p>
          © {year} {siteConfig.fullName}. Todos os direitos reservados.
        </p>
        <p>Feito com propósito no Brasil.</p>
      </Container>
    </footer>
  );
}
