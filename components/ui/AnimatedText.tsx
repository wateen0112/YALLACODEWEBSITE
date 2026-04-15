"use client";

import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  /** Use "rtl" for Arabic so words read correctly and spacing follows inline direction */
  dir?: "ltr" | "rtl";
}

export function AnimatedText({ text, className = "", delay = 0, dir = "ltr" }: AnimatedTextProps) {
  const words = text.split(/\s+/).filter(Boolean);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.95 },
    visible: {
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      dir={dir}
      className={`flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="me-[0.35em] mb-[0.1em] inline-block last:me-0">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
