//Purpose: Enhanced Tailwind configuration with premium design tokens

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Premium color palette
        primary: {
          50: "oklch(0.95 0.08 145)",
          100: "oklch(0.9 0.12 145)",
          200: "oklch(0.85 0.14 145)",
          300: "oklch(0.8 0.16 145)",
          400: "oklch(0.75 0.18 145)",
          500: "oklch(0.7 0.2 145)",
          600: "oklch(0.65 0.22 145)",
          700: "oklch(0.6 0.24 145)",
          800: "oklch(0.55 0.26 145)",
          900: "oklch(0.5 0.28 145)",
        },
        accent: {
          50: "oklch(0.95 0.08 80)",
          100: "oklch(0.9 0.12 80)",
          200: "oklch(0.85 0.14 80)",
          300: "oklch(0.8 0.16 80)",
          400: "oklch(0.75 0.18 80)",
          500: "oklch(0.7 0.2 80)",
          600: "oklch(0.65 0.22 80)",
          700: "oklch(0.6 0.24 80)",
          800: "oklch(0.55 0.26 80)",
          900: "oklch(0.5 0.28 80)",
        },
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.08)",
        medium: "0 8px 32px rgba(0, 0, 0, 0.12)",
        lift: "0 16px 48px rgba(0, 0, 0, 0.16)",
        glow: "0 0 40px rgba(34, 197, 94, 0.15)",
        "glow-accent": "0 0 40px rgba(245, 158, 11, 0.15)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shimmer-premium": "shimmer-premium 2s linear infinite",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        "scale-in": "scale-in 0.6s ease-out",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
} satisfies Config;
