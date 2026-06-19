"use client";

import { useTranslations } from "next-intl";
import { services } from "@/lib/services";
import { ServiceCard } from "../ui/ServiceCard";

export function ServicesSection() {
  const t = useTranslations("home");
  const tServices = useTranslations("services");

  return (
    <section id="services" className="relative pt-[65px] md:pt-[65px] lg:pt-[65px] pb-24 lg:pb-32 overflow-hidden">
      <div className="container mx-auto px-5 md:px-[30px] max-w-[1170px]">
        {/* Title */}
        <div className="flex flex-col items-center gap-5 text-center mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold font-satoshi text-white leading-[1.1]">
            {t("services_title")}
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
            {tServices("subtitle")}
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={tServices(`items.${service.id}.title`)}
              description={tServices(`items.${service.id}.description`)}
              icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
