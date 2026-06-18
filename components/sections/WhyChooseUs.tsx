"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";
import { Settings2, Briefcase, Rocket, ShieldCheck } from "lucide-react";

const stats = [
  { key: "client_satisfaction", value: 98, suffix: "%" },
  { key: "happy_clients", value: 150, suffix: "+" },
  { key: "years_experience", value: 12, suffix: "+" },
  { key: "projects_delivered", value: 300, suffix: "+" },
];

const features = [
  { id: "custom_solutions", icon: Settings2, color: "amber" },
  { id: "diverse_portfolio", icon: Briefcase, color: "sky" },
  { id: "latest_tech", icon: Rocket, color: "rose" },
  { id: "security_support", icon: ShieldCheck, color: "emerald" },
];

const featureStyles: Record<string, { text: string; bg: string }> = {
  amber: { text: "text-amber-400", bg: "bg-amber-500/10" },
  sky: { text: "text-sky-400", bg: "bg-sky-500/10" },
  rose: { text: "text-rose-400", bg: "bg-rose-500/10" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
};

export function WhyChooseUs() {
  const t = useTranslations("home");

  return (
    <section className="h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 text-primary-400">
                {t("why_choose_title")}
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                {t("why_choose_subtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <div key={stat.key} className="glass-card rounded-xl p-4 text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary-400 mb-1">
                      <CountUp end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs lg:text-sm text-text-secondary">{t(`why_choose_stats.${stat.key}`)}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="space-y-4">
            {features.map((feature, index) => {
              const styles = featureStyles[feature.color];
              return (
                <Reveal key={feature.id} delay={index * 0.1}>
                  <div className="glass-card rounded-2xl p-5 hover-card">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg ${styles.bg} flex items-center justify-center ${styles.text} shrink-0`}
                      >
                        <feature.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div>
                        <h3 className="text-base lg:text-lg font-semibold text-text-primary mb-1">
                          {t(`why_choose_features.${feature.id}.title`)}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {t(`why_choose_features.${feature.id}.description`)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
