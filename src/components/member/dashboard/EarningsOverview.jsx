import React from 'react';
import { ArrowRight } from 'lucide-react';

export const EarningsOverview = ({ earnings, navigateTo, formatINR }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100/90 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">
            FINANCIAL PERFORMANCE
          </span>
          <h2 className="font-sans font-extrabold text-base text-slate-900">
            Earnings & Balance
          </h2>
        </div>
        <button
          onClick={() => navigateTo('member-wallet')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <span>Wallet</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Master Prominent Total Earned */}
      <div className="p-4 bg-[#0F172A] text-white rounded-2xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
            TOTAL EARNED TO DATE
          </span>
          <div className="font-sans font-black text-2xl sm:text-3xl text-[#C9A455]">
            {formatINR(earnings.total)}
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-300 font-medium">
          Direct: {formatINR(earnings.direct)}<br />
          Team: {formatINR(earnings.team)}
        </div>
      </div>

      {/* Secondary Supporting Metrics (Compact Grid) */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Available Balance</span>
          <div className="font-sans font-black text-lg text-emerald-600">
            {formatINR(earnings.available)}
          </div>
          <div className="text-[9px] text-slate-500 font-medium">Withdrawal Eligible</div>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Binary Match</span>
          <div className="font-sans font-black text-lg text-indigo-600">
            {formatINR(earnings.binary)}
          </div>
          <div className="text-[9px] text-slate-500 font-medium">Matched Rewards</div>
        </div>
      </div>
    </div>
  );
};
