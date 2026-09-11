import React, { useState, useEffect } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { walletApi } from '../../api';
import { formatINR, formatDate } from '../../utils/formatters';
import { TableSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Clock,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';

export const WalletPage = () => {
  const { navigateTo } = useWaypoint();
  const [summary, setSummary] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    walletApi
      .getSummary()
      .then((res) => {
        if (res.success) setSummary(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <TableSkeleton rows={5} />;

  const transactions = summary?.transactions || [];

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'ALL') return true;
    if (filter === 'CREDIT') return t.direction === 'CREDIT';
    if (filter === 'DEBIT') return t.direction === 'DEBIT';
    if (filter === 'WITHDRAWAL') return t.type === 'WITHDRAWAL';
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Balance Hero */}
      <div className="bg-[#0F172A] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#C9A455] tracking-widest block">
              MEMBER FINANCIAL LEDGER
            </span>
            <div className="text-slate-400 text-xs mt-1">Available Withdrawal Balance</div>
            <h1 className="font-sans font-black text-3xl sm:text-5xl text-white mt-1">
              {formatINR(summary?.availableBalance)}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('member-withdraw')}
              className="px-6 py-3 rounded-full bg-[#C9A455] hover:bg-[#b89547] text-[#0F172A] font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              <span>Request Bank Withdrawal</span>
            </button>
          </div>
        </div>

        {/* 3-Column Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
          <div className="p-3 bg-white/5 rounded-2xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Earnings Accrued</span>
            <span className="font-sans font-bold text-base text-white">{formatINR(summary?.totalEarned)}</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Pending Clearance</span>
            <span className="font-sans font-bold text-base text-amber-400">{formatINR(summary?.pendingBalance)}</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Paid Out</span>
            <span className="font-sans font-bold text-base text-slate-300">{formatINR(summary?.totalWithdrawn)}</span>
          </div>
        </div>
      </div>

      {/* Transaction Ledger Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h2 className="font-sans font-extrabold text-base text-slate-900 self-start sm:self-auto">
            Wallet Transaction Ledger
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search TXN ID or note..."
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
              {[
                { id: 'ALL', label: 'All' },
                { id: 'CREDIT', label: 'Credits' },
                { id: 'DEBIT', label: 'Debits' },
                { id: 'WITHDRAWAL', label: 'Withdrawals' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    filter === f.id ? 'bg-[#0F172A] text-white shadow-xs' : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="No transactions found"
            description="There are currently no ledger transactions matching your criteria."
          />
        ) : (
          <div className="bg-white rounded-3xl border border-slate-100/90 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <div key={t.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      t.direction === 'CREDIT' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {t.direction === 'CREDIT' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>

                    <div>
                      <div className="font-sans font-bold text-xs sm:text-sm text-slate-900">{t.description}</div>
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                        TXN: {t.id} • Ref: {t.referenceId}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`font-sans font-extrabold text-sm ${
                      t.direction === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'
                    }`}>
                      {t.direction === 'CREDIT' ? '+' : '-'}{formatINR(t.amount)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {formatDate(t.createdAt)} • <span className="font-bold text-slate-600">{t.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
