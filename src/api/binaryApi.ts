import { ApiResponse } from './client';
import { auth, db } from '../config/firebase';
import { doc, getDoc } from 'firebase/firestore';

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

  const userDoc = await getDoc(doc(db, 'users', targetUid));
  const userData = userDoc.exists() ? userDoc.data() : null;

  const status = userData?.status === 'GREEN_ACTIVE' ? 'ACTIVE' : (userData?.status || 'REGISTERED');

  let leftChild = null;
  let rightChild = null;

  if (depth < maxDepth) {
    if (userData?.leftId) leftChild = await buildRealRootNode(userData.leftId, depth + 1, maxDepth);
    if (userData?.rightId) rightChild = await buildRealRootNode(userData.rightId, depth + 1, maxDepth);
  }

  return {
    id: targetUid,
    memberCode: userData?.referralCode || `TRV${targetUid.substring(0,4).toUpperCase()}`,
    name: userData?.name || 'Member',
    status: status,
    leftVolume: 0,
    rightVolume: 0,
    leftCarry: 0,
    rightCarry: 0,
    matchedPairs: 0,
    level: depth,
    hasChildren: !!(userData?.leftId || userData?.rightId),
    leftChild,
    rightChild,
  };
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
      const userDoc = await getDoc(doc(db, 'users', nodeId));
      if (!userDoc.exists()) throw new Error("Node not found");
      
      const data = userDoc.data();
      let left = null;
      let right = null;

      if (data.leftId) {
        left = await buildRealRootNode(data.leftId);
      }
      if (data.rightId) {
        right = await buildRealRootNode(data.rightId);
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
