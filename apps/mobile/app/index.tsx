import { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useSession } from '../lib/auth'
import { verifyHqGeofence, type GeofenceResult } from '../lib/geofence'
import { useCheckInMutation, type CheckInType } from '../lib/checkin'
import { t } from '../lib/i18n'

type DetectState =
  | { phase: 'pending' }
  | { phase: 'inside'; distanceM: number; coords: { lat: number; lng: number } }
  | { phase: 'outside'; distanceM: number; coords: { lat: number; lng: number } }
  | { phase: 'denied' }

const MANUAL_OPTIONS: ReadonlyArray<{ type: CheckInType; key: string }> = [
  { type: 'office', key: 'checkin.statusOffice' },
  { type: 'remote', key: 'checkin.remoteFromHome' },
  { type: 'field', key: 'checkin.fromField' },
  { type: 'meeting', key: 'checkin.inMeeting' },
  { type: 'sick', key: 'checkin.sick' },
  { type: 'off', key: 'checkin.onLeave' },
]

export default function MorningCheckIn() {
  const { user } = useSession()
  const [detect, setDetect] = useState<DetectState>({ phase: 'pending' })
  const [manualPick, setManualPick] = useState<CheckInType | null>(null)
  const checkin = useCheckInMutation()

  useEffect(() => {
    let cancelled = false
    void verifyHqGeofence().then((res: GeofenceResult) => {
      if (cancelled) return
      if ('denied' in res) setDetect({ phase: 'denied' })
      else if (res.inside) setDetect({ phase: 'inside', distanceM: res.distanceM, coords: res.coords })
      else setDetect({ phase: 'outside', distanceM: res.distanceM, coords: res.coords })
    })
    return () => {
      cancelled = true
    }
  }, [])

  const submit = async (type: CheckInType, useGps: boolean) => {
    const evidence =
      useGps && (detect.phase === 'inside' || detect.phase === 'outside')
        ? { lat: detect.coords.lat, lng: detect.coords.lng, distanceM: detect.distanceM }
        : undefined
    await checkin.mutateAsync({
      employeeId: user.employeeId,
      type,
      detectionMethod: useGps ? 'gps' : 'manual',
      locationEvidence: evidence,
    })
    router.replace({ pathname: '/checkin/success', params: { type } })
  }

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <ScrollView contentContainerClassName="px-lg pt-md pb-xl gap-lg">
        <Header todayLabel={formatTodayAz()} name={user.name} />

        {detect.phase === 'pending' ? (
          <PendingCard />
        ) : detect.phase === 'inside' ? (
          <InsideHqCard
            disabled={checkin.isPending}
            onConfirm={() => submit('office', true)}
            onSwitchManual={() => setDetect({ phase: 'denied' })}
          />
        ) : (
          <ManualSelectCard
            disabled={checkin.isPending}
            picked={manualPick}
            onPick={setManualPick}
            onSubmit={() => manualPick && submit(manualPick, false)}
            denied={detect.phase === 'denied'}
            distanceM={detect.phase === 'outside' ? detect.distanceM : null}
          />
        )}

        {checkin.isError ? (
          <Text className="text-amber text-center text-sm">{t('common.error')}</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

function Header({ todayLabel, name }: { todayLabel: string; name: string }) {
  return (
    <View className="gap-sm">
      <Text className="text-muted text-xs uppercase tracking-widest font-semibold">
        {todayLabel}
      </Text>
      <Text className="font-display text-3xl text-ink leading-tight">
        {t('checkin.morningGreeting', { name })}
      </Text>
    </View>
  )
}

function PendingCard() {
  return (
    <View className="bg-white rounded-xl p-lg flex-row items-center gap-md">
      <ActivityIndicator />
      <Text className="text-ink">{t('common.loading')}</Text>
    </View>
  )
}

function InsideHqCard({
  disabled,
  onConfirm,
  onSwitchManual,
}: {
  disabled: boolean
  onConfirm: () => void
  onSwitchManual: () => void
}) {
  return (
    <View className="bg-white rounded-xl p-lg gap-md">
      <Text className="text-dusk text-xs uppercase tracking-wider font-bold">
        {/* "Avtomatik aşkarlandı" — keep label simple, derived from copy in JSX prototype */}
        {t('checkin.detectedHere', { location: 'Mərkəzi ofis' })}
      </Text>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onConfirm}
        className="bg-coral rounded-md py-md px-md active:opacity-80"
        style={{ minHeight: 48 }}
      >
        <Text className="text-ink text-center font-semibold text-base">
          {t('checkin.confirmOffice')}
        </Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={onSwitchManual}>
        <Text className="text-muted text-center text-sm">{t('checkin.notHere')}</Text>
      </Pressable>
    </View>
  )
}

function ManualSelectCard({
  disabled,
  picked,
  onPick,
  onSubmit,
  denied,
  distanceM,
}: {
  disabled: boolean
  picked: CheckInType | null
  onPick: (t: CheckInType) => void
  onSubmit: () => void
  denied: boolean
  distanceM: number | null
}) {
  return (
    <View className="bg-white rounded-xl p-lg gap-md">
      <Text className="font-display text-xl text-ink">{t('checkin.manualSelect')}</Text>
      {denied ? null : distanceM !== null ? (
        <Text className="text-muted text-xs">
          {/* GPS detected, but outside HQ. Surface distance honestly — PRD § anti-surveillance tone. */}
          {Math.round(distanceM)}m
        </Text>
      ) : null}

      <View className="gap-sm">
        {MANUAL_OPTIONS.map((opt) => {
          const isPicked = picked === opt.type
          return (
            <Pressable
              key={opt.type}
              accessibilityRole="button"
              accessibilityState={{ selected: isPicked }}
              onPress={() => onPick(opt.type)}
              className={
                'rounded-md py-md px-md border ' +
                (isPicked ? 'bg-ink border-ink' : 'bg-canvas border-canvas')
              }
            >
              <Text className={isPicked ? 'text-white font-semibold' : 'text-ink'}>
                {t(opt.key)}
              </Text>
            </Pressable>
          )
        })}
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={disabled || !picked}
        onPress={onSubmit}
        className={
          'rounded-md py-md px-md ' + (!picked || disabled ? 'bg-taupe' : 'bg-ink active:opacity-80')
        }
      >
        <Text className="text-white text-center font-semibold">{t('checkin.submit')}</Text>
      </Pressable>
    </View>
  )
}

const WEEKDAYS_AZ = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə']
const MONTHS_AZ = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr',
]

function formatTodayAz(date: Date = new Date()): string {
  const wd = WEEKDAYS_AZ[date.getDay()]
  const day = date.getDate()
  const month = MONTHS_AZ[date.getMonth()]
  return `${wd} · ${day} ${month}`
}
