"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";

export function StatsSection() {
  const t = useTranslations("home");

  const stats = [
    { label: t("stats.projects_delivered"), value: 300, suffix: "+" },
    { label: t("stats.happy_clients"), value: 150, suffix: "+" },
    { label: t("stats.years_experience"), value: 12, suffix: "+" },
    { label: t("stats.client_satisfaction"), value: 98, suffix: "%" },
  ];

  return (
    <section className="h-full flex flex-col justify-center relative overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <Reveal>
          <div className="glass-card rounded-3xl p-8 lg:p-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-background to-primary-400/10 opacity-50" />

            <div className="relative text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-primary-400">{t("stats_title")}</h3>
            </div>

            <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="flex flex-col items-center min-w-0">
                    <h4 className="text-3xl lg:text-5xl font-extrabold text-white mb-2 whitespace-nowrap">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </h4>
                    <p className="text-text-secondary uppercase tracking-wide text-xs lg:text-sm font-semibold text-center">
                      {stat.label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
