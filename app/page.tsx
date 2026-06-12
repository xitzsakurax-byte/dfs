'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Immersive 3D Forge Scene — the visually captivating centerpiece
// A premium 3D "book of cases" the user can explore and strike. Pure 3D model action + GSAP polish.
function ForgeScene({ onStrike }: { onStrike: (caseName: string) => void }) {
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();
  const targetRot = useRef({ x: 0, y: 0.2 });

  useFrame((state) => {
    if (!groupRef.current) return;
    targetRot.current.x = mouse.y * -0.9;
    targetRot.current.y = mouse.x * 1.6 + state.clock.elapsedTime * 0.15;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.current.x, 0.085);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.current.y, 0.085);
  });

  const cases = [
    { name: 'NOMINATIV', color: '#EDEEF2', pos: [-5.2, 2.2, 0] as [number,number,number] },
    { name: 'AKKUSATIV', color: '#C24A3A', pos: [5.2, 2.2, 0] as [number,number,number] },
    { name: 'DATIV', color: '#B76E3E', pos: [-5.2, -2.2, 0] as [number,number,number] },
    { name: 'GENITIV', color: '#8B1E3D', pos: [5.2, -2.2, 0] as [number,number,number] },
  ];

  const strike = (name: string, mesh: THREE.Object3D) => {
    gsap.to(mesh.scale, { x: 1.75, y: 1.75, z: 1.75, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.in' });
    gsap.to(mesh.position, { y: mesh.position.y + 0.45, duration: 0.18, yoyo: true, repeat: 1 });
    onStrike(name);
  };

  return (
    <group ref={groupRef}>
      {/* The central premium book — the "forge" metaphor in 3D */}
      <group>
        <mesh>
          <boxGeometry args={[3.6, 4.8, 0.85]} />
          <meshPhongMaterial color="#171A21" shininess={55} specular="#8B1E3D" />
        </mesh>
        <mesh position={[-1.85, 0, 0]}>
          <boxGeometry args={[0.2, 4.65, 0.9]} />
          <meshPhongMaterial color="#B76E3E" shininess={90} />
        </mesh>
        <Text position={[0, 1.1, 0.5]} fontSize={0.72} color="#EDEEF2" anchorX="center">FORGE</Text>
        <Text position={[0, 0.2, 0.5]} fontSize={0.38} color="#8B1E3D" anchorX="center">B1-C1</Text>
      </group>

      {/* The four interactive case labels — the word form structure the user asked for, made physical and striking */}
      {cases.map((c, i) => (
        <group key={i} position={c.pos}>
          <mesh
            onClick={(e) => strike(c.name, e.object)}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'default'}
          >
            <planeGeometry args={[3.8, 1.35]} />
            <meshBasicMaterial color="#0F1116" transparent opacity={0.92} />
          </mesh>
          <Text
            position={[0, 0, 0.12]}
            fontSize={0.48}
            color={c.color}
            anchorX="center"
            onClick={(e) => {
              strike(c.name, e.object);
            }}
          >
            {c.name}
          </Text>
        </group>
      ))}

      <ambientLight intensity={0.65} />
      <pointLight position={[-12, 9, -8]} color="#8B1E3D" intensity={1.4} />
      <pointLight position={[11, -7, 9]} color="#B76E3E" intensity={0.9} />
    </group>
  );
}

