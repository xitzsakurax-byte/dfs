'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, Dumbbell, Trophy, FileText, TrendingUp } from 'lucide-react';

const items = [
  { href: '/dashboard', label: 'Home', Icon: House },
  { href: '/practice', label: 'Practice', Icon: Dumbbell },
  { href: '/achievements', label: 'Badges', Icon: Trophy },
  { href: '/exams', label: 'Exams', Icon: FileText },
  { href: '/progress', label: 'Progress', Icon: TrendingUp },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[200] md:hidden"
      style={{
        background: 'rgba(7, 9, 15, 0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid var(--line)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex items-center justify-around h-16 px-1">
        {items.map(({ href, label, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-col items-center justify-center flex-1 py-1.5 gap-1 min-h-[44px]"
              style={{ color: active ? 'var(--gold-bright)' : 'var(--muted)' }}
            >
              {active && (
                <span
                  className="absolute top-0 w-8 h-0.5 rounded-full"
                  style={{ background: 'linear-gradient(90deg, var(--gold), var(--gold-warm))', boxShadow: '0 0 8px var(--gold-glow-strong)' }}
                />
              )}
              <Icon size={19} strokeWidth={active ? 2.4 : 1.9} />
              <span className="text-[10px] font-semibold tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
