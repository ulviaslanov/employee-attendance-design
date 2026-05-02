# AI Agent Kickoff — Sənə xoş gəldin

> Bu sən "human developer" deyil, AI agent-sənsə **EN ƏVVƏL BUNU OXU**.
> Reponu kor-koranə açıb kod yazma — burada qaydalar var və işin axını strukturludur.

---

## 1. Sən kimsən?

Sən bu komandanın üzvüsən. Komanda = 8 specialized agent + 1 insan (Ülvi, founder/CEO).
Hər agent öz rolu üçün məsuldur. Sən **sözünə dayanan** olmalısan — başqa agent-in işinə müdaxilə etməsən.

Rol siyahısı: [AGENTS.md](./AGENTS.md)

---

## 2. İş başlamadan oxumalı olduqların (sıra ilə)

| # | Fayl | Niyə |
|---|------|------|
| 1 | [README.md](./README.md) | Repo nədir, design medium |
| 2 | [PRD.md](./PRD.md) | Niyə qurulur, kim üçün, uğur metrikası, anti-goals |
| 3 | [PROJECT_SPECS.md](./PROJECT_SPECS.md) | Funksional spec — nə tikilir |
| 4 | [ARCHITECTURE.md](./ARCHITECTURE.md) | Tech stack + data model |
| 5 | [CLAUDE.md](./CLAUDE.md) | Repo konvensiyaları, do/don't |
| 6 | [AGENTS.md](./AGENTS.md) | Sənin rolu + handoff protokolu |
| 7 | [docs/conventions/](./docs/conventions/) | Kod, dil, commit, branch, DoD |
| 8 | [docs/environments.md](./docs/environments.md) | Staging vs prod, secret-lər |
| 9 | [docs/escalation.md](./docs/escalation.md) | Insan-a nə vaxt qayıdırsan |
| 10 | [team-chat/README.md](./team-chat/README.md) | Inter-agent fayl handoff |

**Bunlardan birini ÖTÜRMƏ.** PM-dən gələn task-da `spec.md` istinadı varsa, sən hələ bilməyə bilərsən — amma yuxarıdakı 8-i bilməyə bilməzsən.

---

## 3. İlk addım

1. Sənə **PM-dən** task gəlibsə → `team-chat/<task-id>/spec.md` aç
2. Sənə **birbaşa human-dan** task gəlibsə → DAYAN, PM-i çağır:
   > "Bu task-ın PM spec-i yoxdur. PM agent-ə yönləndir."
3. Sən **PM-sənsə** → spec yaz, taskı dispatch et

---

## 4. Karpathy 4 gates (kod yazan agent-lər üçün)

Hər kod yazandan sonra, commit-dən əvvəl, bu 4 sualı özünə ver:

1. **Did I read the existing code?** Mövcud pattern-ə uyğunlaşdımmı?
2. **Did I write the minimum?** Lazımsız feature, abstraction, error handling əlavə etmədimmi?
3. **Did I test it?** UI-sa browser-də gördümmü? Backend-sa endpoint-i çağırdımmı?
4. **Did I clean up?** Kommented kod, console.log, dead branch qalmadı?

Bu 4-dən birinin cavabı "yox"-dursa, **commit etmə**.

---

## 5. Dil qaydası (qatı)

**Kod, commit message, log:** İngilis dili.
**UI string-ləri (user-facing):** Azərbaycanca — `packages/i18n/az.json`-dan oxu.
**Eyni screen-də AZ + EN qarışdırma.** Heç vaxt. [Bu qaydanın səbəbi.](./docs/conventions/az-language.md)

---

## 6. Sual yaranırsa

| Vəziyyət | Nə et |
|----------|-------|
| Spec aydın deyil | PM-i çağır, kod yazma |
| Design aydın deyil | Designer-i çağır |
| Tech qərar lazımdır | Senior reviewer-ə sual ver |
| Deadline / scope problemli | Insan-a (Ülvi) escalate et — [docs/escalation.md](./docs/escalation.md) |
| Heç bir reviewer cavab vermir 30 dəq | Insan-a escalate |

---

## 7. Bilməsin yaxşı olar

- **Pilot vaxtı**: ~9-10 həftə MVP. Yavaşlaşma yoxdur.
- **User**: 30-100 nəfər (kiçik). **Overengineering yoxdur.**
- **Design philosophy**: "Cəzalandırma deyil, fərqindəlik." Kod-da bu görünməlidir — heç bir red flag, alarm icon, leaderboard.
- **Mood data private** — heç bir log/analytics-ə düşməsin.
- **Audit log immutable** — UPDATE/DELETE policy bağlıdır, bunu aşmağa çalışma.

İndi `AGENTS.md`-i oxu və öz rolunu tap.
