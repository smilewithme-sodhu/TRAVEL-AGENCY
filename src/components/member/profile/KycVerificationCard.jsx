import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const KycVerificationCard = () => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-sans font-bold text-base text-slate-900">KYC Verification</h4>
        <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>VERIFIED</span>
        </span>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Your identity documents (PAN & Aadhaar) are verified for direct financial bank payouts under Indian regulatory compliance.
      </p>

      <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 space-y-0.5">
        <div className="font-bold">Verification Date: 16 Nov 2025</div>
        <div className="text-[10px] text-emerald-700 font-mono">PAN: •••••••92F</div>
      </div>
    </div>
  );
};
