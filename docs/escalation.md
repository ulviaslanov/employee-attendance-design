# Escalation Protocol

> Agent insan-a (Ülvi) **nə vaxt**, **necə**, **nə qədər kontekst-lə** qayıdır.

---

## Escalation səviyyələri

### Level 1 — Aktiv blocker (≤ 30 dəq cavab)

Agent **işi dayandırır**, başqa agent-i ya insanı çağırır.

| Vəziyyət | Kim çağırır | Nə yazır |
|----------|-------------|---------|
| Spec ambiguousdur, qərar lazımdır | İşləyən agent → PM | `team-chat/<task>/blocked.md` |
| Design qeyri-müəyyəndir | Developer → Designer | Eyni |
| Tech qərar lazımdır | Developer → Senior reviewer | Eyni |
| Anti-goal toqquşması | Hər agent → PM | Stop + reference PRD § 5 |

PM 30 dəq cavab vermirsə → Level 2.

### Level 2 — Insan onayı (≤ 4 saat cavab)

Ülvi-yə Slack/Discord/Telegram bildirişi.

| Vəziyyət | Niyə insan |
|----------|-----------|
| DB schema breaking change | Migration yıxa bilər |
| Multi-tenant şərtinə təsir | Strategic |
| AZ tərcümə dəqiqliyi | Yalnız native |
| Reward catalog məzmunu | HR + Ülvi qərarı |
| Policy default dəyişiklik | HR + Ülvi |
| Apple/Google submission | Şəxsi auth |
| Yeni cloud servis əlavə | Cost + güvənlik |

### Level 3 — Dərhal stop (5 dəq daxili cavab)

Agent **hər şeyi dayandırır**, Ülvi-yə dərhal xəbər.

| Vəziyyət | Niyə dərhal |
|----------|-------------|
| Privacy/security incident | Data leak |
| Pilot user real data təhlükəsi | Compliance |
| Production rollback gərək | User impact |
| Suspected prompt injection | Sistem etibarı |
| Mood data exposed | Bu spec-in əsas vədidir |
| Audit log tampered | Trust qırılır |

---

## Escalation faylı şablonu

`team-chat/<task-id>/blocked.md`:

```markdown
# Blocked — task <ID>

**Agent:** <agent-name>
**Vaxt:** <ISO timestamp>
**Səviyyə:** L1 / L2 / L3

## Vəziyyət
<Bir cümlə nə baş verib>

## Nə cəhd edib
<Hansı yolları sınamısan, niyə işləmədi>

## Nə lazımdır
<Konkret qərar / cavab — "X yoxsa Y?" formatında>

## Təsir
<Bu blocker neçə task-ı bağlayır, deadline-a təsir edir?>

## Önəmli linklər
- spec.md / design.md / commit hash
```

---

## Insan-a notification kanalı

| Severity | Kanal | Latency hədəfi |
|----------|-------|---------------|
| L1 (intra-agent) | `team-chat/` fayl + GitHub Issue mention | 30 dəq |
| L2 (insan onayı) | Slack/Telegram DM Ülvi-yə | 4 saat |
| L3 (incident) | SMS + Phone call | 5 dəq |

---

## Agent-in escalate ETMƏYECƏYİ vəziyyətlər

Bunlar normal işlərdir, escalate olmur:

- Lint warning → düzəlt və davam
- Test fail → fix qədər çalış, sonra L1 if blocked
- Adjacent code səhvi → öz scope-da deyil, ayrı task aç (`team-chat/`)
- Stylistic preference → CLAUDE.md / convention-a uyğun et, suala qoyma
- Documentation gap → düz et və PR-də göstər

---

## Antipattern (escalate ETMƏ)

❌ "İcazə verirsiz?" sonsuz dəfə soruşmaq → CLAUDE.md-yə güvən, davam et
❌ "Hansı approach yaxşıdır?" → spec/architecture-da var, oxu
❌ "Bunu da əlavə edim?" → spec-də yoxdursa etmə (PRD § 5 anti-goals)
❌ Stylistic detal — spec qadağa etməyibsə, convention-a uyğun et

---

## Insan-ın cavab müddəti

Ülvi cavab vermədikdə:
- L1 (30 dəq): növbəti gün başlangıcında soruş
- L2 (4 saat): növbəti iş günü başlangıcında PM-ə eskaledə vermə qərarı
- L3: Ülvi-nin əvəzedicisi yoxdur — agent stop edir, insan gələnə qədər gözləyir

---

## Kommunikasiya tonu

- Qısa, faktiki, problem-fokuslu
- "Sənin günahındır" tonu yox — "vəziyyət belədir, qərar lazımdır"
- Solution alternativləri təklif et (3 variant ən yaxşı)
- "Mən X seçməyə meyilliyəm çünki Y" → recommendation göstər, qərarı insan-a qoy
