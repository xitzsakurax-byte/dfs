'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import MobileBottomNav from '@/components/MobileBottomNav';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Link href="/dashboard" className="text-sm text-[#8F95A3] hover:text-[#EDEEF2]">← Back to Dashboard</Link>
          <h1 className="text-4xl font-semibold tracking-tight mt-2">Profile</h1>
        </div>

        <div className="practice-card p-8 mb-8 text-center">
          <div className="text-xs tracking-[2px] text-[#8B1E3D] mb-2">LOCAL ONLY</div>
          <div className="text-2xl font-semibold mb-2">Anh Kiet</div>
          <p className="text-[#C5CAD6]">
            Login, cloud accounts, and backend have been removed.<br />
            All your progress (bank, XP, streaks, writing, insights) is saved privately in this browser.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild className="btn-primary px-8 py-3">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <MobileBottomNav />
    </div>
  );
}
