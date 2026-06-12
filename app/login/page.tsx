import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] px-6">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#58cc02] text-white font-black text-4xl tracking-tighter">GF</div>
            <span className="font-black text-4xl tracking-tighter">GermanForge</span>
          </Link>
        </div>

        <h1 className="text-5xl font-black tracking-tighter mb-3">Sign in coming soon</h1>
        <p className="text-xl text-[#475569] mb-8">
          Everything works great in guest mode right now. Your progress is saved in this browser.
        </p>

        <div className="space-y-3">
          <Button asChild className="duo-cta w-full text-2xl py-7 rounded-3xl">
            <Link href="/dashboard">Continue in Guest Mode</Link>
          </Button>
          <Button asChild variant="outline" className="w-full rounded-3xl py-6 text-lg font-bold">
            <Link href="/">Back to home</Link>
          </Button>
        </div>

        <p className="mt-8 text-xs text-[#64748b]">
          When we add real accounts (Supabase), you’ll be able to sync your streak and XP across devices.
        </p>
      </div>
    </div>
  );
}
