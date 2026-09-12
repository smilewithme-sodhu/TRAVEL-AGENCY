import React from 'react';
import { ArrowRight, DollarSign, GitFork, ArrowUpRight } from 'lucide-react';

export const RecentActivityFeed = ({ recentActivities, navigateTo, formatDate, formatINR }) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100/90 shadow-xs space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <h3 className="font-sans font-extrabold text-base text-slate-900">
          Recent Activity
        </h3>
        <button
          onClick={() => navigateTo('member-rewards')}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
        >
          <span>All Rewards</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {recentActivities.slice(0, 3).map((act) => (
          <div key={act.id} className="py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                act.direction === 'CREDIT' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'
              }`}>
                {act.type === 'DIRECT_COMMISSION' ? (
                  <DollarSign className="w-4 h-4" />
                ) : act.type === 'BINARY_REWARD' ? (
                  <GitFork className="w-4 h-4" />
                ) : (
                  <ArrowUpRight className="w-4 h-4" />
                )}
              </div>

              <div className="min-w-0">
                <h4 className="font-sans font-bold text-xs text-slate-900 truncate">{act.title}</h4>
                <p className="text-[10px] text-slate-400 truncate">{formatDate(act.timestamp)}</p>
              </div>
            </div>

            {act.amount && (
              <div className={`font-sans font-extrabold text-xs shrink-0 ${
                act.direction === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'
              }`}>
                {act.direction === 'CREDIT' ? '+' : '-'}{formatINR(act.amount)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
