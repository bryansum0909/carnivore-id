import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const KATEGORI = [
  { label: 'Puasa (pagi)', icon: '🌅', normal: '70–100', warna: '#1D9E75' },
  { label: 'Setelah makan (2 jam)', icon: '🍽️', normal: '< 140', warna: '#EF9F27' },
  { label: 'Sebelum tidur', icon: '🌙', normal: '100–140', warna: '#378ADD' },
  { label: 'Acak / lainnya', icon: '🔢', normal: '70–140', warna: '#9B8C80' },
];

function getStatus(nilai, kategori) {
  if (!nilai) return null;
  const n = parseFloat(nilai);
  if (kategori === 'Puasa (pagi)') {
    if (n < 70) return { label: 'Terlalu Rendah', color: '#378ADD' };
    if (n <= 100) return { label: 'Normal', color: '#1D9E75' };
    if (n <= 125) return { label: 'Pra-Diabetes', color: '#EF9F27' };
    return { label: 'Tinggi', color: '#C1392B' };
  }
  if (kategori === 'Setelah makan (2 jam)') {
    if (n < 70) return { label: 'Terlalu Rendah', color: '#378ADD' };
    if (n < 140) return { label: 'Normal', color: '#1D9E75' };
    if (n < 200) return { label: 'Pra-Diabetes', color: '#EF9F27' };
    return { label: 'Tinggi', color: '#C1392B' };
  }
  if (n < 70) return { label: 'Terlalu Rendah', color: '#378ADD' };
  if (n <= 140) return { label: 'Normal', color: '#1D9E75' };
  if (n <= 199) return { label: 'Pra-Diabetes', color: '#EF9F27' };
  return { label: 'Tinggi', color: '#C1392B' };
}

