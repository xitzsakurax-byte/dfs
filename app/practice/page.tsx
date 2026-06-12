'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, NotebookPen, Layers, Database, FileText, Gamepad2, Library } from 'lucide-react';
import AppNav from '@/components/AppNav';
import MobileBottomNav from '@/components/MobileBottomNav';

const MODULES = [
  {
    href: '/practice/vocab', Icon: BookOpen, label: 'Vocabulary for exams',
    title: 'B1–C1 Exam Lexicon',
    desc: 'Curated B1–C1 terms for TELC & Goethe with example sentences. Wrong answers feed your SRS queue.',
    cta: 'Start training',
  },
  {
    href: '/practice/grammar', Icon: NotebookPen, label: 'Grammar for exams',
    title: 'Complex Structures',
    desc: 'Key B1–C1 structures tested in TELC and Goethe — clear explanations plus exam-focused practice.',
    cta: 'Start training',
  },
  {
    href: '/practice/writing', Icon: FileText, label: 'Writing · TELC & Goethe',
    title: 'Exam Writing Tasks',
    desc: 'Authentic email, report and opinion tasks with instant heuristic scoring aligned to official criteria.',
    cta: 'Start writing',
  },
  {
    href: '/practice/bank', Icon: Database, label: 'Official B1 vocabulary bank',
    title: '3,078-Word Drill',
    desc: 'The official Goethe Wortliste as a mastery drill. Prioritises unmastered terms, never repeats a mastered one.',
    cta: 'Start drill',
    featured: true,
  },
  {
    href: '/practice/declensions', Icon: Layers, label: 'Word forms · cases',
    title: 'Declensions (N/A/D/G)',
    desc: 'All four cases in real exam sentences — prepositions, verbs with case, adjective endings.',
    cta: 'Practice cases',
  },
  {
    href: '/practice/game', Icon: Gamepad2, label: 'Interactive practice',
    title: 'Case & Grammar Game',
    desc: 'Write forms, fix structure errors, pop quizzes. Combo multipliers up to 3× XP on hot streaks.',
    cta: 'Play the game',
  },
];

export default function PracticeHub() {
  return (
    <div className="min-h-screen pb-24 text-[var(--text)]" style={{ background: 'var(--bg)' }}>
      <AppNav right={<span style={{ color: 'var(--muted)' }}>Anh Kiet</span>} />

      <div className="pt-24 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="mb-10">
          <div className="eyebrow eyebrow-rule mb-3">TELC · Goethe · B1–C1</div>
          <h1 className="display-lg">
            The training <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>floor.</span>
          </h1>
          <p className="mt-3 max-w-[52ch] text-[15px]" style={{ color: 'var(--text-2)' }}>
            Six modules built around real exam formats. Everything you answer feeds
            XP, streaks, quests and your spaced-repetition queue.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.href}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.06 }}
            >
              <Link
                href={m.href}
                className="skill-card group flex flex-col p-6 h-full"
                style={m.featured ? { borderColor: 'rgba(212,160,23,0.45)' } : undefined}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.22)' }}
                  >
                    <m.Icon size={19} style={{ color: 'var(--gold-bright)' }} />
                  </div>
                  {m.featured && (
                    <span className="text-[10px] px-2.5 py-1 rounded-full font-bold tracking-[0.12em] uppercase"
                      style={{ background: 'rgba(212,160,23,0.12)', color: 'var(--gold)', border: '1px solid rgba(212,160,23,0.3)' }}>
                      Core
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase mb-1.5" style={{ color: 'var(--muted)' }}>
                  {m.label}
                </div>
                <div className="font-bold text-xl tracking-tight mb-2 group-hover:text-[var(--gold-bright)] transition-colors">
                  {m.title}
                </div>
                <div className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-2)' }}>{m.desc}</div>
                <div className="mt-5 text-sm font-semibold" style={{ color: 'var(--gold)' }}>
                  {m.cta} →
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Resources strip */}
        <Link href="/resources" className="glass-card group flex items-center justify-between gap-5 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.22)' }}>
              <Library size={19} style={{ color: 'var(--gold-bright)' }} />
            </div>
            <div>
              <div className="font-bold text-lg tracking-tight">TELC &amp; Goethe Official Materials</div>
              <div className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
                Model tests, marking criteria, the full vocabulary bank and trusted external resources.
              </div>
            </div>
          </div>
          <span className="text-sm font-semibold flex-shrink-0 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--gold)' }}>
            Browse →
          </span>
        </Link>

        <div className="text-xs text-center" style={{ color: 'var(--muted)' }}>
          Listening &amp; speaking modules with authentic exam audio are planned next.
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
