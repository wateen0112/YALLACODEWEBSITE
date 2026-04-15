"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  { id: 1, icon: Search },
  { id: 2, icon: PenTool },
  { id: 3, icon: Code2 },
  { id: 4, icon: Rocket },
];

export function ProcessSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 text-center mb-16">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-primary-400">
          {t("process_title")}
        </h2>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start relative">
          
          <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-primary-600/30 z-0" />

          {steps.map((step, index) => (
            <motion.div 
              key={step.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center mb-12 md:mb-0 w-full md:w-1/4 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-surface border-4 border-primary-600/30 flex items-center justify-center shadow-xl mb-6 relative group overflow-hidden">
                <div className="absolute inset-0 bg-primary-600/10 group-hover:bg-primary-600/30 transition-colors" />
                <step.icon className="w-10 h-10 text-primary-400 group-hover:scale-110 transition-transform" />
                
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold border-2 border-surface">
                  {step.id}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white">{t(`process_steps.${step.id}`)}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
