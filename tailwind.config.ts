import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "sans-serif"],
      },
      /* ── GRAMA Typography Scale — Guía de Marca 2024 ──
         Font: Manrope. Weights 200–800 ONLY (no 900/Black).
         Never use text below overline (0.6875rem / 11px). */
      fontSize: {
        'display': ['clamp(2.2rem, 5vw, 3.4rem)',  { lineHeight: '1.05', letterSpacing: '-0.03em',  fontWeight: '800' }],
        'h1':      ['clamp(1.6rem, 3vw, 2.4rem)',   { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '800' }],
        'h2':      ['1.125rem',  { lineHeight: '1.3', letterSpacing: '-0.01em',  fontWeight: '800' }],
        'h3':      ['1rem',      { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '700' }],
        'body-lg': ['0.9375rem', { lineHeight: '1.65' }],
        'body':    ['0.875rem',  { lineHeight: '1.55' }],
        'label':   ['0.75rem',   { lineHeight: '1.4',  fontWeight: '600' }],
        'overline':['0.6875rem', { lineHeight: '1',    letterSpacing: '0.12em', fontWeight: '700' }],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "grama-green": {
          DEFAULT: "hsl(var(--grama-green))",
          foreground: "hsl(var(--grama-green-foreground))",
        },
        /* Dark surface tokens */
        "dk-base": "hsl(var(--dk-base))",
        "dk-surface": "hsl(var(--dk-surface))",
        "dk-card": "hsl(var(--dk-card))",
        "dk-border": "hsl(var(--dk-border))",
        "dk-text": "hsl(var(--dk-text))",
        "dk-muted": "hsl(var(--dk-muted))",
        /* Green tokens */
        "g": "hsl(var(--g))",
        "g-dark": "hsl(var(--g-dark))",
        "g-deep": "hsl(var(--g-deep))",
        "g-light": "hsl(var(--g-light))",
        "g-pale": "hsl(var(--g-pale))",
        "g-mint": "hsl(var(--g-mint))",
        /* Accent / Acompañamiento */
        "acc-lila": "hsl(var(--acc-lila))",
        "acc-lila-light": "hsl(var(--acc-lila-light))",
        "acc-yellow": "hsl(var(--acc-yellow))",
        "acc-yellow-light": "hsl(var(--acc-yellow-light))",
        /* Tag tokens */
        "tag-pdf-bg": "hsl(var(--tag-pdf-bg))",
        "tag-pdf-text": "hsl(var(--tag-pdf-text))",
        "tag-vid-bg": "hsl(var(--tag-vid-bg))",
        "tag-vid-text": "hsl(var(--tag-vid-text))",
        "tag-3d-bg": "hsl(var(--tag-3d-bg))",
        "tag-3d-text": "hsl(var(--tag-3d-text))",
        // GRAMA Design System — direct named colors
        grama: {
          oscuro:  "#043941",
          verde:   "#00c16e",
          menta:   "#02d47e",
          claro:   "#d2ffe1",
          cerceta: "#045f6c",
          claro2:  "#e3f8fb",
        },
        lila: {
          DEFAULT: "#d4c4fc",
          claro: "#e3d8fe",
        },
        amarillo: {
          DEFAULT: "#f8ee91",
          claro: "#fdf8da",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        ...({} as Record<string, Record<string, Record<string, string>>>),
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
