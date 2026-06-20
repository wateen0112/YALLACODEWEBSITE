"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
  });

  const color = theme === "light" ? "#7C3AED" : "#C084FC";

  const markers = [
    { pos: [1.2, 0.4, 0.8] },
    { pos: [-0.5, 0.8, -1.2] },
    { pos: [0.2, 1.3, 0.5] },
    { pos: [1.3, -0.4, 0.2] },
    { pos: [0.8, 0.9, -0.7] },
  ];

  return (
    <group ref={globeRef}>
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
      </Sphere>

      {markers.map((m, i) => (
        <mesh key={i} position={new THREE.Vector3(...m.pos)}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
}

export function GlobeScene({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full min-h-[280px]", className)}>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <Globe />
      </Canvas>
    </div>
  );
}
