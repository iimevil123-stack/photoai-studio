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
      // Custom animations via Tailwind (only what's actually used)
      animation: {
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-scale": "fade-in-scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "ken-burns": "kenBurnsZoom 8s ease-in-out infinite",
      },
      // Custom keyframes (referenced by name, defined in globals.css)
      keyframes: {
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
        kenBurnsZoom: {
          "0%": { transform: "scale(1) translate(0, 0)" },
          "50%": { transform: "scale(1.12) translate(-1%, -0.5%)" },
          "100%": { transform: "scale(1) translate(0, 0)" },
        },
      },
    },
  },
  plugins: [],
}
export default config
