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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Link href="/practice/vocab" className="skill-card group block p-6">
              <div>
                <div className="text-[#F4C430] text-xs tracking-widest mb-1">VOCABULARY B1-C1</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Từ vựng nâng cao</div>
                <div className="text-[#A8B3C7] text-[15px]">100+ mục (mở rộng từ Goethe B1 Wortliste, sẵn sàng cho 3000+ từ) • Ví dụ thực tế • Chủ đề Ausbildung &amp; nghề • Trộn ngẫu nhiên • Tự sync Bank Mastery</div>
              </div>
              <div className="mt-6 text-sm text-[#F4C430] font-medium group-hover:underline">Bắt đầu bài tập →</div>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <Link href="/practice/grammar" className="skill-card group block p-6">
              <div>
                <div className="text-[#F4C430] text-xs tracking-widest mb-1">GRAMMAR B1-C1</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Cấu trúc phức tạp</div>
                <div className="text-[#A8B3C7] text-[15px]">8+ cấu trúc • Konjunktiv, Passive, Relativsätze + giải thích chi tiết • Tự sync Bank Mastery</div>
              </div>
              <div className="mt-6 text-sm text-[#F4C430] font-medium group-hover:underline">Bắt đầu bài tập →</div>
            </Link>
          </motion.div>

          {/* New commercial writing mock test card */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}>
            <Link href="/practice/writing" className="skill-card group block p-6">
              <div>
                <div className="text-[#F4C430] text-xs tracking-widest mb-1">WRITING MOCK • TELC + GOETHE B1-C1</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Luyện viết chuyên nghiệp</div>
                <div className="text-[#A8B3C7] text-[15px]">Email + Báo cáo/ý kiến (Ausbildung focus) • Chấm điểm &amp; phản hồi chi tiết bởi AI (mô phỏng tiêu chí chính thức) • Tích hợp 3000+ Wortliste bank • Trộn đề ngẫu nhiên</div>
              </div>
              <div className="mt-6 text-sm text-[#F4C430] font-medium group-hover:underline">Bắt đầu thi viết →</div>
            </Link>
          </motion.div>

          {/* Dedicated 3000+ Bank gamification card - added into everything */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
            <Link href="/practice/bank" className="skill-card group block p-6 border border-[var(--gold)]/60">
              <div>
                <div className="text-[#F4C430] text-xs tracking-widest mb-1">OFFICIAL 3000+ WORTLISTE BANK</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Ngân hàng từ vựng chính thức</div>
                <div className="text-[#A8B3C7] text-[15px]">Quick Mastery Drill • 3078 từ Goethe B1 • Ưu tiên từ chưa nắm • +8–14 XP mỗi từ • Sync real-time với mọi quiz &amp; dashboard • Random không lặp</div>
              </div>
              <div className="mt-6 text-sm text-[#F4C430] font-medium group-hover:underline">Bắt đầu Bank Drill →</div>
            </Link>
          </motion.div>
        </div>

        {/* Prominent commercial resources link */}
        <Link href="/resources" className="practice-card group block p-6 mb-8 hover:border-[var(--gold)] transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#F4C430] text-xs tracking-widest mb-1">OFFICIAL + ENRICHED</div>
              <div className="font-semibold text-2xl tracking-tight">Tài nguyên chính thức &amp; Ngân hàng học liệu</div>
              <div className="text-[#A8B3C7] mt-1 text-[15px]">Link Goethe-Institut B1 (model &amp; practice exercises) • Ví dụ Ausbildung • Giải thích chi tiết • Mẹo thi &amp; nghề</div>
            </div>
            <div className="text-[#F4C430] text-sm font-medium group-hover:underline">Xem ngay →</div>
          </div>
        </Link>

        <div className="text-xs text-[#A8B3C7] text-center">Listening &amp; Speaking sẽ cập nhật sớm với audio thực từ Đức. Nội dung được xây dựng dựa trên tài liệu chính thức Goethe + yêu cầu thực tế Ausbildung.</div>
      </div>
    </div>
  );
}
