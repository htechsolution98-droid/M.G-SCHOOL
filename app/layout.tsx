import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
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
    <html lang="en" className={`${playfair.variable} ${outfit.variable}`}>
      <body className="antialiased selection:bg-secondary selection:text-primary">
        <SmoothScroller>
          <LayoutShell>{children}</LayoutShell>
        </SmoothScroller>
      </body>
    </html>
  );
}

