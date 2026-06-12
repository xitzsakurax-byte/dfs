'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const streak = 14;
  const todayXP = 85;
  const dailyGoal = 120;
  const level = 12;
  const xpToNext = 420;

  // Integrate 3000+ word bank into gamification — live, drives level/XP visuals
  const [bankMastered, setBankMastered] = useState(0);
  const BANK_TOTAL = 3078;

  useEffect(() => {
    const saved = localStorage.getItem('germanforge_bank_mastered');
    if (saved) {
      setBankMastered(JSON.parse(saved).length);
    }
    // Listen for cross-page sync (other tabs or after quiz finish)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'germanforge_bank_mastered' && e.newValue) {
        setBankMastered(JSON.parse(e.newValue).length);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const bankPercent = ((bankMastered / BANK_TOTAL) * 100).toFixed(1);
  const bankContribXP = bankMastered * 3; // every mastered bank word boosts effective progress
  const effectiveLevel = 5 + Math.floor(bankMastered / 80) + 7; // bank drives visible level growth
  const xpToNextBank = Math.max(0, ((Math.floor(bankMastered / 80) + 1) * 80) - bankMastered);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] pb-16">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 bg-[rgba(10,13,20,.92)] backdrop-blur border-b border-[var(--line)]">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="logo-mark w-8 h-8 rounded-[9px] bg-gradient-to-br from-[#111418] to-[#C8102E] flex items-center justify-center text-white text-sm font-bold border border-[rgba(244,196,48,.35)]">GF</div>
            GermanForge
          </Link>
          <Link href="/practice" className="text-sm text-[#A8B3C7] hover:text-[#F5F7FA]">Practice</Link>
        </div>
        <div className="text-sm text-[#A8B3C7]">Guest • Anh Kiet</div>
      </nav>

      <div className="pt-20 container max-w-5xl mx-auto px-6">
        {/* Header - clean like previous KPIs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <div className="text-[#F4C430] text-xs tracking-[2px]">GUTEN MORGEN!</div>
            <h1 className="text-4xl font-semibold tracking-tight">Sẵn sàng giữ streak, Anh Kiet?</h1>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-[#F4C430] tabular-nums">{streak}</div>
            <div className="text-sm text-[#A8B3C7] -mt-1">NGÀY STREAK</div>
          </div>
        </div>

        {/* Goal card - elegant, flag accent */}
        <div className="practice-card p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold">Mục tiêu hôm nay</span>
              </div>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-6xl font-bold tabular-nums text-[#F4C430]">{todayXP}</span>
                <span className="text-2xl text-[#A8B3C7]">/ {dailyGoal} XP</span>
              </div>
              <div className="h-2 bg-[var(--surface2)] rounded-full overflow-hidden">
                <div className="xp-bar h-2" style={{ width: `${Math.min((todayXP / dailyGoal) * 100, 100)}%` }} />
              </div>
            </div>
            <div>
              <Button asChild className="btn-primary px-8 py-3 text-lg">
                <Link href="/practice">Bắt đầu luyện tập</Link>
              </Button>
              <div className="text-center text-xs text-[#A8B3C7] mt-2">8–12 câu • ~5 phút</div>
            </div>
          </div>
        </div>

        {/* Progress row - clean cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="practice-card p-6">
            <div className="font-semibold mb-3 flex items-center gap-2">Streak &amp; Tiến độ</div>
            <div className="text-5xl font-bold tabular-nums text-[#F4C430] mb-1">{streak}</div>
            <div className="text-sm text-[#A8B3C7]">ngày liên tục • Giữ đều đặn cho Ausbildung</div>
          </div>
          <div className="practice-card p-6">
            <div className="font-semibold mb-3 flex items-center gap-2">Cấp độ (Bank tích hợp)</div>
            <div className="text-5xl font-bold tabular-nums text-[#F4C430] mb-1">{effectiveLevel}</div>
            <div className="text-sm text-[#A8B3C7] mb-2">+{bankContribXP} effective XP từ Bank • {xpToNextBank} từ nữa lên mốc bank tiếp</div>
            <div className="h-2 bg-[var(--surface2)] rounded-full overflow-hidden">
              <div className="xp-bar h-2" style={{ width: `${Math.min((bankMastered % 80) / 80 * 100, 100)}%` }} />
            </div>
          </div>
        </div>

        {/* Practice launcher - clean, image friendly */}
        <div>
          <div className="font-semibold text-xl mb-4">Chọn kỹ năng luyện tập</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Link href="/practice/vocab" className="skill-card group p-6">
              <div className="text-[#F4C430] text-xs tracking-widest mb-1">VOCABULARY B1-C1</div>
              <div className="font-semibold text-2xl mb-2">Từ vựng nâng cao</div>
              <div className="text-[#A8B3C7] text-sm">100+ mục (mở rộng từ Goethe B1 Wortliste, sẵn sàng cho 3000+ từ) • Ví dụ thực tế • Chủ đề nghề &amp; Ausbildung • Trộn ngẫu nhiên</div>
              <div className="mt-4 text-sm text-[#F4C430] group-hover:underline">Bắt đầu →</div>
            </Link>
            <Link href="/practice/grammar" className="skill-card group p-6">
              <div className="text-[#F4C430] text-xs tracking-widest mb-1">GRAMMAR B1-C1</div>
              <div className="font-semibold text-2xl mb-2">Cấu trúc phức tạp</div>
              <div className="text-[#A8B3C7] text-sm">8+ cấu trúc • Giải thích chi tiết • Passive, Konjunktiv, Relativ</div>
              <div className="mt-4 text-sm text-[#F4C430] group-hover:underline">Bắt đầu →</div>
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/resources" className="practice-card group block p-5 hover:border-[var(--gold)] transition-colors">
            <div className="text-[#F4C430] text-xs tracking-widest mb-1">OFFICIAL GOETHE + BANK</div>
            <div className="font-semibold">Tài nguyên chính thức &amp; Ngân hàng học liệu B1-C1</div>
            <div className="text-sm text-[#A8B3C7] group-hover:underline">Link model tests • Ví dụ Ausbildung • Giải thích chi tiết →</div>
          </Link>
        </div>

        {/* Gamification integration: 3000+ word bank mastery stat — NOW A CORE PILLAR, added into everything */}
        <div className="mt-6">
          <div className="practice-card p-6">
            <div className="font-semibold mb-3 flex items-center gap-2">Official 3000+ Wortliste Bank Mastery</div>
            <div className="flex items-baseline gap-3 mb-1">
              <div className="text-5xl font-bold tabular-nums text-[#F4C430]">{bankMastered}/{BANK_TOTAL}</div>
              <div className="text-sm text-[#A8B3C7]">({bankPercent}%)</div>
            </div>
            <div className="text-sm text-[#A8B3C7] mb-4">Mỗi từ master từ ngân hàng Goethe chính thức tự động đẩy level, XP streaks và Ausbildung readiness. Tất cả bài tập (Vocab/Grammar/Writing/Bank Drill) đều sync vào đây — không lặp từ sau khi đúng.</div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="btn-primary px-6 py-2">
                <Link href="/practice/bank">Quick Bank Drill (Master 12 từ +XP ngay)</Link>
              </Button>
              <Button asChild className="btn-ghost px-6 py-2">
                <Link href="/resources">Xem &amp; Tìm kiếm toàn bộ ngân hàng →</Link>
              </Button>
              <Link href="/practice" className="text-sm self-center text-[#F4C430] hover:underline">Hoặc luyện Vocab/Grammar/Writing (cũng + Bank)</Link>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-[#A8B3C7] mt-8">Guest mode • Tiến độ lưu local. Sign in sau để sync với DHND.</div>
      </div>
    </div>
  );
}
