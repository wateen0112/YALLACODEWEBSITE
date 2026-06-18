"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

interface SectionItem {
  id: string;
  labelKey: string;
}

const sections: SectionItem[] = [
  { id: "hero", labelKey: "hero" },
  { id: "trusted-by", labelKey: "trusted-by" },
  { id: "why-stand-out", labelKey: "why-stand-out" },
  { id: "why-choose-us", labelKey: "why-choose-us" },
  { id: "services", labelKey: "services" },
  { id: "solutions", labelKey: "solutions" },
  { id: "projects", labelKey: "projects" },
  { id: "stats", labelKey: "stats" },
  { id: "testimonials", labelKey: "testimonials" },
  { id: "process", labelKey: "process" },
  { id: "cta", labelKey: "cta" },
  { id: "footer", labelKey: "footer" },
];

export function SectionIndicator() {
  const t = useTranslations("sections");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sections.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index: number) => {
    const element = document.getElementById(sections[index].id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3 ${
        isRtl ? "left-6" : "right-6"
      }`}
      aria-label="Section navigation"
    >
      {sections.map((section, index) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(index)}
          className="group relative flex items-center justify-center w-6 h-6 focus:outline-none"
          aria-label={t(section.labelKey)}
        >
          {/* Label */}
          <span
            className={`absolute whitespace-nowrap text-xs font-medium transition-all duration-300 ${
              isRtl ? "left-full ml-3" : "right-full mr-3"
            } ${
              activeIndex === index
                ? "text-white opacity-100 translate-x-0"
                : "text-text-secondary opacity-0 group-hover:opacity-70"
            }`}
          >
            {t(section.labelKey)}
          </span>

          {/* Dot */}
          <span className="relative flex items-center justify-center w-3 h-3">
            <span
              className={`absolute inset-0 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-primary-400 scale-100"
                  : "bg-white/30 scale-75 group-hover:bg-white/50 group-hover:scale-100"
              }`}
            />
            {activeIndex === index && (
              <motion.span
                layoutId="activeSectionIndicator"
                className="absolute inset-[-4px] rounded-full border border-primary-400/50"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </span>
        </button>
      ))}
    </nav>
  );
}
