"use client";

import { useTranslations } from "next-intl";
import { GlobeScene } from "../3d/GlobeScene";

export function GlobeSection() {
  const t = useTranslations("home");

  return (
    <section className="py-24 overflow-hidden relative border-y border-primary-600/10">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text pb-5 text-transparent bg-gradient-to-r from-text-primary to-primary-400">
          {t("globe_title")}
        </h2>
      </div>
      
      <div className="w-full flex justify-center mt-8">
        <GlobeScene />
      </div>
    </section>
  );
}
