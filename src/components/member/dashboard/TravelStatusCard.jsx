import React from 'react';
import { Compass } from 'lucide-react';

export const TravelStatusCard = ({ statusCard, member, isActive, navigateTo }) => {
  return (
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
  );
};
