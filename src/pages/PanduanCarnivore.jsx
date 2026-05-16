const PANDUAN = {
  tujuan: [
    'Memulihkan metabolisme',
    'Menghilangkan peradangan kronis',
    'Menstabilkan hormon dan energi',
    'Menyembuhkan sistem pencernaan',
    'Menghentikan kecanduan gula & karbohidrat',
  ],
  boleh: [
    {
      judul: 'Daging (Wajib)', icon: '🥩', warna: '#C1392B',
      items: [
        'Daging sapi berlemak — ribeye, brisket, iga, chuck, ground beef 80/20',
        'Domba, kambing, kerbau',
        'Jeroan: hati, ginjal, otak (opsional tapi sangat bergizi)',
        'Ayam kampung, bebek — utamakan paha/kulit, bukan dada polos',
      ]
    },
    {
      judul: 'Telur', icon: '🥚', warna: '#B47814',
      items: ['Telur ayam, bebek, puyuh — utuh (putih + kuning)']
    },
    {
      judul: 'Lemak', icon: '🧈', warna: '#EF9F27',
      items: [
        'Lemak sapi (tallow), lemak kambing, minyak babi (jika non-muslim)',
        'Butter/salted butter — idealnya grass-fed',
        'Bone marrow, otak, kulit ayam goreng tanpa tepung',
      ]
    },
    {
      judul: 'Mineral & Minuman', icon: '💧', warna: '#1D9E75',
      items: [
        'Garam mineral — Himalaya, Celtic, atau garam laut asli',
        'Air putih secukupnya — jangan paksa minum berlebihan',
        'Opsional: air garam (electrolyte water buatan sendiri)',
      ]
    },
  ],
  dilarang: [
    {
      judul: 'Tanaman', icon: '🥦',
      items: ['Sayuran, buah-buahan, kacang-kacangan, biji-bijian', 'Herbal, bumbu berlebihan, saus berbasis gula']
    },
    {
      judul: 'Produk Olahan', icon: '🍞',
      items: ['Gula dalam bentuk apa pun', 'Karbohidrat: nasi, roti, mie, oats, kentang', 'Susu cair (kecuali susu mentah segar)', 'Minyak nabati: canola, sunflower, corn oil, dll.']
    },
    {
      judul: 'Minuman', icon: '🥤',
      items: ['Kopi & teh (tidak dianjurkan saat awal adaptasi)', 'Minuman kemasan & suplemen buatan', 'Alkohol dalam bentuk apa pun']
    },
  ],
  protokol: [
    {
      judul: 'Pola Makan', icon: 'ti-tools-kitchen-2',
      items: ['Makan 1–2x sehari (OMAD atau 2MAD) — jangan ngemil', 'Makan sampai kenyang, jangan batasi kalori', 'Utamakan daging berlemak, hindari terlalu banyak daging tanpa lemak', 'Gunakan garam secukupnya', 'Biarkan tubuh memberi sinyal lapar & kenyang secara alami']
    },
    {
      judul: 'Tidur (Wajib)', icon: 'ti-moon',
      items: ['Minimal 7 jam berkualitas tiap malam', 'Tidur sebelum jam 11 malam, hindari gadget sebelum tidur', 'Bangun alami tanpa alarm (idealnya)']
    },
    {
      judul: 'Manajemen Stres', icon: 'ti-heart',
      items: ['Hindari konflik emosional berlebihan', 'Hindari olahraga ekstrem di awal fase adaptasi', 'Berjalan, meditasi ringan, dan waktu tenang sangat dianjurkan', 'Puasa boleh dilakukan jika sudah adaptasi penuh (tidak wajib)']
    },
  ],
  transisi: {
    timeline: [
      { minggu: 'Minggu 1', judul: 'Ganti Sarapan', desc: 'Ganti sarapan dengan 2–3 telur dimasak dengan lemak hewani (butter, ghee, tallow). Makan siang & malam tetap seperti biasa.' },
      { minggu: 'Minggu 2', judul: 'Kurangi Karbo', desc: 'Mulai kurangi karbohidrat di makan siang & malam. Tingkatkan protein dan lemak hewani secara perlahan.' },
      { minggu: 'Minggu 3', judul: 'Full Carnivore', desc: 'Semua makan sudah carnivore penuh. Fokus pada daging berlemak, telur, dan lemak hewani. Dengarkan sinyal tubuh.' },
    ],
    gejalaDanTips: [
      { gejala: 'Kelelahan & sakit kepala', tips: 'Ini normal (Keto Flu) — tingkatkan asupan garam dan minum kaldu tulang 1–2 cangkir/hari' },
      { gejala: 'Kram otot', tips: 'Pertimbangkan suplemen magnesium di 3 minggu pertama adaptasi' },
      { gejala: 'Diare / BAB sering', tips: 'Kurangi lemak cair sekaligus — jangan tambah terlalu banyak butter ke kopi' },
      { gejala: 'Sembelit', tips: 'Tingkatkan konsumsi daging lebih berlemak & pertimbangkan suplemen magnesium' },
      { gejala: 'Craving karbohidrat kuat', tips: 'Ingat tujuan awal ("WHY") kamu memilih carnivore — mental sangat berperan' },
      { gejala: 'Gangguan tidur', tips: 'Jangan langsung tambah olahraga intens — hindari terlalu banyak perubahan sekaligus' },
    ]
  },
  saranPenting: [
    'Jangan mulai puasa selama beberapa minggu pertama saat fase adaptasi',
    'Jangan langsung menambah olahraga intens — hindari stres metabolik berlebih',
    'Lakukan lab test sebelum memulai, lalu follow-up 3–6 bulan setelahnya',
    'Catat perubahan BB dan lingkar pinggang setiap 2 minggu sekali',
    'Carnivore adalah lifestyle, bukan crash diet — lakukan secara mindful',
    'Gabung komunitas yang mendukung dan aktif belajar bersama',
    'Selalu konsultasi dokter untuk kondisi medis yang sudah ada sebelumnya',
  ]
};

