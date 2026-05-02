/**
 * Spotlight fair-rotation rule (PROJECT_SPECS § 4.7):
 *   Same person cannot win Spotlight twice within a calendar year.
 */

export interface SpotlightWin {
  employeeId: string
  month: string  // 'YYYY-MM'
}

export function canSpotlight(
  candidateId: string,
  history: ReadonlyArray<SpotlightWin>,
  targetMonth: string,
): boolean {
  const targetYear = targetMonth.slice(0, 4)
  return !history.some(
    (h) => h.employeeId === candidateId && h.month.slice(0, 4) === targetYear,
  )
}

export function eligibleCandidates(
  candidates: ReadonlyArray<string>,
  history: ReadonlyArray<SpotlightWin>,
  targetMonth: string,
): string[] {
  return candidates.filter((c) => canSpotlight(c, history, targetMonth))
}
