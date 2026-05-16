import { useState } from 'react';
import { MEAL_PLAN_TEMPLATES, DAYS, DAYS_SHORT } from '../data/data';

function MealCard({ slot, data }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <div style={{ width: '3px', height: '18px', background: 'var(--red)', borderRadius: '2px' }} />
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>{slot} · {data.time}</span>
      </div>
      <div className="card" style={{ padding: '14px 16px' }}>
        <div style={{ fontWeight: 500, fontSize: '15px', marginBottom: '6px' }}>{data.name}</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            <i className="ti ti-flame" style={{ fontSize: '13px', color: 'var(--red)' }} /> {data.cal} kcal
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            <i className="ti ti-meat" style={{ fontSize: '13px', color: '#1D9E75' }} /> Protein {data.protein}g
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            <i className="ti ti-droplet" style={{ fontSize: '13px', color: '#EF9F27' }} /> Lemak {data.fat}g
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MealPlanner() {
  const [activeDay, setActiveDay] = useState(3); // Kamis
  const plan = MEAL_PLAN_TEMPLATES[activeDay];
  const total = {
    cal: plan.breakfast.cal + plan.lunch.cal + plan.dinner.cal,
    protein: plan.breakfast.protein + plan.lunch.protein + plan.dinner.protein,
    fat: plan.breakfast.fat + plan.lunch.fat + plan.dinner.fat,
  };

  const dateStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="page-transition" style={{ maxWidth: '760px' }}>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 600 }}>Meal Planner</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '3px' }}>Rencana makan mingguan carnivore</p>
      </div>

      {/* Day selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', marginBottom: '1.5rem' }}>
        {DAYS_SHORT.map((d, i) => {
          const active = activeDay === i;
          const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
          const isToday = i === todayIdx;
          return (
            <button key={i} onClick={() => setActiveDay(i)} style={{
              padding: '10px 6px', borderRadius: 'var(--r-md)', textAlign: 'center',
              background: active ? 'var(--char)' : 'var(--surface2)',
              border: active ? '1px solid var(--red)' : isToday ? '1px solid var(--border-strong)' : '1px solid var(--border)',
              cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-body)'
            }}>
              <div style={{ fontSize: '10px', color: active ? 'rgba(255,255,255,0.5)' : 'var(--text-faint)', marginBottom: '4px', letterSpacing: '0.04em' }}>
                {d.toUpperCase()}
              </div>
              <div style={{ fontSize: '13px', fontWeight: active ? 600 : 400, color: active ? '#fff' : isToday ? 'var(--text)' : 'var(--text-muted)' }}>
                {isToday ? '•' : i < todayIdx ? '✓' : '-'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Plan header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>{DAYS[activeDay]}</h2>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
            Total: <strong style={{ color: 'var(--text)' }}>{total.cal} kcal</strong> · P: {total.protein}g · F: {total.fat}g
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-ghost" style={{ fontSize: '13px', padding: '8px 14px' }}>
            <i className="ti ti-printer" /> Cetak
          </button>
        </div>
      </div>

      {/* Meal cards */}
      <MealCard slot="Sarapan" data={plan.breakfast} />
      <MealCard slot="Makan Siang" data={plan.lunch} />
      <MealCard slot="Makan Malam" data={plan.dinner} />

      {/* Shopping list */}
      <div className="card" style={{ marginTop: '0.5rem', background: 'var(--char)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div style={{ fontWeight: 500, fontSize: '15px', color: '#fff' }}>Shopping List Minggu Ini</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Estimasi kebutuhan bahan 7 hari</div>
          </div>
          <button className="btn-primary" style={{ fontSize: '13px', padding: '8px 14px' }}>
            <i className="ti ti-download" /> Download
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            ['Daging sapi (ribeye/sirloin)', '2.1 kg'],
            ['Salmon fillet', '750 g'],
            ['Telur ayam', '21 butir'],
            ['Bacon', '500 g'],
            ['Ayam (paha, skin on)', '1.2 kg'],
            ['Mentega unsalted', '250 g'],
            ['Tulang sapi (bone broth)', '1 kg'],
            ['Lamb chops', '350 g'],
          ].map(([item, qty]) => (
            <div key={item} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 12px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--r-sm)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>{item}</span>
              <span style={{ fontSize: '12px', color: 'var(--red-light)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>{qty}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly nutrition overview */}
      <div className="card" style={{ marginTop: '1.25rem' }}>
        <h3 style={{ fontSize: '15px', fontWeight: 500, marginBottom: '1rem' }}>Ringkasan Nutrisi Minggu Ini</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            { label: 'Rata-rata kalori/hari', val: '2.510', unit: 'kcal', color: 'var(--red)' },
            { label: 'Rata-rata protein/hari', val: '195', unit: 'gram', color: '#1D9E75' },
            { label: 'Rata-rata lemak/hari', val: '178', unit: 'gram', color: '#EF9F27' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--surface2)', borderRadius: 'var(--r-md)', padding: '14px', textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-faint)', marginBottom: '6px' }}>{s.label}</div>
              <div style={{ fontSize: '22px', fontWeight: 600, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.val}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-faint)' }}>{s.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
