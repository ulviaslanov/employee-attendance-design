# @attendance/mobile

Expo SDK 55 client for the Employee Attendance pilot.

## Status (S0)
Vertical slice — morning check-in only:
- `app/index.tsx` — greeting + GPS auto-detect + manual fallback
- `app/checkin/success.tsx` — "Gün başladı" + ritm sayı (Fraunces / coral)

## Boundaries (mock until backend READY)
- `lib/auth.tsx` — `useSession()` returns mock employee until Google OAuth ships.
- `lib/supabase.ts` — falls back to a logging stub when env vars are absent.

When backend signals READY, set:
```
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```
…and replace `MOCK_SESSION` in `lib/auth.tsx` with the real Supabase auth listener.
Consumer screens do not change.

## Run
```
pnpm install
pnpm --filter @attendance/mobile start
```

## Anti-goals (S0)
- ❌ No streak/badge unlock UI — number-only display
- ❌ No Wi-Fi SSID detection — GPS-only (PRD § 4)
- ❌ No push notifications
- ❌ No mood capture (lives in checkout)
