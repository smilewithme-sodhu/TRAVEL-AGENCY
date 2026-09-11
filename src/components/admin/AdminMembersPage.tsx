import React from 'react';
import { Badge } from '../ui/Badge';
import { Users, Search, ShieldCheck } from 'lucide-react';

export const AdminMembersPage: React.FC = () => {
  const members = [
    { id: '1', name: 'Rahul Sharma', code: 'TRV-8821', status: 'GREEN_ACTIVE', directSales: 12, balance: 3750, joined: '12 Jan 2026' },
    { id: '2', name: 'Karan Singhania', code: 'TRV-3301', status: 'GREEN_ACTIVE', directSales: 6, balance: 1820, joined: '18 Jan 2026' },
    { id: '3', name: 'Tanvi Deshmukh', code: 'TRV-9944', status: 'GREEN_ACTIVE', directSales: 8, balance: 2450, joined: '22 Jan 2026' },
    { id: '4', name: 'Simran Jolly', code: 'TRV-5512', status: 'GREEN_ACTIVE', directSales: 4, balance: 1100, joined: '29 Jan 2026' },
    { id: '5', name: 'Aditya Sen', code: 'TRV-6623', status: 'YELLOW', directSales: 2, balance: 500, joined: '02 Feb 2026' }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Member Network
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
          Registered Travel Members
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Monitor affiliate active travel qualification, sponsor hierarchy, and verified balances.
        </p>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-300">
            <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-5">Member</th>
                <th className="py-4 px-5">ID Code</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5">Direct Sales</th>
                <th className="py-4 px-5">Wallet Balance</th>
                <th className="py-4 px-5">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-5 font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-900 text-indigo-200 flex items-center justify-center font-bold text-xs">
                      {m.name.slice(0, 2)}
                    </div>
                    <span>{m.name}</span>
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-400">#{m.code}</td>
                  <td className="py-4 px-5">
                    {m.status === 'GREEN_ACTIVE' ? (
                      <span className="text-xs font-bold text-emerald-400">🟢 Active Travel</span>
                    ) : (
                      <span className="text-xs font-bold text-amber-400">🟡 Yellow</span>
                    )}
                  </td>
                  <td className="py-4 px-5">{m.directSales} Bookings</td>
                  <td className="py-4 px-5 font-bold text-white">₹{m.balance.toLocaleString()}</td>
                  <td className="py-4 px-5 text-slate-400">{m.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
