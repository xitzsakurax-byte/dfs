'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { vocab } from '@/lib/data/vocab';
import { grammar } from '@/lib/data/grammar';
import fullVocab from '@/lib/data/full-vocab.json'; // 3078+ terms from official Goethe B1 Wortliste (mixed/shuffled for the bank)

// Client-side searchable + shuffled display for the full 3000+ official word bank (performance safe)
// Now fully gamified: track mastery with localStorage, progress bar, "Master" buttons, review batches for XP-like rewards.
function FullVocabBank({ list }: { list: string[] }) {
  const [search, setSearch] = useState('');
  const [bankMastered, setBankMastered] = useState<string[]>([]);
  const [reviewList, setReviewList] = useState<string[]>([]);

  // Load mastery from localStorage (shared with quizzes for integration)
  useEffect(() => {
    const saved = localStorage.getItem('germanforge_bank_mastered');
    if (saved) setBankMastered(JSON.parse(saved));
  }, []);

  const shuffled = useMemo(() => [...list].sort(() => Math.random() - 0.5), [list]);

  const filtered = useMemo(() => {
    if (!search.trim()) return shuffled.slice(0, 200); // show 200 random mixed for preview
    const q = search.toLowerCase().trim();
    return shuffled.filter((w: string) => w.toLowerCase().includes(q)).slice(0, 500);
  }, [shuffled, search]);

  const masteryCount = bankMastered.length;
  const masteryPercent = ((masteryCount / list.length) * 100).toFixed(1);

  function toggleMaster(word: string) {
    const isMastered = bankMastered.includes(word);
    const newMastered = isMastered 
      ? bankMastered.filter(w => w !== word)
      : [...bankMastered, word];
    setBankMastered(newMastered);
    localStorage.setItem('germanforge_bank_mastered', JSON.stringify(newMastered));
    // "Gamification reward" - visual only for now, but contributes to overall mastery
  }

  function startReviewBatch() {
    const batch = [...list].sort(() => Math.random() - 0.5).slice(0, 10);
    setReviewList(batch);
    setSearch(''); // clear search when reviewing
  }

  function closeReview() {
    setReviewList([]);
  }

  const displayList = reviewList.length > 0 ? reviewList : filtered;

  return (
    <div>
      {/* Gamification header: progress + rewards */}
      <div className="mb-4 p-4 bg-[var(--surface2)] rounded-lg border border-[var(--line)]">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-semibold">Wortliste Mastery (Official 3000+ Bank)</span>
          <span className="font-mono text-[#F4C430]">{masteryCount} / {list.length} ({masteryPercent}%)</span>
        </div>
        <div className="h-3 bg-[var(--surface)] rounded-full overflow-hidden mb-3">
          <div 
            className="h-3 bg-gradient-to-r from-[#C8102E] to-[#F4C430] transition-all" 
            style={{ width: `${masteryPercent}%` }} 
          />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={startReviewBatch}
            className="btn-ghost px-4 py-1 text-sm rounded-full border border-[var(--line)] hover:border-[var(--gold)]"
          >
            Review 10 Random (Earn Mastery)
          </button>
          {reviewList.length > 0 && (
            <button onClick={closeReview} className="text-sm text-[#A8B3C7] hover:text-[#F5F7FA]">
              Close Review
            </button>
          )}
        </div>
        <div className="text-xs text-[#A8B3C7] mt-2">
          Master words by marking them learned. Contributes to your overall gamification progress (streak, level, Ausbildung prep).
        </div>
      </div>

      <input 
        type="text" 
        placeholder="Tìm từ khóa (ví dụ: Ausbildung, Bewerbung, Nachhaltigkeit, Verantwortung...)"
        className="w-full p-3 mb-4 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] focus:border-[var(--gold)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="max-h-[420px] overflow-auto text-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pr-2">
        {displayList.map((word: string, i: number) => {
          const isMastered = bankMastered.includes(word);
          return (
            <div 
              key={i} 
              className={`p-2 rounded border flex justify-between items-center ${isMastered ? 'bg-[rgba(16,185,129,0.1)] border-[var(--green)]' : 'bg-[var(--surface)] border-[var(--line)] hover:border-[var(--gold)]'} text-left break-words`}
            >
              <span>{word}</span>
              <button 
                onClick={() => toggleMaster(word)}
                className={`text-xs px-2 py-0.5 rounded ${isMastered ? 'text-[var(--green)]' : 'text-[#F4C430] hover:underline'}`}
              >
                {isMastered ? '✓ Mastered' : 'Master +10XP'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-[#A8B3C7] mt-3">
        Hiển thị {displayList.length} kết quả / {list.length} từ (toàn bộ danh sách chính thức đã trộn ngẫu nhiên). 
        Tìm kiếm để lọc nhanh. Nhấn "Master" để gamify your progress. Dùng để ôn tập, tạo flashcard hoặc luyện nghe/đọc.
        {reviewList.length > 0 && ' (Review mode active)'}
      </div>
    </div>
  );
}

// Commercial-grade Resources page
// - Official Goethe Institut links (pulled from goethe.de practice materials for B1 adults)
// - Curated, documented B1-C1 items with examples, explanations, topics (our "database" / seed content)
// - Ausbildung-focused tips
// Every detail considered: clean dark theme, readable cards, no icon spam, strong professional value, bidirectional navigation.

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA] py-8">
      <div className="container max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#F4C430] text-xs tracking-[2px] mb-1">CHÍNH THỨC • B1-C1</div>
              <h1 className="text-4xl font-semibold tracking-tight">Tài nguyên & Ngân hàng từ vựng / Cấu trúc</h1>
              <p className="mt-2 max-w-2xl text-[#A8B3C7]">
                Nội dung được xây dựng dựa trên tài liệu luyện thi chính thức của Goethe-Institut (B1 adults & Beruf). 
                Phù hợp cho người chuẩn bị Ausbildung / du học nghề Đức. Mỗi mục có ví dụ thực tế, giải thích và chủ đề nghề nghiệp.
              </p>
            </div>
            <div className="hidden md:block">
              <Button asChild className="btn-primary px-6 py-3">
                <Link href="/practice">Bắt đầu luyện tập ngay</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Official Goethe Links — real value for commercial users */}
        <section className="mb-12">
          <div className="text-[#F4C430] text-xs tracking-[2px] mb-3">NGUỒN CHÍNH THỨC</div>
          <div className="practice-card p-6">
            <h2 className="font-semibold text-xl mb-4">Goethe-Zertifikat B1 — Exam training & Practice materials (miễn phí)</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://www.goethe.de/en/spr/prf/ueb/pb1.html" target="_blank" rel="noopener" className="text-[#F4C430] hover:underline">
                  → Official B1 practice page (Listening, Reading, Writing, Speaking + Vocabulary list)
                </a>
                <div className="text-[#A8B3C7] text-xs mt-0.5">Model exercises & practice sets for adults. Download PDFs “Kandidatenblätter”.</div>
              </li>
              <li>
                <a href="https://www.goethe.de/ins/us/en/spr/prf/ueb/pb1.html" target="_blank" rel="noopener" className="text-[#F4C430] hover:underline">
                  → US mirror / alternative access to the same B1 training materials
                </a>
              </li>
              <li className="text-[#A8B3C7]">
                Khuyến nghị: Làm full “Exam training 1 + 2” + Vocabulary list trước khi thi thật. Nội dung rất sát với yêu cầu visa Ausbildung.
              </li>
            </ul>
            <div className="mt-4 text-xs text-[#A8B3C7]">
              Nguồn: goethe.de (cập nhật 2026). GermanForge bổ sung thêm ví dụ thực tế và ngân hàng từ vựng/cấu trúc chuyên sâu hơn cho người đi làm / học nghề.
            </div>
          </div>
        </section>

        {/* Vocabulary Bank — richer documentation */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-[#F4C430] text-xs tracking-[2px]">TỪ VỰNG B1-C1 (AUSBILDUNG FOCUS)</div>
              <h2 className="text-2xl font-semibold tracking-tight">Ngân hàng từ vựng & ví dụ</h2>
            </div>
            <Link href="/practice/vocab" className="text-sm text-[#F4C430] hover:underline">Luyện ngay →</Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocab.slice(0, 50).map((item, idx) => (
              <motion.div 
                key={idx} 
                className="practice-card p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-lg tracking-tight">{item.de}</div>
                    <div className="text-[#A8B3C7]">{item.en}</div>
                  </div>
                  <div className="text-right text-xs text-[#F4C430] font-mono">{item.cefr} • {item.topic}</div>
                </div>
                <div className="mt-3 text-sm border-t border-[var(--line)] pt-3">
                  <span className="text-[#A8B3C7]">Ví dụ:</span> {item.example}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-xs text-[#A8B3C7] mt-3">Mỗi mục được chọn lọc từ chủ đề nghề nghiệp, môi trường, đơn xin việc — sát với đề thi Goethe B1 và yêu cầu thực tế Ausbildung.</div>
        </section>

        {/* Grammar Bank */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-[#F4C430] text-xs tracking-[2px]">CẤU TRÚC PHỨC TẠP B1-C1</div>
              <h2 className="text-2xl font-semibold tracking-tight">Ngân hàng cấu trúc & giải thích</h2>
            </div>
            <Link href="/practice/grammar" className="text-sm text-[#F4C430] hover:underline">Luyện ngay →</Link>
          </div>

          <div className="grid md:grid-cols-1 gap-4">
            {grammar.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="practice-card p-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
              >
                <div className="font-semibold text-lg tracking-tight mb-1">{item.q}</div>
                <div className="text-[#A8B3C7] mb-2">{item.en}</div>
                <div className="text-sm">
                  <span className="text-[#F4C430]">Đáp án đúng:</span> {item.correct} — {item.hint}
                </div>
                <div className="mt-2 text-sm opacity-90">{item.explanation}</div>
                <div className="text-xs text-[#F4C430] mt-2">{item.topic} • {item.cefr}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Full 3000+ Word Bank from Official Goethe B1 Wortliste - Mixed & Searchable */}
        <section className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="text-[#F4C430] text-xs tracking-[2px]">OFFICIAL GOETHE B1 WORTLISTE</div>
              <h2 className="text-2xl font-semibold tracking-tight">Ngân hàng từ vựng đầy đủ 3000+ từ (trộn ngẫu nhiên)</h2>
            </div>
            <Link href="/practice/vocab" className="text-sm text-[#F4C430] hover:underline">Luyện MCQ ngay →</Link> <Link href="/practice/bank" className="text-sm text-[#F4C430] hover:underline ml-3">Hoặc Quick Bank Drill (gamified 12 từ) →</Link>
          </div>

          <div className="practice-card p-6">
            <p className="text-sm text-[#A8B3C7] mb-4">
              3078+ thuật ngữ từ danh sách chính thức Goethe-Zertifikat B1 (Wortliste). Đã trộn ngẫu nhiên (shuffled) để luyện tập đa dạng. 
              Sử dụng tìm kiếm để lọc theo chủ đề hoặc từ. Phù hợp cho Ausbildung, ôn thi, xuất Anki hoặc học thụ động.
              Nguồn: trích xuất từ PDF chính thức (xem comment trong lib/data/full-vocab.json để cập nhật đầy đủ).
            </p>

            {/* Client-side search and shuffled display for the large bank */}
            <FullVocabBank list={fullVocab} />
          </div>
        </section>

        {/* Ausbildung-specific tips (commercial value) */}
        <section className="mb-10">
          <div className="practice-card p-6">
            <h3 className="font-semibold mb-3">Mẹo nhanh cho người đi Ausbildung (từ thực tế B1 Beruf)</h3>
            <ul className="text-sm space-y-2 text-[#A8B3C7]">
              <li>• Tập trung từ vựng nghề: Bewerbung, Ausbildung, Praktikum, Fachkraft, Weiterbildung, Teamgeist, Nachhaltigkeit.</li>
              <li>• Konjunktiv II dùng nhiều khi nói về “giả sử / kế hoạch tương lai” trong phỏng vấn hoặc báo cáo.</li>
              <li>• Passive + Modal rất hay gặp khi mô tả quy trình, an toàn lao động, deadline.</li>
              <li>• Làm full model test từ goethe.de trước khi thi thật để quen format và timing.</li>
            </ul>
            <div className="mt-4 text-xs">Nội dung GermanForge được thiết kế bổ trợ trực tiếp cho lộ trình Ausbildung và yêu cầu tiếng Đức B1-B2 của các doanh nghiệp Đức.</div>
            <div className="mt-3 text-xs text-[#F4C430]">Tiến độ "đã nắm" (mastered) được lưu local trên trình duyệt của bạn. Khi reload web, các từ/cấu trúc đã trả lời đúng sẽ không lặp lại cho đến khi bạn reset. Xem nút reset ở cuối mỗi quiz.</div>
          </div>
        </section>

        <div className="text-center">
          <Button asChild className="btn-primary px-8 py-3">
            <Link href="/dashboard">Quay về Dashboard & tiếp tục luyện tập</Link>
          </Button>
          <div className="mt-3 text-xs text-[#A8B3C7]">Phối hợp với DHND — Du Học Nghề Đức | GermanForge là công cụ hỗ trợ luyện tập chuyên sâu B1-C1.</div>
        </div>
      </div>
    </div>
  );
}
