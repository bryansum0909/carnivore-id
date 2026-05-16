import { useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useAuth } from '../hooks/useAuth';

export default function ProfilSaya() {
  const { user, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(() => localStorage.getItem(`avatar_${user?.id}`) || null);
  const fileRef = useRef();

  const weightData = (user?.weightHistory || [user?.weight]).map((w, i) => ({
    week: `M${i + 1}`, weight: w
  }));

  const lost = Math.abs(((user?.weight || 0) - ((user?.weightHistory || [user?.weight])[0] || 0)).toFixed(1));
  const toGo = Math.abs(((user?.weight || 0) - (user?.targetWeight || 0)).toFixed(1));
  const progress = Math.min(100, Math.round(
    ((user?.weight - (user?.weightHistory?.[0] || user?.weight)) /
    ((user?.targetWeight - (user?.weightHistory?.[0] || user?.weight)) || 1)) * 100
  ));

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatar(ev.target.result);
      localStorage.setItem(`avatar_${user?.id}`, ev.target.result);
    };
    reader.readAsDataURL(file);
  };

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

      {/* Profile header dengan foto */}
      <div className="card" style={{ marginBottom: '1.25rem', background: 'var(--char)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {/* Avatar dengan upload */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <div onClick={() => editMode && fileRef.current.click()} style={{
              width: '72px', height: '72px', borderRadius: '50%',
              background: avatar ? 'transparent' : 'rgba(193,57,43,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', fontWeight: 700, color: 'var(--red-light)',
              border: '2px solid rgba(193,57,43,0.3)',
              cursor: editMode ? 'pointer' : 'default',
              overflow: 'hidden', transition: 'opacity 0.15s'
            }}>
              {avatar
                ? <img src={avatar} alt="Foto profil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : user?.initials
              }
            </div>
            {editMode && (
              <div onClick={() => fileRef.current.click()} style={{
                position: 'absolute', bottom: 0, right: 0,
                width: '24px', height: '24px', borderRadius: '50%',
                background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', border: '2px solid var(--char)'
              }}>
                <i className="ti ti-camera" style={{ fontSize: '12px', color: '#fff' }} />
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>{user?.name}</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
              Member sejak {user?.since} · {user?.email}
            </p>
            <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '99px', background: 'rgba(193,57,43,0.2)', color: 'var(--red-light)', fontWeight: 600 }}>
                {user?.level}
              </span>
              {editMode && (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', alignSelf: 'center' }}>
                  Klik foto untuk ganti
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '1.25rem' }}>
        {[
          { label: 'Hari Carnivore', val: user?.streak || 0, icon: 'ti-flame', color: 'var(--red)' },
          { label: 'Berat Turun', val: `${lost} kg`, icon: 'ti-trending-down', color: '#1D9E75' },
          { label: 'Resep Disimpan', val: user?.savedRecipes?.length || 0, icon: 'ti-bookmark', color: '#EF9F27' },
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
            <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{user?.weightHistory?.[0] || user?.weight} kg</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>SEKARANG</div>
            <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--red)' }}>{user?.weight} kg</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>TARGET</div>
            <div style={{ fontSize: '20px', fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#1D9E75' }}>{user?.targetWeight} kg</div>
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
            <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: 'var(--text-faint)' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: 'var(--char)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '13px' }}
              labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
              itemStyle={{ color: 'var(--red-light)' }}
              formatter={v => [`${v} kg`, 'Berat']}
            />
            <Line type="monotone" dataKey="weight" stroke="var(--red)" strokeWidth={2.5}
              dot={{ fill: 'var(--red)', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Data pribadi */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '1rem' }}>Data Pribadi & Nutrisi</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {[
            { label: 'Tinggi badan', val: `${user?.height || '-'} cm` },
            { label: 'Usia', val: `${user?.age || '-'} tahun` },
            { label: 'Target kalori harian', val: `${(user?.dailyCal || 0).toLocaleString()} kcal` },
            { label: 'Target protein harian', val: `${user?.dailyProtein || 0} gram` },
          ].map(item => (
            <div key={item.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--r-md)', padding: '12px' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>{item.label.toUpperCase()}</div>
              <div style={{ fontSize: '15px', fontWeight: 500 }}>{item.val}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="btn-red-ghost" onClick={logout} style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
        <i className="ti ti-logout" /> Keluar dari akun
      </button>
    </div>
  );
}
