"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index?: number;
}

const cardGradients = [
  "from-accent-cyan/25 to-accent-magenta/15",
  "from-accent-lime/25 to-accent-cyan/15",
  "from-accent-magenta/25 to-accent-yellow/15",
  "from-accent-yellow/25 to-accent-cyan/15",
  "from-accent-cyan/25 to-accent-lime/15",
  "from-accent-magenta/25 to-accent-cyan/15",
];

// Exact card surface used for both the card background and icon outer ring
// so the icon visually belongs to the card rather than floating on top.
const cardSurface = "bg-[#0a0a0a]/80 backdrop-blur-[40px] border border-white/[0.08]";

export function ServiceCard({ title, description, icon: Icon, index = 0 }: ServiceProps) {
  const bgGradient = cardGradients[index % cardGradients.length];

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 396, damping: 56 }}
      className={`group relative flex flex-col items-center gap-[62px] w-full p-5 rounded-2xl overflow-hidden ${cardSurface}`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Soft top gradient glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-accent-cyan/10 blur-[60px] pointer-events-none" />

      {/* Image + Icon */}
      <div className="relative flex justify-center items-center w-full">
        {/* Feature image placeholder with NFTify aspect ratio */}
        <div className="relative w-full aspect-[1.52/1] h-[217px] rounded-[20px] overflow-hidden bg-gradient-to-br from-white/[0.04] to-white/[0.10]">
          <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-70`} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-20 h-20 text-white/20" strokeWidth={1} />
          </div>
        </div>

        {/* Floating icon box — uses same surface as card so it blends in */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className={`w-[84px] h-[84px] rounded-full flex items-center justify-center ${cardSurface}`}>
            <div className="w-[62px] h-[62px] rounded-full bg-gradient-nftify flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Icon className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Title + Description */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center w-full">
        <h3 className="text-2xl font-bold font-satoshi text-white leading-tight">
          {title}
        </h3>
        <p className="text-lg text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
