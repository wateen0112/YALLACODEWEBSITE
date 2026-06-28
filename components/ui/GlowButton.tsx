"use client";

import React, { ReactNode } from "react";
import { m, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function GlowButton({ children, className, variant = "primary", ...props }: GlowButtonProps) {
  return (
    <m.button
      whileHover={{ y: -4, boxShadow: "0 0 32px rgba(168,85,247,0.3)" }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-6 py-3 rounded-xl font-bold transition-transform transition-opacity transition-colors duration-300 overflow-hidden group flex items-center justify-center gap-2",
        variant === "primary" 
          ? "bg-gradient-to-r from-primary-600 to-primary-400 text-white" 
          : "bg-surface/50 text-white border border-primary-600/40 hover:bg-primary-600/10 hover:border-primary-400 backdrop-blur-md",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </m.button>
  );
}
