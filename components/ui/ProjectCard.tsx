"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Code2,
  Brain,
  Map,
  GraduationCap,
  TrendingUp,
  Cloud,
  Shield,
  type LucideIcon,
} from "lucide-react";
import { Project } from "@/lib/projects";

const iconMap: Record<string, LucideIcon> = {
  novapay: Shield,
  healthai: Brain,
  urbannav: Map,
  eduflow: GraduationCap,
  stocksense: TrendingUp,
  cloudops: Cloud,
};

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const t = useTranslations("projects");
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const Icon = iconMap[project.slug] || Code2;

  const statusKeyMap: Record<string, string> = {
    Completed: "completed",
    "In Progress": "in_progress",
    "Case Study": "case_study",
    completed: "completed",
    in_progress: "in_progress",
    "in progress": "in_progress",
    case_study: "case_study",
    "case study": "case_study",
  };
  const statusKey = statusKeyMap[project.status] ?? "";
  const titleKey = `items.${project.slug}.title`;
  const translatedTitle = t.has(titleKey) ? t(titleKey) : project.title;
  const translatedStatus =
    statusKey && t.has(`status.${statusKey}`)
      ? t(`status.${statusKey}`)
      : project.status;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={() => router.push(`/projects/${project.id}`)}
      className="group/spotlight group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-surface/80 transition-all duration-500 hover:border-primary-500/30 w-[320px] sm:w-[360px] md:w-[400px] h-[460px] sm:h-[500px] md:h-[550px]"
      style={
        {
          ["--mouse-x" as string]: `${mousePos.x}px`,
          ["--mouse-y" as string]: `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* Outer spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px z-[5] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(450px circle at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.15), transparent 80%)",
        }}
      />

      {/* Background image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={project.image}
          alt={translatedTitle}
          className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background via-background/80 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />

      {/* Inner spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 z-[15] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(168, 85, 247, 0.12), transparent 80%)",
        }}
      />

      {/* Card content */}
      <div className="relative z-30 flex h-full flex-col justify-between p-6 md:p-8 pointer-events-none">
        <div className="flex w-full items-start justify-between">
          <span className="font-mono text-5xl md:text-6xl font-bold tracking-tighter text-white/30 transition-colors duration-500 group-hover:text-white/10">
            #{padIndex(index)}
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-primary-400 backdrop-blur-md transition-all duration-300 group-hover:bg-primary-600/20 group-hover:text-primary-300 group-hover:scale-110 pointer-events-auto">
            <Icon className="h-6 w-6" aria-hidden />
          </div>
        </div>

        <div>
          <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold bg-surface/80 text-primary-400 rounded-full backdrop-blur-md border border-white/10">
            {translatedStatus}
          </span>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-white transition-transform duration-300 group-hover:translate-x-1">
            {translatedTitle}
          </h3>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-text-secondary opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 pointer-events-auto">
            <span>{t("view_project")}</span>
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </div>
        </div>
      </div>
    </div>
  );
}
