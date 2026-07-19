import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        bg: {
          base: "#0a0f0a",
          surface: "#111710",
          elevated: "#151d15",
        },
        brand: {
          DEFAULT: "#c8ff2b",
          50: "#f8fff0",
          100: "#efffd9",
          200: "#dfffb0",
          300: "#cfff87",
          400: "#c8ff2b",
          500: "#b0ea1a",
          600: "#8ec310",
          700: "#6c9a0c",
          800: "#4d7108",
          900: "#2f4805",
        },
        accent: {
          DEFAULT: "#ff2bd6",
          soft: "#ff87e6",
        },
        ink: {
          DEFAULT: "#eef0ea",
          muted: "#a3aa9d",
          faint: "#6b7268",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at center, rgba(200,255,43,0.15), transparent 60%)",
        "brand-gradient":
          "linear-gradient(135deg, #c8ff2b 0%, #ff2bd6 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(200, 255, 43, 0.55)",
        "glow-accent": "0 0 40px -10px rgba(255, 43, 214, 0.55)",
      },
      animation: {
        "fade-in": "fadeIn 500ms ease-out both",
        "slide-up": "slideUp 500ms ease-out both",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        caret: "caret 1s steps(1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        caret: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
