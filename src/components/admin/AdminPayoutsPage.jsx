import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../api/client';
import { formatINR, formatDate } from '../../utils/formatters';
import { TableSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import {
  Wallet,
  CheckCircle2,
  XCircle,
  Search,
  AlertCircle,
  X
} from 'lucide-react';

const ActionModal = ({ isOpen, onClose, payout, actionType }) => {
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const queryClient = useQueryClient();

  const actionMutation = useMutation({
    mutationFn: async (data) => {
      const endpoint = "/api/admin/payouts/" + payout.id + "/" + actionType;
      const res = await apiClient.put(endpoint, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminPayouts'] });
      onClose();
      setNotes('');
    },
    onError: (err) => {
      setError(err.response?.data?.error || err.message || 'Action failed');
    }
  });

  if (!isOpen || !payout) return null;

  const isApprove = actionType === 'approve';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!notes.trim()) {
      setError(isApprove ? 'Bank UTR/Reference number is required' : 'Rejection reason is required');
      return;
    }
    const payload = isApprove ? { adminNotes: notes, gatewayRef: notes } : { rejectionReason: notes };
    actionMutation.mutate(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center " + (isApprove ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500')}>
              {isApprove ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isApprove ? 'Approve Payout' : 'Reject Payout'}
            </h2>
          </div>
          <p className="text-slate-400 text-sm">
            {isApprove 
              ? "Confirm payout of " + formatINR(payout.netPayoutAmount) + " to " + payout.member?.user?.name + "."
              : "Reject payout request of " + formatINR(payout.requestedAmount) + " for " + payout.member?.user?.name + "."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">
              {isApprove ? 'Bank UTR / Transaction Ref' : 'Reason for Rejection'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                setError('');
              }}
              placeholder={isApprove ? "Enter UTR number..." : "Enter reason..."}
              className={"w-full bg-[#0F172A] border rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all " + (error ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-700 focus:ring-[#C9A455]/50 focus:border-[#C9A455]')}
            />
            {error && <p className="text-red-400 text-xs flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
          </div>

          <button
            type="submit"
            disabled={actionMutation.isPending || !notes.trim()}
            className={"w-full font-bold py-3.5 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 " + (isApprove ? 'bg-emerald-500 hover:bg-emerald-600 text-white disabled:bg-slate-700' : 'bg-red-500 hover:bg-red-600 text-white disabled:bg-slate-700')}
          >
            {actionMutation.isPending ? 'Processing...' : (isApprove ? 'Confirm Transfer' : 'Reject Request')}
          </button>
        </form>
      </div>
    </div>
  );
};

export const AdminPayoutsPage = () => {
  const [search, setSearch] = useState('');
  const [modalState, setModalState] = useState({ isOpen: false, type: null, payout: null });

  const { data: payouts, isLoading, isError } = useQuery({
    queryKey: ['adminPayouts'],
    queryFn: async () => {
      const response = await apiClient.get('/api/admin/payouts/pending');
      return response.data.data;
    }
  });

  if (isLoading) return <TableSkeleton rows={5} />;
  if (isError) return <div className="text-red-500 p-8">Failed to load pending payouts</div>;

  const filtered = (payouts || []).filter(p => {
    const searchString = (p.member?.user?.name + ' ' + p.member?.user?.email + ' ' + p.id).toLowerCase();
    return searchString.includes(search.toLowerCase());
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Withdrawal Requests</h1>
          <p className="text-slate-500 mt-1">Review and process pending member payouts</p>
        </div>
        
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, or ID..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C9A455]/50 focus:border-[#C9A455] transition-all"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={Wallet}
          title="No pending payouts"
          description="There are currently no withdrawal requests waiting for approval."
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4">Member Info</th>
                  <th className="p-4">Bank Details</th>
                  <th className="p-4 text-right">Requested</th>
                  <th className="p-4 text-right">TDS (5%)</th>
                  <th className="p-4 text-right">Net Payout</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filtered.map(payout => {
                  const bank = payout.member?.bankAccounts?.[0];
                  return (
                    <tr key={payout.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{payout.member?.user?.name}</div>
                        <div className="text-xs text-slate-500">{payout.member?.user?.email}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">ID: {payout.id.split('-')[0]}...</div>
                      </td>
                      <td className="p-4">
                        {bank ? (
                          <div>
                            <div className="font-medium text-slate-900">{bank.bankName}</div>
                            <div className="text-xs text-slate-500 font-mono">AC: {bank.accountNumber}</div>
                            <div className="text-xs text-slate-500 font-mono">IFSC: {bank.ifscCode}</div>
                          </div>
                        ) : (
                          <div className="text-xs text-amber-600 bg-amber-50 inline-block px-2 py-1 rounded">
                            No Primary Bank Added
                          </div>
                        )}
                        {payout.upiId && (
                          <div className="text-xs text-slate-600 font-mono mt-1 border-t border-slate-100 pt-1">
                            UPI: {payout.upiId}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-right font-bold text-slate-900">
                        {formatINR(payout.requestedAmount)}
                      </td>
                      <td className="p-4 text-right text-red-500 font-medium">
                        -{formatINR(payout.tdsAmount)}
                      </td>
                      <td className="p-4 text-right font-black text-emerald-600 text-base">
                        {formatINR(payout.netPayoutAmount)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setModalState({ isOpen: true, type: 'approve', payout })}
                            className="p-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors tooltip-trigger"
                            title="Approve & Transfer"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => setModalState({ isOpen: true, type: 'reject', payout })}
                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors tooltip-trigger"
                            title="Reject Request"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ActionModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, type: null, payout: null })}
        actionType={modalState.type}
        payout={modalState.payout}
      />
    </div>
  );
};
