# Progress — frontend-web — S0 Foundation

**Branch:** `frontend-web/2026-05-02-S0-foundation-team-live`
**Worktree:** `.worktrees/attendance/web`
**Owner:** frontend-web
**Status:** UI scaffold READY (mock data) — awaiting backend READY for realtime + auth wiring

## Scope (this slice)
Web acceptance criteria 1–5 from `spec.md`:
1. Manager Google login → `/team` route (page exists; CTA disabled until backend OAuth ready)
2. Team list (avatar initial, name, role, status chip, last check-in) ✅
3. Status chip uses `STATUS_COLOR` from `packages/ui/src/tokens.ts` ✅
4. Realtime updates — `useTeamLive()` hook stub in place; one-line swap to `supabase.channel(...)` once backend READY ✅
5. KPI strip (7 status counts) per `PROJECT_SPECS § 4.8` ✅

## What landed
```
apps/web/
├── package.json                 # Next 16.2 + React 19 + Tailwind v4 + @supabase/ssr
├── tsconfig.json
├── next.config.mjs              # typedRoutes + transpilePackages + turbopack.root
├── postcss.config.mjs           # @tailwindcss/postcss
├── next-env.d.ts
├── app/
│   ├── globals.css              # Tailwind v4 @theme → token CSS vars (OKLCH)
│   ├── layout.tsx               # lang="az", canvas bg
│   ├── page.tsx                 # → redirect /team
│   ├── login/page.tsx           # Google CTA (disabled until backend READY)
│   └── team/page.tsx            # MG-1: header + KPI strip + list + event log
├── components/
│   ├── status-chip.tsx          # STATUS_COLOR → CSS-var Tailwind classes
│   ├── kpi-strip.tsx            # 7-tile grid, i18n keys team.kpi.*
│   ├── team-live.tsx            # 'use client' island, consumes useTeamLive()
│   └── event-log.tsx            # right rail
└── lib/
    ├── types.ts                 # TeamMember / TeamEvent / TeamLiveSnapshot
    ├── team-data.ts             # MOCK fixture; single seam to swap → Supabase
    └── use-team-live.ts         # realtime hook STUB (commented swap snippet)
```

Also touched:
- `packages/ui/src/index.ts` — fixed `export * from './tokens.js'` → `'./tokens'` (Next/Turbopack resolution).

## Verified
- `pnpm install` ✅ (106 pkgs added)
- `pnpm --filter web typecheck` ✅
- `pnpm --filter web build` ✅ — 4 routes, no warnings
- `curl http://localhost:3000/team` ✅ HTTP 200, 30 KB HTML
- Rendered AZ strings confirmed in markup: `Komanda — indi`, `Ofisdə`, `Uzaqdan`, `Görüşdə`, `Çöldə`, `Xəstə`, `Hələ yox`, `Ritm`, `Canlı`

## Karpathy 4 gates
1. ✅ Read existing `packages/ui`, `packages/i18n`, `packages/domain`, `PROJECT_SPECS § 4.8`, `ARCHITECTURE § Web`.
2. ✅ Minimal — no shadcn install yet (primitives we need are 1-2 line components on tokens). No state lib, no chart lib. Adds happen when a feature requires them.
3. ✅ Tested — typecheck + build + curl + grep AZ strings.
4. ✅ Clean — no console.log, no commented-out code, no dead branches. The realtime swap snippet is a JSDoc comment on the hook so the next agent has the exact wiring.

## Anti-goal compliance (PRD § 5)
- No red/alarm icons, no leaderboard, no per-user mood anywhere in the manager view.
- "Sick" status uses **amber** token (warning, not red) — exactly the spec.
- Status visible; precise location is not exposed (only check-in type + relative time).

## Blockers / handoff to backend
Hook swap point is `lib/use-team-live.ts`. Backend agent should publish:
- channel name (proposed: `team-live`)
- payload shape for `INSERT/UPDATE` on `check_ins` (or a derived view like `employees_with_latest_status`)
- session bootstrap path for `@supabase/ssr` (env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

Once backend READY ships those three, frontend-web can wire it in <1 hour.

## Next role
Senior code reviewer.
