'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { getBankMastered, getUserStats, getUserPerformance, getWritingHistory } from '@/lib/progress';
import { getDailyQuests, getAchievements, checkAndUnlockAchievements, getSkillTree, getCurrentCombo, getComboMultiplier } from '@/lib/gamification';
import { getVietnamDateString } from '@/lib/progress';
import MobileBottomNav from '@/components/MobileBottomNav';

const BANK_TOTAL = 3078;

export default function Dashboard() {
  const [stats, setStats] = useState({ totalXp: 0, level: 1, streak: 0, todayWords: 0, todayXp: 0, todaySessions: 0, suggestedDailyGoal: 15 });
  const [bankMastered, setBankMastered] = useState(0);
  const [performance, setPerformance] = useState<Record<string, { attempts: number; correct: number; accuracy: number }>>({});
  const [quests, setQuests] = useState<ReturnType<typeof getDailyQuests>>([]);
  const [achievements, setAchievements] = useState<Awaited<ReturnType<typeof getAchievements>>>([]);
  const [skillNodes, setSkillNodes] = useState<ReturnType<typeof getSkillTree>>([]);
  const [combo, setCombo] = useState(0);
  const [writingCount, setWritingCount] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [realStats, bank, perf, writing] = await Promise.all([
        getUserStats(),
        getBankMastered(),
        getUserPerformance(),
        getWritingHistory(),
      ]);

      if (!mounted) return;

      setStats(realStats);
      setBankMastered(bank.length);
      setPerformance(perf);
      setWritingCount(writing.length);

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
        toast.success(`Achievement unlocked: ${a.title} ${a.icon}`, {
          description: `+${a.xpReward} XP`,
        });
      });

      const allAchievements = await getAchievements();
      setAchievements(allAchievements);

      setCombo(getCurrentCombo());
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

  const bankPercent = ((bankMastered / BANK_TOTAL) * 100);
  const xpInLevel = stats.totalXp % 500;
  const xpPercent = (xpInLevel / 500) * 100;
  const comboMult = getComboMultiplier(combo);

  const unlockedCount = achievements.filter(a => a.unlockedAt).length;
  const b1Mastery = skillNodes.filter(n => n.cefr === 'B1').reduce((s, n) => s + n.mastery, 0) / Math.max(1, skillNodes.filter(n => n.cefr === 'B1').length);
  const b2Mastery = skillNodes.filter(n => n.cefr === 'B2').reduce((s, n) => s + n.mastery, 0) / Math.max(1, skillNodes.filter(n => n.cefr === 'B2').length);
  const c1Mastery = skillNodes.filter(n => n.cefr === 'C1').reduce((s, n) => s + n.mastery, 0) / Math.max(1, skillNodes.filter(n => n.cefr === 'C1').length);

  return (
    <div className="min-h-screen pb-20 text-[var(--text)]" style={{ background: 'var(--bg)' }}>
      {/* Nav */}
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="logo-mark w-9 h-9 rounded-xl flex items-center justify-center text-[#0A0D14] text-sm font-black">GF</div>
            <span className="font-semibold tracking-tight hidden sm:block">GermanForge</span>
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm text-[var(--muted)]">
            <Link href="/practice" className="hover:text-[var(--gold)] transition-colors">Practice</Link>
            <Link href="/exams" className="hover:text-[var(--gold)] transition-colors">Exams</Link>
            <Link href="/skill-tree" className="hover:text-[var(--gold)] transition-colors">Skill Tree</Link>
            <Link href="/achievements" className="hover:text-[var(--gold)] transition-colors">Achievements</Link>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          {combo >= 3 && (
            <div className="combo-badge hidden sm:flex items-center gap-1">
              ⚡ {combo}× combo
            </div>
          )}
          <span className="text-[var(--muted)]">Anh Kiet</span>
        </div>
      </nav>

      <div className="pt-20 container max-w-6xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="mb-8 pt-4">
          <div className="text-sm text-[var(--muted)]">Welcome back, Anh Kiet</div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-1">
            {stats.streak > 0 ? `${stats.streak} days strong.` : 'Ready to train?'}
          </h1>
          {stats.streak > 0 && (
            <div className="mt-1.5 flex items-center gap-2 text-sm text-[var(--text-2)]">
              <span className="streak-flame">🔥</span>
              <span>{stats.streak}-day streak — that consistency shows up on exam day.</span>
            </div>
          )}
        </div>

        {/* Top stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Level',
              value: `Lv.${stats.level}`,
              sub: `${stats.totalXp.toLocaleString()} XP total`,
              icon: '⭐',
              bar: xpPercent,
            },
            {
              label: 'Streak',
              value: `${stats.streak}`,
              sub: 'days in a row',
              icon: '🔥',
              bar: null,
            },
            {
              label: 'Bank mastered',
              value: `${bankMastered}`,
              sub: `of ${BANK_TOTAL} words`,
              icon: '📖',
              bar: bankPercent,
            },
            {
              label: 'Achievements',
              value: `${unlockedCount}`,
              sub: `of ${achievements.length} unlocked`,
              icon: '🏆',
              bar: achievements.length > 0 ? (unlockedCount / achievements.length) * 100 : 0,
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              className="glass-card p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-[var(--muted)] font-medium">{s.label}</div>
                <span className="text-xl">{s.icon}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight tabular-nums gradient-text">{s.value}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{s.sub}</div>
              {s.bar !== null && (
                <div className="xp-bar-track mt-3">
                  <div className="xp-bar" style={{ width: `${Math.min(s.bar, 100)}%` }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Today's session + daily quests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {/* Today card */}
          <div className="glass-card p-6 lg:col-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex-1">
                <div className="text-sm text-[var(--muted)] mb-1">
                  Today's progress
                  {comboMult > 1 && (
                    <span className="ml-2 text-xs font-bold" style={{ color: 'var(--gold)' }}>
                      {comboMult}× XP combo active
                    </span>
                  )}
                </div>
                <div className="text-3xl font-black tabular-nums">
                  {stats.todayXp} XP · {stats.todayWords} words
                </div>
                <div className="mt-3 xp-bar-track">
                  <div className="xp-bar" style={{ width: `${Math.min((stats.todayWords / Math.max(1, stats.suggestedDailyGoal)) * 100, 100)}%` }} />
                </div>
                <div className="text-xs text-[var(--muted)] mt-1">
                  Goal: {stats.suggestedDailyGoal} words · {stats.todaySessions} sessions today
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link href="/practice" className="btn-primary px-6 py-2.5 text-sm text-center">
                  Start a session
                </Link>
                <Link href="/progress" className="btn-ghost px-6 py-2.5 text-sm text-center">
                  30-day history →
                </Link>
              </div>
            </div>
          </div>

          {/* Daily quests */}
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-sm">Daily Quests</div>
              <Link href="/achievements" className="text-xs text-[var(--gold)] hover:underline">All →</Link>
            </div>
            <div className="space-y-3">
              {quests.map((q, i) => (
                <div key={i} className={`flex items-start gap-3 text-sm ${q.completed ? 'opacity-60' : ''}`}>
                  <span className="text-base mt-0.5 flex-shrink-0">{q.completed ? '✅' : '○'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{q.title}</div>
                    <div className="xp-bar-track mt-1.5" style={{ height: 3 }}>
                      <div className="xp-bar" style={{ width: `${Math.min((q.current / q.target) * 100, 100)}%`, height: '100%' }} />
                    </div>
                    <div className="text-xs text-[var(--muted)] mt-1">{q.current}/{q.target} · +{q.xpReward} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skill tree preview */}
        <div className="glass-card p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="font-bold">CEFR Skill Progress</div>
              <div className="text-xs text-[var(--muted)] mt-0.5">Based on your quiz performance across all modules</div>
            </div>
            <Link href="/skill-tree" className="text-xs font-semibold text-[var(--gold)] hover:underline">Full tree →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { level: 'B1', mastery: b1Mastery, color: 'var(--gold)' },
              { level: 'B2', mastery: b2Mastery, color: 'var(--gold-warm)' },
              { level: 'C1', mastery: c1Mastery, color: '#A78BFA' },
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

        {/* Practice modules grid */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-[var(--muted)]">Practice Modules</span>
          <Link href="/practice" className="text-xs text-[var(--gold)] hover:underline">All modules →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[
            { href: '/practice/vocab',      label: 'VOCABULARY',   title: 'Vocabulary Quiz',      desc: 'B1–C1 terms with examples and options.' },
            { href: '/practice/grammar',    label: 'GRAMMAR',      title: 'Grammar Structures',   desc: 'Konjunktiv, passive, relative clauses.' },
            { href: '/practice/declensions',label: 'WORD FORMS',   title: 'Cases & Declensions',  desc: 'Nominativ, Akkusativ, Dativ, Genitiv.' },
            { href: '/practice/bank',       label: 'BANK DRILL',   title: '3,078-Word Bank',      desc: 'Official Goethe Wortliste mastery drill.' },
            { href: '/practice/writing',    label: 'WRITING',      title: 'Writing Mock Test',    desc: 'TELC & Goethe authentic formats.' },
            { href: '/practice/game',       label: 'GAME',         title: 'Interactive Game',     desc: 'Write forms, fix errors, pop quiz.' },
          ].map((m, i) => (
            <Link key={i} href={m.href} className="skill-card group p-5 block">
              <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--gold)' }}>{m.label}</div>
              <div className="font-bold text-base tracking-tight mb-1.5 group-hover:text-[var(--gold)] transition-colors">{m.title}</div>
              <div className="text-sm text-[var(--text-2)]">{m.desc}</div>
              <div className="mt-4 text-xs font-semibold" style={{ color: 'var(--gold)', opacity: 0, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0')}>
                Start →
              </div>
            </Link>
          ))}
        </div>

        {/* Performance insights */}
        <div className="glass-card p-6 mb-6">
          <div className="mb-4">
            <div className="font-bold text-lg">Performance Insights</div>
            <div className="text-sm text-[var(--muted)]">Strengths and areas to improve based on your quiz history</div>
          </div>

          {Object.keys(performance).length === 0 ? (
            <div className="text-sm text-[var(--muted)]">
              Complete quizzes and practice sessions to unlock personalized insights. The more you practice, the smarter the recommendations become.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--green)' }}>Strengths (≥75% accuracy)</div>
                  <ul className="space-y-1 text-sm text-[var(--text-2)]">
                    {Object.entries(performance)
                      .filter(([, v]) => v.accuracy >= 75)
                      .sort((a, b) => b[1].accuracy - a[1].accuracy)
                      .slice(0, 3)
                      .map(([k, v]) => (
                        <li key={k}>· {k.replace(':', ' — ')} ({v.accuracy}%)</li>
                      ))}
                    {Object.entries(performance).filter(([, v]) => v.accuracy >= 75).length === 0 && (
                      <li className="text-[var(--muted)]">Keep practicing to reveal strengths</li>
                    )}
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-2" style={{ color: 'var(--red)' }}>Needs work (&lt;65% accuracy)</div>
                  <ul className="space-y-1 text-sm text-[var(--text-2)]">
                    {Object.entries(performance)
                      .filter(([, v]) => v.accuracy < 65 && v.attempts >= 2)
                      .sort((a, b) => a[1].accuracy - b[1].accuracy)
                      .slice(0, 3)
                      .map(([k, v]) => (
                        <li key={k}>· {k.replace(':', ' — ')} ({v.accuracy}%, {v.attempts} attempts)</li>
                      ))}
                    {Object.entries(performance).filter(([, v]) => v.accuracy < 65 && v.attempts >= 2).length === 0 && (
                      <li className="text-[var(--muted)]">No major weak spots detected yet</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--line)]">
                <div className="text-sm font-semibold mb-2">General tip</div>
                <p className="text-sm text-[var(--text-2)]">
                  Mix academic vocabulary (empirisch, die Implikation, die Kausalität) with everyday B2 terms in every practice session.
                  Real exams test both registers — only knowing one will cost you marks.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link href="/exams" className="glass-card p-5 block group hover:border-[var(--gold)]" style={{ transition: 'border-color 0.2s' }}>
            <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--gold)' }}>EXAM INFO</div>
            <div className="font-semibold">Goethe-Zertifikat &amp; telc Deutsch</div>
            <div className="text-sm text-[var(--muted)] mt-1">Official formats, times, pass criteria, free practice materials.</div>
          </Link>
          <Link href="/resources" className="glass-card p-5 block group hover:border-[var(--gold)]" style={{ transition: 'border-color 0.2s' }}>
            <div className="text-xs font-bold tracking-widest mb-2" style={{ color: 'var(--gold)' }}>RESOURCES</div>
            <div className="font-semibold">Trusted Learning Resources</div>
            <div className="text-sm text-[var(--muted)] mt-1">DW, Nachrichtenleicht, Schubert-Verlag, official Modellsätze and more.</div>
          </Link>
        </div>

        <div className="text-center text-xs text-[var(--muted)] pb-4">
          All progress saved locally in your browser (Vietnam time) · For Anh Kiet
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
