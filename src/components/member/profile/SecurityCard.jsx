import React from 'react';
import { Lock } from 'lucide-react';

export const SecurityCard = ({ showToast }) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
      <h4 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
        <Lock className="w-4 h-4 text-slate-700" />
        <span>Security & Access Credentials</span>
      </h4>
      <p className="text-xs text-slate-500">
        Your member account is protected by multi-factor session validation and encrypted tokens.
      </p>
      <button
        onClick={() => showToast('Password reset instructions sent to your email.', 'success')}
        className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        Update Password
      </button>
    </div>
  );
};
