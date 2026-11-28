import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Projects } from "@/features/home/sections/projects";
import { ProjectsPage } from "@/features/projects/projects-page";
import { routes } from "@/lib/routes";
import { projects } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Projetos",
  description: projects.subtitle,
  alternates: { canonical: routes.projects },
};

export default function ProjectsRoute() {
  return (
    <>
      <PageHeader eyebrow="Projetos" title="Projetos realizados" />
      <ProjectsPage>
        <Projects />
      </ProjectsPage>
    </>
  );
}
