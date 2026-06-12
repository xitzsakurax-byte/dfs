// =====================================================
// GermanForge Progress System - Pure localStorage only (no backend, no login, no lag)
// All progress for Anh Kiet stays in browser (fast, offline, private).
// Vietnam time calendar for streaks/daily.
// No Supabase, no network calls, no auth checks anywhere.
// =====================================================

import { APP } from './config';

const BANK_KEY = 'germanforge_bank_mastered'
const WRITING_KEY = 'germanforge_writing_attempts'
const XP_KEY = 'germanforge_total_xp'
const STREAK_KEY = 'germanforge_current_streak'
const LAST_DATE_KEY = 'germanforge_last_activity_date'
const DAILY_LOG_KEY = 'germanforge_daily_log'   // { '2026-06-12': { words: 12, xp: 145, sessions: 2 }, ... }

const XP_PER_LEVEL = APP.LEVEL_XP_BASE; // from centralized config for easy future tuning

// --- BANK MASTERY (core for no-repeat + feeds daily stats) - pure local, instant ---
export async function getBankMastered(): Promise<string[]> {
  try {
    const raw = localStorage.getItem(BANK_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// --- Vietnam timezone helpers (no extra deps) ---
export function getVietnamDateString(date: Date = new Date()): string {
  // Returns 'YYYY-MM-DD' in Vietnam time
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Ho_Chi_Minh',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}

export function getYesterdayVN(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return getVietnamDateString(d)
}

export function getLastNDaysVN(n: number): string[] {
  const days: string[] = []
  const today = new Date()
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    days.push(getVietnamDateString(d))
  }
  return days
}

// --- Level calculation ---
export function calculateLevel(totalXp: number): number {
  return Math.max(1, Math.floor(totalXp / XP_PER_LEVEL) + 1)
}

export function xpToNextLevel(totalXp: number): { current: number; needed: number; percent: number } {
  const level = calculateLevel(totalXp)
  const xpForCurrentLevel = (level - 1) * XP_PER_LEVEL
  const xpInLevel = totalXp - xpForCurrentLevel
  const needed = XP_PER_LEVEL
  const percent = Math.min(100, Math.round((xpInLevel / needed) * 100))
  return { current: xpInLevel, needed, percent }
}

// --- Core: get full user stats - pure localStorage, fast, no network ---
export async function getUserStats(): Promise<{
  totalXp: number
  level: number
  streak: number
  todayWords: number
  todayXp: number
  todaySessions: number
  suggestedDailyGoal: number
}> {
  const today = getVietnamDateString()

  const totalXp = parseInt(localStorage.getItem(XP_KEY) || '0', 10)
  const streak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10)
  const dailyLog = getLocalDailyLog()
  const todayData = dailyLog[today] || { words: 0, xp: 0, sessions: 0 }
  const suggested = computeSuggestedGoal(dailyLog)

  return {
    totalXp,
    level: calculateLevel(totalXp),
    streak,
    todayWords: todayData.words,
    todayXp: todayData.xp,
    todaySessions: todayData.sessions,
    suggestedDailyGoal: suggested,
  }
}

function getLocalDailyLog(): Record<string, { words: number; xp: number; sessions: number }> {
  try {
    return JSON.parse(localStorage.getItem(DAILY_LOG_KEY) || '{}')
  } catch {
    return {}
  }
}

function computeSuggestedGoal(dailyLog: Record<string, any>): number {
  const dates = Object.keys(dailyLog).sort().slice(-7)
  if (dates.length === 0) return 15
  const total = dates.reduce((sum, d) => sum + (dailyLog[d]?.words || 0), 0)
  const avg = Math.round(total / dates.length)
  return Math.max(8, Math.min(40, Math.round(avg * 1.15))) // 15% uplift, clamped
}

function computeSuggestedGoalFromHistory(history: any[]): number {
  if (!history.length) return 15
  const recent = history.slice(-7)
  const totalWords = recent.reduce((sum, h) => sum + (h.words_mastered || 0), 0)
  const avg = Math.round(totalWords / recent.length)
  return Math.max(8, Math.min(40, Math.round(avg * 1.15)))
}

// --- Log activity + award XP + update streak/daily - pure local, instant ---
export async function logDailyActivity(wordsDelta = 0, xpDelta = 0, sessionsDelta = 0) {
  if (wordsDelta === 0 && xpDelta === 0 && sessionsDelta === 0) return

  const today = getVietnamDateString()
  const yesterday = getYesterdayVN()

  // XP
  const currentXp = parseInt(localStorage.getItem(XP_KEY) || '0', 10)
  const newXp = currentXp + xpDelta
  localStorage.setItem(XP_KEY, String(newXp))

  // Streak (Vietnam calendar)
  const lastDate = localStorage.getItem(LAST_DATE_KEY) || ''
  let currentStreak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10)
  if (lastDate !== today) {
    if (lastDate === yesterday) {
      currentStreak += 1
    } else {
      currentStreak = 1
    }
    localStorage.setItem(STREAK_KEY, String(currentStreak))
    localStorage.setItem(LAST_DATE_KEY, today)
  }

  // Daily log
  const log = getLocalDailyLog()
  if (!log[today]) log[today] = { words: 0, xp: 0, sessions: 0 }
  log[today].words += wordsDelta
  log[today].xp += xpDelta
  log[today].sessions += sessionsDelta
  localStorage.setItem(DAILY_LOG_KEY, JSON.stringify(log))
}

// --- Award XP helper (used by quizzes/bank) ---
export async function awardXp(amount: number) {
  await logDailyActivity(0, amount, 0)
}

// --- addToBankMastered: instant local only + XP + daily ---
export async function addToBankMastered(word: string): Promise<void> {
  if (!word) return

  try {
    const current = JSON.parse(localStorage.getItem(BANK_KEY) || '[]')
    if (!current.includes(word)) {
      const updated = [...current, word]
      localStorage.setItem(BANK_KEY, JSON.stringify(updated))
    }
  } catch {}

  const xpForWord = 12 + Math.floor(Math.random() * 5)
  await logDailyActivity(1, xpForWord, 0)
}

// --- saveWritingAttempt: local history + XP (no cloud) ---
export async function saveWritingAttempt(attempt: {
  promptTitle: string
  totalScore: number
  fullFeedback: string
}) {
  try {
    const raw = localStorage.getItem(WRITING_KEY)
    const list = raw ? JSON.parse(raw) : []
    const newAttempt = { id: Date.now(), date: new Date().toLocaleString(), ...attempt }
    const updated = [newAttempt, ...list].slice(0, 20)
    localStorage.setItem(WRITING_KEY, JSON.stringify(updated))
  } catch {}

  const xpFromWriting = Math.max(30, attempt.totalScore * 6)
  await logDailyActivity(0, xpFromWriting, 1)
}

// --- 30-day history - pure local ---
export async function getDailyHistory(days = 30): Promise<Array<{
  date: string
  words_mastered: number
  xp_earned: number
  sessions_completed: number
}>> {
  const dateList = getLastNDaysVN(days)
  const log = getLocalDailyLog()
  return dateList.map(d => ({
    date: d,
    words_mastered: log[d]?.words || 0,
    xp_earned: log[d]?.xp || 0,
    sessions_completed: log[d]?.sessions || 0,
  }))
}

export async function getWritingHistory(): Promise<any[]> {
  try {
    const raw = localStorage.getItem(WRITING_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// --- Reset everything to zero (local only) ---
export async function resetAllToZero() {
  const keysToClear = [
    BANK_KEY, WRITING_KEY, XP_KEY, STREAK_KEY, LAST_DATE_KEY, DAILY_LOG_KEY,
    'germanforge_bank_mastered', 'germanforge_vocab_completed', 'germanforge_grammar_completed',
    'germanforge_declensions_completed', 'germanforge_writing_attempts',
    'germanforge_performance'
  ]
  keysToClear.forEach(k => localStorage.removeItem(k))
}

// --- onLoginMerge stub (no login/backend anymore) ---
export async function onLoginMerge() {
  // No-op: everything is local only now
}

// =====================================================
// Performance logging & analysis (for dashboard "strong & weak points + how to improve")
// Called automatically from quizzes, game, writing, bank when user answers.
// Data goes to Supabase (user_performance table) or localStorage for guests.
// Dashboard reads this to generate personalized insights.
// =====================================================

export async function logPerformance(category: string, subtopic: string, isCorrect: boolean) {
  if (!category || !subtopic) return;

  const today = getVietnamDateString();

  const key = 'germanforge_performance';
  const perf = JSON.parse(localStorage.getItem(key) || '{}');
  const k = `${category}:${subtopic}`;
  if (!perf[k]) perf[k] = { attempts: 0, correct: 0, last: '' };
  perf[k].attempts += 1;
  if (isCorrect) perf[k].correct += 1;
  perf[k].last = today;
  localStorage.setItem(key, JSON.stringify(perf));
}

export async function getUserPerformance(): Promise<Record<string, { attempts: number; correct: number; accuracy: number }>> {
  const result: Record<string, { attempts: number; correct: number; accuracy: number }> = {};
  const key = 'germanforge_performance';
  const perf = JSON.parse(localStorage.getItem(key) || '{}');
  Object.entries(perf).forEach(([k, v]: any) => {
    const acc = v.attempts > 0 ? Math.round((v.correct / v.attempts) * 100) : 0;
    result[k] = { attempts: v.attempts, correct: v.correct, accuracy: acc };
  });
  return result;
}

// Stubs for removed backend (kept for compat if any old calls)
export async function syncLocalBankToServer(): Promise<number> {
  return 0
}

export async function masterTermAndSync(term: string) {
  await addToBankMastered(term)
}
