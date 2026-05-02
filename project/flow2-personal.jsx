// Flow 2 — Employee personal dashboard
// Self-awareness: own data, own trends. No comparison with colleagues.
// Sections: hero status · this week rhythm · streak/badges · weekly wrap · kudos received · my rewards

const PHONE_W2 = 390;
const PHONE_H2 = 844;

function PhoneShell2({ children, time = '14:32' }) {
  return (
    <div style={{
      width: PHONE_W2, height: PHONE_H2, background: '#f5f1ea',
      fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
      color: '#1a1410', overflow: 'hidden', position: 'relative',
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

// Screen: Personal dashboard — top of "Mən" tab
function EmployeePersonalDashboard() {
  return (
    <PhoneShell2 time="14:32">
      <div style={{ flex: 1, padding: '6px 22px 100px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: 'oklch(0.5 0.02 60)', textTransform: 'uppercase' }}>Mənim ritmim</div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 24, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500, marginTop: 2 }}>Mələk Tağıyeva</div>
          </div>
          <window.Avatar name="Mələk Tağıyeva" size={42}/>
        </div>

        {/* Hero — current status */}
        <div style={{ background: 'white', borderRadius: 18, padding: 16, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <window.StatusChip status="remote"/>
            <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', fontFamily: '"JetBrains Mono", monospace' }}>09:20 → indi</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 38, fontWeight: 600, letterSpacing: -1, color: '#1a1410' }}>5s 12dəq</div>
            <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 60)' }}>bu gün</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1, padding: '8px 10px', background: 'oklch(0.96 0.04 35)', borderRadius: 10 }}>
              <div style={{ fontSize: 10.5, color: 'oklch(0.55 0.16 35)', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Fokus</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>3s 20dəq</div>
            </div>
            <div style={{ flex: 1, padding: '8px 10px', background: 'oklch(0.96 0.03 320)', borderRadius: 10 }}>
              <div style={{ fontSize: 10.5, color: 'oklch(0.50 0.14 320)', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Görüş</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>1s 10dəq</div>
            </div>
            <div style={{ flex: 1, padding: '8px 10px', background: 'oklch(0.96 0.01 60)', borderRadius: 10 }}>
              <div style={{ fontSize: 10.5, color: 'oklch(0.45 0.02 60)', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase' }}>Fasilə</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>42 dəq</div>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div style={{ background: 'linear-gradient(135deg, oklch(0.96 0.05 35), oklch(0.94 0.06 50))', borderRadius: 18, padding: 18, border: '1px solid oklch(0.90 0.06 35)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -20, bottom: -20, fontSize: 120, color: 'oklch(0.65 0.18 35 / 0.12)', lineHeight: 1 }}>◆</div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'oklch(0.55 0.16 35)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Davamlı ritm</div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 56, lineHeight: 1, letterSpacing: -2, fontWeight: 600, color: '#5a2510', marginTop: 6 }}>20</div>
            <div style={{ fontSize: 13, color: 'oklch(0.50 0.10 35)', marginTop: 2 }}>gün ardıcıl vaxtında</div>
            {/* Mini bars — last 14 days */}
            <div style={{ display: 'flex', gap: 3, marginTop: 14, alignItems: 'flex-end', height: 32 }}>
              {[8,9,7,9,8,2,2,9,8,9,7,9,8,9].map((h, i) => (
                <div key={i} style={{
                  flex: 1, height: `${h * 10}%`, minHeight: 4,
                  background: i < 5 || i > 6 ? 'oklch(0.65 0.18 35)' : 'oklch(0.85 0.04 35)',
                  borderRadius: 2,
                }}/>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'oklch(0.50 0.10 35)', marginTop: 4 }}>
              <span>2 həftə əvvəl</span><span>bu gün</span>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: 'oklch(0.45 0.10 35)' }}>10 gün sonra <b style={{ color: '#5a2510' }}>30 gün davam</b> nişanı açılır →</div>
          </div>
        </div>

        {/* Rewards card */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Mükafatlarım</div>
            <div style={{ fontSize: 11, color: 'oklch(0.55 0.16 35)', fontWeight: 700 }}>3 hazır →</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <RewardChip icon="☕" label="Qəhvə kuponu" sub="7 gün ritm" ready/>
            <RewardChip icon="📖" label="Kitab seçimi" sub="14 gün ritm" ready/>
            <RewardChip icon="🌿" label="+1 gün məz." sub="60 gün ritm" locked progress={20/60}/>
          </div>
        </div>

        {/* Recent kudos */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Bu həftə təşəkkürlər</div>
            <div style={{ fontSize: 11, color: 'oklch(0.50 0.14 320)', fontWeight: 700 }}>2 yeni</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <KudoRow from="Cavid Hüseynov" tag="Komanda dayağı" text="Spec-imi yoxlayıb 3 yeri göstərdin — vaxtımı qoruyub saxladın." color="oklch(0.50 0.14 320)"/>
            <KudoRow from="Rəşad Quliyev" tag="Yaradıcılıq" text="Onboarding flow-undakı detallar fərq yaratdı." color="oklch(0.55 0.16 35)"/>
          </div>
        </div>
      </div>
    </PhoneShell2>
  );
}

function RewardChip({ icon, label, sub, ready, locked, progress }) {
  return (
    <div style={{
      flex: 1, padding: 10, borderRadius: 12,
      background: ready ? 'oklch(0.96 0.04 35)' : 'oklch(0.96 0.01 60)',
      border: `1px solid ${ready ? 'oklch(0.88 0.06 35)' : 'oklch(0.92 0.01 60)'}`,
      opacity: locked ? 0.7 : 1, position: 'relative',
    }}>
      <div style={{ fontSize: 22, lineHeight: 1 }}>{icon}</div>
      <div style={{ fontSize: 11, fontWeight: 700, marginTop: 6, lineHeight: 1.2 }}>{label}</div>
      <div style={{ fontSize: 9.5, color: 'oklch(0.5 0.02 60)', marginTop: 2 }}>{sub}</div>
      {locked && progress != null && (
        <div style={{ marginTop: 6, height: 3, background: 'oklch(0.90 0.01 60)', borderRadius: 2 }}>
          <div style={{ width: `${progress * 100}%`, height: '100%', background: 'oklch(0.65 0.18 35)', borderRadius: 2 }}/>
        </div>
      )}
    </div>
  );
}

function KudoRow({ from, tag, text, color }) {
  return (
    <div style={{ display: 'flex', gap: 10 }}>
      <window.Avatar name={from} size={28}/>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700 }}>{from}</div>
          <div style={{ fontSize: 9.5, padding: '2px 6px', borderRadius: 4, background: `color-mix(in oklch, ${color} 12%, white)`, color, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>{tag}</div>
        </div>
        <div style={{ fontSize: 12, color: '#1a1410', lineHeight: 1.5 }}>{text}</div>
      </div>
    </div>
  );
}

// Screen: Weekly Wrap — Spotify Wrapped style
function EmployeeWeeklyWrap() {
  return (
    <PhoneShell2 time="17:48">
      <div style={{ flex: 1, padding: '6px 22px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: 'oklch(0.55 0.16 35)', textTransform: 'uppercase' }}>Həftəlik xülasə · 20-26 Apr</div>

        <div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 30, lineHeight: 1.1, letterSpacing: -0.7, fontWeight: 500 }}>
            Bu həftə sənin<br/><span style={{ color: 'oklch(0.55 0.16 35)' }}>odaqlı həftən</span> oldu.
          </div>
          <div style={{ fontSize: 13, color: 'oklch(0.45 0.02 60)', marginTop: 6, lineHeight: 1.5 }}>5 gün işlədin · 38.5 saat · keçən həftədən +1.5 saat</div>
        </div>

        {/* Big stat */}
        <div style={{ background: 'linear-gradient(135deg, oklch(0.20 0.04 35), oklch(0.22 0.06 50))', borderRadius: 18, padding: 20, color: 'oklch(0.96 0.02 35)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -10, top: -10, fontSize: 90, color: 'oklch(0.45 0.16 35 / 0.4)', lineHeight: 1 }}>✦</div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.7 }}>Ən uzun fokus</div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 44, lineHeight: 1, letterSpacing: -1.5, fontWeight: 500, marginTop: 8 }}>4s 05dəq</div>
            <div style={{ fontSize: 12.5, opacity: 0.8, marginTop: 6 }}>Çərşənbə günü, fasiləsiz · onboarding flow üzərində</div>
          </div>
        </div>

        {/* Mini grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <WrapTile label="Ən erkən gəliş" value="08:14" sub="Salı" tone="oklch(0.50 0.10 155)"/>
          <WrapTile label="Vaxtında" value="4/5" sub="gün" tone="oklch(0.55 0.16 35)"/>
          <WrapTile label="Görüş" value="6s 30" sub="ümumi" tone="oklch(0.50 0.14 320)"/>
          <WrapTile label="Fokus blok" value="11" sub="bitirildi" tone="oklch(0.50 0.12 240)"/>
        </div>

        {/* Mood */}
        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Hisslərin</div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 40, marginBottom: 4 }}>
            {[3,4,4,5,4].map((m,i) => (
              <div key={i} style={{ flex: 1, height: `${m * 20}%`, background: 'oklch(0.65 0.16 50)', borderRadius: 3 }}/>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'oklch(0.5 0.02 60)' }}>
            <span>Be</span><span>Çə</span><span>Ç.A</span><span>Cü</span><span>C.A</span>
          </div>
          <div style={{ fontSize: 12, color: '#1a1410', marginTop: 10, lineHeight: 1.5 }}>
            <b>Ən odaqlı:</b> Çərşənbə · <b>Ən yorğun:</b> Bazar ertəsi səhəri
          </div>
        </div>

        {/* Reward earned */}
        <div style={{ background: 'oklch(0.96 0.04 35)', borderRadius: 14, padding: 14, border: '1.5px solid oklch(0.65 0.18 35)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>☕</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.55 0.16 35)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Bu həftəki mükafatın</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>Qəhvə kuponu açıldı</div>
            <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)' }}>Mükafatlar bölməsində götür →</div>
          </div>
        </div>
      </div>
    </PhoneShell2>
  );
}

function WrapTile({ label, value, sub, tone }) {
  return (
    <div style={{ background: 'white', borderRadius: 14, padding: 12, border: '1px solid oklch(0.92 0.01 60)' }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.1, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: '"Fraunces", serif', fontSize: 24, fontWeight: 600, letterSpacing: -0.6, color: tone, marginTop: 4, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'oklch(0.5 0.02 60)', marginTop: 2 }}>{sub}</div>
    </div>
  );
}

// Screen: Badges & milestones
function EmployeeBadges() {
  const badges = window.BADGES || [];
  return (
    <PhoneShell2 time="14:35">
      <div style={{ flex: 1, padding: '6px 22px 28px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: 'oklch(0.5 0.02 60)', textTransform: 'uppercase' }}>Nişanlarım</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 26, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500, marginTop: 4 }}>4 açılıb · 2 yolda</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {badges.map(b => (
            <div key={b.id} style={{
              padding: 14, borderRadius: 14,
              background: b.unlocked ? 'white' : 'oklch(0.96 0.01 60)',
              border: b.unlocked ? '1px solid oklch(0.92 0.01 60)' : '1px dashed oklch(0.85 0.01 60)',
              opacity: b.unlocked ? 1 : 0.55,
              display: 'flex', flexDirection: 'column', gap: 4,
            }}>
              <div style={{ fontSize: 28, lineHeight: 1, color: b.unlocked ? 'oklch(0.55 0.16 35)' : 'oklch(0.6 0 0)' }}>{b.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6 }}>{b.name}</div>
              <div style={{ fontSize: 11, color: 'oklch(0.5 0.02 60)', lineHeight: 1.4 }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'oklch(0.96 0.03 240)', borderRadius: 12, padding: 14, border: '1px solid oklch(0.90 0.03 240)', fontSize: 12, lineHeight: 1.5, color: 'oklch(0.30 0.10 240)' }}>
          <b>Niyə nişanlar?</b> Cəzalandırma deyil, qeyd. Sənin öz ritmini görəsən və zaman keçdikcə özünlə müqayisə edəsən.
        </div>
      </div>
    </PhoneShell2>
  );
}

window.EmployeePersonalDashboard = EmployeePersonalDashboard;
window.EmployeeWeeklyWrap = EmployeeWeeklyWrap;
window.EmployeeBadges = EmployeeBadges;
