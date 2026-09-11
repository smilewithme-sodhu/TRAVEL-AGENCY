import { ApiResponse } from './client';

export interface SupportTicket {
  id: string;
  subject: string;
  category: 'Billing' | 'Technical' | 'Travel' | 'General';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  date: string;
  lastUpdate: string;
}

export const supportApi = {
  getTickets: async (): Promise<ApiResponse<SupportTicket[]>> => {
    return {
      success: true,
      data: [],
      timestamp: new Date().toISOString()
    };
  },
  createTicket: async (data: any): Promise<ApiResponse<any>> => {
    return {
      success: true,
      data: { ticketNumber: 'TKT-' + Math.floor(Math.random() * 10000) },
      timestamp: new Date().toISOString()
    };
  }
};
