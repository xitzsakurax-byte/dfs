'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getUserStats } from '@/lib/progress';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stats, setStats] = useState({ totalXp: 0, level: 1, streak: 0 });

  useEffect(() => {
    getUserStats().then(s => {
      setStats({ totalXp: s.totalXp, level: s.level, streak: s.streak });
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA]">
      {/* Professional dark header - now shows real remembered stats */}
      <header className="sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tight">
              <div className="logo-mark w-8 h-8 rounded-[9px] bg-gradient-to-br from-[var(--black)] to-[var(--red)] flex items-center justify-center text-white text-sm font-bold border border-[rgba(244,196,48,.35)]">GF</div>
              GermanForge
            </Link>
            {/* Desktop nav */}
            <nav className="hidden md:flex gap-6 text-sm font-medium text-[var(--muted)]">
              <Link href="/dashboard" className="hover:text-[var(--text)]">Home</Link>
              <Link href="/practice" className="hover:text-[var(--text)]">Practice</Link>
            </nav>

            {/* Mobile phone quick link (the bottom nav provides the full separate UI) */}
            <div className="md:hidden">
              <Link href="/practice" className="text-sm text-[var(--muted)] hover:text-[var(--text)]">Practice</Link>
            </div>
          </div>

          {/* Clean top stats - real data, remembered daily (Vietnam time) - Anh Kiet local only */}
          <div className="flex items-center gap-5 text-sm font-medium text-[var(--muted)]">
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
              <span className="font-semibold text-[var(--text)]">{stats.streak} day streak</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
              <span className="font-semibold text-[var(--text)]">{stats.totalXp.toLocaleString()} XP</span>
              <span className="text-[var(--gold)]">Lv.{stats.level}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
