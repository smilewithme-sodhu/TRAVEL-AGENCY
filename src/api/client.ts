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
