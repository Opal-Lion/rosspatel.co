import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ross Patel brand palette
        "rp-black": "#0a0a0a",         // Near-black base
        "rp-teal": "#00c4b4",          // Primary accent — from GEI photos
        "rp-teal-dark": "#007a6e",     // Deeper teal
        "rp-red": "#e8432d",           // Secondary accent — red sunglasses
        "rp-amber": "#f5a623",         // Tertiary — warm gold
        "rp-white": "#f5f5f0",         // Off-white for body text
        "rp-grey": "#6b7280",          // Muted text
        "rp-surface": "#141414",       // Card/section surfaces
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
    },
  },
  plugins: [],
};

export default config;
