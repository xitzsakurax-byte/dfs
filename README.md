# GermanForge

Focused preparation for the **Goethe-Zertifikat B1, B2 and C1**. The app opens on a short daily plan with three steps: words, one grammar topic, and one exam module.

## What is inside

| Area | Content |
| --- | --- |
| **Practice tests** (`/tests`) | One complete paper per level (B1, B2, C1), with all four modules: Lesen, Hören, Schreiben and Sprechen. The parts, item counts, task types, worked examples ("Beispiel 0"), timings and word counts follow the official Goethe-Institut model tests. C1 uses the format introduced on 1 January 2024. All texts are original and deliberately a little harder than the model tests. |
| **Listening** | Scripts are read aloud by the browser's German voice (Web Speech API). Recordings play as often as in the real exam (once or twice), and the transcripts appear after you submit. |
| **Writing / Speaking** | Timers, word count, a self-check list, model answers, and a "copy for AI feedback" prompt built on the Goethe assessment criteria. Speaking includes an optional local recorder; nothing is uploaded. |
| **Words** (`/words`) | 498 B1–C1 words and phrases in 14 exam-topic decks, including verbs with prepositions, noun–verb phrases and Redemittel. Spaced repetition (SM-2), with a flip mode and a typing mode that checks articles. |
| **Grammar** (`/grammar`) | 17 topics (169 items), from B1 connectors to C1 Konjunktiv I, participles and nominal style. Each topic has a rule card, a drill, and a list of your saved mistakes to re-drill. |
| **Exam guide** (`/exams`) | The structure of each Goethe exam part by part, with links to the official free model tests and regulations. |

## Principles

- **Goethe only.** Format data comes from the official documents, which are listed in `lib/data/exams.ts`. Official exam texts are never copied.
- **No backend, no login.** Progress is one `localStorage` entry (`gf2`) with export and import under **Me**. Old `germanforge_*` keys are removed on first load.
- **UI in English, exam content in German.** Dates follow Vietnam time (`Asia/Ho_Chi_Minh`).
- **Light and fast.** No 3D, no animation libraries; dependencies are only Next.js, React and lucide icons. Every route is statically prerendered.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # must pass: Vercel deploys from main
npm run lint
```

This is Next.js 16. Read `node_modules/next/dist/docs/` before using framework APIs (see `AGENTS.md`).

## Structure

```
app/                 routes (today, words, grammar, tests, exams, me)
components/          Shell, UI primitives, Review (SRS), Drill, test/* (runner, audio, writing, speaking)
lib/core.ts          dates, shuffle, text helpers
lib/store.ts         localStorage state + hooks
lib/srs.ts           spaced repetition
lib/speech.ts        German text-to-speech
lib/data/            words, grammar, exams, tests/*
```

### Adding a practice test

Create `lib/data/tests/goethe-<level>-<n>.ts` using the types in `lib/data/tests/types.ts`, then add it to `lib/data/tests/index.ts`. Keep the official item counts per part:

- **B1:** Lesen 6/6/7/7/4, Hören 10/5/7/8
- **B2:** Lesen 9/6/6/6/3, Hören 10/6/6/8
- **C1:** Lesen 8/7/8/7, Hören 6/9/8/7
