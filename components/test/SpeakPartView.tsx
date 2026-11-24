"use client";
import { useEffect, useRef, useState } from "react";
import { Mic, Pause, Play, Square, Timer } from "lucide-react";
import { cn } from "@/lib/core";
import type { SpeakPart } from "@/lib/data/tests/types";
import { Button } from "@/components/ui";

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setLeft((l) => (l == null ? l : l - 1)), 1000);
    return () => clearInterval(id);
  }, [running]);
  return {
    left,
    running,
    start: (sec: number) => {
      setLeft(sec);
      setRunning(true);
    },
    toggle: () => setRunning((r) => !r),
    reset: () => {
      setRunning(false);
      setLeft(null);
    },
  };
}

const mmss = (s: number) => `${s < 0 ? "-" : ""}${Math.floor(Math.abs(s) / 60)}:${String(Math.abs(s) % 60).padStart(2, "0")}`;

export function SpeakPartView({ part, prep }: { part: SpeakPart; prep?: number }) {
  const [topic, setTopic] = useState(0);
  const timer = useCountdown();
  const [mode, setMode] = useState<"prep" | "talk" | null>(null);
  const [rec, setRec] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recError, setRecError] = useState("");
  const chunks = useRef<Blob[]>([]);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
  }, [audioUrl]);

  async function startRec() {
    setRecError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const r = new MediaRecorder(stream);
      chunks.current = [];
      r.ondataavailable = (e) => chunks.current.push(e.data);
      r.onstop = () => {
        const blob = new Blob(chunks.current, { type: r.mimeType });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      r.start();
      setRec(r);
    } catch {
      setRecError("Microphone not available. You can still practise with the timer.");
    }
  }
  function stopRec() {
    rec?.stop();
    setRec(null);
  }

  const t = part.topics?.[topic];
  const points = t?.points ?? part.points;

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div className="rounded-xl border border-line bg-surface p-5">
        <p className="de whitespace-pre-line text-[17px] leading-relaxed">{part.task}</p>
      </div>

      {part.topics && (
        <div className="flex flex-wrap gap-2">
          {part.topics.map((tp, i) => (
            <button
              key={i}
              onClick={() => setTopic(i)}
              className={cn("rounded-lg border px-3 py-2 text-left text-sm", topic === i ? "border-ink bg-btn text-btn-ink" : "border-line-strong bg-surface hover:border-ink/40")}
            >
              Thema {i + 1}
            </button>
          ))}
        </div>
      )}

      {(t || points) && (
        <div className="rounded-xl border border-line bg-surface p-5">
          {t && <h3 className="de mb-2 text-lg font-semibold">{t.title}</h3>}
          {t?.text && <p className="de mb-3 text-[16px] leading-relaxed text-ink-2">{t.text}</p>}
          {points && (
            <ul className="de space-y-1.5 text-[16px]">
              {points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-muted">•</span>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="rounded-xl border border-line bg-surface p-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
          <Timer size={14} /> Practice timer & recorder
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {prep ? (
            <Button size="sm" variant="secondary" onClick={() => { setMode("prep"); timer.start(prep * 60); }}>
              Preparation {prep} min
            </Button>
          ) : null}
          <Button size="sm" variant="secondary" onClick={() => { setMode("talk"); timer.start(part.talk * 60); }}>
            Speaking {part.talk} min
          </Button>
          {timer.left != null && (
            <>
              <span className={cn("tabular ml-1 text-2xl font-semibold", timer.left < 0 ? "text-bad" : timer.left < 30 ? "text-accent" : "")}>{mmss(timer.left)}</span>
              <span className="text-xs text-muted">{mode === "prep" ? "preparing" : "speaking"}</span>
              <Button size="sm" variant="ghost" onClick={timer.toggle}>
                {timer.running ? <Pause size={14} /> : <Play size={14} />}
              </Button>
              <Button size="sm" variant="ghost" onClick={timer.reset}>
                Reset
              </Button>
            </>
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {!rec ? (
            <Button size="sm" onClick={startRec}>
              <Mic size={14} /> Record yourself
            </Button>
          ) : (
            <Button size="sm" variant="accent" onClick={stopRec}>
              <Square size={13} /> Stop recording
            </Button>
          )}
          {audioUrl && <audio controls src={audioUrl} className="h-9 max-w-full" />}
        </div>
        {recError && <p className="mt-2 text-xs text-bad">{recError}</p>}
        <p className="mt-3 text-xs text-muted">Recordings stay in this browser tab and are never uploaded. Listen back for fillers, missing verbs at the end of subordinate clauses and wrong articles.</p>
      </div>

      {part.phrases && (
        <div className="rounded-xl border border-line bg-surface p-5">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Useful phrases (Redemittel)</div>
          <ul className="de grid gap-x-6 gap-y-1.5 text-[16px] sm:grid-cols-2">
            {part.phrases.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {part.model && (
        <div>
          <Button size="sm" variant="ghost" onClick={() => setShowModel((v) => !v)}>
            {showModel ? "Hide" : "Show"} sample dialogue
          </Button>
          {showModel && <p className="de mt-2 whitespace-pre-line rounded-xl border border-dashed border-line-strong bg-surface-2/60 p-5 text-[16px] leading-relaxed">{part.model}</p>}
        </div>
      )}
    </div>
  );
}
