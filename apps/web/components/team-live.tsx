'use client'

import { useEffect, useState } from 'react'
import { t } from '@attendance/i18n'
import type { TeamLiveSnapshot, TeamMember } from '@/lib/types'
import { StatusChip } from './status-chip'
import { useTeamLive } from '@/lib/use-team-live'

const STATUS_LABEL_KEY: Record<string, string> = {
  office: 'team.kpi.office',
  remote: 'team.kpi.remote',
  meeting: 'team.kpi.meeting',
  field: 'team.kpi.field',
  sick: 'team.kpi.sick',
  off: 'team.kpi.off',
  notyet: 'team.kpi.notyet',
  break: 'team.kpi.notyet',
}

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('')
}

function relativeTime(iso: string | null): string {
  if (!iso) return '—'
  const diffMin = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60_000))
  if (diffMin < 1) return t('az', 'time.now')
  if (diffMin < 60) return t('az', 'time.minutesAgo', { count: diffMin })
  const h = Math.floor(diffMin / 60)
  return t('az', 'time.hoursAgo', { count: h })
}

export function TeamLive({ initial }: { initial: TeamLiveSnapshot }) {
  const snapshot = useTeamLive(initial)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <ul role="list" className="divide-y divide-black/5 rounded-(--radius-xl) bg-white/60">
      {snapshot.team.map((m) => (
        <Row key={m.id} member={m} now={now} />
      ))}
    </ul>
  )
}

function Row({ member, now }: { member: TeamMember; now: Date }) {
  // `now` only used to keep the relative timestamp fresh on re-render.
  void now
  return (
    <li className="flex items-center gap-4 px-5 py-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-dark) font-medium text-(--color-canvas)">
        {initials(member.name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span className="truncate font-medium">{member.name}</span>
          <span className="truncate text-xs text-(--color-taupe)">{member.role}</span>
        </div>
        <div className="mt-0.5 text-xs text-(--color-taupe)">
          {relativeTime(member.lastCheckInAt)}
        </div>
      </div>
      <div className="hidden items-center gap-1 font-display text-(--color-coral) sm:flex">
        <span className="text-xl leading-none">{member.streakDays}</span>
        <span className="text-xs text-(--color-taupe)">{t('az', 'personal.streakLabel')}</span>
      </div>
      <StatusChip status={member.status} label={t('az', STATUS_LABEL_KEY[member.status] ?? 'team.kpi.notyet')} />
    </li>
  )
}
