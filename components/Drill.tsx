"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { cn, norm, seededShuffle } from "@/lib/core";
import type { GItem } from "@/lib/data/grammar";
import { itemId } from "@/lib/data/grammar";
import { recordGrammar, useStore } from "@/lib/store";
import { Bar, Button } from "@/components/ui";

type Entry = { item: GItem; i: number };

function isRight(item: GItem, given: string) {
  const ok = [item.a, ...(item.alt ?? [])].map(norm);
  return ok.includes(norm(given));
}

export function Drill({ topic, items }: { topic: string; items: GItem[] }) {
  const progress = useStore((s) => s.grammar[topic]);
  const wrongIds = progress?.wrong ?? [];
  const [round, setRound] = useState<Entry[]>(() => items.map((item, i) => ({ item, i })));
  const [pos, setPos] = useState(0);
  const [given, setGiven] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [results, setResults] = useState<boolean[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const entry = round[pos];
  const options = useMemo(() => (entry?.item.o ? seededShuffle([entry.item.a, ...entry.item.o], `${topic}-${entry.i}`) : null), [entry, topic]);
  const answered = given !== null;
  const correct = answered && entry ? isRight(entry.item, given) : false;

  useEffect(() => {
    if (entry && !entry.item.o && !answered) inputRef.current?.focus();
  }, [entry, answered]);

  function answer(v: string) {
    if (answered || !entry) return;
    setGiven(v);
    const ok = isRight(entry.item, v);
    setResults((r) => [...r, ok]);
    recordGrammar(topic, itemId(topic, entry.i), ok);
  }

  function next() {
    setGiven(null);
    setTyped("");
    setPos((p) => p + 1);
  }

  function restart(onlyWrong: boolean) {
    const set = onlyWrong
      ? items.map((item, i) => ({ item, i })).filter((e) => wrongIds.includes(itemId(topic, e.i)))
      : items.map((item, i) => ({ item, i }));
    setRound(seededShuffle(set, String(Date.now())));
    setPos(0);
    setGiven(null);
    setTyped("");
    setResults([]);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (answered && e.key === "Enter") {
        e.preventDefault();
        next();
      } else if (!answered && options && /^[1-4]$/.test(e.key) && (e.target as HTMLElement)?.tagName !== "INPUT") {
        const o = options[Number(e.key) - 1];
        if (o) answer(o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!entry) {
    const right = results.filter(Boolean).length;
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center shadow-card">
        <div className="tabular text-4xl font-semibold">
          {right}/{results.length}
        </div>
        <p className="mt-1 text-ink-2">{right === results.length ? "Perfect round." : "Mistakes are saved, so you can drill just those."}</p>
        <div className="mt-5 flex justify-center gap-2">
          {wrongIds.length > 0 && (
            <Button variant="secondary" onClick={() => restart(true)}>
              Drill my {wrongIds.length} mistake{wrongIds.length === 1 ? "" : "s"}
            </Button>
          )}
          <Button onClick={() => restart(false)}>
            <RotateCcw size={15} /> Again
          </Button>
        </div>
      </div>
    );
  }

  const parts = entry.item.q.split("___");

  return (
    <div>
      <div className="mb-3 flex items-center gap-3 text-xs text-muted">
        <span className="tabular">
          {pos + 1} / {round.length}
        </span>
        <Bar value={(pos / round.length) * 100} className="flex-1" tone="accent" />
      </div>
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-card sm:p-7">
        <p className="de text-xl leading-relaxed sm:text-[22px]">
          {parts.map((p, i) => (
            <span key={i}>
              {p}
              {i < parts.length - 1 && (
                <span
                  className={cn(
                    "mx-1 inline-block min-w-16 border-b-2 px-1 text-center font-medium",
                    !answered && "border-ink/30 text-muted",
                    answered && correct && "border-good text-good",
                    answered && !correct && "border-bad text-bad",
                  )}
                >
                  {answered ? given || "—" : " "}
                </span>
              )}
            </span>
          ))}
        </p>

        {options ? (
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {options.map((o, i) => {
              const isAns = isRight(entry.item, o);
              return (
                <button
                  key={o}
                  onClick={() => answer(o)}
                  disabled={answered}
                  className={cn(
                    "de flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-[17px] transition-colors",
                    !answered && "border-line-strong hover:border-ink/40 hover:bg-surface-2",
                    answered && isAns && "border-good bg-good-soft text-good",
                    answered && o === given && !isAns && "border-bad bg-bad-soft text-bad",
                    answered && o !== given && !isAns && "border-line opacity-50",
                  )}
                >
                  <span className="font-sans text-xs text-muted">{i + 1}</span>
                  {o}
                </button>
              );
            })}
          </div>
        ) : (
          <form
            className="mt-6 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!answered && typed.trim()) answer(typed.trim());
            }}
          >
            <input
              ref={inputRef}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={answered}
              lang="de"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="Type the missing part"
              className="de h-12 min-w-0 flex-1 rounded-xl border border-line-strong bg-bg px-4 text-lg outline-none focus:border-ink/50"
            />
            {!answered && <Button type="submit" size="lg">Check</Button>}
          </form>
        )}

        {answered && (
          <div className={cn("mt-5 rounded-xl p-4 text-sm leading-relaxed rise", correct ? "bg-good-soft" : "bg-bad-soft")}>
            <div className={cn("mb-1 flex items-center gap-1.5 font-semibold", correct ? "text-good" : "text-bad")}>
              {correct ? <Check size={15} /> : <X size={15} />} {correct ? "Correct" : <>Answer: <span className="de">{entry.item.a}</span></>}
            </div>
            <p className="text-ink-2">{entry.item.x}</p>
          </div>
        )}
      </div>
      {answered && (
        <div className="mt-4 flex justify-end">
          <Button onClick={next}>
            Next <span className="text-xs opacity-60">Enter</span>
          </Button>
        </div>
      )}
    </div>
  );
}
