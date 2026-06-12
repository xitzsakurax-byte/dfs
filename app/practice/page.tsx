'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PracticeHub() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-10">
        <div className="text-xs tracking-[2px] text-[#8B6F47] mb-1">B1 — C1</div>
        <h1 className="text-5xl font-semibold tracking-tight">Advanced practice</h1>
        <p className="text-[#6B6B6B] mt-2">Focused exercises for independent and proficient users.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Vocabulary - B1-C1 */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Link href="/practice/vocab" className="skill-card group block">
            <div 
              className="h-40 -mx-6 -mt-6 mb-6 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://picsum.photos/id/1015/800/400')" }}
            />
            <div>
              <div className="font-semibold text-2xl tracking-tight mb-2">Advanced Vocabulary</div>
              <div className="text-[#6B6B6B] text-[15px] leading-relaxed">Nuanced terms, collocations, and professional language from authentic German contexts.</div>
              <div className="mt-6 text-sm font-medium text-[#8B6F47] group-hover:underline">Begin exercise →</div>
            </div>
          </Link>
        </motion.div>

        {/* Grammar - B1-C1 */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
          <Link href="/practice/grammar" className="skill-card group block">
            <div 
              className="h-40 -mx-6 -mt-6 mb-6 bg-cover bg-center" 
              style={{ backgroundImage: "url('https://picsum.photos/id/201/800/400')" }}
            />
            <div>
              <div className="font-semibold text-2xl tracking-tight mb-2">Complex Grammar</div>
              <div className="text-[#6B6B6B] text-[15px] leading-relaxed">Subjunctive, passive voice, relative clauses, and sophisticated sentence structures.</div>
              <div className="mt-6 text-sm font-medium text-[#8B6F47] group-hover:underline">Begin exercise →</div>
            </div>
          </Link>
        </motion.div>
      </div>

      <div className="mt-8 text-center text-sm text-[#6B6B6B]">
        Listening and Speaking modules coming soon with authentic audio and guided practice.
      </div>
    </div>
  );
}
