# GermanForge — B1-C1 TELC & Goethe Exam Prep (Gamified + Full Backend)

Professional dark-themed German language practice web app focused on **B1-B2-C1** CEFR levels for TELC and Goethe-Zertifikat exams.

Real accounts + cloud sync via Supabase (email/password). Guest mode with localStorage continues to work perfectly (no data loss on sign-in — we merge).

## Key Features

- **3000+ Word Bank** (official Goethe B1 Wortliste) fully integrated into gamification
  - Shared mastery tracking via localStorage (`germanforge_bank_mastered`)
  - Auto-sync on correct answers in Vocab, Grammar, and Writing tasks
  - Dedicated **Quick Bank Mastery Drill** (`/practice/bank`) with +XP, no-repeat randomization, prefers unmastered words
  - Interactive browser in Resources with search + batch review
- **Gamified Practice & Game**
  - Vocabulary (B1-C1) with dynamic options + no-repeat after correct
  - Grammar structures (Konjunktiv, Passive, Relativsätze, etc.)
  - Writing Mock (TELC + Goethe B1-C1 style) with AI-simulated scoring referencing the 3000+ bank
  - Dedicated **Interactive Game** (/practice/game): Write forms, Fix grammar errors, Pop Quiz modes. Rewards points + real XP.
- **Beautiful Professional UI**
  - Deep dark theme (#0A0D14), warm burgundy gradient accents, fully human non-AI aesthetic (no 3D on landing)
  - 6 core modules: Vocab, Grammar, Writing (with AI rater), 3000+ Bank Drill, Word Forms (declensions N/A/D/G), Interactive Game
  - Separate mobile phone UI (bottom tabs, stacked layouts, touch-friendly)
- **Full User Accounts & Per-User Tracking (Supabase DB)**
  - Sign up with: Login Name (username), Full Name, Email, Password
  - Each user has isolated personal data (mastered bank, XP, streaks, daily history, writing attempts) — no mixing
  - All tracking/analysis saved in database (not just localStorage)
- **Admin Features**
  - Special admin login: kiet.ngn369 / Bunbun12 (total access)
  - Private /admin dashboard: Website traffic (users, total XP, words mastered), user directory with per-user stats
  - Secure checks + RLS recommendations for production

## Backend (Supabase) + Admin

Full backend is now live:
- Auth (sign up with username/full name/email/password; sign in for normal users)
- Special hardcoded admin: username `kiet.ngn369` / password `Bunbun12` (signs in as admin and redirects to private dashboard)
- Per-user isolated data in DB: mastered_bank (JSONB), total_xp, current_streak, daily_progress (date-based for VN calendar), writing_attempts
- Real-time sync on correct answers across all modules (no-repeat, XP, streaks, daily logs)
- Admin dashboard shows aggregated traffic + list of users with personal stats (requires RLS policy for full read-all in prod)
- Guest mode falls back to localStorage (basic functionality; sign up recommended for full personal tracking in DB)

## Setup for Future / Production
1. Supabase project + run `supabase/001_init.sql` and `supabase/002_daily_progress.sql` (creates tables, RLS, triggers)
2. For admin full visibility: Add RLS policies e.g. `CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT USING (auth.jwt() ->> 'email' = 'kiet.ngn369@admin.germanforge');` (same for daily_progress/writing_attempts)
3. Vercel env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (and service role only in secure server code)
4. Create the admin auth user in Supabase with email `kiet.ngn369@admin.germanforge` + password `Bunbun12`
5. Code organized in: app/ (pages + /admin, /practice/*, /login), lib/ (progress.ts central, supabase clients), supabase/ (migrations), components/ (MobileBottomNav etc.)

All functions use user.id for isolation. Future: Add more modules, real LLM for writing rater, more admin analytics.

**To activate on your own Supabase + Vercel:**
1. Create a free project at supabase.com
2. Go to SQL Editor and run the entire contents of `supabase/001_init.sql`
3. Copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Project Settings → API
4. In Vercel: Project → Settings → Environment Variables → add the two keys (Production + Preview)
5. Redeploy (`npx vercel --prod`)

The site gracefully falls back to 100% localStorage guest mode if the keys are missing.
  - No icon spam, high contrast, fully responsive
- **User name**: Anh Kiet (guest mode)
- **Persistence**: All progress (mastered words, completed quizzes, writing attempts) saved in browser. No repeat of correctly answered items across reloads.
- **Bidirectional linking** with the DHND Ausbildung site (localhost:3001 ↔ 3000)

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript + Tailwind 4
- Framer Motion for subtle animations
- 100% client-side (guest mode ready; Supabase stubs present for future auth)

## Getting Started

```bash
cd german-practice
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

- Dashboard: `/dashboard`
- Practice hub: `/practice`
- Bank Drill (3000+ words): `/practice/bank`
- Writing Mock: `/practice/writing`
- Official resources + full word bank browser: `/resources`

To run the companion Ausbildung site, see the sibling `ausbildung-website` (usually on port 3001).

## Project Structure Highlights

- `app/practice/bank/page.tsx` — dedicated 3000+ word mastery drill
- `lib/data/full-vocab.json` — ~3078 terms from Goethe B1 Wortliste
- `lib/data/{vocab,grammar,writing}.ts` — curated B1-C1 content with examples & topics
- Dark theme + components in `app/globals.css` and `app/layout.tsx`

## Notes

- Everything runs in guest mode with localStorage (perfect for quick testing).
- To reset bank mastery or progress: use the "Xóa toàn bộ tiến độ" / reset buttons in the UI.
- Writing uses a heuristic "AI" rater that cross-references the 3000+ bank for vocab scoring + suggestions.

## Future / Auth

Supabase client is stubbed in `lib/supabase/`. Real auth + cloud sync can be added later.

## Companion Site

Phối hợp với [DHND — Du Học Nghề Đức](http://localhost:3001) (the main Ausbildung guidance website).

---

Made for Vietnamese students preparing for German vocational training (Ausbildung). Focus: practical B1-C1 language + professional Ausbildung vocabulary.

## Deploy

Easy to deploy on Vercel (just connect the repo). Set any needed env vars for future Supabase integration.
