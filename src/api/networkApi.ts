import { ApiResponse, apiClient } from './client';

export interface UnilevelNode { id: string; memberCode: string; name: string; status: string; joinedDate: string; level: number; totalVolume: number; isQualified: boolean; children: UnilevelNode[]; }
export interface NetworkOverview { totalMembers: number; activeMembers: number; totalVolume: number; qualifications: { currentRank: string; nextRank: string; volumeToNextRank: number; }; }

export const networkApi = {
  getOverview: async (): Promise<ApiResponse<any>> => apiClient.get('/api/network/overview').then(res => res.data),
  getSummary: async (): Promise<ApiResponse<NetworkOverview>> => apiClient.get('/api/network/summary').then(res => res.data),
  getUnilevelTree: async (): Promise<ApiResponse<UnilevelNode>> => apiClient.get('/api/network/unilevel').then(res => res.data)
};
