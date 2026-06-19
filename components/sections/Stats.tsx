"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Briefcase, Users, Clock, Award } from "lucide-react";

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

  return <span ref={ref}>{count}{suffix}</span>;
}

const statsConfig = [
  { icon: Briefcase, gradient: "from-accent-cyan to-accent-magenta" },
  { icon: Users, gradient: "from-accent-lime to-accent-cyan" },
  { icon: Clock, gradient: "from-accent-magenta to-accent-yellow" },
  { icon: Award, gradient: "from-accent-yellow to-accent-cyan" },
];

export function StatsSection() {
  const t = useTranslations("home");

  const stats = [
    { label: t("stats.projects_delivered"), value: 50, suffix: "+" },
    { label: t("stats.happy_clients"), value: 30, suffix: "+" },
    { label: t("stats.years_experience"), value: 5, suffix: "" },
    { label: t("stats.client_satisfaction"), value: 99, suffix: "%" },
  ];

  return (
    <section className="py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div
          className="rounded-[36px] bg-surface-glass/40 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl p-8 md:p-12"
          data-aos="zoom-in"
        >
          <div className="text-center mb-10 md:mb-14">
            <h3 className="text-2xl md:text-3xl font-bold font-satoshi text-white">{t("stats_title")}</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((stat, i) => {
              const Icon = statsConfig[i].icon;
              const gradient = statsConfig[i].gradient;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 396, damping: 56 }}
                  className="group relative flex flex-col items-center text-center p-6 rounded-[20px] bg-surface-glass border border-white/5 backdrop-blur-md hover:border-white/10 transition-colors"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-4xl md:text-5xl font-black font-satoshi text-gradient-cyan-magenta mb-2 whitespace-nowrap">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </h4>
                  <p className="text-text-secondary uppercase tracking-wide text-xs md:text-sm font-semibold">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
