// Simplified Domestic (India) & International Travel Agency Dataset with High-Conversion Badges for Indian Travelers

export const AGENCY_CONTACT = {
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  email: 'inquire@wanderlusttravels.com',
  address: '102 Horizon Plaza, Connaught Place, New Delhi, India',
  googleRating: '4.9',
  googleReviewCount: '1,250+',
};

export const CATEGORIES = [
  { id: 'all', label: 'All Packages' },
  { id: 'domestic', label: 'Domestic (India)' },
  { id: 'international', label: 'International Tours' },
  { id: 'honeymoon', label: 'Honeymoon Specials' },
  { id: 'family', label: 'Family Friendly' },
];

export const DESTINATIONS = [
  // ================= DOMESTIC (INSIDE INDIA) =================
  {
    id: 'kashmir-paradise-valley',
    title: 'Kashmir Valley & Gulmarg Snow Escape',
    category: 'domestic',
    theme: 'family',
    location: 'Srinagar / Gulmarg / Pahalgam, Jammu & Kashmir',
    durationDays: 6,
    durationNights: 5,
    rating: 4.95,
    badge: 'Popular Domestic',
    vegFriendly: true,
    tagline: 'Experience Heaven on Earth with luxury houseboats, Shikara rides on Dal Lake, and Gulmarg gondola rides.',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    description: 'Immerse yourself in the serene beauty of Kashmir. Stay in traditional wooden houseboats on Dal Lake, ride the world highest gondola in Gulmarg, and walk through pine forests in Pahalgam.',
    inclusions: [
      'Deluxe Houseboat Stay in Srinagar',
      'Daily Breakfast & Dinner Included (Pure Veg/Jain Available)',
      'Shikara Ride on Dal Lake (1 Hour)',
      'Gulmarg Gondola Cable Car Pass',
      'Private AC Cab Transfers throughout'
    ],
    itineraryNodes: [
      { day: 1, title: 'Arrival in Srinagar & Dal Lake Shikara Ride', location: 'Srinagar', time: 'Day 1', description: 'Pick up from Srinagar airport, check-in to deluxe houseboat, evening Shikara ride.' },
      { day: 2, title: 'Srinagar to Gulmarg Excursion', location: 'Gulmarg', time: 'Day 2', description: 'Day trip to Gulmarg, experience Gondola Phase 1 & 2, snow activity time.' },
      { day: 3, title: 'Srinagar to Pahalgam Valley of Shepherds', location: 'Pahalgam', time: 'Day 3', description: 'Drive along saffron fields, visit Betaab Valley & Aru Valley.' },
      { day: 4, title: 'Pahalgam Sightseeing & Horse Riding', location: 'Pahalgam', time: 'Day 4', description: 'Explore Baisaran valley (Mini Switzerland) and Lidder river banks.' },
      { day: 5, title: 'Srinagar Mughal Gardens Tour', location: 'Srinagar', time: 'Day 5', description: 'Visit Shalimar Bagh, Nishat Bagh, and local handicraft markets.' },
      { day: 6, title: 'Departure from Srinagar Airport', location: 'Srinagar', time: 'Day 6', description: 'Drop to Srinagar airport with unforgettable memories.' }
    ]
  },
  {
    id: 'kerala-backwaters-houseboat',
    title: 'Kerala Backwaters & Munnar Tea Gardens',
    category: 'domestic',
    theme: 'honeymoon',
    location: 'Munnar / Thekkady / Alleppey, Kerala',
    durationDays: 5,
    durationNights: 4,
    rating: 4.92,
    badge: 'Honeymoon Favorite',
    vegFriendly: true,
    tagline: 'Misty tea plantations, spice gardens, and private houseboat cruises through Alleppey backwaters.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80',
    description: 'Relax in God’s Own Country. Explore sprawling green tea estates in Munnar, elephant encounters in Thekkady, and overnight stay in a luxury private houseboat cruising Alleppey backwaters.',
    inclusions: [
      'Private Luxury Houseboat with all meals',
      'Munnar Tea Factory & Museum Tour',
      'Spice Plantation Tour in Thekkady',
      'Complimentary Flower Decoration & Cake for couples',
      'Private Sedan/SUV transfers'
    ],
    itineraryNodes: [
      { day: 1, title: 'Cochin Arrival & Drive to Munnar', location: 'Munnar', time: 'Day 1', description: 'Pickup from Cochin airport/railway station, scenic drive past Cheeyappara waterfalls.' },
      { day: 2, title: 'Munnar Full Day Sightseeing', location: 'Munnar', time: 'Day 2', description: 'Visit Mattupetty Dam, Echo Point, Kundala Lake, and Rajamalai National Park.' },
      { day: 3, title: 'Munnar to Thekkady Wildlife Sanctuary', location: 'Thekkady', time: 'Day 3', description: 'Drive to Thekkady, spice plantation walk, evening Kathakali cultural show.' },
      { day: 4, title: 'Alleppey Backwater Houseboat Cruise', location: 'Alleppey', time: 'Day 4', description: 'Check-in to private houseboat, cruise through coconut palm canals, candle light dinner.' },
      { day: 5, title: 'Alleppey to Cochin Departure', location: 'Cochin', time: 'Day 5', description: 'Visit Fort Kochi Chinese Fishing Nets, drop at Cochin airport.' }
    ]
  },
  {
    id: 'ladakh-high-mountain-passes',
    title: 'Ladakh Leh & Pangong Lake Expedition',
    category: 'domestic',
    theme: 'family',
    location: 'Leh / Nubra Valley / Pangong Tso, Ladakh',
    durationDays: 7,
    durationNights: 6,
    rating: 4.97,
    badge: 'Adventure Special',
    vegFriendly: true,
    tagline: 'Cross Khardung La pass, ride double-humped camels in Nubra, and witness changing colors of Pangong Lake.',
    image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80',
    description: 'Discover the Land of High Passes. Marvel at the blue waters of Pangong Tso, visit ancient monasteries in Leh, and camp under starry skies in Nubra sand dunes.',
    inclusions: [
      'Inner Line Permits & Environmental Fees',
      'Oxygen cylinder in vehicle for high altitude safety',
      'Luxury tented camp stay at Pangong & Nubra',
      'Double Humped Camel Ride ticket in Hunder',
      'Private 4x4 Scorpio / Xylo transfers'
    ],
    itineraryNodes: [
      { day: 1, title: 'Arrival in Leh & Acclimatization', location: 'Leh', time: 'Day 1', description: 'Arrival at Leh airport, complete rest for high altitude acclimatization.' },
      { day: 2, title: 'Leh Local Sightseeing & Magnetic Hill', location: 'Leh', time: 'Day 2', description: 'Visit Hall of Fame, Magnetic Hill, Gurudwara Pathar Sahib, and Sangam river confluence.' },
      { day: 3, title: 'Leh to Nubra Valley via Khardung La Pass', location: 'Nubra Valley', time: 'Day 3', description: 'Cross world’s highest motorable pass Khardung La (17,582 ft), visit Diskit Monastery.' },
      { day: 4, title: 'Nubra to Pangong Tso Lake via Shayok', location: 'Pangong Lake', time: 'Day 4', description: 'Drive to iconic Pangong Tso, check-in to lakefront luxury camps, sunset views.' },
      { day: 5, title: 'Pangong Lake to Leh via Chang La', location: 'Leh', time: 'Day 5', description: 'Morning photo session at Pangong Lake, return to Leh over Chang La pass.' },
      { day: 6, title: 'Monasteries & Shanti Stupa Tour', location: 'Leh', time: 'Day 6', description: 'Visit Thiksey Monastery, Hemis Monastery, and sunset at Shanti Stupa.' },
      { day: 7, title: 'Departure from Leh Airport', location: 'Leh', time: 'Day 7', description: 'Transfer to airport for return flight.' }
    ]
  },
  {
    id: 'rajasthan-royal-heritage',
    title: 'Royal Rajasthan Heritage & Forts Tour',
    category: 'domestic',
    theme: 'family',
    location: 'Jaipur / Jodhpur / Udaipur, Rajasthan',
    durationDays: 6,
    durationNights: 5,
    rating: 4.90,
    badge: 'Cultural Heritage',
    vegFriendly: true,
    tagline: 'Palaces of Jaipur, blue streets of Jodhpur, and romantic lake boat rides in Udaipur.',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80',
    description: 'Step into royal Indian grandeur. Explore Amber Fort, City Palace Jaipur, Mehrangarh Fort in Jodhpur, and boat cruises on Lake Pichola in Udaipur.',
    inclusions: [
      'Heritage Hotel Stays with Breakfast',
      'Boat Ride on Lake Pichola in Udaipur',
      'Elephant / Jeep Ride up Amber Fort',
      'Private AC Sedan/SUV with English speaking driver',
      'All toll taxes, parking, and driver allowances'
    ],
    itineraryNodes: [
      { day: 1, title: 'Arrival in Jaipur Pink City', location: 'Jaipur', time: 'Day 1', description: 'Welcome in Jaipur, check-in to heritage hotel, visit Hawa Mahal & local bazaars.' },
      { day: 2, title: 'Jaipur Forts & Palaces Tour', location: 'Jaipur', time: 'Day 2', description: 'Excursion to Amber Fort, Jal Mahal, City Palace, and Jantar Mantar observatory.' },
      { day: 3, title: 'Jaipur to Jodhpur Blue City', location: 'Jodhpur', time: 'Day 3', description: 'Drive to Jodhpur, visit Mehrangarh Fort and Jaswant Thada monument.' },
      { day: 4, title: 'Jodhpur to Udaipur via Ranakpur', location: 'Udaipur', time: 'Day 4', description: 'Drive to Udaipur, stop at famous marble Jain Temples of Ranakpur.' },
      { day: 5, title: 'Udaipur Lake City Tour & Sunset Boat Ride', location: 'Udaipur', time: 'Day 5', description: 'Visit City Palace Udaipur, Saheliyon Ki Bari, evening boat ride on Lake Pichola.' },
      { day: 6, title: 'Departure from Udaipur Airport', location: 'Udaipur', time: 'Day 6', description: 'Transfer to Udaipur airport for return journey.' }
    ]
  },

  // ================= INTERNATIONAL TOURS =================
  {
    id: 'maldives-luxury-water-villas',
    title: 'Maldives Luxury Water Villa Escape',
    category: 'international',
    theme: 'honeymoon',
    location: 'North Male Atoll, Maldives',
    durationDays: 5,
    durationNights: 4,
    rating: 4.98,
    badge: 'Honeymoon Favorite',
    vegFriendly: true,
    tagline: 'Overwater bungalow with private pool, turquoise lagoon snorkeling, and Indian/Veg meal options.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    description: 'The ultimate tropical paradise. Stay in an overwater villa suspended over turquoise ocean waters, enjoy floating breakfasts, and swim alongside sea turtles and stingrays.',
    inclusions: [
      'Overwater Villa with Private Ocean Deck',
      'All-Inclusive Meals (Indian Veg / Jain Chef Available)',
      'Roundtrip Speedboat / Seaplane Airport Transfers',
      'Sunset Dolphin Cruise Excursion',
      'Snorkeling Equipment & Guided Lagoon Tour'
    ],
    itineraryNodes: [
      { day: 1, title: 'Arrival at Male Airport & Speedboat Transfer', location: 'Maldives Resort', time: 'Day 1', description: 'Airport escort to resort speedboat, island welcome with refreshing drinks.' },
      { day: 2, title: 'Overwater Villa Relaxation & Snorkeling', location: 'Maldives Lagoon', time: 'Day 2', description: 'Explore house reef coral marine life, relax on private villa sundeck.' },
      { day: 3, title: 'Sunset Dolphin Cruise & Beach BBQ Dinner', location: 'Maldives Ocean', time: 'Day 3', description: 'Evening boat cruise to spot wild dolphins, seafood beach dinner.' },
      { day: 4, title: 'Water Sports & Luxury Spa Treatment', location: 'Maldives Spa', time: 'Day 4', description: 'Jet ski / kayaking session, soothing couples massages.' },
      { day: 5, title: 'Departure Seaplane / Speedboat Transfer', location: 'Male Airport', time: 'Day 5', description: 'Check out and transfer back to Male international airport.' }
    ]
  },
  {
    id: 'bali-tropical-eco-resort',
    title: 'Bali Eco Villas & Island Gateway',
    category: 'international',
    theme: 'honeymoon',
    location: 'Ubud / Seminyak / Nusa Penida, Indonesia',
    durationDays: 7,
    durationNights: 6,
    rating: 4.96,
    badge: 'Popular International',
    vegFriendly: true,
    tagline: 'Jungle infinity pools, rice terrace swings, cliffside temples, and Indian food options.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    description: 'Discover the Island of Gods. Relax in private bamboo pool villas in Ubud, experience Bali swings over emerald rice terraces, and visit Kelingking T-Rex beach in Nusa Penida.',
    inclusions: [
      'Private Pool Villa in Ubud & Beach Resort in Seminyak',
      'Full Day Nusa Penida Island Speedboat Tour',
      'Bali Swing & Tegallalang Rice Terrace Tickets',
      'Indian Restaurant Meals Included',
      'Private English Speaking Driver Guide'
    ],
    itineraryNodes: [
      { day: 1, title: 'Denpasar Airport Arrival & Ubud Villa', location: 'Ubud', time: 'Day 1', description: 'Traditional flower garland welcome, transfer to private pool villa in Ubud.' },
      { day: 2, title: 'Ubud Rice Terrace, Swing & Monkey Forest', location: 'Ubud', time: 'Day 2', description: 'Visit Sacred Monkey Forest, Tegallalang rice fields, jungle swing photo spot.' },
      { day: 3, title: 'Kintamani Volcano View & Tirta Empul', location: 'Kintamani', time: 'Day 3', description: 'Batur volcano panoramic lunch, holy water blessing ritual at Tirta Empul.' },
      { day: 4, title: 'Nusa Penida Island Day Tour', location: 'Nusa Penida', time: 'Day 4', description: 'Fast boat to Nusa Penida, visit Kelingking Beach, Broken Beach & Angel Billabong.' },
      { day: 5, title: 'Transfer to Seminyak Beach & Sunset', location: 'Seminyak', time: 'Day 5', description: 'Check-in to Seminyak beach resort, evening cocktail at KuDeTa beach club.' },
      { day: 6, title: 'Uluwatu Cliff Temple & Kecak Dance', location: 'Uluwatu', time: 'Day 6', description: 'Visit Uluwatu temple cliff 70m above ocean, watch Kecak fire dance performance.' },
      { day: 7, title: 'Souvenir Shopping & Flight Departure', location: 'Denpasar', time: 'Day 7', description: 'Visit Krishna souvenir market, drop to Denpasar airport.' }
    ]
  },
  {
    id: 'dubai-luxury-desert-safari',
    title: 'Dubai Luxury, Burj Khalifa & Desert Safari',
    category: 'international',
    theme: 'family',
    location: 'Dubai / Abu Dhabi, UAE',
    durationDays: 5,
    durationNights: 4,
    rating: 4.94,
    badge: 'Family Favorite',
    vegFriendly: true,
    tagline: 'Burj Khalifa 124th floor view, luxury desert dune bashing, marina dinner cruise, and Sheikh Zayed Mosque.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    description: 'Experience futuristic luxury in the City of Gold. Visit the top of Burj Khalifa, enjoy thrilling 4x4 desert dune bashing with belly dance show, and explore grand palaces in Abu Dhabi.',
    inclusions: [
      '4-Star / 5-Star Hotel Stay with Daily Breakfast',
      'Burj Khalifa 124th Floor Observation Deck Tickets',
      'Premium Desert Safari with Indian Veg/Non-Veg BBQ Dinner',
      'Marina Dhow Dinner Cruise with live music',
      'Full Day Abu Dhabi City Tour with Sheikh Zayed Mosque'
    ],
    itineraryNodes: [
      { day: 1, title: 'Dubai Airport Arrival & Dhow Cruise', location: 'Dubai Marina', time: 'Day 1', description: 'Airport pickup, check-in to hotel, evening Dubai Marina Dhow Cruise with dinner.' },
      { day: 2, title: 'Dubai City Tour & Burj Khalifa At The Top', location: 'Downtown Dubai', time: 'Day 2', description: 'Photo stop at Burj Al Arab, Dubai Frame, visit Dubai Mall & Burj Khalifa 124th floor.' },
      { day: 3, title: 'Morning Free for Shopping & Evening Desert Safari', location: 'Desert Camp', time: 'Day 3', description: 'Explore Gold Souk markets, 4x4 dune bashing, camel riding, henna painting & BBQ dinner.' },
      { day: 4, title: 'Full Day Abu Dhabi Grand Mosque & Ferrari World', location: 'Abu Dhabi', time: 'Day 4', description: 'Visit majestic Sheikh Zayed Mosque, Baps Hindu Mandir, photo stop at Ferrari World.' },
      { day: 5, title: 'Departure from Dubai Airport', location: 'Dubai Airport', time: 'Day 5', description: 'Check out from hotel, airport drop for return flight.' }
    ]
  },
  {
    id: 'swiss-alps-scenic-train',
    title: 'Swiss Alps & Glacier Express Grand Tour',
    category: 'international',
    theme: 'family',
    location: 'Zurich / Lucerne / Interlaken / Zermatt, Switzerland',
    durationDays: 7,
    durationNights: 6,
    rating: 4.99,
    badge: 'Bucket List',
    vegFriendly: true,
    tagline: 'Jungfraujoch Top of Europe, Matterhorn views, Mount Titlis revolving cable car, and panoramic trains.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    description: 'Journey through alpine fairy tales. Ride panoramic Swiss travel trains past snow-capped peaks, visit Jungfraujoch at 3,454m, and cruise crystal clear Lake Lucerne.',
    inclusions: [
      '7-Day Consecutive Swiss Travel Pass (1st Class)',
      'Jungfraujoch Top of Europe Excursion Ticket',
      'Mount Titlis Rotair Cable Car & Ice Flyer Pass',
      'Indian Restaurant Dinners Arranged',
      'Central Hotel Stays with Daily Buffet Breakfast'
    ],
    itineraryNodes: [
      { day: 1, title: 'Zurich Arrival & Lucerne Lakeside', location: 'Lucerne', time: 'Day 1', description: 'Arrival in Zurich, train to Lucerne, stroll past Chapel Bridge and Old Town.' },
      { day: 2, title: 'Mount Titlis Snow Mountain Excursion', location: 'Engelberg', time: 'Day 2', description: 'Rotair revolving cable car up Mt. Titlis, glacier cave walk, Cliff Walk bridge.' },
      { day: 3, title: 'Lucerne to Interlaken Scenic Train', location: 'Interlaken', time: 'Day 3', description: 'GoldenPass scenic train into Interlaken between Lake Thun & Lake Brienz.' },
      { day: 4, title: 'Jungfraujoch Top of Europe Day Excursion', location: 'Jungfraujoch', time: 'Day 4', description: 'Eiger Express cable car up to highest train station in Europe at 3,454 meters.' },
      { day: 5, title: 'Interlaken to Zermatt & Matterhorn View', location: 'Zermatt', time: 'Day 5', description: 'Train to car-free Zermatt village, view iconic Matterhorn peak.' },
      { day: 6, title: 'Zermatt Gornergrat Railway & Zurich Return', location: 'Zurich', time: 'Day 6', description: 'Ride Gornergrat cogwheel train, return evening to Zurich for shopping.' },
      { day: 7, title: 'Zurich Departure', location: 'Zurich Airport', time: 'Day 7', description: 'Airport train transfer for flight home.' }
    ]
  }
];
