/**
 * Check-in mutation. Single insert into `check_ins` (schema 0001).
 *
 * `detection_method` = 'gps' when location_evidence is set, else 'manual'.
 * `location_evidence` is stored as JSON `{ lat, lng, distance_m }`.
 *
 * On success the row id is returned and the caller navigates to /checkin/success.
 */

import { useMutation } from '@tanstack/react-query'
import { supabase } from './supabase'

export type CheckInType = 'office' | 'remote' | 'meeting' | 'field' | 'sick' | 'off'
export type DetectionMethod = 'gps' | 'manual'

export type CheckInPayload = {
  employeeId: string
  type: CheckInType
  detectionMethod: DetectionMethod
  locationEvidence?: { lat: number; lng: number; distanceM: number }
  note?: string
}

export function useCheckInMutation() {
  return useMutation({
    mutationFn: async (input: CheckInPayload) => {
      const { data, error } = await supabase.from('check_ins').insert({
        employee_id: input.employeeId,
        type: input.type,
        detection_method: input.detectionMethod,
        location_evidence: input.locationEvidence ?? null,
        note: input.note ?? null,
      })
      if (error) throw error
      return data
    },
  })
}
