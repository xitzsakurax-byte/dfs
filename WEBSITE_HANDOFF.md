# GermanForge — Website Handoff & Continuation Guide

> Written 2026-06-12 for the next AI/developer continuing this project.
> **Read this fully before writing any code.** Also read `AGENTS.md` — this is Next.js 16 with breaking changes; docs live in `node_modules/next/dist/docs/`.

---

## 0. What This Project Is

A **German B1–C1 exam-prep web app** for one user (Anh Kiet, Vietnamese) preparing for **TELC** and **Goethe-Zertifikat** B1–C1 exams.

- **Repo:** github.com/xitzsakurax-byte/dfs (branch `main`)
- **Live:** https://german-practice-seven.vercel.app (Vercel, auto-deploys from `main`)
- **Stack:** Next.js 16.2.9 (App Router, Turbopack), React 19.2.4, Tailwind CSS 4, TypeScript
- **Installed libs:** gsap 3.15 + ScrollTrigger, three 0.184 + @react-three/fiber 9 + @react-three/drei 10, framer-motion 12, shadcn/ui, sonner (toasts), lucide

### Hard constraints (do NOT break these)
1. use backend** All Supabase/auth/middleware can be use. Keep all `germanforge_*` keys (listed in §4) for backwards compatibility with existing saved progress.
2. **Language policy:** UI labels + explanations in **English only**; exercise/task content in **German only**. No Vietnamese strings anywhere.
3. **User is hardcoded as "Anh Kiet"** everywhere. No login system.
4. **Vietnam timezone** (`Asia/Ho_Chi_Minh`) for streaks and daily tracking.
5. **No A1/A2 vocabulary** — B1–C1 only.
6. **Keep `main` buildable always** (`npm run build` must pass — Vercel deploys from it).
7. **SSR/hydration:** never call `Math.random()` or `Date.now()` in module scope or initial render — only inside `useEffect`. R3F `bufferAttribute` needs `args={[array, itemSize]}`.

---

## 1. What Was Done (full redesign, commit `c9c2c99`, now live)

### Visual redesign
- **Gold/amber palette** (`--gold #D4A017`, `--gold-warm #E8962A`) replacing the old burgundy. All colors are CSS variables in `app/globals.css` (`--bg`, `--surface`, `--text`, `--gold*`, `--glass-*`). **Use these variables, never hardcoded hex.**
- **Glassmorphism** via `.glass-card` (backdrop-blur, translucent bg/border).
- **Three.js 3D hero** — `components/HeroScene.tsx`: floating gold icosahedron + orbiting particles + orbit ring + stars. Dynamically imported with `ssr:false`. Respects `prefers-reduced-motion` (falls back to a static gradient orb).
- **GSAP ScrollTrigger** scroll-reveal animations on the landing page (cleaned up via `ctx.revert()` on unmount).
- Utility classes added: `.xp-bar`, `.combo-badge`, `.streak-flame`, `.achievement-card`, `.skill-node`, `.gradient-text`.

### New pages
- `/exams` — full Goethe vs telc comparison (B1/B2/C1): official times, section structures, pass criteria, costs, free material links, accordion per section. **Data sourced from the C1.zip reference PDFs + research.**
- `/achievements` — 14 achievements with locked/unlocked state + daily quests panel.
- `/skill-tree` — B1→B2→C1 visual node graph, mastery % per topic derived from performance data.

### Gamification system — `lib/gamification.ts`
- **14 achievements** with localStorage persistence + unlock toasts
- **Daily quests** — 3 per day, deterministic by date hash (no `Math.random` in render)
- **SM-2 spaced repetition (SRS)** queue — wrong answers get queued for review
- **Combo multiplier** (1×–3×) via sessionStorage
- `getSkillTree()` — computes mastery from `germanforge_performance`
- **NOTE:** Several functions are `async`/return Promises: `getAchievements()`, `checkAndUnlockAchievements()`, `getSRSQueue()`, `addToSRS()`, `reviewSRSItem()`. The rest are sync. Check signatures before calling.
- `checkAndUnlockAchievements(stats)` accepts ONLY `{ totalXp, streak, bankMastered, level }`. It does NOT take `writingAttempts` or `skillNodes`.
- `SkillNode` type has NO `practiceUrl` field — derive the practice link from `node.topic`.

