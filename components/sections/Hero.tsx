"use client";

import { useLocale, useTranslations } from "next-intl";
import { ParticleBackground } from "../3d/ParticleBackground";
import { GlowButton } from "../ui/GlowButton";
import { AnimatedText } from "../ui/AnimatedText";
import { motion } from "framer-motion";
import { ChevronDown, ArrowUpLeft, ArrowUpRight, Play, Sparkles } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const tHome = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const titleClassName = isRtl
    ? "text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-8 text-gradient-cyan-magenta font-satoshi"
    : "text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-8 text-gradient-cyan-magenta font-satoshi";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-10 overflow-hidden">
      <ParticleBackground />

      {/* Neon ambient glows */}
      <div className="absolute top-1/4 -left-32 h-[500px] w-[500px] rounded-full bg-accent-cyan/15 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 h-[500px] w-[500px] rounded-full bg-accent-magenta/15 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent-lime/10 blur-[180px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          className="relative rounded-[36px] border border-white/10 bg-surface-glass/40 backdrop-blur-2xl overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.5)]"
          data-aos="zoom-in"
          data-aos-duration="900"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(29,212,255,0.12),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(243,46,255,0.12),transparent_35%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.85fr] gap-8 items-center p-8 md:p-12 lg:p-16 min-h-[620px]">
            <div className="flex flex-col">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-5 inline-flex items-center gap-2 text-xs md:text-sm text-text-secondary"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-nftify">
                  <Sparkles className="h-3 w-3 text-white" />
                </span>
                {t("subtitle")}
              </motion.p>

              <div>
                <AnimatedText
                  text={t("title")}
                  dir={isRtl ? "rtl" : "ltr"}
                  className={titleClassName}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <GlowButton
                  variant="primary"
                  onClick={() => {
                    const projectsSection = document.getElementById("projects");
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {t("view_projects")}
                  {isRtl ? (
                    <ArrowUpLeft className="w-5 h-5 shrink-0" aria-hidden />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 shrink-0" aria-hidden />
                  )}
                </GlowButton>
                <GlowButton variant="secondary">
                  {t("contact_us")}
                </GlowButton>
              </motion.div>
            </div>

            <div className="hidden md:flex justify-center items-center relative min-h-[360px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.8, type: "spring", stiffness: 396, damping: 56 }}
                className="relative w-[320px] h-[260px]"
              >
                <div className="absolute top-2 left-16 h-24 w-24 rounded-2xl bg-surface-glass-strong border border-white/10 shadow-2xl rotate-[-24deg] flex items-center justify-center text-2xl font-bold text-accent-cyan shadow-glow-cyan">
                  AI
                </div>
                <div className="absolute top-0 right-10 h-24 w-24 rounded-2xl bg-surface-glass border border-white/10 shadow-2xl rotate-[22deg] flex items-center justify-center text-2xl font-bold text-accent-magenta shadow-glow-magenta">
                  API
                </div>
                <div className="absolute bottom-8 left-6 h-24 w-24 rounded-2xl bg-surface-glass-strong border border-white/10 shadow-2xl rotate-[16deg] flex items-center justify-center text-2xl font-bold text-accent-lime shadow-glow-lime">
                  UX
                </div>
                <div className="absolute bottom-0 right-12 h-28 w-28 rounded-2xl bg-gradient-nftify border border-white/20 shadow-[0_0_45px_rgba(29,212,255,0.35)] rotate-[-18deg] flex items-center justify-center text-2xl font-black text-white">
                  DEV
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="self-center"
            >
              <div className="rounded-[24px] border border-white/10 bg-surface-glass/60 backdrop-blur-xl p-4">
                <div className="aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-accent-magenta/20 to-accent-cyan/10 flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,212,255,0.2),transparent_70%)]" />
                  <div className="relative h-12 w-12 rounded-full bg-gradient-nftify flex items-center justify-center shadow-glow-cyan">
                    <Play className="h-5 w-5 text-white fill-white" />
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{tHome("projects_title")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-accent-cyan"
      >
        <ChevronDown className="w-8 h-8 opacity-70" />
      </motion.div>
    </section>
  );
}
