/**
 * GRAMA Design Tokens
 * Single source of truth for all visual constants.
 * Mirrors the CSS variables in index.css :root
 */

// ── Icon scale ────────────────────────────────────────────────────────────────
// Use these with Lucide <Icon size={ICON.md} /> instead of raw numbers.
//
//  xs  → micro indicators, dot icons inside badges
//  sm  → chips, filter pills, compact list rows
//  md  → standard buttons, tabs, navigation items  ← default
//  lg  → card/section headers, sidebar items
//  xl  → page headers, empty-state illustrations
// 2xl  → large feature icons, modal headers
// 3xl  → hero / display icons

export const ICON = {
  xs:   10,
  sm:   12,
  md:   16,
  lg:   20,
  xl:   24,
  '2xl': 32,
  '3xl': 40,
} as const

export type IconSize = typeof ICON[keyof typeof ICON]

// ── Colour palette ────────────────────────────────────────────────────────────
export const COLOR = {
  oscuro:  '#043941',
  cerceta: '#045f6c',
  menta:   '#02d47e',
  verde:   '#00c16e',
  claro:   '#d2ffe1',
  claro2:  '#e3f8fb',
  bg:      '#f0faf5',
} as const

// ── Border alpha scale ────────────────────────────────────────────────────────
// Use for border and background-tint values built on --grama-oscuro (#043941).
//
//  hairline → row dividers inside cards, subtle separators
//  card     → card/container outer border
//  input    → input fields, stronger interactive borders

export const BORDER = {
  hairline: 'rgba(4,57,65,0.07)',
  card:     'rgba(4,57,65,0.10)',
  input:    'rgba(4,57,65,0.15)',
} as const

// ── Button system ────────────────────────────────────────────────────────────
// Canonical padding sizes and transition for interactive buttons.
//
//  xs  → micro badges that act as buttons
//  sm  → filter chips, pill selectors
//  md  → standard secondary / navigation buttons
//  lg  → primary CTA buttons
//
// CTA colour rule:
//   - On dark header (#043941): always COLOR.menta (#02d47e), never tallerColor
//   - On light content area:   tallerColor is intentional (taller-specific theme)

export const BTN = {
  transition: 'all .15s',
  padding: {
    xs: '4px 10px',
    sm: '6px 14px',
    md: '9px 16px',
    lg: '10px 20px',
  },
} as const

// ── Border-radius scale ───────────────────────────────────────────────────────
export const RADIUS = {
  xs:  6,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  20,
  '2xl': 24,
  full: 9999,
} as const

// ── Shadow scale ──────────────────────────────────────────────────────────────
export const SHADOW = {
  sm:  '0 1px 3px rgba(4,57,65,0.06)',
  md:  '0 2px 16px rgba(4,57,65,0.08)',
  lg:  '0 4px 24px rgba(4,57,65,0.12)',
  xl:  '0 8px 32px rgba(4,57,65,0.16)',
} as const
