"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProjectCard } from "../ui/ProjectCard";
import type { Project } from "@/lib/projects";

export function ProjectsSection() {
  const t = useTranslations("home");
  const tProjects = useTranslations("projects");
  const locale = useLocale();
  const isRtl = locale === "ar";

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
          if (isMounted) setHasError(true);
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

  const displayProjects = projectList;

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4">
            {t("projects_badge")}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            {t("projects_title")}
          </h2>
          <p className="text-xl text-text-secondary max-w-md">
            {tProjects("subtitle")}
          </p>
        </div>

        {/* Horizontal card track */}
        <div className="flex gap-6 md:gap-10 overflow-x-auto pb-8 scrollbar-hide">
          <div className="w-[8vw] md:w-[10vw] flex-shrink-0" />
          {displayProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <div className="w-[8vw] md:w-[10vw] flex-shrink-0" />
        </div>

        {/* Loading / error states */}
        {isLoading ? (
          <p className="mt-8 text-center text-text-secondary">
            {t("projects_loading")}
          </p>
        ) : null}
        {!isLoading && hasError && projectList.length === 0 ? (
          <p className="mt-8 text-center text-text-secondary/70">
            {t("projects_fallback")}
          </p>
        ) : null}
      </div>
    </section>
  );
}
