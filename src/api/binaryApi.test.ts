import { binaryApi } from './binaryApi';

// Mock the modules
jest.mock('../config/firebase', () => ({
  auth: {
    currentUser: { uid: 'test-uid' }
  },
  db: {}
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn()
}));

import { auth } from '../config/firebase';
import { getDoc } from 'firebase/firestore';

describe('binaryApi', () => {
  describe('getSummary error paths', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should return an error response when user is not authenticated', async () => {
      // Temporarily remove currentUser to trigger "Not authenticated" error
      const originalUser = auth.currentUser;
      (auth as any).currentUser = null;

      const result = await binaryApi.getSummary();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Not authenticated');
      expect(result.data).toBeNull();
      expect(typeof result.timestamp).toBe('string');

      // Restore
      (auth as any).currentUser = originalUser;
    });

    it('should return an error response when buildRealRootNode throws an error from Firestore', async () => {
      // Force getDoc to throw an error
      (getDoc as jest.Mock).mockRejectedValueOnce(new Error('Firestore error'));

      const result = await binaryApi.getSummary();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Firestore error');
      expect(result.data).toBeNull();
      expect(typeof result.timestamp).toBe('string');
    });
  });
});
