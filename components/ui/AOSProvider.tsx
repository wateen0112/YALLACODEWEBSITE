"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 600,
      easing: "ease-out-cubic",
      offset: 120,
      delay: 0,
      disable: function () {
        // Disable AOS on touch devices to reduce main-thread work
        return window.matchMedia("(pointer: coarse)").matches;
      },
    });
  }, []);

  return <>{children}</>;
}
