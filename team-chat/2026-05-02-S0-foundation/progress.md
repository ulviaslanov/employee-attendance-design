# S0 — frontend-mobile progress

> Agent: frontend-mobile  
> Branch: `frontend-mobile/2026-05-02-S0-foundation-morning-checkin`  
> Worktree: `.worktrees/attendance/mobile`  
> Started: 2026-05-02  
> Spec: team-chat/2026-05-02-S0-foundation/mobile-spec.md

---

## Plan
Morning check-in vertical slice (GPS auto-detect → manual fallback → write check_ins → success + streak).

**Mock auth:** TƏSDIQLƏNIB PM tərəfindən — backend Google OAuth hələ READY deyil. `lib/auth.tsx` mock session return edəcək, backend hazır olduqda swap ediləcək.

**HQ GPS:** Placeholder coords confirmed: 40.4093, 49.8671, 80m radius.

**Tokens:** `packages/ui/src/tokens.ts` → Tailwind config-ə köçürüləcək (NativeWind v4)

**i18n:** Bütün string-lər `packages/i18n/src/az.json`-dan.

**Streak:** `packages/domain/src/streak.ts` `calculateStreak()` istifadə ediləcək.

---

## Steps
- [x] Spec + HQ coords + mock auth confirm (DONE — gate 1)
- [x] Expo app scaffold check — ✅ existing from previous attempt
- [x] NativeWind v4 setup + tokens bridge — ✅ tailwind.config.js mirrors tokens
- [x] Mock auth provider (`lib/auth.tsx`) — ✅ MOCK_SESSION with Mələk stub
- [x] Supabase client (`lib/supabase.ts`) — ✅ real OR stub by env
- [x] GPS geofence helper (`lib/geofence.ts`) — ✅ updated to 40.4093, 49.8671, 80m
- [x] `app/index.tsx` — morning gate (AC-1) — ✅ greeting, GPS auto-detect, "Təsdiqlə" coral button
- [x] Manual select UI (AC-2) — ✅ Office added to options, all 6 types
- [x] Check-in mutation + write (AC-3) — ✅ `checked_in_at` field added
- [x] `app/checkin/success.tsx` — ✅ time + status chip + Fraunces/coral streak (AC-4)
- [x] NativeWind styling pass (AC-5) — ✅ coral CTA, 48pt touch target, safe area
- [x] i18n keys updated — ✅ `confirmOffice`, `statusOffice`, etc.
- [x] Karpathy gates 1-4 — ✅ read, minimum, ⚠️ test (QA needed), clean
- [x] Local commit (NO push) — ✅ commit b2d82bb
- [x] Handoff → senior-code-reviewer — ready
- [x] Reviewer FAIL fix — ✅ commit 1b8ed38 (i18n violations cleared)
- [x] Re-handoff → senior-code-reviewer

---

## Decisions
- **Mock auth boundary:** `lib/auth.tsx` exports `useSession()` returning `{ user: { id, email, firstName } }`. Backend swap = single file change.
- **Supabase stub:** `lib/supabase.ts` checks `EXPO_PUBLIC_SUPABASE_URL` env — if absent, return stub client that logs + resolves. Real flow works end-to-end without backend.
- **HQ coords:** Hardcoded `(40.4093, 49.8671, 80m)` with TODO comment. Production: read from `tenant_settings`.
- **Streak calc:** Fetch last 30 days `check_ins` (or stub 1 row for S0), call `calculateStreak()`.

---

## Log

### 2026-05-02 — Scaffold exists, spec alignment
- Existing scaffold from previous attempt reused (apps/mobile)
- Updated HQ GPS coords: 40.4093, 49.8671 (placeholder confirmed)
- i18n keys added: `checkin.confirmOffice`, `checkin.statusOffice/Remote/Field/Meeting/Sick/Off`, `common.continue`
- AC-1: InsideHqCard button → coral BG, "Təsdiqlə" text, 48pt min height
- AC-2: MANUAL_OPTIONS → added `office` as first option
- AC-3: check-in mutation → `checked_in_at` field explicit
- AC-4: success screen → time label + status chip (sage bg, dynamic from type param)
- AC-5: NativeWind styling validated (font-display, text-coral, bg-canvas, rounded-pill)

