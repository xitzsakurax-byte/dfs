"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, ClipboardCheck, House, Layers, UserRound } from "lucide-react";
import { cn } from "@/lib/core";

const NAV = [
  { href: "/", label: "Today", icon: House },
  { href: "/words", label: "Words", icon: Layers },
  { href: "/grammar", label: "Grammar", icon: BookOpenText },
  { href: "/tests", label: "Tests", icon: ClipboardCheck },
  { href: "/me", label: "Me", icon: UserRound },
];

function active(path: string, href: string) {
  return href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
}

export function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "/";
  const focus = /^\/tests\/[^/]+\/[^/]+/.test(path) || path.startsWith("/words/review");

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5" aria-label="GermanForge home">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-btn text-[13px] font-bold text-btn-ink">
              G
            </span>
            <span className="text-[15px] font-semibold tracking-tight">GermanForge</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-colors",
                  active(path, n.href) ? "bg-surface-2 font-medium text-ink" : "text-muted hover:text-ink",
                )}
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/exams"
              className={cn(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                active(path, "/exams") ? "bg-surface-2 font-medium text-ink" : "text-muted hover:text-ink",
              )}
            >
              Exam guide
            </Link>
          </nav>
          <Link href="/exams" className="text-sm text-muted hover:text-ink md:hidden">
            Exam guide
          </Link>
        </div>
      </header>

      <main className={cn("mx-auto w-full max-w-5xl flex-1 px-4 pt-6 sm:px-6 sm:pt-10", focus ? "pb-16" : "pb-28 md:pb-16")}>
        {children}
      </main>

      <footer className="hidden border-t border-line md:block">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-xs text-muted">
          <span>GermanForge · Goethe-Zertifikat B1–C1 · progress stays on this device</span>
          <span>Original practice material in the official Goethe exam format. Not affiliated with the Goethe-Institut.</span>
        </div>
      </footer>

      {!focus && (
        <nav
          aria-label="Main"
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
        >
          <div className="mx-auto grid max-w-md grid-cols-5">
            {NAV.map((n) => {
              const on = active(path, n.href);
              const Icon = n.icon;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn("flex flex-col items-center gap-1 py-2.5 text-[11px]", on ? "text-ink" : "text-muted")}
                >
                  <Icon size={20} strokeWidth={on ? 2.2 : 1.7} />
                  <span className={on ? "font-medium" : ""}>{n.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
