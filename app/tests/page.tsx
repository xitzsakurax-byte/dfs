import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { LEVELS } from "@/lib/core";
import { TESTS } from "@/lib/data/tests";
import { MODULE_LABEL, questionCount } from "@/lib/data/tests/types";
import { EXAM_BY_LEVEL } from "@/lib/data/exams";
import { PageHead } from "@/components/ui";
import { AttemptBadge } from "@/components/test/AttemptBadge";

export const metadata: Metadata = { title: "Practice tests" };

export default function TestsPage() {
  return (
    <div>
      <PageHead eyebrow="Modelltests" title="Practice tests">
        Full Goethe-Zertifikat papers with the same parts, item counts, task types and timings as the official model tests. The texts are original and slightly harder than
        the real exam, so exam day feels easier. You pass a module with 60 of 100 points.
      </PageHead>

      <div className="space-y-10">
        {LEVELS.map((level) => {
          const tests = TESTS.filter((t) => t.level === level);
          const exam = EXAM_BY_LEVEL[level];
          return (
            <section key={level}>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h2 className="text-lg font-semibold tracking-tight">{exam.name}</h2>
                <Link href={`/exams#${level}`} className="text-sm text-muted hover:text-ink">
                  Format →
                </Link>
              </div>
              <div className="grid gap-3">
                {tests.map((t) => (
                  <div key={t.id} className="rounded-xl border border-line bg-surface p-5 shadow-card">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <Link href={`/tests/${t.id}`} className="group inline-flex items-center gap-1 text-[17px] font-semibold">
                          {t.title}
                          <ArrowUpRight size={16} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                        <p className="de text-sm text-muted">{t.theme}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {t.modules.map((m) => (
                        <Link key={m.id} href={`/tests/${t.id}/${m.id}`} className="rounded-lg border border-line px-3 py-2.5 transition-colors hover:border-ink/30 hover:bg-surface-2">
                          <div className="text-sm font-medium">{MODULE_LABEL[m.id]}</div>
                          <div className="mt-0.5 text-xs text-muted">
                            {m.minutes} min{questionCount(m) ? ` · ${questionCount(m)} items` : ""}
                          </div>
                          <div className="mt-2">
                            <AttemptBadge k={`${t.id}/${m.id}`} />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <p className="mt-10 max-w-2xl text-sm text-muted">
        Also work through the official free model tests from the Goethe-Institut — links are in the{" "}
        <Link href="/exams" className="underline hover:text-ink">
          exam guide
        </Link>
        .
      </p>
    </div>
  );
}
