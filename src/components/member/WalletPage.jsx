import React, { useState } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, useWithdraw } from '../../api/client';
import { formatINR, formatDate } from '../../utils/formatters';
import { TableSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Search,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';

const WithdrawModal = ({ isOpen, onClose, availableBalance }) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const queryClient = useQueryClient();

  const withdrawMutation = useWithdraw();
  const originalMutate = withdrawMutation.mutate;
  withdrawMutation.mutate = (data) => originalMutate(data, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet'] });
      setSuccess(true);
    },
    onError: (err) => {
      setError(err.response?.data?.error || err.message || 'Withdrawal failed');
    }
  });

  if (!isOpen) return null;

  const handleAmountChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    setError('');
    const num = Number(val);
    if (num > availableBalance) {
      setError('Insufficient funds');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const num = Number(amount);
    if (!num || num <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    if (num > availableBalance) {
      setError('Insufficient funds');
      return;
    }
    withdrawMutation.mutate({ amount: num });
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
        <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-emerald-400 w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Withdrawal Requested</h2>
          <p className="text-slate-400 mb-8">
            Your withdrawal of <span className="text-white font-medium">{formatINR(Number(amount))}</span> has been successfully requested and is pending admin approval.
          </p>
          <button
            onClick={() => {
              setSuccess(false);
              setAmount('');
              onClose();
            }}
            className="w-full bg-[#C9A455] hover:bg-[#B5914A] text-[#0F172A] font-bold py-3 px-6 rounded-full transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0F172A] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <DollarSign className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-white">Request Withdrawal</h2>
          </div>
          <p className="text-slate-400 text-sm">
            Withdraw funds directly to your primary bank account or UPI ID.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300">Amount</label>
              <span className="text-xs text-slate-400">
                Available: <span className="text-white font-bold">{formatINR(availableBalance)}</span>
              </span>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">?</span>
              <input
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                min="1"
                max={availableBalance}
                className={"w-full bg-[#1E293B] border rounded-xl py-3 pl-8 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all " + (error ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-700 focus:ring-[#C9A455]/50 focus:border-[#C9A455]')}
              />
            </div>
            {error && <p className="text-red-400 text-xs flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
          </div>

          <button
            type="submit"
            disabled={withdrawMutation.isPending || !!error || !amount}
            className="w-full bg-[#C9A455] hover:bg-[#B5914A] disabled:bg-slate-700 disabled:text-slate-400 text-[#0F172A] font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {withdrawMutation.isPending ? 'Processing...' : 'Submit Request'}
            {!withdrawMutation.isPending && <ArrowUpRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export const WalletPage = () => {
  const { memberProfile } = useWanderlust();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ['wallet'],
    queryFn: async () => {
      const response = await apiClient.get('/api/wallet');
      return response.data.data;
    }
  });

  if (isLoading) return <TableSkeleton rows={5} />;
  if (isError) return <div className="text-red-500">Failed to load wallet data</div>;

  const wallet = summary?.wallet || {};
  const transactions = summary?.transactions || [];

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      (t.notes || t.idempotencyKey || t.transactionType).toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'ALL') return true;
    if (filter === 'CREDIT') return t.transactionType.startsWith('CREDIT');
    if (filter === 'DEBIT') return t.transactionType.startsWith('DEBIT');
    if (filter === 'WITHDRAWAL') return t.transactionType === 'DEBIT_WITHDRAWAL';
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
              {formatINR(wallet.availableBalance || 0)}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="px-6 py-3 rounded-full bg-[#C9A455] hover:bg-[#b89547] text-[#0F172A] font-extrabold text-xs transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              <span>Request Withdrawal</span>
            </button>
          </div>
        </div>

        {/* 3-Column Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs">
          <div className="p-3 bg-white/5 rounded-2xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Earnings Accrued</span>
            <span className="font-sans font-bold text-base text-white">{formatINR(wallet.totalEarned || 0)}</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Pending Clearance</span>
            <span className="font-sans font-bold text-base text-amber-400">{formatINR(wallet.pendingBalance || 0)}</span>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Wallet Currency</span>
            <span className="font-sans font-bold text-base text-slate-300">{wallet.currency || 'INR'}</span>
          </div>
        </div>
      </div>

      {/* Transaction Ledger Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <h2 className="font-sans font-extrabold text-base text-white self-start sm:self-auto">
            Wallet Transaction Ledger
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search description..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#1E293B] border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
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
                  className={"px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap " + (filter === f.id ? 'bg-[#C9A455] text-[#0F172A] shadow-xs' : 'bg-[#1E293B] text-slate-400 hover:text-white border border-slate-700')}
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
          <div className="bg-[#1E293B] rounded-3xl border border-slate-700 overflow-hidden shadow-xs">
            <div className="divide-y divide-slate-800/50">
              {filtered.map((t) => {
                const isCredit = t.transactionType.startsWith('CREDIT');
                return (
                  <div key={t.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <div className={"w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 " + (isCredit ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500')}>
                        {isCredit ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="font-sans font-bold text-xs sm:text-sm text-white">
                          {t.notes || t.transactionType.replace(/_/g, ' ')}
                        </div>
                        <div className="font-mono text-[10px] text-slate-500 mt-0.5">
                          TXN: {t.id}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={"font-sans font-extrabold text-sm " + (isCredit ? 'text-emerald-500' : 'text-red-500')}>
                        {isCredit ? '+' : '-'}{formatINR(t.amount)}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                        {formatDate(t.createdAt)} • <span className="font-bold text-slate-400">{t.status}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)} 
        availableBalance={wallet.availableBalance || 0}
      />
    </div>
  );
};

