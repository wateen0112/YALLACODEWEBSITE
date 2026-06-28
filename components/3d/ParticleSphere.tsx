import { useEffect, useRef } from 'react';

interface ParticleSphereProps {
  size?: number;
  points?: number;
  color?: string;
  radiusRatio?: number;
  rotationSpeed?: number;
  padding?: number;
  influence?: number;
  glow?: boolean;
  className?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  vx: number;
  vy: number;
  vz: number;
}

/**
 * <Circle /> — Animated 3D particle sphere with cursor repulsion.
 *
 * Props:
 *  - size           : canvas pixel size (default 560)
 *  - points         : number of dots (default 3600)
 *  - color          : base hex color (default "#7C3AED")
 *  - radiusRatio    : sphere radius relative to size (default 0.4)
 *  - rotationSpeed  : auto-rotation speed (default 0.0028)
 *  - padding        : minimum gap kept around cursor in px (default 75)
 *  - influence      : outer falloff radius around cursor in px (default 200)
 *  - glow           : show outer glow shadow (default true)
 *  - className      : extra wrapper classes
 */
export function ParticleSphere({
  size = 560,
  points: numPoints = 3600,
  color = '#7C3AED',
  radiusRatio = 0.4,
  rotationSpeed = 0.0028,
  padding = 37.5,
  influence = 200,
  glow = true,
  className = ''
}: ParticleSphereProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Convert hex -> {h, s, l}
  const hexToHsl = (hex: string) => {
    const clean = hex.replace('#', '');
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0; const l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        default: h = (r - g) / d + 4;
      }
      h *= 60;
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.scale(dpr, dpr);

    const center = size / 2;
    const baseRadius = size * radiusRatio;
    const { h, s } = hexToHsl(color);

    // Fibonacci sphere
    const pts: Point3D[] = [];
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      pts.push({
        x: Math.cos(theta) * r,
        y,
        z: Math.sin(theta) * r,
        ox: Math.cos(theta) * r,
        oy: y,
        oz: Math.sin(theta) * r,
        vx: 0, vy: 0, vz: 0
      });
    }

    let angle = 0;
    const mouse = { x: -9999, y: -9999, inside: false };
    let velocityBoost = 0;

    const onMove = (e: globalThis.MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = true;
      velocityBoost = 1;
    };
    const onLeave = () => { mouse.inside = false; };
    window.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    let raf: number;

    interface DrawnPoint {
      sx: number;
      sy: number;
      z: number;
      pSize: number;
    }

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      angle += rotationSpeed + velocityBoost * 0.004;
      velocityBoost *= 0.94;
      const cosA = Math.cos(angle), sinA = Math.sin(angle);

      const drawn: DrawnPoint[] = [];
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Spring back to original position
        p.vx += (p.ox - p.x) * 0.04;
        p.vy += (p.oy - p.y) * 0.04;
        p.vz += (p.oz - p.z) * 0.04;
        p.vx *= 0.82; p.vy *= 0.82; p.vz *= 0.82;
        p.x += p.vx; p.y += p.vy; p.z += p.vz;

        // Rotate around Y axis
        const x = p.x * cosA + p.z * sinA;
        const z = -p.x * sinA + p.z * cosA;
        const persp = 1 / (1.55 - z);
        const sx = center + x * baseRadius * persp;
        const sy = center + p.y * baseRadius * persp;
        const pSize = Math.max(0.5, 1.55 * persp);

        // Cursor repulsion with padding gap
        if (mouse.inside) {
          const dx = sx - mouse.x;
          const dy = sy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          if (dist < influence) {
            const inPad = dist < padding;
            const falloff = inPad ? 1 : Math.max(0, 1 - (dist - padding) / (influence - padding));
            const force = falloff * (inPad ? 1.4 : 0.5);
            p.vx += (dx / dist) * force * 0.18;
            p.vy += (dy / dist) * force * 0.18;
            p.vz -= force * 0.015;
          }
        }

        drawn.push({ sx, sy, z, pSize });
      }

      drawn.sort((a, b) => a.z - b.z);
      for (let i = 0; i < drawn.length; i++) {
        const d = drawn[i];
        const t = (d.z + 1) * 0.5;
        const alpha = 0.22 + t * 0.78;
        const lightness = 48 + t * 22;
        ctx.fillStyle = `hsla(${h}, ${s}%, ${lightness}%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(d.sx, d.sy, d.pSize, 0, Math.PI * 2);
        ctx.fill();
      }

      if (glow) {
        const g = ctx.createRadialGradient(center, center, baseRadius * 0.2, center, center, baseRadius * 1.1);
        g.addColorStop(0, `hsla(${h}, ${s}%, 60%, 0.10)`);
        g.addColorStop(1, `hsla(${h}, ${s}%, 60%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(center, center, baseRadius * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [size, numPoints, color, radiusRatio, rotationSpeed, padding, influence, glow]);

  return (
    <div
      className={`circle-shape ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        maxWidth: size,
        margin: '0 auto'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          filter: glow ? `drop-shadow(0 0 80px ${color}73)` : 'none',
          cursor: 'crosshair'
        }}
      />
    </div>
  );
}
