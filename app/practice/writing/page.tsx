'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  writingPromptSets, 
  getRandomWritingPrompt, 
  rateWritingAI, 
  suggestBankWords,
  WritingPromptSet 
} from '@/lib/data/writing';
import { vocab } from '@/lib/data/vocab'; // cross-reference the 3000+ bank for suggestions
import fullVocab from '@/lib/data/full-vocab.json'; // the full 3078 term official bank for gamification integration in rating
import { saveWritingAttempt, logPerformance } from '@/lib/progress';

type Attempt = {
  id: number;
  date: string;
  promptTitle: string;
  totalScore: number;
  wordCounts: number[];
  feedback: string;
};

// Simple local persistence for attempts (guest mode, commercial-friendly)
const STORAGE_KEY = 'germanforge_writing_attempts';

export default function WritingMockTest() {
  const [currentPrompt, setCurrentPrompt] = useState<WritingPromptSet | null>(null);
  const [answers, setAnswers] = useState<string[]>(['', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState<any>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Load history
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setAttempts(JSON.parse(saved));
  }, []);

  // Timer (optional, real-exam feel)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // auto-submit hint
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const startNewTest = (specific?: WritingPromptSet) => {
    const prompt = specific || getRandomWritingPrompt();
    setCurrentPrompt(prompt);
    setAnswers(['', '']);
    setIsSubmitted(false);
    setRating(null);
    setTimer(prompt.totalTimeMin * 60);
    setIsTimerRunning(true);
  };

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const getWordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  const submitForAIRating = () => {
    if (!currentPrompt) return;

    setIsTimerRunning(false);

    // Run "AI" rater for each task (simulated, professional, references the 3000+ bank)
    // Integrate the full official 3000+ word bank into the rating and gamification
    const combinedBank = [...new Set([...vocab.map((v: any) => v.de), ...fullVocab])];
    const results = currentPrompt.tasks.map((task, i) => {
      const text = answers[i];
      const result = rateWritingAI(text, task, combinedBank);
      return { task, ...result };
    });

    const totalScore = Math.round(results.reduce((sum, r) => sum + r.total, 0) / results.length);

    const fullFeedback = results.map((r, i) => 
      `**${currentPrompt.tasks[i].title}**\n${r.feedback}\n(Word count: ${r.wordCount} | Matched professional terms: ${r.matchedKeywords})`
    ).join('\n\n');

    // Bank suggestions
    const allText = answers.join(' ');
    const suggestions = suggestBankWords(allText, vocab.map(v => v.de), 4);

    const newRating = {
      overall: totalScore,
      perTask: results,
      fullFeedback: fullFeedback + `\n\n💡 Gợi ý từ ngân hàng 3000+ Wortliste để cải thiện: ${suggestions.join(', ')}`,
      suggestions,
    };

    setRating(newRating);
    setIsSubmitted(true);

    // Log for dashboard analysis (writing overall)
    logPerformance('writing', 'overall', totalScore >= 12); // B2-C1 threshold for "solid"

    // Integrate 3000+ bank into gamification: auto-master any bank words used in the writing
    try {
      const bankKey = 'germanforge_bank_mastered';
      const bankSaved = localStorage.getItem(bankKey);
      let bankMastered = bankSaved ? JSON.parse(bankSaved) : [];
      const allText = answers.join(' ').toLowerCase();
      combinedBank.forEach((w: string) => {
        if (allText.includes(w.toLowerCase()) && !bankMastered.includes(w)) {
          bankMastered.push(w);
        }
      });
      localStorage.setItem(bankKey, JSON.stringify(bankMastered));
    } catch (e) {}

    // Save attempt (local only)
    const newAttempt: Attempt = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      promptTitle: currentPrompt.title,
      totalScore,
      wordCounts: answers.map(getWordCount),
      feedback: newRating.fullFeedback,
    };

    const updatedAttempts = [newAttempt, ...attempts].slice(0, 10);
    setAttempts(updatedAttempts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAttempts));

    // Persist to backend if user is signed in
    saveWritingAttempt({
      promptTitle: currentPrompt.title,
      totalScore,
      fullFeedback: newRating.fullFeedback,
    });
  };

  const resetTest = () => {
    setCurrentPrompt(null);
    setAnswers(['', '']);
    setIsSubmitted(false);
    setRating(null);
    setTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // If no test started yet
  if (!currentPrompt) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-8">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="text-[var(--gold)] text-xs tracking-[2px] mb-1">B1-C1 | TELC + GOETHE</div>
              <h1 className="text-4xl font-semibold tracking-tight">Writing Mock Test</h1>
              <p className="text-[var(--muted)] mt-2">Professional exam writing practice for TELC B1 and Goethe B1-C1 • AI feedback aligned with official criteria</p>
            </div>
            <Link href="/practice" className="text-sm text-[var(--text-2)] hover:text-[var(--text)]">← Back to Practice Hub</Link>
          </div>

          <div className="practice-card p-8 mb-8">
            <h2 className="font-semibold text-xl mb-4">Choose a writing test (TELC + Goethe B1-C1)</h2>
            <p className="text-sm text-[var(--text-2)] mb-6">
              Realistic exam simulations: professional email + report/opinion piece. Focus on standard TELC and Goethe B1-C1 topics: environment, work, society, personal experiences. 
              Use vocabulary from the <strong>3000+ Wortliste</strong> bank (see Resources) to score high.
            </p>

            {/* Phone UI: stack the test cards vertically for clarity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {writingPromptSets.map((set) => (
                <button
                  key={set.id}
                  onClick={() => startNewTest(set)}
                  className="text-left p-4 rounded-lg border border-[var(--line)] hover:border-[var(--gold)] bg-[var(--surface-2)] transition-colors"
                >
                  <div className="text-[var(--gold)] text-xs tracking-widest mb-1">{set.type}</div>
                  <div className="font-semibold text-lg mb-2">{set.title}</div>
                  <div className="text-sm text-[var(--text-2)] line-clamp-3">{set.description}</div>
                  <div className="mt-3 text-xs text-[var(--gold)]">~{set.totalTimeMin} min • 2 tasks</div>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <Button onClick={() => startNewTest()} className="btn-primary px-8 py-3 text-lg w-full md:w-auto">
                Start a random test (Mix TELC + Goethe)
              </Button>
            </div>
          </div>

          {/* History */}
          {attempts.length > 0 && (
            <div className="practice-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Recent writing attempts</h3>
                <button onClick={() => setShowHistory(!showHistory)} className="text-sm text-[var(--gold)] hover:underline">
                  {showHistory ? 'Hide' : 'Show all'}
                </button>
              </div>
              {showHistory && (
                <div className="space-y-3 text-sm">
                  {attempts.map((a) => (
                    <div key={a.id} className="p-3 bg-[var(--surface)] rounded border border-[var(--line)]">
                      <div className="flex justify-between">
                        <span>{a.promptTitle}</span>
                        <span className="font-mono text-[var(--gold)]">{a.totalScore}/20 • {a.date}</span>
                      </div>
                      <div className="text-[var(--text-2)] mt-1 line-clamp-2">{a.feedback.split('\n')[0]}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="text-xs text-[var(--text-2)] mt-8 text-center">
            Note: This is a practice simulation tool. The AI rating uses heuristics + templates (will be replaced by a real LLM in production). 
            Always cross-reference official Goethe &amp; TELC materials. Use the 3000+ bank to improve quickly.
          </div>
        </div>
      </div>
    );
  }

  // Active test UI
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] py-8">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[var(--gold)] text-xs tracking-[2px]">{currentPrompt.type} • B1-C1</div>
            <h1 className="text-3xl font-semibold tracking-tight">{currentPrompt.title}</h1>
          </div>
          <div className="text-right">
            {isTimerRunning && timer > 0 && (
              <div className="font-mono text-2xl text-[var(--gold)]">{formatTime(timer)}</div>
            )}
            <button onClick={resetTest} className="text-sm text-[var(--text-2)] hover:text-[var(--text)]">End &amp; choose another test</button>
          </div>
        </div>

        <div className="mb-4 text-sm text-[var(--text-2)]">
          {currentPrompt.description} • Each task has a word target. Use terms from the 3000+ Wortliste bank (Resources) to score high.
        </div>

        {!isSubmitted && (
          <>
            {currentPrompt.tasks.map((task, index) => (
              <div key={index} className="practice-card p-6 mb-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[var(--gold)] text-xs tracking-widest mb-1">TASK {index + 1}</div>
                    <h3 className="font-semibold text-xl">{task.title}</h3>
                  </div>
                  <div className="text-right text-sm text-[var(--text-2)]">
                    Target: {task.targetWords} words
                  </div>
                </div>

                <div className="bg-[var(--surface-2)] p-4 rounded mb-4 text-sm whitespace-pre-line">
                  {task.instructions}
                </div>

                <div className="text-xs text-[var(--text-2)] mb-2">
                  Suggested vocabulary (from 3000+ bank): {task.keywords.join(', ')}
                </div>

                <textarea
                  value={answers[index]}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  placeholder="Write your answer here in German..."
                  className="w-full h-48 p-4 rounded-lg bg-[var(--surface-2)] border border-[var(--line)] text-[var(--text)] font-mono text-sm resize-y focus:border-[var(--gold)]"
                />
                <div className="text-right text-xs mt-1 text-[var(--text-2)]">
                  {getWordCount(answers[index])} / {task.targetWords} words
                  {getWordCount(answers[index]) < task.targetWords * 0.7 && <span className="text-[var(--gold)]"> (too short)</span>}
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <Button 
                onClick={submitForAIRating} 
                className="btn-primary px-8 py-3 text-lg flex-1"
                disabled={answers.some(a => getWordCount(a) < 20)}
              >
                Submit for AI Rating (TELC + Goethe criteria)
              </Button>
              <Button onClick={() => setIsTimerRunning(!isTimerRunning)} className="btn-ghost px-6">
                {isTimerRunning ? 'Pause' : 'Start'} timer
              </Button>
            </div>
          </>
        )}

        {/* AI Rating Results */}
        <AnimatePresence>
          {isSubmitted && rating && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="practice-card p-8">
                <div className="text-[var(--gold)] text-xs tracking-[2px] mb-1">AI RATING RESULTS</div>
                <h2 className="text-3xl font-semibold tracking-tight mb-2">Overall: {rating.overall}/20</h2>
                <p className="text-[var(--text-2)]">Scored by AI rater (heuristic simulation of official Goethe &amp; TELC B1 Schreiben criteria)</p>

                {/* Mobile: single column results for phone UI */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {rating.perTask.map((r: any, i: number) => (
                    <div key={i} className="bg-[var(--surface-2)] p-4 rounded">
                      <div className="font-semibold mb-1">{currentPrompt.tasks[i].title}</div>
                      <div className="text-2xl font-bold text-[var(--gold)] mb-2">{r.total}/20</div>
                      <div className="text-sm">Words: {r.wordCount} • Professional terms matched: {r.matchedKeywords}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="practice-card p-8">
                <h3 className="font-semibold text-xl mb-4">Detailed AI feedback</h3>
                <div className="whitespace-pre-line text-sm leading-relaxed bg-[var(--surface-2)] p-6 rounded border border-[var(--line)]">
                  {rating.fullFeedback}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button onClick={resetTest} className="btn-primary px-6">Start a new mixed test</Button>
                  <Button onClick={() => setShowHistory(!showHistory)} className="btn-ghost">View history</Button>
                  <Link href="/resources" className="btn-ghost px-6 py-3 inline-flex items-center rounded-full border border-[var(--line)] text-sm hover:border-[var(--gold)]">View 3000+ bank</Link>
                  <Link href="/practice/bank" className="btn-ghost px-6 py-3 inline-flex items-center rounded-full border border-[var(--gold)] text-sm hover:border-[var(--gold)]">Quick Bank Drill (add mastery now)</Link>
                </div>
                <div className="mt-4 text-xs text-[var(--text-2)]">Your writing was rated with direct reference to the 3000+ Wortliste bank. Matched professional terms are recorded and contribute to global Bank Mastery (synced to dashboard + all quizzes).</div>
              </div>

              {showHistory && attempts.length > 1 && (
                <div className="practice-card p-6">
                  <h4 className="font-semibold mb-3">Lịch sử gần đây</h4>
                  <div className="space-y-2 text-sm">
                    {attempts.slice(1).map(a => (
                      <div key={a.id} className="p-3 bg-[var(--surface)] rounded">{a.promptTitle} — {a.totalScore}/20 — {a.date}</div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
