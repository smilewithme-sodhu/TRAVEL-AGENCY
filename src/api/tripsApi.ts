import { apiClient, ApiResponse } from './client';

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
    try {
      const { data } = await apiClient.get('/api/member/trips');
      
      let filteredData = data.data;
      if (filter === 'UPCOMING') {
        filteredData = filteredData.filter((t: Trip) => t.status === 'UPCOMING');
      } else if (filter === 'COMPLETED') {
        filteredData = filteredData.filter((t: Trip) => t.status === 'COMPLETED');
      }
      
      return {
        success: true,
        data: filteredData,
        timestamp: new Date().toISOString()
      };
    } catch (err) {
      console.error(err);
      return { success: false, data: [], timestamp: new Date().toISOString() };
    }
  }
};
