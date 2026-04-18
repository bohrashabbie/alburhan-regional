'use client';

import * as React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A slowly rotating mass of glowing bulbs, meant as the hero centerpiece.
 * Burgundy core + gold orbit + silver satellites.
 * Runs inside a Canvas — import this through a dynamic import so the whole
 * three.js bundle stays out of the initial JS payload.
 */
function BulbCluster() {
  const group = React.useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.15;
      group.current.rotation.x = Math.sin(performance.now() * 0.0003) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={1.1}>
        {/* Core sphere — burgundy glow */}
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1, 4]} />
          <MeshDistortMaterial
            color="#c2324a"
            emissive="#8b1a2b"
            emissiveIntensity={1.2}
            distort={0.26}
            speed={1.4}
            roughness={0.15}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* Orbit bulbs — gold satellites */}
      {[
        { r: 2.2, t: 0, y: 0.3, s: 0.35 },
        { r: 2.4, t: 2.1, y: -0.5, s: 0.28 },
        { r: 2.1, t: 4.3, y: 0.7, s: 0.3 },
        { r: 2.6, t: 1.2, y: -0.3, s: 0.22 },
      ].map((o, i) => (
        <Float key={i} speed={1.5 + i * 0.3} rotationIntensity={0.4} floatIntensity={1.5}>
          <mesh position={[Math.cos(o.t) * o.r, o.y, Math.sin(o.t) * o.r]}>
            <sphereGeometry args={[o.s, 32, 32]} />
            <meshStandardMaterial
              color="#e7c766"
              emissive="#c9a94f"
              emissiveIntensity={1.1}
              roughness={0.2}
              metalness={0.85}
            />
          </mesh>
        </Float>
      ))}

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[3.1, 0.02, 16, 160]} />
        <meshStandardMaterial
          color="#c9a94f"
          emissive="#c9a94f"
          emissiveIntensity={0.8}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

function HeroScene3D() {
  return (
    <Canvas
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.5], fov: 48 }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 4, 4]} intensity={0.7} color="#ffe7a8" />
      <pointLight position={[-4, -2, -2]} intensity={1.2} color="#c2324a" />
      <pointLight position={[3, -3, 3]} intensity={0.8} color="#c9a94f" />

      <React.Suspense fallback={null}>
        <BulbCluster />
        <Environment preset="night" />
      </React.Suspense>
    </Canvas>
  );
}

export default HeroScene3D;