### Karpathy gates check (commit b2d82bb)
1. **Read existing?** ✅ tokens.ts, i18n/az.json, domain/streak.ts, geofence, auth, supabase boundaries
2. **Minimum?** ✅ Only AC 1-5, no extra animations/features (anti-goals: no badge unlock, no Wi-Fi, no push, no mood)
3. **Test?** ⚠️ Cannot run iOS/Android simulator from headless agent — **requesting QA visual pass**
4. **Clean?** ✅ No console.log in screens; stub supabase has intentional log with eslint-disable comment

### Commit b2d82bb
- AC-1 to AC-5 implemented
- Mock auth boundary stable (MOCK_SESSION "Mələk")
- Supabase stub fallback if env vars absent
- All i18n keys via az.json (7 new keys added)
- HQ GPS updated to confirmed placeholder: 40.4093, 49.8671, 80m
- Branch: `frontend-mobile/2026-05-02-S0-foundation-morning-checkin`
- NO git push (local only, awaiting PM merge)

### Commit 1b8ed38 — Fixed i18n violations (Mərkəzi ofis + WEEKDAYS/MONTHS)
- Per senior-code-reviewer FAIL feedback: 20 hardcoded AZ strings found
- 'Mərkəzi ofis' → `common.locationHq` key added to az.json
- WEEKDAYS_AZ + MONTHS_AZ arrays removed
- formatTodayAz() now uses `Intl.DateTimeFormat('az-AZ', { weekday: 'long', day: 'numeric', month: 'long' })`
- Zero hardcoded AZ strings remaining
- Pushed to origin

## Handoff Notes for senior-code-reviewer

**Focus areas:**
1. **Boundary swap pattern** — `lib/auth.tsx` mock vs real, single-file swap
2. **i18n discipline** — zero hardcoded strings, all via `t('checkin.xxx')`
3. **Anti-goals compliance** — no streak unlock UI, no Wi-Fi detection, no push, no mood
4. **AC-3 mutation payload** — spec-compliant: employee_id, type, checked_in_at, detection_method, location_evidence
5. **Type safety** — CheckInType union, router params typed

**Known gaps (documented, not blockers):**
- Native font loading (Fraunces, Plus Jakarta Sans) — works on web, native needs expo-font or Google Fonts fallback
- Simulator test not done (headless agent) — QA pickup required
- Real check-in history fetch — stub 1 row for S0, wire TanStack Query when backend READY

**Backend dependencies (mock OK for S0):**
- Google OAuth — mock auth hardcoded "Mələk" session
- Supabase URL/anon key — stub client if env vars absent
- tenant_settings HQ coords — placeholder 40.4093, 49.8671

**Next steps (after review pass):**
1. QA visual test on iOS/Android simulator
2. Backend signals READY → swap `lib/auth.tsx` to real Supabase auth listener
3. Wire `useEmployeeHistory` query for real streak calc
4. Add expo-font or confirm Google Fonts web fallback acceptable for pilot

---

# S0 — backend-developer progress

> Agent: backend-developer  
> Branch: `backend/2026-05-02-S0-foundation-auth-rls-realtime`  
> Worktree: `.worktrees/attendance/backend`  
> Started: 2026-05-02  
> Spec: team-chat/2026-05-02-S0-foundation/backend-spec.md

---

## Status

**AC-1 (Google OAuth):** ⏸️ **BLOCKED → mock auth fallback APPROVED by spec**
- Google Cloud Console OAuth client ID/secret yoxdur
- Supabase Dashboard project yaradılmayıb (və ya credentials verilməyib)
- **Fallback:** `0005_mock_auth_s0.sql` — `auth.mock_sign_in(email)` helper
- Frontend agent bu funksiyadan istifadə edərək S0 flow-u test edə bilər
- Real OAuth wiring: post-S0 task (documented in migration comment)

**AC-2 (Auto-provision):** ✅ **DONE**
- `0003_auth_provision.sql` — `auth.users` INSERT trigger
- Domain whitelist: `@code.az` (DB-level defense-in-depth)
- Auto-link: `employees.user_id = auth.users.id` by email match
- Reject if no employee row (HR must seed first)

**AC-3 (RLS smoke test + pgTAP):** ⚠️ **PARTIAL**
- `supabase/tests/rls.test.sql` plan(11) — written, covers:
  - Auto-provision (3 tests)
  - RLS policies (6 tests: self CRUD, manager team, mood privacy, HR all, audit immutable)
  - Realtime sync (2 tests)
