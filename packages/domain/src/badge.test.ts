import { describe, expect, it } from 'vitest'
import {
  eligibleBadges,
  newlyEarned,
  workdaysAttendedLast,
} from './badge.js'

describe('eligibleBadges', () => {
  it('returns empty when below all thresholds', () => {
    expect(
      eligibleBadges({
        streakCount: 0,
        earlyArrivalsLast7Days: 0,
        longestFocusBlockMinutes: 0,
        kudosReceivedTotal: 0,
      }),
    ).toEqual([])
  })

  it('cumulates streak tiers', () => {
    expect(
      eligibleBadges({
        streakCount: 60,
        earlyArrivalsLast7Days: 0,
        longestFocusBlockMinutes: 0,
        kudosReceivedTotal: 0,
      }),
    ).toEqual(['streak_7', 'streak_30', 'streak_60'])
  })

  it('returns all when every condition met', () => {
    expect(
      eligibleBadges({
        streakCount: 60,
        earlyArrivalsLast7Days: 5,
        longestFocusBlockMinutes: 240,
        kudosReceivedTotal: 5,
      }),
    ).toEqual([
      'streak_7',
      'streak_30',
      'streak_60',
      'early_bird',
      'deep_work',
      'team_pillar',
    ])
  })
})

describe('newlyEarned', () => {
  it('excludes already-earned badges', () => {
    const earned = new Set(['streak_7'] as const)
    expect(
      newlyEarned(
        {
          streakCount: 30,
          earlyArrivalsLast7Days: 0,
          longestFocusBlockMinutes: 0,
          kudosReceivedTotal: 0,
        },
        earned,
      ),
    ).toEqual(['streak_30'])
  })
})

describe('workdaysAttendedLast', () => {
  it('counts distinct office/remote dates in window', () => {
    const result = workdaysAttendedLast(
      [
        { date: '2026-05-04', type: 'office' },
        { date: '2026-05-05', type: 'remote' },
        { date: '2026-05-06', type: 'sick' },     // excluded
        { date: '2026-05-07', type: 'office' },
        { date: '2026-04-30', type: 'office' },   // outside window
      ],
      7,
      '2026-05-08',
    )
    expect(result).toBe(3)
  })
})
