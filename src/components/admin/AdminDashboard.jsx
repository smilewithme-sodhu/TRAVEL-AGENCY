import React, { useState } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { useQuery, useMutation } from '@tanstack/react-query';
import { adminApi } from '../../api/adminApi';


export const AdminDashboard = () => {
  const { memberProfile } = useWanderlust();
  const [totalEarnings, setTotalEarnings] = useState('');

  const { data: metricsRes, isLoading, refetch } = useQuery({
    queryKey: ['admin-metrics'],
    queryFn: adminApi.getDashboardMetrics,
  });

  const distributeMutation = useMutation({
    mutationFn: (amount) => adminApi.distributeGlobalBonus(amount),
    onSuccess: (data) => {
      alert(data.message);
      setTotalEarnings('');
      refetch();
    },
    onError: (err) => {
      alert(err.response?.data?.error || 'Failed to distribute bonus.');
    }
  });

  const handleDistribute = (e) => {
    e.preventDefault();
    if (!totalEarnings || isNaN(totalEarnings) || Number(totalEarnings) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (confirm("Are you sure you want to distribute 10% of $" + totalEarnings + " to all ORANGE members?")) {
      distributeMutation.mutate(Number(totalEarnings));
    }
  };

  const metrics = metricsRes?.data || { totalPackages: '--', activeMembers: '--', pendingPayouts: '--' };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome to the Admin Console</h1>
        <p className="text-slate-500">Hello, {memberProfile?.name || 'System Admin'}. What would you like to manage today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-2">Total Packages</h3>
          <p className="text-3xl font-bold text-[#C9A455]">{isLoading ? '...' : metrics.totalPackages}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-2">Active Members (Green/Orange)</h3>
          <p className="text-3xl font-bold text-slate-800">{isLoading ? '...' : metrics.activeMembers}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-2">Pending Payouts</h3>
          <p className="text-3xl font-bold text-red-500">TP {isLoading ? '...' : metrics.pendingPayouts.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700 mb-2">Total Global Bonus</h3>
          <p className="text-3xl font-bold text-emerald-500">TP {isLoading ? '...' : (metrics.totalGlobalBonus || 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Global Revenue Share Module */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Global Revenue Distribution (Orange Members Only)</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          Enter the total weekly/monthly earnings below. The system will automatically calculate 10% of this amount and distribute it evenly into the wallets of all eligible ORANGE Travel Agents.
        </p>

        <form onSubmit={handleDistribute} className="flex items-end gap-4 max-w-xl">
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Total Company Earnings (INR)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">TP </span>
              <input 
                type="number" 
                placeholder="e.g. 50000"
                value={totalEarnings}
                onChange={(e) => setTotalEarnings(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 text-slate-800 font-bold focus:outline-none focus:border-[#C9A455] focus:ring-1 focus:ring-[#C9A455]"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={distributeMutation.isLoading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
          >
            {distributeMutation.isLoading ? 'Processing...' : 'Distribute 10% Share'}
          </button>
        </form>
      </div>
    </div>
  );
};
