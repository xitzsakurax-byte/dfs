'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PenLine, Wrench, Zap, ChevronLeft, Trophy, Flame, RotateCcw } from 'lucide-react';
import { declensionItems } from '@/lib/data/declensions';
import { addToBankMastered, awardXp, logDailyActivity, logPerformance } from '@/lib/progress';
import { resetCombo, addToSRS, incrementCombo, getComboMultiplier, getCurrentCombo } from '@/lib/gamification';
import AppNav from '@/components/AppNav';
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

const baseDeclensionItems: GameItem[] = declensionItems.map(item => ({
  sentence: item.sentence,
  correct: item.correct,
  base: item.base,
  explanation: item.explanation,
  case: item.case,
}));

const fixErrorItems: GameItem[] = [
  {
    sentence: 'Ich gehe in der Park jeden Tag.',
    correct: 'Ich gehe in den Park jeden Tag.',
    wrongSentence: 'Ich gehe in der Park jeden Tag.',
    explanation: 'Bewegung in etwas hinein → Akkusativ (in + Akk).',
  },
  {
    sentence: 'Er hilft der Kollege mit dem Projekt.',
    correct: 'Er hilft dem Kollegen mit dem Projekt.',
    wrongSentence: 'Er hilft der Kollege mit dem Projekt.',
    explanation: 'helfen + Dativ (dem Kollegen).',
  },
  {
    sentence: 'Das ist das Auto von mein Freund.',
    correct: 'Das ist das Auto meines Freundes.',
    wrongSentence: 'Das ist das Auto von mein Freund.',
    explanation: 'Genitiv für Besitz: des/meines Freundes.',
  },
  {
    sentence: 'Wir sprechen über der Lehrer.',
    correct: 'Wir sprechen über den Lehrer.',
    wrongSentence: 'Wir sprechen über der Lehrer.',
    explanation: 'über + Akkusativ.',
  },
];

function getItemsForMode(mode: GameMode): GameItem[] {
  return mode === 'fix' ? fixErrorItems : baseDeclensionItems;
}

function generateQuizOptions(item: GameItem): string[] {
  const correct = item.correct;
  const distractors = [
    correct.replace(/den|dem|der|des|die|das/g, (m) => ({ den: 'dem', dem: 'den', der: 'die', des: 'der', die: 'der', das: 'dem' }[m] || m)),
    correct.replace('in ', 'auf '),
    item.base ? item.base : correct.split(' ').slice(-2).join(' '),
    correct.split(' ').reverse().join(' '),
  ].filter(d => d && d !== correct);
  const shuffled = [...new Set([correct, ...distractors])].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}

/* Blank slots matching the answer's letters: "dem Auto" → 3 slots, gap, 4 slots.
   Gives the player the exact shape of the expected answer. */
function Blanks({ answer }: { answer: string }) {
  return (
    <span className="inline-flex items-baseline gap-3 mx-1.5 align-baseline" aria-label={`Answer with ${answer.replace(/ /g, '').length} letters`}>
      {answer.split(' ').map((word, wi) => (
        <span key={wi} className="inline-flex gap-[3px]">
          {Array.from(word).map((_, ci) => (
            <span key={ci} className="blank-slot" />
          ))}
        </span>
      ))}
    </span>
  );
}

/* Replaces the ___ placeholder with sized blanks and shows the dictionary form
   to decline (e.g. "das Auto") so the player knows which word is being asked. */
function SentenceWithBlanks({ sentence, answer, base, showBase }: {
  sentence: string; answer: string; base?: string; showBase: boolean;
}) {
  const parts = sentence.split(/_{2,}/);
  if (parts.length === 1) return <>{sentence}</>;
  return (
    <>
      {parts[0]}
      <Blanks answer={answer} />
      {parts.slice(1).join(' ')}
      {showBase && base && (
        <span className="base-hint block mt-3 text-base font-normal">
          Word to decline: <strong className="serif-accent" style={{ color: 'var(--gold-bright)' }}>{base}</strong>
        </span>
      )}
    </>
  );
}

