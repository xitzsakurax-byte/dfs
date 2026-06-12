'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/dashboard',     label: 'Home',    icon: '⌂' },
  { href: '/practice',      label: 'Practice', icon: '✏' },
  { href: '/achievements',  label: 'Badges',   icon: '🏆' },
  { href: '/exams',         label: 'Exams',    icon: '📋' },
  { href: '/progress',      label: 'Progress', icon: '📈' },
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
        background: 'rgba(10, 13, 20, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div className="flex items-center justify-around h-16 px-1">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 py-1 gap-0.5 transition-colors min-h-[44px]"
              style={{ color: active ? 'var(--gold)' : 'var(--muted)' }}
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
