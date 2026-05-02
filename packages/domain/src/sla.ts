import type { PolicyRules } from './types.js'

/**
 * SLA timer math for manager request-approval window
 * (PROJECT_SPECS § 4.3 — 30 min default before HR escalation).
 */

export interface SlaState {
  deadline: Date
  remainingSeconds: number
  isEscalated: boolean
}

export function slaDeadline(sentAt: Date, policy: PolicyRules): Date {
  return new Date(sentAt.getTime() + policy.slaMinutes * 60_000)
}

export function slaState(
  sentAt: Date,
  policy: PolicyRules,
  now: Date = new Date(),
): SlaState {
  const deadline = slaDeadline(sentAt, policy)
  const remainingMs = deadline.getTime() - now.getTime()
  return {
    deadline,
    remainingSeconds: Math.max(0, Math.floor(remainingMs / 1000)),
    isEscalated: remainingMs <= 0,
  }
}

export function formatSlaRemaining(state: SlaState): string {
  if (state.isEscalated) return 'HR-a ötürüldü'
  const m = Math.floor(state.remainingSeconds / 60)
  const s = state.remainingSeconds % 60
  return `${m}d ${String(s).padStart(2, '0')}s`
}
