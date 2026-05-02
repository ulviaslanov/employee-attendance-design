# Attendance check-out flow

_Started 2026-04-27 12:06 UTC_

---

## User

Bu layihədə Code Academy heritage-də əməkdaşlar üçün attendance & performance sistemi qurmuşuq. Əsas fayl: Employee Attendance Design.html (design canvas üzərində 7 bölmə, 22 ekran).

Sistem prinsipi: "Cəzalandırma deyil, fərqindəlik" — tək kanal, üzrlü qaib qorunur, görünürlük açıq + audit ilə, müqayisə özün-özünlədir.

Tamamlanıb:

00 Manifesto + sistem xəritəsi + vizual sistem
01 Əməkdaş check-in (4 ekran)
02 Şəxsi dashboard + Weekly Wrap + Badges
03 Sorğu axını
04 Manager (komanda canlı + inbox)
05 Mükafat sistemi (kudos, milestone, katalog, spotlight)
06 HR (dashboard + siyasətlər)

Növbəti iş: Əməkdaş check-out etsin etməsin məsələsini müzakirə etmək. və yarım flowlar varsa onları tapıb düzəltmək

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

İki sual var. Cavab vermədən bir az fikirləşim:

**1. Check-out məsələsi** — bu tək texniki seçim deyil, fəlsəfə qərarıdır. Manifestoya görə "cəzalandırma deyil, fərqindəlik" — yəni check-out olarsa, onun məqsədi nə olmalıdır? Saat saymaq (bunker) yoxsa "günü bağlamaq" rituali (mindful)?

**2. Yarım flowlar** — sistemdə hansı boşluqlar var, onu skan edim.

İcazə verin əvvəlcə mövcud flowları sürətli oxuyub yarım yerləri taparam, sonra hər ikisini sizinlə birlikdə qərarlaşdıraq.

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: snip]_

Çox yaxşı, indi cari vəziyyəti tam başa düşdüm. Davam etməzdən əvvəl iki açıq mövzunu sizinlə birlikdə qərarlaşdırmaq istəyirəm — çünki check-out fəlsəfi qərardır, mənim tək başıma deyil.

## 1. Check-out məsələsi — fəlsəfi seçim

Manifesto deyir: **"cəzalandırma deyil, fərqindəlik"**. Buna uyğun 3 yanaşma var:

**A) Heç check-out yoxdur** (ən radikal)
İşçi səhər başlayır, gün avtomatik bağlanır (məsələn 19:00-da Wi-Fi getdikdə, və ya gün sonu cron-la). Saat sayma yoxdur. **Risk:** uzaqdan işləyənlərdə "dəqiq nə vaxt çıxdı?" sualı qalır; HR ümumi saat hesablaya bilmir.

**B) "Günü bağla" rituali** (mindful, manifestoya ən uyğun)
Check-out var, amma saat saymaq üçün deyil — "günümü bağladım" jesti kimi. 1 sual: *"Bu gün necə getdi?"* (3-5 emoji), opsional qeyd, sabah üçün 1 prioritet. Saat avtomatik. **Faydası:** weekly wrap-a real data verir, ritm hissini gücləndirir, manager-ə "günü bitirdim" siqnalı.

**C) Klassik check-out** (saat sayır)
Giriş–çıxış saatları → ümumi saat. **Risk:** "nə qədər oturdun" mədəniyyətinə qayıdış. Manifestoya zidd.

**Mənim tövsiyəm: B variantı.** Çünki:
- Check-in-də artıq "ritual" tonu var (sabahın xeyir, hisslər, gün baxışı) — check-out onun simmetrik tamamlayıcısı olur
- Weekly Wrap-da artıq "Ən yorğun gün / ən odaqlı gün" var — bu data check-out'dan gəlməlidir
- Saat sayma yox, **niyyətli bağlama**

## 2. Yarım flow-lar — auditdə gördüklərim

Mövcud 22 ekranı oxuduqdan sonra **boşluqlar:**

| # | Boşluq | Hara aiddir |
|---|---|---|
| 1 | **Check-out / gün bağlama ekranı** | Flow 1-də 4 ekran var, çıxış yox |
| 2 | **Manager-in sorğuya cavabı işçiyə necə gəlir?** | Flow 3-də "Göndərildi" var, "Təsdiqləndi/Rədd"  cavab ekranı yox |
| 3 | **Kudos qəbul ekranı** (push notification + tam görünüş) | Flow 5-də göndərmə var, qəbul yox |
| 4 | **Mükafatı götürmə / istifadə ekranı** | Kataloq və "hazır" var, "götürdüm/istifadə etdim" yox |
| 5 | **HR-in sorğuya görünüşü** (audit baxımından) | HR dashboard var, sorğu detalı yox |
| 6 | **Manager 1-on-1 hazırlığı** ("bu işçi haqqında bu həftə") | Spotlight var, fərdi söhbət hazırlığı yox |
| 7 | **Boş hal / ilk gün** (yeni işçi heç bir data yox ikən dashboard nə görür?) | Heç yerdə |
| 8 | **Səhv/edge halları** (GPS əlçatmaz, Wi-Fi yox, "səhv ofisdəyəm" düzəlişi) | Yalnız happy path var |

---

**Sual sizə:**

1. **Check-out üçün hansı variant?** A / B / C — yoxsa siz başqa bir görüntü təklif edirsiniz?

2. **Yarım flow-lardan hansılarını indi tamamlayaq?** Mənim prioritet sıram:
 - **(yüksək)** #1 check-out, #2 sorğu cavabı, #3 kudos qəbulu — gündəlik döngünün simmetriyası
 - **(orta)** #4 mükafat götürmə, #5 HR sorğu detalı
 - **(aşağı)** #6, #7, #8 — sonra

Razısınızsa, B variantı + yüksək prioritet 3 ekranla başlayım. Yaxud siz seçimlərinizi deyin, ona görə davam edim.

