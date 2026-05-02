// Flow 7 — Employee check-out (hybrid approach)
// 4 screens: office auto-trigger · remote EOD prompt · forgot correction · day summary
// Principle: "close the day" ritual, not time surveillance.

function PhoneShell7({ children, time = '18:07', bg = '#f5f1ea' }) {
  return (
    <div style={{
      width: 390, height: 844, background: bg,
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      color: '#1a1410', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ height: 44, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, fontWeight: 700 }}>
        <span>{time}</span>
        <span style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 11 }}>●●● 5G ▮▮▮▮</span>
      </div>
      {children}
    </div>
  );
}

function MiniStatCO({ label, value, tone }) {
  return (
    <div style={{ padding: '8px 10px', background: 'oklch(0.97 0.01 60)', borderRadius: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: tone, letterSpacing: 0.5, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{value}</div>
    </div>
  );
}

// Screen 1: Office — auto-detected departure (Wi-Fi left)
function CheckoutAutoPrompt() {
  return (
    <PhoneShell7 time="18:07">
      <div style={{ flex: 1, padding: '8px 22px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Notification card — dark, prominent */}
        <div style={{ background: '#1a1410', borderRadius: 18, padding: 18, color: 'white', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <window.Icon.Wifi s={15} c="oklch(0.62 0.13 155)"/>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'oklch(0.62 0.13 155)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Ofisdən ayrıldın</div>
          </div>
          <div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 28, lineHeight: 1.1, letterSpacing: -0.6, fontWeight: 500 }}>
              18:07 — günü bağla?
            </div>
            <div style={{ fontSize: 13, color: 'oklch(0.78 0.04 35)', marginTop: 5, lineHeight: 1.5 }}>
              Wi-Fi bağlantısı kəsildi · bu gün <b style={{ color: 'white' }}>8s 47dəq</b> işlədin
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ flex: 2, padding: '13px', background: 'oklch(0.62 0.13 155)', color: 'white', borderRadius: 10, fontSize: 14, fontWeight: 700, border: 'none' }}>Günü bağla</button>
            <button style={{ flex: 1, padding: '13px', background: 'oklch(0.28 0.02 35)', color: 'oklch(0.78 0.04 35)', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none' }}>Qayıdacam</button>
          </div>
        </div>

        {/* Today mini stats */}
        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Bu gün</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <MiniStatCO label="İş" value="8s 47" tone="oklch(0.50 0.12 240)"/>
            <MiniStatCO label="Fokus" value="4s 10" tone="oklch(0.55 0.16 35)"/>
            <MiniStatCO label="Görüş" value="2s 15" tone="oklch(0.50 0.14 320)"/>
          </div>
        </div>

        {/* Streak nudge */}
        <div style={{ background: 'oklch(0.96 0.04 35)', borderRadius: 12, padding: 12, border: '1px solid oklch(0.90 0.04 35)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 20, color: 'oklch(0.65 0.18 35)' }}>◆</div>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: 'oklch(0.45 0.10 35)' }}>
            <b>21 gün ritm</b> — bu gün də tamamlandı.<br/>9 gün sonra <b>30 gün davam</b> nişanı açılır.
          </div>
        </div>

        <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', textAlign: 'center', lineHeight: 1.5 }}>
          "Qayıdacam" seçsən, 2 saatdan sonra yenidən soruşacam.
        </div>
      </div>
    </PhoneShell7>
  );
}

// Screen 2: Remote — end-of-day prompt at ~18:00
function CheckoutRemoteEOD() {
  return (
    <PhoneShell7 time="18:00">
      <div style={{ flex: 1, padding: '8px 22px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: 'oklch(0.55 0.16 35)', textTransform: 'uppercase' }}>Günü bağla</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 28, lineHeight: 1.15, letterSpacing: -0.6, fontWeight: 500, marginTop: 4 }}>
            Mələk, günün<br/>necə keçdi?
          </div>
        </div>

        {/* Day summary card */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <window.StatusChip status="remote"/>
            <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', fontFamily: '"JetBrains Mono", monospace' }}>09:20 → 18:00</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 40, fontWeight: 600, letterSpacing: -1, color: '#1a1410' }}>8s 40dəq</div>
            <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 60)' }}>bu gün</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <MiniStatCO label="Fokus" value="3s 20" tone="oklch(0.55 0.16 35)"/>
            <MiniStatCO label="Görüş" value="2s 00" tone="oklch(0.50 0.14 320)"/>
            <MiniStatCO label="Fasilə" value="55dəq" tone="oklch(0.45 0.02 60)"/>
          </div>
        </div>

        {/* Mood check */}
        <div style={{ background: 'oklch(0.96 0.03 35)', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.04 35)' }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 3 }}>Bugün necə hiss etdin?</div>
          <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', marginBottom: 12 }}>İxtiyari · yalnız sən görürsən · həftəlik xülasəyə gedir</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['🌫', '◐', '◑', '◉', '✦'].map((g, i) => (
              <div key={i} style={{
                flex: 1, padding: '10px 0', textAlign: 'center',
                background: i === 3 ? '#1a1410' : 'white',
                color: i === 3 ? 'white' : '#1a1410',
                borderRadius: 10, fontSize: 18,
                border: i === 3 ? 'none' : '1px solid oklch(0.92 0.01 60)',
              }}>{g}</div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: 'oklch(0.5 0.02 60)', marginTop: 6, padding: '0 4px' }}>
            <span>yorğun</span><span>odaqlı</span>
          </div>
        </div>

        {/* Tomorrow intention */}
        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Sabah üçün 1 niyyət · ixtiyari</div>
          <div style={{ fontSize: 13, color: 'oklch(0.5 0.02 60)', lineHeight: 1.5 }}>
            Onboarding flow-unu bitir, review-a hazırla.
          </div>
        </div>

        <button style={{ marginTop: 'auto', background: '#1a1410', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none' }}>
          Günü bağla · 18:00
        </button>
      </div>
    </PhoneShell7>
  );
}

// Screen 3: Forgot to check out — next morning correction prompt
function CheckoutForgot() {
  return (
    <PhoneShell7 time="09:05">
      <div style={{ flex: 1, padding: '8px 22px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Gentle warning banner */}
        <div style={{ background: 'oklch(0.96 0.05 75)', borderRadius: 14, padding: 14, border: '1px solid oklch(0.90 0.05 75)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <window.Icon.Clock s={16} c="oklch(0.55 0.15 75)"/>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: 'oklch(0.50 0.12 75)' }}>Dünən tamamlanmayıb</div>
            <div style={{ fontSize: 12, color: 'oklch(0.50 0.10 75)', marginTop: 3, lineHeight: 1.5 }}>Dünən çıxış qeydini etmədin. Düzəliş etmək üçün 1 dəqiqə.</div>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 26, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500 }}>
            Dünən — 26 Aprel<br/>nə vaxt çıxdın?
          </div>
          <div style={{ fontSize: 13, color: 'oklch(0.45 0.02 60)', marginTop: 6 }}>Check-in saat 09:20-də idi.</div>
        </div>

        {/* Time chips */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>Çıxış saatı</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['16:00', '17:00', '18:00', '18:30', '19:00', '19:30', '20:00', 'Digər...'].map((t, i) => (
              <div key={t} style={{
                padding: '9px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
                background: i === 3 ? '#1a1410' : 'oklch(0.96 0.01 60)',
                color: i === 3 ? 'white' : '#1a1410',
                border: i === 3 ? 'none' : '1px solid oklch(0.92 0.01 60)',
              }}>{t}</div>
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: 12, color: 'oklch(0.5 0.02 60)' }}>
            Seçildi: <b style={{ color: '#1a1410', fontFamily: '"JetBrains Mono", monospace' }}>18:30</b> · 9s 10dəq
          </div>
        </div>

        {/* Optional note */}
        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Qeyd · ixtiyari</div>
          <div style={{ fontSize: 13, color: 'oklch(0.5 0.02 60)', lineHeight: 1.5 }}>Presentation bitirməyə çalışırdım, telefonuma baxmadım.</div>
        </div>

        <div style={{ background: 'oklch(0.96 0.03 240)', borderRadius: 10, padding: 12, border: '1px solid oklch(0.90 0.03 240)', fontSize: 11.5, color: 'oklch(0.40 0.10 240)', lineHeight: 1.5 }}>
          <b>Şəffaflıq:</b> Düzəliş Rəşada kiçik qeyd kimi görünəcək — təsdiq tələb etmir.
        </div>

        <button style={{ marginTop: 'auto', background: '#1a1410', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none' }}>Qeyd et · 18:30</button>
      </div>
    </PhoneShell7>
  );
}

// Screen 4: Day successfully closed — summary + streak
function CheckoutDaySummary() {
  return (
    <PhoneShell7 time="18:01">
      <div style={{ flex: 1, padding: '8px 22px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Hero — sage/success tone */}
        <div style={{ background: 'oklch(0.94 0.04 155)', borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'oklch(0.85 0.08 155 / 0.4)' }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.40 0.12 155)', textTransform: 'uppercase' }}>Gün tamamlandı</div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 32, lineHeight: 1.1, letterSpacing: -0.7, fontWeight: 500, color: '#0d1c14', marginTop: 6 }}>
              Sabah görüşərik,<br/>Mələk.
            </div>
            <div style={{ fontSize: 13, color: 'oklch(0.38 0.10 155)', marginTop: 4 }}>18:00 · 8s 40dəq işlədin bu gün</div>
          </div>
        </div>

        {/* Day timeline */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>Bu günün izi</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { time: '09:20', label: 'Uzaqdan başladı',        tone: 'oklch(0.50 0.12 240)' },
              { time: '11:00', label: 'Dizayn sync · 30dəq',    tone: 'oklch(0.50 0.14 320)' },
              { time: '13:30', label: 'Fokus bloku · 3s 20dəq', tone: 'oklch(0.55 0.16 35)' },
              { time: '15:00', label: '1-on-1 Rəşadla · 45dəq', tone: 'oklch(0.50 0.14 320)' },
              { time: '18:00', label: 'Gün bağlandı',            tone: 'oklch(0.50 0.10 155)', active: true },
            ].map(r => (
              <div key={r.time} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.active ? r.tone : 'transparent', border: r.active ? 'none' : `1.5px solid ${r.tone}`, flexShrink: 0 }}/>
                <div style={{ fontSize: 11.5, color: 'oklch(0.45 0.02 60)', fontFamily: '"JetBrains Mono", monospace', width: 44, flexShrink: 0 }}>{r.time}</div>
                <div style={{ fontSize: 13, color: '#1a1410', fontWeight: r.active ? 700 : 500 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak update */}
        <div style={{ background: 'linear-gradient(135deg, oklch(0.96 0.05 35), oklch(0.94 0.06 50))', borderRadius: 16, padding: 14, border: '1px solid oklch(0.90 0.06 35)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28, color: 'oklch(0.65 0.18 35)' }}>◆</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>21 gün ritm · bu gün tamamlandı</div>
            <div style={{ fontSize: 11.5, color: 'oklch(0.50 0.10 35)', marginTop: 2 }}>9 gün sonra <b>30 gün davam</b> nişanı açılır</div>
          </div>
        </div>

        {/* Tomorrow preview */}
        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Sabah sənə</div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#1a1410' }}>
            <b>2 görüş</b> · 10:00 sprint review · 15:00 dizayn crit
          </div>
        </div>
      </div>
    </PhoneShell7>
  );
}

window.CheckoutAutoPrompt = CheckoutAutoPrompt;
window.CheckoutRemoteEOD = CheckoutRemoteEOD;
window.CheckoutForgot = CheckoutForgot;
window.CheckoutDaySummary = CheckoutDaySummary;
