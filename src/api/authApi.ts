import { simulateNetworkDelay, ApiResponse } from './client';

export type AuthState = 'Unauthenticated' | 'Authenticating' | 'Authenticated' | 'SessionExpired' | 'LoggingOut';

export interface UserSession {
  id: string;
  memberId: string;
  memberCode: string;
  name: string;
  email: string;
  phone: string;
  role: 'MEMBER' | 'ADMIN' | 'SUPPORT';
  token: string;
  expiresAt: string;
}

const MOCK_SESSION: UserSession = {
  id: 'usr-884920',
  memberId: 'WND-884920',
  memberCode: 'TRV8821',
  name: 'Alexander Wright',
  email: 'alexander.wright@luxurytravel.com',
  phone: '+91 98765 43210',
  role: 'MEMBER',
  token: 'mock-jwt-auth-token-wanderlust-99201',
  expiresAt: new Date(Date.now() + 86400000 * 7).toISOString(),
};

export const authApi = {
  login: async (credentials: { identifier: string; password?: string }): Promise<ApiResponse<UserSession>> => {
    return simulateNetworkDelay({
      ...MOCK_SESSION,
      email: credentials.identifier.includes('@') ? credentials.identifier : MOCK_SESSION.email,
      phone: !credentials.identifier.includes('@') ? credentials.identifier : MOCK_SESSION.phone,
    }, 300);
  },

  register: async (payload: {
    fullName: string;
    mobile: string;
    email: string;
    referralCode?: string;
  }): Promise<ApiResponse<UserSession>> => {
    return simulateNetworkDelay({
      ...MOCK_SESSION,
      name: payload.fullName,
      email: payload.email,
      phone: payload.mobile,
      memberCode: 'TRV' + Math.floor(1000 + Math.random() * 9000),
    }, 400);
  },

  forgotPassword: async (identifier: string): Promise<ApiResponse<{ sent: boolean; message: string }>> => {
    return simulateNetworkDelay({
      sent: true,
      message: `A password reset link has been dispatched to ${identifier}.`,
    }, 300);
  },

  getCurrentUser: async (): Promise<ApiResponse<UserSession | null>> => {
    return simulateNetworkDelay(MOCK_SESSION, 150);
  },

  logout: async (): Promise<ApiResponse<{ loggedOut: boolean }>> => {
    return simulateNetworkDelay({ loggedOut: true }, 200);
  },
};
