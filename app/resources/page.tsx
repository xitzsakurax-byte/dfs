'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { vocab } from '@/lib/data/vocab';
import { grammar } from '@/lib/data/grammar';
import fullVocab from '@/lib/data/full-vocab.json'; // 3078+ terms from official Goethe B1 Wortliste (mixed/shuffled for the bank)
import { addToBankMastered, getBankMastered } from '@/lib/progress';
import MobileBottomNav from '@/components/MobileBottomNav';

// Client-side searchable + shuffled display for the full 3000+ official word bank (performance safe)
// Now fully gamified: track mastery with localStorage, progress bar, "Master" buttons, review batches for XP-like rewards.
function FullVocabBank({ list }: { list: string[] }) {
  const [search, setSearch] = useState('');
  const [bankMastered, setBankMastered] = useState<string[]>([]);
  const [reviewList, setReviewList] = useState<string[]>([]);

  // Load mastery from unified layer (Supabase when signed in + localStorage)
  useEffect(() => {
    getBankMastered().then(setBankMastered);
  }, []);

  const shuffled = useMemo(() => [...list].sort(() => Math.random() - 0.5), [list]);

  const filtered = useMemo(() => {
    if (!search.trim()) return shuffled.slice(0, 200); // show 200 random mixed for preview
    const q = search.toLowerCase().trim();
    return shuffled.filter((w: string) => w.toLowerCase().includes(q)).slice(0, 500);
  }, [shuffled, search]);

  const masteryCount = bankMastered.length;
  const masteryPercent = ((masteryCount / list.length) * 100).toFixed(1);

  function toggleMaster(word: string) {
    const isMastered = bankMastered.includes(word);
    const newMastered = isMastered 
      ? bankMastered.filter(w => w !== word)
      : [...bankMastered, word];
    setBankMastered(newMastered);

    if (!isMastered) {
      // This writes to local + Supabase (if signed in)
      addToBankMastered(word);
    } else {
      // For un-master we keep simple local-only for now (rare action)
      localStorage.setItem('germanforge_bank_mastered', JSON.stringify(newMastered));
    }
  }

  function startReviewBatch() {
    const batch = [...list].sort(() => Math.random() - 0.5).slice(0, 10);
    setReviewList(batch);
    setSearch(''); // clear search when reviewing
  }

  function closeReview() {
    setReviewList([]);
  }

  const displayList = reviewList.length > 0 ? reviewList : filtered;

  return (
    <div>
      {/* Gamification header: progress + rewards */}
      <div className="mb-4 p-4 bg-[var(--surface2)] rounded-lg border border-[var(--line)]">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">Wortliste Mastery (Official 3000+ Bank)</span>
          <span className="font-mono text-[#F4C430]">{masteryCount} / {list.length} ({masteryPercent}%)</span>
        </div>
        <div className="h-3 bg-[var(--surface)] rounded-full overflow-hidden mb-3">
          <div 
            className="h-3 bg-gradient-to-r from-[#C8102E] to-[#F4C430] transition-all" 
            style={{ width: `${masteryPercent}%` }} 
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={startReviewBatch}
            className="btn-ghost px-4 py-1 text-sm rounded-full border border-[var(--line)] hover:border-[var(--gold)]"
          >
            Review 10 Random (Earn Mastery)
          </button>
          {reviewList.length > 0 && (
            <button onClick={closeReview} className="text-sm text-[#A8B3C7] hover:text-[#F5F7FA]">
              Close Review
            </button>
          )}
        </div>
        <div className="text-xs text-[var(--muted)] mt-2">
          Master words by marking them learned. Directly builds your readiness for TELC and Goethe B1-C1 certification.
        </div>
      </div>

      <input 
        type="text" 
        placeholder="Search exam vocabulary (e.g. Umwelt, Beruf, Technik, Gesellschaft...)"
        className="w-full p-3 mb-4 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] focus:border-[var(--gold)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="max-h-[420px] overflow-auto text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pr-2">
        {displayList.map((word: string, i: number) => {
          const isMastered = bankMastered.includes(word);
          return (
            <div 
              key={i} 
              className={`p-2 rounded border flex justify-between items-center ${isMastered ? 'bg-[rgba(16,185,129,0.1)] border-[var(--green)]' : 'bg-[var(--surface)] border-[var(--line)] hover:border-[var(--gold)]'} text-left break-words`}
            >
              <span>{word}</span>
              <button 
                onClick={() => toggleMaster(word)}
                className={`text-xs px-2 py-0.5 rounded ${isMastered ? 'text-[var(--green)]' : 'text-[#F4C430] hover:underline'}`}
              >
                {isMastered ? '✓ Mastered' : 'Master +10XP'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-[#A8B3C7] mt-3">
        Showing {displayList.length} results / {list.length} terms (official list fully shuffled). 
        Use search to filter quickly. Click "Master" to gamify your progress. Use for review, flashcards or reading/listening practice.
        {reviewList.length > 0 && ' (Review mode active)'}
      </div>
    </div>
  );
}

// Commercial-grade Resources page
// - Official Goethe Institut links (pulled from goethe.de practice materials for B1 adults)
// - Curated, documented B1-C1 items with examples, explanations, topics (our "database" / seed content)
// - Exam preparation tips
// Every detail considered: clean dark theme, readable cards, no icon spam, strong professional value, bidirectional navigation.

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-8">
      <div className="container max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[var(--accent-light)] text-xs tracking-[2px] mb-1">OFFICIAL • TELC B1 &amp; GOETHE B1-C1</div>
              <h1 className="text-4xl font-semibold tracking-tight">Exam Resources &amp; Vocabulary Bank</h1>
              <p className="mt-2 max-w-2xl text-[var(--muted)]">
                Official-level preparation materials for TELC and Goethe-Zertifikat B1-C1. 
                Authentic exam tasks, detailed explanations, and the complete B1 exam vocabulary bank.
              </p>
            </div>
            <div className="hidden md:block">
              <Button asChild className="btn-primary px-6 py-3">
                <Link href="/practice">Start practicing now</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Official Goethe Links — real value for commercial users */}
        <section className="mb-12">
          <div className="text-[#F4C430] text-xs tracking-[2px] mb-3">OFFICIAL SOURCES</div>
          <div className="practice-card p-6">
            <h2 className="font-semibold text-xl mb-4">Goethe-Zertifikat B1 — Exam training & Practice materials (free)</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://www.goethe.de/en/spr/prf/ueb/pb1.html" target="_blank" rel="noopener" className="text-[#F4C430] hover:underline">
                  → Official B1 practice page (Listening, Reading, Writing, Speaking + Vocabulary list)
                </a>
                <div className="text-[#A8B3C7] text-xs mt-0.5">Model exercises & practice sets for adults. Download PDFs “Kandidatenblätter”.</div>
              </li>
              <li>
                <a href="https://www.goethe.de/ins/us/en/spr/prf/ueb/pb1.html" target="_blank" rel="noopener" className="text-[#F4C430] hover:underline">
                  → US mirror / alternative access to the same B1 training materials
                </a>
              </li>
              <li className="text-[#A8B3C7]">
                Recommendation: Complete the full official model tests and practice sets before the real exam. Content is aligned with TELC and Goethe B1-C1 requirements.
              </li>
            </ul>
            <div className="mt-4 text-xs text-[#A8B3C7]">
              Source: goethe.de (2026). GermanForge adds realistic examples and deeper vocabulary/structure banks for professional and exam-focused learners.
            </div>
          </div>
        </section>

        {/* Vocabulary Bank — richer documentation */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-[var(--accent-light)] text-xs tracking-[2px]">B1-C1 EXAM VOCABULARY</div>
              <h2 className="text-2xl font-semibold tracking-tight">Vocabulary bank &amp; examples</h2>
            </div>
            <Link href="/practice/vocab" className="text-sm text-[#F4C430] hover:underline">Practice now →</Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocab.slice(0, 50).map((item, idx) => (
              <motion.div 
                key={idx} 
                className="practice-card p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-lg tracking-tight">{item.de}</div>
                    <div className="text-[#A8B3C7]">{item.en}</div>
                  </div>
                  <div className="text-right text-xs text-[#F4C430] font-mono">{item.cefr} • {item.topic}</div>
                </div>
                <div className="mt-3 text-sm border-t border-[var(--line)] pt-3">
                  <span className="text-[#A8B3C7]">Example:</span> {item.example}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-xs text-[var(--muted)] mt-3">Selected for the vocabulary and structures most frequently tested in TELC B1 and Goethe B1-C1 exams.</div>
        </section>

        {/* Grammar Bank */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-[#F4C430] text-xs tracking-[2px]">B1-C1 COMPLEX STRUCTURES</div>
              <h2 className="text-2xl font-semibold tracking-tight">Structure bank &amp; explanations</h2>
            </div>
            <Link href="/practice/grammar" className="text-sm text-[#F4C430] hover:underline">Practice now →</Link>
          </div>

          <div className="grid md:grid-cols-1 gap-4">
            {grammar.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="practice-card p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                <div className="font-semibold text-lg tracking-tight mb-1">{item.q}</div>
                <div className="text-[#A8B3C7] mb-2">{item.en}</div>
                <div className="text-sm">
                  <span className="text-[#F4C430]">Correct answer:</span> {item.correct} — {item.hint}
                </div>
                <div className="mt-2 text-sm opacity-90">{item.explanation}</div>
                <div className="text-xs text-[#F4C430] mt-2">{item.topic} • {item.cefr}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Full 3000+ Word Bank from Official Goethe B1 Wortliste - Mixed & Searchable */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-[var(--accent-light)] text-xs tracking-[2px]">OFFICIAL B1 EXAM VOCABULARY</div>
              <h2 className="text-2xl font-semibold tracking-tight">Complete 3,000+ Term Bank for TELC &amp; Goethe B1</h2>
            </div>
            <Link href="/practice/vocab" className="text-sm text-[#F4C430] hover:underline">MCQ practice now →</Link> <Link href="/practice/bank" className="text-sm text-[#F4C430] hover:underline ml-3">Or Quick Bank Drill (gamified 12 terms) →</Link>
          </div>

          <div className="practice-card p-6">
            <p className="text-sm text-[var(--muted)] mb-4">
              3,078+ terms drawn from official Goethe B1 and TELC B1 word lists. Shuffled for varied practice. 
              Use search to filter by exam theme. Essential for all four skills in TELC and Goethe B1-C1.
            </p>

            {/* Client-side search and shuffled display for the large bank */}
            <FullVocabBank list={fullVocab} />
          </div>
        </section>

        {/* Exam preparation tips */}
        <section className="mb-10">
          <div className="practice-card p-6">
            <h3 className="font-semibold mb-3">Quick Tips for TELC & Goethe B1-C1 Success</h3>
            <ul className="text-sm space-y-2 text-[#A8B3C7]">
              <li>• Focus on high-frequency B1 exam vocabulary: environment, work, technology, society, education, travel.</li>
              <li>• Konjunktiv II is frequently used when talking about “hypotheticals / future plans” in interviews or reports.</li>
              <li>• Passive + modal verbs appear often when describing processes, workplace safety, or deadlines.</li>
              <li>• Complete full model tests from goethe.de before the real exam to get used to format and timing.</li>
            </ul>
            <div className="mt-4 text-xs">GermanForge is designed specifically for TELC B1 and Goethe B1-C1 exam preparation.</div>
            <div className="mt-3 text-xs text-[#F4C430]">Mastered progress is stored locally in your browser. On reload, correctly answered items will not repeat until you reset. Look for the reset button at the end of each quiz.</div>
          </div>
        </section>

        <div className="text-center">
          <Button asChild className="btn-primary px-8 py-3">
            <Link href="/dashboard">Back to Dashboard &amp; continue training</Link>
          </Button>
          <div className="mt-3 text-xs text-[#A8B3C7]">GermanForge — Professional B1-C1 exam training for TELC and Goethe.</div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
