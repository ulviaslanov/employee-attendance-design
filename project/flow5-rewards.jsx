// Flow 5 — Rewards: kudos compose, milestone unlock, rewards catalog, manager spotlight

function KudosCompose() {
  return (
    <div style={{ width: 390, height: 844, background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 44, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
        <span>16:08</span><span style={{ fontSize: 11 }}>●●● 5G ▮▮▮▮</span>
      </div>
      <div style={{ flex: 1, padding: '6px 22px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: 'oklch(0.50 0.14 320)', textTransform: 'uppercase' }}>Kudos göndər</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 26, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500, marginTop: 4 }}>Kim sənə bu həftə kömək etdi?</div>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Kimə</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: 'oklch(0.96 0.03 320)', borderRadius: 10, border: '1px solid oklch(0.88 0.05 320)' }}>
            <window.Avatar name="Cavid Hüseynov" size={32}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Cavid Hüseynov</div>
              <div style={{ fontSize: 10.5, color: 'oklch(0.5 0.02 60)' }}>Senior Backend · Mühəndislik</div>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Hansı dəyər?</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {[
              ['Komanda dayağı', true,  'oklch(0.50 0.14 320)'],
              ['Yaradıcılıq',    false, 'oklch(0.55 0.16 35)'],
              ['Sahiblik',       false, 'oklch(0.50 0.10 155)'],
              ['Sürət',          false, 'oklch(0.50 0.12 240)'],
              ['Şəffaflıq',      false, 'oklch(0.55 0.15 75)'],
              ['Empatiya',       false, 'oklch(0.55 0.15 5)'],
            ].map(([label, sel, color]) => (
              <div key={label} style={{
                padding: '7px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
                background: sel ? color : 'oklch(0.97 0.01 60)',
                color: sel ? 'white' : '#1a1410',
                border: sel ? 'none' : '1px solid oklch(0.92 0.01 60)',
              }}>{label}</div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Niyə</div>
          <div style={{ fontSize: 13, color: '#1a1410', lineHeight: 1.5 }}>Spec-imi yoxlayıb 3 yeri göstərdin — vaxtımı qoruyub saxladın. <span style={{ color: 'oklch(0.5 0.02 60)' }}>|</span></div>
        </div>

        <div style={{ background: 'oklch(0.96 0.03 320)', borderRadius: 10, padding: 12, fontSize: 11.5, color: 'oklch(0.40 0.14 320)', lineHeight: 1.5, border: '1px solid oklch(0.90 0.04 320)' }}>
          Kudoslar açıqdır — komanda görür. <b>Dəyər tag-i</b> şirkət dəyərlərinə bağlıdır, HR illik retrospektivdə bunları analiz edir.
        </div>

        <button style={{ marginTop: 'auto', background: 'oklch(0.50 0.14 320)', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none' }}>Kudos göndər</button>
      </div>
    </div>
  );
}

function MilestoneUnlock() {
  return (
    <div style={{ width: 390, height: 844, background: 'linear-gradient(180deg, oklch(0.20 0.04 35), oklch(0.16 0.02 35))', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden', color: 'oklch(0.96 0.02 35)' }}>
      <div style={{ height: 44, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: 'oklch(0.96 0.02 35)' }}>
        <span>09:01</span><span style={{ fontSize: 11 }}>●●● 5G ▮▮▮▮</span>
      </div>
      <div style={{ flex: 1, padding: '20px 28px 32px', display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: 'oklch(0.78 0.18 35)', textTransform: 'uppercase' }}>Mərhələ açıldı</div>
        <div style={{ width: 120, height: 120, borderRadius: 28, background: 'linear-gradient(135deg, oklch(0.65 0.18 35), oklch(0.72 0.16 50))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64, color: 'white', boxShadow: '0 20px 50px -12px oklch(0.65 0.18 35 / 0.6)' }}>◆</div>
        <div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 36, lineHeight: 1.1, letterSpacing: -1, fontWeight: 600 }}>30 gün davam</div>
          <div style={{ fontSize: 14, color: 'oklch(0.78 0.10 35)', marginTop: 6, lineHeight: 1.5 }}>Bir ay ardıcıl ritm. Bunu hiss etmək azdır — bu, ardıcıllıqdır.</div>
        </div>

        <div style={{ width: '100%', background: 'oklch(0.30 0.06 35 / 0.5)', borderRadius: 16, padding: 16, border: '1px solid oklch(0.45 0.10 35 / 0.4)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.78 0.10 35)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Bunula açılan mükafat</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
            <div style={{ fontSize: 32 }}>📚</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Kitab seçimi · 40 AZN</div>
              <div style={{ fontSize: 11.5, color: 'oklch(0.78 0.10 35)' }}>Mükafatlar bölməsində götür</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <button style={{ flex: 1, background: 'oklch(0.96 0.04 35)', color: '#5a2510', padding: '14px', borderRadius: 12, fontSize: 14, fontWeight: 700, border: 'none' }}>Mükafata bax</button>
          <button style={{ flex: 1, background: 'transparent', color: 'oklch(0.96 0.02 35)', padding: '14px', borderRadius: 12, fontSize: 14, fontWeight: 600, border: '1px solid oklch(0.45 0.10 35 / 0.5)' }}>Sonra</button>
        </div>
      </div>
    </div>
  );
}

function RewardsCatalog() {
  const items = [
    { icon: '☕', name: 'Qəhvə kuponu',     unlock: '7 gün ritm',    val: '15 AZN', tier: 'kiçik', ready: true },
    { icon: '📚', name: 'Kitab seçimi',     unlock: '14 gün ritm',   val: '40 AZN', tier: 'kiçik', ready: true },
    { icon: '🍽', name: 'Nahar kuponu',     unlock: '20 kudos al',   val: '25 AZN', tier: 'kiçik', ready: true },
    { icon: '🎓', name: 'Onlayn kurs',      unlock: '30 gün ritm',   val: '200 AZN', tier: 'orta', ready: false, prog: 0.66 },
    { icon: '🌿', name: '+1 gün məzuniyyət', unlock: '60 gün ritm',   val: 'tək gün', tier: 'böyük', ready: false, prog: 0.33 },
    { icon: '🎁', name: 'Manager spotlight', unlock: 'manager seçir', val: '100 AZN', tier: 'orta', ready: false, manager: true },
    { icon: '🏖', name: 'Komanda yeməyi',    unlock: 'komanda streak 30g', val: 'birgə', tier: 'orta', team: true, ready: false, prog: 0.5 },
    { icon: '✦',  name: 'İllik nailiyyət',   unlock: '1 il davam',    val: 'şəxsi paket', tier: 'böyük', ready: false, prog: 0.05 },
  ];
  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '20px 28px', borderBottom: '1px solid oklch(0.92 0.01 60)', background: 'white' }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.55 0.16 35)', textTransform: 'uppercase' }}>Mükafat kataloqu</div>
        <div style={{ fontFamily: '"Fraunces", serif', fontSize: 30, lineHeight: 1.1, letterSpacing: -0.7, fontWeight: 500, marginTop: 4 }}>Sənin nailiyyətlərin · sənin seçimin</div>
      </div>
      <div style={{ flex: 1, padding: 28, overflow: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, alignContent: 'flex-start' }}>
        {items.map((r, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 14, padding: 18,
            border: r.ready ? '1.5px solid oklch(0.65 0.18 35)' : '1px solid oklch(0.92 0.01 60)',
            position: 'relative', display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {r.ready && <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 9.5, padding: '3px 8px', borderRadius: 999, background: 'oklch(0.65 0.18 35)', color: 'white', fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase' }}>Hazır</span>}
            <div style={{ fontSize: 36, lineHeight: 1 }}>{r.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
              <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', marginTop: 2 }}>{r.unlock}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'oklch(0.4 0.02 60)', marginTop: 4 }}>
              <span style={{ padding: '2px 7px', background: 'oklch(0.96 0.01 60)', borderRadius: 4, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase', fontSize: 9.5 }}>{r.tier}</span>
              <b style={{ color: '#1a1410' }}>{r.val}</b>
            </div>
            {r.prog != null && (
              <div style={{ height: 4, background: 'oklch(0.94 0.01 60)', borderRadius: 2, marginTop: 4 }}>
                <div style={{ width: `${r.prog * 100}%`, height: '100%', background: 'oklch(0.65 0.18 35)', borderRadius: 2 }}/>
              </div>
            )}
            {r.manager && <div style={{ fontSize: 10.5, color: 'oklch(0.50 0.14 320)', fontWeight: 700 }}>↳ Manager spotlight ilə</div>}
            {r.team && <div style={{ fontSize: 10.5, color: 'oklch(0.50 0.10 155)', fontWeight: 700 }}>↳ Komanda hədəfi</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagerSpotlight() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '20px 28px', borderBottom: '1px solid oklch(0.92 0.01 60)', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.50 0.14 320)', textTransform: 'uppercase' }}>Aylıq spotlight</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 28, lineHeight: 1.1, letterSpacing: -0.6, fontWeight: 500, marginTop: 4 }}>Bu ay kim öndə?</div>
        </div>
        <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)' }}>Aprel 2026 · 4 gün qalıb</div>
      </div>
      <div style={{ flex: 1, padding: 28, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Sistem önə çıxardığı 3 nəfər</div>
          {[
            { e: window.byId('e02'), why: '4 kudos aldı · 38 saat fokus', sel: true },
            { e: window.byId('o01'), why: '89 günlük ritm · komandaya dəstək', sel: false },
            { e: window.byId('s02'), why: 'Açıq peer feedback üzərində iş', sel: false },
          ].map(({ e, why, sel }) => e && (
            <div key={e.id} style={{
              background: 'white', borderRadius: 14, padding: 16,
              border: sel ? '1.5px solid oklch(0.50 0.14 320)' : '1px solid oklch(0.92 0.01 60)',
              display: 'flex', gap: 14, alignItems: 'center',
            }}>
              <window.Avatar name={e.name} size={48}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{e.name}</div>
                <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)' }}>{e.role}</div>
                <div style={{ fontSize: 12, color: 'oklch(0.40 0.14 320)', marginTop: 4 }}>{why}</div>
              </div>
              {sel && <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'oklch(0.50 0.14 320)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><window.Icon.Check s={14} c="white"/></div>}
            </div>
          ))}
          <div style={{ background: 'oklch(0.96 0.03 240)', borderRadius: 12, padding: 14, border: '1px solid oklch(0.90 0.03 240)', fontSize: 12, color: 'oklch(0.30 0.10 240)', lineHeight: 1.5 }}>
            <b>Növbəlilik:</b> Cavid son 6 ayda spotlight almayıb. Sistem ədalətli rotasiya təklif edir — eyni nəfər il ərzində 1 dəfədən çox seçilmir.
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: 14, padding: 18, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Mükafat seç</div>
          {[
            { icon: '🎁', name: 'Hədiyyə kartı · 100 AZN', sel: true },
            { icon: '📚', name: 'Kitab paketi', sel: false },
            { icon: '🌿', name: '+1 gün məzuniyyət', sel: false },
            { icon: '🎟', name: 'Konfrans bileti', sel: false },
          ].map((o, i) => (
            <div key={i} style={{
              padding: 12, borderRadius: 10,
              background: o.sel ? 'oklch(0.96 0.03 320)' : 'oklch(0.97 0.01 60)',
              border: o.sel ? '1.5px solid oklch(0.50 0.14 320)' : '1px solid oklch(0.93 0.01 60)',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <div style={{ fontSize: 22 }}>{o.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{o.name}</div>
            </div>
          ))}
          <div style={{ marginTop: 4, fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Şəxsi qeyd · ixtiyari</div>
          <div style={{ fontSize: 12.5, color: '#1a1410', padding: 12, background: 'oklch(0.97 0.01 60)', borderRadius: 8, lineHeight: 1.5 }}>
            <span style={{ color: 'oklch(0.5 0.02 60)' }}>Cavid, bu ay komandaya çox kömək etdin — review-larin xüsusilə dəyərli idi.</span>
          </div>
          <button style={{ background: 'oklch(0.50 0.14 320)', color: 'white', padding: '14px', borderRadius: 10, fontSize: 14, fontWeight: 700, border: 'none' }}>Spotlight elan et</button>
          <div style={{ fontSize: 10.5, color: 'oklch(0.5 0.02 60)', textAlign: 'center' }}>Komanda kanalında elan olunur · audit log saxlanır</div>
        </div>
      </div>
    </div>
  );
}

window.KudosCompose = KudosCompose;
window.MilestoneUnlock = MilestoneUnlock;
window.RewardsCatalog = RewardsCatalog;
window.ManagerSpotlight = ManagerSpotlight;
