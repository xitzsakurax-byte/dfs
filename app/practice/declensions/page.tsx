'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { declensionItems, DeclensionItem, getShuffledDeclensions } from '@/lib/data/declensions';
import { addToBankMastered, logPerformance } from '@/lib/progress';

export default function DeclensionsQuiz() {
  const STORAGE_KEY = 'germanforge_declensions_completed';

  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [remaining, setRemaining] = useState<DeclensionItem[]>([]);
  const [currentQ, setCurrentQ] = useState<DeclensionItem | null>(null);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);
  const [bankCount, setBankCount] = useState(0);

  // Live bank count (consistent with other modules)
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

    const available = getShuffledDeclensions().filter((item: DeclensionItem) => !completedSet.has(item.base + item.sentence));
    if (available.length === 0) {
      setFinished(true);
      return;
    }
    setRemaining(available);
    setCurrentQ(available[0]);
  }, []);

  function pickNext(newRemaining: DeclensionItem[]) {
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
      const points = 12 + Math.floor(Math.random() * 6);
      setScore(s => s + 1);
      setEarnedXP(e => e + points);

      // Persist as completed
      const key = currentQ.base + currentQ.sentence;
      const newCompleted = new Set(completed);
      newCompleted.add(key);
      setCompleted(newCompleted);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newCompleted)));

      const newRemaining = remaining.filter(item => item !== currentQ);
      setRemaining(newRemaining);

      // Unified bank mastery (local + Supabase when signed in)
      addToBankMastered(currentQ.base); // fire and forget — updates both layers

      // Log for analysis (by case)
      logPerformance('declension', currentQ.case || 'general', true);
    }
  }

  function next() {
    if (!currentQ) return;
    pickNext(remaining);
    setSelected(null);
    setIsAnswered(false);
  }

  function restart() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const completedSet = new Set<string>(saved ? JSON.parse(saved) : []);
    const available = getShuffledDeclensions().filter((item: DeclensionItem) => !completedSet.has(item.base + item.sentence));
    if (available.length === 0) {
      setFinished(true);
      return;
    }
    setRemaining(available);
    setCurrentQ(available[0]);
    setScore(0);
    setSelected(null);
    setIsAnswered(false);
    setFinished(false);
    setEarnedXP(0);
  }

  function resetAllProgress() {
    localStorage.removeItem(STORAGE_KEY);
    setCompleted(new Set());
    const shuffled = getShuffledDeclensions();
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
      <div className="min-h-screen bg-[#0B0D14] text-[#F1F3F8] flex items-center justify-center p-6">
        Loading declension practice...
      </div>
    );
  }

  if (finished || remaining.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0D14] text-[#F1F3F8] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-semibold tracking-tight mb-2">Great work!</h1>
          <div className="text-xl mb-6">You completed the session with {score} correct answers.</div>
          <div className="practice-card p-8 mb-6">
            <div className="text-5xl font-bold text-[var(--accent-light)] mb-1">+{earnedXP} XP</div>
            <div>Declension mastery is a core part of B1-C1 exam success (especially writing and speaking).</div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={restart} className="btn-primary px-8 py-3">Practice Again</Button>
            <Button asChild className="btn-ghost px-8 py-3">
              <Link href="/practice">Back to Practice</Link>
            </Button>
          </div>
          <div className="mt-4">
            <Button onClick={resetAllProgress} className="btn-ghost px-6 py-2 text-sm">
              Reset All Declension Progress
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D14] text-[#F1F3F8] py-8">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/practice" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">← Back to Practice</Link>
          <div className="flex items-center gap-4">
            <div className="font-mono text-sm text-[var(--muted)]">
              {score} correct / {remaining.length} left • Bank: <span className="text-[var(--accent-light)]">{bankCount}</span>
            </div>
          </div>
        </div>

        <div className="practice-card p-8">
          <div className="text-xs tracking-[2px] text-[var(--accent-light)] mb-1">DECLENSIONS • CASES (N/A/D/G)</div>
          <div className="text-2xl font-semibold tracking-tight mb-2">Choose the correct form</div>
          <div className="text-[var(--muted)] mb-6 text-lg">{currentQ!.sentence}</div>

          <div className="grid grid-cols-1 gap-3">
            {currentQ!.options.map((opt, idx) => {
              const isCorrect = opt === currentQ!.correct;
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
              <motion.div 
                className={`feedback mt-4 ${selected === currentQ!.correct ? 'correct' : 'wrong'}`} 
                initial={{opacity:0,y:10}} 
                animate={{opacity:1,y:0}}
              >
                {selected === currentQ!.correct ? (
                  <>
                    Correct! +12–18 XP
                    <div className="mt-2 text-sm opacity-90">
                      <strong>{currentQ!.case}</strong> — {currentQ!.explanation}
                    </div>
                    <div className="text-xs mt-1 opacity-70">Topic: {currentQ!.topic}</div>
                  </>
                ) : (
                  <>
                    Correct answer: <strong>{currentQ!.correct}</strong>
                    <div className="mt-1 text-sm opacity-90">{currentQ!.explanation}</div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={next} disabled={!isAnswered} className="btn-primary px-8 py-3 disabled:opacity-50">
            {isAnswered && selected === currentQ!.correct ? "Continue (no repeat)" : "Continue"}
          </Button>
        </div>

        <div className="mt-4 text-center">
          <Link href="/resources" className="text-sm text-[var(--accent-light)] hover:underline">
            Need a quick reference? Check the official exam resources →
          </Link>
        </div>
      </div>
    </div>
  );
}
