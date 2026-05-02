import type { CheckInRecord } from './types.js'

/**
 * Badge keys (PROJECT_SPECS § 4.6).
 *
 * Badges are self-earned, self-compared. No leaderboard, no peer ranking.
 */

export type BadgeKey =
  | 'streak_7'
  | 'streak_30'
  | 'streak_60'
  | 'early_bird'
  | 'deep_work'
  | 'team_pillar'

export interface BadgeEligibilityInput {
  streakCount: number
  earlyArrivalsLast7Days: number     // arrivals before workStart
  longestFocusBlockMinutes: number   // contiguous focus minutes today/week
  kudosReceivedTotal: number
}

export function eligibleBadges(input: BadgeEligibilityInput): BadgeKey[] {
  const out: BadgeKey[] = []
  if (input.streakCount >= 7) out.push('streak_7')
  if (input.streakCount >= 30) out.push('streak_30')
  if (input.streakCount >= 60) out.push('streak_60')
  if (input.earlyArrivalsLast7Days >= 5) out.push('early_bird')
  if (input.longestFocusBlockMinutes >= 240) out.push('deep_work')
  if (input.kudosReceivedTotal >= 5) out.push('team_pillar')
  return out
}

/**
 * Newly-earned badges = eligible now AND not in already-earned set.
 */
export function newlyEarned(
  input: BadgeEligibilityInput,
  alreadyEarned: ReadonlySet<BadgeKey>,
): BadgeKey[] {
  return eligibleBadges(input).filter((b) => !alreadyEarned.has(b))
}

/**
 * Distinct count of office/remote check-ins across last N days.
 * Helper for adoption metric reporting.
 */
export function workdaysAttendedLast(
  checkIns: ReadonlyArray<CheckInRecord>,
  nDays: number,
  endDate: string,
): number {
  const end = new Date(`${endDate}T00:00:00Z`)
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - (nDays - 1))
  const distinct = new Set<string>()
  for (const c of checkIns) {
    const d = new Date(`${c.date}T00:00:00Z`)
    if (d >= start && d <= end && (c.type === 'office' || c.type === 'remote')) {
      distinct.add(c.date)
    }
  }
  return distinct.size
}
