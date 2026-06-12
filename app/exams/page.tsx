'use client';

import Link from 'next/link';
import { useState } from 'react';
import MobileBottomNav from '@/components/MobileBottomNav';

type Level = 'B1' | 'B2' | 'C1';
type ExamProvider = 'Goethe' | 'telc';

const GOETHE_DATA = {
  B1: {
    title: 'Goethe-Zertifikat B1',
    fullName: 'Goethe-Zertifikat B1',
    passThreshold: '60/100 points per module',
    modular: true,
    sections: [
      { name: 'Lesen (Reading)',    duration: '65 min', parts: '5 parts',         description: 'Multiple choice, true/false, matching tasks on varied texts.' },
      { name: 'Hören (Listening)',  duration: '40 min', parts: '4 parts',         description: 'News summaries, phone messages, interviews — select correct answers.' },
      { name: 'Schreiben (Writing)', duration: '60 min', parts: '3 tasks',        description: 'Teil 1: informal email (~80 words); Teil 2: forum post (~80 words); Teil 3: formal short message (~40 words).' },
      { name: 'Sprechen (Speaking)', duration: '~15 min', parts: '3 tasks',       description: 'Planning task (with partner), short presentation, feedback/reaction.' },
    ],
    notes: [
      'Fully modular since 2024 — modules can be taken and passed separately.',
      'Certificates do not expire (institutions may prefer ≤2 years old).',
      'Accepted for German citizenship applications and Ausbildung visas.',
    ],
    materials: [
      { label: 'Modellsatz PDF', url: 'https://www.goethe.de/pro/relaunch/prf/materialien/B1/b1_modellsatz_erwachsene.pdf' },
      { label: 'All free materials', url: 'https://www.goethe.de/en/spr/prf/ueb.html' },
    ],
  },
  B2: {
    title: 'Goethe-Zertifikat B2',
    fullName: 'Goethe-Zertifikat B2',
    passThreshold: '60/100 points per module',
    modular: true,
    sections: [
      { name: 'Lesen (Reading)',    duration: '65 min', parts: '5 parts',         description: 'Detailed reading of longer texts — identifying main ideas, details, and author positions.' },
      { name: 'Hören (Listening)',  duration: '40 min', parts: '4 parts',         description: 'Longer monologues, discussions, interviews — note-taking and comprehension.' },
      { name: 'Schreiben (Writing)', duration: '75 min', parts: '2 tasks',        description: 'Forum post (~150 words expressing opinion) + formal email (~100 words responding to a stimulus).' },
      { name: 'Sprechen (Speaking)', duration: '~15 min', parts: '2 tasks',       description: 'Monologue on a topic + discussion/negotiation with partner.' },
    ],
    notes: [
      'Modular — each section can be taken and retaken independently.',
      'Required by many German universities for international applicants.',
    ],
    materials: [
      { label: 'Modellsatz PDF', url: 'https://www.goethe.de/pro/relaunch/prf/materialien/B2/b2_modellsatz_erwachsene.pdf' },
      { label: 'Online interactive test (B2)', url: 'https://bfu.goethe.de/b2_mod_2MX6/index.php' },
    ],
  },
  C1: {
    title: 'Goethe-Zertifikat C1',
    fullName: 'Goethe-Zertifikat C1 (new format since Jan 2024)',
    passThreshold: '60/100 points per module',
    modular: true,
    sections: [
      { name: 'Lesen (Reading)',    duration: '65 min', parts: '5 parts',         description: 'Complex texts from media, professional, and academic contexts.' },
      { name: 'Hören (Listening)',  duration: '40 min', parts: '4 parts',         description: 'Lectures, presentations, extended monologues and discussions.' },
      { name: 'Schreiben (Writing)', duration: '75 min', parts: '2 tasks',        description: 'Extended essay + formal text (opinion, analysis, or report).' },
      { name: 'Sprechen (Speaking)', duration: '~20 min', parts: '2 tasks',       description: 'Extended presentation + discussion — requires nuanced argumentation.' },
    ],
    notes: [
      'New modular format since January 2024.',
      'Required by many German public service and academic employers.',
    ],
    materials: [
      { label: 'Modellsatz PDF', url: 'https://www.goethe.de/pro/relaunch/prf/materialien/C1/c1_modellsatz.pdf' },
      { label: 'Übungssatz PDF', url: 'https://www.goethe.de/pro/relaunch/prf/materialien/C1/c1_uebungssatz.pdf' },
    ],
  },
};

