// GermanForge — local progress sync & backup.
// The app is 100% localStorage (no backend), so "sync" means:
//  1. an automatic snapshot of every progress key once per day (last 7 kept),
//  2. one-click export to a JSON file / import from that file,
// so progress survives cleared storage and can move between devices.

import { getVietnamDateString } from '@/lib/progress';

// Every persistent progress key. Do NOT rename these (backwards compatibility).
export const PROGRESS_KEYS = [
  'germanforge_total_xp',
  'germanforge_current_streak',
  'germanforge_last_activity_date',
  'germanforge_daily_log',
  'germanforge_performance',
  'germanforge_bank_mastered',
  'germanforge_vocab_completed',
  'germanforge_grammar_completed',
  'germanforge_declensions_completed',
  'germanforge_writing_attempts',
  'germanforge_achievements',
  'germanforge_srs_queue',
  'germanforge_quest_progress',
] as const;

const BACKUPS_KEY = 'germanforge_backups';
const BACKUP_RETENTION = 7;

type Snapshot = Record<string, string>;
type BackupStore = Record<string, Snapshot>; // date → snapshot

export function collectProgress(): Snapshot {
  const out: Snapshot = {};
  for (const key of PROGRESS_KEYS) {
    const v = localStorage.getItem(key);
    if (v !== null) out[key] = v;
  }
  return out;
}

function readBackups(): BackupStore {
  try {
    return JSON.parse(localStorage.getItem(BACKUPS_KEY) || '{}');
  } catch {
    return {};
  }
}

/* Runs on every dashboard visit; writes at most one snapshot per Vietnam day
   and prunes to the newest BACKUP_RETENTION days. Returns the snapshot date. */
export function autoDailyBackup(): string {
  const today = getVietnamDateString();
  const backups = readBackups();
  if (!backups[today]) {
    backups[today] = collectProgress();
    const dates = Object.keys(backups).sort();
    while (dates.length > BACKUP_RETENTION) {
      delete backups[dates.shift() as string];
    }
    localStorage.setItem(BACKUPS_KEY, JSON.stringify(backups));
  }
  return today;
}

export function getBackupDates(): string[] {
  return Object.keys(readBackups()).sort().reverse();
}

export function restoreBackup(date: string): boolean {
  const snap = readBackups()[date];
  if (!snap) return false;
  for (const key of PROGRESS_KEYS) {
    if (snap[key] !== undefined) localStorage.setItem(key, snap[key]);
    else localStorage.removeItem(key);
  }
  return true;
}

/* Download all progress as a JSON file (germanforge-progress-<date>.json). */
export function exportProgress(): void {
  const payload = {
    app: 'GermanForge',
    version: 1,
    exportedAt: new Date().toISOString(),
    date: getVietnamDateString(),
    data: collectProgress(),
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `germanforge-progress-${payload.date}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* Import a previously exported file. Returns the number of keys restored.
   Throws on invalid files; caller decides how to surface errors. */
export async function importProgress(file: File): Promise<number> {
  const text = await file.text();
  const payload = JSON.parse(text);
  if (payload?.app !== 'GermanForge' || typeof payload?.data !== 'object' || payload.data === null) {
    throw new Error('Not a GermanForge progress file');
  }
  let count = 0;
  for (const key of PROGRESS_KEYS) {
    const v = payload.data[key];
    if (typeof v === 'string') {
      localStorage.setItem(key, v);
      count++;
    }
  }
  if (count === 0) throw new Error('File contained no progress data');
  return count;
}
