'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/practice', label: 'Practice' },
  { href: '/exams', label: 'Exams' },
  { href: '/skill-tree', label: 'Skill Tree' },
  { href: '/achievements', label: 'Achievements' },
  { href: '/resources', label: 'Resources' },
];

/* Shared glass top nav for app pages. `right` renders custom content
   (combo badge, streak chip…) on the right side. */
export default function AppNav({ right }: { right?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="GermanForge home">
            <div className="logo-mark w-9 h-9 flex items-center justify-center text-sm">GF</div>
            <span className="font-semibold tracking-tight hidden sm:block">GermanForge</span>
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm">
            {LINKS.map((l) => {
              const active = pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link"
                  style={{ color: active ? 'var(--gold-bright)' : 'var(--text-2)' }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">{right}</div>
      </div>
    </nav>
  );
}
