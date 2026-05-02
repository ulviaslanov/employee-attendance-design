import { describe, expect, it } from 'vitest'
import { formatSlaRemaining, slaDeadline, slaState } from './sla.js'
import { DEFAULT_POLICY } from './types.js'

describe('slaDeadline', () => {
  it('adds slaMinutes to sentAt', () => {
    const sent = new Date('2026-05-08T09:00:00Z')
    expect(slaDeadline(sent, DEFAULT_POLICY).toISOString()).toBe(
      '2026-05-08T09:30:00.000Z',
    )
  })
})

describe('slaState', () => {
  it('returns positive remaining inside window', () => {
    const sent = new Date('2026-05-08T09:00:00Z')
    const now = new Date('2026-05-08T09:10:00Z')
    const s = slaState(sent, DEFAULT_POLICY, now)
    expect(s.isEscalated).toBe(false)
    expect(s.remainingSeconds).toBe(20 * 60)
  })

  it('flags escalation past deadline', () => {
    const sent = new Date('2026-05-08T09:00:00Z')
    const now = new Date('2026-05-08T09:31:00Z')
    const s = slaState(sent, DEFAULT_POLICY, now)
    expect(s.isEscalated).toBe(true)
    expect(s.remainingSeconds).toBe(0)
  })
})

describe('formatSlaRemaining', () => {
  it('shows minutes and seconds', () => {
    const s = slaState(
      new Date('2026-05-08T09:00:00Z'),
      DEFAULT_POLICY,
      new Date('2026-05-08T09:14:30Z'),
    )
    expect(formatSlaRemaining(s)).toBe('15d 30s')
  })

  it('shows escalated label past deadline', () => {
    const s = slaState(
      new Date('2026-05-08T09:00:00Z'),
      DEFAULT_POLICY,
      new Date('2026-05-08T10:00:00Z'),
    )
    expect(formatSlaRemaining(s)).toBe('HR-a ötürüldü')
  })
})
