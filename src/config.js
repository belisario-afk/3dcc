export const APP_TITLE = 'Exotic Car Rental 3D Walkthrough';

export const CAMERA_CONFIG = {
  fov: 65,
  near: 0.1,
  far: 1000,
  startPosition: [0, 1.7, 15]
};

export const MOVEMENT_CONFIG = {
  speed: 7,
  sprintMultiplier: 1.7,
  joystickSpeed: 5,
  damping: 0.9,
  boundary: {
    minX: -50,
    maxX: 50,
    minZ: -50,
    maxZ: 50
  }
};

export const LIGHTING_CONFIG = {
  ambientIntensity: 0.6,
  sun: {
    intensity: 2.2,
    position: [40, 60, 25],
    castShadow: true,
    shadow: {
      mapSize: 2048,
      camera: {
        near: 1,
        far: 150,
        left: -80,
        right: 80,
        top: 80,
        bottom: -80
      }
    }
  }
};

export const PARKING_CONFIG = {
  lotSize: 120,
  textureRepeat: 50
};

export const CAR_LOAD_DISTANCE = 60;

export const CARS = [
  { id: 'car-1', name: 'Lamborghini Aventador', pricePerDay: 1299, model: '/assets/models/car1.glb', position: [-10, 0, -10], rotation: [0, Math.PI / 2, 0] },
  { id: 'car-2', name: 'Ferrari F8 Tributo', pricePerDay: 1190, model: '/assets/models/car2.glb', position: [0, 0, -12], rotation: [0, -Math.PI / 4, 0] },
  { id: 'car-3', name: 'McLaren 720S', pricePerDay: 1150, model: '/assets/models/car3.glb', position: [10, 0, -10], rotation: [0, Math.PI / 3, 0] },
  { id: 'car-4', name: 'Porsche 911 Turbo S', pricePerDay: 899, model: '/assets/models/car4.glb', position: [-15, 0, -25], rotation: [0, Math.PI / 6, 0] },
  { id: 'car-5', name: 'Audi R8 V10 Performance', pricePerDay: 799, model: '/assets/models/car5.glb', position: [15, 0, -22], rotation: [0, -Math.PI / 5, 0] }
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