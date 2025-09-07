// NEW FILE: Structured rich detail definitions for special cars.

export const CAR_DETAILS = {
  terzo: {
    overview: {
      title: 'Concept Overview',
      bullets: [
        'All-electric concept hypercar (Lamborghini x MIT collaboration, unveiled 2017)',
        'Carbon fiber monocoque with energy-storing nano-material panels',
        'Four independent in‑wheel electric motors (torque vectoring)',
        'Next-gen energy storage: body-integrated supercapacitor technology'
      ]
    },
    performance: {
      title: 'Performance (Projected / Concept Targets)',
      specs: [
        { label: 'Top Speed', value: '~220 mph (354 km/h)' },
        { label: '0–60 mph', value: '~2.5 s (est.)' },
        { label: 'Horsepower', value: '≈ 1,000+ hp (theoretical)' },
        { label: 'Torque', value: 'Instant (4 electric motors)' },
        { label: 'Motor RPM', value: '20,000+ (EV motors)' },
        { label: 'Drivetrain', value: 'Fully electric AWD (1 motor per wheel)' }
      ]
    },
    bodyTech: {
      title: 'Body & Energy Tech',
      bullets: [
        'Energy-storing carbon fiber panels act as high-capacity supercapacitors',
        'Self-healing microchannels release healing compounds to repair microcracks',
        'Integrated Y-shaped LED aero lines & airflow sculpting surfaces',
        'Lightweight monocoque engineered for structural energy distribution'
      ]
    },
    cockpit: {
      title: 'Cockpit & Intelligence',
      bullets: [
        'Augmented “Virtual Cockpit” with AR performance overlays',
        'Ghost Lap Mode: AI projects ideal racing line to follow in real time',
        'Adaptive semi-autonomous assist for track learning & analysis'
      ]
    },
    quickTable: {
      title: 'Quick Stats',
      rows: [
        ['Top Speed', '~220 mph / 354 km/h'],
        ['0–60 mph', '~2.5 s (est.)'],
        ['Horsepower', '≈ 1,000+ hp (concept)'],
        ['Torque', 'Instant EV torque'],
        ['Motor RPM', '20,000+'],
        ['Drive Layout', '4 in‑wheel motors (AWD)'],
        ['Body Material', 'Carbon fiber + nanotech'],
        ['Special Feature', 'Self-healing panels']
      ]
    },
    marketingBlurb:
      'The Terzo Millennio explores Lamborghini’s vision of future hypercar energy systems—fusing supercapacitors, structural storage, self-healing composites, and AI-enhanced driving intelligence into a radical electric design.'
  }
};

// Helper to get details safely.
export function getCarDetails(selectedCar) {
  if (!selectedCar) return null;
  if (!selectedCar.detailsKey) return null;
  return CAR_DETAILS[selectedCar.detailsKey] || null;
}