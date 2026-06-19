"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const technologies = [
  "React", "Next.js", "TypeScript", "Python", "TensorFlow",
  "AWS", "Docker", "Flutter", "Node.js", "PostgreSQL", "OpenAI", "Kubernetes"
];

export function Marquee() {
  const t = useTranslations("home");

  return (
    <section className="py-12 bg-surface-glass/30 border-y border-white/5 overflow-hidden backdrop-blur-sm">
      <div className="container mx-auto px-4 mb-6" data-aos="fade-up">
        <p className="text-sm text-text-secondary font-medium tracking-wider uppercase text-center">
          {t("marquee")}
        </p>
      </div>

      <div className="flex w-full overflow-hidden relative">
        <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          className="flex whitespace-nowrap min-w-max items-center"
        >
          {[...technologies, ...technologies].map((tech, i) => (
            <div key={i} className="flex items-center px-8">
              <span className="text-xl font-bold font-satoshi bg-clip-text text-transparent bg-gradient-to-r from-accent-cyan to-accent-magenta">
                {tech}
              </span>
              <span className="h-2 w-2 rounded-full bg-accent-lime ml-16 shadow-[0_0_12px_2px_rgba(97,236,28,0.5)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
