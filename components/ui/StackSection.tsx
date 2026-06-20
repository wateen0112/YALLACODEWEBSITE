"use client";

import { ReactNode } from "react";

interface StackSectionProps {
  children: ReactNode;
  className?: string;
  index: number;
  pattern?: "dots" | "grid" | "diagonal" | "cross" | "hex" | "radial" | "waves" | "circuit" | "stars" | "mesh" | "none";
}

const PATTERNS: Record<string, string> = {
  dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='rgba(255,255,255,0.06)'/%3E%3C/svg%3E")`,
  grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E")`,
  diagonal: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 60L60 0' stroke='rgba(255,255,255,0.04)' stroke-width='1'/%3E%3C/svg%3E")`,
  cross: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0v24M0 12h24' stroke='rgba(255,255,255,0.05)' stroke-width='0.5'/%3E%3C/svg%3E")`,
  hex: `url("data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9z' fill='rgba(255,255,255,0.03)' fill-rule='evenodd'/%3E%3C/svg%3E")`,
  radial: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='rgba(255,255,255,0.04)' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='50' cy='50' r='20' stroke='rgba(255,255,255,0.03)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
  waves: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10c20 0 20-8 40-8s20 8 40 8 20-8 40-8' stroke='rgba(255,255,255,0.04)' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`,
  circuit: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30h20v-10h20v20h20' stroke='rgba(255,255,255,0.04)' stroke-width='0.5' fill='none'/%3E%3Ccircle cx='20' cy='20' r='2' fill='rgba(255,255,255,0.06)'/%3E%3Ccircle cx='40' cy='40' r='2' fill='rgba(255,255,255,0.06)'/%3E%3C/svg%3E")`,
  stars: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='1' fill='rgba(255,255,255,0.08)'/%3E%3Ccircle cx='5' cy='5' r='0.5' fill='rgba(255,255,255,0.04)'/%3E%3Ccircle cx='45' cy='45' r='0.5' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E")`,
  mesh: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h32v32H0z' fill='none'/%3E%3Cpath d='M0 0l32 32M32 0L0 32' stroke='rgba(255,255,255,0.03)' stroke-width='0.5'/%3E%3C/svg%3E")`,
};

/**
 * StackSection — Sticky stacking section with optional background pattern.
 */
export function StackSection({
  children,
  className = "",
  index,
  pattern = "dots",
}: StackSectionProps) {
  const bgImage = pattern === "none" ? undefined : PATTERNS[pattern];

  return (
    <div
      className={`sticky top-0 min-h-screen w-full bg-background shadow-2xl ${className}`}
      style={{
        zIndex: index,
        backgroundImage: bgImage,
      }}
    >
      {children}
    </div>
  );
}
