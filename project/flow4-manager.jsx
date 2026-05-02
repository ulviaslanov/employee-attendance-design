// Flow 4 — Manager team live status (desktop) + Flow 5 request inbox

function ManagerTeamLive() {
  const team = (window.EMPLOYEES || []).filter(e => ['eng'].includes(e.team) || true).slice(0, 12);
  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '20px 28px', borderBottom: '1px solid oklch(0.92 0.01 60)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', background: 'white' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.5 0.02 60)', textTransform: 'uppercase' }}>Komandam · canlı</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 30, lineHeight: 1.1, letterSpacing: -0.7, fontWeight: 500, marginTop: 4 }}>Bu gün hardadırlar?</div>
        </div>
        <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'oklch(0.5 0.02 60)' }}>
          <div>Şənbə · 26 Aprel · 14:32</div>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'oklch(0.62 0.13 155)', alignSelf: 'center' }}/>
          <div>canlı</div>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ padding: '16px 28px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, background: 'white', borderBottom: '1px solid oklch(0.92 0.01 60)' }}>
        <Kpi label="Ofisdə" v="7" tone="oklch(0.62 0.13 155)" big/>
        <Kpi label="Uzaqdan" v="3" tone="oklch(0.60 0.14 240)" big/>
        <Kpi label="Görüşdə" v="1" tone="oklch(0.60 0.16 320)"/>
        <Kpi label="Çöldə" v="1" tone="oklch(0.60 0.16 320)"/>
        <Kpi label="Məz/xəstə" v="2" tone="oklch(0.55 0.03 60)"/>
        <Kpi label="Açıq sorğu" v="3" tone="oklch(0.65 0.18 35)" highlight/>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 320px', overflow: 'hidden' }}>
        <div style={{ padding: 20, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {team.map(e => <PersonRow key={e.id} e={e}/>)}
        </div>
        <div style={{ borderLeft: '1px solid oklch(0.92 0.01 60)', padding: 20, background: 'oklch(0.97 0.01 60)', overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Bu gün xronologiya</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10 }}>
              {(window.AUDIT || []).slice(0, 6).map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 11.5 }}>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', color: 'oklch(0.5 0.02 60)', minWidth: 36 }}>{a.time}</div>
                  <div style={{ color: '#1a1410', lineHeight: 1.45 }}><b>{a.actor}</b> {a.action}<br/><span style={{ color: 'oklch(0.5 0.02 60)' }}>{a.target}</span></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: 12, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.55 0.16 35)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Bu həftə təşəkkür göndər</div>
            <div style={{ fontSize: 12, color: 'oklch(0.4 0.02 60)', marginTop: 6, lineHeight: 1.5 }}>Komandadan kim sənə kömək etdi? 3 nəfərə kudos göndərmək vaxtıdır.</div>
            <button style={{ marginTop: 10, width: '100%', padding: '10px 12px', background: '#1a1410', color: 'white', borderRadius: 8, fontSize: 12, fontWeight: 700, border: 'none' }}>Kudos göndər</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, v, tone, big, highlight }) {
  return (
    <div style={{
      padding: 12, borderRadius: 10,
      background: highlight ? 'oklch(0.96 0.04 35)' : 'oklch(0.97 0.01 60)',
      border: highlight ? '1px solid oklch(0.85 0.06 35)' : '1px solid oklch(0.93 0.01 60)',
    }}>
      <div style={{ fontSize: 10, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.1, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontFamily: '"Fraunces", serif', fontSize: big ? 30 : 24, fontWeight: 600, letterSpacing: -0.7, color: tone, lineHeight: 1, marginTop: 4 }}>{v}</div>
    </div>
  );
}

function PersonRow({ e }) {
  const team = window.teamById(e.team);
  return (
    <div style={{ background: 'white', borderRadius: 12, padding: '12px 16px', display: 'grid', gridTemplateColumns: '36px 1fr 120px 140px 90px 80px', gap: 14, alignItems: 'center', border: '1px solid oklch(0.93 0.01 60)' }}>
      <window.Avatar name={e.name} size={36}/>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: -0.1 }}>{e.name}{e.isLead && <span style={{ fontSize: 10, marginLeft: 6, padding: '2px 6px', background: 'oklch(0.96 0.01 60)', borderRadius: 4, color: 'oklch(0.5 0.02 60)', fontWeight: 600, letterSpacing: 0.3 }}>LEAD</span>}</div>
        <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)' }}>{e.role} · {team?.name}</div>
      </div>
      <div><window.StatusChip status={e.status} size="sm"/></div>
      <div style={{ fontSize: 12, color: 'oklch(0.5 0.02 60)' }}>
        {e.arrived ? <><b style={{ color: '#1a1410', fontFamily: '"JetBrains Mono", monospace' }}>{e.arrived}</b> · check-in</> : '—'}
      </div>
      <div style={{ fontSize: 11.5, display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ color: e.streak >= 7 ? 'oklch(0.65 0.18 35)' : 'oklch(0.5 0.02 60)' }}>◆</span>
        <b>{e.streak}</b> <span style={{ color: 'oklch(0.5 0.02 60)' }}>g</span>
      </div>
      <div style={{ fontSize: 11.5, fontFamily: '"JetBrains Mono", monospace', color: 'oklch(0.4 0.02 60)' }}>{e.hoursWeek}s</div>
    </div>
  );
}

