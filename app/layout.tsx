import type { Metadata } from "next";
import { Playfair_Display, Outfit, Inter } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

import SmoothScroller from "@/components/SmoothScroller";

export const metadata: Metadata = {
  title: "NAV BHARAT VIDHYA MANDAL | Where Dreams Take Flight",
  description: "NAV BHARAT VIDHYA MANDAL is a premier educational institution dedicated to excellence in academics and holistic development of students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-secondary selection:text-primary">
        <SmoothScroller>
          <LayoutShell>{children}</LayoutShell>
        </SmoothScroller>
      </body>
    </html>
  );
}

