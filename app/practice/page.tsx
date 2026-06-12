'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PracticeHub() {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-8">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-[#F4C430] text-xs tracking-[2px]">B1-C1 | CHO AUSBUILDUNG</div>
            <h1 className="text-4xl font-semibold tracking-tight">Chọn kỹ năng</h1>
          </div>
          <Link href="/dashboard" className="text-sm text-[#A8B3C7] hover:text-[#F5F7FA]">← Về Dashboard</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Link href="/practice/vocab" className="skill-card group block p-6">
              <div>
                <div className="text-[#F4C430] text-xs tracking-widest mb-1">VOCABULARY</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Từ vựng nâng cao</div>
                <div className="text-[#A8B3C7] text-[15px]">10 câu • Multiple choice • Ngữ cảnh chuyên ngành B1-C1</div>
              </div>
              <div className="mt-6 text-sm text-[#F4C430] font-medium group-hover:underline">Bắt đầu bài tập →</div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <Link href="/practice/grammar" className="skill-card group block p-6">
              <div>
                <div className="text-[#F4C430] text-xs tracking-widest mb-1">GRAMMAR</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Cấu trúc phức tạp</div>
                <div className="text-[#A8B3C7] text-[15px]">6 câu • Konjunktiv II, bị động, relative clauses</div>
              </div>
              <div className="mt-6 text-sm text-[#F4C430] font-medium group-hover:underline">Bắt đầu bài tập →</div>
            </Link>
          </motion.div>
        </div>

        <div className="mt-8 text-xs text-[#A8B3C7] text-center">Listening &amp; Speaking sẽ cập nhật sớm với audio thực từ Đức.</div>
      </div>
    </div>
  );
}
