import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Весілля Павла та Катрусі",
  description: "1 серпня 2026 — Весілля Павла та Катрусі. Operation «Zhaba». Готуйтеся, буде весело, затишно і зовсім не офіційно!",
  themeColor: "#FFEA2D",
  openGraph: {
    type: "website",
    title: "Весілля Павла та Катрусі 🐸",
    description: "1 серпня 2026 — Operation «Zhaba». Готуйтеся, буде весело, затишно і зовсім не офіційно!",
    images: ["https://wedding.justmegaara.me/og-image.png"],
    url: "https://wedding.justmegaara.me",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Весілля Павла та Катрусі 🐸",
    description: "1 серпня 2026 — Operation «Zhaba». Готуйтеся, буде весело, затишно і зовсім не офіційно!",
    images: ["https://wedding.justmegaara.me/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFEA2D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${bricolage.variable} ${dmSans.variable}`}>
      <body style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
