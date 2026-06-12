'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const streak = 14;
  const todayXP = 85;
  const dailyGoal = 120;
  const level = 12;
  const xpToNext = 420;

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
        <div className="text-sm text-[#A8B3C7]">Guest • Alex</div>
      </nav>

      <div className="pt-20 container max-w-5xl mx-auto px-6">
        {/* Header - clean like previous KPIs */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <div className="text-[#F4C430] text-xs tracking-[2px]">GUTEN MORGEN!</div>
            <h1 className="text-4xl font-semibold tracking-tight">Sẵn sàng giữ streak, Alex?</h1>
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
                <span className="text-[#F4C430]">📈</span>
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
            <div className="font-semibold mb-3 flex items-center gap-2">Cấp độ</div>
            <div className="text-5xl font-bold tabular-nums text-[#F4C430] mb-1">{level}</div>
            <div className="text-sm text-[#A8B3C7] mb-2">{xpToNext} XP đến cấp tiếp theo</div>
            <div className="h-2 bg-[var(--surface2)] rounded-full overflow-hidden">
              <div className="xp-bar h-2" style={{ width: '68%' }} />
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
              <div className="text-[#A8B3C7] text-sm">10 câu • Multiple choice • Ngữ cảnh nghề</div>
              <div className="mt-4 text-sm text-[#F4C430] group-hover:underline">Bắt đầu →</div>
            </Link>
            <Link href="/practice/grammar" className="skill-card group p-6">
              <div className="text-[#F4C430] text-xs tracking-widest mb-1">GRAMMAR B1-C1</div>
              <div className="font-semibold text-2xl mb-2">Cấu trúc phức tạp</div>
              <div className="text-[#A8B3C7] text-sm">6 câu • Konjunktiv, bị động, relative</div>
              <div className="mt-4 text-sm text-[#F4C430] group-hover:underline">Bắt đầu →</div>
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-[#A8B3C7] mt-8">Guest mode • Tiến độ lưu local. Sign in sau để sync với DHND.</div>
      </div>
    </div>
  );
}
