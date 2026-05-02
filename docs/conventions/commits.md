# Commits

## Conventional Commits

Format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type-lar** (qatı siyahı):
- `feat` — yeni feature
- `fix` — bug fix
- `chore` — build, deps, config
- `docs` — sənəd
- `test` — test əlavə/dəyişiklik
- `refactor` — kod təşkili (davranış dəyişmir)
- `style` — formatting (no logic)
- `perf` — performance
- `ci` — CI config

**Scope** (optional, lakin tövsiyə):
- `mobile`, `web`, `api`, `db`, `domain`, `ui`, `i18n`, `auth`

## Subject (1-ci sətir)
- Imperative: `add morning gate` (yox: `added` / `adding`)
- Lower-case başlanğıc
- Sonu nöqtə yox
- ≤ 72 simvol

## Body (3+ sətir)
- 1-2 cümlə "WHY" (NƏYI yox — diff özü deyir)
- Empty line subject-dən sonra

## Footer
**AI agent commit-ləri co-authored olmalıdır:**
```
Co-Authored-By: <agent-name> <agent@attendance.local>
```

Linked issue:
```
Closes #42
Refs CI-1
```

---

## Nümunələr

✅ Yaxşı:
```
feat(mobile): add morning gate auto-detect

Wi-Fi SSID + GPS combined detection. Falls back to manual
select if neither matches a known location.

Closes #12
Co-Authored-By: frontend-mobile-agent <agent@attendance.local>
```

✅ Yaxşı:
```
fix(api): prevent audit_events update via direct SQL

Added RLS UPDATE/DELETE deny policy. pgTAP test added.

Refs SEC-3
Co-Authored-By: backend-agent <agent@attendance.local>
```

❌ Pis:
```
update stuff
```

❌ Pis:
```
feat: Added a really cool feature that lets the user check in
from their phone with auto-detection of WiFi network and also
GPS verification and manual fallback option.
```
(subject çox uzun, "added" past tense)

---

## Atomic commit
- 1 commit = 1 məntiqi dəyişiklik
- Refactor + feat eyni commit-də qadağa
- Test + feat OK (test feature-i təsvir edir)

## Squash on merge
- PR merge edildikdə squash to main (linear history)
- Squash subject = PR title (Conventional Commits formatında)

---

## CI yoxlayır
- Subject `<type>(<scope>): ...` regex-ə uyğun
- Subject ≤ 72 simvol
- Body varsa empty line subject-dən sonra
- Co-Authored-By footer (agent commit üçün)
