import { t } from '@attendance/i18n'
import { getTeamLive } from '@/lib/team-data'
import { KpiStrip } from '@/components/kpi-strip'
import { TeamLive } from '@/components/team-live'
import { EventLog } from '@/components/event-log'

export const dynamic = 'force-dynamic'

export default async function TeamPage() {
  const snapshot = await getTeamLive()
  const today = new Intl.DateTimeFormat('az-AZ', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl text-(--color-dark)">{t('az', 'team.live')}</h1>
          <p className="mt-1 text-sm text-(--color-taupe)">{today}</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-(--radius-pill) bg-(--color-sage)/12 px-3 py-1 text-xs text-(--color-sage)">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-sage) opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-sage)" />
          </span>
          {t('az', 'team.liveIndicator')}
        </span>
      </header>

      <div className="mt-6">
        <KpiStrip team={snapshot.team} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <TeamLive initial={snapshot} />
        <EventLog events={snapshot.events} />
      </div>
    </main>
  )
}
