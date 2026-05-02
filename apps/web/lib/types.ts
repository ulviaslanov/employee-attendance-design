import type { CheckInType } from '@attendance/domain'

/**
 * Wire-shape for a team member as rendered in `/team`.
 * Matches the future Supabase `employees` row + LATEST `check_ins` join.
 */
export interface TeamMember {
  id: string
  name: string
  role: string
  status: CheckInType | 'notyet'
  /** ISO timestamp of latest check-in, null if not yet today */
  lastCheckInAt: string | null
  streakDays: number
  weeklyHours: number
}

export interface TeamEvent {
  id: string
  at: string
  actor: string
  message: string
}

export interface TeamLiveSnapshot {
  team: TeamMember[]
  events: TeamEvent[]
}
