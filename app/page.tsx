'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Three.js hero — dynamic import with ssr:false required for R3F in Next.js 16
const HeroScene = dynamic(() => import('@/components/HeroScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="orb-gold" style={{ width: 240, height: 240, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
    </div>
  ),
});

gsap.registerPlugin(ScrollTrigger);

export default function GermanForgeLanding() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const examRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text stagger entrance
      gsap.from('.hero-line', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.1,
      });

      // Feature cards scroll reveal
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Steps
      gsap.from('.step-item', {
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 80%',
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      });

      // Exam section
      gsap.from('.exam-card', {
        scrollTrigger: {
          trigger: examRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
      });

      // CTA
      gsap.from('.cta-section', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
        },
        scale: 0.97,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div
      className="min-h-screen text-[var(--text)] overflow-x-hidden selection:bg-[var(--gold)] selection:text-black"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="logo-mark w-9 h-9 rounded-xl flex items-center justify-center text-[#0A0D14] text-[15px] font-black tracking-tight">
            GF
          </div>
          <span className="font-semibold tracking-tight text-[15px] sm:text-[16px]">GermanForge</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-2)]">
          <a href="#features" className="hover:text-[var(--gold)] transition-colors">Features</a>
          <Link href="/exams" className="hover:text-[var(--gold)] transition-colors">Exams</Link>
          <Link href="/resources" className="hover:text-[var(--gold)] transition-colors">Resources</Link>
          <Link
            href="/dashboard"
            className="btn-primary px-5 py-2 text-sm inline-block"
          >
            Enter Training
          </Link>
        </div>

        {/* Mobile CTA */}
        <div className="md:hidden">
          <Link href="/dashboard" className="btn-primary px-5 py-2 text-sm">Start</Link>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden texture-bg">
        {/* Background orbs */}
        <div className="orb-gold" style={{ width: 600, height: 600, top: '-100px', right: '-100px', opacity: 0.6 }} />
        <div className="orb-blue" style={{ width: 400, height: 400, bottom: '0', left: '-100px' }} />

        <div className="container max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="hero-line inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
              style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)', color: 'var(--gold)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse inline-block" />
              Goethe-Zertifikat &amp; TELC B1–C1
            </div>

            <h1 className="hero-line text-[52px] sm:text-[64px] lg:text-[72px] leading-[0.9] font-black tracking-[-3px] sm:tracking-[-4px] mb-6">
              Master real<br />
              <span className="gradient-text">German exams.</span>
            </h1>

            <p className="hero-line text-[16px] sm:text-[18px] text-[var(--text-2)] max-w-[42ch] mb-8 leading-relaxed">
              Premium B1–C1 preparation for TELC &amp; Goethe-Zertifikat.
              Authentic tasks, the official 3,000+ word bank, advanced gamification, and real exam data.
            </p>

            {/* CEFR badges */}
            <div className="hero-line flex flex-wrap gap-2.5 mb-10">
              {['B1', 'B2', 'C1'].map(level => (
                <span key={level} className="px-3 py-1 rounded-lg text-xs font-bold tracking-wide"
                  style={{
                    background: 'rgba(212,160,23,0.08)',
                    border: '1px solid rgba(212,160,23,0.2)',
                    color: 'var(--gold)',
                  }}>
                  {level}
                </span>
              ))}
              <span className="px-3 py-1 rounded-lg text-xs font-medium tracking-wide text-[var(--muted)]"
                style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                TELC &amp; Goethe
              </span>
            </div>

            <div className="hero-line flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="btn-primary px-8 py-4 text-base font-bold inline-block text-center"
              >
                Start Training Free
              </Link>
              <Link
                href="/exams"
                className="btn-ghost px-8 py-4 text-base inline-block text-center"
              >
                View Exam Info
              </Link>
            </div>

            <p className="hero-line mt-5 text-xs text-[var(--muted)]">
              All progress saved locally for Anh Kiet • No sign-up required
            </p>
          </div>

          {/* Right: 3D scene (hidden on mobile → show gradient instead) */}
          <div
            ref={heroRef}
            className="relative hidden lg:block"
            style={{ height: 500 }}
          >
            <HeroScene />
          </div>

          {/* Mobile: decorative orb instead of 3D */}
          <div className="lg:hidden flex justify-center">
            <div style={{
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212,160,23,0.2) 0%, transparent 70%)',
              border: '1px solid rgba(212,160,23,0.25)',
              boxShadow: '0 0 60px rgba(212,160,23,0.15)',
            }} />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--muted)] text-xs">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-[var(--gold)] to-transparent" />
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--surface)' }}
        className="py-4">
        <div className="container max-w-5xl mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
          {[
            { label: 'Goethe-Zertifikat aligned', dot: true },
            { label: 'TELC B1 certified alignment', dot: true },
            { label: '3,078 official exam words', dot: true },
            { label: 'SRS spaced repetition', dot: false },
          ].map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-[var(--muted)] hidden sm:inline">·</span>}
              <span className="text-[var(--text-2)]">{item.label}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── FEATURES ────────────────────────────────────────────────────────── */}
      <section id="features" ref={featuresRef} className="py-20 sm:py-28">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <div className="section-label mb-3">Everything you need</div>
            <h2 className="text-[36px] sm:text-[48px] font-black tracking-[-2px] mb-4">
              Focused exam training
            </h2>
            <p className="text-[var(--text-2)] max-w-[50ch] mx-auto text-lg">
              Six modules built around real TELC and Goethe exam formats, now with gamification, spaced repetition and skill tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                num: '01',
                title: 'Exam Vocabulary',
                desc: '3,000+ official Goethe B1 terms with example sentences. Spaced repetition queues words you struggle with.',
                link: '/practice/vocab',
              },
              {
                num: '02',
                title: 'Grammar Structures',
                desc: 'The exact structures tested on TELC & Goethe papers — Konjunktiv II, passive, relative clauses, with clear explanations.',
                link: '/practice/grammar',
              },
              {
                num: '03',
                title: 'Writing Practice',
                desc: 'Authentic email + report tasks scored against official criteria. Real exam formats for B1–C1.',
                link: '/practice/writing',
              },
              {
                num: '04',
                title: 'Word Forms & Cases',
                desc: 'Master Nominativ, Akkusativ, Dativ and Genitiv in real exam sentences with full case explanations.',
                link: '/practice/declensions',
              },
              {
                num: '05',
                title: 'Official Bank Drill',
                desc: '3,078-word mastery drill — no repeats after you get it right, prefers words you haven\'t seen.',
                link: '/practice/bank',
              },
              {
                num: '06',
                title: 'Interactive Game',
                desc: 'Three game modes: Write Forms, Fix the Error, Pop Quiz. Combo multipliers, real XP, SRS reviews.',
                link: '/practice/game',
              },
            ].map((f, i) => (
              <Link
                key={i}
                href={f.link}
                className="feature-card glass-card p-7 block group"
              >
                <div className="text-xs font-bold tracking-[3px] mb-4 text-[var(--gold)]">{f.num}</div>
                <div className="font-bold text-xl tracking-tight mb-3 group-hover:text-[var(--gold)] transition-colors">{f.title}</div>
                <div className="text-[15px] text-[var(--text-2)] leading-relaxed">{f.desc}</div>
                <div className="mt-5 text-sm font-semibold text-[var(--gold)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Start now →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GAMIFICATION ────────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="container max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="section-label mb-3">Gamification</div>
              <h2 className="text-[36px] sm:text-[44px] font-black tracking-[-2px] mb-5">
                Progress like<br />
                <span className="gradient-text">a game</span>
              </h2>
              <p className="text-[var(--text-2)] text-lg leading-relaxed mb-8">
                XP, levels, streaks, achievements, daily quests, combo multipliers — all tied to real exam content. Every correct answer counts.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '🔥', label: 'Daily Streaks', desc: 'Vietnam-time calendar tracks your consistency' },
                  { icon: '⚡', label: 'Combo Multiplier', desc: 'Chain correct answers for up to 3× XP' },
                  { icon: '🏆', label: '14 Achievements', desc: 'Unlock badges from first word to complete mastery' },
                  { icon: '🔄', label: 'Spaced Repetition', desc: 'SM-2 algorithm queues hard words for review' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <div className="font-semibold">{item.label}</div>
                      <div className="text-sm text-[var(--text-2)]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '3,078', label: 'Exam Words', sub: 'Official Goethe B1 Wortliste' },
                { value: '14', label: 'Achievements', sub: 'From first word to mastery' },
                { value: '3×', label: 'Max Combo', sub: 'XP multiplier on hot streaks' },
                { value: 'B1→C1', label: 'Skill Tree', sub: 'Visual CEFR progression path' },
              ].map((stat, i) => (
                <div key={i} className="glass-card p-6 text-center">
                  <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                  <div className="font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-[var(--muted)]">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section ref={stepsRef} className="py-20 sm:py-28">
        <div className="container max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <div className="section-label mb-3">How it works</div>
            <h2 className="text-[36px] sm:text-[44px] font-black tracking-[-2px]">Simple. Effective.</h2>
          </div>

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-30" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { num: '01', title: 'Train', text: 'Work through real exam-style tasks in vocabulary, grammar, writing and declensions.' },
                { num: '02', title: 'Master', text: 'Earn XP and combo bonuses. Wrong answers go into SRS for targeted follow-up review.' },
                { num: '03', title: 'Track', text: 'See your daily heatmap, skill tree progress, achievements, and 30-day history.' },
              ].map((step, i) => (
                <div key={i} className="step-item space-y-4 px-4">
                  <div className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-full font-black text-sm text-[#0A0D14]"
                    style={{ background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-warm) 100%)', boxShadow: '0 0 20px var(--gold-glow-strong)' }}>
                    {step.num}
                  </div>
                  <div className="font-bold text-xl tracking-tight">{step.title}</div>
                  <div className="text-[var(--text-2)] text-[15px] max-w-[28ch] mx-auto leading-relaxed">{step.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXAM INFO TEASER ────────────────────────────────────────────────── */}
      <section ref={examRef} style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}
        className="py-20 sm:py-28">
        <div className="container max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <div className="section-label mb-3">Official Exam Info</div>
            <h2 className="text-[36px] sm:text-[44px] font-black tracking-[-2px] mb-4">Know your target exam</h2>
            <p className="text-[var(--text-2)] text-lg max-w-[50ch] mx-auto">
              Complete official data for Goethe-Zertifikat and telc Deutsch — formats, times, pass criteria, and free practice materials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            {[
              {
                name: 'Goethe-Zertifikat',
                levels: 'B1 · B2 · C1',
                tag: 'Fully modular since 2024',
                highlights: ['60/100 pass per module', 'Modules taken separately', 'Certificate does not expire'],
                color: 'rgba(212,160,23,0.08)',
                borderColor: 'rgba(212,160,23,0.25)',
              },
              {
                name: 'telc Deutsch',
                levels: 'B1 · B2 · C1',
                tag: 'Accepted for citizenship & university',
                highlights: ['60% pass (written + oral each ≥60%)', 'Failed section retakeable', 'telc C1 Hochschule for HRK universities'],
                color: 'rgba(59,130,246,0.06)',
                borderColor: 'rgba(59,130,246,0.2)',
              },
            ].map((exam, i) => (
              <div key={i} className="exam-card rounded-2xl p-7"
                style={{ background: exam.color, border: `1px solid ${exam.borderColor}` }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-black text-2xl tracking-tight">{exam.name}</div>
                    <div className="text-[var(--muted)] text-sm mt-0.5">{exam.levels}</div>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full font-medium"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--gold)' }}>
                    {exam.tag}
                  </span>
                </div>
                <ul className="space-y-2">
                  {exam.highlights.map((h, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-[var(--text-2)]">
                      <span className="text-[var(--gold)] text-xs">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/exams" className="btn-primary px-8 py-3.5 text-base inline-block">
              Full Exam Comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-20 sm:py-28">
        <div className="container max-w-3xl mx-auto px-5 sm:px-8 text-center cta-section">
          <div className="inline-block px-5 py-1.5 text-xs tracking-[4px] uppercase font-semibold rounded-full mb-8"
            style={{ border: '1px solid rgba(212,160,23,0.3)', color: 'var(--gold)', background: 'rgba(212,160,23,0.06)' }}>
            No gimmicks. Just the work that works.
          </div>

          <h2 className="text-[40px] sm:text-[56px] font-black tracking-[-2.5px] leading-tight mb-6">
            Ready to prepare<br />
            <span className="gradient-text">like a professional?</span>
          </h2>

          <p className="text-[var(--text-2)] text-lg mb-10 max-w-[40ch] mx-auto">
            Start training immediately. No registration, no payment, no barriers.
          </p>

          <Link
            href="/dashboard"
            className="btn-primary text-lg px-10 py-4 inline-block"
          >
            Enter GermanForge
          </Link>

          <p className="mt-5 text-xs text-[var(--muted)]">
            Everything stays on your device • For Anh Kiet • Vietnam time
          </p>
        </div>
      </section>
    </div>
  );
}
