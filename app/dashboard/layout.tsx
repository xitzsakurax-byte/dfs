import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple guest mode state (will become real later)
  const streak = 14;
  const hearts = 4;
  const xp = 2840;
  const level = 12;

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Bright Duolingo-style header */}
      <header className="duo-header sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16 text-white">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-[-1px]">
              <div className="bg-white text-[#58cc02] h-9 w-9 rounded-2xl flex items-center justify-center text-3xl font-black">GF</div>
              GermanForge
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-bold">
              <Link href="/dashboard" className="hover:underline">Home</Link>
              <Link href="/practice" className="hover:underline">Practice</Link>
            </nav>
          </div>

          {/* Colorful top stats */}
          <div className="flex items-center gap-5 text-sm font-bold">
            {/* Hearts */}
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-2xl">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={`heart ${i >= hearts ? 'lost' : ''}`}>❤️</span>
              ))}
            </div>

            {/* Streak */}
            <div className="flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-2xl">
              <Flame className="h-5 w-5" />
              <span className="font-black tabular-nums">{streak}</span>
              <span className="text-xs opacity-80">DAY STREAK</span>
            </div>

            {/* XP + Level */}
            <div className="bg-white text-[#1f2937] px-4 py-1 rounded-2xl flex items-center gap-2 font-black">
              <span>{xp.toLocaleString()} XP</span>
              <span className="text-[#58cc02]">Lv.{level}</span>
            </div>

            <Button asChild variant="secondary" size="sm" className="rounded-2xl bg-white text-[#1f2937] font-bold">
              <Link href="/">Guest mode</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
