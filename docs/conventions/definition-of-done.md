# Definition of Done

> Task **bitmiş** sayılır YALNIZ aşağıdakı bütün şərtlər ödənildikdə.
> Yarımçıq DoD ilə "bitdi" demək — kommanda etibarına xəyanət.

---

## Universal DoD (hər task üçün)

### Code
- [ ] Acceptance criteria (PM spec-dəki) yerinə yetir
- [ ] TypeScript strict — 0 error
- [ ] Lint warning yoxdur
- [ ] Test əlavə olunub (unit / integration / E2E uyğun olduqda)
- [ ] Karpathy 4 gates keçilib (oxu, minimum, test, clean)

### Review
- [ ] `senior-code-reviewer` PASS verib (`team-chat/<task-id>/review.md`)
- [ ] `qa-reviewer` PASS verib (`team-chat/<task-id>/qa-report.md`)
- [ ] Bütün review comment-lər həll olunub və ya açıq qərarla saxlanılıb

### Deploy
- [ ] Staging-də deploy olunub
- [ ] Smoke test keçib (manual və ya automated)
- [ ] CI yaşıldır (GitHub Actions bütün workflow)

### Documentation
- [ ] `team-chat/<task-id>/closeout.md` PM tərəfindən yazılıb
- [ ] CHANGELOG.md update olunub (user-facing change varsa, AZ-da)
- [ ] README / docs update (API/setup dəyişiklik varsa)

---

## DoD by Task Type

### UI Feature (yeni screen / komponent)
Yuxarıdakılarla birlikdə:
- [ ] Design referansı ilə vizual uyğunluq (Designer review)
- [ ] AZ string-lər `i18n/az.json`-dan, hardcoded yoxdur
- [ ] Empty / loading / error state hamısı tasarlanmış
- [ ] Visual QA snapshot çəkilib (`scripts/visual-qa.mjs`)
- [ ] Accessibility: kontrast WCAG AA, touch target 44pt+, screen reader label
- [ ] iOS + Android (mobile) və ya Chrome + Safari (web) test edilib
- [ ] Dark mode TƏSVİR ETMƏYİB (spec qadağa) — yoxlanılıb yoxdur

### Backend (DB / API / RLS)
Yuxarıdakılarla birlikdə:
- [ ] Migration reversible (down sql notu)
- [ ] RLS policy yazılıb hər yeni cədvəl üçün
- [ ] pgTAP test əlavə olunub policy üçün
- [ ] `supabase gen types` çıxarılıb, `packages/types` yenilənib
- [ ] Performance: 100 user simulasiyada N+1 query yoxdur

### Domain Logic (`packages/domain`)
Yuxarıdakılarla birlikdə:
- [ ] Vitest unit test 100% coverage (saf TS, asan)
- [ ] Saf funksiya — side effect yoxdur
- [ ] Heç bir framework / DB / I/O import-u yoxdur
- [ ] JSDoc kömək edən "WHY" comment-lər (option)

### Bug fix
Yuxarıdakılarla birlikdə:
- [ ] Reproducer test əlavə olunub (regression qarşısı)
- [ ] Root cause təsvir edilib commit body-də
- [ ] Adjacent code yoxlanılıb (eyni səhv başqa yerdə yoxdurmu)

### Infra / DevOps
Yuxarıdakılarla birlikdə:
- [ ] Staging-də 24 saat müşahidə edilib (Sentry, log)
- [ ] Rollback planı sənədləşdirilib
- [ ] Cost impact qiymətləndirilib (yeni servis əlavə olunubsa)

---

## DoD ödənmədiyi halda

- ❌ "Az dəyəri yoxdur" deyib ötürmə → bütün şərtlər lazımdır
- ❌ "Sonra düzəldərəm" qadağa → bu task açıqdır, qalanı başlamır
- ❌ Stage-i atlama → "qeyri-rəsmi" bitmiş yoxdur

İstisna yalnız:
- **HOTFIX**: smoke test + 1 reviewer + post-merge full QA
- **Spike** (research): yalnız `team-chat/<task-id>/findings.md` lazım, kod merge olmur

---

## DoD imzası

Task closeout-da PM bunu yazır:
```markdown
## Closeout — task CI-1
- ✅ Acceptance: 3/3 yerinə yetir
- ✅ Review: PASS by senior-code-reviewer 2026-05-15
- ✅ QA: PASS by qa-reviewer 2026-05-15
- ✅ Staging deploy: 2026-05-15 14:32, smoke OK
- ✅ CHANGELOG updated
- Status: **DONE**

PM: product-manager-agent
```
