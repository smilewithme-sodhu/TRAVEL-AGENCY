import React from 'react';
import { Wallet, ArrowUpRight, Share2, Users } from 'lucide-react';

export const QuickActions = ({ navigateTo }) => {
  return (
    <div className="space-y-2">
      <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
        QUICK ACTIONS
      </span>
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={() => navigateTo('member-wallet')}
          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100/90 shadow-2xs text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
          <span className="font-bold text-[11px] text-slate-800">Wallet</span>
        </button>

        <button
          onClick={() => navigateTo('member-withdraw')}
          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100/90 shadow-2xs text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <span className="font-bold text-[11px] text-slate-800">Withdraw</span>
        </button>

        <button
          onClick={() => navigateTo('member-referral')}
          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100/90 shadow-2xs text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Share2 className="w-4 h-4" />
          </div>
          <span className="font-bold text-[11px] text-slate-800">Referral</span>
        </button>

        <button
          onClick={() => navigateTo('member-network')}
          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100/90 shadow-2xs text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <span className="font-bold text-[11px] text-slate-800">Network</span>
        </button>
      </div>
    </div>
  );
};
