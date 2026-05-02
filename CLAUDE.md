# CLAUDE.md — Repo Operating Manual

> Bu fayl **hər Claude Code sessiyasının** kontekstinə avtomatik düşür.
> Bütün agent-lər və human-lar bu qaydalara tabedir.

---

## Layihə kimliyi

**Ad:** Employee Attendance & Performance Tracking
**Müştəri:** Code Academy (daxili)
**Founder:** Ülvi Aslanov
**Stage:** MVP, pilot ~9-10 həftə
**Spec:** [PROJECT_SPECS.md](./PROJECT_SPECS.md)
**Arxitektura:** [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Qatı qaydalar (qırılmaz)

### 1. Dil
- Kod, commit, log, comment → **İngilis**
- UI string → **Azərbaycan** (`packages/i18n/az.json`)
- Eyni screen-də AZ + EN qarışdırma → **YASAQ**
- Hardcoded user-facing string → **YASAQ** (həmişə i18n-dən)

### 2. Design philosophy
- "Cəzalandırma deyil, fərqindəlik."
- **YASAQ olan UI elementləri**: red status, "late" warning icon, sad emoji, leaderboard, peer comparison ranking, aggressive gradient, dark-mode default, clinical white background
- Status rəngləri: yalnız OKLCH palette-dən ([ARCHITECTURE.md](./ARCHITECTURE.md) § 8)
- Mood data **heç bir analytics və ya log-a düşməsin**

### 3. Audit log
- `audit_events` cədvəlində UPDATE/DELETE RLS policy ilə bağlıdır
- Bunu aşmaq üçün migration **YASAQ**
- Hər insert trigger ilə avtomatik olur — manual insert-dən qaçın

### 4. Privacy
- `mood_logs` cədvəli yalnız sahibinə görünür
- Aggregation üçün **`mood_aggregates_weekly` materialized view** istifadə et — `employee_id` saxlamır
- Audit log HR-only, başqa role görmür

### 5. Multi-tenancy
- Hər cədvəldə `company_id` saxlanılır (single-tenant MVP-də belə)
- RLS policy `auth.jwt() ->> 'company_id'` ilə filter edir
- Yeni cədvəl yaradanda `company_id NOT NULL` qoymağı unutma

---

## Texniki konvensiyalar

### TypeScript
- `strict: true`, `noUncheckedIndexedAccess: true`
- `any` qadağa — `unknown` istifadə et, sonra narrow et
- Path alias: `@/`, `@ui/`, `@domain/`, `@types/`

### React / Next.js
- Server Component default; `"use client"` yalnız interaktivlik gərək olduqda
- TanStack Query server state üçün, Zustand client state üçün
- `useEffect` minimum — Server Component və Server Action-a köçür

### React Native (Expo)
- `expo-router v4` file-based navigation
- `NativeWind v4` styling (Tailwind syntax)
- New Architecture default (Fabric + TurboModules)

### Supabase
- Hər mutation **RLS-dən keçməlidir** — `service_role` yalnız edge function-da
- Migration-lar versionlu: `supabase/migrations/NNNN_description.sql`
- Hər policy üçün **pgTAP test** — CI-də yaşıl olmalı

### Domain logic
- `packages/domain/` — saf TypeScript, framework-free
- Streak, SLA, badge, rotation logic **bir yerdə**, hər üç runtime-da işləməlidir
- Bu paketdə React, RN, Supabase import-u **YASAQ**

---

## Kod yazma stili

### Comment qaydası
- **Default: comment yazma.** Yaxşı naming kifayətdir
- Comment yalnız "WHY" üçün — non-obvious constraint, hidden invariant, bug workaround
- Comment heç vaxt "WHAT code does" olmasın — kod özü deyir
- "Used by X", "Added for Y flow", "Issue #123" → commit mesajına gedir, koda yox

### Error handling
- Yalnız sistem sərhədlərində validate et (user input, external API)
- Internal kod arası "what if X is null" guard-ı YAZMA — TS strict bunu tutur
- Error fallback yalnız real fail mod üçün — hipotetik üçün yox

### Faylın ölçüsü
- Komponent faylı > 200 sətir → komponentə bölmək lazımdır
- Funksiya > 50 sətir → bölmək lazımdır
- Bunu strict deyil, sağlam düşüncə üçün

---

## Git qaydaları

### Branch
- `main` protected — birbaşa push qadağa
- Feature: `feat/<task-id>-<short-name>` (məs: `feat/CI-1-morning-gate`)
- Fix: `fix/<short-name>`
- Hər branch 1 PR

### Commit
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`
- Imperative: `feat: add morning gate screen` (yox: `added`)
- Body 1-2 cümlə "WHY"
- AI agent commit-ləri **co-authored** olmalıdır:
  ```
  Co-Authored-By: <agent-name> <agent@attendance.local>
  ```

### PR
- Şablon dolduruluş məcburidir ([.github/PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md))
- Screenshot UI dəyişikliyi olduqda — istisnasız
- QA approval olmadan merge yoxdur

---

## Test qaydası

| Layer | Test növü | Tool |
|-------|-----------|------|
| `packages/domain/` | Unit (100% coverage gözlənilən) | vitest |
| Supabase RLS | Integration | pgTAP |
| Web | Component + E2E (kritik flow) | vitest + Playwright |
| Mobile | Component + E2E | vitest + Maestro |
| Visual | Snapshot regression | visual-qa.mjs (Playwright) |

**Domain logic-də test olmadan PR yoxdur.** UI-da test olmasa OK, amma manual screenshot lazımdır.

---

## Mühit

- **dev**: lokal Supabase + lokal Next + Expo Go
- **staging**: Supabase project `attendance-staging`, Vercel preview, Expo channel `staging`
- **prod**: Supabase `attendance-prod`, Vercel production, Expo channel `production`

[docs/environments.md](./docs/environments.md) — secret və access detalları

**Agent-lər staging-ə birbaşa push edə bilər.** Prod migration üçün insan approval lazımdır.

---

## Nə vaxt insan-a qayıdırsan (escalation)

[docs/escalation.md](./docs/escalation.md) — tam siyahı

Qısaca:
- Spec ambiguousdur və PM cavab vermir 30 dəq
- Kritik decision (DB schema dəyişikliyi, breaking change)
- Deadline pozulur
- Scope creep — task spec-dən kənara çıxır
- Pilot user data-sına təsir edə biləcək hər şey

---

## Quraşdırma sürəti

Pilot Apr 27 deadline-na yaxınlaşırıq (Class Pulse trajectory-si).
Bu layihə üçün ehtimal MVP **9-10 həftə** çəkəcək.
**Hər task 1-2 günlük scope-da olmalıdır.** Daha böyüksə → PM bölsün.
