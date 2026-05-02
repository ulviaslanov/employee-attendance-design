# Auth Setup — Google OAuth + @code.az whitelist

## Layered enforcement (defense-in-depth)

1. **Google OAuth provider** (Supabase Dashboard or `supabase/config.toml`)
   — `hd=code.az` parameter restricts the Google consent screen to the
   Code Academy Workspace.
2. **Database trigger** (`0003_auth_provision.sql`) — `auth.users`
   INSERT/UPDATE rejects any email whose domain is not `@code.az`.
3. **No employee row → reject** — even a valid `@code.az` user cannot
   sign in unless HR has pre-provisioned an `employees` row with that
   email. Auto-link populates `employees.user_id` on first login.

## Production setup (Supabase Dashboard)

1. **Authentication → Providers → Google**
   - Enable
   - Client ID: from Google Cloud Console OAuth client
   - Client Secret: same
   - Authorized redirect URL: `https://<project-ref>.supabase.co/auth/v1/callback`
2. **Google Cloud Console → OAuth Consent Screen**
   - User type: **Internal** (Workspace-only) — this alone restricts to
     `@code.az` at Google's end.
   - Scopes: `openid`, `email`, `profile`
3. **Authentication → URL Configuration**
   - Site URL: web app URL
   - Redirect URLs: add Expo deep link + web callback
4. **Authentication → Email** — disable email/password sign-up.

## Local dev (`supabase start`)

1. Copy `.env.example` to `.env`:
   ```
   GOOGLE_OAUTH_CLIENT_ID=...
   GOOGLE_OAUTH_CLIENT_SECRET=...
   ```
2. `supabase start`
3. `supabase db reset` — runs migrations + seed.
4. `supabase test db` — runs pgTAP tests in `supabase/tests/`.

## Auto-provision flow

```
Google OAuth callback
   ↓
auth.users INSERT (Supabase)
   ↓
trg_auth_users_provision  (0003)
   ├── email domain == 'code.az' ?  no → raise 42501
   ├── employees row with this email exists ?  no → raise 42501
   └── UPDATE employees SET user_id = NEW.id WHERE lower(email)=NEW.email
   ↓
Session token issued  → client can now read its own employee row via RLS
```

## Adding a new employee

HR creates the `employees` row first (email + team + manager). On the
employee's first Google login, the trigger links `user_id` automatically.
No manual step required after that.
