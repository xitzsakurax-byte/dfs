// Spaced repetition (SM-2 style) on whole days in Vietnam time.
import { addDays } from "./core";

export type Grade = 0 | 1 | 2 | 3; // again, hard, good, easy

export type Card = {
  due: string; // YYYY-MM-DD
  ivl: number; // days
  ease: number;
  reps: number;
  lapses: number;
  last: string;
};

export function schedule(card: Card | undefined, grade: Grade, day: string): Card {
  if (!card) {
    const ivl = grade === 0 ? 0 : grade === 3 ? 4 : 1;
    return { due: addDays(day, ivl), ivl, ease: 2.5, reps: grade === 0 ? 0 : 1, lapses: 0, last: day };
  }
  let { ivl, ease, reps, lapses } = card;
  if (grade === 0) {
    lapses += 1;
    reps = 0;
    ease = Math.max(1.3, ease - 0.2);
    ivl = 0;
  } else {
    reps += 1;
    if (grade === 1) {
      ease = Math.max(1.3, ease - 0.15);
      ivl = Math.max(1, Math.round(ivl * 1.2));
    } else if (grade === 2) {
      ivl = reps === 1 ? 1 : reps === 2 ? 3 : Math.max(ivl + 1, Math.round(ivl * ease));
    } else {
      ease = ease + 0.15;
      ivl = reps === 1 ? 4 : Math.max(ivl + 2, Math.round(ivl * ease * 1.3));
    }
  }
  ivl = Math.min(ivl, 365);
  return { due: addDays(day, ivl), ivl, ease: Math.round(ease * 100) / 100, reps, lapses, last: day };
}

/** A card counts as "known" once its interval reaches three weeks. */
export function isMature(card: Card | undefined): boolean {
  return !!card && card.ivl >= 21;
}

export function previewLabel(card: Card | undefined, grade: Grade, day: string): string {
  const next = schedule(card, grade, day);
  if (next.ivl === 0) return "again";
  if (next.ivl < 30) return `${next.ivl}d`;
  return `${Math.round(next.ivl / 30)}mo`;
}
