"use client";
import { useRef, useState } from "react";
import { Download, Upload, Volume2 } from "lucide-react";
import { LEVELS, pct, today } from "@/lib/core";
import { TEST_BY_ID } from "@/lib/data/tests";
import { MODULE_LABEL, type ModuleId } from "@/lib/data/tests/types";
import { say, useGermanVoices } from "@/lib/speech";
import { exportJSON, importJSON, resetAll, streak, updateSettings, useHydrated, useStore } from "@/lib/store";
import { Button, Card, PageHead, Segmented } from "@/components/ui";

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-xs text-muted">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function MePage() {
  const hydrated = useHydrated();
  const s = useStore((st) => st);
  const { voices, supported } = useGermanVoices();
  const [theme, setTheme] = useState<"system" | "light" | "dark">(() => {
    try {
      const t = typeof window !== "undefined" ? localStorage.getItem("gf2-theme") : null;
      return t === "light" || t === "dark" ? t : "system";
    } catch {
      return "system";
    }
  });
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function applyTheme(t: "system" | "light" | "dark") {
    setTheme(t);
    try {
      if (t === "system") {
        localStorage.removeItem("gf2-theme");
        delete document.documentElement.dataset.theme;
      } else {
        localStorage.setItem("gf2-theme", t);
        document.documentElement.dataset.theme = t;
      }
    } catch {
      document.documentElement.dataset.theme = t === "system" ? "" : t;
    }
  }

  function download() {
    const blob = new Blob([exportJSON()], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `germanforge-backup-${today()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function upload(f: File) {
    const ok = importJSON(await f.text());
    setMsg(ok ? "Backup restored." : "That file is not a GermanForge backup.");
  }

  if (!hydrated) return <div className="py-24" />;

  const day = today();
  const attempts = Object.entries(s.attempts).sort((a, b) => b[1].at.localeCompare(a[1].at));

  return (
    <div className="mx-auto max-w-2xl">
      <PageHead eyebrow="Profil" title="Me" />

      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted">Goal</h2>
      <Card className="mb-8 divide-y divide-line">
        <Row label="Target exam" hint="Sets daily new words, grammar and tests">
          <Segmented value={s.settings.level} onChange={(v) => updateSettings({ level: v })} options={LEVELS.map((l) => ({ value: l, label: l }))} />
        </Row>
        <Row label="Exam date" hint="Optional — shows a countdown">
          <input
            type="date"
            value={s.settings.examDate}
            onChange={(e) => updateSettings({ examDate: e.target.value })}
            className="h-9 rounded-lg border border-line-strong bg-surface px-2 text-sm"
          />
        </Row>
        <Row label="New words per day" hint="10 is a sustainable default">
          <Segmented
            value={String(s.settings.newPerDay)}
            onChange={(v) => updateSettings({ newPerDay: Number(v) })}
            options={["5", "10", "15", "20"].map((n) => ({ value: n, label: n }))}
          />
        </Row>
      </Card>

      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted">Listening & display</h2>
      <Card className="mb-8 divide-y divide-line">
        <Row label="Listening voice" hint={supported ? `${voices.length} German voice${voices.length === 1 ? "" : "s"} on this device` : "Speech is not supported in this browser"}>
          <div className="flex items-center gap-2">
            <select
              value={s.settings.voice}
              onChange={(e) => updateSettings({ voice: e.target.value })}
              className="h-9 max-w-[14rem] rounded-lg border border-line-strong bg-surface px-2 text-sm"
            >
              <option value="">Automatic</option>
              {voices.map((v) => (
                <option key={v.name} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
            <Button size="sm" variant="secondary" onClick={() => say("Herzlich willkommen zur Prüfung. Sie hören nun den ersten Text.", s.settings.rate, s.settings.voice)}>
              <Volume2 size={14} />
            </Button>
          </div>
        </Row>
        <Row label="Speaking speed" hint="The real exam uses natural speed (1.0)">
          <Segmented
            value={String(s.settings.rate)}
            onChange={(v) => updateSettings({ rate: Number(v) })}
            options={[
              { value: "0.8", label: "Slow" },
              { value: "0.92", label: "Calm" },
              { value: "1", label: "Exam" },
            ]}
          />
        </Row>
        <Row label="Theme">
          <Segmented
            value={theme}
            onChange={applyTheme}
            options={[
              { value: "system", label: "Auto" },
              { value: "light", label: "Light" },
              { value: "dark", label: "Dark" },
            ]}
          />
        </Row>
      </Card>

      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted">Progress</h2>
      <Card className="mb-8 p-5">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-muted">Streak</div>
            <div className="tabular text-2xl font-semibold">{streak(s.days, day)}</div>
          </div>
          <div>
            <div className="text-xs text-muted">Words</div>
            <div className="tabular text-2xl font-semibold">{Object.keys(s.cards).length}</div>
          </div>
          <div>
            <div className="text-xs text-muted">Active days</div>
            <div className="tabular text-2xl font-semibold">{Object.keys(s.days).length}</div>
          </div>
        </div>
        {attempts.length > 0 && (
          <div className="mt-5 border-t border-line pt-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">Test history</div>
            <ul className="space-y-1.5 text-sm">
              {attempts.map(([k, a]) => {
                const [tid, mid] = k.split("/");
                const t = TEST_BY_ID[tid];
                return (
                  <li key={k} className="flex justify-between gap-3">
                    <span className="truncate text-ink-2">
                      {t ? `${t.exam} · ${t.title}` : tid} · {MODULE_LABEL[mid as ModuleId] ?? mid}
                    </span>
                    <span className="tabular shrink-0">{a.max ? `${pct(a.score, a.max)}/100` : "done"}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Card>

      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted">Backup</h2>
      <Card className="mb-8 p-5">
        <p className="text-sm text-ink-2">Progress is stored only in this browser. Download a backup now and then, especially before switching phones or clearing browser data.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" onClick={download}>
            <Download size={14} /> Download backup
          </Button>
          <Button size="sm" variant="secondary" onClick={() => fileRef.current?.click()}>
            <Upload size={14} /> Restore backup
          </Button>
          <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        </div>
        {msg && <p className="mt-3 text-sm text-ink-2">{msg}</p>}
      </Card>

      <div className="text-center">
        <Button
          size="sm"
          variant="ghost"
          className="text-bad"
          onClick={() => {
            if (confirm("Delete all progress on this device? This cannot be undone.")) resetAll();
          }}
        >
          Reset all progress
        </Button>
      </div>
    </div>
  );
}
