import { ApiResponse } from './client';

export interface Trip {
  id: string;
  destination: string;
  heroImage: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  referenceNumber: string;
  travelDates: string;
  travellerCount: string;
  travellerNames: string[];
  arrangementsNote: string;
  consultantName: string;
}

export const tripsApi = {
  getMyTrips: async (filter: string): Promise<ApiResponse<Trip[]>> => {
    return {
      success: true,
      data: [],
      timestamp: new Date().toISOString()
    };
  }
};
