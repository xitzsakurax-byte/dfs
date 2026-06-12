'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Proper quiz data: German → English translation
const questions = [
  { de: "der Tisch", en: "the table", options: ["the table", "the chair", "the bed", "the door"] },
  { de: "das Haus", en: "the house", options: ["the house", "the car", "the school", "the garden"] },
  { de: "die Katze", en: "the cat", options: ["the dog", "the cat", "the bird", "the fish"] },
  { de: "essen", en: "to eat", options: ["to drink", "to eat", "to sleep", "to run"] },
  { de: "trinken", en: "to drink", options: ["to eat", "to drink", "to cook", "to buy"] },
  { de: "der Apfel", en: "the apple", options: ["the banana", "the apple", "the orange", "the grape"] },
  { de: "freundlich", en: "friendly", options: ["friendly", "angry", "tired", "happy"] },
  { de: "die Arbeit", en: "the work / job", options: ["the work / job", "the school", "the money", "the time"] },
  { de: "sprechen", en: "to speak", options: ["to listen", "to speak", "to write", "to read"] },
  { de: "gut", en: "good", options: ["good", "bad", "big", "small"] },
];

export default function VocabQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const q = questions[current];
  const progress = ((current + (isAnswered ? 1 : 0)) / questions.length) * 100;

  // Shuffle options so correct answer isn't always in the same spot
  const currentOptions = useMemo(() => {
    return [...q.options].sort(() => Math.random() - 0.5);
  }, [current]);

  function choose(option: string) {
    if (isAnswered) return;

    setSelected(option);
    setIsAnswered(true);

    const correct = option === q.en;
    if (correct) {
      const points = 15 + Math.floor(Math.random() * 6); // 15-20 XP
      setScore(s => s + 1);
      setEarnedXP(e => e + points);
    } else {
      setHearts(h => Math.max(0, h - 1));
    }
  }

  function next() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setIsAnswered(false);
    }
  }

  function restart() {
    setCurrent(0);
    setScore(0);
    setHearts(5);
    setSelected(null);
    setIsAnswered(false);
    setFinished(false);
    setEarnedXP(0);
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    const finalXP = earnedXP;

    return (
      <div className="max-w-xl mx-auto py-10 text-center">
        <motion.div 
          className="text-7xl mb-4"
          initial={{ scale: 0.5, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          🎉
        </motion.div>
        <h1 className="text-6xl font-black tracking-tighter mb-2">Great job!</h1>
        <div className="text-3xl font-bold mb-6">You got {score} out of {questions.length} correct</div>

        <div className="bg-white rounded-3xl p-8 border-4 border-[#58cc02] mb-8">
          <div className="text-6xl font-black text-[#58cc02] mb-1">+{finalXP} XP</div>
          <div className="font-bold">and your streak is still alive!</div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={restart} className="duo-cta px-10">Play again</Button>
          <Button asChild variant="outline" className="px-10 rounded-3xl text-xl font-bold">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>

        {hearts === 0 && <div className="mt-6 text-[#ff4b4b] font-bold">You ran out of hearts. Be more careful next time!</div>}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/practice" className="font-bold text-[#58cc02]">← Back</Link>
        <div className="flex items-center gap-4">
          {/* Hearts */}
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`heart text-3xl ${i >= hearts ? 'lost' : ''}`}>❤️</span>
            ))}
          </div>
          <div className="font-black text-xl tabular-nums">{score}/{questions.length}</div>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1.5 mb-6">
        {questions.map((_, i) => (
          <div key={i} className={`progress-pill flex-1 ${i < current ? 'bg-[#58cc02]' : i === current ? 'bg-[#58cc02]/40' : ''}`}>
            <div className="fill" style={{ width: i < current ? '100%' : i === current ? `${progress - (current / questions.length * 100)}%` : '0%' }} />
          </div>
        ))}
      </div>

      <div className="question-box">
        <div className="text-sm font-black tracking-[3px] text-[#58cc02] mb-2">TRANSLATE THIS</div>
        
        <div className="question-text">{q.de}</div>
        
        <div className="text-[#64748b] text-center mb-8 text-xl">What does this mean in English?</div>

        <div>
          {currentOptions.map((opt, idx) => {
            const isCorrect = opt === q.en;
            let className = "quiz-option";

            if (isAnswered) {
              if (isCorrect) className += " correct";
              else if (selected === opt) className += " wrong";
            }

            return (
              <motion.button
                key={idx}
                onClick={() => choose(opt)}
                disabled={isAnswered}
                className={className}
                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                whileTap={!isAnswered ? { scale: 0.985 } : {}}
                animate={isAnswered && isCorrect ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.2 }}
              >
                {opt}
                {isAnswered && isCorrect && <span className="text-2xl">✓</span>}
                {isAnswered && selected === opt && !isCorrect && <span className="text-2xl">✗</span>}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              className={`feedback ${selected === q.en ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {selected === q.en ? "Perfect! +15-20 XP" : `Correct answer: ${q.en}`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-end">
        <Button 
          onClick={next} 
          disabled={!isAnswered}
          className="duo-cta px-12 disabled:opacity-40"
        >
          {current + 1 === questions.length ? "Finish quiz" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
