export interface Cafe {
  id: number;
  name: string;
  description: string;
  minConsumption: number;
  availableSlots: number;
  image: string;
  address: string;
  slots: string[];
  amenities: string[];
}

function makeSlots() {
  const slots: string[] = [];
  for (let h = 9; h <= 18; h += 1) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
  }
  return slots;
}

function escapeXml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function makeImage(label: string) {
  const safe = escapeXml(label);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#0b0f1a" stop-opacity="0.10"/><stop offset="1" stop-color="#0b0f1a" stop-opacity="0.02"/></linearGradient></defs><rect width="1200" height="760" fill="url(#g)"/><circle cx="940" cy="190" r="220" fill="#0b0f1a" fill-opacity="0.06"/><circle cx="240" cy="640" r="280" fill="#0b0f1a" fill-opacity="0.04"/><text x="70" y="130" font-family="Manrope, system-ui, -apple-system, Segoe UI" font-size="54" font-weight="800" fill="#0b0f1a" fill-opacity="0.88">${safe}</text><text x="70" y="190" font-family="Manrope, system-ui, -apple-system, Segoe UI" font-size="22" font-weight="600" fill="#0b0f1a" fill-opacity="0.55">Station-friendly café</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const commonAmenities = [
  '5G Wi‑Fi',
  'Power outlets',
  'Bathrooms',
  'Pastry',
  'Food',
  'Pet friendly'
];

const slots = makeSlots();

export const cafes: Cafe[] = [
  {
    id: 1,
    name: 'Coffee House',
    description: 'Cozy workspace with great coffee',
    minConsumption: 5,
    availableSlots: 8,
    image: makeImage('Coffee House'),
    address: 'Carrer de Mallorca 10, Eixample, Barcelona, Spain',
    slots,
    amenities: [...commonAmenities, 'Specialty coffee']
  },
  {
    id: 2,
    name: 'Work & Bean',
    description: 'Perfect for productivity',
    minConsumption: 8,
    availableSlots: 5,
    image: makeImage('Work & Bean'),
    address: 'Carrer de València 42, Eixample, Barcelona, Spain',
    slots,
    amenities: [...commonAmenities, 'Specialty coffee', 'Phone booths']
  },
  {
    id: 3,
    name: 'The Study Cafe',
    description: 'Quiet environment for focus',
    minConsumption: 6,
    availableSlots: 12,
    image: makeImage('The Study Cafe'),
    address: 'Carrer de Provença 88, Gràcia, Barcelona, Spain',
    slots,
    amenities: [...commonAmenities, 'Silent zone', 'Regular coffee']
  },
  {
    id: 4,
    name: 'Velvet Espresso',
    description: 'Minimalist space with serious espresso',
    minConsumption: 7,
    availableSlots: 10,
    image: makeImage('Velvet Espresso'),
    address: 'Carrer del Consell de Cent 31, Sant Antoni, Barcelona, Spain',
    slots,
    amenities: [...commonAmenities, 'Specialty coffee', 'Vegan options']
  },
  {
    id: 5,
    name: 'Sunroom Roasters',
    description: 'Bright seating, calm music, great roasts',
    minConsumption: 6,
    availableSlots: 9,
    image: makeImage('Sunroom Roasters'),
    address: 'Carrer de Girona 9, Eixample, Barcelona, Spain',
    slots,
    amenities: [...commonAmenities, 'Specialty coffee', 'Outdoor seating']
  },
  {
    id: 6,
    name: 'Harbor & Grind',
    description: 'Spacious tables with reliable outlets',
    minConsumption: 5,
    availableSlots: 14,
    image: makeImage('Harbor & Grind'),
    address: 'Passeig de Colom 2, El Gòtic, Barcelona, Spain',
    slots,
    amenities: [...commonAmenities, 'Regular coffee', 'Sandwiches']
  }
];

export function getCafeById(id: number): Cafe | undefined {
  return cafes.find((c) => c.id === id);
}
