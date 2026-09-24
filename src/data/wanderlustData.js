// WANDERLUST Mock Data & Travel Intelligence Dataset

export const MOOD_TAGS = [
  { id: 'all', label: 'All Expeditions', mood: 'default' },
  { id: 'coastal', label: 'Coastal & Marine', mood: 'coastal' },
  { id: 'tropical', label: 'Tropical Escape', mood: 'tropical' },
  { id: 'mountain', label: 'Mountain & Alpine', mood: 'mountain' },
  { id: 'city', label: 'Metropolitan & Culture', mood: 'city' },
  { id: 'desert', label: 'Desert & Oasis', mood: 'desert' },
];

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, code: 'USD' },
  EUR: { symbol: '€', rate: 0.92, code: 'EUR' },
  GBP: { symbol: '£', rate: 0.79, code: 'GBP' },
  INR: { symbol: 'TP ', rate: 83.2, code: 'INR' },
};

export const HOW_IT_WORKS_STEPS = [
  {
    code: 'DEPART',
    stepNumber: '01',
    title: 'Charter Your Vector',
    desc: 'Specify your dates, mood, and budget. Our navigational engine maps your initial Flight Path arc in real time.'
  },
  {
    code: 'CRUISE',
    stepNumber: '02',
    title: 'AI + Navigator Precision',
    desc: 'Our AI concierge collaborates with veteran expedition leads to curate bespoke stays, flights, and private access.'
  },
  {
    code: 'ARRIVE',
    stepNumber: '03',
    title: 'Live Flight Path Control',
    desc: 'Lock in your itinerary with split-flap departure confirmation and real-time live navigation on the ground.'
  }
];

export const TRUST_PARTNERS = [
  { name: 'IATA Accredited', code: 'IATA #96-24810' },
  { name: 'ATOL Protected', code: 'ATOL #10894' },
  { name: 'National Geographic Travel Partner', code: 'EXPD-2026' },
  { name: 'Condé Nast Traveler Gold List', code: 'CNT-99' },
  { name: 'Star Alliance Flight Network', code: 'SA-GLOBAL' },
];