const TELC_DATA = {
  B1: {
    title: 'telc Deutsch B1 (Zertifikat Deutsch)',
    fullName: 'telc Deutsch B1',
    passThreshold: '60% total (written ≥60% + oral ≥60%); written ≥135/225 pts',
    modular: true,
    sections: [
      { name: 'Lesen & Sprachbausteine', duration: '90 min', parts: 'Reading + language elements', description: 'Reading comprehension and gap-fill language structure tasks combined.' },
      { name: 'Hören (Listening)',        duration: '30 min', parts: '3–4 parts',                   description: 'Announcements, conversations, short messages.' },
      { name: 'Schreiben (Writing)',       duration: '30 min', parts: '1 task',                      description: 'One written task (informal or semi-formal letter/email).' },
      { name: 'Sprechen (Speaking)',       duration: '15 min + 20 min prep', parts: '3 tasks',       description: 'Introduction, planning task, and argumentation (in pairs or groups).' },
    ],
    notes: [
      'Accepted for German citizenship applications (Einbürgerungstest exemption with B1).',
      'Valid for Ausbildung visa applications.',
      'Failed sections can be retaken separately.',
      '300 points total; pass ≈180 pts with each component ≥60%.',
    ],
    materials: [
      { label: 'Free Übungstest PDF (B1)', url: 'https://shop.telc.net/media/catalog/product/file/telc_deutsch_b1_zd_uebungstest_1.pdf' },
      { label: 'All free downloads', url: 'https://www.telc.net/en/teaching-materials/free-downloads/' },
    ],
  },
  B2: {
    title: 'telc Deutsch B2',
    fullName: 'telc Deutsch B2',
    passThreshold: '60% total; written ≥60% + oral ≥60%',
    modular: true,
    sections: [
      { name: 'Lesen & Sprachbausteine', duration: '90 min', parts: 'Reading + language elements', description: 'Longer texts and complex language structure tasks.' },
      { name: 'Hören (Listening)',        duration: '20 min', parts: '3 parts',                     description: 'Interviews, discussions, presentations.' },
      { name: 'Schreiben (Writing)',       duration: '30 min', parts: '1 task',                      description: 'Formal or semi-formal writing task.' },
      { name: 'Sprechen (Speaking)',       duration: '15 min + 20 min prep', parts: '2 tasks',       description: 'Presentation + discussion/negotiation.' },
    ],
    notes: [
      '300 points total.',
      'Accepted by many German employers for professional positions.',
    ],
    materials: [
      { label: 'All free downloads', url: 'https://www.telc.net/en/teaching-materials/free-downloads/' },
    ],
  },
  C1: {
    title: 'telc Deutsch C1 Hochschule',
    fullName: 'telc Deutsch C1 Hochschule',
    passThreshold: '128/214 pts total (written ≥60% + oral ≥60%); 144 written + 70 oral pts',
    modular: true,
    sections: [
      { name: 'Lesen (Reading)',            duration: '~75 min', parts: '5 parts',   description: 'Complex academic and media texts at university level.' },
      { name: 'Sprachbausteine',            duration: '~20 min', parts: '2 parts',   description: 'Advanced gap-fill for lexical and grammatical structures.' },
      { name: 'Hören (Listening)',          duration: '~40 min', parts: '3 parts',   description: 'Lectures, academic discussions, extended presentations.' },
      { name: 'Schreiben (Writing)',        duration: '~60 min', parts: '1 essay',   description: 'Extended argumentative essay responding to a text stimulus (university standard).' },
      { name: 'Sprechen (Speaking)',        duration: '16–20 min', parts: '2 tasks', description: 'Pair discussion and argumentation at academic level.' },
    ],
    notes: [
      'Recognized by HRK (German Rectors\' Conference) for university admission.',
      'Required by most German universities for international applicants.',
      '214 pts total: written 144 pts + oral 70 pts.',
    ],
    materials: [
      { label: 'All free downloads', url: 'https://www.telc.net/en/teaching-materials/free-downloads/' },
    ],
  },
};

