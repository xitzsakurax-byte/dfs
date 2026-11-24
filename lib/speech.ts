"use client";
// German text-to-speech through the browser's Web Speech API (offline, no audio files).
import { useSyncExternalStore } from "react";

export type Line = { s?: string; t: string };

function germanVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  return window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("de"));
}

let cachedVoices: SpeechSynthesisVoice[] = [];
const serverVoices: SpeechSynthesisVoice[] = [];

function voicesSnapshot(): SpeechSynthesisVoice[] {
  const vs = germanVoices();
  const same = vs.length === cachedVoices.length && vs.every((v, i) => v.name === cachedVoices[i]?.name);
  if (!same) cachedVoices = vs;
  return cachedVoices;
}

function subscribeVoices(cb: () => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return () => {};
  window.speechSynthesis.addEventListener("voiceschanged", cb);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", cb);
}

const noopSub = () => () => {};

export function useGermanVoices(): { voices: SpeechSynthesisVoice[]; supported: boolean } {
  const voices = useSyncExternalStore(subscribeVoices, voicesSnapshot, () => serverVoices);
  const supported = useSyncExternalStore(noopSub, () => "speechSynthesis" in window, () => true);
  return { voices, supported };
}

function pickVoice(preferred: string, index: number): SpeechSynthesisVoice | undefined {
  const vs = germanVoices();
  if (!vs.length) return undefined;
  const pref = vs.find((v) => v.name === preferred);
  if (index === 0 && pref) return pref;
  // Prefer higher quality voices first, then rotate for different speakers.
  const ranked = [...vs].sort((a, b) => score(b) - score(a));
  return ranked[index % ranked.length];
}

function score(v: SpeechSynthesisVoice): number {
  const n = v.name.toLowerCase();
  let s = 0;
  if (v.lang === "de-DE") s += 2;
  if (/natural|neural|premium|enhanced|google/.test(n)) s += 3;
  if (v.localService) s += 1;
  return s;
}

export function stopSpeech() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

/** Speak a word or sentence. */
export function say(text: string, rate = 0.92, voice = "") {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  stopSpeech();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "de-DE";
  u.rate = rate;
  const v = pickVoice(voice, 0);
  if (v) u.voice = v;
  window.speechSynthesis.speak(u);
}

/**
 * Read a script line by line. Each speaker gets a different voice when the
 * device has several German voices, otherwise a different pitch.
 * Resolves when finished or stopped.
 */
export function playScript(
  lines: Line[],
  opts: { rate: number; voice: string; onLine?: (i: number) => void },
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return resolve();
    stopSpeech();
    const speakers: string[] = [];
    for (const l of lines) if (l.s && !speakers.includes(l.s)) speakers.push(l.s);
    const voiceCount = germanVoices().length;
    let i = 0;
    const next = () => {
      if (i >= lines.length) {
        opts.onLine?.(-1);
        return resolve();
      }
      const line = lines[i];
      const idx = line.s ? speakers.indexOf(line.s) : 0;
      const u = new SpeechSynthesisUtterance(line.t);
      u.lang = "de-DE";
      u.rate = opts.rate;
      const v = pickVoice(opts.voice, idx);
      if (v) u.voice = v;
      if (voiceCount < 2) u.pitch = [1, 0.75, 1.25, 0.9][idx % 4];
      opts.onLine?.(i);
      u.onend = () => {
        i += 1;
        setTimeout(next, 350);
      };
      u.onerror = () => {
        opts.onLine?.(-1);
        resolve();
      };
      window.speechSynthesis.speak(u);
    };
    next();
  });
}
