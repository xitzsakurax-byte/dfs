import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Add elegant fonts inspired by du hoc nghe duc project for professional Vietnamese/German audience
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Luyện Tiếng Đức B1-C1 | DHND GermanForge",
  description: "Luyện tiếng Đức chuyên nghiệp B1-C1 cho du học nghề Đức (Ausbildung). Bài tập tinh gọn, hình ảnh thực tế, tiến độ rõ ràng. Phối hợp với DHND – Du Học Nghề Đức.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer className="border-t border-[var(--line)] bg-[var(--surface)] py-6 mt-auto text-center text-sm text-[var(--muted)]">
          Phối hợp với <a href="http://localhost:3001" target="_blank" rel="noopener" className="text-[var(--gold)] hover:underline">DHND — Du Học Nghề Đức</a> | Khám phá lộ trình Ausbildung đầy đủ, hỗ trợ visa và cuộc sống tại Đức.
          <br />
          <a href="http://localhost:3000" className="text-[var(--gold)] hover:underline">GermanForge — Luyện Tiếng Đức B1-C1 (Công cụ hỗ trợ)</a>
        </footer>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
