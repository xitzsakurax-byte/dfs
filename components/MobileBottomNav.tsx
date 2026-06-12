'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { href: '/dashboard', label: 'Home' },
    { href: '/practice', label: 'Practice' },
    { href: '/practice/bank', label: 'Bank' },
    { href: '/profile', label: 'Profile' },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[200] border-t border-[#2C303A] bg-[#0A0C12]/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around h-16 px-2 text-sm">
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 font-medium tracking-tight transition-colors ${
                active ? 'text-[#F4C430]' : 'text-[#8F95A3] active:text-[#EDEEF2]'
              }`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
