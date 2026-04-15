"use client";

import { useEffect, useRef } from "react";

interface LetterPosition {
  char: string;
  finalX: number;
  finalY: number;
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  isAccent: boolean;
}

export function YallaCodeLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Force LTR so Arabic (rtl) page does not reorder `<YallaCode/>` to `>YallaCode</`
    ctx.direction = "ltr";

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const textParts = [
      { text: "<", color: "#ffffff", type: "bracket" as const },
      { text: "Yalla", color: "#ffffff", type: "text" as const },
      { text: "Code", color: "#ff00ff", type: "accent" as const },
      { text: "/>", color: "#ffffff", type: "bracket" as const },
    ];

    const fontSize = 80;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";

    const buildLetterPositions = () => {
      centerX = canvas.width / 2;
      centerY = canvas.height / 2;

      let totalWidth = 0;
      const measurements = textParts.map((part) => {
        const metrics = ctx.measureText(part.text);
        const width = metrics.width;
        totalWidth += width;
        return { ...part, width };
      });

      const spacing = 15;
      totalWidth += spacing * (textParts.length - 1);

      let currentX = centerX - totalWidth / 2;
      const positions: LetterPosition[] = [];

      measurements.forEach((part, partIndex) => {
        const chars = part.text.split("");
        const charWidth = part.width / chars.length;
        const isAccent = part.type === "accent";

        chars.forEach((char, charIndex) => {
          const charX = currentX + charIndex * charWidth;
          const finalX = charX + charWidth / 2;
          const finalY = centerY;

          const angle = Math.random() * Math.PI * 2;
          const distance = 300 + Math.random() * 200;
          const startX = centerX + Math.cos(angle) * distance;
          const startY = centerY + Math.sin(angle) * distance;

          const delay = partIndex * 100 + charIndex * 50;
          const duration = 1500;

          positions.push({
            char,
            finalX,
            finalY,
            startX,
            startY,
            delay,
            duration,
            isAccent,
          });
        });

        currentX += part.width + spacing;
      });

      return positions;
    };

    let letterPositions = buildLetterPositions();

    let animationId: number;
    let startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      ctx.fillStyle = "#0f0f0f";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      letterPositions.forEach((letter) => {
        const letterElapsed = Math.max(0, elapsed - letter.delay);
        const progress = Math.min(1, letterElapsed / letter.duration);

        const easeProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        const x = letter.startX + (letter.finalX - letter.startX) * easeProgress;
        const y = letter.startY + (letter.finalY - letter.startY) * easeProgress;

        const opacity = Math.min(1, easeProgress * 1.5);
        const glowIntensity = Math.sin(elapsed / 300) * 0.3 + 0.7;

        if (progress < 1) {
          ctx.shadowColor = letter.isAccent
            ? `rgba(255, 0, 255, ${opacity * glowIntensity * 0.6})`
            : `rgba(0, 230, 255, ${opacity * glowIntensity * 0.4})`;
          ctx.shadowBlur = 20 + Math.sin(elapsed / 200) * 10;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
        } else {
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }

        if (letter.isAccent) {
          ctx.fillStyle = `rgba(255, 0, 255, ${opacity})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        }

        ctx.font = `bold ${fontSize}px 'Courier New', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letter.char, x, y);
      });

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;

      if (elapsed > 4000) {
        startTime = Date.now();
        letterPositions = buildLetterPositions();
      }

      animationId = requestAnimationFrame(animate);
    };

    const onResize = () => {
      updateCanvasSize();
      letterPositions = buildLetterPositions();
    };
    window.removeEventListener("resize", updateCanvasSize);
    window.addEventListener("resize", onResize);

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
      style={{ direction: "ltr", unicodeBidi: "isolate" }}
    >
      <canvas
        ref={canvasRef}
        dir="ltr"
        className="absolute inset-0 block"
        style={{ direction: "ltr" }}
      />
    </div>
  );
}
