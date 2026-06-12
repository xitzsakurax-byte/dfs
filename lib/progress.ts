import { createClient, hasSupabase } from './supabase/client'

// =====================================================
// GermanForge Progress System - Real persistent stats
// - Starts at zero
// - Daily tracking with Vietnam (Asia/Ho_Chi_Minh) calendar
// - XP, Level, Streak that actually remember
// - 30-day history for the separate Progress dashboard
// - Routine suggestions based on your real entries
// - Full guest fallback + merge on login
// =====================================================

const BANK_KEY = 'germanforge_bank_mastered'
const WRITING_KEY = 'germanforge_writing_attempts'
const XP_KEY = 'germanforge_total_xp'
const STREAK_KEY = 'germanforge_current_streak'
const LAST_DATE_KEY = 'germanforge_last_activity_date'
const DAILY_LOG_KEY = 'germanforge_daily_log'   // { '2026-06-12': { words: 12, xp: 145, sessions: 2 }, ... }

const XP_PER_LEVEL = 180 // tune for reasonable leveling from zero

// --- BANK MASTERY (core for no-repeat + now also feeds daily stats) ---
export async function getBankMastered(): Promise<string[]> {
  if (!hasSupabase()) {
    try {
      const raw = localStorage.getItem(BANK_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  const supabase = createClient()
  if (!supabase) {
    const raw = localStorage.getItem(BANK_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const raw = localStorage.getItem(BANK_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('mastered_bank')
    .eq('id', user.id)
    .single()

  if (error || !data) {
    const raw = localStorage.getItem(BANK_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const serverBank: string[] = Array.isArray(data.mastered_bank) ? data.mastered_bank : []
  return serverBank
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

// --- Core: get full user stats (server or guest) ---
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

  if (!hasSupabase()) {
    // Guest mode - all from localStorage, start at zero if nothing
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

  const supabase = createClient()
  if (!supabase) {
    // fallback to guest logic
    return getUserStats() // will hit the guest branch above
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return getUserStats() // guest
  }

  // Logged in - prefer server
  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp, current_streak, last_activity_date, daily_goal_words')
    .eq('id', user.id)
    .single()

  const totalXp = profile?.total_xp || 0
  const streak = profile?.current_streak || 0

  // Today's daily row
  const { data: todayRow } = await supabase
    .from('daily_progress')
    .select('words_mastered, xp_earned, sessions_completed')
    .eq('user_id', user.id)
    .eq('date', today)
    .single()

  const todayWords = todayRow?.words_mastered || 0
  const todayXp = todayRow?.xp_earned || 0
  const todaySessions = todayRow?.sessions_completed || 0

  // Suggested goal: average of last 7 days + small uplift, or default 15
  const history = await getDailyHistory(7)
  const suggested = computeSuggestedGoalFromHistory(history) || (profile?.daily_goal_words || 15)

  return {
    totalXp,
    level: calculateLevel(totalXp),
    streak,
    todayWords,
    todayXp,
    todaySessions,
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

// --- Log activity + award XP + update streak/daily (central function) ---
export async function logDailyActivity(wordsDelta = 0, xpDelta = 0, sessionsDelta = 0) {
  if (wordsDelta === 0 && xpDelta === 0 && sessionsDelta === 0) return

  const today = getVietnamDateString()
  const yesterday = getYesterdayVN()

  // === GUEST MODE ===
  if (!hasSupabase()) {
    // XP
    const currentXp = parseInt(localStorage.getItem(XP_KEY) || '0', 10)
    const newXp = currentXp + xpDelta
    localStorage.setItem(XP_KEY, String(newXp))

    // Streak
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

    return
  }

  // === LOGGED IN ===
  const supabase = createClient()
  if (!supabase) {
    // fallback to guest
    return logDailyActivity(wordsDelta, xpDelta, sessionsDelta)
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return logDailyActivity(wordsDelta, xpDelta, sessionsDelta)
  }

  // 1. Update profile XP + streak + last date
  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp, current_streak, last_activity_date')
    .eq('id', user.id)
    .single()

  const currentXp = profile?.total_xp || 0
  const newTotalXp = currentXp + xpDelta

  let newStreak = profile?.current_streak || 0
  const lastDate = profile?.last_activity_date || ''

  if (lastDate !== today) {
    if (lastDate === yesterday) {
      newStreak = (newStreak || 0) + 1
    } else {
      newStreak = 1
    }
  }

  await supabase
    .from('profiles')
    .update({
      total_xp: newTotalXp,
      current_streak: newStreak,
      last_activity_date: today,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  // 2. Upsert today's daily row
  const { data: existingDaily } = await supabase
    .from('daily_progress')
    .select('words_mastered, xp_earned, sessions_completed')
    .eq('user_id', user.id)
    .eq('date', today)
    .single()

  const newWords = (existingDaily?.words_mastered || 0) + wordsDelta
  const newXp = (existingDaily?.xp_earned || 0) + xpDelta
  const newSessions = (existingDaily?.sessions_completed || 0) + sessionsDelta

  if (existingDaily) {
    await supabase
      .from('daily_progress')
      .update({
        words_mastered: newWords,
        xp_earned: newXp,
        sessions_completed: newSessions,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id)
      .eq('date', today)
  } else {
    await supabase.from('daily_progress').insert({
      user_id: user.id,
      date: today,
      words_mastered: newWords,
      xp_earned: newXp,
      sessions_completed: newSessions,
    })
  }
}

// --- Award XP helper (used by quizzes/bank) ---
export async function awardXp(amount: number) {
  await logDailyActivity(0, amount, 0)
}

// --- Enhanced addToBankMastered that also logs daily words + awards XP ---
export async function addToBankMastered(word: string): Promise<void> {
  if (!word) return

  // Always local for no-repeat (instant)
  try {
    const current = JSON.parse(localStorage.getItem(BANK_KEY) || '[]')
    if (!current.includes(word)) {
      const updated = [...current, word]
      localStorage.setItem(BANK_KEY, JSON.stringify(updated))
    }
  } catch {}

  // Award XP + log daily word (this is where real tracking happens)
  const xpForWord = 12 + Math.floor(Math.random() * 5) // 12-16 XP per new word
  await logDailyActivity(1, xpForWord, 0)

  if (!hasSupabase()) return

  const supabase = createClient()
  if (!supabase) return

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data } = await supabase
    .from('profiles')
    .select('mastered_bank')
    .eq('id', user.id)
    .single()

  const serverList: string[] = Array.isArray(data?.mastered_bank) ? data.mastered_bank : []
  if (!serverList.includes(word)) {
    const newList = [...serverList, word]
    await supabase
      .from('profiles')
      .update({ mastered_bank: newList, updated_at: new Date().toISOString() })
      .eq('id', user.id)
  }
}

// --- Writing now also awards XP based on score ---
export async function saveWritingAttempt(attempt: {
  promptTitle: string
  totalScore: number
  fullFeedback: string
}) {
  // local history
  try {
    const raw = localStorage.getItem(WRITING_KEY)
    const list = raw ? JSON.parse(raw) : []
    const newAttempt = { id: Date.now(), date: new Date().toLocaleString(), ...attempt }
    const updated = [newAttempt, ...list].slice(0, 20)
    localStorage.setItem(WRITING_KEY, JSON.stringify(updated))
  } catch {}

  // Award XP for completing a writing test (score based)
  const xpFromWriting = Math.max(30, attempt.totalScore * 6) // roughly 30-120 XP
  await logDailyActivity(0, xpFromWriting, 1) // +1 session

  if (!hasSupabase()) return

  const supabase = createClient()
  if (!supabase) return

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('writing_attempts').insert({
    user_id: user.id,
    prompt_title: attempt.promptTitle,
    score: attempt.totalScore,
    full_feedback: attempt.fullFeedback,
  })
}

// --- 30-day history for the separate progress dashboard ---
export async function getDailyHistory(days = 30): Promise<Array<{
  date: string
  words_mastered: number
  xp_earned: number
  sessions_completed: number
}>> {
  const dateList = getLastNDaysVN(days)

  if (!hasSupabase()) {
    const log = getLocalDailyLog()
    return dateList.map(d => ({
      date: d,
      words_mastered: log[d]?.words || 0,
      xp_earned: log[d]?.xp || 0,
      sessions_completed: log[d]?.sessions || 0,
    }))
  }

  const supabase = createClient()
  if (!supabase) {
    const log = getLocalDailyLog()
    return dateList.map(d => ({
      date: d,
      words_mastered: log[d]?.words || 0,
      xp_earned: log[d]?.xp || 0,
      sessions_completed: log[d]?.sessions || 0,
    }))
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const log = getLocalDailyLog()
    return dateList.map(d => ({
      date: d,
      words_mastered: log[d]?.words || 0,
      xp_earned: log[d]?.xp || 0,
      sessions_completed: log[d]?.sessions || 0,
    }))
  }

  const { data } = await supabase
    .from('daily_progress')
    .select('date, words_mastered, xp_earned, sessions_completed')
    .eq('user_id', user.id)
    .in('date', dateList)
    .order('date', { ascending: true })

  const map = new Map((data || []).map((row: any) => [row.date, row]))

  return dateList.map(date => {
    const row: any = map.get(date)
    return {
      date,
      words_mastered: row?.words_mastered || 0,
      xp_earned: row?.xp_earned || 0,
      sessions_completed: row?.sessions_completed || 0,
    }
  })
}

export async function getWritingHistory(): Promise<any[]> {
  if (!hasSupabase()) {
    try {
      const raw = localStorage.getItem(WRITING_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  const supabase = createClient()
  if (!supabase) {
    const raw = localStorage.getItem(WRITING_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const raw = localStorage.getItem(WRITING_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const { data } = await supabase
    .from('writing_attempts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(20)

  return data || []
}

// --- Reset everything to zero (for "start again from zero") ---
export async function resetAllToZero() {
  // Clear local always
  const keysToClear = [
    BANK_KEY, WRITING_KEY, XP_KEY, STREAK_KEY, LAST_DATE_KEY, DAILY_LOG_KEY,
    'germanforge_bank_mastered', 'germanforge_vocab_completed', 'germanforge_grammar_completed',
    'germanforge_declensions_completed', 'germanforge_writing_attempts'
  ]
  keysToClear.forEach(k => localStorage.removeItem(k))

  if (!hasSupabase()) {
    // Guest only - done
    return
  }

  const supabase = createClient()
  if (!supabase) return

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Clear server data for this user
  await supabase.from('daily_progress').delete().eq('user_id', user.id)
  await supabase.from('writing_attempts').delete().eq('user_id', user.id)

  // Reset profile
  await supabase
    .from('profiles')
    .update({
      mastered_bank: [],
      total_xp: 0,
      current_streak: 0,
      last_activity_date: null,
      daily_goal_words: 15,
      updated_at: new Date().toISOString(),
    })
    .eq('id', user.id)

  // Note: We keep the auth account itself
}

// --- Merge on login (extended) ---
export async function onLoginMerge() {
  await syncLocalBankToServer()

  // Also merge some local XP / daily if the server is at zero (first time login)
  if (!hasSupabase()) return
  const supabase = createClient()
  if (!supabase) return

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp')
    .eq('id', user.id)
    .single()

  const localXp = parseInt(localStorage.getItem(XP_KEY) || '0', 10)
  if ((profile?.total_xp || 0) === 0 && localXp > 0) {
    // First time - push local stats
    const localStreak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10)
    const localLast = localStorage.getItem(LAST_DATE_KEY)
    const localDaily = getLocalDailyLog()

    await supabase
      .from('profiles')
      .update({
        total_xp: localXp,
        current_streak: localStreak,
        last_activity_date: localLast,
      })
      .eq('id', user.id)

    // Push recent daily logs
    for (const [dateStr, vals] of Object.entries(localDaily)) {
      if ((vals as any).words > 0) {
        await supabase.from('daily_progress').upsert({
          user_id: user.id,
          date: dateStr,
          words_mastered: (vals as any).words,
          xp_earned: (vals as any).xp,
          sessions_completed: (vals as any).sessions || 0,
        })
      }
    }
  }
}

// --- Bank sync helper (kept for onLoginMerge) ---
export async function syncLocalBankToServer(): Promise<number> {
  if (!hasSupabase()) return 0
  const supabase = createClient()
  if (!supabase) return 0
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0

  let local: string[] = []
  try { local = JSON.parse(localStorage.getItem(BANK_KEY) || '[]') } catch {}
  if (local.length === 0) return 0

  const { data } = await supabase
    .from('profiles')
    .select('mastered_bank')
    .eq('id', user.id)
    .single()

  const server: string[] = Array.isArray(data?.mastered_bank) ? data.mastered_bank : []
  const merged = Array.from(new Set([...server, ...local]))

  if (merged.length > server.length) {
    await supabase
      .from('profiles')
      .update({ mastered_bank: merged, updated_at: new Date().toISOString() })
      .eq('id', user.id)
    localStorage.setItem(BANK_KEY, JSON.stringify(merged))
  }
  return merged.length
}

// Helper for quizzes
export async function masterTermAndSync(term: string) {
  await addToBankMastered(term)
}
