import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame, Trophy, Target, BookOpen, Award } from 'lucide-react';

export default function GermanForgeLanding() {
  return (
    <div className="min-h-screen bg-[#f0f4f8] text-[#1f2937]">
      {/* Fun colorful nav */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#58cc02] text-white font-black text-2xl tracking-[-1px]">GF</div>
            <div>
              <div className="font-black text-2xl tracking-tighter">GermanForge</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="font-bold text-[#1f2937] hover:text-[#58cc02]">Dashboard</Link>
            <Link href="/practice" className="font-bold text-[#1f2937] hover:text-[#58cc02]">Practice</Link>
            <Button asChild className="duo-cta !px-7 !py-2 !text-base !rounded-2xl">
              <Link href="/dashboard">Start practicing free</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero - super colorful and fun */}
      <div className="mx-auto max-w-5xl px-6 pt-14 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#58cc02] px-4 py-1 text-sm font-extrabold tracking-widest text-white mb-6">
          🔥 LIKE DUOLINGO BUT FOR SERIOUS GERMAN
        </div>

        <h1 className="text-7xl md:text-[82px] font-black tracking-[-4.5px] leading-[0.9] mb-6">
          Learn German.<br />
          <span className="text-[#58cc02]">Have fun doing it.</span>
        </h1>
        
        <p className="mx-auto max-w-xl text-2xl text-[#475569] mb-10 font-medium">
          Short, colorful quizzes. Earn XP. Keep your streak alive. 
          Perfect for Ausbildung, work, or just not sounding like a tourist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="duo-cta text-2xl px-14 py-7 rounded-3xl">
            <Link href="/dashboard">Start free • No signup</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-xl px-10 py-7 rounded-3xl border-4 border-[#1f2937] font-bold">
            <Link href="#play">See how it works</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-[#64748b]">Guest mode • Progress saves in your browser for now</p>
      </div>

      {/* Big colorful stats bar */}
      <div className="bg-white border-y py-5">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 px-6 text-center text-sm font-semibold">
          <div className="flex items-center justify-center gap-2"><span className="text-[#58cc02] text-3xl">87k</span> streaks today</div>
          <div className="flex items-center justify-center gap-2"><span className="text-[#1cb0f6] text-3xl">4.2×</span> more practice</div>
          <div className="flex items-center justify-center gap-2"><span className="text-[#ce82ff] text-3xl">A1 → B2</span> in ~90 days</div>
          <div className="flex items-center justify-center gap-2"><span className="text-[#ff9500] text-3xl">92%</span> keep their streak</div>
        </div>
      </div>

      {/* How to play - colorful cards */}
      <div id="play" className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-10">
          <div className="text-[#58cc02] font-black tracking-[3px] text-sm mb-2">3 MINUTES A DAY IS ENOUGH</div>
          <h2 className="text-6xl font-black tracking-[-2px]">Play like Duolingo.<br />Actually remember like Quizlet.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="skill-card vocabulary">
            <div>
              <div className="icon">📚</div>
              <div className="font-black text-4xl mb-1">Vocabulary</div>
              <div className="text-white/90 text-xl">Multiple choice. Instant feedback. Real words you’ll use.</div>
            </div>
            <div className="text-sm font-bold opacity-75">10 questions • +XP per correct</div>
          </div>

          <div className="skill-card grammar">
            <div>
              <div className="icon">✍️</div>
              <div className="font-black text-4xl mb-1">Grammar</div>
              <div className="text-white/90 text-xl">Quick drills. Cases, verbs, word order. No boring explanations until you get it wrong.</div>
            </div>
            <div className="text-sm font-bold opacity-75">5–8 questions • Hearts system</div>
          </div>

          <div className="skill-card listening">
            <div>
              <div className="icon">🎧</div>
              <div className="font-black text-4xl mb-1">Listening + Speaking</div>
              <div className="text-white/90 text-xl">Coming very soon. Browser audio + voice. Kahoot energy.</div>
            </div>
            <div className="text-sm font-bold opacity-75">Short &amp; addictive</div>
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
