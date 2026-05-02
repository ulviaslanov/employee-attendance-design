// Shared tokens for Employee Attendance & Performance system
// Friendly, professional, warm — not surveillance.

// Status: where is this employee right now?
const STATUS = {
  office:    { label: 'Ofisdə',     short: '●', tone: 'success', desc: 'Wi-Fi / GPS təsdiqlənib' },
  remote:    { label: 'Uzaqdan',    short: '◐', tone: 'info',    desc: 'İcazəli — evdən' },
  meeting:   { label: 'Görüşdə',    short: '◉', tone: 'accent',  desc: 'Kalendarda görüş' },
  field:     { label: 'Çöldə',      short: '◇', tone: 'accent',  desc: 'Müştəri / sahə işi' },
  break:     { label: 'Fasilədə',   short: '◔', tone: 'muted',   desc: 'Nahar / qəhvə' },
  off:       { label: 'Məzuniyyət', short: '○', tone: 'muted',   desc: 'İcazəli istirahət' },
  sick:      { label: 'Xəstəlik',   short: '+', tone: 'warn',    desc: 'Üzrlü' },
  notyet:    { label: 'Hələ yox',   short: '·', tone: 'neutral', desc: 'Bu gün check-in yoxdur' },
};

// Request types — single channel, no CEO-DM bypass
const REQUEST_TYPES = {
  remote:    { label: 'Uzaqdan iş',    icon: '⌂', tone: 'info'   },
  leave:     { label: 'Məzuniyyət',    icon: '○', tone: 'muted'  },
  sick:      { label: 'Xəstəlik',      icon: '+', tone: 'warn'   },
  field:     { label: 'Çöldə iş',      icon: '◇', tone: 'accent' },
  short:     { label: 'Qısa icazə',    icon: '◔', tone: 'neutral'},
};

// Warm, friendly accents — OKLCH for harmony. Same chroma/lightness, varied hue.
const ACCENTS = {
  // primary: soft warm coral (Code Academy heritage)
  coral:  { fg: 'oklch(0.55 0.16 35)',  bg: 'oklch(0.96 0.04 35)',  solid: 'oklch(0.65 0.18 35)',  ring: 'oklch(0.65 0.18 35 / 0.25)' },
  // success: muted sage green (not aggressive lime)
  sage:   { fg: 'oklch(0.50 0.10 155)', bg: 'oklch(0.96 0.03 155)', solid: 'oklch(0.62 0.13 155)', ring: 'oklch(0.62 0.13 155 / 0.25)' },
  // info: dusty blue (not corporate)
  dusk:   { fg: 'oklch(0.50 0.12 240)', bg: 'oklch(0.96 0.03 240)', solid: 'oklch(0.60 0.14 240)', ring: 'oklch(0.60 0.14 240 / 0.25)' },
  // warn: warm amber
  amber:  { fg: 'oklch(0.55 0.15 75)',  bg: 'oklch(0.96 0.05 75)',  solid: 'oklch(0.72 0.16 75)',  ring: 'oklch(0.72 0.16 75 / 0.25)' },
  // accent: soft plum
  plum:   { fg: 'oklch(0.50 0.14 320)', bg: 'oklch(0.96 0.03 320)', solid: 'oklch(0.60 0.16 320)', ring: 'oklch(0.60 0.16 320 / 0.25)' },
  // neutral: warm taupe
  taupe:  { fg: 'oklch(0.45 0.02 60)',  bg: 'oklch(0.94 0.01 60)',  solid: 'oklch(0.55 0.03 60)',  ring: 'oklch(0.55 0.03 60 / 0.20)' },
};

// Status → accent mapping
const STATUS_ACCENT = {
  office:  ACCENTS.sage,
  remote:  ACCENTS.dusk,
  meeting: ACCENTS.plum,
  field:   ACCENTS.plum,
  break:   ACCENTS.taupe,
  off:     ACCENTS.taupe,
  sick:    ACCENTS.amber,
  notyet:  ACCENTS.taupe,
};

// Streak intensity — gentle, not punishing
function streakIntensity(n) {
  if (n >= 60) return { glyph: '◆', color: 'oklch(0.60 0.18 35)',  label: 'Mayak' };
  if (n >= 30) return { glyph: '◆', color: 'oklch(0.65 0.16 50)',  label: 'Davamlı' };
  if (n >= 14) return { glyph: '◇', color: 'oklch(0.68 0.15 75)',  label: 'Ritm' };
  if (n >= 7)  return { glyph: '◇', color: 'oklch(0.72 0.13 95)',  label: 'Başlanğıc' };
  if (n >= 1)  return { glyph: '·', color: 'oklch(0.70 0.04 60)',  label: 'Yeni' };
  return         { glyph: '·', color: 'oklch(0.70 0 0)',          label: '—' };
}

