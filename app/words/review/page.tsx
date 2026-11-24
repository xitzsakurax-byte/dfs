"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Review } from "@/components/Review";

function ReviewWithParams() {
  const params = useSearchParams();
  const deck = params.get("deck");
  const mode = params.get("mode") === "type" ? "type" : "flip";
  return <Review key={`${deck}-${mode}`} deck={deck} mode={mode} />;
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-muted">Loading…</div>}>
      <ReviewWithParams />
    </Suspense>
  );
}
