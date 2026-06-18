"use client";

import { useTranslations } from "next-intl";
import { services } from "@/lib/services";
import { ServiceCard } from "../ui/ServiceCard";
import { Reveal } from "../ui/Reveal";

export function ServicesSection() {
  const t = useTranslations("home");
  const tServices = useTranslations("services");

  return (
    <section id="services" className="h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-400">
              {t("services_title")}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-text-secondary text-lg">
              {tServices("subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.08}>
              <ServiceCard
                title={tServices(`items.${service.id}.title`)}
                description={tServices(`items.${service.id}.description`)}
                icon={service.icon}
                color={service.color}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
