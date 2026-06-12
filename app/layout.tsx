import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GermanForge | B1–C1 TELC & Goethe Exam Prep",
  description: "Premium B1–C1 exam preparation for TELC and Goethe-Zertifikat. Authentic tasks, official 3,000+ word bank, advanced gamification, spaced repetition. Master your German exam.",
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
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer
          className="mt-auto text-center text-sm py-6 px-4"
          style={{ borderTop: '1px solid var(--line)', background: 'var(--surface)', color: 'var(--muted)' }}
        >
          <div className="mb-2 font-semibold" style={{ color: 'var(--gold)' }}>GermanForge</div>
          <div className="mb-3">Professional preparation for TELC B1 &amp; Goethe-Zertifikat B1–C1</div>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-xs">
            <a href="/exams" style={{ color: 'var(--muted)' }} className="hover:underline">Exam Info</a>
            <a href="/resources" style={{ color: 'var(--muted)' }} className="hover:underline">Resources</a>
            <a href="/achievements" style={{ color: 'var(--muted)' }} className="hover:underline">Achievements</a>
            <a href="/skill-tree" style={{ color: 'var(--muted)' }} className="hover:underline">Skill Tree</a>
            <a href="/dashboard" style={{ color: 'var(--muted)' }} className="hover:underline">Dashboard</a>
          </div>
          <div className="text-xs mt-3" style={{ opacity: 0.5 }}>
            Authentic exam tasks · Official vocabulary bank · Targeted skill training · For Anh Kiet
          </div>
        </footer>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
