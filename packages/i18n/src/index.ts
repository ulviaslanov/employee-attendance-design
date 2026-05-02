import az from './az.json' with { type: 'json' }
import en from './en.json' with { type: 'json' }

export type Locale = 'az' | 'en'

const DICTIONARIES = { az, en } as const

/**
 * Resolve a dotted key (e.g. "checkin.morningGreeting") to a translation.
 * Variables are interpolated as {name}.
 *
 * Falls back to the key string itself if missing — making it loud in QA.
 */
export function t(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const dict = DICTIONARIES[locale]
  const parts = key.split('.')
  let cursor: unknown = dict
  for (const p of parts) {
    if (cursor && typeof cursor === 'object' && p in (cursor as object)) {
      cursor = (cursor as Record<string, unknown>)[p]
    } else {
      return key
    }
  }
  if (typeof cursor !== 'string') return key
  if (!vars) return cursor
  return cursor.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in vars ? String(vars[name]) : `{${name}}`,
  )
}
