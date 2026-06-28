"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { projects } from "@/lib/projects";
import { Monitor, Tablet, Smartphone } from "lucide-react";

export function Marquee() {
  const t = useTranslations("home");
  const showcaseProjects = projects.slice(0, 3);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div className="max-w-xl">
            <span
              data-aos="fade-down"
              className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-secondary mb-4"
            >
              {t("showcase_badge")}
            </span>
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              {t("showcase_title")}
            </h2>
          </div>
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-text-secondary max-w-md lg:text-right"
          >
            {t("showcase_subtitle")}
          </p>
        </div>

        {/* Device showcase */}
        <div
          data-aos="tilt-up"
          data-aos-delay="200"
          className="relative perspective-1200 min-h-[420px] md:min-h-[520px] flex items-center justify-center"
        >
          <div className="relative w-full max-w-6xl preserve-3d flex items-center justify-center gap-4 md:gap-8">
            {/* Phone */}
            <div className="hidden md:block relative group perspective-1000">
              <div className="card-3d w-[140px] lg:w-[170px] rounded-[2rem] border-4 border-white/10 bg-surface p-2 shadow-2xl">
                <div className="relative aspect-[9/19] rounded-[1.5rem] overflow-hidden bg-surface border border-white/5">
                  <Image
                    src={showcaseProjects[2]?.image}
                    alt={showcaseProjects[2]?.title}
                    fill
                    sizes="170px"
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-primary-400" />
                    <span className="text-xs font-semibold text-white truncate">
                      {showcaseProjects[2]?.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div className="relative group perspective-1000 z-10">
              <div className="card-3d rounded-2xl border border-white/10 bg-surface p-3 pb-0 shadow-2xl">
                <div className="relative aspect-[16/10] w-[320px] md:w-[520px] lg:w-[680px] rounded-t-xl overflow-hidden bg-surface border border-white/5">
                  <Image
                    src={showcaseProjects[0]?.image}
                    alt={showcaseProjects[0]?.title}
                    fill
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 520px, 680px"
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-primary-400" />
                    <span className="text-sm font-bold text-white">
                      {showcaseProjects[0]?.title}
                    </span>
                  </div>
                </div>
                <div className="h-4 md:h-6 bg-surface rounded-b-xl border-t border-white/10" />
              </div>
              <div className="mx-auto mt-1 h-8 w-24 md:w-32 bg-gradient-to-b from-surface to-transparent rounded-b-lg border-x border-b border-white/10" />
            </div>

            {/* Tablet */}
            <div className="hidden md:block relative group perspective-1000">
              <div className="card-3d w-[180px] lg:w-[220px] rounded-[1.5rem] border-4 border-white/10 bg-surface p-2 shadow-2xl">
                <div className="relative aspect-[3/4] rounded-[1.2rem] overflow-hidden bg-surface border border-white/5">
                  <Image
                    src={showcaseProjects[1]?.image}
                    alt={showcaseProjects[1]?.title}
                    fill
                    sizes="220px"
                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                    <Tablet className="w-4 h-4 text-primary-400" />
                    <span className="text-xs font-semibold text-white truncate">
                      {showcaseProjects[1]?.title}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
