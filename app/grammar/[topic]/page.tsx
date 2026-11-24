import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { TOPICS, TOPIC_BY_ID } from "@/lib/data/grammar";
import { Drill } from "@/components/Drill";
import { Pill } from "@/components/ui";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params;
  return { title: TOPIC_BY_ID[topic]?.title ?? "Grammar" };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = TOPIC_BY_ID[topic];
  if (!t) notFound();
  const idx = TOPICS.indexOf(t);
  const nextTopic = TOPICS[idx + 1];

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/grammar" className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <ArrowLeft size={15} /> All topics
      </Link>
      <div className="mb-6">
        <Pill>{t.level}</Pill>
        <h1 className="de mt-3 text-3xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-1 text-ink-2">{t.en}</p>
      </div>

      <details className="group mb-8 rounded-xl border border-line bg-surface shadow-card" open>
        <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold">
          Rule card <span className="font-normal text-muted group-open:hidden">· show</span>
        </summary>
        <div className="border-t border-line px-5 pb-5 pt-4">
          <ul className="space-y-2 text-[15px] leading-relaxed text-ink-2">
            {t.rules.map((r, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1.5 rounded-lg bg-surface-2/70 p-4">
            {t.examples.map((e, i) => (
              <p key={i} className="de text-[16px]">
                {e}
              </p>
            ))}
          </div>
        </div>
      </details>

      <Drill topic={t.id} items={t.items} />

      {nextTopic && (
        <div className="mt-10 border-t border-line pt-6 text-right">
          <Link href={`/grammar/${nextTopic.id}`} className="text-sm text-muted hover:text-ink">
            Next: <span className="de">{nextTopic.title}</span> →
          </Link>
        </div>
      )}
    </div>
  );
}
