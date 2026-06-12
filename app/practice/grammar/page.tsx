'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// B1–C1 Grammar: Advanced structures (Konjunktiv II, passive, relative clauses, word order)
const questions = [
  { 
    q: "Wenn ich mehr Zeit ___ (haben), ___ ich nach Berlin reisen.", 
    en: "If I had more time, I would travel to Berlin.", 
    options: ["hätte / würde", "habe / werde", "hatte / reise", "hätte / reise"], 
    correct: "hätte / würde", 
    hint: "Konjunktiv II for hypothetical situations" 
  },
  { 
    q: "Das Projekt ___ (müssen / abschließen) werden.", 
    en: "The project must be completed.", 
    options: ["muss abgeschlossen", "müssen abgeschlossen", "muss abschließen", "müssen abschließen"], 
    correct: "muss abgeschlossen", 
    hint: "Passive voice with modal verb" 
  },
  { 
    q: "Der Mann, ___ ich gestern getroffen habe, ist mein Professor.", 
    en: "The man whom I met yesterday is my professor.", 
    options: ["den", "der", "dem", "dessen"], 
    correct: "den", 
    hint: "Relative pronoun in accusative (direct object)" 
  },
  { 
    q: "Es ___ (werden / sagen), dass die Wirtschaft sich erholt.", 
    en: "It is said that the economy is recovering.", 
    options: ["wird gesagt", "werden gesagt", "sagt", "gesagt wird"], 
    correct: "wird gesagt", 
    hint: "Impersonal passive construction" 
  },
  { 
    q: "Hätte er die Prüfung bestanden, ___ er das Stipendium bekommen.", 
    en: "Had he passed the exam, he would have received the scholarship.", 
    options: ["hätte / würde", "hätte / hätte", "hat / hat", "würde / würde"], 
    correct: "hätte / hätte", 
    hint: "Past unreal conditional (Konjunktiv II)" 
  },
  { 
    q: "Die Studierenden, ___ die Vorlesung besucht hatten, bestanden die Klausur.", 
    en: "The students who had attended the lecture passed the exam.", 
    options: ["die", "deren", "denen", "welche"], 
    correct: "die", 
    hint: "Relative pronoun referring to people (nominative plural)" 
  },
];

export default function GrammarQuiz() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selected, setSelected] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const q = questions[current];
  const progress = ((current + (isAnswered ? 1 : 0)) / questions.length) * 100;

  // Shuffle options for better quiz experience
  const currentOptions = useMemo(() => {
    return [...q.options].sort(() => Math.random() - 0.5);
  }, [current]);

  function choose(option: string) {
    if (isAnswered) return;
    setSelected(option);
    setIsAnswered(true);

    const correct = option === q.correct;
    if (correct) {
      const points = 18 + Math.floor(Math.random() * 5);
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
        <h1 className="text-6xl font-black tracking-tighter mb-2">Nice work!</h1>
        <div className="text-3xl font-bold mb-6">You got {score} out of {questions.length} correct ({percent}%)</div>

        <div className="bg-white rounded-3xl p-8 border-4 border-[#1cb0f6] mb-8">
          <div className="text-6xl font-black text-[#1cb0f6] mb-1">+{earnedXP} XP</div>
          <div className="font-bold">Grammar is getting stronger!</div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={restart} className="px-8 py-3 rounded-2xl font-semibold bg-[#3D5A5B] text-white hover:bg-[#8B6F47]">Play again</Button>
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
      <div className="flex items-center justify-between mb-6">
        <Link href="/practice" className="font-bold text-[#1cb0f6]">← Back</Link>
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`heart text-3xl ${i >= hearts ? 'lost' : ''}`}>❤️</span>
            ))}
          </div>
          <div className="font-black text-xl tabular-nums">{score}/{questions.length}</div>
        </div>
      </div>

      <div className="flex gap-1.5 mb-6">
        {questions.map((_, i) => (
          <div key={i} className={`progress-pill flex-1 ${i < current ? 'bg-[#1cb0f6]' : i === current ? 'bg-[#1cb0f6]/40' : ''}`}>
            <div className="fill" style={{ width: i < current ? '100%' : i === current ? `${progress - (current / questions.length * 100)}%` : '0%' }} />
          </div>
        ))}
      </div>

      <div className="question-box">
        <div className="text-xs tracking-[2px] text-[#8B6F47] mb-1">COMPLEX GRAMMAR</div>
        
        <div className="question-text">{q.q}</div>
        <div className="text-center text-[#6B6B6B] text-lg mb-6">{q.en}</div>

        <div className="grid grid-cols-2 gap-3">
          {currentOptions.map((opt, idx) => {
            const isCorrect = opt === q.correct;
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
              className={`feedback ${selected === q.correct ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {selected === q.correct ? `Perfect! +18 XP` : `Correct: ${q.correct} — ${q.hint}`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-end">
        <Button 
          onClick={next} 
          disabled={!isAnswered}
          className="duo-cta px-12 disabled:opacity-40 bg-[#1cb0f6] hover:bg-[#0d9de0]"
        >
          {current + 1 === questions.length ? "Finish" : "Next question"}
        </Button>
      </div>
    </div>
  );
}
