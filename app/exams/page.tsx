import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { EXAMS } from "@/lib/data/exams";
import { PageHead } from "@/components/ui";

export const metadata: Metadata = { title: "Exam guide" };

export default function ExamsPage() {
  return (
    <div>
      <PageHead eyebrow="Goethe-Zertifikat" title="Exam guide">
        Every part of the Goethe-Zertifikat B1, B2 and C1 at a glance: what is tested, the task type, the number of items and the time. All figures come from the official
        Goethe-Institut model tests, the C1 test description and the exam regulations (Durchführungsbestimmungen). Check the regulations again before you register.
      </PageHead>

      <nav className="mb-8 flex gap-2">
        {EXAMS.map((e) => (
          <a key={e.level} href={`#${e.level}`} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm hover:border-ink/30">
            {e.level}
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {EXAMS.map((e) => (
          <section key={e.level} id={e.level} className="scroll-mt-20">
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-semibold tracking-tight">{e.name}</h2>
              <Link href="/tests" className="text-sm text-muted hover:text-ink">
                Practice tests →
              </Link>
            </div>
            <div className="mb-5 grid gap-2 text-sm text-ink-2 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-surface px-4 py-3">{e.pass}</div>
              <div className="rounded-lg border border-line bg-surface px-4 py-3">{e.written}</div>
            </div>

            <div className="space-y-4">
              {e.modules.map((m) => (
                <div key={m.name} className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line bg-surface-2/60 px-4 py-3">
                    <h3 className="font-semibold">{m.name}</h3>
                    <span className="text-sm text-muted">{m.time}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-sm">
                      <thead>
                        <tr className="text-left text-xs uppercase tracking-wider text-muted">
                          <th className="w-14 px-4 py-2 font-medium">Teil</th>
                          <th className="px-4 py-2 font-medium">What is tested</th>
                          <th className="px-4 py-2 font-medium">Task type</th>
                          <th className="w-16 px-4 py-2 text-right font-medium">Items</th>
                          <th className="w-24 px-4 py-2 text-right font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {m.parts.map((p) => (
                          <tr key={p.teil}>
                            <td className="tabular px-4 py-2.5 font-medium">{p.teil}</td>
                            <td className="de px-4 py-2.5 text-[15px]">{p.goal}</td>
                            <td className="de px-4 py-2.5 text-[15px] text-ink-2">{p.type}</td>
                            <td className="tabular px-4 py-2.5 text-right">{p.items ?? "—"}</td>
                            <td className="tabular px-4 py-2.5 text-right text-muted">{p.time ?? ""}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {m.note && <p className="border-t border-line px-4 py-2.5 text-xs text-muted">{m.note}</p>}
                </div>
              ))}
            </div>

            <ul className="mt-4 space-y-1 text-sm text-ink-2">
              {e.facts.map((f) => (
                <li key={f}>· {f}</li>
              ))}
            </ul>

            <div className="mt-5">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Official free material</div>
              <div className="flex flex-wrap gap-2">
                {e.sources.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 text-sm hover:border-ink/30">
                    {s.label} <ExternalLink size={13} className="text-muted" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
