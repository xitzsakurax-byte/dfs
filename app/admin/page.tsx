'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0D14] text-[#F5F7FA] px-6">
      <div className="max-w-md w-full text-center">
        <div className="logo-mark mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8B1E3D] to-[#C24A3A] text-white font-black text-4xl tracking-tighter">GF</div>
        
        <h1 className="text-3xl font-semibold tracking-tight mb-4">Admin removed</h1>
        
        <div className="practice-card p-8 mb-6">
          <p className="text-[#C5CAD6]">
            The admin dashboard, user accounts, and all backend features have been removed.
          </p>
          <p className="mt-3 text-[#C5CAD6]">
            This is now a <strong>pure local app</strong> for <span className="text-[#F4C430]">Anh Kiet</span>. All data (XP, streaks, bank, insights) lives only in your browser — fast and private with zero lag.
          </p>
        </div>

        <Button asChild className="btn-primary px-10 py-4 text-lg">
          <Link href="/dashboard">Back to Training</Link>
        </Button>
      </div>
    </div>
  );
}
