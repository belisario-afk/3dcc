import React from "react";
import carDetails from "../data/carDetails.js"; // Adjust if you chose named export or JSON

export default function CarInfoPanel({ carId }) {
  const car = carDetails.find(c => c.id === carId) || carDetails[0];

  if (!car) {
    return <div>No car data found.</div>;
  }

  return (
    <div style={styles.panel}>
      <h2>🚘 {car.displayName}</h2>
      <p style={styles.sub}>
        {car.type} • Unveiled {car.unveiled}
      </p>
      <p style={styles.summary}>{car.summary}</p>

      <h3>Quick Stats</h3>
      <table style={styles.table}>
        <tbody>
          {car.quickTable.map(([label, val]) => (
            <tr key={label}>
              <th style={styles.th}>{label}</th>
              <td style={styles.td}>{val}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Technology</h3>
      <ul>
        <li>Energy-Storing Panels: {car.technology.energyStoringBodyPanels ? "Yes" : "No"}</li>
        <li>Self-Healing Panels: {car.technology.selfHealingPanels ? "Yes" : "No"}</li>
        <li>Aero Lighting: {car.technology.aeroLighting}</li>
        <li>Monocoque: {car.technology.monocoqueMaterial}</li>
      </ul>

      <h3>Panel & Body Tech</h3>
      <ul>
        {car.features.panelBodyTech.map((f, i) => <li key={i}>{f}</li>)}
      </ul>

      <h3>Cockpit & Controls</h3>
      <ul>
        {car.features.cockpit.map((f, i) => <li key={i}>{f}</li>)}
      </ul>

      <p style={styles.meta}>
        Tags: {car.tags.join(", ")}<br />
        Last Updated: {car.lastUpdated}
      </p>
    </div>
  );
}

const styles = {
  panel: {
    fontFamily: "sans-serif",
    background: "#111",
    color: "#eee",
    padding: "1rem",
    borderRadius: 8,
    maxWidth: 520
  },
  sub: {
    marginTop: -10,
    fontSize: "0.9rem",
    opacity: 0.8
  },
  summary: {
    fontSize: "0.95rem",
    lineHeight: 1.4
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1rem"
  },
  th: {
    textAlign: "left",
    padding: "4px 6px",
    width: "40%",
    background: "#1b1b1b"
  },
  td: {
    padding: "4px 6px",
    background: "#181818"
  },
  meta: {
    fontSize: "0.7rem",
    opacity: 0.7,
    marginTop: "1.5rem"
  }
};