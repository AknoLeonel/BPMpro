import { Check, Lightbulb } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import {
  type ChecklistGroup,
  type ChecklistItem,
  checklistGroups,
  checklistRules,
  groupsForLevel,
  type Sphere,
  tcuCertificates,
  tcuNotes,
} from "@/lib/ficha-limpa-checklist";
import { fichaLimpa, type SealLevel } from "@/lib/products";
import { cn } from "@/lib/utils";
import { Accordion, type AccordionEntry } from "./accordion";

/** Famílias de cor das tags de esfera (todas com contraste AA). */
const sphereStyles: Record<Sphere, string> = {
  Federal: "bg-brand-50 text-brand-800",
  Trabalhista: "bg-brand-50 text-brand-800",
  Tesouro: "bg-brand-50 text-brand-800",
  TCU: "bg-brand-100 text-brand-900",
  CGU: "bg-brand-100 text-brand-900",
  CNJ: "bg-brand-100 text-brand-900",
  GDF: "bg-signal-500/10 text-signal-800",
  TCDF: "bg-signal-500/10 text-signal-800",
  Justiça: "bg-signal-500/10 text-signal-800",
  Esporte: "bg-ink-950 text-white",
  Emendas: "bg-ink-950 text-white",
  Estatuto: "bg-ink-100 text-ink-950",
  Recurso: "bg-gold-100 text-ink-950",
};

const isOuroOnly = (group: ChecklistGroup) => group.items.every((item) => !item.levels.includes("prata"));

function ItemTags({ item }: { item: ChecklistItem }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      <li
        data-tag="sphere"
        className={cn(
          "inline-flex h-7 items-center rounded-full px-3 font-semibold text-xs",
          sphereStyles[item.sphere],
        )}
      >
        <span className="sr-only">Esfera: </span>
        {item.sphere}
      </li>
      {item.documents.map((doc) => (
        <li
          key={doc}
          data-tag="document"
          className="inline-flex h-7 items-center rounded-sm border border-ink-950 bg-white px-2.5 font-display font-semibold text-ink-950 text-xs tracking-[0.08em]"
        >
          <span className="sr-only">Documento: </span>
          {doc}
        </li>
      ))}
    </ul>
  );
}

function GroupHeader({ group }: { group: ChecklistGroup }) {
  const count = group.items.length;
  return (
    <span className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <span className="flex flex-col gap-1.5">
        <span className="font-display font-semibold text-brand-700 text-xs uppercase tracking-[0.14em]">
          {group.eyebrow}
        </span>
        <span className="font-semibold text-xl leading-snug">{group.title}</span>
      </span>
      <span className="flex shrink-0 flex-wrap items-center gap-2">
        {isOuroOnly(group) ? (
          <span className="inline-flex h-7 items-center rounded-full bg-gold-100 px-3 font-semibold text-ink-950 text-xs">
            Selo Ouro
          </span>
        ) : null}
        <span className="inline-flex h-7 items-center rounded-full bg-ink-100 px-3 font-medium text-ink-950 text-xs tabular-nums">
          {count} {count === 1 ? "item" : "itens"}
        </span>
      </span>
    </span>
  );
}

function GroupPanel({ group }: { group: ChecklistGroup }) {
  return (
    <div className="space-y-5 pr-0 sm:pr-14">
      {group.description ? <p className="text-pretty text-ink-600 leading-relaxed">{group.description}</p> : null}
      <ul className="grid gap-3 lg:grid-cols-2">
        {group.items.map((item) => (
          <li key={item.id} data-item={item.id} className="rounded-md border border-ink-200 bg-white p-5">
            <h4 className="font-semibold text-ink-950 leading-snug">{item.name}</h4>
            <p className="mt-2 text-pretty text-ink-600 text-sm leading-relaxed">{item.description}</p>
            {item.where ? (
              <p className="mt-2 text-ink-950 text-sm">
                <span className="font-semibold">Onde:</span> {item.where}
              </p>
            ) : null}
            <ItemTags item={item} />
          </li>
        ))}
      </ul>
      {group.note ? <p className="text-ink-600 text-sm">{group.note}</p> : null}
    </div>
  );
}

