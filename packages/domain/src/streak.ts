import type {
  CheckInRecord,
  PolicyRules,
  StreakResult,
  StreakTier,
} from './types.js'

/**
 * Streak rules (PROJECT_SPECS § 4.6):
 *   - approved sick / vacation → streak preserved
 *   - unapproved absence → streak resets
 *   - weekend / public holiday → not counted
 *
 * Self vs self only — no leaderboard, no "earliest arrival" weighting.
 */

const TIER_BREAKPOINTS: ReadonlyArray<readonly [number, StreakTier]> = [
  [60, 'beacon'],
  [30, 'sustained'],
  [14, 'rhythm'],
  [7, 'starting'],
  [0, 'new'],
]

export function tierForCount(count: number): StreakTier {
  for (const [min, tier] of TIER_BREAKPOINTS) {
    if (count >= min) return tier
  }
  return 'new'
}

/**
 * Compute current streak from check-ins, walking backwards from `today`.
 *
 * @param today              the reference date as 'YYYY-MM-DD' (caller's tz)
 * @param checkIns           full history (any order); only the relevant
 *                           tail is examined
 * @param policy             tenant policy
 * @param holidays           ISO dates 'YYYY-MM-DD' that are not workdays
 */
export function calculateStreak(
  today: string,
  checkIns: ReadonlyArray<CheckInRecord>,
  policy: PolicyRules = {
    protectedTypes: ['sick', 'off'],
    weekendCounts: false,
    workStart: '09:00',
    lateGraceMinutes: 15,
    monthlyRemoteLimit: 8,
    slaMinutes: 30,
  },
  holidays: ReadonlySet<string> = new Set(),
): StreakResult {
  const byDate = new Map<string, CheckInRecord>()
  for (const c of checkIns) byDate.set(c.date, c)

  let count = 0
  let cursor = parseISODate(today)
  let lastBrokenAt: string | null = null

  while (true) {
    const iso = toISODate(cursor)

    if (isNonWorkday(cursor, policy, holidays)) {
      cursor = addDays(cursor, -1)
      continue
    }

    const record = byDate.get(iso)
    if (!record) {
      lastBrokenAt = iso
      break
    }

    count += 1
    cursor = addDays(cursor, -1)

    // sanity: don't walk indefinitely if history is malformed
    if (count > 365 * 3) break
  }

  return { count, tier: tierForCount(count), lastBrokenAt }
}

function isNonWorkday(
  d: Date,
  policy: PolicyRules,
  holidays: ReadonlySet<string>,
): boolean {
  if (holidays.has(toISODate(d))) return true
  if (!policy.weekendCounts) {
    const day = d.getUTCDay()
    if (day === 0 || day === 6) return true
  }
  return false
}

function parseISODate(iso: string): Date {
  const [yearStr, monthStr, dayStr] = iso.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr)
  const day = Number(dayStr)
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    throw new Error(`Invalid ISO date: ${iso}`)
  }
  return new Date(Date.UTC(year, month - 1, day))
}

function toISODate(d: Date): string {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(d: Date, days: number): Date {
  const next = new Date(d)
  next.setUTCDate(next.getUTCDate() + days)
  return next
}
