"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Minus } from "lucide-react";
import { ParticleSphere } from "../3d/ParticleSphere";

export function FAQSection() {
  const t = useTranslations("home");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const questions = ["faq_q1", "faq_q2", "faq_q3", "faq_q4", "faq_q5"];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16">
          {/* Left header */}
          <div data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("faq_title")}
            </h2>
            <p className="text-text-secondary text-lg mb-6">
              {t("faq_subtitle")}{" "}
              <a href="#contact" className="text-primary-400 hover:text-primary-300 transition-colors">
                {t("faq_contact")}
              </a>
            </p>
            <ParticleSphere/>
          </div>

          {/* Right accordion */}
          <div className="flex flex-col gap-4">
            {questions.map((key, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={key}
                  data-aos="tilt-right"
                  data-aos-delay={i * 100}
                  className={`glass-card rounded-2xl overflow-hidden transition-transform transition-opacity transition-colors duration-300 ${
                    isOpen ? "border-primary-500/30 shadow-[0_0_30px_rgba(168,85,247,0.12)]" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg md:text-xl font-semibold text-white pr-4">
                      {t(`${key}.question`)}
                    </span>
                    <span
                      className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                        isOpen
                          ? "bg-primary-600 border-primary-600 text-white"
                          : "border-white/20 text-text-secondary"
                      }`}
                    >
                      {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </span>
                  </button>
                  <div
                    className={`grid transition-transform transition-opacity transition-colors duration-300 ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-text-secondary leading-relaxed">
                        {t(`${key}.answer`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
