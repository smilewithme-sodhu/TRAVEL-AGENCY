import React, { useState } from 'react';
import { useWanderlust } from '../context/WanderlustContext';
import { Sparkles, MessageSquare, X } from 'lucide-react';

export const FestivalDealBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const { openWhatsApp } = useWanderlust();

  if (dismissed) return null;

  return (
    <div className="bg-[#0F172A] text-white py-3 px-4 sm:px-6 relative z-30 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left pr-8 sm:pr-0">
        <div className="flex items-center gap-2 text-xs text-slate-200 font-medium">
          <Sparkles size={14} className="text-[#C9A455] shrink-0" />
          <span>
            <strong className="text-[#C9A455]">Early Booking Offer:</strong> Complimentary private candlelit dinner + room upgrades on select domestic & international journeys!
          </span>
        </div>

        <button
          onClick={() => openWhatsApp(null, "Hi Wanderlust! I would like to claim the early booking special offer.")}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C9A455] text-[#0F172A] font-extrabold text-[11px] hover:bg-[#b89547] transition-all cursor-pointer shrink-0 shadow-2xs"
        >
          <MessageSquare size={12} className="fill-current" />
          <span>Claim Offer</span>
        </button>
      </div>

      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white cursor-pointer"
        title="Dismiss"
      >
        <X size={15} />
      </button>
    </div>
  );
};
