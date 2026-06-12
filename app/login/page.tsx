'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createClient, hasSupabase } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { onLoginMerge } from '@/lib/progress';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const supabaseReady = hasSupabase();

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseReady) {
      toast.error('Backend not configured yet. Use Guest Mode for now.');
      return;
    }
    if (!email || !password) {
      setMessage('Please enter email and password.');
      return;
    }

    setLoading(true);
    setMessage('');

    const supabase = createClient();
    if (!supabase) {
      setMessage('Supabase client unavailable.');
      setLoading(false);
      return;
    }

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name: 'Anh Kiet' },
          },
        });
        if (error) throw error;
        toast.success('Account created! Check your email to confirm if required, then sign in.');
        setMode('signin');
        setPassword('');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        // Merge any local progress into the new account (so you don't lose work)
        await onLoginMerge();

        toast.success('Welcome back. Progress synced.');
        router.push('/dashboard');
      }
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
      toast.error(err.message || 'Auth failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0D14] text-[#F5F7FA] px-6">
      <div className="max-w-md w-full">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="logo-mark flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#111418] to-[#C8102E] text-white font-black text-4xl tracking-tighter border border-[rgba(244,196,48,.35)]">GF</div>
            <span className="font-black text-4xl tracking-tighter">GermanForge</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-5xl font-semibold tracking-tighter mb-3">
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </h1>
          <p className="text-[var(--muted)]">
            {supabaseReady
              ? 'Sync your mastery, streaks, and writing history across devices.'
              : 'Backend (Supabase) not configured — guest mode only for now.'}
          </p>
        </div>

        {!supabaseReady && (
          <div className="mb-6 p-4 rounded-2xl border border-[#2C303A] bg-[#171A21] text-sm text-[#A8B3C7]">
            To enable real accounts and cloud sync: create a Supabase project, run the SQL in <code>supabase/001_init.sql</code>, then add <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> in Vercel → Settings → Environment Variables and redeploy.
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
            required
            disabled={loading || !supabaseReady}
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl bg-[#171A21] border border-[#2C303A] px-5 py-4 text-lg placeholder:text-[#64748b] focus:outline-none focus:border-[#8B1E3D]"
            required
            minLength={6}
            disabled={loading || !supabaseReady}
          />

          {message && <p className="text-sm text-[#F4C430]">{message}</p>}

          <Button
            type="submit"
            disabled={loading || !supabaseReady}
            className="w-full text-xl py-7 rounded-3xl btn-primary disabled:opacity-60"
          >
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account & sign in'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          {mode === 'signin' ? (
            <>
              New here?{' '}
              <button onClick={() => setMode('signup')} className="text-[#F4C430] underline">
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('signin')} className="text-[#F4C430] underline">
                Sign in
              </button>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button asChild variant="outline" className="w-full rounded-3xl py-6 text-lg border-[#2C303A]">
            <Link href="/dashboard">Continue in Guest Mode (local only)</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/">Back to home</Link>
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-[#64748b]">
          Guest progress is always saved in your browser. Sign in to make it permanent and available on any device.
        </p>
      </div>
    </div>
  );
}
