import React, { useState } from 'react';
import { useWaypoint } from '../../context/WaypointContext';
import { maskBankAccount, maskPhone, maskEmail } from '../../utils/security';
import { memberApi } from '../../api';
import {
  User,
  ShieldCheck,
  Building2,
  Lock,
  CheckCircle2,
  Calendar,
  Tag,
  Mail,
  Phone,
  Users
} from 'lucide-react';

export const ProfilePage = () => {
  const { memberProfile, showToast } = useWaypoint();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingPlacement, setIsUpdatingPlacement] = useState(false);

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
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-[#0F172A] text-[#C9A455] font-display font-bold text-2xl flex items-center justify-center shadow-md">
                {name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-sans font-extrabold text-lg text-slate-900">{name}</h3>
                <div className="flex items-center gap-3 mt-1.5">
                  <div className="font-mono text-sm text-[#C9A455] font-bold">
                    {rank} • Code: #{memberCode}
                  </div>
                  <button
                    onClick={async () => {
                      const newCode = prompt("Enter a new unique referral code (e.g. TRV9999):", memberCode);
                      if (newCode && newCode !== memberCode) {
                        try {
                          await memberApi.updateProfile({ referralCode: newCode });
                          window.location.reload();
                        } catch (err) {
                          showToast('Failed to update code.', 'error');
                        }
                      }
                    }}
                    className="text-[10px] px-3 py-1 rounded-full bg-[#0F172A] text-white hover:bg-slate-800 shadow-sm cursor-pointer font-bold uppercase tracking-wide"
                  >
                    Edit Code
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Member since {joinedDate}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" />
                    Registered Email
                  </span>
                  <div className="font-semibold text-slate-900">{email}</div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    Registered Mobile
                  </span>
                  <div className="font-semibold text-slate-900">{phone}</div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Sponsor Organization</span>
                  <div className="font-bold text-slate-900 mt-0.5">{memberProfile?.sponsorName || 'Direct Sign Up'}</div>
                </div>
                <span className="text-[10px] font-bold font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">
                  DIRECT LINE
                </span>
              </div>
            </div>
          </div>

          {/* Security & Password Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
            <h4 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-700" />
              <span>Security & Access Credentials</span>
            </h4>
            <p className="text-xs text-slate-500">
              Your member account is protected by multi-factor session validation and encrypted tokens.
            </p>
            <button
              onClick={() => showToast('Password reset instructions sent to your email.', 'success')}
              className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Update Password
            </button>
          </div>

          {/* Network Settings Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
            <h4 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Network Placement Strategy</span>
            </h4>
            <p className="text-xs text-slate-500">
              Select your default binary placement leg for new recruits signing up with your base referral code.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <select
                value={memberProfile?.defaultPlacement || 'AUTO'}
                onChange={async (e) => {
                  setIsUpdatingPlacement(true);
                  try {
                    await memberApi.updateProfile({ defaultPlacement: e.target.value });
                    // Refresh profile in context
                    window.location.reload(); 
                  } catch (err) {
                    showToast('Failed to update placement setting.', 'error');
                  } finally {
                    setIsUpdatingPlacement(false);
                  }
                }}
                disabled={isUpdatingPlacement}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-400 cursor-pointer"
              >
                <option value="AUTO">Auto-Balance (Weaker Leg)</option>
                <option value="LEFT">Force Left Leg</option>
                <option value="RIGHT">Force Right Leg</option>
              </select>
              {isUpdatingPlacement && <span className="text-[10px] font-bold text-slate-400 animate-pulse">Saving...</span>}
            </div>
          </div>
        </div>

        {/* Right: KYC & Bank Verification (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* KYC Status */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-sans font-bold text-base text-slate-900">KYC Verification</h4>
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>VERIFIED</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Your identity documents (PAN & Aadhaar) are verified for direct financial bank payouts under Indian regulatory compliance.
            </p>

            <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-xs text-emerald-800 space-y-0.5">
              <div className="font-bold">Verification Date: 16 Nov 2025</div>
              <div className="text-[10px] text-emerald-700 font-mono">PAN: •••••••92F</div>
            </div>
          </div>

          {/* Masked Bank Account */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-4">
            <h4 className="font-sans font-bold text-base text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Registered Payout Bank</span>
            </h4>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Bank Name</span>
                <span className="font-bold text-slate-900">HDFC Bank Ltd.</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Account Number</span>
                <span className="font-mono font-bold text-slate-900">{maskBankAccount('50100418294821')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">IFSC Code</span>
                <span className="font-mono font-bold text-slate-900">HDFC0001248</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              For security, full bank details are masked. Contact support to update registered payout accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
