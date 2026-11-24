"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, RotateCcw, X } from "lucide-react";
import { cn, pct } from "@/lib/core";
import type { Module, ObjPart, Q } from "@/lib/data/tests/types";
import { scoredQs } from "@/lib/data/tests/types";
import { saveAttempt, useStore } from "@/lib/store";
import { Button, Card, Pill } from "@/components/ui";
import { AudioPlayer } from "./AudioPlayer";
import { WritePartView } from "./WritePartView";
import { SpeakPartView } from "./SpeakPartView";

type Meta = { testId: string; title: string; exam: string };
export type Answers = Record<string, string>;

const LETTER = "abcdefghijklmnopqrstuvwxyz";

function correctValue(q: Q): string {
  if (q.t === "tf") return String(q.a);
  if (q.t === "mc") return String(q.a);
  return q.a;
}

function fmt(sec: number) {
  const s = Math.max(0, Math.abs(sec));
  const m = Math.floor(s / 60);
  return `${sec < 0 ? "+" : ""}${m}:${String(s % 60).padStart(2, "0")}`;
}

export function TestRunner({ meta, module }: { meta: Meta; module: Module }) {
  const key = `${meta.testId}/${module.id}`;
  const prev = useStore((s) => s.attempts[key]);
  const [phase, setPhase] = useState<"intro" | "run" | "review">("intro");
  const [examMode, setExamMode] = useState(true);
  const [partIdx, setPartIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [texts, setTexts] = useState<Record<number, string>>({});
  const [elapsed, setElapsed] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const objective = module.parts.some((p) => p.kind === "obj");

  // Global numbering: Goethe numbers items continuously through a module.
  const counts = useMemo(() => module.parts.map((p) => (p.kind === "obj" ? scoredQs(p).length : 0)), [module]);
  const offsets = useMemo(() => counts.map((_, i) => counts.slice(0, i).reduce((a, b) => a + b, 0)), [counts]);
  const total = counts.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (phase !== "run") return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [partIdx, phase]);

  const remaining = module.minutes * 60 - elapsed;
  const answered = Object.keys(answers).length;

  const score = useMemo(() => {
    let right = 0;
    module.parts.forEach((p, pi) => {
      if (p.kind !== "obj") return;
      scoredQs(p).forEach((q, qi) => {
        if (answers[`${pi}:${qi}`] === correctValue(q)) right += 1;
      });
    });
    return right;
  }, [answers, module]);

  function submit() {
    const textJoined = Object.entries(texts)
      .map(([i, t]) => `${module.parts[Number(i)].title}\n${t}`)
      .join("\n\n");
    saveAttempt(key, { score, max: total, answers, text: textJoined || undefined, seconds: elapsed }, total || 1);
    setPartIdx(0);
    setPhase("review");
  }

  function restart() {
    setAnswers({});
    setTexts({});
    setElapsed(0);
    setPartIdx(0);
    setPhase("run");
  }

  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl rise">
        <Link href={`/tests/${meta.testId}`} className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <ArrowLeft size={15} /> {meta.exam} · {meta.title}
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">{module.title}</h1>
        <p className="mt-2 text-ink-2">
          {module.minutes} minutes · {module.parts.length} {module.parts.length === 1 ? "part" : "parts"}
          {total > 0 && <> · {total} scored items</>}
          {module.prep ? <> · {module.prep} min preparation</> : null}
        </p>
        <Card className="mt-6 divide-y divide-line">
          {module.parts.map((p, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm">
              <span className="font-medium">{p.title}</span>
              <span className="text-muted">
                {p.kind === "obj" && `${scoredQs(p).length} items${p.plays ? ` · heard ${p.plays === 1 ? "once" : "twice"}` : ""}${p.minutes ? ` · ${p.minutes} min` : ""}`}
                {p.kind === "write" && `~${p.words} words · ${p.minutes} min`}
                {p.kind === "speak" && `~${p.talk} min`}
              </span>
            </div>
          ))}
        </Card>
        {module.id === "hoeren" && (
          <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-surface p-4 text-sm">
            <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" checked={examMode} onChange={(e) => setExamMode(e.target.checked)} />
            <span>
              <span className="font-medium">Exam conditions</span>
              <span className="block text-muted">Each recording can only be played as often as in the real exam (once or twice). Untick for unlimited replays.</span>
            </span>
          </label>
        )}
        {module.id === "hoeren" && (
          <p className="mt-3 text-xs leading-relaxed text-muted">
            The recordings are read aloud by your device&apos;s German voice. For the most natural sound use Chrome, Edge or Safari; you can choose a voice under Me → Listening voice.
          </p>
        )}
        {prev && (
          <p className="mt-5 text-sm text-muted">
            Last attempt ({prev.at}): {prev.max ? `${prev.score}/${prev.max} · ${pct(prev.score, prev.max)} points` : "completed"}
          </p>
        )}
        <Button size="lg" className="mt-8 w-full sm:w-auto" onClick={() => setPhase("run")}>
          Start {module.title}
        </Button>
      </div>
    );
  }

  const part = module.parts[partIdx];
  const isReview = phase === "review";

  return (
    <div ref={topRef} className="scroll-mt-20">
      {/* Sticky exam bar */}
      <div className="sticky top-14 z-30 -mx-4 mb-6 border-b border-line bg-bg/90 px-4 py-2.5 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex items-center gap-3">
          <Link href={`/tests/${meta.testId}`} className="hidden text-sm text-muted hover:text-ink sm:inline" aria-label="Back to test overview">
            <ArrowLeft size={16} />
          </Link>
          <div className="no-scrollbar flex flex-1 gap-1 overflow-x-auto">
            {module.parts.map((p, i) => (
              <button
                key={i}
                onClick={() => setPartIdx(i)}
                className={cn(
                  "shrink-0 rounded-md px-2.5 py-1 text-[13px] transition-colors",
                  i === partIdx ? "bg-btn text-btn-ink" : "text-muted hover:bg-surface-2 hover:text-ink",
                )}
              >
                {p.title.split(" – ")[0]}
              </button>
            ))}
          </div>
          {!isReview ? (
            <div className={cn("tabular flex items-center gap-1.5 text-sm font-medium", remaining < 0 ? "text-bad" : remaining < 300 ? "text-accent" : "text-ink-2")}>
              <Clock size={14} /> {fmt(remaining)}
            </div>
          ) : (
            objective && (
              <Pill tone={pct(score, total) >= 60 ? "good" : "bad"}>
                {score}/{total}
              </Pill>
            )
          )}
        </div>
        {!isReview && remaining < 0 && <p className="mt-1.5 text-xs text-bad">Time is up — in the real exam your answers would now be collected.</p>}
      </div>

      {isReview && partIdx === 0 && <ResultSummary score={score} total={total} objective={objective} seconds={elapsed} onRetry={restart} testId={meta.testId} />}

      <div className="rise" key={partIdx}>
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-semibold tracking-tight">
            {module.title} · {part.title}
          </h2>
          {part.kind === "obj" && part.minutes && <span className="text-sm text-muted">Arbeitszeit: {part.minutes} Minuten</span>}
        </div>

        {part.kind === "obj" && (
          <ObjPartView
            part={part}
            pi={partIdx}
            offset={offsets[partIdx]}
            answers={answers}
            setAnswer={(k, v) => !isReview && setAnswers((a) => ({ ...a, [k]: v }))}
            review={isReview}
            examMode={examMode}
          />
        )}
        {part.kind === "write" && (
          <WritePartView part={part} value={texts[partIdx] ?? ""} onChange={(v) => setTexts((t) => ({ ...t, [partIdx]: v }))} review={isReview} level={meta.exam} />
        )}
        {part.kind === "speak" && <SpeakPartView part={part} prep={module.prep} />}
      </div>

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
        <Button variant="secondary" onClick={() => setPartIdx((i) => Math.max(0, i - 1))} disabled={partIdx === 0}>
          <ArrowLeft size={16} /> Previous
        </Button>
        {partIdx < module.parts.length - 1 ? (
          <Button onClick={() => setPartIdx((i) => i + 1)}>
            Next part <ArrowRight size={16} />
          </Button>
        ) : !isReview ? (
          <Button variant="accent" onClick={submit}>
            <Check size={16} /> {objective ? `Submit (${answered}/${total})` : "Finish"}
          </Button>
        ) : (
          <Button variant="secondary" onClick={restart}>
            <RotateCcw size={16} /> Try again
          </Button>
        )}
      </div>
    </div>
  );
}

