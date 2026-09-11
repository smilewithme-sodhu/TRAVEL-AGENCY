// Comprehensive Luxury Travel Magazine Package Dataset
// 12 International + 10 Domestic Destinations

export const DESTINATION_PACKAGES = [
  // ==========================================
  // INTERNATIONAL PACKAGES (12)
  // ==========================================
  {
    id: 'dubai',
    name: 'Dubai',
    category: 'international',
    location: 'United Arab Emirates',
    tagline: 'A sparkling oasis where futuristic marvels meet Arabian desert majesty.',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Dubai is a city of superlatives where ultramodern architecture seamlessly weaves into rich bedouin heritage. From standing atop the clouds at Burj Khalifa to gliding across golden sand dunes at sunset, Dubai promises a glamorous, unforgettable escape for travelers seeking luxury, thrill, and world-class hospitality.',
    whyVisit: [
      { icon: '🌆', title: 'Futuristic Skyline', desc: 'Marvel at iconic architectural masterpieces including Burj Khalifa, Museum of the Future, and Dubai Frame.' },
      { icon: '🏜', title: 'Golden Desert Safaris', desc: 'Experience luxury dune bashing, camel rides, and traditional bedouin dinners under starlit desert skies.' },
      { icon: '🛍', title: 'World-Class Shopping', desc: 'Explore lavish mega-malls, traditional gold & spice souks, and waterfront promenades.' },
      { icon: '✨', title: 'Unmatched Luxury', desc: 'Indulge in 5-star beach resorts, Michelin-star dining, and private yacht cruises across Dubai Marina.' }
    ],
    highlights: [
      { title: 'Burj Khalifa Sky Deck', desc: 'Ascend to the highest observation deck in the world for breathtaking panoramic views of the Arabian Gulf.' },
      { title: 'Dubai Desert Conservation Reserve', desc: 'Private 4x4 safari with falconry demonstrations and authentic bedouin hospitality.' },
      { title: 'The Palm Jumeirah & Atlantis', desc: 'Explore the world-famous man-made island, luxury beach clubs, and lost chambers aquarium.' },
      { title: 'Dubai Creek & Gold Souk', desc: 'Ride a traditional wooden Abra boat across the historic creek and wander vibrant spice markets.' }
    ]
  },
  {
    id: 'thailand',
    name: 'Thailand',
    category: 'international',
    location: 'Southeast Asia',
    tagline: 'Tropical islands, golden temples, and warm smiles in the Land of Smiles.',
    heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1519451241324-20b4f6c42202?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Thailand captivates the senses with its turquoise sea lagoons, limestone karsts rising from emerald waters, and ornate Buddhist temples. Whether island-hopping across Phuket and Krabi or immersing yourself in Bangkok\'s buzzing street life, Thailand offers an enchanting sanctuary of warmth, flavor, and natural beauty.',
    whyVisit: [
      { icon: '🏝', title: 'Idyllic Islands', desc: 'Discover world-famous islands with powder-white sands, hidden lagoons, and crystal sea waters.' },
      { icon: '🛕', title: 'Sacred Temples', desc: 'Visit ornate golden temples like Wat Pho, Wat Arun, and the Grand Palace in Bangkok.' },
      { icon: '🍲', title: 'Culinary Delights', desc: 'Savor world-renowned Thai cuisine from vibrant night markets to luxury rooftop dining.' },
      { icon: '💆‍♀️', title: 'Wellness & Spas', desc: 'Rejuvenate with traditional Thai massages and beachfront holistic wellness retreats.' }
    ],
    highlights: [
      { title: 'Phi Phi Islands & Maya Bay', desc: 'Cruise on longtail boats through emerald sea lagoons and dramatic limestone cliffs.' },
      { title: 'Bangkok Grand Palace & River Cruise', desc: 'Experience majestic royal architecture and romantic dinner cruises along the Chao Phraya River.' },
      { title: 'Chiang Mai Elephant Sanctuaries', desc: 'Ethical encounters with rescued Asian elephants in lush northern mountain forests.' },
      { title: 'Phuket & Krabi Beach Resorts', desc: 'Relax in luxury beachfront resorts with sunset views over the Andaman Sea.' }
    ]
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    category: 'international',
    location: 'Southeast Asia',
    tagline: 'Timeless limestone bays, emerald rice terraces, and captivating heritage.',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1509030450996-939a26352b45?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Vietnam is a land of staggering natural beauty and deep cultural soul. From floating among thousands of towering limestone islets in Ha Long Bay to wandering through lantern-lit ancient streets in Hoi An, Vietnam weaves together dramatic landscapes, rich history, and world-renowned gastronomy.',
    whyVisit: [
      { icon: '⛵', title: 'Ha Long Bay Cruises', desc: 'Overnight luxury cruises through UNESCO World Heritage limestone seascapes.' },
      { icon: '🏮', title: 'Hoi An Lantern Town', desc: 'Stroll through romantic preserved yellow merchant houses glowing with colorful silk lanterns.' },
      { icon: '🍜', title: 'Authentic Gastronomy', desc: 'Taste fresh Pho, Banh Mi, and aromatic Vietnamese egg coffee in historic street cafes.' },
      { icon: '⛰', title: 'Sapa Mist Terraces', desc: 'Trek through breathtaking cascaded green rice fields tucked into northern mountain peaks.' }
    ],
    highlights: [
      { title: 'Ha Long & Lan Ha Bay Expedition', desc: 'Kayak through hidden sea caves and sleep under stars on a luxury boutique cruise ship.' },
      { title: 'Da Nang Golden Bridge', desc: 'Walk across the iconic bridge held up by giant stone hands in the Ba Na Hills.' },
      { title: 'Hanoi Old Quarter', desc: 'Discover French colonial architecture, ancient temples, and vibrant coffee culture.' },
      { title: 'Mekong Delta River Life', desc: 'Explore coconut groves, floating markets, and riverboat passages in southern Vietnam.' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali',
    category: 'international',
    location: 'Indonesia',
    tagline: 'An island of gods, emerald rice terraces, and tranquil ocean sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Bali is a destination where every moment feels magical. From peaceful ancient cliffside temples to lush jungle rain sanctuaries in Ubud and vibrant sunset beach clubs in Seminyak, Bali offers the ultimate blend of romantic luxury, spiritual harmony, and tropical paradise.',
    whyVisit: [
      { icon: '🌊', title: 'Beautiful Beaches', desc: 'Relax on world-famous beaches with crystal clear waters, surf breaks, and golden sunsets.' },
      { icon: '🏛', title: 'Rich Culture', desc: 'Explore ancient cliffside temples, sacred water palaces, and traditional Balinese dance.' },
      { icon: '🌿', title: 'Natural Beauty', desc: 'Discover jungle waterfalls, volcanic craters, and cascaded Tegalalang rice terraces.' },
      { icon: '✨', title: 'Unforgettable Memories', desc: 'Experience floating pool breakfasts, luxury jungle villas, and beachfront dining.' }
    ],
    highlights: [
      { title: 'Ubud Jungle Sanctuary & Rice Terraces', desc: 'Stay in luxury pool villas surrounded by tropical rainforest and emerald rice fields.' },
      { title: 'Uluwatu Sunset Temple & Kecak Fire Dance', desc: 'Watch dramatic cliffside sunsets while experiencing hypnotic traditional Balinese performances.' },
      { title: 'Nusa Penida Island Excursion', desc: 'Visit Kelingking T-Rex Beach and swim with gentle manta rays in crystal turquoise sea waters.' },
      { title: 'Tanah Lot Sea Temple', desc: 'Marvel at the sacred sea temple perched dramatically on offshore rock formations.' }
    ]
  },
  {
    id: 'azerbaijan',
    name: 'Azerbaijan',
    category: 'international',
    location: 'Caspian Sea Region',
    tagline: 'The Land of Fire where ancient Silk Road romance meets modern elegance.',
    heroImage: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Azerbaijan, known as the Land of Fire, is a captivating bridge between East and West. From the futuristic Flame Towers and UNESCO-listed medieval Old City of Baku to the snow-capped Caucasus Mountains and eternal natural flames of Yanar Dag, Azerbaijan offers an intriguing, sophisticated travel experience.',
    whyVisit: [
      { icon: '🔥', title: 'Land of Fire Mysteries', desc: 'Witness natural gas flames burning perpetually at Yanar Dag mountain.' },
      { icon: '🏰', title: 'Baku Old City (Icherisheher)', desc: 'Wander medieval stone alleyways, Maiden Tower, and Palace of the Shirvanshahs.' },
      { icon: '🏔', title: 'Caucasus Mountain Resorts', desc: 'Experience alpine skiing and cable cars in Gabala and Shahdag.' },
      { icon: '🏙', title: 'Futuristic Architecture', desc: 'Admire Zaha Hadid\'s Heydar Aliyev Center and illuminated Flame Towers.' }
    ],
    highlights: [
      { title: 'Baku City Center & Caspian Boulevard', desc: 'Stroll along seaside parks, fountain squares, and high-end luxury fashion boutiques.' },
      { title: 'Gobustan Rock Art & Mud Volcanoes', desc: 'Explore prehistoric petroglyphs and rare bubbling mud volcanoes.' },
      { title: 'Ateshgah Fire Temple', desc: 'Visit the historic castle-style temple used by Zoroastrian travelers on the Silk Road.' },
      { title: 'Gabala Alpine Resort', desc: 'Ride cable cars up Tufandag mountain and enjoy serene lake views at Nohur Lake.' }
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    category: 'international',
    location: 'Southeast Asia',
    tagline: 'A futuristic garden city of innovation, luxury, and vibrant heritage.',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Singapore is a global metropolis where nature and cutting-edge design flourish together. From the surreal Supertree Grove at Gardens by the Bay to luxury shopping on Orchard Road and Sentosa Island\'s beach resorts, Singapore provides an effortless, pristine, and inspiring holiday.',
    whyVisit: [
      { icon: '🌳', title: 'Gardens by the Bay', desc: 'Be awed by giant glowing Supertrees and the world\'s largest glass greenhouse Flower Dome.' },
      { icon: '🏨', title: 'Marina Bay Sands', desc: 'Experience the world-famous rooftop infinity pool looking out over Singapore Skyline.' },
      { icon: '🎡', title: 'Sentosa Island Resorts', desc: 'Universal Studios, golden beaches, luxury spas, and world-class entertainment.' },
      { icon: '🛍', title: 'Orchard Road Shopping', desc: 'Premier luxury fashion malls, Michelin-star hawker dining, and heritage enclaves.' }
    ],
    highlights: [
      { title: 'Gardens by the Bay & Light Show', desc: 'Witness the nightly synchronized music and light show under towering bio-domes.' },
      { title: 'Jewel Changi Rain Vortex', desc: 'See the world\'s tallest indoor waterfall surrounded by a multi-tier lush rainforest.' },
      { title: 'Sentosa Cable Car & Universal Studios', desc: 'Aerial cable car rides over the harbor to Sentosa\'s theme parks and beach clubs.' },
      { title: 'Chinatown & Little India Cultural Walks', desc: 'Taste Michelin-lauded street food and explore vibrant heritage shophouses.' }
    ]
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    category: 'international',
    location: 'Southeast Asia',
    tagline: 'Petronas twin towers, ancient rainforests, and island beach paradises.',
    heroImage: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Malaysia offers a rich tapestry of cultures, modern cityscapes, and pristine nature. Stand in awe beneath the towering Petronas Twin Towers in Kuala Lumpur, explore 130-million-year-old rainforests in Genting and Cameron Highlands, or relax on the white sandy beaches of Langkawi island.',
    whyVisit: [
      { icon: '🏙', title: 'Petronas Twin Towers', desc: 'Iconic chrome and glass skyscrapers soaring high above Kuala Lumpur city.' },
      { icon: '🏝', title: 'Langkawi Archipelago', desc: '99 tropical islands with mangroves, sky bridges, and luxury beach resorts.' },
      { icon: '🛕', title: 'Batu Caves Sanctuary', desc: 'Climb 272 vibrant rainbow stairs leading to ancient limestone cave temples.' },
      { icon: '🍵', title: 'Cameron Highlands', desc: 'Cool mountain air, rolling green tea plantations, and strawberry farms.' }
    ],
    highlights: [
      { title: 'Langkawi Sky Bridge & Cable Car', desc: 'Ride one of the steepest cable cars in the world over ancient rainforest canopies.' },
      { title: 'Genting Highlands Cable Car & Theme Park', desc: 'Cool mountain casino resort with high-altitude indoor and outdoor amusement parks.' },
      { title: 'Kuala Lumpur Golden Triangle', desc: 'Boutique shopping, rooftop lounge bars, and vibrant street markets on Jalan Alor.' },
      { title: 'Penang Street Art & Heritage Food', desc: 'UNESCO World Heritage town famous for colonial architecture and food culture.' }
    ]
  },
  {
    id: 'srilanka',
    name: 'Sri Lanka',
    category: 'international',
    location: 'Indian Ocean',
    tagline: 'The Pearl of the Indian Ocean, rich in tea gardens, ancient ruins, and wildlife.',
    heroImage: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Sri Lanka is an island of endless charm, where golden beaches, emerald hill country, and ancient UNESCO fortress cities come together. Take iconic scenic train rides through Nuwara Eliya\'s tea estates, spot wild leopards in Yala, and unwind in colonial coastal forts.',
    whyVisit: [
      { icon: '🗿', title: 'Sigiriya Rock Fortress', desc: 'Ascend the 5th-century ancient palace fortress carved atop a massive 200m rock.' },
      { icon: '🚂', title: 'Ella Scenic Train Ride', desc: 'Journey across Nine Arch Bridge through misty mountain tea plantations.' },
      { icon: '🐆', title: 'Yala Wildlife Safaris', desc: 'Spot wild Asian elephants, leopards, and sloth bears in their natural habitat.' },
      { icon: '🏖', title: 'Bentota & Galle Beaches', desc: 'Golden sands, stilt fishermen, and luxury beachfront boutique villas.' }
    ],
    highlights: [
      { title: 'Sigiriya Lion Rock Climb', desc: 'Explore ancient water gardens, frescoes, and panoramic views over jungle wilderness.' },
      { title: 'Temple of the Sacred Tooth Relic (Kandy)', desc: 'Visit Sri Lanka\'s most revered Buddhist temple situated beside Kandy Lake.' },
      { title: 'Nuwara Eliya "Little England"', desc: 'Tour historic Ceylon tea factories and stay in colonial English country mansions.' },
      { title: 'Galle Dutch Fort Walk', desc: 'Wander cobble streets, boutique jewelry shops, and historic ocean ramparts.' }
    ]
  },
  {
    id: 'europe',
    name: 'Europe',
    category: 'international',
    location: 'Schengen Europe',
    tagline: 'Romantic capitals, alpine glaciers, Mediterranean coasts, and rich history.',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1520939817895-060bdef4fe17?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Europe is the ultimate dream destination, offering a magnificent canvas of fairy-tale castles, snow-peaked Swiss Alps, romantic Parisian boulevards, and sun-drenched Italian coastlines. Tailored for those seeking timeless culture, luxury, and unmatched European elegance.',
    whyVisit: [
      { icon: '🏰', title: 'Fairy-Tale Castles', desc: 'Explore historic royal palaces in Paris, Rome, Venice, and Swiss Alpine valleys.' },
      { icon: '🏔', title: 'Swiss Alps & Glaciers', desc: 'Panoramic mountain trains past Matterhorn and snow-clad Jungfraujoch.' },
      { icon: '🍕', title: 'Gastronomy & Wine', desc: 'Taste fine wines, Italian gelato, French pastries, and authentic continental cuisine.' },
      { icon: '🎨', title: 'World-Class Art', desc: 'Discover Louvre, Vatican Museums, and centuries of architecture and art.' }
    ],
    highlights: [
      { title: 'Paris Eiffel Tower & Seine Cruise', desc: 'Romantic evening cruises under illuminated bridges and iconic city views.' },
      { title: 'Swiss Glacier 3000 & Zermatt Train', desc: 'Ride high-altitude alpine cable cars over eternal snow fields.' },
      { title: 'Venice Gondola & Colosseum Rome', desc: 'Glide through romantic canals and explore ancient Roman amphitheaters.' },
      { title: 'Amsterdam Canal & Tulip Fields', desc: 'Scenic waterways, windmills, and vibrant Keukenhof floral gardens.' }
    ]
  },
  {
    id: 'egypt',
    name: 'Egypt',
    category: 'international',
    location: 'North Africa',
    tagline: 'Ancient Pyramids, majestic Nile River cruises, and Pharaoh mysteries.',
    heroImage: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Egypt is a land of timeless wonder where ancient history comes alive. Stand face to face with the Great Pyramids of Giza, gaze upon the enigmatic Sphinx, and sail along the legendary Nile River aboard a luxury cruise liner past Karnak and Luxor temples.',
    whyVisit: [
      { icon: '🔺', title: 'Great Pyramids of Giza', desc: 'Marvel at the last surviving Wonder of the Ancient World and the Great Sphinx.' },
      { icon: '🚢', title: 'Nile River Cruise', desc: 'Sail in comfort between Luxor and Aswan past ancient sandstone temples.' },
      { icon: '👑', title: 'Valley of the Kings', desc: 'Explore underground royal tombs decorated with vivid 3,000-year-old hieroglyphics.' },
      { icon: '🌊', title: 'Red Sea Resort Luxury', desc: 'Snorkel crystal coral reefs in Sharm El Sheikh and Hurghada.' }
    ],
    highlights: [
      { title: 'Giza Pyramids & Camel Safari', desc: 'Private guided exploration inside ancient pyramids and desert plateau panoramas.' },
      { title: 'Luxor & Karnak Temple Complex', desc: 'Walk through massive hypostyle halls of colossal carved stone columns.' },
      { title: 'Grand Egyptian Museum Cairo', desc: 'See King Tutankhamun\'s solid gold treasures and royal mummies.' },
      { title: 'Abu Simbel Sun Temples', desc: 'Monumental rock-cut sun temples of King Ramses II overlooking Lake Nasser.' }
    ]
  },
  {
    id: 'almaty',
    name: 'Almaty',
    category: 'international',
    location: 'Kazakhstan',
    tagline: 'Snow-peaked Tian Shan mountains, turquoise alpine lakes, and winter wonders.',
    heroImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Almaty, the apple city of Central Asia, is framed by the dramatic, snow-capped Trans-Ili Alatau mountains. From alpine lake reflections at Big Almaty Lake to high-altitude skiing at Shymbulak and canyon landscapes at Charyn Canyon, Almaty is a pristine alpine wonderland.',
    whyVisit: [
      { icon: '❄️', title: 'Shymbulak Ski Resort', desc: 'World-class modern cable cars and powder snow skiing slopes.' },
      { icon: '🏞', title: 'Big Almaty Lake', desc: 'Turquoise glacial alpine lake cradled by 4,000m snow peaks.' },
      { icon: '🏜', title: 'Charyn Canyon', desc: 'Kazakhstan\'s Grand Canyon featuring majestic red rock castles.' },
      { icon: '🍎', title: 'Vibrant Green Bazaar', desc: 'Taste local dried fruits, chocolates, and Central Asian specialties.' }
    ],
    highlights: [
      { title: 'Shymbulak Gondola Peak Ride', desc: 'Ascend to 3,200m altitude for unobstructed mountain valley panoramas.' },
      { title: 'Kok Tobe Hill Cable Car', desc: 'Panoramic city views, Ferris wheel rides, and cozy hilltop cafes.' },
      { title: 'Kaindy Sunken Forest Lake', desc: 'Unique mountain lake created by an earthquake with submerged pine tree trunks.' },
      { title: 'Zenkov Wooden Cathedral', desc: 'Colorful 19th-century Orthodox cathedral built entirely of wood without metal nails.' }
    ]
  },
  {
    id: 'bhutan',
    name: 'Bhutan',
    category: 'international',
    location: 'Eastern Himalayas',
    tagline: 'The Last Shangri-La of Gross National Happiness and cliffside monasteries.',
    heroImage: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Bhutan is a peaceful Himalayan kingdom where ancient tradition and environmental conservation reign. Home to the iconic cliff-clinging Paro Taktsang (Tiger\'s Nest) monastery, pristine forested valleys, and warm mountain culture, Bhutan offers a soul-stirring sanctuary.',
    whyVisit: [
      { icon: '🛕', title: 'Tiger\'s Nest Monastery', desc: 'Hike to the legendary Paro Taktsang monastery perched on a 900m sheer cliff.' },
      { icon: '🌿', title: 'Gross National Happiness', desc: 'Experience a culture focused on spiritual wellbeing and environmental harmony.' },
      { icon: '🏔', title: 'Himalayan Pass Scenery', desc: 'Dochula Pass with 108 memorial stupas overlooking snow mountain ranges.' },
      { icon: '🏰', title: 'Majestic Dzongs', desc: 'Explore monumental fortress monasteries like Punakha Dzong at river confluence.' }
    ],
    highlights: [
      { title: 'Taktsang Monastery Trek', desc: 'Walk through pine forests fluttering with colorful prayer flags to the cliff temple.' },
      { title: 'Punakha Dzong & Suspension Bridge', desc: 'Marvel at Bhutan\'s most beautiful fortress situated between Mo and Pho rivers.' },
      { title: 'Thimphu Buddha Dordenma Statue', desc: 'Visit the massive 51m golden Buddha statue overlooking Thimphu Valley.' },
      { title: 'Traditional Hot Stone Bath', desc: 'Relax in river-stone heated herbal mineral water baths.' }
    ]
  },

  // ==========================================
  // DOMESTIC PACKAGES (10)
  // ==========================================
  {
    id: 'sikkim',
    name: 'Sikkim',
    category: 'domestic',
    location: 'Northeast India',
    tagline: 'Discover the hidden paradise of snow peaks, lakes, and peaceful monasteries.',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Sikkim is a land of otherworldly beauty nestled beneath Kanchenjunga, the world\'s third highest peak. Where majestic snow mountains, tranquil glacial lakes like Tsomgo, rhododendron valleys, and serene Buddhist monasteries create an unforgettable Himalayan sanctuary.',
    whyVisit: [
      { icon: '🏔', title: 'Kanchenjunga Views', desc: 'Witness golden sunrise reflections on the world\'s third-highest mountain peak.' },
      { icon: '🌊', title: 'Glacial Tsomgo Lake', desc: 'Explore the high-altitude frozen lake surrounded by steep snow-clad mountains.' },
      { icon: '🌸', title: 'Yumthang Valley of Flowers', desc: 'Walk through vibrant hot springs and rhododendron blossom sanctuaries.' },
      { icon: '🛕', title: 'Rumtek & Pemayangtse Monasteries', desc: 'Immerse yourself in centuries of Tibetan Buddhist spiritual tranquility.' }
    ],
    highlights: [
      { title: 'Tsomgo Lake & Nathula Pass', desc: 'High-altitude border pass journey through pristine snowfields and Yak rides.' },
      { title: 'Gangtok Ropeway & MG Marg Walk', desc: 'Pedestrian boulevard with cozy cafes, shopping, and cable car valley views.' },
      { title: 'Gurudongmar Lake Expedition', desc: 'Visit one of the highest sacred lakes in the world at 17,800 feet elevation.' },
      { title: 'Pelling Skywalk & Ruins', desc: 'Walk on India\'s first glass skywalk facing the breathtaking Kanchenjunga range.' }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    category: 'domestic',
    location: 'West Coast India',
    tagline: 'Golden beaches, Portuguese heritage mansions, and vibrant coastal bliss.',
    heroImage: '/images/daden-bhutia-beach.jpg',
    galleryImages: [
      '/images/daden-bhutia-beach.jpg',
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Goa is India\'s coastal paradise where golden sand beaches meet sway coconut palms and historic Portuguese architecture. From tranquil south Goa beach luxury resorts to private catamaran sunset cruises and spice plantation lunches, Goa offers the ultimate tropical escape.',
    whyVisit: [
      { icon: '🏖', title: 'Golden Sandy Beaches', desc: 'Relax on pristine beaches from quiet Palolem in the South to lively Baga in North.' },
      { icon: '⛵', title: 'Mandovi Sunset Cruises', desc: 'Catamaran cruises with live Konkani music and starlit river dining.' },
      { icon: '🏛', title: 'Portuguese Heritage', desc: 'Visit UNESCO Basilica of Bom Jesus, Latin Quarter Fontainhas, and old forts.' },
      { icon: '🌴', title: 'Spice Plantations', desc: 'Walk through organic spice gardens with traditional banana-leaf Goan meals.' }
    ],
    highlights: [
      { title: 'Fontainhas Latin Quarter Walk', desc: 'Wander pastel yellow Portuguese heritage villas and boutique art cafes.' },
      { title: 'Dudhsagar Waterfalls Safari', desc: '4x4 open jeep safari through Bhagwan Mahavir Wildlife Sanctuary to four-tiered falls.' },
      { title: 'South Goa Luxury Beach Resorts', desc: 'Unwind at 5-star beachfront sanctuaries with private pools and spa treatments.' },
      { title: 'Aguada & Chapora Fort Sunset', desc: 'Panoramic ocean cliff views over the Arabian sea.' }
    ]
  },
  {
    id: 'andaman',
    name: 'Andaman',
    category: 'domestic',
    location: 'Bay of Bengal',
    tagline: 'Turquoise ocean waters, coral reefs, and white sand island paradises.',
    heroImage: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'The Andaman and Nicobar Islands are an untouched tropical paradise in the Bay of Bengal. Famous for Radhanagar Beach—voted among Asia\'s finest—vibrant coral reefs, scuba diving, and historic Cellular Jail, Andaman is perfect for honeymoons and luxury beach escapes.',
    whyVisit: [
      { icon: '🌊', title: 'Radhanagar Beach', desc: 'Powder-white sands and clear turquoise waters backed by mahua forests.' },
      { icon: '🤿', title: 'Scuba & Coral Snorkeling', desc: 'Dive alongside sea turtles and colorful coral reefs in Elephant Beach.' },
      { icon: '🏝', title: 'Havelock & Neil Islands', desc: 'Island-hopping on glass-bottom speedboats between secluded beaches.' },
      { icon: '📜', title: 'Cellular Jail History', desc: 'Poignant national memorial with evening light and sound shows.' }
    ],
    highlights: [
      { title: 'Radhanagar Beach Sunset Walk', desc: 'Stroll on Asia\'s acclaimed finest beach under golden evening hues.' },
      { title: 'Scuba Diving at Havelock Reefs', desc: 'PADI guided diving in crystal underwater marine sanctuaries.' },
      { title: 'Baratang Island Limestone Caves', desc: 'Speedboat ride through dense mangrove creeks to ancient caves.' },
      { title: 'Ross Island Colonial Ruins', desc: 'Peacocks and deer roaming amidst jungle-wrapped British colonial ruins.' }
    ]
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    category: 'domestic',
    location: 'Northwest India',
    tagline: 'Royal palaces, desert forts, golden sands, and legendary hospitality.',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Rajasthan is the land of Maharajas, where opulent royal palaces, towering sandstone forts, and golden desert dunes evoke timeless romance. Explore Jaipur\'s Pink City, Udaipur\'s romantic Lake Pichola palace, and Jaisalmer\'s Thar desert luxury camps.',
    whyVisit: [
      { icon: '🏰', title: 'Royal Forts & Palaces', desc: 'Visit Amber Fort, City Palace Jaipur, and Mehrangarh Fort in Jodhpur.' },
      { icon: '⛵', title: 'Udaipur Lake Pichola', desc: 'Sunset boat rides past Jag Mandir and Lake Palace.' },
      { icon: '🏜', title: 'Thar Desert Luxury Camps', desc: 'Camel safaris, folk dances, and luxury glamping under desert stars.' },
      { icon: '👑', title: 'Heritage Granduer', desc: 'Stay in authentic converted royal palaces with traditional Rajasthani dining.' }
    ],
    highlights: [
      { title: 'Jaipur Amber Fort & Hawa Mahal', desc: 'Elephant-carved courtyards, mirror halls (Sheesh Mahal), and pink city markets.' },
      { title: 'Udaipur Lake Palace & Boat Ride', desc: 'The Venice of the East with white marble palaces reflecting in calm waters.' },
      { title: 'Jaisalmer Golden Fort & Sam Dunes', desc: 'Living sandstone fort city and starlit desert cultural camps.' },
      { title: 'Jodhpur Blue City & Mehrangarh', desc: 'Imposing fortress overlooking blue painted historic houses.' }
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    category: 'domestic',
    location: 'South India',
    tagline: 'God\'s Own Country of palm-lined backwaters, mist tea hills, and Ayurveda.',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1609828913639-6f6d56d47d43?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Kerala, known as God\'s Own Country, is a tropical paradise of serene backwaters, mist-covered tea plantations in Munnar, pristine Kovalam beaches, and authentic Ayurvedic wellness retreats. Cruise on a private luxury Kettuvallam houseboat for pure relaxation.',
    whyVisit: [
      { icon: '🛶', title: 'Alleppey Houseboat Cruise', desc: 'Glide through calm green backwaters lined with coconut palms and villages.' },
      { icon: '🍵', title: 'Munnar Tea Plantations', desc: 'Cool mountain air, cascaded tea gardens, and misty Anamudi peaks.' },
      { icon: '💆‍♂️', title: 'Ayurvedic Wellness', desc: 'Rejuvenating herbal oil massages and holistic wellness treatments.' },
      { icon: '🐅', title: 'Periyar Wildlife Sanctuary', desc: 'Boat safaris on Lake Periyar spotting wild elephants and exotic birds.' }
    ],
    highlights: [
      { title: 'Overnight Alleppey Houseboat Stay', desc: 'Private luxury Kettuvallam with personal chef preparing fresh Kerala meals.' },
      { title: 'Munnar Tea Factory & Eravikulam National Park', desc: 'See rare Nilgiri Tahr mountain goats amidst rolling green hills.' },
      { title: 'Kochi Chinese Fishing Nets & Fort Kochi', desc: 'Colonial heritage walk, Kathakali dance, and sea view promenades.' },
      { title: 'Kovalam & Varkala Cliff Beaches', desc: 'Dramatic red cliff beaches overlooking the Arabian sea.' }
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    category: 'domestic',
    location: 'Trans-Himalayas',
    tagline: 'Land of High Passes, azure Pangong Lake, and stark mountain grandeur.',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Ladakh is an awe-inspiring high-altitude cold desert surrounded by snow-capped Himalayan and Karakoram peaks. Home to the magical color-changing Pangong Lake, Nubra Valley\'s double-humped camels, and ancient cliffside monasteries like Thiksey and Hemis.',
    whyVisit: [
      { icon: '💙', title: 'Pangong Tso Lake', desc: 'Watch the high-altitude lake shift colors from turquoise to deep indigo blue.' },
      { icon: '🐪', title: 'Nubra Valley Sand Dunes', desc: 'Ride Bactrian double-humped camels amidst cold desert dunes in Hunder.' },
      { icon: '🏍', title: 'Khardung La Pass', desc: 'Travel across one of the highest motorable roads in the world at 18,380 ft.' },
      { icon: '🛕', title: 'Thiksey & Hemis Monasteries', desc: 'Majestic Tibetan Buddhist monasteries carved into rugged hill slopes.' }
    ],
    highlights: [
      { title: 'Pangong Lake Luxury Camping', desc: 'Overnight glamping right on the shores of Pangong Lake under clear starry skies.' },
      { title: 'Diskit Monastery & Giant Buddha', desc: 'Visit the 32-meter tall Maitreya Buddha statue facing Nubra Valley.' },
      { title: 'Magnetic Hill & Sangam Confluence', desc: 'Witness the gravity-defying hill and confluence of Indus and Zanskar rivers.' },
      { title: 'Leh Palace & Shanti Stupa', desc: 'White-domed stupa offering panoramic sunset views over Leh town.' }
    ]
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    category: 'domestic',
    location: 'West Bengal',
    tagline: 'The Queen of the Hills, famous for tea gardens, toy train, and Tiger Hill sunrise.',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Darjeeling, known as the Queen of the Hills, is a charming hill station nestled among rolling emerald tea gardens. Wake up early for the golden sunrise over Mt. Kanchenjunga from Tiger Hill, ride the heritage Himalayan Toy Train, and sip world-famous Darjeeling tea.',
    whyVisit: [
      { icon: '🌅', title: 'Tiger Hill Sunrise', desc: 'Witness the first rays of sunlight illuminate the snow peaks of Kanchenjunga.' },
      { icon: '🚂', title: 'UNESCO Heritage Toy Train', desc: 'Ride the iconic steam locomotive through Batasia Loop and misty mountain curves.' },
      { icon: '🍵', title: 'World-Famous Tea Gardens', desc: 'Tour Happy Valley tea estate and taste authentic champagne of teas.' },
      { icon: '🏔', title: 'Colonial Hill Charm', desc: 'Stroll along Mall Road (Chowrasta) filled with bakeries and mountain views.' }
    ],
    highlights: [
      { title: 'Tiger Hill Golden Sunrise Panorama', desc: 'Breathtaking 360-degree views of Himalayan snow peaks.' },
      { title: 'Batasia Loop & War Memorial', desc: 'Spiral railway loop offering manicured gardens and Kanchenjunga backdrop.' },
      { title: 'Himalayan Mountaineering Institute & Zoo', desc: 'See rare Snow Leopards and Red Pandas in natural alpine enclosures.' },
      { title: 'Peace Pagoda & Japanese Temple', desc: 'Tranquil Buddhist pagoda nestled amidst towering pine trees.' }
    ]
  },
  {
    id: 'srinagar',
    name: 'Srinagar',
    category: 'domestic',
    location: 'Jammu & Kashmir',
    tagline: 'Paradise on Earth with Dal Lake houseboats, Mughal gardens, and Shikaras.',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Srinagar, long celebrated as Paradise on Earth, is centered around the serene waters of Dal Lake. Stay on carved cedar wooden houseboats, glide past floating flower markets on traditional Shikara boats, and wander through historic Mughal gardens terraced with fountains.',
    whyVisit: [
      { icon: '🛶', title: 'Dal Lake Houseboats & Shikara', desc: 'Stay on luxurious carved wooden houseboats with personal butler service.' },
      { icon: '🌸', title: 'Mughal Gardens', desc: 'Explore Shalimar Bagh, Nishat Bagh, and Chashme Shahi terraced fountains.' },
      { icon: '🌷', title: 'Indira Gandhi Tulip Garden', desc: 'Asia\'s largest tulip garden blooming under Zabarwan mountain range.' },
      { icon: '🏔', title: 'Pahalgam & Gulmarg Excursions', desc: 'Saffron fields, pine valleys, and Gondola rides over snow slopes.' }
    ],
    highlights: [
      { title: 'Morning Floating Vegetable Market Shikara Ride', desc: 'Experience the unique sunrise market trading flowers and fresh produce on Dal Lake.' },
      { title: 'Gulmarg Gondola Cable Car Ride', desc: 'Asia\'s highest cable car taking you to Phase 2 snow peaks at 13,780 ft.' },
      { title: 'Pahalgam Betaab & Aru Valleys', desc: 'Pristine Lidder river meadows surrounded by dense fir forests.' },
      { title: 'Historic Old City & Jamia Masjid', desc: 'Wood-carved Kashmiri architecture and traditional saffron shopping.' }
    ]
  },
  {
    id: 'manali',
    name: 'Manali',
    category: 'domestic',
    location: 'Himachal Pradesh',
    tagline: 'Alpine valleys, Solang adventure, snow passes, and cedar forests.',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Manali is Himachal Pradesh\'s premier mountain destination, set along the Beas River valley. Surrounded by snow-covered peaks, dense deodar forests, and alpine meadows, Manali offers a perfect retreat for honeymooners, nature lovers, and adventure enthusiasts.',
    whyVisit: [
      { icon: '❄️', title: 'Solang Valley & Atal Tunnel', desc: 'Snow sports, paragliding, ropeway rides, and access to Lahaul valley.' },
      { icon: '🌲', title: 'Old Manali Deodar Forests', desc: 'Rustic wooden cafes, riverwalks, and laid-back mountain vibes.' },
      { icon: '♨️', title: 'Vashisht Hot Springs', desc: 'Natural sulfur hot springs surrounded by ancient wood-carved temples.' },
      { icon: '🏔', title: 'Rohtang Pass Snow Experience', desc: 'High alpine pass offering year-round snow landscapes at 13,050 ft.' }
    ],
    highlights: [
      { title: 'Solang Valley Adventure & Paragliding', desc: 'Soar over pine forests and snow valleys on tandem paragliders.' },
      { title: 'Hadimba Wooden Temple', desc: 'Unique 16th-century pagoda-style wooden temple tucked inside cedar forest.' },
      { title: 'Atal Tunnel Drive to Sissu', desc: 'Drive through the 9km engineering marvel into the snow-clad Lahaul valley.' },
      { title: 'Beas River Rafting & Riverside Dining', desc: 'Exciting river rafting in Kullu valley followed by fresh trout dining.' }
    ]
  },
  {
    id: 'mountabu',
    name: 'Mount Abu',
    category: 'domestic',
    location: 'Rajasthan',
    tagline: 'Rajasthan\'s only hill station, famous for marble Dilwara temples and Nakki Lake.',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80&fm=webp'
    ],
    description: 'Mount Abu is an oasis in the royal desert state of Rajasthan, nestled in the green Aravalli mountain range. Famous for the intricate white marble carvings of the Dilwara Jain Temples, romantic paddle boating on Nakki Lake, and breathtaking sunsets from Sunset Point.',
    whyVisit: [
      { icon: '🏛', title: 'Dilwara Jain Temples', desc: 'World-renowned 11th-century white marble temples with unbelievable intricate detail.' },
      { icon: '⛵', title: 'Nakki Lake Boating', desc: 'Picturesque artificial mountain lake surrounded by rocks, hills, and gardens.' },
      { icon: '🌄', title: 'Sunset Point & Toad Rock', desc: 'Panoramic evening views overlooking Aravali valleys and unique rock formations.' },
      { icon: '🏔', title: 'Guru Shikhar Peak', desc: 'The highest peak of the Aravali range offering panoramic mountain views.' }
    ],
    highlights: [
      { title: 'Dilwara Marble Carving Tour', desc: 'Guided marveling at delicate marble ceiling pendants carved like lace.' },
      { title: 'Nakki Lake Pedal Boating & Mall Walk', desc: 'Stroll around the lake, ride horses, and savor Rajasthani sweets.' },
      { title: 'Achalgarh Fort & Mandakini Lake', desc: 'Medieval fort ruins built by Rana Kumbha with ancient Shiva temple.' },
      { title: 'Trevor\'s Crocodile Park Sanctuary', desc: 'Secluded wildlife sanctuary nestled in lush green hills.' }
    ]
  }
];
