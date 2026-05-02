import { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { calculateStreak } from '@attendance/domain'
import { t } from '../../lib/i18n'

/**
 * Success screen — acceptance crit 4 + 5.
 * Streak number rendered in Fraunces + coral. No badge unlock UI
 * (anti-goal: streak/badge UI). Number-only display.
 *
 * For S0 we compute streak from a stub history; once `useEmployeeHistory`
 * exists (next task) we wire to TanStack Query.
 */
export default function CheckInSuccess() {
  const today = new Date().toISOString().slice(0, 10)
  const streak = useMemo(() => {
    // Stub history: just today's check-in. Real history wires after backend READY.
    return calculateStreak(today, [{ date: today, type: 'office' }])
  }, [today])

  return (
    <SafeAreaView className="flex-1 bg-canvas">
      <View className="flex-1 px-lg pt-xxl gap-xl items-center justify-center">
        <View className="gap-md items-center">
          <Text className="font-display text-4xl text-ink">{t('checkin.successTitle')}</Text>
          <Text className="text-muted text-base text-center">
            {t('checkin.successSubtitle', { streak: streak.count })}
          </Text>
        </View>

        <View className="items-center gap-xs">
          <Text
            // crit 5: streak number Fraunces + coral
            className="font-display text-coral"
            style={{ fontSize: 96, lineHeight: 100 }}
          >
            {streak.count}
          </Text>
          <Text className="text-muted text-xs uppercase tracking-widest">
            {t('personal.streakLabel')}
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.replace('/')}
          className="bg-ink rounded-md py-md px-xl active:opacity-80"
        >
          <Text className="text-white font-semibold">{t('common.confirm')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
