'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function PracticeHub() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-8">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[var(--accent-light)] text-xs tracking-[2px]">TELC B1 • GOETHE B1-C1</div>
            <h1 className="text-4xl font-semibold tracking-tight">Exam Skills</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-[var(--muted)] hover:text-[#EDEEF2]">← Back</Link>
        </div>

        {/* Separate phone UI: comfortable 1-2 column cards on mobile. Desktop gets the rich multi-column view */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Link href="/practice/vocab" className="skill-card group block p-6">
              <div>
                <div className="text-[var(--accent-light)] text-xs tracking-widest mb-1">VOCABULARY FOR EXAMS</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">B1-C1 Exam Lexicon</div>
                <div className="text-[var(--muted)] text-[15px]">3,000+ official terms for TELC &amp; Goethe. Theme-based for all sections. Mastery tracking with no repeats.</div>
              </div>
              <div className="mt-6 text-sm text-[var(--accent-light)] font-medium group-hover:underline">Start Training →</div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <Link href="/practice/grammar" className="skill-card group block p-6">
              <div>
                <div className="text-[var(--accent-light)] text-xs tracking-widest mb-1">GRAMMAR FOR EXAMS</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Complex Structures</div>
                <div className="text-[var(--muted)] text-[15px]">Key B1-C1 structures tested in TELC and Goethe. Clear explanations + exam-focused practice.</div>
              </div>
              <div className="mt-6 text-sm text-[var(--accent-light)] font-medium group-hover:underline">Start Training →</div>
            </Link>
          </motion.div>

          {/* New commercial writing mock test card */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <Link href="/practice/writing" className="skill-card group block p-6">
              <div>
                <div className="text-[var(--accent-light)] text-xs tracking-widest mb-1">WRITING • TELC &amp; GOETHE B1-C1</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Exam Writing Tasks</div>
                <div className="text-[var(--muted)] text-[15px]">Authentic email, report and opinion tasks scored by AI against official TELC &amp; Goethe criteria. Integrated exam vocabulary.</div>
              </div>
              <div className="mt-6 text-sm text-[var(--accent-light)] font-medium group-hover:underline">Start Writing Practice →</div>
            </Link>
          </motion.div>

          {/* Dedicated 3000+ Bank gamification card - added into everything */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
            <Link href="/practice/bank" className="skill-card group block p-6 border border-[var(--gold)]/60">
              <div>
                <div className="text-[var(--accent-light)] text-xs tracking-widest mb-1">OFFICIAL B1 EXAM VOCABULARY BANK</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">3,000+ Terms for TELC &amp; Goethe</div>
                <div className="text-[var(--muted)] text-[15px]">Quick Mastery Drills • Prioritizes unmastered terms • +XP per mastered word • Real-time sync across all training • Smart no-repeat system</div>
              </div>
              <div className="mt-6 text-sm text-[var(--accent-light)] font-medium group-hover:underline">Start Vocabulary Drill →</div>
            </Link>
          </motion.div>

          {/* New: Word Forms / Declensions (Nominativ, Akkusativ, Dativ, Genitiv) */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.30 }}>
            <Link href="/practice/declensions" className="skill-card group block p-6">
              <div>
                <div className="text-[var(--accent-light)] text-xs tracking-widest mb-1">WORD FORMS • CASES</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Declensions (N/A/D/G)</div>
                <div className="text-[var(--muted)] text-[15px]">Master the 4 cases with real exam sentences. Prepositions, verbs + case, adjective endings. Essential for B1 writing &amp; speaking.</div>
              </div>
              <div className="mt-6 text-sm text-[var(--accent-light)] font-medium group-hover:underline">Practice Cases →</div>
            </Link>
          </motion.div>

          {/* New dedicated Game section with writing, error fixing, pop quiz, rewards */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Link href="/practice/game" className="skill-card group block p-6 border border-[#8B1E3D]/40">
              <div>
                <div className="text-[var(--accent-light)] text-xs tracking-widest mb-1">INTERACTIVE PRACTICE</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Case &amp; Grammar Game</div>
                <div className="text-[var(--muted)] text-[15px]">Write forms, fix structure errors, pop quizzes. Earn XP &amp; points. No repeats, real exam focus.</div>
              </div>
              <div className="mt-6 text-sm text-[var(--accent-light)] font-medium group-hover:underline">Play the Game →</div>
            </Link>
          </motion.div>
        </div>

        {/* Prominent commercial resources link */}
        <Link href="/resources" className="practice-card group block p-6 mb-8 hover:border-[var(--gold)] transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[var(--accent-light)] text-xs tracking-widest mb-1">OFFICIAL + ENRICHED</div>
              <div className="font-semibold text-2xl tracking-tight">TELC &amp; Goethe Official Materials</div>
              <div className="text-[var(--muted)] mt-1 text-[15px]">Direct links to model tests and marking criteria • Complete B1 exam vocabulary bank • Targeted skill resources</div>
            </div>
            <div className="text-[var(--accent-light)] text-sm font-medium group-hover:underline">Browse now →</div>
          </div>
        </Link>

        <div className="text-xs text-[var(--muted)] text-center">Listening &amp; Speaking modules with authentic exam audio coming soon. Word forms (declensions) are now included as a core B1-C1 skill for TELC &amp; Goethe.</div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
