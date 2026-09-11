import { ApiResponse } from './client';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface WalletTransaction {
  id: string;
  type: string;
  amount: number;
  direction: 'CREDIT' | 'DEBIT';
  status: 'Completed' | 'Processing' | 'Approved' | 'Failed';
  date: string;
  description: string;
  referenceId?: string;
}

export interface WalletOverview {
  availableBalance: number;
  totalEarnings: number;
  pendingClearance: number;
  totalPaidOut: number;
  transactions: WalletTransaction[];
}

export const walletApi = {
  getSummary: async (): Promise<ApiResponse<WalletOverview>> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      return {
        success: true,
        data: {
          availableBalance: userData?.walletBalance || 0,
          totalEarnings: userData?.totalEarned || 0,
          pendingClearance: 0,
          totalPaidOut: 0,
          transactions: []
        },
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      return { success: false, data: null as any, error: err.message, timestamp: new Date().toISOString() };
    }
  }
};
