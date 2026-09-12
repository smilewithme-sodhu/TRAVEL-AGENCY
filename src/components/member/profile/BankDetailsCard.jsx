import React from 'react';
import { Building2 } from 'lucide-react';
import { maskBankAccount } from '../../../utils/security';

export const BankDetailsCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
      <h4 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
        <Building2 className="w-4 h-4 text-blue-600" />
        <span>Registered Payout Bank</span>
      </h4>

      <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Bank Name</span>
          <span className="font-bold text-slate-900">HDFC Bank Ltd.</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">Account Number</span>
          <span className="font-mono font-bold text-slate-900">{maskBankAccount('50100418294821')}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">IFSC Code</span>
          <span className="font-mono font-bold text-slate-900">HDFC0001248</span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400">
        For security, full bank details are masked. Contact support to update registered payout accounts.
      </p>
    </div>
  );
};
