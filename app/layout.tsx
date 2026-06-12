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

// Professional elegant fonts for GermanForge B1-C1 TELC & Goethe exam prep
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "GermanForge | B1-C1 TELC & Goethe Exam Prep",
  description: "Professional B1-C1 exam preparation for TELC and Goethe-Zertifikat. Authentic exam tasks, targeted training, measurable progress. Master the exams with confidence.",
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
          GermanForge — Professional Preparation for TELC B1 &amp; Goethe B1-C1 Exams
          <br />
          Authentic exam tasks • Official vocabulary bank • Targeted skill training
        </footer>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
