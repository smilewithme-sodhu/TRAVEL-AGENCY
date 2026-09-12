import React from 'react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { formatINR } from '../../../utils/formatters';

export const WithdrawalForm = ({
  balanceInfo,
  bankAccounts,
  selectedBankId,
  setSelectedBankId,
  amount,
  setAmount,
  handleFormSubmit,
  isSubmitting,
}) => {
  return (
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
  );
};