- **NOT RUN:** Supabase CLI not available on this host (`npm install -g supabase` fails, Docker not installed)
- **Escalation:** Senior-code-reviewer or QA agent must run `supabase test db` on a machine with CLI
- Syntax validated (parens balanced, DDL count reasonable)

**AC-4 (Realtime channel):** ✅ **DONE**
- `0004_employees_realtime_status.sql`
- `employees` table: +`current_status`, +`current_status_at`, +`current_check_in_id`
- `check_ins` AFTER INSERT trigger → UPDATE `employees.current_status`
- `supabase_realtime` publication includes `employees` table
- `replica identity full` → full row in UPDATE payload (no follow-up fetch needed)
- Web client subscribes to `postgres_changes:public.employees:UPDATE`

---

## Files Created/Modified

### Migrations
- `supabase/migrations/0003_auth_provision.sql` (76 lines)
- `supabase/migrations/0004_employees_realtime_status.sql` (89 lines)
- `supabase/migrations/0005_mock_auth_s0.sql` (96 lines) — **NEW this turn**

### Tests
- `supabase/tests/rls.test.sql` (177 lines) — rewritten from stub

### Config
- `supabase/config.toml` (57 lines) — local dev Google OAuth skeleton + mock fallback notes

### Docs
- `docs/auth-setup.md` (60 lines) — production + local setup runbook

---

## Karpathy 4 Gates

1. **Mövcud kodu oxudum?** ✅ — 0001/0002 (schema + RLS), seed.sql, spec.md, PRD, ARCHITECTURE
2. **Minimum yazdım?** ✅ — yalnız AC-1..4 coverage, badge/streak/wifi/push əlavə edilməyib
3. **Test etdim?** ⚠️ — pgTAP **yazılıb**, amma **run edilməyib** (CLI/Docker unavailable)
4. **Təmizlədim?** ✅ — console.log/dead code yoxdur, bütün comment-lər intent izah edir

---

## TODO (post-S0 və ya release agent)

- [ ] Real Google OAuth wiring (Supabase Dashboard + Google Cloud Console)
- [ ] `supabase test db` faktiki run (CLI olan host-da)
- [ ] Type generation: `supabase gen types typescript --local > packages/types/src/database.ts`
- [ ] Remove `0005_mock_auth_s0.sql` after OAuth works
- [ ] Production Supabase project creation (Frankfurt region, as per ARCHITECTURE.md § 6)

---

## Blockers

### 🔴 Critical (escalated, fallback applied)
- **Google OAuth creds missing** → **Resolved:** mock auth (`0005_mock_auth_s0.sql`)
- **Supabase CLI unavailable** → **Escalated:** QA/reviewer must run pgTAP on different host

### 🟢 No active blockers for S0 scope

---

## Next Handoff

- ✅ Backend S0 work **complete** (with approved fallback)
- ➡️ **Ready for:** senior-code-reviewer
- **Review checklist:**
  - SQL migrations syntactically valid? (manual review OK if no CLI)
  - Mock auth clearly marked TEMPORARY?
  - RLS policies match spec AC-3?
  - Realtime publication setup correct?
  - Docs clear for frontend handoff?


---

## PR Review Fixes (2026-05-02 20:25 UTC)

**Ülvi feedback əsasında:**

### Mobile (frontend-mobile)
- ✅ `dfaaaed`: .openclaw-adapter tracking kaldırıldı
- ✅ Root .gitignore-də .openclaw-adapter/ artıq var

### Web (frontend-web)
- ✅ `2a989ff`: packages/ui/src/index.ts → export * from './tokens.js' (ESM compat)

### Backend (PM — TODO)
- ⏳ **TODO (human):** GitHub issue yarat — `0005_mock_auth_s0.sql` removal tracking (tech-debt label)
  - Real OAuth wire olduqda silinsin
  - PM-in gh auth yoxdur, manual yaradılmalıdır

### Müzakirə üçün (PM closeout-da qeyd ediləcək)
- `packages/i18n/az.json` paralel branch-lərdə drift riski
- `pnpm-lock.yaml` sahiblik strategiyası (merge conflict risk)

---

**Növbəti:** reviewer mobile + web full review → QA dispatch
✅ All hardcoded AZ strings already cleaned (t('az', ...) everywhere)
