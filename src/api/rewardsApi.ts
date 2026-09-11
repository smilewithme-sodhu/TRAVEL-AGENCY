import { ApiResponse } from './client';
import { auth, db } from '../config/firebase';
import { doc, getDoc, collection, query, getDocs } from 'firebase/firestore';

export interface RewardTransaction {
  id: string;
  type: string;
  title: string;
  amount: number;
  status: 'Approved' | 'Paid' | 'Processing' | 'Reversed';
  date: string;
  details: string;
  sourceId?: string;
  auditId: string;
}

export interface RewardsOverview {
  totalEarned: number;
  availableBalance: number;
  pendingClearance: number;
  reversals: number;
  transactions: RewardTransaction[];
}

export const rewardsApi = {
  getSummary: async (): Promise<ApiResponse<RewardsOverview>> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      // In a full implementation, you would query a subcollection like:
      // const txQuery = query(collection(db, `users/${user.uid}/rewards`));
      
      return {
        success: true,
        data: {
          totalEarned: userData?.totalEarned || 0,
          availableBalance: userData?.walletBalance || 0,
          pendingClearance: 0,
          reversals: 0,
          transactions: []
        },
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      return { success: false, data: null as any, error: err.message, timestamp: new Date().toISOString() };
    }
  }
};
