import React, { useState, useEffect } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { withdrawalsApi } from '../../api';
import { formatINR, formatDate } from '../../utils/formatters';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { CardSkeleton } from '../ui/Skeleton';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const WithdrawPage = () => {
  const { showToast, navigateTo } = useWaypoint();
  const [balanceInfo, setBalanceInfo] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedBankId, setSelectedBankId] = useState('');
  const [amount, setAmount] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      withdrawalsApi.getEligibleBalance(),
      withdrawalsApi.getBankAccounts(),
      withdrawalsApi.getHistory(),
    ])
      .then(([balRes, bankRes, histRes]) => {
        if (balRes.success) setBalanceInfo(balRes.data);
        if (bankRes.success) {
          setBankAccounts(bankRes.data);
          if (bankRes.data.length > 0) setSelectedBankId(bankRes.data[0].id);
        }
        if (histRes.success) setHistory(histRes.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);
    if (!numAmount || isNaN(numAmount) || numAmount <= 0) {
      showToast('Please enter a valid withdrawal amount.', 'error');
      return;
    }
    if (balanceInfo && numAmount < balanceInfo.minWithdrawal) {
      showToast(`Minimum withdrawal amount is ${formatINR(balanceInfo.minWithdrawal)}.`, 'error');
      return;
    }
    if (balanceInfo && numAmount > balanceInfo.available) {
      showToast('Requested amount exceeds your available balance.', 'error');
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleConfirmWithdrawal = async () => {
    setIsConfirmOpen(false);
    setIsSubmitting(true);
    try {
      const res = await withdrawalsApi.requestWithdrawal({
        amount: Number(amount),
        bankAccountId: selectedBankId,
      });
      if (res.success) {
        showToast(`Withdrawal request of ${formatINR(Number(amount))} submitted successfully!`, 'success');
        setAmount('');
        // Refresh history
        const updatedHist = await withdrawalsApi.getHistory();
        if (updatedHist.success) setHistory(updatedHist.data);
      }
    } catch {
      showToast('Failed to submit withdrawal. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <CardSkeleton />;

  const selectedBank = bankAccounts.find((b) => b.id === selectedBankId);

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
                {formatINR(balanceInfo?.available)}
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              Min: <strong className="text-slate-800">{formatINR(balanceInfo?.minWithdrawal)}</strong>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Withdrawal Amount (₹)
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-bold text-slate-400">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 15000"
                  min={balanceInfo?.minWithdrawal ?? 1000}
                  max={balanceInfo?.available ?? 0}
                  className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block">
                Receiving Bank Account
              </label>
              <div className="space-y-2">
                {bankAccounts.map((bank) => (
                  <label
                    key={bank.id}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      selectedBankId === bank.id
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/30'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="bankSelect"
                        checked={selectedBankId === bank.id}
                        onChange={() => setSelectedBankId(bank.id)}
                        className="text-blue-600"
                      />
                      <div>
                        <div className="font-bold text-xs text-slate-900">{bank.bankName}</div>
                        <div className="font-mono text-[10px] text-slate-500">
                          {bank.accountNumberMasked} • IFSC: {bank.ifscCode}
                        </div>
                      </div>
                    </div>

                    {bank.isPrimary && (
                      <span className="text-[9px] font-black uppercase tracking-wider bg-slate-900 text-white px-2 py-0.5 rounded-md">
                        PRIMARY
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || (balanceInfo?.available || 0) < 1000}
              className="w-full py-3.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50 mt-2"
            >
              <span>{isSubmitting ? 'Processing...' : 'Review & Request Withdrawal'}</span>
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
      </div>

      {/* Confirmation Modal */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Confirm Bank Withdrawal"
        description={`Are you sure you want to request a bank transfer of ${formatINR(Number(amount))} to your registered ${selectedBank?.bankName} account ending in ${selectedBank?.accountNumberMasked.slice(-4)}?`}
        confirmLabel="Confirm & Submit"
        cancelLabel="Review Amount"
        onConfirm={handleConfirmWithdrawal}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};