// Manager request inbox
function ManagerRequestInbox() {
  const requests = window.REQUESTS || [];
  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'grid', gridTemplateColumns: '380px 1fr', overflow: 'hidden' }}>
      <div style={{ borderRight: '1px solid oklch(0.92 0.01 60)', background: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 22px', borderBottom: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.4, color: 'oklch(0.5 0.02 60)', textTransform: 'uppercase' }}>Sorğu inbox</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 24, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500, marginTop: 2 }}>3 gözləyir</div>
        </div>
        <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6, overflow: 'auto' }}>
          {requests.map((r, i) => {
            const e = window.byId(r.from);
            const sel = i === 0;
            return (
              <div key={r.id} style={{
                padding: 12, borderRadius: 10,
                background: sel ? 'oklch(0.96 0.04 35)' : 'transparent',
                border: sel ? '1px solid oklch(0.85 0.06 35)' : '1px solid transparent',
                display: 'flex', gap: 10, alignItems: 'flex-start', cursor: 'pointer',
              }}>
                <window.Avatar name={e?.name} size={32}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700 }}>{e?.name}</div>
                    <div style={{ fontSize: 10.5, color: 'oklch(0.5 0.02 60)' }}>{r.sent}</div>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', marginTop: 2 }}>
                    <b style={{ color: '#1a1410' }}>{window.REQUEST_TYPES[r.type]?.label}</b> · {r.range}
                  </div>
                  <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                    {r.status === 'pending' ? <span style={{ fontSize: 9.5, padding: '2px 6px', background: 'oklch(0.96 0.05 75)', color: 'oklch(0.55 0.15 75)', borderRadius: 4, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>Gözləyir</span>
                                              : <span style={{ fontSize: 9.5, padding: '2px 6px', background: 'oklch(0.96 0.03 155)', color: 'oklch(0.50 0.10 155)', borderRadius: 4, fontWeight: 700, letterSpacing: 0.4, textTransform: 'uppercase' }}>Təsdiqli</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ padding: 32, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {(() => {
          const r = requests[0];
          const e = window.byId(r.from);
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <window.Avatar name={e?.name} size={56}/>
                <div>
                  <div style={{ fontFamily: '"Fraunces", serif', fontSize: 26, fontWeight: 500, letterSpacing: -0.5 }}>{e?.name}</div>
                  <div style={{ fontSize: 13, color: 'oklch(0.5 0.02 60)' }}>{e?.role}</div>
                </div>
              </div>
              <div style={{ background: 'white', borderRadius: 14, padding: 18, border: '1px solid oklch(0.92 0.01 60)' }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sorğu</div>
                <div style={{ fontFamily: '"Fraunces", serif', fontSize: 22, fontWeight: 500, letterSpacing: -0.4 }}>{window.REQUEST_TYPES[r.type]?.label} · {r.range}</div>
                <div style={{ fontSize: 13.5, color: '#1a1410', marginTop: 10, lineHeight: 1.6 }}>{r.reason}</div>
              </div>
              <div style={{ background: 'oklch(0.96 0.03 155)', borderRadius: 12, padding: 14, border: '1px solid oklch(0.90 0.04 155)' }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.50 0.10 155)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Sistem konteksti</div>
                <div style={{ fontSize: 12.5, color: '#1a1410', lineHeight: 1.5, marginTop: 6 }}>
                  Bu ay <b>2 dəfə</b> uzaqdan işləyib · həftəlik norma <b>40 saatdan</b> aşağı düşməyib · komandada o gün böyük görüş yoxdur
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ flex: 1, padding: '14px 16px', background: 'oklch(0.50 0.10 155)', color: 'white', borderRadius: 10, fontSize: 14, fontWeight: 700, border: 'none' }}>Təsdiqlə</button>
                <button style={{ flex: 1, padding: '14px 16px', background: 'white', color: '#1a1410', borderRadius: 10, fontSize: 14, fontWeight: 600, border: '1px solid oklch(0.85 0.01 60)' }}>Daha çox məlumat</button>
                <button style={{ padding: '14px 16px', background: 'transparent', color: 'oklch(0.55 0.15 75)', borderRadius: 10, fontSize: 14, fontWeight: 600, border: '1px solid oklch(0.85 0.01 60)' }}>Rədd</button>
              </div>
              <div style={{ background: 'white', borderRadius: 12, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Bu sorğu kimə görünür</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                  {[{ n: 'Sən (Manager)', t: 'qərar verir' }, { n: 'Aydan R. (HR)', t: 'görür, audit' }, { n: 'Mələk T.', t: 'cavabı görür' }].map((p, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'center' }}>
                      <window.Avatar name={p.n} size={26}/>
                      <div>
                        <div style={{ fontSize: 11.5, fontWeight: 700 }}>{p.n}</div>
                        <div style={{ fontSize: 10, color: 'oklch(0.5 0.02 60)' }}>{p.t}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}

window.ManagerTeamLive = ManagerTeamLive;
window.ManagerRequestInbox = ManagerRequestInbox;
