"use client";
import { pct } from "@/lib/core";
import { useStore } from "@/lib/store";

export function TopicBadge({ id }: { id: string }) {
  const g = useStore((s) => s.grammar[id]);
  if (!g || !g.total) return <span className="text-xs text-muted">New</span>;
  const p = pct(g.right, g.total);
  return (
    <span className={p >= 80 ? "text-xs font-medium text-good" : p >= 60 ? "text-xs font-medium text-accent-ink" : "text-xs font-medium text-bad"}>
      {p}% · {g.wrong.length} to fix
    </span>
  );
}
