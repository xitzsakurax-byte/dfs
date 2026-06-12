'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Library, User } from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const items = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/practice', label: 'Practice', icon: BookOpen },
    { href: '/practice/bank', label: 'Bank', icon: Library },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[200] border-t border-[#2C303A] bg-[#0A0C12]/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 text-xs transition-colors ${
                active ? 'text-[#F4C430]' : 'text-[#8F95A3] active:text-[#EDEEF2]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${active ? 'text-[#F4C430]' : ''}`} />
              <span className="font-medium tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
