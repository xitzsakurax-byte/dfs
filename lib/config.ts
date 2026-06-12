// Centralized config for GermanForge (easy to extend for future needs)
// Backend: All sensitive or configurable values here.
// Note: Admin creds are as specified by product requirements (visible in source for this demo; in prod move to env + server validation).

export const ADMIN = {
  USERNAME: 'kiet.ngn369',
  PASSWORD: 'Bunbun12',
  EMAIL: 'kiet.ngn369@admin.germanforge', // Fixed email for Supabase auth mapping
} as const;

export const APP = {
  NAME: 'GermanForge',
  LEVEL_XP_BASE: 180, // XP per level in progress.ts
  DEFAULT_DAILY_GOAL: 15,
} as const;

// Future: Add feature flags, API endpoints, etc.
export const FEATURES = {
  GAME_MODES: ['write', 'fix', 'quiz'] as const,
  VIETNAM_TIMEZONE: 'Asia/Ho_Chi_Minh',
} as const;