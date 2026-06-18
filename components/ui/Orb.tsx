"use client";

import { cn } from "@/lib/utils";

interface OrbProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-80 h-80",
  md: "w-[520px] h-[520px]",
  lg: "w-[700px] h-[700px]",
};

export function Orb({ className = "", size = "md" }: OrbProps) {
  return (
    <div
      className={cn("orb", sizeMap[size], className)}
      aria-hidden="true"
    />
  );
}
