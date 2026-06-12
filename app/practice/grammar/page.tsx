'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  { q: "Wenn ich mehr Zeit ___ (haben), ___ ich nach Berlin reisen.", en: "If I had more time, I would travel to Berlin.", options: ["hätte / würde", "habe / werde", "hatte / reise", "hätte / reise"], correct: "hätte / würde", hint: "Konjunktiv II for hypothetical" },
  { q: "Das Projekt ___ (müssen / abschließen) werden.", en: "The project must be completed.", options: ["muss abgeschlossen", "müssen abgeschlossen", "muss abschließen", "müssen abschließen"], correct: "muss abgeschlossen", hint: "Passive with modal" },
  { q: "Der Mann, ___ ich gestern getroffen habe, ist mein Professor.", en: "The man whom I met yesterday is my professor.", options: ["den", "der", "dem", "dessen"], correct: "den", hint: "Relative pronoun accusative" },
  { q: "Es ___ (werden / sagen), dass die Wirtschaft sich erholt.", en: "It is said that the economy is recovering.", options: ["wird gesagt", "werden gesagt", "sagt", "gesagt wird"], correct: "wird gesagt", hint: "Impersonal passive" },
  { q: "Hätte er die Prüfung bestanden, ___ er das Stipendium bekommen.", en: "Had he passed the exam, he would have received the scholarship.", options: ["hätte / hätte", "hätte / würde", "hat / hat", "würde / würde"], correct: "hätte / hätte", hint: "Past unreal conditional" },
  { q: "Die Studierenden, ___ die Vorlesung besucht hatten, bestanden die Klausur.", en: "The students who had attended the lecture passed the exam.", options: ["die", "deren", "denen", "welche"], correct: "die", hint: "Relative pronoun nominative plural" },
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

  const currentOptions = useMemo(() => [...q.options].sort(() => Math.random() - 0.5), [current]);

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
    if (current + 1 >= questions.length) setFinished(true);
    else {
      setCurrent(c => c + 1);
      setSelected(null);
      setIsAnswered(false);
    }
  }

  function restart() {
    setCurrent(0); setScore(0); setHearts(5); setSelected(null); setIsAnswered(false); setFinished(false); setEarnedXP(0);
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-semibold tracking-tight mb-2">Tốt lắm!</h1>
          <div className="text-xl mb-6">Bạn đúng {score}/{questions.length} câu ({Math.round((score/questions.length)*100)}%)</div>
          <div className="practice-card p-8 mb-6">
            <div className="text-5xl font-bold text-[#F4C430] mb-1">+{earnedXP} XP</div>
            <div>Cấu trúc ngày càng vững!</div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={restart} className="btn-primary px-8 py-3">Làm lại</Button>
            <Button asChild className="btn-ghost px-8 py-3">
              <Link href="/dashboard">Về Dashboard</Link>
            </Button>
          </div>
          {hearts === 0 && <div className="mt-4 text-[#ff8a8a]">Hết tim. Cẩn thận lần sau!</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-8">
      <div className="container max-w-2xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <Link href="/practice" className="text-sm text-[#A8B3C7] hover:text-[#F5F7FA]">← Quay lại</Link>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-2xl">{Array.from({ length: 5 }).map((_, i) => <span key={i} className={i >= hearts ? 'opacity-30' : ''}>❤️</span>)}</div>
            <div className="font-mono text-sm">{score}/{questions.length}</div>
          </div>
        </div>

        <div className="practice-card p-8">
          <div className="text-xs tracking-[2px] text-[#F4C430] mb-1">CẤU TRÚC PHỨC TẠP B1-C1</div>
          <div className="text-3xl font-semibold tracking-tight mb-2">{q.q}</div>
          <div className="text-[#A8B3C7] mb-6">{q.en}</div>

          <div className="grid grid-cols-2 gap-3">
            {currentOptions.map((opt, idx) => {
              const isCorrect = opt === q.correct;
              let cls = "quiz-option w-full text-left";
              if (isAnswered) {
                if (isCorrect) cls += " correct";
                else if (selected === opt) cls += " wrong";
              }
              return (
                <button key={idx} onClick={() => choose(opt)} disabled={isAnswered} className={cls}>
                  {opt}{isAnswered && isCorrect && " ✓"}{isAnswered && selected === opt && !isCorrect && " ✗"}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div className={`feedback mt-4 ${selected === q.correct ? 'correct' : 'wrong'}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
                {selected === q.correct ? "Đúng! +18 XP" : `Đáp án: ${q.correct} — ${q.hint}`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={next} disabled={!isAnswered} className="btn-primary px-8 py-3 disabled:opacity-50">
            {current + 1 === questions.length ? "Hoàn thành" : "Tiếp tục"}
          </Button>
        </div>
      </div>
    </div>
  );
}
