"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function CountUp({ end, suffix = "" }: { end: number, suffix?: string }) {
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

        // Easing out function
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

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  const t = useTranslations("home");

  const stats = [
    { label: t("stats.projects_delivered"), value: 50, suffix: "+" },
    { label: t("stats.happy_clients"), value: 30, suffix: "+" },
    { label: t("stats.years_experience"), value: 5, suffix: "" },
    { label: t("stats.client_satisfaction"), value: 99, suffix: "%" },
  ];

  return (
    <section className="py-20 relative">
      <div className="mx-4 md:mx-12 rounded-3xl bg-surface border border-primary-600/30 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-background to-primary-400/10 opacity-50 block" />

        <div className="relative">
          <div className="container mx-auto px-6 md:px-12 py-10 md:py-14 text-center">
            <h3 className="text-2xl font-bold mb-10 text-primary-400">{t("stats_title")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center min-w-0">
                  <h4 className="text-4xl md:text-5xl font-extrabold text-white mb-2 whitespace-nowrap">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </h4>
                  <p className="text-text-secondary uppercase tracking-wide md:tracking-wider text-xs md:text-sm font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
