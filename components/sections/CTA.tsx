"use client";

import { useTranslations } from "next-intl";
import { GlowButton } from "../ui/GlowButton";
import { Reveal } from "../ui/Reveal";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 text-primary-400">
            {t("cta_banner")}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-text-secondary text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            {t("cta_subtitle")}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <GlowButton href="#footer" className="text-base px-8 py-3.5">
              {t("start_project")}
              <ArrowRight className="w-5 h-5 text-cyan-300" />
            </GlowButton>
            <GlowButton href="#services" variant="secondary" className="text-base px-8 py-3.5">
              {t("explore_services")}
            </GlowButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
