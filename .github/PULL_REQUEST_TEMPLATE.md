# PR Title (Conventional Commits format)

<!-- feat(scope): subject — see docs/conventions/commits.md -->

## What & Why
<!-- 1-2 cümlə: nə dəyişdi, niyə. Diff `nə`-ni özü deyir, sən `niyə`-i yaz. -->

## Linked
- Task: `team-chat/<task-id>/`
- Spec ref: PROJECT_SPECS.md § X.Y
- Issue: Closes #N

## Screenshots / Recording (UI changes)
<!-- Mandatory if UI changed. Before & after if visual. -->

| Before | After |
|--------|-------|
| ...    | ...   |

## How to test
1. Step
2. Step
3. Expected: ...

## Checklist
### Code
- [ ] TypeScript strict — 0 error
- [ ] Lint — 0 warning
- [ ] Test əlavə olunub (unit / integration / E2E uyğun)
- [ ] Karpathy 4 gates: oxudum, minimum yazdım, test etdim, təmizlədim
- [ ] No hardcoded user-facing string (i18n-dən)
- [ ] No secret in diff (gitleaks check)

### UI (if applicable)
- [ ] AZ language consistent (heç bir EN qarışıq yoxdur)
- [ ] Empty / loading / error states tasarlanmış
- [ ] WCAG AA contrast
- [ ] Touch target ≥ 44pt
- [ ] No red status, no late-warning icon, no leaderboard (PRD § 5)

### Backend (if applicable)
- [ ] RLS policy yazılıb
- [ ] pgTAP test əlavə olunub
- [ ] Migration reversible
- [ ] Types regenerated (`packages/types`)

### Process
- [ ] `team-chat/<task>/spec.md` mövcuddur
- [ ] `team-chat/<task>/design.md` mövcuddur (UI varsa)
- [ ] `team-chat/<task>/progress.md` yenilənib
- [ ] CHANGELOG.md update (user-facing change varsa)

## Reviewers
- senior-code-reviewer: <required>
- qa-reviewer: <required after senior PASS>

## Notes for reviewer
<!-- Optional: kontekst, riskli bölmə, "x-ə xüsusi diqqət" -->

---

🤖 *AI agent commit-ləri co-authored olmalıdır. Bax `docs/conventions/commits.md`.*
