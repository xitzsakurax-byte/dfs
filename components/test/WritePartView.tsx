"use client";
import { useState } from "react";
import { Copy, Eye, EyeOff } from "lucide-react";
import { cn, countWords } from "@/lib/core";
import type { WritePart } from "@/lib/data/tests/types";
import { Button } from "@/components/ui";

export function WritePartView({ part, value, onChange, review, level }: { part: WritePart; value: string; onChange: (v: string) => void; review: boolean; level: string }) {
  const [showModel, setShowModel] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const words = countWords(value);
  const ratio = words / part.words;
  const tone = words === 0 ? "text-muted" : ratio < 0.8 ? "text-bad" : ratio > 1.3 ? "text-accent" : "text-good";

  async function copyForFeedback() {
    const prompt = `Bitte bewerte meinen Text wie ein Prüfer für das ${level} (Teil: ${part.title}).
Aufgabe: ${part.task}
${part.points?.length ? "Inhaltspunkte:\n" + part.points.map((p) => "- " + p).join("\n") + "\n" : ""}Geforderte Länge: circa ${part.words} Wörter.

Bewerte nach den Goethe-Kriterien (Erfüllung, Kohärenz, Wortschatz, Strukturen), nenne jeden Fehler mit Korrektur und gib eine verbesserte Version.

Mein Text:
${value}`;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start">
      <div className="space-y-4">
        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="de whitespace-pre-line text-[17px] leading-relaxed">{part.task}</p>
          {part.points && (
            <ul className="de mt-4 space-y-1.5 text-[16px]">
              {part.points.map((p, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-muted">–</span>
                  {p}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-sm text-muted">
            circa {part.words} Wörter · Arbeitszeit {part.minutes} Minuten · {part.formal ? "formell" : "informell / persönlich"}
          </p>
        </div>
        {part.checklist && (
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Self-check before you submit</div>
            <ul className="space-y-2">
              {part.checklist.map((c, i) => (
                <li key={i}>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[var(--accent)]" checked={!!checked[i]} onChange={(e) => setChecked((s) => ({ ...s, [i]: e.target.checked }))} />
                    <span className={cn(checked[i] && "text-muted line-through")}>{c}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={review}
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="sentences"
          lang="de"
          placeholder="Schreiben Sie hier Ihren Text …"
          className="de min-h-[22rem] w-full resize-y rounded-xl border border-line-strong bg-surface p-5 text-[17px] leading-relaxed outline-none focus:border-ink/50"
        />
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className={cn("tabular font-medium", tone)}>
            {words} / ~{part.words} words
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={copyForFeedback} disabled={!value.trim()}>
              <Copy size={14} /> {copied ? "Copied" : "Copy for AI feedback"}
            </Button>
            {part.model && (
              <Button size="sm" variant="ghost" onClick={() => setShowModel((v) => !v)}>
                {showModel ? <EyeOff size={14} /> : <Eye size={14} />} Model answer
              </Button>
            )}
          </div>
        </div>
        <p className="text-xs text-muted">Spell-check is off, as in the exam. “Copy for AI feedback” copies the task and your text with Goethe criteria so you can paste it into any AI assistant.</p>
        {showModel && part.model && (
          <div className="rounded-xl border border-dashed border-line-strong bg-surface-2/60 p-5">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Model answer · {countWords(part.model)} words</div>
            <p className="de whitespace-pre-line text-[16px] leading-relaxed">{part.model}</p>
          </div>
        )}
      </div>
    </div>
  );
}
