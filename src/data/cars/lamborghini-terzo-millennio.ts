export interface CarStat {
  value: number | null;
  unit: string;
  approx?: boolean;
  note?: string;
}

export interface CarInfo {
  id: string;
  displayName: string;
  brand: string;
  unveiled: number;
  type: string;
  modelFile: string;
  driveLayout: string;
  estimated: boolean;
  stats: {
    topSpeed: CarStat;
    topSpeedKmh: CarStat;
    zeroToSixty: CarStat;
    horsepower: CarStat;
    torque: CarStat;
    motorRpm: CarStat;
  };
  technology: {
    energyStoringBodyPanels: boolean;
    selfHealingPanels: boolean;
    aeroLighting: string;
    monocoqueMaterial: string;
  };
  features: { group: string; items: string[] }[];
  quickTable: [string, string][];
  tags: string[];
  summary: string;
  lastUpdated: string;
}

export const lamborghiniTerzoMillennio: CarInfo = {
  id: "lamborghini-terzo-millennio",
  displayName: "Lamborghini Terzo Millennio",
  brand: "Lamborghini",
  unveiled: 2017,
  type: "All-electric concept hypercar",
  modelFile: "/free__lamborghini_terzo_millennio.glb",
  driveLayout: "4 in-wheel motors (AWD)",
  estimated: true,
  stats: {
    topSpeed: { value: 220, unit: "mph", approx: true },
    topSpeedKmh: { value: 354, unit: "km/h", approx: true },
    zeroToSixty: { value: 2.5, unit: "s", approx: true },
    horsepower: { value: 1000, unit: "hp", approx: true },
    torque: { value: null, unit: "", note: "Instant EV torque (4 motors)" },
    motorRpm: { value: 20000, unit: "RPM", approx: true }
  },
  technology: {
    energyStoringBodyPanels: true,
    selfHealingPanels: true,
    aeroLighting: "Y-shaped integrated LED elements",
    monocoqueMaterial: "Carbon fiber + nanomaterial layers"
  },
  features: [
    {
      group: "Panel & Body Tech",
      items: [
        "Carbon fiber panels act as high-rate energy storage.",
        "Self-healing chemistry for crack mitigation.",
        "Y-shaped aero LED signature.",
        "Lightweight monocoque integrates energy modules."
      ]
    },
    {
      group: "Cockpit & Controls",
      items: [
        "AR Virtual Cockpit HUD.",
        "Ghost Car Mode with AI reference line.",
        "Semi-autonomous training / racing assist."
      ]
    }
  ],
  quickTable: [
    ["Top Speed", "~220 mph / 354 km/h"],
    ["0–60 mph", "~2.5 sec"],
    ["Horsepower", "1,000+ hp (theoretical)"],
    ["Torque", "Instant EV torque"],
    ["Motor RPM", "20,000+"],
    ["Drive Layout", "4 in-wheel motors (AWD)"],
    ["Body Material", "Carbon fiber w/ nanotech"],
    ["Special Feature", "Self-healing panels"]
  ],
  tags: ["concept", "electric", "hypercar", "lamborghini", "nanotech"],
  summary: "Concept EV hypercar with structural energy storage and self-healing composite technology.",
  lastUpdated: "2025-09-07"
};