import { apiClient } from './client';
import { ApiResponse, Booking, Package, User, WalletTransaction, PendingPayout } from '../types/api';

export const authApi = {
  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiClient.get('/api/auth/profile').then(res => res.data);
  }
};

export const adminApi = {
  getDashboardMetrics: async () => apiClient.get('/api/admin/dashboard/metrics').then(res => res.data),
  getMembers: async () => apiClient.get('/api/admin/members').then(res => res.data),
  activateMember: async (memberId: string) => apiClient.post('/api/admin/members/activate', { memberId }).then(res => res.data),
  activateMemberToOrange: async (memberId: string) => apiClient.post('/api/admin/members/activate-orange', { memberId }).then(res => res.data),
  setMemberStatus: async (memberId: string, status: string) => apiClient.post('/api/admin/members/set-status', { memberId, status }).then(res => res.data),
  distributeGlobalBonus: async (totalEarnings: number) => apiClient.post('/api/admin/bonuses/global', { totalEarnings }).then(res => res.data),
  getPendingPayouts: async (): Promise<ApiResponse<PendingPayout[]>> => {
    return apiClient.get('/api/admin/payouts/pending').then(res => res.data);
  },
  approvePayout: async ({ id, adminNotes }: { id: string; adminNotes: string }): Promise<ApiResponse<any>> => {
    return apiClient.put("/api/admin/payouts/" + id + "/approve", { adminNotes }).then(res => res.data);
  }
};

export const packageApi = {
  getPackages: async (): Promise<ApiResponse<any[]>> => {
    return apiClient.get('/api/admin/packages').then(res => res.data);
  },
  createPackage: async (payload: any): Promise<ApiResponse<any>> => {
    return apiClient.post('/api/admin/packages', payload).then(res => res.data);
  },
  updatePackage: async (id: string, payload: any): Promise<ApiResponse<any>> => {
    return apiClient.put("/api/admin/packages/" + id, payload).then(res => res.data);
  }
};
