import Link from "next/link";
import type { Metadata } from "next";
import { LEVELS } from "@/lib/core";
import { TOPICS } from "@/lib/data/grammar";
import { PageHead } from "@/components/ui";
import { TopicBadge } from "@/components/TopicBadge";

export const metadata: Metadata = { title: "Grammar" };

export default function GrammarPage() {
  return (
    <div>
      <PageHead eyebrow="Grammatik" title="Grammar">
        The structures the Goethe exams test most often, from B1 connectors to C1 participles and nominal style. Each topic has a short rule card and a drill, and your
        mistakes are saved so you can practise just those.
      </PageHead>
      <div className="space-y-10">
        {LEVELS.map((lv) => (
          <section key={lv}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-muted">{lv}</h2>
            <div className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface shadow-card">
              {TOPICS.filter((t) => t.level === lv).map((t) => (
                <Link key={t.id} href={`/grammar/${t.id}`} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2">
                  <div className="min-w-0">
                    <div className="de truncate text-[17px] font-medium">{t.title}</div>
                    <div className="text-sm text-muted">
                      {t.en} · {t.items.length} items
                    </div>
                  </div>
                  <TopicBadge id={t.id} />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
