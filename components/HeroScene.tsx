'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

// ─── Floating Icosahedron (main centerpiece) ──────────────────────────────────
function GoldIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    meshRef.current.rotation.y += 0.004;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#D4A017"
          metalness={0.85}
          roughness={0.15}
          wireframe={false}
          emissive="#8B6A00"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial color="#F0BA30" wireframe opacity={0.15} transparent />
      </mesh>
    </Float>
  );
}

// ─── Orbiting particles ────────────────────────────────────────────────────────
function GoldParticles({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 2.5;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 0.04 + 0.01;
    }
    return [pos, sz];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0015;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color="#F0BA30"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Outer ring ────────────────────────────────────────────────────────────────
function OrbitRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z += 0.003;
    ringRef.current.rotation.x = Math.PI / 2.8 + Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <torusGeometry args={[2.6, 0.02, 16, 100]} />
      <meshBasicMaterial color="#D4A017" transparent opacity={0.25} />
    </mesh>
  );
}

// ─── Camera drift ─────────────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.4;
    camera.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.3;
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
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,160,23,0.25) 0%, transparent 70%)',
            border: '1px solid rgba(212,160,23,0.3)',
          }}
        />
      </div>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#F0BA30" />
      <pointLight position={[-5, -5, -3]} intensity={0.5} color="#3B82F6" />
      <directionalLight position={[0, 10, 0]} intensity={0.3} color="#ffffff" />

      <Stars radius={80} depth={50} count={600} factor={2} saturation={0} fade speed={0.5} />
      <GoldParticles count={100} />
      <OrbitRing />
      <GoldIcosahedron />
      <CameraRig />
    </Canvas>
  );
}
