import { describe, expect, it } from 'vitest'
import { calculateStreak, tierForCount } from './streak.js'
import { DEFAULT_POLICY } from './types.js'

describe('tierForCount', () => {
  it.each([
    [0, 'new'],
    [6, 'new'],
    [7, 'starting'],
    [13, 'starting'],
    [14, 'rhythm'],
    [29, 'rhythm'],
    [30, 'sustained'],
    [59, 'sustained'],
    [60, 'beacon'],
    [365, 'beacon'],
  ] as const)('count %d → %s', (count, tier) => {
    expect(tierForCount(count)).toBe(tier)
  })
})

describe('calculateStreak', () => {
  it('returns 0 when no check-ins', () => {
    const r = calculateStreak('2026-05-08', [], DEFAULT_POLICY)
    expect(r.count).toBe(0)
    expect(r.tier).toBe('new')
  })

  it('counts consecutive workdays only', () => {
    // Mon 2026-05-04 .. Fri 2026-05-08 — 5 workdays
    const r = calculateStreak(
      '2026-05-08',
      [
        { date: '2026-05-08', type: 'office' },
        { date: '2026-05-07', type: 'office' },
        { date: '2026-05-06', type: 'remote' },
        { date: '2026-05-05', type: 'office' },
        { date: '2026-05-04', type: 'office' },
      ],
      DEFAULT_POLICY,
    )
    expect(r.count).toBe(5)
    expect(r.tier).toBe('new')
  })

  it('skips weekends without breaking streak', () => {
    // Streak: Fri (May 1) ← Mon (May 4). Sat+Sun ignored.
    const r = calculateStreak(
      '2026-05-04',
      [
        { date: '2026-05-04', type: 'office' },
        { date: '2026-05-01', type: 'office' },
      ],
      DEFAULT_POLICY,
    )
    expect(r.count).toBe(2)
  })

  it('protected types (sick) preserve streak', () => {
    const r = calculateStreak(
      '2026-05-08',
      [
        { date: '2026-05-08', type: 'office' },
        { date: '2026-05-07', type: 'sick' },
        { date: '2026-05-06', type: 'office' },
        { date: '2026-05-05', type: 'office' },
        { date: '2026-05-04', type: 'office' },
      ],
      DEFAULT_POLICY,
    )
    expect(r.count).toBe(5)
  })

  it('missing day breaks the streak', () => {
    // Wed missing → Thu+Fri count, then break.
    const r = calculateStreak(
      '2026-05-08',
      [
        { date: '2026-05-08', type: 'office' },
        { date: '2026-05-07', type: 'office' },
        // 2026-05-06 missing
        { date: '2026-05-05', type: 'office' },
      ],
      DEFAULT_POLICY,
    )
    expect(r.count).toBe(2)
    expect(r.lastBrokenAt).toBe('2026-05-06')
  })

  it('respects holidays as non-workdays', () => {
    // 2026-05-09 (Sat) and 2026-05-28 (Independence Day, hypothetical holiday)
    const r = calculateStreak(
      '2026-05-29',
      [
        { date: '2026-05-29', type: 'office' },
        { date: '2026-05-27', type: 'office' },
      ],
      DEFAULT_POLICY,
      new Set(['2026-05-28']),
    )
    expect(r.count).toBe(2)
  })

  it('reaches sustained tier at 30', () => {
    const dates: { date: string; type: 'office' }[] = []
    // build 30 workday check-ins ending today
    let d = new Date(Date.UTC(2026, 4, 8))
    while (dates.length < 30) {
      const day = d.getUTCDay()
      if (day !== 0 && day !== 6) {
        const iso = d.toISOString().slice(0, 10)
        dates.push({ date: iso, type: 'office' })
      }
      d.setUTCDate(d.getUTCDate() - 1)
    }
    const r = calculateStreak('2026-05-08', dates, DEFAULT_POLICY)
    expect(r.count).toBe(30)
    expect(r.tier).toBe('sustained')
  })
})
