import { describe, expect, it } from 'vitest'
import { canSpotlight, eligibleCandidates } from './rotation.js'

describe('canSpotlight', () => {
  it('allows new candidate', () => {
    expect(canSpotlight('e1', [], '2026-05')).toBe(true)
  })

  it('blocks if won earlier in same year', () => {
    expect(
      canSpotlight('e1', [{ employeeId: 'e1', month: '2026-02' }], '2026-05'),
    ).toBe(false)
  })

  it('allows again next year', () => {
    expect(
      canSpotlight('e1', [{ employeeId: 'e1', month: '2025-11' }], '2026-05'),
    ).toBe(true)
  })

  it('only blocks the specific employee', () => {
    expect(
      canSpotlight('e2', [{ employeeId: 'e1', month: '2026-02' }], '2026-05'),
    ).toBe(true)
  })
})

describe('eligibleCandidates', () => {
  it('filters out year-blocked candidates', () => {
    expect(
      eligibleCandidates(
        ['e1', 'e2', 'e3'],
        [
          { employeeId: 'e1', month: '2026-01' },
          { employeeId: 'e3', month: '2025-12' },  // prior year, allowed
        ],
        '2026-05',
      ),
    ).toEqual(['e2', 'e3'])
  })
})
