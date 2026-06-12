import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GermanForgeLanding() {
  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#F5F7FA]">
      {/* Nav - professional like du hoc nghe duc */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 bg-[rgba(10,13,20,.92)] backdrop-blur border-b border-[var(--line)]">
        <div className="flex items-center gap-3">
          <div className="logo-mark w-9 h-9 rounded-[9px] bg-gradient-to-br from-[#111418] to-[#C8102E] flex items-center justify-center text-white text-lg font-bold border border-[rgba(244,196,48,.35)] relative overflow-hidden">
            GF
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#111418] via-[#C8102E] to-[#F4C430] opacity-90"></div>
          </div>
          <div>
            <strong className="text-lg font-semibold tracking-tight">GermanForge</strong>
            <span className="block text-[10px] text-[#A8B3C7] -mt-1 tracking-[.07em] uppercase">DHND • B1-C1</span>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="text-[#A8B3C7] hover:text-[#F5F7FA]">Dashboard</Link>
          <Link href="/practice" className="text-[#A8B3C7] hover:text-[#F5F7FA]">Practice</Link>
          <Button asChild className="btn-primary px-5 py-2 text-sm">
            <Link href="/dashboard">Bắt đầu luyện tập</Link>
          </Button>
        </div>
      </nav>

      {/* Hero - strong, flag inspired, professional */}
      <div className="hero min-h-[100vh] pt-20">
        <div className="container max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="section-label text-[#F4C430]">B1 • B2 • C1 | CHO DU HỌC NGHỀ ĐỨC</div>
            <h1 className="slogan-de text-6xl md:text-[4.2rem] leading-[1.05]">
              Luyện tiếng Đức<br />chuyên nghiệp.<br />
              <em className="text-[#F4C430]">Tương lai tại Đức.</em>
            </h1>
            <p className="hero-lead max-w-md mt-4 text-[#A8B3C7]">
              Bài tập tinh gọn B1-C1, hình ảnh thực tế, tiến độ rõ ràng. Phối hợp hoàn hảo với DHND – Du Học Nghề Đức.
            </p>
            <div className="hero-actions mt-6">
              <Button asChild className="btn-primary px-6 py-3 text-base">
                <Link href="/dashboard">Bắt đầu miễn phí</Link>
              </Button>
              <Button asChild className="btn-ghost px-6 py-3 text-base">
                <Link href="#skills">Xem kỹ năng</Link>
              </Button>
            </div>
            <p className="mt-3 text-xs text-[#A8B3C7]">Guest mode • Tiến độ lưu local • Sẵn sàng cho Ausbildung 2026</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] border border-[var(--line)]">
            <img src="https://picsum.photos/id/1015/1200/750" alt="Không gian học tập chuyên nghiệp với sách tiếng Đức" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,13,20,.6)] to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-sm text-[#F4C430] font-semibold tracking-widest">DHND • GERMANFORGE</div>
          </div>
        </div>
      </div>

      {/* Stats bar - clean KPIs */}
      <div className="border-y border-[var(--line)] bg-[var(--surface)] py-5">
        <div className="container max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center text-sm font-medium text-[#A8B3C7]">
          <div>Thiết kế cho người nghiêm túc</div>
          <div>Bài tập có ngữ cảnh thực</div>
          <div>Hỗ trợ hình ảnh chuyên nghiệp</div>
          <div>Phù hợp lộ trình Ausbildung</div>
        </div>
      </div>

      {/* Skills - clean, image focused, no icon spam */}
      <div id="skills" className="section">
        <div className="container max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="section-label">KỸ NĂNG B1-C1</div>
            <h2 className="section-title">Luyện tập tinh gọn cho Ausbildung</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/practice/vocab" className="skill-card group p-6 flex flex-col">
              <div className="flex-1">
                <div className="text-[#F4C430] text-xs tracking-[2px] mb-1">VOCABULARY B1-C1</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Từ vựng nâng cao</div>
                <div className="text-[#A8B3C7] text-[15px]">15+ mục Ausbildung-focused, collocations, ngôn ngữ nghề từ tài liệu Goethe B1 thực tế.</div>
              </div>
              <div className="mt-auto text-sm text-[#F4C430] font-medium group-hover:underline">Bắt đầu →</div>
            </Link>

            <Link href="/practice/grammar" className="skill-card group p-6 flex flex-col">
              <div className="flex-1">
                <div className="text-[#F4C430] text-xs tracking-[2px] mb-1">GRAMMAR B1-C1</div>
                <div className="font-semibold text-2xl mb-2 tracking-tight">Cấu trúc phức tạp</div>
                <div className="text-[#A8B3C7] text-[15px]">Konjunktiv II, Passive, Relativsätze + giải thích chi tiết cho giao tiếp nghề.</div>
              </div>
              <div className="mt-auto text-sm text-[#F4C430] font-medium group-hover:underline">Bắt đầu →</div>
            </Link>
          </div>

          <Link href="/resources" className="mt-4 block text-center text-sm text-[#F4C430] hover:underline">Xem Tài nguyên chính thức Goethe + Ngân hàng 3000+ Wortliste (tích hợp gamification đầy đủ) →</Link>
          <Link href="/practice/bank" className="mt-1 block text-center text-sm text-[#F4C430] hover:underline">Quick Bank Mastery Drill — master từ ngân hàng chính thức, +XP, sync mọi nơi →</Link>

          <div className="mt-3 text-xs text-[#A8B3C7] text-center">Listening &amp; Speaking sẽ sớm cập nhật với audio thực tế từ Đức. Nội dung được tinh chỉnh cho người chuẩn bị Ausbildung. Mọi hoạt động luyện tập đều đóng góp vào Bank Mastery 3000+ (không lặp từ sau khi đúng).</div>
        </div>
      </div>
    </div>
  );
}
