import React from react;
import { CarInfoPanel } from .CarInfoPanel;
import { CarModelViewer } from .CarModelViewer;
import { lamborghiniTerzoMillennio } from ..datacarslamborghini-terzo-millennio;

export const CarDetail React.FC = () = {
  const car = lamborghiniTerzoMillennio;
  return (
    div className=car-detail-layout
      CarModelViewer modelPath={car.modelFile} 
      CarInfoPanel car={car} 
    div
  );
};