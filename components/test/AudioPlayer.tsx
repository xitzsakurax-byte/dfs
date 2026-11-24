"use client";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { Line } from "@/lib/speech";
import { playScript, stopSpeech, useGermanVoices } from "@/lib/speech";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/core";

let activeId: string | null = null;

export function AudioPlayer({ lines, maxPlays, id }: { lines: Line[]; maxPlays?: number; id: string }) {
  const rate = useStore((s) => s.settings.rate);
  const voice = useStore((s) => s.settings.voice);
  const { supported } = useGermanVoices();
  const [plays, setPlays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [line, setLine] = useState(-1);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => () => {
    if (activeId === id) stopSpeech();
  }, [id]);

  const left = maxPlays == null ? null : maxPlays - plays;
  const disabled = !playing && left !== null && left <= 0;

  async function toggle() {
    if (playing) {
      stopSpeech();
      setPlaying(false);
      setLine(-1);
      return;
    }
    if (disabled) return;
    activeId = id;
    setPlays((p) => p + 1);
    setPlaying(true);
    await playScript(lines, { rate, voice, onLine: setLine });
    if (activeId === id) {
      setPlaying(false);
      setLine(-1);
    }
  }

  if (!supported) {
    return (
      <div className="rounded-lg border border-line bg-surface-2 p-3 text-sm text-ink-2">
        This browser cannot read German aloud.{" "}
        <button className="underline" onClick={() => setShowFallback((v) => !v)}>
          {showFallback ? "Hide" : "Read the transcript instead"}
        </button>
        {showFallback && (
          <div className="de mt-2 space-y-1 text-[15px]">
            {lines.map((l, i) => (
              <p key={i}>{l.t}</p>
            ))}
          </div>
        )}
      </div>
    );
  }

  const progress = playing && line >= 0 ? ((line + 1) / lines.length) * 100 : 0;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors",
          disabled ? "bg-surface-2 text-muted" : "bg-btn text-btn-ink hover:opacity-90",
        )}
        aria-label={playing ? "Stop" : "Play recording"}
      >
        {playing ? <Pause size={17} /> : <Play size={17} className="translate-x-px" />}
      </button>
      <div className="min-w-0 flex-1">
        <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full rounded-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-xs text-muted">
          <span>{playing ? `Playing · ${line + 1}/${lines.length}` : disabled ? "No plays left" : "Recording"}</span>
          {left !== null && <span>{Math.max(0, left)} of {maxPlays} plays left</span>}
        </div>
      </div>
    </div>
  );
}
