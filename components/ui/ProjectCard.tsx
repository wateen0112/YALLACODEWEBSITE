"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
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
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 396, damping: 56 }}
      className="group relative rounded-[24px] overflow-hidden bg-surface-glass-strong border border-white/10 shadow-xl"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <button
            onClick={() => router.push(`/projects/${project.id}`)}
            className="text-white font-bold flex items-center gap-2 bg-gradient-nftify px-6 py-3 rounded-[58px] hover:shadow-glow-cyan transition-shadow"
          >
            {t("view_project")} <ArrowUpRight className="w-5 h-5 rtl:scale-x-[-1]" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-surface-glass-strong text-accent-cyan rounded-full backdrop-blur-md border border-white/10">
            {translatedStatus}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold font-satoshi mb-2 text-white">{translatedTitle}</h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{translatedDescription}</p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="px-3 py-1 text-xs bg-white/5 text-text-muted rounded-lg border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
