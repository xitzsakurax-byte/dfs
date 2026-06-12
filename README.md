# GermanForge — B1-C1 TELC & Goethe Exam Prep

Professional German exam preparation app for TELC and Goethe-Zertifikat B1–C1.

## Features

- **3000+ Word Bank** — official Goethe B1 Wortliste integrated into all practice modules
- **6 Practice Modules** — Vocab, Grammar, Declensions (word forms), Bank Drill, Writing Mock, Interactive Game
- **Gamification** — XP, levels, streaks, achievements, daily quests, spaced repetition (SRS), skill tree
- **Exam Info** — Goethe-Zertifikat and telc exam formats, times, pass criteria, official free materials
- **Premium UI** — dark theme, glassmorphism, Three.js 3D hero, GSAP scroll animations
- **Pure localStorage** — no backend, no login, instant, offline-capable. All progress for Anh Kiet stays in browser.
- **Mobile + Desktop** — bottom nav tabs, touch-friendly, responsive layouts

## Tech Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- Tailwind CSS 4
- Three.js + @react-three/fiber + @react-three/drei (3D hero)
- GSAP 3 + ScrollTrigger (scroll animations)
- Framer Motion (UI animations)
- shadcn/ui components, Sonner toasts

## Running Locally

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

## Data Sources

- Vocabulary: Official Goethe-Zertifikat B1 Wortliste (~2400 units), supplemented with B2/C1 terms
- Exam info: goethe.de and telc.net (verified 2025–2026)
- Grammar structures: Based on official Goethe B1/B2 Modellsätze patterns
