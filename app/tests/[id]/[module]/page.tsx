import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TESTS, TEST_BY_ID } from "@/lib/data/tests";
import { MODULE_LABEL } from "@/lib/data/tests/types";
import { TestRunner } from "@/components/test/TestRunner";

export function generateStaticParams() {
  return TESTS.flatMap((t) => t.modules.map((m) => ({ id: t.id, module: m.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; module: string }> }): Promise<Metadata> {
  const { id, module } = await params;
  const t = TEST_BY_ID[id];
  const m = t?.modules.find((x) => x.id === module);
  return { title: t && m ? `${MODULE_LABEL[m.id]} · ${t.exam}` : "Test" };
}

export default async function ModulePage({ params }: { params: Promise<{ id: string; module: string }> }) {
  const { id, module } = await params;
  const test = TEST_BY_ID[id];
  const mod = test?.modules.find((m) => m.id === module);
  if (!test || !mod) notFound();
  return <TestRunner meta={{ testId: test.id, title: test.title, exam: test.exam }} module={mod} />;
}
