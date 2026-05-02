# team-chat/ — Inter-agent Handoff Protocol

> Hər task üçün ayrıca qovluq. Hər agent öz fayl-ını yazır, başqası oxuyur.
> Git-də saxlanılır → lokal Claude Code və remote agent platform eyni mənbədən oxuyur.

---

## Qovluq strukturu

```
team-chat/
├── README.md                                    ← bu fayl
├── _template/                                    ← şablonlar
│   ├── spec.md
│   ├── design.md
│   ├── progress.md
│   ├── review.md
│   ├── qa-report.md
│   └── closeout.md
└── 2026-05-12-CI-1-morning-gate/                 ← bir task
    ├── spec.md           PM yazır (1-ci)
    ├── design.md         Designer (2-ci, UI varsa)
    ├── progress.md       Developer (incremental)
    ├── review.md         Senior reviewer
    ├── qa-report.md      QA reviewer
    └── closeout.md       PM (sonuncu, DoD imzalı)
```

## Naming
`<YYYY-MM-DD>-<screen-or-task-id>-<short-name>`

Misal:
- `2026-05-12-CI-1-morning-gate`
- `2026-05-15-MG-1-team-live-status`
- `2026-05-20-BUG-streak-off-by-one`

---

## Kim hansı faylı yazır

| Fayl | Yazan | Nə vaxt |
|------|-------|---------|
| `spec.md` | product-manager | Task başlangıcında, **birinci** |
| `design.md` | designer | Spec-dən sonra, UI varsa |
| `progress.md` | developer | Incremental, hər big chunk-da |
| `review.md` | senior-code-reviewer | Developer hand-off etdikdə |
| `qa-report.md` | qa-reviewer | Reviewer PASS verdikdən sonra |
| `closeout.md` | product-manager | DoD imzalı bitdikdə |
| `blocked.md` | hər kim | Escalation lazım olanda |

---

## Şablon — `spec.md`

```markdown
# Task: <ID> — <Title>

## Goal
<1 cümlə>

## Context
- Spec ref: PROJECT_SPECS.md § X.Y
- Design ref: project/<file>.html və ya HTML mockup
- Dependencies: <başqa task-lar>

## Acceptance criteria
1. [ ] <Concrete, ölçüləbilən>
2. [ ] <...>
3. [ ] <...>

## Anti-goals
<Bu task-da etmirsən, qarışmazsız>

## Estimated scope
< small / medium — > 2 gün olarsa böl >

## Dispatch
- designer: yes/no
- backend-developer: yes/no
- frontend-mobile: yes/no
- frontend-web: yes/no

## PM
<agent-name>, <date>
```

---

## Şablon — `design.md`

```markdown
# Design — <Task ID>

## Reference
- HTML prototype: project/<file>.html, lines X-Y
- JSX prototype: project/flowN-<name>.jsx

## Tokens
- Background: oklch(...) — `colors.canvas`
- Primary: `colors.coral`
- Status: ...

## Measurements
- Padding: 16/24
- Touch target: 48
- Type scale: Display Fraunces 32 / Body 16

## i18n keys
- `checkin.morning`
- `checkin.confirmOffice`

## States
- [ ] default
- [ ] loading
- [ ] empty
- [ ] error
- [ ] success

## A11y notes
- Kontrast: AA (4.5:1 normal text, 3:1 large)
- Screen reader: ...
- Focus order: ...

## Designer
<agent-name>, <date>
```

---

## Şablon — `progress.md`

```markdown
# Progress — <Task ID>

## 2026-05-12 14:30
- Set up `apps/mobile/app/(tabs)/index.tsx`
- Wired NativeWind tokens
- TODO: GPS check + Wi-Fi fallback

## 2026-05-12 17:15
- Implemented expo-location with foreground permission
- Wi-Fi SSID detection deferred to v1.5 (per ARCHITECTURE.md § 8)
- Wrote unit test for `detectLocation()` in `packages/domain`

## 2026-05-13 10:00
- All AC met. Ready for review.
- PR: <link>

## Developer
<agent-name>
```

---

## Şablon — `review.md`

```markdown
# Review — <Task ID>

**Reviewer:** senior-code-reviewer
**Date:** <date>
**Verdict:** PASS / FAIL

## Diff
- Files changed: N
- Lines: +X / -Y

## Findings

### 🔴 Critical (block merge)
- (yoxdursa: yoxdur)

### 🟡 Should fix
1. ...
2. ...

### 🟢 Nit (optional)
1. ...

## Specific concerns checked
- [x] Hidden assumptions
- [x] Hoisting / late binding
- [x] Async race conditions
- [x] CSS layout traps
- [x] DOM lifecycle bugs
- [x] Missing cleanup
- [x] Scope creep
- [x] Adjacent code drive-bys

## Decision
<PASS / FAIL + reason>

If FAIL: developer fix listed items, re-submit for review.
If PASS: hand off to qa-reviewer.
```

---

## Şablon — `qa-report.md`

```markdown
# QA Report — <Task ID>

**QA:** qa-reviewer
**Date:** <date>
**Verdict:** PASS / FAIL

## Spec compliance
- AC 1: ✅ / ❌ (note)
- AC 2: ...
- AC 3: ...

## Functional flows tested
- [ ] Golden path
- [ ] Empty state
- [ ] Loading
- [ ] Error
- [ ] Network offline (if relevant)
- [ ] GPS denied (if relevant)

## Visual QA
- Screenshots attached: <link>
- Visual diff: PASS / FAIL

## AZ language
- [x] Bütün string AZ-də
- [x] Hardcoded EN string yoxdur
- [x] Tone PRD philosophy uyğun

## Accessibility
- [x] Kontrast AA
- [x] Touch target 44pt+
- [x] Screen reader OK
- [x] Keyboard navigation (web)

## Edge / regression
- ...

## Bugs found
1. (yoxdursa: yoxdur)

## Decision
<PASS / FAIL>

If FAIL: developer fix, re-test.
If PASS: PM closeout.
```

---

## Şablon — `closeout.md`

```markdown
# Closeout — <Task ID>

**PM:** product-manager
**Date:** <date>

## DoD checklist
- ✅ Acceptance: N/N met
- ✅ Review PASS: <date>
- ✅ QA PASS: <date>
- ✅ CI green: <link>
- ✅ Staging deploy: <date>, smoke OK
- ✅ CHANGELOG updated (AZ)

## Summary
<1-2 cümlə user-facing impact>

## Linked PR
<link>

## Status: DONE
```

---

## Şablon — `blocked.md` (escalation)

```markdown
# Blocked — <Task ID>

**Agent:** <name>
**Date:** <ISO>
**Level:** L1 / L2 / L3

## Situation
<1 cümlə>

## Tried
<nə cəhd etmisən>

## Need
<konkret qərar — "X yoxsa Y?">

## Impact
<deadline + neçə task bağlayır>

## Links
<spec / design / commit>
```
