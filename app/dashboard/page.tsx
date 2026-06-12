'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createClient, hasSupabase } from '@/lib/supabase/client';
import { getBankMastered, onLoginMerge } from '@/lib/progress';
import { toast } from 'sonner';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(true);

  const streak = 14; // demo — can be made dynamic later from profile
  const todayXP = 85;
  const dailyGoal = 120;

  // Real bank from unified progress layer (localStorage or Supabase)
  const [bankMastered, setBankMastered] = useState(0);
  const BANK_TOTAL = 3078;

  // Load auth state + bank (merged when signed in)
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

            // On first load after login, merge any local work into the cloud account
            await onLoginMerge();
          }
        }
      }

      // Bank (now async + backend-aware)
      const bank = await getBankMastered();
      if (mounted) setBankMastered(bank.length);

      // Cross-tab / after-quiz live updates (still works for guest + we can enhance later)
      const onStorage = (e: StorageEvent) => {
        if (e.key === 'germanforge_bank_mastered' && e.newValue && mounted) {
          try {
            setBankMastered(JSON.parse(e.newValue).length);
          } catch {}
        }
      };
      window.addEventListener('storage', onStorage);
      return () => window.removeEventListener('storage', onStorage);
    }

    load();

    // Optional: listen for auth changes (sign out from other tab etc)
    if (hasSupabase()) {
      const supabase = createClient();
      if (supabase) {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: any, session: any) => {
          if (!mounted) return;
          if (session?.user) {
            setUserEmail(session.user.email || null);
            setIsGuest(false);
            const bank = await getBankMastered();
            setBankMastered(bank.length);
          } else {
            setUserEmail(null);
            setIsGuest(true);
            // revert to local only
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
          <div className="mt-1 text-sm text-[#8F95A3]">{streak} days in a row. That’s the kind of consistency that shows up on exam day.</div>
          {userEmail && <div className="mt-1 text-xs text-[#F4C430]">Progress is now syncing to the cloud.</div>}
        </div>

        {/* Today’s focus — simple and human */}
        <div className="practice-card p-7 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <div className="text-sm text-[#8F95A3] mb-1">Today’s focus</div>
              <div className="text-3xl font-semibold tracking-tight tabular-nums">{todayXP} / {dailyGoal} points</div>
              <div className="mt-3 h-1.5 bg-[#2C303A] rounded-full overflow-hidden">
                <div className="h-1.5 bg-[#8B1E3D]" style={{ width: `${Math.min((todayXP / dailyGoal) * 100, 100)}%` }} />
              </div>
            </div>
            <div className="shrink-0">
              <Button asChild className="btn-primary px-6 py-2.5">
                <Link href="/practice">Do a session</Link>
              </Button>
              <div className="text-center text-xs text-[#8F95A3] mt-2">Usually 8–12 minutes</div>
            </div>
          </div>
        </div>

        {/* Two honest numbers — no KPI theater */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="practice-card p-6">
            <div className="text-sm text-[#8F95A3] mb-1">Current streak</div>
            <div className="text-5xl font-semibold tabular-nums tracking-tighter">{streak}</div>
            <div className="text-sm text-[#8F95A3] mt-1">days in a row. Small, steady, and it shows.</div>
          </div>

          <div className="practice-card p-6">
            <div className="text-sm text-[#8F95A3] mb-1">Vocabulary bank</div>
            <div className="text-5xl font-semibold tabular-nums tracking-tighter">{bankMastered}</div>
            <div className="text-sm text-[#8F95A3] mt-1">words mastered out of {BANK_TOTAL}. The ones that actually matter on the paper.</div>
            <div className="h-1.5 bg-[#2C303A] rounded-full overflow-hidden mt-3">
              <div className="h-1.5 bg-[#8B1E3D]" style={{ width: `${Math.min((bankMastered / BANK_TOTAL) * 100, 100)}%` }} />
            </div>
          </div>
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

        <div className="text-center text-xs text-[#8F95A3] mt-8">Guest mode. Everything stays on your machine. Just honest work.</div>
      </div>

      {/* Mobile phone UI — thumb-friendly bottom tabs (hidden on desktop) */}
      <MobileBottomNav />
    </div>
  );
}
