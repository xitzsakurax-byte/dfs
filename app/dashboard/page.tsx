'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  BookOpen, NotebookPen, Layers, Database, FileText, Gamepad2,
  Flame, Trophy, Star, TrendingUp, Zap, Target, ShieldCheck, Download, Upload, RotateCcw,
} from 'lucide-react';
import { getBankMastered, getUserStats, getUserPerformance, getWritingHistory, getDailyHistory, xpToNextLevel, resetAllToZero } from '@/lib/progress';
import { autoDailyBackup, getBackupDates, exportProgress, importProgress } from '@/lib/sync';
import { getDailyQuests, getAchievements, checkAndUnlockAchievements, getSkillTree, getCurrentCombo, getComboMultiplier } from '@/lib/gamification';
import { getVietnamDateString } from '@/lib/progress';
import AppNav from '@/components/AppNav';
import MobileBottomNav from '@/components/MobileBottomNav';

const BANK_TOTAL = 3078;

/* rAF count-up that replays whenever the target changes (e.g. after load) */
function useCountUp(target: number, duration = 1100) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (target <= 0) { setVal(0); return; }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

/* Circular progress ring with gold gradient */
function Ring({ percent, size = 150, stroke = 10, children }: {
  percent: number; size?: number; stroke?: number; children?: React.ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0BA30" />
            <stop offset="100%" stopColor="#E8962A" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="url(#ringGrad)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped / 100)}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)', filter: 'drop-shadow(0 0 6px rgba(212,160,23,0.45))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

const MODULES = [
  { href: '/practice/vocab', label: 'Vocabulary', desc: 'B1–C1 terms in context', Icon: BookOpen },
  { href: '/practice/grammar', label: 'Grammar', desc: 'Konjunktiv, Passiv, Relativsätze', Icon: NotebookPen },
  { href: '/practice/declensions', label: 'Declensions', desc: 'All four cases, drilled', Icon: Layers },
  { href: '/practice/bank', label: 'Bank Drill', desc: '3,078-word official Wortliste', Icon: Database },
  { href: '/practice/writing', label: 'Writing', desc: 'TELC & Goethe task formats', Icon: FileText },
  { href: '/practice/game', label: 'Game', desc: 'Write · fix · quiz, with combos', Icon: Gamepad2 },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ totalXp: 0, level: 1, streak: 0, todayWords: 0, todayXp: 0, todaySessions: 0, suggestedDailyGoal: 15 });
  const [bankMastered, setBankMastered] = useState(0);
  const [performance, setPerformance] = useState<Record<string, { attempts: number; correct: number; accuracy: number }>>({});
  const [quests, setQuests] = useState<ReturnType<typeof getDailyQuests>>([]);
  const [achievements, setAchievements] = useState<Awaited<ReturnType<typeof getAchievements>>>([]);
  const [skillNodes, setSkillNodes] = useState<ReturnType<typeof getSkillTree>>([]);
  const [combo, setCombo] = useState(0);
  const [writingCount, setWritingCount] = useState(0);
  const [week, setWeek] = useState<Array<{ date: string; xp_earned: number; words_mastered: number }>>([]);
  const [backupDates, setBackupDates] = useState<string[]>([]);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [realStats, bank, perf, writing, history] = await Promise.all([
        getUserStats(),
        getBankMastered(),
        getUserPerformance(),
        getWritingHistory(),
        getDailyHistory(7),
      ]);

      if (!mounted) return;

      setStats(realStats);
      setBankMastered(bank.length);
      setPerformance(perf);
      setWritingCount(writing.length);
      setWeek(history);

      const today = getVietnamDateString();
      setQuests(getDailyQuests(today));

      const nodes = getSkillTree();
      setSkillNodes(nodes);

      const newAchievements = await checkAndUnlockAchievements({
        totalXp: realStats.totalXp,
        streak: realStats.streak,
        bankMastered: bank.length,
        level: realStats.level,
      });
      newAchievements.forEach(a => {
        toast.success(`Achievement unlocked: ${a.title}`, {
          description: `+${a.xpReward} XP`,
        });
      });

      const allAchievements = await getAchievements();
      setAchievements(allAchievements);

      setCombo(getCurrentCombo());

      // Daily sync: snapshot today's progress (last 7 days kept locally)
      autoDailyBackup();
      setBackupDates(getBackupDates());
    }

    load();

    const onStorage = (e: StorageEvent) => {
      if (!mounted) return;
      if (['germanforge_bank_mastered', 'germanforge_total_xp', 'germanforge_daily_log', 'germanforge_performance'].includes(e.key || '')) {
        load();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => { mounted = false; window.removeEventListener('storage', onStorage); };
  }, []);

  const levelInfo = xpToNextLevel(stats.totalXp);
  const bankPercent = (bankMastered / BANK_TOTAL) * 100;
  const comboMult = getComboMultiplier(combo);

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const b1Mastery = skillNodes.filter(n => n.cefr === 'B1').reduce((s, n) => s + n.mastery, 0) / Math.max(1, skillNodes.filter(n => n.cefr === 'B1').length);
  const b2Mastery = skillNodes.filter(n => n.cefr === 'B2').reduce((s, n) => s + n.mastery, 0) / Math.max(1, skillNodes.filter(n => n.cefr === 'B2').length);
  const c1Mastery = skillNodes.filter(n => n.cefr === 'C1').reduce((s, n) => s + n.mastery, 0) / Math.max(1, skillNodes.filter(n => n.cefr === 'C1').length);

  const animXp = useCountUp(stats.totalXp);
  const animBank = useCountUp(bankMastered);
  const animStreak = useCountUp(stats.streak, 800);
  const animTrophies = useCountUp(unlockedCount, 800);

  const maxWeekXp = Math.max(1, ...week.map(d => d.xp_earned));
  const goalPercent = Math.min((stats.todayWords / Math.max(1, stats.suggestedDailyGoal)) * 100, 100);

  return (
    <div className="min-h-screen pb-24 text-[var(--text)]" style={{ background: 'var(--bg)' }}>
      <AppNav
        right={
          <>
            {combo >= 3 && (
              <span className="combo-badge hidden sm:inline-flex items-center gap-1.5">
                <Zap size={12} strokeWidth={2.6} /> {combo}× combo
              </span>
            )}
            <span style={{ color: 'var(--muted)' }}>Anh Kiet</span>
          </>
        }
      />

      <div className="pt-24 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="text-sm" style={{ color: 'var(--muted)' }}>Welcome back, Anh Kiet</div>
          <h1 className="mt-1 display-lg">
            {stats.streak > 0 ? (
              <>
                <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>{stats.streak} {stats.streak === 1 ? 'day' : 'days'}</span> strong.
              </>
            ) : (
              <>Ready to <span className="serif-accent gradient-text" style={{ fontWeight: 500 }}>train?</span></>
            )}
          </h1>
          {stats.streak > 0 && (
            <div className="mt-2 flex items-center gap-2 text-sm" style={{ color: 'var(--text-2)' }}>
              <Flame size={15} className="streak-flame" strokeWidth={2.2} />
              <span>That consistency shows up on exam day.</span>
            </div>
          )}
        </header>

        {/* Command center: level ring + today + quests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          <motion.div
            className="forge-panel forge-panel-glow p-6 sm:p-7 lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-7">
              <Ring percent={levelInfo.percent}>
                <div className="text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: 'var(--muted)' }}>Level</div>
                <div className="text-4xl font-black tracking-tight gradient-text leading-none mt-0.5">{stats.level}</div>
                <div className="text-[10px] mt-1" style={{ color: 'var(--muted)' }}>{levelInfo.current}/{levelInfo.needed} XP</div>
              </Ring>

              <div className="flex-1 w-full">
                <div className="flex items-baseline justify-between gap-3 flex-wrap">
                  <div>
                    <div className="text-sm" style={{ color: 'var(--muted)' }}>
                      Today&apos;s training
                      {comboMult > 1 && (
                        <span className="ml-2 text-xs font-bold" style={{ color: 'var(--gold)' }}>{comboMult}× XP combo active</span>
                      )}
                    </div>
                    <div className="text-3xl font-black tabular-nums tracking-tight mt-0.5">
                      {stats.todayXp} <span className="text-base font-bold" style={{ color: 'var(--gold)' }}>XP</span>
                      <span className="mx-2 text-lg font-medium" style={{ color: 'var(--line-2)' }}>/</span>
                      {stats.todayWords} <span className="text-base font-bold" style={{ color: 'var(--gold)' }}>words</span>
                    </div>
                  </div>
                  {/* 7-day sparkline */}
                  <div className="flex items-end gap-1.5 h-10" aria-label="Last 7 days XP">
                    {week.map((d, i) => (
                      <div
                        key={d.date}
                        className="w-2 rounded-full"
                        title={`${d.date}: ${d.xp_earned} XP`}
                        style={{
                          height: `${Math.max(12, (d.xp_earned / maxWeekXp) * 100)}%`,
                          background: i === week.length - 1
                            ? 'linear-gradient(180deg, var(--gold-bright), var(--gold-warm))'
                            : 'var(--surface-3)',
                          boxShadow: i === week.length - 1 ? '0 0 8px var(--gold-glow-strong)' : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="xp-bar-track shimmer mt-4" style={{ height: 8 }}>
                  <div className="xp-bar" style={{ width: `${goalPercent}%`, height: '100%' }} />
                </div>
                <div className="mt-1.5 flex justify-between text-xs" style={{ color: 'var(--muted)' }}>
                  <span>Daily goal: {stats.suggestedDailyGoal} words</span>
                  <span>{stats.todaySessions} sessions today</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <Link href="/practice" className="btn-primary px-6 py-2.5 text-sm">Start a session</Link>
                  <Link href="/progress" className="btn-ghost px-6 py-2.5 text-sm">30-day history →</Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Daily quests */}
          <motion.div
            className="glass-card-static p-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 font-bold text-sm">
                <Target size={15} style={{ color: 'var(--gold)' }} />
                Daily Quests
              </div>
              <Link href="/achievements" className="text-xs hover:underline" style={{ color: 'var(--gold)' }}>All →</Link>
            </div>
            <div className="space-y-4">
              {quests.map((q, i) => {
                const pct = Math.min((q.current / q.target) * 100, 100);
                return (
                  <div key={i} className={`flex items-center gap-3.5 ${q.completed ? 'opacity-55' : ''}`}>
                    <Ring percent={pct} size={40} stroke={4}>
                      <span className="text-[10px] font-black" style={{ color: q.completed ? 'var(--gold)' : 'var(--muted)' }}>
                        {q.completed ? '✓' : `${Math.round(pct)}%`}
                      </span>
                    </Ring>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: 'var(--text-2)', textDecoration: q.completed ? 'line-through' : 'none' }}>
                        {q.title}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                        {q.current}/{q.target} · <span style={{ color: 'var(--gold)' }}>+{q.xpReward} XP</span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {quests.length === 0 && (
                <div className="text-sm" style={{ color: 'var(--muted)' }}>Quests load with your first session.</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total XP', value: animXp.toLocaleString('en-US'), sub: `Level ${stats.level}`, Icon: Star, bar: levelInfo.percent },
            { label: 'Streak', value: `${animStreak}`, sub: 'days in a row', Icon: Flame, bar: null },
            { label: 'Bank mastered', value: animBank.toLocaleString('en-US'), sub: `of ${BANK_TOTAL.toLocaleString('en-US')} words`, Icon: Database, bar: bankPercent },
            { label: 'Achievements', value: `${animTrophies}`, sub: `of ${achievements.length || 14} unlocked`, Icon: Trophy, bar: achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0 },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-medium" style={{ color: 'var(--muted)' }}>{s.label}</div>
                <s.Icon size={16} style={{ color: 'var(--gold)' }} />
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums gradient-text">{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-2)' }}>{s.sub}</div>
              {s.bar !== null && (
                <div className="xp-bar-track mt-3" style={{ height: 4 }}>
                  <div className="xp-bar" style={{ width: `${Math.min(s.bar, 100)}%`, height: '100%' }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CEFR progress */}
        <div className="glass-card-static p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2 font-bold">
                <TrendingUp size={16} style={{ color: 'var(--gold)' }} />
                CEFR Skill Progress
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Based on your quiz performance across all modules</div>
            </div>
            <Link href="/skill-tree" className="text-xs font-semibold hover:underline" style={{ color: 'var(--gold)' }}>Full tree →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { level: 'B1', mastery: b1Mastery, color: 'var(--gold)' },
              { level: 'B2', mastery: b2Mastery, color: 'var(--gold-warm)' },
              { level: 'C1', mastery: c1Mastery, color: 'var(--violet)' },
            ].map(({ level, mastery, color }) => (
              <div key={level}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm">{level}</span>
                  <span className="text-sm font-mono" style={{ color }}>{Math.round(mastery)}%</span>
                </div>
                <div className="xp-bar-track">
                  <div className="rounded-full h-full transition-all duration-700"
                    style={{ width: `${Math.min(mastery, 100)}%`, background: `linear-gradient(90deg, ${color}, ${color}88)`, boxShadow: `0 0 8px ${color}40`, height: '6px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice modules */}
        <div className="mb-3 flex items-center justify-between">
          <span className="eyebrow">Practice modules</span>
          <Link href="/practice" className="text-xs hover:underline" style={{ color: 'var(--gold)' }}>All modules →</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.href}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
            >
              <Link href={m.href} className="skill-card group p-5 flex flex-col gap-3 h-full">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(212,160,23,0.1)', border: '1px solid rgba(212,160,23,0.22)' }}
                >
                  <m.Icon size={18} style={{ color: 'var(--gold-bright)' }} />
                </div>
                <div>
                  <div className="font-bold tracking-tight group-hover:text-[var(--gold-bright)] transition-colors">{m.label}</div>
                  <div className="text-[13px] mt-0.5 leading-snug" style={{ color: 'var(--text-2)' }}>{m.desc}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Performance insights */}
        <div className="glass-card-static p-6 mb-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <Zap size={17} style={{ color: 'var(--gold)' }} />
              Performance Insights
            </div>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>Strengths and areas to improve, from your quiz history</div>
          </div>

          {Object.keys(performance).length === 0 ? (
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              Complete quizzes and practice sessions to unlock personalized insights. The more you practice, the smarter the recommendations become.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--green)' }}>Strengths (≥75% accuracy)</div>
                  <ul className="space-y-1 text-sm" style={{ color: 'var(--text-2)' }}>
                    {Object.entries(performance)
                      .filter(([, v]) => v.accuracy >= 75)
                      .sort((a, b) => b[1].accuracy - a[1].accuracy)
                      .slice(0, 3)
                      .map(([k, v]) => (
                        <li key={k}>· {k.replace(':', ' — ')} ({v.accuracy}%)</li>
                      ))}
                    {Object.entries(performance).filter(([, v]) => v.accuracy >= 75).length === 0 && (
                      <li style={{ color: 'var(--muted)' }}>Keep practicing to reveal strengths</li>
                    )}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--red)' }}>Needs work (&lt;65% accuracy)</div>
                  <ul className="space-y-1 text-sm" style={{ color: 'var(--text-2)' }}>
                    {Object.entries(performance)
                      .filter(([, v]) => v.accuracy < 65 && v.attempts >= 2)
                      .sort((a, b) => a[1].accuracy - b[1].accuracy)
                      .slice(0, 3)
                      .map(([k, v]) => (
                        <li key={k}>· {k.replace(':', ' — ')} ({v.accuracy}%, {v.attempts} attempts)</li>
                      ))}
                    {Object.entries(performance).filter(([, v]) => v.accuracy < 65 && v.attempts >= 2).length === 0 && (
                      <li style={{ color: 'var(--muted)' }}>No major weak spots detected yet</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-3" style={{ borderTop: '1px solid var(--line)' }}>
                <div className="text-sm font-semibold mb-1.5">General tip</div>
                <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                  Mix academic vocabulary (empirisch, die Implikation, die Kausalität) with everyday B2 terms in every practice session.
                  Real exams test both registers — only knowing one will cost you marks.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link href="/exams" className="glass-card p-5 block">
            <div className="eyebrow mb-2">Exam info</div>
            <div className="font-semibold">Goethe-Zertifikat &amp; telc Deutsch</div>
            <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Official formats, times, pass criteria, free practice materials.</div>
          </Link>
          <Link href="/resources" className="glass-card p-5 block">
            <div className="eyebrow mb-2">Resources</div>
            <div className="font-semibold">Trusted Learning Resources</div>
            <div className="text-sm mt-1" style={{ color: 'var(--muted)' }}>DW, Nachrichtenleicht, Schubert-Verlag, official Modellsätze and more.</div>
          </Link>
        </div>

        {/* Data & backup */}
        <div className="glass-card-static p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <span
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
              >
                <ShieldCheck size={19} style={{ color: 'var(--green)' }} />
              </span>
              <div>
                <div className="font-bold">Daily progress sync</div>
                <div className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>
                  {backupDates.length > 0
                    ? `Snapshot saved automatically every day · last: ${backupDates[0]} · ${backupDates.length}/7 days kept`
                    : 'A snapshot of your progress is saved automatically every day you train.'}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5 flex-shrink-0">
              <button
                onClick={() => { exportProgress(); toast.success('Progress exported', { description: 'JSON file downloaded — keep it safe.' }); }}
                className="btn-ghost px-5 py-2.5 text-sm inline-flex items-center gap-2"
              >
                <Download size={14} /> Export
              </button>
              <label className="btn-ghost px-5 py-2.5 text-sm inline-flex items-center gap-2 cursor-pointer">
                <Upload size={14} /> Import
                <input
                  type="file"
                  accept="application/json,.json"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    e.target.value = '';
                    if (!file) return;
                    try {
                      const n = await importProgress(file);
                      toast.success(`Progress imported (${n} records)`, { description: 'Reloading…' });
                      setTimeout(() => window.location.reload(), 900);
                    } catch (err) {
                      toast.error('Import failed', { description: err instanceof Error ? err.message : 'Invalid file' });
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Reset */}
          <div className="mt-5 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderTop: '1px solid var(--line)' }}>
            <div className="text-sm" style={{ color: 'var(--muted)' }}>
              {confirmReset
                ? 'This erases all XP, streak, mastery, achievements and history. This cannot be undone.'
                : 'Progress wrong or want a clean slate? Reset everything to zero.'}
            </div>
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="btn-ghost px-5 py-2.5 text-sm inline-flex items-center gap-2 flex-shrink-0"
                style={{ borderColor: 'rgba(239,68,68,0.4)', color: 'var(--red)' }}
              >
                <RotateCcw size={14} /> Reset progress
              </button>
            ) : (
              <div className="flex gap-2.5 flex-shrink-0">
                <button onClick={() => setConfirmReset(false)} className="btn-ghost px-5 py-2.5 text-sm">Cancel</button>
                <button
                  onClick={async () => {
                    await resetAllToZero();
                    toast.success('Progress reset to zero', { description: 'Starting fresh — reloading…' });
                    setTimeout(() => window.location.reload(), 900);
                  }}
                  className="px-5 py-2.5 text-sm rounded-full font-bold inline-flex items-center gap-2"
                  style={{ background: 'var(--red)', color: '#fff' }}
                >
                  <RotateCcw size={14} /> Yes, erase everything
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-xs pb-4" style={{ color: 'var(--muted)' }}>
          {writingCount > 0 ? `${writingCount} writing ${writingCount === 1 ? 'attempt' : 'attempts'} saved · ` : ''}
          All progress saved locally in your browser (Vietnam time) · For Anh Kiet
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
