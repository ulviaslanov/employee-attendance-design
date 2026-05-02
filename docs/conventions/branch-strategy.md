# Branch Strategy

## Branches

| Branch | Məqsəd | Protected? |
|--------|--------|-----------|
| `main` | Production-ready kod | ✅ Yes |
| `staging` | Pre-prod, agent-lər birbaşa push edir | ❌ |
| `feat/<task-id>-<name>` | Yeni feature | n/a (qısa ömürlü) |
| `fix/<short-name>` | Bug fix | n/a |
| `chore/<short-name>` | Build, deps, config | n/a |

**Direct push to `main` qadağa.** Yalnız PR via merge.

---

## Naming

```
feat/CI-1-morning-gate
feat/MG-1-team-live
fix/streak-calc-off-by-one
chore/upgrade-expo-55
docs/architecture-update
```

- Lower-case
- `<task-id>` PROJECT_SPECS-dəki screen ID və ya issue nömrəsi
- `<name>` 2-4 söz, kebab-case

---

## Workflow

```
1. main-dən branch-la:
   git checkout main && git pull
   git checkout -b feat/CI-1-morning-gate

2. İşlə → commit → push:
   git push -u origin feat/CI-1-morning-gate

3. PR aç (draft əgər WIP):
   gh pr create --draft --title "feat(mobile): add morning gate"

4. Review + QA passa keçəndə:
   gh pr ready

5. Merge: squash to main
```

---

## Protected `main` qaydaları

- Status checks: `lint`, `typecheck`, `test`, `rls-test`, `e2e-smoke` — hamısı yaşıl olmalı
- 1+ approval lazımdır:
  - `senior-code-reviewer` PASS
  - `qa-reviewer` PASS
- Stale review dismiss: yeni commit gələndə approval ləğv olur
- Force push qadağa
- Linear history məcburi (squash merge)

---

## Hot fix workflow

Production-da kritik bug yarandıqda:

```
1. main-dən branch:
   git checkout -b fix/HOTFIX-streak-leak

2. Minimum kod dəyişikliyi → commit

3. PR title: [HOTFIX] fix(api): ...
   Reviewer-ə xəbər (Slack/Discord)

4. Sürətli review: 1 reviewer + smoke test kifayətdir
   QA full pass post-merge

5. Merge → main → auto-deploy production
```

> Hotfix yalnız **production-blocking** bug üçün (data leak, app crash, login fail). Cosmetic bug normal flow-dan keçir.

---

## Stale branch cleanup

- 14 gündən köhnə merge-olunmamış branch → həftəlik report
- 30 gündən köhnə → avtomatik silmə (CI script)

---

## Tag

Production release-lər tag-lənir:
```
v0.1.0   ← MVP pilot başlangıc
v0.2.0   ← pilot mid-sprint feature
v1.0.0   ← public production launch
```

Format: SemVer (`major.minor.patch`)

Tag yaratma:
```
git tag -a v0.1.0 -m "MVP pilot launch"
git push origin v0.1.0
```

CHANGELOG.md hər tag-da update olunur (release-notes-writer agent).
