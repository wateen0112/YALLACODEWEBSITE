"use client";

import React, { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  href?: string;
}

export function GlowButton({ children, className, variant = "primary", href, ...props }: GlowButtonProps) {
  const baseStyles = cn(
    "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 rounded-full",
    variant === "primary"
      ? "bg-gradient-to-r from-primary-600 to-primary-400 text-white shadow-[0_4px_20px_rgba(168,85,247,0.35)] hover:shadow-[0_8px_28px_rgba(168,85,247,0.5)] hover:brightness-105"
      : "bg-transparent text-white border border-white/25 hover:bg-white/8 hover:border-white/45",
    "px-7 py-3.5 text-base",
    className
  );

  const motionProps = {
    whileHover: { y: -2, scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyles}
        {...motionProps}
        {...(props as HTMLMotionProps<"a">)}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      className={baseStyles}
      {...motionProps}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
