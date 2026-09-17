import { ApiResponse, apiClient } from './client';

export interface WithdrawalRequest { id: string; amount: number; status: string; requestedAt: string; processedAt?: string; method: string; details: string; notes?: string; transactionRef?: string; }
export interface WithdrawalOverview { availableBalance: number; pendingWithdrawals: number; totalWithdrawn: number; minimumWithdrawal: number; processingFeePercent: number; history: WithdrawalRequest[]; }

export const withdrawalsApi = {
  getSummary: async (): Promise<ApiResponse<WithdrawalOverview>> => apiClient.get('/api/withdrawals/summary').then(res => res.data),
  requestWithdrawal: async (amount: number, method: string, details: string): Promise<ApiResponse<any>> => apiClient.post('/api/withdrawals/request', { amount, method, details }).then(res => res.data)
};
