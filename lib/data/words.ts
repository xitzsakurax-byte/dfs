import type { Level } from "../core";
import { norm, slug } from "../core";
import { DECK_SRC } from "./words-src";

export type Word = {
  id: string;
  deck: string;
  de: string;
  en: string;
  ex: string;
  level: Level;
};

export type Deck = {
  id: string;
  title: string;
  de: string;
  blurb: string;
  typing: boolean;
  words: Word[];
};

function parse(deck: (typeof DECK_SRC)[number]): Deck {
  let level: Level = "B1";
  const words: Word[] = [];
  const seen = new Set<string>();
  for (const raw of deck.src.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("#")) {
      level = line.slice(1).trim() as Level;
      continue;
    }
    const [de, en, ex = ""] = line.split(" | ").map((s) => s.trim());
    const id = `${deck.id}:${slug(de)}`;
    if (!de || !en || seen.has(id)) continue;
    seen.add(id);
    words.push({ id, deck: deck.id, de, en, ex, level });
  }
  return { id: deck.id, title: deck.title, de: deck.de, blurb: deck.blurb, typing: deck.typing, words };
}

export const DECKS: Deck[] = DECK_SRC.map(parse);
export const WORDS: Word[] = DECKS.flatMap((d) => d.words);
export const WORD_BY_ID: Record<string, Word> = Object.fromEntries(WORDS.map((w) => [w.id, w]));
export const DECK_BY_ID: Record<string, Deck> = Object.fromEntries(DECKS.map((d) => [d.id, d]));

/** The part of the headword a learner should type: no plural, no case notes. */
export function headword(de: string): string {
  let s = de.replace(/\s*\([^)]*\)/g, "");
  if (/^(der|die|das|der\/die)\s/.test(s)) s = s.split(",")[0];
  s = s.replace(/\s*\+\s*[AD]\b/g, "");
  return s.trim();
}

/** Accepted typed answers, e.g. "der/die Vorgesetzte" accepts both articles. */
export function acceptedAnswers(de: string): string[] {
  const h = headword(de);
  const tokens = h.split(" ").map((t) => (t.includes("/") && !t.includes("…") ? t.split("/") : [t]));
  let out: string[] = [""];
  for (const alts of tokens) out = out.flatMap((pre) => alts.map((a) => (pre ? pre + " " + a : a)));
  return out.slice(0, 8);
}

export type TypedResult = "right" | "article" | "close" | "wrong";

export function checkTyped(input: string, de: string): TypedResult {
  const given = norm(input);
  const answers = acceptedAnswers(de).map(norm);
  if (answers.includes(given)) return "right";
  const strip = (s: string) => s.replace(/^(der|die|das) /, "");
  if (answers.some((a) => strip(a) === strip(given) && a !== given)) return "article";
  if (answers.some((a) => lev(a, given) <= 1 && a.length > 4)) return "close";
  return "wrong";
}

function lev(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const dp = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return dp[b.length];
}

const LEVEL_RANK: Record<Level, number> = { B1: 1, B2: 2, C1: 3 };

/**
 * Order in which new words are introduced for a target level: everything at or
 * below that level, easier levels first, decks interleaved so a session mixes topics.
 */
export function wordsForLevel(level: Level): Word[] {
  const out: Word[] = [];
  for (const lv of ["B1", "B2", "C1"] as Level[]) {
    if (LEVEL_RANK[lv] > LEVEL_RANK[level]) break;
    const lists = DECKS.map((d) => d.words.filter((w) => w.level === lv));
    const max = Math.max(...lists.map((l) => l.length));
    for (let i = 0; i < max; i++) for (const l of lists) if (l[i]) out.push(l[i]);
  }
  return out;
}
