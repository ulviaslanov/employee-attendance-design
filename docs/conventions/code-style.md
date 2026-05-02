# Code Style

## TypeScript
- `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitOverride: true`
- `any` qadağa → `unknown` istifadə et, sonra narrow et
- `as` cast minimum — type guard üstün
- `enum` qadağa → string union (`type Status = 'pending' | 'approved'`)
- Path alias: `@/`, `@ui/`, `@domain/`, `@types/`

## Naming
- Komponent: `PascalCase`
- Hook: `useCamelCase`
- Funksiya / dəyişən: `camelCase`
- Sabit: `SCREAMING_SNAKE_CASE`
- Fayl: `kebab-case.ts` (komponent faylı `PascalCase.tsx`)
- Test: `*.test.ts` və ya `*.spec.ts`
- Type: `PascalCase`, suffix yox (`User`, `UserDto` deyil — `UserDTO` qəbul olunur)

## React / Next.js
- Server Component default; `"use client"` yalnız interaktivlik gərək olduqda
- TanStack Query server state üçün, Zustand client state üçün
- `useEffect` minimum — Server Component və Server Action-a köçür
- Prop drilling > 2 level → Context və ya Zustand store

## React Native (Expo)
- `expo-router v4` file-based navigation (yox: React Navigation)
- `NativeWind v4` styling — Tailwind syntax
- `expo-image` (`Image` deyil)
- `expo-secure-store` sensitive data, `mmkv` ümumi cache

## CSS / Tailwind
- `oklch()` rəng üçün — `packages/ui/tokens.ts`-dən
- Hardcoded color YASAQ → token istifadə et
- `tailwind.config.ts`-də custom token əlavə et, sonra istifadə
- Arbitrary value (`text-[14px]`) qadağa istisna sirli ölçülər üçün

## Supabase / SQL
- Migration: `supabase/migrations/NNNN_description.sql` (NNNN = ardıcıl 4-rəqəmli)
- Hər migration **reversible** (down sql kommentə qoyulsa belə)
- Cədvəl adı: `snake_case`, plural (`employees`, `check_ins`)
- Column: `snake_case`
- FK column: `<table>_id` (`team_id`, `manager_id`)
- Timestamp: `created_at`, `updated_at`, `<verb>_at` (`checked_in_at`)
- Boolean: `is_<adj>` (`is_active`)
- RLS policy adı: `<table>_<role>_<action>` (`check_ins_self_write`)

## Commenting
- **Default: comment yazma.** Yaxşı naming kifayətdir
- Comment yalnız "WHY" üçün — non-obvious constraint, hidden invariant, bug workaround
- Comment heç vaxt "WHAT code does" olmasın — kod özü deyir
- "Used by X", "Added for Y flow", "Issue #123" → commit mesajına gedir, koda yox

## Error handling
- Yalnız sistem sərhədlərində validate (user input, external API)
- Internal kod arası null-guard YAZMA — TS strict bunu tutur
- Error fallback yalnız real fail mod üçün — hipotetik üçün yox
- Throw `Error` yox, `class CustomError extends Error` (kontekst saxlamaq üçün)

## Faylın ölçüsü (sağlam düşüncə, strict deyil)
- Komponent faylı > 200 sətir → bölmək
- Funksiya > 50 sətir → bölmək
- 1 fayl 1 export default qaydası — utility-lər istisna

## Import sırası
```ts
// 1. Node built-in
import { readFile } from 'node:fs/promises'

// 2. External
import { useState } from 'react'
import clsx from 'clsx'

// 3. Internal aliases
import { Button } from '@ui/button'
import { calculateStreak } from '@domain/streak'

// 4. Relative
import { LocalHelper } from './helper'

// 5. Type-only
import type { Employee } from '@types/database'
```

## Boş dəyər
- Function arg optional: `arg?: T` (yox: `arg: T | undefined`)
- Empty array deyil, `null` qaytarma — boş list yaxşıdır
- DB-də `null` istifadə et "no value" üçün, "" yox
