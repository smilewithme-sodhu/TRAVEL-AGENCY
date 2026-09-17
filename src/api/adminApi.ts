import { apiClient, ApiResponse } from './client';

export interface PendingPayout {
  id: string;
  amount: string;
  createdAt: string;
  member: {
    user: {
      name: string;
      email: string;
      phone: string;
    };
    bankAccounts: Array<{
      accountHolderName: string;
      bankName: string;
      accountNumber: string;
      ifscCode: string;
      upiId: string;
    }>;
  };
}

export const adminApi = {
  getPendingPayouts: async (): Promise<ApiResponse<PendingPayout[]>> => {
    return apiClient.get('/api/admin/payouts/pending').then(res => res.data);
  },
  approvePayout: async ({ id, adminNotes }: { id: string; adminNotes: string }): Promise<ApiResponse<any>> => {
    return apiClient.put(/api/admin/payouts//approve, { adminNotes }).then(res => res.data);
  }
};

export const packageApi = {
  getPackages: async (): Promise<ApiResponse<any[]>> => {
    return apiClient.get('/api/admin/packages').then(res => res.data);
  },
  createPackage: async (payload: any): Promise<ApiResponse<any>> => {
    return apiClient.post('/api/admin/packages', payload).then(res => res.data);
  },
  updatePackage: async ({ id, ...payload }: any): Promise<ApiResponse<any>> => {
    return apiClient.put(`/api/admin/packages/${id}`, payload).then(res => res.data);
  },
  deletePackage: async (id: string): Promise<ApiResponse<any>> => {
    return apiClient.delete(`/api/admin/packages/${id}`).then(res => res.data);
  }
};
