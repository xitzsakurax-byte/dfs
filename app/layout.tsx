import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import { Shell } from "@/components/Shell";

const ui = Inter({ variable: "--font-ui", subsets: ["latin"], display: "swap" });
const text = Newsreader({
  variable: "--font-text",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "GermanForge — B1–C1 exam prep", template: "%s · GermanForge" },
  description:
    "Focused preparation for the Goethe-Zertifikat B1, B2 and C1: spaced-repetition vocabulary, grammar drills and full practice tests in the official exam format.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#131210" },
  ],
};

// Applies a saved light/dark choice before first paint (no flash).
const themeScript = `try{var t=localStorage.getItem("gf2-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${ui.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