function ResultSummary({ score, total, objective, seconds, onRetry, testId }: { score: number; total: number; objective: boolean; seconds: number; onRetry: () => void; testId: string }) {
  const points = pct(score, total);
  const passed = points >= 60;
  return (
    <Card className="mb-8 p-5 sm:p-6">
      {objective ? (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <div>
            <div className="text-xs text-muted">Result</div>
            <div className="tabular text-4xl font-semibold tracking-tight">
              {points}
              <span className="text-lg text-muted">/100</span>
            </div>
          </div>
          <div className="text-sm text-ink-2">
            <div>
              {score} of {total} items correct · {Math.round(seconds / 60)} min
            </div>
            <div className={cn("mt-1 font-medium", passed ? "text-good" : "text-bad")}>
              {passed ? "Pass level reached (60 points needed)." : `Below the pass mark — ${60 - points} points short.`}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-ink-2">Saved. Compare your text with the model answer and tick the checklist honestly — that is where the learning happens.</p>
      )}
      <p className="mt-4 text-xs text-muted">Correct answers are marked below. Listening transcripts are now visible.</p>
      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="secondary" onClick={onRetry}>
          <RotateCcw size={14} /> Retry
        </Button>
        <Link href={`/tests/${testId}`} className="inline-flex h-8 items-center rounded-lg px-3 text-sm text-ink-2 hover:bg-surface-2">
          Other modules
        </Link>
      </div>
    </Card>
  );
}

