"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (hovered ? 0.6 : 0.2);
      meshRef.current.rotation.y += delta * (hovered ? 0.8 : 0.3);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshBasicMaterial color="#1dd4ff" wireframe transparent opacity={0.8} />
    </mesh>
  );
}

function InnerCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x -= delta * 0.15;
      meshRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.8, 1.8, 1.8]} />
      <meshBasicMaterial color="#f32eff" wireframe transparent opacity={0.4} />
    </mesh>
  );
}

export function FloatingCube() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="w-full h-full min-h-[300px] cursor-pointer"
    >
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <Cube />
        <InnerCube />
      </Canvas>
    </motion.div>
  );
}
