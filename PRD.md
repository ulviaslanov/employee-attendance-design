# PRD — Employee Attendance & Performance

> **Sənəd növü:** Lite PRD (1-2 səh) · v1 May 2026
> **Sahibi:** Ülvi Aslanov (CEO, Code Academy)
> **Status:** Approved for build

---

## 1. Problem

Code Academy 30-100 nəfərlik komandasında **3 üst-üstə düşən problem** mövcuddur:

1. **CEO-DM bypass** — gündə 10+ "icazə verim?" mesajı CEO-ya birbaşa gəlir, idarə olunmaz hala düşdü
2. **Manager-lər şəffaf qaydaya tabe deyil** — eyni vaxtda bir manager evdən işə icazə verir, başqa manager icazə vermir → komandalar arası ədalətsizlik
3. **Konsistent işçilər mükafatlanmır** — daim vaxtında gələn, ritmini saxlayan işçilər performance review-da görünmür, demotivation yaranır

**Bu üçü ayrı-ayrı həll olunmaqla yox, vahid sistemlə həll olunur.**

---

## 2. Hədəf istifadəçilər

| Persona | Day-1 ehtiyac | Drivers |
|---------|---------------|---------|
| **Aysel — Satış meneceri (çöl işçisi)** | "Bu gün müştəridə olduğumu manager bilsin, dama-dama yazmağa ehtiyac qalmasın" | Çöl/ofis statusu aydın olsun, kontrol hissi |
| **Cavid — Backend developer (ofis-remote miks)** | "Evdən işləməyim üçün hər səhər icazə yazmayım, sistem qaydanı tətbiq etsin" | Avtomatlaşdırma, fokus |
| **Lalə — Komanda lideri (manager)** | "Komandamın harada olduğunu bir baxışda bilim, sorğulara 30 dəq-də cavab verim" | Real-time visibility, rapid action |
| **Səbinə — HR Lead** | "Şirkət üzrə nümunələri görüm, manager-ləri tutarlı qərar verməyə kömək edim" | Audit, policy, equity |
| **Ülvi — CEO** | "Daha icazə mesajı almayım, nümunələrə baxım" | DM-dən qurtulmaq, strategic visibility |

---

## 3. Uğur metrikası (pilot)

**Kritik tək metrika** — bu olmasa, başqa hər şey əlavədir:

> **Gündəlik check-in adoption ≥ 80%** (30 user-dən 24-ü hər iş günü check-in edir)

Bu hədəfə çatdıqsa, sistem real istifadə olunur deməkdir → digər feature-lərin (streak, wrap, kudos) effekti ölçülə bilər.

**Sekondar metrikalar** (track et, lakin go/no-go bunlara bağlı deyil):
- Manager SLA riayət %
- Weekly Wrap open rate
- Kudos send rate
- CEO-ya gələn DM sayı (manual-da count)

---

## 4. Scope phases

### MVP — v1.0 (9-10 həftə, pilot Apr 27 – Jun-Jul 2026)
PROJECT_SPECS.md-də sadalanan **bütün feature-lər**, daxil olmaqla:
- Check-in/out (GPS-only, SSID v1.5-də)
- Request flow + 30-min SLA + manager inbox
- Personal dashboard + streak engine
- Weekly Wrap (Friday EOD)
- Kudos (peer)
- Milestone rewards (auto-unlock)
- Manager Spotlight (monthly)
- HR dashboard + policies + audit log
- Badges + mood (private)

### v1.1 (pilot-dan sonra)
- iOS Wi-Fi SSID auto-detect (Apple entitlement gözləyir)
- Reward redemption flow (catalog → claim → use)
- Kudos received notification screen
- HR request audit drill-down screen
- Empty state + first-day onboarding
- AZ + EN i18n switch

### v2 (3-6 ay sonra)
- Multi-tenant (başqa şirkətlərə satış)
- Calendar inteqrasiyası (Google Workspace → focus block detection)
- Slack/Teams kudos webhook
- SMS phone OTP login (çöl işçilər üçün email-siz)
- HR system export (BambooHR, etc.)

---

## 5. Anti-goals (etmirik, etməyəcəyik)

Bunlar agent-lərin "bunu da əlavə edim?" deyə təklif edə biləcəyi şeylərdir — **YASAQDIR**:

- ❌ **Time-tracking for billing/payroll** — bu PayU/HR sisteminin işidir
- ❌ **Performance score / rating** — sayı/qiymət ver insanları "ölçməkdir", philosophy-yə zidd
- ❌ **Peer ranking / leaderboard** — self vs self only
- ❌ **GPS continuous tracking** — yalnız check-in anında, davamlı yox
- ❌ **Disciplinary workflow** — "warning", "violation", "strike" features qadağa
- ❌ **Red status / late warning icons** — "Cəzalandırma deyil, fərqindəlik"
- ❌ **Mood data dışarıda** — heç bir analytics, heç bir manager view-da
- ❌ **Third-party HR sistem inteqrasiyası** Phase 1-də — v2-yə qaldı

Agent ambiguous spec-də bu siyahıya rast gəlsə → **etməsin və PM-ə qaytarsın.**

---

## 6. Əsas əqli sahiblik (assumptions & risks)

### Assumptions
- Code Academy-də hamı Google Workspace user-idir (login asanlığı)
- Office Wi-Fi SSID stabildir, dəyişmir
- iPhone iOS 17+, Android 10+ minimum (cohort)
- 100 user-ə qədər Supabase free/pro yetir

### Risks
| Risk | Mitigation |
|------|-----------|
| 80% adoption-a çatmırıq | Sprint 6-da daxili lobbi: Ülvi və HR kampanya, Wrap əlində, peer kudos motivasiyası |
| iOS Wi-Fi entitlement gec gəlir | MVP GPS-only, v1.1-də əlavə |
| RLS policy data leak | pgTAP test suite + 2-nəfərli code review hər policy üçün |
| Manager-lər inbox-a 30 dəq-də cavab verməsə | HR escalation, sonra HR-in özü manager-ə xəbərdarlıq edir (sistem deyil, insan) |
| Mood data accidentally exposed | Static analyzer + RLS test + audit on access |

---

## 7. Stakeholder qərar matrisi

| Qərar tipi | Qərar verən |
|-----------|-------------|
| Feature scope (MVP daxil/xaric) | Ülvi |
| Design qərarları (visual, UX) | Designer agent + Ülvi sign-off |
| Tech stack | Senior reviewer + Ülvi |
| RLS policy / privacy | HR + Ülvi |
| Pilot rollout vaxtı | Ülvi |
| AZ tərcümə | Ülvi (yeganə native AZ konteksti) |
| Reward catalog məzmunu | HR + Ülvi |
| Policy default-ları (work hours, remote limit) | HR |

---

## 8. Pilot success → Production gateway

Pilot uğurlu sayılır əgər:
1. **80% check-in adoption** 14 ardıcıl iş günü
2. **Sıfır privacy incident** (mood / audit leak)
3. **Manager NPS ≥ 7/10** (5 manager-dən anonymous)
4. **Employee NPS ≥ 7/10** (30 user-dən, anonymous)
5. **0 critical bug** son 7 gündə

Hamısı yaşıldırsa → bütün şirkət-ə production rollout (300+ user, lakin scale plan v1.5-də).
