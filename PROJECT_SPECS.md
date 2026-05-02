# Employee Attendance & Performance Tracking — Project Specs

> **Design philosophy:** "Cəzalandırma deyil, fərqindəlik." (Not punishment, but awareness.)
> The system exists to give employees a mirror, not a surveillance camera.

---

## 1. Overview

A mobile-first (with desktop web views) attendance and performance tracking system for a 30–100 person company. Replaces informal CEO-DM workarounds and inconsistent manager approvals with a single, transparent channel visible to employees, managers, and HR alike.

**Primary language:** Azerbaijani  
**Target company size:** 30–100 employees, 5 teams  
**Platform:** Mobile app (employee daily use) + Web dashboard (manager/HR)  

---

## 2. Design Philosophy & Principles

| # | Principle | Description |
|---|-----------|-------------|
| 01 | **Single channel** | All requests flow through the system. No CEO-DM bypass. Manager + HR see everything first. |
| 02 | **Excused absences are protected** | Sick leave / vacation does not break a streak. The system understands humans. |
| 03 | **Visibility is open, with audit** | Everyone knows who is where — not why. Every event is in the audit log. |
| 04 | **Rewards go to consistency** | Not "earliest arrival" but "maintained their rhythm." Self-comparison only — no leaderboard. |
| 05 | **Managers don't struggle** | Auto-approve defaults, smart notifications, 30-min response window. HR backs them up. |

---

## 3. User Roles

### 3.1 Employee
- Checks in / out daily (mobile)
- Submits remote work / leave / sick requests
- Views own personal dashboard, weekly wrap, badges, rewards
- Sends and receives Kudos

### 3.2 Manager
- Sees team live status in real time (web)
- Reviews and approves / declines requests (inbox model)
- Selects monthly Spotlight recipient and reward
- Views team performance trends

### 3.3 HR / Admin
- Company-wide live dashboard and audit log
- Configures system policies (work hours, remote limits, streak rules)
- Manages reward catalog and budget
- Generates reports and exports

---

## 4. Features

### 4.1 Check-In System

**Detection methods (hybrid):**
- **Wi-Fi auto-detect** — when the device joins the office network, check-in is proposed automatically
- **GPS geofence** — confirms device is within office radius (80m HQ / 60m branch)
- **Manual selection** — employee selects status if auto-detect is wrong or absent

**Check-in states / location types:**

| Status | Label | Trigger |
|--------|-------|---------|
| `office` | Ofisdə | Wi-Fi + GPS confirmed |
| `remote` | Uzaqdan | Manual or prior approval |
| `meeting` | Görüşdə | Calendar event active |
| `field` | Çöldə | Manual — client/site visit |
| `sick` | Xəstəlik | Self-reported |
| `off` | Məzuniyyət | Approved leave |
| `notyet` | Hələ yox | No check-in yet today |
| `break` | Fasilədə | Active break flag |

**Remote check-in flow:**
1. Employee selects "Remote / from home"
2. GPS runs a single verification check (one-time, not ongoing)
3. A note to the manager is optional
4. Manager receives a notification; HR is CC'd
5. Pre-approved remote days auto-confirm with a log entry only

**Morning gate screen (mobile):**
- Greets by first name with current date
- Shows auto-detected location with confirmation button
- Shows "Not here?" alternative for manual selection
- Displays today's calendar preview (meetings, focus blocks)
- Shows active streak ribbon at bottom

---

### 4.2 Check-Out System *(partially designed — see open questions)*

**Recommended approach (Hybrid):**

| Scenario | Checkout method |
|----------|----------------|
| In office | Auto-trigger when device leaves Wi-Fi/geofence |
| Remote | End-of-day push notification: "Close out today?" — one tap |
| Field / meeting | Manual — return time varies |
| Forgot to check out | Next-morning prompt: "When did you leave yesterday?" |
| Still working at 22:00 | Late-night reminder; option to mark overtime |

**End-of-day micro-ritual (check-out screen):**
- Summary card: hours worked, focus blocks, meetings
- Single mood check-in (1–5 emoji scale) — private, for weekly wrap only
- Optional note
- Confirmation button: "Günü bağla" (Close the day)

---

### 4.3 Request Flow

**Request types:**

