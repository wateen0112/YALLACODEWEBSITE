"use client";

import { Project } from "@/lib/projects";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ProjectCard({ project }: { project: Project }) {
  const t = useTranslations("projects");
  const router = useRouter();
  const statusKeyMap: Record<string, string> = {
    Completed: "completed",
    "In Progress": "in_progress",
    "Case Study": "case_study",
    completed: "completed",
    in_progress: "in_progress",
    "in progress": "in_progress",
    case_study: "case_study",
    "case study": "case_study"
  };
  const statusKey = statusKeyMap[project.status] ?? "";
  const titleKey = `items.${project.slug}.title`;
  const descriptionKey = `items.${project.slug}.description`;
  const translatedTitle = t.has(titleKey) ? t(titleKey) : project.title;
  const translatedDescription = t.has(descriptionKey) ? t(descriptionKey) : project.description;
  const translatedStatus = statusKey && t.has(`status.${statusKey}`) ? t(`status.${statusKey}`) : project.status;

  return (
    <article className="glass-card rounded-2xl overflow-hidden hover-card group cursor-pointer">
      <div className="img-zoom relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <button
            onClick={() => router.push(`/projects/${project.id}`)}
            className="text-white font-bold flex items-center gap-2 bg-primary-600/80 px-6 py-3 rounded-full hover:bg-primary-600/90 transition-colors"
          >
            {t("view_project")} <ArrowRight className="w-5 h-5 rtl:scale-x-[-1]" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-surface/80 text-primary-400 rounded-full backdrop-blur-md border border-white/10">
            {translatedStatus}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-text-primary group-hover:text-primary-400 transition-colors">
          {translatedTitle}
        </h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{translatedDescription}</p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="px-3 py-1 text-xs bg-white/5 text-text-secondary rounded-full border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
