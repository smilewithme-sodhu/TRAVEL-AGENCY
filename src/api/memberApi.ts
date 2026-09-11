import { simulateNetworkDelay, ApiResponse } from './client';
import { auth, db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export type MemberStatus = 'ACTIVE' | 'REGISTERED' | 'EXPIRED' | 'SUSPENDED' | 'YELLOW' | 'GREEN_ACTIVE';

export interface QualifyingBookingInfo {
  bookingId: string;
  destination: string;
  travelDate: string;
  status: 'Confirmed' | 'Traveling' | 'Completed' | 'Pending';
  activeUntil: string;
}

export interface MemberDashboardData {
  member: {
    id: string;
    memberId: string;
    memberCode: string;
    name: string;
    email: string;
    phone: string;
    status: MemberStatus;
    rank: string;
    joinedDate: string;
    sponsorName: string;
    sponsorCode: string;
    kycStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
    bankAccountMasked: string;
    bankName: string;
    defaultPlacement?: 'AUTO' | 'LEFT' | 'RIGHT';
  };
  statusCard: {
    status: MemberStatus;
    isActive: boolean;
    headline: string;
    subtext: string;
    qualifyingTrip?: QualifyingBookingInfo;
  };
  earnings: {
    total: number;
    available: number;
    pending: number;
    direct: number;
    team: number;
    binary: number;
  };
  networkVolume: {
    leftVolume: number;
    rightVolume: number;
    matchedVolume: number;
    leftCarryForward: number;
    rightCarryForward: number;
  };
  referral: {
    code: string;
    shareUrl: string;
    totalReferrals: number;
    activeReferrals: number;
  };
  recentActivities: Array<{
    id: string;
    type: 'DIRECT_COMMISSION' | 'BINARY_REWARD' | 'WITHDRAWAL' | 'BOOKING_UPDATE' | 'POINT_ACCRUAL';
    title: string;
    description: string;
    amount?: number;
    direction?: 'CREDIT' | 'DEBIT';
    status: 'Approved' | 'Paid' | 'Processing' | 'Completed';
    timestamp: string;
  }>;
}

let CURRENT_MOCK_STATUS: MemberStatus = 'ACTIVE';

const generateDashboardData = (status: MemberStatus = CURRENT_MOCK_STATUS): MemberDashboardData => {
  const isActive = status === 'ACTIVE' || status === 'GREEN_ACTIVE';
  const isYellow = status === 'YELLOW' || status === 'REGISTERED';

  return {
    member: {
      id: 'usr-884920',
      memberId: 'WND-884920',
      memberCode: 'TRV8821',
      name: 'Alexander Wright',
      email: 'alexander.wright@luxurytravel.com',
      phone: '+91 98765 43210',
      status,
      rank: isActive ? 'Executive Director' : 'Registered Member',
      joinedDate: '2025-11-14',
      sponsorName: 'Eleanor Vance',
      sponsorCode: 'TRV1092',
      kycStatus: 'VERIFIED',
      bankAccountMasked: 'HDFC Bank •••• 4821',
      bankName: 'HDFC Bank Ltd.',
      defaultPlacement: 'AUTO',
    },
    statusCard: {
      status,
      isActive,
      headline: isActive
        ? 'Active Travel Member'
        : isYellow
        ? 'Awaiting Travel Cycle Activation'
        : 'Travel Cycle Expired',
      subtext: isActive
        ? 'Your qualifying travel cycle is active through October 2026.'
        : isYellow
        ? 'Book your first qualifying journey to activate your commission cycle.'
        : 'Your previous qualifying travel cycle has concluded. Speak with our travel concierge to reactivate.',
      qualifyingTrip: isActive
        ? {
            bookingId: 'BK-2026-GOA-9921',
            destination: 'Goa Coastal Villa Escape',
            travelDate: '24 Sep 2026',
            status: 'Confirmed',
            activeUntil: '24 Oct 2026',
          }
        : undefined,
    },
    earnings: {
      total: isActive ? 148500 : 0,
      available: isActive ? 48500 : 0,
      pending: isActive ? 12000 : 0,
      direct: isActive ? 65000 : 0,
      team: isActive ? 48500 : 0,
      binary: isActive ? 35000 : 0,
    },
    networkVolume: {
      leftVolume: 180000,
      rightVolume: 140000,
      matchedVolume: 140000,
      leftCarryForward: 40000,
      rightCarryForward: 0,
    },
    referral: {
      code: 'TRV8821',
      shareUrl: `${window.location.origin}/r/TRV8821`,
      totalReferrals: 34,
      activeReferrals: 28,
    },
    recentActivities: [
      {
        id: 'ACT-001',
        type: 'DIRECT_COMMISSION',
        title: 'Direct Referral Commission',
        description: 'Kashmir Valley luxury package booked by Priya Sharma',
        amount: 2500,
        direction: 'CREDIT',
        status: 'Approved',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: 'ACT-002',
        type: 'BINARY_REWARD',
        title: 'Binary Volume Match Reward',
        description: 'Matched eligible cycle volume for Left/Right legs',
        amount: 4000,
        direction: 'CREDIT',
        status: 'Paid',
        timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
      },
      {
        id: 'ACT-003',
        type: 'WITHDRAWAL',
        title: 'Bank Withdrawal Transfer',
        description: 'Dispatched to verified HDFC Account ending 4821',
        amount: 15000,
        direction: 'DEBIT',
        status: 'Processing',
        timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(),
      },
      {
        id: 'ACT-004',
        type: 'DIRECT_COMMISSION',
        title: 'Direct Referral Commission',
        description: 'Dubai Skyline & Desert Safari booked by Rohan Mehra',
        amount: 3500,
        direction: 'CREDIT',
        status: 'Approved',
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ],
  };
};

export const memberApi = {
  getDashboard: async (statusOverride?: MemberStatus): Promise<ApiResponse<MemberDashboardData>> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      
      const status = statusOverride || (userData?.status as MemberStatus) || 'REGISTERED';
      const isActive = status === 'ACTIVE' || status === 'GREEN_ACTIVE';
      const isYellow = status === 'YELLOW' || status === 'REGISTERED';

      const data: MemberDashboardData = {
        member: {
          id: user.uid,
          memberId: `WND-${user.uid.substring(0,6).toUpperCase()}`,
          memberCode: userData?.referralCode || `TRV${user.uid.substring(0,4).toUpperCase()}`,
          name: userData?.name || user.displayName || 'Member',
          email: userData?.email || user.email || '',
          phone: userData?.phone || 'Not provided',
          status,
          rank: isActive ? 'Active Traveler' : 'Registered Member',
          joinedDate: userData?.joinedDate || new Date().toISOString(),
          sponsorName: userData?.sponsorName || 'Direct Sign Up',
          sponsorCode: userData?.sponsorCode || 'NONE',
          kycStatus: 'PENDING',
          bankAccountMasked: 'Not Added',
          bankName: 'N/A',
          defaultPlacement: userData?.defaultPlacement || 'AUTO',
        },
        statusCard: {
          status,
          isActive,
          headline: isActive
            ? 'Active Travel Member'
            : isYellow
            ? 'Awaiting Travel Cycle Activation'
            : 'Travel Cycle Expired',
          subtext: isActive
            ? 'Your qualifying travel cycle is currently active.'
            : isYellow
            ? 'Book your first qualifying journey to activate your commission cycle.'
            : 'Your previous qualifying travel cycle has concluded. Speak with our travel concierge to reactivate.',
          qualifyingTrip: undefined,
        },
        earnings: {
          total: userData?.walletBalance || 0,
          available: userData?.walletBalance || 0,
          pending: 0,
          direct: 0,
          team: 0,
          binary: 0,
        },
        networkVolume: {
          leftVolume: 0,
          rightVolume: 0,
          matchedVolume: 0,
          leftCarryForward: 0,
          rightCarryForward: 0,
        },
        referral: {
          code: userData?.referralCode || `TRV${user.uid.substring(0,4).toUpperCase()}`,
          shareUrl: `${window.location.origin}/r/${userData?.referralCode || user.uid.substring(0,6)}`,
          totalReferrals: 0,
          activeReferrals: 0,
        },
        recentActivities: [],
      };

      return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      return {
        success: false,
        data: null as any,
        error: err.message,
        timestamp: new Date().toISOString(),
      };
    }
  },

  getProfile: async (): Promise<ApiResponse<MemberDashboardData['member']>> => {
    const res = await memberApi.getDashboard();
    if (!res.success) throw new Error(res.error);
    return { success: true, data: res.data.member, timestamp: res.timestamp };
  },

  updateProfile: async (updates: Partial<MemberDashboardData['member']>): Promise<ApiResponse<MemberDashboardData['member']>> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates);

      const res = await memberApi.getDashboard();
      if (!res.success) throw new Error(res.error);
      return { success: true, data: res.data.member, timestamp: res.timestamp };
    } catch (err: any) {
      return { success: false, data: null as any, error: err.message, timestamp: new Date().toISOString() };
    }
  },

  setStatusForDemo: (status: MemberStatus) => {
    // No-op for now
  },
};
