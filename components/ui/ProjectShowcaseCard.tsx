"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Project } from "@/lib/projects";

interface ProjectShowcaseCardProps {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

const categoryStyles: Record<string, { bg: string; text: string }> = {
  default: { bg: "bg-blue-500/10", text: "text-blue-400" },
  fintech: { bg: "bg-emerald-500/10", text: "text-emerald-400" },
  health: { bg: "bg-rose-500/10", text: "text-rose-400" },
  education: { bg: "bg-amber-500/10", text: "text-amber-400" },
  logistics: { bg: "bg-cyan-500/10", text: "text-cyan-400" },
  devops: { bg: "bg-violet-500/10", text: "text-violet-400" },
};

const gradientNumbers = [
  "from-blue-500/20 to-cyan-500/10",
  "from-fuchsia-500/20 to-pink-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
  "from-rose-500/20 to-red-500/10",
  "from-violet-500/20 to-purple-500/10",
];

function getCategoryColor(tags: string[] = []) {
  const firstTag = tags[0]?.toLowerCase() ?? "";
  if (firstTag.includes("react") || firstTag.includes("node")) return categoryStyles.fintech;
  if (firstTag.includes("python") || firstTag.includes("tensorflow")) return categoryStyles.health;
  if (firstTag.includes("next") || firstTag.includes("education")) return categoryStyles.education;
  if (firstTag.includes("native") || firstTag.includes("map")) return categoryStyles.logistics;
  if (firstTag.includes("docker") || firstTag.includes("kubernetes")) return categoryStyles.devops;
  return categoryStyles.default;
}

export function ProjectShowcaseCard({
  project,
  index,
  total,
  scrollYProgress,
}: ProjectShowcaseCardProps) {
  const t = useTranslations("projects");
  const isReversed = index % 2 === 1;

  const coverageStart = index / total;
  const coverageEnd = (index + 1) / total;

  const coveredProgress = useTransform(
    scrollYProgress,
    [coverageEnd, Math.min(coverageEnd + 0.2, 1)],
    [0, 1]
  );
  const scale = useTransform(coveredProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(coveredProgress, [0, 1], [1, 0.75]);

  const number = String(index + 1).padStart(2, "0");
  const category = project.tags?.[0] ?? "Application Development";
  const categoryStyle = getCategoryColor(project.tags);
  const numberGradient = gradientNumbers[index % gradientNumbers.length];

  const titleKey = `items.${project.slug}.title`;
  const descriptionKey = `items.${project.slug}.description`;
  const translatedTitle = t.has(titleKey) ? t(titleKey) : project.title;
  const translatedDescription = t.has(descriptionKey) ? t(descriptionKey) : project.description;

  return (
    <motion.div
      className="h-screen w-full sticky top-0 flex flex-col justify-center overflow-hidden bg-background"
      style={{
        zIndex: 10 + index,
        scale,
        opacity,
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 ${
            isReversed ? "right-1/4" : "left-1/4"
          } -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]`}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div
          className={`glass-card rounded-3xl border border-white/10 relative overflow-hidden min-h-[70vh] flex items-center ${
            isReversed ? "flex-row-reverse" : ""
          }`}
        >
          {/* Large background number */}
          <span
            className={`absolute ${
              isReversed ? "left-4" : "right-4"
            } top-4 text-[8rem] sm:text-[10rem] lg:text-[14rem] font-bold leading-none bg-gradient-to-b ${numberGradient} bg-clip-text text-transparent pointer-events-none select-none`}
          >
            {number}
          </span>

          <div
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full p-6 sm:p-10 lg:p-14 ${
              isReversed ? "rtl" : ""
            }`}
          >
            {/* Content */}
            <div className={`relative z-10 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase ${categoryStyle.bg} ${categoryStyle.text} border border-white/10 mb-6`}
              >
                {category}
              </span>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                {translatedTitle}
              </h3>

              <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                {translatedDescription}
              </p>

              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-white/5 text-text-secondary rounded-full border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <a
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold transition-colors"
              >
                {t("view_project")}
                <span className="text-lg">→</span>
              </a>
            </div>

            {/* Image */}
            <div className={`relative z-10 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-surface/50">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
