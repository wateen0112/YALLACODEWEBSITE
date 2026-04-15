"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";

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
    <section className="py-24 bg-surface/30">
      <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-primary-400">
          {t("testimonials_title")}
        </h2>
      </div>

      <div className="container mx-auto px-4 md:px-8 overflow-hidden rounded-2xl">
        <motion.div ref={carousel} className="cursor-grab overflow-hidden active:cursor-grabbing">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            className="flex gap-6 pb-8"
          >
            {testimonials.map((test, index) => (
              <motion.div 
                key={index} 
                className="min-w-[300px] md:min-w-[400px] p-8 rounded-2xl bg-surface border border-primary-600/20 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary-400 text-primary-400" />
                    ))}
                  </div>
                  <p className="text-lg italic text-text-secondary mb-8">
                    &quot;{t(`testimonials_items.${test.id}.quote`)}&quot;
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                    {test.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t(`testimonials_items.${test.id}.name`)}</h4>
                    <p className="text-sm text-text-secondary">
                      {t(`testimonials_items.${test.id}.role`)}, {t(`testimonials_items.${test.id}.company`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
