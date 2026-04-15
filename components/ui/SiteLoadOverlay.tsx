"use client";

import { ReactNode, useEffect, useState } from "react";
import { YallaCodeLoader } from "./YallaCodeLoader";

const MIN_VISIBLE_MS = 1800;

export function SiteLoadOverlay({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      window.setTimeout(() => setVisible(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <>
      {children}
      {visible ? <YallaCodeLoader /> : null}
    </>
  );
}