// The game — pure delightful 3D model action + interaction
// Fully functional: real case items, validation on click, no-repeat after correct (session), score only on right strike.
function CaseForgeGame() {
  type CaseItem = { display: string; correct: string; hint: string };

  const allItems: CaseItem[] = [
    { display: "Ich sehe ___ (der Freund).", correct: "AKKUSATIV", hint: "direct object / direction" },
    { display: "Das ist ___ (die Prüfung).", correct: "NOMINATIV", hint: "subject / identification" },
    { display: "Ich gehe ___ (der Park).", correct: "AKKUSATIV", hint: "movement toward (in + acc)" },
    { display: "Ich helfe ___ (der Kollege).", correct: "DATIV", hint: "indirect object (helfen + dat)" },
    { display: "Die Farbe ___ (das Auto) ist blau.", correct: "GENITIV", hint: "possession" },
    { display: "Wir sprechen ___ (der Lehrer).", correct: "AKKUSATIV", hint: "about someone (über + acc)" },
    { display: "Das Buch ___ (die Studentin) liegt hier.", correct: "GENITIV", hint: "belonging to" },
    { display: "Er antwortet ___ (die Frage).", correct: "DATIV", hint: "respond to (antworten + dat)" },
  ];

  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('Click FORGE to birth a real exam-style case orb. Click the matching platform.');
  const [current, setCurrent] = useState<CaseItem | null>(null);
  const [remaining, setRemaining] = useState<CaseItem[]>([...allItems]);
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);

  const cases = ['NOMINATIV', 'AKKUSATIV', 'DATIV', 'GENITIV'];

  function pickNext(newRem: CaseItem[]) {
    if (newRem.length === 0) {
      setCurrent(null);
      setStatus('Session complete for these items. Click FORGE to restart the set.');
      setRemaining([...allItems]);
      return;
    }
    const idx = Math.floor(Math.random() * newRem.length);
    const next = newRem[idx];
    setCurrent(next);
    setStatus(`Forged: ${next.display}  —  Choose the correct case.`);
    setLastResult(null);
  }

  const forge = () => {
    if (current && lastResult !== 'correct') {
      setStatus(`Still working on: ${current.display}`);
      return;
    }
    // fresh or after correct: pick from remaining
    let pool = remaining;
    if (pool.length === 0) pool = [...allItems];
    pickNext(pool);
  };

  const sendToCase = (caseName: string) => {
    if (!current) {
      setStatus('Forge a word orb first.');
      return;
    }
    const isCorrect = caseName === current.correct;
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);
      setLastResult('correct');
      setStatus(`Perfect strike — ${caseName} is correct. +1 mastery. ${current.hint}.`);

      // Remove from remaining (no repeat after correct, per requirement)
      const newRem = remaining.filter(it => it !== current);
      setRemaining(newRem);

      setTimeout(() => {
        pickNext(newRem);
      }, 1250);
    } else {
      setLastResult('wrong');
      setStatus(`Not ${caseName}. The correct case here is ${current.correct}. Try again or forge another.`);
      // keep current so user can correct themselves; no auto advance on wrong
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrent(null);
    setRemaining([...allItems]);
    setLastResult(null);
    setStatus('Click FORGE to birth a real exam-style case orb. Click the matching platform.');
  };

  return (
    <div className="relative h-[340px] sm:h-[400px] md:h-[440px] w-full rounded-3xl overflow-hidden border border-[#2C303A] bg-[#0A0C12]">
      <Canvas camera={{ position: [0, 1.2, 11], fov: 50 }} className="interactive-3d">
        <ambientLight intensity={0.7} />
        <pointLight position={[6, 9, 4]} color="#B76E3E" intensity={1.3} />

        {cases.map((c, i) => (
          <group key={i} position={[(i - 1.5) * 3.6, -1.8, 0]}>
            <mesh onClick={() => sendToCase(c)} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'default'}>
              <cylinderGeometry args={[1.2, 1.45, 0.65, 6]} />
              <meshPhongMaterial color={i % 2 === 0 ? '#8B1E3D' : '#B76E3E'} shininess={30} />
            </mesh>
            <Text position={[0, 1.05, 0]} fontSize={0.38} color="#EDEEF2" anchorX="center">{c}</Text>
          </group>
        ))}
      </Canvas>

      <div className="absolute inset-0 p-4 sm:p-8 flex flex-col justify-between pointer-events-none">
        <div>
          <div className="text-[10px] sm:text-xs tracking-[2.5px] text-[#8B1E3D]">CASE FORGE • LIVE 3D GAME</div>
          <div className="text-[20px] sm:text-[26px] leading-none font-semibold tracking-[-0.6px] mt-1">Strike the right case.<br />Feel the structure land.</div>
        </div>

        <div className="bg-[#171A21]/95 border border-[#2C303A] rounded-2xl px-4 py-3 sm:px-6 sm:py-4 max-w-full sm:max-w-[380px] pointer-events-auto">
          <div className="text-xs sm:text-sm text-[#C5CAD6] min-h-[36px]">{status}</div>

          {current && (
            <div className="mt-1 text-[10px] sm:text-xs text-[#F4C430] font-mono tracking-widest">
              CURRENT: {current.display}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3">
            <button onClick={forge} className="text-xs sm:text-sm border border-[#8B1E3D] px-5 py-3 sm:py-2 rounded-full hover:bg-[#8B1E3D] hover:text-white active:scale-[0.985] transition-all min-h-[44px]">
              FORGE A NEW WORD ORB
            </button>
            <button onClick={resetGame} className="text-xs sm:text-sm border border-[#2C303A] px-4 py-3 sm:py-2 rounded-full hover:border-[#8B1E3D] transition-all min-h-[44px]">
              RESET SET
            </button>
          </div>

          <div className="mt-2 text-[10px] text-[#8F95A3]">Score: {score} • Tap platforms • No repeats after correct</div>
          <div className="sm:hidden mt-1 text-[10px] text-[#F4C430]">Phone mode: big taps, real cases.</div>
        </div>
      </div>
    </div>
  );
}

