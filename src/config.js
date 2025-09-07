// UPDATED: added Terzo Millennio as first car; kept existing others.
// If you already modified version 1.1.0 config, merge carefully.
export const APP_TITLE = 'Exotic Car Rental 3D Walkthrough';

export const CAMERA_CONFIG = {
  fov: 70,
  near: 0.1,
  far: 1200,
  startPosition: [0, 1.75, 10],
  mouseSensitivity: {
    yaw: 0.0023,
    pitch: 0.0019
  },
  pitchLimits: {
    min: -Math.PI / 2.4,
    max: Math.PI / 2.6
  }
};

export const MOVEMENT_CONFIG = {
  walkSpeed: 7,
  sprintMultiplier: 1.8,
  acceleration: 55,
  damping: 0.88,
  minVelocity: 0.0005,
  boundary: {
    minX: -55,
    maxX: 55,
    minZ: -55,
    maxZ: 55
  }
};

export const LIGHTING_CONFIG = {
  ambientIntensity: 0.3,
  hemi: {
    skyColor: '#8fb4ff',
    groundColor: '#1d2228',
    intensity: 0.7
  },
  sun: {
    intensity: 2.8,
    position: [65, 95, 40],
    castShadow: true,
    shadow: {
      mapSize: 2048,
      bias: -0.00035,
      normalBias: 0.6,
      camera: {
        near: 1,
        far: 220,
        left: -140,
        right: 140,
        top: 120,
        bottom: -120
      }
    }
  },
  exposure: 1.15,
  envHDR: '/assets/textures/env.hdr'
};

export const PARKING_CONFIG = {
  lotSize: 140,
  textureRepeat: 60,
  lineLength: 5,
  lineWidth: 0.14,
  columns: 14,
  rowSpacing: 10,
  lineLift: 0.002
};

export const CAR_LOAD_DISTANCE = 65;

// ADDED Terzo first (id: car-terzo). model path points to your newly added GLB.
export const CARS = [
  {
    id: 'car-terzo',
    name: 'Lamborghini Terzo Millennio',
    pricePerDay: 2999,               // Concept hypercar premium demo rate
    model: '/assets/models/free__lamborghini_terzo_millennio.glb',
    position: [0, 0, -18],
    rotation: [0, Math.PI / 8, 0],
    // Link to details key (will match in carDetails.js)
    detailsKey: 'terzo'
  },
  { id: 'car-1', name: 'Lamborghini Aventador', pricePerDay: 1299, model: '/assets/models/car1.glb', position: [-12, 0, -12], rotation: [0, Math.PI / 2.2, 0] },
  { id: 'car-2', name: 'Ferrari F8 Tributo', pricePerDay: 1190, model: '/assets/models/car2.glb', position: [0, 0, -15], rotation: [0, -Math.PI / 3, 0] },
  { id: 'car-3', name: 'McLaren 720S', pricePerDay: 1150, model: '/assets/models/car3.glb', position: [12, 0, -12], rotation: [0, Math.PI / 3.5, 0] },
  { id: 'car-4', name: 'Porsche 911 Turbo S', pricePerDay: 899, model: '/assets/models/car4.glb', position: [-18, 0, -30], rotation: [0, Math.PI / 5, 0] },
  { id: 'car-5', name: 'Audi R8 V10 Performance', pricePerDay: 799, model: '/assets/models/car5.glb', position: [18, 0, -28], rotation: [0, -Math.PI / 5, 0] }
];

export const UI_THEMES = {
  primary: '#d4af37',
  accent: '#c0c0c0',
  bg: '#0f1114',
  panel: 'rgba(20,22,26,0.85)',
  panelSolid: '#191c21',
  textLight: '#f5f5f5',
  textDim: '#b5b7ba',
  danger: '#ff5252',
  success: '#21d07a'
};