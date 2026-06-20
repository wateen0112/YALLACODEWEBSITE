"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "../ui/ProjectCard";
import type { Project } from "@/lib/projects";
import { projects as fallbackProjects } from "@/lib/projects";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProjectsSection() {
  const t = useTranslations("home");
  const tProjects = useTranslations("projects");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const header = headerRef.current;
      if (!track || !header) return;

      const totalWidth = track.scrollWidth - window.innerWidth;
      if (totalWidth <= 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
        },
      });

      // Header visible at start, fades out as scrolling begins
      tl.fromTo(
        header,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -40, ease: "power2.in", duration: 0.15 },
        0
      );

      // Track scrolls horizontally
      tl.fromTo(
        track,
        { x: 0 },
        { x: isRtl ? totalWidth : -totalWidth, ease: "none", duration: 0.85 },
        0.15
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isRtl, projectList]);

  const displayProjects = projectList.length > 0 ? projectList : fallbackProjects;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-[420vh] overflow-hidden bg-background"
    >
      <div className=" top-0  overflow-hidden">
        {/* Section header — fades out as scroll begins */}
        <div
          ref={headerRef}
          className="shrink-0 px-4 md:px-8 lg:ps-36 pb-6 pointer-events-none"
        >
          <div className="max-w-xl absolute top-36  text-start">
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4">
              {t("projects_badge")}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              {t("projects_title")}
            </h2>
            <p className="mt-4 text-xl text-text-secondary max-w-md">
              {tProjects("subtitle")}
            </p>
          </div>
        </div>

        {/* Horizontal card track */}
        <div className="flex-1 flex items-center min-h-0 relative z-10">
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-10 px-6  pt-30 md:px-[500px] items-center will-change-transform"
          >
            <div className="w-[8vw] md:w-[10vw]  flex-shrink-0" />
            {displayProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
            <div className="w-[8vw] md:w-[10vw] flex-shrink-0" />
          </div>
        </div>

        {/* Loading / error states */}
        {isLoading ? (
          <p className="absolute bottom-12 inset-x-0 text-center text-text-secondary z-20">
            {t("projects_loading")}
          </p>
        ) : null}
        {!isLoading && hasError && projectList.length === 0 ? (
          <p className="absolute bottom-12 inset-x-0 text-center text-text-secondary/70 z-20">
            {t("projects_fallback")}
          </p>
        ) : null}
      </div>
    </section>
  );
}
