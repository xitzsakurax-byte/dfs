// Gamification system for GermanForge - pure localStorage/sessionStorage, no backend

// ─── Types ────────────────────────────────────────────────────────────────────

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: string;
};

export type DailyQuest = {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  type: "words" | "xp" | "sessions" | "streak";
  completed: boolean;
};

export type SRSItem = {
  word: string;
  category: string;
  interval: number; // days: 1, 3, 7, 14
  nextReview: string; // YYYY-MM-DD
  repetitions: number;
  easeFactor: number;
};

export type SkillNode = {
  id: string;
  title: string;
  cefr: "B1" | "B2" | "C1";
  topic: string;
  unlocked: boolean;
  mastery: number; // 0–100
  prerequisiteIds: string[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const KEYS = {
  achievements: "germanforge_achievements",
  srsQueue: "germanforge_srs_queue",
  combo: "germanforge_combo",
  questProgress: "germanforge_quest_progress",
  performance: "germanforge_performance",
} as const;

// ─── Achievement definitions ──────────────────────────────────────────────────

const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, "unlockedAt">[] = [
  {
    id: "first_word",
    title: "First Word",
    description: "Master your first word",
    icon: "🌱",
    xpReward: 50,
  },
  {
    id: "streak_3",
    title: "On a Roll",
    description: "Maintain a 3-day streak",
    icon: "🔥",
    xpReward: 75,
  },
  {
    id: "streak_7",
    title: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "⚔️",
    xpReward: 150,
  },
  {
    id: "streak_30",
    title: "Iron Discipline",
    description: "Maintain a 30-day streak",
    icon: "🏆",
    xpReward: 500,
  },
  {
    id: "words_50",
    title: "Vocabulary Initiate",
    description: "Master 50 words",
    icon: "📖",
    xpReward: 100,
  },
  {
    id: "words_250",
    title: "Lexical Scholar",
    description: "Master 250 words",
    icon: "📚",
    xpReward: 300,
  },
  {
    id: "words_1000",
    title: "Word Master",
    description: "Master 1000 words",
    icon: "🧠",
    xpReward: 750,
  },
  {
    id: "words_3078",
    title: "Complete Mastery",
    description: "Master all 3078 words",
    icon: "👑",
    xpReward: 2000,
  },
  {
    id: "level_5",
    title: "Rising Scholar",
    description: "Reach level 5",
    icon: "⭐",
    xpReward: 200,
  },
  {
    id: "level_10",
    title: "Advanced Learner",
    description: "Reach level 10",
    icon: "🌟",
    xpReward: 400,
  },
  {
    id: "combo_10",
    title: "Combo King",
    description: "Get 10 correct answers in a row",
    icon: "⚡",
    xpReward: 100,
  },
  {
    id: "first_writing",
    title: "Writer",
    description: "Complete your first writing task",
    icon: "✍️",
    xpReward: 75,
  },
  {
    id: "b1_complete",
    title: "B1 Ready",
    description: "Reach 80% mastery on all B1 skill nodes",
    icon: "🎯",
    xpReward: 500,
  },
  {
    id: "b2_complete",
    title: "B2 Ready",
    description: "Reach 80% mastery on all B2 skill nodes",
    icon: "🏅",
    xpReward: 750,
  },
];

// ─── Quest template pool ──────────────────────────────────────────────────────

type QuestTemplate = Omit<DailyQuest, "current" | "completed">;

const QUEST_TEMPLATES: QuestTemplate[] = [
  {
    id: "q_vocab",
    title: "Vocabulary Sprint",
    description: "Practice 15 vocab words today",
    target: 15,
    xpReward: 80,
    type: "words",
  },
  {
    id: "q_xp",
    title: "XP Hunter",
    description: "Earn 100 XP today",
    target: 100,
    xpReward: 50,
    type: "xp",
  },
  {
    id: "q_sessions",
    title: "Double Duty",
    description: "Complete 2 practice sessions today",
    target: 2,
    xpReward: 60,
    type: "sessions",
  },
  {
    id: "q_bank",
    title: "Bank Drill",
    description: "Master 5 bank words today",
    target: 5,
    xpReward: 70,
    type: "words",
  },
  {
    id: "q_streak",
    title: "Keep the Flame",
    description: "Keep your streak alive — complete any activity",
    target: 1,
    xpReward: 40,
    type: "streak",
  },
];

// ─── Skill tree definition ────────────────────────────────────────────────────

const SKILL_TREE_DEFINITIONS: Omit<SkillNode, "unlocked" | "mastery">[] = [
  // B1
  {
    id: "b1_cases",
    title: "German Cases",
    cefr: "B1",
    topic: "cases",
    prerequisiteIds: [],
  },
  {
    id: "b1_connectors",
    title: "Connectors",
    cefr: "B1",
    topic: "connectors",
    prerequisiteIds: [],
  },
  {
    id: "b1_modal",
    title: "Modal Verbs & Passive",
    cefr: "B1",
    topic: "modal",
    prerequisiteIds: [],
  },
  {
    id: "b1_relative",
    title: "Relative Clauses",
    cefr: "B1",
    topic: "relative",
    prerequisiteIds: [],
  },
  {
    id: "b1_vocab_workplace",
    title: "Workplace Vocabulary",
    cefr: "B1",
    topic: "workplace",
    prerequisiteIds: [],
  },
  {
    id: "b1_vocab_everyday",
    title: "Everyday Vocabulary",
    cefr: "B1",
    topic: "everyday",
    prerequisiteIds: [],
  },
  // B2
  {
    id: "b2_konjunktiv",
    title: "Konjunktiv II",
    cefr: "B2",
    topic: "konjunktiv",
    prerequisiteIds: ["b1_modal"],
  },
  {
    id: "b2_passive_extended",
    title: "Extended Passive",
    cefr: "B2",
    topic: "passive",
    prerequisiteIds: ["b1_modal"],
  },
  {
    id: "b2_academic_vocab",
    title: "Academic Vocabulary",
    cefr: "B2",
    topic: "academic",
    prerequisiteIds: ["b1_vocab_workplace"],
  },
  {
    id: "b2_argumentation",
    title: "Argumentation",
    cefr: "B2",
    topic: "argumentation",
    prerequisiteIds: ["b1_connectors"],
  },
  {
    id: "b2_writing",
    title: "B2 Writing",
    cefr: "B2",
    topic: "writing_b2",
    prerequisiteIds: ["b1_relative", "b1_connectors"],
  },
  // C1
  {
    id: "c1_complex_syntax",
    title: "Complex Syntax",
    cefr: "C1",
    topic: "syntax",
    prerequisiteIds: ["b2_konjunktiv", "b2_passive_extended"],
  },
  {
    id: "c1_academic",
    title: "Academic Register",
    cefr: "C1",
    topic: "academic_c1",
    prerequisiteIds: ["b2_academic_vocab"],
  },
  {
    id: "c1_writing_advanced",
    title: "Advanced Writing",
    cefr: "C1",
    topic: "writing_c1",
    prerequisiteIds: ["b2_writing"],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function safeParseJSON<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Simple, deterministic string hash — returns a non-negative integer. */
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

// ─── Achievements ─────────────────────────────────────────────────────────────

export async function getAchievements(): Promise<Achievement[]> {
  const stored = safeParseJSON<Record<string, string>>(
    localStorage.getItem(KEYS.achievements),
    {}
  );
  return ACHIEVEMENT_DEFINITIONS.map((def) => ({
    ...def,
    unlockedAt: stored[def.id] ?? undefined,
  }));
}

export async function checkAndUnlockAchievements(stats: {
  totalXp: number;
  streak: number;
  bankMastered: number;
  level: number;
}): Promise<Achievement[]> {
  const stored = safeParseJSON<Record<string, string>>(
    localStorage.getItem(KEYS.achievements),
    {}
  );

  const criteria: Record<string, boolean> = {
    first_word: stats.bankMastered >= 1,
    streak_3: stats.streak >= 3,
    streak_7: stats.streak >= 7,
    streak_30: stats.streak >= 30,
    words_50: stats.bankMastered >= 50,
    words_250: stats.bankMastered >= 250,
    words_1000: stats.bankMastered >= 1000,
    words_3078: stats.bankMastered >= 3078,
    level_5: stats.level >= 5,
    level_10: stats.level >= 10,
    combo_10: getCurrentCombo() >= 10,
    first_writing: false, // triggered externally via checkAndUnlockAchievements
    b1_complete: checkCefrComplete("B1"),
    b2_complete: checkCefrComplete("B2"),
  };

  const now = new Date().toISOString();
  const newlyUnlocked: Achievement[] = [];

  for (const def of ACHIEVEMENT_DEFINITIONS) {
    if (!stored[def.id] && criteria[def.id]) {
      stored[def.id] = now;
      newlyUnlocked.push({ ...def, unlockedAt: now });
    }
  }

  if (newlyUnlocked.length > 0) {
    localStorage.setItem(KEYS.achievements, JSON.stringify(stored));
  }

  return newlyUnlocked;
}

function checkCefrComplete(cefr: "B1" | "B2"): boolean {
  const nodes = getSkillTree().filter((n) => n.cefr === cefr);
  return nodes.length > 0 && nodes.every((n) => n.mastery >= 80);
}

// ─── Daily Quests ─────────────────────────────────────────────────────────────

/**
 * Returns 3 deterministic quests for the given date string (YYYY-MM-DD).
 * Same date always produces the same 3 quests — no Math.random.
 */
export function getDailyQuests(dateString: string): DailyQuest[] {
  const progressKey = `${KEYS.questProgress}_${dateString}`;
  const progress = safeParseJSON<Record<string, number>>(
    localStorage.getItem(progressKey),
    {}
  );

  const h = hashString(dateString);
  const count = QUEST_TEMPLATES.length;

  // Pick 3 distinct indices using the hash
  const indices: number[] = [];
  let seed = h;
  while (indices.length < 3) {
    const idx = seed % count;
    if (!indices.includes(idx)) indices.push(idx);
    seed = hashString(seed.toString());
  }

  return indices.map((i) => {
    const template = QUEST_TEMPLATES[i];
    const current = progress[template.id] ?? 0;
    return {
      ...template,
      current,
      completed: current >= template.target,
    };
  });
}

export function updateQuestProgress(
  type: DailyQuest["type"],
  amount: number,
  dateString: string
): void {
  const quests = getDailyQuests(dateString);
  const progressKey = `${KEYS.questProgress}_${dateString}`;
  const progress = safeParseJSON<Record<string, number>>(
    localStorage.getItem(progressKey),
    {}
  );

  for (const quest of quests) {
    if (quest.type === type && !quest.completed) {
      progress[quest.id] = Math.min(
        (progress[quest.id] ?? 0) + amount,
        quest.target
      );
    }
  }

  localStorage.setItem(progressKey, JSON.stringify(progress));
}

// ─── SRS (Spaced Repetition) ──────────────────────────────────────────────────

export async function getSRSQueue(): Promise<SRSItem[]> {
  const queue = safeParseJSON<SRSItem[]>(
    localStorage.getItem(KEYS.srsQueue),
    []
  );
  const today = todayString();
  return queue.filter((item) => item.nextReview <= today);
}

export async function addToSRS(word: string, category: string): Promise<void> {
  const queue = safeParseJSON<SRSItem[]>(
    localStorage.getItem(KEYS.srsQueue),
    []
  );

  const exists = queue.some((item) => item.word === word);
  if (exists) return;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextReview = tomorrow.toISOString().slice(0, 10);

  queue.push({
    word,
    category,
    interval: 1,
    nextReview,
    repetitions: 0,
    easeFactor: 2.5,
  });

  localStorage.setItem(KEYS.srsQueue, JSON.stringify(queue));
}

/**
 * SM-2 algorithm update.
 * quality: 0–5 where 0–2 = fail, 3–5 = pass (5 = perfect recall).
 */
export async function reviewSRSItem(
  word: string,
  quality: 0 | 1 | 2 | 3 | 4 | 5
): Promise<void> {
  const queue = safeParseJSON<SRSItem[]>(
    localStorage.getItem(KEYS.srsQueue),
    []
  );

  const idx = queue.findIndex((item) => item.word === word);
  if (idx === -1) return;

  const item = { ...queue[idx] };

  // SM-2 ease factor update
  const newEF = Math.max(
    1.3,
    item.easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );
  item.easeFactor = newEF;

  if (quality < 3) {
    // Failed — reset repetitions, short interval
    item.repetitions = 0;
    item.interval = 1;
  } else {
    if (item.repetitions === 0) {
      item.interval = 1;
    } else if (item.repetitions === 1) {
      item.interval = 3;
    } else {
      item.interval = Math.round(item.interval * item.easeFactor);
    }
    item.repetitions += 1;
  }

  // Cap at 14 days max for this app
  item.interval = Math.min(item.interval, 14);

  const next = new Date();
  next.setDate(next.getDate() + item.interval);
  item.nextReview = next.toISOString().slice(0, 10);

  queue[idx] = item;
  localStorage.setItem(KEYS.srsQueue, JSON.stringify(queue));
}

// ─── Skill Tree ───────────────────────────────────────────────────────────────

export function getSkillTree(): SkillNode[] {
  const performance = safeParseJSON<Record<string, number>>(
    localStorage.getItem(KEYS.performance),
    {}
  );

  // Build a map of node id → mastery for unlock cascade
  const masteryMap: Record<string, number> = {};

  const nodes: SkillNode[] = SKILL_TREE_DEFINITIONS.map((def) => {
    const mastery = deriveMastery(def.topic, performance);
    masteryMap[def.id] = mastery;
    return { ...def, mastery, unlocked: false };
  });

  // Determine unlock status: B1 nodes are always unlocked; others require prereqs ≥ 50%
  for (const node of nodes) {
    if (node.prerequisiteIds.length === 0) {
      node.unlocked = true;
    } else {
      node.unlocked = node.prerequisiteIds.every(
        (prereqId) => (masteryMap[prereqId] ?? 0) >= 50
      );
    }
  }

  return nodes;
}

/**
 * Derives mastery percentage (0–100) for a skill topic from the raw
 * performance object stored in localStorage.
 *
 * The performance object is expected to contain keys like:
 *   `${topic}_correct`, `${topic}_total`
 * or a flat `${topic}` number between 0–100.
 * Falls back to 0 if no data found.
 */
function deriveMastery(
  topic: string,
  performance: Record<string, number>
): number {
  // Direct percentage stored under topic key
  if (typeof performance[topic] === "number") {
    return Math.min(100, Math.max(0, Math.round(performance[topic])));
  }

  // Correct/total pair
  const correct = performance[`${topic}_correct`] ?? 0;
  const total = performance[`${topic}_total`] ?? 0;
  if (total > 0) {
    return Math.min(100, Math.round((correct / total) * 100));
  }

  return 0;
}

// ─── Combo ────────────────────────────────────────────────────────────────────

export function getCurrentCombo(): number {
  const raw = sessionStorage.getItem(KEYS.combo);
  return raw ? parseInt(raw, 10) || 0 : 0;
}

export function incrementCombo(): number {
  const next = getCurrentCombo() + 1;
  sessionStorage.setItem(KEYS.combo, String(next));
  return next;
}

export function resetCombo(): void {
  sessionStorage.setItem(KEYS.combo, "0");
}

/**
 * Returns an XP multiplier based on the current combo count.
 * - combo 0   → 1.0×
 * - combo 5   → 1.5×
 * - combo 10  → 2.0×
 * - combo 15  → 2.5×
 * - combo 20+ → 3.0×
 *
 * Linear interpolation in 5-step bands.
 */
export function getComboMultiplier(combo: number): number {
  if (combo <= 0) return 1.0;
  if (combo >= 20) return 3.0;
  // Each 5 combos adds 0.5× up to 20
  const multiplier = 1.0 + (combo / 20) * 2.0;
  return Math.round(multiplier * 10) / 10;
}
