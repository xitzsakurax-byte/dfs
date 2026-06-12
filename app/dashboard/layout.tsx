import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Simple guest mode state (will become real later)
  const streak = 14;
  const xp = 2840;
  const level = 12;

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA]">
      {/* Professional dark header matching du hoc nghe duc style - no white, no icons, flag accents */}
      <header className="sticky top-0 z-50 bg-[var(--surface)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-xl tracking-tight">
              <div className="logo-mark w-8 h-8 rounded-[9px] bg-gradient-to-br from-[var(--black)] to-[var(--red)] flex items-center justify-center text-white text-sm font-bold border border-[rgba(244,196,48,.35)]">GF</div>
              GermanForge
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-[var(--muted)]">
              <Link href="/dashboard" className="hover:text-[var(--text)]">Home</Link>
              <Link href="/practice" className="hover:text-[var(--text)]">Practice</Link>
            </nav>
          </div>

          {/* Clean top stats - no icons, no white bg, elegant */}
          <div className="flex items-center gap-5 text-sm font-medium text-[var(--muted)]">
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
              <span className="font-semibold text-[var(--text)]">{streak} ngày streak</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
              <span className="font-semibold text-[var(--text)]">{xp.toLocaleString()} XP</span>
              <span className="text-[var(--gold)]">Lv.{level}</span>
            </div>

            <Button asChild variant="ghost" size="sm" className="btn-ghost text-sm">
              <Link href="/">Anh Kiet</Link>
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
