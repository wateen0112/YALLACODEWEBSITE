"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";
import { motion, AnimatePresence } from "framer-motion";

export function WhyChooseSection() {
  const t = useTranslations("home");
  const [active, setActive] = useState(0);

  const tabs = [
    { key: "custom_architecture", image: projects[0]?.image },
    { key: "strategy_first", image: projects[1]?.image },
    { key: "business_focused", image: projects[3]?.image },
    { key: "long_term", image: projects[4]?.image },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left tabs */}
          <div>
            <span
              data-aos="fade-down"
              className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4"
            >
              {t("why_badge")}
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {t("why_title")}
            </h2>
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-lg text-text-secondary mb-10 max-w-md"
            >
              {t("why_lead")}
            </p>

            <div className="flex flex-col gap-3" data-aos="fade-up" data-aos-delay="300">
              {tabs.map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActive(i)}
                  className={`text-left px-6 py-4 rounded-2xl border transition-all duration-300 text-lg font-semibold card-lift ${
                    active === i
                      ? "bg-gradient-to-r from-primary-600 to-primary-400 text-white border-transparent shadow-[0_0_30px_rgba(168,85,247,0.35)]"
                      : "bg-white/5 text-text-secondary border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {t(`why_tabs.${tab.key}.title`)}
                </button>
              ))}
            </div>
          </div>

          {/* Right preview */}
          <div
            data-aos="tilt-left"
            data-aos-delay="300"
            className="relative   h-full w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, rotateY: 12, scale: 0.96 }}
                animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, rotateY: -12, scale: 0.96 }}
                transition={{ duration: 0.45 }}
                className="absolute inset-3 rounded-2xl  preserve-3d"
              >
                <Image
                  src="https://framerusercontent.com/images/973oV5mb3JG6a0rHrLKzIPWGmvw.png?width=1492&height=1836"
                  alt={t(`why_tabs.${tabs[active].key}.title`)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain opacity-80"
                />
                
        
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
