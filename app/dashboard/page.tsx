import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame, Target, Award } from 'lucide-react';

export default function Dashboard() {
  // Guest mode mock data (local only for now)
  const streak = 14;
  const todayXP = 85;
  const dailyGoal = 120;
  const hearts = 4;
  const level = 12;
  const xpToNext = 420;

  return (
    <div className="space-y-10 pb-16">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <div className="text-[#58cc02] font-black tracking-[2px] text-sm">GUTEN MORGEN!</div>
          <h1 className="text-6xl font-black tracking-[-2.5px]">Ready to keep the streak alive, Alex?</h1>
        </div>
        <div className="text-right">
          <div className="text-5xl font-black tabular-nums text-[#58cc02]">{streak}</div>
          <div className="font-bold -mt-1">DAY STREAK 🔥</div>
        </div>
      </div>

      {/* Big colorful daily goal + hearts */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-[#e5e7eb]">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-7 w-7 text-[#58cc02]" />
              <span className="font-black text-2xl">Today’s Goal</span>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-7xl font-black tabular-nums">{todayXP}</span>
              <span className="text-3xl text-[#64748b]">/ {dailyGoal} XP</span>
            </div>
            <div className="h-5 bg-[#e5e7eb] rounded-full overflow-hidden">
              <div className="xp-bar" style={{ width: `${Math.min((todayXP / dailyGoal) * 100, 100)}%` }} />
            </div>
          </div>

          <div>
            <Button asChild className="duo-cta !text-3xl px-16 py-8 rounded-3xl">
              <Link href="/practice">START DAILY PRACTICE</Link>
            </Button>
            <div className="text-center text-sm font-bold text-[#64748b] mt-2">8–12 questions • ~5 minutes</div>
          </div>
        </div>
      </div>

      {/* Hearts + Level quick row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-7 border-4 border-[#e5e7eb]">
          <div className="flex items-center justify-between mb-4">
            <div className="font-black text-2xl flex items-center gap-2"><Flame className="text-[#ff9500]" /> Streak &amp; Lives</div>
            <div className="text-sm font-bold text-[#64748b]">Don’t lose all hearts!</div>
          </div>
          <div className="flex gap-2 text-5xl">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`heart ${i >= hearts ? 'lost' : ''}`}>❤️</span>
            ))}
          </div>
          <div className="mt-3 text-[#64748b] font-medium">You have <span className="font-black text-[#1f2937]">{hearts} hearts</span> left today.</div>
        </div>

        <div className="bg-white rounded-3xl p-7 border-4 border-[#e5e7eb]">
          <div className="font-black text-2xl mb-1 flex items-center gap-2"><Award className="text-[#ce82ff]" /> Level {level}</div>
          <div className="text-5xl font-black tabular-nums mb-3">{xpToNext} <span className="text-2xl font-bold text-[#64748b]">XP to next level</span></div>
          <div className="h-4 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="xp-bar" style={{ width: '68%' }} />
          </div>
        </div>
      </div>

      {/* Skill cards - colorful and clickable */}
      <div>
        <div className="font-black text-3xl mb-4 tracking-tight">What do you want to practice?</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Vocabulary", desc: "Translate 10 words. Multiple choice. Fast XP.", href: "/practice/vocab", icon: "📚", color: "vocabulary" },
            { title: "Grammar", desc: "Cases, verbs, word order. 6 quick questions.", href: "/practice/grammar", icon: "✍️", color: "grammar" },
            { title: "Listening", desc: "Coming very soon — real audio drills.", href: "/practice", icon: "🎧", color: "listening" },
            { title: "Speaking", desc: "Coming very soon — record & score.", href: "/practice", icon: "🎤", color: "speaking" },
          ].map((s) => (
            <Link key={s.title} href={s.href} className={`skill-card ${s.color} group`}>
              <div className="icon">{s.icon}</div>
              <div>
                <div className="font-black text-4xl mb-1 group-active:scale-95 transition">{s.title}</div>
                <div className="text-white/90 text-[17px] leading-tight">{s.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center text-sm font-medium text-[#64748b] pt-4">
        Guest mode • Your progress is saved in this browser only. Sign in later to sync across devices.
      </div>
    </div>
  );
}