export default function GermanForgeAwwwardsLanding() {
  const [struckCase, setStruckCase] = useState<string | null>(null);

  // Awwwards-grade GSAP scroll storytelling + entrance
  useEffect(() => {
    gsap.fromTo('.hero-text', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 1.15, ease: 'power3.out', stagger: 0.06 });
    
    gsap.utils.toArray('.narrative').forEach((el: any) => {
      gsap.fromTo(el, { y: 55, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' },
      });
    });
  }, []);

  const handleStrike = (name: string) => {
    setStruckCase(name);
    setTimeout(() => setStruckCase(null), 1550);
  };

  return (
    <div className="min-h-screen bg-[#0F1116] text-[#EDEEF2] overflow-x-hidden selection:bg-[#8B1E3D] selection:text-white">
      {/* Premium nav — separate desktop vs mobile phone treatment */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 bg-[#0F1116]/90 backdrop-blur-2xl border-b border-[#2C303A]">
        <div className="flex items-center gap-3">
          <div className="logo-mark w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-[#8B1E3D] flex items-center justify-center text-white text-[15px] sm:text-[17px] font-semibold tracking-[-0.5px]">GF</div>
          <div className="font-semibold tracking-[-0.3px] text-[15px] sm:text-[17px]">GermanForge</div>
        </div>

        {/* Desktop nav (rich, horizontal) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#forge" className="hover:text-[#8B1E3D] transition-colors">The 3D Forge</a>
          <a href="#fable" className="hover:text-[#8B1E3D] transition-colors">FABLE 5</a>
          <a href="#game" className="hover:text-[#8B1E3D] transition-colors">Play the Game</a>
          <Link href="/dashboard" className="btn-primary px-6 py-2 text-sm">Enter Training</Link>
        </div>

        {/* Mobile phone nav — compact + hamburger for separate phone UI */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/dashboard" className="btn-primary px-4 py-1.5 text-xs rounded-full">Enter</Link>
          <button
            onClick={() => {
              const menu = document.getElementById('mobile-menu-landing');
              if (menu) menu.classList.toggle('hidden');
            }}
            className="px-3 py-1.5 text-sm border border-[#2C303A] rounded-lg active:bg-[#171A21]"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Mobile phone menu (separate, full overlay style for phones) */}
      <div id="mobile-menu-landing" className="hidden md:hidden fixed inset-0 z-[60] bg-[#0F1116]/95 pt-20 px-6" onClick={(e) => {
        if ((e.target as HTMLElement).id === 'mobile-menu-landing') (e.currentTarget as HTMLDivElement).classList.add('hidden');
      }}>
        <div className="space-y-6 text-lg">
          <a href="#forge" className="block py-2 border-b border-[#2C303A]" onClick={() => document.getElementById('mobile-menu-landing')?.classList.add('hidden')}>The 3D Forge</a>
          <a href="#fable" className="block py-2 border-b border-[#2C303A]" onClick={() => document.getElementById('mobile-menu-landing')?.classList.add('hidden')}>FABLE 5</a>
          <a href="#game" className="block py-2 border-b border-[#2C303A]" onClick={() => document.getElementById('mobile-menu-landing')?.classList.add('hidden')}>Play the Game</a>
          <Link href="/dashboard" className="block py-3 text-[#F4C430]">Enter Training →</Link>
          <Link href="/login" className="block py-2 text-sm text-[#8F95A3]">Sign in / Profile</Link>
          <Link href="/practice" className="block py-2 text-sm text-[#8F95A3]">All Practice</Link>
        </div>
      </div>

      {/* HERO — Separate desktop (wide + rich 3D) vs mobile phone UI (compact, stacked, thumb friendly) */}
      <div id="forge" className="relative min-h-[100dvh] flex items-center pt-14 sm:pt-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:grid lg:grid-cols-12 gap-x-8 items-center relative z-10">
          {/* Text content — full width on phone, left on desktop */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 hero-text pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[2px] text-[#8B1E3D] font-medium border border-[#8B1E3D]/30 px-3 py-1 rounded-full">
              GOETHE-INSTITUT ALIGNED • TELC CERTIFIED
            </div>

            <h1 className="award-heading text-[52px] sm:text-[62px] lg:text-[82px] leading-[0.92] font-semibold tracking-[-3px] lg:tracking-[-3.4px]">
              Forge your<br /> mastery.<br />
              <span className="text-[#8B1E3D]">Own the exam.</span>
            </h1>

            <p className="max-w-[38ch] text-[15px] sm:text-[17px] text-[#C5CAD6] leading-tight">
              An immersive space where every interaction teaches real TELC &amp; Goethe B1-C1 German. 
              3D cases you can strike. Games that actually help. Progress that feels earned.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a href="#game" className="btn-primary px-7 py-3.5 text-base tracking-[-0.2px] text-center">Play the Case Forge</a>
              <a href="#fable" className="btn-ghost px-7 py-3.5 text-base border-[#2C303A] hover:border-[#8B1E3D] text-center">See the FABLE 5</a>
            </div>
            <div className="text-xs text-[#8F95A3] pt-2">Guest • Anh Kiet • No sign-up. Just craft.</div>
          </div>

          {/* 3D — prominent but much smaller and touch-optimized on phones; rich mouse experience on desktop */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] lg:h-[620px] mt-8 lg:mt-0 w-full">
            <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[#2C303A] bg-[#0A0C12]">
              <Canvas camera={{ position: [0, 0, 14], fov: 42 }} className="interactive-3d" style={{ background: 'transparent' }}>
                <ForgeScene onStrike={handleStrike} />
              </Canvas>

              {/* Desktop hint vs mobile hint */}
              <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-20 pointer-events-none">
                <div className="max-w-[260px] bg-[#171A21]/95 backdrop-blur-md border border-[#2C303A] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm">
                  {struckCase ? (
                    <div>You just struck <span className="text-[#8B1E3D] font-medium">{struckCase}</span>. That feeling? That’s the structure living in your body now.</div>
                  ) : (
                    <div className="hidden sm:block">Move your mouse. Click a case to forge it. Feel what happens when the structure becomes physical.</div>
                  )}
                  <div className="sm:hidden">Tap the cases. Touch to strike. Built for phone practice.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FABLE 5 — human, flowing. On phones: tighter, more vertical for separate mobile reading experience */}
      <div id="fable" className="narrative container max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-20 border-b border-[#2C303A]">
        <div className="max-w-2xl mb-12">
          <div className="uppercase text-xs tracking-[2.5px] text-[#8B1E3D] mb-2">THE FABLE 5</div>
          <h2 className="text-[42px] leading-[1.05] font-semibold tracking-[-1.6px]">Five quiet truths.<br />One clear path.</h2>
          <p className="text-[#C5CAD6] text-lg">We didn’t invent a new methodology. We just paid ruthless attention to what actually works when the clock is running and the examiner is waiting.</p>
        </div>

        <div className="space-y-9 text-[17px] max-w-[58ch]">
          {[
            ["FOCUS", "We ruthlessly cut everything that isn’t on the actual paper."],
            ["AUTHENTICITY", "Every sentence, every task, every piece of feedback is modeled on real recent exams."],
            ["THE BANK", "The 3000+ word engine is the unfair advantage most candidates never give themselves."],
            ["LOGIC AS INSTINCT", "Cases aren’t rules you memorize. They’re decisions your body learns to make in context."],
            ["ENDURANCE", "The exam is long. Your preparation should train the exact muscle that keeps going when you’re tired."],
          ].map(([title, desc], i) => (
            <div key={i} className="flex gap-8 items-start border-l-2 border-[#8B1E3D]/30 pl-6">
              <div className="font-mono text-sm text-[#8B1E3D] w-12 pt-1 tracking-widest">{String(i+1).padStart(2,'0')}</div>
              <div>
                <div className="font-semibold tracking-tight text-xl mb-1.5 text-[#EDEEF2]">{title}</div>
                <div className="text-[#C5CAD6] leading-snug">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* THE GAME — on desktop: spacious narrative. On phones: compact vertical separate phone UI */}
      <div id="game" className="narrative relative py-10 sm:py-16 bg-[#0A0C12] border-b border-[#2C303A]">
        <div className="container max-w-6xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-10 items-end mb-8 sm:mb-10">
            <div>
              <div className="text-xs text-[#8B1E3D] tracking-[1.5px]">PLAY TO REMEMBER</div>
              <h3 className="text-[36px] font-semibold tracking-[-1.2px] mt-2">Case Forge</h3>
            </div>
            <p className="max-w-sm text-[#C5CAD6] text-[15px]">A tiny, beautiful 3D game. Click the forge to birth a word orb. Send it to the correct case platform. Your brain will thank you on exam day.</p>
          </div>

          {/* The game container itself is adjusted inside for phone vs desktop */}
          <CaseForgeGame />
        </div>
      </div>

      {/* Final strong, human CTA */}
      <div className="container max-w-4xl mx-auto px-8 py-20 text-center">
        <div className="text-xs tracking-[2px] text-[#8B1E3D] mb-2">THE ONLY THING LEFT</div>
        <h3 className="text-[42px] leading-none font-semibold tracking-[-1.6px] mb-6">Stop collecting resources.<br />Start forging the skill.</h3>
        <Link href="/dashboard" className="btn-primary inline-block text-lg px-10 py-4 mt-2">Enter GermanForge</Link>
        <div className="text-xs text-[#8F95A3] mt-4">Goethe-Institut standards. No shortcuts. Just the work that works.</div>
      </div>
    </div>
  );
}
