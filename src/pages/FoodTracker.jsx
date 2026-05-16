import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FOODS_DB } from '../data/data';

function MacroBar({ label, current, target, color }) {
  const pct = Math.min(100, Math.round((current / target) * 100));
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: 500 }}>
          {Math.round(current)} <span style={{ color: 'var(--text-faint)', fontWeight: 400 }}>/ {target}{label === 'Kalori' ? ' kcal' : 'g'}</span>
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function FoodTracker() {
  const { user, todayLog, todayTotals, addFoodEntry, removeFoodEntry } = useAuth();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState('');
  const [mealType, setMealType] = useState('Sarapan');
  const [showForm, setShowForm] = useState(false);

  const filtered = search.length > 1
    ? FOODS_DB.filter(f => f.name.toLowerCase().includes(search.toLowerCase())).slice(0, 6)
    : [];

  const selectFood = (food) => { setSelected(food); setSearch(food.name); setAmount('100'); };

  const handleAdd = () => {
    if (!selected || !amount) return;
    const qty = parseFloat(amount);
    const multiplier = selected.unit === 'butir' ? qty : qty / 100;
    addFoodEntry({
      name: selected.name,
      amount: qty,
      unit: selected.unit,
      mealType,
      cal: Math.round(selected.per100.cal * multiplier),
      protein: Math.round(selected.per100.protein * multiplier),
      fat: Math.round(selected.per100.fat * multiplier),
      carb: Math.round(selected.per100.carb * multiplier),
    });
    setSearch(''); setSelected(null); setAmount(''); setShowForm(false);
  };

  const meals = ['Sarapan', 'Makan Siang', 'Makan Malam', 'Snack'];
  const byMeal = (type) => todayLog.filter(e => e.mealType === type);

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="page-transition" style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Food Tracker</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '3px' }}>{today}</p>
      </div>

      {/* Summary */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border)' }}>
          {[
            { label: 'Kalori', val: Math.round(todayTotals.cal), target: user.dailyCal, unit: 'kcal', color: '#C1392B' },
            { label: 'Protein', val: Math.round(todayTotals.protein), target: user.dailyProtein, unit: 'g', color: '#1D9E75' },
            { label: 'Lemak', val: Math.round(todayTotals.fat), target: user.dailyFat, unit: 'g', color: '#EF9F27' },
          ].map(m => (
            <div key={m.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-faint)', letterSpacing: '0.05em', marginBottom: '4px' }}>{m.label.toUpperCase()}</div>
              <div style={{ fontSize: '28px', fontWeight: 600, color: m.color, lineHeight: 1.1, fontFamily: 'var(--font-mono)' }}>
                {m.val}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>/ {m.target} {m.unit}</div>
            </div>
          ))}
        </div>
        <MacroBar label="Kalori" current={todayTotals.cal} target={user.dailyCal} color="#C1392B" />
        <MacroBar label="Protein" current={todayTotals.protein} target={user.dailyProtein} color="#1D9E75" />
        <MacroBar label="Lemak" current={todayTotals.fat} target={user.dailyFat} color="#EF9F27" />
      </div>

      {/* Add Food */}
      <div className="card" style={{ marginBottom: '1.5rem', border: showForm ? '1px solid rgba(193,57,43,0.3)' : '1px solid var(--border)' }}>
        <button onClick={() => setShowForm(!showForm)} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
          color: 'var(--text)', fontWeight: 500, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0
        }}>
          <div style={{ width: '30px', height: '30px', borderRadius: 'var(--r-sm)', background: 'rgba(193,57,43,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="ti ti-plus" style={{ color: 'var(--red)', fontSize: '16px' }} />
          </div>
          Catat Makanan
          <i className={`ti ti-chevron-${showForm ? 'up' : 'down'}`} style={{ marginLeft: 'auto', color: 'var(--text-faint)' }} />
        </button>

        {showForm && (
          <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }} className="fade-in">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', marginBottom: '10px' }}>
              <div style={{ position: 'relative' }}>
                <input type="text" placeholder="Cari makanan (misal: ribeye, salmon, telur...)"
                  value={search} onChange={e => { setSearch(e.target.value); setSelected(null); }} />
                {filtered.length > 0 && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
                    background: 'var(--surface)', border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-md)', marginTop: '4px', overflow: 'hidden'
                  }}>
                    {filtered.map(f => (
                      <button key={f.id} onClick={() => selectFood(f)} style={{
                        width: '100%', padding: '10px 14px', display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer',
                        fontSize: '14px', color: 'var(--text)', borderBottom: '1px solid var(--border)',
                        fontFamily: 'var(--font-body)'
                      }}>
                        <span>{f.name}</span>
                        <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
                          {f.per100.cal} kcal / 100{f.unit}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <select value={mealType} onChange={e => setMealType(e.target.value)} style={{ width: '140px' }}>
                {meals.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '10px', alignItems: 'flex-end' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '5px' }}>
                  Jumlah ({selected?.unit || 'gram/butir'})
                </label>
                <input type="number" placeholder="100" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <button className="btn-primary" onClick={handleAdd} style={{ height: '42px', whiteSpace: 'nowrap' }}>
                <i className="ti ti-check" /> Tambah
              </button>
            </div>

            {selected && amount && (
              <div style={{ marginTop: '10px', padding: '10px 14px', background: 'var(--surface2)', borderRadius: 'var(--r-md)', fontSize: '13px', color: 'var(--text-muted)' }}>
                Estimasi: <strong style={{ color: 'var(--text)' }}>
                  {Math.round(selected.per100.cal * (selected.unit === 'butir' ? parseFloat(amount) : parseFloat(amount) / 100))} kcal
                </strong> · P: {Math.round(selected.per100.protein * (selected.unit === 'butir' ? parseFloat(amount) : parseFloat(amount) / 100))}g ·
                F: {Math.round(selected.per100.fat * (selected.unit === 'butir' ? parseFloat(amount) : parseFloat(amount) / 100))}g
              </div>
            )}
          </div>
        )}
      </div>

      {/* Meal sections */}
      {meals.map(meal => {
        const entries = byMeal(meal);
        return (
          <div key={meal} style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 500 }}>{meal}</h3>
              {entries.length > 0 && (
                <span style={{ fontSize: '12px', color: 'var(--text-faint)' }}>
                  {entries.reduce((a, e) => a + e.cal, 0)} kcal
                </span>
              )}
            </div>
            {entries.length === 0 ? (
              <div style={{ padding: '1rem', background: 'var(--surface2)', borderRadius: 'var(--r-md)', fontSize: '13px', color: 'var(--text-faint)', textAlign: 'center', border: '1px dashed var(--border-strong)' }}>
                Belum ada catatan {meal.toLowerCase()}
              </div>
            ) : (
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                {entries.map((entry, i) => (
                  <div key={entry.id} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                    borderBottom: i < entries.length - 1 ? '1px solid var(--border)' : 'none'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{entry.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {entry.amount}{entry.unit} · P: {entry.protein}g · F: {entry.fat}g
                      </div>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--red)', fontFamily: 'var(--font-mono)' }}>
                      {entry.cal}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>kcal</div>
                    <button onClick={() => removeFoodEntry(entry.id)} style={{
                      color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '4px', borderRadius: 'var(--r-sm)', transition: 'color 0.1s'
                    }}>
                      <i className="ti ti-trash" style={{ fontSize: '15px' }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
