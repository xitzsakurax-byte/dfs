-- GermanForge Supabase schema for full backend (auth + persistent progress)
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- After creating a new Supabase project and copying the URL + anon key into Vercel env vars.

-- 1. Profiles table (1:1 with auth.users). Stores the critical bank mastery + basic gamification stats.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text default 'Anh Kiet',
  mastered_bank jsonb not null default '[]'::jsonb,   -- array of mastered German words (the 3000+ source of truth)
  total_xp integer not null default 0,
  current_streak integer not null default 0,
  updated_at timestamptz not null default now()
);

-- 2. Writing attempts (history of mock tests). Stores rich feedback for review on profile or dashboard.
create table if not exists public.writing_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt_title text,
  score integer,
  full_feedback text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.writing_attempts enable row level security;

-- RLS Policies: users can only touch their own rows
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view own writing attempts"
  on public.writing_attempts for select
  using (auth.uid() = user_id);

create policy "Users can insert own writing attempts"
  on public.writing_attempts for insert
  with check (auth.uid() = user_id);

-- Optional: helpful index
create index if not exists idx_writing_attempts_user on public.writing_attempts(user_id, created_at desc);

-- Trigger to auto-create profile row on new user signup (nice UX)
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', 'Anh Kiet'));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Note for future: if you want per-quiz completed sets persisted too (vocab/grammar/declensions),
-- you can add jsonb columns to profiles like completed_vocab, completed_grammar, etc.
-- For now bank_mastered + writing history cover the "integrate full backend" + cross-device sync goal.

comment on table public.profiles is 'GermanForge user profiles with persistent 3000+ bank mastery (replaces/supplements localStorage when signed in)';
comment on table public.writing_attempts is 'Saved TELC/Goethe writing mock test results for logged-in users';
