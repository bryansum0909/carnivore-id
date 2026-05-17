import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthPage from './pages/AuthPage';
import Sidebar from './components/Sidebar';
import FoodTracker from './pages/FoodTracker';
import MealPlanner from './pages/MealPlanner';
import MenuCarnivore from './pages/MenuCarnivore';
import TempatBeli from './pages/TempatBeli';
import ProfilSaya from './pages/ProfilSaya';

import PanduanCarnivore from './pages/PanduanCarnivore';
import BloodSugarTracker from './pages/BloodSugarTracker';

const PAGES = {
  tracker: FoodTracker,
  planner: MealPlanner,
  menu: MenuCarnivore,
  beli: TempatBeli,
  panduan: PanduanCarnivore,
  bloodsugar: BloodSugarTracker,
  profil: ProfilSaya,
};

function MobileNav({ activePage, setActivePage }) {
  const navItems = [
    { id: 'tracker', icon: 'ti-clipboard-list', label: 'Tracker' },
    { id: 'bloodsugar', icon: 'ti-droplet', label: 'Gula Darah' },
    { id: 'menu', icon: 'ti-tools-kitchen-2', label: 'Menu' },
    { id: 'panduan', icon: 'ti-book', label: 'Panduan' },
    { id: 'profil', icon: 'ti-user-circle', label: 'Profil' },
  ];
  return (
    <nav style={{
      display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'var(--char)', borderTop: '1px solid rgba(255,255,255,0.07)',
      zIndex: 50, padding: '8px 0'
    }} id="mobile-nav">
      {navItems.map(item => {
        const active = activePage === item.id;
        return (
          <button key={item.id} onClick={() => setActivePage(item.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
            padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer',
            color: active ? 'var(--red-light)' : 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)'
          }}>
            <i className={`ti ${item.icon}`} style={{ fontSize: '20px' }} />
            <span style={{ fontSize: '10px', fontWeight: active ? 600 : 400 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function App() {
  const { user, loading } = useAuth();
  const [activePage, setActivePage] = useState('tracker');
  const PageComponent = PAGES[activePage];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--char)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: '#fff', letterSpacing: '2px' }}>CARNIVORE</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--red)', letterSpacing: '2px' }}>ID</div>
          <div style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Memuat...</div>
        </div>
      </div>
    );
  }

  if (!user) return <AuthPage />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', background: 'var(--surface)' }}>
        <PageComponent />
      </main>
      <MobileNav activePage={activePage} setActivePage={setActivePage} />
      <style>{`
        @media (max-width: 768px) {
          #mobile-nav { display: flex !important; }
          aside { display: none !important; }
          main { padding: 1.25rem !important; padding-bottom: 80px !important; }
        }
      `}</style>
    </div>
  );
}
