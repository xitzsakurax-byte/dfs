'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0D14] text-[#F5F7FA] px-6">
      <div className="max-w-md w-full text-center">
        <Link href="/" className="inline-flex items-center gap-3 mb-8">
          <div className="logo-mark flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B1E3D] to-[#C24A3A] text-white font-black text-4xl tracking-tighter">GF</div>
          <span className="font-black text-4xl tracking-tighter">GermanForge</span>
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight mb-4">Login removed</h1>
        
        <div className="practice-card p-8 mb-6 text-left">
          <p className="text-[#C5CAD6] mb-4">
            Backend, accounts, and cloud sync have been fully removed per your request.
          </p>
          <p className="text-[#C5CAD6] mb-4">
            <strong>All progress is now 100% local</strong> in your browser for <span className="text-[#F4C430]">Anh Kiet</span>. 
            No logins, no Supabase, no network calls, no lag.
          </p>
          <p className="text-sm text-[#8F95A3]">
            Everything (bank mastery, streaks, XP, daily history, performance insights, writing attempts) saves instantly to your device.
          </p>
        </div>

        <Button asChild className="btn-primary px-10 py-4 text-lg">
          <Link href="/dashboard">Continue to Dashboard</Link>
        </Button>

        <div className="mt-8">
          <Link href="/" className="text-sm text-[#8F95A3] hover:text-[#EDEEF2]">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
