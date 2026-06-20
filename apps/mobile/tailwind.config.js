// Mirrors values in @attendance/ui/src/tokens.ts (single source of truth).
// If tokens change, update both. Hardcoded here because tailwind config
// is plain JS and cannot import the .ts token module reliably.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        coral: 'oklch(0.65 0.18 35)',
        sage: 'oklch(0.62 0.13 155)',
        dusk: 'oklch(0.60 0.14 240)',
        plum: 'oklch(0.60 0.16 320)',
        amber: 'oklch(0.72 0.16 75)',
        taupe: 'oklch(0.55 0.03 60)',
        canvas: '#ebe5d8',
        ink: '#1a1410',
        muted: 'oklch(0.50 0.02 60)',
      },
      fontFamily: {
        display: ['Fraunces'],
        ui: ['Plus Jakarta Sans'],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        pill: '999px',
      },
    },
  },
  plugins: [],
}
