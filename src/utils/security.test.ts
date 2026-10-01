import { maskBankAccount } from './security';

describe('security', () => {
  describe('maskBankAccount', () => {
    it('handles null, undefined, and empty string correctly', () => {
      expect(maskBankAccount(null)).toBe('•••• •••• ••••');
      expect(maskBankAccount(undefined)).toBe('•••• •••• ••••');
      expect(maskBankAccount('')).toBe('•••• •••• ••••');
    });

    it('handles bank accounts with less than 4 digits correctly', () => {
      expect(maskBankAccount('123')).toBe('•••• 123');
      expect(maskBankAccount('12')).toBe('•••• 12');
      expect(maskBankAccount('1')).toBe('•••• 1');
    });

    it('handles 4-digit bank accounts correctly', () => {
      expect(maskBankAccount('1234')).toBe('•••• •••• 1234');
    });

    it('handles regular, multi-digit bank accounts correctly', () => {
      expect(maskBankAccount('1234567890')).toBe('•••• •••• 7890');
      expect(maskBankAccount('987654321098')).toBe('•••• •••• 1098');
    });

    it('handles bank accounts with spaces by stripping them before masking', () => {
      expect(maskBankAccount('123 456 7890')).toBe('•••• •••• 7890');
      expect(maskBankAccount('  1234  ')).toBe('•••• •••• 1234');
      expect(maskBankAccount(' 1 2 3 ')).toBe('•••• 123');
    });
  });
});
