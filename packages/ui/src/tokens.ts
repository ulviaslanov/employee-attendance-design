/**
 * Design tokens — single source of truth for color, type, spacing.
 * PROJECT_SPECS § 8.
 *
 * Values are OKLCH where the spec defines them. Web (Tailwind v4) and
 * Mobile (NativeWind v4) both consume from here.
 */

export const colors = {
  // Brand
  coral: 'oklch(0.65 0.18 35)',

  // Status
  sage: 'oklch(0.62 0.13 155)',     // in-office
  dusk: 'oklch(0.60 0.14 240)',     // remote
  plum: 'oklch(0.60 0.16 320)',     // meeting / field
  amber: 'oklch(0.72 0.16 75)',     // sick / warning (NOT red)
  taupe: 'oklch(0.55 0.03 60)',     // off / neutral

  // Surface
  canvas: '#ebe5d8',
  dark: '#1a1410',
} as const

export const fonts = {
  display: 'Fraunces, ui-serif, Georgia, serif',
  ui: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
} as const

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const motion = {
  fast: 120,
  base: 200,
  slow: 320,
} as const

export type ColorToken = keyof typeof colors
export type StatusColor = Extract<
  ColorToken,
  'sage' | 'dusk' | 'plum' | 'amber' | 'taupe' | 'coral'
>

/**
 * Map check_in.type → status color token.
 * Spec § 4.1 Check-in states.
 */
export const STATUS_COLOR: Record<string, StatusColor> = {
  office: 'sage',
  remote: 'dusk',
  meeting: 'plum',
  field: 'plum',
  sick: 'amber',
  off: 'taupe',
  notyet: 'taupe',
  break: 'taupe',
}
