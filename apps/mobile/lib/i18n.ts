/**
 * App-wide i18n helper.
 *
 * Locale is fixed to 'az' for the pilot (PRD § 2). When EN parity lands,
 * read from device locale and persist user preference.
 */

import { t as translate } from '@attendance/i18n'

const LOCALE = 'az' as const

export function t(key: string, vars?: Record<string, string | number>): string {
  return translate(LOCALE, key, vars)
}
