import { MemberProfile, MemberStatusType, TravelStage, CustomerInquiry, RewardMilestone } from '../types';

let MOCK_MEMBER: MemberProfile = {
  id: 'mem_1082',
  memberCode: 'TRV-8821',
  name: 'Rahul Sharma',
  email: 'rahul.travels@wanderlust.co',
  phone: '+91 98123 45678',
  joinedDate: '12 January 2026',
  status: 'GREEN_ACTIVE', // 'YELLOW' | 'GREEN_ACTIVE' | 'INACTIVE'
  sponsorName: 'Ananya Verma',
  sponsorCode: 'TRV-4102',
  placementSide: 'LEFT',
  travelPoints: 4850,
  walletBalance: 3750,
  pendingBalance: 1200,
  lifetimeEarnings: 42800,
  qualifyingTrip: {
    id: 'qtrip_901',
    packageId: 'pkg-goa',
    packageName: 'Goa Coastal Odyssey',
    destination: 'Goa, India',
    travelDate: '15 March 2027',
    bookingStatus: 'Confirmed',
    activationDate: '10 Feb 2026',
    completionDate: '20 March 2027',
    currentStage: 'Confirmed'
  }
};

const MOCK_CUSTOMERS: CustomerInquiry[] = [
  {
    id: 'inq_01',
    customerName: 'Priya Mehta',
    customerPhone: '+91 98221 00112',
    destination: 'Goa Coastal Odyssey',
    selectedSpots: ['Dudhsagar Waterfalls', 'Fort Aguada & Lighthouse', 'Fontainhas Latin Quarter'],
    inquiryDate: '10 Feb 2026',
    status: 'BOOKED',
    memberCommissionStatus: 'ELIGIBLE',
    approxBookingValue: 45000
  },
  {
    id: 'inq_02',
    customerName: 'Vikramaditya Rao',
    customerPhone: '+91 97334 99881',
    destination: 'Kashmir: Paradise on Earth',
    selectedSpots: ['Dal Lake Shikara', 'Gulmarg Gondola & Apharwat Peak', 'Pahalgam Betaab Valley'],
    inquiryDate: '06 Feb 2026',
    status: 'TRAVELING',
    memberCommissionStatus: 'CREDITED',
    approxBookingValue: 68000
  },
  {
    id: 'inq_03',
    customerName: 'Sneha Kapoor',
    customerPhone: '+91 91223 77441',
    destination: 'Dubai: Futuristic Marvels',
    selectedSpots: ['Burj Khalifa', 'Red Dune Desert Safari', 'Museum of the Future'],
    inquiryDate: '02 Feb 2026',
    status: 'QUOTE_SHARED',
    memberCommissionStatus: 'PENDING_TRAVEL',
    approxBookingValue: 110000
  },
  {
    id: 'inq_04',
    customerName: 'Arjun & Neha Patel',
    customerPhone: '+91 99881 22334',
    destination: 'Bali: Island of the Gods',
    selectedSpots: ['Tegalalang Rice Terraces', 'Nusa Penida Kelingking', 'Uluwatu Sunset Kecak'],
    inquiryDate: '28 Jan 2026',
    status: 'COMPLETED',
    memberCommissionStatus: 'CREDITED',
    approxBookingValue: 95000
  }
];

const MOCK_MILESTONES: RewardMilestone[] = [
  {
    id: 'rw_1',
    title: '5 Qualifying Traveler Referrals',
    description: 'Help 5 friends or families experience unforgettable curated holidays.',
    targetCount: 5,
    currentCount: 4,
    rewardType: 'TRAVEL_POINTS',
    rewardValue: '2,500 Bonus Travel Points',
    completed: false
  },
  {
    id: 'rw_2',
    title: 'Green Active Status Maintainer',
    description: 'Maintain personal active travel booking for 3 consecutive cycles.',
    targetCount: 3,
    currentCount: 3,
    rewardType: 'LUXURY_VOUCHER',
    rewardValue: 'TP 5,000 Luxury Boutique Stay Voucher',
    completed: true
  },
  {
    id: 'rw_3',
    title: 'Annual Leadership Retreat',
    description: 'Reach 20 verified customer bookings across domestic/international journeys.',
    targetCount: 20,
    currentCount: 12,
    rewardType: 'RETREAT_PASS',
    rewardValue: 'All-inclusive 3-Day Goa Leadership Conclave',
    completed: false
  }
];

export const memberService = {
  getProfile: async (): Promise<MemberProfile> => {
    return { ...MOCK_MEMBER };
  },

  // Demo helper to toggle between Yellow, Green Active, and Inactive
  updateStatusForDemo: (newStatus: MemberStatusType, stage: TravelStage = 'Confirmed') => {
    MOCK_MEMBER.status = newStatus;
    if (newStatus === 'GREEN_ACTIVE') {
      MOCK_MEMBER.qualifyingTrip = {
        id: 'qtrip_901',
        packageId: 'pkg-goa',
        packageName: 'Goa Coastal Odyssey',
        destination: 'Goa, India',
        travelDate: '15 March 2027',
        bookingStatus: 'Confirmed',
        activationDate: '10 Feb 2026',
        completionDate: '20 March 2027',
        currentStage: stage
      };
    } else if (newStatus === 'INACTIVE') {
      if (MOCK_MEMBER.qualifyingTrip) {
        MOCK_MEMBER.qualifyingTrip.currentStage = 'Completed';
      }
    }
    return { ...MOCK_MEMBER };
  },

  getReferredCustomers: async (): Promise<CustomerInquiry[]> => {
    return [...MOCK_CUSTOMERS];
  },

  getRewardMilestones: async (): Promise<RewardMilestone[]> => {
    return [...MOCK_MILESTONES];
  }
};
