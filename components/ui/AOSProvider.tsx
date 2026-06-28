"use client";

import { useEffect } from "react";

export function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on touch devices to save main-thread work
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-aos]");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.aosDelay;
            if (delay) {
              el.style.transitionDelay = `${delay}ms`;
            }
            el.classList.add("aos-animate");
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
