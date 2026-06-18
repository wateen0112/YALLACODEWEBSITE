"use client";

import { useTranslations } from "next-intl";
import { GlowButton } from "../ui/GlowButton";
import { Reveal } from "../ui/Reveal";
import { HeroCubeCluster } from "../3d/HeroCubeCluster";
import { ArrowRight, ChevronRight } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative h-full flex flex-col justify-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-surface pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[60vh]">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-400 text-sm font-medium mb-6">
                {t("badge")}
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </span>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6 leading-[1.1]">
                {t("title_line1")}
                <br />
                {t("title_line2")}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-lg text-text-secondary max-w-xl mb-8 leading-relaxed">
                {t("subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <GlowButton href="#contact" className="text-base px-7 py-3.5">
                  {t("contact_us")}
                  <ArrowRight className="w-5 h-5 text-cyan-300" />
                </GlowButton>
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors font-medium"
                >
                  {t("documentation")}
                  <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right 3D object */}
          <div className="order-1 lg:order-2 flex items-center justify-center h-full min-h-[280px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[480px]">
            <Reveal delay={0.16} variant="scale" className="w-full h-full">
              <HeroCubeCluster />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
