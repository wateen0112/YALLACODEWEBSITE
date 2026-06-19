"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
  });

  const markers = [
    { pos: [1.2, 0.4, 0.8] },
    { pos: [-0.5, 0.8, -1.2] },
    { pos: [0.2, 1.3, 0.5] },
    { pos: [1.3, -0.4, 0.2] },
    { pos: [0.8, 0.9, -0.7] },
  ];

  return (
    <group ref={globeRef}>
      <Sphere args={[1.5, 48, 48]}>
        <meshBasicMaterial color="#1dd4ff" wireframe transparent opacity={0.25} />
      </Sphere>
      <Sphere args={[1.52, 48, 48]}>
        <meshBasicMaterial color="#f32eff" wireframe transparent opacity={0.12} />
      </Sphere>

      {markers.map((m, i) => (
        <mesh key={i} position={new THREE.Vector3(...m.pos)}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#1dd4ff" : "#f32eff"} />
        </mesh>
      ))}
    </group>
  );
}

export function GlobeScene() {
  return (
    <div className="w-full aspect-square md:aspect-video max-h-[600px]" data-aos="zoom-in">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <Globe />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} dampingFactor={0.05} />
      </Canvas>
    </div>
  );
}
