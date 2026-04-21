import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",
        secondary: "#F59E0B",
        "bg-soft": "#F8FAFC",
        "main": "#1F2937",
        "muted": "#64748B",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)"],
        outfit: ["var(--font-outfit)"],
      },
      boxShadow: {
        "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      }
    },
  },
  plugins: [],
};
export default config;
