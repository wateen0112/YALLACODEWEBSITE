"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { GlowButton } from "../ui/GlowButton";
import { ArrowUpLeft, ArrowUpRight, Sparkles } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      {!videoError && (
        <video
          src="https://res.cloudinary.com/dodxldns9/video/upload/v1782585308/bg_r7w2cs.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23020617'/%3E%3C/svg%3E"
          aria-hidden="true"
          role="presentation"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
        />
      )}
      {/* Fallback background shown when video fails to load */}
      {videoError && (
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background" aria-hidden="true" />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Soft ambient glows */}
      <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-primary-600/15 blur-[140px]" />
      <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-primary-500/10 blur-[160px]" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-primary-400/10 blur-[120px]" />

      {/* Centered content */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-text-secondary mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary-400" />
            <span>{t("badge")}</span>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="100"
            className={`text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white mb-8 ${
              isRtl
                ? "[text-shadow:0_0_42px_rgba(192,132,252,0.45)]"
                : "bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-primary-400"
            }`}
          >
            {t("headline")}
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-lg md:text-xl text-text-secondary mb-10 max-w-xl leading-relaxed"
          >
            {t("description")}
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-wrap justify-center gap-4"
          >
            <GlowButton
              variant="primary"
              className="text-base px-8 py-4 rounded-full"
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("view_projects")}
              {isRtl ? (
                <ArrowUpLeft className="w-5 h-5 shrink-0" aria-hidden />
              ) : (
                <ArrowUpRight className="w-5 h-5 shrink-0" aria-hidden />
              )}
            </GlowButton>
            <GlowButton
              variant="secondary"
              className="text-base px-8 py-4 rounded-full"
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("contact_us")}
            </GlowButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator — animated chevron */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 bg-white/60 rounded-full animate-bounce" />
        </div>
        <svg
          className="w-4 h-4 text-white/40 animate-pulse"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
