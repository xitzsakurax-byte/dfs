'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { declensionItems, DeclensionItem } from '@/lib/data/declensions';
import { addToBankMastered, awardXp, logDailyActivity, logPerformance } from '@/lib/progress';
import MobileBottomNav from '@/components/MobileBottomNav';

type GameMode = 'write' | 'fix' | 'quiz';

type GameItem = {
  sentence: string;
  correct: string;
  base?: string;
  explanation: string;
  case?: string;
  wrongSentence?: string; // for fix mode
};

export default function PracticeGame() {
  // Build game items from declensions + some fix-error examples (grammar structures) - BEFORE state that uses them
  const baseDeclensionItems: GameItem[] = declensionItems.map(item => ({
    sentence: item.sentence,
    correct: item.correct,
    base: item.base,
    explanation: item.explanation,
    case: item.case,
  }));

  const fixErrorItems: GameItem[] = [
    {
      sentence: "Ich gehe in der Park jeden Tag.",
      correct: "Ich gehe in den Park jeden Tag.",
      wrongSentence: "Ich gehe in der Park jeden Tag.",
      explanation: "Bewegung in etwas hinein → Akkusativ (in + Akk).",
    },
    {
      sentence: "Er hilft der Kollege mit dem Projekt.",
      correct: "Er hilft dem Kollegen mit dem Projekt.",
      wrongSentence: "Er hilft der Kollege mit dem Projekt.",
      explanation: "helfen + Dativ (dem Kollegen).",
    },
    {
      sentence: "Das ist das Auto von mein Freund.",
      correct: "Das ist das Auto meines Freundes.",
      wrongSentence: "Das ist das Auto von mein Freund.",
      explanation: "Genitiv für Besitz: des/meines Freundes.",
    },
    {
      sentence: "Wir sprechen über der Lehrer.",
      correct: "Wir sprechen über den Lehrer.",
      wrongSentence: "Wir sprechen über der Lehrer.",
      explanation: "über + Akkusativ.",
    },
  ];

  const allGameItems = [...baseDeclensionItems, ...fixErrorItems];

  function generateQuizOptions(item: GameItem): string[] {
    const correct = item.correct;
    const distractors = [
      correct.replace(/den|dem|der|des|die|das/g, (m) => ({den:'dem',dem:'den',der:'die',des:'der',die:'der',das:'dem'}[m] || m)),
      correct.replace('in ', 'auf '),
      item.base ? item.base : correct.split(' ').slice(-2).join(' '),
      correct.split(' ').reverse().join(' ')
    ].filter(d => d && d !== correct);
    // Shuffle and take 3 unique
    const shuffled = [...new Set([correct, ...distractors])].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }

  function getItemsForMode(currentMode: GameMode): GameItem[] {
    if (currentMode === 'fix') {
      return fixErrorItems;
    }
    return baseDeclensionItems;
  }

  const [mode, setMode] = useState<GameMode>('write');
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string; explanation: string } | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);

  // Initialize with first session immediately so content and buttons show right away (fixes loading stuck)
  const [remaining, setRemaining] = useState<GameItem[]>(() => {
    const items = getItemsForMode('write');
    return [...items].sort(() => Math.random() - 0.5);
  });
  const [current, setCurrent] = useState<GameItem | null>(() => {
    const items = getItemsForMode('write');
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    return shuffled[0] || null;
  });

  function startNewSession(newMode: GameMode) {
    const items = getItemsForMode(newMode);
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setMode(newMode);
    setRemaining(shuffled);
    setScore(0);
    setTotalAnswered(0);
    setXpEarned(0);
    setSessionComplete(false);
    setIsAnswered(false);
    setUserInput('');
    setFeedback(null);
    pickNext(shuffled);
  }

  function pickNext(newRemaining: GameItem[]) {
    if (newRemaining.length === 0) {
      setSessionComplete(true);
      setCurrent(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * newRemaining.length);
    setCurrent(newRemaining[randomIndex]);
    setUserInput('');
    setIsAnswered(false);
    setFeedback(null);
  }

  function handleSubmit() {
    if (!current || !userInput.trim() || isAnswered) return;

    const userAnswer = userInput.trim();
    const isCorrect = userAnswer.toLowerCase() === current.correct.toLowerCase();

    let message = '';
    if (isCorrect) {
      message = 'Correct!';
      const points = 10 + Math.floor(Math.random() * 6); // 10-15 points per correct
      setScore((s) => s + points);
      setTotalAnswered((t) => t + 1);

      // Reward system: XP + daily tracking
      const xp = 10;
      awardXp(xp);
      logDailyActivity(1, xp, 0); // 1 word/activity, xp, 0 sessions for this
      setXpEarned((x) => x + xp);

      // Master the base word if available (for bank integration)
      if (current.base) {
        addToBankMastered(current.base);
      }

      // Log for dashboard analysis (strong/weak points)
      logPerformance('case-practice', current.case || 'general', true);
    } else {
      message = `Not quite. The correct form is: ${current.correct}`;
    }

    setFeedback({
      correct: isCorrect,
      message,
      explanation: current.explanation,
    });
    setIsAnswered(true);
  }

  function handleNext() {
    if (!current) return;

    // Remove from remaining (no repeat after answer, as per global rule)
    const newRemaining = remaining.filter(item => item !== current);
    setRemaining(newRemaining);
    pickNext(newRemaining);
  }

  function handleSkip() {
    if (!current) return;
    const newRemaining = remaining.filter(item => item !== current);
    setRemaining(newRemaining);
    pickNext(newRemaining);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !isAnswered) {
      handleSubmit();
    } else if (e.key === 'Enter' && isAnswered) {
      handleNext();
    }
  }

  function resetSession() {
    startNewSession(mode);
  }

  // Note: initial state now starts the session immediately so buttons and content are there on load. 
  // The old useEffect was removed to prevent any stuck loading state.

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-8">
      <div className="container max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[var(--accent-light)] text-xs tracking-[2px]">INTERACTIVE • CASE &amp; GRAMMAR</div>
            <h1 className="text-4xl font-semibold tracking-tight">Practice Game</h1>
          </div>
          <Link href="/practice" className="text-sm text-[var(--muted)] hover:text-[#EDEEF2]">← Back to Practice</Link>
        </div>

        {/* Mode selector - clean professional tabs, no icons */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[var(--line)] pb-4">
          {(['write', 'fix', 'quiz'] as GameMode[]).map((m) => (
            <button
              key={m}
              onClick={() => startNewSession(m)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all border ${
                mode === m 
                  ? 'bg-[#8B1E3D] text-white border-[#8B1E3D]' 
                  : 'border-[var(--line)] hover:border-[#8B1E3D] text-[#C5CAD6]'
              }`}
            >
              {m === 'write' && 'Form schreiben'}
              {m === 'fix' && 'Fehler korrigieren'}
              {m === 'quiz' && 'Pop-Quiz'}
            </button>
          ))}
        </div>

        {/* Session stats with rewards */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <div className="px-4 py-1 rounded-full bg-[#171A21] border border-[var(--line)]">
            Score: <span className="font-semibold text-[var(--gold)]">{score}</span>
          </div>
          <div className="px-4 py-1 rounded-full bg-[#171A21] border border-[var(--line)]">
            Answered: {totalAnswered}
          </div>
          <div className="px-4 py-1 rounded-full bg-[#171A21] border border-[var(--line)]">
            +{xpEarned} XP this session
          </div>
        </div>

        {/* Main game area */}
        {!sessionComplete && current ? (
          <div className="practice-card p-8">
            <div className="text-xs tracking-[2px] text-[#8B1E3D] mb-2">
              {mode === 'write' && 'SCHREIBEN SIE DIE KORREKTE FORM'}
              {mode === 'fix' && 'KORRIGIEREN SIE DIE GRAMMATIKSTRUKTUR'}
              {mode === 'quiz' && 'SCHNELL-QUIZ — KURZE ANTWORT'}
            </div>

            <div className="text-xl sm:text-2xl font-medium leading-snug mb-8">
              {current.sentence}
            </div>

            {/* Input or options based on mode */}
            {(mode === 'write' || mode === 'fix') && (
              <div className="mb-6">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={mode === 'write' ? "Type the full correct phrase..." : "Type the corrected sentence..."}
                  className="w-full p-4 text-lg rounded-xl bg-[#0A0C12] border border-[var(--line)] focus:border-[#8B1E3D] outline-none placeholder:text-[#64748b]"
                  disabled={isAnswered}
                />
              </div>
            )}

            {/* Pop quiz - proper MCQ with good distractors */}
            {mode === 'quiz' && current && (
              <div className="grid grid-cols-1 gap-3 mb-6">
                {generateQuizOptions(current).map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const isCorrect = opt === current.correct;
                      setUserInput(opt);
                      setFeedback({
                        correct: isCorrect,
                        message: isCorrect ? 'Correct!' : `Correct was: ${current.correct}`,
                        explanation: current.explanation,
                      });
                      setIsAnswered(true);
                      if (isCorrect) {
                        const points = 8;
                        setScore((s) => s + points);
                        setTotalAnswered((t) => t + 1);
                        awardXp(8);
                        logDailyActivity(0, 8, 1);
                        setXpEarned((x) => x + 8);
                        logPerformance('case-practice', current.case || 'general', true);
                      }
                    }}
                    disabled={isAnswered}
                    className="text-left p-4 rounded-xl border border-[var(--line)] hover:border-[#8B1E3D] bg-[#0A0C12] disabled:opacity-70 active:bg-[#111418] transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Action buttons - all text, professional */}
            <div className="flex flex-wrap gap-3">
              {!isAnswered ? (
                <>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!userInput.trim()}
                    className="btn-primary px-8 py-3"
                  >
                    Submit Answer
                  </Button>
                  <Button onClick={handleSkip} variant="outline" className="px-6 py-3">
                    Skip for Now
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleNext} className="btn-primary px-8 py-3">
                    Next Question
                  </Button>
                  <Button onClick={resetSession} variant="outline" className="px-6 py-3">
                    End Session
                  </Button>
                </>
              )}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-5 rounded-xl border ${feedback.correct ? 'border-[#4ade80] bg-[#0a2a1f]' : 'border-[#f87171] bg-[#2a0a0a]'}`}
                >
                  <div className={`font-medium mb-2 ${feedback.correct ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>
                    {feedback.message}
                  </div>
                  <div className="text-[#C5CAD6] text-sm leading-relaxed">
                    {feedback.explanation}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : sessionComplete ? (
          /* End screen with rewards */
          <div className="practice-card p-8 text-center">
            <div className="text-2xl font-semibold tracking-tight mb-2">Session Complete</div>
            <div className="text-5xl font-semibold text-[var(--gold)] mb-1">+{score} points</div>
            <div className="text-[var(--text-2)] mb-6">You earned {xpEarned} XP this round</div>

            <div className="flex flex-wrap gap-3 justify-center">
              <Button onClick={() => startNewSession(mode)} className="btn-primary px-8 py-3">
                Play Again
              </Button>
              <Button asChild variant="outline" className="px-8 py-3">
                <Link href="/practice">Back to Practice</Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-3">
                <Link href="/dashboard">See Progress</Link>
              </Button>
            </div>

            <div className="mt-6 text-xs text-[var(--muted)]">
              Progress saved to your bank and daily stats. Keep the streak going.
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-[var(--text-2)]">Loading practice items...</div>
        )}

        <div className="mt-8 text-xs text-center text-[var(--muted)]">
          All answers use real exam-style sentences. No repeats in a session. Points and XP feed your overall progress.
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
