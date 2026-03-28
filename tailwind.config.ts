import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "naija-green": {
          DEFAULT: "#008751",
          dark: "#006840",
          light: "#00a86b",
          50: "#e6f5ee",
          100: "#b3e0cc",
          200: "#80ccaa",
          900: "#003d24",
        },
        dark: {
          900: "#0a0f1a",
          800: "#111827",
          700: "#1f2937",
          600: "#374151",
          500: "#4b5563",
        },
        danger: "#ef4444",
        warning: "#f59e0b",
        safe: "#22c55e",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { boxShadow: "0 0 5px rgba(0, 135, 81, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0, 135, 81, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
