"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const neonColors = ["#1dd4ff", "#f32eff", "#61ec1c", "#ffcf0f"];

// Seeded pseudo-random generator so particle positions are deterministic
// and the component stays pure during render (avoids Math.random lint errors).
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const particleCount = 3000;

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const rand = seededRandom(42);

    for (let i = 0; i < particleCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos((rand() * 2) - 1);
      const radius = rand() * 20 + 2;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const colorHex = neonColors[Math.floor(rand() * neonColors.length)];
      const color = new THREE.Color(colorHex);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return [positions, colors];
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0003;
      const targetX = mouse.x * 0.5;
      const targetY = mouse.y * 0.5;
      particlesRef.current.position.x += (targetX - particlesRef.current.position.x) * 0.02;
      particlesRef.current.position.y += (targetY - particlesRef.current.position.y) * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
