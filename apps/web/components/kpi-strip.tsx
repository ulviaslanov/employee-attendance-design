import { t } from '@attendance/i18n'
import type { TeamMember } from '@/lib/types'
import { statusClasses } from './status-chip'

const KPI_KEYS: Array<{ id: string; statuses: string[] }> = [
  { id: 'office', statuses: ['office'] },
  { id: 'remote', statuses: ['remote'] },
  { id: 'meeting', statuses: ['meeting'] },
  { id: 'field', statuses: ['field'] },
  { id: 'sick', statuses: ['sick'] },
  { id: 'off', statuses: ['off'] },
  { id: 'notyet', statuses: ['notyet'] },
]

export function KpiStrip({ team }: { team: TeamMember[] }) {
  const counts = new Map<string, number>()
  for (const m of team) counts.set(m.status, (counts.get(m.status) ?? 0) + 1)

  return (
    <section
      aria-label={t('az', 'team.live')}
      className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
    >
      {KPI_KEYS.map((k) => {
        const value = k.statuses.reduce((acc, s) => acc + (counts.get(s) ?? 0), 0)
        const c = statusClasses(k.statuses[0]!)
        return (
          <div
            key={k.id}
            className={`rounded-(--radius-lg) border border-black/5 px-4 py-3 ${c.bg}`}
          >
            <div className="text-xs text-(--color-taupe)">{t('az', `team.kpi.${k.id}`)}</div>
            <div className={`mt-1 font-display text-3xl ${c.text}`}>{value}</div>
          </div>
        )
      })}
    </section>
  )
}
