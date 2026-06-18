"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CubeData {
  position: [number, number, number];
  rotation: [number, number, number];
  size: [number, number, number];
}

const PURPLE_COLORS = [
  new THREE.Color("#A855F7"),
  new THREE.Color("#C084FC"),
  new THREE.Color("#D946EF"),
  new THREE.Color("#7C3AED"),
];

function CubeCluster() {
  const groupRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const edgesRef = useRef<THREE.LineBasicMaterial[]>([]);
  const { mouse } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });
  const autoRotation = useRef(0);

  const cubes = useMemo<CubeData[]>(() => {
    return [
      { position: [0, 0, 0], rotation: [0.3, 0.4, 0], size: [2.4, 2.4, 2.4] },
      { position: [2.2, 1.2, 0.4], rotation: [-0.2, 0.5, 0.3], size: [1.7, 1.7, 1.7] },
      { position: [-1.9, 1.4, 0.3], rotation: [0.4, -0.3, -0.2], size: [1.5, 1.5, 1.5] },
      { position: [1.5, -1.7, -0.3], rotation: [0.2, 0.6, 0.1], size: [1.8, 1.8, 1.8] },
      { position: [-1.7, -1.3, 0.5], rotation: [-0.3, -0.4, 0.2], size: [1.4, 1.4, 1.4] },
      { position: [0.3, 2.2, -0.4], rotation: [0.5, 0.2, -0.3], size: [1.2, 1.2, 1.2] },
      { position: [-0.5, -2.4, 0.2], rotation: [-0.1, 0.3, 0.4], size: [1.3, 1.3, 1.3] },
      { position: [2.5, -0.5, -0.5], rotation: [0.3, -0.5, 0.2], size: [1.1, 1.1, 1.1] },
      { position: [-2.3, 0.3, -0.4], rotation: [-0.4, 0.2, -0.1], size: [1.05, 1.05, 1.05] },
    ];
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Clamp delta to avoid large jumps on tab refocus / low FPS
    const dt = Math.min(delta, 0.05);

    // Smooth mouse follow
    targetRotation.current.x = mouse.y * 0.25;
    targetRotation.current.y = mouse.x * 0.25;

    // Very slow continuous rotation, accumulated smoothly
    autoRotation.current += dt * 0.03;

    const targetX = targetRotation.current.x;
    const targetY = targetRotation.current.y + autoRotation.current;

    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 1.5 * dt;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 1.5 * dt;

    // Blink / pulse colors across purple gradient
    const time = state.clock.elapsedTime;
    materialsRef.current.forEach((material, index) => {
      const offset = index * 0.4;
      const t = (Math.sin(time * 2 + offset) + 1) / 2;
      const colorIndex = Math.floor(t * (PURPLE_COLORS.length - 1));
      const nextColorIndex = Math.min(colorIndex + 1, PURPLE_COLORS.length - 1);
      const localT = t * (PURPLE_COLORS.length - 1) - colorIndex;

      const baseColor = PURPLE_COLORS[colorIndex].clone().lerp(PURPLE_COLORS[nextColorIndex], localT);
      material.color.copy(baseColor);
      material.emissive.copy(baseColor);
      material.emissiveIntensity = 0.25 + Math.sin(time * 3 + offset) * 0.15;
    });

    edgesRef.current.forEach((material, index) => {
      const offset = index * 0.4;
      const pulse = (Math.sin(state.clock.elapsedTime * 3 + offset) + 1) / 2;
      const color = PURPLE_COLORS[Math.floor(pulse * (PURPLE_COLORS.length - 1))];
      material.color.copy(color);
      material.opacity = 0.6 + pulse * 0.4;
    });
  });

  return (
    <group ref={groupRef} scale={1.15}>
      {cubes.map((cube, index) => (
        <group key={index} position={cube.position} rotation={cube.rotation}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={cube.size} />
            <meshPhysicalMaterial
              ref={(el) => {
                if (el) materialsRef.current[index] = el;
              }}
              color="#A855F7"
              emissive="#A855F7"
              emissiveIntensity={0.3}
              metalness={0.7}
              roughness={0.15}
              transmission={0.1}
              thickness={0.5}
              clearcoat={1}
              clearcoatRoughness={0.1}
              envMapIntensity={1.5}
              transparent
              opacity={0.95}
            />
          </mesh>
          {/* Glowing edges */}
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(...cube.size)]} />
            <lineBasicMaterial
              ref={(el) => {
                if (el) edgesRef.current[index] = el;
              }}
              color="#C084FC"
              transparent
              opacity={0.9}
              linewidth={2}
            />
          </lineSegments>
        </group>
      ))}
      {/* Strong purple rim lights */}
      <pointLight position={[4, 4, 4]} intensity={4} color="#A855F7" distance={15} />
      <pointLight position={[-4, -4, 4]} intensity={3} color="#C084FC" distance={15} />
      <pointLight position={[0, 0, 6]} intensity={2} color="#ffffff" distance={10} />
    </group>
  );
}

export function HeroCubeCluster() {
  return (
    <div className="relative w-full h-full min-h-[360px] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[500px] cursor-pointer">
      {/* Background glow behind the cluster */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[480px] md:h-[480px] rounded-full bg-primary-500/15 blur-[90px] animate-pulse" />
      </div>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 42 }}
        dpr={[1, 2]}
        shadows
        className="relative z-10"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[6, 6, 6]} intensity={2} color="#ffffff" castShadow />
        <directionalLight position={[-6, -6, 6]} intensity={1.2} color="#C084FC" />
        <spotLight
          position={[0, 10, 4]}
          angle={0.8}
          penumbra={1}
          intensity={2}
          color="#ffffff"
        />
        <CubeCluster />
      </Canvas>
    </div>
  );
}
