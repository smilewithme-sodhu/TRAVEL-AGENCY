import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../../api/adminApi';
import { ShieldCheck, UserCheck } from 'lucide-react';


export const AdminMembersPage = () => {
  const queryClient = useQueryClient();

  const { data: response, isLoading } = useQuery({
    queryKey: ['admin-members'],
    queryFn: adminApi.getMembers,
  });

  const activateMutation = useMutation({
    mutationFn: adminApi.activateMember,
    onSuccess: () => {
      alert('Member activated to GREEN!');
      queryClient.invalidateQueries(['admin-members']);
    },
    onError: (err) => {
      alert(err.response?.data?.error || 'Failed to activate member.');
    }
  });

  const setStatusMutation = useMutation({
    mutationFn: ({ id, status }) => adminApi.setMemberStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-members'] });
    },
    onError: (err) => {
      alert(err.message || 'Failed to update member status');
    }
  });

  const activateOrangeMutation = useMutation({
    mutationFn: (id) => adminApi.activateMemberToOrange(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-members'] });
      showToast('success', 'Member upgraded to ORANGE (Travel Agent)');
    },
    onError: (err) => {
      showToast('error', err.message || 'Failed to upgrade member');
    }
  });

  if (isLoading) return <div className="p-8 text-white">Loading members...</div>;

  const members = response?.data || [];

  return (
    <div className="space-y-6 pb-12 p-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Member Network</span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
          Registered Members
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Monitor and activate members who have paid the registration fee.
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
                <th className="py-4 px-5">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-medium">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-4 px-5 font-bold text-white flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-900 text-indigo-200 flex items-center justify-center font-bold text-xs">
                      {m.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span>{m.name}</span>
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-400">#{m.code}</td>
                  <td className="py-4 px-5">
                    {m.status === 'ORANGE' ? (
                      <span className="text-xs font-bold text-orange-400">• Travel Agent (ORANGE)</span>
                    ) : m.status === 'GREEN' ? (
                      <span className="text-xs font-bold text-emerald-400">• Active (GREEN)</span>
                    ) : (
                      <span className="text-xs font-bold text-amber-400">• Inactive</span>
                    )}
                  </td>
                  <td className="py-4 px-5">{m.directSales} Bookings</td>
                  <td className="py-4 px-5 font-bold text-white">TP {m.balance.toLocaleString()}</td>
                  <td className="py-4 px-5">
                    <select
                      value={m.status}
                      disabled={setStatusMutation.isLoading}
                      onChange={(e) => setStatusMutation.mutate({ id: m.id, status: e.target.value })}
                      className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="GREEN">GREEN</option>
                      <option value="ORANGE">ORANGE</option>
                    </select>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">No members found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