export default function ExamsPage() {
  const [selectedLevel, setSelectedLevel] = useState<Level>('B1');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const goethe = GOETHE_DATA[selectedLevel];
  const telc = TELC_DATA[selectedLevel];

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Nav */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="logo-mark w-9 h-9 rounded-xl flex items-center justify-center text-[#0A0D14] text-sm font-black">GF</Link>
          <Link href="/" className="font-semibold tracking-tight hidden sm:block">GermanForge</Link>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-[var(--muted)] hover:text-[var(--gold)]">Dashboard</Link>
          <Link href="/resources" className="text-[var(--muted)] hover:text-[var(--gold)]">Resources</Link>
        </div>
      </nav>

      <div className="pt-20 container max-w-6xl mx-auto px-5 sm:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <div className="section-label mb-3">Official Exam Information</div>
          <h1 className="text-[40px] sm:text-[52px] font-black tracking-[-2px] mb-4">
            Goethe vs <span className="gradient-text">telc</span>
          </h1>
          <p className="text-lg text-[var(--text-2)] max-w-[55ch]">
            Complete official data for both exam providers — formats, sections, timing, pass criteria, and links to free practice materials.
            All data verified from goethe.de and telc.net (2025–2026).
          </p>
        </div>

        {/* Quick comparison table */}
        <div className="glass-card p-6 mb-8 overflow-x-auto">
          <h2 className="font-bold text-lg mb-5">Quick Comparison</h2>
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--line)' }}>
                <th className="text-left py-3 pr-4 text-[var(--muted)] font-medium">Feature</th>
                <th className="text-left py-3 pr-4 font-semibold" style={{ color: 'var(--gold)' }}>Goethe-Zertifikat</th>
                <th className="text-left py-3 font-semibold text-[var(--text-2)]">telc Deutsch</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Levels available', 'A1–C2', 'A1–C1 (+ Hochschule)'],
                ['Pass threshold', '60/100 per module', '60% each component'],
                ['Modular retakes', 'Yes — since 2024', 'Yes — failed sections retakeable'],
                ['Certificate expiry', 'No expiry (institutions may prefer ≤2y)', 'No expiry'],
                ['Citizenship use', 'Accepted (B1)', 'Accepted (B1 Zertifikat Deutsch)'],
                ['University entry', 'C1 accepted widely', 'C1 Hochschule (HRK recognized)'],
                ['Free practice tests', 'Modellsätze + Übungssätze (PDFs)', 'Übungstests (PDFs)'],
                ['Official website', 'goethe.de', 'telc.net'],
              ].map(([feature, goethe, telc], i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                  <td className="py-3 pr-4 text-[var(--muted)]">{feature}</td>
                  <td className="py-3 pr-4 text-[var(--text-2)]">{goethe}</td>
                  <td className="py-3 text-[var(--text-2)]">{telc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Level selector */}
        <div className="flex gap-3 mb-8">
          {(['B1', 'B2', 'C1'] as Level[]).map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className="px-5 py-2 rounded-full text-sm font-bold transition-all"
              style={selectedLevel === level
                ? { background: 'linear-gradient(135deg, var(--gold), var(--gold-warm))', color: '#0A0D14', boxShadow: '0 0 16px var(--gold-glow-strong)' }
                : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'var(--text-2)' }
              }
            >
              {level}
            </button>
          ))}
        </div>

        {/* Side-by-side exam detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Goethe */}
          <div className="glass-card p-7">
            <div className="flex items-start justify-between mb-1">
              <div className="font-black text-xl">{goethe.title}</div>
              <span className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.3)', color: 'var(--gold)' }}>
                Goethe-Institut
              </span>
            </div>
            <div className="text-sm text-[var(--muted)] mb-5">Pass: {goethe.passThreshold}</div>

            <div className="space-y-3 mb-6">
              {goethe.sections.map((s, i) => (
                <div key={i} className="rounded-xl p-4 cursor-pointer"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--line-2)' }}
                  onClick={() => setExpandedSection(expandedSection === `g${i}` ? null : `g${i}`)}>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                      <span>{s.duration}</span>
                      <span>{expandedSection === `g${i}` ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {expandedSection === `g${i}` && (
                    <div className="mt-3 text-sm text-[var(--text-2)] border-t pt-3" style={{ borderColor: 'var(--line)' }}>
                      <div className="text-xs text-[var(--gold)] mb-1">{s.parts}</div>
                      {s.description}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-1.5 mb-6">
              {goethe.notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[var(--text-2)]">
                  <span className="text-[var(--gold)] text-xs mt-1 flex-shrink-0">✓</span>
                  {note}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-2">Free Materials</div>
              {goethe.materials.map((m, i) => (
                <a key={i} href={m.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:underline" style={{ color: 'var(--gold)' }}>
                  ↗ {m.label}
                </a>
              ))}
            </div>
          </div>

          {/* telc */}
          <div className="glass-card p-7">
            <div className="flex items-start justify-between mb-1">
              <div className="font-black text-xl">{telc.title}</div>
              <span className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', color: '#60A5FA' }}>
                telc GmbH
              </span>
            </div>
            <div className="text-sm text-[var(--muted)] mb-5">Pass: {telc.passThreshold}</div>

            <div className="space-y-3 mb-6">
              {telc.sections.map((s, i) => (
                <div key={i} className="rounded-xl p-4 cursor-pointer"
                  style={{ background: 'var(--surface-2)', border: '1px solid var(--line-2)' }}
                  onClick={() => setExpandedSection(expandedSection === `t${i}` ? null : `t${i}`)}>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-sm">{s.name}</div>
                    <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                      <span>{s.duration}</span>
                      <span>{expandedSection === `t${i}` ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {expandedSection === `t${i}` && (
                    <div className="mt-3 text-sm text-[var(--text-2)] border-t pt-3" style={{ borderColor: 'var(--line)' }}>
                      <div className="text-xs text-[#60A5FA] mb-1">{s.parts}</div>
                      {s.description}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-1.5 mb-6">
              {telc.notes.map((note, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-[var(--text-2)]">
                  <span className="text-[#60A5FA] text-xs mt-1 flex-shrink-0">✓</span>
                  {note}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-[var(--muted)] uppercase tracking-widest mb-2">Free Materials</div>
              {telc.materials.map((m, i) => (
                <a key={i} href={m.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:underline" style={{ color: '#60A5FA' }}>
                  ↗ {m.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* TestDaF note */}
        <div className="glass-card p-6 mt-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl flex-shrink-0">📝</span>
            <div>
              <div className="font-bold mb-1">TestDaF (Test Deutsch als Fremdsprache)</div>
              <p className="text-sm text-[var(--text-2)] mb-3">
                TestDaF is a separate university-entry exam at level TDN 3–5 (roughly B2–C1).
                It is administered centrally by the TestDaF Institut and consists of Reading, Listening, Writing, and Speaking.
                Free Musterprüfungen are available at testdaf.de.
              </p>
              <a href="https://www.testdaf.de/" target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold hover:underline" style={{ color: 'var(--gold)' }}>
                ↗ testdaf.de — official site and free practice tests
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/dashboard" className="btn-primary px-8 py-3.5 text-base inline-block">
            Back to Training
          </Link>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
