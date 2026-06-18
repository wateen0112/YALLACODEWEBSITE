"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "../ui/Reveal";
import { Cpu, Layers, Users, CheckCircle } from "lucide-react";

const features = [
  { id: "expertise", icon: Cpu, color: "cyan" },
  { id: "comprehensive", icon: Layers, color: "violet" },
  { id: "commitment", icon: Users, color: "emerald" },
];

const featureStyles: Record<string, { text: string; bg: string }> = {
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10" },
  violet: { text: "text-violet-400", bg: "bg-violet-500/10" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10" },
};

export function WhyWeStandOut() {
  const t = useTranslations("home");

  return (
    <section className="h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 text-primary-400">
              {t("why_stand_out_title")}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-text-secondary text-lg">
              {t("why_stand_out_subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const styles = featureStyles[feature.color];
            return (
              <Reveal key={feature.id} delay={index * 0.1}>
                <div className="glass-card rounded-2xl p-6 lg:p-8 hover-card h-full">
                  <div
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl ${styles.bg} flex items-center justify-center ${styles.text} mb-5`}
                  >
                    <feature.icon className="w-6 h-6 lg:w-7 lg:h-7" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-text-primary mb-3">
                    {t(`why_stand_out.${feature.id}.title`)}
                  </h3>
                  <ul className="space-y-2 text-text-secondary text-sm">
                    {[1, 2, 3].map((itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 ${styles.text} mt-0.5 shrink-0`} />
                        <span>{t(`why_stand_out.${feature.id}.item_${itemIndex}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
