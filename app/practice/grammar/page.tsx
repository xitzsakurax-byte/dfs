'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { grammarQuestions } from '@/lib/data/grammar';
import { addToBankMastered, logPerformance } from '@/lib/progress';

// Rich documented grammar items (B1-C1, Exam preparation focus)
const questions = grammarQuestions;

export default function GrammarQuiz() {
  const STORAGE_KEY = 'germanforge_grammar_completed';

  // Persist mastered grammar items across reloads (same as vocab)
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
  // Only ONE declaration to avoid "defined multiple times" error in Turbopack/Next build
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

    const available = questions.filter((q: any) => !completedSet.has(q.q));
    if (available.length === 0) {
      setFinished(true);
      return;
    }
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    setRemaining(shuffled);
    setCurrentQ(shuffled[0]);
  }, []);

  const currentOptions = useMemo(() => {
    if (!currentQ) return [];
    return [...currentQ.options].sort(() => Math.random() - 0.5);
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
    const correct = option === currentQ.correct;
    if (correct) {
      const points = 18 + Math.floor(Math.random() * 5);
      setScore(s => s + 1);
      setEarnedXP(e => e + points);

      // Persist as mastered
      const newCompleted = new Set(completed);
      newCompleted.add(currentQ.q);
      setCompleted(newCompleted);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newCompleted)));

      const newRemaining = remaining.filter(item => item !== currentQ);
      setRemaining(newRemaining);

      // Bank mastery (local only)
      addToBankMastered(currentQ.q); // fire and forget — updates both layers

      // Log for analysis (grammar structures)
      logPerformance('grammar', currentQ.topic || 'structure', true);
    }
  }

  function next() {
    if (!currentQ) return;
    // After correct, choose() already removed the item. Just advance from the current remaining pool.
    // On wrong we keep it available for more practice.
    pickNext(remaining);
    setSelected(null);
    setIsAnswered(false);
  }

  function restart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const completedSet = new Set<string>(saved ? JSON.parse(saved) : []);
    const available = questions.filter((q: any) => !completedSet.has(q.q));
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
          <div className="text-xl mb-6">You finished the round — {Math.round((score / Math.max(1, questions.length)) * 100)}% accuracy.</div>
          <div className="practice-card p-8 mb-6">
            <div className="text-5xl font-bold text-[#F4C430] mb-1">+{earnedXP} XP</div>
            <div>Mastered structures: {completed.size}/{questions.length}. Your B1-C1 grammar is getting stronger.</div>
            <div className="mt-3 text-sm text-[#A8B3C7]">Bank Mastery (3000+ Goethe) updated: {bankCount} terms. Every correct answer syncs to the shared bank — no repeats across modules.</div>
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
          <div className="text-xs tracking-[2px] text-[#F4C430] mb-1">B1-C1 COMPLEX STRUCTURES</div>
          <div className="text-3xl font-semibold tracking-tight mb-2">{currentQ.q}</div>
          <div className="text-[#A8B3C7] mb-6">{currentQ.en}</div>

          {/* Separate mobile: full-width stacked options for easy thumb taps. Desktop keeps 2-col */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentOptions.map((opt, idx) => {
              const isCorrect = opt === currentQ.correct;
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
              <motion.div className={`feedback mt-4 ${selected === currentQ.correct ? 'correct' : 'wrong'}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
                {selected === currentQ.correct ? (
                  <>
                    Correct! +18 XP
                    {currentQ.explanation && <div className="mt-2 text-sm opacity-90">{currentQ.explanation}</div>}
                    {currentQ.topic && <div className="text-xs mt-1 opacity-70">Topic: {currentQ.topic} • {currentQ.cefr}</div>}
                  </>
                ) : (
                  `Correct answer: ${currentQ.correct} — ${currentQ.hint}`
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={next} disabled={!isAnswered} className="btn-primary px-8 py-3 disabled:opacity-50">
            {isAnswered && selected === currentQ.correct ? "Continue (no repeat this item)" : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
