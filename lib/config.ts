// Centralized config for GermanForge - local only (no backend)
export const APP = {
  NAME: 'GermanForge',
  LEVEL_XP_BASE: 180,
  DEFAULT_DAILY_GOAL: 15,
} as const;

export const FEATURES = {
  GAME_MODES: ['write', 'fix', 'quiz'] as const,
  VIETNAM_TIMEZONE: 'Asia/Ho_Chi_Minh',
} as const;