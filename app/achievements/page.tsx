'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getAchievements, getDailyQuests, type Achievement } from '@/lib/gamification';
import { getVietnamDateString } from '@/lib/progress';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [quests, setQuests] = useState<ReturnType<typeof getDailyQuests>>([]);

  useEffect(() => {
    getAchievements().then(setAchievements);
    setQuests(getDailyQuests(getVietnamDateString()));
  }, []);

  const unlocked = achievements.filter(a => a.unlockedAt);
  const locked = achievements.filter(a => !a.unlockedAt);
  const totalXpAvailable = achievements.reduce((s, a) => s + a.xpReward, 0);
  const xpEarned = unlocked.reduce((s, a) => s + a.xpReward, 0);

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="logo-mark w-9 h-9 rounded-xl flex items-center justify-center text-[#0A0D14] text-sm font-black">GF</Link>
          <span className="font-semibold tracking-tight hidden sm:block">GermanForge</span>
        </div>
        <Link href="/dashboard" className="text-sm text-[var(--muted)] hover:text-[var(--gold)]">← Dashboard</Link>
      </nav>

      <div className="pt-20 container max-w-5xl mx-auto px-5 sm:px-8 py-10">
        <div className="mb-10">
          <div className="section-label mb-3">Gamification</div>
          <h1 className="text-[40px] sm:text-[48px] font-black tracking-[-2px] mb-3">
            Achievements
          </h1>
          <p className="text-[var(--text-2)] text-lg">
            {unlocked.length}/{achievements.length} unlocked · {xpEarned.toLocaleString()} XP earned of {totalXpAvailable.toLocaleString()} possible
          </p>
        </div>

        {/* Progress bar */}
        <div className="glass-card p-5 mb-8">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="font-semibold">Achievement Progress</span>
            <span className="font-bold" style={{ color: 'var(--gold)' }}>{unlocked.length} / {achievements.length}</span>
          </div>
          <div className="xp-bar-track">
            <div className="xp-bar" style={{ width: `${achievements.length > 0 ? (unlocked.length / achievements.length) * 100 : 0}%` }} />
          </div>
        </div>

        {/* Unlocked */}
        {unlocked.length > 0 && (
          <div className="mb-10">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
              <span style={{ color: 'var(--gold)' }}>✓</span> Unlocked ({unlocked.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {unlocked.map(a => (
                <div key={a.id} className="achievement-card unlocked p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">{a.icon}</span>
                    <div>
                      <div className="font-bold">{a.title}</div>
                      <div className="text-sm text-[var(--text-2)] mt-0.5">{a.description}</div>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-xs font-bold" style={{ color: 'var(--gold)' }}>+{a.xpReward} XP</span>
                        {a.unlockedAt && (
                          <span className="text-xs text-[var(--muted)]">{a.unlockedAt}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked */}
        {locked.length > 0 && (
          <div className="mb-10">
            <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-[var(--muted)]">
              <span>○</span> Locked ({locked.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {locked.map(a => (
                <div key={a.id} className="achievement-card locked p-5">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0 grayscale">{a.icon}</span>
                    <div>
                      <div className="font-semibold text-[var(--muted)]">{a.title}</div>
                      <div className="text-sm text-[var(--muted)] mt-0.5">{a.description}</div>
                      <div className="mt-2 text-xs text-[var(--muted)]">+{a.xpReward} XP when unlocked</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daily quests */}
        <div className="glass-card p-7">
          <h2 className="font-bold text-lg mb-5">Today's Daily Quests</h2>
          <div className="space-y-4">
            {quests.map((q, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-2xl flex-shrink-0 mt-0.5">{q.completed ? '✅' : '○'}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{q.title}</div>
                    <span className="text-sm font-bold" style={{ color: 'var(--gold)' }}>+{q.xpReward} XP</span>
                  </div>
                  <div className="text-sm text-[var(--text-2)] mt-0.5">{q.description}</div>
                  <div className="mt-2 xp-bar-track">
                    <div className="xp-bar" style={{ width: `${Math.min((q.current / q.target) * 100, 100)}%` }} />
                  </div>
                  <div className="text-xs text-[var(--muted)] mt-1">{q.current} / {q.target}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/practice" className="btn-primary px-8 py-3 text-sm inline-block">
              Start practicing to complete quests →
            </Link>
          </div>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
