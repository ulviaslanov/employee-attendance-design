import { STATUS_COLOR } from '@attendance/ui'

const COLOR_CLASSES: Record<string, { bg: string; dot: string; text: string }> = {
  sage: { bg: 'bg-(--color-sage)/12', dot: 'bg-(--color-sage)', text: 'text-(--color-sage)' },
  dusk: { bg: 'bg-(--color-dusk)/12', dot: 'bg-(--color-dusk)', text: 'text-(--color-dusk)' },
  plum: { bg: 'bg-(--color-plum)/12', dot: 'bg-(--color-plum)', text: 'text-(--color-plum)' },
  amber: { bg: 'bg-(--color-amber-tone)/14', dot: 'bg-(--color-amber-tone)', text: 'text-(--color-amber-tone)' },
  taupe: { bg: 'bg-(--color-taupe)/12', dot: 'bg-(--color-taupe)', text: 'text-(--color-taupe)' },
  coral: { bg: 'bg-(--color-coral)/12', dot: 'bg-(--color-coral)', text: 'text-(--color-coral)' },
}

/**
 * Map check_in.type → token via shared `STATUS_COLOR`,
 * then to Tailwind utility classes pinned to CSS vars from globals.css.
 */
export function statusClasses(status: string): { bg: string; dot: string; text: string } {
  const token = STATUS_COLOR[status] ?? 'taupe'
  return COLOR_CLASSES[token] ?? COLOR_CLASSES.taupe!
}

export function StatusChip({ status, label }: { status: string; label: string }) {
  const c = statusClasses(status)
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-(--radius-pill) px-3 py-1 text-xs font-medium ${c.bg} ${c.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden />
      {label}
    </span>
  )
}
