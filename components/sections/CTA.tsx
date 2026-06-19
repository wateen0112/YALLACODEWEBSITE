"use client";

import { useTranslations } from "next-intl";
import { GlowButton } from "../ui/GlowButton";
import { motion } from "framer-motion";

const floatingOrbs = [
  { color: "bg-accent-cyan", top: "15%", left: "8%", size: "w-16 h-16", delay: 0 },
  { color: "bg-accent-magenta", top: "70%", left: "5%", size: "w-12 h-12", delay: 0.2 },
  { color: "bg-accent-lime", top: "20%", right: "8%", size: "w-14 h-14", delay: 0.4 },
  { color: "bg-accent-yellow", top: "65%", right: "6%", size: "w-10 h-10", delay: 0.6 },
];

export function CTASection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-cyan/15 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-magenta/15 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div
          className="relative rounded-[36px] bg-surface-glass/40 backdrop-blur-3xl border border-white/10 p-12 md:p-20 text-center shadow-2xl overflow-hidden"
          data-aos="zoom-in"
        >
          {/* Top / bottom gradient lines */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent-cyan to-transparent opacity-60" />
          <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-accent-magenta to-transparent opacity-60" />

          {/* Floating orbs */}
          {floatingOrbs.map((orb, i) => (
            <motion.div
              key={i}
              className={`absolute hidden md:block rounded-full ${orb.color} ${orb.size} border-[6px] border-background shadow-lg`}
              style={{ top: orb.top, left: orb.left, right: orb.right }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: orb.delay }}
            />
          ))}

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black font-satoshi text-gradient-cyan-magenta mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("cta_banner")}
          </h2>

          <p
            className="text-lg md:text-xl text-text-secondary mb-12 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t("cta_subtitle")}
          </p>

          <div className="flex justify-center" data-aos="fade-up" data-aos-delay="300">
            <GlowButton variant="primary" className="text-lg px-10 py-5 rounded-[58px]">
              {t("start_project")}
            </GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