| Type | Label | Approver |
|------|-------|----------|
| `remote` | Uzaqdan iş | Manager → HR notified |
| `leave` | Məzuniyyət | Manager → HR notified |
| `sick` | Xəstəlik | Auto-approved; manager + HR notified |
| `field` | Çöldə iş | Manager → HR notified |
| `short` | Qısa icazə | Manager → HR notified |

**Flow:**
1. Employee opens request form → selects type, date(s), optional reason
2. System shows who will see the request (manager, HR)
3. Request sent → status tracker shown (Sent / Manager reviewing / Response)
4. Manager receives inbox notification (web + push)
5. Manager sees system context: remote day count this month, weekly hours, any conflicts
6. Manager approves / declines / asks for more info
7. Employee receives push notification with decision
8. HR has read-only visibility on all requests and decisions

**Policy constraints (HR-configurable):**
- Work start time: `09:00` (after 09:15 = "late" marker, no penalty)
- Monthly remote limit: `8 days/month` (override requires manager + HR)
- Sick leave: auto-approved, streak-protected
- Manager response SLA: 30 minutes before HR escalation

---

### 4.4 Personal Dashboard (Employee)

**Hero card:**
- Current status chip
- Check-in time → now (elapsed)
- Today's breakdown: Focus hours / Meeting hours / Break time

**Streak card:**
- Day count with large Fraunces numeral
- Mini bar chart: last 14 days
- Progress toward next milestone badge

**Rewards summary:**
- Up to 3 reward chips (ready / in-progress)
- Link to full rewards catalog

**Recent Kudos:**
- Last 2–3 received kudos with sender, value tag, message preview

---

### 4.5 Weekly Wrap

Spotify Wrapped-style end-of-week summary, generated every Friday:

| Stat | Example |
|------|---------|
| Headline | "Bu həftə sənin odaqlı həftən oldu." |
| Days worked | 5 days · 38.5 hours |
| Δ vs last week | +1.5 hours |
| Longest focus block | 4h 05m (Wednesday) |
| Earliest arrival | 08:14 (Tuesday) |
| On-time days | 4 / 5 |
| Meeting hours | 6h 30m total |
| Focus blocks completed | 11 |
| Mood trend | Bar chart Mon–Fri |
| Best / hardest day | Text callout |
| Reward unlocked (if any) | Reward card with CTA |

---

### 4.6 Badges & Milestones

No leaderboard. Badges are self-earned, self-compared.

| Badge | Trigger | Icon |
|-------|---------|------|
| 7 gün ritm | 7 consecutive on-time days | ◇ |
| 30 gün davam | 30-day streak | ◆ |
| Erkən quş | 5 days before 09:00 | ☀ |
| Dərin iş | 4-hour uninterrupted focus block | ◉ |
| Komanda dayağı | 5+ kudos received | ♡ |
| 60 gün mayak | 60-day streak | ✦ |

**Streak protection rules:**
- Approved sick leave → streak preserved
- Approved vacation → streak preserved
- Unapproved absence → streak resets
- Weekend / public holiday → not counted

---

### 4.7 Rewards & Recognition

**Three-layer system:**

#### Layer 1 — Kudos (peer-to-peer)
- Employee selects a colleague, picks a company value tag, writes a short message
- Visible to the whole team (transparent)
- Value tags map to company values (HR tracks in annual retrospective)

**Value tags:** Komanda dayağı · Yaradıcılıq · Sahiblik · Sürət · Şəffaflıq · Empatiya

#### Layer 2 — Milestone Rewards (system-automated)
| Milestone | Reward |
|-----------|--------|
| 7-day streak | Coffee voucher (15 AZN) |
| 14-day streak | Book of choice (40 AZN) |
| 20 kudos received | Lunch voucher (25 AZN) |
| 30-day streak | Online course (200 AZN) |
| 60-day streak | +1 vacation day |
| 1-year streak | Personal achievement package |

#### Layer 3 — Manager Spotlight (monthly)
- Manager selects 1 employee/month
- System suggests 3 candidates (based on kudos, streak, peer feedback)
- Fair rotation enforced: same person cannot win twice in a year
- Manager writes a personal note
- Announced in team channel with reward (gift card, book pack, conference ticket, etc.)
- Full audit trail maintained by HR

---

### 4.8 Manager Views (Web)

#### Team Live Status
- Header: team name, current date/time, live indicator
- KPI strip: counts by status (office, remote, meeting, field, sick/leave, pending requests)
- Employee list: avatar, name, role, status chip, check-in time, streak, weekly hours
- Right sidebar: today's chronological event log + kudos prompt

