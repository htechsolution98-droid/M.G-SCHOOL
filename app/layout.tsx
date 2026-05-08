import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import LayoutShell from "@/components/LayoutShell";

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M.G. School | Excellence in Education",
  description: "Welcome to M.G. School - Nurturing future leaders with excellence in education and values.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body>
        <SmoothScroller>
          <LayoutShell>
            {children}
          </LayoutShell>
        </SmoothScroller>
      </body>
    </html>
  );
}