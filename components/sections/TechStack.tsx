"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { techStack } from "@/lib/tech-stack";
import { Cpu } from "lucide-react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function TechStackSection() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [shuffledTech] = useState(() => shuffleArray(techStack));

  useLayoutEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered card entrance
      const cards = gridRef.current?.querySelectorAll(".tech-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative h-[100vh] pb-20 overflow-y-scroll scrollbar-hide  bg-background "
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary-600/8 blur-[160px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`max-w-xl mb-16 md:mb-20 ${isRtl ? "text-end mr-auto" : "text-start"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-text-secondary mb-6">
            <Cpu className="h-4 w-4 text-primary-400" />
            <span>{t("techstack_badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
            {t("techstack_title")}
          </h2>
          <p className="text-xl text-text-secondary max-w-md">
            {t("techstack_subtitle")}
          </p>
        </div>

        {/* Tech grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 gap-4 md:gap-5"
        >
          {shuffledTech.map((tech) => (
            <div
              key={tech.name}
              className="tech-card group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 backdrop-blur-sm transition-transform transition-opacity transition-colors duration-300 hover:bg-white/[0.08] hover:border-primary-500/30 hover:scale-105 hover:-translate-y-1 cursor-default"
            >
              {/* Logo */}
              <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={56}
                  height={56}
                  sizes="56px"
                  className="w-full h-full object-contain transition-transform transition-opacity transition-colors duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Name */}
              <span className="text-xs md:text-sm font-medium text-text-secondary text-center leading-tight transition-colors duration-300 group-hover:text-white">
                {tech.name}
              </span>

              {/* Category tag */}
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-primary-600/20 text-[10px] text-primary-400 border border-primary-500/20 opacity-0 translate-y-2 transition-transform transition-opacity transition-colors duration-300 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap">
                {tech.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
