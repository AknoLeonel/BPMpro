import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "./social-icons";

const links = [
  { href: siteConfig.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: siteConfig.social.youtube, label: "YouTube", Icon: YoutubeIcon },
] as const;

const variants = {
  light:
    "bg-white text-ink-600 ring-ink-200 hover:text-brand-600 hover:ring-brand-300 dark:bg-ink-900 dark:text-ink-300 dark:ring-ink-700",
  onDark: "bg-white/10 text-white ring-white/25 hover:bg-white hover:text-brand-700",
} as const;

export function SocialLinks({ variant = "light", className }: { variant?: keyof typeof variants; className?: string }) {
  return (
    <ul className={cn("flex gap-3", className)} aria-label="Redes sociais">
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            rel="noopener noreferrer"
            target="_blank"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-full ring-1 transition-all duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
              variants[variant],
            )}
          >
            <Icon className="size-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
