import React from "react";
import type { CarInfo } from "../data/cars/lamborghini-terzo-millennio";

interface Props {
  car: CarInfo;
}

export const CarInfoPanel: React.FC<Props> = ({ car }) => {
  return (
    <div className="car-info-panel">
      <header>
        <h2>🚘 {car.displayName}</h2>
        <p>{car.type} • Unveiled {car.unveiled}</p>
        <small>{car.summary}</small>
      </header>

      <section>
        <h3>Quick Stats</h3>
        <table>
          <tbody>
            {car.quickTable.map(([label, val]) => (
              <tr key={label}>
                <th>{label}</th>
                <td>{val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Technology</h3>
        <ul>
          <li>Energy-Storing Panels: {car.technology.energyStoringBodyPanels ? "Yes" : "No"}</li>
          <li>Self-Healing Panels: {car.technology.selfHealingPanels ? "Yes" : "No"}</li>
          <li>Aero Lighting: {car.technology.aeroLighting}</li>
          <li>Monocoque: {car.technology.monocoqueMaterial}</li>
        </ul>
      </section>

      {car.features.map(group => (
        <section key={group.group}>
          <h4>{group.group}</h4>
          <ul>
            {group.items.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </section>
      ))}

      <footer>
        <small>Tags: {car.tags.join(", ")}</small><br />
        <small>Last Updated: {car.lastUpdated}</small>
      </footer>
    </div>
  );
};