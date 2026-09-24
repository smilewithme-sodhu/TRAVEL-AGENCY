/**
 * Base API Client Infrastructure
 * Simulates server network latency and provides standardized response envelopes
 */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  timestamp: string;
}

export const simulateNetworkDelay = async <T>(data: T, delayMs = 250): Promise<ApiResponse<T>> => {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
};

export const createApiError = (message: string): ApiResponse<never> => {
  return {
    success: false,
    data: null as never,
    error: message,
    timestamp: new Date().toISOString(),
  };
};
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// --- Booking API Hooks ---
import { useQuery, useMutation } from '@tanstack/react-query';

export const usePackages = () => {
  return useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const { data } = await apiClient.get('/api/bookings/packages');
      return data.data;
    }
  });
};

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (payload: { packageId: string; numTravellers: number; paymentUtr: string }) => {
      const { data } = await apiClient.post('/api/bookings/checkout', payload);
      return data;
    }
  });
};

export const useWallet = () => {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const res = await apiClient.get('/api/wallet');
      return res.data.data;
    }
  });
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { amount: number }) => {
      const res = await apiClient.post('/api/wallet/withdraw', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
    }
  });
};

// --- Admin Hooks ---
import { useQueryClient } from '@tanstack/react-query';

export const useAdminMemberSearch = (q: string) => {
  return useQuery({
    queryKey: ['admin-member-search', q],
    queryFn: async () => {
      if (q.trim().length < 2) return [];
      const { data } = await apiClient.get('/api/admin/members/search', { params: { q } });
      return data.data as Array<{ id: string; referralCode: string; user: { name: string; email: string } }>;
    },
    enabled: q.trim().length >= 2,
    staleTime: 10_000,
  });
};

export const useAssignManualPoints = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      memberId: string;
      directRewardTP: number;
      binaryVolumeBV: number;
      teamBonusTP: number;
      notes: string;
    }) => {
      const { data } = await apiClient.post('/api/admin/members/assign-points', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      queryClient.invalidateQueries({ queryKey: ['network'] });
      queryClient.invalidateQueries({ queryKey: ['admin-members'] });
    },
  });
};

