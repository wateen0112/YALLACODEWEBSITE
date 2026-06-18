"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Reveal } from "../ui/Reveal";

const testimonials = [
  { id: 1, initials: "AR" },
  { id: 2, initials: "SJ" },
  { id: 3, initials: "TM" },
  { id: 4, initials: "EW" },
];

export function TestimonialsSection() {
  const t = useTranslations("home");
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <section className="h-full flex flex-col justify-center relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-primary-400">
              {t("testimonials_title")}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <motion.div ref={carousel} className="cursor-grab overflow-hidden active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={{ right: 0, left: -width }}
              className="flex gap-5 pb-4"
            >
              {testimonials.map((test) => (
                <motion.div
                  key={test.id}
                  className="min-w-[300px] md:min-w-[380px] p-6 rounded-2xl glass-card flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-base italic text-text-secondary mb-6">
                      &quot;{t(`testimonials_items.${test.id}.quote`)}&quot;
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                      {test.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{t(`testimonials_items.${test.id}.name`)}</h4>
                      <p className="text-xs text-text-secondary">
                        {t(`testimonials_items.${test.id}.role`)}, {t(`testimonials_items.${test.id}.company`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
