"use client";

import { motion } from "framer-motion";
import { Project } from "@/lib/projects";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

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
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden bg-surface border border-primary-600/20 shadow-xl"
    >
      <div className="relative aspect-video overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={project.coverImage} 
          alt={project.title} 
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <button 
            onClick={() => router.push(`/projects/${project.id}`)}
            className="text-white font-bold flex items-center gap-2 bg-primary-600/80 px-6 py-3 rounded-full hover:bg-primary-600/90 transition-colors"
          >
            {t("view_project")} <ArrowUpRight className="w-5 h-5 rtl:scale-x-[-1]" />
          </button>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-surface/80 text-primary-400 rounded-full backdrop-blur-md border border-primary-600/20">
            {translatedStatus}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-text-primary">{translatedTitle}</h3>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{translatedDescription}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs bg-primary-600/10 text-primary-400 rounded-lg border border-primary-600/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
