import React from 'react';
import { Compass } from 'lucide-react';

export const BrandLogo = ({ handleNavClick }) => {
  return (
    <div
      onClick={() => handleNavClick('home')}
      className="flex items-center gap-3 cursor-pointer select-none group"
    >
      <div className="w-10 h-10 rounded-2xl bg-[#0F172A] flex items-center justify-center text-[#C9A455] shadow-xs group-hover:scale-105 transition-transform duration-200">
        <Compass className="w-5 h-5" />
      </div>
      <div>
        <div className="font-display font-bold text-lg text-slate-900 leading-tight tracking-tight">
          WANDERLUST
        </div>
        <div className="font-mono text-[9px] uppercase tracking-widest text-[#C9A455] font-bold">
          LUXURY TRAVEL CONSULTANTS
        </div>
      </div>
    </div>
  );
};
