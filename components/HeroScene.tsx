'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* Full-bleed hero scene: molten-gold distorted core inside a wireframe shell,
   orbiting particle nebula, slow camera drift, and pointer parallax.
   Rendered behind the hero copy (canvas is pointer-events: none). */

// Shared pointer state (canvas has pointer-events none, so listen on window)
const pointer = { x: 0, y: 0 };

function usePointerTracking() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
}

// ─── Molten gold core ─────────────────────────────────────────────────────────
function ForgeCore() {
  const shellRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!shellRef.current) return;
    shellRef.current.rotation.y -= 0.0035;
    shellRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.25;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.7}>
      {/* molten distorted sphere */}
      <mesh>
        <sphereGeometry args={[1.15, 64, 64]} />
        <MeshDistortMaterial
          color="#D4A017"
          emissive="#7A5C06"
          emissiveIntensity={0.45}
          metalness={0.9}
          roughness={0.18}
          distort={0.32}
          speed={1.6}
        />
      </mesh>
      {/* rotating wireframe shell */}
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.75, 1]} />
        <meshBasicMaterial color="#F0BA30" wireframe transparent opacity={0.14} />
      </mesh>
    </Float>
  );
}

// ─── Particle nebula ──────────────────────────────────────────────────────────
function Nebula({ count = 850, radius = 5.5, color = '#F0BA30', opacity = 0.65, size = 0.026 }: {
  count?: number; radius?: number; color?: string; opacity?: number; size?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // flattened spiral disc with vertical scatter
      const arm = Math.random() * Math.PI * 2;
      const dist = 1.8 + Math.pow(Math.random(), 0.65) * radius;
      const swirl = dist * 0.55;
      pos[i * 3] = Math.cos(arm + swirl) * dist;
      pos[i * 3 + 1] = (Math.random() - 0.5) * (0.4 + dist * 0.22);
      pos[i * 3 + 2] = Math.sin(arm + swirl) * dist - 1.2;
    }
    return pos;
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.00045;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.06;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Orbit ring ───────────────────────────────────────────────────────────────
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += 0.0025;
    ringRef.current.rotation.x = Math.PI / 2.6 + Math.sin(state.clock.elapsedTime * 0.22) * 0.09;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.9, 0.015, 16, 120]} />
      <meshBasicMaterial color="#D4A017" transparent opacity={0.3} />
    </mesh>
  );
}

// ─── Pointer parallax + camera drift ─────────────────────────────────────────
function ParallaxRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  usePointerTracking();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (pointer.x * 0.22 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-pointer.y * 0.14 - groupRef.current.rotation.x) * 0.04;
  });

  return <group ref={groupRef}>{children}</group>;
}

function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.35;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.09) * 0.25;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function HeroScene() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  if (reducedMotion) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div
          style={{
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,160,23,0.22) 0%, transparent 70%)',
            border: '1px solid rgba(212,160,23,0.25)',
          }}
        />
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0.4, 6.5], fov: 48 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[6, 5, 5]} intensity={1.4} color="#F0BA30" />
      <pointLight position={[-6, -4, -3]} intensity={0.5} color="#3B82F6" />
      <directionalLight position={[0, 10, 2]} intensity={0.25} color="#ffffff" />

      <Stars radius={90} depth={55} count={900} factor={2.2} saturation={0} fade speed={0.4} />

      <ParallaxRig>
        <Nebula count={850} color="#F0BA30" />
        <Nebula count={300} color="#8FB4FF" opacity={0.35} size={0.02} radius={6.5} />
        <OrbitRing />
        <ForgeCore />
      </ParallaxRig>

      <CameraRig />
    </Canvas>
  );
}
