import React from 'react';
import { TRUST_PARTNERS } from '../data/waypointData';
import { ShieldCheck } from 'lucide-react';

export const TrustStrip = () => {
  return (
    <section className="bg-white border-b border-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
        
        <div className="flex items-center gap-2 text-slate-500">
          <ShieldCheck size={18} className="text-[#C9A455] shrink-0" />
          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest font-bold text-slate-700">
            ACCREDITATION & GLOBAL ALLIANCES
          </span>
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-8 flex-wrap">
          {TRUST_PARTNERS.map((partner, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start">
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {partner.name}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 font-semibold uppercase">
                {partner.code}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
