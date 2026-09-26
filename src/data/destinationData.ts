import { TravelPackage, PopularCategory } from '../types';

export const POPULAR_DESTINATION_CATEGORIES: PopularCategory[] = [
  { id: 'all', name: 'All Journeys', icon: 'Globe' },
  { id: 'domestic', name: 'Domestic Escapes', icon: 'MapPin' },
  { id: 'international', name: 'International Adventures', icon: 'Plane' },
  { id: 'beach', name: 'Beaches & Coastal', icon: 'Sun' },
  { id: 'mountains', name: 'Snow & Mountains', icon: 'Snowflake' },
  { id: 'luxury', name: 'Bespoke Luxury', icon: 'Sparkles' },
  { id: 'romantic', name: 'Honeymoon & Couples', icon: 'Heart' }
];

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A NEW DESTINATION:
// 1. Copy one package block below and paste it inside TRAVEL_PACKAGES array
// 2. Give it a unique id (e.g. 'pkg-newplace') and slug (e.g. 'newplace-adventure')
// 3. Create folder: public/images/destinations/newplace/
// 4. Add images: hero.webp, glimpse-1..4.webp, spot-xxx.webp
// 5. Update heroImage, galleryImages, and touristSpot image paths
// 6. Save file — Vite hot-reloads instantly in dev
// ─────────────────────────────────────────────────────────────────────────────

