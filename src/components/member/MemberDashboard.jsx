import React, { useState, useEffect } from 'react';
import { useWanderlust } from '../../context/WanderlustContext';
import { memberApi } from '../../api';
import { formatINR, formatDate } from '../../utils/formatters';
import { DashboardSkeleton } from '../ui/Skeleton';
import { ErrorState } from '../ui/ErrorState';
import { GreetingHeader } from './dashboard/GreetingHeader';
import { TravelStatusCard } from './dashboard/TravelStatusCard';
import { EarningsOverview } from './dashboard/EarningsOverview';
import { QuickActions } from './dashboard/QuickActions';
import { NetworkVolumeSnapshot } from './dashboard/NetworkVolumeSnapshot';
import { RecentActivityFeed } from './dashboard/RecentActivityFeed';

export const MemberDashboard = () => {
  const { navigateTo, showToast, memberProfile } = useWanderlust();
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

  const getShareUrl = () => {
    return `${window.location.origin}/?ref=${data?.member?.memberCode}`;
  };

  const handleCopyLink = () => {
    if (!data?.member?.memberCode) return;
    navigator.clipboard.writeText(getShareUrl());
    setIsCopied(true);
    showToast('Personal referral link copied to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share && data?.member?.memberCode) {
      try {
        await navigator.share({
          title: 'Wanderlust Luxury Travel Club',
          text: 'Explore handcrafted luxury journeys with personal WhatsApp concierge consultation.',
          url: getShareUrl(),
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

  const { member, bookings, overview } = data;
  const isActive = member?.status === 'GREEN';

  // Adapt backend data to component props
  const statusCard = {
    isActive,
    headline: isActive ? "Wanderlust Green Member" : "Registered Member",
    subheadline: isActive ? "Your luxury travel portal is fully unlocked." : "Book your first journey to unlock rewards.",
    actionText: "Explore Packages"
  };

  const earnings = {
    walletBalance: member?.walletBalance || 0,
    totalEarned: 0,
    pending: overview?.pendingRewards || 0
  };

  const networkVolume = {
    personal: overview?.personalVolume || 0,
    team: overview?.teamVolume || 0,
    directReferrals: overview?.activeDirectReferrals || 0
  };

  const referral = {
    shareUrl: `${window.location.origin}/?ref=${member?.memberCode}`
  };

  const recentActivities = [];
  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Greeting Header */}
      <GreetingHeader
        member={member}
        isActive={isActive}
        handleNativeShare={handleNativeShare}
      />

      {/* 2. Primary Travel Status Card */}
      <TravelStatusCard
        statusCard={statusCard}
        member={member}
        isActive={isActive}
        navigateTo={navigateTo}
      />

      {/* 3. Master Financial Earnings Overview */}
      <EarningsOverview
        earnings={earnings}
        navigateTo={navigateTo}
        formatINR={formatINR}
      />

      {/* 4. Quick Actions Grid */}
      <QuickActions
        navigateTo={navigateTo}
      />

      {/* 5. Network Volume Snapshot */}
      <NetworkVolumeSnapshot
        networkVolume={networkVolume}
        navigateTo={navigateTo}
        formatINR={formatINR}
      />

      {/* 6. Recent Activity Feed */}
      <RecentActivityFeed
        recentActivities={recentActivities}
        navigateTo={navigateTo}
        formatDate={formatDate}
        formatINR={formatINR}
      />
    </div>
  );
};