### Data fact-checks/fixes
- `vocab.ts`: removed duplicate `die Resilienz`/`die Produktivität`; fixed `konsequent` gloss; removed module-scope shuffle. Later (commit `3dc4c80`) purged all A1/A2 basics → strict B1–C1.
- `declensions.ts`: fixed 3 items with duplicate answer options; fixed feminine distractors; fixed `einstiegen`→`einsteigen` typo.
- `writing.ts`: removed emoji + "Grok/xAI" reference; fixed Goethe B1 writing time to 60 min.
- `layout.tsx`: `lang="de"`, `data-scroll-behavior="smooth"`; deleted deprecated `middleware.ts`.
- `README.md`: removed plaintext credentials.

### C1.zip handling
- The zip was corrupted/truncated; recovered via per-entry Python `zipfile` extraction → **65 PDFs in `c1ref/`** (Prüfungstraining Goethe C1 2024, Mit Erfolg zum Goethe C1, official `c1_uebungssatz.pdf`, Sicher C1.1/C1.2, Werkstatt C1 Wortliste, 12 TestDaF materials, Deutsch Intensiv Wortschatz B2).
- **These are copyrighted — used as REFERENCE only, never committed to git** (`c1ref/`, `C1.zip`, `HANDOFF.md` are all untracked). Used to inform exam data, vocab leveling, and writing task formats — NOT copied verbatim.

---

## 2. Current Site Map

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ done | Landing: 3D hero, features, gamification, exam teaser, CTA |
| `/dashboard` | ✅ done | Stats, daily quests, skill-tree preview, achievement toasts |
| `/exams` | ✅ done | Goethe vs telc comparison |
| `/achievements` | ✅ done | 14 achievements + quests |
| `/skill-tree` | ✅ done | CEFR node graph |
| `/resources` | ✅ done | Curated external links + 3078-word browser |
| `/progress` | ✅ done | Heatmap + 30-day history |
| `/practice` | ✅ done | Hub for 6 modules |
| `/practice/vocab` | ✅ done | Combo + SRS integrated |
| `/practice/grammar` | ✅ done | |
| `/practice/declensions` | ✅ done | |
| `/practice/bank` | ✅ done | 3078-word Goethe B1 Wortliste drill |
| `/practice/writing` | ✅ done | Heuristic "AI" rater |
| `/practice/game` | ✅ done | 3 modes: write-forms, fix-errors, pop-quiz |
| `/leaderboard` | ⚠️ **EMPTY FILE** | `page.tsx` is empty — will error. Either build it or delete the route. |
| `/login`, `/admin`, `/profile` | 🟡 stubs | Static notice pages (no backend). Candidates for removal. |

---

## 3. Data Files (`lib/data/`)

| File | Contents | Notes for improvement |
|------|----------|------------------------|
| `vocab.ts` | ~85 curated B1–C1 items `{de, en, example, topic, cefr}` | Could expand; verify glosses against Duden |
| `grammar.ts` | 12 items | **Thin** — only 12. Needs many more for real exam coverage |
| `declensions.ts` | 18 items | Thin; expand cases coverage |
| `writing.ts` | 3 prompt sets + heuristic rater | Rater is keyword/length heuristic, not real NLP — see §5 |
| `full-vocab.json` | 3078 plain strings (Goethe B1 Wortliste, e.g. `"die Abbildung, -en"`) | No translations/examples — just headwords |

---

## 4. localStorage Keys (DO NOT rename)

```
germanforge_total_xp            germanforge_current_streak
germanforge_last_activity_date  germanforge_daily_log
germanforge_performance         germanforge_bank_mastered
germanforge_vocab_completed     germanforge_grammar_completed
germanforge_declensions_completed  germanforge_writing_attempts
germanforge_achievements        germanforge_srs_queue
germanforge_quest_progress      germanforge_combo (sessionStorage)
```
Central logic: `lib/progress.ts` (XP/streak/daily/performance), `lib/gamification.ts` (achievements/SRS/quests/combo/skill-tree), `lib/config.ts` (`APP.LEVEL_XP_BASE`).

