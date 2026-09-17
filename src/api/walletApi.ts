import { ApiResponse, apiClient } from './client';

export interface WalletTransaction { id: string; type: string; amount: number; direction: 'CREDIT' | 'DEBIT'; status: string; date: string; description: string; referenceId?: string; }
export interface WalletOverview { availableBalance: number; totalEarnings: number; pendingClearance: number; totalPaidOut: number; transactions: WalletTransaction[]; }

export const walletApi = {
  getSummary: async (): Promise<ApiResponse<WalletOverview>> => apiClient.get('/api/wallet/summary').then(res => res.data)
};
