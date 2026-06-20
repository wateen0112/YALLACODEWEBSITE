"use client";

import { useTranslations } from "next-intl";
import { services } from "@/lib/services";
import { FloatingCube } from "../3d/FloatingCube";

export function ServicesSection() {
  const t = useTranslations("home");
  const tServices = useTranslations("services");

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 h-[500px] w-[500px] bg-primary-600/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left side */}
          <div className="lg:sticky lg:top-0">
            <span
              data-aos="fade-down"
              className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4"
            >
              {t("services_badge")}
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {t("services_title")}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-lg text-text-secondary mb-10 max-w-md"
            >
              {tServices("subtitle")}
            </p>

            <div
              data-aos="tilt-left"
              data-aos-delay="300"
              className="relative rounded-3xl glass-card overflow-hidden h-[340px] md:h-[420px] perspective-1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 via-transparent to-primary-400/10" />
              <FloatingCube />
            </div>
          </div>

          {/* Right side - service list */}
          <div className="flex flex-col">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  data-aos="tilt-right"
                  data-aos-delay={i * 100}
                  className="group flex items-start gap-6 py-8 border-b border-white/10 first:pt-0 last:border-b-0 card-lift cursor-default"
                >
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center group-hover:bg-primary-600/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary-400" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                      {tServices(`items.${service.id}.title`)}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {tServices(`items.${service.id}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
