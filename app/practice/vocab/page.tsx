'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { vocabQuestions } from '@/lib/data/vocab';
import { addToBankMastered, logPerformance } from '@/lib/progress';

// Use the rich data source (expanded, documented, Exam-relevant B1-C1 items)
const questions = vocabQuestions;

export default function VocabQuiz() {
  const STORAGE_KEY = 'germanforge_vocab_completed';

  // Persist mastered words across reloads so user doesn't redo correctly answered items.
  // Load completed from localStorage on mount, filter them out of the pool.
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [remaining, setRemaining] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [bankCount, setBankCount] = useState(0);

  // Live bank count (3000+ gamification integration visible in every task)
  useEffect(() => {
    const updateBank = () => {
      try {
        const b = localStorage.getItem('germanforge_bank_mastered');
        setBankCount(b ? JSON.parse(b).length : 0);
      } catch {}
    };
    updateBank();
    const onStorage = (e: StorageEvent) => { if (e.key === 'germanforge_bank_mastered') updateBank(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const completedSet = new Set<string>(saved ? JSON.parse(saved) : []);
    setCompleted(completedSet);

    const available = questions.filter((q: any) => !completedSet.has(q.de));
    if (available.length === 0) {
      setFinished(true);
      return;
    }
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    setRemaining(shuffled);
    setCurrentQ(shuffled[0]);
  }, []);

  const progress = ((questions.length - remaining.length + (isAnswered ? 1 : 0)) / questions.length) * 100;

  const currentOptions = useMemo(() => {
    if (!currentQ) return [];
    // Dynamic option generation for large pools (3000+ words): correct + 3 random distractors from the full list
    // This "mixes them up" automatically and scales without per-item options.
    const allEn = questions.map((q: any) => q.en).filter((en: string) => en !== currentQ.en);
    const distractors = [...allEn].sort(() => Math.random() - 0.5).slice(0, 3);
    return [currentQ.en, ...distractors].sort(() => Math.random() - 0.5);
  }, [currentQ]);

  function pickNext(newRemaining: any[]) {
    if (newRemaining.length === 0) {
      setFinished(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * newRemaining.length);
    setCurrentQ(newRemaining[randomIndex]);
  }

  function choose(option: string) {
    if (isAnswered || !currentQ) return;
    setSelected(option);
    setIsAnswered(true);
    const correct = option === currentQ.en;
    if (correct) {
      const points = 15 + Math.floor(Math.random() * 6);
      setScore(s => s + 1);
      setEarnedXP(e => e + points);

      // Persist as mastered so it won't reappear after reload
      const newCompleted = new Set(completed);
      newCompleted.add(currentQ.de);
      setCompleted(newCompleted);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newCompleted)));

      // Remove from remaining for this session (no repeat)
      const newRemaining = remaining.filter(item => item !== currentQ);
      setRemaining(newRemaining);

      // Unified bank mastery (local + Supabase when signed in). No-repeat across the whole site continues to work.
      addToBankMastered(currentQ.de); // fire and forget — updates both layers

      // Log for dashboard performance analysis (by topic)
      logPerformance('vocab', currentQ.topic || 'general', true);
    }
  }

  function next() {
    if (!currentQ) return;
    // After correct, choose() already removed it from remaining. Advance to a fresh one from the pool.
    // On wrong we keep the pool as-is so the item may come up again for practice.
    pickNext(remaining);
    setSelected(null);
    setIsAnswered(false);
  }

  function restart() {
    // Restart session but respect mastered words (don't repeat already answered correctly)
    const saved = localStorage.getItem(STORAGE_KEY);
    const completedSet = new Set<string>(saved ? JSON.parse(saved) : []);
    const available = questions.filter((q: any) => !completedSet.has(q.de));
    if (available.length === 0) {
      setFinished(true);
      return;
    }
    const newRemaining = [...available].sort(() => Math.random() - 0.5);
    setRemaining(newRemaining);
    setCurrentQ(newRemaining[0]);
    setScore(0);
    setSelected(null);
    setIsAnswered(false);
    setFinished(false);
    setEarnedXP(0);
  }

  function resetAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
    setCompleted(new Set());
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setRemaining(shuffled);
    setCurrentQ(shuffled[0]);
    setScore(0);
    setSelected(null);
    setIsAnswered(false);
    setFinished(false);
    setEarnedXP(0);
  }

  if (!currentQ && !finished) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] flex items-center justify-center p-6">
        Loading...
      </div>
    );
  }

  if (finished || remaining.length === 0) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-semibold tracking-tight mb-2">Session complete!</h1>
          <div className="text-xl mb-6">You finished the round with {score} correct out of this pool.</div>
          <div className="practice-card p-8 mb-6">
            <div className="text-5xl font-bold text-[#F4C430] mb-1">+{earnedXP} XP</div>
            <div>Mastered in this bank: {completed.size}/{questions.length} terms. Your B1-C1 knowledge is solidifying.</div>
            <div className="mt-3 text-sm text-[#A8B3C7]">Bank Mastery (3000+ Goethe) updated: {bankCount} terms. Every correct answer syncs to the shared bank — no repeats across Vocab, Grammar, Writing, or Bank Drill.</div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={restart} className="btn-primary px-8 py-3">Practice this round again</Button>
            <Button asChild className="btn-ghost px-8 py-3">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
          <div className="mt-4">
            <Button onClick={resetAllProgress} className="btn-ghost px-6 py-2 text-sm">
              Reset all mastered progress
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-8">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/practice" className="text-sm text-[#A8B3C7] hover:text-[#F5F7FA]">← Back to Practice</Link>
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm text-[var(--muted)]">
              {score} correct / {remaining.length} left • Mastered: {completed.size}/{questions.length} • Bank 3000+: <span className="text-[#F4C430]">{bankCount}</span>
            </div>
          </div>
        </div>

        <div className="practice-card p-8">
          <div className="text-xs tracking-[2px] text-[#F4C430] mb-1">B1-C1 EXAM VOCABULARY</div>
          <div className="text-4xl font-semibold tracking-tight mb-4">{currentQ.de}</div>
          <div className="text-[#A8B3C7] mb-6">What is the English meaning?</div>

          <div className="space-y-3">
            {currentOptions.map((opt, idx) => {
              const isCorrect = opt === currentQ.en;
              let cls = "quiz-option w-full text-left";
              if (isAnswered) {
                if (isCorrect) cls += " correct";
                else if (selected === opt) cls += " wrong";
              }
              return (
                <button key={idx} onClick={() => choose(opt)} disabled={isAnswered} className={`${cls} min-h-[52px] sm:min-h-[44px]`}>
                  {opt}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div className={`feedback mt-4 ${selected === currentQ.en ? 'correct' : 'wrong'}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
                {selected === currentQ.en ? (
                  <>
                    Correct! +15–20 XP
                    {currentQ.example && (
                      <div className="mt-2 text-sm opacity-90">Example: <span className="font-medium">{currentQ.example}</span></div>
                    )}
                    {currentQ.topic && <div className="text-xs mt-1 opacity-70">Topic: {currentQ.topic} • {currentQ.cefr}</div>}
                  </>
                ) : (
                  `Correct answer: ${currentQ.en}`
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={next} disabled={!isAnswered} className="btn-primary px-8 py-3 disabled:opacity-50">
            {isAnswered && selected === currentQ.en ? "Continue (no repeat this term)" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
