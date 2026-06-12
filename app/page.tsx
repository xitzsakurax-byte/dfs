'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import ScrollLine from '@/components/ScrollLine';

// Three.js hero — dynamic import with ssr:false required for R3F in Next.js 16
const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
  loading: () => null,
});

gsap.registerPlugin(ScrollTrigger);

/* ── Split text into masked lines of animated chars ──────────────────────── */
function SplitChars({ text, className }: { text: string; className?: string }) {
  return (
    <span className={`line-mask ${className ?? ''}`} aria-label={text}>
      {text.split('').map((c, i) => (
        <span key={i} className="char hero-char" aria-hidden>
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </span>
  );
}

const MARQUEE_WORDS = [
  'Wortschatz', 'Grammatik', 'Hörverstehen', 'Schreiben', 'Leseverstehen',
  'Sprechen', 'Konjunktiv', 'Präzision', 'Ausdauer', 'Prüfungstag',
];

const MODULES = [
  {
    num: '01', title: 'Exam Vocabulary', href: '/practice/vocab', meta: 'B1–C1 · SRS',
    desc: 'Curated B1–C1 terms with example sentences. Wrong answers feed the spaced-repetition queue.',
  },
  {
    num: '02', title: 'Grammar Structures', href: '/practice/grammar', meta: 'Konjunktiv · Passiv',
    desc: 'The structures TELC & Goethe actually test — Konjunktiv II, passive, relative clauses.',
  },
  {
    num: '03', title: 'Writing Practice', href: '/practice/writing', meta: 'TELC & Goethe formats',
    desc: 'Authentic email and report tasks with instant heuristic scoring aligned to official criteria.',
  },
  {
    num: '04', title: 'Cases & Declensions', href: '/practice/declensions', meta: 'N · A · D · G',
    desc: 'Nominativ to Genitiv in real exam sentences, with full case explanations on every answer.',
  },
  {
    num: '05', title: 'Official Bank Drill', href: '/practice/bank', meta: '3,078 words',
    desc: 'The official Goethe B1 Wortliste as a mastery drill — no repeats once a word is yours.',
  },
  {
    num: '06', title: 'Interactive Game', href: '/practice/game', meta: '3 modes · combo XP',
    desc: 'Write forms, fix errors, pop quiz. Combo multipliers up to 3× XP on hot streaks.',
  },
];

const C1_SHELF = [
  { title: 'Prüfungstraining Goethe C1', tag: '2024 format' },
  { title: 'Mit Erfolg zum Goethe C1', tag: 'Testbuch' },
  { title: 'Sicher! C1', tag: 'Kursbuch' },
  { title: 'Werkstatt C1', tag: 'Wortliste' },
  { title: 'Goethe C1 Übungssatz', tag: 'Official' },
  { title: 'TestDaF Training', tag: 'Academic' },
];

export default function GermanForgeLanding() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [ready, setReady] = useState(false);
  const [showScene, setShowScene] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const gamifyRef = useRef<HTMLElement>(null);

  /* Preloader gate — skip the count on repeat visits this session */
  useEffect(() => {
    if (sessionStorage.getItem('gf_preloaded')) {
      setShowPreloader(false);
      setReady(true);
    } else {
      sessionStorage.setItem('gf_preloaded', '1');
    }
  }, []);

  /* Render the 3D scene only on desktop-sized, motion-friendly screens */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.innerWidth >= 1024;
    setShowScene(wide && !reduced);
  }, []);

  /* Hide hero elements before the entrance plays (preloader covers this) */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    gsap.set('.hero-char', { yPercent: 120 });
    gsap.set('.hero-fade', { y: 28, opacity: 0 });
  }, []);

  /* Entrance timeline once the preloader is gone */
  useEffect(() => {
    if (!ready) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const tl = gsap.timeline();
    tl.to('.hero-char', {
      yPercent: 0,
      duration: 1.0,
      stagger: 0.022,
      ease: 'power4.out',
    });
    tl.to('.hero-fade', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.09,
      ease: 'power3.out',
    }, '-=0.55');

    return () => { tl.kill(); };
  }, [ready]);

  /* Scroll-driven animations */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // top progress hairline
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
      });

      // hero copy drifts up + fades as you leave
      gsap.to('.hero-stage', {
        yPercent: -10,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // generic reveals
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 44,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%' },
        });
      });

      // module rows cascade
      gsap.from('.module-row', {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.module-list', start: 'top 80%' },
      });

      // stat counters
      gsap.utils.toArray<HTMLElement>('.count-num').forEach((el) => {
        const target = parseFloat(el.dataset.target || '0');
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toLocaleString('en-US');
          },
        });
      });

      // gamification live panel
      const demoTl = gsap.timeline({
        scrollTrigger: { trigger: gamifyRef.current, start: 'top 65%' },
      });
      demoTl
        .fromTo('.demo-xp-fill', { width: '6%' }, { width: '78%', duration: 1.3, ease: 'power3.inOut' })
        .from('.demo-quest', { x: -18, opacity: 0, stagger: 0.16, duration: 0.5, ease: 'power2.out' }, '-=0.7')
        .from('.demo-combo', { scale: 0.4, opacity: 0, duration: 0.5, ease: 'back.out(2.2)' }, '-=0.3');

      // book spines rise
      gsap.from('.shelf-book', {
        y: 60,
        opacity: 0,
        rotate: 2,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.shelf-row', start: 'top 85%' },
      });
    }, mainRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={mainRef}
      className="min-h-screen text-[var(--text)] overflow-x-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {showPreloader && <Preloader onDone={() => { setShowPreloader(false); setReady(true); }} />}
      <Cursor />

      {/* top scroll progress hairline */}
      <div
        className="scroll-progress fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
        style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-warm))', transform: 'scaleX(0)' }}
      />

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="logo-mark w-9 h-9 flex items-center justify-center text-[15px]">GF</div>
            <span className="font-semibold tracking-tight text-[15px] sm:text-base">GermanForge</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#modules" className="nav-link" style={{ color: 'var(--text-2)' }}>Modules</a>
            <Link href="/exams" className="nav-link" style={{ color: 'var(--text-2)' }}>Exams</Link>
            <Link href="/resources" className="nav-link" style={{ color: 'var(--text-2)' }}>Resources</Link>
            <Link href="/dashboard" className="btn-primary px-5 py-2 text-sm inline-block">
              Enter Training
            </Link>
          </div>
          <div className="md:hidden">
            <Link href="/dashboard" className="btn-primary px-5 py-2 text-sm">Start</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        {/* full-bleed 3D background */}
        <div className="absolute inset-0">
          {showScene ? (
            <HeroScene />
          ) : (
            <div className="absolute inset-0 texture-bg">
              <div className="orb-gold" style={{ width: 560, height: 560, top: '-12%', right: '-10%', opacity: 0.7 }} />
              <div className="orb-blue" style={{ width: 420, height: 420, bottom: '-8%', left: '-12%' }} />
              <div className="orb-gold" style={{ width: 300, height: 300, bottom: '18%', right: '22%', opacity: 0.35 }} />
            </div>
          )}
        </div>
        {/* vignette so copy stays readable over the scene */}
        <div className="absolute inset-0 hero-vignette pointer-events-none" />

        <div className="hero-stage relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center pt-24 pb-20">
          <div className="hero-fade inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.3)', color: 'var(--gold)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse inline-block" />
            Goethe-Zertifikat &amp; TELC · B1–C1
          </div>

          <h1 className="display-hero mb-2">
            <SplitChars text="Forge your" />
            <span className="line-mask">
              <span className="char hero-char serif-accent gradient-text" style={{ fontWeight: 600 }} aria-hidden>
                German.
              </span>
            </span>
          </h1>

          <p className="hero-fade mx-auto mt-6 text-base sm:text-lg max-w-[46ch] leading-relaxed" style={{ color: 'var(--text-2)' }}>
            Serious B1–C1 preparation for TELC &amp; Goethe-Zertifikat — the official
            3,078-word bank, authentic task formats, and gamified daily training.
          </p>

          <div className="hero-fade mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="btn-hero px-9 py-4 text-base inline-block" data-cursor>
              Start Training Free
            </Link>
            <Link href="/exams" className="btn-ghost px-8 py-4 text-base inline-block" data-cursor>
              View Exam Info
            </Link>
          </div>

          <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-2.5">
            {['B1', 'B2', 'C1'].map((level) => (
              <span key={level} className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide"
                style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)', color: 'var(--gold)' }}>
                {level}
              </span>
            ))}
            <span className="px-3 py-1 rounded-lg text-xs font-medium tracking-wide"
              style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--muted)' }}>
              No sign-up · saves locally
            </span>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[11px] tracking-[0.18em] uppercase z-10" style={{ color: 'var(--muted)' }}>
          <span>Scroll</span>
          <div className="w-px h-9 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* ── MARQUEE ─────────────────────────────────────────────────────── */}
      <div className="marquee py-7" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}>
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <React.Fragment key={i}>
              <span className={`marquee-item ${i % 3 === 1 ? 'solid' : ''}`}>{w}</span>
              <span className="marquee-dot" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ════ Everything below shares the scroll-drawn gold line ════ */}
      <div className="relative">
        <ScrollLine />

        {/* ── MODULES (editorial rows) ──────────────────────────────────── */}
        <section id="modules" className="relative z-10 py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="mb-14 sm:mb-20" data-reveal>
              <div className="eyebrow eyebrow-rule mb-4">The training floor</div>
              <h2 className="display-xl max-w-[16ch]">
                Six disciplines.{' '}
                <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>One forge.</span>
              </h2>
            </div>

            <div className="module-list">
              {MODULES.map((m) => (
                <Link key={m.num} href={m.href} className="module-row group" data-cursor>
                  <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[80px_1fr_auto] items-baseline sm:items-center gap-x-5 sm:gap-x-8 gap-y-2 py-7 sm:py-9 px-2 sm:px-4">
                    <span className="module-num text-xl sm:text-3xl">{m.num}</span>
                    <div>
                      <div className="module-title text-2xl sm:text-4xl font-extrabold tracking-tight">
                        {m.title}
                      </div>
                      <p className="mt-1.5 text-sm sm:text-[15px] max-w-[58ch] leading-relaxed" style={{ color: 'var(--text-2)' }}>
                        {m.desc}
                      </p>
                    </div>
                    <div className="col-start-2 sm:col-start-3 flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                      <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>
                        {m.meta}
                      </span>
                      <span className="module-arrow text-2xl" style={{ color: 'var(--gold-bright)' }}>→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS BAND ───────────────────────────────────────────────── */}
        <section className="relative z-10 py-20 sm:py-24" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 text-center">
              {[
                { target: 3078, label: 'Official exam words', suffix: '' },
                { target: 14, label: 'Achievements to unlock', suffix: '' },
                { target: 6, label: 'Training modules', suffix: '' },
                { target: 3, label: 'Max XP multiplier', suffix: '×' },
              ].map((s, i) => (
                <div key={i} data-reveal>
                  <div className="font-black tracking-tight" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', lineHeight: 1 }}>
                    <span className="count-num gradient-text" data-target={s.target}>0</span>
                    <span className="gradient-text">{s.suffix}</span>
                  </div>
                  <div className="mt-2.5 text-[13px] font-medium tracking-wide" style={{ color: 'var(--text-2)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GAMIFICATION ─────────────────────────────────────────────── */}
        <section ref={gamifyRef} className="relative z-10 py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <div data-reveal>
              <div className="eyebrow eyebrow-rule mb-4">Gamification</div>
              <h2 className="display-xl mb-6">
                Progress that{' '}
                <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>compounds.</span>
              </h2>
              <p className="text-lg leading-relaxed mb-9 max-w-[46ch]" style={{ color: 'var(--text-2)' }}>
                XP, streaks, achievements, daily quests, combo multipliers — every
                mechanic is wired to real exam content. Consistency is the only cheat code.
              </p>
              <div className="space-y-5">
                {[
                  { icon: '🔥', label: 'Daily streaks', desc: 'Tracked on Vietnam time, every single day' },
                  { icon: '⚡', label: 'Combo multiplier', desc: 'Chain correct answers for up to 3× XP' },
                  { icon: '🏆', label: '14 achievements', desc: 'From first word to total bank mastery' },
                  { icon: '🔁', label: 'SM-2 spaced repetition', desc: 'Misses come back right before you forget them' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <div className="font-bold">{item.label}</div>
                      <div className="text-sm" style={{ color: 'var(--text-2)' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* live demo panel */}
            <div className="forge-panel forge-panel-glow p-7 sm:p-9" data-reveal>
              <div className="flex items-center justify-between mb-7">
                <div>
                  <div className="text-xs font-semibold tracking-wide" style={{ color: 'var(--muted)' }}>Level 7 · Geselle</div>
                  <div className="text-2xl font-black tracking-tight mt-0.5">3,420 XP</div>
                </div>
                <span className="demo-combo combo-badge text-sm px-3.5 py-1.5">⚡ 3× combo</span>
              </div>

              <div className="xp-bar-track shimmer mb-1.5" style={{ height: 8 }}>
                <div className="demo-xp-fill xp-bar" style={{ width: '6%', height: '100%' }} />
              </div>
              <div className="flex justify-between text-[11px] mb-8" style={{ color: 'var(--muted)' }}>
                <span>Level 7</span>
                <span>390 XP to Level 8</span>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Master 10 bank words', done: true, xp: 40 },
                  { title: 'Score 90% on a grammar set', done: true, xp: 60 },
                  { title: 'Finish a writing task', done: false, xp: 80 },
                ].map((q, i) => (
                  <div key={i} className="demo-quest flex items-center gap-3.5 rounded-xl px-4 py-3.5"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black flex-shrink-0"
                      style={q.done
                        ? { background: 'linear-gradient(135deg, var(--gold), var(--gold-warm))', color: '#07090F' }
                        : { border: '1.5px solid var(--line-2)', color: 'var(--muted)' }}
                    >
                      {q.done ? '✓' : ''}
                    </span>
                    <span className="flex-1 text-sm font-medium" style={{ color: q.done ? 'var(--muted)' : 'var(--text)', textDecoration: q.done ? 'line-through' : 'none' }}>
                      {q.title}
                    </span>
                    <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>+{q.xp}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                <span className="streak-flame text-base">🔥</span>
                12-day streak — longest yet
              </div>
            </div>
          </div>
        </section>

        {/* ── C1 REFERENCE SHELF ───────────────────────────────────────── */}
        <section className="relative z-10 py-24 sm:py-28" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end mb-12" data-reveal>
              <div>
                <div className="eyebrow eyebrow-rule mb-4">Built on the real shelf</div>
                <h2 className="display-xl max-w-[18ch]">
                  Calibrated against the{' '}
                  <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>C1 canon.</span>
                </h2>
              </div>
              <p className="max-w-[40ch] text-[15px] leading-relaxed lg:text-right" style={{ color: 'var(--text-2)' }}>
                Exam structures, timing, vocabulary levels and task formats are
                cross-checked against the standard German exam library — including the
                official 2024 Goethe C1 format.
              </p>
            </div>

            {/* stylised book spines */}
            <div className="shelf-row flex items-end gap-2.5 sm:gap-3.5 overflow-x-auto pb-3" style={{ scrollbarWidth: 'none' }}>
              {C1_SHELF.map((book, i) => (
                <div
                  key={i}
                  className="shelf-book flex-shrink-0 rounded-t-lg px-3.5 sm:px-4 pt-5 pb-4 flex flex-col justify-between"
                  style={{
                    height: 170 + (i % 3) * 26,
                    width: 118,
                    background: i % 2 === 0
                      ? 'linear-gradient(170deg, var(--surface-3), var(--surface-2))'
                      : 'linear-gradient(170deg, rgba(212,160,23,0.16), var(--surface-2))',
                    border: '1px solid var(--line-2)',
                    borderBottom: '3px solid var(--gold-dim)',
                  }}
                >
                  <div className="text-[11px] font-bold leading-snug" style={{ color: 'var(--text-2)' }}>
                    {book.title}
                  </div>
                  <div className="text-[9px] font-semibold tracking-[0.14em] uppercase" style={{ color: 'var(--gold)' }}>
                    {book.tag}
                  </div>
                </div>
              ))}
              <div className="flex-shrink-0 self-stretch flex items-end pb-1 pl-3">
                <div className="text-xs leading-relaxed max-w-[20ch]" style={{ color: 'var(--muted)' }}>
                  Reference library only — every task in GermanForge is original.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXAMS TEASER ─────────────────────────────────────────────── */}
        <section className="relative z-10 py-24 sm:py-32">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-14" data-reveal>
              <div className="eyebrow mb-4">Know your target</div>
              <h2 className="display-xl">
                Two exams.{' '}
                <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>Zero surprises.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {[
                {
                  name: 'Goethe-Zertifikat',
                  levels: 'B1 · B2 · C1',
                  tag: 'Fully modular since 2024',
                  highlights: ['60/100 to pass each module', 'Modules can be taken separately', 'Certificate never expires'],
                  accent: 'rgba(212,160,23,0.09)',
                  border: 'rgba(212,160,23,0.28)',
                },
                {
                  name: 'telc Deutsch',
                  levels: 'B1 · B2 · C1',
                  tag: 'Citizenship & university',
                  highlights: ['≥60% written + oral to pass', 'Failed sections retakeable', 'C1 Hochschule for university entry'],
                  accent: 'rgba(59,130,246,0.07)',
                  border: 'rgba(59,130,246,0.22)',
                },
              ].map((exam, i) => (
                <div key={i} className="rounded-2xl p-7 sm:p-9 transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ background: exam.accent, border: `1px solid ${exam.border}` }}
                  data-reveal>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="font-black text-2xl sm:text-3xl tracking-tight">{exam.name}</div>
                      <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{exam.levels}</div>
                    </div>
                    <span className="text-[11px] px-3 py-1.5 rounded-full font-semibold flex-shrink-0"
                      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--gold)' }}>
                      {exam.tag}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {exam.highlights.map((h, j) => (
                      <li key={j} className="flex items-center gap-3 text-[15px]" style={{ color: 'var(--text-2)' }}>
                        <span style={{ color: 'var(--gold)' }}>✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center" data-reveal>
              <Link href="/exams" className="btn-ghost px-8 py-3.5 text-base inline-block" data-cursor>
                Full exam comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="relative z-10 py-28 sm:py-40 overflow-hidden">
          <div className="orb-gold" style={{ width: 700, height: 700, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.55 }} />
          <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center" data-reveal>
            <div className="inline-block px-5 py-1.5 text-[11px] tracking-[0.3em] uppercase font-semibold rounded-full mb-9"
              style={{ border: '1px solid rgba(212,160,23,0.3)', color: 'var(--gold)', background: 'rgba(212,160,23,0.06)' }}>
              No gimmicks — just the work that works
            </div>
            <h2 className="display-hero mb-7">
              Der Erfolg ist{' '}
              <span className="serif-accent gradient-text" style={{ fontWeight: 600 }}>kein Zufall.</span>
            </h2>
            <p className="text-lg mb-11 max-w-[42ch] mx-auto" style={{ color: 'var(--text-2)' }}>
              Success is no accident. Start now — no registration, no payment, no barriers.
            </p>
            <Link href="/dashboard" className="btn-hero text-lg px-12 py-5 inline-block" data-cursor>
              Enter GermanForge
            </Link>
            <p className="mt-6 text-xs" style={{ color: 'var(--muted)' }}>
              Everything stays on your device · For Anh Kiet · Vietnam time
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
