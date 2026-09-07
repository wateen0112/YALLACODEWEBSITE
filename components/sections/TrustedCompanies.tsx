"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Handshake } from "lucide-react";

const companies = [
  { name: "ERPNext", src: "/logos/ERPNext.png" },
  { name: "Google", src: "/logos/Google.png" },
  { name: "Bitrix24", src: "/logos/Bitrix24.png" },
  { name: "Odoo", src: "/logos/Odoo.png" },
  { name: "Akamai", src: "/logos/Akamai.png" },
  { name: "Cloudflare", src: "/logos/Cloudflare.png" },
  { name: "Tabby", src: "/logos/Tabby.png" },
  { name: "Tamara", src: "/logos/Tamara.png" },
  { name: "Microsoft", src: "/logos/Microsoft.png" },
  { name: "Pusher", src: "/logos/Pusher.png" },
  { name: "OneSignal", src: "/logos/OneSignal.png" },
  { name: "Firebase", src: "/logos/Firebase.png" },
  { name: "Persona", src: "/logos/Persona.png" },
  { name: "Stripe", src: "/logos/Stripe.png" },
  { name: "AWS", src: "/logos/AWS.png" },
  { name: "Azure", src: "/logos/Azure.png" },
];

const tripled = [...companies, ...companies, ...companies];

function LogoCard({ company }: { company: typeof companies[0] }) {
  return (
    <div className="group relative flex h-20 w-40 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 transition-transform transition-opacity transition-colors duration-300 hover:border-primary-500/30 hover:bg-white/[0.06] hover:scale-105">
      <div className="relative flex h-full w-full items-center justify-center">
        <Image
          src={company.src}
          alt={company.name}
          fill
          sizes="160px"
          loading="lazy"
          className="object-contain px-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      {/* Hover glow overlay */}
      <div className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/10 via-transparent to-primary-400/10" />
      </div>
    </div>
  );
}

export function TrustedCompanies() {
  const t = useTranslations("home");
  const locale = useLocale();
  const isRtl = locale === "ar";

  // For RTL, we need to reverse the animation direction
  // The key insight: for RTL, we want the track to move left (negative X) just like LTR
  // But we also need to reverse the order of items so they scroll correctly
  // Actually, for a seamless loop in RTL:
  // - LTR: items move right to left (translateX goes 0 -> -1/3)
  // - RTL: items move left to right (translateX goes 0 -> +1/3)

  const animationClass = isRtl ? "trusted-track-rtl" : "trusted-track";
  const reverseAnimationClass = isRtl ? "trusted-track-reverse-rtl" : "trusted-track-reverse";

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Inline keyframes for the infinite carousel */}
      <style>{`
        @keyframes trusted-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        @keyframes trusted-scroll-reverse {
          0% { transform: translateX(-33.3333%); }
          100% { transform: translateX(0); }
        }
        @keyframes trusted-scroll-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(33.3333%); }
        }
        @keyframes trusted-scroll-reverse-rtl {
          0% { transform: translateX(33.3333%); }
          100% { transform: translateX(0); }
        }
        .trusted-track {
          animation: trusted-scroll 60s linear infinite;
        }
        .trusted-track-reverse {
          animation: trusted-scroll-reverse 65s linear infinite;
        }
        .trusted-track-rtl {
          animation: trusted-scroll-rtl 60s linear infinite;
        }
        .trusted-track-reverse-rtl {
          animation: trusted-scroll-reverse-rtl 65s linear infinite;
        }
        .trusted-track:hover,
        .trusted-track-reverse:hover,
        .trusted-track-rtl:hover,
        .trusted-track-reverse-rtl:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Soft background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-600/10 blur-[160px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <div className={`mb-16 md:mb-20 ${isRtl ? "rtl:text-right" : "text-left"}`}>
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-text-secondary mb-6"
          >
            <Handshake className="h-4 w-4 text-primary-400" />
            <span>{t("trusted_badge")}</span>
          </div>

          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {t("trusted_title")}
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-lg md:text-xl text-text-secondary leading-relaxed"
          >
            {t("trusted_description")}
          </p>
        </div>
      </div>

      {/* Infinite logo carousel - Row 1 */}
      <div data-aos="fade-up" data-aos-delay="300" className="relative w-full">
        {/* Fade masks */}
        <div className={`pointer-events-none absolute top-0 bottom-0 w-16 md:w-32 z-10 ${isRtl ? "right-0 bg-gradient-to-l from-background to-transparent" : "left-0 bg-gradient-to-r from-background to-transparent"}`} />
        <div className={`pointer-events-none absolute top-0 bottom-0 w-16 md:w-32 z-10 ${isRtl ? "left-0 bg-gradient-to-r from-background to-transparent" : "right-0 bg-gradient-to-l from-background to-transparent"}`} />

        <div className="overflow-hidden py-4">
          <div className={`${animationClass} flex w-max items-center gap-6 md:gap-10`}>
            {tripled.map((company, index) => (
              <LogoCard key={`row1-${company.name}-${index}`} company={company} />
            ))}
          </div>
        </div>

        {/* Second row - reversed direction */}
        <div className="overflow-hidden py-4 mt-4">
          <div className={`${reverseAnimationClass} flex w-max items-center gap-6 md:gap-10`}>
            {tripled.map((company, index) => (
              <LogoCard key={`row2-${company.name}-${index}`} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
