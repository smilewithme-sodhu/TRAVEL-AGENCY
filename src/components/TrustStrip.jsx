import React from 'react';
import { TRUST_PARTNERS } from '../data/wanderlustData';
import { ShieldCheck, Award } from 'lucide-react';

export const TrustStrip = () => {
  return (
    <section className="bg-white border-b border-sky-100/60 py-5 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
        
        <div className="flex items-center gap-2 text-slate-700 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2563EB]">
            <ShieldCheck size={18} className="text-[#2563EB]" />
          </div>
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-[#0A3161] block">
              OFFICIAL GOVT. REGISTRATION & ACCREDITATION
            </span>
            <span className="text-[10px] text-slate-500 font-medium block">
              Dept of Tourism & Civil Aviation (DoT & CAv), Govt. of Sikkim
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 sm:gap-8 flex-wrap">
          {TRUST_PARTNERS.map((partner, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start">
              <span className="text-xs sm:text-sm font-bold text-[#0A3161]">
                {partner.name}
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#2563EB] font-bold uppercase tracking-tight">
                {partner.code}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
