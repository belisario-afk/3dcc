import React, { useState, useEffect, createContext, useContext } from 'react';
import ParkingLot from './components/ParkingLot.jsx';
import HUD from './components/HUD.jsx';
import CarInfoPanel from './components/CarInfoPanel.jsx';
import NavigationControls from './components/NavigationControls.jsx';
import { CARS } from './config.js';

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export default function App() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingCar, setBookingCar] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState({ itemsLoaded: 0, itemsTotal: 0, percent: 0 });
  const [isSceneReady, setIsSceneReady] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const value = {
    cars: CARS,
    selectedCar,
    setSelectedCar,
    bookingCar,
    setBookingCar,
    showBookingForm,
    setShowBookingForm,
    loadingProgress,
    setLoadingProgress,
    isSceneReady,
    setIsSceneReady
  };

  return (
    <AppContext.Provider value={value}>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ParkingLot />
        <HUD />
        <CarInfoPanel />
        <NavigationControls />
        {!isSceneReady && (
          <div className="loading-overlay">
            <div className="loading-brand">EXOTIC FLEET</div>
            <div className="progress-bar">
              <div className="progress-inner" style={{ width: `${loadingProgress.percent.toFixed(0)}%` }} />
            </div>
            <div className="progress-info">
              Loading {loadingProgress.itemsLoaded}/{loadingProgress.itemsTotal} ({loadingProgress.percent.toFixed(0)}%)
            </div>
          </div>
        )}
        {showBookingForm && bookingCar && <BookingForm />}
      </div>
    </AppContext.Provider>
  );
}

function BookingForm() {
  const { setShowBookingForm, bookingCar, setBookingCar } = useApp();

  const close = () => {
    setShowBookingForm(false);
    setTimeout(() => setBookingCar(null), 300);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert('Demo only: Booking request submitted!');
    close();
  };

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (!bookingCar) return null;

  return (
    <div className="booking-form-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
      <div className="booking-form panel">
        <button className="close-btn" style={{ position: 'absolute', top: 10, right: 10 }} onClick={close}>✕</button>
        <h3>Book {bookingCar.name}</h3>
        <div className="text-dim" style={{ fontSize: '0.8rem', marginBottom: '0.6rem' }}>
          Daily Rate: <strong style={{ color: 'var(--color-primary)' }}>${bookingCar.pricePerDay}</strong>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="form-field"><label>Name</label><input required placeholder="John Doe" /></div>
            <div className="form-field"><label>Email</label><input type="email" required placeholder="you@example.com" /></div>
            <div className="form-field"><label>Phone</label><input required placeholder="+1 555 123 4567" /></div>
            <div className="form-field"><label>Pickup Date</label><input required type="date" /></div>
            <div className="form-field"><label>Return Date</label><input required type="date" /></div>
            <div className="form-field" style={{ gridColumn: '1 / -1' }}>
              <label>Additional Notes</label>
              <textarea rows={3} placeholder="Flight number, delivery address, requests..." />
            </div>
          </div>
          <div className="inline-actions">
            <button type="button" className="secondary-action" onClick={close}>Cancel</button>
            <button className="primary-action" type="submit">Confirm Booking</button>
          </div>
        </form>
      </div>
    </div>
  );
}