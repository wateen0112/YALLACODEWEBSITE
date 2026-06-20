"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef, useCallback } from "react";
import { Star, Sparkles, GripHorizontal } from "lucide-react";

const faceConfigs = [
  { id: 1, transform: "rotateY(0deg) translateZ(180px)" },
  { id: 2, transform: "rotateY(180deg) translateZ(180px)" },
  { id: 3, transform: "rotateY(90deg) translateZ(180px)" },
  { id: 4, transform: "rotateY(-90deg) translateZ(180px)" },
  { id: 5, transform: "rotateX(90deg) translateZ(180px)" },
  { id: 6, transform: "rotateX(-90deg) translateZ(180px)" },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

export function TestimonialsSection() {
  const t = useTranslations("home");

  const [rotation, setRotation] = useState({ x: -15, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotationStart = useRef({ x: -15, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({ ...prev, y: prev.y + 0.3 }));
    }, 16);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotationStart.current = { ...rotation };
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  }, [rotation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;
    setRotation({
      x: rotationStart.current.x - deltaY * 0.3,
      y: rotationStart.current.y + deltaX * 0.3,
    });
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
    setTimeout(() => setAutoRotate(true), 2000);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-24 h-screen relative select-none overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-primary-600/10 rounded-full blur-[160px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col justify-center">
            <span
              data-aos="fade-down"
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-text-secondary mb-6"
            >
              <Sparkles className="h-4 w-4 text-primary-400" />
              <span>{t("testimonials_badge")}</span>
            </span>

            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              {t("testimonials_claim")}
            </h2>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-lg md:text-xl text-text-secondary leading-relaxed mb-8 max-w-lg"
            >
              {t("testimonials_subclaim")}
            </p>

            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary-600/15 border border-primary-500/20 flex items-center justify-center shrink-0">
                <GripHorizontal className="w-6 h-6 text-primary-400" />
              </div>
              <p className="text-sm text-text-secondary">{t("cube_drag_hint")}</p>
            </div>
          </div>

          <div
            ref={containerRef}
            data-aos="zoom-in"
            data-aos-delay="300"
            className="relative mx-auto w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] cursor-grab active:cursor-grabbing"
            style={{ perspective: "1000px" }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            <div
              className="absolute inset-0 transition-transform duration-100 ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(" + rotation.x + "deg) rotateY(" + rotation.y + "deg)",
              }}
            >
              {faceConfigs.map((face) => {
                const nameKey = "testimonials_items." + face.id + ".name";
                const roleKey = "testimonials_items." + face.id + ".role";
                const companyKey = "testimonials_items." + face.id + ".company";
                const quoteKey = "testimonials_items." + face.id + ".quote";
                const name = t(nameKey);

                return (
                  <div
                    key={face.id}
                    className="absolute inset-0 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6 md:p-8 flex flex-col justify-between shadow-2xl"
                    style={{
                      transform: face.transform,
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
                      ))}
                    </div>

                    <p className="text-text-secondary leading-relaxed line-clamp-5 md:line-clamp-6 my-4">
                      &quot;{t(quoteKey)}&quot;
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {getInitials(name)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{name}</h4>
                        <p className="text-xs text-text-secondary">
                          {t(roleKey)},{" "}
                          {t(companyKey)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
