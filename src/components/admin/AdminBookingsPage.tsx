import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, useAdminMemberSearch, useManualBooking, useAssignManualPoints } from '../../api/client';
import { useWanderlust } from '../../context/WanderlustContext';
import { formatINR, formatDate } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { TableSkeleton } from '../ui/Skeleton';
import { CheckCircle2, Search, ArrowRight, User, Package, Plus, X, Loader2, MessageSquare } from 'lucide-react';

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// AssignPointsModal — standalone sub-component for clarity
// ---------------------------------------------------------------------------
const AssignPointsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { showToast } = useWanderlust();
  const qclient = useQueryClient();
  const [memberQ, setMemberQ] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  const [amountPaid, setAmountPaid] = useState('');
  const [binaryVolume, setBinaryVolume] = useState('');
  const [notes, setNotes] = useState('');
  
  const dropRef = useRef<HTMLDivElement>(null);

  const { data: memberResults = [], isFetching: searchingMembers } = useAdminMemberSearch(memberQ);

  const assignPoints = useAssignManualPoints();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setMemberQ('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return showToast('Please select a member.', 'error');
    
    const amountPaidNum = Number(amountPaid) || 0;
    const binaryVolumeNum = Number(binaryVolume) || 0;
    
    if (amountPaidNum <= 0 && binaryVolumeNum <= 0) {
      return showToast('Please enter an amount or binary volume greater than 0.', 'error');
    }

    assignPoints.mutate(
      { 
        memberId: selectedMember.id, 
        amountPaid: amountPaidNum, 
        binaryVolume: binaryVolumeNum, 
        notes: notes || 'Admin Manual Assignment' 
      },
      {
        onSuccess: (res) => {
          showToast(res.message || 'Points assigned successfully!', 'success');
          onClose();
        },
        onError: (err: any) => {
          showToast(err?.response?.data?.error || 'Failed to assign points.', 'error');
        },
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 flex items-center justify-center">
              <Plus className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Assign Manual Points</h2>
              <p className="text-slate-400 text-xs">Directly assign Cash Rewards & Binary Volume</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Member search */}
          <div ref={dropRef} className="relative">
            <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
              Select Member *
            </label>
            {selectedMember ? (
              <div className="flex items-center justify-between bg-slate-800 border border-indigo-500/40 rounded-xl px-3 py-2.5">
                <div>
                  <p className="text-white text-sm font-semibold">{selectedMember.user.name}</p>
                  <p className="text-slate-400 text-xs">{selectedMember.user.email} · {selectedMember.referralCode}</p>
                </div>
                <button
                  type="button"
                  onClick={() => { setSelectedMember(null); setMemberQ(''); }}
                  className="text-slate-500 hover:text-red-400 transition-colors ml-2"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  {searchingMembers && <Loader2 className="w-4 h-4 text-slate-500 absolute right-3 top-2.5 animate-spin" />}
                  <input
                    type="text"
                    value={memberQ}
                    onChange={(e) => setMemberQ(e.target.value)}
                    placeholder="Search by name, email or referral code..."
                    className="w-full pl-9 pr-9 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                {memberResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
                    {memberResults.map((m: any) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => { setSelectedMember(m); setMemberQ(''); }}
                        className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors"
                      >
                        <p className="text-white text-sm font-semibold">{m.user.name}</p>
                        <p className="text-slate-400 text-xs">{m.user.email} · <span className="text-indigo-400">{m.referralCode}</span></p>
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Direct Reward (TP )
              </label>
              <input
                type="number"
                min={0}
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                placeholder="0"
                className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
                Binary Volume (BV)
              </label>
              <input
                type="number"
                min={0}
                value={binaryVolume}
                onChange={(e) => setBinaryVolume(e.target.value)}
                placeholder="0"
                className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
              Notes
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. WhatsApp payment confirmed"
              className="w-full py-2.5 px-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm font-bold hover:text-white hover:border-slate-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={assignPoints.isPending}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors disabled:opacity-60"
            >
              {assignPoints.isPending ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
              ) : (
                <><CheckCircle2 className="w-4 h-4" /> Assign Points</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export const AdminBookingsPage: React.FC = () => {
  const { showToast } = useWanderlust();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [overrideVolume, setOverrideVolume] = useState('');
  const [overrideDirectReward, setOverrideDirectReward] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [showManualModal, setShowManualModal] = useState(false);


  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const response = await apiClient.get('/api/admin/bookings');
      return response.data.data;
    },
  });

  const confirmMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string, payload: any }) => {
      const response = await apiClient.post(`/api/admin/bookings/${id}/confirm-with-points`, payload);
      return response.data;
    },
    onSuccess: () => {
      showToast('Booking confirmed and volume rolled up to upline.', 'success');
      setSelectedBooking(null);
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
    },
    onError: (error: any) => {
      showToast(error?.response?.data?.error || 'Failed to confirm booking.', 'error');
    }
  });

  const filteredBookings = bookings.filter((b: any) => 
    b.bookingRef?.toLowerCase().includes(search.toLowerCase()) || 
    b.member?.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const openApprovalModal = (booking: any) => {
    setSelectedBooking(booking);
    setOverrideVolume(booking.package?.binaryVolumeBudget?.toString() || '0');
    setOverrideDirectReward(booking.package?.directRewardBudget?.toString() || '0');
    setAdminNotes('');
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    
    confirmMutation.mutate({
      id: selectedBooking.id,
      payload: {
        overrideVolume: Number(overrideVolume),
        overrideDirectReward: Number(overrideDirectReward),
        adminNotes: adminNotes,
      }
    });
  };

  if (isLoading) return <TableSkeleton rows={5} />;

  return (
    <div className="space-y-6 pb-12 animate-fadeIn">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          Operations
        </span>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-1">
          Booking Approvals
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Review pending bookings, verify WhatsApp payments, and manually allocate compensation volume.
        </p>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-4 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Ref or Customer Name..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
          <button
            onClick={() => setShowManualModal(true)}
            className="shrink-0 flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors shadow-lg shadow-indigo-900/30"
          >
            <Plus className="w-4 h-4" />
            Assign Points
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5 font-bold">Booking Ref</th>
                <th className="py-3 px-5 font-bold">Customer</th>
                <th className="py-3 px-5 font-bold">Package</th>
                <th className="py-3 px-5 font-bold">Price</th>
                <th className="py-3 px-5 font-bold">Status</th>
                <th className="py-3 px-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {filteredBookings.map((booking: any) => (
                <tr key={booking.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white">{booking.bookingRef}</div>
                    <div className="text-[10px] text-slate-500">{formatDate(booking.createdAt)}</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-500" />
                      {booking.customer ? `${booking.customer.firstName} ${booking.customer.lastName}` : 'Guest'}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-500" />
                      {booking.package?.name}
                    </div>
                  </td>
                  <td className="py-4 px-5 font-bold text-white">
                    {formatINR(booking.sellingPrice)}
                  </td>
                  <td className="py-4 px-5">
                    <Badge
                      label={booking.status}
                      variant={booking.status === 'PAYMENT_PENDING' ? 'warning' : booking.status === 'BOOKING_CONFIRMED' ? 'success' : 'default'}
                    />
                  </td>
                  <td className="py-4 px-5 text-right">
                    {booking.status === 'PAYMENT_PENDING' && (
                      <button
                        onClick={() => openApprovalModal(booking)}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold rounded-lg transition-colors"
                      >
                        Verify WhatsApp Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                    No bookings found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approval Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-3xl w-full max-w-lg border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-white">Approve WhatsApp Payment</h3>
                <p className="text-xs text-slate-400 mt-1">Review and allocate volume points for {selectedBooking.bookingRef}</p>
              </div>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Summary Details */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Customer</span>
                  <span className="text-white font-bold">{selectedBooking.customer ? `${selectedBooking.customer.firstName} ${selectedBooking.customer.lastName}` : 'Guest'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Package Booked</span>
                  <span className="text-white font-bold text-right">{selectedBooking.package?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Price</span>
                  <span className="text-emerald-400 font-bold">{formatINR(selectedBooking.sellingPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">System Calc. Volume</span>
                  <span className="text-white font-bold">{selectedBooking.package?.binaryVolumeBudget} PV</span>
                </div>
              </div>

              {/* Form */}
              <form id="approve-booking-form" onSubmit={handleConfirm} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Allocated Volume / Points (PV)
                  </label>
                  <input
                    type="number"
                    value={overrideVolume}
                    onChange={(e) => setOverrideVolume(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Direct Reward Budget (TP )
                  </label>
                  <input
                    type="number"
                    value={overrideDirectReward}
                    onChange={(e) => setOverrideDirectReward(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Admin Notes / UTR Reference
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Enter WhatsApp UTR or transaction reference..."
                    rows={2}
                  />
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-800 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                form="approve-booking-form"
                type="submit"
                disabled={confirmMutation.isPending}
                className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-colors flex justify-center items-center gap-2"
              >
                {confirmMutation.isPending ? 'Confirming...' : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Payment & Distribute Rewards</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Assign Points Modal */}
      {showManualModal && (
        <AssignPointsModal onClose={() => setShowManualModal(false)} />
      )}
    </div>
  );
};
