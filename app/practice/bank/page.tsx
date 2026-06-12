'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import fullVocab from '@/lib/data/full-vocab.json';

const BANK_TOTAL = 3078;
const DRILL_SIZE = 12;

export default function BankDrill() {
  const BANK_KEY = 'germanforge_bank_mastered';

  const [bankMastered, setBankMastered] = useState<string[]>([]);
  const [drillWords, setDrillWords] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionNew, setSessionNew] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lastAction, setLastAction] = useState<'master' | 'skip' | null>(null);

  // Load shared bank mastery (synced from quizzes, resources, dashboard)
  useEffect(() => {
    const saved = localStorage.getItem(BANK_KEY);
    const mastered = saved ? JSON.parse(saved) : [];
    setBankMastered(mastered);

    // Build drill: prefer unmastered for gamification progress, then random fill
    const unmastered = [...fullVocab].sort(() => Math.random() - 0.5).filter(w => !mastered.includes(w));
    let drill = unmastered.slice(0, DRILL_SIZE);
    if (drill.length < DRILL_SIZE) {
      const fillers = [...fullVocab].sort(() => Math.random() - 0.5).filter(w => !drill.includes(w)).slice(0, DRILL_SIZE - drill.length);
      drill = [...drill, ...fillers];
    }
    setDrillWords(drill);
  }, []);

  const currentWord = drillWords[currentIndex] || '';
  const progress = drillWords.length > 0 ? Math.round(((currentIndex + (lastAction ? 1 : 0)) / drillWords.length) * 100) : 0;
  const masteryPercent = ((bankMastered.length / BANK_TOTAL) * 100).toFixed(1);

  function masterWord() {
    if (!currentWord || finished) return;

    const isNew = !bankMastered.includes(currentWord);
    let newMastered = bankMastered;
    if (isNew) {
      newMastered = [...bankMastered, currentWord];
      setBankMastered(newMastered);
      localStorage.setItem(BANK_KEY, JSON.stringify(newMastered));
      setSessionNew(s => s + 1);
    }

    const points = 8 + Math.floor(Math.random() * 7); // 8-14 XP per bank mastery action
    setEarnedXP(e => e + points);
    setLastAction('master');

    advance();
  }

  function skipWord() {
    if (!currentWord || finished) return;
    setLastAction('skip');
    advance();
  }

  function advance() {
    const next = currentIndex + 1;
    if (next >= drillWords.length) {
      setFinished(true);
    } else {
      setCurrentIndex(next);
    }
  }

  function restartDrill() {
    // New random drill respecting current global mastered (no repeat already known if possible)
    const mastered = [...bankMastered];
    const unmastered = [...fullVocab].sort(() => Math.random() - 0.5).filter(w => !mastered.includes(w));
    let drill = unmastered.slice(0, DRILL_SIZE);
    if (drill.length < DRILL_SIZE) {
      const fillers = [...fullVocab].sort(() => Math.random() - 0.5).filter(w => !drill.includes(w)).slice(0, DRILL_SIZE - drill.length);
      drill = [...drill, ...fillers];
    }
    setDrillWords(drill);
    setCurrentIndex(0);
    setSessionNew(0);
    setEarnedXP(0);
    setFinished(false);
    setLastAction(null);
  }

  function resetBank() {
    localStorage.removeItem(BANK_KEY);
    setBankMastered([]);
    restartDrill();
  }

  if (!currentWord && !finished) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] flex items-center justify-center p-6">
        Đang tải ngân hàng 3000+ từ...
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          <h1 className="text-4xl font-semibold tracking-tight mb-2">Bank Drill Hoàn thành!</h1>
          <div className="text-xl mb-6">Bạn đã xử lý {drillWords.length} từ từ ngân hàng chính thức Goethe.</div>

          <div className="practice-card p-8 mb-6">
            <div className="text-5xl font-bold text-[#F4C430] mb-1">+{earnedXP} XP</div>
            <div className="text-[#A8B3C7] mb-3">Đã nắm mới trong drill: <span className="font-semibold text-[#F5F7FA]">{sessionNew}</span></div>
            <div className="text-sm">Tổng Bank Mastery: <span className="font-mono text-[#F4C430]">{bankMastered.length}/{BANK_TOTAL}</span> ({masteryPercent}%)</div>
            <div className="mt-2 text-xs text-[#A8B3C7]">Mỗi từ đã master đóng góp trực tiếp vào gamification, level và độ sẵn sàng Ausbildung của bạn.</div>
          </div>

          <div className="flex gap-3 justify-center mb-4">
            <Button onClick={restartDrill} className="btn-primary px-8 py-3">Làm drill mới (không lặp từ đã biết)</Button>
            <Button asChild className="btn-ghost px-8 py-3">
              <Link href="/dashboard">Về Dashboard</Link>
            </Button>
          </div>

          <div className="flex gap-3 justify-center">
            <Button asChild className="btn-ghost px-6 py-2 text-sm">
              <Link href="/resources">Xem toàn bộ ngân hàng &amp; Resources</Link>
            </Button>
            <Button onClick={resetBank} className="btn-ghost px-6 py-2 text-sm text-[#A8B3C7]">
              Reset toàn bộ Bank Mastery
            </Button>
          </div>

          <div className="mt-6 text-xs text-[#A8B3C7]">
            Tiếp tục: các bài Vocab / Grammar / Writing cũng tự động sync từ đúng vào ngân hàng này (không lặp lại sau khi đúng).
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-8">
      <div className="container max-w-2xl mx-auto px-6">
        {/* Header with live bank gamification stat */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/practice" className="text-sm text-[#A8B3C7] hover:text-[#F5F7FA]">← Quay lại Practice</Link>
          <div className="flex items-center gap-4 text-sm font-mono text-[var(--muted)]">
            Bank: <span className="text-[#F4C430]">{bankMastered.length}/{BANK_TOTAL}</span> • Drill {currentIndex + 1}/{drillWords.length}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-[#F4C430] text-xs tracking-[2px] mb-1">OFFICIAL GOETHE 3000+ WORTLISTE • GAMIFICATION</div>
          <h1 className="text-3xl font-semibold tracking-tight">Ngân hàng từ vựng chính thức — Quick Mastery Drill</h1>
          <p className="text-[#A8B3C7] mt-1 text-sm">Master từng từ → +8–14 XP • Tự động sync với Vocab, Grammar, Writing • Không lặp từ đã nắm • Góp phần level &amp; Ausbildung readiness</p>
        </div>

        {/* Progress bar for this drill + global */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-1 text-[#A8B3C7]">
            <span>Drill progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-[var(--surface2)] rounded-full overflow-hidden mb-2">
            <div className="h-2 bg-gradient-to-r from-[#C8102E] to-[#F4C430] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-xs text-[#A8B3C7]">Global Bank Mastery: {bankMastered.length} / {BANK_TOTAL} ({masteryPercent}%)</div>
        </div>

        {/* Main card - clean, no icons, high contrast */}
        <div className="practice-card p-8 mb-6">
          <div className="text-xs tracking-[2px] text-[#F4C430] mb-2">TỪ TỪ NGÂN HÀNG CHÍNH THỨC (B1-C1+)</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord + currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight break-words mb-8 min-h-[120px] flex items-center"
            >
              {currentWord}
            </motion.div>
          </AnimatePresence>

          <div className="text-[#A8B3C7] text-sm mb-6">Nhận diện / nắm từ này? Nhấn Master để ghi nhận vào ngân hàng 3000+ (không lặp lại sau này ở mọi bài tập).</div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={masterWord} className="btn-primary flex-1 py-4 text-lg">
              Master từ này (+8–14 XP)
            </Button>
            <Button onClick={skipWord} className="btn-ghost flex-1 py-4 text-lg border border-[var(--line)]">
              Bỏ qua (luyện sau)
            </Button>
          </div>

          <div className="mt-4 text-xs text-[#A8B3C7] text-center">
            Mỗi lần Master góp phần streak, level và % Bank Mastery toàn cục. Dữ liệu sync real-time với Dashboard &amp; các quiz.
          </div>
        </div>

        <div className="text-center">
          <Button onClick={restartDrill} className="btn-ghost px-6 py-2 text-sm mr-3">Bắt đầu drill mới</Button>
          <Link href="/resources" className="text-sm text-[#F4C430] hover:underline">Xem danh sách đầy đủ &amp; tìm kiếm →</Link>
        </div>

        <div className="mt-8 text-xs text-[#A8B3C7] text-center">
          Random hóa hoàn toàn • Ưu tiên từ chưa nắm • Tích hợp đầy đủ vào gamification (dashboard, mọi bài tập, writing mock).
        </div>
      </div>
    </div>
  );
}
