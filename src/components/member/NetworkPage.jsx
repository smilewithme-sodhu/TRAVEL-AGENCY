import React, { useState, useEffect } from 'react';
import { networkApi } from '../../api';
import { TableSkeleton } from '../ui/Skeleton';
import { EmptyState } from '../ui/EmptyState';
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  ChevronRight,
  Filter,
  UserCheck,
  UserX,
  Compass,
  X
} from 'lucide-react';

export const NetworkPage = () => {
  const [overview, setOverview] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    networkApi
      .getOverview()
      .then((res) => {
        if (res.success) setOverview(res.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <TableSkeleton rows={6} />;

  const members = overview?.members || [];

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.memberCode.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'ALL') return true;
    if (filter === 'ACTIVE') return m.status === 'ACTIVE';
    if (filter === 'INACTIVE') return m.status !== 'ACTIVE';
    if (filter === 'LEFT') return m.position === 'LEFT';
    if (filter === 'RIGHT') return m.position === 'RIGHT';
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
            My Referral Community & Downline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Directory of registered sponsors and active travel members across your binary organization.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Total Members</span>
          <div className="font-sans font-extrabold text-xl text-slate-900">{overview?.totalMembers ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Travel Members</span>
          <div className="font-sans font-extrabold text-xl text-emerald-600">{overview?.activeMembers ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Left Leg Count</span>
          <div className="font-sans font-extrabold text-xl text-blue-600">{overview?.leftCount ?? 0}</div>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Right Leg Count</span>
          <div className="font-sans font-extrabold text-xl text-[#C9A455]">{overview?.rightCount ?? 0}</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-100">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            id="network-search"
            name="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member name or code..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['ALL', 'ACTIVE', 'INACTIVE', 'LEFT', 'RIGHT'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === f ? 'bg-[#0F172A] text-white shadow-xs' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filteredMembers.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No matching members"
          description="Try adjusting your filter or search criteria to view your downline."
        />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-100/90 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-[10px] uppercase font-bold text-slate-400">
                  <th className="py-3.5 px-6">Member Name</th>
                  <th className="py-3.5 px-4">Member ID</th>
                  <th className="py-3.5 px-4">Position</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Travel Cycle</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0F172A] text-[#C9A455] font-bold text-xs flex items-center justify-center">
                          {m.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900">{m.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">#{m.memberCode}</td>
                    <td className="py-3.5 px-4">
                      <span className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        m.position === 'LEFT' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {m.position} LEG
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        m.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {m.personalTravelBooked ? (
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Confirmed</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 font-medium">Pending Booking</span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => setSelectedMember(m)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                        title="View safe summary"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Safe Member Summary Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0F172A] text-[#C9A455] font-bold text-sm flex items-center justify-center">
                  {selectedMember.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-base text-slate-900">{selectedMember.name}</h3>
                  <div className="font-mono text-[10px] text-slate-500">#{selectedMember.memberCode}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Membership Status</span>
                <span className="font-bold text-slate-900">{selectedMember.status}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Binary Placement</span>
                <span className="font-bold text-slate-900">{selectedMember.position} Leg</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Sponsor</span>
                <span className="font-bold text-slate-900">{selectedMember.sponsorName}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500 font-medium">Direct Referrals Count</span>
                <span className="font-bold text-slate-900">{selectedMember.directReferralsCount} Members</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedMember(null)}
              className="w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
