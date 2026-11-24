import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { TESTS, TEST_BY_ID } from "@/lib/data/tests";
import { MODULE_LABEL, questionCount } from "@/lib/data/tests/types";
import { AttemptBadge } from "@/components/test/AttemptBadge";

export function generateStaticParams() {
  return TESTS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const t = TEST_BY_ID[id];
  return { title: t ? `${t.exam} · ${t.title}` : "Test" };
}

export default async function TestOverview({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const test = TEST_BY_ID[id];
  if (!test) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/tests" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft size={15} /> All tests
      </Link>
      <div className="mb-8">
        <div className="text-xs font-medium uppercase tracking-[0.12em] text-muted">{test.exam}</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{test.title}</h1>
        <p className="de mt-1 text-ink-2">{test.theme}</p>
      </div>

      <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface shadow-card">
        {test.modules.map((m) => (
          <Link key={m.id} href={`/tests/${test.id}/${m.id}`} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2">
            <div>
              <div className="font-medium">{MODULE_LABEL[m.id]}</div>
              <div className="mt-0.5 text-sm text-muted">
                {m.minutes} min · {m.parts.length} {m.parts.length === 1 ? "part" : "parts"}
                {questionCount(m) ? ` · ${questionCount(m)} items` : ""}
                {m.prep ? ` · ${m.prep} min prep` : ""}
              </div>
            </div>
            <AttemptBadge k={`${test.id}/${m.id}`} />
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-line bg-surface-2/60 p-5 text-sm leading-relaxed text-ink-2">
        <p className="font-medium text-ink">How to use this test</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Do each module in one sitting, with the timer running, as on exam day.</li>
          <li>Listening is played as often as in the real exam. Read the items first: the exam gives you reading time.</li>
          <li>After submitting, read every transcript and find where each answer comes from. Wrong answers usually come from paraphrases and distractors.</li>
          <li>Writing and speaking are not scored automatically. Use the checklist, the model answer and the AI feedback prompt.</li>
        </ul>
      </div>
    </div>
  );
}
