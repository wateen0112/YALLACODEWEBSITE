"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export function AOSProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out-cubic",
      offset: 80,
      delay: 0,
    });

    // Refresh after fonts/images load to recalculate positions
    window.addEventListener("load", () => AOS.refresh());
    return () => {
      window.removeEventListener("load", () => AOS.refresh());
    };
  }, []);

  return <>{children}</>;
}