/* ───────────────────────── Objective parts (Lesen / Hören) ───────────────────────── */

function Paragraphs({ text, render }: { text: string; render: (chunk: string, key: string) => React.ReactNode }) {
  return (
    <div className="de prose-de text-[17px] leading-[1.7] text-ink">
      {text.split(/\n\n+/).map((para, i) => (
        <p key={i} className="whitespace-pre-line">
          {render(para, String(i))}
        </p>
      ))}
    </div>
  );
}

function ObjPartView({
  part,
  pi,
  offset,
  answers,
  setAnswer,
  review,
  examMode,
}: {
  part: ObjPart;
  pi: number;
  offset: number;
  answers: Answers;
  setAnswer: (k: string, v: string) => void;
  review: boolean;
  examMode: boolean;
}) {
  const isListening = part.groups.some((g) => g.audio);
  const hasTexts = part.groups.some((g) => g.text);
  const bank = part.bank ?? [];
  const shortBank = bank.length > 0 && bank.every((b) => b.v.length <= 48);
  const exampleKeys = new Set(part.groups.flatMap((g) => g.qs.filter((q) => q.ex && q.t === "pick").map((q) => (q as { a: string }).a)));
  const consumed = part.reuse ? new Set<string>() : exampleKeys;

  // Map scored question -> index within part
  let counter = 0;
  const indexed = part.groups.map((g) =>
    g.qs.map((q) => {
      if (q.ex) return { q, idx: -1 };
      const idx = counter++;
      return { q, idx };
    }),
  );

  const usedKeys = new Set(
    Object.entries(answers)
      .filter(([k]) => k.startsWith(`${pi}:`))
      .map(([, v]) => v),
  );

  const renderGapText = (para: string, k: string) => {
    const pieces = para.split(/(\[\[\d+\]\])/g);
    return pieces.map((piece, j) => {
      const m = piece.match(/^\[\[(\d+)\]\]$/);
      if (!m) return <span key={`${k}-${j}`}>{piece}</span>;
      const n = Number(m[1]);
      if (n === 0) {
        return (
          <span key={`${k}-${j}`} className="mx-0.5 rounded bg-surface-2 px-1.5 py-0.5 text-[15px] italic text-muted">
            <span className="mr-1 not-italic font-sans text-[11px] font-semibold uppercase">Beispiel 0</span>
            {part.gapExample}
          </span>
        );
      }
      // n-th scored question within this part (1-based) across all groups
      const idx = n - 1;
      const all = indexed.flat().filter((x) => x.idx >= 0);
      const item = all[idx];
      const val = answers[`${pi}:${idx}`];
      let shown = "";
      if (item && val != null) {
        if (item.q.t === "mc") shown = item.q.o[Number(val)];
        else if (item.q.t === "pick") shown = bank.find((b) => b.k === val)?.v.length && bank.find((b) => b.k === val)!.v.length < 24 ? bank.find((b) => b.k === val)!.v : val;
      }
      const ok = item && val === correctValue(item.q);
      return (
        <span
          key={`${k}-${j}`}
          className={cn(
            "mx-0.5 inline-flex items-baseline gap-1 rounded-md border px-1.5 font-sans text-[14px] font-medium",
            review ? (ok ? "border-good/40 bg-good-soft text-good" : "border-bad/40 bg-bad-soft text-bad") : val ? "border-accent/40 bg-accent-soft text-accent-ink" : "border-line-strong bg-surface-2 text-muted",
          )}
        >
          <span className="tabular text-[11px] opacity-70">{offset + n}</span>
          {shown || "____"}
        </span>
      );
    });
  };

  const BankList = bank.length > 0 && !shortBank && (
    <div>
      {part.bankTitle && <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{part.bankTitle}</div>}
      <ul className="space-y-2">
        {bank.map((b) => (
          <li
            key={b.k}
            className={cn(
              "flex gap-3 rounded-lg border border-line bg-surface p-3 text-[15px] leading-snug",
              consumed.has(b.k) && "opacity-45",
              !part.reuse && usedKeys.has(b.k) && !consumed.has(b.k) && "border-accent/40",
            )}
          >
            <span className="font-sans text-sm font-semibold text-muted">{b.k}</span>
            <span className="de">{b.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  const Questions = (
    <div className="space-y-6">
      {part.groups.map((g, gi) => {
        const items = indexed[gi];
        if (!items.length) return null;
        return (
          <div key={gi} className="space-y-3">
            {isListening && g.audio && (
              <div className="space-y-2">
                {g.title && <div className="text-sm font-semibold">{g.title}</div>}
                <AudioPlayer lines={g.audio} maxPlays={examMode && !review ? (part.plays ?? 2) : undefined} id={`${pi}-${gi}`} />
                {review && (
                  <details className="rounded-lg border border-line bg-surface-2/60 p-3 text-sm" open>
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted">Transcript</summary>
                    <div className="de mt-2 space-y-1.5 text-[15px] leading-relaxed">
                      {g.audio.map((l, i) => (
                        <p key={i}>
                          {l.s && <span className="font-sans text-xs font-semibold text-muted">{l.s}: </span>}
                          {l.t}
                        </p>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}
            {!isListening && hasTexts && part.groups.filter((x) => x.qs.length).length > 1 && g.title && (
              <div className="text-xs font-semibold uppercase tracking-wider text-muted">{g.title}</div>
            )}
            {items.map(({ q, idx }, qi) => (
              <QuestionRow
                key={qi}
                q={q}
                num={q.ex ? 0 : offset + idx + 1}
                value={q.ex ? correctValue(q) : answers[`${pi}:${idx}`]}
                onChange={(v) => setAnswer(`${pi}:${idx}`, v)}
                review={review || !!q.ex}
                example={!!q.ex}
                bank={bank}
                shortBank={shortBank}
                noneKey={part.noneKey}
                consumed={consumed}
                used={part.reuse ? new Set() : usedKeys}
              />
            ))}
          </div>
        );
      })}
    </div>
  );

  const Stimulus = hasTexts ? (
    <div className="space-y-6">
      {part.groups
        .filter((g) => g.text)
        .map((g, i) => {
          return (
            <article key={i} className="rounded-xl border border-line bg-surface p-5 sm:p-6">
              {g.title && <h3 className="mb-3 font-serif text-lg font-semibold">{g.title}</h3>}
              <Paragraphs text={g.text!} render={(para, k) => renderGapText(para, k)} />
            </article>
          );
        })}
    </div>
  ) : null;

  return (
    <div>
      <div className="mb-6 rounded-xl border border-line bg-surface-2/70 p-4 text-[15px] leading-relaxed">
        <span className="de">{part.task}</span>
        {isListening && (
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted">
            <span>Heard {part.plays === 1 ? "once" : "twice"} in the exam.</span>
            {part.readSeconds && <span>Reading time before listening: {part.readSeconds} s.</span>}
          </div>
        )}
      </div>

      {isListening ? (
        <div className="mx-auto max-w-3xl space-y-6">
          {shortBank && <ShortBankLegend bank={bank} title={part.bankTitle} />}
          {Questions}
        </div>
      ) : hasTexts ? (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start">
          <div className="lg:sticky lg:top-32 lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto lg:pr-2">{Stimulus}</div>
          <div className="space-y-6">
            {shortBank && <ShortBankLegend bank={bank} title={part.bankTitle} />}
            {BankList}
            {Questions}
          </div>
        </div>
      ) : BankList ? (
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="lg:sticky lg:top-32 lg:max-h-[calc(100dvh-9rem)] lg:overflow-y-auto lg:pr-2">{BankList}</div>
          <div>{Questions}</div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl">{Questions}</div>
      )}
    </div>
  );
}

function ShortBankLegend({ bank, title }: { bank: { k: string; v: string }[]; title?: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-2">
      {title && <span className="text-xs font-semibold uppercase tracking-wider text-muted">{title}</span>}
      {bank.map((b) => (
        <span key={b.k}>
          <span className="font-semibold">{b.k}</span> {b.v}
        </span>
      ))}
    </div>
  );
}

function Choice({
  label,
  sub,
  selected,
  state,
  disabled,
  onClick,
  wide,
}: {
  label: string;
  sub?: string;
  selected: boolean;
  state?: "right" | "wrong" | "answer";
  disabled?: boolean;
  onClick?: () => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "rounded-lg border text-left transition-colors",
        wide ? "flex w-full items-start gap-3 px-3.5 py-2.5" : "inline-flex min-w-11 items-center justify-center gap-2 px-3 py-2",
        state === "right" && "border-good bg-good-soft text-good",
        state === "wrong" && "border-bad bg-bad-soft text-bad",
        state === "answer" && "border-good border-dashed text-good",
        !state && selected && "border-ink bg-btn text-btn-ink",
        !state && !selected && "border-line-strong bg-surface hover:border-ink/40",
        disabled && !state && !selected && "opacity-50",
      )}
    >
      <span className={cn("text-sm font-semibold", sub && "opacity-60")}>{label}</span>
      {sub && <span className="de text-[15px] leading-snug">{sub}</span>}
    </button>
  );
}

function QuestionRow({
  q,
  num,
  value,
  onChange,
  review,
  example,
  bank,
  shortBank,
  noneKey,
  consumed,
  used,
}: {
  q: Q;
  num: number;
  value?: string;
  onChange: (v: string) => void;
  review: boolean;
  example: boolean;
  bank: { k: string; v: string }[];
  shortBank: boolean;
  noneKey?: string;
  consumed: Set<string>;
  used: Set<string>;
}) {
  const correct = correctValue(q);
  const stateFor = (v: string): "right" | "wrong" | "answer" | undefined => {
    if (!review) return undefined;
    if (example) return v === correct ? "right" : undefined;
    if (v === correct && value === correct) return "right";
    if (v === value && v !== correct) return "wrong";
    if (v === correct) return "answer";
    return undefined;
  };
  const wrong = review && !example && value !== correct;

  return (
    <div className={cn("rounded-xl border bg-surface p-4", example ? "border-dashed border-line-strong" : wrong ? "border-bad/30" : "border-line")}>
      <div className="mb-3 flex gap-3">
        <span className={cn("tabular w-6 shrink-0 text-sm font-semibold", example ? "text-muted" : "text-ink-2")}>{num}</span>
        <div className="min-w-0 flex-1">
          {example && <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted">Beispiel</div>}
          {q.q ? <p className="de text-[16px] leading-snug">{q.q}</p> : <p className="text-sm text-muted">Lücke {num}</p>}
          {review && !example && !value && <p className="mt-1 text-xs text-bad">Not answered</p>}
        </div>
      </div>
      <div className="pl-9">
        {q.t === "tf" && (
          <div className="flex gap-2">
            {(q.labels ?? ["Richtig", "Falsch"]).map((lab, i) => {
              const v = i === 0 ? "true" : "false";
              return <Choice key={v} label={lab} selected={value === v} state={stateFor(v)} disabled={review} onClick={() => onChange(v)} />;
            })}
          </div>
        )}
        {q.t === "mc" && (
          <div className={cn(q.o.every((o) => o.length <= 24) ? "flex flex-wrap gap-2" : "space-y-2")}>
            {q.o.map((o, i) => {
              const v = String(i);
              const compact = q.o.every((x) => x.length <= 24);
              return (
                <Choice
                  key={i}
                  label={LETTER[i]}
                  sub={o}
                  wide={!compact}
                  selected={value === v}
                  state={stateFor(v)}
                  disabled={review}
                  onClick={() => onChange(v)}
                />
              );
            })}
          </div>
        )}
        {q.t === "pick" && (
          <div className="flex flex-wrap gap-2">
            {bank.map((b) => (
              <Choice
                key={b.k}
                label={b.k}
                sub={shortBank ? b.v : undefined}
                selected={value === b.k}
                state={stateFor(b.k)}
                disabled={review || consumed.has(b.k)}
                onClick={() => onChange(b.k)}
              />
            ))}
            {noneKey && <Choice label={noneKey} selected={value === noneKey} state={stateFor(noneKey)} disabled={review} onClick={() => onChange(noneKey)} />}
            {!review && !shortBank && value && used.has(value) && <span className="self-center text-xs text-muted">Each option can be used once.</span>}
          </div>
        )}
        {review && !example && wrong && (
          <p className="mt-2 flex items-center gap-1 text-xs text-muted">
            <X size={12} className="text-bad" /> Correct:{" "}
            <span className="font-medium text-good">
              {q.t === "tf" ? (q.labels ?? ["Richtig", "Falsch"])[q.a ? 0 : 1] : q.t === "mc" ? `${LETTER[q.a]}) ${q.o[q.a]}` : q.a}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
