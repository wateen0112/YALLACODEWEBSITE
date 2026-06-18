"use client";

import { LucideIcon } from "lucide-react";

interface ServiceProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: "cyan" | "violet" | "sky" | "fuchsia" | "emerald" | "amber";
}

const colorStyles = {
  cyan: {
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "group-hover:shadow-cyan-500/20",
  },
  violet: {
    text: "text-violet-400",
    bg: "bg-violet-500/10",
    glow: "group-hover:shadow-violet-500/20",
  },
  sky: {
    text: "text-sky-400",
    bg: "bg-sky-500/10",
    glow: "group-hover:shadow-sky-500/20",
  },
  fuchsia: {
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    glow: "group-hover:shadow-fuchsia-500/20",
  },
  emerald: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "group-hover:shadow-emerald-500/20",
  },
  amber: {
    text: "text-amber-400",
    bg: "bg-amber-500/10",
    glow: "group-hover:shadow-amber-500/20",
  },
};

export function ServiceCard({ title, description, icon: Icon, color = "violet" }: ServiceProps) {
  const styles = colorStyles[color];

  return (
    <article className="glass-card rounded-2xl p-8 hover-card group">
      <div
        className={`w-14 h-14 rounded-xl ${styles.bg} flex items-center justify-center ${styles.text} mb-6 group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary-400 transition-colors">
        {title}
      </h3>

      <p className="text-text-secondary text-sm leading-relaxed">
        {description}
      </p>
    </article>
  );
}
