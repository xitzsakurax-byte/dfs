'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUserStats, getDailyHistory } from '@/lib/progress';
import { toast } from 'sonner';
import MobileBottomNav from '@/components/MobileBottomNav';

interface DayData {
  date: string;
  words_mastered: number;
  xp_earned: number;
  sessions_completed: number;
}

export default function ProgressDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const s = await getUserStats();
      setStats(s);

      const h = await getDailyHistory(30);
      setHistory(h.reverse()); // newest first for display

      setLoading(false);
    }
    load();
  }, []);

  const totalWords30 = history.reduce((sum, d) => sum + d.words_mastered, 0);
  const totalXp30 = history.reduce((sum, d) => sum + d.xp_earned, 0);
  const activeDays = history.filter(d => d.words_mastered > 0).length;
  const avgWords = activeDays > 0 ? Math.round(totalWords30 / activeDays) : 0;

  const suggested = stats?.suggestedDailyGoal || 15;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] pb-20">
      <div className="container max-w-5xl mx-auto px-6 pt-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/dashboard" className="text-sm text-[var(--muted)] hover:text-[#EDEEF2]">← Back to Dashboard</Link>
            <h1 className="text-4xl font-semibold tracking-tight mt-2">Progress Tracker</h1>
            <p className="text-[var(--text-2)] mt-1">Vietnam calendar • Daily entries • 30-day history • Real remembered stats</p>
          </div>

        </div>

        {loading || !stats ? (
          <div className="text-center py-12 text-[var(--text-2)]">Loading your real stats...</div>
        ) : (
          <>
            {/* Current real stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="practice-card p-5">
                <div className="text-xs text-[var(--muted)]">LEVEL</div>
                <div className="text-5xl font-semibold tracking-tighter mt-1">Lv.{stats.level}</div>
                <div className="text-sm mt-1 text-[var(--gold)]">{stats.totalXp} XP total</div>
              </div>
              <div className="practice-card p-5">
                <div className="text-xs text-[var(--muted)]">CURRENT STREAK</div>
                <div className="text-5xl font-semibold tracking-tighter mt-1">{stats.streak}</div>
                <div className="text-sm mt-1">consecutive days (VN time)</div>
              </div>
              <div className="practice-card p-5">
                <div className="text-xs text-[var(--muted)]">TODAY (Vietnam)</div>
                <div className="text-3xl font-semibold tracking-tight mt-1">{stats.todayXp} XP</div>
                <div className="text-sm">{stats.todayWords} words • {stats.todaySessions} sessions</div>
              </div>
              <div className="practice-card p-5">
                <div className="text-xs text-[var(--muted)]">SUGGESTED DAILY GOAL</div>
                <div className="text-3xl font-semibold tracking-tight mt-1">{suggested} words</div>
                <div className="text-xs mt-1 text-[var(--text-2)]">Based on your recent entries</div>
              </div>
            </div>

            {/* 30-day summary */}
            <div className="practice-card p-6 mb-8">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-xs tracking-[2px] text-[var(--gold)]">LAST 30 DAYS (VIETNAM CALENDAR)</div>
                  <div className="text-2xl font-semibold">Your real daily history</div>
                </div>
                <div className="text-right text-sm text-[var(--text-2)]">
                  {activeDays} active days<br />
                  {totalWords30} words • {totalXp30} XP
                </div>
              </div>

              {/* Simple visual bars for last 30 days */}
              <div className="mb-6">
                <div className="text-xs text-[var(--muted)] mb-2">Words mastered per day (last 30)</div>
                <div className="flex items-end gap-1 h-24 border-b border-[#2C303A] pb-1">
                  {history.slice(0, 30).map((day, idx) => {
                    const height = Math.max(4, Math.min(96, (day.words_mastered / Math.max(1, suggested)) * 80));
                    const isToday = idx === 0;
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center group">
                        <div 
                          className={`w-full rounded-t ${isToday ? 'bg-[var(--gold)]' : 'bg-[var(--gold-dim)]'} transition-all`}
                          style={{ height: `${height}px` }}
                          title={`${day.date}: ${day.words_mastered} words, ${day.xp_earned} XP`}
                        />
                        <div className="text-[9px] text-[#64748b] mt-1 truncate w-full text-center group-hover:text-[var(--gold)]">
                          {day.date.slice(5)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[10px] text-[#64748b] mt-1">Left = oldest • Right = today (Vietnam dates)</div>
              </div>

              {/* Detailed 30-day list */}
              <div>
                <div className="text-sm font-medium mb-3">Daily breakdown (newest first)</div>
                <div className="space-y-2 text-sm max-h-[420px] overflow-auto pr-2">
                  {history.map((day, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-[#171A21] border border-[#2C303A]">
                      <div>
                        <span className="font-mono text-[var(--gold)]">{day.date}</span>
                        {idx === 0 && <span className="ml-2 text-xs px-2 py-0.5 rounded bg-[var(--gold)] text-[#07090F] font-bold">TODAY</span>}
                      </div>
                      <div className="flex gap-6 text-right">
                        <div>
                          <span className="font-semibold tabular-nums">{day.words_mastered}</span>
                          <span className="text-[var(--muted)] ml-1">words</span>
                        </div>
                        <div>
                          <span className="font-semibold tabular-nums">{day.xp_earned}</span>
                          <span className="text-[var(--muted)] ml-1">XP</span>
                        </div>
                        <div>
                          <span className="font-semibold tabular-nums">{day.sessions_completed}</span>
                          <span className="text-[var(--muted)] ml-1">sessions</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Routine insight */}
            <div className="practice-card p-6">
              <div className="text-xs tracking-[2px] text-[var(--gold)] mb-2">ROUTINE INSIGHT</div>
              <div className="text-xl">
                Over the last 30 days you averaged <span className="font-semibold text-[var(--gold)]">{avgWords} words per active day</span>.
              </div>
              <div className="mt-2 text-[var(--text-2)]">
                Your current suggested daily goal is <span className="font-medium">{suggested} words</span> (based on your entries + 15% buffer).
                Keep showing up — small consistent days beat big inconsistent ones.
              </div>
              <div className="mt-4 text-xs text-[var(--muted)]">
                All dates and streaks use Vietnam time (UTC+7). Every mastery and writing submission updates your daily entry automatically.
              </div>
            </div>
          </>
        )}

        <div className="text-center mt-8">
          <Link href="/dashboard" className="text-sm text-[var(--muted)] hover:text-[#EDEEF2]">← Back to main dashboard</Link>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
