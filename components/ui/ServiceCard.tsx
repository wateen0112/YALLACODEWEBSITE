"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ServiceCard({ title, description, icon: Icon }: ServiceProps) {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 0 32px rgba(124,58,237,0.15)" }}
      className="relative p-8 rounded-2xl bg-surface/80 backdrop-blur-md border border-primary-600/20 group overflow-hidden transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-primary-600/20 flex items-center justify-center mb-6 border border-primary-600/30 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary-400" />
        </div>
        
        <h3 className="text-xl font-bold text-text-primary mb-3">
          {title}
        </h3>
        
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
