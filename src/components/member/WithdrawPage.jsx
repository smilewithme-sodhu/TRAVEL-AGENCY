import React, { useState } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { apiClient } from '../../api/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatINR, formatDate } from '../../utils/formatters';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { CardSkeleton } from '../ui/Skeleton';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export const WithdrawPage = () => {
  const { showToast, memberProfile } = useWanderlust();
  const queryClient = useQueryClient();

  const [payoutAddress, setPayoutAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Fetch Wallet Summary
  const { data: summary, isLoading } = useQuery({
    queryKey: ['walletSummary', memberProfile?.id],
    queryFn: async () => {
      if (!memberProfile?.id) return null;
      const response = await apiClient.get(`/api/wallet/${memberProfile.id}/summary`);
      return response.data.data;
    },
    enabled: !!memberProfile?.id,
  });

  // Withdraw Mutation
  const withdrawMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await apiClient.post(`/api/wallet/${memberProfile.id}/withdraw`, payload);
      return response.data;
    },
    onSuccess: () => {
      showToast(`Withdrawal request of ${formatINR(Number(amount))} submitted successfully!`, 'success');
      setAmount('');
      setPayoutAddress('');
      queryClient.invalidateQueries(['walletSummary', memberProfile?.id]);
    },
    onError: (error) => {
      showToast(error?.response?.data?.error || 'Failed to submit withdrawal. Please try again.', 'error');
    }
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
      showToast('Please enter a valid withdrawal amount.', 'error');
      return;
    }
    const minW = summary?.minWithdrawal ?? 1000;
    if (numAmount < minW) {
      showToast(`Minimum withdrawal amount is ${formatINR(minW)}.`, 'error');
      return;
    }
    if (numAmount > (summary?.availableBalance ?? 0)) {
      showToast('Requested amount exceeds your available balance.', 'error');
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmWithdrawal = () => {
    setIsConfirmOpen(false);
    withdrawMutation.mutate({
      amount: Number(amount),
      payoutAddress,
    });
  };

  if (isLoading) return <CardSkeleton />;

  const history = summary?.withdrawals || summary?.transactions?.filter(t => t.type === 'WITHDRAWAL') || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-2 border-b border-slate-100">
        <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
          Request Bank Withdrawal
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Transfer your verified member earnings directly to your registered bank account.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Withdrawal Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
          <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Available for Payout</span>
              <div className="font-sans font-black text-2xl text-slate-900">
                {formatINR(summary?.availableBalance ?? 0)}
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              Min: <strong className="text-slate-800">{formatINR(summary?.minWithdrawal ?? 1000)}</strong>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Withdrawal Amount (TP )
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-bold text-slate-400">TP </span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 15000"
                  min={summary?.minWithdrawal ?? 1000}
                  max={summary?.availableBalance ?? 0}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Payout Address (UPI ID or Bank Details)
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={payoutAddress}
                  onChange={(e) => setPayoutAddress(e.target.value)}
                  placeholder="e.g. yourname@upi OR A/c 1234, IFSC HDFC..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:bg-white"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={withdrawMutation.isPending || (summary?.availableBalance || 0) < (summary?.minWithdrawal || 1000)}
              className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{withdrawMutation.isPending ? 'Processing...' : 'Review & Request Withdrawal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Bank transfers are processed securely via direct IMPS/NEFT within 24–48 business hours.</span>
          </div>
        </div>

        {/* Right: Withdrawal History (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-sans font-extrabold text-base text-slate-900">
            Recent Withdrawal Requests
          </h3>

          <div className="divide-y divide-slate-100">
            {history.length === 0 ? (
              <div className="py-4 text-xs text-slate-500 text-center">No recent withdrawals.</div>
            ) : (
              history.map((h) => (
                <div key={h.id} className="py-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-slate-900">{h.id || h.withdrawalId}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      h.status === 'Paid'
                        ? 'bg-emerald-50 text-emerald-700'
                        : h.status === 'Processing'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}>
                      {h.status || 'Pending'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-slate-900">{formatINR(h.amount)}</span>
                    <span className="text-slate-400 font-mono text-[10px]">{formatDate(h.requestedAt || h.createdAt)}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {h.payoutAddress || h.bankName || 'Bank Transfer'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Confirm Bank Withdrawal"
        description={`Are you sure you want to request a transfer of ${formatINR(Number(amount))} to ${payoutAddress}?`}
        confirmLabel="Confirm & Submit"
        cancelLabel="Review Amount"
        onConfirm={handleConfirmWithdrawal}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};
