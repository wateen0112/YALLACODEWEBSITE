"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ProjectCard } from "../ui/ProjectCard";
import type { Project } from "@/lib/projects";

export function ProjectsSection() {
  const t = useTranslations("home");
  const tProjects = useTranslations("projects");
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setHasError(false);
        const response = await fetch("/api/projects", { cache: "no-store" });
        if (!response.ok) {
          setHasError(true);
          return;
        }

        const data = (await response.json()) as Project[];
        if (isMounted && Array.isArray(data)) {
          setProjectList(data);
        }
      } catch {
        if (isMounted) setHasError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, []);

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
                {projectList.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
            {isLoading ? (
              <p className="mt-6 text-center text-text-secondary">Loading projects...</p>
            ) : null}
            {!isLoading && hasError ? (
              <p className="mt-6 text-center text-red-400">Unable to load projects from API.</p>
            ) : null}
            {!isLoading && !hasError && projectList.length === 0 ? (
              <p className="mt-6 text-center text-text-secondary">No projects returned by API.</p>
            ) : null}
        </div>
    </section>
  );
}
