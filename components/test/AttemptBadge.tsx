"use client";
import { pct } from "@/lib/core";
import { useStore } from "@/lib/store";
import { Pill } from "@/components/ui";

export function AttemptBadge({ k }: { k: string }) {
  const a = useStore((s) => s.attempts[k]);
  if (!a) return <span className="text-xs text-muted">Not started</span>;
  if (!a.max) return <Pill tone="plain">Done · {a.at}</Pill>;
  const p = pct(a.score, a.max);
  return <Pill tone={p >= 60 ? "good" : "bad"}>{p}/100</Pill>;
}
