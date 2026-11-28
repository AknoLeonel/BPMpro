import { FolderOpen } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { stagger } from "@/lib/motion";
import { onlyVisible, type Project, projectItems } from "@/lib/numbers";
import { projects, whatsappMessages } from "@/lib/site-config";

interface ProjectsPageProps {
  /** Galeria exibida quando há projetos visíveis (a rota passa a seção `Projects` da home). */
  children: ReactNode;
  /** Projetos considerados; por padrão os de `numbers.ts` (só os `visible` contam). */
  items?: readonly Project[];
}

/**
 * Conteúdo de /projetos: mostra só projetos autorizados (`visible`). Sem nenhum,
 * exibe um estado vazio honesto — nada de projetos fictícios.
 */
export function ProjectsPage({ children, items = projectItems }: ProjectsPageProps) {
  if (onlyVisible(items).length > 0) return <>{children}</>;
  return (
    <section aria-labelledby="projetos-vazio-title" className="bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            id="projetos-vazio-title"
            align="left"
            title={projects.title}
            description={projects.subtitle}
          />
          <Reveal delay={stagger.base} className="mt-10">
            <WhatsAppLink message={whatsappMessages.default} context="projects-empty" size="lg">
              Falar pelo WhatsApp
            </WhatsAppLink>
          </Reveal>
        </div>
        <Reveal direction="left">
          <div className="flex flex-col gap-5 rounded-lg bg-ink-100 p-8">
            <FolderOpen aria-hidden strokeWidth={1.5} className="size-10 text-brand-700" />
            <p className="text-ink-700 leading-relaxed">
              Cada projeto é publicado aqui somente depois que a entidade autoriza a divulgação.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
