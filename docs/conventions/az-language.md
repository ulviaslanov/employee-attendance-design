# AZ Language Consistency

> **Qaydanın səbəbi:** Class Pulse-da öyrənilib — AZ + EN qarışmış screen istifadəçi confidence-i sındırır, məhsul "yarımçıq" hissi verir. Burada eyni səhv olmasın.

---

## Qatı qaydalar

### 1. Eyni screen-də qarışdırma
**YASAQ.** Bir screen ya tam AZ, ya tam EN olmalıdır.

❌ Pis:
```
Bu gün ofisdəyəm   [Confirm]
```

✅ Yaxşı:
```
Bu gün ofisdəyəm   [Təsdiq et]
```

### 2. Hardcoded user-facing string YOXDUR
Hər user-facing string `packages/i18n/az.json`-dan oxunmalıdır.

❌ Pis:
```tsx
<Button>Save</Button>
<Text>Bu gün ofisdə olduğunuzu təsdiq edin</Text>
```

✅ Yaxşı:
```tsx
<Button>{t('common.save')}</Button>
<Text>{t('checkin.confirmOffice')}</Text>
```

### 3. Texniki termin AZ-də olmasa
Bəzi sözlər AZ-də natural səslənmir. Burada qayda:

| EN termin | AZ tərcümə | Niyə |
|-----------|------------|------|
| Streak | **Ritm** | Spec-də qərarlaşdı |
| Check-in / Check-out | **Daxil ol / Çıx** (və ya "Günü başla / Günü bağla") | Spec § 4 |
| Kudos | **Kudos** (saxla) | Beynəlxalq termin, brand element |
| Spotlight | **Ay ulduzu** | AZ-yə uyğun, peer fəxr |
| Manager | **Rəhbər** | Native AZ |
| HR | **HR** (saxla) | Geniş istifadə, qısaltma |
| Dashboard | **Panel** | AZ daha qısa |
| Leave | **Məzuniyyət** | Native |
| Sick leave | **Xəstəlik** | Native |
| Remote | **Uzaqdan** | Native |

**Qərarsız termin yarananda → Ülvi-yə çevir.**

### 4. AZ tərcümələrdə imla qaydası
- Türkcə hərflər: `ə ı ö ş ü ç ğ` — düzgün istifadə
- Apostrof yox (`Müəllimin` deyil `Mü'əllimin` deyil)
- Sayı: rəqəmlə (`5 gün`, `5 days` deyil)
- Vaxt: `09:30` (12-saat AM/PM yox)
- Tarix: `5 May 2026` və ya `05.05.2026` (US format `5/5/2026` qadağa)

### 5. UI tone — AZ
Spec design philosophy ilə uyğun:
- ❌ Imperative pis: "Daxil olmaq tələbdir!" (komandlı)
- ✅ Yumşaq: "Daxil olmaqla günü başla" (dəvət)
- ❌ Qorxutucu: "Geç qaldın!"
- ✅ Faktiki: "Bu gün 09:18-də gəldin"

### 6. Number formatlama
- Mənfi rəqəm: `−5` (en-dash) deyil `-5` (hyphen) qəbul olunur
- Min/saat: `2s 15d` (yox `2h 15m`)
- AZN: `15 AZN` (yox `15₼` — display rendering problemi)

---

## i18n fayl strukturu

`packages/i18n/az.json`:
```json
{
  "common": {
    "save": "Yadda saxla",
    "cancel": "Ləğv et",
    "confirm": "Təsdiq et",
    "back": "Geri",
    "next": "İrəli"
  },
  "checkin": {
    "morning": "Sabahın xeyir, {name}",
    "confirmOffice": "Bu gün ofisdə olduğunuzu təsdiq edin",
    "manualSelect": "Burada deyiləm — başqa yer seç"
  },
  "request": {
    "type": {
      "remote": "Uzaqdan iş",
      "leave": "Məzuniyyət",
      "sick": "Xəstəlik"
    }
  }
}
```

`en.json` eyni key-lərlə hazırlanır — v1.1-də switch açılır.

---

## QA-da yoxlanılan

QA agent hər screen üçün bu sualları verir:
1. Bütün string AZ-dirmi?
2. Hardcoded EN string varmı? (search for English alphabet patterns)
3. Tərcümə natural səslənirmi?
4. Number/date format qaydaya uyğundurmu?
5. Tone PRD philosophy-yə uyğundurmu?

Bunlardan biri "yox"-dursa → QA FAIL.

---

## Yeni AZ string əlavə edəndə

1. `az.json`-a key əlavə et
2. `en.json`-a eyni key + EN tərcümə (v1.1 üçün)
3. PR-də `i18n` label əlavə et
4. **Ülvi review-undan keçir** — yalnız o native AZ konteksti təsdiqləyir
