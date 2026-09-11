import { ApiResponse } from './client';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumberMasked: string;
  ifscCode: string;
  isPrimary: boolean;
}

export interface WithdrawalRequest {
  id: string;
  withdrawalId: string;
  amount: number;
  status: 'Processing' | 'Paid' | 'Failed' | 'Pending';
  requestedAt: string;
  bankName: string;
  accountMasked: string;
}

export const withdrawalsApi = {
  getEligibleBalance: async (): Promise<ApiResponse<{ available: number; minWithdrawal: number }>> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      return {
        success: true,
        data: {
          available: userData?.walletBalance || 0,
          minWithdrawal: 1000,
        },
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      return { success: false, data: null as any, error: err.message, timestamp: new Date().toISOString() };
    }
  },

  getBankAccounts: async (): Promise<ApiResponse<BankAccount[]>> => {
    return {
      success: true,
      data: [],
      timestamp: new Date().toISOString()
    };
  },

  getHistory: async (): Promise<ApiResponse<WithdrawalRequest[]>> => {
    return {
      success: true,
      data: [],
      timestamp: new Date().toISOString()
    };
  },

  requestWithdrawal: async ({ amount, bankAccountId }: { amount: number, bankAccountId: string }): Promise<ApiResponse<null>> => {
    return {
      success: false,
      data: null,
      error: 'Insufficient funds or bank account not linked.',
      timestamp: new Date().toISOString()
    };
  }
};
