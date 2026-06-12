import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GermanForgeLanding() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#2C2C2C]">
      {/* Elegant nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-[#D4CFC6]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3D5A5B] text-white font-semibold text-xl tracking-tight">GF</div>
            <div className="font-semibold text-2xl tracking-tight">GermanForge</div>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className="hover:text-[#3D5A5B] transition-colors">Dashboard</Link>
            <Link href="/practice" className="hover:text-[#3D5A5B] transition-colors">Practice</Link>
            <Button asChild className="px-5 py-2 rounded-xl text-sm font-semibold bg-[#3D5A5B] text-white hover:bg-[#8B6F47]">
              <Link href="/dashboard">Begin practice</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Aesthetic hero with image */}
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block px-3 py-1 rounded-full bg-[#EDE8E0] text-[#6B6B6B] text-xs tracking-[2px] mb-6">B1 • B2 • C1</div>
          
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-[1.05] mb-6">
            Master advanced German.<br />With precision.
          </h1>
          
          <p className="text-xl text-[#6B6B6B] max-w-md mb-8">
            Elegant, focused practice for B1–C1 learners. Real-world vocabulary, nuanced grammar, and visual context.
          </p>

          <div className="flex gap-4">
            <Button asChild className="px-8 py-3 rounded-2xl text-base font-semibold bg-[#3D5A5B] text-white hover:bg-[#8B6F47]">
              <Link href="/dashboard">Start practicing</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-3 rounded-2xl text-base font-medium border-[#D4CFC6] hover:bg-[#EDE8E0]">
              <Link href="#skills">Explore skills</Link>
            </Button>
          </div>
          <p className="mt-3 text-xs text-[#6B6B6B]">Guest access • Progress saved locally</p>
        </div>

        {/* Hero image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] bg-[#EDE8E0]">
          <img 
            src="https://picsum.photos/id/1015/1200/750" 
            alt="Elegant study space with German books and natural light" 
            className="object-cover w-full h-full" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </div>

      {/* Subtle stats */}
      <div className="border-y border-[#D4CFC6] bg-white py-6">
        <div className="mx-auto max-w-5xl px-6 grid grid-cols-2 md:grid-cols-4 text-center text-sm font-medium text-[#6B6B6B]">
          <div>Designed for serious learners</div>
          <div>Context-rich exercises</div>
          <div>Visual learning support</div>
          <div>CEFR-aligned B1–C1</div>
        </div>
      </div>

      {/* Skills with images - aesthetic, less icons */}
      <div id="skills" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <div className="text-xs tracking-[3px] text-[#8B6F47] mb-2">FOCUSED PRACTICE</div>
          <h2 className="text-5xl font-semibold tracking-tight">Advanced skills for B1–C1</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/practice/vocab" className="skill-card group flex flex-col">
            <div className="flex-1">
              <div className="text-[#8B6F47] text-xs tracking-widest mb-2">VOCABULARY</div>
              <div className="font-semibold text-3xl mb-3 tracking-tight">Advanced Vocabulary</div>
              <div className="text-[#6B6B6B] leading-snug">Nuanced terms, collocations, and professional language from real German contexts.</div>
            </div>
            <div className="mt-6 text-sm text-[#8B6F47] font-medium group-hover:underline">Start →</div>
          </Link>

          <Link href="/practice/grammar" className="skill-card group flex flex-col">
            <div className="flex-1">
              <div className="text-[#8B6F47] text-xs tracking-widest mb-2">GRAMMAR</div>
              <div className="font-semibold text-3xl mb-3 tracking-tight">Complex Structures</div>
              <div className="text-[#6B6B6B] leading-snug">Subjunctive, passive constructions, relative clauses, and sophisticated sentence building.</div>
            </div>
            <div className="mt-6 text-sm text-[#8B6F47] font-medium group-hover:underline">Start →</div>
          </Link>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="skill-card flex flex-col opacity-70">
            <div className="flex-1">
              <div className="text-[#8B6F47] text-xs tracking-widest mb-2">LISTENING</div>
              <div className="font-semibold text-3xl mb-3 tracking-tight">Authentic Audio</div>
              <div className="text-[#6B6B6B]">Coming soon. Podcasts, interviews, and lectures at B2–C1 level.</div>
            </div>
          </div>
          <div className="skill-card flex flex-col opacity-70">
            <div className="flex-1">
              <div className="text-[#8B6F47] text-xs tracking-widest mb-2">SPEAKING</div>
              <div className="font-semibold text-3xl mb-3 tracking-tight">Fluent Expression</div>
              <div className="text-[#6B6B6B]">Coming soon. Pronunciation and structured speaking practice.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple loop explanation */}
      <div className="bg-white py-12 border-y">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="text-[#58cc02] font-black tracking-widest mb-3 text-sm">THE LOOP THAT ACTUALLY WORKS</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left text-xl font-semibold">
            {[
              ["1", "Open the app", "See your big flaming streak"],
              ["2", "Do 8–12 questions", "Green = XP. Red = lose a heart"],
              ["3", "Watch numbers go up", "Level up. Feel good."],
              ["4", "Close the tab", "Come back tomorrow. Streak protected."]
            ].map(([num, title, desc]) => (
              <div key={num}>
                <div className="font-black text-[#58cc02] text-6xl mb-1">{num}</div>
                <div className="font-black mb-1">{title}</div>
                <div className="text-[#64748b] text-lg">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h2 className="text-6xl font-black tracking-[-2px] mb-6">Ready to actually get good?</h2>
        <Button asChild className="duo-cta text-3xl px-16 py-8 rounded-3xl mb-4">
          <Link href="/dashboard">Start practicing right now (guest mode)</Link>
        </Button>
        <div className="text-[#64748b]">No login. Progress stays in this browser until you sign up later.</div>
      </div>

      <footer className="text-center text-xs py-8 text-[#64748b] border-t">
        Made for people who need real German (Ausbildung, jobs, life). Inspired by Duolingo + Kahoot + Quizlet.
      </footer>
    </div>
  );
}
