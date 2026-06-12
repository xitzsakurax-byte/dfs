'use client';

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { vocab } from '@/lib/data/vocab';
import { grammar } from '@/lib/data/grammar';
import fullVocab from '@/lib/data/full-vocab.json';
import { addToBankMastered, getBankMastered } from '@/lib/progress';
import MobileBottomNav from '@/components/MobileBottomNav';

// ─── Full 3078-word bank browser ──────────────────────────────────────────────
function FullVocabBank({ list }: { list: string[] }) {
  const [search, setSearch] = useState('');
  const [bankMastered, setBankMastered] = useState<string[]>([]);
  const [shuffled, setShuffled] = useState<string[]>([]);

  useEffect(() => {
    // Shuffle client-side only — no SSR hydration mismatch
    setShuffled([...list].sort(() => Math.random() - 0.5));
    getBankMastered().then(setBankMastered);
  }, [list]);

  const filtered = useMemo(() => {
    if (!search.trim()) return shuffled.slice(0, 200);
    const q = search.toLowerCase().trim();
    return shuffled.filter((w: string) => w.toLowerCase().includes(q)).slice(0, 500);
  }, [shuffled, search]);

  const masteryPercent = ((bankMastered.length / list.length) * 100).toFixed(1);

  function toggleMaster(word: string) {
    const isMastered = bankMastered.includes(word);
    if (!isMastered) {
      addToBankMastered(word);
      setBankMastered(prev => [...prev, word]);
    } else {
      const updated = bankMastered.filter(w => w !== word);
      localStorage.setItem('germanforge_bank_mastered', JSON.stringify(updated));
      setBankMastered(updated);
    }
  }

  return (
    <div>
      {/* Progress header */}
      <div className="glass-card p-5 mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">Wortliste Mastery</span>
          <span className="font-mono font-bold" style={{ color: 'var(--gold)' }}>
            {bankMastered.length} / {list.length} ({masteryPercent}%)
          </span>
        </div>
        <div className="xp-bar-track">
          <div className="xp-bar" style={{ width: `${masteryPercent}%` }} />
        </div>
        <p className="text-xs text-[var(--muted)] mt-2">
          Click "Master" to track words. Use the Bank Drill for a focused quiz.
        </p>
      </div>

      <input
        type="text"
        placeholder="Search words (e.g. Umwelt, Beruf, Nachhaltigkeit...)"
        className="w-full p-3 mb-4 rounded-xl text-sm"
        style={{ background: 'var(--surface-2)', border: '1px solid var(--line-2)', color: 'var(--text)' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="max-h-[420px] overflow-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pr-1">
        {filtered.map((word: string, i: number) => {
          const isMastered = bankMastered.includes(word);
          return (
            <div
              key={i}
              className="flex justify-between items-center px-3 py-2 rounded-lg text-sm"
              style={{
                background: isMastered ? 'rgba(34,197,94,0.08)' : 'var(--surface-2)',
                border: `1px solid ${isMastered ? 'var(--green)' : 'var(--line-2)'}`,
              }}
            >
              <span className="truncate mr-2">{word}</span>
              <button
                onClick={() => toggleMaster(word)}
                className="text-xs flex-shrink-0 font-semibold hover:underline"
                style={{ color: isMastered ? 'var(--green)' : 'var(--gold)' }}
              >
                {isMastered ? '✓' : '+'}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[var(--muted)] mt-3">
        Showing {filtered.length} of {list.length} terms. Use search to filter by topic.
      </p>
    </div>
  );
}

// ─── Main resources page ──────────────────────────────────────────────────────

const EXTERNAL_RESOURCES = [
  {
    category: 'Listening & Reading (Authentic German)',
    items: [
      { name: 'DW Nicos Weg (A1–B1)', url: 'https://learngerman.dw.com', desc: 'Free video-based course by Deutsche Welle. Excellent for B1 listening.' },
      { name: 'DW Langsam gesprochene Nachrichten (B2+)', url: 'https://www.dw.com/de/deutsch-lernen/nachrichten/s-8030', desc: 'Slow-spoken news in German. Ideal for B2–C1 listening and reading.' },
      { name: 'Nachrichtenleicht (B1–B2)', url: 'https://www.nachrichtenleicht.de/', desc: 'Simplified German news by Deutschlandfunk — authentic but accessible.' },
    ],
  },
  {
    category: 'Grammar & Exercises',
    items: [
      { name: 'Schubert-Verlag Online-Aufgaben (A1–C2)', url: 'https://www.aufgaben.schubert-verlag.de/', desc: 'Comprehensive grammar exercises for all levels. Free, no signup.' },
      { name: 'mein-deutschbuch.de (B1–C1)', url: 'https://www.mein-deutschbuch.de/', desc: 'Grammar explanations and exercises for B1, B2, and C1.' },
    ],
  },
  {
    category: 'Speaking & Comprehension',
    items: [
      { name: 'Easy German (YouTube / Podcast)', url: 'https://www.easygerman.org', desc: 'Street interviews and natural German conversations with subtitles. B1–C1.' },
      { name: 'Slow German Podcast', url: 'https://slowgerman.com/', desc: 'Short audio episodes in clear German. Great for B2 listening practice.' },
    ],
  },
  {
    category: 'Official Exam Practice',
    items: [
      { name: 'Goethe — All free materials hub', url: 'https://www.goethe.de/en/spr/prf/ueb.html', desc: 'Official Modellsätze and Übungssätze for B1, B2, and C1 (free PDFs).' },
      { name: 'Goethe B2 interactive online test', url: 'https://bfu.goethe.de/b2_mod_2MX6/index.php', desc: 'Free interactive B2 practice test from Goethe-Institut.' },
      { name: 'telc — Free Übungstests', url: 'https://www.telc.net/en/teaching-materials/free-downloads/', desc: 'Free telc practice tests for B1, B2, and C1 Hochschule.' },
      { name: 'TestDaF — Musterprüfungen', url: 'https://www.testdaf.de/', desc: 'Official sample tests for TestDaF (university entry, B2–C1 level).' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Nav */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="logo-mark w-9 h-9 rounded-xl flex items-center justify-center text-[#0A0D14] text-sm font-black">GF</Link>
          <span className="font-semibold tracking-tight hidden sm:block">GermanForge</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-[var(--muted)] hover:text-[var(--gold)]">Dashboard</Link>
          <Link href="/exams" className="text-[var(--muted)] hover:text-[var(--gold)]">Exam Info</Link>
        </div>
      </nav>

      <div className="pt-20 container max-w-6xl mx-auto px-5 sm:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="section-label mb-3">Curated Resources</div>
          <h1 className="text-[40px] sm:text-[52px] font-black tracking-[-2px] mb-4">
            Learning <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-lg text-[var(--text-2)] max-w-[55ch]">
            Trusted external resources, official exam materials, and the complete 3,078-word bank browser.
            All sources verified — no spam, no unverified sites.
          </p>
        </div>

        {/* External resources */}
        <div className="space-y-10 mb-14">
          {EXTERNAL_RESOURCES.map((section, si) => (
            <div key={si}>
              <h2 className="font-bold text-lg mb-4 flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: 'var(--line-2)' }} />
                <span style={{ color: 'var(--gold)' }}>{section.category}</span>
                <div className="h-px flex-1" style={{ background: 'var(--line-2)' }} />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {section.items.map((item, ii) => (
                  <a
                    key={ii}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card p-5 block group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="font-semibold group-hover:text-[var(--gold)] transition-colors">{item.name}</div>
                      <span className="text-[var(--gold)] text-sm flex-shrink-0">↗</span>
                    </div>
                    <div className="text-sm text-[var(--text-2)]">{item.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick vocab reference */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="section-label mb-1">B1–C1 Vocabulary Reference</div>
              <h2 className="text-2xl font-black tracking-tight">Curated Vocab Examples</h2>
            </div>
            <Link href="/practice/vocab" className="text-sm font-semibold hover:underline" style={{ color: 'var(--gold)' }}>
              Quiz mode →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocab.slice(0, 12).map((item, idx) => (
              <div key={idx} className="glass-card p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-base">{item.de}</div>
                    <div className="text-sm text-[var(--text-2)]">{item.en}</div>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full ml-2 flex-shrink-0"
                    style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)', border: '1px solid rgba(212,160,23,0.2)' }}>
                    {item.cefr}
                  </span>
                </div>
                {item.example && (
                  <div className="text-xs text-[var(--muted)] leading-relaxed mt-2 pt-2"
                    style={{ borderTop: '1px solid var(--line)' }}>
                    {item.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Grammar reference */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="section-label mb-1">B1–C1 Grammar Reference</div>
              <h2 className="text-2xl font-black tracking-tight">Key Structures with Explanations</h2>
            </div>
            <Link href="/practice/grammar" className="text-sm font-semibold hover:underline" style={{ color: 'var(--gold)' }}>
              Quiz mode →
            </Link>
          </div>
          <div className="space-y-4">
            {grammar.slice(0, 6).map((item, idx) => (
              <div key={idx} className="glass-card p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="font-semibold">{item.q}</div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ background: 'rgba(212,160,23,0.1)', color: 'var(--gold)', border: '1px solid rgba(212,160,23,0.2)' }}>
                    {item.cefr}
                  </span>
                </div>
                <div className="text-sm text-[var(--text-2)] mb-2">{item.en}</div>
                <div className="text-sm">
                  <span style={{ color: 'var(--gold)' }}>Answer:</span> <span className="font-semibold">{item.correct}</span>
                  {' — '}<span className="text-[var(--muted)]">{item.hint}</span>
                </div>
                <div className="text-sm text-[var(--text-2)] mt-2">{item.explanation}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Full word bank browser */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="section-label mb-1">Official 3,078-Word Bank</div>
              <h2 className="text-2xl font-black tracking-tight">Goethe B1 Wortliste — Complete Browser</h2>
            </div>
            <Link href="/practice/bank" className="text-sm font-semibold hover:underline" style={{ color: 'var(--gold)' }}>
              Bank drill →
            </Link>
          </div>
          <div className="glass-card p-6">
            <p className="text-sm text-[var(--text-2)] mb-5">
              All 3,078 terms from the official Goethe-Zertifikat B1 Wortliste. Searchable and filterable.
              Click + to mark words as mastered (syncs with all practice modules).
            </p>
            <FullVocabBank list={fullVocab} />
          </div>
        </section>

        <div className="text-center">
          <Link href="/dashboard" className="btn-primary px-8 py-3.5 text-base inline-block">
            Back to Training
          </Link>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