export const TRAVEL_PACKAGES: TravelPackage[] = [

  // ════════════════════════════════════════
  // ✈️  INTERNATIONAL DESTINATIONS
  // ════════════════════════════════════════

  {
    id: 'pkg-dubai',
    slug: 'dubai-luxury-glamour',
    name: 'Dubai: Futuristic Marvels & Desert Safari',
    tagline: 'World-record architecture, golden desert dunes, and luxury marina lifestyle',
    overview: 'Dubai stands as the global capital of modern luxury, showcasing soaring super-skyscrapers, artificial palm islands, high-fashion shopping, and authentic Arabian desert culture.',
    location: 'Dubai & Abu Dhabi',
    stateOrCountry: 'United Arab Emirates',
    category: 'international',
    vibe: ['luxury', 'adventure'],
    rating: 4.95,
    reviewCount: 520,
    bestSeason: 'October to April (Warm Sunny Winter)',
    heroImage: '/images/destinations/dubai/hero.webp',
    galleryImages: [
      '/images/destinations/dubai/glimpse-1.webp',
      '/images/destinations/dubai/glimpse-2.webp',
      '/images/destinations/dubai/glimpse-3.webp',
      '/images/destinations/dubai/glimpse-4.webp',
    ],
    whyVisit: [
      'Fast-track tickets to Burj Khalifa At The Top (Levels 124 & 125)',
      'VIP 4x4 Red Dune Desert Safari with BBQ dinner & Tanoura show',
      'Sunset luxury yacht cruise around Dubai Marina & Palm Jumeirah',
      'Day excursion to Louvre Abu Dhabi & Sheikh Zayed Grand Mosque'
    ],
    includedFeatures: [
      '5-Star Dubai Marina / Downtown Hotel Accommodations',
      'Private airport transfers & private luxury AC vehicles',
      'All attraction entries & UAE Tourist Visa assistance',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-burj-khalifa',
        name: 'Burj Khalifa & Dubai Fountain Show',
        tagline: 'World\'s tallest building standing at 828 meters above Dubai Downtown',
        shortDescription: 'Global architectural icon with breathtaking 360-degree observation decks.',
        fullDescription: 'Ride high-speed double-deck elevators to the 124th and 125th floors of Burj Khalifa. Conclude your evening watching the spectacular choreographed Dubai Fountain show at Dubai Mall waterfront.',
        image: '/images/destinations/dubai/spot-burj-khalifa.webp',
        highlights: ['Level 124/125 Observation Deck', 'Dubai Fountain Water & Light Show', 'Dubai Mall Access'],
        recommendedHours: '3 - 4 Hours',
        entryInfo: 'Timed Entry Tickets Included',
        tag: 'World Record'
      },
      {
        id: 'spot-desert-safari',
        name: 'Premium Red Dune Desert Safari',
        tagline: 'Thrilling 4x4 dune bashing, quad biking, and authentic Arabian desert camp',
        shortDescription: 'High-octane desert adventure with camel riding, henna art, and BBQ dinner under the stars.',
        fullDescription: 'Travel into Lahbab Red Dunes in a land cruiser for exhilarating dune bashing. Capture golden sunset photography over the dunes, followed by a VIP bedouin camp experience with tanoura & fire shows.',
        image: '/images/destinations/dubai/spot-desert-safari.webp',
        highlights: ['Red Dune Bashing', 'Camel Riding & Henna', 'Gourmet BBQ Dinner Show'],
        recommendedHours: '6 Hours (3:00 PM - 9:00 PM)',
        entryInfo: 'Private 4x4 Pickup Included',
        tag: 'Desert Safari'
      },
      {
        id: 'spot-marina-walk',
        name: 'Dubai Marina & JBR Walk',
        tagline: 'Sleek waterfront promenade flanked by twisting skyscrapers and luxury yachts',
        shortDescription: 'Vibrant modern district featuring luxury yachts, fine dining, and JBR beach.',
        fullDescription: 'Stroll along Dubai Marina Walk, explore the luxury yachts at Dubai Harbour, and relax at JBR Beach while enjoying views of Ain Dubai, the world\'s largest observation wheel.',
        image: '/images/destinations/dubai/spot-marina-walk.webp',
        highlights: ['Luxury Yacht Sunset Cruise', 'Ain Dubai Views', 'JBR Beachfront Dining'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Free Public Promenade',
        tag: 'Marina Waterfront'
      }
    ]
  },

  {
    id: 'pkg-thailand',
    slug: 'thailand-tropical-odyssey',
    name: 'Thailand: Island Odyssey & Temples',
    tagline: 'Phi Phi emerald lagoons, Bangkok Grand Palace, and vibrant night gastronomy',
    overview: 'Thailand captures the essence of Southeast Asian tropical luxury—combining limestone karst island archipelagos, ornate Buddhist temples, renowned street food night markets, and warm Thai smiles.',
    location: 'Phuket, Phi Phi Islands, Krabi & Bangkok',
    stateOrCountry: 'Thailand',
    category: 'international',
    vibe: ['beach', 'adventure', 'luxury'],
    rating: 4.90,
    reviewCount: 462,
    bestSeason: 'November to April (Dry Tropical Season)',
    heroImage: '/images/destinations/thailand/hero.webp',
    galleryImages: [
      '/images/destinations/thailand/glimpse-1.webp',
      '/images/destinations/thailand/glimpse-2.webp',
      '/images/destinations/thailand/glimpse-3.webp',
      '/images/destinations/thailand/glimpse-4.webp',
    ],
    whyVisit: [
      'Speedboat catamaran island hopping to Phi Phi Don & Maya Bay',
      'Private longtail boat tour through Pileh Emerald Lagoon',
      'Guided tour of Bangkok Grand Palace & Wat Arun temple',
      'Street food gastronomy tour through Yaowarat Chinatown'
    ],
    includedFeatures: [
      '5-Star Beachfront Resort in Phuket + Central Bangkok Hotel',
      'Island transfers, speedboat charters & private AC vans',
      'All national park conservation fees included',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-phi-phi',
        name: 'Phi Phi Islands & Maya Bay',
        tagline: 'Iconic turquoise lagoons enclosed by dramatic sheer limestone cliffs',
        shortDescription: 'World-renowned tropical archipelago made famous by "The Beach" movie.',
        fullDescription: 'Board a luxury speedboat to Phi Phi Islands. Swim in the calm emerald waters of Pileh Lagoon, snorkel among vibrant coral reefs, and walk the white sands of Maya Bay.',
        image: '/images/destinations/thailand/spot-phi-phi.webp',
        highlights: ['Maya Bay Beach', 'Pileh Emerald Lagoon Swimming', 'Coral Reef Snorkeling'],
        recommendedHours: 'Full Day Catamaran Excursion',
        entryInfo: 'Speedboat & National Park Permit Included',
        tag: 'Tropical Paradise'
      },
      {
        id: 'spot-grand-palace',
        name: 'Bangkok Grand Palace & Wat Arun',
        tagline: 'Ornate gold-leaf royal complex and iconic Temple of Dawn along Chao Phraya River',
        shortDescription: 'Spiritual heart of Thailand with gilded pagoda spires and Emerald Buddha.',
        fullDescription: 'Marvel at the intricate gold mosaics of the Grand Palace and Wat Phra Kaew (Temple of the Emerald Buddha). Cross the Chao Phraya River on a shuttle boat to admire the porcelain spires of Wat Arun.',
        image: '/images/destinations/thailand/spot-grand-palace.webp',
        highlights: ['Temple of Emerald Buddha', 'Wat Arun Porcelain Spire', 'Chao Phraya River Boat'],
        recommendedHours: '3 - 4 Hours',
        entryInfo: 'Palace Dress Code Required',
        tag: 'Royal Heritage'
      }
    ]
  },

  {
    id: 'pkg-vietnam',
    slug: 'vietnam-hidden-gems',
    name: 'Vietnam: Ha Long Bay & Ancient Hoi An',
    tagline: 'Emerald limestone karsts, UNESCO lantern towns, and world-class street food culture',
    overview: 'Vietnam enchants with its dramatic Ha Long Bay seascape, perfectly preserved ancient town of Hoi An, and the vibrant energy of Ho Chi Minh City. A land of extraordinary contrasts — from misty mountain terraces to turquoise coastal bays.',
    location: 'Hanoi, Ha Long Bay, Hoi An & Ho Chi Minh City',
    stateOrCountry: 'Vietnam',
    category: 'international',
    vibe: ['beach', 'adventure', 'luxury'],
    rating: 4.88,
    reviewCount: 376,
    bestSeason: 'February to April & August to October (Dry Season)',
    heroImage: '/images/destinations/vietnam/hero.webp',
    galleryImages: [
      '/images/destinations/vietnam/glimpse-1.webp',
      '/images/destinations/vietnam/glimpse-2.webp',
      '/images/destinations/vietnam/glimpse-3.webp',
      '/images/destinations/vietnam/glimpse-4.webp',
    ],
    whyVisit: [
      'Private overnight luxury junk cruise through Ha Long Bay\'s 1,969 limestone islands',
      'Sunset lantern release ceremony in Hoi An Ancient Town',
      'Street food motorbike tour through Hanoi Old Quarter',
      'Cooking class with market visit at a traditional Vietnamese family home'
    ],
    includedFeatures: [
      'Luxury Cruise Cabin + 4-Star Hotels in Hanoi & Hoi An',
      'Private AC vehicles & domestic flight Hanoi–Da Nang–Ho Chi Minh',
      'Vietnam E-Visa assistance included',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-halong-bay',
        name: 'Ha Long Bay Overnight Cruise',
        tagline: '1,969 dramatic limestone karst islands rising from UNESCO emerald waters',
        shortDescription: 'World Heritage seascape explored aboard a private luxury junk boat.',
        fullDescription: 'Glide through the legendary waters of Ha Long Bay on a private luxury junk. Kayak through hidden sea caves, swim in secluded lagoons, watch the sunrise over misty karst silhouettes, and enjoy freshly caught seafood banquets on deck.',
        image: '/images/destinations/vietnam/spot-halong.webp',
        highlights: ['Overnight Luxury Junk Cruise', 'Sea Cave Kayaking', 'Sunrise Kayak at Titop Island'],
        recommendedHours: '2 Days / 1 Night',
        entryInfo: 'Bay Entry Permit & Cruise Included',
        tag: 'UNESCO Wonder'
      },
      {
        id: 'spot-hoi-an',
        name: 'Hoi An Ancient Town',
        tagline: 'Perfectly preserved 15th-century trading port glowing with silk lanterns at dusk',
        shortDescription: 'UNESCO World Heritage town famous for tailor shops, lantern festivals, and White Rose dumplings.',
        fullDescription: 'Wander the golden-painted streets of Hoi An\'s Ancient Town as silk lanterns cast a warm glow over the Thu Bon River. Cycle through rice paddies to Tra Que vegetable village and release paper lanterns onto the river at dusk.',
        image: '/images/destinations/vietnam/spot-hoian.webp',
        highlights: ['Lantern Release Ceremony', 'Thu Bon River Boat Ride', 'Custom Tailor Suit in 24 Hours'],
        recommendedHours: 'Full Day + Evening',
        entryInfo: 'Old Town Walking Pass Included',
        tag: 'Lantern Town'
      },
      {
        id: 'spot-hanoi-oldquarter',
        name: 'Hanoi Old Quarter & Street Food',
        tagline: '36 ancient guild streets brimming with century-old temples and legendary Pho soup',
        shortDescription: 'Vietnam\'s cultural soul — a chaotic, charming labyrinth of ancient trades and street kitchens.',
        fullDescription: 'Explore Hanoi\'s 36-street Old Quarter on foot, visiting the Ngoc Son Temple on Hoan Kiem Lake and the legendary Bia Hoi street. Join a guided evening street food tour sampling Bun Cha, Banh Mi, and egg coffee.',
        image: '/images/destinations/vietnam/spot-hanoi.webp',
        highlights: ['Hoan Kiem Lake Sunrise Walk', 'Evening Street Food Tour', 'Cyclo Ride Through Old Quarter'],
        recommendedHours: 'Half Day + Evening',
        entryInfo: 'Free Walking Area',
        tag: 'Street Food Capital'
      }
    ]
  },

  {
    id: 'pkg-bali',
    slug: 'bali-tropical-paradise',
    name: 'Bali: Island of Gods & Temples',
    tagline: 'Volcanic sunrises, sacred emerald rice terraces, and cliffside sea temples',
    overview: 'Bali is Indonesia\'s spiritual and tropical sanctuary, renowned for lush jungle sanctuaries in Ubud, dramatic sea cliff temples in Uluwatu, and crystal-clear turquoise waters in Nusa Penida.',
    location: 'Ubud, Uluwatu, Seminyak & Nusa Penida',
    stateOrCountry: 'Bali, Indonesia',
    category: 'international',
    vibe: ['romantic', 'beach', 'luxury'],
    rating: 4.92,
    reviewCount: 389,
    bestSeason: 'April to October (Dry Tropical Season)',
    heroImage: '/images/destinations/bali/hero.webp',
    galleryImages: [
      '/images/destinations/bali/glimpse-1.webp',
      '/images/destinations/bali/glimpse-2.webp',
      '/images/destinations/bali/glimpse-3.webp',
      '/images/destinations/bali/glimpse-4.webp',
    ],
    whyVisit: [
      'Tegallalang Rice Terraces & iconic jungle swing experience',
      'Fast boat day trip to Nusa Penida (Kelingking T-Rex Beach & Angel Billabong)',
      'Uluwatu Sunset Temple with live Kecak Fire Dance performance',
      'Private pool jungle villa in Ubud with floating breakfast'
    ],
    includedFeatures: [
      'Private Ubud Pool Villa + Seminyak Beachfront Resort',
      'Private AC car with English-speaking Balinese driver guide',
      'Fast boat tickets & island transfers to Nusa Penida',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-tegallalang',
        name: 'Tegallalang Rice Terraces',
        tagline: 'Cascading emerald green rice paddies engineered with ancient Subak irrigation',
        shortDescription: 'Iconic Balinese rice terraces surrounded by swaying coconut palms.',
        fullDescription: 'Walk through the dramatic terraced valleys of Tegallalang. Experience the famous Balinese jungle swing overlooking the valley and sample fresh coconut water at traditional farmhouses.',
        image: '/images/destinations/bali/spot-tegallalang.webp',
        highlights: ['Subak Heritage Paddy Trails', 'Jungle Swing Photo Point', 'Artisan Coffee Tasting'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Local Entry Permit Included',
        tag: 'UNESCO Heritage'
      },
      {
        id: 'spot-nusa-penida',
        name: 'Nusa Penida & Kelingking T-Rex Beach',
        tagline: 'Dramatic limestone cliffs shaping a natural T-Rex head over turquoise lagoons',
        shortDescription: 'World-famous coastal cliff view and crystal-clear snorkeling waters.',
        fullDescription: 'Board a high-speed catamaran to Nusa Penida island. Visit the legendary Kelingking T-Rex Cliff, swim at Angel\'s Billabong natural infinity pool, and snap photos at Broken Beach.',
        image: '/images/destinations/bali/spot-nusa-penida.webp',
        highlights: ['Kelingking T-Rex Viewpoint', 'Angel Billabong Natural Pool', 'Broken Beach Archway'],
        recommendedHours: 'Full Day Island Trip',
        entryInfo: 'Fast Boat & Private Island Car Included',
        tag: 'Island Wonder'
      },
      {
        id: 'spot-uluwatu',
        name: 'Uluwatu Temple & Kecak Fire Dance',
        tagline: 'Perched 70 meters high on a sheer ocean cliff overlooking roaring Indian Ocean waves',
        shortDescription: 'Sacred cliffside sea temple renowned for dramatic sunset Kecak fire dance.',
        fullDescription: 'Visit Pura Luhur Uluwatu perched dramatically on a sea cliff edge. Watch the hypnotic sunset Kecak Fire Dance performed by 50+ chanting Balinese dancers as the sun sets over the ocean.',
        image: '/images/destinations/bali/spot-uluwatu.webp',
        highlights: ['70-Meter Sea Cliff Temple', 'Sunset Kecak Fire Dance', 'Jimbaran Seafood Dinner'],
        recommendedHours: '3 Hours (4:30 PM - 7:30 PM)',
        entryInfo: 'Kecak Show Slot Pre-booked',
        tag: 'Cliff Temple'
      }
    ]
  },

  {
    id: 'pkg-azerbaijan',
    slug: 'azerbaijan-land-of-fire',
    name: 'Azerbaijan: Land of Fire & Caspian Wonders',
    tagline: 'Ancient mud volcanoes, futuristic Flame Towers, and the legendary Caspian Sea coastline',
    overview: 'Azerbaijan is the undiscovered gem of the Caucasus — where centuries-old caravanserai bazaars stand beneath futuristic glass flame towers, and ancient fire temples overlook the shimmering Caspian Sea. Baku is the jewel of Central Asia\'s most exciting emerging destination.',
    location: 'Baku, Gobustan, Sheki & Gabala',
    stateOrCountry: 'Azerbaijan',
    category: 'international',
    vibe: ['adventure', 'luxury'],
    rating: 4.85,
    reviewCount: 198,
    bestSeason: 'April to June & September to November (Pleasant Weather)',
    heroImage: '/images/destinations/azerbaijan/hero.webp',
    galleryImages: [
      '/images/destinations/azerbaijan/glimpse-1.webp',
      '/images/destinations/azerbaijan/glimpse-2.webp',
      '/images/destinations/azerbaijan/glimpse-3.webp',
      '/images/destinations/azerbaijan/glimpse-4.webp',
    ],
    whyVisit: [
      'Stroll through Baku\'s UNESCO Walled Old City and Maiden\'s Tower',
      'Visit Gobustan\'s 5,000-year-old prehistoric petroglyphs and mud volcanoes',
      'Night view of the iconic flame-shaped Heydar Aliyev Centre and Flame Towers',
      'Day trip to the magical fire-burning hillside of Yanar Dag'
    ],
    includedFeatures: [
      '5-Star Baku Caspian Waterfront Hotel',
      'Private AC vehicles with bilingual English-Azerbaijani driver guide',
      'Azerbaijan e-Visa processing assistance',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-baku-old-city',
        name: 'Baku Old City (Icherisheher)',
        tagline: 'UNESCO-listed medieval fortress city with 12th-century palaces and Silk Road caravanserais',
        shortDescription: 'Ancient walled city hiding the iconic Maiden\'s Tower and Palace of the Shirvanshahs.',
        fullDescription: 'Walk through the stone-paved alleys of Baku\'s UNESCO Walled City, visit the mysterious 12th-century Maiden\'s Tower, and explore the 15th-century Palace of the Shirvanshahs. End at the vibrant Taza Bazaar for saffron, dried fruits, and local carpets.',
        image: '/images/destinations/azerbaijan/spot-baku-old-city.webp',
        highlights: ['Maiden\'s Tower & Shirvanshah Palace', 'Silk Road Caravanserai', 'Taza Bazaar Spice Market'],
        recommendedHours: '3 - 4 Hours',
        entryInfo: 'UNESCO World Heritage Site — Free Entry',
        tag: 'UNESCO Old City'
      },
      {
        id: 'spot-gobustan',
        name: 'Gobustan Mud Volcanoes & Petroglyphs',
        tagline: 'Bubbling lunar mud volcanoes beside 5,000-year-old Bronze Age rock carvings',
        shortDescription: 'Otherworldly landscape of gurgling mud craters and ancient human art.',
        fullDescription: 'Drive south from Baku to the surreal landscape of Gobustan, home to over 6,000 ancient rock engravings dating back 40,000 years. Continue to the mud volcano field where dozens of craters bubble with cool grey mud — an alien landscape unlike anywhere on Earth.',
        image: '/images/destinations/azerbaijan/spot-gobustan.webp',
        highlights: ['40,000-Year-Old Rock Art', 'Bubbling Mud Volcano Field', 'Gobustan National Museum'],
        recommendedHours: 'Full Day Excursion',
        entryInfo: 'National Reserve Entry Permit Included',
        tag: 'Natural Wonder'
      },
      {
        id: 'spot-flame-towers',
        name: 'Flame Towers & Heydar Aliyev Centre',
        tagline: 'Futuristic LED-clad skyscrapers and Zaha Hadid\'s gravity-defying cultural centre',
        shortDescription: 'Baku\'s iconic modern skyline — best seen illuminated at night from the Baku Boulevard.',
        fullDescription: 'Walk along the Caspian Sea waterfront boulevard as the three Flame Towers light up the night sky. Visit the stunning wave-like Heydar Aliyev Cultural Centre designed by Zaha Hadid, and end the evening with a sunset cruise on the Caspian Sea.',
        image: '/images/destinations/azerbaijan/spot-flame-towers.webp',
        highlights: ['Flame Towers Night Light Show', 'Heydar Aliyev Centre Architecture', 'Caspian Sea Sunset Cruise'],
        recommendedHours: '2 - 3 Hours (Evening)',
        entryInfo: 'Free Exterior — Aliyev Centre: Ticketed',
        tag: 'Modern Marvel'
      }
    ]
  },

  {
    id: 'pkg-singapore',
    slug: 'singapore-city-marvel',
    name: 'Singapore: Garden City & Futuristic Skyline',
    tagline: 'Vertical gardens, infinity rooftop pools, and Asia\'s greatest culinary melting pot',
    overview: 'Singapore is Asia\'s most spectacular city-state — a seamless blend of futuristic architecture, lush tropical gardens, Michelin-starred hawker centres, and world-class theme parks packed into one pristine island.',
    location: 'Singapore',
    stateOrCountry: 'Singapore',
    category: 'international',
    vibe: ['luxury', 'adventure'],
    rating: 4.93,
    reviewCount: 445,
    bestSeason: 'February to April (Least Rain)',
    heroImage: '/images/destinations/singapore/hero.webp',
    galleryImages: [
      '/images/destinations/singapore/glimpse-1.webp',
      '/images/destinations/singapore/glimpse-2.webp',
      '/images/destinations/singapore/glimpse-3.webp',
      '/images/destinations/singapore/glimpse-4.webp',
    ],
    whyVisit: [
      'Iconic Marina Bay Sands SkyPark infinity pool overlooking the entire city',
      'Gardens by the Bay Supertree Grove light & sound show',
      'Universal Studios Singapore full-day theme park experience',
      'Michelin-star hawker centre food trail through Maxwell & Lau Pa Sat'
    ],
    includedFeatures: [
      '5-Star Marina Bay or Orchard Road Hotel',
      'Singapore MRT & private shuttle transfers',
      'Singapore Visa-on-Arrival / e-Visa assistance (Indian passport)',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-gardens-by-bay',
        name: 'Gardens by the Bay & Supertree Grove',
        tagline: '18 towering solar-powered Supertrees bursting with vertical gardens and evening light shows',
        shortDescription: 'Singapore\'s most iconic futuristic park — a vision of nature and technology fused.',
        fullDescription: 'Wander through the climate-controlled Cloud Forest and Flower Dome — the world\'s largest glass greenhouses. As night falls, the 18 giant Supertrees come alive with the spectacular Garden Rhapsody light and music show.',
        image: '/images/destinations/singapore/spot-gardens.webp',
        highlights: ['Supertree Grove Light Show', 'Cloud Forest Misty Waterfall', 'Flower Dome World Record'],
        recommendedHours: '3 - 4 Hours',
        entryInfo: 'Conservatory Tickets Included',
        tag: 'Futuristic Gardens'
      },
      {
        id: 'spot-marina-bay-sands',
        name: 'Marina Bay Sands & Skypark',
        tagline: 'Three soaring hotel towers crowned by a sky-surfboard infinity pool 200m above the city',
        shortDescription: 'Singapore\'s most photographed landmark with the world\'s largest rooftop infinity pool.',
        fullDescription: 'Ascend to the SkyPark Observation Deck atop Marina Bay Sands for panoramic views of Singapore\'s skyline, Supertree Grove, and the Strait of Malacca. Watch the nightly Spectra laser and water show at the waterfront promenade below.',
        image: '/images/destinations/singapore/spot-mbs.webp',
        highlights: ['SkyPark Observation Deck', 'Spectra Light & Water Show', 'ArtScience Museum'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'SkyPark Tickets Included',
        tag: 'Iconic Skyline'
      },
      {
        id: 'spot-sentosa',
        name: 'Sentosa Island & Universal Studios',
        tagline: 'Singapore\'s premier island resort with theme parks, cable cars, and pristine beaches',
        shortDescription: 'A full resort island with Universal Studios, S.E.A Aquarium, and Siloso Beach.',
        fullDescription: 'Cross to Sentosa Island via the Sentosa Boardwalk or cable car. Spend the day at Universal Studios Singapore, ride the world\'s first duelling roller coasters, and relax at Palawan Beach for stunning sunset views.',
        image: '/images/destinations/singapore/spot-sentosa.webp',
        highlights: ['Universal Studios Full Day', 'Sentosa Cable Car Ride', 'Palawan Beach Sunset'],
        recommendedHours: 'Full Day',
        entryInfo: 'Universal Studios Tickets Included',
        tag: 'Island Resort'
      }
    ]
  },

  {
    id: 'pkg-malaysia',
    slug: 'malaysia-tropical-paradise',
    name: 'Malaysia: Twin Towers, Rainforests & Island Bliss',
    tagline: 'Petronas skyline, pristine Langkawi beaches, and the ancient Borneo rainforest',
    overview: 'Malaysia is Southeast Asia\'s most diverse destination — where ultra-modern Kuala Lumpur contrasts with ancient highland rainforests, turquoise Langkawi lagoons, and the UNESCO-listed George Town heritage district of Penang.',
    location: 'Kuala Lumpur, Langkawi, Penang & Genting Highlands',
    stateOrCountry: 'Malaysia',
    category: 'international',
    vibe: ['beach', 'adventure', 'luxury'],
    rating: 4.87,
    reviewCount: 312,
    bestSeason: 'November to February (West Coast) & May to September (East Coast)',
    heroImage: '/images/destinations/malaysia/hero.webp',
    galleryImages: [
      '/images/destinations/malaysia/glimpse-1.webp',
      '/images/destinations/malaysia/glimpse-2.webp',
      '/images/destinations/malaysia/glimpse-3.webp',
      '/images/destinations/malaysia/glimpse-4.webp',
    ],
    whyVisit: [
      'Sunrise view from Petronas Twin Towers Sky Bridge on Level 41',
      'Island-hopping speedboat tour through Langkawi\'s mangrove forests and eagle feeding',
      'George Town street art and Nyonya laksa culinary heritage walk in Penang',
      'Genting Highlands cable car and SkyAvenue cloud-level entertainment complex'
    ],
    includedFeatures: [
      '4-Star KL City Centre Hotel + Langkawi Beach Resort',
      'Langkawi ferry, domestic flight KL-Langkawi & all airport transfers',
      'Malaysia Visa-on-Arrival (Indian passport — free entry)',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-petronas',
        name: 'Petronas Twin Towers & KLCC',
        tagline: 'World\'s tallest twin towers standing at 452 meters above the Kuala Lumpur skyline',
        shortDescription: 'Malaysia\'s greatest landmark — twin steel-and-glass towers connected by a sky bridge.',
        fullDescription: 'Pre-book your slot to walk the Petronas Twin Towers Sky Bridge on Level 41 and the Observation Deck on Level 86 for sweeping city panoramas. End the day at the spectacular KLCC Park fountain show and dinner at Suria KLCC mall.',
        image: '/images/destinations/malaysia/spot-petronas.webp',
        highlights: ['Level 41 Sky Bridge Walk', 'Level 86 Observation Deck', 'KLCC Park Fountain Show'],
        recommendedHours: '3 Hours',
        entryInfo: 'Timed Slot Tickets Pre-booked',
        tag: 'Twin Towers'
      },
      {
        id: 'spot-langkawi',
        name: 'Langkawi Eagle Feeding & Island Hop',
        tagline: 'UNESCO Geopark island archipelago of 104 islands with emerald mangrove lagoons',
        shortDescription: 'Pristine island paradise famous for white beaches, duty-free shopping, and wildlife.',
        fullDescription: 'Cruise the mangrove forests of Kilim Geopark in a boat, feed white-bellied sea eagles from the water, explore bat-inhabited caves, and swim at the secluded Pregnant Maiden Lake. End with the dramatic Langkawi Cable Car ascent to Mat Cincang Peak.',
        image: '/images/destinations/malaysia/spot-langkawi.webp',
        highlights: ['Mangrove Kayak Safari', 'Sea Eagle Feeding', 'SkyCab Cable Car to 713m Peak'],
        recommendedHours: 'Full Day',
        entryInfo: 'Boat & Cable Car Tickets Included',
        tag: 'UNESCO Geopark'
      },
      {
        id: 'spot-penang',
        name: 'George Town Heritage & Penang Food Trail',
        tagline: 'UNESCO World Heritage city of colonial mansions, street art, and Asia\'s best street food',
        shortDescription: 'Penang is the undisputed food capital of Southeast Asia with a layered cultural soul.',
        fullDescription: 'Cycle through the UNESCO-listed streets of George Town, hunt for Ernest Zacharevic\'s iconic street murals, visit the ornate Kek Lok Si temple complex, and feast on legendary Asam Laksa, Char Kway Teow, and Penang Rojak at the famous Gurney Drive hawker strip.',
        image: '/images/destinations/malaysia/spot-penang.webp',
        highlights: ['UNESCO Street Art Walk', 'Penang Hill Funicular Railway', 'Hawker Centre Food Feast'],
        recommendedHours: 'Full Day',
        entryInfo: 'Free Heritage Walking Area',
        tag: 'Food Capital'
      }
    ]
  },

  {
    id: 'pkg-srilanka',
    slug: 'srilanka-pearl-of-indian-ocean',
    name: 'Sri Lanka: Pearl of the Indian Ocean',
    tagline: 'Ancient Sigiriya rock fortress, whale watching, and pristine golden beaches',
    overview: 'Sri Lanka packs extraordinary diversity into a small island — towering granite rock citadels, centuries-old cave temples, world-class whale watching waters, misty tea-covered hills, and some of Asia\'s most beautiful untouched beaches.',
    location: 'Colombo, Sigiriya, Kandy, Galle & Mirissa',
    stateOrCountry: 'Sri Lanka',
    category: 'international',
    vibe: ['beach', 'adventure', 'romantic'],
    rating: 4.89,
    reviewCount: 287,
    bestSeason: 'December to March (West & South Coasts) & May to September (East Coast)',
    heroImage: '/images/destinations/srilanka/hero.webp',
    galleryImages: [
      '/images/destinations/srilanka/glimpse-1.webp',
      '/images/destinations/srilanka/glimpse-2.webp',
      '/images/destinations/srilanka/glimpse-3.webp',
      '/images/destinations/srilanka/glimpse-4.webp',
    ],
    whyVisit: [
      'Sunrise climb to the 5th-century Sigiriya Lion Rock fortress (UNESCO)',
      'Blue whale watching from Mirissa — the world\'s best whale watching spot',
      'Scenic train journey through Ella\'s misty tea-covered hill country',
      'Galle Fort heritage walk through Dutch colonial ramparts by the Indian Ocean'
    ],
    includedFeatures: [
      'Colonial Boutique Hotels + Beach Villas along the Golden Mile',
      'Private AC vehicle with expert naturalist guide throughout',
      'Sri Lanka ETA e-Visa assistance (Indian nationals)',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-sigiriya',
        name: 'Sigiriya Lion Rock Fortress',
        tagline: '5th-century granite citadel rising 200m from the Sri Lankan jungle — a lost civilization\'s palace',
        shortDescription: 'UNESCO World Heritage Site — one of Asia\'s most dramatic ancient monuments.',
        fullDescription: 'Climb the 1,200 ancient steps carved into Sigiriya\'s sheer rock face, passing the famous 5th-century Apsara frescoes painted directly onto the cliff. Reach the summit ruins of King Kasyapa\'s palace for breathtaking views across Sri Lanka\'s ancient cultural triangle.',
        image: '/images/destinations/srilanka/spot-sigiriya.webp',
        highlights: ['5th-Century Summit Palace Ruins', 'Ancient Apsara Frescoes', 'Water Gardens at the Base'],
        recommendedHours: '3 - 4 Hours',
        entryInfo: 'UNESCO Entry Tickets Included',
        tag: 'UNESCO Fortress'
      },
      {
        id: 'spot-mirissa-whales',
        name: 'Mirissa Whale & Dolphin Watching',
        tagline: 'The world\'s #1 rated spot for blue whale encounters — the largest animals on Earth',
        shortDescription: 'Pristine southern coast waters hosting blue whales, sperm whales, and spinner dolphins.',
        fullDescription: 'Board a small private vessel before dawn from Mirissa Harbour and venture into the warm Indian Ocean. Encounter pods of spinner dolphins at sunrise, then track the magnificent blue whales — up to 30 metres long — in their natural deep-water feeding grounds.',
        image: '/images/destinations/srilanka/spot-mirissa.webp',
        highlights: ['Blue Whale Close Encounters', 'Spinner Dolphin Pod Swim', 'Sea Turtle Snorkeling'],
        recommendedHours: 'Half Day (6:00 AM - 1:00 PM)',
        entryInfo: 'Private Boat Charter Included',
        tag: 'Blue Whale Capital'
      },
      {
        id: 'spot-ella-train',
        name: 'Ella Hill Country & Nine Arch Bridge',
        tagline: 'World\'s most scenic train ride winding through mist-clad tea estates and waterfalls',
        shortDescription: 'The Kandy-to-Ella train journey through Sri Lanka\'s emerald highlands is unmissable.',
        fullDescription: 'Board the iconic blue train from Kandy through the rolling tea hills of Nuwara Eliya. Disembark at Ella — a small mountain town with big views. Hike to Little Adam\'s Peak at sunrise and watch the colonial steam train cross the spectacular Nine Arch Bridge.',
        image: '/images/destinations/srilanka/spot-ella.webp',
        highlights: ['Kandy-Ella Scenic Train Ride', 'Nine Arch Bridge View', 'Little Adam\'s Peak Sunrise Hike'],
        recommendedHours: 'Full Day',
        entryInfo: 'First-Class Train Seats Pre-booked',
        tag: 'Scenic Rail Journey'
      }
    ]
  },

  {
    id: 'pkg-europe',
    slug: 'europe-grand-tour',
    name: 'Europe Grand Tour: Paris, Rome & Santorini',
    tagline: 'Eiffel Tower sunsets, Colosseum history, and Aegean caldera views in one epic journey',
    overview: 'The ultimate European Grand Tour — three iconic capitals that define Western civilization\'s art, romance, and ancient history. From the Champs-Élysées to the Sistine Chapel to Santorini\'s whitewashed clifftop villages, this is a journey for the soul.',
    location: 'Paris (France), Rome (Italy) & Santorini (Greece)',
    stateOrCountry: 'Europe (France · Italy · Greece)',
    category: 'international',
    vibe: ['romantic', 'luxury'],
    rating: 4.97,
    reviewCount: 604,
    bestSeason: 'April to June & September to October (Shoulder Season)',
    heroImage: '/images/destinations/europe/hero.webp',
    galleryImages: [
      '/images/destinations/europe/glimpse-1.webp',
      '/images/destinations/europe/glimpse-2.webp',
      '/images/destinations/europe/glimpse-3.webp',
      '/images/destinations/europe/glimpse-4.webp',
    ],
    whyVisit: [
      'Skip-the-line Eiffel Tower summit access & private Seine River dinner cruise',
      'Vatican Museums priority access — Sistine Chapel & St. Peter\'s Basilica dome',
      'Sunset caldera views from Oia, Santorini — world\'s most romantic sunset village',
      'Colosseum underground & arena floor exclusive guided tour'
    ],
    includedFeatures: [
      'Boutique 4-5 Star Hotels in Paris, Rome & Santorini',
      'All inter-city flights: Paris–Rome–Santorini–Return',
      'Schengen Visa application guidance & document preparation',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-paris',
        name: 'Paris: Eiffel Tower & Louvre',
        tagline: 'The City of Light — romance, impressionist masterpieces, and divine French cuisine',
        shortDescription: 'No destination on Earth matches Paris for timeless beauty and cultural depth.',
        fullDescription: 'Ascend the Eiffel Tower at golden hour and watch Paris sparkle below. Spend a morning inside the Louvre gazing at the Mona Lisa and Venus de Milo. Stroll the Champs-Élysées to the Arc de Triomphe and end the evening with a private dinner cruise on the Seine.',
        image: '/images/destinations/europe/spot-paris.webp',
        highlights: ['Eiffel Tower Summit Access', 'Louvre Priority Entry', 'Seine River Dinner Cruise'],
        recommendedHours: '2 - 3 Days',
        entryInfo: 'Skip-the-Line Tickets Pre-booked',
        tag: 'City of Light'
      },
      {
        id: 'spot-rome',
        name: 'Rome: Colosseum & Vatican City',
        tagline: '2,000 years of civilization — gladiator arenas, papal chapels, and carbonara pasta',
        shortDescription: 'The Eternal City where every cobblestone holds centuries of world history.',
        fullDescription: 'Descend into the underground tunnels of the Colosseum where gladiators once prepared for battle. Cross into Vatican City for a private guided tour of the Sistine Chapel, St. Peter\'s Basilica dome climb, and the Vatican Museums\' Raphael Rooms.',
        image: '/images/destinations/europe/spot-rome.webp',
        highlights: ['Colosseum Arena Floor Tour', 'Sistine Chapel Private Access', 'Trevi Fountain at Dawn'],
        recommendedHours: '2 - 3 Days',
        entryInfo: 'Priority Vatican Tickets Pre-booked',
        tag: 'Eternal City'
      },
      {
        id: 'spot-santorini',
        name: 'Santorini: Oia Sunset & Caldera Cruise',
        tagline: 'Whitewashed clifftop villages cascading into the ancient Aegean volcanic caldera',
        shortDescription: 'The world\'s most photographed island — and the most romantic sunset on Earth.',
        fullDescription: 'Explore the stunning caldera villages of Oia and Imerovigli, swimming in the volcanic hot springs of Nea Kameni. Sail on a private catamaran at sunset around the caldera\'s dramatic volcanic cliffs as the sky turns crimson over the Aegean Sea.',
        image: '/images/destinations/europe/spot-santorini.webp',
        highlights: ['Oia Sunset Viewpoint', 'Private Caldera Catamaran Cruise', 'Volcanic Hot Springs Swim'],
        recommendedHours: '2 - 3 Days',
        entryInfo: 'Catamaran Charter Pre-booked',
        tag: 'Romantic Caldera'
      }
    ]
  },

  {
    id: 'pkg-egypt',
    slug: 'egypt-ancient-wonders',
    name: 'Egypt: Pyramids, Pharaohs & Nile Cruise',
    tagline: 'The Great Pyramid of Giza, Valley of the Kings, and a luxury Nile felucca at sunset',
    overview: 'Egypt is humanity\'s most awe-inspiring open-air museum — from the last surviving Wonder of the Ancient World at Giza to the painted royal tombs of Luxor\'s Valley of the Kings and the temples of Abu Simbel carved into solid Nubian rock.',
    location: 'Cairo, Luxor, Aswan & Abu Simbel',
    stateOrCountry: 'Egypt',
    category: 'international',
    vibe: ['adventure', 'luxury'],
    rating: 4.91,
    reviewCount: 348,
    bestSeason: 'October to April (Cool Desert Temperatures)',
    heroImage: '/images/destinations/egypt/hero.webp',
    galleryImages: [
      '/images/destinations/egypt/glimpse-1.webp',
      '/images/destinations/egypt/glimpse-2.webp',
      '/images/destinations/egypt/glimpse-3.webp',
      '/images/destinations/egypt/glimpse-4.webp',
    ],
    whyVisit: [
      'Enter inside the Great Pyramid of Giza — one of the Seven Wonders of the Ancient World',
      'Luxury 5-Star Nile Cruise from Luxor to Aswan with expert Egyptologist',
      'Valley of the Kings — explore the painted royal tomb of Tutankhamun',
      'Early morning private sound-and-light show at Abu Simbel before tourist crowds'
    ],
    includedFeatures: [
      '5-Star Cairo Hotel + Luxury Nile Cruise Ship cabin',
      'Private English-speaking licensed Egyptologist guide throughout',
      'Egypt e-Visa processing assistance (Indian passport)',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-pyramids-giza',
        name: 'Great Pyramids of Giza & Sphinx',
        tagline: 'The last surviving Wonder of the Ancient World — 4,500 years old and still standing',
        shortDescription: 'The Great Pyramid of Khufu, Khafre, and Menkaure — humanity\'s greatest architectural feat.',
        fullDescription: 'Enter the narrow chambers of the Great Pyramid of Khufu to reach the King\'s burial chamber. Stand face to face with the legendary Great Sphinx as the desert sun rises behind it. Round off with a sunrise camel ride along the Giza Plateau.',
        image: '/images/destinations/egypt/spot-pyramids.webp',
        highlights: ['Inside the Great Pyramid', 'Sunrise Camel Ride on Plateau', 'Great Sphinx Sunrise Photo'],
        recommendedHours: 'Full Day',
        entryInfo: 'Pyramid Interior Tickets Included',
        tag: 'Ancient Wonder'
      },
      {
        id: 'spot-valley-of-kings',
        name: 'Valley of the Kings & Karnak Temple',
        tagline: '64 royal tombs hidden beneath the Theban hills, including Tutankhamun\'s golden treasure',
        shortDescription: 'Egypt\'s royal necropolis — the most painted and ornate tombs in the ancient world.',
        fullDescription: 'Descend into the painted tombs of Ramesses VI and Tutankhamun in the Valley of the Kings. Cross the Nile to the magnificent Karnak Temple — the world\'s largest religious complex — and watch the legendary Sound & Light show at night.',
        image: '/images/destinations/egypt/spot-valley-kings.webp',
        highlights: ['Tutankhamun Tomb Interior', 'Karnak Temple Sound & Light', 'Hatshepsut\'s Mortuary Temple'],
        recommendedHours: 'Full Day',
        entryInfo: '3 Tombs Entry + Karnak Tickets Included',
        tag: 'Royal Necropolis'
      },
      {
        id: 'spot-abu-simbel',
        name: 'Abu Simbel Temples',
        tagline: 'Ramesses II\'s four colossal rock-cut temple guardians watching over the Nubian desert',
        shortDescription: 'UNESCO World Heritage temples carved directly into a sandstone cliff 3,200 years ago.',
        fullDescription: 'Fly to Abu Simbel for the extraordinary rock-cut temples of Ramesses II. Twice a year (Feb 22 & Oct 22), the rising sun penetrates 60 metres inside the temple to illuminate the pharaoh\'s statue — a feat of ancient astronomical engineering.',
        image: '/images/destinations/egypt/spot-abu-simbel.webp',
        highlights: ['Colossal Ramesses II Statues', 'Sun Alignment Phenomenon', 'Nefertari Temple'],
        recommendedHours: 'Full Day (Early Morning)',
        entryInfo: 'Domestic Flight + Entry Included',
        tag: 'Rock-Cut Temples'
      }
    ]
  },

  {
    id: 'pkg-almaty',
    slug: 'almaty-central-asia',
    name: 'Almaty: Snow Peaks, Steppe & Soviet Soul',
    tagline: 'Charyn Canyon\'s red rock gorges, alpine glacier lakes, and Silk Road bazaar energy',
    overview: 'Almaty — Kazakhstan\'s sprawling cultural capital — is Central Asia\'s most exciting emerging destination, combining dramatic Tian Shan mountain scenery, world-class skiing, ancient Silk Road bazaars, and a vibrant cosmopolitan café culture.',
    location: 'Almaty, Charyn Canyon, Kolsai Lakes & Big Almaty Lake',
    stateOrCountry: 'Kazakhstan',
    category: 'international',
    vibe: ['adventure', 'mountains'],
    rating: 4.82,
    reviewCount: 134,
    bestSeason: 'June to September (Alpine Summer) & December to February (Ski Season)',
    heroImage: '/images/destinations/almaty/hero.webp',
    galleryImages: [
      '/images/destinations/almaty/glimpse-1.webp',
      '/images/destinations/almaty/glimpse-2.webp',
      '/images/destinations/almaty/glimpse-3.webp',
      '/images/destinations/almaty/glimpse-4.webp',
    ],
    whyVisit: [
      'Charyn Canyon — the "Grand Canyon of Central Asia" with dramatic red rock formations',
      'Big Almaty Lake — a turquoise glacial gem at 2,500m altitude in the Tian Shan range',
      'Medeu high-altitude speed skating rink and Shymbulak ski resort gondola',
      'Green Bazaar — Central Asia\'s most vibrant spice, dried fruit, and nomadic culture market'
    ],
    includedFeatures: [
      '4-Star Almaty City Centre Hotel',
      'Private 4x4 vehicle for canyon and mountain excursions',
      'Kazakhstan e-Visa / Visa-on-Arrival assistance',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-charyn-canyon',
        name: 'Charyn Canyon & Valley of Castles',
        tagline: '300-metre deep red sandstone canyon sculpted over 12 million years by wind and water',
        shortDescription: 'Kazakhstan\'s most dramatic landscape — the "Grand Canyon of Central Asia".',
        fullDescription: 'Drive three hours east of Almaty to the breathtaking Charyn Canyon. Hike through the Valley of Castles — a 3km gorge of towering red sandstone pinnacles — and picnic by the emerald Charyn River at the canyon floor.',
        image: '/images/destinations/almaty/spot-charyn.webp',
        highlights: ['Valley of Castles Hike', 'Charyn River Riverside Picnic', 'Volcanic Rock Formation Photography'],
        recommendedHours: 'Full Day Excursion',
        entryInfo: 'National Park Permit Included',
        tag: 'Grand Canyon of Asia'
      },
      {
        id: 'spot-big-almaty-lake',
        name: 'Big Almaty Lake & Tian Shan Glaciers',
        tagline: 'Turquoise glacial reservoir at 2,511m altitude encircled by snow-capped Tian Shan peaks',
        shortDescription: 'One of Central Asia\'s most beautiful mountain lakes — vibrant blue against white peaks.',
        fullDescription: 'Ascend the Tian Shan foothills to Big Almaty Lake, a stunning turquoise reservoir that supplies Almaty with fresh mountain water. Continue up the mountain road to 3,000m altitude for panoramic views of the snow-capped peaks stretching into Kyrgyzstan.',
        image: '/images/destinations/almaty/spot-big-almaty-lake.webp',
        highlights: ['2,511m Altitude Turquoise Lake', 'Tian Shan Peak Panoramas', 'Cosmodrome Observatory'],
        recommendedHours: 'Half Day',
        entryInfo: 'Special Mountain Zone Permit Included',
        tag: 'Alpine Glacier Lake'
      },
      {
        id: 'spot-shymbulak',
        name: 'Shymbulak Ski Resort & Medeu',
        tagline: 'Central Asia\'s premier ski resort rising to 3,163m — world-class slopes above the clouds',
        shortDescription: 'Almaty\'s mountain playground — world-class skiing in winter, hiking & gondola in summer.',
        fullDescription: 'Take the gondola from Medeu — the world\'s highest outdoor speed skating rink at 1,691m — up to Shymbulak Resort at 2,260m. In summer, hike the alpine meadow trails to 3,163m Talgar Pass. In winter, ski runs reach International FIS race standards.',
        image: '/images/destinations/almaty/spot-shymbulak.webp',
        highlights: ['Gondola from Medeu to 2,260m', 'Alpine Meadow Hiking Trails', 'Ski Runs to 3,163m'],
        recommendedHours: 'Full Day',
        entryInfo: 'Gondola Passes Included',
        tag: 'Alpine Resort'
      }
    ]
  },

  {
    id: 'pkg-bhutan',
    slug: 'bhutan-last-shangri-la',
    name: 'Bhutan: The Last Shangri-La',
    tagline: 'Tiger\'s Nest monastery, pristine Himalayan forests, and the world\'s most sustainable kingdom',
    overview: 'Bhutan — the Kingdom of Gross National Happiness — is Asia\'s most protected and pristine destination. Strict low-impact tourism policies preserve ancient Buddhist culture, virgin rhododendron forests, and snow-capped Himalayan landscapes in extraordinary clarity.',
    location: 'Paro, Thimphu, Punakha & Bumthang',
    stateOrCountry: 'Bhutan',
    category: 'international',
    vibe: ['mountains', 'luxury', 'romantic'],
    rating: 4.98,
    reviewCount: 167,
    bestSeason: 'March to May (Spring Rhododendrons) & October to December (Clear Himalayan Views)',
    heroImage: '/images/destinations/bhutan/hero.webp',
    galleryImages: [
      '/images/destinations/bhutan/glimpse-1.webp',
      '/images/destinations/bhutan/glimpse-2.webp',
      '/images/destinations/bhutan/glimpse-3.webp',
      '/images/destinations/bhutan/glimpse-4.webp',
    ],
    whyVisit: [
      'Hike to Paro Taktsang (Tiger\'s Nest Monastery) — clinging to a 3,120m sheer cliff face',
      'Punakha Dzong — the most beautiful fortress-monastery in the Himalayas',
      'Sunrise Himalayan panorama from Dochula Pass with 108 memorial chortens',
      'Meet Bhutanese artisans weaving traditional Kishuthara silk in Thimphu'
    ],
    includedFeatures: [
      'Luxury Heritage Boutique Hotels in Paro & Punakha',
      'Mandatory Bhutan Tourism Sustainable Development Fee (SDF) included',
      'Licensed Bhutanese Guide throughout — required by law',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-tigers-nest',
        name: 'Paro Taktsang — Tiger\'s Nest Monastery',
        tagline: 'A sacred monastery perched impossibly on a 900-metre vertical cliff face since 1692',
        shortDescription: 'Bhutan\'s most iconic landmark — a 4-hour hike rewarded by breathtaking spiritual beauty.',
        fullDescription: 'Begin the 4-hour return hike through pine forests and prayer flag-draped ridges to reach Paro Taktsang — the 17th-century monastery built around the cave where Guru Rinpoche meditated in the 8th century. The views of the monastery hanging from the sheer cliff are among the most dramatic in Asia.',
        image: '/images/destinations/bhutan/spot-tigers-nest.webp',
        highlights: ['4-Hour Round-Trip Hike', 'Sacred Meditation Cave', 'Cliff-Edge Monastery Blessing'],
        recommendedHours: 'Full Day',
        entryInfo: 'Entry Fee & Licensed Guide Included',
        tag: 'Sacred Cliff Monastery'
      },
      {
        id: 'spot-punakha-dzong',
        name: 'Punakha Dzong & Suspension Bridge',
        tagline: 'The Jewel of Bhutan — a 17th-century fortress at the confluence of two holy rivers',
        shortDescription: 'Bhutan\'s most magnificent dzong, adorned with intricate Buddhist murals and gilded towers.',
        fullDescription: 'Walk across a traditional wooden suspension bridge to reach Punakha Dzong — the winter palace of Bhutan\'s spiritual leader, built in 1637 at the confluence of the Mo Chhu and Pho Chhu rivers. In spring, jacaranda trees frame the fortress in a purple haze.',
        image: '/images/destinations/bhutan/spot-punakha.webp',
        highlights: ['River Confluence Fortress', 'Jacaranda Spring Blooms', 'Hemp Suspension Bridge Walk'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Entry & Guide Fees Included',
        tag: 'Royal Fortress'
      },
      {
        id: 'spot-dochula-pass',
        name: 'Dochula Pass — 108 Chortens & Himalayan Panorama',
        tagline: '3,100m mountain pass adorned with 108 memorial stupas and views of 5 peaks above 7,000m',
        shortDescription: 'Bhutan\'s most scenic roadside stop — 108 chortens framing a jaw-dropping Himalayan horizon.',
        fullDescription: 'Stop at Dochula Pass on the road between Thimphu and Punakha for the finest Himalayan views in Bhutan. On clear days, see Gangkhar Puensum — the world\'s highest unclimbed mountain — along with Masagang, Tsendagang, and Terigang peaks rising above 7,000m.',
        image: '/images/destinations/bhutan/spot-dochula.webp',
        highlights: ['108 Druk Wangyal Chortens', 'Gangkhar Puensum View (7,570m)', 'Sunrise Mountain Photography'],
        recommendedHours: '1 - 2 Hours (at sunrise)',
        entryInfo: 'Free — On Route to Punakha',
        tag: 'Himalayan Panorama'
      }
    ]
  },

  // ════════════════════════════════════════
  // 🇮🇳  DOMESTIC DESTINATIONS
  // ════════════════════════════════════════

  {
    id: 'pkg-sikkim',
    slug: 'sikkim-himalayan-paradise',
    name: 'Discover the Hidden Paradise of Sikkim',
    tagline: 'Where majestic mountains, peaceful monasteries, and untouched landscapes create an unforgettable Himalayan escape.',
    overview: 'Nestled in the lap of the Eastern Himalayas, Sikkim is a serene wonderland where snow-crowned Kanchenjunga peaks meet sacred high-altitude alpine lakes, ancient Buddhist monasteries, and vibrant rhododendron valleys.',
    location: 'Gangtok, Pelling, Tsomgo & Yumthang',
    stateOrCountry: 'Sikkim, India',
    category: 'domestic',
    vibe: ['mountains', 'romantic', 'luxury'],
    rating: 4.96,
    reviewCount: 310,
    bestSeason: 'March to June (Spring Blossoms) & Oct to Dec (Clear Himalayan Views)',
    heroImage: '/images/destinations/sikkim/hero.webp',
    galleryImages: [
      '/images/destinations/sikkim/glimpse-1.webp',
      '/images/destinations/sikkim/glimpse-2.webp',
      '/images/destinations/sikkim/glimpse-3.webp',
      '/images/destinations/sikkim/glimpse-4.webp',
    ],
    whyVisit: [
      'Witness sunrise over Mt. Kanchenjunga, the world\'s third-highest peak',
      'Visit sacred glacial Tsomgo Lake at 12,400 feet and historic Nathula Pass',
      'Experience peace at Rumtek & Pemayangtse ancient Buddhist monasteries',
      'Walk through the Valley of Flowers in Yumthang surrounded by hot springs'
    ],
    includedFeatures: [
      'Customized tourist spot itinerary allocation',
      'Private 4x4 luxury mountain vehicles with experienced Himalayan drivers',
      'Handpicked boutique mountain retreats with panoramic peak views',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-tsomgo',
        name: 'Tsomgo Glacial Lake & Nathula Pass',
        tagline: 'Sacred glacial lake perched at 12,400 feet reflecting snow-clad Himalayan peaks',
        shortDescription: 'High-altitude sacred lake that changes colors with seasons, surrounded by alpine flora.',
        fullDescription: 'Travel along the winding Himalayan mountain roads to Tsomgo Lake. Enjoy scenic yak rides along the lake shore, and explore the historic Indo-China border trade outpost at Nathula Pass.',
        image: '/images/destinations/sikkim/spot-tsomgo.webp',
        highlights: ['12,400 ft Altitude Glacial Lake', 'Nathula Pass Border Post', 'Scenic Yak Rides'],
        recommendedHours: 'Full Day Excursion',
        entryInfo: 'Special Protected Area Permit Included',
        tag: 'Glacial Wonder'
      },
      {
        id: 'spot-yumthang',
        name: 'Yumthang Valley of Flowers',
        tagline: 'Nature\'s vibrant canvas carpeted with 24+ species of rhododendrons and natural hot springs',
        shortDescription: 'Breathtaking river valley bordered by snow-capped peaks and evergreen pine forests.',
        fullDescription: 'Located in North Sikkim, Yumthang Valley bursts into a riot of colors during spring. Relax in natural thermal sulfur hot springs and marvel at the towering Himalayan glaciers at Zero Point.',
        image: '/images/destinations/sikkim/spot-yumthang.webp',
        highlights: ['Rhododendron Flower Valleys', 'Zero Point Glaciers', 'Natural Thermal Hot Springs'],
        recommendedHours: 'Full Day Excursion',
        entryInfo: 'North Sikkim Special Pass Included',
        tag: 'Alpine Valley'
      },
      {
        id: 'spot-rumtek',
        name: 'Rumtek & Pemayangtse Monasteries',
        tagline: 'Centuries-old Tibetan Buddhist monasteries echoing with morning prayer chants',
        shortDescription: 'Spiritual epicenter of Tibetan Buddhism housing sacred murals and golden stupas.',
        fullDescription: 'Immerse yourself in serenity at Rumtek Monastery, seat of the Karmapa. Admire intricate thangka scroll paintings, golden stupas, and panoramic views of Gangtok valley.',
        image: '/images/destinations/sikkim/spot-rumtek.webp',
        highlights: ['Golden Stupa & Ancient Relics', 'Monk Chanting Ceremonies', 'Himalayan Valley Panoramas'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Open Daily 8:00 AM - 5:00 PM',
        tag: 'Sacred Monastery'
      }
    ]
  },

  {
    id: 'pkg-goa',
    slug: 'goa-escape',
    name: 'Goa Coastal Odyssey',
    tagline: 'Sun-drenched beaches, Portuguese heritage, and vibrant coastal life',
    overview: 'Goa is India\'s premier beach destination, blending golden sands, historic Latin architecture, cascading waterfalls, and world-class coastal dining.',
    location: 'North & South Goa',
    stateOrCountry: 'Goa, India',
    category: 'domestic',
    vibe: ['beach', 'luxury', 'romantic'],
    rating: 4.9,
    reviewCount: 342,
    bestSeason: 'October to May (Peak Beach Season)',
    heroImage: '/images/destinations/goa/hero.webp',
    galleryImages: [
      '/images/destinations/goa/glimpse-1.webp',
      '/images/destinations/goa/glimpse-2.webp',
      '/images/destinations/goa/glimpse-3.webp',
      '/images/destinations/goa/glimpse-4.webp',
    ],
    whyVisit: [
      'Private sunset catamaran cruises in Panjim backwaters',
      'Guided heritage walks through Fontainhas Latin Quarter',
      'Jeep safari excursion to majestic Dudhsagar Waterfalls',
      'Handpicked luxury beachfront villas with private pools'
    ],
    includedFeatures: [
      'Customized tourist spot itinerary allocation',
      'Private AC sedan/SUV for airport & sightseeing transfers',
      'Handpicked 4-star / 5-star resort accommodations',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-dudhsagar',
        name: 'Dudhsagar Waterfalls',
        tagline: 'Four-tiered sea of milk cascading through Bhagwan Mahavir Wildlife Sanctuary',
        shortDescription: 'One of India\'s tallest waterfalls nestled deep inside lush Western Ghats forests.',
        fullDescription: 'Experience an exhilarating 4x4 open jeep jungle safari to reach the majestic Dudhsagar Falls. Swim in fresh natural pools beneath the cascading waters.',
        image: '/images/destinations/goa/spot-dudhsagar.webp',
        highlights: ['4x4 Jungle Jeep Safari', 'Natural Pool Swimming', 'Spice Plantation Buffet Lunch'],
        recommendedHours: 'Full Day Excursion (6-8 hours)',
        entryInfo: 'Forest Permit & Jeep Allocated via Concierge',
        tag: 'Natural Wonder'
      },
      {
        id: 'spot-fort-aguada',
        name: 'Fort Aguada & 1864 Lighthouse',
        tagline: '17th-century Portuguese fortress overlooking the Arabian Sea',
        shortDescription: 'Historic Portuguese fort with panoramic sea views.',
        fullDescription: 'Constructed in 1612, Fort Aguada features a historic freshwater lighthouse and grand stone ramparts offering spectacular sunset views over the Arabian Sea.',
        image: '/images/destinations/goa/spot-fort-aguada.webp',
        highlights: ['1612 Portuguese Ramparts', 'Panoramas of Arabian Sea', 'Sinquerim Beach Access'],
        recommendedHours: '1.5 - 2 Hours',
        entryInfo: 'Open 9:30 AM - 6:00 PM Daily',
        tag: 'Heritage Fort'
      },
      {
        id: 'spot-fontainhas',
        name: 'Fontainhas Latin Quarter',
        tagline: 'Vibrant pastel houses, narrow winding lanes, and authentic Portuguese bakeries',
        shortDescription: 'Asia\'s only Latin Quarter with preserved 19th-century Portuguese mansions.',
        fullDescription: 'Stroll through picturesque cobblestone streets lined with bright yellow, green, and blue Portuguese houses. Stop at historic bakeries for authentic Bebinca and espresso.',
        image: '/images/destinations/goa/spot-fontainhas.webp',
        highlights: ['Heritage Architecture', 'Art Galleries & Cafes', 'Photographic Walking Trails'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Free Walking Area',
        tag: 'Cultural Quarter'
      }
    ]
  },

  {
    id: 'pkg-andaman',
    slug: 'andaman-island-escape',
    name: 'Andaman: Tropical Island Escape',
    tagline: 'Bioluminescent plankton, Asia\'s best beach, and a colonial island prison with a haunting story',
    overview: 'The Andaman Islands are India\'s last untouched tropical paradise — offering world-class scuba diving in crystalline coral reefs, pristine white sand beaches rated among Asia\'s finest, and the chilling history of the British Cellular Jail.',
    location: 'Port Blair, Havelock Island, Neil Island & Baratang',
    stateOrCountry: 'Andaman & Nicobar Islands, India',
    category: 'domestic',
    vibe: ['beach', 'adventure'],
    rating: 4.91,
    reviewCount: 278,
    bestSeason: 'October to May (Clear Waters & Good Visibility)',
    heroImage: '/images/destinations/andaman/hero.webp',
    galleryImages: [
      '/images/destinations/andaman/glimpse-1.webp',
      '/images/destinations/andaman/glimpse-2.webp',
      '/images/destinations/andaman/glimpse-3.webp',
      '/images/destinations/andaman/glimpse-4.webp',
    ],
    whyVisit: [
      'Scuba diving & snorkeling in the world-class coral reefs of Havelock & Neil Island',
      'Radhanagar Beach (Beach No. 7) — voted Asia\'s Best Beach by TIME Magazine',
      'Bioluminescent sea kayaking at night through glowing plankton waters',
      'Cellular Jail Night Sound & Light Show — India\'s most emotional colonial history'
    ],
    includedFeatures: [
      'Beach Resort on Havelock + Port Blair Hotel',
      'Ferry transfers between islands (Port Blair ↔ Havelock ↔ Neil)',
      'PADI-certified scuba diving sessions with equipment',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-radhanagar-beach',
        name: 'Radhanagar Beach — Asia\'s Best Beach',
        tagline: 'Sweeping 2km arc of powder-white sand lapped by the clearest turquoise Andaman Sea',
        shortDescription: 'Ranked Asia\'s Best Beach by TIME Magazine — and it deserves every word of the title.',
        fullDescription: 'Arrive at Radhanagar Beach (Beach No. 7) on Havelock Island for arguably the most beautiful beach in South Asia. The powdery white sand shelves gently into crystal-clear turquoise waters shaded by ancient moist deciduous forest. Sunset here is a religious experience.',
        image: '/images/destinations/andaman/spot-radhanagar.webp',
        highlights: ['Asia\'s Best Beach Sunset', 'Crystal Clear Snorkeling Waters', 'Dense Tropical Forest Backdrop'],
        recommendedHours: 'Full Day (Sunrise to Sunset)',
        entryInfo: 'Beach Free — Forest Entry ₹25',
        tag: 'Asia\'s Best Beach'
      },
      {
        id: 'spot-cellular-jail',
        name: 'Cellular Jail National Memorial',
        tagline: 'The infamous "Kala Pani" colonial prison where India\'s freedom fighters were exiled',
        shortDescription: 'A moving tribute to India\'s independence — the emotional Sound & Light show is unmissable.',
        fullDescription: 'Tour the restored corridors of the British-built Cellular Jail in Port Blair — the remote island prison where Indian freedom fighters including Veer Savarkar were confined in solitary cells. The nightly Sound & Light show narrates their extraordinary sacrifice with stirring effect.',
        image: '/images/destinations/andaman/spot-cellular-jail.webp',
        highlights: ['Historic Solitary Confinement Cells', 'Nightly Sound & Light Show', 'National Memorial Museum'],
        recommendedHours: '2 - 3 Hours + Evening Show',
        entryInfo: 'Museum Ticket + Light Show Included',
        tag: 'National Memorial'
      },
      {
        id: 'spot-havelock-scuba',
        name: 'Havelock Scuba Diving & Coral Reefs',
        tagline: 'Some of Asia\'s richest coral reef ecosystems with visibility exceeding 30 metres',
        shortDescription: 'World-class diving sites teeming with manta rays, turtles, and vivid reef fish.',
        fullDescription: 'Dive at the legendary Elephant Beach and Nemo Reef on Havelock Island. Encounter giant manta rays at the cleaning stations, sea turtles resting on the reef, and schools of glassfish glittering in the sunlit blue water. PADI Open Water certification courses available.',
        image: '/images/destinations/andaman/spot-scuba.webp',
        highlights: ['Manta Ray Dive Sites', 'PADI Scuba Certification Option', 'Sea Turtle Encounters'],
        recommendedHours: 'Full Day (2 Dives)',
        entryInfo: 'PADI Instructor & Equipment Included',
        tag: 'World-Class Diving'
      }
    ]
  },

  {
    id: 'pkg-rajasthan',
    slug: 'rajasthan-royal-splendour',
    name: 'Rajasthan: Royal Palaces & Golden Desert',
    tagline: 'Amber Fort elephants, Jaisalmer sand dunes, and Udaipur\'s lake palace at dusk',
    overview: 'Rajasthan is India\'s most spectacular royal state — where thousand-year-old forts tower over painted havelis, camel caravans cross golden Thar Desert dunes, and Lake Pichola mirrors the rose-pink City Palace of Udaipur.',
    location: 'Jaipur, Jaisalmer, Jodhpur & Udaipur',
    stateOrCountry: 'Rajasthan, India',
    category: 'domestic',
    vibe: ['luxury', 'adventure', 'romantic'],
    rating: 4.93,
    reviewCount: 487,
    bestSeason: 'October to March (Cool Desert Winter)',
    heroImage: '/images/destinations/rajasthan/hero.webp',
    galleryImages: [
      '/images/destinations/rajasthan/glimpse-1.webp',
      '/images/destinations/rajasthan/glimpse-2.webp',
      '/images/destinations/rajasthan/glimpse-3.webp',
      '/images/destinations/rajasthan/glimpse-4.webp',
    ],
    whyVisit: [
      'Sunrise Amber Fort elephant ride and mirror palace interior in Jaipur',
      'Overnight luxury desert camp in Jaisalmer with camel safari and stargazing',
      'Boat cruise on Lake Pichola at sunset to the floating Lake Palace in Udaipur',
      'Mehrangarh Fort and the blue-painted rooftop city of Jodhpur'
    ],
    includedFeatures: [
      'Heritage Palace Hotels in Jaipur, Jaisalmer & Udaipur (ex-royal residences)',
      'Private AC vehicle with English-speaking cultural guide throughout',
      'Luxury Desert Camp with traditional Rajasthani cultural dinner performance',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-amber-fort',
        name: 'Amber Fort & Sheesh Mahal (Jaipur)',
        tagline: 'Magnificent hilltop Rajput fortress with a Hall of Mirrors that dazzles with 1,000 tiny reflections',
        shortDescription: 'Jaipur\'s crown jewel — a 16th-century amber sandstone fort commanding the Aravalli hills.',
        fullDescription: 'Ride the royal pathway up to Amber Fort at sunrise before the crowds arrive. Explore the Sheesh Mahal — Hall of Mirrors — whose thousands of embedded glass tiles create a starlit effect from a single candle. Walk the secret underground passage to Jaigarh Fort above.',
        image: '/images/destinations/rajasthan/spot-amber-fort.webp',
        highlights: ['Sheesh Mahal Hall of Mirrors', 'Ganesh Pol Painted Gateway', 'Maota Lake Sunrise Reflection'],
        recommendedHours: '3 - 4 Hours',
        entryInfo: 'Fort Entry & Guide Included',
        tag: 'Royal Fortress'
      },
      {
        id: 'spot-jaisalmer-dunes',
        name: 'Jaisalmer Dunes & Desert Camp',
        tagline: 'Golden Thar Desert dunes stretching to the horizon — the heart of Rajasthan\'s desert soul',
        shortDescription: 'Camel safari at sunset, luxury desert camp, and a Milky Way sky like nowhere else on Earth.',
        fullDescription: 'Arrive at Sam Sand Dunes by camel as the Thar Desert sun turns the dunes liquid gold. Check into a luxury tented camp with traditional Rajasthani interiors, watch folk dancers and puppet shows, and then lie back on the desert for an extraordinary stargazing session.',
        image: '/images/destinations/rajasthan/spot-jaisalmer-dunes.webp',
        highlights: ['Sunset Camel Safari', 'Luxury Desert Camp Dinner', 'Milky Way Desert Stargazing'],
        recommendedHours: 'Afternoon + Overnight',
        entryInfo: 'Camel Safari & Camp Included',
        tag: 'Golden Desert Camp'
      },
      {
        id: 'spot-udaipur-lake',
        name: 'Udaipur City Palace & Lake Pichola',
        tagline: 'The City of Lakes — India\'s most romantic city with a floating palace and rooftop sunset views',
        shortDescription: 'Udaipur\'s shimmering Lake Pichola and the magnificent City Palace are pure magic at dusk.',
        fullDescription: 'Cruise across Lake Pichola by private boat to the legendary Taj Lake Palace — an 18th-century marble palace floating on the lake. Visit the multi-story City Palace complex, walk the old city bazaars, and watch the sunset from Karni Mata Temple hill above the lake.',
        image: '/images/destinations/rajasthan/spot-udaipur.webp',
        highlights: ['Lake Pichola Sunset Boat Cruise', 'City Palace Museum', 'Floating Taj Lake Palace View'],
        recommendedHours: 'Full Day',
        entryInfo: 'Boat Ride & Palace Entry Included',
        tag: 'City of Lakes'
      }
    ]
  },

  {
    id: 'pkg-kerala',
    slug: 'kerala-gods-own-country',
    name: 'Kerala: Backwaters & Tea Gardens',
    tagline: 'Tranquil Alleppey backwater houseboats, misty Munnar tea hills, and Ayurvedic wellness',
    overview: 'Kerala is celebrated as "God\'s Own Country", offering serene palm-fringed backwater networks, cool spice-scented mountain stations, and century-old holistic wellness traditions.',
    location: 'Alleppey, Munnar, Thekkady & Kovalam',
    stateOrCountry: 'Kerala, India',
    category: 'domestic',
    vibe: ['luxury', 'romantic'],
    rating: 4.88,
    reviewCount: 295,
    bestSeason: 'September to March (Pleasant Backwater Season)',
    heroImage: '/images/destinations/kerala/hero.webp',
    galleryImages: [
      '/images/destinations/kerala/glimpse-1.webp',
      '/images/destinations/kerala/glimpse-2.webp',
      '/images/destinations/kerala/glimpse-3.webp',
      '/images/destinations/kerala/glimpse-4.webp',
    ],
    whyVisit: [
      'Overnight luxury AC houseboat cruise in Vembanad Lake backwaters',
      'Guided walk through 100-year-old Tata tea plantations in Munnar',
      'Periyar Wildlife Sanctuary boat safari in Thekkady',
      'Authentic Abhyangam Ayurvedic spa massage treatments'
    ],
    includedFeatures: [
      'Private Premium AC Houseboat + 4-Star Resort stays',
      'Private AC vehicle with dedicated driver guide',
      'All meals on houseboat & spice plantation tour',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-alleppey-houseboat',
        name: 'Alleppey Backwaters & Houseboat',
        tagline: 'Slow luxury navigation through serene palm-fringed canals and lagoons',
        shortDescription: 'Traditional Kettuvallam houseboat converted into a floating luxury suite.',
        fullDescription: 'Drift along the peaceful canals of Alleppey on a private luxury houseboat staffed with a personal chef. Savor freshly prepared Keralan Karimeen fish curry as village life unfolds along the banks.',
        image: '/images/destinations/kerala/spot-alleppey.webp',
        highlights: ['Overnight Private Houseboat', 'Fresh Keralan Cuisine', 'Vembanad Lake Sunset'],
        recommendedHours: 'Overnight Experience (21 Hours)',
        entryInfo: 'Private Houseboat Booked',
        tag: 'Backwater Haven'
      },
      {
        id: 'spot-munnar-tea',
        name: 'Munnar Tea Plantations & Mattupetty',
        tagline: 'Rolling green tea carpet hills 1,600 meters above sea level',
        shortDescription: 'Misty hill station surrounded by manicured tea estates and waterfalls.',
        fullDescription: 'Explore the rolling tea gardens of Munnar. Visit the Kannan Devan Tea Museum, enjoy echo points at Mattupetty Dam, and spot wild Nilgiri Tahr mountain goats at Eravikulam National Park.',
        image: '/images/destinations/kerala/spot-munnar.webp',
        highlights: ['Tea Museum Tour', 'Eravikulam National Park', 'Mattupetty Dam Views'],
        recommendedHours: 'Full Day Sightseeing',
        entryInfo: 'National Park Entry Permits Allocated',
        tag: 'Misty Hills'
      }
    ]
  },

  {
    id: 'pkg-ladakh',
    slug: 'ladakh-roof-of-world',
    name: 'Ladakh: Roof of the World',
    tagline: 'Pangong Lake azure reflections, Nubra Valley camel dunes, and Buddhist monasteries at 18,000 ft',
    overview: 'Ladakh is the crown of India — a high-altitude desert of extraordinary beauty where turquoise lakes reflect snow-peaked Himalayan giants, ancient mud-brick monasteries cling to clifftops, and double-humped Bactrian camels graze in sand dune valleys.',
    location: 'Leh, Pangong Tso, Nubra Valley & Khardung La',
    stateOrCountry: 'Ladakh, India',
    category: 'domestic',
    vibe: ['mountains', 'adventure'],
    rating: 4.97,
    reviewCount: 402,
    bestSeason: 'June to September (Summer Road Access)',
    heroImage: '/images/destinations/ladakh/hero.webp',
    galleryImages: [
      '/images/destinations/ladakh/glimpse-1.webp',
      '/images/destinations/ladakh/glimpse-2.webp',
      '/images/destinations/ladakh/glimpse-3.webp',
      '/images/destinations/ladakh/glimpse-4.webp',
    ],
    whyVisit: [
      'Camp beside the sapphire-blue Pangong Tso Lake at 4,350m altitude',
      'Cross Khardung La — one of the world\'s highest motorable passes at 18,380 ft',
      'Bactrian camel ride through Nubra Valley\'s sand dunes and stark mountain landscapes',
      'Hemis & Thiksey monastery visits — Ladakh\'s largest Tibetan Buddhist gompa complexes'
    ],
    includedFeatures: [
      'Leh Boutique Heritage Hotel + Pangong Lake Luxury Camp',
      'Private 4x4 Innova/Bolero with acclimatization-trained driver guide',
      'All Inner Line Permits (ILP) for Pangong & Nubra Valley included',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-pangong-lake',
        name: 'Pangong Tso Lake',
        tagline: 'A 134km turquoise saltwater lake straddling India and Tibet at 4,350m altitude',
        shortDescription: 'The most photographed lake in India — its blue colour shifts from azure to teal with the light.',
        fullDescription: 'Drive across the Chang La Pass to reach the spectacular Pangong Tso Lake — a sapphire-blue saltwater lake that extends 60% into Tibet. Camp overnight on the lakeshore to experience the extraordinary stillness of the lake at sunrise, when the Himalayan peaks mirror in the glassy water.',
        image: '/images/destinations/ladakh/spot-pangong.webp',
        highlights: ['Overnight Lakeside Camp at 4,350m', 'Himalayan Peaks Mirror Reflection', '3 Idiots Film Location'],
        recommendedHours: 'Overnight Excursion',
        entryInfo: 'Inner Line Permit Included',
        tag: 'Azure Himalayan Lake'
      },
      {
        id: 'spot-nubra-valley',
        name: 'Nubra Valley & Diskit Monastery',
        tagline: 'A lush green valley of sand dunes, double-humped camels, and the world\'s largest Buddha statue',
        shortDescription: 'The "Valley of Flowers" of Ladakh — where Bactrian camels roam ancient Silk Road dunes.',
        fullDescription: 'Cross Khardung La — one of the world\'s highest motorable roads at 18,380 ft — and descend into the improbable green Nubra Valley. Ride a double-humped Bactrian camel across the cold desert dunes, then visit Diskit Monastery with its 32-metre Maitreya Buddha statue overlooking the valley.',
        image: '/images/destinations/ladakh/spot-nubra.webp',
        highlights: ['Khardung La Top (18,380 ft)', 'Bactrian Camel Sand Dune Ride', 'Diskit 32m Maitreya Buddha'],
        recommendedHours: 'Full Day + Overnight',
        entryInfo: 'ILP Permit & Monastery Entry Included',
        tag: 'Cold Desert Valley'
      },
      {
        id: 'spot-thiksey-monastery',
        name: 'Thiksey & Hemis Monasteries',
        tagline: '12-storey hilltop monastery resembling a miniature Potala Palace of Lhasa',
        shortDescription: 'Ladakh\'s most dramatic monastery — Thiksey\'s 500-year-old fortress-gompa at dawn.',
        fullDescription: 'Wake before sunrise and reach Thiksey Monastery in time for the early morning puja chanting ceremony. Watch orange-robed monks blow long dungchen horns on the rooftop as the sun illuminates the Indus Valley below. Visit Hemis — Ladakh\'s largest monastery — with its spectacular tanka paintings.',
        image: '/images/destinations/ladakh/spot-thiksey.webp',
        highlights: ['Sunrise Puja Ceremony', 'Potala-Style 12-Storey Gompa', 'Hemis Tanka Paintings'],
        recommendedHours: '4 - 5 Hours',
        entryInfo: 'Monastery Entry Donation',
        tag: 'Himalayan Monastery'
      }
    ]
  },

  {
    id: 'pkg-darjeeling',
    slug: 'darjeeling-queen-of-hills',
    name: 'Darjeeling: Queen of the Hills',
    tagline: 'Kanchenjunga sunrise from Tiger Hill, UNESCO Toy Train, and the world\'s finest tea',
    overview: 'Darjeeling is the most romantic hill station in India — a mosaic of British colonial architecture, emerald tea gardens cascading down Himalayan slopes, and the world\'s most famous narrow-gauge mountain railway chugging through misty forests.',
    location: 'Darjeeling, Tiger Hill & Kurseong',
    stateOrCountry: 'West Bengal, India',
    category: 'domestic',
    vibe: ['mountains', 'romantic'],
    rating: 4.87,
    reviewCount: 234,
    bestSeason: 'March to May (Spring Rhododendrons) & October to November (Clear Mountain Views)',
    heroImage: '/images/destinations/darjeeling/hero.webp',
    galleryImages: [
      '/images/destinations/darjeeling/glimpse-1.webp',
      '/images/destinations/darjeeling/glimpse-2.webp',
      '/images/destinations/darjeeling/glimpse-3.webp',
      '/images/destinations/darjeeling/glimpse-4.webp',
    ],
    whyVisit: [
      'Sunrise over Kanchenjunga from Tiger Hill — a golden silhouette above the clouds',
      'UNESCO Darjeeling Himalayan Railway Toy Train joy ride through mountain loops',
      'Tea estate walk and first-flush tasting at a private Darjeeling tea garden',
      'Rock garden, ropeway cable car, and the iconic Batasia Loop spiral railway'
    ],
    includedFeatures: [
      'Colonial Heritage Hotel with Himalayan view rooms',
      'Private AC vehicle + jeep safari for Tiger Hill sunrise',
      'Toy Train tickets (Darjeeling to Ghoom) + Tea Estate guided walk',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-tiger-hill',
        name: 'Tiger Hill Sunrise & Kanchenjunga View',
        tagline: 'The most spectacular Himalayan sunrise in India — Kanchenjunga glowing gold above the sea of clouds',
        shortDescription: 'India\'s most famous sunrise viewpoint at 2,590m — Kanchenjunga is breathtaking.',
        fullDescription: 'Leave your hotel at 4 AM to reach Tiger Hill before dawn. As the sun rises, watch the Kanchenjunga massif — the world\'s third-highest peak — turn from silver to gold to deep orange above a vast sea of clouds. On the clearest days, even Everest is visible on the horizon.',
        image: '/images/destinations/darjeeling/spot-tiger-hill.webp',
        highlights: ['Kanchenjunga Sunrise Golden Hour', 'Everest Horizon View (Clear Days)', 'Sea of Clouds Dawn'],
        recommendedHours: '2 Hours (Pre-Dawn)',
        entryInfo: 'Jeep Safari & Viewpoint Entry Included',
        tag: 'Himalayan Sunrise'
      },
      {
        id: 'spot-toy-train',
        name: 'Darjeeling Himalayan Railway (Toy Train)',
        tagline: 'UNESCO World Heritage narrow-gauge steam railway looping through mountain forests since 1881',
        shortDescription: 'The world\'s most charming mountain railway — 143 years of continuous mountain service.',
        fullDescription: 'Board the legendary Darjeeling Himalayan Railway\'s toy train for a 2-hour joy ride from Darjeeling to Ghoom — the world\'s second-highest railway station. Loop the engineering marvel of Batasia Loop spiral, cross mountain streams, and chug through dense rhododendron forest.',
        image: '/images/destinations/darjeeling/spot-toy-train.webp',
        highlights: ['UNESCO World Heritage Train', 'Batasia Loop Spiral Track', 'Ghoom Monastery Visit'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'First-Class Toy Train Tickets Included',
        tag: 'UNESCO Toy Train'
      },
      {
        id: 'spot-tea-gardens',
        name: 'Darjeeling Tea Estate Walk & Tasting',
        tagline: 'Walk the misty tea gardens where the world\'s finest first-flush Darjeeling tea is hand-plucked',
        shortDescription: 'An intimate guided walk through tea gardens, followed by an expert cupped tea tasting session.',
        fullDescription: 'Walk through the terraced tea gardens with a tea estate manager, learn how tea is hand-plucked and sorted, watch the withering, rolling, and drying process in the factory, and finally sit down to a guided cupping session tasting the delicate first-flush and second-flush Darjeeling varieties.',
        image: '/images/destinations/darjeeling/spot-tea-garden.webp',
        highlights: ['Tea Garden Walk with Estate Manager', 'Factory Processing Demonstration', 'Expert Tea Cupping Session'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Private Estate Tour Arranged',
        tag: 'World\'s Finest Tea'
      }
    ]
  },

  {
    id: 'pkg-srinagar',
    slug: 'srinagar-dal-lake-paradise',
    name: 'Srinagar: Dal Lake & Mughal Gardens',
    tagline: 'Cedar houseboat living, shikara flower markets, and Mughal garden terraces blooming with spring colour',
    overview: 'Srinagar — the Summer Capital of Jammu & Kashmir — is India\'s most romantic lakeside city, where 16th-century Mughal emperors built their paradise gardens, and centuries-old hand-carved cedar houseboats float serenely on the mirror-like waters of Dal Lake.',
    location: 'Srinagar & Dal Lake',
    stateOrCountry: 'Jammu & Kashmir, India',
    category: 'domestic',
    vibe: ['romantic', 'luxury'],
    rating: 4.94,
    reviewCount: 356,
    bestSeason: 'March to June (Spring Tulips & Blossoms) & December to February (Snow Season)',
    heroImage: '/images/destinations/srinagar/hero.webp',
    galleryImages: [
      '/images/destinations/srinagar/glimpse-1.webp',
      '/images/destinations/srinagar/glimpse-2.webp',
      '/images/destinations/srinagar/glimpse-3.webp',
      '/images/destinations/srinagar/glimpse-4.webp',
    ],
    whyVisit: [
      'Luxury houseboat stay on Dal Lake with private butler and Kashmiri hospitality',
      'Sunrise shikara ride to the floating flower and vegetable market on Dal Lake',
      'Shalimar Bagh & Nishat Bagh — Mughal Emperor Jahangir\'s iconic terraced gardens',
      'Tulip Garden — Asia\'s largest tulip garden in full bloom during April'
    ],
    includedFeatures: [
      'Premium Heritage Cedar Houseboat on Dal Lake (private deck & butler)',
      'Private shikara for lake exploration and market visits',
      'Heated AC vehicle with local driver guide',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-dal-lake-srinagar',
        name: 'Dal Lake Houseboat & Shikara',
        tagline: 'The Jewel of Kashmir — a 18 sq km lake of lotus gardens, floating vegetable plots, and cedar houseboats',
        shortDescription: 'India\'s most romantic lake — explored by hand-paddled wooden shikara boats.',
        fullDescription: 'Wake to mist rising off Dal Lake from your private houseboat deck. Board a hand-paddled shikara at 5:00 AM to witness the extraordinary floating vegetable and flower market where vendors trade from boat to boat. Drift through the lotus gardens of Nagin Lake as kingfishers dart overhead.',
        image: '/images/destinations/srinagar/spot-dal-lake.webp',
        highlights: ['Sunrise Floating Market', 'Dal Lake Lotus Garden Shikara', 'Char Chinar Island Picnic'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Private Shikara via Concierge',
        tag: 'Kashmir\'s Jewel'
      },
      {
        id: 'spot-mughal-gardens',
        name: 'Shalimar Bagh & Nishat Bagh',
        tagline: 'Emperor Jahangir\'s cascading terraced paradise gardens overlooking Dal Lake',
        shortDescription: 'Mughal-era formal gardens — a living legacy of the Emperor\'s love for Kashmir.',
        fullDescription: 'Visit Shalimar Bagh — built by Emperor Jahangir for his empress Nur Jahan in 1619 — with its four terraces of chinar trees, marble fountains, and canal water channels. Walk next door to the larger Nishat Bagh with its 12 terraces cascading down to the Dal Lake shoreline.',
        image: '/images/destinations/srinagar/spot-mughal-gardens.webp',
        highlights: ['Shalimar Bagh Marble Fountains', 'Nishat Bagh 12-Terrace Views', 'Chinar Tree Avenue Walk'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Garden Entry Tickets Included',
        tag: 'Mughal Paradise'
      },
      {
        id: 'spot-shankaracharya-temple',
        name: 'Shankaracharya Temple & Old City',
        tagline: '2,500-year-old hilltop Shiva temple with the finest panoramic view over Srinagar city',
        shortDescription: 'Srinagar\'s oldest temple sits atop a 1,000-ft rocky hill above the city.',
        fullDescription: 'Climb the 243 stone steps to Shankaracharya Temple — said to date back to 371 BCE — for the finest 360° panorama of Srinagar, Dal Lake, and the ring of Himalayan peaks. Descend into the old city\'s Lal Chowk bazaar for handcrafted Kashmiri papier-mâché, carpets, and saffron.',
        image: '/images/destinations/srinagar/spot-shankaracharya.webp',
        highlights: ['Panoramic City & Dal Lake View', 'Ancient Shiva Temple', 'Old City Craft Bazaar'],
        recommendedHours: '2 Hours',
        entryInfo: 'Open 7:00 AM - 7:00 PM Daily',
        tag: 'Ancient Temple'
      }
    ]
  },

  {
    id: 'pkg-manali',
    slug: 'manali-adventure-capital',
    name: 'Manali: Snow Peaks & River Adventures',
    tagline: 'Rohtang snow fields, Solang Valley zip-line, and the ancient Hadimba Temple in cedar forest',
    overview: 'Manali is the adventure capital of the Indian Himalayas — a compact valley town bordered by snow-capped peaks, roaring glacial rivers perfect for white-water rafting, meadows of wildflowers, and the gateway to the legendary Rohtang Pass and Spiti Valley.',
    location: 'Manali, Rohtang Pass, Solang Valley & Kasol',
    stateOrCountry: 'Himachal Pradesh, India',
    category: 'domestic',
    vibe: ['mountains', 'adventure'],
    rating: 4.86,
    reviewCount: 321,
    bestSeason: 'October to June (Snow) & July to September (Rafting & Trekking)',
    heroImage: '/images/destinations/manali/hero.webp',
    galleryImages: [
      '/images/destinations/manali/glimpse-1.webp',
      '/images/destinations/manali/glimpse-2.webp',
      '/images/destinations/manali/glimpse-3.webp',
      '/images/destinations/manali/glimpse-4.webp',
    ],
    whyVisit: [
      'Snow play and skiing on Rohtang Pass at 13,054 ft with panoramic valley views',
      'Solang Valley adventure — zip-line, snowmobile, and paragliding over the valley',
      'Beas River white-water rafting through Class III-IV rapids',
      'Hadimba Devi Temple — a 500-year-old wooden temple in an ancient cedar forest'
    ],
    includedFeatures: [
      'Boutique Mountain Resort in Old Manali',
      'Private 4x4 vehicle with Rohtang Pass Permit (HP Tourism)',
      'Guided adventure activities: rafting, paragliding, zip-line',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-rohtang-pass',
        name: 'Rohtang Pass & Snow Fields',
        tagline: '13,054 ft Himalayan pass with year-round snow — the gateway to the forbidden Lahaul Valley',
        shortDescription: 'India\'s most accessible high-altitude snowfield — a white playground above the clouds.',
        fullDescription: 'Make the exciting early morning drive up to Rohtang Pass, navigating hairpin bends through pine forests until the world turns white. Play in the deep snow, try snowmobiling, and look north to the barren lunar landscape of the Lahaul Valley stretching towards Spiti.',
        image: '/images/destinations/manali/spot-rohtang.webp',
        highlights: ['Year-Round Snow Fields at 13,054 ft', 'Snowmobile & Snow Activities', 'Lahaul Valley Lunar Views'],
        recommendedHours: 'Full Day',
        entryInfo: 'Rohtang Permit Included (Limited Daily)',
        tag: 'Himalayan Snow Pass'
      },
      {
        id: 'spot-solang-valley',
        name: 'Solang Valley Adventure Park',
        tagline: 'Mountain amphitheatre of adventure — paragliding, zip-line, and snowmobile in one valley',
        shortDescription: 'Manali\'s premier adventure valley — the place for first-time and experienced thrill-seekers.',
        fullDescription: 'Solang Valley is a wide Himalayan bowl 14km from Manali that transforms from adventure park in summer to ski resort in winter. Try the 500m zip-line across the valley, tandem paragliding over the pine forests, ATV quad biking on mountain trails, and a gorge crossing.',
        image: '/images/destinations/manali/spot-solang.webp',
        highlights: ['Tandem Paragliding Over Valley', 'Valley Zip-Line 500m', 'ATV Mountain Trail Riding'],
        recommendedHours: 'Half Day',
        entryInfo: 'Activity Passes via Concierge',
        tag: 'Adventure Valley'
      },
      {
        id: 'spot-hadimba-temple',
        name: 'Hadimba Devi Temple & Old Manali',
        tagline: '1553 AD wooden pagoda temple rising from ancient deodar cedar forests — a Manali icon',
        shortDescription: 'Manali\'s most sacred and beautiful temple — a masterpiece of Himalayan wooden architecture.',
        fullDescription: 'Walk through a grove of ancient deodar cedars to reach Hadimba Devi Temple — a 500-year-old four-tiered wooden pagoda temple built in 1553 AD, dedicated to the wife of Bhima from the Mahabharata. Explore the Manu Temple further up the hill and finish with momos and Himachali dham lunch in Old Manali village.',
        image: '/images/destinations/manali/spot-hadimba.webp',
        highlights: ['1553 AD Wooden Pagoda Architecture', 'Ancient Deodar Cedar Forest Walk', 'Old Manali Village Lunch'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Free — Respectful Dress Required',
        tag: 'Ancient Pagoda Temple'
      }
    ]
  },

  {
    id: 'pkg-kashmir',
    slug: 'kashmir-paradise',
    name: 'Kashmir: Paradise on Earth',
    tagline: 'Snow-capped peaks, serene Dal Lake shikaras, and lush pine valleys',
    overview: 'Kashmir has mesmerized travelers for centuries with its tranquil floating gardens, alpine pine forests, snow-clad mountain passes, and warm Himalayan hospitality.',
    location: 'Srinagar, Gulmarg, Pahalgam & Sonamarg',
    stateOrCountry: 'Jammu & Kashmir, India',
    category: 'domestic',
    vibe: ['mountains', 'romantic', 'luxury'],
    rating: 4.95,
    reviewCount: 418,
    bestSeason: 'March to November (Spring/Summer) & Dec to Feb (Snow)',
    heroImage: '/images/destinations/kashmir/hero.webp',
    galleryImages: [
      '/images/destinations/kashmir/glimpse-1.webp',
      '/images/destinations/kashmir/glimpse-2.webp',
      '/images/destinations/kashmir/glimpse-3.webp',
      '/images/destinations/kashmir/glimpse-4.webp',
    ],
    whyVisit: [
      'Private hand-carved cedar houseboat stay on Nigeen Lake',
      'World\'s highest cable car ride (Gulmarg Gondola Phase II)',
      'Scenic pony treks through Betaab & Aru Valleys in Pahalgam',
      'Shikara rides to floating vegetable and flower markets'
    ],
    includedFeatures: [
      'Luxury Houseboat + 4-Star Resort combination stay',
      'Heated private vehicles with local driver guides',
      'Pre-booked Gulmarg Gondola Phase 1 & 2 tickets',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-gulmarg-gondola',
        name: 'Gulmarg Gondola & Apharwat Peak',
        tagline: 'World\'s second-highest cable car taking you up to 13,780 feet',
        shortDescription: 'High-altitude ropeway offering panoramic views of Nanga Parbat and Himalayas.',
        fullDescription: 'Ascend through pine-covered slopes on Phase 1 to Kongdoori Valley, then soar up Phase 2 to Apharwat Peak at 13,780 feet for world-class skiing and breathtaking glacier views.',
        image: '/images/destinations/kashmir/spot-gulmarg.webp',
        highlights: ['13,780 ft Altitude Peak', 'Snow Sledding & Skiing', 'Himalayan Panoramas'],
        recommendedHours: 'Half Day (4-5 hours)',
        entryInfo: 'Slot-based Online Gondola Tickets',
        tag: 'Alpine Ropeway'
      },
      {
        id: 'spot-pahalgam',
        name: 'Pahalgam: Betaab & Aru Valleys',
        tagline: 'Lush green meadows bordered by dense deodar forests and crystal mountain streams',
        shortDescription: 'Picture-postcard valleys famous for Bollywood cinema, trout streams, and pony trails.',
        fullDescription: 'Explore the serene Betaab Valley named after the famous Hindi movie. Walk alongside the rushing Lidder River and take a local pony ride up to Aru Valley.',
        image: '/images/destinations/kashmir/spot-betaab-valley.webp',
        highlights: ['Lidder River Riverside Walk', 'Betaab Garden Meadows', 'Pony Rides to Aru Valley'],
        recommendedHours: 'Full Day Excursion',
        entryInfo: 'Local Union Taxi Access Included',
        tag: 'Lush Meadows'
      }
    ]
  },

  {
    id: 'pkg-mountabu',
    slug: 'mount-abu-desert-oasis',
    name: 'Mount Abu: Rajasthan\'s Green Oasis',
    tagline: 'Dilwara Marble Temples, misty Nakki Lake, and Rajasthan\'s only hill station',
    overview: 'Mount Abu is a miraculous green oasis rising from Rajasthan\'s scorching desert plains — the state\'s only hill station, crowned by the extraordinary Dilwara Jain Temples whose hand-carved white marble interiors are among the finest in the world.',
    location: 'Mount Abu & Guru Shikhar',
    stateOrCountry: 'Rajasthan, India',
    category: 'domestic',
    vibe: ['mountains', 'romantic'],
    rating: 4.79,
    reviewCount: 189,
    bestSeason: 'October to February (Pleasant Hill Station Weather)',
    heroImage: '/images/destinations/mountabu/hero.webp',
    galleryImages: [
      '/images/destinations/mountabu/glimpse-1.webp',
      '/images/destinations/mountabu/glimpse-2.webp',
      '/images/destinations/mountabu/glimpse-3.webp',
      '/images/destinations/mountabu/glimpse-4.webp',
    ],
    whyVisit: [
      'Dilwara Temples — 11th-century Jain temples with the most intricate marble carving in the world',
      'Nakki Lake sunset boat ride — a 14th-century lake carved by the fingernails of Hindu gods',
      'Guru Shikhar — the highest peak in Rajasthan at 1,722m',
      'Sunset Point — watching the Aravalli ranges turn crimson with the setting sun'
    ],
    includedFeatures: [
      'Heritage Hotel in Mount Abu with Aravalli view rooms',
      'Private AC vehicle for all local sightseeing',
      'Boat ride on Nakki Lake + Dilwara Temple entry',
      '24/7 dedicated WhatsApp Concierge support'
    ],
    touristSpots: [
      {
        id: 'spot-dilwara-temples',
        name: 'Dilwara Jain Temples',
        tagline: '11th-century white marble temples carved by 1,500 craftsmen over 14 years — a miracle in stone',
        shortDescription: 'Widely considered the finest example of marble carving in the world — beyond description.',
        fullDescription: 'Enter the Vimal Vasahi Temple (1031 AD) and the Luna Vasahi Temple (1230 AD) — both constructed from pure white marble so finely carved that it appears translucent. The ceiling panels, archways, and columns feature micro-carved celestial figures, flowers, and geometric patterns of breathtaking complexity.',
        image: '/images/destinations/mountabu/spot-dilwara.webp',
        highlights: ['Vimal Vasahi 1031 AD Ceiling Carvings', 'Translucent White Marble Columns', 'Jain Cultural Heritage Walk'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Free Entry — Camera Restrictions Apply',
        tag: 'World\'s Finest Marble'
      },
      {
        id: 'spot-nakki-lake',
        name: 'Nakki Lake & Sunset Point',
        tagline: 'A sacred manmade lake at 1,200m altitude — and Mount Abu\'s romantic centrepiece',
        shortDescription: 'A picturesque crater lake surrounded by wooded hills and unusual rock formations.',
        fullDescription: 'Take a rowing boat or paddle boat across the tranquil Nakki Lake as the Aravalli Hills reflect in the glassy water. Walk to the famous Toad Rock — a natural rock formation shaped like a giant toad perched above the lake. End the day at Sunset Point for the legendary crimson Aravalli sunset.',
        image: '/images/destinations/mountabu/spot-nakki-lake.webp',
        highlights: ['Nakki Lake Sunset Boat Ride', 'Toad Rock Natural Formation', 'Sunset Point Aravalli Panorama'],
        recommendedHours: '2 - 3 Hours (Afternoon-Evening)',
        entryInfo: 'Boat Hire Included',
        tag: 'Sacred Lake'
      },
      {
        id: 'spot-guru-shikhar',
        name: 'Guru Shikhar Peak',
        tagline: 'Rajasthan\'s highest point at 1,722m — the "Finger of God" rising above the Aravalli range',
        shortDescription: 'A short drive and walk to the top of Rajasthan — panoramic views of Gujarat and Rajasthan.',
        fullDescription: 'Drive to the base of Guru Shikhar and climb the stone steps to the ancient Guru Dattatreya Temple at the summit. Standing at 1,722m — the highest point in Rajasthan — you\'ll see the green forests of Mount Abu giving way to the golden desert plains of Rajasthan on one side and Gujarat on the other.',
        image: '/images/destinations/mountabu/spot-guru-shikhar.webp',
        highlights: ['Rajasthan\'s Highest Peak 1,722m', 'Guru Dattatreya Temple Summit', 'Gujarat-Rajasthan Panorama'],
        recommendedHours: '1.5 - 2 Hours',
        entryInfo: 'Free Access',
        tag: 'Rajasthan\'s Summit'
      }
    ]
  }

];
