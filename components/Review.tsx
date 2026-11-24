"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { cn, seededShuffle, today } from "@/lib/core";
import { DECK_BY_ID, WORD_BY_ID, WORDS, checkTyped, headword, wordsForLevel, type TypedResult, type Word } from "@/lib/data/words";
import type { Grade } from "@/lib/srs";
import { previewLabel } from "@/lib/srs";
import { getState, gradeCard, learnedToday, useStore } from "@/lib/store";
import { say } from "@/lib/speech";
import { Bar, Button, ButtonLink, Pill, SpeakButton } from "@/components/ui";

type Item = { id: string; isNew: boolean };

function buildQueue(deck: string | null): Item[] {
  const s = getState();
  const day = today();
  const inDeck = (id: string) => !deck || id.startsWith(deck + ":");
  const due = Object.entries(s.cards)
    .filter(([id, c]) => c.due <= day && inDeck(id) && WORD_BY_ID[id])
    .sort((a, b) => a[1].due.localeCompare(b[1].due))
    .map(([id]) => id);
  const pool = deck ? (DECK_BY_ID[deck]?.words ?? []) : wordsForLevel(s.settings.level);
  const allowance = deck ? 10 : Math.max(0, s.settings.newPerDay - learnedToday(s.days, day));
  const fresh = pool.filter((w) => !s.cards[w.id]).slice(0, allowance).map((w) => w.id);
  const reviews = seededShuffle(due, day).slice(0, 200);
  // Interleave: one new card after every three reviews.
  const out: Item[] = [];
  let r = 0;
  let n = 0;
  while (r < reviews.length || n < fresh.length) {
    for (let k = 0; k < 3 && r < reviews.length; k++) out.push({ id: reviews[r++], isNew: false });
    if (n < fresh.length) out.push({ id: fresh[n++], isNew: true });
  }
  return out;
}

const GRADES: { g: Grade; label: string; key: string; tone: string }[] = [
  { g: 0, label: "Again", key: "1", tone: "border-bad/40 text-bad hover:bg-bad-soft" },
  { g: 1, label: "Hard", key: "2", tone: "border-line-strong hover:bg-surface-2" },
  { g: 2, label: "Good", key: "3", tone: "border-good/40 text-good hover:bg-good-soft" },
  { g: 3, label: "Easy", key: "4", tone: "border-line-strong hover:bg-surface-2" },
];

