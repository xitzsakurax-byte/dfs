import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Link from "next/link";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GermanForge | B1–C1 TELC & Goethe Exam Prep",
  description: "Premium B1–C1 exam preparation for TELC and Goethe-Zertifikat. Authentic tasks, official 3,000+ word bank, advanced gamification, spaced repetition. Master your German exam.",
  icons: {
    icon: "/favicon.ico",
  },
};

const footerLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/practice", label: "Practice" },
  { href: "/exams", label: "Exam Info" },
  { href: "/resources", label: "Resources" },
  { href: "/achievements", label: "Achievements" },
  { href: "/skill-tree", label: "Skill Tree" },
  { href: "/progress", label: "Progress" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased dark`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        {children}
        <footer
          className="mt-auto relative overflow-hidden"
          style={{ borderTop: "1px solid var(--line)", background: "var(--surface)" }}
        >
          <div
            className="orb-gold"
            style={{ width: 420, height: 420, bottom: -300, left: "50%", transform: "translateX(-50%)", opacity: 0.5 }}
          />
          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-12 pb-24 md:pb-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <div className="serif-accent gradient-text text-4xl sm:text-5xl leading-none">
                  GermanForge
                </div>
                <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>
                  Professional preparation for TELC &amp; Goethe-Zertifikat B1–C1.
                </p>
              </div>
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {footerLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="nav-link" style={{ color: "var(--text-2)" }}>
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div
              className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
              style={{ borderTop: "1px solid var(--line)", color: "var(--muted)" }}
            >
              <span>Authentic exam tasks · Official vocabulary bank · Targeted skill training</span>
              <span>All progress stays on this device · For Anh Kiet · Vietnam time</span>
            </div>
          </div>
        </footer>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
