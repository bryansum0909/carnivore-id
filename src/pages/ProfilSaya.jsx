import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAuth } from '../hooks/useAuth';

export default function ProfilSaya() {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const weightData = user.weightHistory.map((w, i) => ({
    week: `M${i + 1}`, weight: w
  }));

  const progress = Math.min(100, Math.round(
    ((user.weight - user.weightHistory[0]) / (user.targetWeight - user.weightHistory[0])) * 100
  ));
  const lost = Math.abs((user.weight - user.weightHistory[0]).toFixed(1));
  const toGo = Math.abs((user.weight - user.targetWeight).toFixed(1));

  return (
    <div className="page-transition" style={{ maxWidth: '760px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Profil Saya</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '3px' }}>Data & progress carnivore kamu</p>
        </div>
        <button className="btn-ghost" onClick={() => setEditMode(!editMode)} style={{ fontSize: '13px' }}>
          <i className={`ti ti-${editMode ? 'check' : 'edit'}`} /> {editMode ? 'Simpan' : 'Edit Profil'}
        </button>
      </div>

      {/* Profile header */}
      <div className="card" style={{ marginBottom: '1.25rem', background: 'var(--char)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(193,57,43,0.3)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '22px', fontWeight: 700, color: 'var(--red-light)',
            flexShrink: 0, border: '2px solid rgba(193,57,43,0.3)'
          }}>
            {user.initials}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>{user.name}</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
              Member sejak {user.since} · {user.email}
            </p>
            <div style={{ marginTop: '8px' }}>
              <span style={{
                fontSize: '11px', padding: '3px 10px', borderRadius: '99px',
                background: 'rgba(193,57,43,0.2)', color: 'var(--red-light)', fontWeight: 600
              }}>
                {user.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '1.25rem' }}>
        {[
          { label: 'Hari Carnivore', val: user.streak, icon: 'ti-flame', color: 'var(--red)' },
          { label: 'Berat Turun', val: `${lost} kg`, icon: 'ti-trending-down', color: '#1D9E75' },
          { label: 'Resep Disimpan', val: user.savedRecipes?.length || 0, icon: 'ti-bookmark', color: '#EF9F27' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--r-lg)', padding: '16px', textAlign: 'center' }}>
            <i className={`ti ${s.icon}`} style={{ fontSize: '22px', color: s.color, display: 'block', marginBottom: '8px' }} />
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-mono)' }}>{s.val}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-faint)', marginTop: '3px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Target progress */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '1rem' }}>Progress Target Berat Badan</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>BERAT AWAL</div>
            <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{user.weightHistory[0]} kg</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>SEKARANG</div>
            <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--red)' }}>{user.weight} kg</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>TARGET</div>
            <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#1D9E75' }}>{user.targetWeight} kg</div>
          </div>
        </div>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Sisa {toGo} kg lagi menuju target</span>
            <span style={{ fontWeight: 600 }}>{Math.abs(progress)}%</span>
          </div>
          <div className="progress-bar" style={{ height: '8px' }}>
            <div className="progress-fill" style={{ width: `${Math.abs(progress)}%`, background: 'linear-gradient(90deg, var(--red) 0%, #1D9E75 100%)' }} />
          </div>
        </div>
      </div>

      {/* Weight chart */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '1rem' }}>Grafik Berat Badan</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: 'var(--text-faint)' }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[user.targetWeight - 1, user.weightHistory[0] + 1]}
              tick={{ fontSize: 12, fill: 'var(--text-faint)' }}
              axisLine={false} tickLine={false}
            />
            <Tooltip
              contentStyle={{ background: 'var(--char)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px' }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
              itemStyle={{ color: 'var(--red-light)' }}
              formatter={v => [`${v} kg`, 'Berat']}
            />
            <Line
              type="monotone" dataKey="weight" stroke="var(--red)"
              strokeWidth={2.5} dot={{ fill: 'var(--red)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Personal data */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '1rem' }}>Data Pribadi & Nutrisi</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {[
            { label: 'Tinggi badan', val: `${user.height} cm` },
            { label: 'Usia', val: `${user.age} tahun` },
            { label: 'Target kalori harian', val: `${user.dailyCal.toLocaleString()} kcal` },
            { label: 'Target protein harian', val: `${user.dailyProtein} gram` },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--r-md)', padding: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>{item.label.toUpperCase()}</div>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <button className="btn-red-ghost" onClick={logout} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
        <i className="ti ti-logout" /> Keluar dari akun
      </button>
    </div>
  );
}
