import React, { useState, useEffect } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { memberApi } from '../../api';
import { formatINR, formatDate } from '../../utils/formatters';
import { DashboardSkeleton } from '../ui/Skeleton';
import { ErrorState } from '../ui/ErrorState';
import {
  Share2,
  GitFork,
  ArrowRight,
  DollarSign,
  Users,
  Compass,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Wallet,
  MessageSquare,
  Copy,
  Check,
  Palmtree
} from 'lucide-react';

export const MemberDashboard = () => {
  const { navigateTo, showToast, memberProfile } = useWaypoint();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    memberApi
      .getDashboard(memberProfile?.status)
      .then((res) => {
        if (res.success) {
          setData(res.data);
          setErrorMsg('');
        } else {
          setErrorMsg(res.error || 'Unknown error');
        }
      })
      .catch((err) => setErrorMsg(err.message))
      .finally(() => setIsLoading(false));
  }, [memberProfile?.status]);

  const handleCopyLink = () => {
    if (!data?.referral?.shareUrl) return;
    navigator.clipboard.writeText(data.referral.shareUrl);
    setIsCopied(true);
    showToast('Personal referral link copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share && data?.referral?.shareUrl) {
      try {
        await navigator.share({
          title: 'Wanderlust Luxury Travel Club',
          text: 'Explore handcrafted luxury journeys with personal WhatsApp concierge consultation.',
          url: data.referral.shareUrl,
        });
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  if (isLoading) return <DashboardSkeleton />;
  if (!data) {
    return (
      <div className="p-8 text-center bg-red-50 rounded-2xl border border-red-200">
        <h2 className="text-red-700 font-bold mb-2">Error Loading Dashboard</h2>
        <p className="text-red-600 text-sm">{errorMsg}</p>
        <button onClick={() => navigateTo('home')} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold">Back to Home</button>
      </div>
    );
  }

  const { member, statusCard, earnings, networkVolume, referral, recentActivities } = data;
  const isActive = statusCard.isActive;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Greeting Header */}
      <div className="flex items-center justify-between gap-4 pb-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-[#C9A455] tracking-widest">
              MEMBER ATELIER
            </span>
            <span className="text-slate-300">•</span>
            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
              {member.rank}
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-xl sm:text-3xl text-slate-900 tracking-tight">
            Good evening, {member.name.split(' ')[0]} 👋
          </h1>
        </div>

        <button
          onClick={handleNativeShare}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Share2 className="w-3.5 h-3.5 text-[#C9A455]" />
          <span className="hidden sm:inline">Share Link</span>
        </button>
      </div>

      {/* 2. Primary Travel Status Card */}
      <div className={`p-5 sm:p-7 rounded-3xl border transition-all ${
        isActive
          ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border-slate-800 shadow-md'
          : 'bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 text-white border-amber-900/30 shadow-md'
      }`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-bold">
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{statusCard.headline.toUpperCase()}</span>
            </div>

            <span className="font-mono text-[10px] text-slate-400 font-bold">
              ID: #{member.memberCode}
            </span>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg sm:text-2xl text-white">
              {isActive ? 'Your Travel Cycle is Confirmed & Active' : 'Activate Your Travel Cycle'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium mt-1">
              {statusCard.subtext}
            </p>
          </div>

          {statusCard.qualifyingTrip && (
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#C9A455]/20 text-[#C9A455] flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-white truncate">{statusCard.qualifyingTrip.destination}</div>
                <div className="text-[10px] text-slate-300 truncate">
                  Travel Date: {statusCard.qualifyingTrip.travelDate}
                </div>
              </div>
            </div>
          )}

          <div className="pt-1 flex items-center justify-between gap-3">
            {isActive ? (
              <button
                onClick={() => navigateTo('member-trips')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs transition-all cursor-pointer text-center"
              >
                View Confirmed Booking →
              </button>
            ) : (
              <button
                onClick={() => navigateTo('member-explore')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#C9A455] text-[#0F172A] hover:bg-[#b89547] font-extrabold text-xs transition-all cursor-pointer text-center"
              >
                Explore Destinations →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Master Financial Earnings Overview */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase block">
              FINANCIAL PERFORMANCE
            </span>
            <h2 className="font-sans font-extrabold text-base text-slate-900">
              Earnings & Balance
            </h2>
          </div>
          <button
            onClick={() => navigateTo('member-wallet')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Wallet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Master Prominent Total Earned */}
        <div className="p-4 bg-[#0F172A] text-white rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              TOTAL EARNED TO DATE
            </span>
            <div className="font-sans font-black text-2xl sm:text-3xl text-[#C9A455]">
              {formatINR(earnings.total)}
            </div>
          </div>
          <div className="text-right text-[11px] text-slate-300 font-medium">
            Direct: {formatINR(earnings.direct)}<br />
            Team: {formatINR(earnings.team)}
          </div>
        </div>

        {/* Secondary Supporting Metrics (Compact Grid) */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Available Balance</span>
            <div className="font-sans font-black text-lg text-emerald-600">
              {formatINR(earnings.available)}
            </div>
            <div className="text-[9px] text-slate-500 font-medium">Withdrawal Eligible</div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Binary Match</span>
            <div className="font-sans font-black text-lg text-indigo-600">
              {formatINR(earnings.binary)}
            </div>
            <div className="text-[9px] text-slate-500 font-medium">Matched Rewards</div>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Grid */}
      <div className="space-y-2">
        <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
          QUICK ACTIONS
        </span>
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => navigateTo('member-wallet')}
            className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100/90 shadow-2xs text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="font-bold text-[11px] text-slate-800">Wallet</span>
          </button>

          <button
            onClick={() => navigateTo('member-withdraw')}
            className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100/90 shadow-2xs text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <span className="font-bold text-[11px] text-slate-800">Withdraw</span>
          </button>

          <button
            onClick={() => navigateTo('member-referral')}
            className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100/90 shadow-2xs text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Share2 className="w-4 h-4" />
            </div>
            <span className="font-bold text-[11px] text-slate-800">Referral</span>
          </button>

          <button
            onClick={() => navigateTo('member-network')}
            className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-100/90 shadow-2xs text-center flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span className="font-bold text-[11px] text-slate-800">Network</span>
          </button>
        </div>
      </div>

      {/* 5. Network Volume Snapshot */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#C9A455] uppercase tracking-wider block">
              GENEALOGY SNAPSHOT
            </span>
            <h3 className="font-sans font-extrabold text-base text-slate-900">
              Binary Network Volume
            </h3>
          </div>
          <button
            onClick={() => navigateTo('member-binary')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Tree View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">LEFT LEG</span>
            <div className="font-sans font-extrabold text-base text-slate-900">
              {formatINR(networkVolume.leftVolume)}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">RIGHT LEG</span>
            <div className="font-sans font-extrabold text-base text-slate-900">
              {formatINR(networkVolume.rightVolume)}
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between text-xs">
          <div>
            <span className="text-[9px] text-slate-400 uppercase font-bold block">MATCHED</span>
            <span className="font-extrabold text-[#C9A455]">{formatINR(networkVolume.matchedVolume)}</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-slate-400 uppercase font-bold block">CARRY FORWARD</span>
            <span className="font-bold text-slate-200">Left {formatINR(networkVolume.leftCarryForward)}</span>
          </div>
        </div>
      </div>

      {/* 6. Recent Activity Feed */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100/90 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="font-sans font-extrabold text-base text-slate-900">
            Recent Activity
          </h3>
          <button
            onClick={() => navigateTo('member-rewards')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>All Rewards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentActivities.slice(0, 3).map((act) => (
            <div key={act.id} className="py-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  act.direction === 'CREDIT' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-700'
                }`}>
                  {act.type === 'DIRECT_COMMISSION' ? (
                    <DollarSign className="w-4 h-4" />
                  ) : act.type === 'BINARY_REWARD' ? (
                    <GitFork className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>

                <div className="min-w-0">
                  <h4 className="font-sans font-bold text-xs text-slate-900 truncate">{act.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{formatDate(act.timestamp)}</p>
                </div>
              </div>

              {act.amount && (
                <div className={`font-sans font-extrabold text-xs shrink-0 ${
                  act.direction === 'CREDIT' ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {act.direction === 'CREDIT' ? '+' : '-'}{formatINR(act.amount)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
