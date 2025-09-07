import type { CarInfo } from "./cars/lamborghini-terzo-millennio";

export function validateCar(car: CarInfo) {
  if (!car.id) throw new Error("Car missing id");
  if (!car.displayName) throw new Error("Car missing displayName");
  if (!car.modelFile.endsWith(".glb")) console.warn("Model file not .glb");
  return true;
}