export function Review({ deck, mode }: { deck: string | null; mode: "flip" | "type" }) {
  const rate = useStore((s) => s.settings.rate);
  const voice = useStore((s) => s.settings.voice);
  const cards = useStore((s) => s.cards);
  // Rendered client-side only (inside a Suspense boundary that reads search params).
  const [queue, setQueue] = useState<Item[] | null>(() => (typeof window === "undefined" ? null : buildQueue(deck)));
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [typed, setTyped] = useState("");
  const [result, setResult] = useState<TypedResult | null>(null);
  const [stats, setStats] = useState({ done: 0, again: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const item = queue?.[pos];
  const word: Word | undefined = item ? WORD_BY_ID[item.id] : undefined;
  const canType = mode === "type" && !!word && DECK_BY_ID[word.deck]?.typing;
  const day = useMemo(() => (queue ? today() : ""), [queue]);

  useEffect(() => {
    if (canType && !revealed) inputRef.current?.focus();
  }, [canType, revealed, pos]);

  const reveal = useCallback(() => {
    if (!word) return;
    if (canType) setResult(checkTyped(typed, word.de));
    setRevealed(true);
    say(headword(word.de), rate, voice);
  }, [word, canType, typed, rate, voice]);

  const grade = useCallback(
    (g: Grade) => {
      if (!item || !queue) return;
      gradeCard(item.id, g);
      setStats((s) => ({ done: s.done + 1, again: s.again + (g === 0 ? 1 : 0) }));
      if (g === 0) {
        // See it again later in this session.
        const next = queue.slice();
        next.splice(Math.min(pos + 4, next.length), 0, { id: item.id, isNew: false });
        setQueue(next);
      }
      setPos((p) => p + 1);
      setRevealed(false);
      setTyped("");
      setResult(null);
    },
    [item, queue, pos],
  );

  const suggested: Grade = result === "right" ? 2 : result === "close" ? 1 : 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!word) return;
      const inInput = (e.target as HTMLElement)?.tagName === "INPUT";
      if (!revealed) {
        if ((e.key === " " && !inInput) || (e.key === "Enter" && inInput)) {
          e.preventDefault();
          reveal();
        }
        return;
      }
      if (e.key === "Enter" && canType) {
        e.preventDefault();
        grade(suggested);
        return;
      }
      if (!inInput && ["1", "2", "3", "4"].includes(e.key)) grade((Number(e.key) - 1) as Grade);
      if (!inInput && e.key === " ") {
        e.preventDefault();
        grade(2);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [word, revealed, reveal, grade, canType, suggested]);

  if (!queue) return <div className="py-24 text-center text-muted">Loading…</div>;

  const deckName = deck ? DECK_BY_ID[deck]?.title : "Daily review";

  if (!word) {
    return (
      <div className="mx-auto max-w-md py-12 text-center rise">
        <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-good-soft text-good">
          <Check size={22} />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{stats.done ? "Session complete" : "Nothing due right now"}</h1>
        <p className="mt-2 text-ink-2">
          {stats.done
            ? `${stats.done} cards reviewed${stats.again ? `, ${stats.again} sent back for another round` : ""}.`
            : "All reviews are done and today's new words are learned. Come back tomorrow, or study a deck."}
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <ButtonLink href="/words" variant="secondary">
            Decks
          </ButtonLink>
          <ButtonLink href="/">Today</ButtonLink>
        </div>
      </div>
    );
  }

  const card = cards[word.id];
  const progress = (pos / queue.length) * 100;

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/words" className="text-muted hover:text-ink" aria-label="Back to decks">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <div className="mb-1.5 flex justify-between text-xs text-muted">
            <span>{deckName}</span>
            <span className="tabular">
              {pos + 1} / {queue.length}
            </span>
          </div>
          <Bar value={progress} tone="accent" />
        </div>
      </div>

      <div className="rise rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8" key={`${pos}-${word.id}`}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-1.5">
            <Pill>{word.level}</Pill>
            <Pill>{DECK_BY_ID[word.deck]?.de}</Pill>
          </div>
          {item?.isNew && <Pill tone="accent">New</Pill>}
        </div>

        {canType ? (
          <div>
            <p className="text-sm text-muted">Type the German word (with article for nouns)</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{word.en}</p>
            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={revealed}
              lang="de"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="z. B. die Bewerbung"
              className={cn(
                "de mt-5 w-full rounded-xl border bg-bg px-4 py-3 text-xl outline-none",
                !revealed && "border-line-strong focus:border-ink/50",
                result === "right" && "border-good bg-good-soft",
                result === "close" && "border-accent bg-accent-soft",
                (result === "wrong" || result === "article") && "border-bad bg-bad-soft",
              )}
            />
            {revealed && (
              <p className={cn("mt-2 text-sm font-medium", result === "right" ? "text-good" : result === "close" ? "text-accent-ink" : "text-bad")}>
                {result === "right" && "Correct."}
                {result === "close" && "Almost — check the spelling."}
                {result === "article" && "Wrong article. The article is part of the word: learn it together."}
                {result === "wrong" && "Not quite."}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <p className="de text-3xl font-medium leading-tight sm:text-4xl">{word.de}</p>
              <SpeakButton text={headword(word.de)} />
            </div>
          </div>
        )}

        {revealed && (
          <div className="mt-6 border-t border-line pt-6 rise">
            {canType ? (
              <div className="flex items-center gap-2">
                <p className="de text-2xl font-medium">{word.de}</p>
                <SpeakButton text={headword(word.de)} />
              </div>
            ) : (
              <p className="text-center text-xl font-medium text-ink-2">{word.en}</p>
            )}
            {word.ex && (
              <div className={cn("mt-4 flex items-start gap-2 rounded-xl bg-surface-2/70 p-4", !canType && "text-left")}>
                <p className="de flex-1 text-[17px] leading-relaxed">{word.ex}</p>
                <SpeakButton text={word.ex} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-5">
        {!revealed ? (
          <Button size="lg" className="w-full" onClick={reveal}>
            {canType ? "Check" : "Show answer"} <span className="ml-1 text-xs opacity-60">{canType ? "Enter" : "Space"}</span>
          </Button>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {GRADES.map(({ g, label, key, tone }) => (
              <button
                key={g}
                onClick={() => grade(g)}
                className={cn(
                  "flex flex-col items-center rounded-xl border bg-surface py-2.5 text-sm font-medium transition-colors",
                  tone,
                  canType && g === suggested && "ring-2 ring-ink/20",
                )}
              >
                {label}
                <span className="mt-0.5 text-[11px] font-normal text-muted">
                  {previewLabel(card, g, day)} · {key}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="mt-4 text-center text-xs text-muted">
        {revealed ? (canType ? "Enter accepts the suggested grade." : "Be honest: “Good” means you recalled it without hesitation.") : "Say the answer out loud before you reveal it."}
      </p>
    </div>
  );
}

export function deckStats(deckId: string | null, cards: Record<string, { ivl: number }>) {
  const words = deckId ? (DECK_BY_ID[deckId]?.words ?? []) : WORDS;
  let learned = 0;
  let known = 0;
  for (const w of words) {
    const c = cards[w.id];
    if (c) learned += 1;
    if (c && c.ivl >= 21) known += 1;
  }
  return { total: words.length, learned, known };
}
