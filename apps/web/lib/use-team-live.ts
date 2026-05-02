'use client'

import { useEffect, useState } from 'react'
import type { TeamLiveSnapshot } from './types'

/**
 * Realtime hook — STUB until backend READY.
 *
 * Once the backend agent confirms the realtime channel + payload shape:
 *
 *   const ch = supabase
 *     .channel('team-live')
 *     .on('postgres_changes',
 *         { event: '*', schema: 'public', table: 'check_ins' },
 *         (payload) => applyDelta(payload))
 *     .subscribe()
 *   return () => { void supabase.removeChannel(ch) }
 *
 * For S0 we just rehydrate the initial server snapshot so the UI
 * compiles, ships and gets manager-tested with mock data.
 */
export function useTeamLive(initial: TeamLiveSnapshot): TeamLiveSnapshot {
  const [snapshot, setSnapshot] = useState(initial)

  useEffect(() => {
    setSnapshot(initial)
  }, [initial])

  return snapshot
}
