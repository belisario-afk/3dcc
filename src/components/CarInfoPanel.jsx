import React, { useEffect, useState } from 'react';
import { useApp } from '../App.jsx';
import { getCarDetails } from '../data/carDetails.js';

// UPDATED to support rich detail sections when available.
export default function CarInfoPanel() {
  const { selectedCar, setSelectedCar, setShowBookingForm, setBookingCar } = useApp();
  const [visible, setVisible] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    setVisible(!!selectedCar);
    setDetails(getCarDetails(selectedCar));
  }, [selectedCar]);

  if (!visible || !selectedCar) return null;

  function book() {
    setBookingCar(selectedCar);
    setShowBookingForm(true);
  }

  // Basic fallback badge list for non-detailed cars
  const fallbackBadges = (
    <div className="car-specs">
      <span>Auto</span><span>Premium</span><span>GPS</span><span>AC</span><span>Insurance</span>
    </div>
  );

  return (
    <div className="car-info-panel panel">
      <div className="car-info-header">
        <div style={{ flexGrow: 1 }}>
          <h2 style={{ marginBottom: 4 }}>{selectedCar.name}</h2>
          <div className="car-price">${selectedCar.pricePerDay} / day</div>
        </div>
        <button className="close-btn" onClick={() => setSelectedCar(null)}>✕</button>
      </div>

      {!details && fallbackBadges}

      {details && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.75rem', maxHeight: '40vh', overflowY: 'auto', paddingRight: 4 }}>
          <SectionBlock section={details.overview} />
          <PerformanceBlock performance={details.performance} />
          <SectionBlock section={details.bodyTech} />
            <SectionBlock section={details.cockpit} />
          <StatsTable data={details.quickTable} />
          <div style={{ fontSize: '0.67rem', lineHeight: 1.35, color: 'var(--color-text-dim)', letterSpacing: 0.4 }}>
            {details.marketingBlurb}
          </div>
        </div>
      )}

      {!details && (
        <div style={{ fontSize: '0.7rem', lineHeight: 1.4, color: 'var(--color-text-dim)', marginTop: 6 }}>
          Experience unparalleled performance and style. Complimentary delivery within 15 miles. 150 free miles/day.
        </div>
      )}

      <button className="primary-action" onClick={book} style={{ marginTop: '0.9rem' }}>
        <span>Reserve This Car</span>
      </button>
      <button
        className="secondary-action"
        style={{ marginTop: '0.6rem' }}
        onClick={() => alert('Demo: added to comparison list')}
      >
        Add to Compare
      </button>
    </div>
  );
}

function SectionBlock({ section }) {
  if (!section) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ fontSize: '0.63rem', fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
        {section.title}
      </div>
      {section.bullets && (
        <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          fontSize: '0.68rem',
          lineHeight: 1.2,
          color: 'var(--color-text-dim)'
        }}>
          {section.bullets.map((b, i) => (
            <li key={i} style={{ display: 'flex', gap: 6 }}>
              <span style={{ color: 'var(--color-primary)' }}>•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function PerformanceBlock({ performance }) {
  if (!performance) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: '0.63rem', fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
        {performance.title}
      </div>
      <div style={{
        display: 'grid',
        gap: '4px 8px',
        gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))',
        fontSize: '0.63rem',
        color: 'var(--color-text-dim)'
      }}>
        {performance.specs.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', background: '#1a1f24', padding: '6px 7px', borderRadius: 6, border: '1px solid #22282e' }}>
            <span style={{ fontSize: '0.55rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#88929c' }}>{s.label}</span>
            <span style={{ fontSize: '0.72rem', color: '#d4d7db', marginTop: 2 }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsTable({ data }) {
  if (!data) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: '0.63rem', fontWeight: 600, letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--color-primary)' }}>
        {data.title}
      </div>
      <div style={{
        display: 'grid',
        gap: 4,
        gridTemplateColumns: '1fr 1fr',
        fontSize: '0.62rem'
      }}>
        {data.rows.map(([label, value], i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#181c21',
            border: '1px solid #20262c',
            padding: '6px 7px',
            borderRadius: 6
          }}>
            <span style={{
              color: '#8d949b',
              fontSize: '0.53rem',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>{label}</span>
            <span style={{ color: '#d6d9dd', marginTop: 2 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}