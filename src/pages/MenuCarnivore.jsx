import { useState } from 'react';
import { RECIPES } from '../data/data';

const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'sapi', label: '🐄 Sapi' },
  { id: 'ayam', label: '🍗 Ayam' },
  { id: 'seafood', label: '🐟 Seafood' },
  { id: 'telur', label: '🥚 Telur' },
];

function RecipeModal({ recipe, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(26,20,16,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="slide-up" style={{
        background: 'var(--surface)', borderRadius: 'var(--r-xl)',
        width: '100%', maxWidth: '520px', maxHeight: '85vh',
        overflow: 'auto', boxShadow: 'var(--shadow-lg)'
      }}>
        {/* Header */}
        <div style={{ background: 'var(--char)', padding: '1.5rem', borderRadius: 'var(--r-xl) var(--r-xl) 0 0', position: 'relative' }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '1rem', right: '1rem',
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
          }}>
            <i className="ti ti-x" />
          </button>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>{recipe.emoji}</div>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff', marginBottom: '6px' }}>{recipe.name}</h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{recipe.desc}</p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
              <i className="ti ti-clock" /> {recipe.time}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--red-light)' }}>
              <i className="ti ti-flame" /> {recipe.cal} kcal
            </span>
            <span style={{ fontSize: '12px', color: '#4DD9A0' }}>
              <i className="ti ti-meat" /> P: {recipe.protein}g
            </span>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {/* Macros */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '1.5rem' }}>
            {[
              { label: 'Kalori', val: recipe.cal, unit: 'kcal', color: 'var(--red)' },
              { label: 'Protein', val: recipe.protein, unit: 'gram', color: '#1D9E75' },
              { label: 'Lemak', val: recipe.fat, unit: 'gram', color: '#EF9F27' },
            ].map(m => (
              <div key={m.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--r-md)', padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '3px' }}>{m.label}</div>
                <div style={{ fontSize: '18px', fontWeight: 600, color: m.color, fontFamily: 'var(--font-mono)' }}>{m.val}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{m.unit}</div>
              </div>
            ))}
          </div>

          {/* Ingredients */}
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            BAHAN-BAHAN
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            {recipe.ingredients.map((ing, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(193,57,43,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="ti ti-check" style={{ fontSize: '11px', color: 'var(--red)' }} />
                </div>
                <span style={{ fontSize: '14px' }}>{ing}</span>
              </div>
            ))}
          </div>

          {/* Steps */}
          <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '10px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            CARA MEMASAK
          </h3>
          {recipe.steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '50%', background: 'var(--char)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--red-light)', fontWeight: 600
              }}>
                {i + 1}
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: 1.6, paddingTop: '2px' }}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MenuCarnivore() {
  const [cat, setCat] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = RECIPES.filter(r => {
    const matchCat = cat === 'all' || r.cat === cat;
    const matchSearch = search === '' || r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="page-transition" style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Menu Carnivore</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '3px' }}>Koleksi resep carnivore diet lokal Indonesia</p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <i className="ti ti-search" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)', fontSize: '16px' }} />
        <input type="text" placeholder="Cari resep atau bahan..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ paddingLeft: '42px' }} />
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            padding: '7px 14px', borderRadius: 'var(--r-md)', fontSize: '13px', fontWeight: 500,
            background: cat === c.id ? 'var(--char)' : 'var(--surface2)',
            color: cat === c.id ? '#fff' : 'var(--text-muted)',
            border: cat === c.id ? '1px solid rgba(193,57,43,0.4)' : '1px solid var(--border)',
            cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)'
          }}>
            {c.label}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '13px', color: 'var(--text-faint)', alignSelf: 'center' }}>
          {filtered.length} resep
        </span>
      </div>

      {/* Recipes grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
        {filtered.map(recipe => (
          <div key={recipe.id} className="card" onClick={() => setSelectedRecipe(recipe)} style={{
            cursor: 'pointer', transition: 'all 0.15s', padding: 0, overflow: 'hidden'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(193,57,43,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            <div style={{ background: 'var(--char)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: '36px' }}>{recipe.emoji}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--red-light)' }}>
                  {recipe.cal}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>kcal</div>
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '5px' }}>{recipe.name}</h3>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.5 }}>{recipe.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {recipe.tags.slice(0, 2).map(t => (
                    <span key={t} className="tag" style={{ fontSize: '11px' }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
                  <i className="ti ti-clock" /> {recipe.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-faint)' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔍</div>
          <p>Tidak ada resep yang cocok</p>
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </div>
  );
}
