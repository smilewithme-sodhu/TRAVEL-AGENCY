import React from 'react';
import { formatINR, formatDate } from '../../../utils/formatters';

export const WithdrawalHistory = ({ history }) => {
  return (
    <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
      <h3 className="font-sans font-extrabold text-base text-slate-900">
        Recent Withdrawal Requests
      </h3>

      <div className="divide-y divide-slate-100">
        {history.map((h) => (
          <div key={h.id} className="py-3.5 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-slate-900">{h.withdrawalId}</span>
              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                h.status === 'Paid'
                  ? 'bg-emerald-50 text-emerald-700'
                  : h.status === 'Processing'
                  ? 'bg-blue-50 text-blue-700'
                  : 'bg-amber-50 text-amber-700'
              }`}>
                {h.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900">{formatINR(h.amount)}</span>
              <span className="text-slate-400 font-mono text-[10px]">{formatDate(h.requestedAt)}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              {h.bankName} • {h.accountMasked}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
