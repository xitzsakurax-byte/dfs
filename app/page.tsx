"use client";
import Link from "next/link";
import { ArrowRight, BookOpenText, ClipboardCheck, Flame, Layers } from "lucide-react";
import { LEVELS, cn, daysBetween, pct, today, type Level } from "@/lib/core";
import { TOPICS } from "@/lib/data/grammar";
import { TESTS } from "@/lib/data/tests";
import { MODULE_LABEL } from "@/lib/data/tests/types";
import { WORDS } from "@/lib/data/words";
import { learnedToday, streak, updateSettings, useHydrated, useStore } from "@/lib/store";
import { Button, Card, Eyebrow } from "@/components/ui";

const LEVEL_RANK: Record<Level, number> = { B1: 1, B2: 2, C1: 3 };

function Step({ n, icon: Icon, title, detail, href, cta, done }: { n: number; icon: typeof Layers; title: string; detail: string; href: string; cta: string; done?: boolean }) {
  return (
    <Link href={href} className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 shadow-card transition-colors hover:border-ink/25 sm:p-5">
      <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full", done ? "bg-good-soft text-good" : "bg-surface-2 text-ink")}>
        {done ? <span className="text-sm font-semibold">✓</span> : <Icon size={18} />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted">Step {n}</div>
        <div className="font-medium">{title}</div>
        <div className="truncate text-sm text-muted">{detail}</div>
      </div>
      <span className="hidden items-center gap-1 text-sm font-medium text-ink-2 group-hover:text-ink sm:inline-flex">
        {cta} <ArrowRight size={15} />
      </span>
      <ArrowRight size={16} className="text-muted sm:hidden" />
    </Link>
  );
}

function Onboarding() {
  return (
    <Card className="mx-auto max-w-xl p-6 sm:p-8 rise">
      <Eyebrow>Welcome</Eyebrow>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Which Goethe exam are you preparing for?</h1>
      <p className="mt-2 text-ink-2">Your daily plan, new words and practice tests will follow this level. You can change it any time under Me.</p>
      <div className="mt-6 grid grid-cols-3 gap-3">
        {LEVELS.map((lv) => (
          <button key={lv} onClick={() => updateSettings({ level: lv })} className="rounded-xl border border-line-strong bg-surface py-5 text-center transition-colors hover:border-ink hover:bg-surface-2">
            <div className="text-2xl font-semibold">{lv}</div>
            <div className="mt-1 text-xs text-muted">Goethe-Zertifikat</div>
          </button>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted">No account needed. Progress is saved in this browser; you can back it up under Me.</p>
    </Card>
  );
}

export default function Today() {
  const hydrated = useHydrated();
  const s = useStore((st) => st);

  if (!hydrated) return <div className="py-24" />;
  if (!s.onboarded) return <Onboarding />;

  const day = today();
  const level = s.settings.level;
  const due = Object.values(s.cards).filter((c) => c.due <= day).length;
  const newLeft = Math.max(0, s.settings.newPerDay - learnedToday(s.days, day));
  const todayLog = s.days[day];
  const st = streak(s.days, day);
  const learned = Object.keys(s.cards).length;
  const known = Object.values(s.cards).filter((c) => c.ivl >= 21).length;
  const countdown = s.settings.examDate ? daysBetween(day, s.settings.examDate) : null;

  // Grammar suggestion: weakest practised topic at or below level, otherwise the next untouched one.
  const eligible = TOPICS.filter((t) => LEVEL_RANK[t.level] <= LEVEL_RANK[level]);
  const practised = eligible.filter((t) => s.grammar[t.id]?.total);
  const weakest = practised
    .map((t) => ({ t, acc: pct(s.grammar[t.id].right, s.grammar[t.id].total), wrong: s.grammar[t.id].wrong.length }))
    .filter((x) => x.acc < 85 || x.wrong > 0)
    .sort((a, b) => a.acc - b.acc)[0];
  const untouched = eligible.find((t) => !s.grammar[t.id]?.total);
  const grammarPick = weakest?.t ?? untouched ?? eligible[0];

  // Exam suggestion: first module of the level's tests that has not been attempted.
  const levelTests = TESTS.filter((t) => t.level === level);
  let examPick: { href: string; label: string } | null = null;
  for (const t of levelTests) {
    const m = t.modules.find((mm) => !s.attempts[`${t.id}/${mm.id}`]);
    if (m) {
      examPick = { href: `/tests/${t.id}/${m.id}`, label: `${t.exam} · ${t.title} · ${MODULE_LABEL[m.id]}` };
      break;
    }
  }

  const attempts = Object.values(s.attempts).filter((a) => a.max > 0);
  const avg = attempts.length ? Math.round(attempts.reduce((n, a) => n + pct(a.score, a.max), 0) / attempts.length) : null;

  return (
    <div className="rise">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>
            {new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date())}
          </Eyebrow>
          <h1 className="mt-1 text-[28px] font-semibold tracking-tight sm:text-[34px]">Today&apos;s plan</h1>
          <p className="mt-1 text-ink-2">
            Goethe-Zertifikat {level}
            {countdown !== null && countdown >= 0 && (
              <>
                {" · "}
                <span className="font-medium text-ink">{countdown === 0 ? "exam day!" : `${countdown} days to the exam`}</span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm">
          <Flame size={16} className={st > 0 ? "text-accent" : "text-muted"} />
          <span className="tabular font-medium">{st}</span>
          <span className="text-muted">day streak</span>
        </div>
      </div>

      <div className="space-y-3">
        <Step
          n={1}
          icon={Layers}
          title="Words"
          detail={due + newLeft > 0 ? `${due} reviews due · ${newLeft} new words` : "All done for today"}
          href="/words/review"
          cta={due + newLeft > 0 ? "Review" : "Open"}
          done={due + newLeft === 0}
        />
        <Step
          n={2}
          icon={BookOpenText}
          title={`Grammar: ${grammarPick.title}`}
          detail={weakest ? `Your weakest topic so far (${weakest.acc}%)` : `${grammarPick.en} · ${grammarPick.level}`}
          href={`/grammar/${grammarPick.id}`}
          cta="Drill"
          done={(todayLog?.grammar ?? 0) >= 10}
        />
        <Step
          n={3}
          icon={ClipboardCheck}
          title="Exam practice"
          detail={examPick ? examPick.label : `All ${level} modules attempted — retake the weakest one`}
          href={examPick ? examPick.href : "/tests"}
          cta="Start"
          done={(todayLog?.test ?? 0) > 0}
        />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Words learned", value: learned, hint: `of ${WORDS.length}` },
          { label: "Known for good", value: known, hint: "next review 3+ weeks away" },
          { label: "Grammar answers", value: Object.values(s.grammar).reduce((n, g) => n + g.total, 0), hint: "all time" },
          { label: "Test average", value: avg === null ? "–" : `${avg}`, hint: avg === null ? "no test yet" : "points / 100" },
        ].map((x) => (
          <Card key={x.label} className="p-4">
            <div className="text-xs text-muted">{x.label}</div>
            <div className="tabular mt-1 text-2xl font-semibold">{x.value}</div>
            <div className="mt-0.5 text-xs text-muted">{x.hint}</div>
          </Card>
        ))}
      </div>

      {!s.settings.examDate && (
        <Card className="mt-6 flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="text-sm text-ink-2">Set your exam date to see a countdown.</p>
          <Link href="/me">
            <Button size="sm" variant="secondary">
              Set date
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
