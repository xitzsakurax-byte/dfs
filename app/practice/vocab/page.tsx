'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  { de: "die Nachhaltigkeit", en: "sustainability", options: ["sustainability", "pollution", "innovation", "economy"] },
  { de: "sich bewerben um", en: "to apply for (a job)", options: ["to apply for (a job)", "to reject", "to interview", "to resign"] },
  { de: "konsequent", en: "consistent / consequently", options: ["consistent / consequently", "occasionally", "randomly", "hesitantly"] },
  { de: "die Resilienz", en: "resilience", options: ["resilience", "vulnerability", "fragility", "dependence"] },
  { de: "vorausschauend", en: "forward-looking / proactive", options: ["forward-looking / proactive", "short-sighted", "reactive", "careless"] },
  { de: "der Paradigmenwechsel", en: "paradigm shift", options: ["paradigm shift", "minor adjustment", "stagnation", "repetition"] },
  { de: "ambivalent", en: "ambivalent / having mixed feelings", options: ["ambivalent / having mixed feelings", "decisive", "enthusiastic", "indifferent"] },
  { de: "die Selbstverwirklichung", en: "self-actualization", options: ["self-actualization", "conformity", "dependence", "submission"] },
  { de: "jemandem den Wind aus den Segeln nehmen", en: "to take the wind out of someone's sails", options: ["to take the wind out of someone's sails", "to encourage someone", "to ignore someone", "to praise someone"] },
  { de: "umweltbewusst", en: "environmentally conscious", options: ["environmentally conscious", "wasteful", "indifferent", "exploitative"] },
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

  const currentOptions = useMemo(() => {
    return [...q.options].sort(() => Math.random() - 0.5);
  }, [current]);

  function choose(option: string) {
    if (isAnswered) return;
    setSelected(option);
    setIsAnswered(true);
    const correct = option === q.en;
    if (correct) {
      const points = 15 + Math.floor(Math.random() * 6);
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
    return (
      <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl font-semibold tracking-tight mb-2">Tuyệt vời!</h1>
          <div className="text-xl mb-6">Bạn đúng {score}/{questions.length} câu</div>
          <div className="practice-card p-8 mb-6">
            <div className="text-5xl font-bold text-[#F4C430] mb-1">+{earnedXP} XP</div>
            <div>Streak vẫn an toàn!</div>
          </div>
          <div className="flex gap-4 justify-center">
            <Button onClick={restart} className="btn-primary px-8 py-3">Làm lại</Button>
            <Button asChild className="btn-ghost px-8 py-3">
              <Link href="/dashboard">Về Dashboard</Link>
            </Button>
          </div>
          {hearts === 0 && <div className="mt-4 text-[#ff8a8a]">Hết tim. Cẩn thận lần sau nhé!</div>}
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
            <div className="flex gap-1 text-2xl">
              {Array.from({ length: 5 }).map((_, i) => <span key={i} className={i >= hearts ? 'opacity-30' : ''}>❤️</span>)}
            </div>
            <div className="font-mono text-sm">{score}/{questions.length}</div>
          </div>
        </div>

        <div className="practice-card p-8">
          <div className="text-xs tracking-[2px] text-[#F4C430] mb-1">TỪ VỰNG B1-C1</div>
          <div className="text-4xl font-semibold tracking-tight mb-4">{q.de}</div>
          <div className="text-[#A8B3C7] mb-6">Nghĩa tiếng Anh là gì?</div>

          <div className="space-y-3">
            {currentOptions.map((opt, idx) => {
              const isCorrect = opt === q.en;
              let cls = "quiz-option w-full text-left";
              if (isAnswered) {
                if (isCorrect) cls += " correct";
                else if (selected === opt) cls += " wrong";
              }
              return (
                <button key={idx} onClick={() => choose(opt)} disabled={isAnswered} className={cls}>
                  {opt}
                  {isAnswered && isCorrect && " ✓"}
                  {isAnswered && selected === opt && !isCorrect && " ✗"}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div className={`feedback mt-4 ${selected === q.en ? 'correct' : 'wrong'}`} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>
                {selected === q.en ? "Đúng! +15-20 XP" : `Đáp án đúng: ${q.en}`}
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
