# Task S0 — Foundation Slice

> **Status:** OPEN — backend + frontend agents may pick up
> **PM:** Ülvi (initial), product-manager-agent (next iteration)
> **Created:** 2026-05-02

## Goal
Vertical slice that proves the entire pipeline works end-to-end:
**Google login → check-in write → realtime team-live update.**

This is the first thing pilot users will touch. Every later feature builds
on this slice. If this slice ships and is rock-solid, the rest of MVP
moves predictably.

## Context
- PRD: [PRD.md](../../PRD.md) — pilot success metric is **80% daily check-in adoption**.
  This slice is the entire numerator.
- Spec: [PROJECT_SPECS.md](../../PROJECT_SPECS.md) §§ 4.1, 4.8 (Team Live)
- Architecture: [ARCHITECTURE.md](../../ARCHITECTURE.md) §§ 3, 4.1
- Schema: `supabase/migrations/0001_init.sql` + `0002_rls.sql` — already merged
- Domain logic: `packages/domain/src/streak.ts` — already merged, tested
- Tokens: `packages/ui/src/tokens.ts` — already merged
- AZ strings: `packages/i18n/src/az.json` (`auth.*`, `checkin.*`)

## Acceptance criteria

### Mobile (Expo)
1. [ ] Employee opens app → sees "Sabahın xeyir, {name}" + bugünkü tarix
2. [ ] If GPS within HQ radius (80m of seed lat/lng): auto-detect "Ofisdə"
   - If GPS far / denied: fallback to manual select (Office / Remote / Field / Sick / Off)
3. [ ] Confirm tıkladıqda `check_ins`-ə yazılır:
   - `type` seçilmiş status
   - `detection_method` 'gps' or 'manual'
   - `location_evidence` GPS coords if used
4. [ ] Success screen: "Gün başladı" + cari ritm sayı (`calculateStreak` ilə)
5. [ ] Streak number Fraunces font, coral rəng

### Web (Next.js — manager view)
1. [ ] Manager Google ilə login olur → `/team` route
2. [ ] Komandanın hər üzvü siyahıda: avatar (initial), ad, status chip, son check-in vaxtı
3. [ ] Status chip rəngi `STATUS_COLOR` mapping ilə
4. [ ] Yeni check-in olduqda **realtime** update — page reload yoxdur
   (Supabase Realtime postgres_changes channel ilə)
5. [ ] KPI strip yuxarıda: ofisdə N, uzaqdan N, ... PROJECT_SPECS § 4.8

### Backend
1. [ ] Google OAuth provider Supabase-də konfiqurasiya olunub
   (domain whitelist: @code.az)
2. [ ] Login sonrası: `employees.user_id` boşdursa, email match ilə
   linkle (auto-provision)
3. [ ] Check-in write RLS policies altında işləyir (manuel test)
4. [ ] Realtime channel `employees` cədvəlində UPDATE event yayır
   (status column derived view-dan, ya da check_ins LATEST)

## Anti-goals (bu task-da ETMİRSƏN)
- ❌ Streak/badge unlock UI — sayı göstər kifayətdir, badge granting v1.5
- ❌ Wi-Fi SSID detection — GPS-only MVP (PRD § 4)
- ❌ Push notifications — manager just sees realtime web update
- ❌ Request flow, kudos, wrap, spotlight — sonrakı task-lar
- ❌ HR dashboard — sonrakı task-da
- ❌ Mood check-in — checkout flow-da, bu task-da yox

## Estimated scope
**Medium** — 3-4 gün backend agent + 2-3 gün hər frontend (mobile + web parallel).
Total ~1 working week with 2-3 agents.

## Dispatch
- ✅ backend-developer
- ✅ frontend-mobile
- ✅ frontend-web
- ❌ designer (HTML mockups already cover; tokens extracted into packages/ui)

## Pilot metric impact
This slice IS the pilot metric. If 30 employees can complete morning check-in
in < 30 seconds reliably, 80% adoption is achievable. If friction (wrong
location, slow GPS, login fail) → adoption fails.

## Definition of Done
[docs/conventions/definition-of-done.md](../../docs/conventions/definition-of-done.md)
+ all of:
- Mobile build runs on iOS simulator AND Android emulator (EAS)
- Web preview deploys on Vercel, manager view works
- Schema deployed to staging Supabase
- 1 dogfood session: Ülvi + 1 employee + 1 manager test the loop end-to-end
- pgTAP RLS tests pass in CI
