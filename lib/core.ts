// Shared primitives: levels, dates (Vietnam time), text helpers, deterministic shuffle.

export type Level = "B1" | "B2" | "C1";
export const LEVELS: Level[] = ["B1", "B2", "C1"];

export const TZ = "Asia/Ho_Chi_Minh";

const dayFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today's date in Vietnam as YYYY-MM-DD. Call only on the client (effects, handlers, hydrated renders). */
export function today(now: Date = new Date()): string {
  return dayFmt.format(now);
}

export function addDays(day: string, n: number): string {
  const d = new Date(day + "T12:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function daysBetween(a: string, b: string): number {
  const da = Date.parse(a + "T12:00:00Z");
  const db = Date.parse(b + "T12:00:00Z");
  return Math.round((db - da) / 86400000);
}

export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/** Small stable string hash (FNV-1a). */
export function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic shuffle so server and client render the same order. */
export function seededShuffle<T>(arr: T[], seed: string): T[] {
  const out = arr.slice();
  let x = hash(seed) || 1;
  for (let i = out.length - 1; i > 0; i--) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    const j = (x >>> 0) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Normalise an answer for lenient comparison (case, spacing, punctuation, ß/ss). */
export function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/[.,!?;:"„“”']/g, "")
    .replace(/\s+/g, " ");
}

export function countWords(s: string): number {
  const m = s.trim().match(/\S+/g);
  return m ? m.length : 0;
}

export function pct(n: number, d: number): number {
  return d ? Math.round((n / d) * 100) : 0;
}
