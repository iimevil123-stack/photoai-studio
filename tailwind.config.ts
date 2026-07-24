import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        // Photo brand palette
        photo: {
          amber: {
            "50": "var(--photo-amber-50)",
            "100": "var(--photo-amber-100)",
            "200": "var(--photo-amber-200)",
            "300": "var(--photo-amber-300)",
            "400": "var(--photo-amber-400)",
            "500": "var(--photo-amber-500)",
            "600": "var(--photo-amber-600)",
            "700": "var(--photo-amber-700)",
          },
        },
        surface: {
          "0": "var(--surface-0)",
          "1": "var(--surface-1)",
          "2": "var(--surface-2)",
          glass: "var(--surface-glass)",
        },
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
      },
      // Apple-style easing curves
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-out-smooth": "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.22, 1.2, 0.36, 1)",
        "fast-out": "cubic-bezier(0, 0, 0.2, 1)",
      },
      // Premium shadow presets
      boxShadow: {
        "photo-xs": "var(--shadow-xs)",
        "photo-sm": "var(--shadow-sm)",
        "photo-md": "var(--shadow-md)",
        "photo-lg": "var(--shadow-lg)",
        "photo-xl": "var(--shadow-xl)",
        "photo-2xl": "var(--shadow-2xl)",
        "glow-amber": "var(--shadow-glow-amber)",
        "glow-blue": "var(--shadow-glow-blue)",
        "glow-purple": "var(--shadow-glow-purple)",
        "card-hover": "var(--shadow-card-hover)",
      },
      // Custom animations via Tailwind
      animation: {
        "float-card-1": "float-card-1 12s ease-in-out infinite",
        "float-card-2": "float-card-2 14s ease-in-out infinite",
        "float-card-3": "float-card-3 13s ease-in-out infinite",
        "float-slow": "float-slow 18s ease-in-out infinite",
        "float-slower": "float-slower 22s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-scale": "fade-in-scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "ken-burns": "kenBurnsZoom 8s ease-in-out infinite",
        "shimmer-text": "shimmer-text 2s ease-in-out infinite",
        "ai-pulse": "aiPulse 2s ease-in-out infinite",
        "stripe-slide": "stripe-slide 1s linear infinite",
      },
      // Custom keyframes (referenced by name, defined in globals.css)
      keyframes: {
        "float-card-1": {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(-3deg)" },
          "25%": { transform: "translateY(-16px) translateX(8px) rotate(-2deg)" },
          "50%": { transform: "translateY(-6px) translateX(-4px) rotate(-4deg)" },
          "75%": { transform: "translateY(-18px) translateX(12px) rotate(-1deg)" },
        },
        "float-card-2": {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(2deg)" },
          "25%": { transform: "translateY(12px) translateX(-10px) rotate(3deg)" },
          "50%": { transform: "translateY(-14px) translateX(6px) rotate(1deg)" },
          "75%": { transform: "translateY(8px) translateX(-14px) rotate(4deg)" },
        },
        "float-card-3": {
          "0%, 100%": { transform: "translateY(0) translateX(0) rotate(-2deg)" },
          "33%": { transform: "translateY(-12px) translateX(-6px) rotate(-3deg)" },
          "66%": { transform: "translateY(10px) translateX(8px) rotate(-1deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.05)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-25px, 15px) scale(1.08)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        kenBurnsZoom: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "50%": { transform: "scale(1.12) translate(-1%, -0.5%)" },
          "100%": { transform: "scale(1) translate(0, 0)" },
        },
        "shimmer-text": {
          "0%": { "background-position": "-200% center" },
          "100%": { "background-position": "200% center" },
        },
        aiPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 oklch(0.55 0.18 30 / 0.4)" },
          "50%": { boxShadow: "0 0 0 12px oklch(0.55 0.18 30 / 0)" },
        },
        "stripe-slide": {
          "0%": { "background-position": "0 0" },
          "100%": { "background-position": "40px 0" },
        },
      },
    },
  },
  plugins: [],
}
export default config
