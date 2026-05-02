'use client'

import { useEffect, useState } from 'react'
import type { TeamLiveSnapshot } from './types'
// import { createBrowserClient } from '@supabase/ssr'

/**
 * Realtime hook — STUB until backend READY.
 *
 * Real wiring (backend AC-4):
 *
 *   const supabase = createBrowserClient(
 *     process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
 *   )
 *
 *   useEffect(() => {
 *     const channel = supabase
 *       .channel('team-live')
 *       .on('postgres_changes', {
 *         event: 'UPDATE',
 *         schema: 'public',
 *         table: 'employees',
 *         // filter: `team_id=eq.${teamId}` when we have real session
 *       }, (payload) => {
 *         setSnapshot((prev) => ({
 *           ...prev,
 *           team: prev.team.map((m) =>
 *             m.id === payload.new.id
 *               ? { ...m, status: payload.new.status, lastCheckInAt: payload.new.checked_in_at }
 *               : m
 *           ),
 *         }))
 *       })
 *       .subscribe()
 *
 *     return () => { void supabase.removeChannel(channel) }
 *   }, [teamId])
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
