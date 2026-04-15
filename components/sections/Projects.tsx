"use client";

import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";
import { ProjectCard } from "../ui/ProjectCard";

export function ProjectsSection() {
  const t = useTranslations("home");
  const tProjects = useTranslations("projects");

  return (
    <section id="projects" className="py-24 bg-surface/30 border-y border-primary-600/10">
        <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center justify-between mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("projects_title")}</h2>
                <p className="text-text-secondary max-w-2xl">
                    {tProjects("subtitle")}
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    </section>
  );
}
