"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Keyboard, Layers, Search } from "lucide-react";
import { cn, today, type Level } from "@/lib/core";
import { DECKS, WORDS, headword } from "@/lib/data/words";
import { learnedToday, useHydrated, useStore } from "@/lib/store";
import { deckStats } from "@/components/Review";
import { Bar, ButtonLink, Card, PageHead, Pill, Segmented, SpeakButton } from "@/components/ui";

export default function WordsPage() {
  const hydrated = useHydrated();
  const cards = useStore((s) => s.cards);
  const days = useStore((s) => s.days);
  const newPerDay = useStore((s) => s.settings.newPerDay);
  const [q, setQ] = useState("");
  const [lv, setLv] = useState<Level | "all">("all");

  const day = hydrated ? today() : "";
  const due = hydrated ? Object.values(cards).filter((c) => c.due <= day).length : 0;
  const newLeft = hydrated ? Math.max(0, newPerDay - learnedToday(days, day)) : 0;
  const all = deckStats(null, cards);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term && lv === "all") return [];
    return WORDS.filter((w) => (lv === "all" || w.level === lv) && (!term || w.de.toLowerCase().includes(term) || w.en.toLowerCase().includes(term))).slice(0, 80);
  }, [q, lv]);

  return (
    <div>
      <PageHead eyebrow="Wortschatz" title="Words">
        {WORDS.length} B1–C1 words and phrases grouped by exam topic. Spaced repetition shows each word again just before you would forget it, so ten minutes a day is enough.
      </PageHead>

      <Card className="mb-10 p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex gap-8">
            <div>
              <div className="text-xs text-muted">Due now</div>
              <div className="tabular text-3xl font-semibold">{hydrated ? due : "–"}</div>
            </div>
            <div>
              <div className="text-xs text-muted">New today</div>
              <div className="tabular text-3xl font-semibold">{hydrated ? newLeft : "–"}</div>
            </div>
            <div>
              <div className="text-xs text-muted">Learned</div>
              <div className="tabular text-3xl font-semibold">{hydrated ? all.learned : "–"}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <ButtonLink href="/words/review?mode=type" variant="secondary">
              <Keyboard size={16} /> Type mode
            </ButtonLink>
            <ButtonLink href="/words/review">
              <Layers size={16} /> Start review
            </ButtonLink>
          </div>
        </div>
        <Bar value={(all.known / all.total) * 100} tone="good" className="mt-5" />
        <p className="mt-2 text-xs text-muted">
          {all.known} of {all.total} known for good (next review 3+ weeks away)
        </p>
      </Card>

      <h2 className="mb-3 text-lg font-semibold tracking-tight">Decks</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {DECKS.map((d) => {
          const st = deckStats(d.id, cards);
          return (
            <div key={d.id} className="rounded-xl border border-line bg-surface p-4 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{d.title}</div>
                  <div className="de text-sm text-muted">{d.de}</div>
                </div>
                <span className="tabular text-sm text-muted">
                  {hydrated ? st.learned : 0}/{st.total}
                </span>
              </div>
              <p className="mt-2 text-sm leading-snug text-ink-2">{d.blurb}</p>
              <Bar value={hydrated ? (st.learned / st.total) * 100 : 0} className="mt-3" />
              <div className="mt-3 flex gap-2">
                <Link href={`/words/review?deck=${d.id}`} className="rounded-md bg-surface-2 px-2.5 py-1 text-sm hover:bg-line">
                  Study
                </Link>
                {d.typing && (
                  <Link href={`/words/review?deck=${d.id}&mode=type`} className="rounded-md px-2.5 py-1 text-sm text-ink-2 hover:bg-surface-2">
                    Type
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="mb-3 mt-12 text-lg font-semibold tracking-tight">Look up</h2>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search German or English…"
            className="h-10 w-full rounded-lg border border-line-strong bg-surface pl-9 pr-3 text-sm outline-none focus:border-ink/50"
          />
        </div>
        <Segmented
          value={lv}
          onChange={setLv}
          options={[
            { value: "all", label: "All" },
            { value: "B1", label: "B1" },
            { value: "B2", label: "B2" },
            { value: "C1", label: "C1" },
          ]}
        />
      </div>
      {results.length > 0 && (
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {results.map((w) => {
            const c = cards[w.id];
            return (
              <li key={w.id} className="flex items-start gap-3 px-4 py-3">
                <SpeakButton text={headword(w.de)} className="-ml-1" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="de text-[17px] font-medium">{w.de}</span>
                    <span className="text-sm text-ink-2">{w.en}</span>
                  </div>
                  {w.ex && <p className="de mt-0.5 text-[15px] text-muted">{w.ex}</p>}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Pill>{w.level}</Pill>
                  {hydrated && c && <span className={cn("text-[11px]", c.ivl >= 21 ? "text-good" : "text-muted")}>{c.ivl >= 21 ? "known" : `in ${c.ivl}d`}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {(q || lv !== "all") && results.length === 0 && <p className="mt-4 text-sm text-muted">No matches.</p>}
    </div>
  );
}