function Rules() {
  return (
    <div className="rounded-md bg-ink-100 p-6 sm:p-8">
      <h3 id="regras-title" className="font-semibold text-2xl text-ink-950">
        {fichaLimpa.checklist.rulesTitle}
      </h3>
      <Stagger as="ol" aria-labelledby="regras-title" className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {checklistRules.map((rule, i) => (
          <StaggerItem as="li" key={rule.title} className="flex gap-4 rounded-md bg-white p-5">
            <span aria-hidden className="font-display font-semibold text-2xl text-brand-700 tabular-nums leading-none">
              {i + 1}
            </span>
            <span>
              <span className="block font-semibold text-ink-950 leading-snug">{rule.title}</span>
              <span className="mt-1.5 block text-pretty text-ink-600 text-sm leading-relaxed">{rule.text}</span>
            </span>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

function Mark({ value }: { value: boolean }) {
  return value ? (
    <>
      <Check aria-hidden strokeWidth={2} className="mx-auto size-5 text-brand-700" />
      <span className="sr-only">Sim</span>
    </>
  ) : (
    <>
      <span aria-hidden className="text-ink-600">
        —
      </span>
      <span className="sr-only">Não</span>
    </>
  );
}

function TcuCertificates() {
  return (
    <div className="grid gap-8 rounded-md border border-ink-200 p-6 sm:p-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
      <div>
        <h3 id="tcu-title" className="font-semibold text-2xl text-ink-950">
          As {tcuCertificates.length} certidões do TCU
        </h3>
        <table aria-labelledby="tcu-title" className="mt-6 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-ink-950 border-b-2">
              <th scope="col" className="py-3 pr-3 font-semibold text-ink-950">
                Certidão
              </th>
              <th scope="col" className="w-16 py-3 text-center font-semibold text-ink-950">
                CNPJ
              </th>
              <th scope="col" className="w-16 py-3 text-center font-semibold text-ink-950">
                CPF
              </th>
            </tr>
          </thead>
          <tbody>
            {tcuCertificates.map((certificate) => (
              <tr key={certificate.name} className="border-ink-200 border-b">
                <th scope="row" className="py-3 pr-3 font-medium text-ink-950">
                  {certificate.name}
                </th>
                <td className="py-3 text-center">
                  <Mark value={certificate.cnpj} />
                </td>
                <td className="py-3 text-center">
                  <Mark value={certificate.cpf} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-4 self-center">
        <p className="flex gap-3 rounded-md bg-brand-50 p-5 text-ink-950 leading-relaxed">
          <Lightbulb aria-hidden strokeWidth={1.5} className="mt-0.5 size-5 shrink-0 text-brand-700" />
          <span>{tcuNotes.tip}</span>
        </p>
        <p className="text-pretty text-ink-600 leading-relaxed">{tcuNotes.why}</p>
      </div>
    </div>
  );
}

interface ChecklistAccordionProps {
  /** Mostra só os itens de um selo (o Prata não tem o Pilar 3). Sem nível: todos os grupos. */
  level?: SealLevel;
}

/** "O que conferimos": regras, acordeão por grupo (com tags de esfera e documento) e certidões do TCU. */
export function ChecklistAccordion({ level }: ChecklistAccordionProps) {
  const groups = level ? groupsForLevel(level) : checklistGroups;
  const entries: AccordionEntry[] = groups.map((group) => ({
    id: group.id,
    header: <GroupHeader group={group} />,
    content: <GroupPanel group={group} />,
  }));
  const first = groups[0]?.id;
  return (
    <div className="space-y-12">
      <Rules />
      <Accordion items={entries} multiple defaultOpen={first ? [first] : []} />
      <TcuCertificates />
    </div>
  );
}
