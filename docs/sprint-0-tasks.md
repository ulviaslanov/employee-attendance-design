# Sprint 0 — Setup (5 iş günü)

> **Məqsəd:** Sprint 1-də feature work-a birbaşa başlaya bilmək üçün infra hazır olsun.
> **Deliverable:** Yaşıl CI, açılan boş mobile app, açılan boş web app, Supabase-də seed data.

---

## Day 1 — Monorepo + tooling

- [ ] **0.1** Yeni repo `attendance` (və ya bu reponu rename edib içini boşalt)
- [ ] **0.2** `pnpm init -w` + Turborepo install
- [ ] **0.3** `pnpm-workspace.yaml`:
  ```yaml
  packages:
    - apps/*
    - packages/*
  ```
- [ ] **0.4** Root-da `tsconfig.base.json`, `prettier`, `eslint-config-custom`
- [ ] **0.5** `.gitignore` (Node, Expo, Next, Supabase)
- [ ] **0.6** `README.md` — quick start (pnpm install, pnpm dev)
- [ ] **0.7** `LICENSE` (MIT və ya proprietary — qərar verin)

## Day 2 — Supabase project

- [ ] **0.8** Supabase Cloud-da yeni project (region: `eu-central-1` / Frankfurt)
- [ ] **0.9** `supabase/` qovluğu local-da, `supabase init`
- [ ] **0.10** İlk migration: `supabase/migrations/0001_init.sql`
  - `companies`, `teams`, `locations`, `policies`
  - `employees` (role enum, manager_id self-ref FK)
  - `check_ins`, `requests`, `audit_events`
  - `kudos`, `streaks`, `badges_earned`, `mood_logs`
  - `rewards_catalog`, `reward_claims`, `spotlights`, `weekly_wraps`
- [ ] **0.11** Triggers:
  - `check_ins` insert → `audit_events` insert + `employees.status` update
  - `requests` insert → `audit_events` insert
- [ ] **0.12** `supabase/seed.sql` — 1 company, 5 team, 30 fake employee, 1 HR, 5 manager
- [ ] **0.13** Generate types: `supabase gen types typescript --local > packages/types/database.ts`

## Day 3 — Auth + RLS

- [ ] **0.14** Supabase Auth-da Google provider enable
  - Google Cloud Console: OAuth client (Web) — redirect: `https://<project>.supabase.co/auth/v1/callback`
  - Domain whitelist: yalnız @code.az (və ya hansı domain-i istifadə edirsizsə)
- [ ] **0.15** RLS-i enable et bütün cədvəllərdə: `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`
- [ ] **0.16** Policy faylları: `supabase/policies/01_check_ins.sql`, `02_requests.sql`, `03_mood.sql`, `04_audit.sql`
- [ ] **0.17** pgTAP test setup: `supabase/tests/rls.sql`
  - Test 1: employee A öz check_in yaza bilir
  - Test 2: employee A başqa employee-nin check_in-ini görə bilmir
  - Test 3: manager öz komandasının check_in-ini görür
  - Test 4: HR audit log-a UPDATE/DELETE edə bilmir

## Day 4 — Apps scaffold

### Mobile (`apps/mobile`)
- [ ] **0.18** `npx create-expo-app@latest` (SDK 55, blank-typescript template)
- [ ] **0.19** `expo-router` install + `app/_layout.tsx`
- [ ] **0.20** NativeWind v4 setup
- [ ] **0.21** Supabase client (`lib/supabase.ts`) + AsyncStorage adapter
- [ ] **0.22** Google Sign-in flow (`expo-auth-session/providers/google`) → Supabase session exchange
- [ ] **0.23** EAS project init (`eas build:configure`)

### Web (`apps/web`)
- [ ] **0.24** `pnpm dlx create-next-app@latest` (16.2, App Router, TS, Tailwind, src/, no Turbopack opt-out)
- [ ] **0.25** `@supabase/ssr` install + middleware-based session
- [ ] **0.26** shadcn/ui init: `pnpm dlx shadcn@latest init`
- [ ] **0.27** Google login page `/login`
- [ ] **0.28** Protected route wrapper: HR → `/hr/*`, Manager → `/team/*`

### Functions (`apps/functions`)
- [ ] **0.29** `supabase functions new weekly-wrap` — boş skeleton
- [ ] **0.30** `supabase functions new sla-escalate` — boş skeleton

## Day 5 — Shared packages + CI

- [ ] **0.31** `packages/ui` — design tokens (OKLCH spec-dən)
  ```ts
  // packages/ui/tokens.ts
  export const colors = {
    coral: 'oklch(0.65 0.18 35)',
    sage: 'oklch(0.62 0.13 155)',
    dusk: 'oklch(0.60 0.14 240)',
    plum: 'oklch(0.60 0.16 320)',
    amber: 'oklch(0.72 0.16 75)',
    taupe: 'oklch(0.55 0.03 60)',
    canvas: '#ebe5d8',
    dark: '#1a1410',
  };
  ```
- [ ] **0.32** `packages/domain` — boş skeleton:
  - `streak.ts` (calculateStreak, isProtectedDay)
  - `sla.ts` (slaDeadline, isEscalated)
  - `badge.ts` (eligibleBadges)
  - `rotation.ts` (canSpotlight)
- [ ] **0.33** `packages/i18n` — `az.json` (spec-dəki AZ string-lər), `en.json` (eyni key-lər boş)
- [ ] **0.34** GitHub Actions:
  - `.github/workflows/ci.yml`: pnpm install + lint + typecheck + supabase migration test + pgTAP RLS test
  - `.github/workflows/eas-preview.yml`: hər PR-də EAS Update preview channel
- [ ] **0.35** Sentry project yaradılması (mobile + web + edge)
- [ ] **0.36** PostHog project yaradılması

---

## Sprint 0 acceptance kriteriyaları

✅ `pnpm install && pnpm dev` — həm mobile, həm web ayağa qalxır
✅ Mobile-da Google ilə login → Supabase session alınır → home screen "Salam, {name}" göstərir
✅ Web-də Google ilə login → role-a görə dashboard route-a yönləndirir
✅ Supabase studio-da seed data görünür (30 employee, 5 team)
✅ pgTAP RLS test-ləri keçir (CI-də yaşıl)
✅ Sentry-ə test error gedir (mobile + web)
✅ EAS Build iOS simulator + Android emulator üçün build alınır

---

## Sprint 1 başlayanda hazır olacaq

- Layihə skeleton tam quraşdırılmış
- Auth + role-based access işləyir
- DB schema + RLS yerli yerində
- Komanda kodu yazmağa hazır

→ Sprint 1: ilk real feature **Morning Gate (CI-1)** + **Personal Dashboard shell (P-1)**
