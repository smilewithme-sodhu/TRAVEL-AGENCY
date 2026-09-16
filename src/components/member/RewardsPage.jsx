import React, { useState, useEffect, useMemo } from 'react';
import { rewardsApi } from '../../api';
import { formatINR, formatDate } from '../../utils/formatters';
import { TableSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import {
  Award,
  DollarSign,
  GitFork,
  Users,
  ChevronRight,
  X
} from 'lucide-react';

const SummaryCards = ({ summary }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
    <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Earned</span>
      <div className="font-sans font-extrabold text-xl text-slate-900">{formatINR(summary?.totalEarned)}</div>
    </div>
    <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase block">Available Balance</span>
      <div className="font-sans font-extrabold text-xl text-emerald-600">{formatINR(summary?.available)}</div>
    </div>
    <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase block">Pending Clearance</span>
      <div className="font-sans font-extrabold text-xl text-amber-600">{formatINR(summary?.pending)}</div>
    </div>
    <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs">
      <span className="text-[10px] font-bold text-slate-400 uppercase block">Reversals</span>
      <div className="font-sans font-extrabold text-xl text-slate-400">{formatINR(summary?.reversed)}</div>
    </div>
  </div>
);

const FilterTabs = ({ activeTab, setActiveTab }) => (
  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
    {[
      { id: 'ALL', label: 'All Rewards' },
      { id: 'DIRECT', label: 'Direct Commissions' },
      { id: 'TEAM', label: 'Team Overrides' },
      { id: 'BINARY', label: 'Binary Match' },
    ].map((t) => (
      <button
        key={t.id}
        onClick={() => setActiveTab(t.id)}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
          activeTab === t.id
            ? 'bg-[#0F172A] text-white shadow-xs'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
        }`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

const TransactionList = ({ filtered, setSelectedReward }) => {
  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={Award}
        title="No rewards recorded"
        description="Your reward activity will appear here once eligible travel transactions are processed."
      />
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-100/90 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] uppercase font-bold text-slate-400">
              <th className="py-3.5 px-6">Reward Type & Source</th>
              <th className="py-3.5 px-4">Audit ID</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-6 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {filtered.map((rw) => (
              <tr key={rw.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      rw.type === 'DIRECT' ? 'bg-emerald-50 text-emerald-600' : rw.type === 'BINARY' ? 'bg-indigo-50 text-indigo-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {rw.type === 'DIRECT' ? <DollarSign className="w-4 h-4" /> : rw.type === 'BINARY' ? <GitFork className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{rw.sourceBookingTitle}</div>
                      <div className="text-[10px] text-slate-400">{rw.sourceMemberName}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500 font-semibold">{rw.auditId}</td>
                <td className="py-3.5 px-4 font-sans font-extrabold text-sm text-emerald-600">+{formatINR(rw.amount)}</td>
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    rw.status === 'Approved' || rw.status === 'Paid'
                      ? 'bg-emerald-50 text-emerald-700'
                      : rw.status === 'Reversed'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {rw.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-400 font-mono text-[10px]">{formatDate(rw.createdAt)}</td>
                <td className="py-3.5 px-6 text-right">
                  <button
                    onClick={() => setSelectedReward(rw)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                    title="View audit record"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const RewardDetailModal = ({ selectedReward, setSelectedReward }) => {
  if (!selectedReward) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#C9A455]">
              AUDIT TRANSACTION RECORD
            </span>
            <h3 className="font-sans font-extrabold text-lg text-slate-900">
              {selectedReward.sourceBookingTitle}
            </h3>
          </div>
          <button onClick={() => setSelectedReward(null)} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <span className="text-slate-500 font-medium">Audit Reference ID</span>
            <span className="font-mono font-bold text-slate-900">{selectedReward.auditId}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <span className="text-slate-500 font-medium">Reward Classification</span>
            <span className="font-bold text-slate-900">{selectedReward.type} Reward</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <span className="text-slate-500 font-medium">Credited Amount</span>
            <span className="font-sans font-extrabold text-emerald-600">+{formatINR(selectedReward.amount)}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <span className="text-slate-500 font-medium">Source Member</span>
            <span className="font-bold text-slate-900">{selectedReward.sourceMemberName}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <span className="text-slate-500 font-medium">Status</span>
            <span className="font-bold text-slate-900">{selectedReward.status}</span>
          </div>
          {selectedReward.reversalReason && (
            <div className="p-3 bg-red-50 text-red-800 rounded-xl space-y-1">
              <span className="text-[10px] font-bold uppercase">Reversal Reason:</span>
              <p className="text-xs">{selectedReward.reversalReason}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setSelectedReward(null)}
          className="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const RewardsPage = () => {
  const [summary, setSummary] = useState(null);
  const [activeTab, setActiveTab] = useState('ALL');
  const [selectedReward, setSelectedReward] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    rewardsApi
      .getSummary()
      .then((res) => {
        if (res.success) setSummary(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <TableSkeleton rows={5} />;

  const transactions = summary?.transactions || [];

  // Bolt: Memoize filtered transactions to prevent unnecessary expensive re-filters on re-renders
  const filtered = useMemo(() => transactions.filter((t) => {
    if (activeTab === 'ALL') return true;
    return t.type === activeTab;
  }), [transactions, activeTab]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
            Rewards & Commission Breakdown
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent ledger of direct travel referral commissions, team overrides, and binary volume matching rewards.
          </p>
        </div>
      </div>

      <SummaryCards summary={summary} />
      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <TransactionList filtered={filtered} setSelectedReward={setSelectedReward} />
      <RewardDetailModal selectedReward={selectedReward} setSelectedReward={setSelectedReward} />
    </div>
  );
};
