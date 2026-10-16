import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="BPM — página inicial"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <svg
        viewBox="0 0 40 40"
        className="size-9 transition-transform duration-300 ease-out group-hover:rotate-[-8deg] motion-reduce:transition-none"
        aria-hidden
      >
        <defs>
          <linearGradient id="bpm-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-brand-500)" />
            <stop offset="1" stopColor="var(--color-brand-700)" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="11" fill="url(#bpm-g)" />
        <path
          d="M10 27 L17 17 L22 23 L30 12"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="30" cy="12" r="3.4" fill="var(--color-accent-400)" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-extrabold text-ink-950 text-xl tracking-tight dark:text-white">
          BPM<span className="text-brand-600 dark:text-brand-300">pro</span>
        </span>
        <span className="mt-0.5 hidden text-[0.65rem] text-ink-500 uppercase tracking-[0.2em] sm:block dark:text-ink-400">
          Brasil Projetos em Movimento
        </span>
      </span>
    </Link>
  );
}
