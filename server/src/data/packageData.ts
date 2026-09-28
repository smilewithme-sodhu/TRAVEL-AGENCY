// Comprehensive Luxury Travel Magazine Package Dataset
// 12 International + 10 Domestic Destinations
// Updated with real uploaded photographic assets & distinct curated itineraries

export const DESTINATION_PACKAGES = [
  // ==========================================
  // INTERNATIONAL PACKAGES (12)
  // ==========================================
  {
    id: 'dubai',
    name: 'Dubai',
    category: 'international',
    location: 'United Arab Emirates',
    tagline: 'Futuristic marvels, golden desert dunes, and luxury marina lifestyle.',
    heroImage: '/images/destinations/dubai/hero.jpg',
    galleryImages: [
      '/images/destinations/dubai/glimpse-1.jpg',
      '/images/destinations/dubai/glimpse-2.jpg',
      '/images/destinations/dubai/glimpse-3.jpg',
      '/images/destinations/dubai/glimpse-4.jpg'
    ],
    description: 'Dubai stands as the global capital of modern luxury, where soaring super-skyscrapers rise beside ancient Arabian dunes. From standing on the 125th floor of Burj Khalifa to soaring across red desert sands in a private 4x4 at golden hour, Dubai delivers a breathtaking fusion of high-octane glamour and bedouin hospitality.',
    whyVisit: [
      { icon: '🌆', title: 'Burj Khalifa & Downtown', desc: 'Marvel at the world\'s tallest architectural marvel and the choreographed Dubai Fountain show.' },
      { icon: '🏜', title: 'VIP Red Dune Safari', desc: 'High-adrenaline dune bashing, camel riding, and a starlit BBQ dinner under the desert sky.' },
      { icon: '⛵', title: 'Dubai Marina Yacht Cruises', desc: 'Sunset luxury catamaran cruises gliding past twisting skyscrapers and Ain Dubai.' },
      { icon: '🛍', title: 'Gold & Spice Souks', desc: 'Cross Dubai Creek on a traditional wooden Abra and explore vibrant ancient trading souks.' }
    ],
    highlights: [
      { title: 'Burj Khalifa Observation Deck', desc: 'Fast-track elevators ascending to Levels 124 & 125 for 360-degree Arabian Gulf panoramas.' },
      { title: 'Lahbab Red Dune Desert Camp', desc: 'Private 4x4 dune bashing, falconry encounters, tanoura dance, and gourmet dinner.' },
      { title: 'Dubai Marina & JBR Beach Walk', desc: 'Stroll along the waterfront promenade flanked by luxury yachts, cafes, and open-air bistros.' },
      { title: 'Palm Jumeirah & The View', desc: 'Explore the iconic palm-shaped island and enjoy 240-meter panoramic views from The View.' }
    ]
  },
  {
    id: 'thailand',
    name: 'Thailand',
    category: 'international',
    location: 'Phuket, Krabi & Bangkok',
    tagline: 'Phi Phi emerald lagoons, ornate Buddhist temples, and vibrant coastal gastronomy.',
    heroImage: '/images/destinations/thailand/hero.jpg',
    galleryImages: [
      '/images/destinations/thailand/glimpse-1.jpg',
      '/images/destinations/thailand/glimpse-2.jpg',
      '/images/destinations/thailand/glimpse-3.jpg',
      '/images/destinations/thailand/glimpse-4.jpg'
    ],
    description: 'Thailand captivates travelers with sheer limestone karsts rising out of emerald lagoons, sacred golden pagodas, and some of the world\'s most vibrant night street food markets. Whether speeding across the Andaman Sea to Maya Bay or taking a river shuttle past Bangkok\'s gilded Wat Arun, Thailand is pure tropical bliss.',
    whyVisit: [
      { icon: '🏝', title: 'Phi Phi & Maya Bay', desc: 'Speedboat catamaran charters to turquoise lagoons enclosed by dramatic sheer cliffs.' },
      { icon: '🛕', title: 'Grand Palace & Wat Arun', desc: 'Discover gold-leaf royal complexes and porcelain spires along the Chao Phraya River.' },
      { icon: '🍜', title: 'Yaowarat Street Gastronomy', desc: 'Explore Michelin-lauded street stalls and aromatic night markets in Bangkok and Phuket.' },
      { icon: '💆‍♀️', title: 'Luxury Beachfront Spas', desc: 'Rejuvenate with traditional Royal Thai massages and beachfront wellness therapies.' }
    ],
    highlights: [
      { title: 'Phi Phi Islands & Pileh Lagoon', desc: 'Snorkel vibrant coral reefs and swim in the calm, emerald waters of Pileh Lagoon.' },
      { title: 'Bangkok Grand Palace & Emerald Buddha', desc: 'Marvel at Thailand\'s most sacred Buddhist temple and intricately painted royal courtyards.' },
      { title: 'Phuket Sunset Beachfront Resorts', desc: 'Unwind at handpicked 5-star ocean-view cliff villas overlooking the Andaman Sea.' },
      { title: 'Chao Phraya River Dinner Cruise', desc: 'Romantic candlelight dinner cruise gliding past illuminated illuminated temples.' }
    ]
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    category: 'international',
    location: 'Ha Long Bay, Hoi An & Hanoi',
    tagline: 'Emerald limestone karsts, UNESCO lantern towns, and world-class street food culture.',
    heroImage: '/images/destinations/vietnam/hero.jpg',
    galleryImages: [
      '/images/destinations/vietnam/glimpse-1.jpg',
      '/images/destinations/vietnam/glimpse-2.jpg',
      '/images/destinations/vietnam/glimpse-3.jpg',
      '/images/destinations/vietnam/glimpse-4.jpg'
    ],
    description: 'Vietnam is a land of jaw-dropping natural wonder and rich cultural soul. From waking up aboard a private luxury cruise among Ha Long Bay\'s 1,969 limestone islands to releasing paper lanterns onto the Thu Bon River in Hoi An\'s golden ancient town, Vietnam is an unforgettable sensory adventure.',
    whyVisit: [
      { icon: '⛵', title: 'Ha Long Bay Luxury Cruise', desc: 'Overnight boutique cruise through UNESCO-protected emerald waters and karst sea caves.' },
      { icon: '🏮', title: 'Hoi An Lantern Town', desc: 'Stroll romantic cobblestone streets lined with French-colonial houses and silk lanterns.' },
      { icon: '🍜', title: 'Hanoi Street Food Trail', desc: 'Savor steaming bowls of authentic Pho, crispy Banh Mi, and creamy egg coffee in Old Quarter.' },
      { icon: '🌉', title: 'Da Nang Golden Bridge', desc: 'Walk across the breathtaking pedestrian bridge held aloft by giant stone hands in the clouds.' }
    ],
    highlights: [
      { title: 'Ha Long Bay Overnight Expedition', desc: 'Kayak through secluded sea caves, swim in hidden lagoons, and enjoy sunset deck dining.' },
      { title: 'Hoi An Evening Lantern Ceremony', desc: 'Release glowing candle lanterns on the river and explore centuries-old merchant houses.' },
      { title: 'Hanoi 36 Guilds Old Quarter', desc: 'Pedicab cyclo ride around ancient artisanal streets and tranquil Hoan Kiem Lake.' },
      { title: 'Ba Na Hills & French Village', desc: 'Ascend world-record cable cars to misty mountain peaks and panoramic coastal viewpoints.' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    category: 'international',
    location: 'Ubud, Uluwatu & Nusa Penida',
    tagline: 'Volcanic sunrises, sacred emerald rice terraces, and cliffside sea temples.',
    heroImage: '/images/destinations/bali/hero.jpg',
    galleryImages: [
      '/images/destinations/bali/glimpse-1.jpg',
      '/images/destinations/bali/glimpse-2.jpg',
      '/images/destinations/bali/glimpse-3.jpg',
      '/images/destinations/bali/glimpse-4.jpg'
    ],
    description: 'Bali is Indonesia\'s spiritual and tropical sanctuary. Renowned for lush jungle sanctuaries in Ubud, dramatic sea cliff temples in Uluwatu, and turquoise lagoons in Nusa Penida, Bali provides the ultimate harmony of romance, wellness, and island serenity.',
    whyVisit: [
      { icon: '🌿', title: 'Tegallalang Rice Terraces', desc: 'Walk through cascading emerald valleys engineered with ancient Subak irrigation.' },
      { icon: '🏝', title: 'Nusa Penida Day Expedition', desc: 'Witness the iconic Kelingking T-Rex cliff and swim in crystal-clear coastal pools.' },
      { icon: '🔥', title: 'Uluwatu Sunset Kecak Dance', desc: 'Watch hypnotic fire dances on 70-meter sea cliffs as the sun dips below the horizon.' },
      { icon: '🏊‍♂️', title: 'Private Jungle Pool Villas', desc: 'Indulge in private infinity pool villas in Ubud with floating breakfasts.' }
    ],
    highlights: [
      { title: 'Ubud Rainforest Sanctuary & Swings', desc: 'Experience the famous jungle swing soaring over lush palm canopies and rice paddies.' },
      { title: 'Kelingking T-Rex Beach Nusa Penida', desc: 'High-speed catamaran cruise to world-renowned dramatic coastal cliff viewpoints.' },
      { title: 'Uluwatu Temple Ocean Sunset', desc: 'Perched on sheer ocean ramparts with live chanting performances and seafood dining.' },
      { title: 'Tanah Lot Offshore Sea Temple', desc: 'Sacred Hindu shrine perched on an ancient wave-swept rock formation at dusk.' }
    ]
  },
  {
    id: 'azerbaijan',
    name: 'Azerbaijan',
    category: 'international',
    location: 'Baku, Gobustan & Gabala',
    tagline: 'Land of Fire where ancient Silk Road romance meets futuristic Caspian elegance.',
    heroImage: '/images/destinations/azerbaijan/hero.jpg',
    galleryImages: [
      '/images/destinations/azerbaijan/glimpse-1.jpg',
      '/images/destinations/azerbaijan/glimpse-2.jpg',
      '/images/destinations/azerbaijan/glimpse-3.jpg',
      '/images/destinations/azerbaijan/glimpse-4.jpg'
    ],
    description: 'Azerbaijan is the undiscovered jewel of the Caucasus. Here on the shores of the Caspian Sea, centuries-old medieval caravanserais in Baku\'s UNESCO Walled City stand beneath the glowing glass Flame Towers, while natural gas flames burn perpetually on mountainsides.',
    whyVisit: [
      { icon: '🏰', title: 'Baku Old City (Icherisheher)', desc: 'Wander medieval stone alleys, the 12th-century Maiden Tower, and Shirvanshahs Palace.' },
      { icon: '🌋', title: 'Gobustan Mud Volcanoes', desc: 'Explore lunar landscapes with bubbling mud craters and 40,000-year-old rock petroglyphs.' },
      { icon: '🔥', title: 'Yanar Dag Burning Mountain', desc: 'Witness natural subterranean gas flames that have burned uninterrupted for centuries.' },
      { icon: '🏙', title: 'Futuristic Baku Architecture', desc: 'Admire Zaha Hadid\'s fluid Heydar Aliyev Centre and the iconic LED Flame Towers.' }
    ],
    highlights: [
      { title: 'Icherisheher Medieval Walking Tour', desc: 'Discover Silk Road trading history, authentic carpet weavers, and saffron tea houses.' },
      { title: 'Gobustan National Historical Reserve', desc: 'Guided excursion across prehistoric UNESCO rock art and rare volcanic mud craters.' },
      { title: 'Caspian Sea Promenade & Ferris Wheel', desc: 'Stroll Baku Boulevard\'s seaside fountains, Venetian canals, and waterfront restaurants.' },
      { title: 'Gabala Caucasus Mountain Cable Car', desc: 'Ride cable cars up Tufandag mountain for panoramic Caucasus alpine views.' }
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    category: 'international',
    location: 'Singapore',
    tagline: 'A futuristic garden city of vertical green wonders, luxury, and vibrant heritage.',
    heroImage: '/images/destinations/singapore/hero.jpg',
    galleryImages: [
      '/images/destinations/singapore/glimpse-1.jpg',
      '/images/destinations/singapore/glimpse-2.jpg',
      '/images/destinations/singapore/glimpse-3.jpg',
      '/images/destinations/singapore/glimpse-4.jpg'
    ],
    description: 'Singapore is a global metropolis where futuristic architecture and lush equatorial nature blend in perfect harmony. From the jaw-dropping Supertrees at Gardens by the Bay to the rooftop infinity pool atop Marina Bay Sands and Sentosa Island\'s resort playgrounds, Singapore is unmatched.',
    whyVisit: [
      { icon: '🌳', title: 'Gardens by the Bay', desc: 'Marvel at 18 giant vertical Supertrees and the world\'s largest indoor mist greenhouse.' },
      { icon: '🏨', title: 'Marina Bay Sands SkyPark', desc: 'Enjoy 360-degree skyline views 200 meters above the bay and waterfront light shows.' },
      { icon: '🎡', title: 'Sentosa Island Resorts', desc: 'Universal Studios Singapore, S.E.A. Aquarium, and tropical golden beach clubs.' },
      { icon: '🍜', title: 'Michelin Hawker Trails', desc: 'Feast on Hainanese chicken rice, chilli crab, and laksa in historic hawker centres.' }
    ],
    highlights: [
      { title: 'Supertree Grove Light & Sound Show', desc: 'Experience the magical evening Garden Rhapsody light spectacle among glowing canopies.' },
      { title: 'Jewel Changi Rain Vortex', desc: 'Gaze upon the world\'s tallest indoor waterfall framed by a multi-tiered rainforest.' },
      { title: 'Universal Studios Full-Day Access', desc: 'World-class movie-themed rollercoasters and immersive family entertainment zones.' },
      { title: 'Chinatown & Marina Waterfront Walk', desc: 'Heritage shophouses, traditional tea houses, and evening Spectra water displays.' }
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    category: 'international',
    location: 'Kuala Lumpur, Langkawi & Penang',
    tagline: 'Petronas twin towers, Langkawi island geoparks, and rich colonial street food.',
    heroImage: '/images/destinations/malaysia/hero.jpg',
    galleryImages: [
      '/images/destinations/malaysia/glimpse-1.jpg',
      '/images/destinations/malaysia/glimpse-2.jpg',
      '/images/destinations/malaysia/glimpse-3.jpg',
      '/images/destinations/malaysia/glimpse-4.jpg'
    ],
    description: 'Malaysia offers an incredible tapestry of modern cityscapes, ancient rainforests, and island archipelagos. Gaze up at the iconic Petronas Twin Towers in Kuala Lumpur, explore Langkawi\'s pristine mangrove geoparks and sky bridges, and sample legendary street food in Penang.',
    whyVisit: [
      { icon: '🏙', title: 'Petronas Twin Towers', desc: 'World\'s tallest twin towers standing at 452 meters with a sky bridge on Level 41.' },
      { icon: '🏝', title: 'Langkawi UNESCO Geopark', desc: 'Cruise mangrove rivers, feed sea eagles, and ride the steep Langkawi SkyCab.' },
      { icon: '🛕', title: 'Batu Caves Hindu Shrine', desc: 'Ascend 272 rainbow steps past the massive golden statue of Lord Murugan.' },
      { icon: '🍲', title: 'Penang George Town Heritage', desc: 'UNESCO-listed colonial mansions, interactive street art, and legendary Nyonya laksa.' }
    ],
    highlights: [
      { title: 'Petronas Skybridge & Observation Deck', desc: 'Timed priority tickets offering panoramic views of Kuala Lumpur\'s Golden Triangle.' },
      { title: 'Langkawi Eagle Safari & Mangrove Boat Tour', desc: 'Cruise through limestone sea caves and feed white-bellied sea eagles in Kilim Geopark.' },
      { title: 'Batu Caves Limestone Temple Exploration', desc: 'Vibrant limestone cave cathedral dating back hundreds of millions of years.' },
      { title: 'George Town Street Art & Food Walk', desc: 'Walk historic shophouse streets discovering world-famous murals and hawker stalls.' }
    ]
  },
  {
    id: 'srilanka',
    name: 'Sri Lanka',
    category: 'international',
    location: 'Sigiriya, Ella, Galle & Mirissa',
    tagline: 'The Pearl of the Indian Ocean with ancient rock fortresses, tea trains, and whales.',
    heroImage: '/images/destinations/srilanka/hero.jpg',
    galleryImages: [
      '/images/destinations/srilanka/glimpse-1.jpg',
      '/images/destinations/srilanka/glimpse-2.jpg',
      '/images/destinations/srilanka/glimpse-3.jpg',
      '/images/destinations/srilanka/glimpse-4.jpg'
    ],
    description: 'Sri Lanka packs staggering diversity into a pristine tropical island. Climb the 5th-century Sigiriya Lion Rock citadel rising above jungle plains, take the iconic blue train through Ella\'s misty tea-clad hills, and watch giant blue whales breach off the southern coast of Mirissa.',
    whyVisit: [
      { icon: '🗿', title: 'Sigiriya Lion Rock Fortress', desc: 'Ascend the UNESCO ancient palace citadel built atop a 200m vertical granite peak.' },
      { icon: '🚂', title: 'Ella Scenic Blue Train', desc: 'World-famous mountain railway looping across the Nine Arch Bridge through tea hills.' },
      { icon: '🐋', title: 'Mirissa Blue Whale Safari', desc: 'Prime deep-water encounters with blue whales, sperm whales, and spinner dolphins.' },
      { icon: '🏰', title: 'Galle Dutch Colonial Fort', desc: 'Walk ancient ocean-facing stone ramparts, boutique cafes, and lighthouse promenades.' }
    ],
    highlights: [
      { title: 'Sigiriya 1,200 Steps Ancient Climb', desc: 'Ancient frescoes, mirror walls, and summit palace ruins overlooking wilderness.' },
      { title: 'Nine Arch Bridge & Little Adam\'s Peak', desc: 'Watch steam trains cross colonial brick viaducts surrounded by emerald tea bushes.' },
      { title: 'Temple of the Tooth Relic Kandy', desc: 'Visit Sri Lanka\'s most sacred Buddhist shrine beside tranquil Kandy Lake.' },
      { title: 'Bentota & Galle Coastline Luxury', desc: 'Relax in boutique colonial beach villas along Sri Lanka\'s sun-drenched golden coast.' }
    ]
  },
  {
    id: 'europe',
    name: 'Europe Grand Tour',
    category: 'international',
    location: 'Paris, Rome & Swiss Alps',
    tagline: 'Eiffel Tower sunsets, Colosseum history, and alpine glaciers in one epic journey.',
    heroImage: '/images/destinations/europe/hero.jpg',
    galleryImages: [
      '/images/destinations/europe/glimpse-1.jpg',
      '/images/destinations/europe/glimpse-2.jpg',
      '/images/destinations/europe/glimpse-3.jpg',
      '/images/destinations/europe/glimpse-4.jpg'
    ],
    description: 'The European Grand Tour represents the zenith of travel romance and cultural splendor. Gaze upon the sparkling Eiffel Tower from a private Seine cruise in Paris, take the cogwheel glacier train through snow-crowned Swiss Alpine peaks, and marvel at the 2,000-year-old Colosseum in Rome.',
    whyVisit: [
      { icon: '🗼', title: 'Paris: The City of Light', desc: 'Eiffel Tower summit access, Louvre Museum treasures, and private Seine dinner cruises.' },
      { icon: '🏔', title: 'Swiss Alps Glacier Wonder', desc: 'Ride panoramic mountain trains to Jungfraujoch and Mount Titlis above eternal snow.' },
      { icon: '🏛', title: 'Rome & The Vatican', desc: 'Priority access to the Colosseum, Roman Forum, Sistine Chapel, and St. Peter\'s.' },
      { icon: '🛶', title: 'Venice Gondola Romance', desc: 'Glide through historic canals and under the Bridge of Sighs in a handcrafted gondola.' }
    ],
    highlights: [
      { title: 'Eiffel Tower Summit & Seine River Cruise', desc: 'Sip champagne with panoramic vistas over Paris followed by an illuminated evening cruise.' },
      { title: 'Jungfraujoch — Top of Europe (3,454m)', desc: 'Travel on the highest altitude cogwheel railway to the Sphinx Observatory and Ice Palace.' },
      { title: 'Vatican Museums & Sistine Chapel', desc: 'Private guided tour of Michelangelo\'s frescoes and St. Peter\'s Basilica dome climb.' },
      { title: 'Venice Grand Canal & St. Mark\'s Square', desc: 'Private water taxi transfers and romantic gondola glides through Venetian waterways.' }
    ]
  },
  {
    id: 'egypt',
    name: 'Egypt',
    category: 'international',
    location: 'Cairo, Giza & Nile River Cruise',
    tagline: 'Great Pyramids of Giza, luxury Nile cruises, and royal Pharaoh tombs.',
    heroImage: '/images/destinations/egypt/hero.jpg',
    galleryImages: [
      '/images/destinations/egypt/glimpse-1.jpg',
      '/images/destinations/egypt/glimpse-2.jpg',
      '/images/destinations/egypt/glimpse-3.jpg',
      '/images/destinations/egypt/glimpse-4.jpg'
    ],
    description: 'Egypt is humanity\'s most awe-inspiring open-air museum. Stand face to face with the Great Pyramid of Khufu—the only surviving Wonder of the Ancient World—gaze upon the enigmatic Sphinx, and embark on a luxury 5-star Nile cruise sailing between Luxor and Aswan.',
    whyVisit: [
      { icon: '🔺', title: 'Great Pyramids of Giza & Sphinx', desc: 'Explore the 4,500-year-old royal pyramids and take sunrise camel rides on the plateau.' },
      { icon: '🚢', title: '5-Star Nile River Cruise', desc: 'Sail past sandstone cliffs, palm groves, and ancient temples with full luxury service.' },
      { icon: '👑', title: 'Valley of the Kings Luxor', desc: 'Descend into brightly painted underground royal tombs, including King Tutankhamun.' },
      { icon: '🏛', title: 'Karnak & Luxor Temples', desc: 'Walk through massive hypostyle halls supported by 134 towering stone columns.' }
    ],
    highlights: [
      { title: 'Giza Plateau Private Guided Exploration', desc: 'Enter the interior chambers of the Great Pyramid and stand before the colossal Sphinx.' },
      { title: 'Luxor to Aswan Luxury Nile Voyage', desc: 'Relax on the sun deck as ancient Egyptian river life and sunset temples glide by.' },
      { title: 'Abu Simbel Sun Temples Excursion', desc: 'Colossal 20-meter rock-carved statues of Ramses II and Queen Nefertari.' },
      { title: 'Grand Egyptian Museum Tour', desc: 'Witness the complete golden treasure collection of Tutankhamun and royal mummies.' }
    ]
  },
  {
    id: 'almaty',
    name: 'Almaty',
    category: 'international',
    location: 'Kazakhstan',
    tagline: 'Snow-peaked Tian Shan mountains, Charyn Canyon, and alpine glacial lakes.',
    heroImage: '/images/destinations/almaty/hero.jpg',
    galleryImages: [
      '/images/destinations/almaty/glimpse-1.jpg',
      '/images/destinations/almaty/glimpse-2.jpg',
      '/images/destinations/almaty/glimpse-3.jpg',
      '/images/destinations/almaty/glimpse-4.jpg'
    ],
    description: 'Almaty, the cultural jewel of Kazakhstan, is cradled beneath the dramatic snow-capped Tian Shan mountain range. Experience world-class alpine gondola rides at Shymbulak, visit turquoise glacial lakes, and explore the red sandstone towers of Charyn Canyon.',
    whyVisit: [
      { icon: '🏔', title: 'Shymbulak Ski Resort', desc: 'Modern gondola ascent up to 3,200m Talgar Pass with ski slopes and alpine restaurants.' },
      { icon: '🏞', title: 'Big Almaty Lake', desc: 'Turquoise glacial reservoir situated at 2,511m altitude reflecting snow-clad peaks.' },
      { icon: '🏜', title: 'Charyn Canyon Castles', desc: 'Central Asia\'s Grand Canyon featuring majestic red sandstone gorges and river trails.' },
      { icon: '🍎', title: 'Green Bazaar & Nomad Flavors', desc: 'Taste local mountain honey, dried fruits, chocolates, and traditional horse milk kumis.' }
    ],
    highlights: [
      { title: 'Medeu to Shymbulak Mountain Gondola', desc: 'Ride the world\'s third-longest gondola system over pristine pine-clad gorges.' },
      { title: 'Charyn Canyon Valley of Castles Hike', desc: 'Guided trek through dramatic eroded red rock pillars down to the roaring Charyn River.' },
      { title: 'Kok Tobe Hill Cable Car Ride', desc: 'Panoramic evening views over Almaty\'s twinkling skyline with Ferris wheel and cafes.' },
      { title: 'Zenkov Cathedral Panfilov Park', desc: 'Historic 19th-century colorful Orthodox cathedral built entirely of wood without nails.' }
    ]
  },
  {
    id: 'bhutan',
    name: 'Bhutan',
    category: 'international',
    location: 'Paro, Thimphu & Punakha',
    tagline: 'The Last Shangri-La of Gross National Happiness and cliff-hanging monasteries.',
    heroImage: '/images/destinations/bhutan/hero.jpg',
    galleryImages: [
      '/images/destinations/bhutan/glimpse-1.jpg',
      '/images/destinations/bhutan/glimpse-2.jpg',
      '/images/destinations/bhutan/glimpse-3.jpg',
      '/images/destinations/bhutan/glimpse-4.jpg'
    ],
    description: 'Bhutan is the mystical Himalayan Kingdom where cultural preservation and environmental purity take precedence over all else. Trek through prayer-flagged pine forests to the cliff-hanging Tiger\'s Nest monastery, and explore monumental dzong fortresses between rushing mountain rivers.',
    whyVisit: [
      { icon: '🛕', title: 'Tiger\'s Nest (Paro Taktsang)', desc: 'Sacred 17th-century monastery clinging impossibly to a 900-meter vertical sheer cliff.' },
      { icon: '🏰', title: 'Punakha Dzong Palace', desc: 'The most beautiful fortress in the Himalayas, situated at the confluence of two holy rivers.' },
      { icon: '🏔', title: 'Dochula Pass 108 Chortens', desc: 'Mountain pass framed by 108 memorial stupas with sweeping views of 7,000m peaks.' },
      { icon: '🌿', title: 'Gross National Happiness', desc: 'Experience a tranquil kingdom free from mass tourism, traffic lights, and rush.' }
    ],
    highlights: [
      { title: 'Paro Taktsang Mountain Pilgrimage', desc: '4-hour round-trip trek to the sacred meditation cave of Guru Rinpoche in the clouds.' },
      { title: 'Punakha Dzong & Long Suspension Bridge', desc: 'Explore ornate golden murals, courtyards, and walk the iconic wooden suspension bridge.' },
      { title: 'Buddha Dordenma Golden Colossus', desc: 'Visit one of the largest Buddha statues in the world overlooking Thimphu Valley.' },
      { title: 'Traditional Bhutanese Hot Stone Bath', desc: 'Therapeutic river-stone heated mineral baths infused with native medicinal herbs.' }
    ]
  },

  // ==========================================
  // DOMESTIC PACKAGES (10)
  // ==========================================
  {
    id: 'sikkim',
    name: 'Sikkim',
    category: 'domestic',
    location: 'Gangtok, Pelling & Yumthang',
    tagline: 'Discover the hidden paradise of Kanchenjunga peaks, alpine lakes, and monasteries.',
    heroImage: '/images/destinations/sikkim/hero.jpg',
    galleryImages: [
      '/images/destinations/sikkim/glimpse-1.jpg',
      '/images/destinations/sikkim/glimpse-2.jpg',
      '/images/destinations/sikkim/glimpse-3.jpg',
      '/images/destinations/sikkim/glimpse-4.jpg'
    ],
    description: 'Nestled in the Eastern Himalayas, Sikkim is a serene wonderland where snow-crowned Kanchenjunga peaks meet high-altitude glacial lakes, ancient Buddhist monasteries, and vibrant rhododendron valleys. Experience crisp mountain sunrises, peaceful Tibetan chants, and pristine mountain wilderness.',
    whyVisit: [
      { icon: '🏔', title: 'Mt. Kanchenjunga Sunrise', desc: 'Witness golden sunrise reflections on the world\'s third-highest peak from Pelling and Gangtok.' },
      { icon: '🌊', title: 'Sacred Tsomgo Glacial Lake', desc: 'High-altitude 12,400 ft glacial lake reflecting snow peaks, with historic Nathula Pass.' },
      { icon: '🌸', title: 'Yumthang Valley of Flowers', desc: 'River valleys blanketed with 24+ species of rhododendrons and natural thermal hot springs.' },
      { icon: '🛕', title: 'Rumtek & Pemayangtse Monasteries', desc: 'Centuries-old Tibetan Buddhist monasteries echoing with morning prayer chants.' }
    ],
    highlights: [
      { title: 'Tsomgo Lake & Nathula Pass Border Excursion', desc: 'Private 4x4 mountain drive to 12,400 ft altitude with scenic Yak rides.' },
      { title: 'Yumthang Valley & Zero Point Glaciers', desc: 'Explore North Sikkim\'s pristine rhododendron valleys and snow-covered glaciers.' },
      { title: 'Pelling Skywalk & Chenrezig Colossus', desc: 'India\'s first glass skywalk facing the panoramic Kanchenjunga range.' },
      { title: 'Gangtok MG Marg & Ropeway Ride', desc: 'Pedestrian European-style boulevard filled with cozy cafes and cable car valley views.' }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    category: 'domestic',
    location: 'North & South Goa Coastlines',
    tagline: 'Sun-drenched beaches, Portuguese Latin Quarter heritage, and coastal luxury.',
    heroImage: '/images/destinations/goa/hero.jpg',
    galleryImages: [
      '/images/destinations/goa/glimpse-1.jpg',
      '/images/destinations/goa/glimpse-2.jpg',
      '/images/destinations/goa/glimpse-3.jpg',
      '/images/destinations/goa/glimpse-4.jpg'
    ],
    description: 'Goa is India\'s premier beach paradise, seamlessly blending golden sands, historic 17th-century Portuguese architecture, cascading jungle waterfalls, and world-class seafood dining. Escape on private sunset catamaran cruises, explore pastel Latin quarters, and unwind in luxury oceanfront villas.',
    whyVisit: [
      { icon: '🏖', title: 'Golden Sandy Coastlines', desc: 'Relax on serene South Goa beaches or enjoy water sports on vibrant North Goa shores.' },
      { icon: '🏛', title: 'Fontainhas Latin Quarter', desc: 'Wander pastel yellow, blue, and green Portuguese heritage streets and boutique bakeries.' },
      { icon: '🌊', title: 'Dudhsagar Jungle Waterfall', desc: 'Thrilling 4x4 open jeep safari through Bhagwan Mahavir Sanctuary to four-tiered falls.' },
      { icon: '⛵', title: 'Mandovi Sunset Catamaran Cruise', desc: 'Private sunset sailing with panoramic views over the Arabian Sea.' }
    ],
    highlights: [
      { title: 'Dudhsagar Waterfall Jeep Safari', desc: 'Open jeep jungle trek, swimming in natural freshwater pools, and spice plantation buffet.' },
      { title: 'Fort Aguada & 1864 Lighthouse', desc: '17th-century Portuguese fortress ramparts offering commanding ocean sunset panoramas.' },
      { title: 'Fontainhas Heritage Walking Trail', desc: 'Guided stroll through Asia\'s only Latin Quarter with authentic Bebinca and espresso tastings.' },
      { title: 'South Goa 5-Star Beach Resorts', desc: 'Luxury beachfront stays with private cabanas, infinity pools, and Ayurvedic spa treatments.' }
    ]
  },
  {
    id: 'andaman',
    name: 'Andaman',
    category: 'domestic',
    location: 'Port Blair & Havelock Island',
    tagline: 'Turquoise ocean waters, coral reef scuba diving, and Asia\'s finest beaches.',
    heroImage: '/images/destinations/andaman/hero.jpg',
    galleryImages: [
      '/images/destinations/andaman/glimpse-1.jpg',
      '/images/destinations/andaman/glimpse-2.jpg',
      '/images/destinations/andaman/glimpse-3.jpg',
      '/images/destinations/andaman/glimpse-4.jpg'
    ],
    description: 'The Andaman Islands are India\'s pristine tropical archipelago in the Bay of Bengal. Famous for Radhanagar Beach—acclaimed by TIME Magazine as Asia\'s best beach—crystalline coral reefs teeming with marine life, scuba diving, and the poignant history of Cellular Jail.',
    whyVisit: [
      { icon: '🌊', title: 'Radhanagar Beach No. 7', desc: 'Sweeping 2km arc of powder-white sand lapped by calm turquoise waters and dense rainforest.' },
      { icon: '🤿', title: 'World-Class Scuba Diving', desc: 'Dive along Elephant Beach and Nemo Reef amongst sea turtles, manta rays, and vivid coral.' },
      { icon: '🏝', title: 'Havelock & Neil Islands', desc: 'High-speed catamaran ferry transfers to secluded island beaches and natural rock bridges.' },
      { icon: '📜', title: 'Cellular Jail National Memorial', desc: 'Historic colonial prison in Port Blair with an evocative evening Sound & Light spectacle.' }
    ],
    highlights: [
      { title: 'Radhanagar Beach Golden Sunset Walk', desc: 'Witness one of the most stunning beach sunsets on Earth across crystal-clear waters.' },
      { title: 'Elephant Beach Snorkeling & Water Sports', desc: 'Glass-bottom boat excursions, sea karting, and guided reef snorkeling sessions.' },
      { title: 'Cellular Jail Sound & Light Spectacle', desc: 'Moving historical narration of India\'s independence freedom fighters under the stars.' },
      { title: 'Ross Island Colonial Ruins Walk', desc: 'Explore British colonial ruins enveloped by giant banyan tree roots and friendly spotted deer.' }
    ]
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    category: 'domestic',
    location: 'Jaipur, Jodhpur, Jaisalmer & Udaipur',
    tagline: 'Grand royal palaces, living desert forts, Thar sand dunes, and regal lake views.',
    heroImage: '/images/destinations/rajasthan/hero.jpg',
    galleryImages: [
      '/images/destinations/rajasthan/glimpse-1.jpg',
      '/images/destinations/rajasthan/glimpse-2.jpg',
      '/images/destinations/rajasthan/glimpse-3.jpg',
      '/images/destinations/rajasthan/glimpse-4.jpg'
    ],
    description: 'Rajasthan is India\'s royal jewel where magnificent sandstone forts dominate the desert horizon, converted heritage palaces offer living royal hospitality, and camel safaris cross the golden Thar dunes at dusk. From Jaipur\'s pink city gates to Udaipur\'s Lake Pichola, Rajasthan is purely majestic.',
    whyVisit: [
      { icon: '🏰', title: 'Amber Fort & City Palace Jaipur', desc: 'Explore the Hall of Mirrors (Sheesh Mahal), Ganesh Pol, and vibrant bazaar courtyards.' },
      { icon: '🏜', title: 'Jaisalmer Sam Sand Dunes Glamping', desc: 'Sunset camel safaris across golden dunes followed by folk dance performances and stargazing.' },
      { icon: '⛵', title: 'Lake Pichola Udaipur Cruises', desc: 'Private boat rides past the floating white marble Taj Lake Palace and City Palace.' },
      { icon: '👑', title: 'Mehrangarh Fort Jodhpur', desc: 'Imposing fortress towering 400 feet above the famous blue-painted rooftops of the old city.' }
    ],
    highlights: [
      { title: 'Amber Fort Morning Palace Tour', desc: 'Ascend the royal ramparts and marvel at intricate mirror mosaics and Maota Lake views.' },
      { title: 'Sam Dunes Camel Trek & Luxury Camp', desc: 'Ride camels into the dunes at sunset, followed by traditional Rajasthani buffet and folk songs.' },
      { title: 'Udaipur City Palace & Sunset Boat Ride', desc: 'Marvel at royal courtyards, stained glass balconies, and tranquil lake reflections.' },
      { title: 'Jodhpur Blue City Heritage Walk', desc: 'Wander labyrinthine indigo-hued streets beneath the sheer cliffs of Mehrangarh Fort.' }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    category: 'domestic',
    location: 'Alleppey, Munnar & Thekkady',
    tagline: 'God\'s Own Country of palm-lined backwaters, misty tea plantations, and Ayurveda.',
    heroImage: '/images/destinations/kerala/hero.jpg',
    galleryImages: [
      '/images/destinations/kerala/glimpse-1.jpg',
      '/images/destinations/kerala/glimpse-2.jpg',
      '/images/destinations/kerala/glimpse-3.jpg',
      '/images/destinations/kerala/glimpse-4.jpg'
    ],
    description: 'Celebrated as "God\'s Own Country", Kerala offers a tranquil tropical world of serene palm-fringed backwater canals, cool spice-scented mountain stations in Munnar, and centuries-old Ayurvedic holistic healing. Drift peacefully on a private luxury Kettuvallam houseboat with a personal chef.',
    whyVisit: [
      { icon: '🛶', title: 'Private Alleppey Houseboat Stay', desc: 'Slow luxury navigation through serene canals, paddy fields, and Vembanad Lake lagoons.' },
      { icon: '🍵', title: 'Munnar Tea Plantations', desc: 'Rolling emerald tea hills 1,600m above sea level with cool mountain air and waterfalls.' },
      { icon: '💆‍♂️', title: 'Authentic Ayurvedic Spa', desc: 'Rejuvenating traditional Abhyangam herbal oil massages and holistic wellness therapies.' },
      { icon: '🐅', title: 'Periyar Wildlife Lake Safari', desc: 'Boat cruises on Lake Periyar spotting wild elephant herds, sambar deer, and rare birds.' }
    ],
    highlights: [
      { title: 'Overnight Houseboat Backwater Cruise', desc: 'Traditional wood-and-coir luxury houseboat with freshly cooked Karimeen fish curry on deck.' },
      { title: 'Munnar Tea Museum & Eravikulam National Park', desc: 'Spot endangered Nilgiri Tahr mountain goats and learn 100-year-old tea craft.' },
      { title: 'Thekkady Spice Plantation Guided Walk', desc: 'Discover growing cardamom, cinnamon, vanilla, and black pepper vines with local botanists.' },
      { title: 'Kochi Fort & Chinese Fishing Nets', desc: 'Colonial Portuguese and Dutch heritage streets, art cafes, and sea view promenades.' }
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    category: 'domestic',
    location: 'Leh, Pangong Tso & Nubra Valley',
    tagline: 'Roof of the World with azure Pangong Lake, double-humped camels, and 18,000 ft passes.',
    heroImage: '/images/destinations/ladakh/hero.jpg',
    galleryImages: [
      '/images/destinations/ladakh/glimpse-1.jpg',
      '/images/destinations/ladakh/glimpse-2.jpg',
      '/images/destinations/ladakh/glimpse-3.jpg',
      '/images/destinations/ladakh/glimpse-4.jpg'
    ],
    description: 'Ladakh is the crown of the Indian Trans-Himalayas—an awe-inspiring high-altitude desert where azure glacial lakes mirror towering snow giants, ancient mud-brick monasteries cling to cliff edges, and double-humped Bactrian camels wander through stark sand dune valleys.',
    whyVisit: [
      { icon: '💙', title: 'Pangong Tso Lake (4,350m)', desc: 'Famous 134km lake whose colors shift dramatically from turquoise to cobalt blue.' },
      { icon: '🐪', title: 'Nubra Valley Sand Dunes', desc: 'Ride double-humped Bactrian camels through the cold desert dunes of Hunder.' },
      { icon: '🏍', title: 'Khardung La Pass (18,380 ft)', desc: 'Cross one of the highest motorable mountain roads in the world with snow peak vistas.' },
      { icon: '🛕', title: 'Thiksey & Hemis Monasteries', desc: '12-storey hilltop gompa complexes echoing with deep morning Buddhist horn chants.' }
    ],
    highlights: [
      { title: 'Overnight Glamping at Pangong Lake', desc: 'Luxury tented stay right on the lakeshore under one of the clearest Milky Way night skies.' },
      { title: 'Diskit Monastery & 32m Maitreya Buddha', desc: 'Visit the colossal outdoor Buddha statue gazing across the vast Nubra Valley floor.' },
      { title: 'Magnetic Hill & Indus-Zanskar Sangam', desc: 'Experience the gravity-defying road and the dramatic confluence of emerald and brown rivers.' },
      { title: 'Leh Palace & Shanti Stupa Sunset', desc: 'White-domed peace pagoda offering 360-degree panoramas of Leh town and the Stok range.' }
    ]
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    category: 'domestic',
    location: 'Tiger Hill, Batasia Loop & Kurseong',
    tagline: 'Queen of the Hills with Tiger Hill Kanchenjunga sunrise, UNESCO Toy Train, and tea estates.',
    heroImage: '/images/destinations/darjeeling/hero.jpg',
    galleryImages: [
      '/images/destinations/darjeeling/glimpse-1.jpg',
      '/images/destinations/darjeeling/glimpse-2.jpg',
      '/images/destinations/darjeeling/glimpse-3.jpg',
      '/images/destinations/darjeeling/glimpse-4.jpg'
    ],
    description: 'Darjeeling is India\'s most romantic colonial hill station, nestled amidst emerald slopes carpeted with the world\'s finest tea gardens. Watch the dawn sun turn Mt. Kanchenjunga to shimmering gold from Tiger Hill, ride the heritage narrow-gauge steam Toy Train, and stroll Mall Road.',
    whyVisit: [
      { icon: '🌅', title: 'Tiger Hill Golden Sunrise', desc: 'Witness Kanchenjunga and Himalayan peaks turn from silver to fiery gold above the clouds.' },
      { icon: '🚂', title: 'UNESCO Heritage Toy Train', desc: 'Ride the 140-year-old steam locomotive looping through Batasia Loop\'s mountain spirals.' },
      { icon: '🍵', title: 'First-Flush Tea Tasting', desc: 'Tour historic Happy Valley tea gardens and taste authentic champagne of teas.' },
      { icon: '🐾', title: 'Snow Leopard & Red Panda Zoo', desc: 'Visit the world-acclaimed Padmaja Naidu Himalayan Zoological Park.' }
    ],
    highlights: [
      { title: 'Tiger Hill Pre-Dawn Excursion (2,590m)', desc: 'Early morning private 4x4 drive to witness the world\'s most famous Himalayan sunrise.' },
      { title: 'Darjeeling Himalayan Railway Joy Ride', desc: 'First-class heritage steam train journey looping through misty mountain loops to Ghoom.' },
      { title: 'Happy Valley Tea Estate Guided Tour', desc: 'Walk alongside tea pluckers, observe factory sorting, and enjoy a professional cupping session.' },
      { title: 'Japanese Peace Pagoda & Chowrasta Walk', desc: 'Tranquil Buddhist pagoda amidst pine forests and lively evening strolls along Chowrasta.' }
    ]
  },
  {
    id: 'srinagar',
    name: 'Srinagar',
    category: 'domestic',
    location: 'Dal Lake & Mughal Gardens',
    tagline: 'Cedar houseboat living, sunrise floating flower markets, and cascading Mughal terraces.',
    heroImage: '/images/destinations/srinagar/hero.jpg',
    galleryImages: [
      '/images/destinations/srinagar/glimpse-1.jpg',
      '/images/destinations/srinagar/glimpse-2.jpg',
      '/images/destinations/srinagar/glimpse-3.jpg',
      '/images/destinations/srinagar/glimpse-4.jpg'
    ],
    description: 'Srinagar—the summer jewel of Kashmir—is centered around the tranquil mirror waters of Dal Lake. Stay aboard hand-carved cedar houseboats with personal butler service, glide across floating flower and vegetable markets on wooden Shikaras, and wander centuries-old royal Mughal gardens.',
    whyVisit: [
      { icon: '🛶', title: 'Dal Lake Luxury Houseboats', desc: 'Hand-carved cedar wood floating suites with antique Kashmiri rugs and private verandas.' },
      { icon: '🌸', title: 'Sunrise Floating Market', desc: 'Traditional 5 AM Shikara paddle to the lively water market where vendors trade boat-to-boat.' },
      { icon: '⛲', title: 'Mughal Gardens of Jahangir', desc: 'Cascading terraced fountains at Shalimar Bagh and Nishat Bagh overlooking the lake.' },
      { icon: '🛕', title: 'Shankaracharya Hilltop Temple', desc: 'Ancient stone temple offering 360-degree panoramas of Srinagar and the Zabarwan range.' }
    ],
    highlights: [
      { title: 'Early Morning Shikara Market Ride', desc: 'Glide through morning lake mist, lotus channels, and watch local merchants trade fresh produce.' },
      { title: 'Shalimar & Nishat Bagh Guided Stroll', desc: 'Emperor Jahangir\'s royal pleasure gardens shaded by centuries-old giant Chinar trees.' },
      { title: 'Indira Gandhi Memorial Tulip Garden', desc: 'Asia\'s largest tulip garden blooming in vibrant rainbow carpets beneath snow mountains (spring).' },
      { title: 'Old City Saffron & Papier-Mâché Artisans', desc: 'Explore historic wood-carved mosques and meet master craftsmen weaving Pashmina shawls.' }
    ]
  },
  {
    id: 'kashmir',
    name: 'Kashmir Valley',
    category: 'domestic',
    location: 'Gulmarg, Pahalgam & Sonamarg',
    tagline: 'World\'s highest cable cars, alpine ski slopes, and pine-fringed Lidder river valleys.',
    heroImage: '/images/destinations/kashmir/hero.jpg',
    galleryImages: [
      '/images/destinations/kashmir/glimpse-1.jpg',
      '/images/destinations/kashmir/glimpse-2.jpg',
      '/images/destinations/kashmir/glimpse-3.jpg',
      '/images/destinations/kashmir/glimpse-4.jpg'
    ],
    description: 'Beyond the lakes of Srinagar lies the great Himalayan valley of Kashmir. Ascend to 13,780 feet on the world-renowned Gulmarg Gondola for world-class skiing and snow views, ride mountain ponies through the lush pine forests of Pahalgam\'s Betaab Valley, and touch glaciers in Sonamarg.',
    whyVisit: [
      { icon: '🚡', title: 'Gulmarg Gondola Phase 2', desc: 'World\'s second-highest cable car taking you to Apharwat Peak at 13,780 ft.' },
      { icon: '🌲', title: 'Pahalgam Betaab & Aru Valleys', desc: 'Lush meadows bordered by deodar pine forests, trout streams, and pony trails.' },
      { icon: '❄️', title: 'Sonamarg Thajiwas Glacier', desc: 'Pristine "Meadow of Gold" surrounded by towering glaciers and snow passes.' },
      { icon: '⛷', title: 'Winter Skiing & Sledging', desc: 'Powder snow skiing, snowboarding, and sledging on high-altitude slopes.' }
    ],
    highlights: [
      { title: 'Gulmarg Apharwat Peak Gondola Ascent', desc: 'Soar above pine canopies on Phase 1 to Kongdoori and Phase 2 to the snow summit.' },
      { title: 'Pahalgam Lidder River Walk & Valley Pony Ride', desc: 'Walk alongside rushing crystal glacial waters and explore iconic Bollywood cinema valleys.' },
      { title: 'Sonamarg Thajiwas Glacier Sledge Excursion', desc: 'Pony trek up to the foot of eternal glaciers with snow activities year-round.' },
      { title: 'Boutique Alpine Mountain Resort Stay', desc: 'Warm wooden chalet stays with roaring fireplaces and traditional Kashmiri Wazwan cuisine.' }
    ]
  },
  {
    id: 'manali',
    name: 'Manali',
    category: 'domestic',
    location: 'Solang Valley, Rohtang Pass & Old Manali',
    tagline: 'Rohtang snow fields, Solang Valley adventure sports, and cedar pagoda temples.',
    heroImage: '/images/destinations/manali/hero.jpg',
    galleryImages: [
      '/images/destinations/manali/glimpse-1.jpg',
      '/images/destinations/manali/glimpse-2.jpg',
      '/images/destinations/manali/glimpse-3.jpg',
      '/images/destinations/manali/glimpse-4.jpg'
    ],
    description: 'Manali is Himachal Pradesh\'s premier mountain destination, set along the crystal waters of the Beas River valley. Surrounded by snow-covered peaks, dense deodar forests, and alpine meadows, Manali offers the perfect mix of high-adrenaline adventure sports and romantic mountain retreats.',
    whyVisit: [
      { icon: '❄️', title: 'Rohtang Pass & Atal Tunnel', desc: 'Play in year-round snow fields at 13,054 ft and drive through the 9km Atal Tunnel to Lahaul.' },
      { icon: '🪂', title: 'Solang Valley Adventure', desc: 'Tandem paragliding, 500m zip-lining, quad biking, and winter snowmobiling.' },
      { icon: '🛕', title: 'Hadimba Devi Pagoda Temple', desc: '16th-century four-tiered wooden pagoda temple nestled inside an ancient cedar forest.' },
      { icon: '🛶', title: 'Beas River White-Water Rafting', desc: 'Exhilarating Class III-IV river rafting down the roaring Beas River in Kullu valley.' }
    ],
    highlights: [
      { title: 'Rohtang Snow Point Excursion', desc: 'Special permit mountain drive to snow fields offering panoramic vistas into Spiti & Lahaul.' },
      { title: 'Solang Valley Tandem Paragliding', desc: 'Soar high above pine forests and mountain meadows with experienced flight instructors.' },
      { title: 'Hadimba Temple & Old Manali Village Walk', desc: 'Ancient wood-carved shrine, rustic apple orchards, and lively riverside cafes.' },
      { title: 'Vashisht Natural Thermal Sulfur Springs', desc: 'Relax in natural hot mineral water baths surrounded by carved stone temples.' }
    ]
  },
  {
    id: 'mountabu',
    name: 'Mount Abu',
    category: 'domestic',
    location: 'Aravalli Hills, Rajasthan',
    tagline: 'Rajasthan\'s only hill station with intricate Dilwara marble temples and Nakki Lake.',
    heroImage: '/images/destinations/mountabu/hero.jpg',
    galleryImages: [
      '/images/destinations/mountabu/glimpse-1.jpg',
      '/images/destinations/mountabu/glimpse-2.jpg',
      '/images/destinations/mountabu/glimpse-3.jpg',
      '/images/destinations/mountabu/glimpse-4.jpg'
    ],
    description: 'Mount Abu is a miraculous green oasis rising from Rajasthan\'s desert plains—the state\'s only hill station. Cradled in the ancient Aravalli mountain range, it is celebrated for the breathtaking white marble carvings of the Dilwara Jain Temples, romantic sunset boating on Nakki Lake, and high-altitude mountain vistas.',
    whyVisit: [
      { icon: '🏛', title: 'Dilwara Jain Temples', desc: 'World-renowned 11th-century white marble temples carved with unbelievable lace-like detail.' },
      { icon: '⛵', title: 'Nakki Lake Sunset Boating', desc: 'Picturesque sacred mountain lake surrounded by wooded Aravalli hills and rock formations.' },
      { icon: '🌄', title: 'Sunset Point & Toad Rock', desc: 'Panoramic evening views watching the desert horizon turn crimson and gold.' },
      { icon: '🏔', title: 'Guru Shikhar Peak (1,722m)', desc: 'The highest summit in Rajasthan offering sweeping views over Gujarat and Rajasthan.' }
    ],
    highlights: [
      { title: 'Dilwara Marble Carving Guided Tour', desc: 'Marvel at translucent marble ceiling pendants and filigree pillars carved 1,000 years ago.' },
      { title: 'Nakki Lake Pedal Boating & Mall Walk', desc: 'Pedal boat across tranquil waters, visit Toad Rock, and stroll evening bazaars.' },
      { title: 'Guru Shikhar Summit & Dattatreya Temple', desc: 'Ascend to the highest point of the Aravalli range for panoramic mountain vistas.' },
      { title: 'Achalgarh Medieval Fort & Shiva Temple', desc: 'Explore historic fort ruins built by Rana Kumbha with a sacred brass Nandi bull.' }
    ]
  }
];
