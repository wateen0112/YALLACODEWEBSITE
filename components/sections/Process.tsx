"use client";

import { useTranslations } from "next-intl";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { useRef, useLayoutEffect, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: 1, icon: Search },
  { id: 2, icon: PenTool },
  { id: 3, icon: Code2 },
  { id: 4, icon: Rocket },
];

function useReducedMotion() {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    () => false
  );
}

export function ProcessSection() {
  const t = useTranslations("home");
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indicatorRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const stepCount = steps.length;
    const stepWindowStart = 0.08;
    const stepWindowEnd = 1.0;
    const stepDuration = (stepWindowEnd - stepWindowStart) / stepCount;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 0.5,
        },
      });

      if (headerRef.current) {
        gsap.set(headerRef.current, { opacity: 0, y: 40 });
        tl.to(
          headerRef.current,
          {
            opacity: 1,
            y: 0,
            duration: stepWindowStart,
            ease: "power2.out",
          },
          0
        );
      }

      if (lineRef.current) {
        gsap.set(lineRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
        });
        tl.to(
          lineRef.current,
          {
            scaleY: 1,
            duration: stepWindowEnd - stepWindowStart,
            ease: "none",
          },
          stepWindowStart
        );
      }

      steps.forEach((_, index) => {
        const start = stepWindowStart + index * stepDuration;
        const revealEnd = start + stepDuration * 0.45;
        const activeStart = start + stepDuration * 0.25;
        const activePeak = start + stepDuration * 0.5;
        const activeEnd = start + stepDuration * 0.75;

        const stepEl = stepRefs.current[index];
        const numEl = numberRefs.current[index];
        const iconEl = iconRefs.current[index];
        const indicatorEl = indicatorRefs.current[index];

        if (!stepEl) return;

        gsap.set(stepEl, { opacity: 0, y: 60 });
        tl.to(
          stepEl,
          {
            opacity: 1,
            y: 0,
            duration: revealEnd - start,
            ease: "power2.out",
          },
          start
        );

        if (numEl) {
          gsap.set(numEl, {
            color: "rgba(255,255,255,0.1)",
            filter: "drop-shadow(0 0 0 rgba(167,139,250,0))",
          });
          tl.fromTo(
            numEl,
            {
              color: "rgba(255,255,255,0.1)",
              filter: "drop-shadow(0 0 0 rgba(167,139,250,0))",
            },
            {
              color: "#A78BFA",
              filter: "drop-shadow(0 0 12px rgba(167,139,250,0.6))",
              duration: activePeak - activeStart,
              ease: "power2.out",
            },
            activeStart
          );
          tl.to(
            numEl,
            {
              color: "rgba(255,255,255,0.1)",
              filter: "drop-shadow(0 0 0 rgba(167,139,250,0))",
              duration: activeEnd - activePeak,
              ease: "power2.inOut",
            },
            activePeak
          );
        }

        if (iconEl) {
          gsap.set(iconEl, {
            color: "rgba(255,255,255,0.2)",
            filter: "drop-shadow(0 0 0 rgba(217,70,239,0))",
          });
          tl.fromTo(
            iconEl,
            {
              color: "rgba(255,255,255,0.2)",
              filter: "drop-shadow(0 0 0 rgba(217,70,239,0))",
              scale: 1,
            },
            {
              color: "#A78BFA",
              filter: "drop-shadow(0 0 10px rgba(167,139,250,0.6))",
              scale: 1.12,
              duration: activePeak - activeStart,
              ease: "power2.out",
            },
            activeStart
          );
          tl.to(
            iconEl,
            {
              color: "rgba(255,255,255,0.3)",
              filter: "drop-shadow(0 0 0 rgba(217,70,239,0))",
              scale: 1,
              duration: activeEnd - activePeak,
              ease: "power2.inOut",
            },
            activePeak
          );
        }

        if (indicatorEl) {
          gsap.set(indicatorEl, {
            scale: 0,
            opacity: 0,
            boxShadow: "0 0 0 rgba(217,70,239,0)",
          });
          tl.fromTo(
            indicatorEl,
            {
              scale: 0,
              opacity: 0,
              boxShadow: "0 0 0 rgba(217,70,239,0)",
            },
            {
              scale: 1,
              opacity: 1,
              boxShadow: "0 0 16px rgba(167,139,250,0.8)",
              duration: activePeak - activeStart,
              ease: "power2.out",
            },
            activeStart
          );
          tl.to(
            indicatorEl,
            {
              scale: 0.7,
              opacity: 0.5,
              boxShadow: "0 0 0 rgba(217,70,239,0)",
              duration: activeEnd - activePeak,
              ease: "power2.inOut",
            },
            activePeak
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 relative h-[100vh] overflow-y-scroll scrollbar-hide min-h-screen h-[260vh]"
    >
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-primary-600/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div ref={headerRef} className="max-w-3xl ">
         
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {t("process_title")}
          </h2>
        </div>

        <div className="relative pl-12 md:pl-16">
          <div className="absolute left-[20px] md:left-[28px] top-8 bottom-8 w-0.5 bg-white/10">
            <div
              ref={lineRef}
              className="absolute inset-0 w-full bg-gradient-to-b from-primary-600 to-primary-400"
            />
          </div>

          {steps.map((step, index) => {
            const num = String(step.id).padStart(2, "0");
            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="relative py-10 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-6 md:gap-10 items-start"
              >
                <div
                  ref={(el) => {
                    indicatorRefs.current[index] = el;
                  }}
                  className="absolute left-[15px] md:left-[23px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-400"
                />
                <span
                  ref={(el) => {
                    numberRefs.current[index] = el;
                  }}
                  className="text-5xl md:text-7xl font-black text-white/10"
                >
                  {num}
                </span>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      ref={(el) => {
                        iconRefs.current[index] = el;
                      }}
                      className="text-white/20"
                    >
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {t(`process_steps.${step.id}`)}
                    </h3>
                  </div>
                </div>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {t(`process_descriptions.${step.id}`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
