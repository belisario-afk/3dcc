import React, { useEffect, useState } from 'react';
import { useApp } from '../App.jsx';

export default function CarInfoPanel() {
  const { selectedCar, setSelectedCar, setShowBookingForm, setBookingCar } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(!!selectedCar); }, [selectedCar]);

  if (!visible || !selectedCar) return null;

  function book() {
    setBookingCar(selectedCar);
    setShowBookingForm(true);
  }

  return (
    <div className="car-info-panel panel">
      <div className="car-info-header">
        <div style={{ flexGrow: 1 }}>
          <h2>{selectedCar.name}</h2>
          <div className="car-price">${selectedCar.pricePerDay} / day</div>
        </div>
        <button className="close-btn" onClick={() => setSelectedCar(null)}>✕</button>
      </div>
      <div className="car-specs">
        <span>Auto</span><span>Premium</span><span>GPS</span><span>AC</span><span>Insurance</span>
      </div>
      <div style={{ fontSize: '0.7rem', lineHeight: 1.4, color: 'var(--color-text-dim)' }}>
        Experience unparalleled performance and style. Complimentary delivery within 15 miles. 150 free miles/day.
      </div>
      <button className="primary-action" onClick={book} style={{ marginTop: '0.9rem' }}>Reserve This Car</button>
      <button className="secondary-action" style={{ marginTop: '0.7rem' }} onClick={() => alert('Demo: added to comparison list')}>
        Add to Compare
      </button>
    </div>
  );
}