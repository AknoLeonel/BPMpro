import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { InstagramIcon, LinkedinIcon } from "./social-icons";

const links = [
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
] as const;

const variants = {
  /** Fundos claros (branco/cinza): contorno preto, inverte no hover. */
  light: "text-ink-950 ring-ink-950/25 hover:bg-ink-950 hover:text-white focus-visible:ring-offset-white",
  /** Fundos pretos ou azul-petróleo: contorno claro, inverte no hover. */
  onDark: "text-white ring-white/30 hover:bg-white hover:text-ink-950 focus-visible:ring-offset-ink-950",
} as const;

export function SocialLinks({ variant = "light", className }: { variant?: keyof typeof variants; className?: string }) {
  return (
    <ul className={cn("flex gap-3", className)} aria-label="Redes sociais">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={`${label} (abre em nova aba)`}
            rel="noopener noreferrer"
            target="_blank"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full ring-1 transition-colors duration-200 motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2",
              variants[variant],
            )}
          >
            <Icon className="size-5" strokeWidth={1.5} />
          </a>
        </li>
      ))}
    </ul>
  );
}
