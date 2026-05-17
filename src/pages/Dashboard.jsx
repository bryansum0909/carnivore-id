import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function Dashboard({ setActivePage }) {
  const { user, rawUser, todayTotals, todayLog } = useAuth();
  const [bloodToday, setBloodToday] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting('Selamat pagi');
    else if (hour < 15) setGreeting('Selamat siang');
    else if (hour < 18) setGreeting('Selamat sore');
    else setGreeting('Selamat malam');

    if (rawUser) {
      const today = new Date().toISOString().split('T')[0];
      supabase.from('blood_sugar').select('nilai,kategori').eq('user_id', rawUser.id).eq('tanggal', today).order('created_at', { ascending: false }).limit(1)
        .then(({ data }) => { if (data?.length) setBloodToday(data[0]); });
    }
  }, [rawUser]);

  const calPct = Math.min(100, Math.round((todayTotals.cal / (user?.dailyCal || 2000)) * 100));
  const proteinPct = Math.min(100, Math.round((todayTotals.protein / (user?.dailyProtein || 150)) * 100));
  const fatPct = Math.min(100, Math.round((todayTotals.fat / (user?.dailyFat || 100)) * 100));
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

  const quickActions = [
    { id: 'tracker', icon: 'ti-clipboard-list', label: 'Catat Makanan', color: '#C1392B', bg: 'rgba(193,57,43,0.08)' },
    { id: 'bloodsugar', icon: 'ti-droplet', label: 'Cek Gula Darah', color: '#378ADD', bg: 'rgba(55,138,221,0.08)' },
    { id: 'planner', icon: 'ti-calendar', label: 'Meal Planner', color: '#1D9E75', bg: 'rgba(29,158,117,0.08)' },
    { id: 'menu', icon: 'ti-tools-kitchen-2', label: 'Lihat Resep', color: '#EF9F27', bg: 'rgba(239,159,39,0.08)' },
    { id: 'panduan', icon: 'ti-book', label: 'Panduan Diet', color: '#9B5DE5', bg: 'rgba(155,93,229,0.08)' },
    { id: 'beli', icon: 'ti-shopping-bag', label: 'Tempat Beli', color: '#E84393', bg: 'rgba(232,67,147,0.08)' },
  ];

  const weightHistory = user?.weightHistory || [];
  const weightLost = weightHistory.length > 1
    ? Math.abs((weightHistory[0] - (user?.weight || 0)).toFixed(1))
    : 0;

  return (
    <div style={{ maxWidth: '760px', paddingBottom: '1rem' }}>
      {/* Header greeting */}
      <div style={{
        background: 'var(--char)', borderRadius: 'var(--r-xl)', padding: '1.5rem',
        marginBottom: '1.25rem', position: 'relative', overflow: 'hidden',
        border: '1px solid rgba(193,57,43,0.2)'
      }}>
        <div style={{ position: 'absolute', right: '-20px', top: '-20px', fontSize: '120px', opacity: 0.04 }}>🥩</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
            background: 'rgba(193,57,43,0.25)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: 'var(--red-light)',
            overflow: 'hidden', border: '2px solid rgba(193,57,43,0.3)'
          }}>
            {localStorage.getItem(`avatar_${rawUser?.id}`)
              ? <img src={localStorage.getItem(`avatar_${rawUser?.id}`)} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : user?.initials
            }
          </div>
          <div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginBottom: '2px' }}>{greeting},</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>{user?.name?.split(' ')[0]} 👋</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>{today}</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginBottom: '2px' }}>Streak</div>
            <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--red-light)', fontFamily: 'var(--font-mono)' }}>
              {user?.streak || 0}
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>hari</div>
          </div>
        </div>
      </div>

      {/* Nutrisi hari ini */}
      <div className="card" style={{ marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ fontSize: '15px', fontWeight: 500 }}>Nutrisi Hari Ini</div>
          <button onClick={() => setActivePage('tracker')} style={{
            fontSize: '12px', color: 'var(--red)', background: 'none', border: 'none',
            cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: '4px'
          }}>
            Catat <i className="ti ti-plus" style={{ fontSize: '13px' }} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '1rem' }}>
          {[
            { label: 'Kalori', val: Math.round(todayTotals.cal), target: user?.dailyCal || 2000, unit: 'kcal', color: '#C1392B', pct: calPct },
            { label: 'Protein', val: Math.round(todayTotals.protein), target: user?.dailyProtein || 150, unit: 'g', color: '#1D9E75', pct: proteinPct },
            { label: 'Lemak', val: Math.round(todayTotals.fat), target: user?.dailyFat || 100, unit: 'g', color: '#EF9F27', pct: fatPct },
          ].map(m => (
            <div key={m.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--r-md)', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '4px' }}>{m.label}</div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: m.color, fontFamily: 'var(--font-mono)', lineHeight: 1.2 }}>{m.val}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-faint)', marginBottom: '6px' }}>/ {m.target} {m.unit}</div>
              <div className="progress-bar" style={{ height: '4px' }}>
                <div className="progress-fill" style={{ width: `${m.pct}%`, background: m.color }} />
              </div>
            </div>
          ))}
        </div>

        {todayLog.length === 0 && (
          <div style={{ textAlign: 'center', padding: '10px', fontSize: '13px', color: 'var(--text-faint)', background: 'var(--surface2)', borderRadius: 'var(--r-md)' }}>
            Belum ada makanan tercatat hari ini —{' '}
            <button onClick={() => setActivePage('tracker')} style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px', fontFamily: 'var(--font-body)' }}>
              Catat sekarang
            </button>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '1.25rem' }}>
        <div style={{ background: 'var(--surface2)', borderRadius: 'var(--r-lg)', padding: '14px', textAlign: 'center' }}>
          <i className="ti ti-trending-down" style={{ fontSize: '20px', color: '#1D9E75', display: 'block', marginBottom: '6px' }} />
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#1D9E75' }}>{weightLost} kg</div>
          <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>Total turun</div>
        </div>
        <div style={{ background: 'var(--surface2)', borderRadius: 'var(--r-lg)', padding: '14px', textAlign: 'center' }}>
          <i className="ti ti-droplet" style={{ fontSize: '20px', color: '#378ADD', display: 'block', marginBottom: '6px' }} />
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#378ADD' }}>
            {bloodToday ? bloodToday.nilai : '--'}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>
            {bloodToday ? bloodToday.kategori.split(' ')[0] : 'Gula darah'}
          </div>
        </div>
        <div style={{ background: 'var(--surface2)', borderRadius: 'var(--r-lg)', padding: '14px', textAlign: 'center' }}>
          <i className="ti ti-scale" style={{ fontSize: '20px', color: 'var(--red)', display: 'block', marginBottom: '6px' }} />
          <div style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--red)' }}>{user?.weight}</div>
          <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>BB sekarang (kg)</div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '15px', fontWeight: 500, marginBottom: '12px' }}>Menu Utama</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {quickActions.map(a => (
            <button key={a.id} onClick={() => setActivePage(a.id)} style={{
              background: a.bg, border: `1px solid ${a.color}22`,
              borderRadius: 'var(--r-lg)', padding: '16px 10px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)'
            }}>
              <i className={`ti ${a.icon}`} style={{ fontSize: '24px', color: a.color }} />
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text)', textAlign: 'center', lineHeight: 1.3 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target progress */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: 500 }}>Target Berat Badan</div>
          <button onClick={() => setActivePage('profil')} style={{ fontSize: '12px', color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
            Lihat profil →
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
          <span style={{ color: 'var(--text-muted)' }}>
            {user?.weight} kg → Target {user?.targetWeight} kg
          </span>
          <span style={{ fontWeight: 600, color: 'var(--red)' }}>
            Sisa {Math.abs(((user?.weight || 0) - (user?.targetWeight || 0)).toFixed(1))} kg
          </span>
        </div>
        <div className="progress-bar" style={{ height: '8px' }}>
          <div className="progress-fill" style={{
            width: `${Math.min(100, Math.abs(Math.round(weightLost / Math.abs((weightHistory[0] || user?.weight || 1) - (user?.targetWeight || 1)) * 100)))}%`,
            background: 'linear-gradient(90deg, var(--red) 0%, #1D9E75 100%)'
          }} />
        </div>
      </div>
    </div>
  );
}
