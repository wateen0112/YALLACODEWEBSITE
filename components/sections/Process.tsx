"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  { id: 1, icon: Search, gradient: "from-blue-600 to-cyan-400" },
  { id: 2, icon: PenTool, gradient: "from-fuchsia-600 to-pink-400" },
  { id: 3, icon: Code2, gradient: "from-emerald-600 to-teal-400" },
  { id: 4, icon: Rocket, gradient: "from-amber-600 to-orange-400" },
];

interface StepCardProps {
  step: (typeof steps)[0];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}

function StepCard({ step, index, total, scrollYProgress }: StepCardProps) {
  const t = useTranslations("home");
  const Icon = step.icon;

  const coverageStart = index / total;
  const coverageEnd = (index + 1) / total;

  const coveredProgress = useTransform(
    scrollYProgress,
    [coverageEnd, Math.min(coverageEnd + 0.2, 1)],
    [0, 1]
  );
  const scale = useTransform(coveredProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(coveredProgress, [0, 1], [1, 0.8]);

  return (
    <motion.div
      className="h-screen w-full sticky top-0 flex flex-col justify-center overflow-hidden bg-background"
      style={{
        zIndex: 10 + index,
        scale,
        opacity,
        boxShadow: index > 0 ? "0 -30px 80px rgba(0,0,0,0.45)" : "none",
      }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-400">
            {t("process_title")}
          </h2>
          <p className="text-text-secondary text-lg">
            {t("process_subtitle")}
          </p>
        </div>

        {/* Step card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 text-center relative"
        >
          <span className="text-6xl sm:text-8xl font-bold text-white/5 absolute top-6 right-8">
            0{step.id}
          </span>

          <div className="flex flex-col items-center gap-6">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                {t(`process_steps.${step.id}`)}
              </h3>
              <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                {t(`process_steps_description.${step.id}`)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Step progress dots */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {steps.map((s, i) => (
            <span
              key={s.id}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-primary-400 w-8"
                  : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative"
      style={{ height: `${steps.length * 100}vh` }}
    >
      {steps.map((step, index) => (
        <StepCard
          key={step.id}
          step={step}
          index={index}
          total={steps.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  );
}
