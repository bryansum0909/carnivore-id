import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', weight: '', targetWeight: '', height: '', age: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 400));

    if (mode === 'login') {
      const res = login(form.email, form.password);
      if (!res.ok) setError(res.error);
    } else {
      if (!form.name || !form.email || !form.password || !form.weight || !form.targetWeight) {
        setError('Semua field wajib diisi');
        setLoading(false);
        return;
      }
      register(form.name, form.email, form.password, form.weight, form.targetWeight, form.height || 170, form.age || 25);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--char)', display: 'flex', position: 'relative', overflow: 'hidden' }}>
      {/* Background texture */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
        backgroundSize: '20px 20px'
      }} />
      {/* Left panel */}
      <div style={{
        flex: '0 0 55%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '4rem 5rem', position: 'relative'
      }} className="auth-left">
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '72px', color: '#fff', lineHeight: 0.9, letterSpacing: '2px' }}>
            CARNIVORE
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '72px', color: 'var(--red)', lineHeight: 0.9, letterSpacing: '2px' }}>
            ID
          </div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px', marginTop: '1rem', fontWeight: 300 }}>
            Komunitas Carnivore Diet Indonesia
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { icon: 'ti-clipboard-list', text: 'Food tracker personal untuk setiap member' },
            { icon: 'ti-calendar', text: 'Meal planner mingguan otomatis' },
            { icon: 'ti-meat', text: '200+ resep carnivore diet lokal Indonesia' },
            { icon: 'ti-chart-line', text: 'Pantau progress berat badan & nutrisi' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px',
                background: 'rgba(193,57,43,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <i className={`ti ${item.icon}`} style={{ color: 'var(--red-light)', fontSize: '18px' }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{item.text}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', padding: '1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--r-lg)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>DEMO AKUN</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
            Email: <span style={{ color: 'var(--red-light)' }}>andi@email.com</span><br />
            Password: <span style={{ color: 'var(--red-light)' }}>demo123</span>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{
        flex: 1, background: 'var(--surface)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '2rem', borderRadius: '32px 0 0 32px'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }} className="slide-up">
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '26px', fontWeight: 600, marginBottom: '6px' }}>
              {mode === 'login' ? 'Selamat datang kembali 👋' : 'Buat akun baru'}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              {mode === 'login' ? 'Masuk ke akun CarnivoreID kamu' : 'Bergabung dengan komunitas carnivore Indonesia'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {mode === 'register' && (
              <div>
                <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Nama lengkap</label>
                <input type="text" placeholder="Nama kamu" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>
            )}
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Email</label>
              <input type="email" placeholder="email@contoh.com" value={form.email} onChange={e => set('email', e.target.value)} />
            </div>
            <div>
              <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={e => set('password', e.target.value)} />
            </div>
            {mode === 'register' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Berat badan (kg)</label>
                    <input type="number" placeholder="75" value={form.weight} onChange={e => set('weight', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Target BB (kg)</label>
                    <input type="number" placeholder="68" value={form.targetWeight} onChange={e => set('targetWeight', e.target.value)} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Tinggi (cm)</label>
                    <input type="number" placeholder="170" value={form.height} onChange={e => set('height', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Usia</label>
                    <input type="number" placeholder="28" value={form.age} onChange={e => set('age', e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {error && (
              <div style={{ background: 'rgba(193,57,43,0.08)', border: '1px solid rgba(193,57,43,0.2)', borderRadius: 'var(--r-md)', padding: '10px 14px', fontSize: '13px', color: 'var(--red)' }}>
                <i className="ti ti-alert-circle" /> {error}
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', marginTop: '4px', fontSize: '15px' }} disabled={loading}>
              {loading ? <><i className="ti ti-loader-2" style={{ animation: 'spin 1s linear infinite' }} /> Memproses...</> : mode === 'login' ? 'Masuk' : 'Daftar Sekarang'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '14px', color: 'var(--text-muted)' }}>
            {mode === 'login' ? 'Belum punya akun? ' : 'Sudah punya akun? '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ color: 'var(--red)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>
              {mode === 'login' ? 'Daftar gratis' : 'Masuk'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .auth-left { display: none !important; }
        }
      `}</style>
    </div>
  );
}
