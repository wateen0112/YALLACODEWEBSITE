"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { m } from "framer-motion";

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 0.6 : 0.2);
      meshRef.current.rotation.y += delta * (hovered ? 0.8 : 0.3);
    }
  });

  const color = theme === "light" ? "#7C3AED" : "#C084FC";

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  );
}

export function FloatingCube() {
  return (
    <m.div 
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-full min-h-[300px] cursor-pointer"
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Cube />
      </Canvas>
    </m.div>
  );
}