// Helper: convert minutes to "Xs Ydəq"
function fmtMinutes(m) {
  if (m < 60) return `${m} dəq`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r === 0 ? `${h} saat` : `${h}s ${r}dəq`;
}

// Helper: time-of-day formatting
function fmtTime(h, m = 0) {
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

// Tiny inline icons — minimal, geometric. Match Code Academy style.
const Icon = {
  Check: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3 3 7-7" stroke={c} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  X: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke={c} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),
  Clock: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke={c} strokeWidth="1.8" />
      <path d="M8 4.5V8l2.5 1.5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Pin: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M8 14V9M8 9c2.5 0 4-1.8 4-4 0-2.2-1.8-4-4-4S4 2.8 4 5c0 2.2 1.5 4 4 4z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <circle cx="8" cy="5" r="1.4" fill={c}/>
    </svg>
  ),
  Home: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M2 7l6-5 6 5v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M6 14V9h4v5" stroke={c} strokeWidth="1.6"/>
    </svg>
  ),
  Wifi: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M2 6c3.5-3 8.5-3 12 0M4 8.5c2.3-2 5.7-2 8 0M6.5 11c1-.7 2-.7 3 0" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <circle cx="8" cy="13" r="1" fill={c}/>
    </svg>
  ),
  Search: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="4.5" stroke={c} strokeWidth="1.8" />
      <path d="M11 11l3 3" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Diamond: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill={c}>
      <path d="M8 1l5 5-5 9-5-9 5-5z" />
    </svg>
  ),
  Sparkle: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill={c}>
      <path d="M8 1l1.6 4.4L14 7l-4.4 1.6L8 13l-1.6-4.4L2 7l4.4-1.6L8 1z" />
    </svg>
  ),
  Dot: ({ s = 6, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 6 6"><circle cx="3" cy="3" r="3" fill={c} /></svg>
  ),
  ChevronR: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M6 3l5 5-5 5" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ArrowR: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Plus: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Calendar: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke={c} strokeWidth="1.6"/>
      <path d="M2 6h12M5 1.5v3M11 1.5v3" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Filter: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M4 8h8M6 12h4" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Bell: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M4 11V8a4 4 0 018 0v3l1 1.5H3L4 11z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M6.5 13.5a1.5 1.5 0 003 0" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  Heart: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill={c}>
      <path d="M8 13.5s-5-3-5-7a3 3 0 015-2 3 3 0 015 2c0 4-5 7-5 7z"/>
    </svg>
  ),
  Trophy: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none">
      <path d="M5 2h6v4a3 3 0 11-6 0V2z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M3 4H2v1a2 2 0 002 2M13 4h1v1a2 2 0 01-2 2M6 11v3h4v-3" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
  Zap: ({ s = 14, c = 'currentColor' }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill={c}>
      <path d="M9 1L3 9h4l-1 6 6-8H8l1-6z"/>
    </svg>
  ),
};

// Reusable little components
function StatusDot({ status, size = 8 }) {
  const accent = STATUS_ACCENT[status] || ACCENTS.taupe;
  return (
    <span style={{
      display: 'inline-block', width: size, height: size, borderRadius: '50%',
      background: accent.solid, boxShadow: `0 0 0 2px ${accent.ring}`,
    }} />
  );
}

function StatusChip({ status, size = 'md' }) {
  const s = STATUS[status] || STATUS.notyet;
  const accent = STATUS_ACCENT[status] || ACCENTS.taupe;
  const pad = size === 'sm' ? '3px 8px' : '5px 10px';
  const fs = size === 'sm' ? 10.5 : 12;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: pad, borderRadius: 999,
      background: accent.bg, color: accent.fg,
      fontSize: fs, fontWeight: 600, lineHeight: 1,
      whiteSpace: 'nowrap',
    }}>
      <StatusDot status={status} size={size === 'sm' ? 6 : 7}/>
      {s.label}
    </span>
  );
}

// Avatar — initials with gentle warm tone (no real photos)
function Avatar({ name, size = 32, tone }) {
  const initials = (name || '').split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
  const palette = [ACCENTS.coral, ACCENTS.sage, ACCENTS.dusk, ACCENTS.plum, ACCENTS.amber];
  // Deterministic palette pick from name hash
  const hash = (name || '').split('').reduce((a,c) => a + c.charCodeAt(0), 0);
  const a = tone || palette[hash % palette.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: a.bg, color: a.fg,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.4, fontWeight: 700, letterSpacing: -0.2,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

window.STATUS = STATUS;
window.STATUS_ACCENT = STATUS_ACCENT;
window.REQUEST_TYPES = REQUEST_TYPES;
window.ACCENTS = ACCENTS;
window.streakIntensity = streakIntensity;
window.fmtMinutes = fmtMinutes;
window.fmtTime = fmtTime;
window.Icon = Icon;
window.StatusDot = StatusDot;
window.StatusChip = StatusChip;
window.Avatar = Avatar;