export const DESTINATIONS = [
  {
    id: 'tokyo-cyber-tradition',
    title: 'Tokyo & Mount Fuji Traverse',
    country: 'Japan',
    location: 'Tokyo / Hakone / Kyoto',
    moodTag: 'city',
    priceUSD: 3450,
    durationDays: 9,
    distanceKm: 10890,
    rating: 4.96,
    flightCode: 'WP-802',
    badge: 'Exclusive',
    tagline: 'Neon skylines meets Zen temple sanctuaries and high-speed bullet train arcs.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    description: 'Experience Japan at its highest navigational fidelity. From private omakase counter reservations in Ginza to sunrise views over Lake Kawaguchiko at the foot of Fuji.',
    highlights: [
      'First-class Shinkansen bullet train pass included',
      'Private ryokan stay with natural volcanic hot springs',
      'VIP tea ceremony access in Kyoto’s Gion district',
      '24/7 dedicated local concierge assistance'
    ],
    itineraryNodes: [
      { day: 1, type: 'flight', title: 'Depart Home → HND Tokyo', location: 'Tokyo Haneda', time: '14:20 JST', flightCode: 'NH-105', status: 'confirmed', description: 'Direct non-stop flight in business class suite. In-flight wine tasting.' },
      { day: 2, type: 'stay', title: 'Check-in: Aman Tokyo Peninsula', location: 'Otemachi, Tokyo', time: '17:00 JST', status: 'confirmed', description: 'Corner suite overlooking imperial palace gardens and Tokyo tower.' },
      { day: 3, type: 'activity', title: 'Sunrise Tsukiji & Ginza Omakase', location: 'Ginza, Tokyo', time: '08:30 JST', status: 'scheduled', description: 'Private master-chef culinary journey through Tsukiji outer market.' },
      { day: 5, type: 'transit', title: 'Bullet Train to Hakone & Fuji', location: 'Hakone Valley', time: '10:15 JST', status: 'scheduled', description: 'Romancecar transit into scenic misty mountain passes.' },
      { day: 7, type: 'activity', title: 'Kyoto Bamboo Grove & Golden Pavilion', location: 'Arashiyama', time: '09:00 JST', status: 'scheduled', description: 'Private early-hour garden access before public opening.' },
      { day: 9, type: 'flight', title: 'Return Vector KIX → Home', location: 'Kansai Int.', time: '18:40 JST', flightCode: 'JL-062', status: 'scheduled', description: 'Priority lounge check-in and return flight.' }
    ]
  },
  {
    id: 'amalfi-yacht-coastline',
    title: 'Amalfi Coast & Capri Yacht Charter',
    country: 'Italy',
    location: 'Positano / Amalfi / Capri',
    moodTag: 'coastal',
    priceUSD: 4200,
    durationDays: 7,
    distanceKm: 7420,
    rating: 4.98,
    flightCode: 'WP-310',
    badge: 'Popular',
    tagline: 'Dramatic cliffside villas, lemon grove terraces, and private Riva yacht passages.',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    description: 'Sail the azure waters of the Tyrrhenian Sea. Stay in historic cliffside palazzos overlooking Positano harbor with private helicopter transfers.',
    highlights: [
      '3-day private Riva yacht charter around Capri Blue Grotto',
      'Michelin-starred cliffside dining at Le Sirenuse',
      'Helicopter transfer from Naples airport directly to Ravello',
      'Limoncello cellar tasting experience'
    ],
    itineraryNodes: [
      { day: 1, type: 'flight', title: 'Vector Launch → NAP Naples', location: 'Naples Int.', time: '11:45 CET', flightCode: 'AZ-214', status: 'confirmed', description: 'Helicopter transfer waiting at tarmac terminal.' },
      { day: 2, type: 'stay', title: 'Palazzo Avino Cliff Suite', location: 'Ravello', time: '15:00 CET', status: 'confirmed', description: 'Infinity pool floating 1,000 feet above the Mediterranean shoreline.' },
      { day: 4, type: 'activity', title: 'Private Yacht Charter to Capri', location: 'Capri Marina Piccola', time: '09:30 CET', status: 'scheduled', description: 'Skippered Riva 48 boat with champagne and secluded swimming coves.' },
      { day: 7, type: 'flight', title: 'Return Flight NAP → Home', location: 'Naples Int.', time: '16:10 CET', flightCode: 'LH-940', status: 'scheduled', description: 'Chauffeur airport transfer and VIP security fast-track.' }
    ]
  },
  {
    id: 'swiss-alps-heli-ski',
    title: 'Swiss Alps & Zermatt Matterhorn Pass',
    country: 'Switzerland',
    location: 'Zermatt / St. Moritz',
    moodTag: 'mountain',
    priceUSD: 5100,
    durationDays: 8,
    distanceKm: 6280,
    rating: 4.95,
    flightCode: 'WP-404',
    badge: 'Exclusive',
    tagline: 'Glacier heli-skiing, snow-covered chalets, and the iconic Gornergrat railway.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    description: 'Carve untouched alpine powder beneath the shadow of the Matterhorn. Relax with high-altitude spa therapy and fondue cellars.',
    highlights: [
      'Glacier heli-skiing with certified IFMGA mountain guide',
      'Glacier Express Excellence Class rail passage',
      'Thermal spa hydrotherapy pass at The Chedi Andermatt',
      'Ski-in ski-out luxury chalet booking'
    ],
    itineraryNodes: [
      { day: 1, type: 'flight', title: 'Flight Arrival ZRH Zurich', location: 'Zurich Airport', time: '07:30 CET', flightCode: 'LX-015', status: 'confirmed', description: 'First class baggage priority and Alpine Express train boarding.' },
      { day: 2, type: 'stay', title: 'Check-in: Zermatt Alpine Suite', location: 'Zermatt Village', time: '14:00 CET', status: 'confirmed', description: 'Panoramic fireplace suite facing the Matterhorn peak.' },
      { day: 4, type: 'activity', title: 'Heli-Ski Drop at Monte Rosa Glacier', location: 'Monte Rosa Massif', time: '08:00 CET', status: 'scheduled', description: '4,000-meter drop with private avalanche safety team.' },
      { day: 8, type: 'flight', title: 'Return Departure ZRH → Home', location: 'Zurich Airport', time: '15:45 CET', flightCode: 'LX-016', status: 'scheduled', description: 'Alpine lounge relaxation and boarding.' }
    ]
  },
  {
    id: 'serengeti-great-migration',
    title: 'Serengeti & Ngorongoro Crater Safari',
    country: 'Tanzania',
    location: 'Serengeti Park / Ngorongoro',
    moodTag: 'tropical',
    priceUSD: 4850,
    durationDays: 10,
    distanceKm: 12100,
    rating: 4.99,
    flightCode: 'WP-901',
    badge: 'Popular',
    tagline: 'Witness 1.5 million wildebeest cross Mara River from luxury canvassed safari camps.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    description: 'An unforgettable wilderness arc. Soar in hot air balloons at dawn over endless savannah plains and encounter the Big Five up close.',
    highlights: [
      'Private 4x4 Land Cruiser with master wildlife tracker',
      'Sunrise hot air balloon flight over Mara River crossings',
      'Luxury mobile tented camps that follow wildlife herds',
      'Ngorongoro crater floor game drive & bush dinner'
    ],
    itineraryNodes: [
      { day: 1, type: 'flight', title: 'Vector Flight JRO Kilimanjaro', location: 'Kilimanjaro Int.', time: '19:10 EAT', flightCode: 'QR-1345', status: 'confirmed', description: 'Bush plane connection to Seronera airstrip.' },
      { day: 2, type: 'stay', title: 'Singita Serengeti Canvassed Camp', location: 'Northern Serengeti', time: '12:30 EAT', status: 'confirmed', description: 'Plunge pool deck watching wild elephant herds.' },
      { day: 4, type: 'activity', title: 'Sunrise Balloon Safari & Champagne Bush Breakfast', location: 'Serengeti Plains', time: '05:30 EAT', status: 'scheduled', description: 'Low-altitude flight over stampeding herds.' },
      { day: 10, type: 'flight', title: 'Return Bush Flight JRO → Home', location: 'Kilimanjaro', time: '20:30 EAT', status: 'scheduled', description: 'Transfer and long-haul return flight.' }
    ]
  },
  {
    id: 'iceland-aurora-volcano',
    title: 'Icelandic Aurora & Ice Cave Expedition',
    country: 'Iceland',
    location: 'Reykjavik / Vik / Vatnajökull',
    moodTag: 'mountain',
    priceUSD: 3600,
    durationDays: 7,
    distanceKm: 5400,
    rating: 4.93,
    flightCode: 'WP-108',
    badge: 'Price Drop',
    tagline: 'Crystal blue ice caves, geothermal Blue Lagoon waters, and dancing Northern Lights.',
    image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
    description: 'Chasing the celestial light show across lava fields, black sand beaches, and crystal glacier caverns in luxury super-jeeps.',
    highlights: [
      'Private Aurora Borealis night hunt with astronomer guide',
      'Vatnajökull glacier blue ice cave exploration',
      'Retreat Spa suite at the Blue Lagoon with private lagoon access',
      'Super-Jeep traversal across volcanic highlands'
    ],
    itineraryNodes: [
      { day: 1, type: 'flight', title: 'Vector Flight KEF Reykjavik', location: 'Keflavik Airport', time: '06:15 GMT', flightCode: 'FI-614', status: 'confirmed', description: 'Direct transfer to Blue Lagoon Retreat.' },
      { day: 3, type: 'activity', title: 'Vatnajökull Blue Ice Cave Trek', location: 'Vatnajökull Glacier', time: '10:00 GMT', status: 'scheduled', description: 'Crampon equipped trek into subterranean glacier crystal structures.' },
      { day: 7, type: 'flight', title: 'Return Flight KEF → Home', location: 'Keflavik Airport', time: '17:00 GMT', flightCode: 'FI-615', status: 'scheduled', description: 'Airport departure lounge.' }
    ]
  },
  {
    id: 'bali-cliffside-sanctuary',
    title: 'Bali Eco-Luxury & Ubud Spiritual Arc',
    country: 'Indonesia',
    location: 'Ubud / Uluwatu',
    moodTag: 'tropical',
    priceUSD: 2950,
    durationDays: 8,
    distanceKm: 13400,
    rating: 4.97,
    flightCode: 'WP-770',
    badge: 'Popular',
    tagline: 'Jungle canopy treehouses, rice terrace infinity pools, and holistic wellness healing.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse in the peaceful rhythms of Bali. Stay in eco-conscious bamboo mansions in Ubud and cliffside ocean villas in Uluwatu.',
    highlights: [
      'Private bamboo luxury villa with personal butler and chef',
      'Holistic sound healing session at Pyramids of Chi',
      'Sunset kecak fire dance at Uluwatu temple cliff',
      'Private speedboat excursion to Nusa Penida island'
    ],
    itineraryNodes: [
      { day: 1, type: 'flight', title: 'Flight Arrival DPS Denpasar', location: 'Ngurah Rai Int.', time: '16:40 WITA', flightCode: 'SQ-942', status: 'confirmed', description: 'Escorted fast-track immigration and private transfer.' },
      { day: 3, type: 'activity', title: 'Ubud Rice Terrace Sunrise & Spa', location: 'Tegallalang', time: '06:00 WITA', status: 'scheduled', description: 'Yoga sunrise session and traditional Balinese floral bath.' },
      { day: 8, type: 'flight', title: 'Return Vector DPS → Home', location: 'Denpasar', time: '21:15 WITA', status: 'scheduled', description: 'VIP airport transfer.' }
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Eleanor Vance',
    role: 'Architectural Director',
    trip: 'Tokyo & Mount Fuji Traverse',
    rating: 5,
    comment: 'Gumnu JUM completely changed how I think about travel. The Flight Path itinerary rail kept every leg crystal clear, and the private bullet train transfers were seamless.',
    date: 'OCT 2025'
  },
  {
    id: 2,
    name: 'Marcus Sterling',
    role: 'Venture Partner',
    trip: 'Amalfi Coast & Capri Yacht',
    rating: 5,
    comment: 'The instrument panel styling and departure board counters gave the trip a rare, premium feeling. The Riva yacht charter in Capri was unforgettable.',
    date: 'JAN 2026'
  },
  {
    id: 3,
    name: 'Dr. Aris Thorne',
    role: 'Astrophysicist',
    trip: 'Swiss Alps & Zermatt Pass',
    rating: 5,
    comment: 'Precision planning at its best. No generic booking forms — just a continuous arc from departure to return. The AI concierge picked spot-on dining.',
    date: 'MAR 2026'
  }
];
