// Design philosophy + system principles — first artboard
// "Cəzalandırma deyil, fərqindəlik."

function ManifestoBoard() {
  return (
    <div style={{ width: '100%', height: '100%', background: 'oklch(0.20 0.02 35)', color: 'oklch(0.96 0.02 35)', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', display: 'grid', gridTemplateColumns: '1.4fr 1fr', overflow: 'hidden' }}>
      <div style={{ padding: '64px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: '1px solid oklch(0.30 0.04 35 / 0.6)' }}>
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: 2.4, color: 'oklch(0.78 0.18 35)', textTransform: 'uppercase' }}>Axın 0 · Sistem prinsipi</div>
          <div style={{ fontFamily: '"Fraunces", serif', fontSize: 64, lineHeight: 1.02, letterSpacing: -2, fontWeight: 500, marginTop: 18 }}>
            Cəzalandırma deyil,<br/>
            <span style={{ fontStyle: 'italic', color: 'oklch(0.78 0.18 35)' }}>fərqindəlik.</span>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.55, color: 'oklch(0.85 0.04 35)', marginTop: 28, maxWidth: 540 }}>
            Bu sistem əməkdaşı izləmək üçün deyil — özünə güzgü tutmaq üçündür.
            Görünürlük güvən üzərindədir. Hər kəs öz ritmini görsün, özünü özü ilə müqayisə etsin.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28, marginTop: 56, fontSize: 12, color: 'oklch(0.78 0.04 35)' }}>
          <span>Code Academy heritage</span>
          <span>·</span>
          <span>Azərbaycan dili</span>
          <span>·</span>
          <span>54 nəfər · 5 komanda</span>
          <span>·</span>
          <span>Aprel 2026</span>
        </div>
      </div>

      <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: 1.6, color: 'oklch(0.78 0.10 35)', textTransform: 'uppercase' }}>5 prinsip</div>
        {[
          ['01', 'Tək kanal', 'Bütün sorğular sistemdən keçir. CEO-ya birbaşa yazışma yox — manager + HR ilk növbədə görsün.'],
          ['02', 'Üzrlü qaib qorunur', 'Xəstəlik / məzuniyyət streak-i qırmır. Sistem insan kimi başa düşür.'],
          ['03', 'Görünürlük açıq, audit ilə', 'Hər kəs bilir kim hardadır — niyə yox. Hər hadisə audit log-undadır.'],
          ['04', 'Mükafat ardıcıllığa', '"Ən erkən gələn" deyil, "öz ritmini saxlayan". Müqayisə özün-özünlədir.'],
          ['05', 'Manager əlləşmir', 'Auto-təsdiq, smart default, 30 dəq cavab gözləməsi. HR yedək kimi durur.'],
        ].map(([n, t, d]) => (
          <div key={n} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 14, paddingBottom: 18, borderBottom: '1px solid oklch(0.30 0.04 35 / 0.5)' }}>
            <div style={{ fontFamily: '"Fraunces", serif', fontSize: 22, fontWeight: 500, color: 'oklch(0.78 0.18 35)', letterSpacing: -0.5 }}>{n}</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'oklch(0.96 0.02 35)' }}>{t}</div>
              <div style={{ fontSize: 12.5, lineHeight: 1.55, color: 'oklch(0.78 0.04 35)', marginTop: 4 }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemMapBoard() {
  // Visual system map: who sees what, where data flows
  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', padding: '40px 48px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.6, color: 'oklch(0.55 0.16 35)', textTransform: 'uppercase' }}>Sistem xəritəsi</div>
        <div style={{ fontFamily: '"Fraunces", serif', fontSize: 36, lineHeight: 1.08, letterSpacing: -0.8, fontWeight: 500, marginTop: 6 }}>3 rol · 1 mənbə · sıfır siyasət ziddiyyəti</div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
        {[
          {
            role: 'Əməkdaş',
            color: 'oklch(0.50 0.12 240)',
            bg: 'oklch(0.96 0.03 240)',
            sees: ['Öz check-in/out', 'Şəxsi tarixçə', 'Komanda statusu (yer)', 'Öz weekly wrap', 'Mükafatlar', 'Kudos'],
            does: ['Check-in (Wi-Fi/GPS/manual)', 'Sorğu göndər', 'Kudos ver/al', 'Mükafat seç'],
          },
          {
            role: 'Manager',
            color: 'oklch(0.50 0.14 320)',
            bg: 'oklch(0.96 0.03 320)',
            sees: ['Bütün əməkdaş', 'Komanda canlı statusu', 'Komanda performansı', 'Açıq sorğular', 'Diqqət siqnalları'],
            does: ['Sorğu təsdiq/rədd', 'Spotlight elan', '1-on-1 qeyd', 'Komanda OKR yenilə'],
          },
          {
            role: 'HR / Admin',
            color: 'oklch(0.55 0.16 35)',
            bg: 'oklch(0.96 0.04 35)',
            sees: ['Bütün şirkət', 'Audit log', 'Siyasət konfiqurasiyası', 'Hesabatlar / export', 'Tendensiyalar'],
            does: ['Siyasət dəyiş', 'Mükafat fond idarə', 'Aylıq report', 'Yeni qoşulan onboard'],
          },
        ].map(p => (
          <div key={p.role} style={{ background: 'white', border: `1.5px solid ${p.color}`, borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: '"Fraunces", serif', fontSize: 22, fontWeight: 600, letterSpacing: -0.3 }}>{p.role}</div>
              <div style={{ width: 14, height: 14, background: p.color, borderRadius: 4 }}/>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Görür</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {p.sees.map(s => <div key={s} style={{ fontSize: 12.5, color: '#1a1410' }}>· {s}</div>)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Edir</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {p.does.map(s => <div key={s} style={{ fontSize: 12.5, color: '#1a1410' }}>· {s}</div>)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, padding: '14px 18px', background: 'oklch(0.20 0.02 35)', color: 'oklch(0.96 0.02 35)', borderRadius: 12, fontSize: 13, lineHeight: 1.5, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ fontSize: 22 }}>↻</div>
        <div><b>Tək mənbə:</b> hər üç rol eyni məlumat axınını fərqli linzalarla görür. HR siyasət yenilədikdə, sabah səhər manager və əməkdaş eyni qaydanı görür — sənəd yeniləməsinə ehtiyac yoxdur.</div>
      </div>
    </div>
  );
}

function ColorTypeBoard() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#f5f1ea', fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif', padding: '40px 48px', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.6, color: 'oklch(0.55 0.16 35)', textTransform: 'uppercase' }}>Vizual sistem</div>
        <div style={{ fontFamily: '"Fraunces", serif', fontSize: 36, lineHeight: 1.08, letterSpacing: -0.8, fontWeight: 500, marginTop: 6 }}>İsti, sakit, professional</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24, flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Aksent paleti — OKLCH</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {[
              ['Coral',  'oklch(0.65 0.18 35)',  'Brand'],
              ['Sage',   'oklch(0.62 0.13 155)', 'Office'],
              ['Dusk',   'oklch(0.60 0.14 240)', 'Remote'],
              ['Plum',   'oklch(0.60 0.16 320)', 'Meeting'],
              ['Amber',  'oklch(0.72 0.16 75)',  'Sick'],
              ['Taupe',  'oklch(0.55 0.03 60)',  'Off'],
            ].map(([n, c, role]) => (
              <div key={n}>
                <div style={{ height: 88, background: c, borderRadius: 10, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)' }}/>
                <div style={{ fontSize: 12, fontWeight: 700, marginTop: 8 }}>{n}</div>
                <div style={{ fontSize: 10.5, color: 'oklch(0.5 0.02 60)' }}>{role}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 8 }}>Status indikatorlari</div>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {['office', 'remote', 'meeting', 'field', 'break', 'off', 'sick', 'notyet'].map(s => (
              <window.StatusChip key={s} status={s}/>
            ))}
          </div>

          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase', marginTop: 8 }}>Streak ikonografiyası</div>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', justifyContent: 'space-between' }}>
            {[3, 9, 18, 35, 70].map(n => {
              const i = window.streakIntensity(n);
              return (
                <div key={n} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 28, color: i.color }}>{i.glyph}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, marginTop: 4 }}>{n} gün</div>
                  <div style={{ fontSize: 10, color: 'oklch(0.5 0.02 60)' }}>{i.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.5 0.02 60)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Tipoqrafiya</div>
          <div style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid oklch(0.92 0.01 60)', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: 'oklch(0.5 0.02 60)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Display · Fraunces</div>
              <div style={{ fontFamily: '"Fraunces", serif', fontSize: 38, lineHeight: 1.05, letterSpacing: -0.8, fontWeight: 500 }}>Sabah hardasan?</div>
              <div style={{ fontFamily: '"Fraunces", serif', fontSize: 22, lineHeight: 1.1, fontStyle: 'italic', color: 'oklch(0.55 0.16 35)' }}>fərqindəlik</div>
            </div>
            <div style={{ height: 1, background: 'oklch(0.94 0.01 60)' }}/>
            <div>
              <div style={{ fontSize: 10, color: 'oklch(0.5 0.02 60)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Mətn · Plus Jakarta Sans</div>
              <div style={{ fontSize: 15, lineHeight: 1.55 }}>Bu sistem əməkdaşı izləmək üçün deyil — özünə güzgü tutmaq üçündür.</div>
              <div style={{ fontSize: 12, lineHeight: 1.55, color: 'oklch(0.5 0.02 60)', marginTop: 8 }}>İkinci dərəcəli mətn, izahatlar və meta məlumatlar üçün.</div>
            </div>
            <div style={{ height: 1, background: 'oklch(0.94 0.01 60)' }}/>
            <div>
              <div style={{ fontSize: 10, color: 'oklch(0.5 0.02 60)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Rəqəm · JetBrains Mono</div>
              <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 18 }}>09:14 · 38.5 saat · 23 gün</div>
            </div>
          </div>

          <div style={{ background: 'oklch(0.20 0.02 35)', color: 'oklch(0.96 0.02 35)', borderRadius: 14, padding: 20, marginTop: 'auto' }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: 'oklch(0.78 0.10 35)', letterSpacing: 1.2, textTransform: 'uppercase' }}>Avoid</div>
            <div style={{ fontSize: 13, lineHeight: 1.55, marginTop: 8, opacity: 0.85 }}>
              · Sürveylyans hissi yaradan qırmızı/yaşıl işıqlar<br/>
              · "Geç qalma" siqnalları kimi kədərli ikon<br/>
              · Aqressiv gradient backgroundlar<br/>
              · Sıralama tablolari (kim ən vaxtında gəlir)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.ManifestoBoard = ManifestoBoard;
window.SystemMapBoard = SystemMapBoard;
window.ColorTypeBoard = ColorTypeBoard;
