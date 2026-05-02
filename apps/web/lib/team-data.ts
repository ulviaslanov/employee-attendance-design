import type { TeamLiveSnapshot } from './types'

/**
 * Mock fixture — used while backend OAuth + Realtime are not READY.
 * Single seam: replace `getTeamLive()` body with a Supabase query +
 * realtime channel subscription once the backend agent ships
 * the schema-derived view (see ARCHITECTURE.md § 3).
 *
 * Times are produced relative to "now" so the UI feels live in dev.
 */
const MOCK_TEAM: TeamLiveSnapshot = {
  team: [
    {
      id: 'e-001',
      name: 'Aysel Məmmədova',
      role: 'Frontend Mentor',
      status: 'office',
      lastCheckInAt: minutesAgo(12),
      streakDays: 14,
      weeklyHours: 32,
    },
    {
      id: 'e-002',
      name: 'Rəşad Hüseynov',
      role: 'Backend Lead',
      status: 'remote',
      lastCheckInAt: minutesAgo(31),
      streakDays: 9,
      weeklyHours: 28,
    },
    {
      id: 'e-003',
      name: 'Nigar Əliyeva',
      role: 'Curriculum Designer',
      status: 'meeting',
      lastCheckInAt: minutesAgo(48),
      streakDays: 22,
      weeklyHours: 30,
    },
    {
      id: 'e-004',
      name: 'Eldar Quliyev',
      role: 'Field Coordinator',
      status: 'field',
      lastCheckInAt: minutesAgo(74),
      streakDays: 5,
      weeklyHours: 24,
    },
    {
      id: 'e-005',
      name: 'Lalə Rzayeva',
      role: 'Data Analyst',
      status: 'sick',
      lastCheckInAt: minutesAgo(180),
      streakDays: 0,
      weeklyHours: 12,
    },
    {
      id: 'e-006',
      name: 'Tural İsmayılov',
      role: 'Operations',
      status: 'notyet',
      lastCheckInAt: null,
      streakDays: 7,
      weeklyHours: 20,
    },
  ],
  events: [
    { id: 'ev-1', at: minutesAgo(12), actor: 'Aysel M.', message: 'Ofisdə qeydiyyata keçdi' },
    { id: 'ev-2', at: minutesAgo(31), actor: 'Rəşad H.', message: 'Uzaqdan başladı' },
    { id: 'ev-3', at: minutesAgo(48), actor: 'Nigar Ə.', message: 'Görüşə daxil oldu' },
    { id: 'ev-4', at: minutesAgo(74), actor: 'Eldar Q.', message: 'Sahədə qeyd etdi' },
  ],
}

function minutesAgo(min: number): string {
  return new Date(Date.now() - min * 60_000).toISOString()
}

/**
 * Server-side fetch of current team-live snapshot.
 * MOCK NOW. Swap to Supabase query when backend READY.
 */
export async function getTeamLive(): Promise<TeamLiveSnapshot> {
  return MOCK_TEAM
}
