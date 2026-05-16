import { useAuth } from '../hooks/useAuth';

const NAV_ITEMS = [
  { id: 'tracker', icon: 'ti-clipboard-list', label: 'Food Tracker' },
  { id: 'planner', icon: 'ti-calendar', label: 'Meal Planner' },
  { id: 'menu', icon: 'ti-tools-kitchen-2', label: 'Menu Carnivore' },
  { id: 'beli', icon: 'ti-shopping-bag', label: 'Tempat Beli' },
  { id: 'bloodsugar', icon: 'ti-droplet', label: 'Gula Darah' },
  { id: 'panduan', icon: 'ti-book', label: 'Panduan Diet' },
  { id: 'profil', icon: 'ti-user-circle', label: 'Profil Saya' },
];

export default function Sidebar({ activePage, setActivePage }) {
  const { user, logout } = useAuth();

  return (
    <aside style={{
      width: '230px', flexShrink: 0, background: 'var(--char)', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh'
    }}>
      {/* Logo */}
      <div style={{ padding: '1.75rem 1.5rem 1.25rem' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#fff', letterSpacing: '2px', lineHeight: 1 }}>
          CARNIVORE
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--red)', letterSpacing: '2px', lineHeight: 1 }}>
          ID
        </div>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', marginTop: '6px', letterSpacing: '0.05em' }}>
          Komunitas Indonesia
        </div>
      </div>

      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0 1.5rem' }} />

      {/* Nav */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
        {NAV_ITEMS.map(item => {
          const active = activePage === item.id;
          return (
            <button key={item.id} onClick={() => setActivePage(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '11px',
              padding: '11px 14px', borderRadius: 'var(--r-md)', marginBottom: '3px',
              background: active ? 'rgba(193,57,43,0.2)' : 'transparent',
              border: active ? '1px solid rgba(193,57,43,0.3)' : '1px solid transparent',
              color: active ? '#fff' : 'rgba(255,255,255,0.45)',
              fontSize: '14px', fontWeight: active ? 500 : 400,
              transition: 'all 0.15s', cursor: 'pointer', fontFamily: 'var(--font-body)',
              textAlign: 'left'
            }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: '17px', color: active ? 'var(--red-light)' : 'inherit', flexShrink: 0 }} />
              {item.label}
              {active && <div style={{ marginLeft: 'auto', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--red-light)' }} />}
            </button>
          );
        })}
      </nav>

      {/* User info */}
      <div style={{ padding: '1rem 0.75rem' }}>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '1rem' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: 'var(--r-md)', background: 'rgba(255,255,255,0.04)' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(193,57,43,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: 600, color: 'var(--red-light)', flexShrink: 0
          }}>
            {user?.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>{user?.level}</div>
          </div>
          <button onClick={logout} title="Keluar" style={{ color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <i className="ti ti-logout" style={{ fontSize: '16px' }} />
          </button>
        </div>
      </div>
    </aside>
  );
}