export default function BloodSugarTracker() {
  const { rawUser } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nilai: '', kategori: 'Puasa (pagi)', catatan: '', makanan: '', tanggal: new Date().toISOString().split('T')[0]
  });
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('blood_sugar')
      .select('*')
      .eq('user_id', rawUser.id)
      .order('tanggal', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(30);
    if (data) setRecords(data);
    setLoading(false);
  };

  const handleSimpan = async () => {
    if (!form.nilai) return;
    setSaving(true);
    const { error } = await supabase.from('blood_sugar').insert({
      user_id: rawUser.id,
      nilai: parseFloat(form.nilai),
      kategori: form.kategori,
      catatan: form.catatan,
      makanan_sebelumnya: form.makanan,
      tanggal: form.tanggal,
    });
    if (!error) {
      setForm({ nilai: '', kategori: 'Puasa (pagi)', catatan: '', makanan: '', tanggal: new Date().toISOString().split('T')[0] });
      setShowForm(false);
      fetchRecords();
    }
    setSaving(false);
  };

  const handleHapus = async (id) => {
    await supabase.from('blood_sugar').delete().eq('id', id);
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  // Data untuk grafik — 14 hari terakhir
  const chartData = [...records]
    .filter(r => r.kategori === 'Puasa (pagi)')
    .slice(0, 14)
    .reverse()
    .map(r => ({
      tanggal: new Date(r.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
      nilai: r.nilai,
    }));

  const today = records.filter(r => r.tanggal === new Date().toISOString().split('T')[0]);
  const avgToday = today.length ? Math.round(today.reduce((a, r) => a + r.nilai, 0) / today.length) : null;
  const avgAll = records.length ? Math.round(records.reduce((a, r) => a + r.nilai, 0) / records.length) : null;
  const lowest = records.length ? Math.min(...records.map(r => r.nilai)) : null;
  const highest = records.length ? Math.max(...records.map(r => r.nilai)) : null;

  return (
    <div className="page-transition" style={{ maxWidth: '760px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Blood Sugar Tracker</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '3px' }}>Pantau gula darah & korelasi dengan makanan</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)} style={{ fontSize: '13px' }}>
          <i className="ti ti-plus" /> Catat Sekarang
        </button>
      </div>

      {/* Panduan nilai normal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '1.5rem' }}>
        {KATEGORI.map(k => (
          <div key={k.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--r-md)', padding: '10px 12px', borderLeft: `3px solid ${k.warna}` }}>
            <div style={{ fontSize: '16px', marginBottom: '4px' }}>{k.icon}</div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{k.label}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>Normal: {k.normal} mg/dL</div>
          </div>
        ))}
      </div>

      {/* Form tambah */}
      {showForm && (
        <div className="card fade-in" style={{ marginBottom: '1.5rem', border: '1px solid rgba(193,57,43,0.25)' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '1rem' }}>Catat Gula Darah</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                Nilai Gula Darah (mg/dL) *
              </label>
              <input type="number" placeholder="contoh: 95" value={form.nilai} onChange={e => set('nilai', e.target.value)}
                style={{ fontSize: '16px', fontWeight: 600 }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>Waktu Pengukuran</label>
              <select value={form.kategori} onChange={e => set('kategori', e.target.value)}>
                {KATEGORI.map(k => <option key={k.label}>{k.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>Tanggal</label>
              <input type="date" value={form.tanggal} onChange={e => set('tanggal', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                Makanan sebelumnya <span style={{ color: 'var(--text-faint)' }}>(opsional)</span>
              </label>
              <input type="text" placeholder="contoh: ribeye + telur" value={form.makanan} onChange={e => set('makanan', e.target.value)} />
            </div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
              Catatan <span style={{ color: 'var(--text-faint)' }}>(opsional)</span>
            </label>
            <input type="text" placeholder="contoh: habis olahraga, puasa 12 jam, dll." value={form.catatan} onChange={e => set('catatan', e.target.value)} />
          </div>

          {/* Preview status */}
          {form.nilai && (
            <div style={{ marginBottom: '12px', padding: '10px 14px', background: 'var(--surface2)', borderRadius: 'var(--r-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {(() => {
                const s = getStatus(form.nilai, form.kategori);
                return s ? (
                  <>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '13px' }}>
                      Nilai <strong style={{ fontFamily: 'var(--font-mono)' }}>{form.nilai} mg/dL</strong> —
                      <span style={{ color: s.color, fontWeight: 600 }}> {s.label}</span>
                    </span>
                  </>
                ) : null;
              })()}
            </div>
          )}

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-primary" onClick={handleSimpan} disabled={saving || !form.nilai}>
              {saving ? <><i className="ti ti-loader-2" style={{ animation: 'spin 1s linear infinite' }} /> Menyimpan...</> : <><i className="ti ti-check" /> Simpan</>}
            </button>
            <button className="btn-ghost" onClick={() => setShowForm(false)}>Batal</button>
          </div>
        </div>
      )}

      {/* Statistik */}
      {records.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
          {[
            { label: 'Rata-rata hari ini', val: avgToday ? `${avgToday}` : '-', unit: 'mg/dL', color: 'var(--red)' },
            { label: 'Rata-rata keseluruhan', val: avgAll ? `${avgAll}` : '-', unit: 'mg/dL', color: '#EF9F27' },
            { label: 'Terendah', val: lowest ? `${lowest}` : '-', unit: 'mg/dL', color: '#1D9E75' },
            { label: 'Tertinggi', val: highest ? `${highest}` : '-', unit: 'mg/dL', color: '#C1392B' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--r-md)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>{s.label}</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.val}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{s.unit}</div>
            </div>
          ))}
        </div>
      )}

      {/* Grafik gula darah puasa */}
      {chartData.length > 1 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>Tren Gula Darah Puasa</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-faint)', marginBottom: '1rem' }}>14 hari terakhir (pagi)</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="tanggal" tick={{ fontSize: 11, fill: 'var(--text-faint)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 180]} tick={{ fontSize: 11, fill: 'var(--text-faint)' }} axisLine={false} tickLine={false} />
              <ReferenceLine y={100} stroke="#1D9E75" strokeDasharray="4 4" label={{ value: 'Normal', fill: '#1D9E75', fontSize: 10 }} />
              <ReferenceLine y={126} stroke="#EF9F27" strokeDasharray="4 4" label={{ value: 'Waspada', fill: '#EF9F27', fontSize: 10 }} />
              <Tooltip
                contentStyle={{ background: 'var(--char)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px' }}
                labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                itemStyle={{ color: 'var(--red-light)' }}
                formatter={v => [`${v} mg/dL`, 'Gula Darah']}
              />
              <Line type="monotone" dataKey="nilai" stroke="var(--red)" strokeWidth={2.5}
                dot={{ fill: 'var(--red)', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Riwayat */}
      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '1rem' }}>Riwayat Pengukuran</h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-faint)' }}>Memuat data...</div>
        ) : records.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-faint)', background: 'var(--surface2)', borderRadius: 'var(--r-lg)', border: '1px dashed var(--border-strong)' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🩸</div>
            <p style={{ fontWeight: 500, marginBottom: '4px' }}>Belum ada data gula darah</p>
            <p style={{ fontSize: '13px' }}>Mulai catat pengukuran pertamamu!</p>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {records.map((r, i) => {
              const status = getStatus(r.nilai, r.kategori);
              return (
                <div key={r.id} style={{
                  display: 'flex', gap: '12px', alignItems: 'flex-start',
                  padding: '14px 16px',
                  borderBottom: i < records.length - 1 ? '1px solid var(--border)' : 'none'
                }}>
                  {/* Indikator status */}
                  <div style={{
                    width: '44px', height: '44px', borderRadius: 'var(--r-md)', flexShrink: 0,
                    background: status ? `${status.color}15` : 'var(--surface2)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: status?.color || 'var(--text)', fontFamily: 'var(--font-mono)' }}>
                      {r.nilai}
                    </span>
                    <span style={{ fontSize: '9px', color: 'var(--text-faint)' }}>mg/dL</span>
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>{r.kategori}</span>
                      {status && (
                        <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '99px', background: `${status.color}15`, color: status.color, fontWeight: 600 }}>
                          {status.label}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-faint)', marginBottom: r.makanan_sebelumnya || r.catatan ? '4px' : '0' }}>
                      {new Date(r.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    {r.makanan_sebelumnya && (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <i className="ti ti-meat" style={{ fontSize: '12px', color: '#EF9F27' }} />
                        Makanan: {r.makanan_sebelumnya}
                      </div>
                    )}
                    {r.catatan && (
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                        <i className="ti ti-notes" style={{ fontSize: '12px', color: 'var(--text-faint)' }} />
                        {r.catatan}
                      </div>
                    )}
                  </div>

                  <button onClick={() => handleHapus(r.id)} style={{ color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
                    <i className="ti ti-trash" style={{ fontSize: '15px' }} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SQL reminder */}
      <div style={{ marginTop: '1.5rem', padding: '12px 16px', background: 'rgba(193,57,43,0.04)', border: '1px solid rgba(193,57,43,0.12)', borderRadius: 'var(--r-lg)', fontSize: '12px', color: 'var(--text-muted)' }}>
        <i className="ti ti-info-circle" style={{ color: 'var(--red)', marginRight: '6px' }} />
        Pastikan tabel <strong>blood_sugar</strong> sudah dibuat di Supabase SQL Editor.
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
