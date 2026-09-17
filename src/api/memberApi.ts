import { ApiResponse, apiClient } from './client';

export type MemberStatus = 'ACTIVE' | 'REGISTERED' | 'EXPIRED' | 'SUSPENDED' | 'YELLOW' | 'GREEN_ACTIVE';
export interface QualifyingBookingInfo { bookingId: string; destination: string; travelDate: string; status: 'Confirmed' | 'Traveling' | 'Completed' | 'Pending'; activeUntil: string; }
export interface MemberDashboardData { member: { id: string; memberId: string; memberCode: string; name: string; email: string; phone: string; joinedDate: string; status: MemberStatus; travelPoints: number; walletBalance: number; sponsorId?: string; sponsorCode?: string; leftId?: string; rightId?: string; binarySide?: string; defaultPlacement?: 'AUTO' | 'LEFT' | 'RIGHT'; }; bookings: QualifyingBookingInfo[]; overview: { personalVolume: number; teamVolume: number; activeDirectReferrals: number; upcomingTrips: number; pendingRewards: number; }; }

export const memberApi = {
  getDashboard: async (): Promise<ApiResponse<MemberDashboardData>> => apiClient.get('/api/member/dashboard').then(res => res.data),
  updateProfile: async (data: Partial<any>): Promise<ApiResponse<any>> => apiClient.put('/api/member/profile', data).then(res => res.data),
  getDirectReferrals: async (): Promise<ApiResponse<any[]>> => apiClient.get('/api/member/referrals').then(res => res.data),
  verifyUtrPayment: async (data: any): Promise<ApiResponse<any>> => apiClient.post('/api/member/verify-utr', data).then(res => res.data)
};
