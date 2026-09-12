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
    const token = localStorage.getItem('token');
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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
