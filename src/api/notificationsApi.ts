import { ApiResponse } from './client';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  date: string;
}

export const notificationsApi = {
  getAll: async (): Promise<ApiResponse<Notification[]>> => {
    return {
      success: true,
      data: [],
      timestamp: new Date().toISOString()
    };
  },
  markAsRead: async (id: string): Promise<ApiResponse<null>> => {
    return { success: true, data: null, timestamp: new Date().toISOString() };
  }
};
