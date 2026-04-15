"use client";

import { useTranslations } from "next-intl";
import { GlowButton } from "../ui/GlowButton";

export function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-[100px] -translate-y-1/2 mix-blend-screen" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#C084FC]/20 rounded-full blur-[100px] -translate-y-1/2 mix-blend-screen" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="bg-surface/60 backdrop-blur-3xl border border-primary-600/30 rounded-3xl p-12 md:p-20 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-50" />
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-600 to-transparent opacity-50" />
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            {t("cta_banner")}
          </h2>
          
          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            {t("cta_subtitle")}
          </p>
          
          <div className="flex justify-center">
            <GlowButton variant="primary" className="text-lg px-10 py-5">
              {t("start_project")}
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
