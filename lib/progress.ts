import { createClient, hasSupabase } from './supabase/client'

// Unified progress layer for GermanForge
// - Guest mode: 100% localStorage (zero breaking change, everything that worked before still works)
// - Signed-in: bank mastery + writing attempts are persisted to Supabase (profiles.mastered_bank + writing_attempts)
// - On sign-in we merge local + server (union) so you never lose work
// - All no-repeat / randomization logic in quizzes continues to work exactly as before

const BANK_KEY = 'germanforge_bank_mastered'
const WRITING_KEY = 'germanforge_writing_attempts'

// --- BANK MASTERY (the 3000+ core that feeds every quiz + dashboard + resources) ---

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
    // fallback
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
    // fallback to local if profile not ready yet
    const raw = localStorage.getItem(BANK_KEY)
    return raw ? JSON.parse(raw) : []
  }

  const serverBank: string[] = Array.isArray(data.mastered_bank) ? data.mastered_bank : []
  return serverBank
}

export async function addToBankMastered(word: string): Promise<void> {
  if (!word) return

  // Always update localStorage (keeps guest experience + instant UI)
  try {
    const current = JSON.parse(localStorage.getItem(BANK_KEY) || '[]')
    if (!current.includes(word)) {
      const updated = [...current, word]
      localStorage.setItem(BANK_KEY, JSON.stringify(updated))
    }
  } catch {}

  if (!hasSupabase()) return

  const supabase = createClient()
  if (!supabase) return

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Get latest from server, merge, upsert
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

// Merge local into server on login (called from dashboard or after successful sign-in)
export async function syncLocalBankToServer(): Promise<number> {
  if (!hasSupabase()) return 0

  const supabase = createClient()
  if (!supabase) return 0

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0

  let local: string[] = []
  try {
    local = JSON.parse(localStorage.getItem(BANK_KEY) || '[]')
  } catch {}

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

    // Also write merged back to local for consistency
    localStorage.setItem(BANK_KEY, JSON.stringify(merged))
  }

  return merged.length
}

// --- WRITING ATTEMPTS (full history persisted when logged in) ---

export async function saveWritingAttempt(attempt: {
  promptTitle: string
  totalScore: number
  fullFeedback: string
}) {
  // Always keep local history (for guest + instant)
  try {
    const raw = localStorage.getItem(WRITING_KEY)
    const list = raw ? JSON.parse(raw) : []
    const newAttempt = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...attempt,
    }
    const updated = [newAttempt, ...list].slice(0, 20)
    localStorage.setItem(WRITING_KEY, JSON.stringify(updated))
  } catch {}

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

// Helper for quizzes: after a correct answer that should master a term, call this
export async function masterTermAndSync(term: string) {
  await addToBankMastered(term)
}

// On successful login, call this once to pull server data forward
export async function onLoginMerge() {
  await syncLocalBankToServer()
}
