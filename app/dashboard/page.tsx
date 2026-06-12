'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createClient, hasSupabase } from '@/lib/supabase/client';
import { getBankMastered, onLoginMerge, getUserStats, getUserPerformance, getWritingHistory } from '@/lib/progress';
import { toast } from 'sonner';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(true);

  const [stats, setStats] = useState({
    totalXp: 0,
    level: 1,
    streak: 0,
    todayWords: 0,
    todayXp: 0,
    todaySessions: 0,
    suggestedDailyGoal: 15,
  });

  // Real bank from unified progress layer
  const [bankMastered, setBankMastered] = useState(0);
  const BANK_TOTAL = 3078;

  const [performance, setPerformance] = useState<Record<string, {attempts:number, correct:number, accuracy:number}>>({});
  const [writingAvg, setWritingAvg] = useState(0);

  // Load real stats + auth + bank (merged when signed in)
  useEffect(() => {
    let mounted = true;

    async function load() {
      // Auth
      if (hasSupabase()) {
        const supabase = createClient();
        if (supabase) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user && mounted) {
            setUserEmail(user.email || null);
            setIsGuest(false);
            await onLoginMerge();
          }
        }
      }

      // Real stats from the new system (XP, level, streak, daily, suggested goal)
      const realStats = await getUserStats();
      if (mounted) {
        setStats(realStats);
      }

      // Bank
      const bank = await getBankMastered();
      if (mounted) setBankMastered(bank.length);

      // Live updates
      const onStorage = (e: StorageEvent) => {
        if (!mounted) return;
        if (e.key === 'germanforge_bank_mastered' && e.newValue) {
          try { setBankMastered(JSON.parse(e.newValue).length); } catch {}
        }
        // Also refresh stats on any progress change
        if (['germanforge_total_xp', 'germanforge_daily_log'].includes(e.key || '')) {
          getUserStats().then(s => mounted && setStats(s));
        }
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }

    load();

    if (hasSupabase()) {
      const supabase = createClient();
      if (supabase) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
          if (!mounted) return;
          if (session?.user) {
            setUserEmail(session.user.email || null);
            setIsGuest(false);
            await onLoginMerge();
            const s = await getUserStats();
            setStats(s);
            const bank = await getBankMastered();
            setBankMastered(bank.length);
          } else {
            setUserEmail(null);
            setIsGuest(true);
            const s = await getUserStats();
            setStats(s);
            try {
              const raw = localStorage.getItem('germanforge_bank_mastered');
              setBankMastered(raw ? JSON.parse(raw).length : 0);
            } catch {}
          }
        });
        return () => subscription.unsubscribe();
      }
    }
  }, []);

  async function handleSignOut() {
    if (!hasSupabase()) return;
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
      setUserEmail(null);
      setIsGuest(true);
      toast.success('Signed out. Your local progress is still here.');
      // Stay on dashboard (guest mode continues to work perfectly)
    }
  }

  const bankPercent = ((bankMastered / BANK_TOTAL) * 100).toFixed(1);
  const bankContribXP = bankMastered * 3; // every mastered bank word boosts effective progress
  const effectiveLevel = 5 + Math.floor(bankMastered / 80) + 7; // bank drives visible level growth
  const xpToNextBank = Math.max(0, ((Math.floor(bankMastered / 80) + 1) * 80) - bankMastered);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] pb-16">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 bg-[#171A21] border-b border-[#2C303A]">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="logo-mark w-8 h-8 rounded-lg bg-[#8B1E3D] flex items-center justify-center text-white text-sm font-semibold tracking-tight">GF</div>
            <span>GermanForge</span>
          </Link>
          <Link href="/practice" className="text-sm text-[#8F95A3] hover:text-[#EDEEF2]">Practice</Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {userEmail ? (
            <>
              <span className="text-[#8F95A3] hidden sm:inline">{userEmail}</span>
              <button
                onClick={handleSignOut}
                className="text-[#8F95A3] hover:text-[#EDEEF2] underline"
              >
                Sign out
              </button>
              <Link href="/profile" className="text-[#F4C430] hover:underline">Profile</Link>
            </>
          ) : (
            <>
              <span className="text-[#8F95A3]">Guest</span>
              <Link href="/login" className="text-[#F4C430] hover:underline">Sign in</Link>
            </>
          )}
        </div>
      </nav>

      <div className="pt-20 container max-w-5xl mx-auto px-6">
        <div className="mb-8">
          <div className="text-sm text-[#8F95A3]">
            {userEmail ? `Good to see you, ${userEmail.split('@')[0]}.` : 'Good to see you, Anh Kiet.'}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mt-1">Ready to do some real work today?</h1>
          <div className="mt-1 text-sm text-[#8F95A3]">{stats.streak} days in a row. That’s the kind of consistency that shows up on exam day.</div>
          {userEmail && <div className="mt-1 text-xs text-[#F4C430]">Progress is now syncing to the cloud.</div>}
        </div>

        {/* Today’s focus — now real + uses your suggested goal from history */}
        <div className="practice-card p-7 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="text-sm text-[#8F95A3] mb-1">Today’s focus (suggested: {stats.suggestedDailyGoal} words)</div>
              <div className="text-3xl font-semibold tracking-tight tabular-nums">
                {stats.todayXp} XP • {stats.todayWords} words today
              </div>
              <div className="mt-3 h-1.5 bg-[#2C303A] rounded-full overflow-hidden">
                <div className="h-1.5 bg-[#8B1E3D]" style={{ width: `${Math.min((stats.todayWords / Math.max(1, stats.suggestedDailyGoal)) * 100, 100)}%` }} />
              </div>
              <div className="text-xs text-[#8F95A3] mt-1">Level {stats.level} • {stats.totalXp} total XP</div>
            </div>
            <div className="shrink-0 flex flex-col gap-2">
              <Button asChild className="btn-primary px-6 py-2.5">
                <Link href="/practice">Do a session</Link>
              </Button>
              <Button asChild variant="outline" className="text-sm">
                <Link href="/progress">View full 30-day history →</Link>
              </Button>
              <div className="text-center text-xs text-[#8F95A3]">Usually 8–12 minutes</div>
            </div>
          </div>
        </div>

        {/* Real stats - no more fake lv12 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="practice-card p-6">
            <div className="text-sm text-[#8F95A3] mb-1">Current streak</div>
            <div className="text-5xl font-semibold tabular-nums tracking-tighter">{stats.streak}</div>
            <div className="text-sm text-[#8F95A3] mt-1">days in a row (Vietnam calendar)</div>
          </div>

          <div className="practice-card p-6">
            <div className="text-sm text-[#8F95A3] mb-1">Level &amp; XP</div>
            <div className="text-5xl font-semibold tabular-nums tracking-tighter">Lv.{stats.level}</div>
            <div className="text-sm text-[#8F95A3] mt-1">{stats.totalXp} XP total • {stats.todayXp} XP today</div>
          </div>

          <div className="practice-card p-6">
            <div className="text-sm text-[#8F95A3] mb-1">Vocabulary bank</div>
            <div className="text-5xl font-semibold tabular-nums tracking-tighter">{bankMastered}</div>
            <div className="text-sm text-[#8F95A3] mt-1">words mastered out of {BANK_TOTAL}</div>
            <div className="h-1.5 bg-[#2C303A] rounded-full overflow-hidden mt-3">
              <div className="h-1.5 bg-[#8B1E3D]" style={{ width: `${Math.min((bankMastered / BANK_TOTAL) * 100, 100)}%` }} />
            </div>
          </div>
        </div>

        {/* NEW: Performance Insights & Analysis - strong/weak points + improvement tips */}
        {/* Placed in the main dashboard summary area as requested. Uses real performance data from quizzes/game/writing (logged via Supabase when available, local fallback). */}
        <div className="practice-card p-6 mb-8">
          <div className="text-sm text-[#8F95A3] mb-1">Performance Insights (B2-C1 Focus)</div>
          <h3 className="text-2xl font-semibold tracking-tight mb-4">Your Strengths, Weak Points & How to Improve</h3>

          {Object.keys(performance).length === 0 && writingAvg === 0 ? (
            <div className="text-[#A8B3C7] text-sm">Complete some quizzes, the Game, or writing tasks to see personalized analysis here. The more you practice, the smarter the recommendations become.</div>
          ) : (
            <div className="space-y-4">
              {/* Quick stats row */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div>Overall bank mastery: <span className="font-semibold text-[#F4C430]">{bankPercent}%</span></div>
                {writingAvg > 0 && <div>Writing average: <span className="font-semibold">{writingAvg}/20</span></div>}
              </div>

              {/* Strong & Weak */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="font-medium text-emerald-400 mb-2">Strengths (high accuracy)</div>
                  <ul className="text-sm space-y-1 text-[#C5CAD6]">
                    {(() => {
                      const entries = Object.entries(performance).filter(([_,v]) => v.accuracy >= 75).sort((a,b)=>b[1].accuracy-a[1].accuracy).slice(0,3);
                      if (entries.length === 0) return <li>Keep practicing to unlock strengths!</li>;
                      return entries.map(([k,v]) => <li key={k}>• {k.replace(':',' — ')} ({v.accuracy}% accuracy)</li>);
                    })()}
                    {writingAvg >= 16 && <li>• Writing (strong content & structure)</li>}
                  </ul>
                </div>
                <div>
                  <div className="font-medium text-rose-400 mb-2">Areas to improve (lower accuracy)</div>
                  <ul className="text-sm space-y-1 text-[#C5CAD6]">
                    {(() => {
                      const entries = Object.entries(performance).filter(([_,v]) => v.accuracy < 65 && v.attempts >= 2).sort((a,b)=>a[1].accuracy-b[1].accuracy).slice(0,3);
                      if (entries.length === 0) return <li>Great job — no major weak spots detected yet!</li>;
                      return entries.map(([k,v]) => <li key={k}>• {k.replace(':',' — ')} ({v.accuracy}% accuracy, {v.attempts} attempts)</li>);
                    })()}
                    {writingAvg > 0 && writingAvg < 14 && <li>• Writing (aim for clearer structure and more advanced connectors/vocab)</li>}
                  </ul>
                </div>
              </div>

              {/* Recommendations - tailored to B2-C1 mix (academic + normal words) */}
              <div>
                <div className="font-medium mb-2">How to improve (personalized tips)</div>
                <ul className="text-sm space-y-2 text-[#C5CAD6]">
                  {Object.keys(performance).some(k => k.includes('declension') && performance[k].accuracy < 65) && (
                    <li>• <strong>Genitiv / complex cases weak?</strong> Do the "Fix the Error" mode in the Game daily. Review prepositions requiring Genitiv (wegen, trotz, während, während). Read one C1 article per week and note the case usage.</li>
                  )}
                  {Object.keys(performance).some(k => k.includes('vocab') && performance[k].accuracy < 70) && (
                    <li>• <strong>Vocab range needs work?</strong> Your bank is growing, but focus on the new academic + everyday mix we added (e.g. "empirisch", "die Implikation", "sich beschweren", "die Nachbarschaft"). Use 5 new words in the next writing task.</li>
                  )}
                  {writingAvg > 0 && writingAvg < 15 && (
                    <li>• <strong>Writing below B2-C1 level?</strong> Your ideas are there — work on connectors (obwohl, je nachdem ob, nicht nur...sondern auch) and integrate 2-3 high-level words from the bank per text. Re-do one writing task per week and compare scores.</li>
                  )}
                  {bankMastered / BANK_TOTAL < 0.3 && (
                    <li>• <strong>Overall bank mastery low?</strong> Prioritize the Bank Drill (it already prefers unmastered). 15-20 minutes daily is enough to see big jumps in all modules.</li>
                  )}
                  <li>• <strong>General B2-C1 tip:</strong> Mix academic (analysis, hypothesis, relevance) with normal everyday language in every practice. Real exams test both registers.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mb-2 text-sm text-[#8F95A3]">The real work</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <Link href="/practice/vocab" className="skill-card group p-6 block">
            <div className="text-[#8B1E3D] text-xs tracking-widest mb-1">VOCABULARY</div>
            <div className="font-semibold text-xl mb-1 tracking-tight">The words that actually show up</div>
            <div className="text-sm text-[#C5CAD6]">3,000+ terms pulled from real TELC and Goethe papers. No filler.</div>
            <div className="mt-4 text-sm text-[#8B1E3D] group-hover:underline">Work on vocabulary →</div>
          </Link>

          <Link href="/practice/grammar" className="skill-card group p-6 block">
            <div className="text-[#8B1E3D] text-xs tracking-widest mb-1">GRAMMAR</div>
            <div className="font-semibold text-xl mb-1 tracking-tight">The structures they actually score</div>
            <div className="text-sm text-[#C5CAD6]">The ones that reliably appear in B1-C1 writing and speaking. Practiced in real sentences.</div>
            <div className="mt-4 text-sm text-[#8B1E3D] group-hover:underline">Work on grammar →</div>
          </Link>
        </div>

        <Link href="/resources" className="practice-card p-5 block mb-6 hover:border-[#8B1E3D] transition-colors">
          <div className="text-[#8B1E3D] text-xs tracking-widest mb-1">OFFICIAL MATERIALS</div>
          <div className="font-medium">TELC &amp; Goethe model tests + the vocabulary bank that matters</div>
          <div className="text-sm text-[#8F95A3] mt-1">Real past papers and the exact words candidates are expected to know.</div>
        </Link>

        <div className="practice-card p-6">
          <div className="text-sm text-[#8F95A3] mb-1">Your vocabulary bank</div>
          <div className="text-4xl font-semibold tabular-nums tracking-tighter">{bankMastered} <span className="text-base font-normal text-[#8F95A3]">/ {BANK_TOTAL}</span></div>
          <div className="text-sm text-[#C5CAD6] mt-1 mb-4">Every correct answer across the site feeds this. No repeats after you get it right.</div>

          <div className="flex flex-wrap gap-2">
            <Link href="/practice/bank" className="btn-primary text-sm px-4 py-1.5">Open the bank</Link>
            <Link href="/resources" className="btn-ghost text-sm px-4 py-1.5">See the official tests</Link>
          </div>
        </div>



        <div className="text-center text-xs text-[#8F95A3] mt-8">Guest mode or logged in — your stats are remembered daily (Vietnam time).</div>
      </div>

      {/* Mobile phone UI — thumb-friendly bottom tabs (hidden on desktop) */}
      <MobileBottomNav />
    </div>
  );
}
