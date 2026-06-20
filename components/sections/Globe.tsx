"use client";

import { useTranslations } from "next-intl";
import { GlobeScene } from "../3d/GlobeScene";
import { CheckCircle2 } from "lucide-react";

export function GlobeSection() {
  const t = useTranslations("home");
  const features = [
    "globe_feature_1",
    "globe_feature_2",
    "globe_feature_3",
    "globe_feature_4",
    "globe_feature_5",
  ];

  return (
    <section className="py-24 relative overflow-hidden border-y border-white/5">
      <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] bg-primary-600/10 rounded-full blur-[160px] -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <span
              data-aos="fade-down"
              className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4"
            >
              {t("globe_badge")}
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {t("globe_title")}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-lg text-text-secondary max-w-md mb-10"
            >
              {t("globe_subtitle")}
            </p>

            <div
              data-aos="tilt-left"
              data-aos-delay="300"
              className="relative h-[300px] md:h-[380px] rounded-3xl glass-card overflow-hidden perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent" />
              <GlobeScene />
            </div>
          </div>

          {/* Right - feature checklist */}
          <div className="flex flex-col gap-4">
            {features.map((key, i) => (
              <div
                key={key}
                data-aos="tilt-right"
                data-aos-delay={i * 100}
                className="group flex items-center gap-5 glass-card rounded-2xl p-6 card-3d"
              >
                <div className="shrink-0 w-12 h-12 rounded-full bg-primary-600/15 border border-primary-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary-400" />
                </div>
                <p className="text-lg md:text-xl font-semibold text-white group-hover:text-primary-200 transition-colors">
                  {t(key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
