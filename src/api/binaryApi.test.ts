import { binaryApi } from './binaryApi';
import { getDoc } from 'firebase/firestore';

jest.mock('firebase/firestore', () => {
  const original = jest.requireActual('firebase/firestore');
  return {
    ...original,
    getDoc: jest.fn(),
    doc: jest.fn((db, coll, id) => id),
  };
});
jest.mock('../config/firebase', () => ({
  auth: { currentUser: { uid: 'root' } },
  db: {},
}));

describe('binaryApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('measures execution time', async () => {
    const mockDb: Record<string, any> = {
      'root': { leftId: 'l1', rightId: 'r1' },
      'l1': { leftId: 'l1l', rightId: 'l1r' },
      'r1': { leftId: 'r1l', rightId: 'r1r' },
      'l1l': {}, 'l1r': {}, 'r1l': {}, 'r1r': {}
    };
    (getDoc as jest.Mock).mockImplementation(async (id: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 50));
      return {
        exists: () => !!mockDb[id],
        data: () => mockDb[id]
      };
    });

    const start = Date.now();
    await binaryApi.getRoot();
    const end = Date.now();

    console.log(`Queries made: ${(getDoc as jest.Mock).mock.calls.length}`);
    console.log(`Time taken: ${end - start}ms`);
  });
});
