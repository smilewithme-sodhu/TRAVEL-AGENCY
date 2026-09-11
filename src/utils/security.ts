/**
 * Security & Data Masking Utilities
 * Protects sensitive financial and personal details from exposure in UI / logs
 */

export const maskBankAccount = (accountNumber: string | null | undefined): string => {
  if (!accountNumber) return '•••• •••• ••••';
  const clean = accountNumber.replace(/\s+/g, '');
  if (clean.length < 4) return '•••• ' + clean;
  const last4 = clean.slice(-4);
  return `•••• •••• ${last4}`;
};

export const maskPhone = (phone: string | null | undefined): string => {
  if (!phone) return '••••••••••';
  const clean = phone.replace(/\s+/g, '');
  if (clean.length < 4) return '••••••' + clean;
  const prefix = clean.slice(0, 3);
  const suffix = clean.slice(-2);
  return `${prefix} •••• ••${suffix}`;
};

export const maskEmail = (email: string | null | undefined): string => {
  if (!email || !email.includes('@')) return '••••@••••.com';
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local}***@${domain}`;
  const maskedLocal = `${local.charAt(0)}***${local.charAt(local.length - 1)}`;
  return `${maskedLocal}@${domain}`;
};
