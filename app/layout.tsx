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

export const metadata: Metadata = {
  title: "M.G. School | Where Dreams Take Flight",
  description: "M.G. School is a premier educational institution dedicated to excellence in academics and holistic development of students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} scroll-smooth`}>
      <body className="antialiased selection:bg-secondary selection:text-primary">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

