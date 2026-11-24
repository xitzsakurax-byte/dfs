"use client";
import Link from "next/link";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/core";
import { say } from "@/lib/speech";
import { useStore } from "@/lib/store";

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[background,color,border,transform] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 select-none";
const variants = {
  primary: "bg-btn text-btn-ink hover:opacity-90",
  secondary: "border border-line-strong bg-surface text-ink hover:bg-surface-2",
  ghost: "text-ink-2 hover:bg-surface-2 hover:text-ink",
  accent: "bg-accent text-white hover:opacity-90 dark:text-bg",
};
const sizes = { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-12 px-5 text-[15px]" };

export function Button({ variant = "primary", size = "md", className, ...rest }: BtnProps) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...rest} />;
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: BtnProps["variant"];
  size?: BtnProps["size"];
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </Link>
  );
}

export function Card({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-xl border border-line bg-surface shadow-card", className)} {...rest}>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("text-xs font-medium uppercase tracking-[0.12em] text-muted", className)}>{children}</div>;
}

export function PageHead({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-8">
      {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
      <h1 className="text-[28px] font-semibold leading-tight tracking-tight sm:text-[34px]">{title}</h1>
      {children && <div className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-2">{children}</div>}
    </div>
  );
}

export function Bar({ value, className, tone = "ink" }: { value: number; className?: string; tone?: "ink" | "accent" | "good" }) {
  const color = tone === "accent" ? "bg-accent" : tone === "good" ? "bg-good" : "bg-ink";
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-surface-2", className)}>
      <div className={cn("h-full rounded-full transition-[width] duration-500", color)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Pill({ children, tone = "plain", className }: { children: React.ReactNode; tone?: "plain" | "accent" | "good" | "bad"; className?: string }) {
  const t = {
    plain: "border-line bg-surface-2 text-ink-2",
    accent: "border-transparent bg-accent-soft text-accent-ink",
    good: "border-transparent bg-good-soft text-good",
    bad: "border-transparent bg-bad-soft text-bad",
  }[tone];
  return <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium", t, className)}>{children}</span>;
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  className,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex rounded-lg border border-line bg-surface-2 p-0.5", className)} role="tablist">
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            value === o.value ? "bg-surface font-medium text-ink shadow-card" : "text-muted hover:text-ink",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SpeakButton({ text, className, size = 16 }: { text: string; className?: string; size?: number }) {
  const rate = useStore((s) => s.settings.rate);
  const voice = useStore((s) => s.settings.voice);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        say(text, rate, voice);
      }}
      className={cn("inline-grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-ink", className)}
      aria-label={`Listen: ${text}`}
      title="Listen"
    >
      <Volume2 size={size} />
    </button>
  );
}

export function Stat({ label, value, hint }: { label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div>
      <div className="text-xs text-muted">{label}</div>
      <div className="tabular mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-muted">{hint}</div>}
    </div>
  );
}
