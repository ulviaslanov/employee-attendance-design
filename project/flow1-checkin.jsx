// Flow 1 — Employee mobile check-in
// 4 screens: morning gate · auto-detect · manual select · success/profile preview
// Friendly tone, not surveillance. GPS/Wi-Fi shown as transparent signals.

const PHONE_W = 390;
const PHONE_H = 844;

function PhoneShell({ children, time = '09:14', bg = '#f5f1ea' }) {
  return (
    <div style={{
      width: PHONE_W, height: PHONE_H, background: bg,
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      color: '#1a1410', overflow: 'hidden', position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* status bar */}
      <div style={{ height: 44, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 700, color: '#1a1410' }}>
        <span>{time}</span>
        <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11 }}>
          <span>●●●</span><span>5G</span><span>▮▮▮▮</span>
        </span>
      </div>
      {children}
    </div>
  );
}

// Screen 1: Morning gate — first open of the day, 09:14
function EmployeeMorningGate() {
  return (
    <PhoneShell time="09:14">
      <div style={{ flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: 'oklch(0.5 0.02 60)', textTransform: 'uppercase' }}>Şənbə · 26 Aprel</div>
          <window.Avatar name="Mələk Tağıyeva" size={32} />
        </div>

        <div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 32, lineHeight: 1.1, letterSpacing: -0.8, fontWeight: 500, color: '#1a1410' }}>
            Sabahın xeyir,<br/>Mələk.
          </div>
          <div style={{ fontSize: 14, color: 'oklch(0.45 0.02 60)', marginTop: 6 }}>Bu gün necə işləyirsən?</div>
        </div>

        {/* Auto-detected card */}
        <div style={{ background: 'white', borderRadius: 18, padding: 18, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <window.Icon.Wifi s={16} c="oklch(0.50 0.12 240)"/>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'oklch(0.50 0.12 240)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Avtomatik aşkarlandı</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.4 }}>Mərkəzi ofisdəsən</div>
            <div style={{ fontSize: 13, color: 'oklch(0.5 0.02 60)', marginTop: 2 }}>Wi-Fi: <b style={{ color: '#1a1410' }}>company-hq</b> · GPS təsdiqlədi</div>
          </div>
          <button style={{ background: '#1a1410', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Ofisdə kimi check-in et</span>
            <window.Icon.ArrowR s={16}/>
          </button>
          <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', textAlign: 'center' }}>Yox, başqa yerdəyəm →</div>
        </div>

        {/* Today preview */}
        <div style={{ background: 'oklch(0.96 0.04 35)', borderRadius: 14, padding: 14, border: '1px solid oklch(0.90 0.04 35)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'oklch(0.55 0.16 35)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6 }}>Bu gün səni gözləyir</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#1a1410' }}>
            <b>2 görüş</b> · 11:00 dizayn sync · 15:00 1-on-1 Rəşadla<br/>
            <b>3 fokus saatı</b> bloklanıb · 13:30-dan sonra
          </div>
        </div>

        {/* Streak ribbon */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: 12, background: 'white', borderRadius: 12, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'oklch(0.96 0.04 35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'oklch(0.65 0.18 35)' }}>◆</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>19 gün ritm</div>
            <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)' }}>11 gün sonra <b>30 gün davam</b> nişanı açılır</div>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

// Screen 2: Manual select — "I'm somewhere else"
function EmployeeManualSelect() {
  const opts = [
    { key: 'remote', icon: '⌂', label: 'Uzaqdan / evdən', desc: 'GPS təsdiqi tələb olunur', accent: 'oklch(0.50 0.12 240)' },
    { key: 'field',  icon: '◇', label: 'Müştəri / sahə',  desc: 'Görüş və ya səfər',         accent: 'oklch(0.50 0.14 320)' },
    { key: 'sick',   icon: '+', label: 'Xəstəlik',        desc: 'Bu günü dincəlmək lazımdır', accent: 'oklch(0.55 0.15 75)' },
    { key: 'short',  icon: '◔', label: 'Qısa icazə',      desc: 'Bir neçə saatlıq',          accent: 'oklch(0.45 0.02 60)' },
  ];
  return (
    <PhoneShell time="09:18">
      <div style={{ flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ width: 32, height: 32, borderRadius: 10, background: 'white', border: '1px solid oklch(0.92 0.01 60)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <window.Icon.ChevronR s={14} c="#1a1410" /><span style={{ display: 'inline-block', transform: 'rotate(180deg)', display: 'none' }}/>
          </button>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'oklch(0.45 0.02 60)' }}>Geri</div>
        </div>

        <div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 26, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500 }}>
            Bu gün hardasan?
          </div>
          <div style={{ fontSize: 13, color: 'oklch(0.45 0.02 60)', marginTop: 4 }}>Hamı görsün ki, niyə cavab vermirsən — və ya verirsən.</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {opts.map((o, i) => (
            <div key={o.key} style={{
              background: 'white', borderRadius: 14, padding: 14,
              border: i === 0 ? `1.5px solid ${o.accent}` : '1px solid oklch(0.92 0.01 60)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `color-mix(in oklch, ${o.accent} 12%, white)`, color: o.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 600 }}>
                {o.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{o.label}</div>
                <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)' }}>{o.desc}</div>
              </div>
              {i === 0 && (
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: o.accent, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <window.Icon.Check s={12} c="white"/>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', padding: '10px 14px', background: 'oklch(0.96 0.03 240)', borderRadius: 10, lineHeight: 1.5, border: '1px solid oklch(0.90 0.03 240)' }}>
            <b style={{ color: 'oklch(0.40 0.12 240)' }}>Bilirsən?</b> Uzaqdan işləmək üçün manager-ə avtomatik bildiriş gedəcək — icazə əvvəlcədən razılaşdırılıbsa, sadəcə qeyd kimi.
          </div>
          <button style={{ background: '#1a1410', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none' }}>
            Davam et — Uzaqdan
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}

// Screen 3: Remote check-in confirmation w/ GPS reveal
function EmployeeRemoteConfirm() {
  return (
    <PhoneShell time="09:20">
      <div style={{ flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: 'oklch(0.50 0.12 240)', textTransform: 'uppercase' }}>Uzaqdan check-in</div>

        <div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 26, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500 }}>
            GPS-i bir dəfə yoxlayaq.
          </div>
          <div style={{ fontSize: 13, color: 'oklch(0.45 0.02 60)', marginTop: 4 }}>Yalnız təsdiqdir — sonra izləmə yoxdur.</div>
        </div>

        {/* GPS preview tile */}
        <div style={{ background: 'white', borderRadius: 16, padding: 14, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ height: 140, borderRadius: 12, background: 'linear-gradient(135deg, oklch(0.94 0.03 240), oklch(0.92 0.04 200))', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 26px, oklch(0.85 0.02 240 / 0.4) 26px 27px), repeating-linear-gradient(0deg, transparent 0 26px, oklch(0.85 0.02 240 / 0.4) 26px 27px)' }}/>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 60, height: 60, borderRadius: '50%', background: 'oklch(0.50 0.12 240 / 0.18)' }}/>
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 14, height: 14, borderRadius: '50%', background: 'oklch(0.50 0.12 240)', boxShadow: '0 0 0 4px white' }}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <window.Icon.Pin s={14} c="oklch(0.50 0.12 240)"/>
            <div style={{ fontSize: 13 }}><b>Yasamal r.</b> · təxmini 200m diqqət</div>
          </div>
          <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', lineHeight: 1.5, padding: '10px 12px', background: 'oklch(0.97 0.01 60)', borderRadius: 8 }}>
            Dəqiq ünvan saxlanmır. Yalnız <b>"ofis xaricindədir"</b> bayrağı qeyd olunur.
          </div>
        </div>

        {/* Note to manager */}
        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'oklch(0.5 0.02 60)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 6 }}>Manager-ə qeyd · ixtiyari</div>
          <div style={{ fontSize: 13, color: '#1a1410', lineHeight: 1.5, minHeight: 38 }}>
            <span style={{ color: 'oklch(0.5 0.02 60)' }}>Konsentrasiya tələb edən dizayn işi var — sabaha presentation hazırlayıram.</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{ background: 'oklch(0.50 0.12 240)', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none' }}>
            Uzaqdan başla
          </button>
          <button style={{ background: 'transparent', color: '#1a1410', padding: 12, fontSize: 13, fontWeight: 600, border: 'none' }}>
            Geri qayıt
          </button>
        </div>
      </div>
    </PhoneShell>
  );
}

// Screen 4: Success — checked in, day starts
function EmployeeCheckinSuccess() {
  return (
    <PhoneShell time="09:21" bg="#f5f1ea">
      <div style={{ flex: 1, padding: '12px 22px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Hero */}
        <div style={{ background: 'oklch(0.94 0.05 240)', borderRadius: 20, padding: 20, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'oklch(0.85 0.10 240 / 0.4)' }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.40 0.14 240)', textTransform: 'uppercase' }}>Günün başladı</div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 30, lineHeight: 1.1, letterSpacing: -0.6, fontWeight: 500, color: '#0d1730', marginTop: 6 }}>
              Uzaqdan, 09:20.
            </div>
            <div style={{ fontSize: 13, color: 'oklch(0.40 0.10 240)', marginTop: 4 }}>Rəşada bildiriş getdi. Diqqətli iş!</div>
          </div>
        </div>

        {/* Streak update */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, oklch(0.96 0.04 35), oklch(0.94 0.06 50))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: 'oklch(0.65 0.18 35)' }}>◆</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.2 }}>20 gün ritm</div>
            <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 60)', marginTop: 2 }}>+1 bu gün üçün · vaxtında check-in</div>
          </div>
        </div>

        {/* Day at a glance */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.5 0.02 60)', textTransform: 'uppercase', marginBottom: 10 }}>Bu gün ritmin</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <DayRow time="09:20" label="Uzaqdan başladı" tone="oklch(0.50 0.12 240)" active/>
            <DayRow time="11:00" label="Dizayn sync · 30dəq" tone="oklch(0.50 0.14 320)"/>
            <DayRow time="13:30" label="Fokus bloku · 2 saat" tone="oklch(0.55 0.16 35)"/>
            <DayRow time="15:00" label="1-on-1 Rəşadla · 45dəq" tone="oklch(0.50 0.14 320)"/>
            <DayRow time="18:00" label="Çıxış" tone="oklch(0.45 0.02 60)" muted/>
          </div>
        </div>

        {/* Mood check */}
        <div style={{ background: 'oklch(0.96 0.03 35)', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.04 35)' }}>
          <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>
            <b>Bugün necə hiss edirsən?</b> <span style={{ color: 'oklch(0.5 0.02 60)' }}>1 sual · ixtiyari · yalnız sən görürsən</span>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {['🌫', '◐', '◑', '◉', '✦'].map((g, i) => (
              <div key={i} style={{ flex: 1, padding: '10px 0', textAlign: 'center', background: 'white', borderRadius: 10, fontSize: 18, border: '1px solid oklch(0.92 0.01 60)' }}>{g}</div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'oklch(0.5 0.02 60)', marginTop: 6, padding: '0 4px' }}>
            <span>yorğun</span><span>odaqlı</span>
          </div>
        </div>
      </div>
    </PhoneShell>
  );
}

function DayRow({ time, label, tone, active, muted }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: muted ? 0.5 : 1 }}>
      <div style={{ width: 8, height: 8, borderRadius: '50%', background: active ? tone : 'transparent', border: active ? 'none' : `1.5px solid ${tone}` }}/>
      <div style={{ fontSize: 11.5, color: 'oklch(0.45 0.02 60)', fontFamily: '"JetBrains Mono", monospace', width: 44 }}>{time}</div>
      <div style={{ fontSize: 13, color: '#1a1410', fontWeight: active ? 600 : 500 }}>{label}</div>
    </div>
  );
}

window.EmployeeMorningGate = EmployeeMorningGate;
window.EmployeeManualSelect = EmployeeManualSelect;
window.EmployeeRemoteConfirm = EmployeeRemoteConfirm;
window.EmployeeCheckinSuccess = EmployeeCheckinSuccess;