const MODE_META: Record<GameMode, { label: string; prompt: string; Icon: typeof PenLine }> = {
  write: { label: 'Write Forms', prompt: 'Schreiben Sie die korrekte Form', Icon: PenLine },
  fix: { label: 'Fix Errors', prompt: 'Korrigieren Sie den Satz', Icon: Wrench },
  quiz: { label: 'Pop Quiz', prompt: 'Wählen Sie die richtige Antwort', Icon: Zap },
};

export default function PracticeGame() {
  const [mode, setMode] = useState<GameMode>('write');
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [combo, setCombo] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string; explanation: string } | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [xpBurst, setXpBurst] = useState<{ id: number; amount: number } | null>(null);

  /* Deck state — initialised in useEffect (never shuffle during the initial
     render: SSR prerender + client must produce identical markup). */
  const [remaining, setRemaining] = useState<GameItem[]>([]);
  const [current, setCurrent] = useState<GameItem | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);

  const startNewSession = useCallback((newMode: GameMode) => {
    const shuffled = [...getItemsForMode(newMode)].sort(() => Math.random() - 0.5);
    setMode(newMode);
    setScore(0);
    setCorrectCount(0);
    setAnsweredCount(0);
    setXpEarned(0);
    setSessionComplete(false);
    setIsAnswered(false);
    setPicked(null);
    setUserInput('');
    setFeedback(null);
    setSessionTotal(shuffled.length);
    setCombo(getCurrentCombo());
    const first = shuffled[0] ?? null;
    setRemaining(shuffled);
    setCurrent(first);
    setQuizOptions(first ? generateQuizOptions(first) : []);
  }, []);

  useEffect(() => {
    startNewSession('write');
  }, [startNewSession]);

  function pickNext(newRemaining: GameItem[]) {
    if (newRemaining.length === 0) {
      setSessionComplete(true);
      setCurrent(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * newRemaining.length);
    const next = newRemaining[randomIndex];
    setCurrent(next);
    setQuizOptions(generateQuizOptions(next));
    setUserInput('');
    setPicked(null);
    setIsAnswered(false);
    setFeedback(null);
  }

  /* Single grading path for every mode — keeps XP/SRS/perf logging consistent */
  function grade(isCorrect: boolean, item: GameItem, baseXp: number) {
    setAnsweredCount(a => a + 1);

    if (isCorrect) {
      const chain = incrementCombo();
      setCombo(chain);
      const mult = getComboMultiplier(chain);
      const xp = Math.round(baseXp * mult);

      setCorrectCount(c => c + 1);
      setScore(s => s + xp);
      setXpEarned(x => x + xp);
      awardXp(xp);
      logDailyActivity(1, xp, 0);
      if (item.base) addToBankMastered(item.base);
      logPerformance('case-practice', item.case || 'general', true);

      setXpBurst({ id: Date.now(), amount: xp });
      setFeedback({
        correct: true,
        message: mult > 1 ? `Richtig! +${xp} XP (${mult}× combo)` : `Richtig! +${xp} XP`,
        explanation: item.explanation,
      });
    } else {
      resetCombo();
      setCombo(0);
      addToSRS(item.base || item.correct, 'game');
      logPerformance('case-practice', item.case || 'general', false);
      setFeedback({
        correct: false,
        message: `Not quite. Correct: ${item.correct}`,
        explanation: item.explanation,
      });
    }
    setIsAnswered(true);
  }

  function handleSubmit() {
    if (!current || !userInput.trim() || isAnswered) return;
    // NFC-normalize both sides: umlauts can arrive decomposed (a + ̈ )
    // depending on keyboard/IME, which would fail a raw string compare.
    const given = userInput.trim().toLowerCase().normalize('NFC');
    const wanted = current.correct.toLowerCase().normalize('NFC');
    grade(given === wanted, current, 10);
  }

  function handleQuizPick(opt: string) {
    if (!current || isAnswered) return;
    setPicked(opt);
    grade(opt === current.correct, current, 8);
  }

  function handleNext() {
    if (!current) return;
    const newRemaining = remaining.filter(item => item !== current);
    setRemaining(newRemaining);
    pickNext(newRemaining);
  }

  function handleSkip() {
    handleNext();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !isAnswered) handleSubmit();
    else if (e.key === 'Enter' && isAnswered) handleNext();
  }

  const progress = sessionTotal > 0 ? ((sessionTotal - remaining.length) / sessionTotal) * 100 : 0;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const comboMult = getComboMultiplier(combo);
  const meta = MODE_META[mode];

  return (
    <div className="min-h-screen pb-24 text-[var(--text)]" style={{ background: 'var(--bg)' }}>
      <AppNav
        right={
          combo >= 3 ? (
            <span className="combo-badge inline-flex items-center gap-1.5">
              <Zap size={12} strokeWidth={2.6} /> {combo}× chain
            </span>
          ) : (
            <span style={{ color: 'var(--muted)' }}>Anh Kiet</span>
          )
        }
      />

      <div className="pt-24 max-w-3xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-7">
          <Link href="/practice" className="inline-flex items-center gap-1 text-sm mb-3 hover:underline" style={{ color: 'var(--muted)' }}>
            <ChevronLeft size={15} /> Practice hub
          </Link>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="eyebrow eyebrow-rule mb-2">Interactive · Cases &amp; Grammar</div>
              <h1 className="display-lg">
                The <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>Game.</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Mode selector */}
        <div className="flex gap-1.5 p-1.5 rounded-2xl mb-6"
          style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}>
          {(Object.keys(MODE_META) as GameMode[]).map((m) => {
            const M = MODE_META[m];
            const active = mode === m;
            return (
              <button
                key={m}
                onClick={() => startNewSession(m)}
                className="relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors min-h-[44px]"
                style={{ color: active ? '#07090F' : 'var(--text-2)' }}
              >
                {active && (
                  <motion.span
                    layoutId="mode-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, var(--gold-bright), var(--gold-warm))', boxShadow: '0 0 18px var(--gold-glow-strong)' }}
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <M.Icon size={15} />
                  <span className="hidden sm:inline">{M.label}</span>
                  <span className="sm:hidden">{M.label.split(' ')[0]}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* HUD */}
        <div className="grid grid-cols-3 gap-3 mb-2.5">
          {[
            { label: 'Score', value: score, icon: <Trophy size={13} /> },
            { label: 'Chain', value: combo > 0 ? `${combo}× (${comboMult}× XP)` : '—', icon: <Flame size={13} /> },
            { label: 'Session XP', value: `+${xpEarned}`, icon: <Zap size={13} /> },
          ].map((h, i) => (
            <div key={i} className="glass-card-static px-4 py-3 flex items-center gap-2.5">
              <span style={{ color: 'var(--gold)' }}>{h.icon}</span>
              <div className="min-w-0">
                <div className="text-[10px] font-bold tracking-[0.14em] uppercase" style={{ color: 'var(--muted)' }}>{h.label}</div>
                <div className="text-sm font-black tabular-nums truncate">{h.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Session progress */}
        <div className="xp-bar-track mb-6" style={{ height: 4 }}>
          <div className="xp-bar" style={{ width: `${progress}%`, height: '100%' }} />
        </div>

        {/* Main game area */}
        {!sessionComplete && current ? (
          <motion.div
            key={`${mode}-${current.sentence}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`forge-panel forge-panel-glow relative p-7 sm:p-9 ${feedback && !feedback.correct ? 'shake' : ''} ${feedback?.correct ? 'correct-pulse' : ''}`}
          >
            {/* floating XP chip */}
            <AnimatePresence>
              {xpBurst && feedback?.correct && (
                <div key={xpBurst.id} className="xp-float absolute top-5 right-6 text-lg font-black" style={{ color: 'var(--gold-bright)' }}>
                  +{xpBurst.amount} XP
                </div>
              )}
            </AnimatePresence>

            <div className="eyebrow mb-3">{meta.prompt}</div>

            <div className="text-xl sm:text-2xl font-semibold leading-snug mb-8" lang="de">
              <SentenceWithBlanks
                sentence={current.sentence}
                answer={current.correct}
                base={current.base}
                showBase={mode === 'write'}
              />
            </div>

            {/* Input modes */}
            {(mode === 'write' || mode === 'fix') && (
              <div className="mb-6">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={mode === 'write' ? 'Type the full correct phrase…' : 'Type the corrected sentence…'}
                  className="w-full p-4 text-lg rounded-xl outline-none transition-colors"
                  style={{
                    background: 'var(--bg-2)',
                    border: `1px solid ${isAnswered ? (feedback?.correct ? 'var(--green)' : 'var(--red)') : 'var(--line-2)'}`,
                    color: 'var(--text)',
                  }}
                  disabled={isAnswered}
                  autoFocus
                  lang="de"
                />
              </div>
            )}

            {/* Quiz mode */}
            {mode === 'quiz' && (
              <div className="grid grid-cols-1 gap-3 mb-6">
                {quizOptions.map((opt, idx) => {
                  const isCorrectOpt = opt === current.correct;
                  const cls = isAnswered
                    ? isCorrectOpt ? 'quiz-option correct' : (picked === opt ? 'quiz-option wrong' : 'quiz-option')
                    : 'quiz-option';
                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizPick(opt)}
                      disabled={isAnswered}
                      className={cls}
                      lang="de"
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-black flex-shrink-0"
                          style={{ background: 'var(--surface-3)', color: 'var(--muted)' }}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {!isAnswered ? (
                <>
                  {(mode === 'write' || mode === 'fix') && (
                    <button
                      onClick={handleSubmit}
                      disabled={!userInput.trim()}
                      className="btn-primary px-8 py-3 disabled:opacity-40"
                    >
                      Submit Answer
                    </button>
                  )}
                  <button onClick={handleSkip} className="btn-ghost px-6 py-3">
                    Skip for Now
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleNext} className="btn-primary px-8 py-3" autoFocus>
                    Next Question →
                  </button>
                  <button onClick={() => startNewSession(mode)} className="btn-ghost px-6 py-3 inline-flex items-center gap-2">
                    <RotateCcw size={14} /> Restart
                  </button>
                </>
              )}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`feedback mt-6 ${feedback.correct ? 'correct' : 'wrong'}`}
                >
                  <div className="font-bold mb-1.5" style={{ color: feedback.correct ? 'var(--green)' : 'var(--red)' }}>
                    {feedback.message}
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }} lang="de">
                    {feedback.explanation}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : sessionComplete ? (
          /* End screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="forge-panel forge-panel-glow p-8 sm:p-10 text-center"
          >
            <div className="eyebrow mb-4">Session complete</div>
            <div className="display-lg mb-1">
              <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>Sehr gut,</span> Anh Kiet.
            </div>

            <div className="flex items-center justify-center gap-8 sm:gap-12 my-8 flex-wrap">
              <div>
                <div className="text-4xl sm:text-5xl font-black gradient-text tabular-nums">+{score}</div>
                <div className="text-xs mt-1 font-semibold tracking-wide" style={{ color: 'var(--muted)' }}>POINTS</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black gradient-text tabular-nums">{accuracy}%</div>
                <div className="text-xs mt-1 font-semibold tracking-wide" style={{ color: 'var(--muted)' }}>ACCURACY</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-black gradient-text tabular-nums">{xpEarned}</div>
                <div className="text-xs mt-1 font-semibold tracking-wide" style={{ color: 'var(--muted)' }}>XP EARNED</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => startNewSession(mode)} className="btn-primary px-8 py-3">
                Play Again
              </button>
              <Link href="/practice" className="btn-ghost px-8 py-3 inline-flex items-center justify-center">
                Back to Practice
              </Link>
              <Link href="/dashboard" className="btn-ghost px-8 py-3 inline-flex items-center justify-center">
                See Progress
              </Link>
            </div>

            <div className="mt-7 text-xs" style={{ color: 'var(--muted)' }}>
              Progress saved to your bank and daily stats. Keep the streak going.
            </div>
          </motion.div>
        ) : (
          <div className="forge-panel p-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
            Preparing session…
          </div>
        )}

        <div className="mt-8 text-xs text-center" style={{ color: 'var(--muted)' }}>
          Real exam-style sentences · no repeats per session · wrong answers feed your SRS review queue.
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
