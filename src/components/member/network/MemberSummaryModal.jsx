import React from "react";
import { X } from "lucide-react";

export const MemberSummaryModal = ({ selectedMember, setSelectedMember }) => {
  if (!selectedMember) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F172A] text-[#C9A455] font-bold text-sm flex items-center justify-center">
              {selectedMember.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900">
                {selectedMember.name}
              </h3>
              <div className="font-mono text-[10px] text-slate-500">
                #{selectedMember.memberCode}
              </div>
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
            <span className="text-slate-500 font-medium">
              Membership Status
            </span>
            <span className="font-bold text-slate-900">
              {selectedMember.status}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <span className="text-slate-500 font-medium">Binary Placement</span>
            <span className="font-bold text-slate-900">
              {selectedMember.position} Leg
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <span className="text-slate-500 font-medium">Sponsor</span>
            <span className="font-bold text-slate-900">
              {selectedMember.sponsorName}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl flex justify-between">
            <span className="text-slate-500 font-medium">
              Direct Referrals Count
            </span>
            <span className="font-bold text-slate-900">
              {selectedMember.directReferralsCount} Members
            </span>
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
  );
};
