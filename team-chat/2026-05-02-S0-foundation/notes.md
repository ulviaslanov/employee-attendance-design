# S0 Foundation — Technical Notes

## .js Extension Trade-off (packages/ui)

**Context:** `packages/ui/src/index.ts` export statement

**Timeline:**
- Initial: `export * from './tokens'` (implicit .ts)
- Fix 1 (2a989ff): → `export * from './tokens.js'` (ESM + Deno edge compat)
- Revert (9c7a183): → `export * from './tokens'` (Next.js transpilePackages cannot resolve .js)

**Trade-off:**
- ✅ S0 PASS: Edge functions not consuming `@attendance/ui` yet
- ⚠️ Future risk: Weekly Wrap render (edge function) WILL consume `@attendance/ui`

**Reviewer decision:** PASS for S0, revisit when edge consumes ui package.

**Alternatives (for PM/eng discussion):**
1. Build `@attendance/ui` with `tsup` (emit ESM + .d.ts, explicit .js)
2. Separate package: `@attendance/ui-edge` (ESM-only, for edge functions)
3. Inline tokens into edge function (avoid package dependency)

**Action:** PM closeout should flag this for sprint 1 technical refinement.

---

## i18n Editing Protocol

**Observed:** Mobile + web both edited `packages/i18n/src/az.json` in parallel branches.

**Outcome:** No merge conflict (different keys), but pattern confirmed: shared i18n file = drift risk.

**PM action (closeout):** Define i18n key ownership OR lock protocol (mini-process by Ülvi).

