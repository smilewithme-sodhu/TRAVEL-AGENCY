import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminPayoutsPage: React.FC = () => {
  const payouts = [
    { id: 'PO-9912', member: 'Rahul Sharma (#TRV-8821)', amount: 2000, bank: 'HDFC A/C ...4092 (IFSC: HDFC0001242)', date: '12 Feb 2026', status: 'PENDING' },
    { id: 'PO-9908', member: 'Karan Singhania (#TRV-3301)', amount: 1500, bank: 'ICICI A/C ...8821 (IFSC: ICIC0000911)', date: '10 Feb 2026', status: 'PROCESSED' },
    { id: 'PO-9905', member: 'Tanvi Deshmukh (#TRV-9944)', amount: 3200, bank: 'SBI A/C ...1102 (IFSC: SBIN0004521)', date: '08 Feb 2026', status: 'PROCESSED' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Treasury & Banking
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
          Member Withdrawal Queue
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Review and approve pending affiliate payout requests with automated bank batch settlement.
        </p>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-5">Payout Reference</th>
                <th className="py-4 px-5">Member</th>
                <th className="py-4 px-5">Target Bank Account</th>
                <th className="py-4 px-5">Requested Date</th>
                <th className="py-4 px-5 text-right">Amount</th>
                <th className="py-4 px-5">Status / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {payouts.map(po => (
                <tr key={po.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-5 font-mono text-slate-400">{po.id}</td>
                  <td className="py-4 px-5 font-bold text-white">{po.member}</td>
                  <td className="py-4 px-5 text-xs text-slate-400">{po.bank}</td>
                  <td className="py-4 px-5 text-slate-400">{po.date}</td>
                  <td className="py-4 px-5 text-right font-bold text-white">₹{po.amount.toLocaleString()}</td>
                  <td className="py-4 px-5">
                    {po.status === 'PENDING' ? (
                      <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors">
                        Approve & Pay NEFT
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-emerald-400">✓ Settled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
