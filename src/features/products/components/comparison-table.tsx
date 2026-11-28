import { Reveal } from "@/components/motion/reveal";
import { SealBadge } from "@/components/ui/seal-badge";
import { fichaLimpa, type SealLevel, sealOrder, seals } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ComparisonTableProps {
  /** Destaca a coluna/card de um selo (páginas de detalhe). */
  focus?: SealLevel;
}

const highlight = "bg-brand-50";

/**
 * Prata x Ouro. No md+ é uma tabela de verdade; no celular, dois cards empilhados.
 * A representação inativa sai com display:none, então o leitor de tela só ouve uma.
 */
export function ComparisonTable({ focus }: ComparisonTableProps) {
  const { title, rows } = fichaLimpa.comparison;
  return (
    <Reveal>
      <div className="hidden overflow-hidden rounded-md bg-white shadow-elevation-1 md:block" data-layout="table">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">{title}</caption>
          <colgroup>
            <col className="w-1/4" />
            {sealOrder.map((level) => (
              <col key={level} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="p-6">
                <span className="sr-only">Critério</span>
              </th>
              {sealOrder.map((level) => (
                <th
                  key={level}
                  scope="col"
                  data-focus={focus === level || undefined}
                  className={cn("p-6 align-bottom", focus === level && highlight)}
                >
                  <span className="flex items-center gap-4">
                    <SealBadge level={level} size="sm" />
                    <span className="font-display font-semibold text-2xl text-ink-950">{seals[level].name}</span>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-ink-200 border-t">
                <th
                  scope="row"
                  className="p-6 align-top font-semibold text-ink-600 text-sm uppercase tracking-[0.08em]"
                >
                  {row.label}
                </th>
                {sealOrder.map((level) => (
                  <td
                    key={level}
                    className={cn("p-6 align-top text-ink-950 leading-relaxed", focus === level && highlight)}
                  >
                    {row[level]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:hidden" data-layout="cards">
        {sealOrder.map((level) => (
          <article
            key={level}
            data-focus={focus === level || undefined}
            className={cn("rounded-md bg-white p-6 shadow-elevation-1", focus === level && "ring-2 ring-brand-500")}
          >
            <div className="flex items-center gap-4">
              <SealBadge level={level} size="sm" />
              <h3 className="font-semibold text-2xl text-ink-950">{seals[level].name}</h3>
            </div>
            <dl className="mt-5 divide-y divide-ink-200">
              {rows.map((row) => (
                <div key={row.label} className="py-3">
                  <dt className="font-semibold text-ink-600 text-xs uppercase tracking-[0.08em]">{row.label}</dt>
                  <dd className="mt-1 text-ink-950 leading-relaxed">{row[level]}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
