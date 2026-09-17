import { ApiResponse, apiClient } from './client';

export interface RewardTransaction { id: string; type: string; amount: number; sourceMemberId: string; sourceMemberName: string; bookingId?: string; level?: number; status: string; date: string; description: string; }
export interface RewardsOverview { totalEarned: number; pendingClearance: number; availableToWithdraw: number; breakDown: { directBonus: number; unilevelBonus: number; binaryBonus: number; matchingBonus: number; }; recentTransactions: RewardTransaction[]; }

export const rewardsApi = {
  getSummary: async (): Promise<ApiResponse<RewardsOverview>> => apiClient.get('/api/rewards/summary').then(res => res.data),
  getHistory: async (): Promise<ApiResponse<RewardTransaction[]>> => apiClient.get('/api/rewards/history').then(res => res.data)
};
