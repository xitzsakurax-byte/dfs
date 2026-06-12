'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createClient, hasSupabase } from '@/lib/supabase/client';
import { getBankMastered, getWritingHistory } from '@/lib/progress';
import { toast } from 'sonner';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function ProfilePage() {
  const [email, setEmail] = useState<string | null>(null);
  const [bankCount, setBankCount] = useState(0);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      if (hasSupabase()) {
        const supabase = createClient();
        if (supabase) {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            setEmail(user.email || null);
          }
        }
      }

      const bank = await getBankMastered();
      setBankCount(bank.length);

      const history = await getWritingHistory();
      setAttempts(history);

      setLoading(false);
    }
    load();
  }, []);

  async function signOut() {
    if (!hasSupabase()) return;
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
      toast.success('Signed out');
      window.location.href = '/';
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link href="/dashboard" className="text-sm text-[#8F95A3] hover:text-[#EDEEF2]">← Back to Dashboard</Link>
            <h1 className="text-4xl font-semibold tracking-tight mt-2">Your Profile</h1>
          </div>
          {email && (
            <Button onClick={signOut} variant="outline" className="rounded-full">Sign out</Button>
          )}
        </div>

        {!hasSupabase() && (
          <div className="mb-8 p-4 rounded-2xl bg-[#171A21] border border-[#2C303A] text-sm">
            Supabase is not configured. You are in pure guest mode. Create a Supabase project and add the env vars to enable cloud sync and this page.
          </div>
        )}

        <div className="practice-card p-8 mb-8">
          <div className="text-xs tracking-[2px] text-[#8B1E3D] mb-1">ACCOUNT</div>
          <div className="text-2xl font-semibold">{email || 'Guest (local only)'}</div>
          <div className="text-[#A8B3C7] mt-1">GermanForge B1-C1 Exam Prep • Progress saved {email ? 'to the cloud' : 'in this browser only'}</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="practice-card p-6">
            <div className="text-sm text-[#8F95A3]">Mastered from the 3000+ Bank</div>
            <div className="text-6xl font-semibold tabular-nums tracking-tighter mt-2">{bankCount}</div>
            <div className="text-xs text-[#A8B3C7] mt-1">of 3078 official Goethe B1 terms</div>
          </div>
          <div className="practice-card p-6">
            <div className="text-sm text-[#8F95A3]">Writing mock tests completed</div>
            <div className="text-6xl font-semibold tabular-nums tracking-tighter mt-2">{attempts.length}</div>
            <div className="text-xs text-[#A8B3C7] mt-1">Saved {email ? 'permanently' : 'in browser'}</div>
          </div>
        </div>

        <div className="practice-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs tracking-[2px] text-[#8B1E3D]">RECENT WRITING PRACTICE</div>
              <div className="text-xl font-semibold">Exam writing history</div>
            </div>
            <Link href="/practice/writing" className="text-sm text-[#F4C430] hover:underline">New test →</Link>
          </div>

          {loading ? (
            <div className="text-[#A8B3C7]">Loading…</div>
          ) : attempts.length === 0 ? (
            <div className="text-[#A8B3C7]">No writing attempts yet. Complete a mock test in the Writing module to see results here.</div>
          ) : (
            <div className="space-y-4">
              {attempts.slice(0, 8).map((a, i) => (
                <div key={i} className="p-4 bg-[#171A21] rounded-xl border border-[#2C303A]">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{a.prompt_title || a.promptTitle}</span>
                    <span className="font-mono text-[#F4C430]">{a.score || a.totalScore}/20</span>
                  </div>
                  <div className="text-xs text-[#8F95A3] mt-1">{a.created_at ? new Date(a.created_at).toLocaleString() : a.date}</div>
                  {a.full_feedback && (
                    <div className="mt-2 text-xs text-[#A8B3C7] line-clamp-2">{a.full_feedback.slice(0, 220)}…</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-xs text-[#64748b]">
          All progress (bank words + writing) is stored securely with Supabase when you are signed in. Guest data stays only on this device.
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
