import { ApiResponse } from './client';
import { auth, db } from '../config/firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

export interface BinaryNode {
  id: string;
  memberCode: string;
  name: string;
  status: 'ACTIVE' | 'REGISTERED' | 'EXPIRED' | 'SUSPENDED';
  leftVolume: number;
  rightVolume: number;
  leftCarry: number;
  rightCarry: number;
  matchedPairs: number;
  level: number;
  hasChildren: boolean;
  leftChild?: BinaryNode | null;
  rightChild?: BinaryNode | null;
}

export interface BinaryOverview {
  leftVolume: number;
  rightVolume: number;
  matchedVolume: number;
  leftCarryForward: number;
  rightCarryForward: number;
  rootNode: BinaryNode;
}



const buildRealRootNode = async (uid?: string, depth = 0, maxDepth = 2): Promise<BinaryNode> => {
  const targetUid = uid || auth.currentUser?.uid;
  if (!targetUid) throw new Error("Not authenticated");

  // Fetch all users in a single round-trip to prevent N+1 queries
  const usersSnap = await getDocs(collection(db, 'users'));
  const userMap = new Map<string, any>();
  usersSnap.forEach((docSnap) => {
    userMap.set(docSnap.id, docSnap.data());
  });

  const assembleNode = (currentUid: string, currentDepth: number): BinaryNode | null => {
    const userData = userMap.get(currentUid);
    if (!userData) return null;

    const status = userData.status === 'GREEN_ACTIVE' ? 'ACTIVE' : (userData.status || 'REGISTERED');

    let leftChild: BinaryNode | null = null;
    let rightChild: BinaryNode | null = null;

    if (currentDepth < maxDepth) {
      if (userData.leftId) leftChild = assembleNode(userData.leftId, currentDepth + 1);
      if (userData.rightId) rightChild = assembleNode(userData.rightId, currentDepth + 1);
    }

    return {
      id: currentUid,
      memberCode: userData.referralCode || `TRV${currentUid.substring(0,4).toUpperCase()}`,
      name: userData.name || 'Member',
      status: status,
      leftVolume: 0,
      rightVolume: 0,
      leftCarry: 0,
      rightCarry: 0,
      matchedPairs: 0,
      level: currentDepth,
      hasChildren: !!(userData.leftId || userData.rightId),
      leftChild,
      rightChild,
    };
  };

  const rootNode = assembleNode(targetUid, depth);
  if (!rootNode) throw new Error("Root node not found in network");
  return rootNode;
};

export const binaryApi = {
  getSummary: async (): Promise<ApiResponse<BinaryOverview>> => {
    try {
      const rootNode = await buildRealRootNode();

      return {
        success: true,
        data: {
          leftVolume: 0,
          rightVolume: 0,
          matchedVolume: 0,
          leftCarryForward: 0,
          rightCarryForward: 0,
          rootNode: rootNode,
        },
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      return { success: false, data: null as any, error: err.message, timestamp: new Date().toISOString() };
    }
  },

  getRoot: async (): Promise<ApiResponse<BinaryNode>> => {
    try {
      const rootNode = await buildRealRootNode();
      return { success: true, data: rootNode, timestamp: new Date().toISOString() };
    } catch (err: any) {
      return { success: false, data: null as any, error: err.message, timestamp: new Date().toISOString() };
    }
  },

  getNodeChildren: async (nodeId: string): Promise<ApiResponse<{ left: BinaryNode | null; right: BinaryNode | null }>> => {
    try {
      // Single fetch to avoid N+1
      const usersSnap = await getDocs(collection(db, 'users'));
      const userMap = new Map<string, any>();
      usersSnap.forEach((docSnap) => {
        userMap.set(docSnap.id, docSnap.data());
      });

      const data = userMap.get(nodeId);
      if (!data) throw new Error("Node not found");

      const assembleNode = (currentUid: string, currentDepth: number, maxDepth: number = 2): BinaryNode | null => {
        const userData = userMap.get(currentUid);
        if (!userData) return null;

        const status = userData.status === 'GREEN_ACTIVE' ? 'ACTIVE' : (userData.status || 'REGISTERED');
        let leftChild: BinaryNode | null = null;
        let rightChild: BinaryNode | null = null;

        if (currentDepth < maxDepth) {
          if (userData.leftId) leftChild = assembleNode(userData.leftId, currentDepth + 1, maxDepth);
          if (userData.rightId) rightChild = assembleNode(userData.rightId, currentDepth + 1, maxDepth);
        }

        return {
          id: currentUid,
          memberCode: userData.referralCode || `TRV${currentUid.substring(0,4).toUpperCase()}`,
          name: userData.name || 'Member',
          status: status,
          leftVolume: 0,
          rightVolume: 0,
          leftCarry: 0,
          rightCarry: 0,
          matchedPairs: 0,
          level: currentDepth,
          hasChildren: !!(userData.leftId || userData.rightId),
          leftChild,
          rightChild,
        };
      };

      let left = null;
      let right = null;
      
      // Node children are depth 0 relative to their root, up to maxDepth 2
      if (data.leftId) {
        left = assembleNode(data.leftId, 0, 2);
      }
      if (data.rightId) {
        right = assembleNode(data.rightId, 0, 2);
      }

      return {
        success: true,
        data: { left, right },
        timestamp: new Date().toISOString()
      };
    } catch (err: any) {
      return { success: false, data: null as any, error: err.message, timestamp: new Date().toISOString() };
    }
  },
};
