import { ApiResponse } from './client';
import { auth, db } from '../config/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export interface NetworkMemberSummary {
  id: string;
  memberCode: string;
  name: string;
  status: 'ACTIVE' | 'REGISTERED' | 'EXPIRED' | 'SUSPENDED';
  joinedDate: string;
  position: 'LEFT' | 'RIGHT';
  level: number;
  personalTravelBooked: boolean;
  sponsorName: string;
  directReferralsCount: number;
}

export interface NetworkOverview {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  leftCount: number;
  rightCount: number;
  members: NetworkMemberSummary[];
}

export const networkApi = {
  getOverview: async (): Promise<ApiResponse<NetworkOverview>> => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("Not authenticated");

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      
      // Fallback referral code if not established
      const myReferralCode = userData?.referralCode || `TRV${user.uid.substring(0,4).toUpperCase()}`;

      // Query real downline from Firestore
      const q = query(collection(db, 'users'), where('sponsorCode', '==', myReferralCode));
      const querySnapshot = await getDocs(q);
      
      const members: NetworkMemberSummary[] = [];
      let activeMembers = 0;
      let leftCount = 0;
      let rightCount = 0;

      querySnapshot.forEach((docSnap) => {
        const d = docSnap.data();
        const status = d.status === 'GREEN_ACTIVE' ? 'ACTIVE' : (d.status || 'REGISTERED');
        const pos = d.placementSide || 'LEFT';
        
        if (status === 'ACTIVE') activeMembers++;
        if (pos === 'LEFT') leftCount++;
        if (pos === 'RIGHT') rightCount++;

        members.push({
          id: docSnap.id,
          memberCode: d.referralCode || `TRV${docSnap.id.substring(0,4).toUpperCase()}`,
          name: d.name || 'Member',
          status: status,
          joinedDate: d.joinedDate || new Date().toISOString(),
          position: pos,
          level: 1,
          personalTravelBooked: status === 'ACTIVE',
          sponsorName: userData?.name || user.displayName || 'Direct Sponsor',
          directReferralsCount: 0
        });
      });

      return {
        success: true,
        data: {
          totalMembers: members.length,
          activeMembers,
          inactiveMembers: members.length - activeMembers,
          leftCount,
          rightCount,
          members
        },
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      return { success: false, data: null as any, error: err.message, timestamp: new Date().toISOString() };
    }
  },

  getMemberSummary: async (memberId: string): Promise<ApiResponse<NetworkMemberSummary | null>> => {
    // Basic fallback for member summary if needed
    return {
      success: true,
      data: null,
      timestamp: new Date().toISOString()
    };
  },
};
