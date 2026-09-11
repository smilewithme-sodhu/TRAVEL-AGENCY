// Domain Types for Travel-Commerce & Member Business Platform

export type DestinationCategory = 'domestic' | 'international';

export type DestinationVibe = 'beach' | 'mountains' | 'heritage' | 'adventure' | 'luxury' | 'romantic' | 'wildlife';

export interface TouristSpot {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  tag: string; // e.g. "Must Visit", "Sunset Point", "Adventure Hub", "Historical"
  recommendedHours: string;
  entryInfo: string;
  highlights: string[];
}

export interface TravelPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: DestinationCategory;
  stateOrCountry: string;
  location: string;
  heroImage: string;
  galleryImages: string[];
  vibe: DestinationVibe[];
  rating: number;
  reviewCount: number;
  bestSeason: string;
  idealFor: string[];
  overview: string;
  whyVisit: string[];
  touristSpots: TouristSpot[];
  customizableOptions: string[];
  includedFeatures: string[];
  excludedFeatures: string[];
  travelTips: string[];
  featured?: boolean;
}

export type MemberStatusType = 'YELLOW' | 'GREEN_ACTIVE' | 'INACTIVE';

export type TravelStage = 'Booked' | 'Confirmed' | 'Traveling' | 'Completed';

export interface QualifyingTrip {
  id: string;
  packageId: string;
  packageName: string;
  destination: string;
  travelDate: string;
  bookingStatus: string;
  activationDate: string;
  completionDate: string;
  currentStage: TravelStage;
}

export interface MemberProfile {
  id: string;
  memberCode: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  status: MemberStatusType;
  sponsorName: string;
  sponsorCode: string;
  placementSide: 'LEFT' | 'RIGHT';
  qualifyingTrip?: QualifyingTrip;
  travelPoints: number;
  walletBalance: number;
  pendingBalance: number;
  lifetimeEarnings: number;
}

export interface BinaryNodeData {
  id: string;
  memberCode: string;
  name: string;
  status: MemberStatusType;
  level: number;
  leftVolume: number;
  rightVolume: number;
  leftCarry: number;
  rightCarry: number;
  matchedPairs: number;
  leftChild?: BinaryNodeData | null;
  rightChild?: BinaryNodeData | null;
}

export interface BinaryStats {
  totalLeftVolume: number;
  totalRightVolume: number;
  availableMatches: number;
  totalMatchesClaimed: number;
  currentCycleMatchPayout: number;
  lastMatchDate: string;
}

export interface TeamMember {
  id: string;
  memberCode: string;
  name: string;
  level: number;
  status: MemberStatusType;
  joinedDate: string;
  directSalesCount: number;
  personalTravelBooked: boolean;
  sponsorCode: string;
}

export interface EarningItem {
  id: string;
  type: 'DIRECT' | 'TEAM' | 'BINARY';
  amount: number;
  date: string;
  bookingRef: string;
  customerOrMemberName: string;
  status: 'PROCESSED' | 'PENDING';
  description: string;
}

export interface WalletTransaction {
  id: string;
  reference: string;
  type: 'CREDIT' | 'DEBIT';
  category: 'DIRECT_COMMISSION' | 'TEAM_BONUS' | 'BINARY_MATCH' | 'WITHDRAWAL' | 'REVERSAL';
  amount: number;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'REJECTED';
  note: string;
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  customerPhone: string;
  destination: string;
  selectedSpots: string[];
  inquiryDate: string;
  status: 'INQUIRY_SENT' | 'QUOTE_SHARED' | 'BOOKED' | 'TRAVELING' | 'COMPLETED';
  memberCommissionStatus: 'ELIGIBLE' | 'CREDITED' | 'PENDING_TRAVEL';
  approxBookingValue?: number;
}

export interface RewardMilestone {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardType: 'TRAVEL_POINTS' | 'LUXURY_VOUCHER' | 'RETREAT_PASS';
  rewardValue: string;
  completed: boolean;
}

export interface AdminKPIs {
  totalInquiries: number;
  totalConfirmedBookings: number;
  grossTravelSales: number;
  supplierCost: number;
  grossMargin: number;
  totalActiveMembers: number;
  totalYellowMembers: number;
  totalCommissionsPaid: number;
  compToGrossMarginRatio: number; // e.g. 0.28 (28% of gross margin allocated to referral compensation)
  safetyThreshold: number; // e.g. 0.40 (40% ceiling)
  pendingWithdrawals: number;
}

export interface PackageMarginInfo {
  id: string;
  packageName: string;
  destination: string;
  category: DestinationCategory;
  estimatedSellingPrice: number;
  supplierCost: number;
  taxesAndFees: number;
  minimumGrossProfit: number;
  maxAffiliateAllocation: number;
  inquiryCount: number;
}
