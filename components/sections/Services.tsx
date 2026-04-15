"use client";

import { useTranslations } from "next-intl";
import { services } from "@/lib/services";
import { ServiceCard } from "../ui/ServiceCard";

export function ServicesSection() {
  const t = useTranslations("home");
  const tServices = useTranslations("services");

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-primary-400 mb-4">
            {t("services_title")}
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {tServices("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard 
              key={service.id}
              title={tServices(`items.${service.id}.title`)}
              description={tServices(`items.${service.id}.description`)}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
