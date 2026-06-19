"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function GlowButton({ children, className, variant = "primary", ...props }: GlowButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative px-7 py-4 rounded-[58px] font-bold transition-all duration-300 overflow-hidden group flex items-center justify-center gap-2",
        variant === "primary"
          ? "bg-gradient-nftify text-white shadow-[0_0_24px_rgba(29,212,255,0.25)] hover:shadow-[0_0_36px_rgba(243,46,255,0.35)]"
          : "bg-surface-glass-strong text-white border border-white/10 hover:border-white/20 hover:bg-white/[0.08] backdrop-blur-md",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.button>
  );
}
