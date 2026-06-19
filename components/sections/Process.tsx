"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  { id: 1, icon: Search, gradient: "from-accent-cyan to-accent-magenta" },
  { id: 2, icon: PenTool, gradient: "from-accent-lime to-accent-cyan" },
  { id: 3, icon: Code2, gradient: "from-accent-magenta to-accent-yellow" },
  { id: 4, icon: Rocket, gradient: "from-accent-yellow to-accent-cyan" },
];

export function ProcessSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center mb-16 lg:mb-20" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold font-satoshi text-white mb-5 leading-[1.1]">
          {t("process_title")}
        </h2>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-stretch relative gap-6">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-[70px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-accent-cyan via-accent-magenta to-accent-lime opacity-30 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 396, damping: 56 }}
              className="relative z-10 flex-1"
            >
              <div className="h-full p-6 rounded-[20px] bg-surface-glass border border-white/5 backdrop-blur-md text-center hover:border-white/10 transition-colors group">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-surface-glass-strong to-surface-glass border border-white/10 flex items-center justify-center shadow-xl mb-6 relative">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-nftify text-white flex items-center justify-center text-xs font-black border-2 border-background">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-xl font-bold font-satoshi text-white">
                  {t(`process_steps.${step.id}`)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
