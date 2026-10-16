import { BadgeCheck, CalendarClock, TrendingUp } from "lucide-react";
import { ProgressBar } from "@/components/ui/progress-bar";

const projects = [
  { name: "Escolinha de Vôlei — LIE", stage: "Execução", progress: 72 },
  { name: "Festival Cultural — PNAB", stage: "Captação", progress: 45 },
  { name: "Cozinha Comunitária — Emenda", stage: "Prestação de contas", progress: 94 },
];

/** Mock ilustrativo da plataforma BPMpro (sem dados reais). */
export function DashboardPreview() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/25 via-accent-300/20 to-transparent blur-2xl"
      />
      <figure
        aria-label="Prévia ilustrativa do painel BPMpro"
        className="rounded-3xl border border-white/60 bg-white/80 p-5 shadow-2xl shadow-ink-900/10 backdrop-blur-xl sm:p-7 dark:border-ink-700/60 dark:bg-ink-900/80"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-ink-500 text-xs uppercase tracking-wider">Painel BPMpro</p>
            <p className="mt-1 font-bold text-ink-950 text-lg dark:text-white">Seus projetos</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 text-xs dark:bg-emerald-950 dark:text-emerald-300">
            <TrendingUp className="size-3.5" aria-hidden /> +18% no trimestre
          </span>
        </div>
        <ul className="mt-6 space-y-5">
          {projects.map((project) => (
            <li key={project.name}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="font-medium text-ink-800 dark:text-ink-100">{project.name}</span>
                <span className="shrink-0 text-ink-500 tabular-nums">{project.progress}%</span>
              </div>
              <p className="mt-0.5 text-ink-500 text-xs">{project.stage}</p>
              <ProgressBar className="mt-2" value={project.progress} label={`Progresso de ${project.name}`} />
            </li>
          ))}
        </ul>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-ink-50 p-4 dark:bg-ink-800/60">
            <BadgeCheck className="size-5 text-brand-600" aria-hidden />
            <p className="mt-2 font-bold text-2xl text-ink-950 dark:text-white">100%</p>
            <p className="text-ink-500 text-xs">contas aprovadas</p>
          </div>
          <div className="rounded-2xl bg-ink-50 p-4 dark:bg-ink-800/60">
            <CalendarClock className="size-5 text-accent-500" aria-hidden />
            <p className="mt-2 font-bold text-2xl text-ink-950 dark:text-white">3</p>
            <p className="text-ink-500 text-xs">prazos nesta semana</p>
          </div>
        </div>
      </figure>
    </div>
  );
}
