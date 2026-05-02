// Flow 6 — HR/Admin: company dashboard, policies, audit log
// Trust + visibility. Single source of truth.

function HRCompanyDashboard() {
  const k = window.COMPANY_KPIS;
  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '20px 28px', borderBottom: '1px solid oklch(0.92 0.01 60)', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.5 0.02 60)', textTransform: 'uppercase' }}>HR · Şirkət canlı</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 30, lineHeight: 1.1, letterSpacing: -0.7, fontWeight: 500, marginTop: 4 }}>Bugün 54 nəfərdən...</div>
        </div>
        <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 60)' }}>Şənbə · 26 Aprel · 14:32 <span style={{ color: 'oklch(0.62 0.13 155)' }}>● canlı</span></div>
      </div>

      <div style={{ flex: 1, padding: 24, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 10 }}>
          {[
            ['Ofisdə', k.inOffice, 'oklch(0.62 0.13 155)'],
            ['Uzaqdan', k.remote, 'oklch(0.60 0.14 240)'],
            ['Görüşdə', k.meeting, 'oklch(0.60 0.16 320)'],
            ['Çöldə', k.field, 'oklch(0.60 0.16 320)'],
            ['Məzun.', k.off, 'oklch(0.55 0.03 60)'],
            ['Xəstə', k.sick, 'oklch(0.55 0.15 75)'],
            ['Hələ yox', k.notyet, 'oklch(0.55 0.03 60)'],
            ['Açıq sorğu', k.pendingReqs, 'oklch(0.65 0.18 35)'],
          ].map(([l, v, c], i) => (
            <div key={i} style={{ background: 'white', borderRadius: 12, padding: 14, border: '1px solid oklch(0.93 0.01 60)' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.1, textTransform: 'uppercase' }}>{l}</div>
              <div style={{ fontFamily: '"Fraunces", serif', fontSize: 28, fontWeight: 600, letterSpacing: -0.6, color: c, lineHeight: 1, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div style={{ background: 'white', borderRadius: 14, padding: 18, border: '1px solid oklch(0.92 0.01 60)' }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Komandalar üzrə</div>
            {(window.TEAMS || []).map(t => (
              <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid oklch(0.96 0.01 60)' }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                <div style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden', background: 'oklch(0.96 0.01 60)' }}>
                  <div style={{ width: '55%', background: 'oklch(0.62 0.13 155)' }}/>
                  <div style={{ width: '20%', background: 'oklch(0.60 0.14 240)' }}/>
                  <div style={{ width: '10%', background: 'oklch(0.60 0.16 320)' }}/>
                  <div style={{ width: '8%',  background: 'oklch(0.55 0.15 75)' }}/>
                </div>
                <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 60)', textAlign: 'right', fontFamily: '"JetBrains Mono", monospace' }}>{Math.floor(Math.random()*15+8)}</div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: 'oklch(0.5 0.02 60)', marginTop: 10, display: 'flex', gap: 14 }}>
              <span><span style={{ display: 'inline-block', width: 8, height: 8, background: 'oklch(0.62 0.13 155)', borderRadius: 2, marginRight: 4 }}/>Ofisdə</span>
              <span><span style={{ display: 'inline-block', width: 8, height: 8, background: 'oklch(0.60 0.14 240)', borderRadius: 2, marginRight: 4 }}/>Uzaqdan</span>
              <span><span style={{ display: 'inline-block', width: 8, height: 8, background: 'oklch(0.60 0.16 320)', borderRadius: 2, marginRight: 4 }}/>Görüş/çöl</span>
              <span><span style={{ display: 'inline-block', width: 8, height: 8, background: 'oklch(0.55 0.15 75)', borderRadius: 2, marginRight: 4 }}/>Xəstə/məz.</span>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 14, padding: 18, border: '1px solid oklch(0.92 0.01 60)' }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.55 0.16 35)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Diqqət istəyən nümunələr</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Pattern title="2 nəfər 14 gündən artıq fasiləsiz işləyir" sub="İlahə M., Toğrul Ə. — yorğunluq siqnalı" tone="oklch(0.55 0.15 75)"/>
              <Pattern title="Satış komandasında uzaqdan iş artıb" sub="Bu həftə +40% — manager ilə danışıq" tone="oklch(0.60 0.14 240)"/>
              <Pattern title="3 sorğu CEO-ya yazışmadan kanal vasitəsilə gəldi" sub="Sistem keçidi uğurlu — köhnə vərdiş azalır" tone="oklch(0.50 0.10 155)"/>
            </div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: 18, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Audit log · son 8 hadisə</div>
          <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr 80px', gap: 8, fontSize: 11.5 }}>
            {(window.AUDIT || []).map((a, i) => (
              <React.Fragment key={i}>
                <div style={{ fontFamily: '"JetBrains Mono", monospace', color: 'oklch(0.5 0.02 60)' }}>{a.time}</div>
                <div><b>{a.actor}</b></div>
                <div style={{ color: '#1a1410' }}>{a.action} <span style={{ color: 'oklch(0.5 0.02 60)' }}>· {a.target}</span></div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase', color: 'oklch(0.5 0.02 60)' }}>{a.tone}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pattern({ title, sub, tone }) {
  return (
    <div style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: '1px solid oklch(0.96 0.01 60)' }}>
      <div style={{ width: 4, alignSelf: 'stretch', background: tone, borderRadius: 2 }}/>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', marginTop: 2 }}>{sub}</div>
      </div>
    </div>
  );
}

function HRPolicies() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '20px 28px', borderBottom: '1px solid oklch(0.92 0.01 60)', background: 'white' }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.5 0.02 60)', textTransform: 'uppercase' }}>HR · Siyasətlər</div>
        <div style={{ fontFamily: '"Fraunces", serif', fontSize: 28, lineHeight: 1.1, letterSpacing: -0.6, fontWeight: 500, marginTop: 4 }}>Sistem qaydaları · tək mənbə</div>
      </div>
      <div style={{ flex: 1, padding: 28, overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { t: 'İş başlama saatı', v: '09:00', desc: 'Vaxtında sayılması üçün son hədd. 09:15-dən sonra "geç" markeri (cəza yox, sadəcə qeyd).', critical: true },
            { t: 'Uzaqdan iş icazəsi', v: 'Manager + HR', desc: 'Hər iki tərəfə avtomatik bildiriş. Manager 30dəq cavab verməsə, HR yoxlayır.', critical: false },
            { t: 'Aylıq uzaqdan limit', v: '8 gün/ay', desc: 'Daha çoxu üçün manager + HR birlikdə qərar. Komandanın özü razılaşa bilər.', critical: false },
            { t: 'Kudos rotasiyası', v: 'İllik 1 dəfə', desc: 'Eyni nəfər il ərzində bir dəfə spotlight ala bilər — ədalətli paylanma.', critical: false },
            { t: 'Streak qırılma siyasəti', v: 'Üzrlü = qorunur', desc: 'Xəstəlik / məzuniyyət streak-i qırmır. Heç bir cəza dinamikası.', critical: true },
            { t: 'Görünürlük', v: 'Açıq · audit ilə', desc: 'Manager komandasını görür · HR hamını görür · əməkdaşlar bir-birinin statusunu (yer yox, niyə yox) görür.', critical: true },
          ].map((p, i) => (
            <div key={i} style={{ background: 'white', borderRadius: 12, padding: 16, border: '1px solid oklch(0.92 0.01 60)', display: 'grid', gridTemplateColumns: '1fr 140px 32px', gap: 16, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{p.t}</div>
                  {p.critical && <span style={{ fontSize: 9, padding: '2px 6px', background: 'oklch(0.96 0.05 75)', color: 'oklch(0.55 0.15 75)', borderRadius: 4, fontWeight: 800, letterSpacing: 0.6 }}>KRİTİK</span>}
                </div>
                <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 60)', marginTop: 4, lineHeight: 1.5 }}>{p.desc}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1410', fontFamily: '"JetBrains Mono", monospace' }}>{p.v}</div>
              <div style={{ fontSize: 18, color: 'oklch(0.5 0.02 60)' }}>›</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'oklch(0.20 0.02 35)', color: 'oklch(0.96 0.02 35)', borderRadius: 14, padding: 18 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, textTransform: 'uppercase', color: 'oklch(0.78 0.10 35)' }}>Sistem fəlsəfəsi</div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 22, lineHeight: 1.2, letterSpacing: -0.4, fontWeight: 500, marginTop: 8 }}>"Cəzalandırma deyil, fərqindəlik."</div>
            <div style={{ fontSize: 12.5, opacity: 0.8, marginTop: 10, lineHeight: 1.5 }}>Bu sistem güvən üzərinə qurulub. Görünürlük insanlara öz ritmlərini görmək imkanı verir — özlərini özləri ilə müqayisə etsinlər.</div>
          </div>
          <div style={{ background: 'white', borderRadius: 14, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Bu ay dəyişiklik</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10, fontSize: 12, lineHeight: 1.5 }}>
              <div><b>22 Apr</b> · Aydan R. uzaqdan limiti 6 → 8 günə qaldırdı <span style={{ color: 'oklch(0.5 0.02 60)' }}>· komanda razılığı ilə</span></div>
              <div><b>15 Apr</b> · Streak qırılma siyasəti yumşaldıldı <span style={{ color: 'oklch(0.5 0.02 60)' }}>· üzrlü qaib qorunur</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.HRCompanyDashboard = HRCompanyDashboard;
window.HRPolicies = HRPolicies;
