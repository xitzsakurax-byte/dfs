import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PracticeHub() {
  return (
    <div className="max-w-5xl mx-auto py-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="text-[#58cc02] font-black tracking-[2px]">PICK YOUR POISON</div>
          <h1 className="text-6xl font-black tracking-[-2px]">Choose a skill</h1>
        </div>
        <Link href="/dashboard" className="font-bold text-[#58cc02] hover:underline">← Back to dashboard</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vocabulary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Link href="/practice/vocab" className="skill-card vocabulary group">
            <div>
              <div className="icon">📚</div>
              <div className="font-black text-5xl mb-2">Vocabulary</div>
              <div className="text-2xl text-white/90">Translate 10 German words.<br />Multiple choice. Instant green/red feedback.</div>
            </div>
            <div className="mt-auto">
              <div className="inline-block bg-white/25 px-4 py-1 rounded-2xl font-black text-sm">10 QUESTIONS • +10–20 XP</div>
            </div>
          </Link>
        </motion.div>

        {/* Grammar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
          <Link href="/practice/grammar" className="skill-card grammar group">
            <div>
              <div className="icon">✍️</div>
              <div className="font-black text-5xl mb-2">Grammar</div>
              <div className="text-2xl text-white/90">Cases, articles &amp; verbs.<br />6 quick questions. Lose hearts if you mess up.</div>
            </div>
            <div className="mt-auto">
              <div className="inline-block bg-white/25 px-4 py-1 rounded-2xl font-black text-sm">6 QUESTIONS • HEARTS MODE</div>
            </div>
          </Link>
        </motion.div>

        {/* Listening (placeholder) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}>
          <div className="skill-card listening opacity-70 cursor-not-allowed">
            <div>
              <div className="icon">🎧</div>
              <div className="font-black text-5xl mb-2">Listening</div>
              <div className="text-2xl text-white/90">Real audio sentences.<br />Type what you hear. Coming in the next update.</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Speaking (placeholder) */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
          <div className="skill-card speaking opacity-70 cursor-not-allowed">
            <div>
              <div className="icon">🎤</div>
              <div className="font-black text-5xl mb-2">Speaking</div>
              <div className="text-2xl text-white/90">Record yourself saying the sentence.<br />Pronunciation scoring coming soon.</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-10 text-center text-sm font-medium text-[#64748b]">
        Tip: Answer fast and correct for maximum XP. Wrong answers cost a heart ❤️
      </div>
    </div>
  );
}
