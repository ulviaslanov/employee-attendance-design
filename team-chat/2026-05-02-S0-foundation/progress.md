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
- [ ] Expo app scaffold check (apps/mobile mövcud olub-olmadığını yoxla)
- [ ] NativeWind v4 setup + tokens bridge
- [ ] Mock auth provider (`lib/auth.tsx`)
- [ ] Supabase client (`lib/supabase.ts`) — real OR stub by env
- [ ] GPS geofence helper (`lib/geofence.ts` — expo-location, 80m HQ)
- [ ] `app/index.tsx` — morning gate (AC-1)
- [ ] Manual select UI (AC-2)
- [ ] Check-in mutation + write (AC-3)
- [ ] `app/checkin/success.tsx` — day started + streak (AC-4)
- [ ] NativeWind styling pass (AC-5)
- [ ] Karpathy gates 1-4
- [ ] Local commit (NO push)
- [ ] Handoff → senior-code-reviewer

---

## Decisions
- **Mock auth boundary:** `lib/auth.tsx` exports `useSession()` returning `{ user: { id, email, firstName } }`. Backend swap = single file change.
- **Supabase stub:** `lib/supabase.ts` checks `EXPO_PUBLIC_SUPABASE_URL` env — if absent, return stub client that logs + resolves. Real flow works end-to-end without backend.
- **HQ coords:** Hardcoded `(40.4093, 49.8671, 80m)` with TODO comment. Production: read from `tenant_settings`.
- **Streak calc:** Fetch last 30 days `check_ins` (or stub 1 row for S0), call `calculateStreak()`.

---

## Log

### 2026-05-02 — Scaffold check
Checking if `apps/mobile` exists...

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

