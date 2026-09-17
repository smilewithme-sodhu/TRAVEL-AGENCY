import { ApiResponse, apiClient } from './client';

export interface BinaryNode { id: string; memberCode: string; name: string; status: string; leftVolume: number; rightVolume: number; leftCarry: number; rightCarry: number; matchedPairs: number; level: number; hasChildren: boolean; leftChild?: BinaryNode | null; rightChild?: BinaryNode | null; }
export interface BinaryOverview { leftVolume: number; rightVolume: number; matchedVolume: number; leftCarryForward: number; rightCarryForward: number; rootNode: BinaryNode; }

export const binaryApi = {
  getSummary: async (): Promise<ApiResponse<BinaryOverview>> => apiClient.get('/api/binary/summary').then(res => res.data),
  getRoot: async (): Promise<ApiResponse<BinaryNode>> => apiClient.get('/api/binary/root').then(res => res.data),
  getNodeChildren: async (nodeId: string): Promise<ApiResponse<{ left: BinaryNode | null; right: BinaryNode | null }>> => apiClient.get(`/api/binary/children/${nodeId}`).then(res => res.data)
};