#### Request Inbox
- Left panel: list of pending requests (avatar, name, type, date range, sent time, status)
- Right panel (selected request):
  - Employee profile header
  - Request details (type, range, reason)
  - System context card (remote days this month, weekly hours, team conflicts)
  - Action buttons: Approve / Need more info / Decline
  - Visibility card: who can see this request

#### Monthly Spotlight
- System-suggested candidates with reason
- Reward selection (gift card, book, vacation day, conference ticket)
- Optional personal note
- Fair rotation warning if applicable
- "Announce" button → posts to team channel + audit log

---

### 4.9 HR / Admin Views (Web)

#### Company Live Dashboard
- 8-metric KPI grid: In-office, Remote, Meeting, Field, On-leave, Sick, Not-yet, Pending-requests
- Team breakdown bar chart (per team: office/remote/meeting/sick proportions)
- Attention patterns card (anomaly detection, e.g. "2 people working 14+ days without break")
- Audit log: last 8 events with time, actor, action, target, tone

#### Policies (Single Source of Truth)
| Policy | Default | Description |
|--------|---------|-------------|
| Work start time | 09:00 | Late marker at 09:15 |
| Remote approval | Manager + HR | Both notified |
| Monthly remote limit | 8 days | Override requires both parties |
| Kudos rotation | 1× per year | No same person spotlight twice |
| Streak break policy | Excused = protected | No punitive dynamics |
| Visibility | Open + audited | Status visible; location private |

- Policy change log (who changed what, when, with what justification)

---

## 5. Screen Inventory

### Mobile Screens (390 × 844)

| ID | Flow | Screen | Description |
|----|------|--------|-------------|
| CI-1 | Check-in | Morning gate | Auto-detected location + confirm CTA |
| CI-2 | Check-in | Manual select | Location/status picker |
| CI-3 | Check-in | Remote confirm | GPS single-check + manager note |
| CI-4 | Check-in | Success | Day started, streak update, mood check |
| P-1 | Personal | Dashboard | Status, streak, rewards, kudos |
| P-2 | Personal | Weekly wrap | Spotify-style week summary |
| P-3 | Personal | Badges | Achievement grid, locked/unlocked |
| R-1 | Request | Form | Type selector, date, reason, notice |
| R-2 | Request | Sent | Status tracker (sent → review → response) |
| RW-1 | Rewards | Kudos compose | Recipient, value tag, message |
| RW-2 | Rewards | Milestone unlock | Celebration screen (dark bg) |
| *(TBD)* | Check-out | End of day | Day close, mood, summary |
| *(TBD)* | Request | Decision received | Approved / declined notification |
| *(TBD)* | Kudos | Kudos received | Push + full view |

### Web Screens (1280 × 800)

| ID | Flow | Screen | Description |
|----|------|--------|-------------|
| MG-1 | Manager | Team live | Employee list, KPI strip, event log |
| MG-2 | Manager | Request inbox | Two-panel: list + detail + approve |
| RW-3 | Rewards | Catalog | 3-column reward grid (web) |
| RW-4 | Manager | Spotlight | Candidates + reward selection |
| HR-1 | HR | Company dashboard | KPIs, teams, patterns, audit |
| HR-2 | HR | Policies | Policy list + system philosophy + changelog |
| *(TBD)* | HR | Request audit detail | Single request full history |

---

## 6. Navigation Structure

### Mobile App
```
Bottom navigation (4 tabs):
├── Gün (Today)          — Check-in/out, day overview
├── Mən (Me)             — Personal dashboard, wrap, badges
├── Sorğular (Requests)  — My requests, history
└── Komanda (Team)       — Team status (read-only for employees)
```

### Web App
```
Left sidebar:
├── Komandam (Team)      — Live status [Manager]
├── Sorğular (Requests)  — Inbox [Manager]
├── Spotlight            — Monthly recognition [Manager]
├── Şirkət (Company)     — Live dashboard [HR]
├── Siyasətlər (Policies)— System config [HR]
└── Audit log            — Full event history [HR]
```

---

## 7. Gamification Design

**Principles:**
- No leaderboard — self vs. self only
- Streaks are visible but not weaponized
- Rewards celebrate consistency, not competition
- Mood check is private; only aggregated in weekly wrap
- Manager spotlight rotates — same person can't win twice/year

