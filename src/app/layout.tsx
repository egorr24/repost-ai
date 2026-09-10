import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "RepostAI — Один контент → неделя постов",
  description: "AI Content Repurposer. Превратите одно видео или статью в десятки постов для всех соцсетей за пару минут.",
  openGraph: {
    title: "RepostAI — Один контент → неделя постов",
    description: "Превратите одно видео или статью в десятки постов для всех соцсетей за пару минут.",
    type: "website",
    locale: "ru_RU",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        {children}
      </body>
    </html>
  );
}
