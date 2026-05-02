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
    ? "text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-8 text-zinc-50 [text-shadow:0_0_42px_rgba(192,132,252,0.45),0_2px_0_rgba(0,0,0,0.35)]"
    : "text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-primary-200 to-primary-400";

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-10 overflow-hidden">
      <ParticleBackground />

      <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-primary-600/20 blur-[120px]" />
      <div className="absolute top-24 right-0 h-96 w-96 rounded-full bg-primary-500/15 blur-[140px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="relative rounded-3xl border border-primary-500/20 bg-gradient-to-br from-background via-surface/70 to-background overflow-hidden shadow-[0_0_60px_rgba(139,92,246,0.15)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(168,85,247,0.20),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(124,58,237,0.18),transparent_35%)]" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.85fr] gap-8 items-center p-8 md:p-12 lg:p-14 min-h-[620px]">
            <div className="flex flex-col">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`mb-4 inline-flex items-center gap-2 text-xs md:text-sm ${
                  isRtl ? "text-zinc-200/95" : "text-text-secondary"
                }`}
              >
                <Sparkles className="h-4 w-4 text-primary-400" />
                {t("subtitle")}
              </motion.p>

              <AnimatedText
                text={t("title")}
                dir={isRtl ? "rtl" : "ltr"}
                className={titleClassName}
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <GlowButton 
                  variant="primary"
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      projectsSection.scrollIntoView({ behavior: 'smooth' });
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.8 }}
                className="relative w-[320px] h-[260px]"
              >
                <div className="absolute top-2 left-16 h-24 w-24 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl rotate-[-24deg] flex items-center justify-center text-2xl font-semibold text-primary-300">
                  AI
                </div>
                <div className="absolute top-0 right-10 h-24 w-24 rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl rotate-[22deg] flex items-center justify-center text-2xl font-semibold text-primary-400">
                  API
                </div>
                <div className="absolute bottom-8 left-6 h-24 w-24 rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl rotate-[16deg] flex items-center justify-center text-2xl font-semibold text-primary-200">
                  UX
                </div>
                <div className="absolute bottom-0 right-12 h-28 w-28 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 border border-primary-300/40 shadow-[0_0_35px_rgba(139,92,246,0.5)] rotate-[-18deg] flex items-center justify-center text-2xl font-black text-white">
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
              <div className="rounded-2xl border border-primary-500/30 bg-black/25 backdrop-blur-xl p-4">
                <div className="aspect-video rounded-xl border border-white/10 bg-gradient-to-br from-primary-700/30 to-black/60 flex items-center justify-center mb-4">
                  <div className="h-11 w-11 rounded-full bg-primary-500/85 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.55)]">
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-400"
      >
        <ChevronDown className="w-8 h-8 opacity-70" />
      </motion.div>
    </section>
  );
}
