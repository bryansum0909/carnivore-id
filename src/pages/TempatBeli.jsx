import { useState } from 'react';
import { STORES } from '../data/data';

export default function TempatBeli() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = STORES.filter(s => {
    const matchType = filter === 'all' || s.type === filter;
    const matchSearch = search === '' ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  const online = filtered.filter(s => s.type === 'online');
  const offline = filtered.filter(s => s.type === 'offline');

  return (
    <div className="page-transition" style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Tempat Beli</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '3px' }}>
          Sumber produk carnivore diet terpercaya di Indonesia
        </p>
      </div>

      {/* Tips banner */}
      <div style={{
        background: 'var(--char)', borderRadius: 'var(--r-lg)', padding: '1rem 1.25rem',
        marginBottom: '1.5rem', display: 'flex', gap: '12px', alignItems: 'flex-start',
        border: '1px solid rgba(193,57,43,0.2)'
      }}>
        <i className="ti ti-bulb" style={{ fontSize: '20px', color: 'var(--red-light)', flexShrink: 0, marginTop: '1px' }} />
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px', color: '#fff', marginBottom: '4px' }}>Tips Belanja Carnivore</div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
            Prioritaskan daging segar lokal (sapi bali, kambing, ayam kampung) untuk kualitas terbaik dan harga terjangkau.
            Untuk seafood, TPI atau pasar ikan lokal adalah pilihan termurah dan tersegar.
          </p>
        </div>
      </div>

      {/* Search & filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <i className="ti ti-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: '16px' }} />
          <input type="text" placeholder="Cari toko atau produk..." value={search}
            onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '42px' }} />
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'online', label: 'Online' },
            { id: 'offline', label: 'Offline' },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: '10px 16px', borderRadius: 'var(--r-md)', fontSize: '13px', fontWeight: 500,
              background: filter === f.id ? 'var(--char)' : 'var(--surface2)',
              color: filter === f.id ? '#fff' : 'var(--text-muted)',
              border: filter === f.id ? '1px solid rgba(193,57,43,0.4)' : '1px solid var(--border)',
              cursor: 'pointer', fontFamily: 'var(--font-body)'
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Online stores */}
      {online.length > 0 && (
        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <i className="ti ti-world" style={{ color: 'var(--text-muted)', fontSize: '16px' }} />
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              TOKO ONLINE
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{online.length} tempat</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {online.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      )}

      {/* Offline stores */}
      {offline.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <i className="ti ti-map-pin" style={{ color: 'var(--text-muted)', fontSize: '16px' }} />
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              TOKO OFFLINE
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{offline.length} tempat</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {offline.map(store => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-faint)' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🏪</div>
          <p>Tidak ada toko yang cocok</p>
        </div>
      )}

      {/* Manado note */}
      <div style={{
        marginTop: '1.5rem', padding: '1rem 1.25rem',
        background: 'rgba(193,57,43,0.05)', border: '1px solid rgba(193,57,43,0.15)',
        borderRadius: 'var(--r-lg)', display: 'flex', gap: '12px'
      }}>
        <i className="ti ti-map-pin-filled" style={{ color: 'var(--red)', fontSize: '18px', flexShrink: 0, marginTop: '1px' }} />
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>Tips Khusus Manado</div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Manado punya akses seafood yang luar biasa! TPI Bitung dan Pasar Bersehati adalah surga untuk cakalang, tuna, dan udang segar.
            Untuk daging sapi, cari sapi lokal Minahasa di pasar tradisional — lebih murah dan grass-fed alami.
          </p>
        </div>
      </div>
    </div>
  );
}

function StoreCard({ store }) {
  return (
    <div className="card" style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '14px 16px' }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: 'var(--r-md)', flexShrink: 0,
        background: store.type === 'online' ? 'rgba(29,158,117,0.1)' : 'rgba(193,57,43,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px'
      }}>
        {store.emoji}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>{store.name}</div>
          <span style={{
            fontSize: '10px', padding: '2px 8px', borderRadius: '99px', fontWeight: 600,
            background: store.type === 'online' ? 'rgba(29,158,117,0.12)' : 'rgba(56,130,220,0.12)',
            color: store.type === 'online' ? '#1D9E75' : '#2B6CB0',
          }}>
            {store.type.toUpperCase()}
          </span>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', lineHeight: 1.5 }}>{store.desc}</p>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {store.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </div>
      {store.url && store.url !== '#' && (
        <a href={store.url} target="_blank" rel="noopener noreferrer"
          style={{ color: 'var(--text-faint)', flexShrink: 0, alignSelf: 'center' }}>
          <i className="ti ti-external-link" style={{ fontSize: '16px' }} />
        </a>
      )}
    </div>
  );
}
