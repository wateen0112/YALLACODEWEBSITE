"use client";

import { useTranslations } from "next-intl";
import {
  useRef,
  useLayoutEffect,
  useState,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAMES = [
  "/pin-scroll/ref2_desktop_top.png",
  "/pin-scroll/ref2_desktop_2.png",
  "/pin-scroll/ref2_desktop_3.png",
  "/pin-scroll/ref2_desktop_4.png",
  "/pin-scroll/ref2_desktop_5.png",
  "/pin-scroll/ref2_desktop_6.png",
  "/pin-scroll/ref2_desktop_7.png",
  "/pin-scroll/ref2_desktop_8.png",
  "/pin-scroll/ref2_desktop_9.png",
  "/pin-scroll/ref2_desktop_10.png",
  "/pin-scroll/ref2_desktop_11.png",
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

function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );
}

export function PinScrollShowcase() {
  const t = useTranslations("home");
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const frameRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    let cancelled = false;
    preloadImages(FRAMES).then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion || !loaded || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      frameRefs.current.forEach((img, i) => {
        if (img) gsap.set(img, { opacity: i === 0 ? 1 : 0 });
      });
      textRefs.current.forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 24 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 0.5,
        },
      });

      const frameCount = FRAMES.length;
      const segment = 1 / frameCount;
      const fade = segment * 0.25;

      // Image sequence with short crossfades
      frameRefs.current.forEach((img, i) => {
        if (!img) return;
        const start = i * segment;
        const end = (i + 1) * segment;

        if (i > 0) {
          tl.fromTo(
            img,
            { opacity: 0 },
            { opacity: 1, duration: fade, ease: "none" },
            start
          );
        }

        if (i < frameCount - 1) {
          tl.to(
            img,
            { opacity: 0, duration: fade, ease: "none" },
            end - fade
          );
        }
      });

      // Text milestones
      const milestones = [
        { start: 0.04, hold: 0.16, end: 0.22 },
        { start: 0.34, hold: 0.48, end: 0.54 },
        { start: 0.68, hold: 0.84, end: 0.92 },
      ];

      milestones.forEach((m, i) => {
        const el = textRefs.current[i];
        if (!el) return;

        tl.fromTo(
          el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: m.hold - m.start, ease: "power2.out" },
          m.start
        );
        tl.to(
          el,
          { opacity: 0, y: -16, duration: m.end - m.hold, ease: "power2.in" },
          m.hold
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, loaded]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary-600/10 blur-[160px]" />

      {/* Image sequence */}
      <div className="absolute inset-0 flex items-center justify-center p-4 md:p-10 lg:p-16">
        <div className="relative w-full h-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl border border-white/5">
          {FRAMES.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              ref={(el) => {
                frameRefs.current[i] = el;
              }}
              src={src}
              alt=""
              width={1920}
              height={1080}
              className={`absolute inset-0 w-full h-full object-cover object-top ${
                reducedMotion && i === FRAMES.length - 1 ? "opacity-100" : ""
              }`}
              style={{ willChange: "opacity" }}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          ))}
        </div>
      </div>

      {/* Text milestones */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-end pb-16 md:pb-24 lg:pb-28">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="max-w-xl glass-card rounded-2xl p-5 md:p-7"
              style={{ opacity: reducedMotion ? 1 : undefined }}
            >
              <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs md:text-sm text-text-secondary mb-3">
                {t(`pinscroll_step_${i + 1}_badge`)}
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {t(`pinscroll_step_${i + 1}_title`)}
              </h3>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                {t(`pinscroll_step_${i + 1}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
