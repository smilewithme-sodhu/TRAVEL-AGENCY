import React from "react";

export const NetworkKPICards = ({ overview }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          Total Members
        </span>
        <div className="font-sans font-extrabold text-xl text-slate-900">
          {overview?.totalMembers ?? 0}
        </div>
      </div>
      <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          Active Travel Members
        </span>
        <div className="font-sans font-extrabold text-xl text-emerald-600">
          {overview?.activeMembers ?? 0}
        </div>
      </div>
      <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          Left Leg Count
        </span>
        <div className="font-sans font-extrabold text-xl text-blue-600">
          {overview?.leftCount ?? 0}
        </div>
      </div>
      <div className="p-4 bg-white rounded-2xl border border-slate-100/90 shadow-2xs space-y-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          Right Leg Count
        </span>
        <div className="font-sans font-extrabold text-xl text-[#C9A455]">
          {overview?.rightCount ?? 0}
        </div>
      </div>
    </div>
  );
};
