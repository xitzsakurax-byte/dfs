"use client";
// All progress lives in one localStorage entry. No backend, no account.
import { useSyncExternalStore } from "react";
import type { Level } from "./core";
import { addDays, today } from "./core";
import type { Card, Grade } from "./srs";
import { schedule } from "./srs";

const KEY = "gf2";

export type Settings = {
  level: Level;
  examDate: string; // YYYY-MM-DD or ""
  newPerDay: number;
  rate: number; // speech rate for listening
  voice: string; // preferred voice name, "" = auto
};

export type Attempt = {
  score: number;
  max: number;
  at: string; // day
  answers?: Record<string, string>;
  text?: string; // writing / notes
  seconds?: number;
};

export type Day = { reviews: number; learned: number; grammar: number; test: number };

export type State = {
  v: 2;
  settings: Settings;
  cards: Record<string, Card>;
  grammar: Record<string, { right: number; total: number; wrong: string[]; at: string }>;
  attempts: Record<string, Attempt>; // key: testId/moduleId
  days: Record<string, Day>;
  onboarded: boolean;
};

export const DEFAULT_STATE: State = {
  v: 2,
  settings: { level: "B1", examDate: "", newPerDay: 10, rate: 0.92, voice: "" },
  cards: {},
  grammar: {},
  attempts: {},
  days: {},
  onboarded: false,
};

let state: State = DEFAULT_STATE;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    // Clean slate for v2: remove every key the old app wrote.
    for (const k of Object.keys(localStorage)) {
      if (k.startsWith("germanforge_")) localStorage.removeItem(k);
    }
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<State>;
      state = {
        ...DEFAULT_STATE,
        ...parsed,
        settings: { ...DEFAULT_STATE.settings, ...(parsed.settings ?? {}) },
      };
    }
  } catch {
    state = DEFAULT_STATE;
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked: keep working in memory */
  }
}

function emit() {
  for (const l of listeners) l();
}

export function getState(): State {
  load();
  return state;
}

export function setState(fn: (s: State) => State) {
  load();
  state = fn(state);
  persist();
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
}

/** Read the store. Returns the defaults during SSR and hydration, then the saved state. */
export function useStore<T>(select: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => select(getState()),
    () => select(DEFAULT_STATE),
  );
}

const noop = () => () => {};
/** True once the component runs in the browser after hydration. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}

// ── Mutations ────────────────────────────────────────────────────────────

function bump(s: State, field: keyof Day, n = 1): State {
  const d = today();
  const cur = s.days[d] ?? { reviews: 0, learned: 0, grammar: 0, test: 0 };
  return { ...s, days: { ...s.days, [d]: { ...cur, [field]: cur[field] + n } } };
}

export function updateSettings(patch: Partial<Settings>) {
  setState((s) => ({ ...s, settings: { ...s.settings, ...patch }, onboarded: true }));
}

export function gradeCard(id: string, grade: Grade) {
  setState((s) => {
    const prev = s.cards[id];
    const next = schedule(prev, grade, today());
    const withCard = { ...s, cards: { ...s.cards, [id]: next } };
    return bump(withCard, prev ? "reviews" : "learned");
  });
}

export function recordGrammar(topic: string, itemId: string, ok: boolean) {
  setState((s) => {
    const g = s.grammar[topic] ?? { right: 0, total: 0, wrong: [], at: "" };
    const wrong = ok ? g.wrong.filter((w) => w !== itemId) : Array.from(new Set([...g.wrong, itemId]));
    const next = { right: g.right + (ok ? 1 : 0), total: g.total + 1, wrong, at: today() };
    return bump({ ...s, grammar: { ...s.grammar, [topic]: next } }, "grammar");
  });
}

export function saveAttempt(key: string, a: Omit<Attempt, "at">, items: number) {
  setState((s) => bump({ ...s, attempts: { ...s.attempts, [key]: { ...a, at: today() } } }, "test", items));
}

export function resetAll() {
  setState(() => ({ ...DEFAULT_STATE }));
}

export function exportJSON(): string {
  return JSON.stringify(getState(), null, 2);
}

export function importJSON(raw: string): boolean {
  try {
    const parsed = JSON.parse(raw) as State;
    if (parsed?.v !== 2 || typeof parsed.cards !== "object") return false;
    setState(() => ({ ...DEFAULT_STATE, ...parsed, settings: { ...DEFAULT_STATE.settings, ...parsed.settings } }));
    return true;
  } catch {
    return false;
  }
}

// ── Derived values ───────────────────────────────────────────────────────

export function streak(days: State["days"], day: string): number {
  const active = (d: string) => {
    const x = days[d];
    return !!x && x.reviews + x.learned + x.grammar + x.test > 0;
  };
  let n = 0;
  let cur = active(day) ? day : addDays(day, -1);
  while (active(cur)) {
    n += 1;
    cur = addDays(cur, -1);
  }
  return n;
}

export function learnedToday(days: State["days"], day: string): number {
  return days[day]?.learned ?? 0;
}
