-- =====================================================
-- GermanForge Supabase Migration 003: Performance Tracking for Analysis
-- Run this in Supabase SQL Editor (after 001 and 002).
-- This enables detailed per-user, per-category performance data
-- so the dashboard can generate real "Strengths, Weaknesses & How to Improve"
-- recommendations based on actual quiz/game/writing results.
-- =====================================================

-- 1. Add username column to profiles (for display in analysis and admin)
ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS username text;

-- 2. Performance table (tracks attempts and success per category/subtopic)
CREATE TABLE IF NOT EXISTS public.user_performance (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,           -- 'vocab', 'declension', 'grammar', 'writing', 'game'
  subtopic text NOT NULL,           -- e.g. topic name, case (Akkusativ), 'overall'
  attempts integer NOT NULL DEFAULT 0,
  correct integer NOT NULL DEFAULT 0,
  last_practiced timestamptz DEFAULT now(),
  UNIQUE (user_id, category, subtopic)
);

-- 3. RLS - users only see/edit their own rows
ALTER TABLE public.user_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own performance data"
  ON public.user_performance FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Optional: Admin read-all policy (run this if you want /admin to see all users' performance)
-- CREATE POLICY "Admins can read all performance data"
--   ON public.user_performance FOR SELECT
--   USING (auth.jwt() ->> 'email' = 'kiet.ngn369@admin.germanforge');

-- 4. Update the profile creation trigger to also save the username from metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, username)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', 'User'),
    new.raw_user_meta_data->>'username'
  )
  ON CONFLICT (id) DO UPDATE 
    SET username = EXCLUDED.username,
        display_name = EXCLUDED.display_name;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger (safe if it already exists)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Index for fast dashboard queries
CREATE INDEX IF NOT EXISTS idx_user_performance_user_category 
  ON public.user_performance (user_id, category);

COMMENT ON TABLE public.user_performance IS 'Tracks user accuracy per category/subtopic for dashboard analysis (strong/weak points + improvement tips). Populated automatically from quizzes, game, writing, and bank drills.';

-- After running this, the app will automatically log performance when users answer correctly/incorrectly in supported modules.
-- The /dashboard will then show a new "Performance Insights" section with personalized analysis.