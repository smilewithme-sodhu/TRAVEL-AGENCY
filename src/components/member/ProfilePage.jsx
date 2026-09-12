import React from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { PersonalInfoCard } from './profile/PersonalInfoCard';
import { SecurityCard } from './profile/SecurityCard';
import { NetworkSettingsCard } from './profile/NetworkSettingsCard';
import { KycVerificationCard } from './profile/KycVerificationCard';
import { BankDetailsCard } from './profile/BankDetailsCard';

export const ProfilePage = () => {
  const { memberProfile, showToast } = useWaypoint();

  const name = memberProfile?.name || 'Loading...';
  const email = memberProfile?.email || 'Loading...';
  const phone = memberProfile?.phone || 'Loading...';
  const memberCode = memberProfile?.referralCode || (memberProfile?.id ? `TRV${memberProfile.id.substring(0,4).toUpperCase()}` : 'NEW');
  const rank = memberProfile?.rank || '...';
  const joinedDate = memberProfile?.joinedDate || '...';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-2 border-b border-slate-100">
        <h1 className="font-sans font-extrabold text-2xl text-slate-900 tracking-tight">
          Member Profile & KYC Verification
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review your registered personal details, identity verification status, and payout accounts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Personal & Membership Info (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <PersonalInfoCard
            name={name}
            email={email}
            phone={phone}
            memberCode={memberCode}
            rank={rank}
            joinedDate={joinedDate}
            memberProfile={memberProfile}
            showToast={showToast}
          />
          <SecurityCard showToast={showToast} />
          <NetworkSettingsCard memberProfile={memberProfile} showToast={showToast} />
        </div>

        {/* Right: KYC & Bank Verification (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <KycVerificationCard />
          <BankDetailsCard />
        </div>
      </div>
    </div>
  );
};
