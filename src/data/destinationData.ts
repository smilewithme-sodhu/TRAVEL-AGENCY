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

export const TRAVEL_PACKAGES: TravelPackage[] = [
  {
    id: 'pkg-sikkim',
    slug: 'sikkim-himalayan-paradise',
    name: 'Discover the Hidden Paradise of Sikkim',
    tagline: 'Where majestic mountains, peaceful monasteries, and untouched landscapes create an unforgettable Himalayan escape.',
    overview: 'Nestled in the lap of the Eastern Himalayas, Sikkim is a serene wonderland where snow-crowned Kanchenjunga peaks meet sacred high-altitude alpine lakes, ancient Buddhist monasteries, and vibrant rhododendron valleys. Our curated journey allows you to experience peaceful mountain dawns, authentic Tibetan culture, and pristine Himalayan wilderness.',
    location: 'Gangtok, Pelling, Tsomgo & Yumthang',
    stateOrCountry: 'Sikkim, India',
    category: 'domestic',
    vibe: ['mountains', 'romantic', 'luxury'],
    rating: 4.96,
    reviewCount: 310,
    bestSeason: 'March to June (Spring Blossoms) & Oct to Dec (Clear Himalayan Views)',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
    ],
    whyVisit: [
      'Witness sunrise over Mt. Kanchenjunga, the world’s third-highest peak',
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
        image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
        highlights: ['12,400 ft Altitude Glacial Lake', 'Nathula Pass Border Post', 'Scenic Yak Rides'],
        recommendedHours: 'Full Day Excursion',
        entryInfo: 'Special Protected Area Permit Included',
        tag: 'Glacial Wonder'
      },
      {
        id: 'spot-yumthang',
        name: 'Yumthang Valley of Flowers',
        tagline: 'Nature’s vibrant canvas carpeted with 24+ species of rhododendrons and natural hot springs',
        shortDescription: 'Breathtaking river valley bordered by snow-capped peaks and evergreen pine forests.',
        fullDescription: 'Located in North Sikkim, Yumthang Valley bursts into a riot of colors during spring. Relax in natural thermal sulfur hot springs and marvel at the towering Himalayan glaciers at Zero Point.',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
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
    overview: 'Goa is India’s premier beach destination, blending golden sands, historic Latin architecture, cascading waterfalls, and world-class coastal dining. Our curated journey takes you beyond typical tourist beaches into authentic private cruises, heritage walks, and pristine waterfalls.',
    location: 'North & South Goa',
    stateOrCountry: 'Goa, India',
    category: 'domestic',
    vibe: ['beach', 'luxury', 'romantic'],
    rating: 4.9,
    reviewCount: 342,
    bestSeason: 'October to May (Peak Beach Season)',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
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
        shortDescription: 'One of India’s tallest waterfalls nestled deep inside lush Western Ghats forests.',
        fullDescription: 'Experience an exhilarating 4x4 open jeep jungle safari through Bhagwan Mahavir Sanctuary to reach the majestic Dudhsagar Falls. Swim in fresh natural pools beneath the cascading waters.',
        image: 'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80',
        highlights: ['4x4 Jungle Jeep Safari', 'Natural Pool Swimming', 'Spice Plantation Buffet Lunch'],
        recommendedHours: 'Full Day Excursion (6-8 hours)',
        entryInfo: 'Forest Permit & Jeep Allocated via Concierge',
        tag: 'Natural Wonder'
      },
      {
        id: 'spot-fort-aguada',
        name: 'Fort Aguada & 1864 Lighthouse',
        tagline: '17th-century Portuguese fortress overlooking the Arabian Sea',
        shortDescription: 'Historic Portuguese fort standing guard over Sinquerim Beach with panoramic sea views.',
        fullDescription: 'Constructed in 1612 to guard against Dutch ships, Fort Aguada features a historic 4-storey freshwater lighthouse and grand stone ramparts offering spectacular sunset views.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
        highlights: ['1612 Portuguese Ramparts', 'Panoramas of Arabian Sea', 'Sinquerim Beach Access'],
        recommendedHours: '1.5 - 2 Hours',
        entryInfo: 'Open 9:30 AM - 6:00 PM Daily',
        tag: 'Heritage Fort'
      },
      {
        id: 'spot-fontainhas',
        name: 'Fontainhas Latin Quarter',
        tagline: 'Vibrant pastel houses, narrow winding lanes, and authentic Portuguese bakeries',
        shortDescription: 'Asia’s only Latin Quarter with preserved 19th-century Portuguese mansions.',
        fullDescription: 'Stroll through picturesque cobblestone streets lined with bright yellow, green, and blue Portuguese houses. Stop at historic bakeries for authentic Bebinca and espresso.',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
        highlights: ['Heritage Architecture', 'Art Galleries & Cafes', 'Photographic Walking Trails'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Free Walking Area',
        tag: 'Cultural Quarter'
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
    heroImage: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1200&q=80'
    ],
    whyVisit: [
      'Private hand-carved cedar houseboat stay on Nigeen Lake',
      'World’s highest cable car ride (Gulmarg Gondola Phase II)',
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
        id: 'spot-dal-lake',
        name: 'Dal Lake & Floating Market',
        tagline: 'Jewel in the crown of Kashmir surrounded by snow-draped Zabarwan mountains',
        shortDescription: 'Tranquil mirror-like lake famous for houseboats and early morning floating markets.',
        fullDescription: 'Glide smoothly across Dal Lake in a wooden shikara carpeted with traditional Kashmiri rugs. Witness the bustling 5:00 AM floating vegetable market where local vendors trade from boat to boat.',
        image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
        highlights: ['Sunset Shikara Glide', 'Floating Market Visit', 'Char Chinar Island'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Private Shikara Rides via Concierge',
        tag: 'Iconic Lake'
      },
      {
        id: 'spot-gulmarg-gondola',
        name: 'Gulmarg Gondola & Apharwat Peak',
        tagline: 'World’s second-highest cable car taking you up to 13,780 feet',
        shortDescription: 'High-altitude ropeway offering panoramic views of Nanga Parbat and Himalayas.',
        fullDescription: 'Ascend through pine-covered slopes on Phase 1 to Kongdoori Valley, then soar up Phase 2 to Apharwat Peak at 13,780 feet for world-class skiing and breathtaking glacier views.',
        image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80',
        highlights: ['13,780 ft Altitude Peak', 'Snow Sledding & Skiing', 'Himalayan Panoramas'],
        recommendedHours: 'Half Day (4-5 hours)',
        entryInfo: 'Slot-based Online Gondola Tickets',
        tag: 'Alpine Ropeway'
      },
      {
        id: 'spot-betaab-valley',
        name: 'Pahalgam: Betaab & Aru Valleys',
        tagline: 'Lush green meadows bordered by dense deodar forests and crystal mountain streams',
        shortDescription: 'Picture-postcard valleys famous for Bollywood cinema, trout streams, and pony trails.',
        fullDescription: 'Explore the serene Betaab Valley named after the famous Hindi movie. Walk alongside the rushing Lidder River, visit pine-fringed meadows, and take a local pony ride up to Aru Valley.',
        image: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80',
        highlights: ['Lidder River Riverside Walk', 'Betaab Garden Meadows', 'Pony Rides to Aru Valley'],
        recommendedHours: 'Full Day Excursion',
        entryInfo: 'Local Union Taxi Access Included',
        tag: 'Lush Meadows'
      }
    ]
  },
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
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546412414-8035e1786b9b?auto=format&fit=crop&w=1200&q=80'
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
        tagline: 'World’s tallest building standing at 828 meters above Dubai Downtown',
        shortDescription: 'Global architectural icon with breathtaking 360-degree observation decks.',
        fullDescription: 'Ride high-speed double-deck elevators to the 124th and 125th floors of Burj Khalifa. Conclude your evening watching the spectacular choreographed Dubai Fountain show at Dubai Mall waterfront.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
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
        fullDescription: 'Stroll along Dubai Marina Walk, explore the luxury yachts at Dubai Harbour, and relax at JBR Beach while enjoying views of Ain Dubai, the world’s largest observation wheel.',
        image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=800&q=80',
        highlights: ['Luxury Yacht Sunset Cruise', 'Ain Dubai Views', 'JBR Beachfront Dining'],
        recommendedHours: '2 - 3 Hours',
        entryInfo: 'Free Public Promenade',
        tag: 'Marina Waterfront'
      }
    ]
  },
  {
    id: 'pkg-bali',
    slug: 'bali-tropical-paradise',
    name: 'Bali: Island of Gods & Temples',
    tagline: 'Volcanic sunrises, sacred emerald rice terraces, and cliffside sea temples',
    overview: 'Bali is Indonesia’s spiritual and tropical sanctuary, renowned for lush jungle sanctuaries in Ubud, dramatic sea cliff temples in Uluwatu, and crystal-clear turquoise waters in Nusa Penida.',
    location: 'Ubud, Uluwatu, Seminyak & Nusa Penida',
    stateOrCountry: 'Bali, Indonesia',
    category: 'international',
    vibe: ['romantic', 'beach', 'luxury'],
    rating: 4.92,
    reviewCount: 389,
    bestSeason: 'April to October (Dry Tropical Season)',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80'
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
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
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
        fullDescription: 'Board a high-speed catamaran to Nusa Penida island. Visit the legendary Kelingking T-Rex Cliff, swim at Angel’s Billabong natural infinity pool, and snap photos at Broken Beach.',
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=800&q=80',
        highlights: ['70-Meter Sea Cliff Temple', 'Sunset Kecak Fire Dance', 'Jimbaran Seafood Dinner'],
        recommendedHours: '3 Hours (4:30 PM - 7:30 PM)',
        entryInfo: 'Kecak Show Slot Pre-booked',
        tag: 'Cliff Temple'
      }
    ]
  },
  {
    id: 'pkg-kerala',
    slug: 'kerala-gods-own-country',
    name: 'Kerala: Backwaters & Tea Gardens',
    tagline: 'Tranquil Alleppey backwater houseboats, misty Munnar tea hills, and Ayurvedic wellness',
    overview: 'Kerala is celebrated as "God’s Own Country", offering serene palm-fringed backwater networks, cool spice-scented mountain stations, and century-old holistic wellness traditions.',
    location: 'Alleppey, Munnar, Thekkady & Kovalam',
    stateOrCountry: 'Kerala, India',
    category: 'domestic',
    vibe: ['luxury', 'romantic'],
    rating: 4.88,
    reviewCount: 295,
    bestSeason: 'September to March (Pleasant Backwater Season)',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80'
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
        image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
        highlights: ['Tea Museum Tour', 'Eravikulam National Park', 'Mattupetty Dam Views'],
        recommendedHours: 'Full Day Sightseeing',
        entryInfo: 'National Park Entry Permits Allocated',
        tag: 'Misty Hills'
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
    heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80'
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
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
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
        image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80',
        highlights: ['Temple of Emerald Buddha', 'Wat Arun Porcelain Spire', 'Chao Phraya River Boat'],
        recommendedHours: '3 - 4 Hours',
        entryInfo: 'Palace Dress Code Required',
        tag: 'Royal Heritage'
      }
    ]
  }
];
