# Environments — Staging vs Prod, Secrets

## Mühit matrisi

| | dev | staging | prod |
|---|-----|---------|------|
| Supabase project | `attendance-dev` (lokal) | `attendance-staging` | `attendance-prod` |
| Region | n/a | EU-Frankfurt | EU-Frankfurt |
| Vercel | `vercel dev` lokal | preview deploy hər PR | production |
| Expo channel | `development` | `staging` | `production` |
| Domain | `localhost:3000` | `staging.attendance.code.az` | `attendance.code.az` |
| Data | seed only | scrubbed copy of prod (manual refresh) | real |
| Agent push | ✅ | ✅ direct | ❌ insan onay |

---

## Agent access matrisi

| Action | dev | staging | prod |
|--------|-----|---------|------|
| DDL migration | ✅ | ✅ direct | ❌ Ülvi onay |
| RLS policy | ✅ | ✅ direct | ❌ Ülvi onay |
| Seed / fixture | ✅ | ✅ | ❌ Heç vaxt |
| Edge function deploy | ✅ | ✅ | ❌ |
| User data oxuma | seed only | scrubbed | ❌ Yalnız Ülvi |
| Real user data yazmaq | n/a | n/a | ❌ Heç vaxt |

> **Qaydanı pozma**: Agent prod-a hər hansı yazma cəhdi → instant escalation, Ülvi xəbər alır.

---

## Secret management

### Lokal (developer)
- `.env.local` → `.gitignore`-də, heç vaxt commit olunmur
- `.env.example` → repo-da, dummy dəyərlərlə, struktur göstərir

```env
# .env.example
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx     # backend only
SENTRY_DSN=https://xxx@sentry.io/yyy
POSTHOG_API_KEY=phc_xxx
GOOGLE_OAUTH_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_OAUTH_CLIENT_SECRET=xxx       # yalnız server
```

### Staging / Prod
- **Vercel** → Project Settings → Environment Variables
- **Expo / EAS** → `eas secret:create`
- **Supabase Edge Functions** → Dashboard → Edge Functions → Secrets
- **GitHub Actions** → Settings → Secrets and variables → Actions

### Agent secret-ləri necə alır
- **Lokal agent** (Claude Code): user-in `.env.local`-i oxuyur (file system access)
- **Remote agent** (cloud platform): GitHub Actions secrets-dən gəlir, container env-də olur
- **Sensitive secret** (`SERVICE_ROLE_KEY`, `OAUTH_CLIENT_SECRET`) → yalnız server-side environment, agent kod yazır amma əl ilə inject etmir

---

## Secret YASAQ siyahısı

Agent commit edə bilməz əgər diff-də bunlardan biri görünsə:
- `SERVICE_ROLE_KEY=eyJ...` (real Supabase service role)
- `eyJ...` (real JWT pattern)
- `sk_live_...` (Stripe live)
- Apple `.p8` private key content
- OAuth client secret in plain
- Database password

**Detection:** `gitleaks` GitHub Actions-da pre-commit + on-PR.

---

## Staging refresh flow

Real user data-dan staging-ə (manuel, həftədə 1):

```bash
# Ülvi-nin maşınında, yalnız:
supabase db dump --project-ref attendance-prod --data-only > prod-dump.sql
# Scrub:
node scripts/scrub-pii.js prod-dump.sql > scrubbed.sql
# Restore:
psql -h staging-host -f scrubbed.sql
```

Scrub aşağıdakıları edir:
- `email` → `user-{hash}@staging.local`
- `full_name` → fake names
- `phone` → null
- `note` (request reason) → "[scrubbed]"
- `mood_logs` → silinir tamamilə
- `audit_events.diff` → `{}`

---

## Disaster recovery

### Production-da bug yarandıqda
1. Sentry alert → Ülvi + on-call agent
2. Severity:
   - **Critical** (data loss, auth fail): hot fix flow, rollback option-i hesabla
   - **Major** (feature broken): 24h fix
   - **Minor** (cosmetic): nəzərə alındı, normal sprint
3. Communication: yalnız Ülvi user-lərə xəbər verir

### Database rollback
- Supabase Pro → Point-in-Time Recovery 7 gün
- Manual snapshot hər həftə Friday EOD (cron)

### App crash / freeze
- Mobile: Sentry crash report → fix → EAS Update OTA push (App Store review-dən keçmir)
- Web: Sentry → Vercel rollback to previous deployment (1 click)

---

## Mühit dəyişəndə yoxla

- [ ] `.env.local`-da hansı mühitə qoşulduğun aydın olsun
- [ ] Production-a yazma əmrindən əvvəl URL yoxla (`NEXT_PUBLIC_SUPABASE_URL`)
- [ ] `supabase status` lokal / cloud bağlantısını göstərir — şübhədə təsdiq et