---

## 5. Known Issues & Weaknesses (fix these next)

1. **`/leaderboard/page.tsx` is empty** → build/runtime error risk. Highest priority: delete it or implement it. (A local-only leaderboard is odd with one hardcoded user — probably delete.)
2. **Writing rater is a heuristic**, not real evaluation — it scores on length/keywords. Real feedback would need an LLM, but that breaks the "no backend" rule. Options: (a) keep heuristic but be honest in UI copy, (b) add an optional bring-your-own-API-key field stored locally.
3. **Thin content:** only 12 grammar + 18 declension items. For genuine B1–C1 prep this needs to be 5–10× larger. The 3078-word bank has no translations/examples — enriching it would massively improve the vocab modules.
4. **Stub pages** `/login`, `/admin`, `/profile` serve no purpose in a single-user localStorage app — consider removing and cleaning nav.
5. **3D hero is heavy** on low-end mobile — already guarded by `prefers-reduced-motion`, but consider a lighter fallback for small screens / low GPU.
6. **No real tests** — only `npm run build` verification. No unit/e2e coverage on the progress/gamification logic.
7. **SRS not wired into every module** — confirmed in vocab; verify grammar/declensions/game also call `addToSRS` on wrong answers and surface the review queue somewhere (a dedicated `/review` page would help).
8. **Achievements unlock surface** — `first_writing` achievement needs the writing page to unlock it directly (the generic checker doesn't cover it). Audit all 14 achievements actually become reachable through gameplay.

---

## 6. Ways to Improve (roadmap suggestions)

**Content depth (highest impact)**
- Enrich `full-vocab.json` 3078 words with English glosses + example sentences (could be generated, then human-verified against the C1 reference Wortlisten).
- Expand grammar to cover the full B1–C1 syllabus: Konjunktiv I/II, Passiv (all tenses), Relativsätze, Nominalisierung, Konnektoren, Partizipialkonstruktionen, indirekte Rede.
- Add **Leseverstehen** (reading) and **Hörverstehen** (listening) modules — currently absent and both are exam sections. Listening would need audio assets.

**Exam realism**
- Add full **timed mock exams** per level mirroring real Goethe/telc structure (the `/exams` page already documents the formats — turn that data into actual timed test flows).
- Speaking practice prompts (Sprechen) — even just prompts + self-record, since no backend.

**UX/polish**
- A `/review` page that surfaces the SRS due queue across all modules.
- Onboarding flow that asks target exam + level and tailors the dashboard.
- Export/import progress (JSON download) so localStorage isn't a single point of loss.

**Technical**
- Add Vitest unit tests for `progress.ts` and `gamification.ts` (SM-2 intervals, streak rollover at Vietnam midnight, XP/level math).
- Consider PWA/offline support — fits the localStorage-only model well.
- Lighthouse pass for mobile performance (3D, fonts, CLS).

---

## 7. How to Work in This Repo

```bash
npm run dev      # Turbopack dev server
npm run build    # MUST pass before pushing (Vercel deploys main)
git push origin main   # triggers Vercel production deploy
```

- Read `node_modules/next/dist/docs/` for any Next.js 16 API before using it — conventions differ from older versions (e.g. `middleware.ts` → `proxy.ts`, scroll behavior attribute, dynamic import rules).
- Always commit `C1.zip`, `c1ref/` .
- Keep all task content in German, all UI/explanations in English.

---

## 8. Quick Reference 

- ❌ Don't add a backend / auth / database.
- ❌ Don't rename `germanforge_*` localStorage keys.
-  add A2 vocabulary.
- ❌ Don't put Vietnamese text in the UI.
- ❌ Don't call `Math.random()`/`Date.now()` in render or module scope.
- ALWAYS copyrighted exercises verbatim from `c1ref/` PDFs — write original tasks in the same style.
- ALWAYS commit the copyrighted PDFs.
