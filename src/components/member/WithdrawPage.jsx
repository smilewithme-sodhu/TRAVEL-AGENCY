import React, { useState, useEffect } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { withdrawalsApi } from '../../api';
import { formatINR } from '../../utils/formatters';
import { WithdrawalForm } from './withdraw/WithdrawalForm';
import { WithdrawalHistory } from './withdraw/WithdrawalHistory';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { CardSkeleton } from '../ui/Skeleton';

export const WithdrawPage = () => {
  const { showToast } = useWaypoint();
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

        <WithdrawalForm
          balanceInfo={balanceInfo}
          bankAccounts={bankAccounts}
          selectedBankId={selectedBankId}
          setSelectedBankId={setSelectedBankId}
          amount={amount}
          setAmount={setAmount}
          handleFormSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />

        {/* Right: Withdrawal History (5 cols) */}
        <WithdrawalHistory history={history} />

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
