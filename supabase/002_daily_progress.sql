-- Migration 002: Daily stats tracking for progress history, streaks, XP
-- Run this in Supabase SQL Editor AFTER the first schema.
-- Adds daily_progress table and necessary columns to profiles.

-- Add last_activity_date to profiles for streak calculation (VN date string or date)
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS last_activity_date date,
  ADD COLUMN IF NOT EXISTS daily_goal_words integer DEFAULT 15;

-- Daily progress table: one row per user per calendar day (using VN timezone date)
CREATE TABLE IF NOT EXISTS public.daily_progress (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date date NOT NULL,                    -- YYYY-MM-DD in Asia/Ho_Chi_Minh
  words_mastered integer NOT NULL DEFAULT 0,
  xp_earned integer NOT NULL DEFAULT 0,
  sessions_completed integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

-- RLS
ALTER TABLE public.daily_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own daily progress"
  ON public.daily_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily progress"
  ON public.daily_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily progress"
  ON public.daily_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for fast 30-day queries
CREATE INDEX IF NOT EXISTS idx_daily_progress_user_date 
  ON public.daily_progress (user_id, date DESC);

COMMENT ON TABLE public.daily_progress IS 'Per-day activity log (Vietnam calendar) for progress history, streaks and routine suggestions.';

-- Optional: trigger to keep updated_at fresh (simple version)
CREATE OR REPLACE FUNCTION public.update_daily_progress_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_daily_progress_updated_at ON public.daily_progress;
CREATE TRIGGER set_daily_progress_updated_at
BEFORE UPDATE ON public.daily_progress
FOR EACH ROW EXECUTE FUNCTION public.update_daily_progress_timestamp();