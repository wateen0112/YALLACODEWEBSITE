"use client";

import { useTranslations } from "next-intl";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { id: 1, initials: "AR", rating: 5.0, bg: "bg-[#feecff]", rotate: "-rotate-3" },
  { id: 2, initials: "SJ", rating: 4.5, bg: "bg-[#d3f7ff]", rotate: "rotate-2" },
  { id: 3, initials: "TM", rating: 4.0, bg: "bg-white", rotate: "-rotate-2" },
  { id: 4, initials: "EW", rating: 5.0, bg: "bg-[#feecff]", rotate: "rotate-3" },
];

const avatarGradients = [
  "from-accent-cyan to-accent-magenta",
  "from-accent-lime to-accent-cyan",
  "from-accent-magenta to-accent-yellow",
  "from-accent-yellow to-accent-cyan",
];

export function TestimonialsSection() {
  const t = useTranslations("home");

  return (
    <section className="relative py-24 lg:py-32 overflow-visible">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/10 to-accent-magenta/10 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-[1020px] relative z-10">
        {/* Title */}
        <div
          className="flex flex-col items-center gap-6 text-center mb-16"
          data-aos="fade-up"
        >
          <h2 className="text-4xl md:text-5xl lg:text-[52px] font-bold font-satoshi text-white leading-[1.1]">
            {t("testimonials_title")}
          </h2>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
            {t("testimonials_subtitle")}
          </p>
        </div>

        {/* Cards grid with scattered rotations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((test, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, rotate: 0, transition: { duration: 0.3 } }}
              className={`relative p-8 rounded-3xl ${test.bg} ${test.rotate} shadow-[0_-8px_90px_rgba(140,140,140,0.3)] cursor-default`}
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              {/* Top content: rating + quote */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-8 h-8 fill-accent-yellow text-accent-yellow" />
                  <span className="text-2xl font-bold text-[#020202]">{test.rating.toFixed(1)}</span>
                </div>
                <Quote className="w-8 h-8 text-accent-cyan fill-accent-cyan/20" />
              </div>

              {/* Quote text */}
              <p className="text-lg text-[#545454] leading-relaxed mb-8">
                &quot;{t(`testimonials_items.${test.id}.quote`)}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarGradients[index]} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                  {test.initials}
                </div>
                <div>
                  <h4 className="font-bold text-[#020202] text-lg">{t(`testimonials_items.${test.id}.name`)}</h4>
                  <p className="text-[#545454]">
                    {t(`testimonials_items.${test.id}.role`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