**Streak visualization:**
| Days | Glyph | Color | Label |
|------|-------|-------|-------|
| 1–6 | · | Warm taupe | Yeni (New) |
| 7–13 | ◇ | Amber | Başlanğıc (Starting) |
| 14–29 | ◇ | Warm yellow | Ritm (Rhythm) |
| 30–59 | ◆ | Coral | Davamlı (Sustained) |
| 60+ | ◆ | Deep coral | Mayak (Beacon) |

---

## 8. Visual Design System

### Color Palette (OKLCH)
| Name | Value | Usage |
|------|-------|-------|
| Coral | `oklch(0.65 0.18 35)` | Brand, CTA, streak |
| Sage | `oklch(0.62 0.13 155)` | In-office status |
| Dusk | `oklch(0.60 0.14 240)` | Remote status |
| Plum | `oklch(0.60 0.16 320)` | Meeting/field status |
| Amber | `oklch(0.72 0.16 75)` | Sick / warning |
| Taupe | `oklch(0.55 0.03 60)` | Off / neutral |
| Canvas | `#ebe5d8` | Page background |
| Dark | `#1a1410` | Primary text, CTAs |

### Typography
| Role | Font | Usage |
|------|------|-------|
| Display | Fraunces (serif, italic-capable) | Section headers, streak numbers, hero stats |
| UI | Plus Jakarta Sans | Body text, labels, buttons |
| Mono | JetBrains Mono | Times, numbers, check-in timestamps |

### Design Constraints
- No red/green traffic-light status signals (surveillance feel)
- No "late" warning icons or sad glyphs
- No aggressive gradients
- No leaderboards or peer ranking tables
- Warm cream backgrounds — never clinical white or dark-mode default

---

## 9. Data Model (Logical)

### Employee
```
id, name, role, team, status (current),
arrived (today's check-in time), streak (days),
hoursWeek, focusToday, isLead
```

### Request
```
id, from (employeeId), type, date, range, reason,
status (pending | approved | declined),
sent (timestamp), via (system | legacy)
```

### Audit Event
```
time, actor, action, target, tone (info | success | warn | muted)
```

### Badge
```
id, name, desc, icon, unlocked (bool)
```

### Team
```
id, name, accent (color token), lead (name)
```

### Location
```
id, name, address, radius (meters for geofence)
```

---

## 10. Open Questions / Incomplete Flows

The following were discussed in design sessions but not yet fully designed:

| # | Item | Status | Priority |
|---|------|--------|----------|
| 1 | **Check-out flow** | Discussed (3 approaches), hybrid recommended, not designed | HIGH |
| 2 | **Request decision notification** | "Sent" screen exists; "Approved/Declined" response screen missing | HIGH |
| 3 | **Kudos received screen** | Send exists; receive/notification view missing | MEDIUM |
| 4 | **Reward redemption flow** | Catalog exists; "claim and use" flow missing | MEDIUM |
| 5 | **HR request audit detail** | HR dashboard exists; single-request drill-down missing | MEDIUM |
| 6 | **Manager 1-on-1 prep** | Spotlight exists; pre-meeting preparation view missing | LOW |
| 7 | **Empty state / first day** | No "new employee, no data yet" state designed | LOW |
| 8 | **Error / edge states** | GPS unavailable, Wi-Fi not found, wrong office correction | LOW |

---

## 11. Tech Requirements

### Frontend
- **Mobile:** React Native or Flutter (or PWA for MVP)
- **Web:** React with responsive layout
- **Fonts:** Google Fonts (Fraunces, Plus Jakarta Sans, JetBrains Mono)
- **Color:** OKLCH color space (modern CSS / polyfill for older browsers)

### Backend (inferred)
- Authentication (employee / manager / HR roles)
- Real-time team status (WebSocket or polling)
- Push notifications (mobile)
- Geofence / GPS verification endpoint
- Wi-Fi SSID detection (mobile native)
- Audit log with immutable append-only writes
- Weekly wrap generation (cron job, Friday EOD)
- Request approval workflow with SLA timers

### Integrations (future)
- Calendar sync (meetings → focus block detection)
- Slack / Teams (kudos + spotlight announcements)
- HR system export (attendance reports)

---

## 12. Out of Scope (Explicitly)

- Time-tracking for billing / payroll calculation
- Individual performance score or rating
- Peer comparison leaderboards
- GPS continuous tracking (only point-in-time check-in verification)
- Disciplinary workflows
- Integrations with third-party HR systems (Phase 1)
