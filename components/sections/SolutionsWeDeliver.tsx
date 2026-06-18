"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "../ui/Reveal";
import {
  Building2,
  BarChart3,
  Contact,
  ShoppingCart,
  Smartphone,
  MessageSquare,
  Truck,
  Bot,
} from "lucide-react";

const solutions = [
  { id: "enterprise_apps", icon: Building2, color: "cyan" },
  { id: "erp", icon: BarChart3, color: "violet" },
  { id: "crm", icon: Contact, color: "emerald" },
  { id: "ecommerce", icon: ShoppingCart, color: "amber" },
  { id: "mobile_apps", icon: Smartphone, color: "sky" },
  { id: "collaboration", icon: MessageSquare, color: "fuchsia" },
  { id: "fleet", icon: Truck, color: "orange" },
  { id: "robotics", icon: Bot, color: "rose" },
];

const solutionStyles: Record<string, string> = {
  cyan: "text-cyan-400",
  violet: "text-violet-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  sky: "text-sky-400",
  fuchsia: "text-fuchsia-400",
  orange: "text-orange-400",
  rose: "text-rose-400",
};

export function SolutionsWeDeliver() {
  const t = useTranslations("home");

  return (
    <section className="h-full flex flex-col justify-center relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-400">
              {t("solutions_title")}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-text-secondary text-lg">
              {t("solutions_subtitle")}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {solutions.map((solution, index) => (
            <Reveal key={solution.id} delay={index * 0.05}>
              <div className="glass-card rounded-xl p-5 text-center hover-card cursor-default h-full flex flex-col items-center justify-center">
                <solution.icon className={`w-8 h-8 ${solutionStyles[solution.color]} mx-auto mb-3`} />
                <h3 className="font-medium text-sm text-text-primary">
                  {t(`solutions.${solution.id}`)}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
