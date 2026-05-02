/**
 * GPS verify against HQ geofence (PRD § 4 — GPS-only MVP, no Wi-Fi).
 *
 * Returns:
 *   - { inside: true, distanceM } when within radius
 *   - { inside: false, distanceM } when outside
 *   - { inside: false, denied: true } when permission denied / unavailable
 */

import * as Location from 'expo-location'

// HQ seed coords (Code Academy Baku). When tenant settings land,
// read from `tenant_settings.hq_lat/lng/radius_m`.
const HQ_LAT = 40.3777
const HQ_LNG = 49.8920
const HQ_RADIUS_M = 80

export type GeofenceResult =
  | { inside: true; distanceM: number; coords: { lat: number; lng: number } }
  | { inside: false; distanceM: number; coords: { lat: number; lng: number } }
  | { inside: false; denied: true }

export async function verifyHqGeofence(): Promise<GeofenceResult> {
  const perm = await Location.requestForegroundPermissionsAsync()
  if (perm.status !== 'granted') return { inside: false, denied: true }

  const pos = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  })
  const { latitude, longitude } = pos.coords
  const distanceM = haversineMeters(HQ_LAT, HQ_LNG, latitude, longitude)

  return {
    inside: distanceM <= HQ_RADIUS_M,
    distanceM,
    coords: { lat: latitude, lng: longitude },
  }
}

function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}
