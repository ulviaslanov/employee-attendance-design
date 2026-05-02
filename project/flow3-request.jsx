// Flow 3 — Remote/leave request flow
// Single channel: no CEO-DM bypass. HR sees everything.

function RequestForm() {
  return (
    <div style={{ width: 390, height: 844, background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 44, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
        <span>10:24</span><span style={{ fontSize: 11 }}>●●● 5G ▮▮▮▮</span>
      </div>
      <div style={{ flex: 1, padding: '6px 22px 28px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: 1.4, color: 'oklch(0.50 0.12 240)', textTransform: 'uppercase' }}>Yeni sorğu</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 26, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500, marginTop: 4 }}>Nə üçün icazə?</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { k: 'remote', icon: '⌂', label: 'Uzaqdan iş', sel: true,  c: 'oklch(0.50 0.12 240)' },
            { k: 'leave',  icon: '○', label: 'Məzuniyyət', sel: false, c: 'oklch(0.45 0.02 60)' },
            { k: 'sick',   icon: '+', label: 'Xəstəlik',   sel: false, c: 'oklch(0.55 0.15 75)' },
            { k: 'short',  icon: '◔', label: 'Qısa icazə', sel: false, c: 'oklch(0.45 0.02 60)' },
          ].map(o => (
            <div key={o.k} style={{
              padding: 14, borderRadius: 12,
              background: o.sel ? 'color-mix(in oklch, ' + o.c + ' 8%, white)' : 'white',
              border: o.sel ? `1.5px solid ${o.c}` : '1px solid oklch(0.92 0.01 60)',
              display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: `color-mix(in oklch, ${o.c} 12%, white)`, color: o.c, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{o.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, marginTop: 4 }}>{o.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Nə vaxt?</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['Bu gün','Sabah','Cümə','Seç...'].map((d, i) => (
              <div key={i} style={{ flex: 1, padding: '8px 6px', borderRadius: 8, textAlign: 'center', fontSize: 12, fontWeight: 600, background: i === 1 ? 'oklch(0.50 0.12 240)' : 'oklch(0.96 0.01 60)', color: i === 1 ? 'white' : '#1a1410' }}>{d}</div>
            ))}
          </div>
          <div style={{ fontSize: 11.5, color: 'oklch(0.5 0.02 60)', marginTop: 10 }}>27 Aprel, Bazar ertəsi · 1 gün</div>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Səbəb · ixtiyari</div>
          <div style={{ fontSize: 13, color: '#1a1410', lineHeight: 1.5 }}>Konsentrasiya tələb edən dizayn işi var — sabaha presentation hazırlayıram.</div>
        </div>

        <div style={{ background: 'oklch(0.96 0.03 240)', borderRadius: 12, padding: 12, border: '1px solid oklch(0.90 0.03 240)', display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, lineHeight: 1.5, color: 'oklch(0.30 0.10 240)' }}>
          <window.Icon.Bell s={14} c="oklch(0.50 0.12 240)"/>
          <div>
            <b>Rəşad Quliyev</b> (manager) və <b>HR</b> bildiriş alacaq. Hər kəs eyni kanalda görür.
          </div>
        </div>

        <button style={{ marginTop: 'auto', background: '#1a1410', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none' }}>Sorğunu göndər</button>
      </div>
    </div>
  );
}

function RequestSent() {
  return (
    <div style={{ width: 390, height: 844, background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 44, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
        <span>10:25</span><span style={{ fontSize: 11 }}>●●● 5G ▮▮▮▮</span>
      </div>
      <div style={{ flex: 1, padding: '6px 22px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ background: 'oklch(0.94 0.05 240)', borderRadius: 18, padding: 22, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'oklch(0.85 0.10 240 / 0.5)' }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <window.Icon.Check s={22} c="oklch(0.50 0.12 240)"/>
            </div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 28, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500, color: '#0d1730', marginTop: 14 }}>Sorğun yola düşdü.</div>
            <div style={{ fontSize: 13, color: 'oklch(0.40 0.10 240)', marginTop: 6 }}>Adətən 30 dəqiqəyə cavab gəlir.</div>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>Status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Step label="Göndərildi" sub="10:25 · indi" done active/>
            <Step label="Manager yoxlayır" sub="Rəşad Quliyev · gözlənilir"/>
            <Step label="Cavab" sub="—" muted/>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 14, padding: 14, border: '1px solid oklch(0.92 0.01 60)', fontSize: 13, lineHeight: 1.5 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Sorğun</div>
          <b>Uzaqdan iş</b> · 27 Apr (Bazar ertəsi)<br/>
          <span style={{ color: 'oklch(0.5 0.02 60)' }}>Konsentrasiya tələb edən dizayn işi var...</span>
        </div>

        <button style={{ marginTop: 'auto', background: 'transparent', color: '#1a1410', padding: '12px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, border: '1px solid oklch(0.85 0.01 60)' }}>Sorğunu redaktə et / ləğv et</button>
      </div>
    </div>
  );
}

function Step({ label, sub, done, active, muted }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', opacity: muted ? 0.45 : 1 }}>
      <div style={{
        width: 26, height: 26, borderRadius: '50%',
        background: done ? 'oklch(0.50 0.12 240)' : (active ? 'white' : 'oklch(0.96 0.01 60)'),
        border: active && !done ? '2px dashed oklch(0.50 0.12 240)' : (done ? 'none' : '1px solid oklch(0.85 0.01 60)'),
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {done && <window.Icon.Check s={14} c="white"/>}
      </div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 11, color: 'oklch(0.5 0.02 60)' }}>{sub}</div>
      </div>
    </div>
  );
}

// Screen 3: Request approved — employee receives approval notification
function RequestApproved() {
  return (
    <div style={{ width: 390, height: 844, background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 44, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
        <span>10:54</span><span style={{ fontSize: 11 }}>●●● 5G ▮▮▮▮</span>
      </div>
      <div style={{ flex: 1, padding: '6px 22px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Hero — sage/success */}
        <div style={{ background: 'oklch(0.94 0.04 155)', borderRadius: 18, padding: 22, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'oklch(0.85 0.08 155 / 0.5)' }}/>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <window.Icon.Check s={22} c="oklch(0.50 0.10 155)"/>
            </div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 28, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500, color: '#0d1c14', marginTop: 14 }}>
              Sorğun təsdiqləndi.
            </div>
            <div style={{ fontSize: 13, color: 'oklch(0.40 0.10 155)', marginTop: 6 }}>Rəşad Quliyev · 10:53-də qərar verdi</div>
          </div>
        </div>

        {/* Request summary */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)', fontSize: 13, lineHeight: 1.6 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sorğun</div>
          <div><b>Uzaqdan iş</b> · 27 Apr, Bazar ertəsi</div>
          <div style={{ color: 'oklch(0.5 0.02 60)', marginTop: 2 }}>Konsentrasiya tələb edən dizayn işi var...</div>
        </div>

        {/* Manager note */}
        <div style={{ background: 'oklch(0.96 0.03 155)', borderRadius: 12, padding: 14, border: '1px solid oklch(0.90 0.04 155)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.50 0.10 155)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>Rəşadın qeydi</div>
          <div style={{ fontSize: 13, color: '#1a1410', lineHeight: 1.5 }}>
            Sabahkı presentation üçün uğurlar — istəyirsən özəl görüş keçirək?
          </div>
        </div>

        {/* Audit note */}
        <div style={{ background: 'white', borderRadius: 12, padding: 14, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: 'oklch(0.5 0.02 60)', lineHeight: 1.5 }}>
          <window.Icon.Bell s={12} c="oklch(0.50 0.10 155)"/>
          <span>HR bildirildi · Audit log-da qeydə alındı</span>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{ background: '#1a1410', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none' }}>Başa düşdüm</button>
          <button style={{ background: 'transparent', color: '#1a1410', padding: 12, fontSize: 13, fontWeight: 600, border: 'none' }}>Sorğu tarixçəsi →</button>
        </div>
      </div>
    </div>
  );
}

// Screen 4: Request declined — gentle amber tone, not aggressive red
function RequestDeclined() {
  return (
    <div style={{ width: 390, height: 844, background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: 44, padding: '12px 22px', display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700 }}>
        <span>11:02</span><span style={{ fontSize: 11 }}>●●● 5G ▮▮▮▮</span>
      </div>
      <div style={{ flex: 1, padding: '6px 22px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Hero — amber/warm, not aggressive red */}
        <div style={{ background: 'oklch(0.96 0.05 75)', borderRadius: 18, padding: 22, position: 'relative', overflow: 'hidden', border: '1px solid oklch(0.88 0.06 75)' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <window.Icon.X s={20} c="oklch(0.55 0.15 75)"/>
            </div>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 26, lineHeight: 1.15, letterSpacing: -0.5, fontWeight: 500, color: '#1a1410', marginTop: 14 }}>
              Bu dəfə olmadı.
            </div>
            <div style={{ fontSize: 13, color: 'oklch(0.50 0.12 75)', marginTop: 4 }}>Rəşad Quliyev · 11:01-də qərar verdi</div>
          </div>
        </div>

        {/* Request summary */}
        <div style={{ background: 'white', borderRadius: 16, padding: 16, border: '1px solid oklch(0.92 0.01 60)', fontSize: 13, lineHeight: 1.6 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Sorğun</div>
          <div><b>Uzaqdan iş</b> · 27 Apr, Bazar ertəsi</div>
        </div>

        {/* Manager reason — always required for declines */}
        <div style={{ background: 'white', borderRadius: 14, padding: 16, border: '1px solid oklch(0.92 0.01 60)' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Rəşadın izahı</div>
          <div style={{ fontSize: 13, color: '#1a1410', lineHeight: 1.6 }}>
            Sabah şirkət daxili prezentasiya var, fiziki iştirak gözlənilir. Başqa bir gün razılaşa bilərik?
          </div>
        </div>

        {/* Suggest alternative */}
        <div style={{ background: 'oklch(0.96 0.03 240)', borderRadius: 12, padding: 14, border: '1px solid oklch(0.90 0.03 240)', display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12, color: 'oklch(0.30 0.10 240)', lineHeight: 1.5 }}>
          <window.Icon.Calendar s={14} c="oklch(0.50 0.12 240)"/>
          <div>Yeni bir tarix üçün sorğu göndərə bilərsən. Çərşənbə — Cümə tez-tez icazə verilir.</div>
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{ background: '#1a1410', color: 'white', padding: '14px 16px', borderRadius: 12, fontSize: 15, fontWeight: 700, border: 'none' }}>Yeni sorğu göndər</button>
          <button style={{ background: 'transparent', color: '#1a1410', padding: 12, fontSize: 13, fontWeight: 600, border: 'none' }}>Başa düşdüm, bağla</button>
        </div>
      </div>
    </div>
  );
}

window.RequestForm = RequestForm;
window.RequestSent = RequestSent;
window.RequestApproved = RequestApproved;
window.RequestDeclined = RequestDeclined;
