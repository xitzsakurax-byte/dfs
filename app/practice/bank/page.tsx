'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import fullVocab from '@/lib/data/full-vocab.json';
import { getBankMastered, addToBankMastered } from '@/lib/progress';

const BANK_TOTAL = 3078;
const DRILL_SIZE = 12;

export default function BankDrill() {
  const BANK_KEY = 'germanforge_bank_mastered';

  const [bankMastered, setBankMastered] = useState<string[]>([]);
  const [drillWords, setDrillWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionNew, setSessionNew] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lastAction, setLastAction] = useState<'master' | 'skip' | null>(null);

  // Load bank mastery - pure localStorage (instant, no backend)
  useEffect(() => {
    async function load() {
      const mastered = await getBankMastered();
      setBankMastered(mastered);

      // Build drill preferring unmastered. Filter for B1-C1 relevant (avoid pure A1 basics like short everyday words).
      // Prioritize longer terms, compounds, academic/professional words from the official list.
      const isB1Plus = (w: string) => {
        if (!w || w.length < 6) return false;
        const lower = w.toLowerCase();
        const tooBasic = ['bus', 'hund', 'milch', 'haus', 'wasser', 'wetter', 'woche', 'tee', 'tisch', 'sonne', 'mond', 'himmel', 'regen', 'schnee', 'auto', 'zug', 'flug', 'hund', 'katze', 'vater', 'mutter', 'kind', 'freund', 'freundin', 'opa', 'oma', 'onkel', 'tante', 'bruder', 'schwester', 'mann', 'frau', 'junge', 'mädchen', 'stadt', 'land', 'meer', 'strand', 'wald', 'berg', 'fluss'];
        if (tooBasic.some(b => lower.includes(b))) return false;
        // Prefer words with B1+ indicators: length, umlauts in compounds, typical endings, phrases
        return w.length >= 7 || w.includes(' ') || /[äöüß]/.test(w) || /(keit|ung|schaft|tion|ismus|enz|anz|heit)$/.test(lower) || w[0] === w[0].toUpperCase() && w.length > 8;
      };

      let candidates = [...fullVocab].filter(isB1Plus);
      if (candidates.length < 50) candidates = [...fullVocab]; // fallback if filter too strict

      const unmastered = candidates.sort(() => Math.random() - 0.5).filter(w => !mastered.includes(w));
      let drill = unmastered.slice(0, DRILL_SIZE);
      if (drill.length < DRILL_SIZE) {
        const fillers = candidates.sort(() => Math.random() - 0.5).filter(w => !drill.includes(w) && !mastered.includes(w)).slice(0, DRILL_SIZE - drill.length);
        drill = [...drill, ...fillers];
      }
      setDrillWords(drill);
    }
    load();
  }, []);

  const currentWord = drillWords[currentIndex] || '';
  const progress = drillWords.length > 0 ? Math.round(((currentIndex + (lastAction ? 1 : 0)) / drillWords.length) * 100) : 0;
  const masteryPercent = ((bankMastered.length / BANK_TOTAL) * 100).toFixed(1);

  async function masterWord() {
    if (!currentWord || finished) return;

    const isNew = !bankMastered.includes(currentWord);
    if (isNew) {
      const newMastered = [...bankMastered, currentWord];
      setBankMastered(newMastered);
      setSessionNew(s => s + 1);

      // Pure local (instant)
      await addToBankMastered(currentWord);
    }

    const points = 8 + Math.floor(Math.random() * 7);
    setEarnedXP(e => e + points);
    setLastAction('master');

    advance();
  }

  function skipWord() {
    if (!currentWord || finished) return;
    setLastAction('skip');
    advance();
  }

  function advance() {
    const next = currentIndex + 1;
    if (next >= drillWords.length) {
      setFinished(true);
    } else {
      setCurrentIndex(next);
    }
  }

  function restartDrill() {
    // New random drill respecting current global mastered (no repeat already known if possible)
    const mastered = [...bankMastered];
    const isB1Plus = (w: string) => {
      if (!w || w.length < 6) return false;
      const lower = w.toLowerCase();
      const tooBasic = ['bus', 'hund', 'milch', 'haus', 'wasser', 'wetter', 'woche', 'tee', 'tisch', 'sonne', 'mond', 'himmel', 'regen', 'schnee', 'auto', 'zug', 'flug', 'hund', 'katze', 'vater', 'mutter', 'kind', 'freund', 'freundin', 'opa', 'oma', 'onkel', 'tante', 'bruder', 'schwester', 'mann', 'frau', 'junge', 'mädchen', 'stadt', 'land', 'meer', 'strand', 'wald', 'berg', 'fluss'];
      if (tooBasic.some(b => lower.includes(b))) return false;
      return w.length >= 7 || w.includes(' ') || /[äöüß]/.test(w) || /(keit|ung|schaft|tion|ismus|enz|anz|heit)$/.test(lower) || w[0] === w[0].toUpperCase() && w.length > 8;
    };
    let candidates = [...fullVocab].filter(isB1Plus);
    if (candidates.length < 50) candidates = [...fullVocab];

    const unmastered = candidates.sort(() => Math.random() - 0.5).filter(w => !mastered.includes(w));
    let drill = unmastered.slice(0, DRILL_SIZE);
    if (drill.length < DRILL_SIZE) {
      const fillers = candidates.sort(() => Math.random() - 0.5).filter(w => !drill.includes(w) && !mastered.includes(w)).slice(0, DRILL_SIZE - drill.length);
      drill = [...drill, ...fillers];
    }
    setDrillWords(drill);
    setCurrentIndex(0);
    setSessionNew(0);
    setEarnedXP(0);
    setFinished(false);
    setLastAction(null);
  }

  function resetBank() {
    localStorage.removeItem(BANK_KEY);
    setBankMastered([]);
    restartDrill();
  }

  if (!currentWord && !finished) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] flex items-center justify-center p-6">
        Loading the 3000+ bank...
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-semibold tracking-tight mb-2">Bank Drill complete!</h1>
          <div className="text-xl mb-6">You processed {drillWords.length} terms from the official Goethe bank.</div>

          <div className="practice-card p-8 mb-6">
            <div className="text-5xl font-bold text-[#F4C430] mb-1">+{earnedXP} XP</div>
            <div className="text-[#A8B3C7] mb-3">Newly mastered this drill: <span className="font-semibold text-[#F5F7FA]">{sessionNew}</span></div>
            <div className="text-sm">Total Bank Mastery: <span className="font-mono text-[#F4C430]">{bankMastered.length}/{BANK_TOTAL}</span> ({masteryPercent}%)</div>
            <div className="mt-2 text-xs text-[var(--muted)]">Every mastered term directly improves your readiness for the TELC and Goethe B1-C1 exams.</div>
          </div>

          <div className="flex gap-3 justify-center mb-4">
            <Button onClick={restartDrill} className="btn-primary px-8 py-3">New drill (avoid already known)</Button>
            <Button asChild className="btn-ghost px-8 py-3">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>

          <div className="flex gap-3 justify-center">
            <Button asChild className="btn-ghost px-6 py-2 text-sm">
              <Link href="/resources">View full bank &amp; Resources</Link>
            </Button>
            <Button onClick={resetBank} className="btn-ghost px-6 py-2 text-sm text-[#A8B3C7]">
              Reset entire Bank Mastery
            </Button>
          </div>

          <div className="mt-6 text-xs text-[#A8B3C7]">
            Continue: Vocab / Grammar / Writing quizzes also auto-sync correct answers into this bank (no repeats after correct).
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-8">
      <div className="container max-w-2xl mx-auto px-6">
        {/* Header with live bank gamification stat */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/practice" className="text-sm text-[#A8B3C7] hover:text-[#F5F7FA]">← Back to Practice</Link>
          <div className="flex items-center gap-4 text-sm font-mono text-[var(--muted)]">
            Bank: <span className="text-[#F4C430]">{bankMastered.length}/{BANK_TOTAL}</span> • Drill {currentIndex + 1}/{drillWords.length}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-[#F4C430] text-xs tracking-[2px] mb-1">OFFICIAL GOETHE 3000+ WORTLISTE • GAMIFICATION</div>
          <h1 className="text-3xl font-semibold tracking-tight">Official Vocabulary Bank — Quick Mastery Drill</h1>
          <p className="text-[var(--muted)] mt-1 text-sm">Master terms → +XP • Real-time sync with all training modules • No-repeat system • Builds direct exam readiness</p>
        </div>

        {/* Progress bar for this drill + global */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1 text-[#A8B3C7]">
            <span>Drill progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-[var(--surface2)] rounded-full overflow-hidden mb-2">
            <div className="h-2 bg-gradient-to-r from-[#C8102E] to-[#F4C430] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-xs text-[#A8B3C7]">Global Bank Mastery: {bankMastered.length} / {BANK_TOTAL} ({masteryPercent}%)</div>
        </div>

        {/* Main card - clean, no icons, high contrast */}
        <div className="practice-card p-8 mb-6">
          <div className="text-xs tracking-[2px] text-[#F4C430] mb-2">OFFICIAL BANK TERMS (B1-C1+)</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord + currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight break-words mb-8 min-h-[120px] flex items-center"
            >
              {currentWord}
            </motion.div>
          </AnimatePresence>

          <div className="text-[#A8B3C7] text-sm mb-6">Recognize and own this term? Tap Master to record it in the 3000+ bank (it will not repeat later in any exercise).</div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={masterWord} className="btn-primary flex-1 py-4 text-lg">
              Master this term (+8–14 XP)
            </Button>
            <Button onClick={skipWord} className="btn-ghost flex-1 py-4 text-lg border border-[var(--line)]">
              Skip (practice later)
            </Button>
          </div>

          <div className="mt-4 text-xs text-[#A8B3C7] text-center">
            Each Master contributes to streak, level and global Bank Mastery %. Data syncs live with Dashboard and all quizzes.
          </div>
        </div>

        <div className="text-center">
          <Button onClick={restartDrill} className="btn-ghost px-6 py-2 text-sm mr-3">Start new drill</Button>
          <Link href="/resources" className="text-sm text-[#F4C430] hover:underline">View full list &amp; search →</Link>
        </div>

        <div className="mt-8 text-xs text-[#A8B3C7] text-center">
          Fully randomized • Prioritizes unmastered • Fully integrated into gamification (dashboard, every quiz, writing).
        </div>
      </div>
    </div>
  );
}
