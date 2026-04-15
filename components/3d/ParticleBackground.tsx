"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";

function Particles() {
  const { theme } = useTheme();
  const particlesRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const particleCount = 3000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Day mode primary: #7C3AED (opacity will handle softness)
    const colorLight = new THREE.Color("#7C3AED"); 
    // Dark mode primary: #A855F7
    const colorDark = new THREE.Color("#A855F7");  

    // Using dark color initially and updating later if needed, but since it's memoized, we will re-run on theme change
    const mixedColor = theme === "light" ? colorLight : colorDark;

    for (let i = 0; i < particleCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = Math.random() * 20 + 2; 
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
        positions[i * 3 + 2] = radius * Math.cos(phi); // z

        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }
    return [positions, colors];
  }, [theme]);

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
        opacity={theme === "light" ? 0.15 : 0.4} 
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
