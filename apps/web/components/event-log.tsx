import type { TeamEvent } from '@/lib/types'
import { t } from '@attendance/i18n'

function relTime(iso: string): string {
  const diffMin = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60_000))
  if (diffMin < 1) return t('az', 'time.now')
  if (diffMin < 60) return `${diffMin} ${t('az', 'time.minute')}`
  return `${Math.floor(diffMin / 60)} ${t('az', 'time.hour')}`
}

export function EventLog({ events }: { events: TeamEvent[] }) {
  return (
    <aside className="rounded-(--radius-xl) bg-white/60 p-5">
      <h2 className="font-display text-lg">{t('az', 'team.todayEvents')}</h2>
      <ol className="mt-3 space-y-3 text-sm">
        {events.map((e) => (
          <li key={e.id} className="flex items-start gap-3">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-(--color-coral)" aria-hidden />
            <div className="min-w-0 flex-1">
              <div className="truncate">
                <span className="font-medium">{e.actor}</span>{' '}
                <span className="text-(--color-taupe)">{e.message}</span>
              </div>
              <div className="text-xs text-(--color-taupe)">{relTime(e.at)} {t('az', 'time.ago')}</div>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  )
}
