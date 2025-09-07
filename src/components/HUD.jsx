import React from 'react';
import { useApp } from '../App.jsx';
import { APP_TITLE } from '../config.js';

export default function HUD() {
  const { selectedCar, setShowBookingForm, setBookingCar } = useApp();

  function quickBook() {
    if (selectedCar) {
      setBookingCar(selectedCar);
      setShowBookingForm(true);
    } else {
      alert('Select a car first by clicking on it.');
    }
  }

  return (
    <div className="hud">
      <div className="navbar">
        <div className="logo">
          <span style={{ fontSize: '1.1rem' }}>🛞</span>
          <span>{APP_TITLE}</span>
        </div>
        <nav>
          <a href="#" className="active">Home</a>
          <a href="#cars">Cars</a>
          <a href="#booking">Bookings</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="status-bar">
          {selectedCar ? (
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-dim)', fontSize: '0.65rem', letterSpacing: '1px' }}>SELECTED</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.75rem' }}>{selectedCar.name}</span>
              <span className="inline-sep" />
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>${selectedCar.pricePerDay}/day</span>
            </div>
          ) : (
            <span style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>CLICK A CAR</span>
          )}
          <button className="book-button" onClick={quickBook}>
            <span>Book Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}