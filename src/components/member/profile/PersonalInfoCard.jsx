import React from 'react';
import { Mail, Phone } from 'lucide-react';
import { memberApi } from '../../../api';

export const PersonalInfoCard = ({ name, email, phone, memberCode, rank, joinedDate, memberProfile, showToast }) => {
  return (
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
  );
};
