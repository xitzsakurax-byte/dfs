import type { Level } from "../../core";

export type Line = { s?: string; t: string };

/**
 * Question kinds
 *  tf   – Richtig/Falsch (or Ja/Nein via labels)
 *  mc   – one correct option (index into o)
 *  pick – answer is a key from the part's bank (persons, ads, headings, sentences); noneKey (e.g. "0") = no match
 *
 * `ex: true` marks the worked example ("Beispiel 0"): shown with its solution, never scored.
 */
export type Q =
  | { t: "tf"; q: string; a: boolean; labels?: [string, string]; ex?: boolean }
  | { t: "mc"; q: string; o: string[]; a: number; ex?: boolean }
  | { t: "pick"; q: string; a: string; ex?: boolean };

export type Group = {
  title?: string;
  text?: string; // reading stimulus; gap markers [[n]] = n-th scored question of the part, [[0]] = example gap
  audio?: Line[]; // listening script, read aloud by the browser
  qs: Q[];
};

export type BankItem = { k: string; v: string };

export type ObjPart = {
  kind: "obj";
  title: string;
  minutes?: number; // vorgeschlagene Arbeitszeit
  task: string; // instructions in German, as in the exam
  bank?: BankItem[];
  bankTitle?: string;
  noneKey?: string; // key meaning "none fits" (Goethe: 0)
  reuse?: boolean; // bank keys may be chosen more than once (persons, books)
  gapExample?: string; // text shown in the example gap [[0]]
  plays?: 1 | 2; // listening: how often the audio is played in the real exam
  readSeconds?: number; // listening: time to read the items before the audio starts
  groups: Group[];
};

export type WritePart = {
  kind: "write";
  title: string;
  task: string;
  points?: string[];
  words: number;
  minutes: number;
  formal: boolean;
  checklist?: string[];
  model?: string;
};

export type SpeakTopic = { title: string; text?: string; points: string[] };

export type SpeakPart = {
  kind: "speak";
  title: string;
  task: string;
  topics?: SpeakTopic[]; // "Wählen Sie ein Thema (Thema 1 oder 2) aus."
  points?: string[];
  talk: number; // minutes
  phrases?: string[];
  model?: string;
};

export type Part = ObjPart | WritePart | SpeakPart;

export type ModuleId = "lesen" | "hoeren" | "schreiben" | "sprechen";

export type Module = { id: ModuleId; title: string; minutes: number; prep?: number; parts: Part[] };

export type Test = {
  id: string;
  level: Level;
  title: string;
  exam: string; // e.g. "Goethe-Zertifikat B1"
  theme: string;
  modules: Module[];
};

export const MODULE_LABEL: Record<ModuleId, string> = {
  lesen: "Lesen",
  hoeren: "Hören",
  schreiben: "Schreiben",
  sprechen: "Sprechen",
};

export const SNN = ["stimmt", "stimmt nicht", "dazu wird nichts gesagt"];

export function scoredQs(p: ObjPart): Q[] {
  return p.groups.flatMap((g) => g.qs.filter((q) => !q.ex));
}

export function questionCount(m: Module): number {
  return m.parts.reduce((n, p) => (p.kind === "obj" ? n + scoredQs(p).length : n), 0);
}

export function isObjective(m: Module): boolean {
  return m.parts.every((p) => p.kind === "obj");
}
