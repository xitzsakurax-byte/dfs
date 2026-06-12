'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function GermanForgeLanding() {
  return (
    <div className="min-h-screen bg-[#0F1116] text-[#EDEEF2] overflow-x-hidden selection:bg-[#8B1E3D] selection:text-white">
      {/* Simple, elegant top nav - mobile optimized */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 bg-[#0F1116]/90 backdrop-blur-2xl border-b border-[#2C303A]">
        <div className="flex items-center gap-3">
          <div className="logo-mark w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-gradient-to-br from-[#8B1E3D] to-[#C24A3A] flex items-center justify-center text-white text-[15px] sm:text-[17px] font-semibold tracking-[-0.5px]">GF</div>
          <div className="font-semibold tracking-[-0.3px] text-[15px] sm:text-[17px]">GermanForge</div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium">
          <a href="#features" className="hover:text-[#8B1E3D] transition-colors">Features</a>
          <a href="#how" className="hover:text-[#8B1E3D] transition-colors">How it works</a>
          <Link href="/dashboard" className="btn-primary px-6 py-2 text-sm">Enter Training</Link>
        </div>

        {/* Mobile: prominent start button */}
        <div className="md:hidden">
          <Link href="/dashboard" className="btn-primary px-5 py-1.5 text-sm rounded-full">Start</Link>
        </div>
      </nav>

      {/* HERO — Simple, elegant, beautiful with gradient theme. Fully mobile responsive */}
      <div className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 bg-gradient-to-b from-[#0F1116] via-[#0F1116] to-[#111418]">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Trust logos / badges - stacks nicely on mobile */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 mb-8 sm:mb-10">
            <div className="flex items-center gap-2.5">
              {/* Inline elegant logo mark for Goethe (no broken image) */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gradient-to-br from-[#8B1E3D] to-[#C24A3A] flex items-center justify-center text-white text-[10px] sm:text-[11px] font-bold tracking-tighter">GI</div>
                <span className="text-sm sm:text-base font-medium tracking-tight">Goethe-Institut</span>
              </div>
            </div>
            <div className="hidden sm:block h-3 w-px bg-[#2C303A]" />
            <div className="px-3 sm:px-4 py-1 rounded-full border border-[#2C303A] bg-[#171A21]/60 text-xs sm:text-sm tracking-wide">
              <span className="font-medium text-[#C5CAD6]">TELC B1</span> <span className="text-[#8F95A3]">•</span> <span className="font-medium text-[#C5CAD6]">Goethe B1–C1</span>
            </div>
          </div>

          <h1 className="text-[42px] sm:text-[56px] lg:text-[68px] leading-[0.92] font-semibold tracking-[-2.8px] sm:tracking-[-3.2px] mb-5 sm:mb-6">
            Master real<br />TELC &amp; Goethe German.
          </h1>

          <p className="max-w-[40ch] mx-auto text-[15px] sm:text-[17px] text-[#C5CAD6] mb-8 sm:mb-10 leading-snug">
            Professional, focused preparation for B1–C1 exams. 
            Authentic tasks, the official 3000+ word bank, and clear feedback — nothing extra.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/dashboard" className="btn-primary px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg rounded-2xl inline-block w-full sm:w-auto">
              Start Training
            </Link>
            <a href="#features" className="px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg border border-[#2C303A] hover:border-[#8B1E3D] rounded-2xl inline-block transition-colors w-full sm:w-auto">
              See what’s inside
            </a>
          </div>

          <div className="mt-6 sm:mt-8 text-xs text-[#8F95A3]">Guest mode • No sign-up required • Progress saved in your browser</div>
        </div>
      </div>

      {/* Trust bar with logos - mobile friendly wrap */}
      <div className="border-b border-[#2C303A] py-5 sm:py-6 bg-[#0A0C12]">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 text-xs sm:text-sm text-center">
          <div className="flex items-center gap-2 opacity-80">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#8B1E3D] to-[#C24A3A] flex items-center justify-center text-white text-[9px] font-bold">GI</div>
            <span className="text-[#C5CAD6]">Goethe-Institut standards</span>
          </div>
          <div className="text-[#8F95A3] hidden sm:inline">•</div>
          <div className="text-[#C5CAD6]">TELC B1 certified alignment</div>
          <div className="text-[#8F95A3] hidden sm:inline">•</div>
          <div className="text-[#C5CAD6]">3,000+ official exam vocabulary</div>
        </div>
      </div>

      {/* Features — elegant cards with gradient accents. Excellent on mobile */}
      <div id="features" className="container max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <div className="uppercase tracking-[3px] text-xs text-[#8B1E3D] mb-3">Everything you need. Nothing you don’t.</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-1.5px]">Focused exam training</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { title: "Exam Vocabulary", desc: "3,000+ official Goethe B1 terms with examples. No repeats after you master them." },
            { title: "Complex Grammar", desc: "The structures that actually appear on TELC & Goethe papers. Clear explanations." },
            { title: "Writing Practice", desc: "Authentic email + report tasks with AI scoring against official criteria." },
            { title: "Word Forms & Cases", desc: "Master nominative, accusative, dative and genitive in real sentences." },
            { title: "The Official Bank", desc: "Quick mastery drills. Prioritises what you don’t know yet. Syncs everywhere." },
          ].map((f, i) => (
            <motion.div 
              key={i} 
              className="practice-card p-5 sm:p-6 group hover:border-[#8B1E3D]/60 transition-colors bg-gradient-to-b from-[#111418] to-[#0F1116] cursor-default"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.985 }}
              transition={{ delay: 0.05 * i }}
            >
              <div className="text-[#8B1E3D] text-xs tracking-[2px] mb-3">{String(i+1).padStart(2, '0')}</div>
              <div className="font-semibold text-lg sm:text-xl tracking-tight mb-3">{f.title}</div>
              <div className="text-[14px] sm:text-[15px] text-[#C5CAD6] leading-snug">{f.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it works — simple & elegant, mobile stacked */}
      <div id="how" className="bg-[#0A0C12] border-y border-[#2C303A]">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
          <div className="text-center mb-8 sm:mb-10">
            <div className="text-[#8B1E3D] text-xs tracking-[3px] mb-2">THREE STEPS</div>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">Simple. Effective. Professional.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              { num: "01", title: "Train", text: "Work through real exam-style tasks in vocabulary, grammar, writing and cases." },
              { num: "02", title: "Master", text: "Every correct answer removes the item from future practice. The bank grows with you." },
              { num: "03", title: "Track", text: "See your real daily progress, streaks and history in the dedicated progress view." },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                className="space-y-2 sm:space-y-3 px-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                transition={{ delay: 0.1 * i }}
              >
                <div className="mx-auto inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#8B1E3D] to-[#C24A3A] text-white text-sm font-medium">{step.num}</div>
                <div className="font-semibold text-lg sm:text-xl tracking-tight">{step.title}</div>
                <div className="text-[#C5CAD6] text-[14px] sm:text-[15px] max-w-[30ch] mx-auto leading-snug">{step.text}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final elegant CTA with gradient - mobile friendly */}
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
        <div className="mb-5 sm:mb-6">
          <div className="inline-block px-4 py-1 text-xs tracking-[3px] border border-[#8B1E3D]/30 rounded-full text-[#8B1E3D]">NO GIMMICKS. JUST THE WORK THAT WORKS.</div>
        </div>
        <h3 className="text-[32px] sm:text-[40px] lg:text-[46px] leading-none font-semibold tracking-[-1.6px] sm:tracking-[-1.8px] mb-5 sm:mb-6">
          Ready to prepare<br />like a professional?
        </h3>
        <Link href="/dashboard" className="inline-block bg-gradient-to-r from-[#8B1E3D] to-[#C24A3A] hover:brightness-105 active:brightness-95 transition-all text-white text-base sm:text-lg px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-medium w-full sm:w-auto">
          Enter GermanForge
        </Link>
        <div className="mt-3 sm:mt-4 text-xs text-[#8F95A3]">Guest mode • Everything stays on your device until you sign in</div>
      </div>

    </div>
  );
}
