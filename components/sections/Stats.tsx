"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { LayoutGrid, Zap, Clock, ShieldCheck, ArrowRight } from "lucide-react";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const duration = 2000;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      window.requestAnimationFrame(step);
    }
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const t = useTranslations("home");

  const stats = [
    {
      label: t("stats.projects_delivered"),
      value: 50,
      suffix: "+",
      icon: LayoutGrid,
      description: t("stats.projects_description"),
    },
    {
      label: t("stats.happy_clients"),
      value: 30,
      suffix: "+",
      icon: Zap,
      description: t("stats.clients_description"),
    },
    {
      label: t("stats.years_experience"),
      value: 5,
      suffix: "",
      icon: Clock,
      description: t("stats.experience_description"),
    },
    {
      label: t("stats.client_satisfaction"),
      value: 99,
      suffix: "%",
      icon: ShieldCheck,
      description: t("stats.satisfaction_description"),
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <span
              data-aos="fade-down"
              className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4"
            >
              {t("trust_badge")}
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              {t("trust_title")}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-2xl md:text-3xl font-semibold text-white leading-snug"
            >
              {t("trust_lead")}
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-lg md:text-xl text-text-secondary leading-relaxed"
            >
              {t("trust_statement")}
            </p>
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-6 flex items-center gap-3 text-primary-400 font-semibold"
            >
              <span>{t("trust_cta")}</span>
              <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              data-aos="zoom-tilt"
              data-aos-delay={i * 100}
              className="glass-card card-3d rounded-2xl p-8 flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-600/15 border border-primary-500/20 flex items-center justify-center mb-6">
                <stat.icon className="w-7 h-7 text-primary-400" />
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-white font-semibold mb-2">{stat.label}</p>
              <p className="text-sm text-text-secondary">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
