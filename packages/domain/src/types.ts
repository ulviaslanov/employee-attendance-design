export type CheckInType =
  | 'office'
  | 'remote'
  | 'meeting'
  | 'field'
  | 'sick'
  | 'off'
  | 'break'

export type RequestType = 'remote' | 'leave' | 'sick' | 'field' | 'short'

export type RequestStatus =
  | 'pending'
  | 'approved'
  | 'declined'
  | 'escalated'
  | 'cancelled'

export type EmployeeRole = 'employee' | 'manager' | 'hr'

export type ValueTag =
  | 'komanda-dayagi'
  | 'yaradicilik'
  | 'sahiblik'
  | 'suret'
  | 'sheffafliq'
  | 'empatiya'

export interface CheckInRecord {
  date: string  // ISO date 'YYYY-MM-DD'
  type: CheckInType
}

export interface StreakResult {
  count: number
  tier: StreakTier
  lastBrokenAt: string | null
}

export type StreakTier = 'new' | 'starting' | 'rhythm' | 'sustained' | 'beacon'

export interface PolicyRules {
  protectedTypes: CheckInType[]   // typically ['sick', 'off']
  weekendCounts: boolean          // false: Sat+Sun do not count
  workStart: string               // 'HH:MM'
  lateGraceMinutes: number        // 15
  monthlyRemoteLimit: number      // 8
  slaMinutes: number              // 30
}

export const DEFAULT_POLICY: PolicyRules = {
  protectedTypes: ['sick', 'off'],
  weekendCounts: false,
  workStart: '09:00',
  lateGraceMinutes: 15,
  monthlyRemoteLimit: 8,
  slaMinutes: 30,
}
