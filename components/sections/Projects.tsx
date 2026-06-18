"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { ProjectShowcaseCard } from "../ui/ProjectShowcaseCard";
import type { Project } from "@/lib/projects";

export function ProjectsSection() {
  const t = useTranslations("home");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

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

  const displayedProjects = projectList.slice(0, 6);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative"
      style={{ height: `${displayedProjects.length * 100}vh` }}
    >
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <p className="text-center text-text-secondary">Loading projects...</p>
        </div>
      ) : null}

      {!isLoading && hasError ? (
        <div className="h-screen flex items-center justify-center">
          <p className="text-center text-red-400">Unable to load projects from API.</p>
        </div>
      ) : null}

      {!isLoading && !hasError && displayedProjects.length === 0 ? (
        <div className="h-screen flex items-center justify-center">
          <p className="text-center text-text-secondary">No projects returned by API.</p>
        </div>
      ) : null}

      {!isLoading && displayedProjects.length > 0
        ? displayedProjects.map((project, index) => (
            <ProjectShowcaseCard
              key={project.id}
              project={project}
              index={index}
              total={displayedProjects.length}
              scrollYProgress={scrollYProgress}
            />
          ))
        : null}
    </section>
  );
}