export default function PanduanCarnivore() {
  return (
    <div className="page-transition" style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Panduan Carnivore Diet</h1>
          <span className="badge badge-red">Indonesia</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Panduan resmi komunitas CarnivoreID untuk pemula</p>
      </div>

      {/* Intro banner */}
      <div style={{ background: 'var(--char)', borderRadius: 'var(--r-lg)', padding: '1.5rem', marginBottom: '1.75rem', border: '1px solid rgba(193,57,43,0.25)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-10px', top: '-10px', fontSize: '80px', opacity: 0.07 }}>🥩</div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', marginBottom: '8px' }}>PANDUAN DASAR</div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>Diet Carnivore untuk Pemula</h2>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '1rem' }}>
          Carnivore bukan sekadar pola makan tinggi daging — ini adalah pendekatan nutrisi spesifik spesies manusia untuk memulihkan kesehatan secara menyeluruh.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PANDUAN.tujuan.map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '5px 12px', background: 'rgba(193,57,43,0.15)', borderRadius: '99px', border: '1px solid rgba(193,57,43,0.2)' }}>
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--red-light)', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Yang Boleh */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: 'var(--r-sm)', background: 'rgba(29,158,117,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-check" style={{ color: '#1D9E75', fontSize: '15px' }} />
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Yang Boleh Dimakan</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {PANDUAN.boleh.map((kat, i) => (
            <div key={i} className="card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '20px' }}>{kat.icon}</span>
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{kat.judul}</span>
              </div>
              {kat.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0, marginTop: '1px', background: 'rgba(29,158,117,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-check" style={{ fontSize: '10px', color: '#1D9E75' }} />
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Yang Dilarang */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: 'var(--r-sm)', background: 'rgba(193,57,43,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-x" style={{ color: 'var(--red)', fontSize: '15px' }} />
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Yang Tidak Boleh Dimakan</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {PANDUAN.dilarang.map((kat, i) => (
            <div key={i} className="card" style={{ padding: '1rem', borderColor: 'rgba(193,57,43,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '20px' }}>{kat.icon}</span>
                <span style={{ fontWeight: 600, fontSize: '13px' }}>{kat.judul}</span>
              </div>
              {kat.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '7px', alignItems: 'flex-start', marginBottom: '5px' }}>
                  <div style={{ width: '15px', height: '15px', borderRadius: '50%', flexShrink: 0, marginTop: '1px', background: 'rgba(193,57,43,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="ti ti-x" style={{ fontSize: '9px', color: 'var(--red)' }} />
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Protokol */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: 'var(--r-sm)', background: 'rgba(56,130,220,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-list-check" style={{ color: '#2B6CB0', fontSize: '15px' }} />
          </div>
          <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Protokol Pelaksanaan</h2>
        </div>
        {PANDUAN.protokol.map((p, i) => (
          <div key={i} className="card" style={{ padding: '1rem 1.25rem', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--r-md)', background: 'var(--char)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className={`ti ${p.icon}`} style={{ fontSize: '16px', color: 'var(--red-light)' }} />
              </div>
              <span style={{ fontWeight: 600, fontSize: '15px' }}>{p.judul}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {p.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, marginTop: '1px', background: 'rgba(193,57,43,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>{j + 1}</span>
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ===== PANDUAN 2: TRANSISI ===== */}
      <div style={{ height: '1px', background: 'var(--border)', margin: '2rem 0' }} />

      {/* Header panduan 2 */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600 }}>Panduan Transisi & Adaptasi</h2>
            <span className="badge badge-amber">Panduan Lanjutan</span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Panduan umum memulai carnivore di Indonesia — komunitas Carnivore Indonesia</p>
        </div>
        <a href="https://www.facebook.com/groups/carnivoreindonesia/" target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 14px', background: 'rgba(24,119,242,0.08)', border: '1px solid rgba(24,119,242,0.2)', borderRadius: 'var(--r-md)', fontSize: '12px', color: '#1877F2', fontWeight: 500, textDecoration: 'none' }}>
          <i className="ti ti-brand-facebook" style={{ fontSize: '15px' }} />
          Carnivore Indonesia
          <i className="ti ti-external-link" style={{ fontSize: '12px' }} />
        </a>
      </div>

      {/* Kredit penulis */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 'var(--r-lg)', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
        <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(193,57,43,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--red)' }}>HC</span>
        </div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 600 }}>Halat Cécilia (Oma)</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.5 }}>
            Sport Performance & Nutrition Specialist · NASM · ACE Certified Personal Trainer · Carnivore & Ketogenic Nutrition Therapy Coach – Nutrition Network
          </div>
        </div>
      </div>

      {/* Timeline transisi */}
      <div style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '1rem' }}>Timeline Transisi 3 Minggu</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {PANDUAN.transisi.timeline.map((t, i) => (
            <div key={i} className="card" style={{ padding: '1rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: i === 0 ? '#EF9F27' : i === 1 ? '#C1392B' : '#1D9E75' }} />
              <div style={{ fontSize: '11px', fontWeight: 700, color: i === 0 ? '#B47814' : i === 1 ? 'var(--red)' : '#1D9E75', letterSpacing: '0.05em', marginBottom: '6px', marginTop: '4px' }}>{t.minggu.toUpperCase()}</div>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{t.judul}</div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Gejala & Tips */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: 'var(--r-sm)', background: 'rgba(180,120,20,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-first-aid-kit" style={{ color: '#B47814', fontSize: '15px' }} />
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Gejala Adaptasi & Cara Mengatasinya</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {PANDUAN.transisi.gejalaDanTips.map((g, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px 16px', background: 'var(--surface2)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: '1px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', background: 'rgba(193,57,43,0.1)', color: 'var(--red)', borderRadius: '99px' }}>Gejala</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '3px' }}>{g.gejala}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <i className="ti ti-bulb" style={{ fontSize: '12px', color: '#EF9F27', marginRight: '4px' }} />
                  {g.tips}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saran Penting */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: 'var(--r-sm)', background: 'rgba(56,130,220,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-star" style={{ color: '#2B6CB0', fontSize: '15px' }} />
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 600 }}>Saran Penting Lainnya</h3>
        </div>
        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {PANDUAN.saranPenting.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--char)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--red-light)', fontFamily: 'var(--font-mono)' }}>{i + 1}</span>
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Kondisi Medis warning */}
      <div style={{ padding: '1rem 1.25rem', background: 'rgba(180,120,20,0.06)', border: '1px solid rgba(180,120,20,0.2)', borderRadius: 'var(--r-lg)', marginBottom: '1.25rem', display: 'flex', gap: '12px' }}>
        <i className="ti ti-alert-triangle" style={{ color: '#B47814', fontSize: '18px', flexShrink: 0, marginTop: '1px' }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>Untuk Kondisi Medis</div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Jika memiliki masalah kesehatan sebelumnya (diabetes, gangguan tiroid, penyakit ginjal, dll.), harap konsultasikan dengan praktisi kesehatan yang bersertifikat dan berpengalaman dalam diet low-carb atau carnivore.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: '1rem 1.25rem', background: 'rgba(193,57,43,0.04)', border: '1px solid rgba(193,57,43,0.12)', borderRadius: 'var(--r-lg)', display: 'flex', gap: '12px' }}>
        <i className="ti ti-info-circle" style={{ color: 'var(--red)', fontSize: '18px', flexShrink: 0, marginTop: '1px' }} />
        <div>
          <div style={{ fontWeight: 600, fontSize: '13px', marginBottom: '4px' }}>Disclaimer</div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Informasi ini hanya untuk tujuan edukasi umum dan bukan pengganti nasihat medis. Sumber panduan lanjutan:{' '}
            <a href="https://www.facebook.com/groups/carnivoreindonesia/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--red)', fontWeight: 500 }}>
              Komunitas Carnivore Indonesia (Facebook)
            </a>
            {' '}oleh Halat Cécilia.
          </p>
        </div>
      </div>
    </div>
  );
}
