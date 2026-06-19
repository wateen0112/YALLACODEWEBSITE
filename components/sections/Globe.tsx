"use client";

import { useTranslations } from "next-intl";
import { GlobeScene } from "../3d/GlobeScene";

export function GlobeSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 lg:py-32 overflow-hidden relative border-y border-white/5">
      <div className="container mx-auto px-4 text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl lg:text-[52px] font-bold font-satoshi text-white leading-[1.1]">
          {t("globe_title")}
        </h2>
      </div>

      <div className="w-full flex justify-center mt-8">
        <GlobeScene />
      </div>
    </section>
  );
}
